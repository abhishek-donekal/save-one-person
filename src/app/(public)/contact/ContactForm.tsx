'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', website: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errMsg, setErrMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        setStatus('error')
        setErrMsg(json.error || 'Something went wrong. Please email us directly.')
        return
      }
      setStatus('sent')
    } catch {
      setStatus('error')
      setErrMsg('Network error. Please email us directly at Save1Person@aol.com.')
    }
  }

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }))

  if (status === 'sent') {
    return (
      <div style={{ padding: 40, background: '#dcfce7', borderRadius: 'var(--r-2xl)', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
        <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, color: '#166534', marginBottom: 12 }}>Message Sent!</h3>
        <p style={{ color: '#166534', fontSize: 16 }}>Thank you — your message reached us. Lauren will be in touch soon.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* Honeypot */}
      <div style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }} aria-hidden="true">
        <label htmlFor="contact-website">Website (leave blank)</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => update('website', e.target.value)} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        <div className="form-field" style={{ margin: 0 }}>
          <label className="form-label">Name *</label>
          <input
            className="form-input"
            type="text"
            required
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Your full name"
          />
        </div>
        <div className="form-field" style={{ margin: 0 }}>
          <label className="form-label">Email *</label>
          <input
            className="form-input"
            type="email"
            required
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="your@email.com"
          />
        </div>
      </div>
      <div className="form-field">
        <label className="form-label">Subject</label>
        <select className="form-select" value={form.subject} onChange={(e) => update('subject', e.target.value)}>
          <option value="">Select a subject…</option>
          <option>I Need Help Finding a Donor</option>
          <option>Partnership Inquiry</option>
          <option>Media / Press Inquiry</option>
          <option>Donation Question</option>
          <option>Volunteer</option>
          <option>Other</option>
        </select>
      </div>
      <div className="form-field">
        <label className="form-label">Message *</label>
        <textarea
          className="form-textarea"
          required
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          placeholder="Tell us how we can help…"
          style={{ minHeight: 160 }}
        />
      </div>
      {status === 'error' && (
        <div style={{ marginBottom: 16, padding: 14, background: '#fef2f2', border: '1.5px solid #fca5a5', borderRadius: 12, color: '#991b1b', fontSize: 14 }}>
          {errMsg}
        </div>
      )}
      <button
        type="submit"
        className="btn btn-emerald"
        disabled={status === 'sending'}
        style={{ padding: '16px 32px', fontSize: 14, letterSpacing: '0.12em', width: '100%', justifyContent: 'center' }}
      >
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>
      <p style={{ marginTop: 12, fontSize: 12, color: 'var(--muted)', textAlign: 'center' }}>
        Or email directly: <a href="mailto:Save1Person@aol.com" style={{ color: 'var(--emerald)' }}>Save1Person@aol.com</a> · Call <a href="tel:9175726385" style={{ color: 'var(--emerald)' }}>917-572-6385</a>
      </p>
    </form>
  )
}
