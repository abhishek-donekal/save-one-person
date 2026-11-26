import type { Metadata } from 'next'
import Link from 'next/link'
import { ORG_EIN } from '@/lib/org'
import CopyMessages from './CopyMessages'

export const metadata: Metadata = {
  title: 'Donate Your Birthday to Save a Life',
  description: 'Ask friends to give to Save One Person instead of birthday gifts. Ready-to-copy Facebook, Instagram, text and email messages included.',
  alternates: { canonical: '/donate-your-birthday' },
}

const STEPS = [
  { h: 'Pick your goal', b: 'Choose a number that feels fun: your age times $10, $500, or one gift for every year.' },
  { h: 'Copy a message', b: 'Use one of the messages below on Facebook, Instagram, text or email. Change anything you like.' },
  { h: 'Share your link', b: 'Friends give at Saveonepersonnow.org/donate and type your name in the “in honor of” box, so we know it’s for your birthday.' },
  { h: 'Say thank you', b: 'Post a thank-you on your birthday, and remind friends it’s not too late to give.' },
]

export default function DonateYourBirthday() {
  return (
    <>
      <div className="page-hero shop-hero">
        <div className="page-hero-inner">
          <div className="section-label section-label-soft">The best gift ever</div>
          <h1 className="display-lg">Donate Your <em>Birthday</em></h1>
          <p className="shop-hero-sub">
            This year, ask for gifts that save lives. Your friends give to Save One Person in your honor, and help someone find a living kidney donor or a medical miracle.
          </p>
          <div className="shop-hero-actions">
            <a href="#messages" className="btn btn-emerald">Get your messages</a>
          </div>
        </div>
      </div>
      <div className="page-content">
        <div className="container" style={{ maxWidth: 900 }}>
          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 16, marginBottom: 48 }}>
            {STEPS.map((s, i) => (
              <div key={s.h} style={{ background: 'var(--secondary)', borderRadius: 18, padding: 20 }}>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: 28, color: 'var(--emerald)', fontWeight: 600 }}>{i + 1}</div>
                <div style={{ fontWeight: 800, color: 'var(--navy)', margin: '4px 0 6px' }}>{s.h}</div>
                <div style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--muted)' }}>{s.b}</div>
              </div>
            ))}
          </section>

          <section id="messages" style={{ marginBottom: 48 }}>
            <h2 className="display" style={{ fontSize: 32, marginBottom: 8 }}>Your ready-to-copy messages</h2>
            <p style={{ color: 'var(--muted)', marginBottom: 20 }}>Type your name and birthday, then tap Copy on any message.</p>
            <CopyMessages />
          </section>

          <section style={{ padding: 28, borderRadius: 20, background: '#eef7f3', border: '1.5px solid #cfe7dc', marginBottom: 48 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--navy)', margin: '0 0 8px' }}>Where the money goes</h2>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.7, color: 'var(--muted)' }}>
              Save One Person is a 501(c)(3) nonprofit (EIN {ORG_EIN}). We use TV, radio and social media to share the stories of people who need a living kidney donor, so the right person sees them. Gifts are tax-deductible. Questions? Email{' '}
              <a href="mailto:save1person1@gmail.com" style={{ color: 'var(--emerald)', fontWeight: 700 }}>save1person1@gmail.com</a>.
            </p>
          </section>

          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <Link href="/donate" className="btn btn-emerald">Make the first birthday gift</Link>
            <p style={{ marginTop: 12, fontSize: 14, color: 'var(--muted)' }}>
              Not your birthday? <Link href="/honor-card" style={{ color: 'var(--emerald)', fontWeight: 700 }}>Give in someone&rsquo;s honor</Link>.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
