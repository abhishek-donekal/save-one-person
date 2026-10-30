import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

function youtubeThumb(url: string | null): string | null {
  if (!url) return null
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/)
  return m ? `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg` : null
}

export const metadata: Metadata = {
  title: 'In The Media',
  description: 'Save One Person in the news: TV appearances, podcasts, newspaper features, and more.',
}

const TYPE_LABELS: Record<string, string> = {
  tv: 'TV',
  interview: 'Interview',
  podcast: 'Podcast',
  video: 'Video',
  article: 'Article',
}

const TYPE_ICON: Record<string, string> = {
  tv: '📺',
  interview: '🎙️',
  podcast: '🎧',
  video: '🎬',
  article: '📰',
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

  const byYear = new Map<string, Map<string, MediaItem[]>>()
  if (media) {
    for (const item of media as MediaItem[]) {
      const year = item.published_date
        ? String(new Date(item.published_date).getFullYear())
        : 'Undated'
      if (!byYear.has(year)) byYear.set(year, new Map())
      const yearMap = byYear.get(year)!
      const outlet = item.outlet_name || 'Other'
      if (!yearMap.has(outlet)) yearMap.set(outlet, [])
      yearMap.get(outlet)!.push(item)
    }
  }

  const sortedYears = Array.from(byYear.keys()).sort((a, b) => {
    if (a === 'Undated') return 1
    if (b === 'Undated') return -1
    return Number(b) - Number(a)
  })

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
          {(!media || media.length === 0) ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>
              <p style={{ fontSize: 18 }}>Media features coming soon.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
              {sortedYears.map((year) => {
                const yearMap = byYear.get(year)!
                const outlets = Array.from(yearMap.keys()).sort((a, b) => a.localeCompare(b))
                const total = outlets.reduce((s, o) => s + yearMap.get(o)!.length, 0)
                return (
                  <section key={year}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 28, paddingBottom: 16, borderBottom: '2px solid var(--navy)' }}>
                      <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 44, color: 'var(--navy)' }}>{year}</h2>
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{total} {total === 1 ? 'feature' : 'features'}</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
                      {outlets.map((outlet) => {
                        const items = yearMap.get(outlet)!
                        return (
                          <div key={outlet}>
                            <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--emerald)', marginBottom: 14 }}>
                              {outlet}
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
                              {items.map((item) => {
                                const thumb = item.thumbnail_url || youtubeThumb(item.url)
                                const detailHref = item.slug ? `/media/${item.slug}` : '/media'
                                return (
                                  <div key={item.id} className="hover-lift" style={{ background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-2xl)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                    {thumb && (
                                      <Link href={detailHref} style={{ position: 'relative', display: 'block', aspectRatio: '16/9', background: 'var(--secondary)' }}>
                                        <Image
                                          src={thumb}
                                          alt={item.title}
                                          fill
                                          sizes="(max-width: 640px) 100vw, 320px"
                                          style={{ objectFit: 'cover' }}
                                        />
                                        {(item.media_type === 'video' || item.media_type === 'tv') && (
                                          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.18)' }}>
                                            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 20px rgba(0,0,0,0.3)' }}>
                                              <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--navy)" aria-hidden="true">
                                                <path d="M8 5v14l11-7z" />
                                              </svg>
                                            </div>
                                          </div>
                                        )}
                                      </Link>
                                    )}
                                    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', flex: 1 }}>
                                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                                          {TYPE_ICON[item.media_type]} {TYPE_LABELS[item.media_type] || item.media_type}
                                        </span>
                                        {item.featured && <span className="badge badge-green">Featured</span>}
                                      </div>
                                      <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: 16, color: 'var(--navy)', lineHeight: 1.4, marginBottom: 10 }}>
                                        <Link href={detailHref} style={{ color: 'var(--navy)', textDecoration: 'none' }}>{item.title}</Link>
                                      </h4>
                                      {item.published_date && (
                                        <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12 }}>
                                          {new Date(item.published_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </p>
                                      )}
                                      <Link href={detailHref} style={{ marginTop: 'auto', fontSize: 12, fontWeight: 600, color: 'var(--navy)', display: 'inline-flex', alignItems: 'center', gap: 6, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                                        View →
                                      </Link>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </section>
                )
              })}
            </div>
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
