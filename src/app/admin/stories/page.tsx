import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import AdminLayout from '@/components/admin/AdminLayout'
import AdminStoriesActions from './AdminStoriesActions'

export default async function AdminStoriesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: stories } = await supabase
    .from('success_stories')
    .select('id, title, patient_name, published, featured, created_at, slug')
    .order('created_at', { ascending: false })

  return (
    <AdminLayout email={user.email}>
      <div className="admin-topbar">
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: 'var(--navy)' }}>Success Stories</h1>
        <Link href="/admin/stories/new" className="btn btn-emerald" style={{ padding: '10px 20px', fontSize: 13 }}>
          + New Story
        </Link>
      </div>
      <div className="admin-content">
        <div className="admin-card">
          {(!stories || stories.length === 0) ? (
            <p style={{ color: 'var(--muted)', padding: '40px 0', textAlign: 'center' }}>
              No stories yet. <Link href="/admin/stories/new" style={{ color: 'var(--emerald)' }}>Add the first one.</Link>
            </p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Featured</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {stories.map((story) => (
                  <tr key={story.id}>
                    <td style={{ fontWeight: 600 }}>{story.patient_name}</td>
                    <td style={{ maxWidth: 280 }}>
                      <span style={{ fontSize: 14, color: 'var(--muted)' }}>{story.title}</span>
                    </td>
                    <td>
                      <span className={`badge ${story.published ? 'badge-green' : 'badge-gray'}`}>
                        {story.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td>
                      {story.featured && <span className="badge badge-yellow">Featured</span>}
                    </td>
                    <td style={{ fontSize: 13, color: 'var(--muted)' }}>
                      {new Date(story.created_at).toLocaleDateString()}
                    </td>
                    <td>
                      <AdminStoriesActions storyId={story.id} published={story.published} slug={story.slug} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
