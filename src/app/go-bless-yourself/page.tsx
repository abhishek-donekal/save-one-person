import type { Metadata } from 'next'
import { STATIC_PRODUCTS } from '@/lib/shop/staticProducts'
import { ORG_EIN } from '@/lib/org'
import GbyShop from './GbyShop'
import './gby.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://goblessyourself.org'),
  title: { absolute: 'Go Bless Yourself | Wear the blessing' },
  description: 'GO BLESS YOURSELF tees, hoodies, hats, totes and mugs. Every purchase supports Save One Person, helping patients find the living donors they need.',
  alternates: { canonical: 'https://goblessyourself.org/' },
  openGraph: {
    title: 'Go Bless Yourself',
    description: 'Wear the blessing. Every purchase helps save a life.',
    url: 'https://goblessyourself.org/',
    siteName: 'Go Bless Yourself',
    images: [{ url: '/images/shop/go-bless-yourself-front.jpg', width: 1200, height: 1200 }],
    type: 'website',
  },
}

function Heart({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="-14 -16 28 26" aria-hidden="true">
      <path fill="#d62839" d="M0 9 C-6 3,-13 -1,-13 -7 C-13 -12,-9 -15,-5 -15 C-2 -15,0 -13,0 -10 C0 -13,2 -15,5 -15 C9 -15,13 -12,13 -7 C13 -1,6 3,0 9Z" />
    </svg>
  )
}

export default function GoBlessYourselfPage() {
  return (
    <div className="gby">
      <header className="gby-top">
        <a href="#" className="gby-logo">GO BLESS YOURSELF <Heart size={18} /></a>
        <a href="#shop" className="gby-top-link">Shop</a>
      </header>

      <section className="gby-hero">
        <h1>
          <span>GO</span>
          <span>BLESS</span>
          <span>YOURSELF</span>
        </h1>
        <Heart size={56} />
        <p>Wear the blessing. Share the blessing.<br />Every purchase helps a patient find the living donor they need.</p>
        <a href="#shop" className="gby-cta">Shop the collection</a>
      </section>

      <section id="shop" className="gby-shop">
        <h2>The Collection</h2>
        <p className="gby-sub">GO BLESS YOURSELF on the front. BLESS YOU TOO on the back.</p>
        <GbyShop products={STATIC_PRODUCTS} />
        <p className="gby-note">Each piece is printed just for you when you order. Secure checkout.</p>
      </section>

      <section className="gby-mission">
        <h2>Every purchase helps save a life</h2>
        <p>
          Go Bless Yourself is a project of <strong>Save One Person</strong>, a nonprofit that uses media and storytelling to
          connect patients who need living kidney donors, liver donors and bone marrow matches with the people who can save them.
        </p>
        <a href="https://www.saveonepersonnow.org" className="gby-link">Visit Save One Person →</a>
      </section>

      <footer className="gby-foot">
        <div>GO BLESS YOURSELF <Heart size={14} /></div>
        <div>A project of Save One Person · 501(c)(3) nonprofit · EIN {ORG_EIN}</div>
      </footer>
    </div>
  )
}
