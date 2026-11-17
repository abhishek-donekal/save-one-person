import Link from 'next/link'

// Site-wide top banner.
// Nov 17–22, 2026: $5,000 donation drive for Save One Person (Lauren). Switch back to the
// Go Bless Yourself gifts banner (/meaningful-holiday-gifts) on Mon Nov 23 — see ops/this-week.md.
export default function HolidayBanner() {
  return (
    <Link
      href="/donate"
      style={{ display: 'block', background: '#0a7d5a', color: '#fff', textAlign: 'center', padding: '10px 16px', fontWeight: 700, fontSize: 15, lineHeight: 1.4, textDecoration: 'none' }}
    >
      💛 This week we&apos;re raising $5,000 to share more life-saving stories. Every gift is tax-deductible. <span style={{ textDecoration: 'underline' }}>Donate now →</span>
    </Link>
  )
}
