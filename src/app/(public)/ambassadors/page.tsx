import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Ambassadors & Supporters',
  description: 'Public figures and advocates who lend their voice to Save One Person to raise awareness for living organ donation.',
}

const STORAGE = 'https://kglvtgohmfulykkspfmj.supabase.co/storage/v1/object/public/site-assets'

type Ambassador = {
  name: string
  role: string
  image: string
  body: string[]
  imageFit?: 'cover' | 'contain'
}

const AMBASSADORS: Ambassador[] = [
  {
    name: 'Robin Roberts',
    role: 'Advocate · Good Morning America',
    image: `${STORAGE}/wp/2025/03/robin-roberts.jpg`,
    body: [
      'Robin Roberts’ battle against myelodysplastic syndrome (MDS) brought national attention to the life-saving importance of bone marrow donation. The Good Morning America anchor underwent chemotherapy and a bone marrow transplant, and she has used her platform to encourage others to register as donors.',
      'A bone-marrow transplant survivor herself, Robin is a dedicated advocate for marrow donor registration. Bone-marrow donors remain scarce — particularly for African-American patients, who face some of the longest odds of finding a match.',
      'According to the National Marrow Donor Program, “More than 10,000 people are diagnosed with life-threatening blood disorders every year.” Yet becoming a donor is often far simpler than people expect — marrow and stem-cell donation is frequently a straightforward process, and every new registrant widens the chance that a waiting patient finds their match.',
      'Her openness about her journey has inspired countless people to join the bone marrow registry — exactly the kind of awareness that helps patients find their match.',
    ],
  },
  {
    name: 'Andy Garcia',
    role: 'Actor · Advocate',
    image: `${STORAGE}/wp/2025/03/andy-garcia.jpg`,
    body: [
      'Acclaimed actor Andy Garcia has lent his voice and influence to help raise awareness for organ donation and the patients who need life-saving matches.',
      'Public figures like Andy help carry these stories to a wider audience — turning celebrity reach into real hope for people waiting for a donor.',
    ],
  },
]

export default function AmbassadorsPage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="section-label section-label-soft">Voices for the Mission</div>
          <h1 className="display-lg">Ambassadors &amp; Supporters</h1>
          <p style={{ marginTop: 24, fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
            Public figures and advocates who lend their voice and influence to help raise awareness for living organ donation and the patients who need a match.
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="container-md">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {AMBASSADORS.map((a) => (
              <article key={a.name} style={{ background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-3xl)', overflow: 'hidden', boxShadow: 'var(--shadow-soft)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 0 }} className="ambassador-grid">
                  <div style={{ position: 'relative', minHeight: 300, background: 'linear-gradient(160deg, #eef2f6 0%, #e6ebf0 100%)' }}>
                    <Image
                      src={a.image}
                      alt={a.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                      style={{ objectFit: a.imageFit ?? 'cover', objectPosition: 'center top' }}
                    />
                  </div>
                  <div style={{ padding: 36 }}>
                    <div className="section-label" style={{ marginBottom: 6 }}>{a.role}</div>
                    <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, color: 'var(--navy)', marginBottom: 16 }}>{a.name}</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: 15, lineHeight: 1.75, color: 'rgba(28,32,41,0.82)' }}>
                      {a.body.map((p, i) => <p key={i}>{p}</p>)}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div style={{ marginTop: 48, padding: 40, background: 'var(--secondary)', borderRadius: 'var(--r-3xl)', textAlign: 'center' }}>
            <div className="section-label">Lend Your Voice</div>
            <h2 className="display" style={{ maxWidth: 560, margin: '16px auto 0', fontSize: 30 }}>Are You a Public Figure Who Wants to Help?</h2>
            <p style={{ marginTop: 20, fontSize: 16, color: 'var(--muted)', maxWidth: 560, margin: '20px auto 0' }}>
              If you have a platform and want to help raise awareness for patients in need, we&apos;d love to work with you.
            </p>
            <div style={{ marginTop: 28, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn btn-emerald" style={{ padding: '14px 28px' }}>Get In Touch</Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .ambassador-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
