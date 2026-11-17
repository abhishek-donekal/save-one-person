import Link from 'next/link'
import NewsletterSignup from '@/components/layout/NewsletterSignup'

// "How you can help" box shown at the end of every blog post.
// `shareUrl` is the page people should share; `showDonate` is false for posts about
// William (Lauren: never use William to ask for donations — his ask is a living donor).
export default function HowYouCanHelp({
  shareUrl,
  shareText,
  showDonate = true,
}: {
  shareUrl: string
  shareText: string
  showDonate?: boolean
}) {
  const url = encodeURIComponent(shareUrl)
  const text = encodeURIComponent(shareText)
  return (
    <section
      aria-labelledby="how-you-can-help"
      style={{ marginTop: 56, padding: 'clamp(24px, 5vw, 40px)', background: 'var(--secondary)', borderRadius: 'var(--r-3xl)' }}
    >
      <div className="section-label">Take Action</div>
      <h2 id="how-you-can-help" className="display" style={{ marginTop: 12, fontSize: 30 }}>How You Can Help</h2>
      <ul className="donate-list" style={{ marginTop: 20 }}>
        <li>
          <span className="check" aria-hidden="true" />
          <span><strong>Share this story.</strong> One share could reach the person who becomes a match.</span>
        </li>
        <li>
          <span className="check" aria-hidden="true" />
          <span><strong>Become a living donor.</strong> <Link href="/become-a-donor" style={{ color: 'var(--emerald)', fontWeight: 600 }}>Join our living kidney donor list</Link>. Signing up never commits you.</span>
        </li>
        {showDonate && (
          <li>
            <span className="check" aria-hidden="true" />
            <span><strong>Donate.</strong> A <Link href="/donate" style={{ color: 'var(--emerald)', fontWeight: 600 }}>tax-deductible gift</Link> helps Save One Person get more stories on TV, radio and online.</span>
          </li>
        )}
        <li>
          <span className="check" aria-hidden="true" />
          <span><strong>Join the Save One Alert.</strong> Get urgent stories by email so you can help when someone needs a donor.</span>
        </li>
      </ul>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 24 }}>
        <a className="btn btn-emerald" href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank" rel="noopener noreferrer">Share on Facebook</a>
        <a className="btn btn-outline-dark" href={`https://twitter.com/intent/tweet?text=${text}&url=${url}`} target="_blank" rel="noopener noreferrer">Share on X</a>
        <a className="btn btn-outline-dark" href={`https://wa.me/?text=${text}%20${url}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        <a className="btn btn-outline-dark" href={`mailto:?subject=${text}&body=${text}%20${url}`}>Email a Friend</a>
        <Link className="btn btn-navy" href="/become-a-donor">Become a Donor</Link>
        {showDonate && <Link className="btn btn-outline-dark" href="/donate">Donate</Link>}
      </div>

      <div style={{ marginTop: 32, paddingTop: 28, borderTop: '1px solid var(--border)' }}>
        <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: 'var(--navy)', marginBottom: 8 }}>Join the Save One Alert</h3>
        <p style={{ fontSize: 15, color: 'var(--muted)', marginBottom: 16, lineHeight: 1.7 }}>
          Free email alerts with people who urgently need a living donor. Unsubscribe any time.
        </p>
        <NewsletterSignup tone="light" />
      </div>
    </section>
  )
}
