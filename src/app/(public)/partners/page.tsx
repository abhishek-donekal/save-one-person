import type { Metadata } from 'next'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Partners',
  description: 'Save One Person partners with healthcare organizations, media companies, and philanthropists to save lives.',
}

export default async function PartnersPage() {
  const supabase = await createClient()
  const { data: partners } = await supabase
    .from('partners')
    .select('*')
    .order('featured', { ascending: false })
    .order('name', { ascending: true })

  const grouped: Record<string, typeof partners> = {}
  if (partners) {
    for (const p of partners) {
      const cat = p.category || 'Other'
      if (!grouped[cat]) grouped[cat] = []
      grouped[cat]!.push(p)
    }
  }

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="section-label section-label-soft">Collaboration</div>
          <h1 className="display-lg">Our Partners</h1>
          <p style={{ marginTop: 24, fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
            Save One Person works with leading healthcare organizations, media companies, and philanthropists to expand our reach and save more lives.
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          {(!partners || partners.length === 0) ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>
              <p style={{ fontSize: 18 }}>Partner information coming soon.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
              {Object.entries(grouped).map(([category, items]) => (
                <div key={category}>
                  <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 32, color: 'var(--navy)', marginBottom: 32, paddingBottom: 16, borderBottom: '1.5px solid var(--border)' }}>
                    {category}
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
                    {items!.map((partner) => (
                      <div key={partner.id} style={{ background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-2xl)', padding: 28, display: 'flex', flexDirection: 'column', gap: 16, transition: 'transform 240ms, box-shadow 240ms' }}>
                        {partner.logo_url ? (
                          <Image src={partner.logo_url} alt={partner.name} width={120} height={60} style={{ objectFit: 'contain', height: 60, width: 'auto' }} />
                        ) : (
                          <div style={{ width: 48, height: 48, borderRadius: 'var(--r-xl)', background: 'var(--grad-emerald)', display: 'grid', placeItems: 'center', fontSize: 20, color: 'white', fontFamily: "'Fraunces', serif" }}>
                            {partner.name[0]}
                          </div>
                        )}
                        <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, color: 'var(--navy)' }}>{partner.name}</h3>
                        {partner.description && (
                          <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.65 }}>{partner.description}</p>
                        )}
                        {partner.website_url && (
                          <a href={partner.website_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, fontWeight: 600, color: 'var(--emerald)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                            Visit Website →
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: 80, padding: 48, background: 'var(--grad-navy)', borderRadius: 'var(--r-3xl)', color: 'white', textAlign: 'center' }}>
            <div className="section-label section-label-soft">Become a Partner</div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 40, marginTop: 12, marginBottom: 16 }}>Join Our Mission</h2>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.75)', maxWidth: 560, margin: '0 auto 32px' }}>
              Organizations and companies can help amplify life-saving messages and expand our impact. Contact Lauren to explore how we can work together.
            </p>
            <a href="mailto:Save1Person@aol.com?subject=Partnership%20Inquiry" className="btn btn-emerald" style={{ padding: '14px 32px' }}>
              Partner With Us
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
