import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Thank You, Miracle Maker',
  robots: { index: false, follow: false },
}

export default function MiracleMakerThanks() {
  return (
    <div className="page-content">
      <div className="container" style={{ maxWidth: 680, textAlign: 'center', padding: '56px 16px' }}>
        <Image src="/images/save-one-person-heart-logo.png" alt="Save One Person" width={140} height={140} style={{ margin: '0 auto 20px', height: 'auto' }} />
        <div className="section-label section-label-soft">Welcome to the family</div>
        <h1 className="display-lg" style={{ margin: '10px 0 16px' }}>Thank you, <em>Miracle Maker</em></h1>
        <p style={{ fontSize: 18, lineHeight: 1.7, color: 'var(--muted)' }}>
          Your monthly gift helps Save One Person share the stories of people who need a living kidney donor or a medical
          miracle, on TV, radio and social media, every single month. You&rsquo;ll get an email receipt for each gift.
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--muted)', marginTop: 12 }}>
          Save One Person is a 501(c)(3) nonprofit. To change or cancel your monthly gift at any time, just reply to your receipt email or write to{' '}
          <a href="mailto:save1person1@gmail.com" style={{ color: 'var(--emerald)', fontWeight: 700 }}>save1person1@gmail.com</a>.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 28 }}>
          <Link href="/urgent-requests" className="btn btn-emerald">Meet the people we&rsquo;re helping</Link>
          <Link href="/honor-card" className="btn btn-outline">Make an honor card</Link>
        </div>
      </div>
    </div>
  )
}
