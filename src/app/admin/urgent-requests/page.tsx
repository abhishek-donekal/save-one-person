import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import AdminLayout from '@/components/admin/AdminLayout'
import AdminRequestsActions from './AdminRequestsActions'

export default async function AdminUrgentRequestsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: requests } = await supabase
    .from('urgent_requests')
    .select('id, title, patient_name, medical_condition, status, urgent, published, created_at, donation_goal, donation_raised, slug')
    .order('created_at', { ascending: false })

  return (
    <AdminLayout email={user.email}>
      <div className="admin-topbar">
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: 'var(--navy)' }}>Urgent Requests</h1>
        <Link href="/admin/urgent-requests/new" className="btn btn-emerald" style={{ padding: '10px 20px', fontSize: 13 }}>
          + New Request
        </Link>
      </div>
      <div className="admin-content">
        <div className="admin-card">
          {(!requests || requests.length === 0) ? (
            <p style={{ color: 'var(--muted)', padding: '40px 0', textAlign: 'center' }}>
              No requests yet. <Link href="/admin/urgent-requests/new" style={{ color: 'var(--emerald)' }}>Add the first one.</Link>
            </p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Condition</th>
                  <th>Status</th>
                  <th>Published</th>
                  <th>Fundraising</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req.id}>
                    <td style={{ fontWeight: 600 }}>
                      {req.urgent && <span className="badge badge-red" style={{ marginRight: 6 }}>Urgent</span>}
                      {req.patient_name}
                    </td>
                    <td><span className="badge badge-blue">{req.medical_condition}</span></td>
                    <td>
                      <span className={`badge ${req.status === 'open' ? 'badge-green' : req.status === 'fulfilled' ? 'badge-blue' : 'badge-gray'}`}>
                        {req.status}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${req.published ? 'badge-green' : 'badge-gray'}`}>
                        {req.published ? 'Live' : 'Draft'}
                      </span>
                    </td>
                    <td style={{ fontSize: 13 }}>
                      {req.donation_goal ? `$${(req.donation_raised || 0).toLocaleString()} / $${req.donation_goal.toLocaleString()}` : '—'}
                    </td>
                    <td>
                      <AdminRequestsActions requestId={req.id} status={req.status} published={req.published} slug={req.slug} />
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
