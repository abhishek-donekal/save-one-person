import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminLayout from '@/components/admin/AdminLayout'
import CouponManager from './CouponManager'

export const metadata = { title: 'Coupons — Admin' }

export default async function AdminCouponsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: coupons } = await supabase
    .from('shop_coupons')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <AdminLayout email={user.email}>
      <div className="admin-topbar">
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: 'var(--navy)' }}>Coupons</h1>
      </div>
      <div className="admin-content">
        <div style={{ padding: '14px 16px', background: 'var(--secondary)', borderRadius: 12, marginBottom: 20, fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>
          Coupons apply to the on-site cart total. Note: the final charge runs through Shopify checkout, so use these for on-site promotions and track redemptions manually, or set the matching discount in Shopify too.
        </div>
        <CouponManager initial={coupons || []} />
      </div>
    </AdminLayout>
  )
}
