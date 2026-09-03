'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

type Coupon = { id: string; code: string; discount_type: string; amount: number; active: boolean; expires_at: string | null; created_at: string }

const field: React.CSSProperties = { padding: '10px 12px', border: '1.5px solid var(--border)', borderRadius: 8, fontSize: 14, fontFamily: 'inherit', background: 'var(--white)', color: 'var(--navy)' }

export default function CouponManager({ initial }: { initial: Coupon[] }) {
  const router = useRouter()
  const supabase = createClient()
  const [code, setCode] = useState('')
  const [type, setType] = useState<'percent' | 'fixed'>('percent')
  const [amount, setAmount] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  async function create(e: React.FormEvent) {
    e.preventDefault()
    setErr('')
    const c = code.trim().toUpperCase()
    const amt = Number(amount)
    if (!c) { setErr('Enter a code.'); return }
    if (!(amt > 0)) { setErr('Enter an amount greater than 0.'); return }
    setBusy(true)
    const { error } = await supabase.from('shop_coupons').insert({ code: c, discount_type: type, amount: amt, active: true })
    setBusy(false)
    if (error) { setErr(error.message.includes('duplicate') ? 'That code already exists.' : error.message); return }
    setCode(''); setAmount('')
    router.refresh()
  }

  async function toggle(id: string, active: boolean) {
    await supabase.from('shop_coupons').update({ active: !active }).eq('id', id)
    router.refresh()
  }
  async function remove(id: string) {
    if (!confirm('Delete this coupon?')) return
    await supabase.from('shop_coupons').delete().eq('id', id)
    router.refresh()
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 720 }}>
      {/* Create */}
      <form onSubmit={create} style={{ background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 12, padding: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)', marginBottom: 14 }}>New Coupon</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr auto', gap: 10, alignItems: 'center' }}>
          <input style={field} value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="CODE (e.g. SAVE10)" />
          <select style={{ ...field, cursor: 'pointer' }} value={type} onChange={(e) => setType(e.target.value as 'percent' | 'fixed')}>
            <option value="percent">% off</option>
            <option value="fixed">$ off</option>
          </select>
          <input style={field} type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder={type === 'percent' ? '10' : '5.00'} />
          <button type="submit" disabled={busy} className="btn btn-emerald" style={{ padding: '10px 20px', fontSize: 13 }}>{busy ? 'Adding…' : 'Add'}</button>
        </div>
        {err && <p style={{ fontSize: 12, color: '#dc2626', marginTop: 8 }}>{err}</p>}
      </form>

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {initial.length === 0 ? (
          <p style={{ color: 'var(--muted)', fontSize: 14, padding: '20px 0', textAlign: 'center' }}>No coupons yet.</p>
        ) : initial.map((c) => (
          <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 12, background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 10 }}>
            <div style={{ flex: 1 }}>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 14, fontWeight: 700, color: 'var(--navy)' }}>{c.code}</span>
              <span style={{ marginLeft: 12, fontSize: 13, color: 'var(--muted)' }}>
                {c.discount_type === 'percent' ? `${c.amount}% off` : `$${c.amount} off`}
                {!c.active && <span style={{ marginLeft: 8, color: '#dc2626', fontWeight: 600 }}>Inactive</span>}
              </span>
            </div>
            <button onClick={() => toggle(c.id, c.active)} style={{ fontSize: 12, fontWeight: 600, padding: '5px 12px', borderRadius: 8, border: `1px solid ${c.active ? '#fca5a5' : '#bbf7d0'}`, color: c.active ? '#dc2626' : 'var(--emerald)', background: 'none', cursor: 'pointer' }}>
              {c.active ? 'Deactivate' : 'Activate'}
            </button>
            <button onClick={() => remove(c.id)} style={{ fontSize: 12, fontWeight: 600, padding: '5px 12px', borderRadius: 8, border: '1px solid var(--border)', color: 'var(--muted)', background: 'none', cursor: 'pointer' }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}
