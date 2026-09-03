import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllProducts, productMinPrice, productCompareAt } from '@/lib/shop/queries'
import ShopBrowser from '@/components/shop/ShopBrowser'
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
  }
}

export default async function ShopPage() {
  const products = await getAllProducts()
  const cards = products.map(toCard)
  const featured = cards.filter((_, i) => products[i].featured).slice(0, 4)
  const types = Array.from(new Set(products.map((p) => p.product_type).filter(Boolean))) as string[]

  return (
    <>
      {/* Hero */}
      <div className="page-hero" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #047857 100%)' }}>
        <div className="page-hero-inner">
          <div className="section-label section-label-soft">The Save One Person Shop</div>
          <h1 className="display-lg">Shop with Purpose</h1>
          <p style={{ marginTop: 24, fontSize: 18, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, maxWidth: 640, marginLeft: 'auto', marginRight: 'auto' }}>
            Books, wellness offerings, and ways to give. Every purchase helps us share more stories and save more lives.
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          {/* Featured */}
          {featured.length > 0 && (
            <section style={{ marginBottom: 64 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24, flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <div className="section-label">Featured</div>
                  <h2 className="display" style={{ fontSize: 30, marginTop: 8 }}>Editor&apos;s Picks</h2>
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

          {/* All products */}
          <section>
            <div className="section-label">All Products</div>
            <h2 className="display" style={{ fontSize: 30, marginTop: 8, marginBottom: 28 }}>Browse the Collection</h2>
            <ShopBrowser products={cards} types={types} />
          </section>
        </div>
      </div>
    </>
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
        {p.image && <Image src={p.image} alt={p.title} fill sizes="(max-width: 640px) 50vw, 300px" style={{ objectFit: 'cover' }} />}
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
