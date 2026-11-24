import type { Metadata } from 'next'
import Link from 'next/link'
import HowYouCanHelp from '@/components/ui/HowYouCanHelp'

const PATH = '/living-kidney-donation-myths-facts'
const PAGE_URL = `https://www.saveonepersonnow.org${PATH}`

export const metadata: Metadata = {
  title: 'Myth vs Fact: Living Kidney Donation',
  description:
    'Do you have to be family or a perfect match to donate a kidney? Who pays? Common myths about living kidney donation, and the facts, from Save One Person.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Myth vs Fact: Living Kidney Donation',
    description: 'You don’t have to be family, or even a match, to help someone get a kidney. The facts about living donation.',
    url: PAGE_URL,
  },
}

const link = { color: 'var(--emerald)', fontWeight: 600 } as const

const ITEMS: { myth: string; fact: React.ReactNode }[] = [
  {
    myth: 'Only family members can donate a kidney.',
    fact: (
      <>
        Friends, coworkers and even complete strangers can be living donors. Read how{' '}
        <Link href="/success-stories/marisa-gives-kidney-to-a-stranger" style={link}>Marisa gave her kidney to a stranger</Link>, and how{' '}
        <Link href="/success-stories/torrey-receives-a-living-kidney-donor-from-a-complete-stranger" style={link}>Torrey received a kidney from a complete stranger</Link>.
      </>
    ),
  },
  {
    myth: 'If I’m not a match, I can’t help.',
    fact: (
      <>
        Through <strong>paired kidney exchange</strong> (a “kidney swap”), you can donate to a patient who matches you,
        and in return your loved one receives a kidney from a donor who matches them. When Bonnie saw a Save One Alert
        on PIX11 and entered a kidney swap program,{' '}
        <Link href="/success-stories/bonnie-watches-save-one-alert-on-pix11-and-enters-kidney-swap-program-8-lives-saved" style={link}>8 lives were saved</Link>.
      </>
    ),
  },
  {
    myth: 'You can’t live a normal life with one kidney.',
    fact: 'Most people can live a full, healthy life with one kidney. Before anyone donates, the transplant center does a careful medical evaluation to make sure donating is safe for that person.',
  },
  {
    myth: 'The donor has to pay for the testing and surgery.',
    fact: 'The patient’s transplant center does all the testing, usually at no cost to the donor. The donor’s medical costs are usually covered by the recipient’s insurance. The transplant center will explain exactly what is covered.',
  },
  {
    myth: 'If I sign up or get tested, I have to go through with it.',
    fact: (
      <>
        Signing up never commits you, and a potential donor can stop at any time, for any reason. Joining{' '}
        <Link href="/become-a-donor" style={link}>our living kidney donor list</Link> just means we can tell you when someone needs help.
      </>
    ),
  },
  {
    myth: 'I’m probably too old, or not healthy enough, so there’s no point asking.',
    fact: 'Every transplant center sets its own guidelines for age and health, and they differ from patient to patient. The only way to know if you can donate is to ask a transplant center. Asking is free and private.',
  },
  {
    myth: 'People get paid for donating a kidney.',
    fact: 'Buying or selling organs is illegal in the United States. Living donation is a gift, freely given.',
  },
  {
    myth: 'Unless I donate, I can’t save a life.',
    fact: (
      <>
        Many of our <Link href="/success-stories" style={link}>success stories</Link> began when someone simply saw a story on TV,
        radio or online, and shared it or reached out. Sharing an{' '}
        <Link href="/urgent-requests" style={link}>urgent request</Link> can reach the one person who is a match.
      </>
    ),
  },
]

export default function MythsFactsPage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="section-label section-label-soft">Living Donation</div>
          <h1 className="display-lg">Myth vs Fact: Living Kidney Donation</h1>
          <p style={{ marginTop: 24, fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, maxWidth: 720 }}>
            Many people never consider donating a kidney because of something they heard that isn&apos;t true.
            Here are the most common myths, and the facts.
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="container-md">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {ITEMS.map((item, i) => (
              <div
                key={i}
                style={{ background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-2xl)', padding: 'clamp(20px, 4vw, 28px)' }}
              >
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#b91c1c' }}>Myth</div>
                <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, color: 'var(--navy)', marginTop: 6, lineHeight: 1.35 }}>{item.myth}</h2>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--emerald)', marginTop: 16 }}>Fact</div>
                <p style={{ marginTop: 6, fontSize: 16, lineHeight: 1.8, color: 'rgba(28,32,41,0.85)' }}>{item.fact}</p>
              </div>
            ))}
          </div>

          <p style={{ marginTop: 32, fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>
            Save One Person shares stories and makes introductions. We don&apos;t give medical advice. For medical questions
            about living donation, please talk to a transplant center. Learn more from the{' '}
            <a href="https://www.kidney.org/transplantation/livingdonors" target="_blank" rel="noopener noreferrer" style={link}>National Kidney Foundation</a>{' '}
            and the{' '}
            <a href="https://www.kidneyregistry.org/" target="_blank" rel="noopener noreferrer" style={link}>National Kidney Registry</a>.
            Want the whole process step by step? Read <Link href="/blog/how-living-kidney-donation-works" style={link}>How Living Kidney Donation Works</Link>.
            Have another question? See our <Link href="/faq" style={link}>FAQ</Link>.
          </p>

          <div style={{ marginTop: 40, padding: 32, background: 'var(--grad-navy)', borderRadius: 'var(--r-2xl)', color: 'white' }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--emerald-soft)', marginBottom: 8 }}>Someone Needs a Donor Now</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 28, lineHeight: 1.2 }}>3-year-old William needs a living kidney donor.</div>
            <p style={{ marginTop: 12, fontSize: 15, color: 'rgba(255,255,255,0.85)', lineHeight: 1.7 }}>Could it be you, or someone you know?</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 20 }}>
              <Link className="btn btn-emerald" href="/help-william">Help William →</Link>
              <Link className="btn btn-ghost" href="/blog/william-fritts-3-year-old-needs-a-living-kidney-donor">Read William&apos;s story</Link>
            </div>
          </div>

          <HowYouCanHelp shareUrl={PAGE_URL} shareText="Myth vs Fact: you don't have to be family, or even a match, to help someone get a kidney." />
        </div>
      </div>
    </>
  )
}
