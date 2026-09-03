import type { Metadata } from 'next'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Lauren Finkelstein at Save One Person. Whether you need help, want to donate, or want to partner with us.',
}

export default function ContactPage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="section-label section-label-soft">Get In Touch</div>
          <h1 className="display-lg">Contact Us</h1>
          <p style={{ marginTop: 24, fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
            Whether you need help finding a donor, want to become a partner, or simply want to learn more — reach out to Lauren directly.
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
            {/* Left: contact info */}
            <div>
              <div className="section-label">Direct Contact</div>
              <h2 className="display" style={{ marginTop: 16, marginBottom: 32 }}>Lauren Finkelstein</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { icon: '📞', label: 'Phone', value: '917-572-6385', href: 'tel:9175726385', external: false },
                  { icon: '✉️', label: 'Email', value: 'Save1Person@aol.com', href: 'mailto:Save1Person@aol.com', external: false },
                  { icon: '🌐', label: 'Website', value: 'saveonepersonnow.org', href: 'https://www.saveonepersonnow.org', external: true },
                ].map((item) => (
                  <a key={item.label} href={item.href} target={item.external ? '_blank' : undefined} rel={item.external ? 'noopener noreferrer' : undefined} className="hover-border-emerald" style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: 20, border: '1.5px solid var(--border)', borderRadius: 'var(--r-2xl)', background: 'var(--white)', textDecoration: 'none' }}>
                    <span style={{ fontSize: 24 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--emerald)', marginBottom: 4 }}>{item.label}</div>
                      <div style={{ fontSize: 17, color: 'var(--navy)', fontWeight: 500 }}>{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>

              <div style={{ marginTop: 40, padding: 32, background: 'var(--secondary)', borderRadius: 'var(--r-2xl)' }}>
                <div className="section-label" style={{ marginBottom: 12 }}>How We Can Help</div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    'Share your story to reach potential donors',
                    'Media and press inquiries',
                    'Partnership and sponsorship',
                    'Volunteer or become a donor',
                    'Urgent medical situations',
                  ].map((item) => (
                    <li key={item} style={{ display: 'flex', gap: 10, fontSize: 15, color: 'var(--muted)' }}>
                      <span style={{ color: 'var(--emerald)', marginTop: 2 }}>•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: form */}
            <div>
              <div className="section-label">Send a Message</div>
              <h2 className="display" style={{ marginTop: 16, marginBottom: 32 }}>Get In Touch</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
