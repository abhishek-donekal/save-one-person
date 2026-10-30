import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

// "Be a Donor" sign-ups. Stored in contact_messages so they appear in the
// admin dashboard's Messages page with a clear "Donor sign-up" subject.

const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const WAYS = ['Kidney', 'Liver', 'Bone marrow / stem cells', 'Not sure yet'] as const
const BLOOD = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', "Don't know"] as const

const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const ipHits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const hits = (ipHits.get(ip) || []).filter((t) => t > now - WINDOW_MS)
  if (hits.length >= MAX_PER_WINDOW) {
    ipHits.set(ip, hits)
    return true
  }
  hits.push(now)
  ipHits.set(ip, hits)
  return false
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || request.headers.get('x-real-ip') || 'unknown'
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Too many sign-ups from this connection. Please try again shortly.' }, { status: 429 })
  }

  const body = await request.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 })

  // Honeypot
  if (typeof body.website === 'string' && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true }, { status: 201 })
  }

  const name = String(body.name || '').trim().slice(0, 120)
  const email = String(body.email || '').trim().slice(0, 200)
  const phone = String(body.phone || '').trim().slice(0, 40)
  const location = String(body.location || '').trim().slice(0, 120)
  const bloodType = BLOOD.includes(body.bloodType) ? String(body.bloodType) : "Don't know"
  const ways = Array.isArray(body.ways) ? body.ways.filter((w: unknown) => WAYS.includes(w as (typeof WAYS)[number])) : []
  const note = String(body.note || '').trim().slice(0, 2000)
  const adult = body.adult === true
  const contactOk = body.contactOk === true

  if (!name) return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 })
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  if (ways.length === 0) return NextResponse.json({ error: 'Please choose how you might like to help.' }, { status: 400 })
  if (!adult) return NextResponse.json({ error: 'Living donors must be 18 or older.' }, { status: 400 })
  if (!contactOk) return NextResponse.json({ error: 'Please confirm we may contact you.' }, { status: 400 })

  const message = [
    'DONOR SIGN-UP',
    `Willing to consider: ${ways.join(', ')}`,
    `Blood type: ${bloodType}`,
    `Phone: ${phone || '—'}`,
    `Location: ${location || '—'}`,
    'Confirmed 18 or older: yes',
    'Agreed to be contacted about people who need a donor: yes',
    note ? `\nNote from them:\n${note}` : '',
  ].filter(Boolean).join('\n')

  const supabase = createAdminClient()
  const { error } = await supabase.from('contact_messages').insert({
    name,
    email,
    subject: `Donor sign-up — ${ways.join(', ')}`.slice(0, 200),
    message,
    submitted_by_public: true,
  })

  if (error) return NextResponse.json({ error: 'Something went wrong saving your sign-up. Please try again or email Save1Person@aol.com.' }, { status: 500 })
  return NextResponse.json({ ok: true }, { status: 201 })
}
