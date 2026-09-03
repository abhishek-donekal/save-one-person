import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Common questions about Save One Person: how we help find living donors, submitting a story, donating, becoming a donor, and more.',
}

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: 'What does Save One Person do?',
    a: 'We use the power of media — television, radio, podcasts, newspapers, and social media — to share the stories of people who urgently need a living kidney donor, living liver donor, bone marrow match, or other life-saving medical miracle. By bringing the right story to the right person at the right time, we help connect patients with the people who can save their lives.',
  },
  {
    q: 'How do I submit my story or a loved one’s story?',
    a: (
      <>
        Visit our <Link href="/urgent-requests/submit" style={{ color: 'var(--emerald)', fontWeight: 600 }}>Post an Urgent Need</Link> page and fill out the form with a photo, the patient’s story, and contact information. You can also email us directly at <a href="mailto:Save1Person@aol.com" style={{ color: 'var(--emerald)', fontWeight: 600 }}>Save1Person@aol.com</a>. Approved stories are published on our site and shared with our media partners.
      </>
    ),
  },
  {
    q: 'Is my donation tax-deductible?',
    a: 'Yes. Save One Person is a 501(c)(3) nonprofit organization. All donations are tax-deductible to the extent provided by law, and you will receive a receipt for your records.',
  },
  {
    q: 'How can I donate?',
    a: (
      <>
        Visit our <Link href="/donate" style={{ color: 'var(--emerald)', fontWeight: 600 }}>Donate</Link> page to make a secure, tax-deductible gift. You can give a one-time or monthly donation. Every dollar funds media outreach, storytelling, and technology that helps patients find donors.
      </>
    ),
  },
  {
    q: 'How do I become a living donor?',
    a: (
      <>
        Thank you for considering this life-saving gift. Reach out through our <Link href="/contact" style={{ color: 'var(--emerald)', fontWeight: 600 }}>Contact</Link> page or email <a href="mailto:Save1Person@aol.com" style={{ color: 'var(--emerald)', fontWeight: 600 }}>Save1Person@aol.com</a> and we will help connect you with the patient’s transplant team or the appropriate donor registry. Living donation and bone marrow registration are always coordinated through licensed medical professionals.
      </>
    ),
  },
  {
    q: 'Does Save One Person handle the medical or transplant process?',
    a: 'No. We are a media and awareness organization. All medical evaluation, matching, and transplantation is handled by hospitals, transplant centers, and donor registries. Our role is to raise awareness and make the introduction that can lead to a match.',
  },
  {
    q: 'Can my organization or media outlet partner with Save One Person?',
    a: (
      <>
        Absolutely. We are always looking for media partners and sponsors to help amplify life-saving stories. Email <a href="mailto:Save1Person@aol.com?subject=Partnership%20Inquiry" style={{ color: 'var(--emerald)', fontWeight: 600 }}>Save1Person@aol.com</a> or see our <Link href="/partners" style={{ color: 'var(--emerald)', fontWeight: 600 }}>Partners</Link> page.
      </>
    ),
  },
  {
    q: 'How can I help if I can’t donate an organ?',
    a: (
      <>
        There are many ways to save a life. Share urgent stories on social media, make a tax-deductible <Link href="/donate" style={{ color: 'var(--emerald)', fontWeight: 600 }}>donation</Link>, introduce us to someone in media or healthcare, or simply spread awareness. One share can reach the person who becomes a match.
      </>
    ),
  },
]

export default function FaqPage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="section-label section-label-soft">Have a Question?</div>
          <h1 className="display-lg">Frequently Asked Questions</h1>
          <p style={{ marginTop: 24, fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
            Answers to the questions we hear most about donating, sharing a story, and becoming a living donor.
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="container-md">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQS.map((item, i) => (
              <details key={i} style={{ background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-2xl)', padding: '0', overflow: 'hidden' }}>
                <summary style={{ cursor: 'pointer', listStyle: 'none', padding: '22px 28px', fontFamily: "'Fraunces', serif", fontSize: 18, color: 'var(--navy)', fontWeight: 600, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                  {item.q}
                  <span aria-hidden="true" style={{ color: 'var(--emerald)', fontSize: 22, flexShrink: 0 }}>+</span>
                </summary>
                <div style={{ padding: '0 28px 24px', fontSize: 15, lineHeight: 1.8, color: 'rgba(28,32,41,0.82)' }}>
                  {item.a}
                </div>
              </details>
            ))}
          </div>

          <div style={{ marginTop: 48, padding: 40, background: 'var(--secondary)', borderRadius: 'var(--r-3xl)', textAlign: 'center' }}>
            <div className="section-label">Still Have Questions?</div>
            <h2 className="display" style={{ maxWidth: 520, margin: '16px auto 0', fontSize: 30 }}>We&apos;re Here to Help</h2>
            <div style={{ marginTop: 28, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn btn-emerald" style={{ padding: '14px 28px' }}>Contact Us</Link>
              <a href="tel:9175726385" className="btn btn-navy" style={{ padding: '14px 28px' }}>Call 917-572-6385</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
