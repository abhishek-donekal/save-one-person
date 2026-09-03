'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/shop/CartContext'
import { formatPrice } from '@/lib/shop/format'
import { shopifyCheckoutUrl } from '@/lib/shop/checkout'

export default function CartDrawer() {
  const cart = useCart()

  return (
    <>
      {cart.isOpen && (
        <div
          onClick={cart.close}
          style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(3px)', zIndex: 1200, transition: 'opacity 200ms' }}
          aria-hidden="true"
        />
      )}
      <aside
        aria-label="Shopping cart"
        aria-hidden={!cart.isOpen}
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(420px, 92vw)',
          background: 'var(--white)', zIndex: 1201, boxShadow: '-8px 0 40px rgba(0,0,0,0.18)',
          transform: cart.isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 280ms cubic-bezier(0.4,0,0.2,1)',
          display: 'flex', flexDirection: 'column',
        }}
      >
        <div style={{ padding: '20px 24px', borderBottom: '1.5px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, color: 'var(--navy)' }}>Your Cart ({cart.count})</h2>
          <button onClick={cart.close} aria-label="Close cart" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, color: 'var(--muted)' }}>×</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
          {cart.lines.length === 0 ? (
            <div style={{ padding: '48px 16px', textAlign: 'center', color: 'var(--muted)' }}>
              <p style={{ fontSize: 15, marginBottom: 20 }}>Your cart is empty.</p>
              <Link href="/shop" onClick={cart.close} className="btn btn-emerald" style={{ padding: '12px 24px', fontSize: 13 }}>Browse the Shop</Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {cart.lines.map((l) => (
                <div key={l.variantId} style={{ display: 'flex', gap: 12, padding: 12, border: '1.5px solid var(--border)', borderRadius: 14 }}>
                  <div style={{ position: 'relative', width: 64, height: 64, borderRadius: 10, overflow: 'hidden', background: 'var(--secondary)', flexShrink: 0 }}>
                    {l.image && <Image src={l.image} alt={l.title} fill sizes="64px" style={{ objectFit: 'cover' }} />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Link href={`/shop/${l.handle}`} onClick={cart.close} style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', textDecoration: 'none', display: 'block', lineHeight: 1.3 }}>
                      {l.title}
                    </Link>
                    {l.variantTitle && l.variantTitle !== 'Default Title' && (
                      <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{l.variantTitle}</div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', border: '1.5px solid var(--border)', borderRadius: 8 }}>
                        <button onClick={() => cart.setQty(l.variantId, l.quantity - 1)} aria-label="Decrease" style={qtyBtn}>−</button>
                        <span style={{ minWidth: 28, textAlign: 'center', fontSize: 13, fontWeight: 600 }}>{l.quantity}</span>
                        <button onClick={() => cart.setQty(l.variantId, l.quantity + 1)} aria-label="Increase" style={qtyBtn}>+</button>
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--navy)' }}>{formatPrice(l.price * l.quantity)}</span>
                    </div>
                    <button onClick={() => cart.remove(l.variantId)} style={{ marginTop: 6, background: 'none', border: 'none', color: 'var(--muted)', fontSize: 11, cursor: 'pointer', padding: 0, textDecoration: 'underline' }}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.lines.length > 0 && (
          <div style={{ padding: 20, borderTop: '1.5px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, fontSize: 15 }}>
              <span style={{ color: 'var(--muted)' }}>Subtotal</span>
              <span style={{ fontWeight: 700, color: 'var(--navy)' }}>{formatPrice(cart.subtotal)}</span>
            </div>
            <Link href="/shop/cart" onClick={cart.close} className="btn btn-navy" style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '12px', fontSize: 13, marginBottom: 8 }}>View Cart</Link>
            <button
              onClick={() => { const u = shopifyCheckoutUrl(cart.lines); if (u) window.location.href = u }}
              className="btn btn-emerald"
              style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '14px', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer' }}
            >
              Checkout →
            </button>
            <p style={{ marginTop: 8, fontSize: 11, color: 'var(--muted)', textAlign: 'center' }}>Secure checkout · PayPal, cards, Apple &amp; Google Pay</p>
          </div>
        )}
      </aside>
    </>
  )
}

const qtyBtn: React.CSSProperties = {
  width: 28, height: 28, border: 'none', background: 'none', cursor: 'pointer', fontSize: 15, color: 'var(--navy)',
}
