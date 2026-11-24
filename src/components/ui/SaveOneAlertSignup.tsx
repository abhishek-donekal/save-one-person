import NewsletterSignup from '@/components/layout/NewsletterSignup'

// Prominent "Join the Save One Alert" sign-up box (homepage + every patient story page).
// Blog posts show the same sign-up inside their "How You Can Help" box.
export default function SaveOneAlertSignup({ patientName }: { patientName?: string }) {
  return (
    <section
      aria-labelledby="save-one-alert-signup"
      style={{
        padding: 'clamp(24px, 5vw, 40px)',
        background: 'var(--secondary)',
        border: '1.5px solid var(--border)',
        borderRadius: 'var(--r-3xl)',
      }}
    >
      <div className="section-label">Free Email Alerts</div>
      <h2 id="save-one-alert-signup" className="display" style={{ marginTop: 12, fontSize: 'clamp(26px, 4vw, 34px)' }}>
        Join the Save One Alert
      </h2>
      <p style={{ marginTop: 12, marginBottom: 20, fontSize: 16, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 620 }}>
        {patientName
          ? `Get updates on people like ${patientName} who urgently need a living donor, so you can help or share when it matters most. Free, and you can unsubscribe any time.`
          : 'Get urgent stories of people who need a living donor or a medical miracle, so you can help or share when it matters most. Free, and you can unsubscribe any time.'}
      </p>
      <div style={{ maxWidth: 560 }}>
        <NewsletterSignup tone="light" />
      </div>
    </section>
  )
}
