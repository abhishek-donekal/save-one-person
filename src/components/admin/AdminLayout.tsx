'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: '⊞' },
  { href: '/admin/messages', label: 'Messages', icon: '✉' },
  { href: '/admin/stories', label: 'Success Stories', icon: '✦' },
  { href: '/admin/urgent-requests', label: 'Urgent Requests', icon: '⚡' },
  { href: '/admin/blog', label: 'Blog Posts', icon: '✎' },
  { href: '/admin/media', label: 'Media', icon: '▶' },
  { href: '/admin/shop', label: 'Shop Products', icon: '🛍' },
  { href: '/admin/shop/coupons', label: 'Coupons', icon: '﹪' },
  { href: '/admin/partners', label: 'Partners', icon: '◈' },
]

export default function AdminLayout({
  children,
  email,
}: {
  children: React.ReactNode
  email?: string
}) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--grad-emerald)', display: 'grid', placeItems: 'center', fontSize: 14, color: 'white', fontFamily: "'Fraunces', serif", fontWeight: 600, flexShrink: 0 }}>
              S
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'white', lineHeight: 1.2 }}>Save One Person</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Admin CMS</div>
            </div>
          </Link>
        </div>
        <nav className="admin-sidebar-nav">
          {NAV.map((item) => {
            const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
            return (
              <Link key={item.href} href={item.href} className={`admin-sidebar-link${active ? ' active' : ''}`}>
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div style={{ padding: 16, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ padding: '8px 12px', fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 4 }}>{email}</div>
          <button onClick={handleLogout} className="admin-sidebar-link" style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
            <span style={{ fontSize: 16 }}>⎋</span>
            Sign Out
          </button>
        </div>
      </aside>
      <div className="admin-main">
        {children}
      </div>
    </div>
  )
}
