'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { ShopImage } from '@/lib/shop/types'

export default function ProductGallery({ images, title }: { images: ShopImage[]; title: string }) {
  const [active, setActive] = useState(0)
  const [zoom, setZoom] = useState(false)
  const [origin, setOrigin] = useState('center')

  if (!images.length) {
    return (
      <div style={{ aspectRatio: '1/1', background: 'var(--secondary)', borderRadius: 'var(--r-3xl)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)' }}>
        No image available
      </div>
    )
  }

  const img = images[active]

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!zoom) return
    const r = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width) * 100
    const y = ((e.clientY - r.top) / r.height) * 100
    setOrigin(`${x}% ${y}%`)
  }

  return (
    <div>
      <div
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={onMove}
        style={{ position: 'relative', aspectRatio: '1/1', borderRadius: 'var(--r-3xl)', overflow: 'hidden', background: 'var(--secondary)', cursor: zoom ? 'zoom-in' : 'default', boxShadow: 'var(--shadow-soft)' }}
      >
        <Image
          key={img.id}
          src={img.url}
          alt={img.alt || title}
          fill
          priority
          sizes="(max-width: 900px) 100vw, 500px"
          style={{ objectFit: 'cover', transition: 'transform 200ms', transform: zoom ? 'scale(1.8)' : 'scale(1)', transformOrigin: origin }}
        />
      </div>

      {images.length > 1 && (
        <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
          {images.map((im, i) => (
            <button
              key={im.id}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              style={{ position: 'relative', width: 68, height: 68, borderRadius: 12, overflow: 'hidden', border: `2px solid ${i === active ? 'var(--emerald)' : 'var(--border)'}`, cursor: 'pointer', background: 'var(--secondary)', padding: 0 }}
            >
              <Image src={im.url} alt="" fill sizes="68px" style={{ objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
