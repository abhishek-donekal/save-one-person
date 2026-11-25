import type { Metadata } from 'next'
import Image from 'next/image'
import { LESSONS } from '@/lib/course/lessons'

const PAGE_URL = 'https://www.saveonepersonnow.org/miracle-course'
const BUY_URL = 'https://save-one-person-inc.kit.com/products/how-to-create-a-miracle'
const TITLE = 'How to Create a Miracle: Online Course with Lauren Finkelstein'
const DESCRIPTION =
  'A 12-day online course from Lauren Finkelstein, founder of Save One Person: 12 ingredients to turn the impossible, possible. Includes 12 in-depth lessons, guided practices, a 33-page workbook and the full book. $47, and every purchase supports Save One Person.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'How to Create a Miracle: a 12-day online course',
    description: '12 ingredients to turn the impossible, possible. With Lauren Finkelstein, founder of Save One Person.',
    url: PAGE_URL,
    images: ['/videos/course/intro-lauren-poster.jpg?v=2'],
  },
}

const INCLUDES = [
  { title: 'A welcome video from Lauren', body: 'Lauren shares why she wrote How to Create a Miracle and how to get the most from the 12 days.' },
  { title: '12 in-depth lessons', body: 'One ingredient a day: a full teaching, a true miracle story, why it works, and what to do when you get stuck.' },
  { title: '12 guided practices', body: 'Simple step-by-step exercises like the One-Sentence Prayer, the Mission Map and the Faith Feed.' },
  { title: '60 journal questions', body: 'Five questions a day to help you get clear on what you want and what is holding you back.' },
  { title: '12 affirmations + 12 Miracle Actions', body: 'A daily affirmation to say morning and night, and one action to take before bed.' },
  { title: 'The Miracle Workbook (33 pages)', body: 'Printable PDF with your My Miracle page, two pages for every day, a 12-day tracker, a 30-Day Miracle Log and your Miracle Maker certificate.' },
  { title: 'Bonus tools', body: 'The 5-Minute Miracle Morning routine and a guide to starting a Miracle Circle with friends.' },
  { title: 'Bonus: the full book (PDF)', body: 'The complete How to Create a Miracle by Lauren Finkelstein, yours to read and keep.' },
]

function BuyButton({ label = 'Start Creating Your Miracle: $47' }: { label?: string }) {
  return (
    <a href={BUY_URL} className="btn btn-emerald" style={{ fontSize: 18, padding: '16px 32px' }}>
      {label} →
    </a>
  )
}

export default function MiracleCoursePage() {
  return (
    <div>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="section-label section-label-soft">Online Course · 12 Days · Start Anytime</div>
          <h1 className="display-lg">How to Create a Miracle</h1>
          <p style={{ marginTop: 20, fontSize: 20, lineHeight: 1.6 }}>
            12 ingredients to turn the impossible, possible, with Lauren Finkelstein, founder of Save One Person.
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
          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <BuyButton />
            <p style={{ marginTop: 12, fontSize: 14, color: 'var(--muted)' }}>
              Secure checkout. Instant access. Every purchase supports Save One Person, a 501(c)(3) nonprofit.
            </p>
            <p style={{ marginTop: 8, fontSize: 15 }}>
              Not sure yet? <a href="/miracle-course/free-lesson" style={{ color: 'var(--emerald)', fontWeight: 700, textDecoration: 'underline' }}>Try Day 1 free</a>
            </p>
          </div>

          <div style={{ marginTop: 72, fontSize: 18, lineHeight: 1.8, color: 'var(--muted)', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h2 className="display" style={{ color: 'var(--navy)' }}>Miracles happen every day. You can create one.</h2>
            <p>
              Lauren Finkelstein has spent years helping people find living kidney donors and medical miracles through
              the power of the media. Along the way she saw the same ingredients show up again and again in every
              miracle: prayer, hard work, joy, purpose, a voice that speaks up, and the belief that it can happen.
            </p>
            <p>
              This course takes the 12 ingredients from her book and turns them into 12 days of simple, practical steps.
              Each day takes about 20 to 30 minutes. By the end, you&apos;ll know exactly what you&apos;re asking for, what
              you&apos;re doing about it, and who you&apos;re becoming on the way.
            </p>
          </div>

          <h2 className="display" style={{ marginTop: 64, textAlign: 'center' }}>What you get</h2>
          <div style={{ marginTop: 24, display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            {INCLUDES.map((i) => (
              <div key={i.title} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: 24 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--navy)' }}>{i.title}</h3>
                <p style={{ marginTop: 8, fontSize: 15, lineHeight: 1.7, color: 'var(--muted)' }}>{i.body}</p>
              </div>
            ))}
          </div>

          <h2 className="display" style={{ marginTop: 64, textAlign: 'center' }}>The 12 ingredients</h2>
          <ol style={{ marginTop: 24, display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', listStyle: 'none', padding: 0 }}>
            {LESSONS.map((l) => (
              <li key={l.n} style={{ background: '#0b1f3a', color: '#fff', borderRadius: 14, padding: '18px 20px' }}>
                <div style={{ color: '#f5c542', fontWeight: 700, fontSize: 13, letterSpacing: 1 }}>DAY {l.n}</div>
                <div style={{ fontWeight: 700, fontSize: 18, marginTop: 4 }}>{l.name}</div>
              </li>
            ))}
          </ol>

          <div style={{ marginTop: 64, display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Image src="/newsletter/book-how-to-create-a-miracle.jpg" alt="How to Create a Miracle by Lauren Finkelstein" width={180} height={277} style={{ borderRadius: 8, boxShadow: '0 10px 30px rgba(0,0,0,.2)' }} />
            <div style={{ maxWidth: 440 }}>
              <h3 className="display" style={{ fontSize: 26 }}>Includes the full book</h3>
              <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.7, color: 'var(--muted)' }}>
                You also get the complete <em>How to Create a Miracle</em> as a PDF: every story, every ingredient, to
                read and come back to whenever you need it.
              </p>
            </div>
          </div>

          <div style={{ marginTop: 72, marginBottom: 24, textAlign: 'center', background: '#f5f7fb', borderRadius: 20, padding: '40px 24px' }}>
            <h2 className="display" style={{ fontSize: 30 }}>Your miracle starts today.</h2>
            <p style={{ marginTop: 12, marginBottom: 24, fontSize: 17, color: 'var(--muted)' }}>
              $47 for the full course: 12 lessons, 12 practices, the 33-page workbook, bonus tools and the book. Instant access after checkout.
            </p>
            <p style={{ marginTop: -8, marginBottom: 24, fontSize: 14, color: 'var(--muted)', maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
              All proceeds go to Save One Person, a 501(c)(3) nonprofit (EIN 84-4214447), and pay for our media outreach that helps
              people who need a living organ donor or a medical miracle find the person who can save them.
            </p>
            <BuyButton />
          </div>
        </div>
      </div>
    </div>
  )
}
