// Crawl old-site media article pages, extract body text + embedded video,
// set slug/body/video_url/source_url on each media_entries row so every media
// item is viewable in-house on the new site (no bounce to old website).
//
// Run: node scripts/populate-media.mjs

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
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } })

function slugify(text) {
  return text.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-').slice(0, 70)
}

function decodeEntities(s) {
  return s
    .replace(/&#8217;|&#039;|&#39;/g, "'").replace(/&#8216;/g, "'")
    .replace(/&#8220;|&#8221;/g, '"').replace(/&#8211;|&#8212;/g, '-')
    .replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"')
    .replace(/&#160;/g, ' ').replace(/&hellip;/g, '…')
}

function ytId(url) {
  const m = (url || '').match(/(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/)
  return m ? m[1] : null
}

// Junk paragraph filters (WordPress theme boilerplate that appears on every page)
const JUNK = [
  /sorry, this product is unavailable/i,
  /please add some widget/i,
  /your email address will not be published/i,
  /required fields are marked/i,
  /secure online donation platform/i,
  /save your name, email/i,
  /this site uses akismet/i,
  /leave a (reply|comment)/i,
  /^\s*(comment|name|email|website|save one person|save1person|www\.)/i,
  /join the list/i,
  /subscribe/i,
]

async function extractArticle(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } })
  if (!res.ok) return { body: null, video: null }
  const html = await res.text()

  // Embedded video (youtube)
  let video = null
  const yt = html.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/)
  if (yt && yt[1] !== 'ZEF9VNqnK-M') video = `https://www.youtube.com/watch?v=${yt[1]}`

  // Paragraphs
  const paras = []
  const re = /<p\b[^>]*>([\s\S]*?)<\/p>/gi
  let m
  while ((m = re.exec(html)) !== null) {
    let txt = decodeEntities(m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim())
    if (txt.length < 40) continue
    if (JUNK.some((r) => r.test(txt))) continue
    if (paras.includes(txt)) continue
    paras.push(txt)
    if (paras.length >= 12) break
  }
  const body = paras.length ? paras.join('\n\n') : null
  return { body, video }
}

async function main() {
  const { data: rows, error } = await sb.from('media_entries').select('id, title, url, media_type, slug')
  if (error) { console.error(error.message); process.exit(1) }

  const usedSlugs = new Set()
  for (const r of rows) {
    let slug = r.slug || slugify(r.title)
    let base = slug, n = 2
    while (usedSlugs.has(slug)) { slug = `${base}-${n++}` }
    usedSlugs.add(slug)

    const isYouTube = !!ytId(r.url)
    const isOldSite = /saveoneperson\.org/.test(r.url || '')

    let body = null
    let video = isYouTube ? r.url : null
    let source_url = null

    if (isYouTube) {
      source_url = r.url // external youtube
    } else if (isOldSite) {
      process.stdout.write(`crawl ${slug} ... `)
      const ext = await extractArticle(r.url)
      body = ext.body
      if (ext.video) video = ext.video
      source_url = null // keep in-house; do not link back to old site
      console.log(body ? `body ${body.length}c${ext.video ? ' +video' : ''}` : 'no body')
    } else {
      // External non-youtube (e.g. tonyrobbins.com) — keep as external source link
      source_url = r.url
    }

    const { error: upErr } = await sb.from('media_entries')
      .update({ slug, body, video_url: video, source_url })
      .eq('id', r.id)
    if (upErr) console.log(`  UPDATE FAIL ${slug}: ${upErr.message}`)
  }
  console.log('Done.')
}

main().catch((e) => { console.error(e); process.exit(1) })
