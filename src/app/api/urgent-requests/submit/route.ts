import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
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
  if (ipHits.size > 5000) {
    for (const [k, v] of ipHits) {
      if (v.every((t) => t < cutoff)) ipHits.delete(k)
    }
  }
  return true
}

function getClientIp(request: Request): string {
  const xff = request.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  const real = request.headers.get('x-real-ip')
  if (real) return real.trim()
  return 'unknown'
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60)
}

export async function POST(request: Request) {
  const ip = getClientIp(request)
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many submissions. Please try again in 10 minutes.' },
      { status: 429 }
    )
  }

  const body = await request.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 })

  if (typeof body.website === 'string' && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true, id: 'silent-drop' }, { status: 201 })
  }

  const required = ['patient_name', 'medical_condition', 'story_text', 'submitter_email']
  for (const f of required) {
    if (!body[f] || typeof body[f] !== 'string' || !body[f].trim()) {
      return NextResponse.json({ error: `Missing field: ${f}` }, { status: 400 })
    }
  }

  if (!EMAIL_RE.test(body.submitter_email.trim())) {
    return NextResponse.json({ error: 'Invalid submitter email format' }, { status: 400 })
  }

  if (body.contact_email && !EMAIL_RE.test(body.contact_email.trim())) {
    return NextResponse.json({ error: 'Invalid contact email format' }, { status: 400 })
  }

  if (body.story_text.length > 8000) {
    return NextResponse.json({ error: 'Story too long (8000 char max)' }, { status: 400 })
  }

  if (body.patient_name.length > 120) {
    return NextResponse.json({ error: 'Patient name too long (120 char max)' }, { status: 400 })
  }

  const base = slugify(body.patient_name)
  if (!base) {
    return NextResponse.json({ error: 'Patient name must contain letters or numbers' }, { status: 400 })
  }
  const suffix = Math.random().toString(36).slice(2, 8)
  const slug = `${base}-${suffix}`

  const insert = {
    patient_name: body.patient_name.trim(),
    title: (body.title || `${body.patient_name.trim()} needs help`).slice(0, 200),
    slug,
    medical_condition: body.medical_condition.trim(),
    story_text: body.story_text.trim(),
    image_url: body.image_url?.trim() || null,
    contact_email: body.contact_email?.trim() || null,
    contact_phone: body.contact_phone?.trim() || null,
    social_facebook: body.social_facebook?.trim() || null,
    social_instagram: body.social_instagram?.trim() || null,
    social_twitter: body.social_twitter?.trim() || null,
    social_other: body.social_other?.trim() || null,
    gofundme_url: body.gofundme_url?.trim() || null,
    relationship_to_patient: body.relationship_to_patient?.trim() || null,
    submitter_email: body.submitter_email.trim(),
    submitted_by_public: true,
    submission_status: 'pending',
    published: false,
    status: 'open',
    urgent: false,
  }

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('urgent_requests')
    .insert(insert)
    .select('id, slug')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true, id: data.id }, { status: 201 })
}
