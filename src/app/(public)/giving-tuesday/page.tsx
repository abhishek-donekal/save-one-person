import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SharePanel from '@/components/ui/SharePanel'
import NewsletterSignup from '@/components/layout/NewsletterSignup'
import { ORG_EIN } from '@/lib/org'

const PAGE_URL = 'https://www.saveonepersonnow.org/giving-tuesday'
const FOUNDER_PHOTO =
  'https://kglvtgohmfulykkspfmj.supabase.co/storage/v1/object/public/site-assets/legacy/assets/ceo-BmSwDvux.jpeg'
const TITLE = 'Giving Tuesday: Help Us Save One More Life'
const DESCRIPTION =
  'This Giving Tuesday, Tuesday, December 1, 2026, give to Save One Person. Your tax-deductible gift helps us share the stories of people who need living organ donors and bone marrow matches, so the person who can save them finds out.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'This Giving Tuesday, help us save one more life',
    description:
      'Give to Save One Person on Giving Tuesday, Dec 1. Your tax-deductible gift turns media into miracles.',
    url: PAGE_URL,
    images: ['/images/og-miracles.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'This Giving Tuesday, help us save one more life',
    description: 'Give to Save One Person on Giving Tuesday, Dec 1. Every gift is tax-deductible.',
    images: ['/images/og-miracles.jpg'],
  },
}

// What a gift pays for: the same list shown on /donate.
const GIFT_DOES = [
  { title: 'Gets a story on the air', body: 'Media outreach and TV pitches, so a patient’s story reaches TV, radio, podcasts and newspapers.' },
  { title: 'Tells the story well', body: 'Storytelling and content production: the videos, posts and articles people share.' },
  { title: 'Keeps the stories online', body: 'Technology and digital platforms, like this website and our weekly Save One Alert.' },
  { title: 'Teaches and inspires', body: 'Community education and awareness, including our weekly Health Hacks on prevention.' },
  { title: 'Supports families', body: 'Direct patient support and coordination while families search for a match.' },
]

export default function GivingTuesdayPage() {
  return (
    <div className="gt-page">
      {/* ── HERO ── */}
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="section-label section-label-soft">Giving Tuesday · Tuesday, December 1, 2026</div>
          <h1 className="display-lg">This Giving Tuesday, help us save one more life.</h1>
          <p style={{ marginTop: 24, fontSize: 18, lineHeight: 1.7 }}>
            Every week, Save One Person shares the stories of people who need living organ donors, bone marrow
            matches and other medical miracles, so the person who can save them finds out. Your gift keeps those
            stories going.
          </p>
          <div style={{ marginTop: 32, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/donate" className="btn btn-emerald gt-hero-btn">Donate to Save One Person →</Link>
          </div>
          <p style={{ marginTop: 16, fontSize: 14 }}>
            Save One Person Inc. is a 501(c)(3) nonprofit, EIN {ORG_EIN}. Your gift is tax-deductible.
          </p>
        </div>
      </div>

      <div className="page-content">
        {/* ── WHAT WE DO ── */}
        <div className="container">
          <div className="gt-grid">
            <div className="gt-photo">
              <Image
                src={FOUNDER_PHOTO}
                alt="Lauren Finkelstein, founder and CEO of Save One Person"
                fill
                sizes="(max-width: 900px) 100vw, 480px"
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
              />
            </div>
            <div>
              <div className="section-label">What Save One Person Does</div>
              <h2 className="display" style={{ marginTop: 12 }}>We turn media into miracles.</h2>
              <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 16, fontSize: 17, lineHeight: 1.8, color: 'var(--muted)' }}>
                <p>
                  Lauren Finkelstein founded Save One Person to bridge a gap she saw firsthand: there are people who
                  would step forward to save a life if they only knew someone needed them.
                </p>
                <p>
                  Through television, radio, podcasts, social media and our website, we share the stories of patients
                  searching for living kidney donors, living liver donors, bone marrow matches and other life-saving
                  medical miracles.
                </p>
                <p style={{ fontWeight: 600, color: 'var(--navy)' }}>
                  One story can reach millions. One introduction can save a life.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── WHAT YOUR GIFT DOES ── */}
        <div className="container" style={{ marginTop: 96 }}>
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
            <div className="section-label">What Your Gift Does</div>
            <h2 className="display" style={{ marginTop: 12 }}>Your gift helps a story find the person who can save a life.</h2>
            <p style={{ marginTop: 16, fontSize: 17, lineHeight: 1.8, color: 'var(--muted)' }}>
              Any amount helps. Your Giving Tuesday gift to Save One Person pays for:
            </p>
          </div>
          <div className="gt-cards">
            {GIFT_DOES.map((g) => (
              <div key={g.title} className="gt-card">
                <h3>{g.title}</h3>
                <p>{g.body}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 40, textAlign: 'center' }}>
            <Link href="/donate" className="btn btn-emerald gt-hero-btn">Give on Giving Tuesday →</Link>
            <p style={{ marginTop: 14, fontSize: 14, color: 'var(--muted)' }}>
              Secure checkout: PayPal, credit/debit card, Apple Pay or Google Pay. You get a receipt for your records.
            </p>
          </div>
        </div>

        {/* ── SHARE ── */}
        <div className="container-md" style={{ marginTop: 96 }}>
          <div className="gt-panel">
            <h2 className="display" style={{ fontSize: 30, textAlign: 'center' }}>Can&apos;t give today? Share this page.</h2>
            <p style={{ marginTop: 12, marginBottom: 24, textAlign: 'center', fontSize: 16, color: 'var(--muted)', lineHeight: 1.7 }}>
              Every share helps more people hear about Save One Person this Giving Tuesday.
            </p>
            <SharePanel
              path="/giving-tuesday"
              text="This Giving Tuesday, help Save One Person save one more life. 💛"
              label="Share Giving Tuesday"
            />
          </div>
        </div>

        {/* ── SAVE ONE ALERT ── */}
        <div className="container-md" style={{ marginTop: 48 }}>
          <div className="gt-panel">
            <div className="section-label" style={{ textAlign: 'center' }}>Save One Alert</div>
            <h2 className="display" style={{ marginTop: 12, fontSize: 30, textAlign: 'center' }}>Get our weekly Save One Alert</h2>
            <p style={{ marginTop: 12, marginBottom: 24, textAlign: 'center', fontSize: 16, color: 'var(--muted)', lineHeight: 1.7 }}>
              Urgent patient stories, success stories and health tips, once a week in your inbox.
            </p>
            <div style={{ maxWidth: 520, margin: '0 auto' }}>
              <NewsletterSignup tone="light" />
            </div>
          </div>
        </div>

        {/* ── A DIFFERENT KIND OF GIFT (living donor, not money) ── */}
        <div className="container-md" style={{ marginTop: 48 }}>
          <div className="gt-panel gt-panel-soft">
            <div className="section-label" style={{ textAlign: 'center' }}>A Different Kind of Gift</div>
            <h2 className="display" style={{ marginTop: 12, fontSize: 28, textAlign: 'center' }}>
              3-year-old William needs a living kidney donor. Could it be you?
            </h2>
            <p style={{ marginTop: 12, textAlign: 'center', fontSize: 16, color: 'var(--muted)', lineHeight: 1.7 }}>
              William isn&apos;t asking for money. He needs a person. Learn how you could be his donor, or share
              his story to help find the one person who is.
            </p>
            <div style={{ marginTop: 20, textAlign: 'center' }}>
              <Link href="/help-william" className="btn btn-navy">Could you be William&apos;s donor? →</Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── STICKY DONATE BAR (always visible) ── */}
      <div className="gt-sticky" role="region" aria-label="Donate">
        <span className="gt-sticky-text">Giving Tuesday · Dec 1 · Tax-deductible</span>
        <Link href="/donate" className="btn btn-emerald gt-sticky-btn">Donate Now →</Link>
      </div>

      <style>{`
        .gt-page { padding-bottom: 88px; }
        .gt-hero-btn { padding: 18px 36px; font-size: 17px; }
        .gt-grid { display: grid; grid-template-columns: 480px 1fr; gap: 64px; align-items: center; }
        .gt-photo { position: relative; aspect-ratio: 4 / 5; border-radius: var(--r-3xl); overflow: hidden; box-shadow: var(--shadow-soft); background: var(--secondary); }
        .gt-cards { margin-top: 40px; display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 16px; }
        .gt-card { padding: 24px; border: 1.5px solid var(--border); border-top: 4px solid var(--emerald); border-radius: var(--r-xl); background: var(--white); }
        .gt-card h3 { margin-top: 0; font-family: 'Fraunces', serif; font-size: 20px; color: var(--navy); }
        .gt-card p { margin-top: 8px; font-size: 15px; line-height: 1.65; color: var(--muted); }
        .gt-panel { padding: 40px 32px; border: 1.5px solid var(--border); border-radius: var(--r-2xl); background: var(--white); }
        .gt-panel-soft { background: var(--secondary); }
        .gt-sticky {
          position: fixed; left: 50%; bottom: 16px; transform: translateX(-50%); z-index: 900;
          display: flex; align-items: center; gap: 16px; padding: 10px 10px 10px 22px;
          background: var(--navy); color: #fff; border-radius: 9999px; box-shadow: 0 10px 30px rgba(0,0,0,0.25);
          width: max-content; max-width: calc(100vw - 24px);
        }
        .gt-sticky-text { font-size: 14px; font-weight: 600; white-space: nowrap; }
        .gt-sticky-btn { padding: 12px 24px; font-size: 15px; white-space: nowrap; }
        @media (max-width: 900px) {
          .gt-grid { grid-template-columns: 1fr; gap: 32px; }
          .gt-photo { max-width: 420px; width: 100%; margin: 0 auto; }
        }
        @media (max-width: 600px) {
          .gt-sticky { left: 0; right: 0; bottom: 0; transform: none; width: auto; max-width: none; border-radius: 0; padding: 10px 16px calc(10px + env(safe-area-inset-bottom)); justify-content: space-between; gap: 10px; }
          .gt-sticky-text { font-size: 12px; white-space: normal; }
          .gt-sticky-btn { flex-shrink: 0; }
          .gt-panel { padding: 28px 20px; }
        }
      `}</style>
    </div>
  )
}
