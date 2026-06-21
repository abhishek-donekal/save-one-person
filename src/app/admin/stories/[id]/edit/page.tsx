import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import AdminLayout from '@/components/admin/AdminLayout'
import StoryForm from '../../StoryForm'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditStoryPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: story } = await supabase
    .from('success_stories')
    .select('*')
    .eq('id', id)
    .single()

  if (!story) notFound()

  return (
    <AdminLayout email={user.email}>
      <div className="admin-topbar">
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: 'var(--navy)' }}>Edit Story — {story.patient_name}</h1>
      </div>
      <div className="admin-content">
        <div className="admin-card">
          <StoryForm initial={story} />
        </div>
      </div>
    </AdminLayout>
  )
}
