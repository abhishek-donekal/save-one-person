import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 })

  // Honeypot
  if (typeof body.website === 'string' && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true }, { status: 201 })
  }

  const email = String(body.email || '').trim().toLowerCase()
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  const supabase = createAdminClient()
  const { error } = await supabase
    .from('newsletter_subscribers')
    .upsert({ email, source: 'website' }, { onConflict: 'email', ignoreDuplicates: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Also add them to the Save One Alert list in Kit (form "Newsletter site").
  // Kit sends its own confirmation email, so only people who confirm are added.
  try {
    await fetch('https://app.kit.com/forms/10194214/subscriptions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
      body: new URLSearchParams({ email_address: email }).toString(),
      signal: AbortSignal.timeout(5000),
    })
  } catch {
    // Never let Kit problems break the website sign-up.
  }

  return NextResponse.json({ ok: true }, { status: 201 })
}
