'use client'
import { useState, type CSSProperties } from 'react'
import Image from 'next/image'
import { donationCheckoutUrl } from '@/lib/shop/checkout'

const AMOUNTS = [25, 50, 100, 250]

const field: CSSProperties = { width: '100%', padding: '14px 16px', border: '1.5px solid var(--border)', borderRadius: 12, fontSize: 16, fontFamily: 'inherit', background: 'var(--white)', color: 'var(--navy)' }
const lbl: CSSProperties = { display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }

export default function HonorCard() {
  const [to, setTo] = useState('')
  const [from, setFrom] = useState('')
  const [occasion, setOccasion] = useState('this holiday season')
  const [message, setMessage] = useState('')

  const name = to.trim() || 'Someone Special'
  const note = to.trim() ? `In honor of ${to.trim()}` : undefined

  return (
    <div className="honor-wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'flex-start', justifyContent: 'center' }}>
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #honor-card, #honor-card * { visibility: visible !important; }
          #honor-card { position: fixed; inset: 0; margin: auto; width: 7in !important; max-width: none !important; box-shadow: none !important; }
        }
      `}</style>

      <div className="no-print" style={{ flex: 1, minWidth: 280, maxWidth: 440 }}>
        <h2 className="display" style={{ fontSize: 26, marginBottom: 6 }}>1. Make your gift</h2>
        <p style={{ color: 'var(--muted)', lineHeight: 1.6, marginBottom: 16 }}>Type their name first, so it&rsquo;s noted on your tax-deductible donation.</p>
        <label style={{ display: 'block', marginBottom: 16 }}>
          <span style={lbl}>In honor of</span>
          <input style={field} value={to} maxLength={80} onChange={(e) => setTo(e.target.value)} placeholder="e.g. Grandma Rose" />
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 28 }}>
          {AMOUNTS.map((a) => (
            <a key={a} href={donationCheckoutUrl(a, note) ?? '/donate'} target="_blank" rel="noopener noreferrer" className="btn btn-emerald" style={{ padding: '12px 0', justifyContent: 'center' }}>
              ${a}
            </a>
          ))}
        </div>

        <h2 className="display" style={{ fontSize: 26, marginBottom: 6 }}>2. Make the card</h2>
        <label style={{ display: 'block', marginBottom: 14 }}>
          <span style={lbl}>From</span>
          <input style={field} value={from} maxLength={80} onChange={(e) => setFrom(e.target.value)} placeholder="Your name" />
        </label>
        <label style={{ display: 'block', marginBottom: 14 }}>
          <span style={lbl}>Occasion</span>
          <input style={field} value={occasion} maxLength={60} onChange={(e) => setOccasion(e.target.value)} placeholder="e.g. your birthday, Hanukkah, Christmas" />
        </label>
        <label style={{ display: 'block', marginBottom: 20 }}>
          <span style={lbl}>Personal message (optional)</span>
          <textarea style={{ ...field, minHeight: 90 }} value={message} maxLength={240} onChange={(e) => setMessage(e.target.value)} />
        </label>
        <button type="button" className="btn btn-emerald" style={{ width: '100%', justifyContent: 'center' }} onClick={() => window.print()}>
          Print or save the card as a PDF
        </button>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 10, lineHeight: 1.5 }}>
          On a phone, tap the button and choose &ldquo;Save as PDF,&rdquo; then text or email it.
        </p>
      </div>

      <div
        id="honor-card"
        style={{ flex: 1, minWidth: 280, maxWidth: 520, aspectRatio: '7 / 5', background: 'linear-gradient(160deg,#ffffff 0%,#eef7f3 100%)', border: '2px solid #cfe7dc', borderRadius: 20, boxShadow: 'var(--shadow-soft)', padding: '28px 30px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: '#0b1f3a' }}
      >
        <Image src="/images/save-one-person-heart-logo.png" alt="Save One Person" width={72} height={72} style={{ height: 'auto' }} />
        <div style={{ fontSize: 12, letterSpacing: 3, fontWeight: 700, color: '#1b8a5a', marginTop: 10 }}>A LIFE-SAVING GIFT</div>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 30, fontWeight: 600, lineHeight: 1.15, margin: '8px 0' }}>In honor of {name}</div>
        <p style={{ fontSize: 15, lineHeight: 1.55, margin: '4px 0 0', maxWidth: 400 }}>
          {occasion.trim() ? `For ${occasion.trim()}, ` : ''}a gift was made in your name to Save One Person, helping people find a living kidney donor and medical miracles through the media.
        </p>
        {message.trim() && <p style={{ fontSize: 15, fontStyle: 'italic', margin: '12px 0 0', maxWidth: 400 }}>&ldquo;{message.trim()}&rdquo;</p>}
        {from.trim() && <p style={{ fontSize: 15, fontWeight: 700, margin: '12px 0 0' }}>With love, {from.trim()}</p>}
        <div style={{ fontSize: 12, marginTop: 14, opacity: 0.7 }}>Creating miracles through the media, one story at a time · Saveonepersonnow.org</div>
      </div>
    </div>
  )
}
