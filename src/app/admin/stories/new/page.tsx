import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminLayout from '@/components/admin/AdminLayout'
import StoryForm from '../StoryForm'

export default async function NewStoryPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  return (
    <AdminLayout email={user.email}>
      <div className="admin-topbar">
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: 'var(--navy)' }}>New Success Story</h1>
      </div>
      <div className="admin-content">
        <div className="admin-card">
          <StoryForm />
        </div>
      </div>
    </AdminLayout>
  )
}
