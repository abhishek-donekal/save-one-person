import Image from 'next/image'
import Link from 'next/link'

export type MediaCard = {
  id: string
  title: string
  outlet: string
  type: string
  href: string
  thumb: string | null
  featured: boolean
}

const TYPE_LABEL: Record<string, string> = { tv: 'TV', interview: 'Radio', podcast: 'Podcast', video: 'Video', article: 'Article' }
const TYPE_CTA: Record<string, string> = { tv: 'Watch', video: 'Watch', podcast: 'Listen', interview: 'Listen', article: 'Read' }

function Cover({ m, big }: { m: MediaCard; big?: boolean }) {
  if (m.thumb) {
    return (
      <>
        <Image src={m.thumb} alt="" fill sizes={big ? '(max-width: 900px) 100vw, 760px' : '(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 380px'} style={{ objectFit: 'cover', objectPosition: 'center 30%' }} />
        {(m.type === 'tv' || m.type === 'video') && (
          <span className="media-play" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
          </span>
        )}
      </>
    )
  }
  return (
    <div className={`media-cover-text media-cover-${m.type}`}>
      <span className="media-cover-kind">{TYPE_LABEL[m.type] || 'Feature'}</span>
      <span className="media-cover-outlet">{m.outlet}</span>
    </div>
  )
}

export function MediaCardView({ m, big = false }: { m: MediaCard; big?: boolean }) {
  return (
    <Link href={m.href} className={`media-card hover-lift${big ? ' media-card-big' : ''}`}>
      <div className="media-thumb"><Cover m={m} big={big} /></div>
      <div className="media-body">
        <div className="media-meta">
          <span className="media-outlet">{m.outlet}</span>
          <span className={`media-type media-type-${m.type}`}>{TYPE_LABEL[m.type] || m.type}</span>
        </div>
        <h3>{m.title}</h3>
        <span className="media-cta">{TYPE_CTA[m.type] || 'View'} →</span>
      </div>
    </Link>
  )
}
