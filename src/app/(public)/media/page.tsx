import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'In The Media',
  description: 'Save One Person in the news: TV appearances, podcasts, newspaper features, and more.',
}

const TYPE_LABELS: Record<string, string> = {
  tv: 'Television',
  interview: 'Interview',
  podcast: 'Podcast',
  video: 'Video',
  article: 'Article',
}

const TYPE_ICON: Record<string, string> = {
  tv: '📺',
  interview: '🎙️',
  podcast: '🎧',
  video: '🎬',
  article: '📰',
}

export default async function MediaPage() {
  const supabase = await createClient()
  const { data: media } = await supabase
    .from('media_entries')
    .select('*')
    .order('featured', { ascending: false })
    .order('published_date', { ascending: false })

  const grouped: Record<string, typeof media> = {}
  if (media) {
    for (const item of media) {
      if (!grouped[item.media_type]) grouped[item.media_type] = []
      grouped[item.media_type]!.push(item)
    }
  }

  const typeOrder = ['tv', 'article', 'podcast', 'interview', 'video']

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="section-label section-label-soft">Press & Media</div>
          <h1 className="display-lg">In The Media</h1>
          <p style={{ marginTop: 24, fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
            Save One Person has been featured across television, radio, podcasts, and digital media. Every mention helps reach more people who can save a life.
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          {(!media || media.length === 0) ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>
              <p style={{ fontSize: 18 }}>Media features coming soon.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
              {typeOrder.filter((t) => grouped[t]?.length).map((type) => (
                <div key={type}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32, paddingBottom: 16, borderBottom: '1.5px solid var(--border)' }}>
                    <span style={{ fontSize: 24 }}>{TYPE_ICON[type]}</span>
                    <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 32, color: 'var(--navy)' }}>{TYPE_LABELS[type]}</h2>
                    <span className="badge badge-gray">{grouped[type]!.length}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
                    {grouped[type]!.map((item) => (
                      <div key={item.id} className="hover-lift" style={{ background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-2xl)', padding: 24 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--emerald)' }}>
                            {item.outlet_name}
                          </span>
                          {item.featured && <span className="badge badge-green">Featured</span>}
                        </div>
                        <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 18, color: 'var(--navy)', lineHeight: 1.4, marginBottom: 12 }}>
                          {item.title}
                        </h3>
                        {item.published_date && (
                          <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16 }}>
                            {new Date(item.published_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </p>
                        )}
                        {item.url && (
                          <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', display: 'inline-flex', alignItems: 'center', gap: 6, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                            View {TYPE_LABELS[type]} →
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: 80, padding: 48, background: 'var(--secondary)', borderRadius: 'var(--r-3xl)', textAlign: 'center' }}>
            <div className="section-label">Media Inquiries</div>
            <h2 className="display" style={{ maxWidth: 600, margin: '16px auto 0' }}>Want to Feature Save One Person?</h2>
            <p style={{ marginTop: 24, fontSize: 17, color: 'var(--muted)', maxWidth: 560, margin: '24px auto 0' }}>
              Lauren Finkelstein is available for television, podcast, and media interviews. Contact us to discuss coverage.
            </p>
            <div style={{ marginTop: 32, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="mailto:Save1Person@aol.com?subject=Media%20Inquiry" className="btn btn-emerald" style={{ padding: '14px 28px' }}>Media Inquiry</a>
              <a href="tel:9175726385" className="btn btn-navy" style={{ padding: '14px 28px' }}>Call 917-572-6385</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
