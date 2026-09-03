'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/shop/CartContext'
import { formatPrice } from '@/lib/shop/format'

export type CardProduct = {
  id: string
  handle: string
  title: string
  product_type: string | null
  image: string | null
  price: number
  compareAt: number | null
  available: boolean
  variantId: string
  shopifyVariantId: number | null
  variantTitle: string | null
  requiresShipping: boolean
  multiVariant: boolean
}

export default function ProductCard({ p }: { p: CardProduct }) {
  const cart = useCart()
  const onSale = p.compareAt && p.compareAt > p.price

  function quickAdd(e: React.MouseEvent) {
    e.preventDefault()
    if (p.multiVariant) {
      window.location.href = `/shop/${p.handle}`
      return
    }
    cart.add({
      productId: p.id,
      variantId: p.variantId,
      shopifyVariantId: p.shopifyVariantId,
      handle: p.handle,
      title: p.title,
      variantTitle: p.variantTitle,
      price: p.price,
      image: p.image,
      requiresShipping: p.requiresShipping,
    })
  }

  return (
    <div className="hover-lift" style={{ background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-2xl)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <Link href={`/shop/${p.handle}`} style={{ position: 'relative', display: 'block', aspectRatio: '1/1', background: 'var(--secondary)' }}>
        {p.image ? (
          <Image src={p.image} alt={p.title} fill sizes="(max-width: 640px) 50vw, 300px" style={{ objectFit: 'cover' }} />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--muted)', fontSize: 13 }}>No image</div>
        )}
        {onSale && (
          <span style={{ position: 'absolute', top: 10, left: 10, background: '#dc2626', color: 'white', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 8px', borderRadius: 6 }}>Sale</span>
        )}
        {!p.available && (
          <span style={{ position: 'absolute', top: 10, right: 10, background: 'var(--navy)', color: 'white', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', padding: '4px 8px', borderRadius: 6 }}>Sold Out</span>
        )}
      </Link>
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', flex: 1 }}>
        {p.product_type && (
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--emerald)', marginBottom: 6 }}>{p.product_type}</div>
        )}
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--navy)', lineHeight: 1.4, marginBottom: 10 }}>
          <Link href={`/shop/${p.handle}`} style={{ color: 'var(--navy)', textDecoration: 'none' }}>{p.title}</Link>
        </h3>
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
          <span style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, color: 'var(--navy)' }}>{formatPrice(p.price)}</span>
          {onSale && <span style={{ fontSize: 13, color: 'var(--muted)', textDecoration: 'line-through' }}>{formatPrice(p.compareAt!)}</span>}
        </div>
        <button
          onClick={quickAdd}
          disabled={!p.available}
          className="btn btn-navy"
          style={{ width: '100%', justifyContent: 'center', padding: '10px', fontSize: 12, opacity: p.available ? 1 : 0.5, cursor: p.available ? 'pointer' : 'not-allowed' }}
        >
          {!p.available ? 'Sold Out' : p.multiVariant ? 'Choose Options' : p.price === 0 ? 'Add — Free' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}
