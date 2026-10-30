import type { Metadata } from 'next'
import Link from 'next/link'
import DonorSignupForm from './DonorSignupForm'
import { NMDP_URL, GIFT_URL } from '@/lib/org'

export const metadata: Metadata = {
  title: 'Become a Living Kidney Donor',
  description:
    'Sign up to be a living kidney donor. When someone needs a kidney, Save One Person will reach out. Signing up never commits you to donate.',
  alternates: { canonical: '/become-a-donor' },
}

export default function BecomeADonorPage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="section-label section-label-soft">Living Kidney Donor Sign-Up</div>
          <h1 className="display-lg">Be a living kidney donor.</h1>
          <p style={{ marginTop: 24, fontSize: 18, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>
            Most people can live a full, healthy life with one kidney. Join our list of people willing to donate a kidney, and when someone needs one, we&apos;ll reach out to you.
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="donor-grid">
            <div>
              <div className="section-label">How it works</div>
              <h2 className="display" style={{ marginTop: 16, marginBottom: 28 }}>Signing up is not a promise to donate.</h2>
              <ol className="donor-steps">
                <li>
                  <strong>Tell us you&apos;d consider donating a kidney.</strong>
                  <span>It takes about a minute. You can also tell us if you&apos;d consider giving part of your liver.</span>
                </li>
                <li>
                  <strong>We reach out when there&apos;s a need.</strong>
                  <span>When a patient needs a kidney, we share their story with you.</span>
                </li>
                <li>
                  <strong>You decide, with no pressure.</strong>
                  <span>If you want to go further, the patient&apos;s transplant center does all the testing and medical decisions, usually at no cost to the donor. You can stop at any time.</span>
                </li>
              </ol>

              <div className="marrow-box">
                <div className="section-label" style={{ marginBottom: 8 }}>Want to be a bone marrow donor instead?</div>
                <h3>Join a bone marrow registry.</h3>
                <p>Bone marrow and stem cell matches are found through national registries, not by us. Joining is free, takes a few minutes online, and they mail you a cheek swab kit. You can also sign up here, so we can tell you about patients searching for a match.</p>
                <div className="marrow-links">
                  <a href={NMDP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-navy">Join NMDP (Be The Match) →</a>
                  <a href={GIFT_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ borderColor: 'var(--border)', color: 'var(--navy)' }}>Join Gift of Life →</a>
                </div>
              </div>

              <div style={{ marginTop: 36, padding: 24, background: 'var(--secondary)', borderRadius: 'var(--r-2xl)', fontSize: 15, lineHeight: 1.7, color: 'var(--muted)' }}>
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
              <div className="section-label" style={{ marginBottom: 20 }}>Living kidney donor sign-up</div>
              <DonorSignupForm />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
