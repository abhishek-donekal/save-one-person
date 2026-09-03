import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Save One Person collects, uses, and protects your personal information.',
}

const SECTIONS: { h: string; body: string[] }[] = [
  {
    h: 'Who We Are',
    body: [
      'Save One Person is a 501(c)(3) nonprofit organization that uses media, storytelling, and human connection to help patients find living organ donors, bone marrow matches, and other life-saving medical miracles. Our website is www.saveonepersonnow.org.',
    ],
  },
  {
    h: 'Information We Collect',
    body: [
      'We collect information you voluntarily provide to us, including: your name and email when you contact us, subscribe to our newsletter, or submit a story; the patient information, photos, and contact details you choose to share when submitting an urgent request; and donation information processed by our third-party payment providers.',
      'We do not collect payment card numbers directly — donations are processed securely by trusted third parties (such as PayPal Giving Fund and our checkout provider), who handle that information under their own privacy and security standards.',
    ],
  },
  {
    h: 'How We Use Your Information',
    body: [
      'We use the information you provide to: publish approved patient stories and share them with our media partners to help find a match; respond to your messages and inquiries; send Save One Alerts and updates if you subscribe; process and acknowledge donations; and improve our website and outreach.',
    ],
  },
  {
    h: 'Information You Choose to Make Public',
    body: [
      'When you submit an urgent request, the photo, story, and contact details you mark as public are published on our website so that media, donors, and the public can reach the patient directly. Please only share information the patient or their guardian has agreed to make public. You may ask us to remove or update a published story at any time.',
    ],
  },
  {
    h: 'How We Share Your Information',
    body: [
      'We share published patient stories with media outlets and the public as part of our mission. We do not sell your personal information. We may share information with service providers who help us operate the site (such as hosting and email delivery) and when required by law.',
    ],
  },
  {
    h: 'Email and Newsletter',
    body: [
      'If you subscribe to our newsletter or Save One Alerts, we will send you updates about patients in need and our work. Every email includes an unsubscribe link, and you can opt out at any time by contacting us at Save1Person@aol.com.',
    ],
  },
  {
    h: 'Cookies and Analytics',
    body: [
      'Our website may use cookies and standard analytics to understand how visitors use the site and to improve it. You can control cookies through your browser settings.',
    ],
  },
  {
    h: 'Data Retention',
    body: [
      'We keep the information you provide for as long as needed to fulfill our mission and legal obligations. You can request that we delete your personal information by contacting us.',
    ],
  },
  {
    h: 'Your Rights',
    body: [
      'You may request access to, correction of, or deletion of your personal information, and you may withdraw a story you submitted. To exercise any of these rights, email us at Save1Person@aol.com or call 917-572-6385.',
    ],
  },
  {
    h: 'Contact Us',
    body: [
      'If you have questions about this Privacy Policy or how your information is handled, contact Lauren Finkelstein at Save1Person@aol.com or 917-572-6385.',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="section-label section-label-soft">Your Privacy Matters</div>
          <h1 className="display-lg">Privacy Policy</h1>
        </div>
      </div>

      <div className="page-content">
        <div className="container-md">
          <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 40 }}>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            {SECTIONS.map((s, i) => (
              <section key={i}>
                <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, color: 'var(--navy)', marginBottom: 14 }}>{s.h}</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {s.body.map((p, j) => (
                    <p key={j} style={{ fontSize: 16, lineHeight: 1.8, color: 'rgba(28,32,41,0.82)' }}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
