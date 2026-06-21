'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').slice(0, 80)
}

interface RequestData {
  id?: string
  title?: string
  slug?: string
  patient_name?: string
  medical_condition?: string
  story_text?: string
  donation_goal?: number
  image_url?: string
  urgent?: boolean
  published?: boolean
  status?: string
}

export default function UrgentRequestForm({ initial }: { initial?: RequestData }) {
  const router = useRouter()
  const supabase = createClient()

  const [form, setForm] = useState({
    title: initial?.title || '',
    slug: initial?.slug || '',
    patient_name: initial?.patient_name || '',
    medical_condition: initial?.medical_condition || '',
    story_text: initial?.story_text || '',
    donation_goal: initial?.donation_goal?.toString() || '',
    image_url: initial?.image_url || '',
    urgent: initial?.urgent || false,
    published: initial?.published || false,
    status: initial?.status || 'open',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const update = (field: string, value: unknown) => {
    setForm((f) => {
      const next = { ...f, [field]: value }
      if ((field === 'patient_name' || field === 'title') && !initial?.slug) {
        next.slug = slugify(field === 'patient_name' ? String(value) : next.title)
      }
      return next
    })
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    const payload = { ...form, donation_goal: form.donation_goal ? parseFloat(form.donation_goal) : null }
    if (initial?.id) {
      const { error } = await supabase.from('urgent_requests').update(payload).eq('id', initial.id)
      if (error) { setError(error.message); setSaving(false); return }
    } else {
      const { error } = await supabase.from('urgent_requests').insert(payload)
      if (error) { setError(error.message); setSaving(false); return }
    }
    router.push('/admin/urgent-requests')
    router.refresh()
  }

  return (
    <form onSubmit={handleSave}>
      {error && <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: 'var(--r-xl)', padding: '12px 16px', marginBottom: 24, fontSize: 14, color: '#991b1b' }}>{error}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <div className="form-field" style={{ margin: 0 }}>
          <label className="form-label">Patient Name *</label>
          <input className="form-input" required value={form.patient_name} onChange={(e) => update('patient_name', e.target.value)} />
        </div>
        <div className="form-field" style={{ margin: 0 }}>
          <label className="form-label">Medical Condition *</label>
          <input className="form-input" required value={form.medical_condition} onChange={(e) => update('medical_condition', e.target.value)} placeholder="e.g. Kidney Disease" />
        </div>
      </div>

      <div className="form-field">
        <label className="form-label">Request Title *</label>
        <input className="form-input" required value={form.title} onChange={(e) => update('title', e.target.value)} placeholder="Short headline for this request" />
      </div>

      <div className="form-field">
        <label className="form-label">Slug</label>
        <input className="form-input" value={form.slug} onChange={(e) => update('slug', e.target.value)} />
      </div>

      <div className="form-field">
        <label className="form-label">Story *</label>
        <textarea className="form-textarea" required value={form.story_text} onChange={(e) => update('story_text', e.target.value)} style={{ minHeight: 240 }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <div className="form-field" style={{ margin: 0 }}>
          <label className="form-label">Donation Goal ($)</label>
          <input className="form-input" type="number" value={form.donation_goal} onChange={(e) => update('donation_goal', e.target.value)} placeholder="0" />
        </div>
        <div className="form-field" style={{ margin: 0 }}>
          <label className="form-label">Image URL</label>
          <input className="form-input" type="url" value={form.image_url} onChange={(e) => update('image_url', e.target.value)} />
        </div>
      </div>

      <div className="form-field">
        <label className="form-label">Status</label>
        <select className="form-select" value={form.status} onChange={(e) => update('status', e.target.value)}>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
          <option value="fulfilled">Fulfilled</option>
        </select>
      </div>

      <div style={{ display: 'flex', gap: 32, marginBottom: 32 }}>
        <div className="toggle-wrap">
          <button type="button" className={`toggle${form.urgent ? ' on' : ''}`} onClick={() => update('urgent', !form.urgent)} />
          <label className="form-label" style={{ margin: 0 }}>Mark as Urgent</label>
        </div>
        <div className="toggle-wrap">
          <button type="button" className={`toggle${form.published ? ' on' : ''}`} onClick={() => update('published', !form.published)} />
          <label className="form-label" style={{ margin: 0 }}>Published</label>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button type="submit" className="btn btn-emerald" disabled={saving} style={{ padding: '12px 28px', opacity: saving ? 0.7 : 1 }}>
          {saving ? 'Saving…' : initial?.id ? 'Save Changes' : 'Create Request'}
        </button>
        <button type="button" className="btn btn-ghost" style={{ borderColor: 'var(--border)', color: 'var(--navy)', padding: '12px 24px' }} onClick={() => router.back()}>Cancel</button>
      </div>
    </form>
  )
}
