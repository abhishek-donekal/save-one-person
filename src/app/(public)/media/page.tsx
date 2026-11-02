import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import MediaBrowser, { MediaHighlights, type MediaCard } from './MediaBrowser'

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

  const TYPE_ORDER = ['tv', 'interview', 'podcast', 'video', 'article']
  const cards: MediaCard[] = ((media || []) as MediaItem[]).map((m) => {
    const yt = youtubeThumb(m.url)
    return {
      id: m.id,
      title: m.title,
      outlet: m.outlet_name || 'Save One Person',
      type: m.media_type,
      href: m.slug ? `/media/${m.slug}` : (m.url || '/media'),
      thumb: m.thumbnail_url || yt,
      isYoutube: !m.thumbnail_url && !!yt,
      featured: !!m.featured,
    }
  }).sort((x, y) => Number(y.featured) - Number(x.featured) || TYPE_ORDER.indexOf(x.type) - TYPE_ORDER.indexOf(y.type))
  const highlights = cards.filter((c) => c.featured && c.thumb && (c.type === 'tv' || c.type === 'video'))
  const outlets = Array.from(new Set(cards.map((c) => c.outlet).filter((o) => !/^(save one person|various)$/i.test(o))))

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
            Media: Sign Up for Save One Alerts →
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
                <div className="section-label" style={{ textAlign: 'center', marginBottom: 18 }}>As Featured On</div>
                <div className="media-asseen-list">
                  {outlets.map((o) => <span key={o}>{o}</span>)}
                </div>
              </div>

              {highlights.length > 0 && (
                <section style={{ marginTop: 64 }}>
                  <div className="section-label">Highlights</div>
                  <h2 className="display" style={{ marginTop: 10, marginBottom: 28 }}>Watch Save One Person on TV.</h2>
                  <MediaHighlights items={highlights} />
                </section>
              )}

              <section style={{ marginTop: 72 }}>
                <div className="section-label">All Coverage</div>
                <h2 className="display" style={{ marginTop: 10, marginBottom: 24 }}>TV, radio, podcasts &amp; articles.</h2>
                <MediaBrowser items={cards} />
              </section>
            </>
          )}

          <div style={{ marginTop: 80, padding: 48, background: 'var(--secondary)', borderRadius: 'var(--r-3xl)', textAlign: 'center' }}>
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
