import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About — Mission, Founder, and Team',
  description:
    'Meet the people behind Save One Person: Founder & CEO Lauren Finkelstein, Advisor & Mentor Rabbi Simon Jacobson, and Global Outreach Strategist Loren Lahav.',
}

const STORAGE = 'https://kglvtgohmfulykkspfmj.supabase.co/storage/v1/object/public/site-assets'

type Person = {
  name: string
  role: string
  org: string
  image: string
  body: string[]
  address?: string
  link?: { label: string; href: string }
  imageFit?: 'cover' | 'contain'
}

const FOUNDER: Person = {
  name: 'Lauren Finkelstein',
  role: 'Founder & CEO',
  org: 'Save One Person',
  image: `${STORAGE}/legacy/assets/ceo-BmSwDvux.jpeg`,
  body: [
    'Lauren Finkelstein founded Save One Person to bridge a gap she saw firsthand: there are people who would step forward to save a life if they only knew someone needed them. Through television, radio, podcasts, social media, and digital channels, Save One Person broadcasts the stories of patients searching for living kidney donors, living liver donors, bone marrow matches, and other life-saving medical miracles.',
    'Her conviction is simple: media is the most powerful tool we have. One story can reach millions. One introduction can save a life.',
  ],
  link: { label: 'Contact Lauren', href: 'mailto:Save1Person@aol.com' },
}

const MENTOR: Person = {
  name: 'Rabbi Simon Jacobson',
  role: 'Advisor & Mentor',
  org: 'Save One Person',
  image: `${STORAGE}/wp/2025/03/Simon-Jacobson.jpg`,
  body: [
    'Rabbi Jacobson is the author of the best-selling book Toward a Meaningful Life, a William Morrow publication that has sold over 300,000 copies to date and has been translated into Hebrew, French, Spanish, Dutch, Portuguese, Italian, Russian, German, Hungarian and Czech.',
    'He is the founder and dean of The Meaningful Life Center, which bridges the secular and the spiritual through a wide variety of live and online programming. The Center presents to people of all backgrounds the universal teachings of Torah as a blueprint for life.',
  ],
  address: 'Meaningful Life Center · 788 Eastern Parkway · Brooklyn, NY 11213',
  link: { label: 'Meaningful Life Center →', href: 'https://www.meaningfullife.com/' },
}

const STRATEGIST: Person = {
  name: 'Loren Lahav',
  role: 'Global Outreach Strategist',
  org: 'Save One Person',
  image: `${STORAGE}/wp/2025/03/Loren-Lahav.png`,
  body: [
    'Loren Lahav is the author of the best-selling book Chicken Soup for The Soul: Time To Thrive; Life TuneUps: Your Personal Plan to Find Balance, Discover Your Passion, and Step into Greatness; The Greatest Love: Being An Extraordinary Mom; Drama Free Divorce Detox: Finding Your True Self After Divorce; and the creator of The "I AM Cards" Series for Men, Women & Children.',
    'She spearheaded the Global Life & Health Mastery Program for Anthony Robbins — leading hundreds of thousands of people throughout the world to turn around their health issues through the use of proper nutrition and the mind/body balance connection.',
    'Loren is the Founder and CEO of TRUE LLC and travels the world teaching people from all the top stages.',
  ],
  address: 'TRUE LLC · 11700 Charleston Blvd · Las Vegas, NV 89135',
}

const CTO: Person = {
  name: 'Abhishek Donekal',
  role: 'Chief Technology Officer',
  org: 'Save One Person',
  image: `${STORAGE}/team/cto-abhishek.jpg`,
  body: [
    'Abhishek holds a Master’s in Data Science & Artificial Intelligence from Florida International University (FIU) and works as an AI Engineer, designing and implementing intelligent systems that turn data into real-world impact.',
    'As Chief Technology Officer, he leads technology and the entire digital platform for Save One Person — architecting the website, site-wide search, the native shop, and the AI-powered outreach that brings urgent patient stories to the right people at the right time.',
    'His focus is building a fast, reliable, and modern foundation so the mission can scale — using automation and AI to reach more donors, share more stories, and ultimately help save more lives.',
  ],
}

function PersonBlock({ p, reverse = false }: { p: Person; reverse?: boolean }) {
  return (
    <article style={{ background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-3xl)', overflow: 'hidden', boxShadow: 'var(--shadow-soft)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 0 }} className="person-grid">
          <div className="person-photo" style={{ position: 'relative', aspectRatio: '4 / 5', alignSelf: 'start', background: p.imageFit === 'contain' ? 'linear-gradient(160deg, #eef2f6 0%, #e6ebf0 100%)' : 'var(--secondary)', order: reverse ? 2 : 1 }}>
            <Image
              src={p.image}
              alt={p.name}
              fill
              sizes="(max-width: 768px) 100vw, 320px"
              style={{ objectFit: p.imageFit ?? 'cover', objectPosition: p.imageFit === 'contain' ? 'center' : 'center top' }}
            />
          </div>
          <div style={{ padding: 40, order: reverse ? 1 : 2 }}>
            <div className="section-label" style={{ marginBottom: 8 }}>{p.role}</div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 32, color: 'var(--navy)', marginBottom: 6 }}>{p.name}</h2>
            <p style={{ fontSize: 13, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 24, fontWeight: 600 }}>{p.org}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontSize: 16, lineHeight: 1.75, color: 'rgba(28,32,41,0.85)' }}>
              {p.body.map((para, i) => <p key={i}>{para}</p>)}
            </div>
            {p.address && (
              <p style={{ marginTop: 20, fontSize: 13, color: 'var(--muted)', fontStyle: 'italic' }}>{p.address}</p>
            )}
            {p.link && (
              <div style={{ marginTop: 24 }}>
                {p.link.href.startsWith('http') ? (
                  <a href={p.link.href} target="_blank" rel="noopener noreferrer" className="btn btn-navy" style={{ padding: '12px 22px', fontSize: 13 }}>{p.link.label}</a>
                ) : (
                  <a href={p.link.href} className="btn btn-navy" style={{ padding: '12px 22px', fontSize: 13 }}>{p.link.label}</a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export default function AboutPage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="section-label section-label-soft">About</div>
          <h1 className="display-lg">Empowering people, creating miracles.</h1>
          <p style={{ marginTop: 24, fontSize: 18, color: 'rgba(255,255,255,0.78)', lineHeight: 1.7, maxWidth: 760, marginLeft: 'auto', marginRight: 'auto' }}>
            Save One Person is a miracle-making force, harnessing the power of media to bring hope and healing. By connecting those in need of medical miracles with compassionate individuals, we transform TV, radio, magazines, and social media into platforms for extraordinary stories of hope.
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="container-md">
          <div style={{ marginBottom: 56 }}>
            <div className="section-label" style={{ marginBottom: 12 }}>Our Cause</div>
            <h2 className="display" style={{ marginBottom: 20 }}>Media as a force for miracles.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: 'rgba(28,32,41,0.82)' }}>
              Through strategic media partnerships, we aim to create a world where every platform dedicates time to shining a light on those in need, turning everyday moments into magical, life-saving opportunities. We also provide weekly short segments on disease prevention and reversal, educating the public and fostering a continuous wave of kindness and healing.
            </p>
          </div>

          {/* The Need — advocacy stats */}
          <div style={{ marginBottom: 56 }}>
            <div className="section-label" style={{ marginBottom: 12 }}>The Need</div>
            <h2 className="display" style={{ marginBottom: 20 }}>Why this matters.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: 'rgba(28,32,41,0.82)', maxWidth: 720, marginBottom: 36 }}>
              The gap between the people who need a match and the people willing to help is not a lack of generosity — it is a lack of awareness. The numbers make the urgency clear.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
              {[
                { num: '17', unit: '/ day', label: 'People die every day waiting for a transplant' },
                { num: '60%', unit: '', label: 'Of Americans are not registered organ donors' },
                { num: '8', unit: 'lives', label: 'Could be saved each day if one more person became a donor' },
                { num: '18–60', unit: 'years', label: 'The age range in which living donors are typically eligible' },
                { num: '100s', unit: 'helped', label: 'Patients Save One Person has helped find hope and a match' },
              ].map((s) => (
                <div key={s.label} style={{ background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-2xl)', padding: 28, boxShadow: 'var(--shadow-soft)' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 12 }}>
                    <span style={{ fontFamily: "'Fraunces', serif", fontSize: 40, lineHeight: 1, color: 'var(--emerald)' }}>{s.num}</span>
                    {s.unit && <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.unit}</span>}
                  </div>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--muted)' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div>
              <div className="section-label" style={{ marginBottom: 12 }}>Our Founder</div>
              <h2 className="display" style={{ marginBottom: 28 }}>Meet Lauren.</h2>
              <PersonBlock p={FOUNDER} />
            </div>

            <div style={{ marginTop: 24 }}>
              <div className="section-label" style={{ marginBottom: 12 }}>Our Mentor</div>
              <h2 className="display" style={{ marginBottom: 28 }}>Simon Jacobson, Advisor & Mentor.</h2>
              <PersonBlock p={MENTOR} reverse />
            </div>

            <div style={{ marginTop: 24 }}>
              <div className="section-label" style={{ marginBottom: 12 }}>Our Strategist</div>
              <h2 className="display" style={{ marginBottom: 28 }}>Meet Our Global Outreach Strategist, Loren.</h2>
              <PersonBlock p={STRATEGIST} />
            </div>

            <div style={{ marginTop: 24 }}>
              <div className="section-label" style={{ marginBottom: 12 }}>Our CTO</div>
              <h2 className="display" style={{ marginBottom: 28 }}>Meet Our Chief Technology Officer, Abhishek.</h2>
              <PersonBlock p={CTO} reverse />
            </div>
          </div>

          {/* Our Process */}
          <div style={{ marginTop: 72 }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div className="section-label">Our Process</div>
              <h2 className="display" style={{ marginTop: 12 }}>How we turn a story into a match.</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
              {[
                { n: '01', h: 'Awareness & Engagement', b: 'We identify patients in urgent need and craft their story for maximum reach — then bring it to television, radio, podcasts, print, and social media so the right people hear it.' },
                { n: '02', h: 'Media Amplification', b: 'Through our media partnerships, one story can reach millions. We put each patient in front of the audiences most likely to include a compatible living donor or match.' },
                { n: '03', h: 'Impact & Accountability', b: 'We connect patients directly with donors, media, and supporters, follow each story through to outcome, and share the real-world results of every life-saving connection.' },
              ].map((s) => (
                <div key={s.n} style={{ background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-2xl)', padding: 28 }}>
                  <div style={{ fontFamily: "'Fraunces', serif", fontSize: 28, color: 'var(--emerald)', marginBottom: 12 }}>{s.n}</div>
                  <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, color: 'var(--navy)', marginBottom: 10 }}>{s.h}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--muted)' }}>{s.b}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Our Vision — mission video */}
          <div style={{ marginTop: 72 }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div className="section-label">Our Vision</div>
              <h2 className="display" style={{ marginTop: 12 }}>See the mission in motion.</h2>
              <p style={{ marginTop: 20, fontSize: 17, lineHeight: 1.8, color: 'var(--muted)', maxWidth: 680, marginLeft: 'auto', marginRight: 'auto' }}>
                Our long-term goal is to inspire every media outlet — TV, radio, print, and digital — to create their own Save One Person unit. Watch how one story, shared widely, can become a life-saving connection.
              </p>
            </div>
            <div style={{ borderRadius: 'var(--r-3xl)', overflow: 'hidden', boxShadow: 'var(--shadow-soft)', aspectRatio: '16/9', background: '#000' }}>
              <iframe
                src="https://www.youtube.com/embed/ZEF9VNqnK-M"
                title="Save One Person — Our Vision"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ width: '100%', height: '100%', border: 0 }}
              />
            </div>
          </div>

          <div style={{ marginTop: 64, padding: 40, background: 'var(--grad-navy)', borderRadius: 'var(--r-3xl)', color: 'white', textAlign: 'center' }}>
            <div className="section-label section-label-soft">Together</div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 32, marginTop: 12, marginBottom: 16 }}>We Can Make a Difference</h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.78)', maxWidth: 600, margin: '0 auto 28px', lineHeight: 1.7 }}>
              Partner with us, share a story, or step forward as a donor. Every introduction is a chance to save a life.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/urgent-requests" className="btn btn-emerald" style={{ padding: '14px 28px' }}>See Urgent Requests</Link>
              <Link href="/contact" className="btn btn-ghost" style={{ padding: '14px 28px', borderColor: 'rgba(255,255,255,0.4)', color: 'white' }}>Get In Touch</Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .person-grid { grid-template-columns: 1fr !important; }
          .person-photo { aspect-ratio: 1 / 1 !important; order: 1 !important; }
        }
      `}</style>
    </>
  )
}
