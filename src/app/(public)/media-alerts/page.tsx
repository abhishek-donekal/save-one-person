import type { Metadata } from 'next'
import MediaAlertsForm from './MediaAlertsForm'

export const metadata: Metadata = {
  title: 'Weekly Save One Alerts for TV, Radio, Podcasts & Press',
  description: 'Journalists, producers and media outlets: sign up to receive Save One Alerts with urgent patient stories who need a living donor.',
  alternates: { canonical: '/media-alerts' },
}

export default function MediaAlertsPage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="section-label section-label-soft">For TV, Radio, Podcasts &amp; Press</div>
          <h1 className="display-lg">Get our weekly Save One Alerts.</h1>
          <p style={{ marginTop: 24, fontSize: 18, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>
            For TV stations, radio shows, podcasts, newspapers and online outlets. Every week we send urgent stories of patients who need a living donor, ready for you to share. One story on your air or in your pages can reach the person who saves a life.
          </p>
        </div>
      </div>
      <div className="page-content">
        <div className="container-md">
          <div style={{ background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-3xl)', padding: 'clamp(22px, 5vw, 40px)', boxShadow: 'var(--shadow-soft)' }}>
            <div className="section-label" style={{ marginBottom: 20 }}>Weekly Save One Alerts — media sign-up</div>
            <MediaAlertsForm />
          </div>
        </div>
      </div>
    </>
  )
}
