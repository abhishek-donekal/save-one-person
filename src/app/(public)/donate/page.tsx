import type { Metadata } from 'next'
import { ORG_EIN } from '@/lib/org'
import DonateForm from './DonateForm'

export const metadata: Metadata = {
  title: 'Donate — Help Save a Life',
  description: 'Your tax-deductible donation to Save One Person funds media outreach, storytelling, and technology that connects patients with life-saving donors. Secure checkout — PayPal, cards, Apple & Google Pay.',
}

const TIERS = [
  { amount: '$25', impact: 'Helps share one story on social media, reaching hundreds of potential donors.' },
  { amount: '$50', impact: 'Funds email outreach to media contacts for one patient story.' },
  { amount: '$100', impact: 'Contributes to a radio segment that could reach thousands of listeners.' },
  { amount: '$250', impact: 'Helps produce a video story that can go viral and reach millions.' },
  { amount: '$500', impact: 'Supports a TV pitch that could land a national news segment.' },
  { amount: '$1,000+', impact: 'A major gift that funds our technology and expands our entire operation.' },
]

export default function DonatePage() {
  const pgfUrl = process.env.NEXT_PUBLIC_PGF_URL
  const ein = ORG_EIN

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="section-label section-label-soft">Tax-Deductible · 100% Goes to the Mission</div>
          <h1 className="display-lg">Donate</h1>
          <p style={{ marginTop: 24, fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
            Every dollar you give helps Save One Person reach more people, share more stories, and create more life-saving connections.
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="donate-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
            {/* Left — impact + trust */}
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

              <div style={{ marginTop: 40 }}>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: 'var(--navy)', marginBottom: 20 }}>What Your Donation Does</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {TIERS.map((tier) => (
                    <div key={tier.amount} style={{ display: 'flex', gap: 16, padding: 16, border: '1.5px solid var(--border)', borderRadius: 'var(--r-xl)', background: 'var(--white)' }}>
                      <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, color: 'var(--emerald)', fontWeight: 600, flexShrink: 0, minWidth: 72 }}>{tier.amount}</div>
                      <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.65 }}>{tier.impact}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 40, padding: 32, background: 'var(--secondary)', borderRadius: 'var(--r-2xl)' }}>
                <div className="section-label" style={{ marginBottom: 8 }}>Questions?</div>
                <p style={{ fontSize: 15, color: 'var(--muted)', marginBottom: 16 }}>
                  Contact Lauren directly to discuss major gifts, stock donations, or other ways to contribute.
                </p>
                <a href="mailto:Save1Person@aol.com" style={{ fontSize: 14, fontWeight: 600, color: 'var(--emerald)' }}>Save1Person@aol.com</a>
                <span style={{ margin: '0 10px', color: 'var(--border)' }}>|</span>
                <a href="tel:9175726385" style={{ fontSize: 14, fontWeight: 600, color: 'var(--emerald)' }}>917-572-6385</a>
              </div>
            </div>

            {/* Right — interactive donate form */}
            <div style={{ position: 'sticky', top: 96 }}>
              <DonateForm pgfUrl={pgfUrl} ein={ein} />

              <div style={{ marginTop: 24, padding: 24, background: 'var(--grad-navy)', borderRadius: 'var(--r-2xl)', color: 'white' }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--emerald-soft)', marginBottom: 8 }}>Safe &amp; Simple Giving</div>
                <ul style={{ fontSize: 13, lineHeight: 1.8, color: 'rgba(255,255,255,0.80)', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <li>Encrypted, secure checkout — your details are protected</li>
                  <li>Pay with PayPal, credit/debit card, Apple Pay, or Google Pay</li>
                  <li>Tax-deductible — you receive a receipt for your records</li>
                  <li>Every gift funds media outreach that helps save lives</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .donate-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
