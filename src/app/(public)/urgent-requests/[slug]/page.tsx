import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getFeaturedRequest } from '@/lib/featuredRequests'
import SharePanel from '@/components/ui/SharePanel'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: dbData } = await supabase
    .from('urgent_requests')
    .select('title, patient_name, medical_condition, image_url')
    .eq('slug', slug)
    .single()
  const data = dbData ?? getFeaturedRequest(slug)

  return {
    title: data?.title || 'Urgent Request',
    description: data ? `${data.patient_name} urgently needs help with ${data.medical_condition}.` : undefined,
    openGraph: data ? {
      title: data.title,
      description: `${data.patient_name} urgently needs a living donor. Please read and share — one share could reach the person who saves a life.`,
      url: `https://www.saveonepersonnow.org/urgent-requests/${slug}`,
      images: data.image_url ? [{ url: data.image_url }] : ['/images/og-miracles.jpg'],
    } : undefined,
  }
}

const DONATE_URL = '/donate'

export default async function UrgentRequestPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: dbReq } = await supabase
    .from('urgent_requests')
    .select('*')
    .eq('slug', slug)
    .single()
  const req = dbReq ?? getFeaturedRequest(slug)

  if (!req || !req.published || req.submission_status === 'pending') notFound()

  const paragraphs = req.story_text.split('\n\n').filter(Boolean)
  const pct = req.donation_goal && req.donation_goal > 0
    ? Math.min(100, Math.round((req.donation_raised / req.donation_goal) * 100))
    : 0

  return (
    <>
      <div className="page-hero" style={{ background: 'linear-gradient(135deg, #7f1d1d 0%, #1c2029 100%)' }}>
        <div className="page-hero-inner">
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 16 }}>
            {req.urgent && <span className="badge badge-red">Urgent</span>}
            <span className="badge badge-blue">{req.medical_condition}</span>
          </div>
          <h1 className="display-lg" style={{ fontSize: 'clamp(36px,6vw,72px)' }}>{req.patient_name}</h1>
          <p style={{ marginTop: 12, fontSize: 20, color: 'rgba(255,255,255,0.75)' }}>{req.title}</p>
        </div>
      </div>

      <div className="page-content">
        <div className="container-md">
          {req.image_url && (
            <div style={{ borderRadius: 'var(--r-3xl)', overflow: 'hidden', marginBottom: 48, boxShadow: 'var(--shadow-soft)' }}>
              <Image
                src={req.image_url}
                alt={req.patient_name}
                width={896}
                height={560}
                sizes="(max-width: 896px) 100vw, 896px"
                style={{ width: '100%', height: 'auto', maxHeight: 560, objectFit: 'cover', objectPosition: 'center top' }}
              />
            </div>
          )}

          {req.donation_goal && (
            <div style={{ background: 'var(--secondary)', borderRadius: 'var(--r-2xl)', padding: 32, marginBottom: 48 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <div>
                  <div className="section-label" style={{ marginBottom: 4 }}>Amount Raised</div>
                  <div style={{ fontFamily: "'Fraunces', serif", fontSize: 36, color: 'var(--emerald)' }}>${(req.donation_raised || 0).toLocaleString()}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="section-label" style={{ marginBottom: 4 }}>Goal</div>
                  <div style={{ fontFamily: "'Fraunces', serif", fontSize: 36, color: 'var(--navy)' }}>${req.donation_goal.toLocaleString()}</div>
                </div>
              </div>
              <div className="progress-bar-wrap">
                <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
              </div>
              <p style={{ marginTop: 8, fontSize: 13, color: 'var(--muted)' }}>{pct}% of goal reached</p>
              <a href={DONATE_URL} className="btn btn-emerald" style={{ marginTop: 20, padding: '14px 28px', fontSize: 14 }}>
                Donate to Help {req.patient_name}
              </a>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontSize: 18, lineHeight: 1.85, color: 'rgba(28,32,41,0.85)' }}>
            {paragraphs.map((para: string, i: number) => <p key={i}>{para}</p>)}
          </div>

          <div style={{ marginTop: 40, padding: '28px 24px', borderRadius: 'var(--r-3xl)', background: 'var(--background)', border: '1.5px solid var(--border)' }}>
            <SharePanel
              path={`/urgent-requests/${slug}`}
              text={`${req.patient_name} needs a living donor. Please read and share — you could reach the person who saves a life. 💛`}
              label={`Share ${req.patient_name}'s story`}
            />
          </div>

          {(req.contact_email || req.contact_phone || req.social_facebook || req.social_instagram || req.social_twitter || req.social_other || req.gofundme_url) && (
            <div style={{ marginTop: 48, padding: 32, background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-2xl)' }}>
              <div className="section-label" style={{ marginBottom: 12 }}>Reach {req.patient_name} Directly</div>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, color: 'var(--navy)', marginBottom: 20 }}>Contact &amp; Social Links</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
                {req.contact_email && (
                  <a href={`mailto:${req.contact_email}`} className="btn btn-navy" style={{ padding: '12px 18px', fontSize: 13, justifyContent: 'flex-start' }}>
                    ✉  {req.contact_email}
                  </a>
                )}
                {req.contact_phone && (
                  <a href={`tel:${req.contact_phone.replace(/[^\d+]/g, '')}`} className="btn btn-navy" style={{ padding: '12px 18px', fontSize: 13, justifyContent: 'flex-start' }}>
                    ☎  {req.contact_phone}
                  </a>
                )}
                {req.social_facebook && (
                  <a href={req.social_facebook} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ borderColor: 'var(--border)', color: 'var(--navy)', padding: '12px 18px', fontSize: 13, justifyContent: 'flex-start' }}>
                    Facebook →
                  </a>
                )}
                {req.social_instagram && (
                  <a href={req.social_instagram} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ borderColor: 'var(--border)', color: 'var(--navy)', padding: '12px 18px', fontSize: 13, justifyContent: 'flex-start' }}>
                    Instagram →
                  </a>
                )}
                {req.social_twitter && (
                  <a href={req.social_twitter} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ borderColor: 'var(--border)', color: 'var(--navy)', padding: '12px 18px', fontSize: 13, justifyContent: 'flex-start' }}>
                    Twitter / X →
                  </a>
                )}
                {req.gofundme_url && (
                  <a href={req.gofundme_url} target="_blank" rel="noopener noreferrer" className="btn btn-emerald" style={{ padding: '12px 18px', fontSize: 13, justifyContent: 'flex-start' }}>
                    GoFundMe →
                  </a>
                )}
                {req.social_other && (
                  <a href={req.social_other} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ borderColor: 'var(--border)', color: 'var(--navy)', padding: '12px 18px', fontSize: 13, justifyContent: 'flex-start' }}>
                    More →
                  </a>
                )}
              </div>
            </div>
          )}

          <div style={{ marginTop: 64, padding: 40, background: 'var(--grad-navy)', borderRadius: 'var(--r-3xl)', color: 'white', textAlign: 'center' }}>
            <div className="section-label section-label-soft">Take Action</div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 32, marginTop: 12, marginBottom: 16 }}>Help {req.patient_name} Today</h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', marginBottom: 32 }}>Share this story, make a donation, or reach out to Lauren to discuss how you can help directly.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={DONATE_URL} className="btn btn-emerald" style={{ padding: '14px 28px' }}>Donate Now</a>
              <a href="mailto:Save1Person@aol.com" className="btn btn-ghost" style={{ padding: '14px 28px' }}>Contact Lauren</a>
            </div>
          </div>

          <div style={{ marginTop: 40 }}>
            <Link href="/urgent-requests" style={{ fontSize: 14, fontWeight: 600, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
              ← All Urgent Requests
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
