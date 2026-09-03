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

const targets = [
  { url: 'https://saveoneperson.org/wp-content/uploads/2025/03/media2.wptv_.com__photo_2012_06_13_robin_roberts_20120613080642_320_240.jpg', path: 'wp/2025/03/robin-roberts.jpg' },
  { url: 'https://saveoneperson.org/wp-content/uploads/2025/03/images_meandy-627x376-1.jpg', path: 'wp/2025/03/andy-garcia.jpg' },
]

for (const t of targets) {
  const res = await fetch(t.url)
  if (!res.ok) { console.log(t.path, 'FETCH FAIL', res.status); continue }
  const buf = Buffer.from(await res.arrayBuffer())
  const { error } = await sb.storage.from('site-assets').upload(t.path, buf, { contentType: 'image/jpeg', upsert: true })
  console.log(t.path, error ? error.message : 'OK')
}
