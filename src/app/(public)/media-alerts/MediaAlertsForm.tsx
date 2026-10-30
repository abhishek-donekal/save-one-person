'use client'

import { useState } from 'react'
import { emailLauren } from '@/lib/notify'

export default function MediaAlertsForm() {
  const [f, setF] = useState({ name: '', email: '', outlet: '', role: '', phone: '', website: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [msg, setMsg] = useState('')
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.value })

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending'); setMsg('')
    try {
      const res = await fetch('/api/media-alerts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f) })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) { setStatus('error'); setMsg(json.error || 'Something went wrong. Please try again.'); return }
      emailLauren(`New Save One Alert sign-up (media): ${f.outlet}`, {
        Name: f.name, Email: f.email, 'Media outlet': f.outlet, Role: f.role || '—', Phone: f.phone || '—',
      })
      setStatus('done')
    } catch {
      setStatus('error'); setMsg('Network error. Please try again.')
    }
  }

  if (status === 'done') {
    return (
      <div style={{ padding: 40, background: '#dcfce7', borderRadius: 'var(--r-2xl)', textAlign: 'center' }}>
        <div style={{ fontSize: 44, marginBottom: 12 }}>✓</div>
        <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 26, color: '#166534', marginBottom: 10 }}>You&apos;re signed up for Save One Alerts.</h3>
        <p style={{ color: '#166534', fontSize: 16, lineHeight: 1.7 }}>We&apos;ll send you urgent patient stories as they come in. Thank you for helping us reach the person who can save a life.</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit}>
      <div style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }} aria-hidden="true">
        <label htmlFor="ma-website">Website</label>
        <input id="ma-website" type="text" tabIndex={-1} autoComplete="off" value={f.website} onChange={set('website')} />
      </div>
      <div className="donor-two">
        <div className="form-field" style={{ margin: 0 }}>
          <label className="form-label" htmlFor="ma-name">Full name *</label>
          <input id="ma-name" className="form-input" required value={f.name} onChange={set('name')} autoComplete="name" />
        </div>
        <div className="form-field" style={{ margin: 0 }}>
          <label className="form-label" htmlFor="ma-email">Email *</label>
          <input id="ma-email" className="form-input" type="email" required value={f.email} onChange={set('email')} autoComplete="email" />
        </div>
        <div className="form-field" style={{ margin: 0 }}>
          <label className="form-label" htmlFor="ma-outlet">Media outlet *</label>
          <input id="ma-outlet" className="form-input" required value={f.outlet} onChange={set('outlet')} placeholder="Station, paper, podcast or show" autoComplete="organization" />
        </div>
        <div className="form-field" style={{ margin: 0 }}>
          <label className="form-label" htmlFor="ma-role">Your role</label>
          <input id="ma-role" className="form-input" value={f.role} onChange={set('role')} placeholder="Producer, reporter, host…" autoComplete="organization-title" />
        </div>
        <div className="form-field" style={{ margin: 0 }}>
          <label className="form-label" htmlFor="ma-phone">Phone</label>
          <input id="ma-phone" className="form-input" type="tel" value={f.phone} onChange={set('phone')} autoComplete="tel" />
        </div>
      </div>
      <button type="submit" className="btn btn-emerald" disabled={status === 'sending'} style={{ width: '100%', justifyContent: 'center', padding: '18px 24px', fontSize: 15, marginTop: 24, opacity: status === 'sending' ? 0.6 : 1 }}>
        {status === 'sending' ? 'Signing you up…' : 'Sign Up for Save One Alerts'}
      </button>
      {status === 'error' && <p role="alert" style={{ marginTop: 12, fontSize: 14, color: '#b91c1c' }}>{msg}</p>}
    </form>
  )
}
