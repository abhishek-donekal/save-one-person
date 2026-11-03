import type { Metadata } from 'next'
import ShortsGrid from './ShortsGrid'
import { HEALTH_HACKS, YOUTUBE_CHANNEL } from '@/lib/healthHacks'

export const metadata: Metadata = {
  title: 'Health Hacks',
  description: 'Short videos from Lauren Finkelstein on healthy living, mind, body and faith.',
  alternates: { canonical: '/health-hacks' },
}

export default function HealthHacksPage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="section-label section-label-soft">Health Hacks</div>
          <h1 className="display-lg">Small habits. Big <em style={{ color: '#a8740f' }}>miracles.</em></h1>
          <p style={{ marginTop: 24, fontSize: 18, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>
            Quick videos from Lauren on healthy habits, food, mind, body and faith. Tap any video to watch.
          </p>
        </div>
      </div>
      <div className="page-content">
        <div className="container">
          <ShortsGrid shorts={HEALTH_HACKS} />
          <div style={{ marginTop: 48, textAlign: 'center' }}>
            <a href={YOUTUBE_CHANNEL} target="_blank" rel="noopener noreferrer" className="btn btn-emerald" style={{ padding: '16px 30px', fontSize: 14 }}>
              See More on YouTube →
            </a>
          </div>
          <p style={{ marginTop: 28, fontSize: 13, color: 'var(--muted)', textAlign: 'center', maxWidth: 640, marginLeft: 'auto', marginRight: 'auto' }}>
            These videos share personal experience and are not medical advice. Please talk with your doctor before making changes to your health.
          </p>
        </div>
      </div>
    </>
  )
}
