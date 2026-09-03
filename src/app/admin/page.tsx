import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import AdminLayout from '@/components/admin/AdminLayout'

export default async function AdminDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const [
    { count: storiesCount },
    { count: requestsCount },
    { count: mediaCount },
    { count: shopCount },
    { count: messagesCount },
  ] = await Promise.all([
    supabase.from('success_stories').select('*', { count: 'exact', head: true }),
    supabase.from('urgent_requests').select('*', { count: 'exact', head: true }).eq('status', 'open'),
    supabase.from('media_entries').select('*', { count: 'exact', head: true }),
    supabase.from('shop_products').select('*', { count: 'exact', head: true }).eq('published', true),
    supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('handled', false),
  ])

  const stats = [
    { label: 'New Messages', value: messagesCount ?? 0, href: '/admin/messages', color: 'var(--emerald)' },
    { label: 'Open Requests', value: requestsCount ?? 0, href: '/admin/urgent-requests', color: '#dc2626' },
    { label: 'Total Stories', value: storiesCount ?? 0, href: '/admin/stories', color: '#2563eb' },
    { label: 'Media Entries', value: mediaCount ?? 0, href: '/admin/media', color: '#7c3aed' },
    { label: 'Shop Products', value: shopCount ?? 0, href: '/admin/shop', color: '#d97706' },
  ]

  const quickLinks = [
    { label: 'New Request', href: '/admin/urgent-requests/new', desc: 'Add an urgent request' },
    { label: 'New Story', href: '/admin/stories/new', desc: 'Add a success story' },
    { label: 'Manage Shop', href: '/admin/shop', desc: 'Products, featured, coupons' },
    { label: 'Messages', href: '/admin/messages', desc: 'Read contact form messages' },
    { label: 'View Site', href: '/', desc: 'Visit saveonepersonnow.org', external: true },
  ]

  return (
    <AdminLayout email={user.email}>
      <div className="admin-topbar">
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: 'var(--navy)' }}>Dashboard</h1>
        <span style={{ fontSize: 13, color: 'var(--muted)' }}>Welcome back, {user.email}</span>
      </div>

      <div className="admin-content">
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 32 }}>
          {stats.map((s) => (
            <Link key={s.href} href={s.href} style={{ textDecoration: 'none' }}>
              <div className="admin-stat-card hover-lift" style={{ cursor: 'pointer' }}>
                <div className="admin-stat-num" style={{ color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4, fontWeight: 500 }}>{s.label}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="admin-card" style={{ marginBottom: 32 }}>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, color: 'var(--navy)', marginBottom: 20 }}>Quick Actions</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {quickLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="hover-border-emerald"
                style={{ padding: '10px 20px', border: '1.5px solid var(--border)', borderRadius: 'var(--r-xl)', fontSize: 14, fontWeight: 600, color: 'var(--navy)', display: 'flex', flexDirection: 'column', gap: 2, textDecoration: 'none', minWidth: 140 }}
              >
                <span>{l.label}</span>
                <span style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 400 }}>{l.desc}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div className="admin-card">
            <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 18, color: 'var(--navy)', marginBottom: 16 }}>Manage Content</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { label: 'Success Stories', href: '/admin/stories' },
                { label: 'Urgent Requests', href: '/admin/urgent-requests' },
                { label: 'Blog Posts', href: '/admin/blog' },
                { label: 'Media Entries', href: '/admin/media' },
                { label: 'Partners', href: '/admin/partners' },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="hover-bg-secondary" style={{ padding: '8px 12px', borderRadius: 'var(--r-xl)', fontSize: 14, color: 'var(--navy)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', textDecoration: 'none' }}>
                  {l.label}
                  <span style={{ color: 'var(--muted)' }}>→</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="admin-card">
            <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 18, color: 'var(--navy)', marginBottom: 16 }}>Public Site Links</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { label: 'Homepage', href: '/' },
                { label: 'Success Stories', href: '/success-stories' },
                { label: 'Urgent Requests', href: '/urgent-requests' },
                { label: 'Blog', href: '/blog' },
                { label: 'Media', href: '/media' },
                { label: 'Partners', href: '/partners' },
              ].map((l) => (
                <Link key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="hover-bg-secondary" style={{ padding: '8px 12px', borderRadius: 'var(--r-xl)', fontSize: 14, color: 'var(--navy)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', textDecoration: 'none', transition: 'background 200ms' }}
                >
                  {l.label}
                  <span style={{ color: 'var(--muted)', fontSize: 12 }}>↗</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
