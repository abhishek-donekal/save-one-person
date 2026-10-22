import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { FEATURED_REQUESTS } from '@/lib/featuredRequests'

export const metadata: Metadata = {
  title: 'Urgent Requests — People Who Need Help Now',
  description: 'These patients urgently need living donors and life-saving matches. Your awareness and generosity could save a life.',
}

export default async function UrgentRequestsPage() {
  const supabase = await createClient()
  const { data: dbRequests } = await supabase
    .from('urgent_requests')
    .select('*')
    .eq('published', true)
    .eq('status', 'open')
    .order('urgent', { ascending: false })
    .order('created_at', { ascending: false })

  const requests = [
    ...FEATURED_REQUESTS.filter((f) => !(dbRequests || []).some((r) => r.slug === f.slug)),
    ...(dbRequests || []),
  ]

  return (
    <>
      <div className="page-hero" style={{ background: 'linear-gradient(135deg, #7f1d1d 0%, #1c2029 100%)' }}>
        <div className="page-hero-inner">
          <div className="section-label" style={{ color: '#fca5a5' }}>Help Needed Now</div>
          <h1 className="display-lg">Urgent Requests</h1>
          <p style={{ marginTop: 24, fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
            These patients and families are waiting for a life-saving match right now. Sharing their story could change everything.
          </p>
          <div style={{ marginTop: 28, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/urgent-requests/submit" className="btn btn-emerald" style={{ padding: '14px 28px', fontSize: 14 }}>
              Post Your Urgent Need →
            </Link>
          </div>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          {requests.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🙏</div>
              <h2 className="display" style={{ fontSize: 36, marginBottom: 16 }}>No Open Requests At This Time</h2>
              <p style={{ color: 'var(--muted)', fontSize: 17 }}>
                Check back soon, or reach out to Lauren if you know someone who needs help.
              </p>
              <div style={{ marginTop: 32, display: 'flex', gap: 12, justifyContent: 'center' }}>
                <a href="mailto:Save1Person@aol.com" className="btn btn-emerald" style={{ padding: '14px 28px' }}>Contact Lauren</a>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {requests.map((req) => {
                const pct = req.donation_goal && req.donation_goal > 0
                  ? Math.min(100, Math.round((req.donation_raised / req.donation_goal) * 100))
                  : 0
                return (
                  <div key={req.id} style={{ background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-3xl)', overflow: 'hidden', boxShadow: 'var(--shadow-soft)' }}>
                    <div className={`urgent-card-grid${req.image_url ? '' : ' no-image'}`}>
                      {req.image_url && (
                        <Link href={`/urgent-requests/${req.slug}`} className="urgent-card-photo" aria-label={`Read ${req.patient_name}'s story`}>
                          <Image
                            src={req.image_url}
                            alt={req.patient_name}
                            fill
                            sizes="(max-width: 768px) 100vw, 320px"
                            style={{ objectFit: 'cover', objectPosition: 'center top' }}
                          />
                        </Link>
                      )}
                      <div className="urgent-card-body">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
                          {req.urgent && <span className="badge badge-red">Urgent</span>}
                          <span className="badge badge-blue">{req.medical_condition}</span>
                        </div>
                        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, color: 'var(--navy)', marginBottom: 12 }}>{req.patient_name}</h2>
                        <h3 style={{ fontSize: 18, color: 'var(--muted)', fontWeight: 400, marginBottom: 20 }}>{req.title}</h3>
                        <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.75, marginBottom: 24 }}>
                          {req.story_text.slice(0, 240)}…
                        </p>
                        {req.donation_goal && (
                          <div style={{ marginBottom: 24 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                              <span style={{ color: 'var(--emerald)' }}>${(req.donation_raised || 0).toLocaleString()} raised</span>
                              <span style={{ color: 'var(--muted)' }}>Goal: ${req.donation_goal.toLocaleString()}</span>
                            </div>
                            <div className="progress-bar-wrap">
                              <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
                            </div>
                            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>{pct}% funded</div>
                          </div>
                        )}
                        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                          <Link href={`/urgent-requests/${req.slug}`} className="btn btn-emerald" style={{ padding: '12px 24px', fontSize: 13 }}>
                            Read Their Story
                          </Link>
                          <a href="mailto:Save1Person@aol.com" className="btn btn-ghost" style={{ borderColor: 'var(--border)', color: 'var(--navy)', padding: '12px 24px', fontSize: 13 }}>
                            Help Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
