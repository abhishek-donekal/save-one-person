'use client'

import { useState } from 'react'

const FIELD_STYLE: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  border: '1.5px solid var(--border)',
  borderRadius: 12,
  fontSize: 15,
  fontFamily: 'inherit',
  background: 'var(--white)',
  color: 'var(--navy)',
}

const LABEL_STYLE: React.CSSProperties = {
  display: 'block',
  fontSize: 13,
  fontWeight: 600,
  color: 'var(--navy)',
  marginBottom: 6,
}

export default function SubmitForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errMsg, setErrMsg] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setErrMsg('')
    const fd = new FormData(e.currentTarget)
    const body = Object.fromEntries(fd.entries())

    try {
      const res = await fetch('/api/urgent-requests/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const json = await res.json()
      if (!res.ok) {
        setStatus('error')
        setErrMsg(json.error || 'Submission failed')
        return
      }
      setStatus('success')
      ;(e.target as HTMLFormElement).reset()
    } catch {
      setStatus('error')
      setErrMsg('Network error — please try again')
    }
  }

  if (status === 'success') {
    return (
      <div style={{ background: '#ecfdf5', border: '1.5px solid #6ee7b7', borderRadius: 16, padding: 32, textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🙏</div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 26, color: 'var(--navy)', marginBottom: 12 }}>Thank you — submission received.</h2>
        <p style={{ color: 'var(--muted)', maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}>
          Lauren and the team will review your submission and reach out within 1–2 business days. If urgent, please also call <a href="tel:9175726385" style={{ color: 'var(--emerald)', fontWeight: 600 }}>917-572-6385</a>.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 20 }}>
      <div style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }} aria-hidden="true">
        <label htmlFor="website">Website (leave blank)</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <label style={LABEL_STYLE} htmlFor="patient_name">Patient Name <span style={{ color: '#dc2626' }}>*</span></label>
        <input id="patient_name" name="patient_name" required maxLength={120} style={FIELD_STYLE} />
      </div>

      <div>
        <label style={LABEL_STYLE} htmlFor="medical_condition">Medical Condition / Need <span style={{ color: '#dc2626' }}>*</span></label>
        <input id="medical_condition" name="medical_condition" required maxLength={200} placeholder="e.g. Needs living kidney donor, Blood type O+" style={FIELD_STYLE} />
      </div>

      <div>
        <label style={LABEL_STYLE} htmlFor="title">Short Headline (optional)</label>
        <input id="title" name="title" maxLength={200} placeholder="e.g. Mother of three urgently needs a kidney" style={FIELD_STYLE} />
      </div>

      <div>
        <label style={LABEL_STYLE} htmlFor="story_text">Their Story <span style={{ color: '#dc2626' }}>*</span></label>
        <textarea id="story_text" name="story_text" required maxLength={8000} rows={8} placeholder="Tell us about the patient, their medical situation, and what kind of help they need. Be as specific as possible." style={{ ...FIELD_STYLE, resize: 'vertical', lineHeight: 1.6 }} />
      </div>

      <div>
        <label style={LABEL_STYLE} htmlFor="image_url">Photo URL (optional — paste a link to a hosted photo)</label>
        <input id="image_url" name="image_url" type="url" maxLength={500} placeholder="https://..." style={FIELD_STYLE} />
        <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>Don&apos;t have a hosted photo? Leave blank — we&apos;ll follow up by email to collect one.</p>
      </div>

      <div style={{ borderTop: '1.5px solid var(--border)', paddingTop: 20, marginTop: 8 }}>
        <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, color: 'var(--navy)', marginBottom: 4 }}>How donors and media can reach the patient</h3>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16 }}>Only fields you provide will be shown publicly. At least one contact method or social link is recommended.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
        <div>
          <label style={LABEL_STYLE} htmlFor="contact_email">Public Contact Email</label>
          <input id="contact_email" name="contact_email" type="email" maxLength={200} style={FIELD_STYLE} />
        </div>
        <div>
          <label style={LABEL_STYLE} htmlFor="contact_phone">Public Contact Phone</label>
          <input id="contact_phone" name="contact_phone" type="tel" maxLength={50} style={FIELD_STYLE} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
        <div>
          <label style={LABEL_STYLE} htmlFor="social_facebook">Facebook URL</label>
          <input id="social_facebook" name="social_facebook" type="url" maxLength={500} style={FIELD_STYLE} />
        </div>
        <div>
          <label style={LABEL_STYLE} htmlFor="social_instagram">Instagram URL</label>
          <input id="social_instagram" name="social_instagram" type="url" maxLength={500} style={FIELD_STYLE} />
        </div>
        <div>
          <label style={LABEL_STYLE} htmlFor="social_twitter">Twitter / X URL</label>
          <input id="social_twitter" name="social_twitter" type="url" maxLength={500} style={FIELD_STYLE} />
        </div>
        <div>
          <label style={LABEL_STYLE} htmlFor="gofundme_url">GoFundMe / Fundraiser URL</label>
          <input id="gofundme_url" name="gofundme_url" type="url" maxLength={500} style={FIELD_STYLE} />
        </div>
      </div>

      <div>
        <label style={LABEL_STYLE} htmlFor="social_other">Other Link (TikTok, LinkedIn, etc.)</label>
        <input id="social_other" name="social_other" type="url" maxLength={500} style={FIELD_STYLE} />
      </div>

      <div style={{ borderTop: '1.5px solid var(--border)', paddingTop: 20, marginTop: 8 }}>
        <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, color: 'var(--navy)', marginBottom: 16 }}>About you</h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
        <div>
          <label style={LABEL_STYLE} htmlFor="submitter_email">Your Email <span style={{ color: '#dc2626' }}>*</span></label>
          <input id="submitter_email" name="submitter_email" type="email" required maxLength={200} style={FIELD_STYLE} />
          <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>We use this only to follow up — never shown publicly.</p>
        </div>
        <div>
          <label style={LABEL_STYLE} htmlFor="relationship_to_patient">Your Relationship</label>
          <input id="relationship_to_patient" name="relationship_to_patient" maxLength={100} placeholder="e.g. Self, Mother, Friend" style={FIELD_STYLE} />
        </div>
      </div>

      {status === 'error' && (
        <div style={{ padding: 14, background: '#fef2f2', border: '1.5px solid #fca5a5', borderRadius: 12, color: '#991b1b', fontSize: 14 }}>
          {errMsg}
        </div>
      )}

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginTop: 8 }}>
        <button type="submit" disabled={status === 'submitting'} className="btn btn-emerald" style={{ padding: '14px 32px', fontSize: 14, opacity: status === 'submitting' ? 0.6 : 1, cursor: status === 'submitting' ? 'wait' : 'pointer' }}>
          {status === 'submitting' ? 'Submitting…' : 'Submit Urgent Request'}
        </button>
        <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0 }}>Submissions are reviewed before going live.</p>
      </div>
    </form>
  )
}
