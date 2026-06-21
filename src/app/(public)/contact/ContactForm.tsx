'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    // Build mailto link as fallback — in production this would post to an API
    const mailto = `mailto:Save1Person@aol.com?subject=${encodeURIComponent(form.subject || 'Website Contact')}&body=${encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    )}`
    window.location.href = mailto
    setStatus('sent')
  }

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }))

  if (status === 'sent') {
    return (
      <div style={{ padding: 40, background: '#dcfce7', borderRadius: 'var(--r-2xl)', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
        <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, color: '#166534', marginBottom: 12 }}>Message Sent!</h3>
        <p style={{ color: '#166534', fontSize: 16 }}>Your email client has been opened with your message. Lauren will be in touch soon.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
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
      <button
        type="submit"
        className="btn btn-emerald"
        disabled={status === 'sending'}
        style={{ padding: '16px 32px', fontSize: 14, letterSpacing: '0.12em', width: '100%', justifyContent: 'center' }}
      >
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>
      <p style={{ marginTop: 12, fontSize: 12, color: 'var(--muted)', textAlign: 'center' }}>
        Or email directly: <a href="mailto:Save1Person@aol.com" style={{ color: 'var(--emerald)' }}>Save1Person@aol.com</a>
      </p>
    </form>
  )
}
