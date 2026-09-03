import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Order Confirmed',
  robots: { index: false, follow: false },
}

export default async function OrderConfirmedPage({ searchParams }: { searchParams: Promise<{ n?: string }> }) {
  const { n } = await searchParams
  return (
    <div className="page-content" style={{ paddingTop: 140 }}>
      <div className="container-md" style={{ textAlign: 'center', padding: '40px 0 80px' }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>✓</div>
        <h1 className="display" style={{ fontSize: 36, marginBottom: 16 }}>Thank You for Your Order!</h1>
        {n && <p style={{ fontSize: 16, color: 'var(--navy)', fontWeight: 600, marginBottom: 12 }}>Order #{n}</p>}
        <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 520, margin: '0 auto 32px' }}>
          Your order has been received. We&apos;ll email you a secure PayPal invoice to complete payment and confirm the details. Thank you for supporting Save One Person&apos;s life-saving mission.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/shop" className="btn btn-emerald" style={{ padding: '14px 28px' }}>Continue Shopping</Link>
          <Link href="/" className="btn btn-navy" style={{ padding: '14px 28px' }}>Back to Home</Link>
        </div>
      </div>
    </div>
  )
}
