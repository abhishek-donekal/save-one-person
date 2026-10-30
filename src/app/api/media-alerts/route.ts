import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

// Save One Alerts sign-ups from journalists and media outlets.
// Saved to contact_messages (shows in admin Messages) and the alerts list.

const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const WINDOW_MS = 10 * 60 * 1000
const ipHits = new Map<string, number[]>()

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'
  const now = Date.now()
  const hits = (ipHits.get(ip) || []).filter((t) => t > now - WINDOW_MS)
  if (hits.length >= 5) return NextResponse.json({ error: 'Too many sign-ups. Please try again shortly.' }, { status: 429 })
  ipHits.set(ip, [...hits, now])

  const body = await request.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  if (typeof body.website === 'string' && body.website.trim()) return NextResponse.json({ ok: true }, { status: 201 })

  const name = String(body.name || '').trim().slice(0, 120)
  const email = String(body.email || '').trim().toLowerCase().slice(0, 200)
  const outlet = String(body.outlet || '').trim().slice(0, 160)
  const role = String(body.role || '').trim().slice(0, 120)
  const phone = String(body.phone || '').trim().slice(0, 40)

  if (!name) return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 })
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  if (!outlet) return NextResponse.json({ error: 'Please enter your media outlet.' }, { status: 400 })

  const supabase = createAdminClient()
  const { error } = await supabase.from('contact_messages').insert({
    name,
    email,
    subject: `Save One Alert sign-up — ${outlet}`.slice(0, 200),
    message: ['MEDIA SAVE ONE ALERT SIGN-UP', `Outlet: ${outlet}`, `Role: ${role || '—'}`, `Phone: ${phone || '—'}`].join('\n'),
    submitted_by_public: true,
  })
  if (error) return NextResponse.json({ error: 'Something went wrong. Please try again or email Save1Person@aol.com.' }, { status: 500 })

  // Also add to the alerts email list (ignore if already there).
  await supabase.from('newsletter_subscribers').upsert({ email, source: 'media' }, { onConflict: 'email', ignoreDuplicates: true })

  return NextResponse.json({ ok: true }, { status: 201 })
}
