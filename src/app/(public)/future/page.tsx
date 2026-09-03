import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'The Future of Organ Donation',
  description: 'Where organ donation is heading: 3D-printed organs, lab-grown tissue, stem-cell organs, artificial organs, xenotransplantation, and emerging tech that could shrink transplant waiting lists.',
}

type Topic = {
  icon: string
  title: string
  status: string
  body: string
  examples: string[]
}

const TOPICS: Topic[] = [
  {
    icon: '🖨️',
    title: '3D-Printed Organs',
    status: 'Early clinical trials',
    body: 'Bioprinters layer living cells and biocompatible scaffolds to construct functional tissue. Skin grafts, cartilage, and simple tubular structures (blood vessels, tracheas) are already being printed and implanted in humans. Solid vascularized organs — kidneys, livers, hearts — remain the hardest unsolved problem because they require dense networks of blood vessels.',
    examples: [
      'Skin grafts for burn patients (Wake Forest Institute for Regenerative Medicine)',
      '3D-bioprinted ear cartilage implanted in patients (3DBio Therapeutics, 2022)',
      'Printed cornea trials underway (Newcastle University)',
    ],
  },
  {
    icon: '🧫',
    title: 'Lab-Grown Organs (Organoids & Tissue Engineering)',
    status: 'Research → early human use',
    body: 'Scientists grow miniature organ models — organoids — from human stem cells. Larger lab-grown bladders and blood vessels have been successfully implanted. Full-size, fully functional lab-grown kidneys and livers are still years away, but the field is advancing fast.',
    examples: [
      'Lab-grown bladders transplanted into patients (Anthony Atala, 2006)',
      'Lab-grown blood vessels in dialysis patients (Humacyte, ongoing trials)',
      'Mini-livers and mini-kidneys used for drug testing',
    ],
  },
  {
    icon: '🧬',
    title: 'Stem-Cell-Generated Organs',
    status: 'Pre-clinical / early trials',
    body: 'Induced pluripotent stem cells (iPSCs) can be reprogrammed from a patient&apos;s own skin or blood cells, then guided to grow into specialized tissue. The promise: organs grown from your own cells, with zero rejection risk and no need for lifelong immunosuppression.',
    examples: [
      'iPSC-derived heart muscle patches in trials (Japan, Germany)',
      'iPSC-derived pancreatic islet cells for type 1 diabetes (Vertex VX-880)',
      'Retinal pigment epithelium grown for macular degeneration',
    ],
  },
  {
    icon: '🫀',
    title: 'Artificial & Mechanical Organs',
    status: 'In active clinical use',
    body: 'Devices that replace organ function mechanically. LVADs (left ventricular assist devices) already keep heart-failure patients alive for years. Wearable artificial kidneys and total artificial hearts are advancing. These bridge patients to transplant — or, increasingly, replace transplant entirely.',
    examples: [
      'HeartMate 3 LVAD — long-term heart support',
      'Total artificial heart (SynCardia, Carmat Aeson)',
      'Wearable artificial kidney (WAK) prototypes',
    ],
  },
  {
    icon: '🐖',
    title: 'Xenotransplantation (Animal-to-Human Transplants)',
    status: 'First human trials underway',
    body: 'Gene-edited pig organs are being transplanted into humans. CRISPR knocks out the pig genes that trigger human immune rejection. The first gene-edited pig kidney transplant into a living patient happened in 2024. Pig hearts have also been used in compassionate-use cases. If this scales, the donor shortage could end within a decade.',
    examples: [
      'First gene-edited pig kidney transplant — Mass General, March 2024',
      'Pig heart transplants — David Bennett (2022), Lawrence Faucette (2023)',
      'United Therapeutics / eGenesis pig organs in active FDA pipelines',
    ],
  },
  {
    icon: '❄️',
    title: 'Organ Preservation & Recovery Tech',
    status: 'Transforming the field today',
    body: 'New machine-perfusion devices keep donor organs alive longer and even improve them after recovery. Normothermic regional perfusion (NRP) and ex-vivo perfusion (TransMedics OCS) have already increased usable donor organ counts. Cold-storage is being replaced — making more donor organs viable for transplant.',
    examples: [
      'TransMedics Organ Care System — &ldquo;heart in a box&rdquo;',
      'Normothermic regional perfusion (NRP) for DCD donors',
      'Sub-zero supercooling research (Mass General, 2019)',
    ],
  },
  {
    icon: '🤖',
    title: 'AI & Matching Algorithms',
    status: 'Already deployed',
    body: 'Machine learning is improving donor-recipient matching, predicting graft survival, optimizing organ allocation, and even identifying potential living donors. Better matching means fewer wasted organs and longer-lasting transplants.',
    examples: [
      'UNOS allocation algorithms (continuously updated)',
      'AI-driven donor lung assessment (Toronto Lung Transplant Program)',
      'Predictive models for graft rejection',
    ],
  },
  {
    icon: '💉',
    title: 'Tolerance & Rejection-Free Transplants',
    status: 'Active research',
    body: 'New protocols — including combined bone marrow + organ transplants and chimeric immune-system techniques — are letting some patients keep their transplanted organs without lifelong immunosuppressive drugs. If this becomes standard, transplant recipients could live healthier, longer lives.',
    examples: [
      'Stanford / Mass General tolerance protocols',
      'Combined kidney + bone marrow transplant trials',
    ],
  },
]

export default function FuturePage() {
  return (
    <>
      <div className="page-hero" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #047857 100%)' }}>
        <div className="page-hero-inner">
          <div className="section-label section-label-soft">Looking Ahead</div>
          <h1 className="display-lg">The Future of Organ Donation</h1>
          <p style={{ marginTop: 24, fontSize: 18, color: 'rgba(255,255,255,0.78)', lineHeight: 1.7, maxWidth: 760, marginLeft: 'auto', marginRight: 'auto' }}>
            Right now over 100,000 Americans wait for a transplant. Within a generation, that may no longer be true. Here&apos;s the technology that could shrink — or eliminate — the transplant waiting list.
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, marginBottom: 64 }}>
            <div style={{ background: 'var(--secondary)', padding: 28, borderRadius: 'var(--r-2xl)' }}>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 36, color: 'var(--emerald)', marginBottom: 6 }}>100K+</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>People waiting today</div>
            </div>
            <div style={{ background: 'var(--secondary)', padding: 28, borderRadius: 'var(--r-2xl)' }}>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 36, color: 'var(--emerald)', marginBottom: 6 }}>17/day</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Die waiting in the U.S.</div>
            </div>
            <div style={{ background: 'var(--secondary)', padding: 28, borderRadius: 'var(--r-2xl)' }}>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 36, color: 'var(--emerald)', marginBottom: 6 }}>~2030s</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Pig-organ transplants could go mainstream</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {TOPICS.map((t, i) => (
              <article key={i} style={{ background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-3xl)', padding: 36, boxShadow: 'var(--shadow-soft)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 40 }} aria-hidden="true">{t.icon}</span>
                  <div style={{ flex: 1, minWidth: 240 }}>
                    <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 26, color: 'var(--navy)', marginBottom: 4 }}>{t.title}</h2>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--emerald)' }}>{t.status}</span>
                  </div>
                </div>
                <p style={{ fontSize: 16, color: 'rgba(28,32,41,0.85)', lineHeight: 1.8, marginBottom: 20 }} dangerouslySetInnerHTML={{ __html: t.body }} />
                <div style={{ borderLeft: '3px solid var(--emerald)', paddingLeft: 16 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>Notable examples</div>
                  <ul style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, paddingLeft: 18 }}>
                    {t.examples.map((ex, j) => (
                      <li key={j} dangerouslySetInnerHTML={{ __html: ex }} />
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <div style={{ marginTop: 64, padding: 40, background: 'var(--grad-navy)', borderRadius: 'var(--r-3xl)', color: 'white', textAlign: 'center' }}>
            <div className="section-label section-label-soft">Until the Future Arrives</div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 32, marginTop: 12, marginBottom: 16 }}>People Need Donors Today</h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.78)', maxWidth: 600, margin: '0 auto 28px', lineHeight: 1.7 }}>
              These technologies will change everything — but most are still years away. Right now, the only thing standing between a patient on the waiting list and a second chance at life is one person stepping forward.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/urgent-requests" className="btn btn-emerald" style={{ padding: '14px 28px' }}>See Urgent Requests</Link>
              <Link href="/contact" className="btn btn-ghost" style={{ padding: '14px 28px', borderColor: 'rgba(255,255,255,0.4)', color: 'white' }}>Become a Donor</Link>
            </div>
          </div>

          <p style={{ marginTop: 40, fontSize: 12, color: 'var(--muted)', textAlign: 'center', maxWidth: 720, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
            This page is educational only and not medical advice. Talk with your transplant team about which therapies and trials may be appropriate for you.
          </p>
        </div>
      </div>
    </>
  )
}
