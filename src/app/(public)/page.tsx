import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SharePanel from '@/components/ui/SharePanel'
import { createClient } from '@/lib/supabase/server'
import { FEATURED_REQUESTS } from '@/lib/featuredRequests'

export const metadata: Metadata = {
  title: 'Save One Person — One Introduction Can Save a Life',
  description:
    'Save One Person uses the power of media, storytelling, and human connection to help people find living kidney donors, liver donors, bone marrow matches, and other life-saving miracles.',
}

const DONATE_URL = '/donate'

export default async function HomePage() {
  const supabase = await createClient()

  const [{ count: storyCount }, { data: dbRequests }] = await Promise.all([
    supabase
      .from('success_stories')
      .select('*', { count: 'exact', head: true })
      .eq('published', true),
    supabase
      .from('urgent_requests')
      .select('id, slug, patient_name, medical_condition, image_url, urgent')
      .eq('status', 'open')
      .eq('published', true)
      .order('urgent', { ascending: false })
      .order('created_at', { ascending: false }),
  ])

  // Same list the Urgent Requests page shows: requests that ship with the
  // site plus published database rows (a database row wins on a shared slug).
  const openRequests = [
    ...FEATURED_REQUESTS.filter((f) => !(dbRequests || []).some((r) => r.slug === f.slug)),
    ...(dbRequests || []),
  ]
  const requestCount = openRequests.length
  // Patients pinned to the front of the homepage section, in this order.
  // Matched against the slug or name so it works for admin-dashboard entries too.
  const PINNED = ['william']
  const pinRank = (r: { slug: string; patient_name: string }) => {
    const key = `${r.slug} ${r.patient_name}`.toLowerCase()
    const i = PINNED.findIndex((p) => key.includes(p))
    return i === -1 ? PINNED.length : i
  }
  const spotlight = openRequests
    .filter((r) => r.image_url)
    .map((r, i) => ({ r, i }))
    .sort((a, b) => pinRank(a.r) - pinRank(b.r) || a.i - b.i)
    .map(({ r }) => r)
    .slice(0, 4)

  return (
    <>
      {/* ── HERO ── */}
      <section id="top" className="hero hero-has-miracle" style={{ padding: 0 }}>
        <div className="hero-miracle">
          <Image
            src="/images/miracles-happen.jpg"
            alt="Miracles happen. Golden angel wings around a glowing heart, two people reaching toward each other beneath it, with TV, radio, newspaper and phone icons sending light to the heart. One story shared, one living donor found, one life saved."
            width={1600}
            height={900}
            priority
            sizes="100vw"
            className="hero-miracle-img"
          />
        </div>

        <div className="hero-inner">
          <RevealOnScroll>
            <h1 className="font-display hero-mission">
              We turn media into <em>miracles.</em>
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <p className="hero-desc">
              Every week, we share the stories of people who need living organ donors, bone marrow matches and other medical miracles, so the person who can save them finds out.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={180}>
            <div className="hero-btns">
              <a href={DONATE_URL} className="btn btn-emerald">
                Donate Now
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
              <a href="mailto:Save1Person@aol.com?subject=Partnership%20Inquiry" className="btn btn-ghost">Partner With Us</a>
              <a href="tel:9175726385" className="btn btn-transparent">Call Lauren</a>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={260}>
            <div className="hero-cards">
              <div className="hero-card glass">
                <div className="label">Founder</div>
                <div className="value font-display">Lauren Finkelstein</div>
                <div className="sub">Save One Person</div>
              </div>
              <a href="tel:9175726385" className="hero-card glass">
                <div className="label">Direct</div>
                <div className="value font-display">917-572-6385</div>
                <div className="sub">Tap to call</div>
              </a>
              <a href="mailto:Save1Person@aol.com" className="hero-card glass">
                <div className="label">Email</div>
                <div className="value font-display" style={{ fontSize: 15 }}>Save1Person@aol.com</div>
                <div className="sub">Reach out anytime</div>
              </a>
            </div>
          </RevealOnScroll>
        </div>

      </section>

      {/* ── WATCH: how one story saves a life (video) ── */}
      <section className="vision-video" style={{ paddingTop: 96, paddingBottom: 96 }}>
        <div className="container-md">
          <RevealOnScroll>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div className="section-label">Watch</div>
              <h2 className="display" style={{ marginTop: 12 }}>How one story saves a life.</h2>
              <p style={{ marginTop: 20, fontSize: 17, lineHeight: 1.8, color: 'var(--muted)', maxWidth: 680, marginLeft: 'auto', marginRight: 'auto' }}>
                In just over a minute, see how Save One Person turns a story into a life-saving match — and how you can help create the next miracle.
              </p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={120}>
            <div style={{ borderRadius: 'var(--r-3xl)', overflow: 'hidden', boxShadow: 'var(--shadow-soft)', aspectRatio: '16/9', background: '#000' }}>
              <video
                src="/videos/save-one-person.mp4"
                poster="/videos/save-one-person-poster.jpg"
                controls
                playsInline
                preload="none"
                title="Save One Person — Miracles happen"
                style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
              />
            </div>
          </RevealOnScroll>
          <div style={{ marginTop: 32 }}>
            <SharePanel path="/video" text="Watch and share — one story can save a life. Be the miracle. 💛" label="Share this video" />
          </div>
        </div>
      </section>

      {/* ── HELP THEM NOW ── */}
      {spotlight.length > 0 && (
        <section className="help-now">
          <div className="container">
            <RevealOnScroll>
              <div className="help-now-head">
                <div>
                  <div className="section-label" style={{ color: '#b91c1c' }}>Help Needed Now</div>
                  <h2 className="display">They&apos;re Waiting for a Match.</h2>
                  <p className="help-now-sub">
                    Real people searching right now for a living donor. You could be the one — or you could share their story with the one.
                  </p>
                </div>
                <Link href="/urgent-requests" className="btn btn-ghost help-now-all">
                  See all {requestCount} urgent requests →
                </Link>
              </div>
            </RevealOnScroll>

            <div className="help-now-grid">
              {spotlight.map((req, i) => (
                <RevealOnScroll key={req.id} delay={i * 100}>
                  <Link href={`/urgent-requests/${req.slug}`} className="help-now-card hover-lift">
                    <div className="help-now-photo">
                      <Image
                        src={req.image_url as string}
                        alt={req.patient_name}
                        fill
                        sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 300px"
                        style={{ objectFit: 'cover', objectPosition: 'center top' }}
                      />
                      {req.urgent && <span className="badge badge-red help-now-badge">Urgent</span>}
                    </div>
                    <div className="help-now-body">
                      <span className="badge badge-blue">{req.medical_condition}</span>
                      <h3 className="font-display help-now-name">{req.patient_name}</h3>
                      <span className="help-now-link">Read their story →</span>
                    </div>
                  </Link>
                </RevealOnScroll>
              ))}
            </div>

            <RevealOnScroll>
              <div className="help-now-more">
                <p>
                  {requestCount > spotlight.length
                    ? `${requestCount - spotlight.length} more ${requestCount - spotlight.length === 1 ? 'person is' : 'people are'} waiting for a match.`
                    : 'Others are waiting for a match, too.'}{' '}
                  Every story you read and share could reach the right person.
                </p>
                <Link href="/urgent-requests" className="btn btn-emerald" style={{ padding: '16px 32px', fontSize: 15 }}>
                  See Everyone Who Needs Help →
                </Link>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* ── PROBLEM ── */}
      <section className="problem">
        <div className="container">
          <div className="problem-grid">
            <RevealOnScroll>
              <div className="problem-img-wrap">
                <div className="problem-img">
                  <Image
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1600&q=80&auto=format&fit=crop"
                    alt="Patient hand with IV in hospital bed — the long wait for a transplant match"
                    width={600}
                    height={560}
                    style={{ width: '100%', height: 560, objectFit: 'cover', objectPosition: 'center' }}
                  />
                </div>
                <div className="problem-img-caption glass-light">
                  <div className="cap-label">The Reality</div>
                  <div className="cap-text">The longest wait in medicine is for a match that never arrives.</div>
                </div>
              </div>
            </RevealOnScroll>

            <div>
              <RevealOnScroll>
                <div className="section-label">The Problem</div>
                <h2 className="display">100,000+ Are Waiting.</h2>
              </RevealOnScroll>
              <RevealOnScroll delay={120}>
                <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 20, fontSize: 17, lineHeight: 1.85, color: 'var(--muted)' }}>
                  <p>Every day, individuals and families face an agonizing wait, not knowing if the call they are praying for will ever come.</p>
                  <p>Over 100,000 people in the U.S. urgently need living kidney donors, living liver donors, bone marrow matches, and other life-saving medical miracles. Many compassionate people would step forward if they simply knew someone needed them.</p>
                  <p style={{ fontWeight: 500, color: 'var(--navy)' }}>Save One Person exists to close that gap. Through media, storytelling, and human connection, we bring the right story to the right person at the right time.</p>
                </div>
              </RevealOnScroll>
              <RevealOnScroll delay={200}>
                <div className="problem-stats">
                  <div className="stat-card">
                    <div className="stat-num font-display">100K+</div>
                    <div className="stat-label">People Waiting</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-num font-display">17/day</div>
                    <div className="stat-label">Die Waiting</div>
                  </div>
                  <Link href="/success-stories" className="stat-card stat-card-link">
                    <div className="stat-num font-display">{storyCount ?? 0}+</div>
                    <div className="stat-label">Success Stories →</div>
                  </Link>
                  <Link href="/urgent-requests" className="stat-card stat-card-link">
                    <div className="stat-num font-display">{requestCount ?? 0}</div>
                    <div className="stat-label">Urgent Requests →</div>
                  </Link>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section id="mission" className="mission">
        <div className="container-md" style={{ textAlign: 'center' }}>
          <RevealOnScroll>
            <div className="section-label">Our Mission</div>
            <h2 className="display">Media as a force for miracles.</h2>
          </RevealOnScroll>
          <RevealOnScroll delay={120}>
            <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 24, fontSize: 16, lineHeight: 1.625, color: 'var(--muted)', maxWidth: 672, marginLeft: 'auto', marginRight: 'auto' }}>
              <p>We connect those who need living kidney donors, living liver donors, bone marrow matches, and other life-saving medical miracles with the individuals who have the power to save them.</p>
              <p>Our platform harnesses television, radio, podcasts, social media, and digital channels to broadcast these stories at scale. Because the most powerful tool in medicine is not always a drug or a procedure. Sometimes, it is simply putting two people in the same room.</p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={200}>
            <div className="mission-quote-wrap">
              <svg aria-hidden="true" style={{ position: 'absolute', top: -24, left: 40, width: 48, height: 48, color: 'var(--emerald)', fill: 'currentColor' }} viewBox="0 0 24 24">
                <path d="M9 7H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v1a3 3 0 0 1-3 3v2a5 5 0 0 0 5-5V9a2 2 0 0 0-2-2zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v1a3 3 0 0 1-3 3v2a5 5 0 0 0 5-5V9a2 2 0 0 0-2-2z" />
              </svg>
              <blockquote className="font-display">
                One story can reach millions. One introduction can save a life.{' '}
                <em>One act of generosity can change a family&apos;s future forever.</em>
              </blockquote>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="how">
        <div className="container">
          <RevealOnScroll>
            <div className="section-label">How It Works</div>
            <h2 className="display" style={{ maxWidth: 768 }}>Three steps. One life changed forever.</h2>
          </RevealOnScroll>
          <div className="steps-grid">
            {[
              { num: '01', title: 'Share The Story', body: 'We help bring powerful personal stories to television, radio, podcasts, newspapers, social media, and digital platforms.' },
              { num: '02', title: 'Reach Potential Donors', body: 'Stories reach people who may never have known someone needed their help.' },
              { num: '03', title: 'Create Life-Saving Connections', body: 'The right story reaches the right person, creating an opportunity for a life-saving match.' },
            ].map((step, i) => (
              <RevealOnScroll key={step.num} delay={(i + 1) * 80}>
                <div className="step-card">
                  <div className="step-header">
                    <div className="step-num">{step.num}</div>
                    <div className="step-line" />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ── */}
      <section id="partners" className="what">
        <div className="container">
          <RevealOnScroll>
            <div className="section-label">What We Do</div>
            <h2 className="display" style={{ maxWidth: 768 }}>A platform built to make the right introduction.</h2>
          </RevealOnScroll>
          <div className="what-grid">
            {[
              { num: '01', title: 'Media Outreach', items: ['Television', 'Radio', 'Podcasts', 'Social Media', 'Digital Publications', 'News Media'] },
              { num: '02', title: 'Create Connections', items: ['Amplify stories', 'Increase visibility', 'Expand awareness', 'Generate opportunities'] },
              { num: '03', title: 'Build Partnerships', items: ['Healthcare leaders', 'Media companies', 'Philanthropists', 'Technology partners', 'Corporations', 'Community organizations'] },
            ].map((card, i) => (
              <RevealOnScroll key={card.num} delay={(i + 1) * 80}>
                <article className="what-card">
                  <div className="what-card-glow" aria-hidden="true" />
                  <div className="what-card-num">{card.num}</div>
                  <h3>{card.title}</h3>
                  <ul>
                    {card.items.map((item) => (
                      <li key={item}><span className="dot" aria-hidden="true" /><span>{item}</span></li>
                    ))}
                  </ul>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMPACT ── */}
      <section id="impact" className="impact section-dark" style={{ position: 'relative' }}>
        <Image
          src="https://kglvtgohmfulykkspfmj.supabase.co/storage/v1/object/public/site-assets/legacy/assets/impact-horizon-KLV9X_e1.jpg"
          alt="A figure looking out toward a sunset horizon"
          fill
          style={{ objectFit: 'cover', zIndex: -2 }}
        />
        <div className="impact-overlay" />
        <div className="container-6xl" style={{ textAlign: 'center' }}>
          <RevealOnScroll>
            <div className="section-label section-label-soft">Impact</div>
            <h2 className="display-lg">One Story Can Change Everything</h2>
          </RevealOnScroll>
          <RevealOnScroll delay={120}>
            <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 12, fontSize: 18, lineHeight: 1.625, color: 'rgba(255,255,255,0.80)', maxWidth: 672, marginLeft: 'auto', marginRight: 'auto' }}>
              <p>A story shared can reach millions.</p>
              <p>One introduction can change a life forever.</p>
              <p>A successful match gives a family their future back.</p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={200}>
            <div className="impact-stats">
              {[
                { num: '5,000+', lbl: 'Stories Shared' },
                { num: '1 Million+', lbl: 'People Reached' },
                { num: '1,200+', lbl: 'Families Transformed' },
                { num: '24/7', lbl: 'Someone Is Waiting' },
              ].map((s) => (
                <div key={s.lbl} className="impact-stat glass">
                  <div className="num font-display">{s.num}</div>
                  <div className="lbl">{s.lbl}</div>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── WHY THIS MATTERS ── */}
      <section className="why">
        <div className="container">
          <div className="why-grid">
            <RevealOnScroll>
              <div className="mosaic">
                <div className="mosaic-a" style={{ position: 'relative' }}>
                  <Image src="https://kglvtgohmfulykkspfmj.supabase.co/storage/v1/object/public/site-assets/legacy/assets/child-D6VtbEtx.png" alt="Patient with family" fill style={{ objectFit: 'cover' }} />
                </div>
                <div className="mosaic-b" style={{ position: 'relative' }}>
                  <Image src="https://kglvtgohmfulykkspfmj.supabase.co/storage/v1/object/public/site-assets/legacy/assets/family-celebration-BH46mSCz.jpg" alt="Family celebrating" fill style={{ objectFit: 'cover' }} />
                </div>
                <div className="mosaic-c">
                  <div className="mosaic-label" style={{ color: 'rgba(255,255,255,0.75)' }}>Belief</div>
                  <div className="mosaic-text">Awareness bridges hope and miracles.</div>
                </div>
                <div className="mosaic-d" style={{ position: 'relative' }}>
                  <Image src="https://kglvtgohmfulykkspfmj.supabase.co/storage/v1/object/public/site-assets/legacy/assets/hero-hands-f9VxfxAk.jpg" alt="Hands reaching" fill style={{ objectFit: 'cover' }} />
                </div>
                <div className="mosaic-e">
                  <div className="mosaic-label" style={{ color: 'var(--emerald-soft)' }}>Our Mission</div>
                  <div className="mosaic-text">Share every story until the right person hears it.</div>
                </div>
              </div>
            </RevealOnScroll>
            <div>
              <RevealOnScroll>
                <div className="section-label">Why This Matters</div>
                <h2 className="display">The Gap Is Awareness</h2>
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 20, fontSize: 17, lineHeight: 1.85, color: 'var(--muted)' }}>
                  <p>Many people need living kidney donors, living liver donors, bone marrow matches, and other life-saving medical miracles. Many people are willing to help.</p>
                  <p>Patients and potential donors share the same world but rarely cross paths.</p>
                  <p style={{ fontWeight: 600, color: 'var(--navy)' }}>We bridge that gap through:</p>
                </div>
              </RevealOnScroll>
              <RevealOnScroll delay={180}>
                <div className="why-tags">
                  {['Media', 'Technology', 'Storytelling', 'Partnerships', 'Community Engagement', 'Human Connection'].map((tag) => (
                    <div key={tag} className="why-tag">
                      <span className="dot" aria-hidden="true" />
                      {tag}
                    </div>
                  ))}
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ── FUTURE ── */}
      <section className="future section-dark" style={{ position: 'relative' }}>
        <Image
          src="https://kglvtgohmfulykkspfmj.supabase.co/storage/v1/object/public/site-assets/legacy/assets/network-future-C4ldnWew.jpg"
          alt=""
          fill
          aria-hidden="true"
          style={{ objectFit: 'cover', opacity: 0.4, zIndex: 0 }}
        />
        <div className="future-overlay" aria-hidden="true" />
        <div className="container future-inner">
          <div className="future-grid">
            <div>
              <RevealOnScroll>
                <div className="section-label section-label-soft">The Future</div>
                <h2 className="display-future">Bringing the future of life-saving connections together.</h2>
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <p style={{ marginTop: 32, fontSize: 17, color: 'rgba(255,255,255,0.75)' }}>Imagine a world where:</p>
              </RevealOnScroll>
              <RevealOnScroll delay={160}>
                <ul className="future-list">
                  {[
                    "Every patient's story is discoverable.",
                    'Media reaches potential living donors and matches instantly.',
                    'Technology expands awareness.',
                    'Communities unite around saving lives.',
                    'More families find hope.',
                    'More lives are saved.',
                  ].map((item) => (
                    <li key={item}><span className="dot" aria-hidden="true" /><span>{item}</span></li>
                  ))}
                </ul>
              </RevealOnScroll>
              <RevealOnScroll delay={220}>
                <p className="future-tagline font-display">This is the future Save One Person is building.</p>
              </RevealOnScroll>
            </div>
            <RevealOnScroll delay={100}>
              <div className="orbit-wrap">
                <div className="orbit-ring float-slow" />
                <div className="orbit-ring orbit-ring-2" style={{ animation: 'float 8s ease-in-out infinite', animationDelay: '0.5s' }} />
                <div className="orbit-ring orbit-ring-3" style={{ animation: 'float 10s ease-in-out infinite', animationDelay: '1s' }} />
                <div className="orbit-ring orbit-ring-4" style={{ animation: 'float 7s ease-in-out infinite', animationDelay: '1.5s' }} />
                <div className="orbit-center">
                  <div className="orbit-core font-display">SOP</div>
                </div>
                {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                  <span key={deg} className="orbit-dot" style={{ transform: `rotate(${deg}deg) translate(clamp(90px,22vw,200px)) rotate(-${deg}deg)`, animationDelay: `${i * 0.3}s` }} />
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ── HOW TO HELP ── */}
      <section className="help">
        <div className="container">
          <RevealOnScroll>
            <div className="section-label">How You Can Help</div>
            <h2 className="display">Four ways to help save a life.</h2>
          </RevealOnScroll>
          {/* auto-fit keeps this responsive (4→2→1 across breakpoints) after adding the 4th card,
              matching the advisors grid pattern used elsewhere on this page. */}
          <div className="help-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            {[
              { tag: 'Give', title: 'Donate', body: 'Your tax-deductible contribution helps expand our reach and tell more life-saving stories.', cta: 'Donate Now →', href: DONATE_URL, external: false },
              { tag: 'Connect', title: 'Make An Introduction', body: 'Know someone in media, healthcare, philanthropy, technology, entertainment, or business? Introductions help save lives.', cta: 'Email Lauren →', href: 'mailto:Save1Person@aol.com', external: false },
              { tag: 'Amplify', title: 'Become A Partner', body: 'Organizations and companies can help amplify life-saving messages and expand our impact.', cta: 'Partner With Us →', href: 'mailto:Save1Person@aol.com?subject=Partnership%20Inquiry', external: false },
              { tag: 'Involve', title: 'Volunteer', body: 'Give your time and talent. Join the mission and help us reach more people who are waiting for a match.', cta: 'Get Involved →', href: '/contact', external: false },
            ].map((card, i) => (
              <RevealOnScroll key={card.tag} delay={(i + 1) * 80}>
                <article className="help-card">
                  <div className="card-tag">{card.tag}</div>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                  <a href={card.href} className="card-cta" {...(card.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{card.cta}</a>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── DONATE ── */}
      <section id="donate" className="donate">
        <div className="container">
          <div className="donate-grid">
            <div>
              <RevealOnScroll>
                <div className="section-label">Your Impact</div>
                <h2 className="display" style={{ maxWidth: 460 }}>Your Donation Creates Opportunities For Miracles</h2>
              </RevealOnScroll>
              <RevealOnScroll delay={120}>
                <ul className="donate-list">
                  {['Expand media outreach', 'Share more life-saving stories', 'Reach more potential living donors and matches', 'Build technology and AI tools', 'Educate the public', 'Create life-saving matches'].map((item) => (
                    <li key={item}><span className="check" aria-hidden="true" /><span>{item}</span></li>
                  ))}
                </ul>
              </RevealOnScroll>
            </div>
            <RevealOnScroll delay={120}>
              <div className="donate-card">
                <div className="donate-card-glow" aria-hidden="true" />
                <div className="label">Tax-Deductible</div>
                <h3>Help send the next story to the right person.</h3>
                <p>Every contribution funds storytelling, technology, and outreach that connects people in need of living donors and bone marrow matches with those who can help them.</p>
                <a href={DONATE_URL} className="btn btn-emerald" style={{ padding: '16px 32px', fontSize: 14 }}>Donate Now</a>
                <div className="note">Secure checkout via Save One Person</div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ── FOUNDER ── */}
      <section className="founder">
        <div className="container">
          <div className="founder-grid">
            <RevealOnScroll>
              <div className="founder-img-wrap">
                <div className="founder-img">
                  <Image
                    src="https://kglvtgohmfulykkspfmj.supabase.co/storage/v1/object/public/site-assets/legacy/assets/ceo-BmSwDvux.jpeg"
                    alt="Lauren Finkelstein, Founder of Save One Person"
                    width={600}
                    height={583}
                    style={{ width: '100%', height: 583, objectFit: 'cover', objectPosition: 'top' }}
                  />
                </div>
                <div className="founder-badge">
                  <div className="badge-label">Founder</div>
                  <div className="badge-name font-display">Lauren Finkelstein</div>
                  <div className="badge-sub">Save One Person</div>
                </div>
              </div>
            </RevealOnScroll>
            <div>
              <RevealOnScroll>
                <div className="section-label">The Founder</div>
                <h2 className="display">Meet Lauren Finkelstein</h2>
                <p style={{ fontSize: 18, color: 'var(--muted)', marginTop: 8 }}>Founder, Save One Person</p>
              </RevealOnScroll>
              <RevealOnScroll delay={120}>
                <p style={{ marginTop: 32, fontSize: 17, lineHeight: 1.85, color: 'rgba(28,32,41,0.85)' }}>
                  Driven by a personal conviction that awareness saves lives, Lauren founded Save One Person to harness the reach of media, the power of storytelling, and the warmth of human connection — helping patients find living kidney donors, living liver donors, bone marrow matches, and other life-saving medical miracles.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={200}>
                <div className="founder-btns">
                  <a href="tel:9175726385" className="btn btn-navy">Call Lauren</a>
                  <a href="mailto:Save1Person@aol.com" className="btn btn-ghost" style={{ borderColor: 'var(--border)', color: 'var(--navy)' }}>Email Lauren</a>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ── SHARE YOUR STORY ── */}
      <section className="share-story section-dark" style={{ position: 'relative', paddingTop: 88, paddingBottom: 88 }}>
        <Image
          src="https://kglvtgohmfulykkspfmj.supabase.co/storage/v1/object/public/site-assets/legacy/assets/family-celebration-BH46mSCz.jpg"
          alt=""
          fill
          aria-hidden="true"
          style={{ objectFit: 'cover', opacity: 0.25, zIndex: 0 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(15,23,42,0.92), rgba(28,32,41,0.88))', zIndex: 1 }} aria-hidden="true" />
        <div className="container-md" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <RevealOnScroll>
            <div className="section-label section-label-soft">Share Your Story</div>
            <h2 className="display-lg" style={{ color: 'white' }}>Need a Living Donor or a Medical Miracle?</h2>
            <p style={{ marginTop: 24, fontSize: 18, color: 'rgba(255,255,255,0.82)', lineHeight: 1.8, maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
              If you or someone you love is in need of a living organ donor or facing a serious medical crisis, share your story with a photo and contact information. We&apos;ll feature it on our site and send it to our media partners to help find a match.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={140}>
            <div style={{ marginTop: 36, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/urgent-requests/submit" className="btn btn-emerald" style={{ padding: '16px 32px', fontSize: 14, letterSpacing: '0.1em' }}>
                Share Your Story →
              </Link>
              <a href="mailto:Save1Person@aol.com?subject=My%20Story" className="btn btn-ghost" style={{ padding: '16px 32px', fontSize: 14, letterSpacing: '0.1em', borderColor: 'rgba(255,255,255,0.4)', color: 'white' }}>
                Email Us Directly
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── ADVISORS / TEAM ── */}
      <section className="advisors" style={{ background: 'var(--secondary)', paddingTop: 96, paddingBottom: 96 }}>
        <div className="container">
          <RevealOnScroll>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div className="section-label">The Team Behind Lauren</div>
              <h2 className="display" style={{ marginTop: 12 }}>Trusted advisors guiding the mission.</h2>
            </div>
          </RevealOnScroll>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 28 }}>
            <RevealOnScroll>
              <article style={{ background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-3xl)', overflow: 'hidden', boxShadow: 'var(--shadow-soft)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', aspectRatio: '4/5', background: 'linear-gradient(160deg, #eef2f6 0%, #e6ebf0 100%)' }}>
                  <Image
                    src="https://kglvtgohmfulykkspfmj.supabase.co/storage/v1/object/public/site-assets/wp/2025/03/Simon-Jacobson.jpg"
                    alt="Rabbi Simon Jacobson, Advisor & Mentor"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover', objectPosition: 'center top' }}
                  />
                </div>
                <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
                  <div>
                    <div className="section-label" style={{ marginBottom: 6 }}>Advisor & Mentor</div>
                    <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 26, color: 'var(--navy)' }}>Rabbi Simon Jacobson</h3>
                  </div>
                  <p style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(28,32,41,0.82)' }}>
                    Rabbi Jacobson is the author of the best-selling book <em>Toward a Meaningful Life</em>, a William Morrow publication that has sold over 300,000 copies to date and has been translated into Hebrew, French, Spanish, Dutch, Portuguese, Italian, Russian, German, Hungarian and Czech.
                  </p>
                  <p style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(28,32,41,0.82)' }}>
                    He leads The Meaningful Life Center, which bridges the secular and the spiritual, through a wide variety of live and online programming. The Center presents to people of all backgrounds the universal teachings of Torah as a blueprint for life.
                  </p>
                  <p style={{ fontSize: 13, color: 'var(--muted)', fontStyle: 'italic', marginTop: 'auto' }}>
                    Meaningful Life Center · 788 Eastern Parkway · Brooklyn, NY 11213
                  </p>
                  <a href="https://www.meaningfullife.com/" target="_blank" rel="noopener noreferrer" className="btn btn-navy" style={{ padding: '11px 20px', fontSize: 13, alignSelf: 'flex-start' }}>
                    Meaningful Life Center →
                  </a>
                </div>
              </article>
            </RevealOnScroll>

            <RevealOnScroll delay={120}>
              <article style={{ background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-3xl)', overflow: 'hidden', boxShadow: 'var(--shadow-soft)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', aspectRatio: '4/5', background: 'linear-gradient(160deg, #eef2f6 0%, #e6ebf0 100%)' }}>
                  <Image
                    src="https://kglvtgohmfulykkspfmj.supabase.co/storage/v1/object/public/site-assets/wp/2025/03/Loren-Lahav.png"
                    alt="Loren Lahav, Global Outreach Strategist"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                  />
                </div>
                <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
                  <div>
                    <div className="section-label" style={{ marginBottom: 6 }}>Global Outreach Strategist</div>
                    <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 26, color: 'var(--navy)' }}>Loren Lahav</h3>
                  </div>
                  <p style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(28,32,41,0.82)' }}>
                    Loren Lahav is the author of the best-selling book <em>Chicken Soup for The Soul: Time To Thrive</em>; <em>Life TuneUps: Your Personal Plan to Find Balance, Discover Your Passion, and Step into Greatness</em>; <em>The Greatest Love: Being An Extraordinary Mom</em>; <em>Drama Free Divorce Detox: Finding Your True Self After Divorce</em>; and the creator of The &ldquo;I AM Cards&rdquo; Series for Men, Women & Children.
                  </p>
                  <p style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(28,32,41,0.82)' }}>
                    She spearheaded the Global Life & Health Mastery Program for Anthony Robbins — leading hundreds of thousands of people throughout the world to turn around their health issues through the use of proper nutrition and the mind/body balance connection. Loren is the Founder and CEO of TRUE LLC and travels the world teaching people from all the top stages.
                  </p>
                  <p style={{ fontSize: 13, color: 'var(--muted)', fontStyle: 'italic', marginTop: 'auto' }}>
                    TRUE LLC · 11700 Charleston Blvd · Las Vegas, NV 89135
                  </p>
                </div>
              </article>
            </RevealOnScroll>

            <RevealOnScroll delay={200}>
              <article style={{ background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-3xl)', overflow: 'hidden', boxShadow: 'var(--shadow-soft)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', aspectRatio: '4/5', background: 'linear-gradient(160deg, #eef2f6 0%, #e6ebf0 100%)' }}>
                  <Image
                    src="https://kglvtgohmfulykkspfmj.supabase.co/storage/v1/object/public/site-assets/team/cto-abhishek.jpg"
                    alt="Abhishek Donekal, Chief Technology Officer"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover', objectPosition: 'center top' }}
                  />
                </div>
                <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
                  <div>
                    <div className="section-label" style={{ marginBottom: 6 }}>Chief Technology Officer</div>
                    <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 26, color: 'var(--navy)' }}>Abhishek Donekal</h3>
                  </div>
                  <p style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(28,32,41,0.82)' }}>
                    Abhishek holds a Master&rsquo;s in Data Science &amp; Artificial Intelligence from Florida International University and works as an AI Engineer, designing and implementing intelligent systems that turn data into real-world impact.
                  </p>
                  <p style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(28,32,41,0.82)' }}>
                    As Chief Technology Officer, he leads technology and the entire digital platform for Save One Person &mdash; architecting the website, site-wide search, the native shop, and the AI-powered outreach that bring urgent patient stories to the right people at the right time.
                  </p>
                  <p style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(28,32,41,0.82)' }}>
                    His work spans full-stack engineering, machine learning, and automation &mdash; from building fast, reliable web systems to applying AI and large language models that help the mission reach more donors, share more stories, and save more lives.
                  </p>
                  <p style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(28,32,41,0.82)' }}>
                    He believes technology should serve people first: every system he builds is measured by one question &mdash; does it help connect a patient with the person who can save their life?
                  </p>
                </div>
              </article>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delay={220}>
            <div style={{ marginTop: 40, textAlign: 'center' }}>
              <Link href="/about" className="btn btn-ghost" style={{ borderColor: 'var(--border)', color: 'var(--navy)', padding: '12px 24px', fontSize: 13 }}>
                Read full About page →
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta section-dark" style={{ position: 'relative' }}>
        <Image src="https://kglvtgohmfulykkspfmj.supabase.co/storage/v1/object/public/site-assets/legacy/assets/family-celebration-BH46mSCz.jpg" alt="A multigenerational family embracing at golden hour" fill style={{ objectFit: 'cover', zIndex: -2 }} />
        <div className="cta-overlay" />
        <div className="container-5xl" style={{ textAlign: 'center' }}>
          <RevealOnScroll>
            <div className="section-label section-label-soft">Join The Movement</div>
            <h2 className="display-lg">Every Day Someone Is Waiting For A Miracle</h2>
          </RevealOnScroll>
          <RevealOnScroll delay={120}>
            <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 12, fontSize: 18, color: 'rgba(255,255,255,0.85)', maxWidth: 672, marginLeft: 'auto', marginRight: 'auto' }}>
              <p>Together we can help more people find hope.</p>
              <p>One story shared can reach millions of hearts.</p>
              <p>One introduction made can change a destiny.</p>
              <p>One donation given can open a door to healing.</p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={200}>
            <div className="cta-btns">
              <a href={DONATE_URL} className="btn btn-emerald" style={{ padding: '16px 32px', fontSize: 14, letterSpacing: '0.18em' }}>Donate Now</a>
              <a href="mailto:Save1Person@aol.com?subject=Partnership%20Inquiry" className="btn btn-ghost" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.25)', padding: '16px 32px', fontSize: 14, letterSpacing: '0.18em' }}>Partner With Us</a>
              <a href="tel:9175726385" className="btn" style={{ border: '1px solid rgba(255,255,255,0.15)', padding: '16px 32px', fontSize: 14, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.85)' }}>Call Lauren</a>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
