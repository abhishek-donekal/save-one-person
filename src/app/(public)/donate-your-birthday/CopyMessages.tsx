'use client'
import { useState, type CSSProperties } from 'react'

const field: CSSProperties = { width: '100%', padding: '12px 14px', border: '1.5px solid var(--border)', borderRadius: 12, fontSize: 16, fontFamily: 'inherit', background: 'var(--white)', color: 'var(--navy)' }
const LINK = 'Saveonepersonnow.org/donate'

export default function CopyMessages() {
  const [name, setName] = useState('')
  const [day, setDay] = useState('')
  const [copied, setCopied] = useState('')
  const n = name.trim() || '[YOUR NAME]'
  const d = day.trim() || 'my birthday'

  const msgs = [
    {
      k: 'Facebook or Instagram post',
      t: `This year for ${d}, I don't need any gifts. I'm asking for something better: a gift that can save a life.\n\nSave One Person uses TV, radio and social media to help people find a living kidney donor. One story, seen by the right person, can save a life.\n\nIf you'd like to celebrate with me, please give any amount at ${LINK} and type "${n}'s birthday" in the "in honor of" box. Every dollar counts. Thank you! 🎂❤️\n\n#BeTheMiracle #DonateYourBirthday`,
    },
    {
      k: 'Text or WhatsApp',
      t: `Hi! For ${d} I'm skipping gifts and raising money for Save One Person, a nonprofit that helps people find living kidney donors. If you'd like to give, any amount helps: ${LINK} (just type "${n}'s birthday" in the honor box). It would mean the world to me ❤️`,
    },
    {
      k: 'Email',
      t: `Subject: The only gift I want this year\n\nHi,\n\n${d.charAt(0).toUpperCase() + d.slice(1)} is coming up, and this year I'm asking for something different. Instead of gifts, I'm raising money for Save One Person, a 501(c)(3) nonprofit that uses the media to help people find a living kidney donor.\n\nPeople waiting for a kidney often wait years. When their story reaches the right person, that person can step forward and save their life. Save One Person makes sure those stories get told.\n\nIf you'd like to celebrate with me, please give any amount at ${LINK} and type "${n}'s birthday" in the "in honor of" box. Gifts are tax-deductible.\n\nThank you for being part of my life, and for helping save someone else's.\n\nWith love,\n${n}`,
    },
    {
      k: 'Birthday thank-you post',
      t: `Thank you, thank you, thank you! Because of you, my birthday is helping Save One Person share the stories of people who need a living kidney donor. Best birthday ever. If you still want to join in, it's not too late: ${LINK} ❤️`,
    },
  ]

  async function copy(k: string, t: string) {
    try { await navigator.clipboard.writeText(t); setCopied(k); setTimeout(() => setCopied(''), 2000) } catch {}
  }

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12, marginBottom: 20 }}>
        <input style={field} value={name} maxLength={60} onChange={(e) => setName(e.target.value)} placeholder="Your name" aria-label="Your name" />
        <input style={field} value={day} maxLength={60} onChange={(e) => setDay(e.target.value)} placeholder="e.g. my 50th birthday" aria-label="Your birthday" />
      </div>
      <div style={{ display: 'grid', gap: 16 }}>
        {msgs.map((m) => (
          <div key={m.k} style={{ border: '1.5px solid var(--border)', borderRadius: 18, padding: 20, background: 'var(--white)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <strong style={{ color: 'var(--navy)' }}>{m.k}</strong>
              <button type="button" className="btn btn-emerald" style={{ padding: '8px 18px', fontSize: 14 }} onClick={() => copy(m.k, m.t)}>
                {copied === m.k ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p style={{ whiteSpace: 'pre-wrap', margin: 0, fontSize: 15, lineHeight: 1.6, color: 'var(--muted)' }}>{m.t}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
