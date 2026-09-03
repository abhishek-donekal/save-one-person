import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import AdminLayout from '@/components/admin/AdminLayout'
import ShopProductForm from './ShopProductForm'

export const metadata = { title: 'Edit Product — Admin' }

export default async function EditShopProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: product } = await supabase
    .from('shop_products')
    .select('id, handle, title, description_text, product_type, vendor, featured, published, variants:shop_variants(id, title, price, compare_at_price, sku, available, position)')
    .eq('id', id)
    .single()

  if (!product) notFound()

  return (
    <AdminLayout email={user.email}>
      <div className="admin-topbar">
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: 'var(--navy)' }}>Edit Product</h1>
      </div>
      <div className="admin-content">
        <ShopProductForm product={product} />
      </div>
    </AdminLayout>
  )
}
