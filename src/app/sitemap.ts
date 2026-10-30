import type { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

const SITE_URL = 'https://www.saveonepersonnow.org'

const STATIC_ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/urgent-requests', changeFrequency: 'daily', priority: 0.9 },
  { path: '/urgent-requests/submit', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/success-stories', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/media', changeFrequency: 'weekly', priority: 0.6 },
  { path: '/video', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/future', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.6 },
  { path: '/partners', changeFrequency: 'monthly', priority: 0.4 },
  { path: '/faq', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/donate', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/shop', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))

  try {
    const supabase = await createClient()
    const [urgent, stories, blog, media, shop] = await Promise.all([
      supabase
        .from('urgent_requests')
        .select('slug, updated_at')
        .eq('published', true)
        .neq('submission_status', 'pending'),
      supabase
        .from('success_stories')
        .select('slug, updated_at')
        .eq('published', true),
      supabase
        .from('blog_posts')
        .select('slug, updated_at, published_at')
        .eq('published', true),
      supabase
        .from('media_entries')
        .select('slug, published_date')
        .not('slug', 'is', null),
      supabase
        .from('shop_products')
        .select('handle, updated_at')
        .eq('published', true),
    ])

    for (const r of urgent.data || []) {
      entries.push({
        url: `${SITE_URL}/urgent-requests/${r.slug}`,
        lastModified: r.updated_at ? new Date(r.updated_at) : now,
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    }
    for (const s of stories.data || []) {
      entries.push({
        url: `${SITE_URL}/success-stories/${s.slug}`,
        lastModified: s.updated_at ? new Date(s.updated_at) : now,
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
    for (const b of blog.data || []) {
      entries.push({
        url: `${SITE_URL}/blog/${b.slug}`,
        lastModified: b.updated_at ? new Date(b.updated_at) : b.published_at ? new Date(b.published_at) : now,
        changeFrequency: 'monthly',
        priority: 0.5,
      })
    }
    for (const m of media.data || []) {
      entries.push({
        url: `${SITE_URL}/media/${m.slug}`,
        lastModified: m.published_date ? new Date(m.published_date) : now,
        changeFrequency: 'monthly',
        priority: 0.5,
      })
    }
    for (const s of shop.data || []) {
      entries.push({
        url: `${SITE_URL}/shop/${s.handle}`,
        lastModified: s.updated_at ? new Date(s.updated_at) : now,
        changeFrequency: 'weekly',
        priority: 0.6,
      })
    }
  } catch {
    // If Supabase fails at build/runtime, return static-only sitemap rather than 500
  }

  return entries
}
