'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { PERSON_OF_THE_WEEK as P } from '@/lib/personOfTheWeek'

const KEY = `potw-seen-${P.weekOf}`

export default function PersonOfTheWeekPopup() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const storyPath = `/urgent-requests/${P.slug}`

  useEffect(() => {
    // Keep the patient pop-up off the Giving Tuesday money page (donor asks stay separate).
    if (!P.enabled || pathname === storyPath || pathname === '/giving-tuesday') return
    let seen = false
    try { seen = sessionStorage.getItem(KEY) === '1' } catch {}
    if (seen) return
    const t = setTimeout(() => setOpen(true), 3500)
    return () => clearTimeout(t)
  }, [pathname, storyPath])

  const close = () => {
    setOpen(false)
    try { sessionStorage.setItem(KEY, '1') } catch {}
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (!open) return null

  const share = async () => {
    const url = `${window.location.origin}${storyPath}`
    const text = `${P.headline} Please share — one person can save a life.`
    try {
      if (navigator.share) await navigator.share({ title: `Help ${P.name}`, text, url })
      else { await navigator.clipboard.writeText(`${text} ${url}`); alert('Link copied — paste it anywhere to share.') }
    } catch {}
  }

  return (
    <div className="potw-backdrop" onClick={close} role="presentation">
      <div className="potw-modal" role="dialog" aria-modal="true" aria-labelledby="potw-title" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="potw-close" onClick={close} aria-label="Close">×</button>
        {P.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="potw-photo" src={P.image} alt={P.name} />
        )}
        <div className="potw-body">
          <div className="potw-label">🚨 Person of the Week</div>
          <h2 id="potw-title" className="potw-name">{P.name}</h2>
          <p className="potw-headline">{P.headline}</p>
          {P.detail && <p className="potw-detail">{P.detail}</p>}
          <div className="potw-actions">
            <Link href={storyPath} className="btn btn-emerald potw-btn" onClick={close}>Read {P.name.split(' ')[0]}&rsquo;s story</Link>
            <button type="button" className="potw-share" onClick={share}>Share</button>
          </div>
        </div>
      </div>
    </div>
  )
}
