import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminLayout from '@/components/admin/AdminLayout'
import UrgentRequestForm from '../UrgentRequestForm'

export default async function NewUrgentRequestPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  return (
    <AdminLayout email={user.email}>
      <div className="admin-topbar">
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: 'var(--navy)' }}>New Urgent Request</h1>
      </div>
      <div className="admin-content">
        <div className="admin-card">
          <UrgentRequestForm />
        </div>
      </div>
    </AdminLayout>
  )
}
