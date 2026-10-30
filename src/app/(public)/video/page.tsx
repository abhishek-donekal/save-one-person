import type { Metadata } from 'next'
import Link from 'next/link'
import SharePanel from '@/components/ui/SharePanel'

const TITLE = 'Be the Miracle — Save One Person'
const DESC = 'One story shared. One living donor found. One life saved. Watch how Save One Person turns media into miracles — and share it.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: '/video' },
  openGraph: {
    type: 'video.other',
    url: 'https://www.saveonepersonnow.org/video',
    title: TITLE,
    description: DESC,
    images: [{ url: '/images/og-miracles.jpg', width: 1200, height: 630, alt: 'Miracles happen — Save One Person' }],
    videos: [{ url: 'https://www.saveonepersonnow.org/videos/save-one-person.mp4', secureUrl: 'https://www.saveonepersonnow.org/videos/save-one-person.mp4', type: 'video/mp4', width: 1920, height: 1080 }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESC, images: ['/images/og-miracles.jpg'] },
}

export default function VideoPage() {
  return (
    <section style={{ background: '#05060d', color: '#fff', padding: '120px 0 96px' }}>
      <div className="container-md" style={{ textAlign: 'center' }}>
        <div className="section-label" style={{ color: '#f2c46d' }}>Watch &amp; Share</div>
        <h1 className="display" style={{ marginTop: 12, color: '#fff' }}>
          Be the <em style={{ color: '#f2c46d' }}>miracle.</em>
        </h1>
        <p style={{ marginTop: 16, fontSize: 18, lineHeight: 1.7, color: 'rgba(255,255,255,0.78)', maxWidth: 640, marginLeft: 'auto', marginRight: 'auto' }}>
          One story shared. One living donor found. One life saved.
        </p>

        <div className="video-frame video-wide" style={{ marginTop: 40, boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }}>
          <video
            src="/videos/save-one-person.mp4"
            poster="/videos/save-one-person-poster.jpg"
            controls
            playsInline
            preload="metadata"
            title="Save One Person — Be the miracle"
            style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
          />
        </div>
        <div className="video-frame video-tall" style={{ marginTop: 40, boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }}>
          <video
            src="/videos/save-one-person-phone.mp4"
            poster="/videos/save-one-person-phone-poster.jpg"
            controls
            playsInline
            preload="none"
            title="Save One Person — Be the miracle"
            style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
          />
        </div>

        <div style={{ marginTop: 40 }}>
          <SharePanel path="/video" text="Watch and share — one story can save a life. Be the miracle. 💛" label="Share this video" dark />
        </div>

        <div style={{ marginTop: 48, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/urgent-requests" className="btn btn-emerald" style={{ padding: '14px 28px' }}>See Who Needs Help Now →</Link>
          <Link href="/donate" className="btn btn-ghost" style={{ padding: '14px 28px', borderColor: 'rgba(255,255,255,0.25)', color: '#fff' }}>Donate</Link>
        </div>
      </div>
    </section>
  )
}
