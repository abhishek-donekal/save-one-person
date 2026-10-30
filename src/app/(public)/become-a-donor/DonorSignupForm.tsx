'use client'

import { useState } from 'react'
import { NMDP_URL, GIFT_URL } from '@/lib/org'

const WAYS = ['Kidney', 'Liver', 'Bone marrow', 'Not sure yet'] as const
const WAY_LABELS: Record<string, string> = { Kidney: 'A kidney', Liver: 'Part of my liver', 'Bone marrow': 'Bone marrow', 'Not sure yet': 'Not sure yet' }
const BLOOD = ["Don't know", 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const

export default function DonorSignupForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')
  const [bloodType, setBloodType] = useState<string>("Don't know")
  const [ways, setWays] = useState<string[]>(['Kidney'])
  const [note, setNote] = useState('')
  const [adult, setAdult] = useState(false)
  const [contactOk, setContactOk] = useState(false)
  const [website, setWebsite] = useState('') // honeypot
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  function toggle(w: string) {
    setWays((cur) => (cur.includes(w) ? cur.filter((x) => x !== w) : [...cur, w]))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (ways.length === 0) {
      setStatus('error'); setMsg('Please choose how you might like to help.'); return
    }
    setStatus('sending'); setMsg('')
    try {
      const res = await fetch('/api/donor-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, location, bloodType, ways, note, adult, contactOk, website }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) { setStatus('error'); setMsg(json.error || 'Something went wrong. Please try again.'); return }
      setStatus('done')
    } catch {
      setStatus('error'); setMsg('Network error. Please try again.')
    }
  }

  if (status === 'done') {
    return (
      <div style={{ padding: 40, background: '#dcfce7', borderRadius: 'var(--r-2xl)', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>💛</div>
        <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 26, color: '#166534', marginBottom: 12 }}>Thank you for stepping forward.</h3>
        <p style={{ color: '#166534', fontSize: 16, lineHeight: 1.7 }}>
          You&apos;re on our list of people willing to help. When someone needs a donor who may be a match for you, we&apos;ll reach out. Signing up never commits you to donate.
        </p>
      </div>
    )
  }

  const chip = (active: boolean): React.CSSProperties => ({
    padding: '12px 16px',
    borderRadius: 12,
    border: `2px solid ${active ? 'var(--emerald)' : 'var(--border)'}`,
    background: active ? 'var(--emerald)' : 'var(--white)',
    color: active ? 'white' : 'var(--navy)',
    fontWeight: 600,
    fontSize: 15,
    cursor: 'pointer',
    textAlign: 'left',
    fontFamily: 'inherit',
  })

  return (
    <form onSubmit={onSubmit} className="donor-form">
      <div style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }} aria-hidden="true">
        <label htmlFor="ds-website">Website</label>
        <input id="ds-website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>

      <fieldset style={{ border: 0, padding: 0, margin: '0 0 24px' }}>
        <legend className="form-label" style={{ marginBottom: 10 }}>I&apos;d consider donating *</legend>
        <div className="donor-ways">
          {WAYS.map((w) => (
            <button key={w} type="button" aria-pressed={ways.includes(w)} onClick={() => toggle(w)} style={chip(ways.includes(w))}>
              {ways.includes(w) ? '✓ ' : ''}{WAY_LABELS[w]}
            </button>
          ))}
        </div>
      </fieldset>

      {ways.includes('Bone marrow') && (
        <div className="marrow-note" role="note">
          <strong>Bone marrow donors also need to join a national registry.</strong> Patients are matched through the registry, so please sign up there too. It&apos;s a free cheek swab kit by mail.
          <div className="marrow-links">
            <a href={NMDP_URL} target="_blank" rel="noopener noreferrer">Join NMDP (Be The Match) →</a>
            <a href={GIFT_URL} target="_blank" rel="noopener noreferrer">Join Gift of Life →</a>
          </div>
        </div>
      )}

      <div className="donor-two">
        <div className="form-field" style={{ margin: 0 }}>
          <label className="form-label" htmlFor="ds-name">Full name *</label>
          <input id="ds-name" className="form-input" required value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        </div>
        <div className="form-field" style={{ margin: 0 }}>
          <label className="form-label" htmlFor="ds-email">Email *</label>
          <input id="ds-email" className="form-input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        </div>
        <div className="form-field" style={{ margin: 0 }}>
          <label className="form-label" htmlFor="ds-phone">Phone</label>
          <input id="ds-phone" className="form-input" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
        </div>
        <div className="form-field" style={{ margin: 0 }}>
          <label className="form-label" htmlFor="ds-loc">City &amp; state</label>
          <input id="ds-loc" className="form-input" value={location} onChange={(e) => setLocation(e.target.value)} autoComplete="address-level2" />
        </div>
        <div className="form-field" style={{ margin: 0 }}>
          <label className="form-label" htmlFor="ds-blood">Blood type</label>
          <select id="ds-blood" className="form-select" value={bloodType} onChange={(e) => setBloodType(e.target.value)}>
            {BLOOD.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
      </div>

      <div className="form-field" style={{ marginTop: 20 }}>
        <label className="form-label" htmlFor="ds-note">Anything you&apos;d like us to know (optional)</label>
        <textarea id="ds-note" className="form-textarea" value={note} onChange={(e) => setNote(e.target.value)} style={{ minHeight: 100 }} placeholder="For example, a patient whose story moved you" />
      </div>

      <label className="donor-check">
        <input type="checkbox" checked={adult} onChange={(e) => setAdult(e.target.checked)} required />
        <span>I am 18 or older.</span>
      </label>
      <label className="donor-check">
        <input type="checkbox" checked={contactOk} onChange={(e) => setContactOk(e.target.checked)} required />
        <span>Save One Person may contact me about people who need a donor. I understand signing up does not commit me to donate.</span>
      </label>

      <button type="submit" className="btn btn-emerald" disabled={status === 'sending'} style={{ width: '100%', justifyContent: 'center', padding: '18px 24px', fontSize: 15, marginTop: 8, opacity: status === 'sending' ? 0.6 : 1 }}>
        {status === 'sending' ? 'Signing you up…' : 'Sign Me Up to Help'}
      </button>
      {status === 'error' && <p role="alert" style={{ marginTop: 12, fontSize: 14, color: '#b91c1c' }}>{msg}</p>}
      <p style={{ marginTop: 14, fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>
        We use your details only to contact you about donating.
      </p>
    </form>
  )
}
