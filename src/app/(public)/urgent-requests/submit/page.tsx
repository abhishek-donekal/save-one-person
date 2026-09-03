import type { Metadata } from 'next'
import SubmitForm from './SubmitForm'

export const metadata: Metadata = {
  title: 'Submit an Urgent Need',
  description: 'Post a request on Save One Person to reach donors, media, and the public who can help save a life.',
}

export default function SubmitUrgentPage() {
  return (
    <>
      <div className="page-hero" style={{ background: 'linear-gradient(135deg, #7f1d1d 0%, #1c2029 100%)' }}>
        <div className="page-hero-inner">
          <div className="section-label" style={{ color: '#fca5a5' }}>Reach Donors Directly</div>
          <h1 className="display-lg">Post an Urgent Need</h1>
          <p style={{ marginTop: 24, fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, maxWidth: 720, marginLeft: 'auto', marginRight: 'auto' }}>
            If you or someone you love urgently needs a living donor, bone marrow match, or other life-saving help, share the story here. Approved requests are published so donors, media, and the public can contact you directly.
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="container-md">
          <div style={{ background: 'var(--secondary)', borderRadius: 'var(--r-2xl)', padding: 24, marginBottom: 40, fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--navy)' }}>Before you submit:</strong> The information you mark as &ldquo;public&rdquo; below (photo, story, contact, social links) will be visible to anyone who visits the request page. Only share what the patient or their guardian has agreed to share. We will review your submission within 1–2 business days before it goes live.
          </div>
          <SubmitForm />
        </div>
      </div>
    </>
  )
}
