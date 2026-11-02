'use client'

import { useState } from 'react'

type Short = { id: string; title: string }

export default function ShortsGrid({ shorts }: { shorts: Short[] }) {
  const [playing, setPlaying] = useState<string | null>(null)
  return (
    <div className="shorts-grid">
      {shorts.map((s) => (
        <article key={s.id} className="short-card">
          <div className="short-frame">
            {playing === s.id ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${s.id}?autoplay=1&rel=0&playsinline=1`}
                title={s.title}
                allow="autoplay; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <button type="button" onClick={() => setPlaying(s.id)} aria-label={`Play: ${s.title}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://i.ytimg.com/vi/${s.id}/oar2.jpg`}
                  alt=""
                  loading="lazy"
                  onError={(e) => { const img = e.currentTarget; if (!img.dataset.fb) { img.dataset.fb = '1'; img.src = `https://i.ytimg.com/vi/${s.id}/hqdefault.jpg` } }}
                />
                <span className="short-play" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                </span>
              </button>
            )}
          </div>
          <h3 className="short-title">{s.title}</h3>
        </article>
      ))}
    </div>
  )
}
