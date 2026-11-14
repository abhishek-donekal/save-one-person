import Link from 'next/link'

// Site-wide holiday banner for Go Bless Yourself. Remove after the holidays.
export default function HolidayBanner() {
  return (
    <Link
      href="/shop#wear-gifts"
      style={{ display: 'block', background: '#dc2626', color: '#fff', textAlign: 'center', padding: '10px 16px', fontWeight: 700, fontSize: 15, lineHeight: 1.4, textDecoration: 'none' }}
    >
      🎁 Holiday gifts that save lives: Go Bless Yourself tees, hoodies, hats &amp; mugs. <span style={{ textDecoration: 'underline' }}>Shop now →</span>
    </Link>
  )
}
