import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllProducts, productMinPrice, productCompareAt } from '@/lib/shop/queries'
import { donationCheckoutUrl } from '@/lib/shop/checkout'
import { ORG_EIN } from '@/lib/org'
import ProductCard from '@/components/shop/ProductCard'
import { SECTIONS, sectionOf, hiddenFromList, isBook } from '@/lib/shop/organize'
import type { CardProduct } from '@/components/shop/ProductCard'

export const metadata: Metadata = {
  title: 'Shop — Support the Mission',
  description: 'Books, wellness offerings, and ways to give. Every purchase supports Save One Person’s life-saving mission.',
}

export const revalidate = 300

function toCard(p: Awaited<ReturnType<typeof getAllProducts>>[number]): CardProduct {
  const v = p.variants[0]
  return {
    id: p.id,
    handle: p.handle,
    title: p.title,
    product_type: p.product_type,
    image: p.images[0]?.url ?? null,
    price: productMinPrice(p),
    compareAt: productCompareAt(p),
    available: p.variants.some((x) => x.available),
    variantId: v?.id ?? '',
    shopifyVariantId: v?.shopify_id ?? null,
    variantTitle: v?.title ?? null,
    requiresShipping: v?.requires_shipping ?? true,
    multiVariant: p.variants.length > 1,
    book: isBook(p),
  }
}

export default async function ShopPage() {
  const products = (await getAllProducts()).filter((p) => !hiddenFromList(p))
  const cards = products.map(toCard)
  const featured = cards.filter((c, i) => products[i].featured && sectionOf(products[i]) !== 'Give').slice(0, 4)
  const grouped = SECTIONS.map((name) => ({
    name,
    items: cards.filter((_, i) => sectionOf(products[i]) === name),
  })).filter((g) => g.items.length > 0)

  return (
    <>
      {/* Hero */}
      <div className="page-hero shop-hero">
        <div className="page-hero-inner">
          <div className="section-label section-label-soft">The Save One Person Shop</div>
          <h1 className="display-lg">Shop with <em>Purpose</em></h1>
          <p className="shop-hero-sub">
            Books, wellness offerings, and ways to give. Every purchase helps us share more stories and save more lives.
          </p>
          <div className="shop-hero-actions">
            <a href="#donate" className="btn btn-emerald shop-hero-donate">
              <HeartIcon /> Donate Now
            </a>
            <Link href="/shop#wear-gifts" className="shop-hero-new">
              <span className="tag">New</span> The Go Bless Yourself Collection <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          {/* Donate first */}
          <section id="donate" className="give" aria-labelledby="give-h">
            <div className="give-text">
              <div className="give-label"><HeartIcon /> Give</div>
              <h2 id="give-h" className="display">Your gift can help <em>save a life</em></h2>
              <p>
                Every donation helps a patient&rsquo;s story reach the person who could become their donor. Pick an amount, check out securely, and you&rsquo;re done.
              </p>
              <ul className="give-trust">
                <li><CheckIcon /> Tax-deductible</li>
                <li><CheckIcon /> 501(c)(3) nonprofit &middot; EIN {ORG_EIN}</li>
                <li><CheckIcon /> Secure checkout</li>
              </ul>
            </div>
            <div className="give-panel">
              <div className="give-panel-h">Choose an amount</div>
              <div className="give-amounts">
                {GIFTS.map((g) => (
                  <a key={g.amount} href={donationCheckoutUrl(g.amount) ?? '/donate'} className={g.amount === 100 ? 'give-amt give-amt-pop' : 'give-amt'}>
                    {g.amount === 100 && <span className="give-badge">Most popular</span>}
                    <span className="give-amt-n">${g.amount.toLocaleString()}</span>
                    <span className="give-amt-d">{g.impact}</span>
                  </a>
                ))}
              </div>
              <Link href="/donate" className="give-other">Give a different amount <span aria-hidden="true">→</span></Link>
            </div>
          </section>

          {/* Featured */}
          {featured.length > 0 && (
            <section style={{ marginBottom: 64 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24, flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <div className="section-label">Featured</div>
                  <h2 className="display" style={{ fontSize: 30, marginTop: 8 }}>Our Favorites</h2>
                </div>
              </div>
              <div className="shop-grid">
                {featured.map((p) => (
                  <FeaturedCard key={p.id} p={p} />
                ))}
              </div>
            </section>
          )}

          {/* Trust indicators */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 56 }}>
            {[
              { icon: '🔒', h: 'Secure Checkout', b: 'Your payment is encrypted and protected.' },
              { icon: '💚', h: '501(c)(3) Nonprofit', b: 'Proceeds support our life-saving mission.' },
              { icon: '📦', h: 'Fast Fulfillment', b: 'Orders processed promptly with tracking.' },
            ].map((t) => (
              <div key={t.h} style={{ background: 'var(--secondary)', borderRadius: 'var(--r-2xl)', padding: 20, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }} aria-hidden="true">{t.icon}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)' }}>{t.h}</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>{t.b}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Products by section */}
          <nav className="shop-jump" aria-label="Shop sections">
            {grouped.map((g) => (
              <a key={g.name} href={`#${g.name.toLowerCase().replace(/[^a-z]+/g, '-')}`}>{g.name}</a>
            ))}
          </nav>
          {grouped.map((g) => (
            <section key={g.name} id={g.name.toLowerCase().replace(/[^a-z]+/g, '-')} className="shop-section">
              <h2 className="display">{g.name}</h2>
              <div className="shop-grid">
                {g.items.map((p) => <ProductCard key={p.id} p={p} />)}
              </div>
            </section>
          ))}

          {/* Second chance to give, after browsing */}
          <section className="give-band" aria-label="Donate">
            <div>
              <h2 className="display">Not shopping today?</h2>
              <p>A donation of any size helps share a patient&rsquo;s story with someone who could save their life.</p>
            </div>
            <a href="#donate" className="btn btn-emerald give-band-btn"><HeartIcon /> Donate</a>
          </section>
        </div>
      </div>

      {/* Always-visible donate button */}
      <a href="#donate" className="give-fab" aria-label="Donate to Save One Person">
        <HeartIcon /> <span>Donate</span>
      </a>
    </>
  )
}

const GIFTS = [
  { amount: 25, impact: 'Shares a patient’s story online' },
  { amount: 50, impact: 'Sends a story to news outlets' },
  { amount: 100, impact: 'Helps fund a radio segment' },
  { amount: 250, impact: 'Helps produce a video story' },
  { amount: 500, impact: 'Supports a TV news pitch' },
  { amount: 1000, impact: 'Powers our outreach tools' },
]

function HeartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.8 4.5c2.1 0 3.6 1.1 5.2 3 1.6-1.9 3.1-3 5.2-3 3.8 0 5.9 3.9 4.4 7.3C19.5 16.4 12 21 12 21z" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  )
}

// server-rendered featured card (link only, uses same look)
import Image from 'next/image'
import { formatPrice } from '@/lib/shop/format'
function FeaturedCard({ p }: { p: CardProduct }) {
  const onSale = p.compareAt && p.compareAt > p.price
  return (
    <Link href={`/shop/${p.handle}`} className="hover-lift" style={{ background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-2xl)', overflow: 'hidden', display: 'flex', flexDirection: 'column', textDecoration: 'none' }}>
      <div style={{ position: 'relative', aspectRatio: '1/1', background: 'var(--secondary)' }}>
        {p.image && <Image src={p.image} alt={p.title} fill sizes="(max-width: 640px) 50vw, 300px" style={p.book ? { objectFit: 'contain', padding: 14 } : { objectFit: 'cover' }} />}
        <span style={{ position: 'absolute', top: 10, left: 10, background: 'var(--emerald)', color: 'white', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 8px', borderRadius: 6 }}>Featured</span>
      </div>
      <div style={{ padding: 16 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--navy)', lineHeight: 1.4, marginBottom: 8 }}>{p.title}</h3>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, color: 'var(--navy)' }}>{formatPrice(p.price)}</span>
          {onSale && <span style={{ fontSize: 13, color: 'var(--muted)', textDecoration: 'line-through' }}>{formatPrice(p.compareAt!)}</span>}
        </div>
      </div>
    </Link>
  )
}
