import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Donate — Help Save a Life',
  description: 'Your tax-deductible donation to Save One Person funds media outreach, storytelling, and technology that connects patients with life-saving donors.',
}

const DONATE_URL =
  'https://save-one-person.myshopify.com/collections/all/products/save-one-person-tax-deductible-donation'

const TIERS = [
  { amount: '$25', impact: 'Helps share one story on social media, reaching hundreds of potential donors.' },
  { amount: '$50', impact: 'Funds email outreach to media contacts for one patient story.' },
  { amount: '$100', impact: 'Contributes to a radio segment that could reach thousands of listeners.' },
  { amount: '$250', impact: 'Helps produce a video story that can go viral and reach millions.' },
  { amount: '$500', impact: 'Supports a TV pitch that could land a national news segment.' },
  { amount: '$1,000+', impact: 'A major gift that funds our technology and expands our entire operation.' },
]

export default function DonatePage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="section-label section-label-soft">Tax-Deductible</div>
          <h1 className="display-lg">Donate</h1>
          <p style={{ marginTop: 24, fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
            Every dollar you give helps Save One Person reach more people, share more stories, and create more life-saving connections.
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
            {/* Left */}
            <div>
              <div className="section-label">Your Impact</div>
              <h2 className="display" style={{ marginTop: 16, maxWidth: 480 }}>Every Dollar Funds Life-Saving Work</h2>
              <p style={{ marginTop: 24, fontSize: 17, color: 'var(--muted)', lineHeight: 1.85 }}>
                Save One Person is a 501(c)(3) nonprofit organization. All donations are tax-deductible. Your contribution directly funds:
              </p>
              <ul className="donate-list" style={{ marginTop: 32 }}>
                {['Media outreach and TV pitches', 'Storytelling and content production', 'Technology and digital platforms', 'Community education and awareness', 'Direct patient support and coordination'].map((item) => (
                  <li key={item}><span className="check" aria-hidden="true" /><span>{item}</span></li>
                ))}
              </ul>

              <div style={{ marginTop: 48, padding: 32, background: 'var(--secondary)', borderRadius: 'var(--r-2xl)' }}>
                <div className="section-label" style={{ marginBottom: 8 }}>Questions?</div>
                <p style={{ fontSize: 15, color: 'var(--muted)', marginBottom: 16 }}>
                  Contact Lauren directly to discuss major gifts or other ways to contribute.
                </p>
                <a href="mailto:Save1Person@aol.com" style={{ fontSize: 14, fontWeight: 600, color: 'var(--emerald)' }}>Save1Person@aol.com</a>
              </div>
            </div>

            {/* Right */}
            <div>
              <div style={{ background: 'var(--grad-navy)', borderRadius: 'var(--r-3xl)', padding: 48, color: 'white', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -64, right: -64, width: 224, height: 224, borderRadius: '50%', background: 'rgba(0,142,64,0.30)', filter: 'blur(64px)', pointerEvents: 'none' }} />
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--emerald-soft)', marginBottom: 8 }}>Make a Difference Today</div>
                <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 36, marginBottom: 20, textWrap: 'balance' }}>Help Send the Next Story to the Right Person</h2>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', marginBottom: 32, lineHeight: 1.75 }}>
                  Click below to make a secure, tax-deductible donation. Every amount makes a real difference in someone&apos;s life.
                </p>
                <a href={DONATE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-emerald" style={{ padding: '18px 40px', fontSize: 15, letterSpacing: '0.14em', display: 'block', textAlign: 'center', width: '100%', justifyContent: 'center' }}>
                  Donate Now — Secure Checkout
                </a>
                <p style={{ marginTop: 16, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.40)', textAlign: 'center' }}>
                  501(c)(3) Nonprofit — Tax-Deductible
                </p>
              </div>

              <div style={{ marginTop: 32 }}>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: 'var(--navy)', marginBottom: 20 }}>What Your Donation Does</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {TIERS.map((tier) => (
                    <div key={tier.amount} style={{ display: 'flex', gap: 16, padding: 16, border: '1.5px solid var(--border)', borderRadius: 'var(--r-xl)', background: 'var(--white)' }}>
                      <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, color: 'var(--emerald)', fontWeight: 600, flexShrink: 0, minWidth: 64 }}>{tier.amount}</div>
                      <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.65 }}>{tier.impact}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
