import type { Lesson } from '@/lib/course/lessons'

const label = { fontWeight: 700, color: 'var(--emerald)', fontSize: 13, letterSpacing: 1 } as const

export default function LessonCard({ l }: { l: Lesson }) {
  return (
    <section id={`day-${l.n}`} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, overflow: 'hidden' }}>
      <div style={{ background: '#0b1f3a', color: '#fff', padding: '18px 24px' }}>
        <div style={{ color: '#f5c542', fontWeight: 700, fontSize: 13, letterSpacing: 1 }}>DAY {l.n} OF 12</div>
        <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 4 }}>{l.name}</h2>
      </div>
      <div style={{ padding: 24, fontSize: 16, lineHeight: 1.8, color: '#374151', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <p style={{ fontSize: 19, fontWeight: 600, color: 'var(--navy)' }}>{l.idea}</p>
        {l.teaching.map((t) => <p key={t.slice(0, 30)}>{t}</p>)}
        <div style={{ background: '#f5f7fb', borderRadius: 12, padding: '14px 18px' }}>
          <div style={label}>THE MIRACLE STORY</div>
          <p style={{ marginTop: 6 }}>{l.story}</p>
        </div>
        <div>
          <div style={label}>WHY THIS WORKS</div>
          <p style={{ marginTop: 6 }}>{l.why}</p>
        </div>
        <div style={{ border: '2px solid var(--emerald)', borderRadius: 12, padding: '14px 18px' }}>
          <div style={label}>TODAY&apos;S PRACTICE: {l.practice.title.toUpperCase()}</div>
          <ol style={{ marginTop: 6, paddingLeft: 20 }}>
            {l.practice.steps.map((q) => <li key={q}>{q}</li>)}
          </ol>
        </div>
        <div>
          <div style={label}>WHEN YOU GET STUCK</div>
          {l.obstacles.map((o) => (
            <p key={o.thought} style={{ marginTop: 6 }}><strong>If you&apos;re thinking {o.thought}</strong> {o.shift}</p>
          ))}
        </div>
        <div>
          <div style={label}>JOURNAL QUESTIONS (WRITE YOUR ANSWERS IN YOUR WORKBOOK)</div>
          <ol style={{ marginTop: 6, paddingLeft: 20 }}>
            {l.questions.map((q) => <li key={q}>{q}</li>)}
          </ol>
        </div>
        <div style={{ background: '#0b1f3a', color: '#fff', borderRadius: 12, padding: '16px 18px', textAlign: 'center' }}>
          <div style={{ color: '#f5c542', fontWeight: 700, fontSize: 13, letterSpacing: 1 }}>TODAY&apos;S AFFIRMATION</div>
          <p style={{ marginTop: 6, fontSize: 20, fontWeight: 700 }}>&ldquo;{l.affirmation}&rdquo;</p>
        </div>
        <div style={{ background: '#fff8e1', borderRadius: 12, padding: '14px 18px' }}>
          <div style={{ fontWeight: 700, color: '#b7791f', fontSize: 13, letterSpacing: 1 }}>TODAY&apos;S MIRACLE ACTION</div>
          <p style={{ marginTop: 6, fontWeight: 600 }}>{l.action}</p>
        </div>
        <div>
          <div style={label}>GO DEEPER THIS WEEK</div>
          <p style={{ marginTop: 6 }}>{l.deeper}</p>
        </div>
      </div>
    </section>
  )
}
