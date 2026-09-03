'use client'

import { useState } from 'react'
import { donationCheckoutUrl, DONATION_VARIANTS } from '@/lib/shop/checkout'

const PRESET_AMOUNTS = [25, 50, 100, 250, 500, 1000] as const

const IMPACT_COPY: Record<number, string> = {
  25: 'Helps share one story on social media — hundreds of potential donors reached.',
  50: 'Funds email outreach to media contacts for one patient story.',
  100: 'Contributes to a radio segment that can reach thousands of listeners.',
  250: 'Helps produce a video story that can go viral.',
  500: 'Supports a TV pitch that could land a national news segment.',
  1000: 'A major gift that funds our technology and expands operations.',
}

const TIERS = DONATION_VARIANTS.map((v) => v.amount)
function nearestTier(amount: number): number {
  const atOrBelow = [...TIERS].reverse().find((t) => t <= amount)
  return atOrBelow ?? TIERS[0]
}

export default function DonateForm({ ein }: { pgfUrl?: string; ein?: string }) {
  const [selectedAmount, setSelectedAmount] = useState<number>(100)
  const [customAmount, setCustomAmount] = useState<string>('')

  const rawAmount = customAmount ? Number(customAmount.replace(/[^0-9.]/g, '')) : selectedAmount
  const isValidAmount = rawAmount >= 25 && rawAmount < 1_000_000
  const chargedAmount = isValidAmount ? (customAmount ? nearestTier(rawAmount) : selectedAmount) : 0
  const href = isValidAmount ? donationCheckoutUrl(rawAmount) : null

  const impact = customAmount
    ? (isValidAmount ? 'Every dollar directly funds media outreach that helps patients find donors.' : 'Enter an amount of $25 or more.')
    : (IMPACT_COPY[selectedAmount] ?? 'Every dollar directly funds media outreach that helps patients find donors.')

  return (
    <div style={{ background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-3xl)', padding: 32, boxShadow: 'var(--shadow-soft)' }}>
      <div className="section-label" style={{ marginBottom: 16 }}>Choose Your Gift</div>

      {/* Amount tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 16 }}>
        {PRESET_AMOUNTS.map((amt) => {
          const active = !customAmount && selectedAmount === amt
          return (
            <button
              key={amt}
              type="button"
              onClick={() => { setSelectedAmount(amt); setCustomAmount('') }}
              aria-pressed={active}
              style={{
                padding: '16px 10px',
                border: `2px solid ${active ? 'var(--emerald)' : 'var(--border)'}`,
                borderRadius: 14,
                background: active ? 'var(--emerald)' : 'var(--white)',
                color: active ? 'white' : 'var(--navy)',
                fontFamily: "'Fraunces', serif",
                fontSize: 21,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 180ms',
              }}
            >
              ${amt.toLocaleString()}
            </button>
          )
        })}
      </div>

      {/* Custom amount */}
      <label style={{ display: 'block', marginBottom: 24 }}>
        <span style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>Or Enter Custom Amount</span>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', fontFamily: "'Fraunces', serif", fontSize: 18 }} aria-hidden="true">$</span>
          <input
            type="text"
            inputMode="decimal"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value.replace(/[^0-9.]/g, ''))}
            placeholder="Custom amount"
            aria-label="Custom donation amount in dollars"
            style={{ width: '100%', padding: '14px 16px 14px 32px', border: '1.5px solid var(--border)', borderRadius: 12, fontSize: 16, fontFamily: 'inherit', background: 'var(--white)', color: 'var(--navy)' }}
          />
        </div>
        {customAmount && isValidAmount && chargedAmount !== rawAmount && (
          <span style={{ display: 'block', fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>
            Processed at the nearest available amount: ${chargedAmount.toLocaleString()}.
          </span>
        )}
      </label>

      {/* Impact line */}
      <div style={{ padding: '14px 16px', background: 'var(--secondary)', borderRadius: 12, marginBottom: 24, fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 }}>
        <strong style={{ color: 'var(--navy)' }}>Your impact:</strong> {impact}
      </div>

      {/* Primary CTA — working secure checkout (PayPal + cards) */}
      {href ? (
        <a
          href={href}
          className="btn btn-emerald"
          style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '18px 24px', fontSize: 15, fontWeight: 700, letterSpacing: '0.08em' }}
        >
          Donate ${chargedAmount.toLocaleString()} — Secure Checkout →
        </a>
      ) : (
        <button type="button" disabled className="btn btn-emerald" style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '18px 24px', fontSize: 15, fontWeight: 700, opacity: 0.5, cursor: 'not-allowed' }}>
          Enter an Amount ($25+)
        </button>
      )}

      {/* Payment methods */}
      <p style={{ marginTop: 12, fontSize: 12, color: 'var(--muted)', textAlign: 'center', lineHeight: 1.6 }}>
        🔒 Pay with <strong style={{ color: 'var(--navy)' }}>PayPal</strong>, credit/debit card, Apple Pay, or Google Pay.
      </p>

      {/* Trust markers */}
      <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1.5px solid var(--border)', fontSize: 12, color: 'var(--muted)', lineHeight: 1.7, textAlign: 'center' }}>
        <div style={{ fontWeight: 600, color: 'var(--navy)', marginBottom: 4 }}>501(c)(3) Nonprofit · Tax-Deductible</div>
        {ein && <div>EIN: {ein}</div>}
        <div style={{ marginTop: 8 }}>
          Your donation is secure and tax-deductible. You&apos;ll receive a receipt for your records.
        </div>
      </div>
    </div>
  )
}
