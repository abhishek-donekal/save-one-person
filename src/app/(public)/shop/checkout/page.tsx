import type { Metadata } from 'next'
import { Suspense } from 'react'
import CheckoutClient from './CheckoutClient'

export const metadata: Metadata = {
  title: 'Checkout',
  robots: { index: false, follow: false },
}

export default function CheckoutPage() {
  return (
    <div className="page-content" style={{ paddingTop: 120 }}>
      <Suspense fallback={<div className="container" style={{ padding: '60px 0', textAlign: 'center', color: 'var(--muted)' }}>Loading checkout…</div>}>
        <CheckoutClient />
      </Suspense>
    </div>
  )
}
