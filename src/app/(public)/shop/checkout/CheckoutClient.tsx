'use client'

import { useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/shop/CartContext'
import { formatPrice } from '@/lib/shop/format'

const field: React.CSSProperties = {
  width: '100%', padding: '12px 14px', border: '1.5px solid var(--border)', borderRadius: 10, fontSize: 14, fontFamily: 'inherit', background: 'var(--white)', color: 'var(--navy)',
}
const label: React.CSSProperties = { display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--navy)', marginBottom: 6 }

export default function CheckoutClient() {
  const cart = useCart()
  const router = useRouter()
  const sp = useSearchParams()
  const donation = Number(sp.get('donation')) || 0
  const coupon = sp.get('coupon') || ''

  const paypalConfigured = !!process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID

  const [form, setForm] = useState({
    email: '', name: '', address1: '', address2: '', city: '', state: '', zip: '', country: 'United States', notes: '',
  })
  const [agree, setAgree] = useState(false)
  const [status, setStatus] = useState<'idle' | 'placing' | 'error'>('idle')
  const [err, setErr] = useState('')

  const needsShipping = cart.lines.some((l) => l.requiresShipping)
  const total = useMemo(() => cart.subtotal + donation, [cart.subtotal, donation])

  function upd(k: string, v: string) { setForm((f) => ({ ...f, [k]: v })) }

  async function placeOrder(e: React.FormEvent) {
    e.preventDefault()
    setErr('')
    if (!agree) { setErr('Please agree to the terms to continue.'); return }
    setStatus('placing')
    try {
      const res = await fetch('/api/shop/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          name: form.name,
          donation,
          coupon,
          paymentProvider: 'paypal',
          shippingAddress: needsShipping ? {
            address1: form.address1, address2: form.address2, city: form.city, state: form.state, zip: form.zip, country: form.country,
          } : null,
          notes: form.notes,
          items: cart.lines.map((l) => ({
            productId: l.productId, variantId: l.variantId, title: l.title, variantTitle: l.variantTitle,
            price: l.price, quantity: l.quantity, image: l.image,
          })),
        }),
      })
      const json = await res.json()
      if (!res.ok) { setStatus('error'); setErr(json.error || 'Could not place order.'); return }
      cart.clear()
      router.push(`/shop/order-confirmed?n=${json.orderNumber}`)
    } catch {
      setStatus('error'); setErr('Network error. Please try again.')
    }
  }

  if (cart.lines.length === 0) {
    return (
      <div className="container-md" style={{ textAlign: 'center', padding: '80px 0' }}>
        <h1 className="display" style={{ fontSize: 30, marginBottom: 16 }}>Your Cart is Empty</h1>
        <Link href="/shop" className="btn btn-emerald" style={{ padding: '14px 28px' }}>Go to Shop</Link>
      </div>
    )
  }

  return (
    <div className="container">
      <h1 className="display" style={{ fontSize: 34, marginBottom: 32 }}>Checkout</h1>
      <form onSubmit={placeOrder} style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 40, alignItems: 'start' }} className="cart-grid">
        {/* Left: details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <section>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, color: 'var(--navy)', marginBottom: 16 }}>Contact</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div><label style={label}>Full Name *</label><input required style={field} value={form.name} onChange={(e) => upd('name', e.target.value)} /></div>
              <div><label style={label}>Email *</label><input required type="email" style={field} value={form.email} onChange={(e) => upd('email', e.target.value)} /></div>
            </div>
          </section>

          {needsShipping && (
            <section>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, color: 'var(--navy)', marginBottom: 16 }}>Shipping Address</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div><label style={label}>Address *</label><input required style={field} value={form.address1} onChange={(e) => upd('address1', e.target.value)} /></div>
                <div><label style={label}>Apartment, suite, etc.</label><input style={field} value={form.address2} onChange={(e) => upd('address2', e.target.value)} /></div>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 14 }}>
                  <div><label style={label}>City *</label><input required style={field} value={form.city} onChange={(e) => upd('city', e.target.value)} /></div>
                  <div><label style={label}>State *</label><input required style={field} value={form.state} onChange={(e) => upd('state', e.target.value)} /></div>
                  <div><label style={label}>ZIP *</label><input required style={field} value={form.zip} onChange={(e) => upd('zip', e.target.value)} /></div>
                </div>
                <div><label style={label}>Country</label><input style={field} value={form.country} onChange={(e) => upd('country', e.target.value)} /></div>
              </div>
            </section>
          )}

          <section>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, color: 'var(--navy)', marginBottom: 16 }}>Order Notes (optional)</h2>
            <textarea style={{ ...field, minHeight: 80, resize: 'vertical' }} value={form.notes} onChange={(e) => upd('notes', e.target.value)} placeholder="Anything we should know?" />
          </section>

          <section>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, color: 'var(--navy)', marginBottom: 12 }}>Payment</h2>
            <div style={{ padding: 18, background: 'var(--secondary)', borderRadius: 12, fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 }}>
              {paypalConfigured ? (
                <>Secure payment via <strong style={{ color: 'var(--navy)' }}>PayPal</strong>. You&apos;ll complete payment on the next step.</>
              ) : (
                <>We&apos;ll email you a <strong style={{ color: 'var(--navy)' }}>secure PayPal invoice</strong> to complete your payment. Your order is reserved as soon as you place it. Questions? <a href="mailto:Save1Person@aol.com" style={{ color: 'var(--emerald)' }}>Save1Person@aol.com</a>.</>
              )}
            </div>
          </section>

          <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13, color: 'var(--muted)' }}>
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} style={{ marginTop: 3 }} />
            <span>I agree to the <Link href="/privacy" style={{ color: 'var(--emerald)' }}>privacy policy</Link> and understand donations, digital items, and booked sessions are non-refundable.</span>
          </label>

          {err && <div style={{ padding: 14, background: '#fef2f2', border: '1.5px solid #fca5a5', borderRadius: 10, color: '#991b1b', fontSize: 14 }}>{err}</div>}
        </div>

        {/* Right: summary */}
        <div style={{ background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-2xl)', padding: 28, position: 'sticky', top: 100 }}>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, color: 'var(--navy)', marginBottom: 18 }}>Order Summary</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 18 }}>
            {cart.lines.map((l) => (
              <div key={l.variantId} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ position: 'relative', width: 48, height: 48, borderRadius: 8, overflow: 'hidden', background: 'var(--secondary)', flexShrink: 0 }}>
                  {l.image && <Image src={l.image} alt={l.title} fill sizes="48px" style={{ objectFit: 'cover' }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', lineHeight: 1.3 }}>{l.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>Qty {l.quantity}</div>
                </div>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{formatPrice(l.price * l.quantity)}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, paddingTop: 14, borderTop: '1.5px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--muted)' }}>Subtotal</span><span>{formatPrice(cart.subtotal)}</span></div>
            {donation > 0 && <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--muted)' }}>Donation</span><span>{formatPrice(donation)}</span></div>}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--muted)' }}>Shipping</span><span style={{ color: 'var(--muted)' }}>{needsShipping ? 'Invoiced' : 'Free'}</span></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 14, marginTop: 14, borderTop: '1.5px solid var(--border)', fontSize: 18, fontWeight: 700, color: 'var(--navy)' }}>
            <span>Total</span><span>{formatPrice(total)}</span>
          </div>
          <button type="submit" disabled={status === 'placing'} className="btn btn-emerald" style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: 14, fontWeight: 700, marginTop: 20, opacity: status === 'placing' ? 0.6 : 1 }}>
            {status === 'placing' ? 'Placing Order…' : 'Place Order'}
          </button>
          <p style={{ fontSize: 11, color: 'var(--muted)', textAlign: 'center', marginTop: 10 }}>🔒 Secure order. No card details stored on our servers.</p>
        </div>
      </form>
      <style>{`@media (max-width: 820px){ .cart-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  )
}
