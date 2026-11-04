import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { MediaCardView, type MediaCard } from './MediaCards'

function youtubeThumb(url: string | null): string | null {
  if (!url) return null
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/)
  return m ? `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg` : null
}

export const metadata: Metadata = {
  title: 'In The Media',
  description: 'Save One Person in the news: TV appearances, podcasts, newspaper features, and more.',
}



type MediaItem = {
  id: string
  title: string
  outlet_name: string
  media_type: string
  url: string | null
  slug: string | null
  thumbnail_url: string | null
  published_date: string | null
  featured: boolean | null
}

export default async function MediaPage() {
  const supabase = await createClient()
  const { data: media } = await supabase
    .from('media_entries')
    .select('*')
    .order('published_date', { ascending: false, nullsFirst: false })

  const fixOutlet = (o: string | null) => {
    const n = (o || 'Save One Person').trim()
    if (/^pix ?11$/i.test(n)) return 'PIX11'
    if (/^ehealth radio$/i.test(n)) return 'eHealth Radio'
    if (/^shoutoutmiami$/i.test(n)) return 'ShoutoutMiami'
    return n
  }
  const cards: MediaCard[] = ((media || []) as MediaItem[]).map((m) => ({
    id: m.id,
    title: m.title,
    outlet: fixOutlet(m.outlet_name),
    type: m.media_type,
    href: m.slug ? `/media/${m.slug}` : (m.url || '/media'),
    thumb: m.thumbnail_url || youtubeThumb(m.url),
    featured: !!m.featured,
  }))
  const byFeatured = (x: MediaCard, y: MediaCard) => Number(y.featured) - Number(x.featured) || Number(!!y.thumb) - Number(!!x.thumb)
  const SECTIONS = [
    { id: 'tv', label: 'On TV', title: 'Save One Person on television.', items: cards.filter((c) => c.type === 'tv').sort(byFeatured) },
    { id: 'celebrities', label: 'Celebrity Supporters', title: 'Stars who use their voice to save lives.', items: cards.filter((c) => c.type === 'video').sort(byFeatured) },
    { id: 'radio', label: 'Radio & Podcasts', title: 'On the radio and in podcasts.', items: cards.filter((c) => c.type === 'interview' || c.type === 'podcast').sort(byFeatured) },
    { id: 'articles', label: 'Articles', title: 'In newspapers and magazines.', items: cards.filter((c) => c.type === 'article').sort(byFeatured) },
  ].filter((sec) => sec.items.length > 0)
  const OUTLETS = ['PIX11', 'NY1 News', 'FOX 5', '1010 WINS', 'WWOR Radio', 'eHealth Radio', 'Tony Robbins Podcast', 'National Enquirer', 'Our Town', 'ShoutoutMiami', 'NYC Mayor\u2019s Office']

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="section-label section-label-soft">Press & Media</div>
          <h1 className="display-lg">In The Media</h1>
          <p style={{ marginTop: 24, fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
            Save One Person has been featured across television, radio, podcasts, and digital media. Every mention helps reach more people who can save a life.
          </p>
          <Link href="/media-alerts" className="btn btn-emerald" style={{ marginTop: 28, padding: '16px 28px', fontSize: 14 }}>
            TV, Radio &amp; Podcasts: Get Our Weekly Alerts →
          </Link>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          {cards.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>
              <p style={{ fontSize: 18 }}>Media features coming soon.</p>
            </div>
          ) : (
            <>
              <div className="media-asseen">
                <div className="section-label" style={{ textAlign: 'center', marginBottom: 16 }}>As Featured On</div>
                <div className="media-asseen-list">
                  {OUTLETS.map((o) => <span key={o}>{o}</span>)}
                </div>
              </div>

              <nav className="media-jump" aria-label="Media sections">
                {SECTIONS.map((sec) => (
                  <a key={sec.id} href={`#${sec.id}`}>{sec.label} <span>{sec.items.length}</span></a>
                ))}
              </nav>

              {SECTIONS.map((sec) => (
                <section key={sec.id} id={sec.id} className="media-section">
                  <div className="media-section-head">
                    <div className="section-label">{sec.label}</div>
                    <h2>{sec.title}</h2>
                  </div>
                  <div className="media-grid">
                    {sec.items.map((m, i) => <MediaCardView key={m.id} m={m} big={i === 0 && sec.items.length > 3} />)}
                  </div>
                </section>
              ))}
            </>
          )}

          <div style={{ marginTop: 64, padding: 48, background: 'var(--secondary)', borderRadius: 'var(--r-3xl)', textAlign: 'center' }}>
            <div className="section-label">Media Inquiries</div>
            <h2 className="display" style={{ maxWidth: 600, margin: '16px auto 0' }}>Want to Feature Save One Person?</h2>
            <p style={{ marginTop: 24, fontSize: 17, color: 'var(--muted)', maxWidth: 560, margin: '24px auto 0' }}>
              Lauren Finkelstein is available for television, podcast, and media interviews. Contact us to discuss coverage.
            </p>
            <div style={{ marginTop: 32, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="mailto:Save1Person@aol.com?subject=Media%20Inquiry" className="btn btn-emerald" style={{ padding: '14px 28px' }}>Media Inquiry</a>
              <a href="tel:9175726385" className="btn btn-navy" style={{ padding: '14px 28px' }}>Call 917-572-6385</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
