'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

type Hit = {
  type: 'urgent' | 'story' | 'media' | 'blog'
  title: string
  url: string
  snippet: string
  date?: string | null
}

const TYPE_LABEL: Record<Hit['type'], string> = {
  urgent: 'Urgent Request',
  story: 'Success Story',
  media: 'Media',
  blog: 'Blog',
}

const TYPE_COLOR: Record<Hit['type'], string> = {
  urgent: '#dc2626',
  story: '#047857',
  media: '#1e3a8a',
  blog: '#6b7280',
}

const QUICK_LINKS = [
  { label: 'Current Urgent Requests', href: '/urgent-requests' },
  { label: 'Success Stories', href: '/success-stories' },
  { label: 'Media Coverage', href: '/media' },
  { label: 'Ways to Help', href: '/donate' },
  { label: 'Become a Donor', href: '/contact' },
  { label: 'The Future of Organ Donation', href: '/future' },
]

export default function SearchButton({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [hits, setHits] = useState<Hit[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setQ('')
      setHits([])
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (q.trim().length < 2) {
      setHits([])
      return
    }
    setLoading(true)
    const handle = setTimeout(async () => {
      try {
        const r = await fetch(`/api/search?q=${encodeURIComponent(q.trim())}`)
        const json = await r.json()
        setHits(json.hits || [])
      } finally {
        setLoading(false)
      }
    }, 200)
    return () => clearTimeout(handle)
  }, [q])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
      if ((e.key === '/' || (e.key === 'k' && (e.metaKey || e.ctrlKey))) && !open) {
        e.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search"
        className="nav-search-btn"
        style={{
          background: 'transparent',
          border: 'none',
          padding: 8,
          cursor: 'pointer',
          color: scrolled ? 'var(--navy)' : 'rgba(255,255,255,0.92)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15,23,42,0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: 'min(10vh, 80px)',
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: 640,
              background: 'white',
              borderRadius: 20,
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '20px 24px', borderBottom: '1.5px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: 12 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search urgent requests, stories, media, blog…"
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontSize: 16,
                  fontFamily: 'inherit',
                  color: '#1c2029',
                  background: 'transparent',
                }}
              />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close search"
                style={{ background: '#f3f4f6', border: 'none', padding: '4px 8px', fontSize: 11, fontWeight: 600, borderRadius: 6, cursor: 'pointer', color: '#6b7280' }}
              >
                ESC
              </button>
            </div>

            <div style={{ maxHeight: '60vh', overflowY: 'auto', padding: 8 }}>
              {q.trim().length < 2 ? (
                <div style={{ padding: 16 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6b7280', marginBottom: 12, paddingLeft: 8 }}>Quick Find</div>
                  {QUICK_LINKS.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      style={{
                        display: 'block',
                        padding: '12px 16px',
                        borderRadius: 10,
                        fontSize: 14,
                        fontWeight: 500,
                        color: '#1c2029',
                        textDecoration: 'none',
                      }}
                      className="search-quick-link"
                    >
                      {l.label} <span style={{ float: 'right', color: '#9ca3af' }}>→</span>
                    </Link>
                  ))}
                </div>
              ) : loading ? (
                <div style={{ padding: 32, textAlign: 'center', color: '#6b7280', fontSize: 14 }}>Searching…</div>
              ) : hits.length === 0 ? (
                <div style={{ padding: 32, textAlign: 'center', color: '#6b7280', fontSize: 14 }}>
                  No results for &ldquo;{q}&rdquo;
                </div>
              ) : (
                hits.map((h, i) => (
                  <a
                    key={i}
                    href={h.url}
                    target={h.url.startsWith('http') ? '_blank' : undefined}
                    rel={h.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                    onClick={() => setOpen(false)}
                    style={{
                      display: 'block',
                      padding: 14,
                      borderRadius: 10,
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                    className="search-result"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: TYPE_COLOR[h.type] }}>
                        {TYPE_LABEL[h.type]}
                      </span>
                      {h.date && (
                        <span style={{ fontSize: 11, color: '#9ca3af' }}>
                          {new Date(h.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: '#1c2029', marginBottom: 4 }}>{h.title}</div>
                    <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.5 }}>{h.snippet}</div>
                  </a>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .search-quick-link:hover { background: #f3f4f6; }
        .search-result:hover { background: #f3f4f6; }
      `}</style>
    </>
  )
}
