'use client'

import Link from 'next/link'
import Image from 'next/image'

const DONATE_URL =
  'https://save-one-person.myshopify.com/collections/all/products/save-one-person-tax-deductible-donation'

export default function Footer() {
  return (
    <footer id="contact">
      <div className="footer-inner">
        {/* Col 1 — Brand */}
        <div>
          <div className="footer-logo-wrap">
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
              { href: '/success-stories', label: 'Success Stories' },
              { href: '/urgent-requests', label: 'Urgent Requests' },
              { href: '/media', label: 'In The Media' },
              { href: '/blog', label: 'Blog' },
              { href: '/partners', label: 'Partners' },
              { href: '/contact', label: 'Contact' },
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
              <a href="https://www.saveoneperson.org" target="_blank" rel="noopener noreferrer">
                www.saveoneperson.org
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3 — Take Action */}
        <div className="footer-action-col">
          <div className="footer-col-label">Take Action</div>
          <div className="footer-action-btns">
            <a href={DONATE_URL} className="footer-btn-donate" target="_blank" rel="noopener noreferrer">
              Donate
            </a>
            <a href="mailto:Save1Person@aol.com?subject=Partnership%20Inquiry" className="footer-btn-outline">
              Partner
            </a>
            <Link href="/contact" className="footer-btn-outline">
              Contact
            </Link>
          </div>
          <div
            style={{
              marginTop: 40,
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
