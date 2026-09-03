import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

interface Props {
  params: Promise<{ slug: string }>
}

const TYPE_LABELS: Record<string, string> = {
  tv: 'TV Segment',
  interview: 'Interview',
  podcast: 'Podcast',
  video: 'Video',
  article: 'Article',
}

const TYPE_ICON: Record<string, string> = {
  tv: '📺', interview: '🎙️', podcast: '🎧', video: '🎬', article: '📰',
}

function youtubeId(url: string | null): string | null {
  if (!url) return null
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/)
  return m ? m[1] : null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('media_entries').select('title, outlet_name').eq('slug', slug).single()
  return {
    title: data?.title || 'Media Coverage',
    description: data ? `${data.outlet_name} features Save One Person: ${data.title}` : undefined,
  }
}

export default async function MediaDetailPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: item } = await supabase.from('media_entries').select('*').eq('slug', slug).single()
  if (!item) notFound()

  const ytId = youtubeId(item.video_url)
  const paragraphs: string[] = item.body ? item.body.split('\n\n').filter(Boolean) : []
  const dateStr = item.published_date
    ? new Date(item.published_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : null

  return (
    <>
      <div className="page-hero" style={{ paddingBottom: 48 }}>
        <div className="page-hero-inner">
          <div className="section-label section-label-soft">
            {TYPE_ICON[item.media_type]} {TYPE_LABELS[item.media_type] || item.media_type} · {item.outlet_name}
          </div>
          <h1 className="display-lg" style={{ fontSize: 'clamp(30px,5vw,56px)' }}>{item.title}</h1>
          {dateStr && (
            <p style={{ marginTop: 16, fontSize: 15, color: 'rgba(255,255,255,0.6)' }}>{dateStr}</p>
          )}
        </div>
      </div>

      <div className="page-content">
        <div className="container-md">
          {/* Video or hero image */}
          {ytId ? (
            <div style={{ borderRadius: 'var(--r-3xl)', overflow: 'hidden', marginBottom: 40, boxShadow: 'var(--shadow-soft)', aspectRatio: '16/9', background: '#000' }}>
              <iframe
                src={`https://www.youtube.com/embed/${ytId}`}
                title={item.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ width: '100%', height: '100%', border: 0 }}
              />
            </div>
          ) : item.thumbnail_url ? (
            <div style={{ borderRadius: 'var(--r-3xl)', overflow: 'hidden', marginBottom: 40, boxShadow: 'var(--shadow-soft)' }}>
              <Image
                src={item.thumbnail_url}
                alt={item.title}
                width={896}
                height={504}
                sizes="(max-width: 896px) 100vw, 896px"
                style={{ width: '100%', height: 'auto', maxHeight: 520, objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>
          ) : null}

          {/* Body */}
          {paragraphs.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontSize: 17, lineHeight: 1.85, color: 'rgba(28,32,41,0.85)' }}>
              {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          ) : (
            <p style={{ fontSize: 17, color: 'var(--muted)', lineHeight: 1.8 }}>
              {item.outlet_name} featured Save One Person. {ytId ? 'Watch the full segment above.' : ''}
            </p>
          )}

          {/* Original source (external only — never links back to old site) */}
          {item.source_url && (
            <div style={{ marginTop: 32 }}>
              <a href={item.source_url} target="_blank" rel="noopener noreferrer" className="btn btn-navy" style={{ padding: '12px 24px', fontSize: 13 }}>
                View Original Coverage →
              </a>
            </div>
          )}

          {/* CTA */}
          <div style={{ marginTop: 56, padding: 36, background: 'var(--secondary)', borderRadius: 'var(--r-3xl)', textAlign: 'center' }}>
            <h2 className="display" style={{ fontSize: 26, marginBottom: 12 }}>One Story Can Save a Life</h2>
            <p style={{ fontSize: 15, color: 'var(--muted)', maxWidth: 520, margin: '0 auto 24px' }}>
              Media coverage is how patients find their match. Help us reach more people.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/urgent-requests" className="btn btn-emerald" style={{ padding: '13px 26px' }}>See Who Needs Help</Link>
              <Link href="/donate" className="btn btn-navy" style={{ padding: '13px 26px' }}>Donate</Link>
            </div>
          </div>

          <div style={{ marginTop: 40 }}>
            <Link href="/media" style={{ fontSize: 14, fontWeight: 600, color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              ← All Media Coverage
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
