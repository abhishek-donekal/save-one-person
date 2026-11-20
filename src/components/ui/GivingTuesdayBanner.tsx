'use client'

import Link from 'next/link'
import { useSyncExternalStore } from 'react'

// Giving Tuesday 2026 (Tue Dec 1). Shown on the homepage and /donate through the end of
// Wed Dec 2, 2026 (Eastern time), then it hides itself. Safe to delete after that.
const HIDE_AFTER = Date.parse('2026-12-03T00:00:00-05:00')

const subscribe = () => () => {}
const stillOn = () => Date.now() < HIDE_AFTER
const serverCopy = () => true

export default function GivingTuesdayBanner() {
  // The server copy may be cached, so the browser re-checks the date.
  const show = useSyncExternalStore(subscribe, stillOn, serverCopy)
  if (!show) return null

  return (
    <div className="container" style={{ marginTop: 24, marginBottom: 8 }}>
      <Link
        href="/giving-tuesday"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, flexWrap: 'wrap',
          padding: '14px 20px', borderRadius: 'var(--r-2xl)', background: 'var(--navy)', color: '#fff',
          textDecoration: 'none', textAlign: 'center', fontSize: 15, lineHeight: 1.5,
        }}
      >
        <span style={{ fontWeight: 700, color: '#f2c46d', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: 12 }}>
          Giving Tuesday · Dec 1
        </span>
        <span>Help us save one more life.</span>
        <span style={{ fontWeight: 700, textDecoration: 'underline' }}>See how your gift helps →</span>
      </Link>
    </div>
  )
}
