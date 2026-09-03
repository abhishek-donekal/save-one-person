'use client'

import { useState } from 'react'

export default function ShareButtons({ title, handle }: { title: string; handle: string }) {
  const [copied, setCopied] = useState(false)
  const url = `https://www.saveonepersonnow.org/shop/${handle}`

  async function copy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {}
  }

  const enc = encodeURIComponent(url)
  const encT = encodeURIComponent(title)

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
      <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)' }}>Share</span>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${enc}`} target="_blank" rel="noopener noreferrer" style={shareBtn} aria-label="Share on Facebook">f</a>
      <a href={`https://twitter.com/intent/tweet?url=${enc}&text=${encT}`} target="_blank" rel="noopener noreferrer" style={shareBtn} aria-label="Share on X">𝕏</a>
      <a href={`mailto:?subject=${encT}&body=${enc}`} style={shareBtn} aria-label="Share by email">✉</a>
      <button onClick={copy} style={{ ...shareBtn, cursor: 'pointer' }} aria-label="Copy link">{copied ? '✓' : '🔗'}</button>
    </div>
  )
}

const shareBtn: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34,
  borderRadius: '50%', border: '1.5px solid var(--border)', color: 'var(--navy)', fontSize: 14, textDecoration: 'none', background: 'var(--white)',
}
