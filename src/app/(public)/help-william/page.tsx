import type { Metadata } from 'next'
import Link from 'next/link'

const PAGE_URL = 'https://www.saveonepersonnow.org/help-william'
const STORY_PATH = '/urgent-requests/help-william-find-a-living-kidney-donor'
const WILLIAM_IMAGE = 'https://kglvtgohmfulykkspfmj.supabase.co/storage/v1/object/public/site-assets/william-banner.jpg'

export const metadata: Metadata = {
  title: 'Could You Be William’s Living Kidney Donor?',
  description:
    '3-year-old William Fritts needs a living kidney donor. Learn how you could be his donor, or share his story to help find the one person who is.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Could You Be William’s Living Kidney Donor?',
    description: '3-year-old William needs a living kidney donor. You could be his match, or share to help find who is.',
    url: PAGE_URL,
    images: [WILLIAM_IMAGE],
  },
}

const SHARE_TEXT = encodeURIComponent('3-year-old William needs a living kidney donor. Please help and share:')
const SHARE_URL = encodeURIComponent(PAGE_URL)

export default function HelpWilliamPage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="section-label section-label-soft">Urgent · Living Kidney Donor Needed</div>
          <h1 className="display-lg">Help William Find His Kidney Donor</h1>
          <p style={{ marginTop: 24, fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, maxWidth: 720 }}>
            William Fritts is 3 years old and needs a living kidney donor. You could be the person who
            gives him his childhood back. And if you&apos;re not a match, sharing his story could reach the one person who is.
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="william-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={WILLIAM_IMAGE}
                alt="William Fritts, age 3, who needs a living kidney donor"
                style={{ width: '100%', borderRadius: 'var(--r-2xl)', display: 'block' }}
              />

              <div className="section-label" style={{ marginTop: 40 }}>William&apos;s Story</div>
              <h2 className="display" style={{ marginTop: 16, maxWidth: 480 }}>A Little Boy Fighting for His Childhood</h2>
              <p style={{ marginTop: 20, fontSize: 17, color: 'var(--muted)', lineHeight: 1.85 }}>
                William was born at 30 weeks, weighing just 3 lb 13 oz. Today he has end-stage kidney disease and needs a
                living kidney donor. Nickelodeon and SNL star Madisyn Shipman is helping share his story.
              </p>
              <p style={{ marginTop: 16, fontSize: 17, color: 'var(--muted)', lineHeight: 1.85 }}>
                <Link href={STORY_PATH} style={{ color: 'var(--emerald)', fontWeight: 600 }}>Read William&apos;s full story →</Link>
                <br />
                <Link href="/blog/william-fritts-3-year-old-needs-a-living-kidney-donor" style={{ color: 'var(--emerald)', fontWeight: 600 }}>A day in William&apos;s life, and how you can help →</Link>
                <br />
                <Link href="/living-kidney-donation-myths-facts" style={{ color: 'var(--emerald)', fontWeight: 600 }}>Myth vs Fact: living kidney donation →</Link>
              </p>

              <div style={{ marginTop: 32 }}>
                <video
                  src="/videos/william-madisyn-shipman.mp4"
                  poster="/videos/william-madisyn-shipman.jpg"
                  controls
                  playsInline
                  preload="metadata"
                  style={{ width: '100%', borderRadius: 'var(--r-2xl)', background: '#000' }}
                />
                <p style={{ marginTop: 8, fontSize: 14, color: 'var(--muted)' }}>Madisyn Shipman&apos;s message about William</p>
              </div>

              <div style={{ marginTop: 40 }}>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: 'var(--navy)', marginBottom: 16 }}>How You Can Help William</h3>
                <ul className="donate-list">
                  {[
                    'Read his story and find out how to get tested as his living donor',
                    'Share his story with friends, family, your church, synagogue or workplace',
                    'You don’t have to be a match: paired exchange can still help him get a kidney',
                    'Ask your local TV station or newspaper to cover his story',
                  ].map((item) => (
                    <li key={item}><span className="check" aria-hidden="true" /><span>{item}</span></li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: 40, padding: 32, background: 'var(--secondary)', borderRadius: 'var(--r-2xl)' }}>
                <div className="section-label" style={{ marginBottom: 8 }}>Not Able to Be a Donor?</div>
                <p style={{ fontSize: 15, color: 'var(--muted)', marginBottom: 16, lineHeight: 1.7 }}>
                  You don&apos;t have to be a match to help. Sharing William&apos;s story could reach the one person who is.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                  <a className="btn btn-emerald" href={`https://www.facebook.com/sharer/sharer.php?u=${SHARE_URL}`} target="_blank" rel="noopener noreferrer">Share on Facebook</a>
                  <a className="btn btn-outline-dark" href={`https://twitter.com/intent/tweet?text=${SHARE_TEXT}&url=${SHARE_URL}`} target="_blank" rel="noopener noreferrer">Share on X</a>
                  <a className="btn btn-outline-dark" href={`mailto:?subject=${encodeURIComponent('Please help William')}&body=${SHARE_TEXT}%20${SHARE_URL}`}>Email a Friend</a>
                  <Link className="btn btn-outline-dark" href="/ready-to-help">Not a Match? Join the Ready to Help List</Link>
                </div>
              </div>
            </div>

            <div style={{ position: 'sticky', top: 96 }}>
              <div style={{ padding: 32, background: 'var(--grad-navy)', borderRadius: 'var(--r-2xl)', color: 'white' }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--emerald-soft)', marginBottom: 8 }}>William Needs a Living Kidney Donor</div>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: 34, lineHeight: 1.15 }}>Could You Be His Donor?</div>
                <p style={{ marginTop: 12, fontSize: 15, color: 'rgba(255,255,255,0.85)', lineHeight: 1.7 }}>
                  Learn how living kidney donation works and how to get tested to help William.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 20 }}>
                  <Link className="btn btn-emerald" href={STORY_PATH}>How to Be William&apos;s Donor →</Link>
                  <Link className="btn btn-ghost" href="/become-a-donor">Learn About Living Donation</Link>
                  <a className="btn btn-ghost" href={`https://www.facebook.com/sharer/sharer.php?u=${SHARE_URL}`} target="_blank" rel="noopener noreferrer">Share His Story</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .william-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
