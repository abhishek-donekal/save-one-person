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
  title: 'In the Media: PIX11, NY1, FOX 5, 1010 WINS & More',
  description: 'Save One Person and founder Lauren Finkelstein in the news: TV, radio and podcast appearances on PIX11, NY1, FOX 5, 1010 WINS, the Tony Robbins Podcast and more.',
  alternates: { canonical: '/media' },
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
  // A few old thumbnails are tiny logos (e.g. 135x100) that turn into a blurry gray
  // block when stretched across a card. Show the branded text cover for those instead.
  const TINY_LOGO_THUMBS = ['1010-e1746811183584.png', 'OUR-TOWN.png']
  const isTinyLogo = (u: string | null) => !!u && TINY_LOGO_THUMBS.some((f) => u.endsWith(f))
  // Lauren (Nov 23): show the star themselves as the freeze frame, not the title card.
  const THUMB_OVERRIDES: Record<string, string> = {
    'andy-garcia-saves-lives-with-us': 'https://img.youtube.com/vi/R_jTjcJyo4Y/hq1.jpg',
    'michael-rapaport-endorses-saving-lives-through-the-media': 'https://img.youtube.com/vi/o_IuYMbjO2c/hq2.jpg',
  }
  const items = (media || []) as MediaItem[]
  const cards: MediaCard[] = items.map((m) => ({
    id: m.id,
    title: m.title,
    outlet: fixOutlet(m.outlet_name),
    type: m.media_type,
    href: m.slug ? `/media/${m.slug}` : (m.url || '/media'),
    thumb: (m.slug && THUMB_OVERRIDES[m.slug]) || (isTinyLogo(m.thumbnail_url) ? null : m.thumbnail_url) || youtubeThumb(m.url),
    featured: !!m.featured,
  }))
  // Lauren (Nov 23): more of her TV pieces from the Save One Person YouTube channel, incl. PIX11 "Help Me Howard".
  const yt = (id: string) => `https://www.youtube.com/watch?v=${id}`
  const EXTRA_TV: MediaCard[] = [
    { id: 'yt-aguW8OjSI7A', title: 'Help Me Howard: PIX11\u2019s Howard Thompson Helps Find a Living Kidney Donor', outlet: 'PIX11', type: 'tv', href: yt('aguW8OjSI7A'), thumb: 'https://img.youtube.com/vi/aguW8OjSI7A/hqdefault.jpg', featured: false },
    { id: 'yt-gQxetEWJhJg', title: 'Help Me Howard: Dr. Ron Richman Finds a Living Kidney Donor', outlet: 'PIX11', type: 'tv', href: yt('gQxetEWJhJg'), thumb: 'https://img.youtube.com/vi/gQxetEWJhJg/hqdefault.jpg', featured: false },
    { id: 'yt-ayufzKXUjAE', title: 'Help Me Howard: Rebecca Salame Needs a Bone Marrow Match', outlet: 'PIX11', type: 'tv', href: yt('ayufzKXUjAE'), thumb: 'https://img.youtube.com/vi/ayufzKXUjAE/hqdefault.jpg', featured: false },
    { id: 'yt-EBBlcr1IhrY', title: 'Help Me Howard: Alex Dwek Shares His Daughter\u2019s Story', outlet: 'PIX11', type: 'tv', href: yt('EBBlcr1IhrY'), thumb: 'https://img.youtube.com/vi/EBBlcr1IhrY/hqdefault.jpg', featured: false },
    { id: 'yt-Vte9KuQuMXs', title: 'Saving Lives on Oprah', outlet: 'Oprah', type: 'tv', href: yt('Vte9KuQuMXs'), thumb: 'https://img.youtube.com/vi/Vte9KuQuMXs/hqdefault.jpg', featured: false },
  ]
  const seen = new Set(cards.map((c) => c.thumb || ''))
  for (const e of EXTRA_TV) if (!seen.has(e.thumb || '')) cards.push(e)
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
