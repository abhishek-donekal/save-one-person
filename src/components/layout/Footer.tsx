'use client'

import Link from 'next/link'
import Image from 'next/image'
import NewsletterSignup from './NewsletterSignup'

const DONATE_URL = '/donate'

const FACEBOOK_URL = 'https://facebook.com/save1person'
const TWITTER_URL = 'https://twitter.com/saveoneperson'
const INSTAGRAM_URL = 'https://instagram.com/saveoneperson'
const YOUTUBE_URL = 'https://www.youtube.com/@SavePerson1'

export default function Footer() {
  return (
    <footer id="contact">
      <div className="footer-inner">
        {/* Col 1 — Brand */}
        <div>
          <div className="footer-logo-wrap">
            <Image
              src="https://kglvtgohmfulykkspfmj.supabase.co/storage/v1/object/public/site-assets/legacy/logo.png"
              alt="Save One Person"
              width={40}
              height={40}
              style={{ borderRadius: '50%', objectFit: 'cover' }}
            />
            <span
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 16,
                fontWeight: 600,
                color: 'rgba(255,255,255,0.92)',
              }}
            >
              Save One Person
            </span>
          </div>
          <p className="footer-tagline">
            Because One Introduction Can Save A Life.
          </p>
          <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[
              { href: '/urgent-requests', label: 'Urgent Requests' },
              { href: '/urgent-requests/submit', label: 'Share Your Story' },
              { href: '/success-stories', label: 'Success Stories' },
              { href: '/media', label: 'In The Media' },
              { href: '/ambassadors', label: 'Ambassadors' },
              { href: '/future', label: 'Future of Organ Donation' },
              { href: '/partners', label: 'Partners' },
              { href: '/faq', label: 'FAQ' },
              { href: '/shop', label: 'Shop' },
              { href: '/contact', label: 'Contact' },
              { href: '/privacy', label: 'Privacy Policy' },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', transition: 'color 200ms' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--emerald-soft)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Col 2 — Founder */}
        <div>
          <div className="footer-col-label">Founder</div>
          <p className="footer-founder-name">Lauren Finkelstein</p>
          <p className="footer-founder-role">Founder, Save One Person</p>
          <ul className="footer-contact-list">
            <li>
              <a href="tel:9175726385">917-572-6385</a>
            </li>
            <li>
              <a href="mailto:Save1Person@aol.com">Save1Person@aol.com</a>
            </li>
            <li>
              <a href="https://www.saveonepersonnow.org" target="_blank" rel="noopener noreferrer">
                www.saveonepersonnow.org
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3 — Take Action */}
        <div className="footer-action-col">
          <div className="footer-col-label">Take Action</div>
          <div className="footer-action-btns">
            <Link href={DONATE_URL} className="footer-btn-donate">
              Donate
            </Link>
            <a href="mailto:Save1Person@aol.com?subject=Partnership%20Inquiry" className="footer-btn-outline">
              Partner
            </a>
            <Link href="/contact" className="footer-btn-outline">
              Contact
            </Link>
          </div>
          {/* Newsletter */}
          <div style={{ marginTop: 32 }}>
            <div className="footer-col-label" style={{ marginBottom: 8 }}>Get Save One Alerts</div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, marginBottom: 12 }}>
              Weekly stories of people in urgent need. One share could save a life.
            </p>
            <NewsletterSignup />
          </div>

          {/* Social */}
          <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="footer-col-label">Follow</span>
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Save One Person on Facebook" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.75)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.6 4.5-4.6 1.3 0 2.6.2 2.6.2v2.9h-1.5c-1.4 0-1.9.9-1.9 1.8V12h3.3l-.5 3.5h-2.8v8.4A12 12 0 0 0 24 12z" />
              </svg>
            </a>
            <a href={TWITTER_URL} target="_blank" rel="noopener noreferrer" aria-label="Save One Person on X (Twitter)" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.75)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.9 2.3h3.7l-8 9.2 9.4 12.4h-7.4l-5.8-7.6-6.6 7.6H.5l8.6-9.8L0 2.3h7.6l5.2 6.9 6.1-6.9zm-1.3 19.6h2L6.5 4.3H4.3l13.3 17.6z" />
              </svg>
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Save One Person on Instagram" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.75)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.9c-3.1 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.4-.5.2-.9.4-1.3.8-.4.4-.6.8-.8 1.3-.2.4-.3 1-.4 2.1C2.6 8.5 2.6 8.9 2.6 12s0 3.5.1 4.7c.1 1.1.2 1.7.4 2.1.2.5.4.9.8 1.3.4.4.8.6 1.3.8.4.2 1 .3 2.1.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.5-.2.9-.4 1.3-.8.4-.4.6-.8.8-1.3.2-.4.3-1 .4-2.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1.1-.2-1.7-.4-2.1-.2-.5-.4-.9-.8-1.3-.4-.4-.8-.6-1.3-.8-.4-.2-1-.3-2.1-.4-1.2-.1-1.6-.1-4.7-.1zm0 3.3a4.6 4.6 0 1 1 0 9.2 4.6 4.6 0 0 1 0-9.2zm0 7.6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm5.8-7.8a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0z" />
              </svg>
            </a>
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" aria-label="Save One Person on YouTube" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.75)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
              </svg>
            </a>
          </div>

          <div
            style={{
              marginTop: 28,
              padding: 20,
              borderRadius: 'var(--r-2xl)',
              border: '1px solid rgba(255,255,255,0.10)',
              background: 'rgba(255,255,255,0.04)',
            }}
          >
            <div className="footer-col-label" style={{ marginBottom: 8 }}>501(c)(3) Nonprofit</div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>
              All donations are tax-deductible to the extent provided by law.
            </p>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="footer-copyright">
        <span>© {new Date().getFullYear()} Save One Person</span>
        <span>501(c)(3) — Tax-Deductible Donations</span>
      </div>
    </footer>
  )
}
