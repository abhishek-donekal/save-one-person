'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function AdminRequestsActions({
  requestId,
  status,
  published,
  slug,
}: {
  requestId: string
  status: string
  published: boolean
  slug: string
}) {
  const router = useRouter()
  const supabase = createClient()

  const closeRequest = async () => {
    if (!confirm('Close this request?')) return
    await supabase.from('urgent_requests').update({ status: 'closed' }).eq('id', requestId)
    router.refresh()
  }

  const togglePublish = async () => {
    await supabase.from('urgent_requests').update({ published: !published }).eq('id', requestId)
    router.refresh()
  }

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Link href={`/admin/urgent-requests/${requestId}/edit`} style={{ fontSize: 12, fontWeight: 600, color: 'var(--navy)', padding: '4px 10px', border: '1px solid var(--border)', borderRadius: 8, textDecoration: 'none' }}>
        Edit
      </Link>
      <button onClick={togglePublish} style={{ fontSize: 12, fontWeight: 600, color: published ? '#dc2626' : 'var(--emerald)', padding: '4px 10px', border: `1px solid ${published ? '#fca5a5' : '#bbf7d0'}`, borderRadius: 8, background: 'none', cursor: 'pointer' }}>
        {published ? 'Unpublish' : 'Publish'}
      </button>
      {status === 'open' && (
        <button onClick={closeRequest} style={{ fontSize: 12, color: '#dc2626', padding: '4px 8px', background: 'none', border: 'none', cursor: 'pointer' }}>Close</button>
      )}
      <a href={`/urgent-requests/${slug}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'var(--muted)', padding: '4px 8px' }}>↗</a>
    </div>
  )
}
