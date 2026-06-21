import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import AdminLayout from '@/components/admin/AdminLayout'
import UrgentRequestForm from '../../UrgentRequestForm'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditUrgentRequestPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: req } = await supabase
    .from('urgent_requests')
    .select('*')
    .eq('id', id)
    .single()

  if (!req) notFound()

  return (
    <AdminLayout email={user.email}>
      <div className="admin-topbar">
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: 'var(--navy)' }}>Edit Request — {req.patient_name}</h1>
      </div>
      <div className="admin-content">
        <div className="admin-card">
          <UrgentRequestForm initial={req} />
        </div>
      </div>
    </AdminLayout>
  )
}
