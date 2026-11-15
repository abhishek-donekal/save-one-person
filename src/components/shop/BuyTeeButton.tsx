import Link from 'next/link'

// Big, bright "buy the tee" call to action (matches the yellow banner in the tee videos).
export default function BuyTeeButton({ label = 'BUY THE T-SHIRT' }: { label?: string }) {
  return (
    <div style={{ marginTop: 22 }}>
      <Link
        href="/shop/go-bless-yourself-t-shirt"
        style={{
          display: 'inline-block',
          background: '#FFD500',
          color: '#111',
          fontWeight: 900,
          fontSize: 24,
          letterSpacing: 0.5,
          padding: '20px 40px',
          borderRadius: 999,
          textDecoration: 'none',
          boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
          border: '3px solid #111',
          textAlign: 'center',
          maxWidth: '100%',
        }}
      >
        🛍️ {label} &rarr;
      </Link>
      <div style={{ marginTop: 12, fontSize: 20, fontWeight: 800, color: '#dc2626' }}>
        Saveonepersonnow.org/shop
      </div>
    </div>
  )
}
