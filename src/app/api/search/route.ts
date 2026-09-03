import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

type Hit = {
  type: 'urgent' | 'story' | 'media' | 'blog'
  title: string
  url: string
  snippet: string
  date?: string | null
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = (searchParams.get('q') || '').trim()
  if (q.length < 2) return NextResponse.json({ hits: [], q })

  const supabase = await createClient()
  const like = `%${q.replace(/[%_]/g, '\\$&')}%`

  const [urgent, stories, media, blog] = await Promise.all([
    supabase
      .from('urgent_requests')
      .select('slug, title, patient_name, medical_condition, story_text, created_at')
      .eq('published', true)
      .or(`title.ilike.${like},patient_name.ilike.${like},medical_condition.ilike.${like},story_text.ilike.${like}`)
      .limit(8),
    supabase
      .from('success_stories')
      .select('slug, title, patient_name, story_text, outcome, created_at')
      .eq('published', true)
      .or(`title.ilike.${like},patient_name.ilike.${like},story_text.ilike.${like}`)
      .limit(8),
    supabase
      .from('media_entries')
      .select('id, title, outlet_name, media_type, slug, published_date')
      .or(`title.ilike.${like},outlet_name.ilike.${like}`)
      .limit(8),
    supabase
      .from('blog_posts')
      .select('slug, title, excerpt, content, published_at')
      .eq('published', true)
      .or(`title.ilike.${like},excerpt.ilike.${like},content.ilike.${like}`)
      .limit(8),
  ])

  const hits: Hit[] = []

  for (const r of urgent.data || []) {
    hits.push({
      type: 'urgent',
      title: r.patient_name,
      url: `/urgent-requests/${r.slug}`,
      snippet: `${r.medical_condition} — ${r.story_text.slice(0, 140)}…`,
      date: r.created_at,
    })
  }
  for (const s of stories.data || []) {
    hits.push({
      type: 'story',
      title: s.patient_name,
      url: `/success-stories/${s.slug}`,
      snippet: s.outcome || s.story_text.slice(0, 160),
      date: s.created_at,
    })
  }
  for (const m of media.data || []) {
    hits.push({
      type: 'media',
      title: m.title,
      url: m.slug ? `/media/${m.slug}` : '/media',
      snippet: `${m.outlet_name} • ${m.media_type}`,
      date: m.published_date,
    })
  }
  for (const b of blog.data || []) {
    hits.push({
      type: 'blog',
      title: b.title,
      url: `/blog/${b.slug}`,
      snippet: b.excerpt || (b.content ? b.content.slice(0, 160) : ''),
      date: b.published_at,
    })
  }

  return NextResponse.json({ hits, q })
}
