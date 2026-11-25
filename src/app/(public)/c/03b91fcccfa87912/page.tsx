import type { Metadata } from 'next'
import { LESSONS, BONUS } from '@/lib/course/lessons'
import LessonCard from '@/components/course/LessonCard'

// Private course home for buyers of "How to Create a Miracle" (Kit product 303134 sends buyers here).
// Not linked anywhere public; blocked in robots.ts and marked noindex.
const FILES = '/c/03b91fcccfa87912'

export const metadata: Metadata = {
  title: 'Your Course: How to Create a Miracle',
  robots: { index: false, follow: false },
}

export default function MiracleCourseHome() {
  return (
    <div>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="section-label section-label-soft">Welcome to your course</div>
          <h1 className="display-lg">How to Create a Miracle</h1>
          <p style={{ marginTop: 16, fontSize: 18, lineHeight: 1.6 }}>
            Bookmark this page. It&apos;s your course home: the welcome video, your workbook, the book, and all 12 lessons.
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="container-md">
          <video
            src="/videos/course/intro-lauren.mp4?v=2"
            poster="/videos/course/intro-lauren-poster.jpg?v=2"
            controls
            playsInline
            preload="metadata"
            style={{ display: 'block', width: '100%', maxWidth: 420, margin: '0 auto', borderRadius: 16, background: '#0b1f3a' }}
          />

          <div style={{ marginTop: 32, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={`${FILES}/Miracle-Workbook.pdf`} className="btn btn-emerald" download>
              Download the Miracle Workbook (PDF)
            </a>
            <a href={`${FILES}/How-to-Create-a-Miracle-Book.pdf`} className="btn btn-outline" download>
              Bonus: Download the Book (PDF)
            </a>
          </div>

          <p style={{ marginTop: 40, fontSize: 17, lineHeight: 1.8, color: 'var(--muted)' }}>
            <strong style={{ color: 'var(--navy)' }}>How it works:</strong> do one lesson a day for 12 days. Read the teaching
            and the miracle story, do the practice, answer the journal questions in your workbook, and do the Miracle Action before bed. Check
            off each day on the tracker at the back of the workbook. When you finish, sign your Miracle Maker certificate.
          </p>

          <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 24 }}>
            {LESSONS.map((l) => (
              <LessonCard key={l.n} l={l} />
            ))}
          </div>

          <h2 className="display" style={{ marginTop: 56, textAlign: 'center' }}>Bonus tools</h2>
          {[BONUS.morning, BONUS.circle].map((b) => (
            <section key={b.title} style={{ marginTop: 20, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 24 }}>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: 'var(--navy)' }}>{b.title}</h3>
              <ol style={{ marginTop: 10, paddingLeft: 20, fontSize: 16, lineHeight: 1.8, color: '#374151' }}>
                {b.steps.map((t) => <li key={t}>{t}</li>)}
              </ol>
            </section>
          ))}

          <p style={{ marginTop: 48, marginBottom: 24, textAlign: 'center', fontSize: 15, color: 'var(--muted)' }}>
            Questions? Email admin@saveonepersonnow.org. Thank you for supporting Save One Person.
          </p>
        </div>
      </div>
    </div>
  )
}
