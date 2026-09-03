'use client'

import { useCart } from '@/lib/shop/CartContext'

export default function CartButton({ scrolled }: { scrolled: boolean }) {
  const cart = useCart()
  const color = scrolled ? 'var(--navy)' : 'rgba(255,255,255,0.92)'

  return (
    <button
      type="button"
      onClick={cart.open}
      aria-label={`Cart, ${cart.count} items`}
      style={{ position: 'relative', background: 'transparent', border: 'none', padding: 8, cursor: 'pointer', color, display: 'inline-flex', alignItems: 'center' }}
    >
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
      {cart.count > 0 && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute', top: 2, right: 2, minWidth: 16, height: 16, padding: '0 4px',
            borderRadius: 999, background: 'var(--emerald)', color: 'white', fontSize: 10, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1,
          }}
        >
          {cart.count}
        </span>
      )}
    </button>
  )
}
