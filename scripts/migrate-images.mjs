// One-off: download all DB image_urls (urgent + stories + media + partners)
// + the static stalwart-puffpuff assets used in code, upload to Supabase Storage
// bucket "site-assets", and rewrite DB columns to point at the bucket public URL.
//
// Run: node scripts/migrate-images.mjs

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const envText = readFileSync(join(__dirname, '..', '.env.local'), 'utf8')
const env = Object.fromEntries(
  envText.split('\n').filter((l) => l && !l.startsWith('#') && l.includes('=')).map((l) => {
    const i = l.indexOf('=')
    return [l.slice(0, i).trim(), l.slice(i + 1).trim()]
  })
)

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY
const BUCKET = 'site-assets'

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const sb = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } })

const STATIC_ASSETS = [
  'https://stalwart-puffpuff-744c94.netlify.app/logo.png',
  'https://stalwart-puffpuff-744c94.netlify.app/assets/hero-hands-f9VxfxAk.jpg',
  'https://stalwart-puffpuff-744c94.netlify.app/assets/child-D6VtbEtx.png',
  'https://stalwart-puffpuff-744c94.netlify.app/assets/family-celebration-BH46mSCz.jpg',
  'https://stalwart-puffpuff-744c94.netlify.app/assets/impact-horizon-KLV9X_e1.jpg',
  'https://stalwart-puffpuff-744c94.netlify.app/assets/network-future-C4ldnWew.jpg',
  'https://stalwart-puffpuff-744c94.netlify.app/assets/ceo-BmSwDvux.jpeg',
]

function publicUrl(path) {
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`
}

function pathFromUrl(url) {
  const u = new URL(url)
  let p = u.pathname.replace(/^\/+/, '')
  if (u.hostname.includes('stalwart-puffpuff')) {
    p = `legacy/${p}`
  } else if (u.hostname.includes('saveoneperson.org')) {
    p = `wp/${p.replace(/^wp-content\/uploads\//, '')}`
  } else if (u.hostname.includes('unsplash')) {
    return null // skip unsplash — keep as remote
  } else {
    p = `other/${u.hostname}/${p}`
  }
  return p.replace(/[^a-zA-Z0-9._/-]/g, '_')
}

function contentTypeFromPath(path) {
  const ext = path.toLowerCase().split('.').pop()
  return {
    jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png',
    webp: 'image/webp', avif: 'image/avif', gif: 'image/gif',
  }[ext] || 'application/octet-stream'
}

async function fetchAndUpload(srcUrl) {
  const path = pathFromUrl(srcUrl)
  if (!path) return null
  const { data: existing } = await sb.storage.from(BUCKET).list(path.split('/').slice(0, -1).join('/'), {
    search: path.split('/').pop(),
  })
  if (existing && existing.some((f) => f.name === path.split('/').pop())) {
    return publicUrl(path)
  }
  const res = await fetch(srcUrl)
  if (!res.ok) {
    console.warn(`  fetch failed ${res.status}: ${srcUrl}`)
    return null
  }
  const buf = Buffer.from(await res.arrayBuffer())
  const { error } = await sb.storage.from(BUCKET).upload(path, buf, {
    contentType: contentTypeFromPath(path),
    upsert: true,
  })
  if (error) {
    console.warn(`  upload failed: ${error.message}`)
    return null
  }
  return publicUrl(path)
}

async function migrateTable(tableName, urlColumn) {
  console.log(`\n=== ${tableName}.${urlColumn} ===`)
  const { data, error } = await sb.from(tableName).select(`id, ${urlColumn}`).not(urlColumn, 'is', null)
  if (error) {
    console.error(`  query failed: ${error.message}`)
    return
  }
  let migrated = 0
  let skipped = 0
  let failed = 0
  for (const row of data) {
    const oldUrl = row[urlColumn]
    if (oldUrl.includes('/storage/v1/object/public/') || oldUrl.startsWith('/')) {
      skipped++
      continue
    }
    process.stdout.write(`  ${tableName}.${row.id.slice(0, 8)} ... `)
    const newUrl = await fetchAndUpload(oldUrl)
    if (!newUrl) {
      failed++
      console.log('SKIP')
      continue
    }
    const { error: updateErr } = await sb.from(tableName).update({ [urlColumn]: newUrl }).eq('id', row.id)
    if (updateErr) {
      failed++
      console.log(`UPDATE FAIL: ${updateErr.message}`)
    } else {
      migrated++
      console.log('OK')
    }
  }
  console.log(`  migrated=${migrated} skipped=${skipped} failed=${failed}`)
}

async function main() {
  console.log('Static assets (legacy hero/logo/etc) → Storage…')
  for (const url of STATIC_ASSETS) {
    const newUrl = await fetchAndUpload(url)
    console.log(`  ${url.slice(-40)} → ${newUrl ? 'OK' : 'FAIL'}`)
  }

  await migrateTable('urgent_requests', 'image_url')
  await migrateTable('success_stories', 'image_url')
  await migrateTable('media_entries', 'thumbnail_url')
  await migrateTable('partners', 'logo_url')

  console.log('\nDone.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
