import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Living Kidney Donor FAQ: How to Help and Donate',
  description:
    'Answers about becoming a living kidney donor: who pays, whether you can change your mind, recovery, paired exchange, sharing a patient’s story, and how Save One Person helps.',
  alternates: { canonical: '/faq' },
}

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: 'What does Save One Person do?',
    a: 'We use the power of media — television, radio, podcasts, newspapers, and social media — to share the stories of people who urgently need a living kidney donor, living liver donor, bone marrow match, or other life-saving medical miracle. By bringing the right story to the right person at the right time, we help connect patients with the people who can save their lives.',
  },
  {
    q: 'How do I submit my story or a loved one’s story?',
    a: (
      <>
        Visit our <Link href="/urgent-requests/submit" style={{ color: 'var(--emerald)', fontWeight: 600 }}>Post an Urgent Need</Link> page and fill out the form with a photo, the patient’s story, and contact information. You can also email us directly at <a href="mailto:Save1Person@aol.com" style={{ color: 'var(--emerald)', fontWeight: 600 }}>Save1Person@aol.com</a>. Approved stories are published on our site and shared with our media partners.
      </>
    ),
  },
  {
    q: 'Is my donation tax-deductible?',
    a: 'Yes. Save One Person is a 501(c)(3) nonprofit organization. All donations are tax-deductible to the extent provided by law, and you will receive a receipt for your records.',
  },
  {
    q: 'How can I donate?',
    a: (
      <>
        Visit our <Link href="/donate" style={{ color: 'var(--emerald)', fontWeight: 600 }}>Donate</Link> page to make a secure, tax-deductible gift. You can give a one-time or monthly donation. Every dollar funds media outreach, storytelling, and technology that helps patients find donors.
      </>
    ),
  },
  {
    q: 'How do I become a living donor?',
    a: (
      <>
        Thank you for considering this life-saving gift. The easiest first step is to join our <Link href="/become-a-donor" style={{ color: 'var(--emerald)', fontWeight: 600 }}>living kidney donor list</Link> (signing up never commits you). You can also reach out through our <Link href="/contact" style={{ color: 'var(--emerald)', fontWeight: 600 }}>Contact</Link> page or email <a href="mailto:Save1Person@aol.com" style={{ color: 'var(--emerald)', fontWeight: 600 }}>Save1Person@aol.com</a> and we will help connect you with the patient’s transplant team or the appropriate donor registry. Living donation and bone marrow registration are always coordinated through licensed medical professionals.
      </>
    ),
  },
  {
    q: 'Does Save One Person handle the medical or transplant process?',
    a: 'No. We are a media and awareness organization. All medical evaluation, matching, and transplantation is handled by hospitals, transplant centers, and donor registries. Our role is to raise awareness and make the introduction that can lead to a match.',
  },
  {
    q: 'Do I have to be a family member or a perfect match to donate a kidney?',
    a: (
      <>
        No. Friends and even strangers can be living donors, and through paired kidney exchange you can help someone get a kidney even if you are not their match. Read our <Link href="/living-kidney-donation-myths-facts" style={{ color: 'var(--emerald)', fontWeight: 600 }}>Myth vs Fact: Living Kidney Donation</Link> page to learn more.
      </>
    ),
  },
  {
    q: 'Who pays for a living donor’s medical costs?',
    a: (
      <>
        In most cases, the recipient’s health insurance pays for the donor’s evaluation, surgery and hospital stay. The federal <a href="https://livingdonorassistance.org/How-to-Apply/How-NLDAC-Helps" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--emerald)', fontWeight: 600 }}>National Living Donor Assistance Center</a> can help eligible donors with travel, lost wages and dependent care. The transplant center’s financial coordinator can tell you exactly what applies. Buying or selling organs is illegal: living donation is always a gift.
      </>
    ),
  },
  {
    q: 'If I sign up or start testing, can I change my mind?',
    a: 'Yes. Joining our donor list never commits you, and starting a donor evaluation does not commit you to donate. You can stop at any time. Every transplant center also gives donors an Independent Living Donor Advocate whose job is to protect the donor’s rights and make sure the decision is truly theirs.',
  },
  {
    q: 'What is the surgery and recovery like for a kidney donor?',
    a: (
      <>
        Most living kidney donors have a minimally invasive (laparoscopic) surgery and go home after a short hospital stay, and most people live full, healthy lives with one kidney. Recovery is different for everyone, so the transplant center is the right place for medical questions about your own health. Our blog post <Link href="/blog/how-living-kidney-donation-works" style={{ color: 'var(--emerald)', fontWeight: 600 }}>How Living Kidney Donation Works</Link> walks through every step in plain language.
      </>
    ),
  },
  {
    q: 'What is the Save One Alert, and how do I get it?',
    a: (
      <>
        The Save One Alert is our free email with the stories of people who urgently need a living donor or a medical miracle, so you can help or share when it matters most. Sign up in the box at the bottom of any page. TV, radio, podcast and newspaper producers can get our weekly alerts for the media on the <Link href="/media-alerts" style={{ color: 'var(--emerald)', fontWeight: 600 }}>Media Alerts</Link> page.
      </>
    ),
  },
  {
    q: 'I wasn’t a match. Can I still help someone else?',
    a: (
      <>
        Yes. Join our <Link href="/ready-to-help" style={{ color: 'var(--emerald)', fontWeight: 600 }}>Ready to Help list</Link> and we’ll reach out when the next patient needs a living donor. You can also ask a transplant center about paired kidney exchange, where you donate to someone who matches you and your loved one receives a kidney from a donor who matches them.
      </>
    ),
  },
  {
    q: 'Do you help with bone marrow and liver donation too?',
    a: (
      <>
        Yes. Our stories include people who need a living kidney donor, a living liver donor or a bone marrow match. For bone marrow, the first step is joining the national registry (NMDP, formerly Be The Match). For kidney or liver donation, you start with the patient’s transplant center. See our <Link href="/urgent-requests" style={{ color: 'var(--emerald)', fontWeight: 600 }}>Urgent Requests</Link> to find out who needs help right now.
      </>
    ),
  },
  {
    q: 'Can I post a story for a friend or family member?',
    a: (
      <>
        Yes. Many stories are sent to us by a family member or friend (sometimes called a donor champion). Please make sure the patient or their family agrees to share the story first. Then use our <Link href="/urgent-requests/submit" style={{ color: 'var(--emerald)', fontWeight: 600 }}>Post an Urgent Need</Link> page. Read <Link href="/blog/how-to-find-a-living-kidney-donor" style={{ color: 'var(--emerald)', fontWeight: 600 }}>How to Find a Living Kidney Donor</Link> for tips on telling the story so people can act on it.
      </>
    ),
  },
  {
    q: 'Can my organization or media outlet partner with Save One Person?',
    a: (
      <>
        Absolutely. We are always looking for media partners and sponsors to help amplify life-saving stories. Email <a href="mailto:Save1Person@aol.com?subject=Partnership%20Inquiry" style={{ color: 'var(--emerald)', fontWeight: 600 }}>Save1Person@aol.com</a> or see our <Link href="/partners" style={{ color: 'var(--emerald)', fontWeight: 600 }}>Partners</Link> page.
      </>
    ),
  },
  {
    q: 'How can I help if I can’t donate an organ?',
    a: (
      <>
        There are many ways to save a life. Share urgent stories on social media, make a tax-deductible <Link href="/donate" style={{ color: 'var(--emerald)', fontWeight: 600 }}>donation</Link>, introduce us to someone in media or healthcare, or simply spread awareness. One share can reach the person who becomes a match.
      </>
    ),
  },
]

export default function FaqPage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="section-label section-label-soft">Have a Question?</div>
          <h1 className="display-lg">Frequently Asked Questions</h1>
          <p style={{ marginTop: 24, fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
            Answers to the questions we hear most about donating, sharing a story, and becoming a living donor.
          </p>
          <p style={{ marginTop: 16, fontSize: 16 }}>
            <Link href="/living-kidney-donation-myths-facts" style={{ color: 'var(--emerald-soft)', fontWeight: 600, textDecoration: 'underline' }}>
              New: Myth vs Fact about living kidney donation →
            </Link>
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="container-md">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQS.map((item, i) => (
              <details key={i} style={{ background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-2xl)', padding: '0', overflow: 'hidden' }}>
                <summary style={{ cursor: 'pointer', listStyle: 'none', padding: '22px 28px', fontFamily: "'Fraunces', serif", fontSize: 18, color: 'var(--navy)', fontWeight: 600, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                  {item.q}
                  <span aria-hidden="true" style={{ color: 'var(--emerald)', fontSize: 22, flexShrink: 0 }}>+</span>
                </summary>
                <div style={{ padding: '0 28px 24px', fontSize: 15, lineHeight: 1.8, color: 'rgba(28,32,41,0.82)' }}>
                  {item.a}
                </div>
              </details>
            ))}
          </div>

          <div style={{ marginTop: 48, padding: 40, background: 'var(--secondary)', borderRadius: 'var(--r-3xl)', textAlign: 'center' }}>
            <div className="section-label">Still Have Questions?</div>
            <h2 className="display" style={{ maxWidth: 520, margin: '16px auto 0', fontSize: 30 }}>We&apos;re Here to Help</h2>
            <div style={{ marginTop: 28, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn btn-emerald" style={{ padding: '14px 28px' }}>Contact Us</Link>
              <a href="tel:9175726385" className="btn btn-navy" style={{ padding: '14px 28px' }}>Call 917-572-6385</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
