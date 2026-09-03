'use client'

import { useMemo, useState } from 'react'
import ProductCard, { type CardProduct } from './ProductCard'

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'title'

export default function ShopBrowser({ products, types }: { products: CardProduct[]; types: string[] }) {
  const [type, setType] = useState<string>('all')
  const [sort, setSort] = useState<SortKey>('featured')
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    let list = products
    if (type !== 'all') list = list.filter((p) => p.product_type === type)
    if (q.trim()) {
      const needle = q.trim().toLowerCase()
      list = list.filter((p) => p.title.toLowerCase().includes(needle) || (p.product_type || '').toLowerCase().includes(needle))
    }
    const arr = [...list]
    if (sort === 'price-asc') arr.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') arr.sort((a, b) => b.price - a.price)
    else if (sort === 'title') arr.sort((a, b) => a.title.localeCompare(b.title))
    return arr
  }, [products, type, sort, q])

  return (
    <div>
      {/* Controls */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginBottom: 28 }}>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products…"
          aria-label="Search products"
          style={{ flex: '1 1 220px', padding: '10px 14px', border: '1.5px solid var(--border)', borderRadius: 10, fontSize: 14, fontFamily: 'inherit', background: 'var(--white)', color: 'var(--navy)' }}
        />
        <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} aria-label="Sort by" style={selectStyle}>
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="title">Alphabetical</option>
        </select>
      </div>

      {/* Type filters */}
      {types.length > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
          {['all', ...types].map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              style={{
                padding: '8px 16px', borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                border: `1.5px solid ${type === t ? 'var(--emerald)' : 'var(--border)'}`,
                background: type === t ? 'var(--emerald)' : 'var(--white)',
                color: type === t ? 'white' : 'var(--navy)',
                transition: 'all 160ms',
              }}
            >
              {t === 'all' ? 'All Products' : t}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--muted)' }}>
          <p style={{ fontSize: 16 }}>No products match your search.</p>
        </div>
      ) : (
        <div className="shop-grid">
          {filtered.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      )}

      <p style={{ marginTop: 24, fontSize: 13, color: 'var(--muted)' }}>{filtered.length} product{filtered.length === 1 ? '' : 's'}</p>
    </div>
  )
}

const selectStyle: React.CSSProperties = {
  padding: '10px 14px', border: '1.5px solid var(--border)', borderRadius: 10, fontSize: 14, fontFamily: 'inherit', background: 'var(--white)', color: 'var(--navy)', cursor: 'pointer',
}
