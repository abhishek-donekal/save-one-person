'use client'

import { useEffect, useState } from 'react'

const SITE = 'https://www.saveonepersonnow.org'

type Props = {
  /** Path on this site to share, e.g. "/video" or "/urgent-requests/brittany-hood" */
  path: string
  /** Short message that goes with the link */
  text: string
  /** Heading shown above the buttons */
  label?: string
  /** Light text for dark backgrounds */
  dark?: boolean
  align?: 'left' | 'center'
}

export default function SharePanel({ path, text, label = 'Share', dark = false, align = 'center' }: Props) {
  const url = `${SITE}${path}`
  const [copied, setCopied] = useState(false)
  const [canNativeShare, setCanNativeShare] = useState(false)

  useEffect(() => {
    try { setCanNativeShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function') } catch {}
  }, [])

  const u = encodeURIComponent(url)
  const t = encodeURIComponent(text)

  async function copy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {}
  }

  async function nativeShare() {
    try { await navigator.share({ title: 'Save One Person', text, url }) } catch {}
  }

  const btn: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 9999,
    fontSize: 14, fontWeight: 600, textDecoration: 'none', cursor: 'pointer', lineHeight: 1,
    border: `1.5px solid ${dark ? 'rgba(255,255,255,0.22)' : 'var(--border)'}`,
    background: dark ? 'rgba(255,255,255,0.06)' : 'var(--white)',
    color: dark ? '#fff' : 'var(--navy)',
  }
  const brand = (bg: string): React.CSSProperties => ({ ...btn, background: bg, borderColor: bg, color: '#fff' })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: align === 'center' ? 'center' : 'flex-start', gap: 14 }}>
      <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: dark ? '#f2c46d' : 'var(--emerald)' }}>
        {label}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
        {canNativeShare && (
          <button type="button" onClick={nativeShare} style={brand('#b8862b')} aria-label="Share using your phone (Instagram, TikTok, text and more)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" /><path d="M16 6l-4-4-4 4" /><path d="M12 2v14" /></svg>
            Share
          </button>
        )}
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${u}`} target="_blank" rel="noopener noreferrer" style={brand('#1877f2')} aria-label="Share on Facebook">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 8h3V4h-3c-2.8 0-4.5 1.9-4.5 4.6V11H7v4h2.5v9h4v-9h3l.5-4h-3.5V8.8c0-.5.3-.8.8-.8z" /></svg>
          Facebook
        </a>
        <a href={`https://twitter.com/intent/tweet?url=${u}&text=${t}`} target="_blank" rel="noopener noreferrer" style={brand('#111')} aria-label="Share on X">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.8 2H21l-7 8 8.2 12H16l-5-7.2L5 22H1.8l7.5-8.6L1.5 2H8l4.6 6.6L17.8 2zm-1.1 18h1.8L7.4 3.9H5.5L16.7 20z" /></svg>
          X
        </a>
        <a href={`https://wa.me/?text=${t}%20${u}`} target="_blank" rel="noopener noreferrer" style={brand('#25d366')} aria-label="Share on WhatsApp">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.1.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3z" /></svg>
          WhatsApp
        </a>
        <a href={`mailto:?subject=${encodeURIComponent('Please watch and share — Save One Person')}&body=${t}%0A%0A${u}`} style={btn} aria-label="Share by email">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
          Email
        </a>
        <button type="button" onClick={copy} style={btn} aria-label="Copy link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" /><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" /></svg>
          {copied ? 'Link copied!' : 'Copy link'}
        </button>
      </div>
    </div>
  )
}
