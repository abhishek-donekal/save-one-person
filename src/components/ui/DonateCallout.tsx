import Link from 'next/link'

// Organization-level donation ask (never tied to a specific patient).
export default function DonateCallout() {
  return (
    <div className="container" style={{ margin: '48px auto 64px' }}>
      <div style={{ padding: 32, background: 'var(--grad-navy)', borderRadius: 'var(--r-2xl)', color: 'white', textAlign: 'center' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--emerald-soft)', marginBottom: 8 }}>Giving Season · Tax-Deductible</div>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 30, lineHeight: 1.2 }}>Help Save One Person share the next life-saving story</div>
        <p style={{ marginTop: 12, fontSize: 15, color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, maxWidth: 620, marginLeft: 'auto', marginRight: 'auto' }}>
          Your gift funds the media outreach that helps people find living organ donors and medical miracles. Save One Person is a 501(c)(3) nonprofit (EIN 84-4214447).
        </p>
        <div style={{ marginTop: 20, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link className="btn btn-emerald" href="/donate">Donate Now →</Link>
        </div>
      </div>
    </div>
  )
}
