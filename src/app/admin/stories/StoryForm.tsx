'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
}

interface StoryData {
  id?: string
  title?: string
  slug?: string
  patient_name?: string
  story_text?: string
  outcome?: string
  image_url?: string
  video_url?: string
  featured?: boolean
  published?: boolean
  seo_title?: string
  seo_description?: string
}

export default function StoryForm({ initial }: { initial?: StoryData }) {
  const router = useRouter()
  const supabase = createClient()

  const [form, setForm] = useState({
    title: initial?.title || '',
    slug: initial?.slug || '',
    patient_name: initial?.patient_name || '',
    story_text: initial?.story_text || '',
    outcome: initial?.outcome || '',
    image_url: initial?.image_url || '',
    video_url: initial?.video_url || '',
    featured: initial?.featured || false,
    published: initial?.published || false,
    seo_title: initial?.seo_title || '',
    seo_description: initial?.seo_description || '',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const update = (field: string, value: unknown) => {
    setForm((f) => {
      const next = { ...f, [field]: value }
      if (field === 'title' && !initial?.slug) {
        next.slug = slugify(String(value))
      }
      return next
    })
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    if (initial?.id) {
      const { error } = await supabase.from('success_stories').update(form).eq('id', initial.id)
      if (error) { setError(error.message); setSaving(false); return }
    } else {
      const { error } = await supabase.from('success_stories').insert(form)
      if (error) { setError(error.message); setSaving(false); return }
    }
    router.push('/admin/stories')
    router.refresh()
  }

  return (
    <form onSubmit={handleSave}>
      {error && (
        <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: 'var(--r-xl)', padding: '12px 16px', marginBottom: 24, fontSize: 14, color: '#991b1b' }}>{error}</div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <div className="form-field" style={{ margin: 0 }}>
          <label className="form-label">Patient Name *</label>
          <input className="form-input" type="text" required value={form.patient_name} onChange={(e) => update('patient_name', e.target.value)} placeholder="Full name" />
        </div>
        <div className="form-field" style={{ margin: 0 }}>
          <label className="form-label">Title *</label>
          <input className="form-input" type="text" required value={form.title} onChange={(e) => update('title', e.target.value)} placeholder="Story headline" />
        </div>
      </div>

      <div className="form-field">
        <label className="form-label">Slug</label>
        <input className="form-input" type="text" value={form.slug} onChange={(e) => update('slug', e.target.value)} placeholder="url-friendly-slug" />
      </div>

      <div className="form-field">
        <label className="form-label">Story Text *</label>
        <textarea className="form-textarea" required value={form.story_text} onChange={(e) => update('story_text', e.target.value)} style={{ minHeight: 280 }} placeholder="Full story… (separate paragraphs with blank lines)" />
      </div>

      <div className="form-field">
        <label className="form-label">Outcome</label>
        <textarea className="form-textarea" value={form.outcome} onChange={(e) => update('outcome', e.target.value)} style={{ minHeight: 100 }} placeholder="What was the result? e.g. Received successful kidney transplant…" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <div className="form-field" style={{ margin: 0 }}>
          <label className="form-label">Image URL</label>
          <input className="form-input" type="url" value={form.image_url} onChange={(e) => update('image_url', e.target.value)} placeholder="https://…" />
        </div>
        <div className="form-field" style={{ margin: 0 }}>
          <label className="form-label">Video URL</label>
          <input className="form-input" type="url" value={form.video_url} onChange={(e) => update('video_url', e.target.value)} placeholder="https://youtube.com/…" />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <div className="form-field" style={{ margin: 0 }}>
          <label className="form-label">SEO Title</label>
          <input className="form-input" type="text" value={form.seo_title} onChange={(e) => update('seo_title', e.target.value)} />
        </div>
        <div className="form-field" style={{ margin: 0 }}>
          <label className="form-label">SEO Description</label>
          <input className="form-input" type="text" value={form.seo_description} onChange={(e) => update('seo_description', e.target.value)} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 32, marginBottom: 32 }}>
        <div className="toggle-wrap">
          <button type="button" className={`toggle${form.featured ? ' on' : ''}`} onClick={() => update('featured', !form.featured)} aria-pressed={form.featured} />
          <label className="form-label" style={{ margin: 0 }}>Featured Story</label>
        </div>
        <div className="toggle-wrap">
          <button type="button" className={`toggle${form.published ? ' on' : ''}`} onClick={() => update('published', !form.published)} aria-pressed={form.published} />
          <label className="form-label" style={{ margin: 0 }}>Published</label>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button type="submit" className="btn btn-emerald" disabled={saving} style={{ padding: '12px 28px', opacity: saving ? 0.7 : 1 }}>
          {saving ? 'Saving…' : initial?.id ? 'Save Changes' : 'Create Story'}
        </button>
        <button type="button" className="btn btn-ghost" style={{ borderColor: 'var(--border)', color: 'var(--navy)', padding: '12px 24px' }} onClick={() => router.back()}>
          Cancel
        </button>
      </div>
    </form>
  )
}
