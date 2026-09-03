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

const localPath = 'D:/SaveOnePerson – Corporate Poster_files/WhatsApp e2026-07-11 at 10.22.44 PM.jpeg'
const buf = readFileSync(localPath)
const { error } = await sb.storage.from('site-assets').upload('team/cto-abhishek.jpg', buf, { contentType: 'image/jpeg', upsert: true })
console.log('team/cto-abhishek.jpg', error ? error.message : 'OK')
