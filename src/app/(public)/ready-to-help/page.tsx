import type { Metadata } from 'next'
import Link from 'next/link'
import DonorSignupForm from '../become-a-donor/DonorSignupForm'

export const metadata: Metadata = {
  title: 'The Ready to Help List: Living Donors for the Next Patient',
  description:
    'Wanted to help a patient but weren’t a match? Join the Save One Person Ready to Help list, and we’ll reach out when someone else needs a living donor.',
  alternates: { canonical: '/ready-to-help' },
  openGraph: {
    title: 'Not a match? You could still save a life.',
    description: 'Join the Save One Person Ready to Help list. When someone else needs a living donor, we’ll reach out.',
    url: 'https://www.saveonepersonnow.org/ready-to-help',
  },
}

export default function ReadyToHelpPage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="section-label section-label-soft">The Ready to Help List</div>
          <h1 className="display-lg">Not a match? You could still save a life.</h1>
          <p style={{ marginTop: 24, fontSize: 18, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, maxWidth: 760 }}>
            When one person&apos;s story is shared, many good people step forward. Only one can be the match. Join the Ready to Help
            list and we&apos;ll reach out when someone else needs a living donor.
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="donor-grid">
            <div>
              <div className="section-label">Why this list exists</div>
              <h2 className="display" style={{ marginTop: 16, marginBottom: 20 }}>Hundreds of people called for Elaine.</h2>
              <p style={{ fontSize: 17, color: 'var(--muted)', lineHeight: 1.85 }}>
                Elaine DeLeon was in a desperate search for a living kidney donor. When her story aired on FOX 5, hundreds of people
                called in wanting to help her, so many that the hospital had to turn people away.
              </p>
              <p style={{ marginTop: 16, fontSize: 17, color: 'var(--muted)', lineHeight: 1.85 }}>
                It shows that when a living donor need is shared in the right place, people are ready and willing to help. But when
                you&apos;re not the match, that willingness shouldn&apos;t be lost. Another patient may be waiting for exactly you.
              </p>
              <blockquote style={{ margin: '28px 0 0', padding: '20px 24px', borderLeft: '4px solid var(--emerald)', background: 'var(--secondary)', borderRadius: 'var(--r-xl)', fontSize: 17, lineHeight: 1.7, color: 'var(--navy)' }}>
                &ldquo;I always thought that when people call in and aren&apos;t a match, we could keep a list and reach out to them later
                to see if they&apos;d like to donate to someone else in need.&rdquo;
                <div style={{ marginTop: 10, fontSize: 14, color: 'var(--muted)' }}>Lauren Finkelstein, founder, Save One Person</div>
              </blockquote>

              <div className="section-label" style={{ marginTop: 40 }}>How it works</div>
              <ol className="donor-steps" style={{ marginTop: 16 }}>
                <li>
                  <strong>Join the list.</strong>
                  <span>Tell us you&apos;d be willing to help someone who needs a living donor. It takes about a minute.</span>
                </li>
                <li>
                  <strong>We reach out when there&apos;s a need.</strong>
                  <span>When a new patient needs a donor, especially near you or with your blood type, we share their story with you.</span>
                </li>
                <li>
                  <strong>You decide, with no pressure.</strong>
                  <span>
                    Joining is never a promise to donate. If you want to go further, the patient&apos;s transplant center does all the
                    testing and medical decisions, usually at no cost to the donor.
                  </span>
                </li>
              </ol>

              <div style={{ marginTop: 32, padding: 24, background: 'var(--secondary)', borderRadius: 'var(--r-2xl)', fontSize: 15, lineHeight: 1.7, color: 'var(--muted)' }}>
                Want to help someone right now?{' '}
                <Link href="/urgent-requests" style={{ color: 'var(--emerald)', fontWeight: 600 }}>
                  See who is waiting for a match →
                </Link>
                <p style={{ marginTop: 12, fontSize: 13 }}>
                  Save One Person shares stories and makes introductions. We don&apos;t give medical advice.
                </p>
              </div>
            </div>

            <div style={{ background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-3xl)', padding: 'clamp(22px, 5vw, 36px)', boxShadow: 'var(--shadow-soft)' }}>
              <div className="section-label" style={{ marginBottom: 20 }}>Join the Ready to Help list</div>
              <DonorSignupForm source="ready-to-help" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
