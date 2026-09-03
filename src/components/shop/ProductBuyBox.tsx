'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/lib/shop/CartContext'
import { formatPrice } from '@/lib/shop/format'
import type { ShopProduct } from '@/lib/shop/types'

export default function ProductBuyBox({ product }: { product: ShopProduct }) {
  const cart = useCart()
  const router = useRouter()
  const [variantId, setVariantId] = useState(product.variants[0]?.id ?? '')
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0]
  const image = product.images[0]?.url ?? null
  const onSale = variant?.compare_at_price && variant.compare_at_price > variant.price
  const multi = product.variants.length > 1

  function buildLine() {
    return {
      productId: product.id,
      variantId: variant.id,
      shopifyVariantId: variant.shopify_id,
      handle: product.handle,
      title: product.title,
      variantTitle: multi ? (variant.title ?? null) : null,
      price: variant.price,
      image,
      requiresShipping: variant.requires_shipping,
    }
  }

  function addToCart() {
    if (!variant?.available) return
    cart.add(buildLine(), qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  function buyNow() {
    if (!variant?.available) return
    if (variant.shopify_id) {
      window.location.href = `https://save-one-person.myshopify.com/cart/${variant.shopify_id}:${qty}`
      return
    }
    cart.add(buildLine(), qty)
    cart.close()
    router.push('/shop/cart')
  }

  return (
    <div>
      {/* Price */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 20 }}>
        <span style={{ fontFamily: "'Fraunces', serif", fontSize: 32, fontWeight: 600, color: 'var(--navy)' }}>{formatPrice(variant?.price ?? 0)}</span>
        {onSale && <span style={{ fontSize: 18, color: 'var(--muted)', textDecoration: 'line-through' }}>{formatPrice(variant.compare_at_price!)}</span>}
        {onSale && <span style={{ fontSize: 12, fontWeight: 700, color: '#dc2626', background: '#fef2f2', padding: '3px 8px', borderRadius: 6 }}>SALE</span>}
      </div>

      {/* Availability */}
      <div style={{ marginBottom: 20, fontSize: 13, fontWeight: 600, color: variant?.available ? 'var(--emerald)' : '#dc2626' }}>
        {variant?.available ? '● In Stock' : '● Sold Out'}
        {variant?.sku && <span style={{ marginLeft: 12, color: 'var(--muted)', fontWeight: 400 }}>SKU: {variant.sku}</span>}
      </div>

      {/* Variant selector */}
      {multi && (
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 8 }}>
            {product.options[0]?.name || 'Option'}
          </label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {product.variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setVariantId(v.id)}
                disabled={!v.available}
                style={{
                  padding: '10px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: v.available ? 'pointer' : 'not-allowed',
                  border: `2px solid ${v.id === variantId ? 'var(--emerald)' : 'var(--border)'}`,
                  background: v.id === variantId ? 'var(--emerald)' : 'var(--white)',
                  color: v.id === variantId ? 'white' : 'var(--navy)',
                  opacity: v.available ? 1 : 0.4,
                }}
              >
                {v.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div style={{ marginBottom: 24 }}>
        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 8 }}>Quantity</label>
        <div style={{ display: 'inline-flex', alignItems: 'center', border: '1.5px solid var(--border)', borderRadius: 10 }}>
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" style={qtyBtn}>−</button>
          <span style={{ minWidth: 44, textAlign: 'center', fontSize: 15, fontWeight: 600 }}>{qty}</span>
          <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity" style={qtyBtn}>+</button>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button
          onClick={addToCart}
          disabled={!variant?.available}
          className="btn btn-navy"
          style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: 14, fontWeight: 700, opacity: variant?.available ? 1 : 0.5, cursor: variant?.available ? 'pointer' : 'not-allowed' }}
        >
          {added ? '✓ Added to Cart' : variant?.available ? 'Add to Cart' : 'Sold Out'}
        </button>
        <button
          onClick={buyNow}
          disabled={!variant?.available}
          className="btn btn-emerald"
          style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: 14, fontWeight: 700, opacity: variant?.available ? 1 : 0.5, cursor: variant?.available ? 'pointer' : 'not-allowed' }}
        >
          Buy Now
        </button>
      </div>
    </div>
  )
}

const qtyBtn: React.CSSProperties = { width: 40, height: 44, border: 'none', background: 'none', cursor: 'pointer', fontSize: 18, color: 'var(--navy)' }
