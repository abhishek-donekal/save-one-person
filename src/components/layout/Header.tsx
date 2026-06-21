'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const NAV_LINKS = [
  { href: '/#mission', label: 'Mission' },
  { href: '/#how', label: 'How It Works' },
  { href: '/#impact', label: 'Impact' },
  { href: '/success-stories', label: 'Stories' },
  { href: '/media', label: 'Media' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

const DONATE_URL =
  'https://save-one-person.myshopify.com/collections/all/products/save-one-person-tax-deductible-donation'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`mobile-menu-overlay${menuOpen ? ' is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <button
          className="mobile-menu-close"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        {NAV_LINKS.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
            {l.label}
          </Link>
        ))}
        <a
          href={DONATE_URL}
          className="btn btn-emerald"
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginTop: 16 }}
          onClick={() => setMenuOpen(false)}
        >
          Donate Now
        </a>
      </div>

      {/* Nav */}
      <header className={`site-nav${scrolled ? ' nav-scrolled' : ''}`}>
        <div className="nav-inner">
          <Link href="/" className="nav-brand" aria-label="Save One Person">
            <Image
              src="https://stalwart-puffpuff-744c94.netlify.app/logo.png"
              alt="Save One Person"
              width={40}
              height={40}
              style={{ borderRadius: '50%', objectFit: 'cover' }}
            />
            <span
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 15,
                fontWeight: 600,
                color: scrolled ? 'var(--navy)' : 'rgba(255,255,255,0.92)',
                transition: 'color 240ms',
              }}
            >
              Save One Person
            </span>
          </Link>

          <nav className="nav-links" aria-label="Primary navigation">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="nav-btns" style={{ display: 'flex', gap: 8 }}>
            <a
              href={DONATE_URL}
              className="btn btn-emerald"
              target="_blank"
              rel="noopener noreferrer"
              style={{ padding: '10px 20px' }}
            >
              Donate Now
            </a>
          </div>

          <button
            className={`nav-hamburger${scrolled ? ' nav-scrolled' : ''}`}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 7h16" /><path d="M4 17h16" />
            </svg>
          </button>
        </div>
      </header>
    </>
  )
}
