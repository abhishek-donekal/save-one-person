'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/lib/shop/CartContext'
import { formatPrice } from '@/lib/shop/format'
import { shopifyCheckoutUrl } from '@/lib/shop/checkout'

export default function CartPage() {
  const cart = useCart()
  const [coupon, setCoupon] = useState('')
  const [applied, setApplied] = useState<{ code: string; type: string; amount: number } | null>(null)
  const [couponMsg, setCouponMsg] = useState('')
  const [donation, setDonation] = useState(0)

  const discount = applied
    ? applied.type === 'percent'
      ? (cart.subtotal * applied.amount) / 100
      : Math.min(applied.amount, cart.subtotal)
    : 0
  const total = Math.max(0, cart.subtotal - discount) + donation

  async function applyCoupon() {
    setCouponMsg('')
    if (!coupon.trim()) return
    const res = await fetch(`/api/shop/coupon?code=${encodeURIComponent(coupon.trim())}`)
    const json = await res.json()
    if (!res.ok || !json.valid) {
      setApplied(null)
      setCouponMsg(json.error || 'Invalid or expired code.')
      return
    }
    setApplied({ code: json.code, type: json.discount_type, amount: json.amount })
    setCouponMsg(`Applied ${json.code}.`)
  }

  if (cart.lines.length === 0) {
    return (
      <div className="page-content" style={{ paddingTop: 130 }}>
        <div className="container-md" style={{ textAlign: 'center', padding: '60px 0' }}>
          <h1 className="display" style={{ fontSize: 32, marginBottom: 16 }}>Your Cart is Empty</h1>
          <p style={{ color: 'var(--muted)', marginBottom: 28 }}>Browse the shop and support the mission.</p>
          <Link href="/shop" className="btn btn-emerald" style={{ padding: '14px 28px' }}>Go to Shop</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page-content" style={{ paddingTop: 120 }}>
      <div className="container">
        <h1 className="display" style={{ fontSize: 34, marginBottom: 32 }}>Your Cart</h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 40, alignItems: 'start' }} className="cart-grid">
          {/* Lines */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {cart.lines.map((l) => (
              <div key={l.variantId} style={{ display: 'flex', gap: 16, padding: 16, border: '1.5px solid var(--border)', borderRadius: 16, background: 'var(--white)' }}>
                <div style={{ position: 'relative', width: 90, height: 90, borderRadius: 12, overflow: 'hidden', background: 'var(--secondary)', flexShrink: 0 }}>
                  {l.image && <Image src={l.image} alt={l.title} fill sizes="90px" style={{ objectFit: 'cover' }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Link href={`/shop/${l.handle}`} style={{ fontSize: 15, fontWeight: 600, color: 'var(--navy)', textDecoration: 'none' }}>{l.title}</Link>
                  {l.variantTitle && l.variantTitle !== 'Default Title' && <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>{l.variantTitle}</div>}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, flexWrap: 'wrap', gap: 10 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', border: '1.5px solid var(--border)', borderRadius: 8 }}>
                      <button onClick={() => cart.setQty(l.variantId, l.quantity - 1)} aria-label="Decrease" style={qtyBtn}>−</button>
                      <span style={{ minWidth: 34, textAlign: 'center', fontSize: 14, fontWeight: 600 }}>{l.quantity}</span>
                      <button onClick={() => cart.setQty(l.variantId, l.quantity + 1)} aria-label="Increase" style={qtyBtn}>+</button>
                    </div>
                    <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)' }}>{formatPrice(l.price * l.quantity)}</span>
                  </div>
                  <button onClick={() => cart.remove(l.variantId)} style={{ marginTop: 8, background: 'none', border: 'none', color: 'var(--muted)', fontSize: 12, cursor: 'pointer', padding: 0, textDecoration: 'underline' }}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div style={{ background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-2xl)', padding: 28, position: 'sticky', top: 100 }}>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, color: 'var(--navy)', marginBottom: 20 }}>Order Summary</h2>

            {/* Coupon */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Coupon code" style={{ flex: 1, padding: '10px 12px', border: '1.5px solid var(--border)', borderRadius: 8, fontSize: 13 }} />
                <button onClick={applyCoupon} className="btn btn-navy" style={{ padding: '10px 16px', fontSize: 13 }}>Apply</button>
              </div>
              {couponMsg && <p style={{ fontSize: 12, marginTop: 6, color: applied ? 'var(--emerald)' : '#dc2626' }}>{couponMsg}</p>}
            </div>

            {/* Donation add-on */}
            <div style={{ marginBottom: 20, padding: 14, background: 'var(--secondary)', borderRadius: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', marginBottom: 8 }}>Add a donation? 💚</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {[0, 5, 10, 25].map((d) => (
                  <button key={d} onClick={() => setDonation(d)} style={{ padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: `1.5px solid ${donation === d ? 'var(--emerald)' : 'var(--border)'}`, background: donation === d ? 'var(--emerald)' : 'var(--white)', color: donation === d ? 'white' : 'var(--navy)' }}>
                    {d === 0 ? 'None' : `$${d}`}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, marginBottom: 16 }}>
              <Row k="Subtotal" v={formatPrice(cart.subtotal)} />
              {discount > 0 && <Row k={`Discount (${applied?.code})`} v={`−${formatPrice(discount)}`} green />}
              {donation > 0 && <Row k="Donation" v={formatPrice(donation)} />}
              <Row k="Shipping" v="Calculated at checkout" muted />
              <Row k="Tax" v="Calculated at checkout" muted />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 16, borderTop: '1.5px solid var(--border)', fontSize: 18, fontWeight: 700, color: 'var(--navy)' }}>
              <span>Total</span><span>{formatPrice(total)}</span>
            </div>

            <button
              onClick={() => { const u = shopifyCheckoutUrl(cart.lines); if (u) window.location.href = u }}
              className="btn btn-emerald"
              style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '16px', fontSize: 14, fontWeight: 700, marginTop: 20, border: 'none', cursor: 'pointer' }}
            >
              Proceed to Secure Checkout →
            </button>
            <p style={{ marginTop: 10, fontSize: 12, color: 'var(--muted)', textAlign: 'center', lineHeight: 1.5 }}>
              🔒 Pay with PayPal, credit/debit card, Apple Pay, or Google Pay.
            </p>
            <Link href="/shop" style={{ display: 'block', textAlign: 'center', marginTop: 12, fontSize: 13, color: 'var(--muted)' }}>Continue Shopping</Link>
          </div>
        </div>
      </div>

      <style>{`@media (max-width: 820px){ .cart-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  )
}

function Row({ k, v, muted, green }: { k: string; v: string; muted?: boolean; green?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ color: 'var(--muted)' }}>{k}</span>
      <span style={{ color: green ? 'var(--emerald)' : muted ? 'var(--muted)' : 'var(--navy)', fontWeight: green ? 600 : 400 }}>{v}</span>
    </div>
  )
}

const qtyBtn: React.CSSProperties = { width: 34, height: 34, border: 'none', background: 'none', cursor: 'pointer', fontSize: 16, color: 'var(--navy)' }
