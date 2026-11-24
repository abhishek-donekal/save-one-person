'use client'

import { useState } from 'react'

type Short = { id: string; title: string; src?: string; poster?: string }

// Lauren (Nov 23): poster frames chosen so her mouth isn't open (or the frame shows the scene instead).
const HH_FRAME: Record<string, string> = {
  sbaDLlly7XA: 'hq1', gXyz5skHopE: 'hq1', '3vb-8rkRXzg': 'hq2', b6dwVOZIzK0: 'hq2', QfEm5xWzIBI: 'hq1', KLcc8hLBK28: 'hq3',
  ZVSavThMpvU: 'hq1', oRW0hxI5K1A: 'hq1', OkHXzrBukW8: 'hq1', VVXYFd3R3XE: 'hq2', A14KX8CwucQ: 'hq1', TPlVsVApmWY: 'hq3',
  '0Ism8fM1kC0': 'hq1', vwjmw2e4Swo: 'hq2', w5vlI92dYB4: 'hq1', 'yXMI88Gj--8': 'hq2', 'V-DHM1pCiy8': 'hq1', LJXPljvwZ2U: 'hq1',
  'ZFT-lZN6FE4': 'hq1', bHMjtA2qIFk: 'hq1', ks1Bone41BY: 'hq1', lMC6gGsQUcY: 'hq1', mV7AKovCWog: 'hq1', 'W2s7o-yfjAw': 'hq1',
  '4S44eEhxr7c': 'hq1', gRRJqHwmOPw: 'hq1', ArHFOaUeqxg: 'hq1', 'sx-u8u_C7yg': 'hq1',
}

export default function ShortsGrid({ shorts }: { shorts: Short[] }) {
  const [playing, setPlaying] = useState<string | null>(null)
  return (
    <div className="shorts-grid">
      {shorts.map((s) => (
        <article key={s.id} className="short-card">
          <div className="short-frame">
            {s.src ? (
              <video src={s.src} poster={s.poster} controls playsInline preload="none" title={s.title} />
            ) : playing === s.id ? (
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
                  src={`https://i.ytimg.com/vi/${s.id}/${HH_FRAME[s.id] || 'oar2'}.jpg`}
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
