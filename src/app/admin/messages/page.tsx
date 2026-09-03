import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminLayout from '@/components/admin/AdminLayout'

export const metadata = { title: 'Messages — Admin' }

export default async function AdminMessagesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: messages } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(200)

  const unhandled = (messages || []).filter((m) => !m.handled).length

  return (
    <AdminLayout email={user.email}>
      <div className="admin-topbar">
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: 'var(--navy)' }}>Contact Messages</h1>
        <span style={{ fontSize: 13, color: 'var(--muted)' }}>{unhandled} new · {(messages || []).length} total</span>
      </div>

      <div className="admin-content">
        {(!messages || messages.length === 0) ? (
          <div style={{ padding: 48, textAlign: 'center', color: 'var(--muted)', background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 16 }}>
            No messages yet. Submissions from the Contact form will appear here.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {messages.map((m) => (
              <div key={m.id} style={{ background: 'var(--white)', border: `1.5px solid ${m.handled ? 'var(--border)' : '#6ee7b7'}`, borderRadius: 14, padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap', marginBottom: 10 }}>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 15 }}>
                      {m.name} {!m.handled && <span style={{ marginLeft: 8, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#047857' }}>New</span>}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--muted)' }}>
                      <a href={`mailto:${m.email}`} style={{ color: 'var(--emerald)' }}>{m.email}</a>
                      {m.subject && <> · {m.subject}</>}
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                    {new Date(m.created_at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                  </div>
                </div>
                <p style={{ fontSize: 14, color: 'rgba(28,32,41,0.85)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{m.message}</p>
                <div style={{ marginTop: 12 }}>
                  <a href={`mailto:${m.email}?subject=${encodeURIComponent('Re: ' + (m.subject || 'Your message to Save One Person'))}`} style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)' }}>
                    Reply →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
