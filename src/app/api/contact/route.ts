import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 6
const ipHits = new Map<string, number[]>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const cutoff = now - WINDOW_MS
  const hits = (ipHits.get(ip) || []).filter((t) => t > cutoff)
  if (hits.length >= MAX_PER_WINDOW) {
    ipHits.set(ip, hits)
    return false
  }
  hits.push(now)
  ipHits.set(ip, hits)
  return true
}

function getClientIp(request: Request): string {
  const xff = request.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  return request.headers.get('x-real-ip')?.trim() || 'unknown'
}

export async function POST(request: Request) {
  const ip = getClientIp(request)
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many messages. Please try again shortly.' }, { status: 429 })
  }

  const body = await request.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 })

  // Honeypot
  if (typeof body.website === 'string' && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true }, { status: 201 })
  }

  const name = String(body.name || '').trim()
  const email = String(body.email || '').trim()
  const subject = String(body.subject || '').trim()
  const message = String(body.message || '').trim()

  if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
  if (!message) return NextResponse.json({ error: 'Message is required' }, { status: 400 })
  if (message.length > 5000) return NextResponse.json({ error: 'Message too long (5000 char max)' }, { status: 400 })

  const supabase = createAdminClient()
  const { error } = await supabase.from('contact_messages').insert({
    name: name.slice(0, 120),
    email: email.slice(0, 200),
    subject: subject.slice(0, 200) || null,
    message,
    submitted_by_public: true,
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true }, { status: 201 })
}
