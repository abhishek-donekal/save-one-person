import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import AdminLayout from '@/components/admin/AdminLayout'
import AdminBlogActions from './AdminBlogActions'

export default async function AdminBlogPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: posts } = await supabase
    .from('blog_posts')
    .select('id, title, slug, category, published, created_at')
    .order('created_at', { ascending: false })

  return (
    <AdminLayout email={user.email}>
      <div className="admin-topbar">
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: 'var(--navy)' }}>Blog Posts</h1>
        <Link href="/admin/blog/new" className="btn btn-emerald" style={{ padding: '10px 20px', fontSize: 13 }}>
          + New Post
        </Link>
      </div>
      <div className="admin-content">
        <div className="admin-card">
          {(!posts || posts.length === 0) ? (
            <p style={{ color: 'var(--muted)', padding: '40px 0', textAlign: 'center' }}>
              No posts yet. <Link href="/admin/blog/new" style={{ color: 'var(--emerald)' }}>Write the first one.</Link>
            </p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td style={{ fontWeight: 600, maxWidth: 280 }}>{post.title}</td>
                    <td>{post.category ? <span className="badge badge-blue">{post.category}</span> : '—'}</td>
                    <td>
                      <span className={`badge ${post.published ? 'badge-green' : 'badge-gray'}`}>
                        {post.published ? 'Live' : 'Draft'}
                      </span>
                    </td>
                    <td style={{ fontSize: 13, color: 'var(--muted)', whiteSpace: 'nowrap' }}>
                      {new Date(post.created_at).toLocaleDateString()}
                    </td>
                    <td>
                      <AdminBlogActions postId={post.id} published={post.published} slug={post.slug} />
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
