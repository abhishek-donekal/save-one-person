'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function AdminStoriesActions({
  storyId,
  published,
  slug,
}: {
  storyId: string
  published: boolean
  slug: string
}) {
  const router = useRouter()
  const supabase = createClient()

  const togglePublish = async () => {
    await supabase.from('success_stories').update({ published: !published }).eq('id', storyId)
    router.refresh()
  }

  const deleteStory = async () => {
    if (!confirm('Delete this story? This cannot be undone.')) return
    await supabase.from('success_stories').delete().eq('id', storyId)
    router.refresh()
  }

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Link href={`/admin/stories/${storyId}/edit`} style={{ fontSize: 12, fontWeight: 600, color: 'var(--navy)', padding: '4px 10px', border: '1px solid var(--border)', borderRadius: 8, textDecoration: 'none' }}>
        Edit
      </Link>
      <button onClick={togglePublish} style={{ fontSize: 12, fontWeight: 600, color: published ? '#dc2626' : 'var(--emerald)', padding: '4px 10px', border: `1px solid ${published ? '#fca5a5' : '#bbf7d0'}`, borderRadius: 8, background: 'none', cursor: 'pointer' }}>
        {published ? 'Unpublish' : 'Publish'}
      </button>
      <a href={`/success-stories/${slug}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'var(--muted)', padding: '4px 8px' }}>↗</a>
      <button onClick={deleteStory} style={{ fontSize: 12, color: '#dc2626', padding: '4px 8px', background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
    </div>
  )
}
