import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import AdminLayout from '@/components/admin/AdminLayout'
import AdminShopActions from './AdminShopActions'

export const metadata = { title: 'Shop Products — Admin' }

function formatPrice(n: number) {
  if (!n) return 'Free'
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: n % 1 === 0 ? 0 : 2 })
}

export default async function AdminShopPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: products } = await supabase
    .from('shop_products')
    .select('id, handle, title, product_type, published, featured, position, variants:shop_variants(price), images:shop_images(url, position)')
    .order('position', { ascending: true })

  const rows = (products || []).map((p) => {
    const prices = (p.variants || []).map((v: { price: number }) => v.price).filter((n: number) => n > 0)
    const img = [...(p.images || [])].sort((a, b) => a.position - b.position)[0]?.url ?? null
    return { ...p, minPrice: prices.length ? Math.min(...prices) : 0, img }
  })

  const published = rows.filter((r) => r.published).length

  return (
    <AdminLayout email={user.email}>
      <div className="admin-topbar">
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: 'var(--navy)' }}>Shop Products</h1>
        <span style={{ fontSize: 13, color: 'var(--muted)' }}>{published} published · {rows.length} total</span>
      </div>

      <div className="admin-content">
        <div style={{ padding: '14px 16px', background: 'var(--secondary)', borderRadius: 12, marginBottom: 20, fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>
          Manage what shows in the shop. Toggle <strong style={{ color: 'var(--navy)' }}>Featured</strong> (Editor&apos;s Picks) and <strong style={{ color: 'var(--navy)' }}>Published</strong> (visible on the site), or edit details.
          Actual <strong style={{ color: 'var(--navy)' }}>orders &amp; fulfillment</strong> live in your <a href="https://admin.shopify.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--emerald)' }}>Shopify admin</a>, since checkout runs through Shopify.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {rows.map((p) => (
            <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 12, background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 12 }}>
              <div style={{ position: 'relative', width: 52, height: 52, borderRadius: 8, overflow: 'hidden', background: 'var(--secondary)', flexShrink: 0 }}>
                {p.img && <Image src={p.img} alt={p.title} fill sizes="52px" style={{ objectFit: 'cover' }} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--navy)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.title}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                  {p.product_type || 'Product'} · {formatPrice(p.minPrice)}
                  {!p.published && <span style={{ marginLeft: 8, color: '#dc2626', fontWeight: 600 }}>Hidden</span>}
                  {p.featured && <span style={{ marginLeft: 8, color: 'var(--emerald)', fontWeight: 600 }}>★ Featured</span>}
                </div>
              </div>
              <AdminShopActions id={p.id} handle={p.handle} published={!!p.published} featured={!!p.featured} />
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
