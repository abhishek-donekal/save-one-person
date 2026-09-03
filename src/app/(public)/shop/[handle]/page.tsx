import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProductByHandle, getAllProducts, productMinPrice, productCompareAt, formatPrice } from '@/lib/shop/queries'
import ProductGallery from '@/components/shop/ProductGallery'
import ProductBuyBox from '@/components/shop/ProductBuyBox'
import ShareButtons from '@/components/shop/ShareButtons'
import type { CardProduct } from '@/components/shop/ProductCard'
import ProductCard from '@/components/shop/ProductCard'

interface Props { params: Promise<{ handle: string }> }

export const revalidate = 300

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params
  const p = await getProductByHandle(handle)
  if (!p) return { title: 'Product Not Found' }
  const img = p.images[0]?.url
  return {
    title: p.seo_title || p.title,
    description: p.seo_description || p.description_text?.slice(0, 200) || undefined,
    alternates: { canonical: `/shop/${p.handle}` },
    openGraph: {
      title: p.title,
      description: p.seo_description || undefined,
      images: img ? [{ url: img }] : undefined,
      type: 'website',
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params
  const product = await getProductByHandle(handle)
  if (!product) notFound()

  const price = productMinPrice(product)
  const compareAt = productCompareAt(product)
  const available = product.variants.some((v) => v.available)

  // related: same type, else featured
  const all = await getAllProducts()
  const related = all
    .filter((p) => p.handle !== product.handle && (p.product_type === product.product_type || p.featured))
    .slice(0, 4)
    .map((p): CardProduct => {
      const v = p.variants[0]
      return {
        id: p.id, handle: p.handle, title: p.title, product_type: p.product_type,
        image: p.images[0]?.url ?? null, price: productMinPrice(p), compareAt: productCompareAt(p),
        available: p.variants.some((x) => x.available), variantId: v?.id ?? '', shopifyVariantId: v?.shopify_id ?? null, variantTitle: v?.title ?? null,
        requiresShipping: v?.requires_shipping ?? true, multiVariant: p.variants.length > 1,
      }
    })

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: product.images.map((i) => i.url),
    description: product.description_text || product.title,
    sku: product.variants[0]?.sku || undefined,
    brand: { '@type': 'Brand', name: product.vendor || 'Save One Person' },
    offers: {
      '@type': 'Offer',
      price: price,
      priceCurrency: 'USD',
      availability: available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `https://www.saveonepersonnow.org/shop/${product.handle}`,
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="page-content" style={{ paddingTop: 120 }}>
        <div className="container">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 28, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: 'var(--muted)' }}>Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/shop" style={{ color: 'var(--muted)' }}>Shop</Link>
            <span aria-hidden="true">/</span>
            <span style={{ color: 'var(--navy)', fontWeight: 500 }}>{product.title}</span>
          </nav>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }} className="product-grid">
            <ProductGallery images={product.images} title={product.title} />

            <div>
              {product.product_type && (
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--emerald)', marginBottom: 10 }}>{product.product_type}</div>
              )}
              <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(26px,4vw,38px)', color: 'var(--navy)', lineHeight: 1.15, marginBottom: 20 }}>{product.title}</h1>

              <ProductBuyBox product={product} />

              {/* Impact */}
              <div style={{ marginTop: 24, padding: 18, background: '#ecfdf5', border: '1.5px solid #a7f3d0', borderRadius: 14, fontSize: 14, color: '#065f46', lineHeight: 1.6 }}>
                💚 <strong>Your purchase gives back.</strong> Proceeds support Save One Person&apos;s mission to connect patients with life-saving donors.
              </div>

              <div style={{ marginTop: 20 }}>
                <ShareButtons title={product.title} handle={product.handle} />
              </div>

              {/* Shipping / Returns */}
              <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <details style={detailStyle}>
                  <summary style={summaryStyle}>Shipping</summary>
                  <p style={detailBody}>Physical items ship within 3–5 business days with tracking. Digital items, sessions, and donations are delivered or scheduled by email after purchase.</p>
                </details>
                <details style={detailStyle}>
                  <summary style={summaryStyle}>Returns</summary>
                  <p style={detailBody}>Physical products may be returned within 30 days in original condition. Donations, digital downloads, and booked sessions are non-refundable. Questions? Email Save1Person@aol.com.</p>
                </details>
              </div>
            </div>
          </div>

          {/* Description + Specs */}
          <div style={{ marginTop: 64, display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 48, alignItems: 'start' }} className="product-grid">
            <div>
              <h2 className="display" style={{ fontSize: 24, marginBottom: 16 }}>Description</h2>
              {product.body_html ? (
                <div className="shop-desc" style={{ fontSize: 16, lineHeight: 1.8, color: 'rgba(28,32,41,0.85)' }} dangerouslySetInnerHTML={{ __html: product.body_html }} />
              ) : (
                <p style={{ fontSize: 16, lineHeight: 1.8, color: 'rgba(28,32,41,0.85)' }}>{product.description_text || 'No description available.'}</p>
              )}
            </div>
            <div>
              <h2 className="display" style={{ fontSize: 24, marginBottom: 16 }}>Details</h2>
              <dl style={{ fontSize: 14, color: 'var(--muted)', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {product.product_type && <SpecRow k="Type" v={product.product_type} />}
                {product.vendor && <SpecRow k="Vendor" v={product.vendor} />}
                {product.variants[0]?.sku && <SpecRow k="SKU" v={product.variants[0].sku} />}
                <SpecRow k="Price" v={compareAt ? `${formatPrice(price)} (was ${formatPrice(compareAt)})` : formatPrice(price)} />
                <SpecRow k="Availability" v={available ? 'In Stock' : 'Sold Out'} />
              </dl>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <section style={{ marginTop: 80 }}>
              <h2 className="display" style={{ fontSize: 26, marginBottom: 24 }}>You May Also Like</h2>
              <div className="shop-grid">
                {related.map((p) => <ProductCard key={p.id} p={p} />)}
              </div>
            </section>
          )}

          <div style={{ marginTop: 48 }}>
            <Link href="/shop" style={{ fontSize: 14, fontWeight: 600, color: 'var(--muted)' }}>← Back to Shop</Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) { .product-grid { grid-template-columns: 1fr !important; gap: 32px !important; } }
        .shop-desc img { max-width: 100%; height: auto; border-radius: 12px; }
        .shop-desc p { margin-bottom: 14px; }
        .shop-desc a { color: var(--emerald); }
      `}</style>
    </>
  )
}

function SpecRow({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, paddingBottom: 8, borderBottom: '1px solid var(--border)' }}>
      <dt style={{ fontWeight: 600, color: 'var(--navy)' }}>{k}</dt>
      <dd style={{ textAlign: 'right' }}>{v}</dd>
    </div>
  )
}

const detailStyle: React.CSSProperties = { border: '1.5px solid var(--border)', borderRadius: 12, padding: '0 16px' }
const summaryStyle: React.CSSProperties = { cursor: 'pointer', padding: '14px 0', fontWeight: 600, fontSize: 14, color: 'var(--navy)', listStyle: 'none' }
const detailBody: React.CSSProperties = { padding: '0 0 14px', fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 }
