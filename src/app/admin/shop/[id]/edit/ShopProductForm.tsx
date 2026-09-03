'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

type Variant = { id: string; title: string | null; price: number; compare_at_price: number | null; sku: string | null; available: boolean; position: number }
type Product = {
  id: string; handle: string; title: string; description_text: string | null
  product_type: string | null; vendor: string | null; featured: boolean; published: boolean
  variants: Variant[]
}

const field: React.CSSProperties = { width: '100%', padding: '10px 12px', border: '1.5px solid var(--border)', borderRadius: 8, fontSize: 14, fontFamily: 'inherit', background: 'var(--white)', color: 'var(--navy)' }
const label: React.CSSProperties = { display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--navy)', marginBottom: 6 }

export default function ShopProductForm({ product }: { product: Product }) {
  const router = useRouter()
  const supabase = createClient()
  const [form, setForm] = useState({
    title: product.title,
    description_text: product.description_text || '',
    product_type: product.product_type || '',
    vendor: product.vendor || '',
    featured: product.featured,
    published: product.published,
  })
  const [variants, setVariants] = useState<Variant[]>([...product.variants].sort((a, b) => a.position - b.position))
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [err, setErr] = useState('')

  function upd(k: string, v: string | boolean) { setForm((f) => ({ ...f, [k]: v })) }
  function updVar(i: number, k: keyof Variant, v: string | number | boolean) {
    setVariants((vs) => vs.map((x, j) => (j === i ? { ...x, [k]: v } : x)))
  }

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setStatus('saving'); setErr('')
    const { error: pErr } = await supabase.from('shop_products').update({
      title: form.title.trim(),
      description_text: form.description_text.trim() || null,
      product_type: form.product_type.trim() || null,
      vendor: form.vendor.trim() || null,
      featured: form.featured,
      published: form.published,
      updated_at: new Date().toISOString(),
    }).eq('id', product.id)
    if (pErr) { setStatus('error'); setErr(pErr.message); return }

    for (const v of variants) {
      const { error: vErr } = await supabase.from('shop_variants').update({
        price: Number(v.price) || 0,
        compare_at_price: v.compare_at_price ? Number(v.compare_at_price) : null,
        sku: v.sku?.trim() || null,
        available: v.available,
      }).eq('id', v.id)
      if (vErr) { setStatus('error'); setErr(vErr.message); return }
    }
    setStatus('saved')
    router.refresh()
    setTimeout(() => setStatus('idle'), 1600)
  }

  return (
    <form onSubmit={save} style={{ maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div><label style={label}>Title</label><input style={field} value={form.title} onChange={(e) => upd('title', e.target.value)} required /></div>
      <div><label style={label}>Description</label><textarea style={{ ...field, minHeight: 120, resize: 'vertical' }} value={form.description_text} onChange={(e) => upd('description_text', e.target.value)} /></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div><label style={label}>Type</label><input style={field} value={form.product_type} onChange={(e) => upd('product_type', e.target.value)} placeholder="e.g. Book" /></div>
        <div><label style={label}>Vendor</label><input style={field} value={form.vendor} onChange={(e) => upd('vendor', e.target.value)} /></div>
      </div>

      <div style={{ display: 'flex', gap: 20 }}>
        <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 14, color: 'var(--navy)' }}>
          <input type="checkbox" checked={form.published} onChange={(e) => upd('published', e.target.checked)} /> Published (visible on site)
        </label>
        <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 14, color: 'var(--navy)' }}>
          <input type="checkbox" checked={form.featured} onChange={(e) => upd('featured', e.target.checked)} /> Featured (Editor&apos;s Picks)
        </label>
      </div>

      {/* Variants */}
      <div>
        <label style={label}>Variants / Pricing</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {variants.map((v, i) => (
            <div key={v.id} style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr auto', gap: 8, alignItems: 'center', padding: 10, border: '1px solid var(--border)', borderRadius: 8 }}>
              <span style={{ fontSize: 13, color: 'var(--muted)' }}>{v.title && v.title !== 'Default Title' ? v.title : 'Price'}</span>
              <input type="number" step="0.01" style={field} value={v.price} onChange={(e) => updVar(i, 'price', e.target.value)} placeholder="Price" />
              <input type="number" step="0.01" style={field} value={v.compare_at_price ?? ''} onChange={(e) => updVar(i, 'compare_at_price', e.target.value)} placeholder="Compare-at" />
              <input style={field} value={v.sku ?? ''} onChange={(e) => updVar(i, 'sku', e.target.value)} placeholder="SKU" />
              <label style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', gap: 4, alignItems: 'center' }}>
                <input type="checkbox" checked={v.available} onChange={(e) => updVar(i, 'available', e.target.checked)} /> In stock
              </label>
            </div>
          ))}
        </div>
      </div>

      {status === 'error' && <div style={{ padding: 12, background: '#fef2f2', border: '1.5px solid #fca5a5', borderRadius: 8, color: '#991b1b', fontSize: 13 }}>{err}</div>}

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <button type="submit" disabled={status === 'saving'} className="btn btn-emerald" style={{ padding: '12px 26px', fontSize: 14 }}>
          {status === 'saving' ? 'Saving…' : status === 'saved' ? '✓ Saved' : 'Save Changes'}
        </button>
        <Link href="/admin/shop" style={{ fontSize: 13, color: 'var(--muted)' }}>← Back to products</Link>
        <a href={`/shop/${product.handle}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: 'var(--emerald)', marginLeft: 'auto' }}>View on site →</a>
      </div>
      <p style={{ fontSize: 12, color: 'var(--muted)' }}>Note: images + variants sync from Shopify on import. Price changes here affect the site display; charged price at checkout comes from Shopify.</p>
    </form>
  )
}
