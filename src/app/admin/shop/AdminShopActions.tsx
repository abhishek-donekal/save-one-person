'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function AdminShopActions({
  id, handle, published, featured,
}: { id: string; handle: string; published: boolean; featured: boolean }) {
  const router = useRouter()
  const supabase = createClient()
  const [busy, setBusy] = useState(false)

  async function toggle(field: 'published' | 'featured', value: boolean) {
    setBusy(true)
    await supabase.from('shop_products').update({ [field]: value }).eq('id', id)
    setBusy(false)
    router.refresh()
  }

  const btn: React.CSSProperties = { fontSize: 12, fontWeight: 600, padding: '5px 10px', borderRadius: 8, cursor: busy ? 'wait' : 'pointer', background: 'none' }

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
      <button onClick={() => toggle('featured', !featured)} disabled={busy} style={{ ...btn, border: `1px solid ${featured ? '#bbf7d0' : 'var(--border)'}`, color: featured ? 'var(--emerald)' : 'var(--muted)' }}>
        {featured ? '★ Featured' : '☆ Feature'}
      </button>
      <button onClick={() => toggle('published', !published)} disabled={busy} style={{ ...btn, border: `1px solid ${published ? '#fca5a5' : '#bbf7d0'}`, color: published ? '#dc2626' : 'var(--emerald)' }}>
        {published ? 'Hide' : 'Show'}
      </button>
      <Link href={`/admin/shop/${id}/edit`} style={{ ...btn, border: '1px solid var(--border)', color: 'var(--navy)', textDecoration: 'none' }}>Edit</Link>
      <a href={`/shop/${handle}`} target="_blank" rel="noopener noreferrer" style={{ ...btn, border: '1px solid var(--border)', color: 'var(--muted)', textDecoration: 'none' }}>View</a>
    </div>
  )
}
