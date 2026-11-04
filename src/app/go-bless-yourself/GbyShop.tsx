'use client'

import { useState } from 'react'
import type { ShopProduct } from '@/lib/shop/types'

const SHOP = 'https://save-one-person.myshopify.com'

function money(n: number) {
  return `$${n % 1 === 0 ? n : n.toFixed(2)}`
}

function Card({ p }: { p: ShopProduct }) {
  const [img, setImg] = useState(0)
  const [vid, setVid] = useState(p.variants.length > 1 ? '' : p.variants[0]?.id ?? '')
  const [err, setErr] = useState(false)
  const multi = p.variants.length > 1
  const v = p.variants.find((x) => x.id === vid)

  function buy() {
    if (!v?.shopify_id) { setErr(true); return }
    window.location.href = `${SHOP}/cart/${v.shopify_id}:1`
  }

  return (
    <article className="gby-card">
      <div className="gby-img">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.images[img]?.url} alt={p.images[img]?.alt || p.title} />
        {p.images.length > 1 && (
          <div className="gby-sides" role="group" aria-label="Choose side">
            {p.images.map((im, i) => (
              <button key={im.id} type="button" aria-pressed={img === i} onClick={() => setImg(i)}>
                {i === 0 ? 'Front' : 'Back'}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="gby-body">
        <h3>{p.title.replace('Go Bless Yourself ', '')}</h3>
        <div className="gby-price">{money(p.variants[0]?.price ?? 0)}</div>
        {multi && (
          <div className="gby-sizes" role="group" aria-label="Size">
            {p.variants.map((x) => (
              <button key={x.id} type="button" aria-pressed={vid === x.id} onClick={() => { setVid(x.id); setErr(false) }}>
                {x.title}
              </button>
            ))}
          </div>
        )}
        <button type="button" className="gby-buy" onClick={buy}>Buy now</button>
        {err && <p className="gby-err" role="alert">Please pick a size first.</p>}
      </div>
    </article>
  )
}

export default function GbyShop({ products }: { products: ShopProduct[] }) {
  return (
    <div className="gby-grid">
      {products.map((p) => <Card key={p.id} p={p} />)}
    </div>
  )
}
