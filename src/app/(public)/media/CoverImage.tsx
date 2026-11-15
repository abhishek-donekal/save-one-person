'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, type ReactNode } from 'react'

// Shows the thumbnail; if the image file is missing or fails to load,
// shows the branded text cover instead of an empty gray box.
export default function CoverImage({ src, sizes, fallback, overlay }: { src: string; sizes: string; fallback: ReactNode; overlay?: ReactNode }) {
  const [failed, setFailed] = useState(false)
  const ref = useRef<HTMLImageElement>(null)

  // Catch images that already failed before the page became interactive.
  useEffect(() => {
    const img = ref.current
    if (img && img.complete && img.naturalWidth === 0) setFailed(true)
  }, [])

  if (failed) return <>{fallback}</>
  return (
    <>
      <Image ref={ref} src={src} alt="" fill sizes={sizes} style={{ objectFit: 'cover', objectPosition: 'center 30%' }} onError={() => setFailed(true)} />
      {overlay}
    </>
  )
}
