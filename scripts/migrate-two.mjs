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
  { url: 'https://saveoneperson.org/wp-content/uploads/2025/03/Simon-Jacobson-Advisor-and-Mentor-Save-One-Person_square.jpg', path: 'wp/2025/03/Simon-Jacobson.jpg' },
  { url: 'https://saveoneperson.org/wp-content/uploads/2025/03/Speaker-Author-Loren-Slocum-Lahav-Live-On-Stage-Official-Photo-03.png', path: 'wp/2025/03/Loren-Lahav.png' },
]

for (const t of targets) {
  const res = await fetch(t.url)
  const buf = Buffer.from(await res.arrayBuffer())
  const ct = t.url.endsWith('.png') ? 'image/png' : 'image/jpeg'
  const { error } = await sb.storage.from('site-assets').upload(t.path, buf, { contentType: ct, upsert: true })
  console.log(t.path, error ? error.message : 'OK')
}
