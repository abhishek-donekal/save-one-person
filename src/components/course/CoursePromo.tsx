import Image from 'next/image'
import Link from 'next/link'

// Promo band for the "How to Create a Miracle" online course, used on the home, about and Health Hacks pages.
export default function CoursePromo({ compact = false }: { compact?: boolean }) {
  return (
    <section aria-labelledby="course-promo-h" style={{ padding: compact ? '32px 16px' : '72px 16px' }}>
      <div
        style={{
          maxWidth: 980,
          margin: '0 auto',
          background: '#0b1f3a',
          color: '#fff',
          borderRadius: 24,
          padding: compact ? '28px 24px' : '44px 36px',
          display: 'flex',
          gap: 36,
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <Image
          src="/newsletter/book-how-to-create-a-miracle.jpg"
          alt="How to Create a Miracle by Lauren Finkelstein"
          width={compact ? 120 : 170}
          height={compact ? 185 : 262}
          style={{ borderRadius: 8, boxShadow: '0 14px 40px rgba(0,0,0,.35)' }}
        />
        <div style={{ flex: 1, minWidth: 260, maxWidth: 560 }}>
          <div style={{ color: '#f5c542', fontWeight: 700, fontSize: 13, letterSpacing: 1.2 }}>NEW · 12-DAY ONLINE COURSE</div>
          <h2 id="course-promo-h" style={{ fontSize: compact ? 26 : 34, fontWeight: 800, lineHeight: 1.15, margin: '8px 0 12px' }}>
            How to Create a Miracle
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, opacity: 0.92, margin: 0 }}>
            Lauren Finkelstein has watched strangers become living kidney donors and families receive miracles they were
            told not to hope for. In 12 short daily lessons, she shares the 12 ingredients she saw again and again, with
            a practice, journal questions and a Miracle Action for each day.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.6, opacity: 0.75, margin: '12px 0 0' }}>
            All proceeds go to Save One Person, a 501(c)(3) nonprofit, and fund our work sharing the stories of people who need a living organ donor.
          </p>
          <div style={{ marginTop: 22, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="/miracle-course/free-lesson" className="btn btn-emerald">Try Day 1 free →</Link>
            <Link href="/miracle-course" style={{ color: '#fff', fontWeight: 700, textDecoration: 'underline' }}>
              See the full course ($37 Black Friday weekend, reg. $47)
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
