'use client'

import { useState } from 'react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setMsg('')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        setStatus('error')
        setMsg(json.error || 'Something went wrong. Please try again.')
        return
      }
      setStatus('done')
      setEmail('')
    } catch {
      setStatus('error')
      setMsg('Network error. Please try again.')
    }
  }

  if (status === 'done') {
    return (
      <p style={{ fontSize: 14, color: 'var(--emerald-soft)', fontWeight: 600 }}>
        ✓ Thank you — you&apos;re subscribed to Save One Alerts.
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }} aria-hidden="true">
        <label htmlFor="nl-website">Website</label>
        <input id="nl-website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          aria-label="Email address for newsletter"
          style={{
            flex: 1,
            minWidth: 180,
            padding: '11px 14px',
            borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.18)',
            background: 'rgba(255,255,255,0.06)',
            color: 'white',
            fontSize: 14,
            fontFamily: 'inherit',
          }}
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn btn-emerald"
          style={{ padding: '11px 20px', fontSize: 13, opacity: status === 'sending' ? 0.6 : 1 }}
        >
          {status === 'sending' ? 'Joining…' : 'Subscribe'}
        </button>
      </div>
      {status === 'error' && <p style={{ fontSize: 12, color: '#fca5a5' }}>{msg}</p>}
    </form>
  )
}
