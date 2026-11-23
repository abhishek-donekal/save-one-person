import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllProducts, productMinPrice, productCompareAt } from '@/lib/shop/queries'
import { donationCheckoutUrl } from '@/lib/shop/checkout'
import { ORG_EIN } from '@/lib/org'
import ProductCard from '@/components/shop/ProductCard'
import BuyTeeButton from '@/components/shop/BuyTeeButton'
import type { CardProduct } from '@/components/shop/ProductCard'
import { sectionOf, hiddenFromList, isBook } from '@/lib/shop/organize'

const SITE_URL = 'https://www.saveonepersonnow.org'
const PATH = '/meaningful-holiday-gifts'

export const metadata: Metadata = {
  title: 'Meaningful Holiday Gifts That Help Save Lives',
  description:
    'Looking for a meaningful holiday gift? Go Bless Yourself tees, hoodies, hats and mugs, inspiring books, and gifts in someone’s honor. Every purchase helps Save One Person find living organ donors and medical miracles.',
  alternates: { canonical: `${SITE_URL}${PATH}` },
  keywords: [
    'meaningful holiday gifts',
    'gifts that give back',
    'charity gifts',
    'meaningful Christmas gifts',
    'Hanukkah gifts that give back',
    'gifts for nurses',
    'inspirational gifts',
    'nonprofit gifts',
    'Go Bless Yourself',
  ],
  openGraph: {
    title: 'Meaningful Holiday Gifts That Help Save Lives',
    description: 'Gifts with a message and a mission: every purchase helps someone find a living organ donor or a medical miracle.',
    url: `${SITE_URL}${PATH}`,
    type: 'website',
    images: [{ url: `${SITE_URL}/social/2026-11-14/go-bless-yourself-heavenly.jpg` }],
  },
}

export const revalidate = 300

type Product = Awaited<ReturnType<typeof getAllProducts>>[number]

function toCard(p: Product): CardProduct {
  const v = p.variants[0]
  return {
    id: p.id,
    handle: p.handle,
    title: p.title,
    product_type: p.product_type,
    image: p.images[0]?.url ?? null,
    price: productMinPrice(p),
    compareAt: productCompareAt(p),
    available: p.variants.some((x) => x.available),
    variantId: v?.id ?? '',
    shopifyVariantId: v?.shopify_id ?? null,
    variantTitle: v?.title ?? null,
    requiresShipping: v?.requires_shipping ?? true,
    multiVariant: p.variants.length > 1,
    book: isBook(p),
  }
}

const FOR_WHO = [
  { who: 'The nurse, doctor or caregiver', why: 'A “Go Bless Yourself” tee or mug says thank you to the people who heal us every day.' },
  { who: 'Grandma, Mom or the friend who has everything', why: 'A gift with a message, and a mission behind it. They wear it, and they help save a life.' },
  { who: 'Your pastor, rabbi or faith community', why: 'An uplifting blessing to wear, and group orders are welcome for churches and synagogues.' },
  { who: 'The reader and the seeker', why: 'Lauren Finkelstein’s inspiring books on faith, hope and turning the impossible into possible.' },
  { who: 'The teacher, coach or team', why: 'Matching tees for a team or class, and a lesson in kindness that keeps on giving.' },
  { who: 'Someone who needs nothing at all', why: 'Give in their honor. Your donation helps share a patient’s story with the person who could save them.' },
]

const FAQ = [
  {
    q: 'What makes these holiday gifts meaningful?',
    a: 'Every purchase supports Save One Person, a 501(c)(3) nonprofit that uses the media to help people find living organ donors and medical miracles. Your gift carries a message of blessing and helps save a life.',
  },
  {
    q: 'What does the Go Bless Yourself shirt say?',
    a: '“Go Bless Yourself” on the front and “Bless You Too” on the back. The collection includes tees, hoodies, hats, mugs and totes.',
  },
  {
    q: 'Can I give a gift in someone’s honor instead?',
    a: 'Yes. You can make a tax-deductible donation in someone’s name. It’s a perfect gift for the person who has everything.',
  },
  {
    q: 'Do you offer group or bulk orders?',
    a: 'Yes. Churches, synagogues, schools, teams and offices can order in bulk at special pricing. Email save1person1@gmail.com.',
  },
]

export default async function MeaningfulGiftsPage() {
  const products = (await getAllProducts()).filter((p) => !hiddenFromList(p))
  const wear = products.filter((p) => sectionOf(p) === 'Wear & Gifts').map(toCard)
  const read = products.filter((p) => sectionOf(p) === 'Read').map(toCard)

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Meaningful Holiday Gifts That Give Back',
      url: `${SITE_URL}${PATH}`,
      itemListElement: [...wear, ...read].map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}/shop/${p.handle}`,
        name: p.title,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="page-hero shop-hero">
        <div className="page-hero-inner">
          <div className="section-label section-label-soft">Holiday Gift Guide</div>
          <h1 className="display-lg">Meaningful Holiday Gifts <em>That Help Save Lives</em></h1>
          <p className="shop-hero-sub">
            Gifts with a message and a mission. Every tee, hoodie, mug and book helps Save One Person find living organ donors and medical miracles for people who are running out of time.
          </p>
          <div className="shop-hero-actions">
            <Link href="/shop/go-bless-yourself-t-shirt" className="btn" style={{ background: '#FFD500', color: '#111', fontWeight: 900, fontSize: 18, padding: '16px 30px', border: '3px solid #111' }}>🛍️ Buy the T-shirt &rarr;</Link>
            <a href="#wear" className="btn btn-emerald">See all gifts &rarr;</a>
            <a href="#honor" className="shop-hero-new">Give in someone&rsquo;s honor <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <section aria-labelledby="gby-h" style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center', justifyContent: 'center', margin: '0 0 64px' }}>
            <video
              src="/social/2026-11-14/go-bless-yourself-heavenly.mp4"
              poster="/social/2026-11-14/go-bless-yourself-heavenly.jpg"
              autoPlay muted loop playsInline controls
              style={{ width: 280, maxWidth: '80vw', aspectRatio: '9 / 16', borderRadius: 20, background: '#000', boxShadow: 'var(--shadow-soft)' }}
            />
            <div style={{ maxWidth: 460 }}>
              <div className="section-label">The gift that blesses twice</div>
              <h2 id="gby-h" className="display" style={{ fontSize: 40, margin: '8px 0 14px' }}>Go Bless <em>Yourself</em></h2>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--muted)' }}>
                &ldquo;Go Bless Yourself&rdquo; on the front, &ldquo;Bless You Too&rdquo; on the back. It&rsquo;s a gift they&rsquo;ll love wearing, and each one helps us use the media to save lives for people who need a living organ donor or a medical miracle.
              </p>
              <BuyTeeButton />
              <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--navy)', fontWeight: 700, marginTop: 14 }}>
                🎁 Order early for the holidays.
              </p>
            </div>
          </section>

          <section aria-labelledby="who-h" style={{ marginBottom: 64 }}>
            <div className="section-label">Gift ideas</div>
            <h2 id="who-h" className="display" style={{ fontSize: 32, margin: '8px 0 24px' }}>Meaningful gifts for everyone on your list</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
              {FOR_WHO.map((f) => (
                <div key={f.who} style={{ background: 'var(--secondary)', borderRadius: 'var(--r-2xl)', padding: 22 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 6 }}>{f.who}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--muted)' }}>{f.why}</p>
                </div>
              ))}
            </div>
          </section>

          {wear.length > 0 && (
            <section id="wear" className="shop-section">
              <h2 className="display">Wear a blessing: tees, hoodies, hats &amp; mugs</h2>
              <div className="shop-grid">
                {wear.map((p) => <ProductCard key={p.id} p={p} />)}
              </div>
            </section>
          )}

          {read.length > 0 && (
            <section id="read" className="shop-section">
              <h2 className="display">Inspiring books by Lauren Finkelstein</h2>
              <div className="shop-grid">
                {read.map((p) => <ProductCard key={p.id} p={p} />)}
              </div>
            </section>
          )}

          <section id="honor" className="give-band" aria-label="Give in someone's honor" style={{ marginTop: 48 }}>
            <div>
              <h2 className="display">For the person who has everything</h2>
              <p>
                Give a tax-deductible gift in their honor. It helps share a patient&rsquo;s story with someone who could save their life. Save One Person is a 501(c)(3) nonprofit &middot; EIN {ORG_EIN}.
              </p>
            </div>
            <a href={donationCheckoutUrl(50) ?? '/donate'} className="btn btn-emerald give-band-btn">Give in their honor</a>
          </section>

          <section aria-labelledby="faq-h" style={{ margin: '64px auto 0', maxWidth: 760 }}>
            <h2 id="faq-h" className="display" style={{ fontSize: 30, marginBottom: 20 }}>Questions</h2>
            {FAQ.map((f) => (
              <details key={f.q} style={{ borderBottom: '1.5px solid var(--border)', padding: '16px 0' }}>
                <summary style={{ fontWeight: 700, color: 'var(--navy)', cursor: 'pointer', fontSize: 16 }}>{f.q}</summary>
                <p style={{ marginTop: 10, fontSize: 15, lineHeight: 1.7, color: 'var(--muted)' }}>{f.a}</p>
              </details>
            ))}
            <p style={{ marginTop: 28, fontSize: 15, color: 'var(--muted)' }}>
              See everything in the <Link href="/shop" style={{ color: 'var(--emerald)', fontWeight: 600 }}>Save One Person shop</Link>.
            </p>
          </section>
        </div>
      </div>
    </>
  )
}
