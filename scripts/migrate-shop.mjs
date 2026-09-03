// Migrate the entire Shopify catalog into Supabase (products, variants, images).
// Downloads every product image into Supabase Storage bucket "shop".
// Idempotent: upserts by shopify_id / handle.
//
// Run: node scripts/migrate-shop.mjs

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const env = Object.fromEntries(
  readFileSync(join(__dirname, '..', '.env.local'), 'utf8')
    .split('\n').filter((l) => l.includes('='))
    .map((l) => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim()] })
)
const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL
const sb = createClient(SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } })

const SHOP = 'https://save-one-person.myshopify.com'
const BUCKET = 'shop'

function stripHtml(html) {
  return (html || '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#8217;|&#039;/g, "'")
    .replace(/\s+/g, ' ').trim()
}

function extFromUrl(u) {
  const clean = u.split('?')[0]
  const m = clean.match(/\.(jpe?g|png|webp|avif|gif)$/i)
  return m ? m[1].toLowerCase().replace('jpeg', 'jpg') : 'jpg'
}
function ctFromExt(e) {
  return { jpg: 'image/jpeg', png: 'image/png', webp: 'image/webp', avif: 'image/avif', gif: 'image/gif' }[e] || 'image/jpeg'
}

async function uploadImage(src, handle, idx) {
  const ext = extFromUrl(src)
  const path = `${handle}/${idx}.${ext}`
  const res = await fetch(src)
  if (!res.ok) { console.warn(`  img fetch fail ${res.status}: ${src}`); return null }
  const buf = Buffer.from(await res.arrayBuffer())
  const { error } = await sb.storage.from(BUCKET).upload(path, buf, { contentType: ctFromExt(ext), upsert: true })
  if (error) { console.warn(`  img upload fail: ${error.message}`); return null }
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`
}

async function main() {
  const res = await fetch(`${SHOP}/products.json?limit=250`)
  const { products } = await res.json()
  console.log(`Fetched ${products.length} products from Shopify`)

  let pos = 0
  for (const p of products) {
    pos++
    const seoTitle = p.title
    const desc = stripHtml(p.body_html)
    const seoDesc = desc.slice(0, 300)

    // upsert product
    const { data: prod, error: pErr } = await sb.from('shop_products').upsert({
      shopify_id: p.id,
      handle: p.handle,
      title: p.title,
      body_html: p.body_html || null,
      description_text: desc || null,
      vendor: p.vendor || null,
      product_type: p.product_type || null,
      tags: (p.tags && p.tags.length) ? (Array.isArray(p.tags) ? p.tags : String(p.tags).split(',').map(t => t.trim())) : [],
      options: p.options || [],
      published: true,
      position: pos,
      seo_title: seoTitle,
      seo_description: seoDesc,
    }, { onConflict: 'shopify_id' }).select('id').single()
    if (pErr) { console.log(`PRODUCT FAIL ${p.handle}: ${pErr.message}`); continue }
    const productId = prod.id
    process.stdout.write(`${pos}. ${p.handle} `)

    // wipe + reinsert variants & images (clean re-sync)
    await sb.from('shop_variants').delete().eq('product_id', productId)
    await sb.from('shop_images').delete().eq('product_id', productId)

    // variants
    const variantRows = (p.variants || []).map((v, i) => ({
      product_id: productId,
      shopify_id: v.id,
      title: v.title,
      option1: v.option1, option2: v.option2, option3: v.option3,
      sku: v.sku || null,
      price: Number(v.price) || 0,
      compare_at_price: v.compare_at_price ? Number(v.compare_at_price) : null,
      available: v.available !== false,
      requires_shipping: v.requires_shipping !== false,
      taxable: v.taxable !== false,
      position: v.position || i + 1,
    }))
    if (variantRows.length) {
      const { error: vErr } = await sb.from('shop_variants').insert(variantRows)
      if (vErr) console.log(`  VAR FAIL: ${vErr.message}`)
    }

    // images -> storage
    let imgCount = 0
    for (let i = 0; i < (p.images || []).length; i++) {
      const img = p.images[i]
      const url = await uploadImage(img.src, p.handle, i + 1)
      if (!url) continue
      await sb.from('shop_images').insert({
        product_id: productId,
        shopify_id: img.id,
        url,
        alt: p.title,
        width: img.width || null,
        height: img.height || null,
        position: img.position || i + 1,
      })
      imgCount++
    }
    console.log(`(${variantRows.length}var ${imgCount}img)`)
  }
  console.log('Done.')
}

main().catch((e) => { console.error(e); process.exit(1) })
