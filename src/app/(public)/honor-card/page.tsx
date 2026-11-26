import type { Metadata } from 'next'
import HonorCard from './HonorCard'

export const metadata: Metadata = {
  title: 'Give in Someone’s Honor or Memory: Free Printable Card',
  description: 'Donate to Save One Person in honor or in loving memory of someone, then make a free card to print or send telling them about your gift.',
  alternates: { canonical: '/honor-card' },
}

export default function HonorCardPage() {
  return (
    <>
      <div className="page-hero shop-hero">
        <div className="page-hero-inner">
          <div className="section-label section-label-soft">A gift that gives</div>
          <h1 className="display-lg">Give in Someone&rsquo;s <em>Honor</em> or <em>Memory</em></h1>
          <p className="shop-hero-sub">
            Make a donation in their name, then make a beautiful card to print or send so they know a life-saving gift was given for them.
          </p>
        </div>
      </div>
      <div className="page-content">
        <div className="container">
          <HonorCard />
        </div>
      </div>
    </>
  )
}
