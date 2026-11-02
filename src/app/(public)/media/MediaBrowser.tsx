'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export type MediaCard = {
  id: string
  title: string
  outlet: string
  type: string
  href: string
  thumb: string | null
  isYoutube: boolean
  featured: boolean
}

const FILTERS: { key: string; label: string; types: string[] }[] = [
  { key: 'all', label: 'All', types: [] },
  { key: 'tv', label: 'TV', types: ['tv'] },
  { key: 'radio', label: 'Radio & Interviews', types: ['interview'] },
  { key: 'podcast', label: 'Podcasts', types: ['podcast'] },
  { key: 'article', label: 'Articles', types: ['article'] },
  { key: 'video', label: 'Videos', types: ['video'] },
]
const TYPE_LABEL: Record<string, string> = { tv: 'TV', interview: 'Radio & Interview', podcast: 'Podcast', video: 'Video', article: 'Article' }
const TYPE_CTA: Record<string, string> = { tv: 'Watch', video: 'Watch', podcast: 'Listen', interview: 'Listen', article: 'Read' }

function Cover({ m, big }: { m: MediaCard; big?: boolean }) {
  if (m.thumb) {
    return (
      <>
        <Image
          src={m.thumb}
          alt=""
          fill
          sizes={big ? '(max-width: 900px) 100vw, 640px' : '(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 400px'}
          style={{ objectFit: m.isYoutube ? 'cover' : 'contain', background: m.isYoutube ? '#000' : '#fff', padding: m.isYoutube ? 0 : 14 }}
        />
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

export default function MediaBrowser({ items }: { items: MediaCard[] }) {
  const [filter, setFilter] = useState('all')
  const counts = Object.fromEntries(FILTERS.map((f) => [f.key, f.types.length ? items.filter((m) => f.types.includes(m.type)).length : items.length]))
  const types = FILTERS.find((f) => f.key === filter)!.types
  const shown = types.length ? items.filter((m) => types.includes(m.type)) : items

  return (
    <>
      <div className="media-filters" role="tablist" aria-label="Filter media">
        {FILTERS.filter((f) => counts[f.key] > 0).map((f) => (
          <button key={f.key} type="button" role="tab" aria-selected={filter === f.key} className={filter === f.key ? 'active' : ''} onClick={() => setFilter(f.key)}>
            {f.label} <span>{counts[f.key]}</span>
          </button>
        ))}
      </div>

      <div className="media-grid">
        {shown.map((m) => (
          <Link key={m.id} href={m.href} className="media-card hover-lift">
            <div className="media-thumb"><Cover m={m} /></div>
            <div className="media-body">
              <div className="media-meta">
                <span className="media-outlet">{m.outlet}</span>
                <span className={`media-type media-type-${m.type}`}>{TYPE_LABEL[m.type] || m.type}</span>
              </div>
              <h3>{m.title}</h3>
              <span className="media-cta">{TYPE_CTA[m.type] || 'View'} →</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export function MediaHighlights({ items }: { items: MediaCard[] }) {
  if (items.length === 0) return null
  const [first, ...rest] = items
  return (
    <div className="media-highlights">
      <Link href={first.href} className="media-hero-card hover-lift">
        <div className="media-thumb"><Cover m={first} big /></div>
        <div className="media-body">
          <div className="media-meta">
            <span className="media-outlet">{first.outlet}</span>
            <span className={`media-type media-type-${first.type}`}>{TYPE_LABEL[first.type] || first.type}</span>
          </div>
          <h3>{first.title}</h3>
          <span className="media-cta">{TYPE_CTA[first.type] || 'View'} →</span>
        </div>
      </Link>
      <div className="media-side">
        {rest.slice(0, 4).map((m) => (
          <Link key={m.id} href={m.href} className="media-mini hover-lift">
            <div className="media-thumb"><Cover m={m} /></div>
            <div>
              <span className="media-outlet">{m.outlet}</span>
              <h4>{m.title}</h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
