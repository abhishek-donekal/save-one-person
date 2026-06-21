'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').slice(0, 80)
}

interface PostData {
  id?: string
  title?: string
  slug?: string
  excerpt?: string
  content?: string
  category?: string
  tags?: string
  featured_image_url?: string
  published?: boolean
  meta_title?: string
  meta_description?: string
}

export default function BlogForm({ initial }: { initial?: PostData }) {
  const router = useRouter()
  const supabase = createClient()

  const [form, setForm] = useState({
    title: initial?.title || '',
    slug: initial?.slug || '',
    excerpt: initial?.excerpt || '',
    content: initial?.content || '',
    category: initial?.category || '',
    tags: initial?.tags || '',
    featured_image_url: initial?.featured_image_url || '',
    published: initial?.published || false,
    meta_title: initial?.meta_title || '',
    meta_description: initial?.meta_description || '',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const update = (field: string, value: unknown) => {
    setForm((f) => {
      const next = { ...f, [field]: value }
      if (field === 'title' && !initial?.slug) next.slug = slugify(String(value))
      return next
    })
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    if (initial?.id) {
      const { error } = await supabase.from('blog_posts').update(form).eq('id', initial.id)
      if (error) { setError(error.message); setSaving(false); return }
    } else {
      const { error } = await supabase.from('blog_posts').insert(form)
      if (error) { setError(error.message); setSaving(false); return }
    }
    router.push('/admin/blog')
    router.refresh()
  }

  return (
    <form onSubmit={handleSave}>
      {error && <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: 'var(--r-xl)', padding: '12px 16px', marginBottom: 24, fontSize: 14, color: '#991b1b' }}>{error}</div>}

      <div className="form-field">
        <label className="form-label">Title *</label>
        <input className="form-input" required value={form.title} onChange={(e) => update('title', e.target.value)} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <div className="form-field" style={{ margin: 0 }}>
          <label className="form-label">Slug</label>
          <input className="form-input" value={form.slug} onChange={(e) => update('slug', e.target.value)} />
        </div>
        <div className="form-field" style={{ margin: 0 }}>
          <label className="form-label">Category</label>
          <input className="form-input" value={form.category} onChange={(e) => update('category', e.target.value)} placeholder="e.g. Living Donation" />
        </div>
      </div>

      <div className="form-field">
        <label className="form-label">Excerpt</label>
        <textarea className="form-textarea" value={form.excerpt} onChange={(e) => update('excerpt', e.target.value)} style={{ minHeight: 80 }} placeholder="Short summary shown in blog listing" />
      </div>

      <div className="form-field">
        <label className="form-label">Content *</label>
        <textarea className="form-textarea" required value={form.content} onChange={(e) => update('content', e.target.value)} style={{ minHeight: 360 }} placeholder="Supports ## headings, ### subheadings, - list items, **bold**" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <div className="form-field" style={{ margin: 0 }}>
          <label className="form-label">Tags (comma-separated)</label>
          <input className="form-input" value={form.tags} onChange={(e) => update('tags', e.target.value)} placeholder="organ donation, kidney, living donor" />
        </div>
        <div className="form-field" style={{ margin: 0 }}>
          <label className="form-label">Featured Image URL</label>
          <input className="form-input" type="url" value={form.featured_image_url} onChange={(e) => update('featured_image_url', e.target.value)} />
        </div>
      </div>

      <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', padding: 20, marginBottom: 24 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 16 }}>SEO</p>
        <div className="form-field">
          <label className="form-label">Meta Title</label>
          <input className="form-input" value={form.meta_title} onChange={(e) => update('meta_title', e.target.value)} />
        </div>
        <div className="form-field" style={{ marginBottom: 0 }}>
          <label className="form-label">Meta Description</label>
          <textarea className="form-textarea" value={form.meta_description} onChange={(e) => update('meta_description', e.target.value)} style={{ minHeight: 80 }} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 32, marginBottom: 32 }}>
        <div className="toggle-wrap">
          <button type="button" className={`toggle${form.published ? ' on' : ''}`} onClick={() => update('published', !form.published)} />
          <label className="form-label" style={{ margin: 0 }}>Published</label>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button type="submit" className="btn btn-emerald" disabled={saving} style={{ padding: '12px 28px', opacity: saving ? 0.7 : 1 }}>
          {saving ? 'Saving…' : initial?.id ? 'Save Changes' : 'Create Post'}
        </button>
        <button type="button" className="btn btn-ghost" style={{ borderColor: 'var(--border)', color: 'var(--navy)', padding: '12px 24px' }} onClick={() => router.back()}>Cancel</button>
      </div>
    </form>
  )
}
