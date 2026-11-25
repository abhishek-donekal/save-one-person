import type { Metadata } from 'next'
import Link from 'next/link'
import { LESSONS } from '@/lib/course/lessons'
import LessonCard from '@/components/course/LessonCard'
import NewsletterSignup from '@/components/layout/NewsletterSignup'

const PAGE_URL = 'https://www.saveonepersonnow.org/miracle-course/free-lesson'
const BUY_URL = 'https://save-one-person-inc.kit.com/products/how-to-create-a-miracle'
const TITLE = 'Free Lesson: How to Pray for a Miracle (Day 1 of How to Create a Miracle)'
const DESCRIPTION =
  'Try Day 1 of Lauren Finkelstein’s 12-day online course, How to Create a Miracle, free: the One-Sentence Prayer, a true miracle story, journal questions and today’s Miracle Action.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Free lesson: How to pray for a miracle',
    description: 'Day 1 of the 12-day course How to Create a Miracle, free.',
    url: PAGE_URL,
    images: ['/videos/course/intro-lauren-poster.jpg?v=2'],
  },
}

export default function FreeLessonPage() {
  const day1 = LESSONS[0]
  const rest = LESSONS.slice(1)
  return (
    <div>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="section-label section-label-soft">Free Lesson · Day 1 of 12</div>
          <h1 className="display-lg">How to Pray for a Miracle</h1>
          <p style={{ marginTop: 20, fontSize: 19, lineHeight: 1.6 }}>
            The first ingredient from <em>How to Create a Miracle</em>, the 12-day online course by Lauren Finkelstein,
            founder of Save One Person. Free, no sign-up needed.
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="container-md">
          <p style={{ fontSize: 17, lineHeight: 1.8, color: 'var(--muted)', marginBottom: 32 }}>
            Read the lesson, try the practice, and write your answers to the journal questions in a notebook. Then do
            today&apos;s Miracle Action before bed. It takes about 20 minutes.
          </p>

          <LessonCard l={day1} />

          <div style={{ marginTop: 56, textAlign: 'center', background: '#0b1f3a', color: '#fff', borderRadius: 20, padding: '40px 24px' }}>
            <div style={{ color: '#f5c542', fontWeight: 700, fontSize: 13, letterSpacing: 1 }}>READY FOR DAY 2?</div>
            <h2 style={{ fontSize: 30, fontWeight: 800, marginTop: 8 }}>Get all 12 ingredients</h2>
            <p style={{ marginTop: 12, fontSize: 17, lineHeight: 1.7, opacity: 0.9, maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
              The full course has 11 more lessons, 12 guided practices, the 33-page Miracle Workbook, bonus tools and
              the complete book. Every purchase supports Save One Person.
            </p>
            <ol style={{ listStyle: 'none', padding: 0, margin: '20px auto 0', maxWidth: 560, display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
              {rest.map((l) => (
                <li key={l.n} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 999, padding: '6px 14px', fontSize: 14 }}>
                  Day {l.n}: {l.name}
                </li>
              ))}
            </ol>
            <div style={{ marginTop: 28, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={BUY_URL} className="btn btn-emerald" style={{ fontSize: 18, padding: '16px 32px' }}>
                Get the Full Course: $47 →
              </a>
              <Link href="/miracle-course" style={{ color: '#fff', textDecoration: 'underline', alignSelf: 'center' }}>
                See everything included
              </Link>
            </div>
          </div>

          <div style={{ marginTop: 48, marginBottom: 24 }}>
            <h2 className="display" style={{ fontSize: 26, textAlign: 'center' }}>Get the weekly Save One Alert</h2>
            <p style={{ marginTop: 10, marginBottom: 20, textAlign: 'center', fontSize: 16, color: 'var(--muted)' }}>
              One true story a week of someone who needs a miracle, and how you can help.
            </p>
            <div style={{ maxWidth: 520, margin: '0 auto' }}>
              <NewsletterSignup tone="light" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
