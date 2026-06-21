import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Success Stories',
  description: 'Read inspiring stories of patients who found living donors and life-saving matches through Save One Person.',
}

export default async function SuccessStoriesPage() {
  const supabase = await createClient()
  const { data: stories } = await supabase
    .from('success_stories')
    .select('id, title, slug, patient_name, story_text, outcome, image_url, featured')
    .eq('published', true)
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false })

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="section-label section-label-soft">Real People. Real Miracles.</div>
          <h1 className="display-lg">Success Stories</h1>
          <p style={{ marginTop: 24, fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
            Behind every statistic is a human being. These are the stories of people who found hope, found their match, and got a second chance at life — because someone heard their story.
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          {(!stories || stories.length === 0) ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>
              <p style={{ fontSize: 18 }}>Stories coming soon. Check back soon for updates.</p>
            </div>
          ) : (
            <div className="card-grid">
              {stories.map((story) => (
                <div key={story.id} className="story-card">
                  <div className="story-card-img">
                    <Image
                      src={story.image_url || 'https://stalwart-puffpuff-744c94.netlify.app/assets/hero-hands-f9VxfxAk.jpg'}
                      alt={story.patient_name}
                      width={400}
                      height={200}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="story-card-body">
                    {story.featured && (
                      <div style={{ marginBottom: 8 }}>
                        <span className="badge badge-green">Featured</span>
                      </div>
                    )}
                    <h3>{story.patient_name}</h3>
                    <p>
                      {story.story_text.slice(0, 140).trim()}…
                    </p>
                    {story.outcome && (
                      <p style={{ fontSize: 13, color: 'var(--emerald)', fontWeight: 600, marginBottom: 16 }}>
                        {story.outcome.slice(0, 100)}
                      </p>
                    )}
                    <Link href={`/success-stories/${story.slug}`} className="btn btn-navy" style={{ padding: '10px 20px', fontSize: 13 }}>
                      Read Story
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: 80, padding: 48, background: 'var(--secondary)', borderRadius: 'var(--r-3xl)', textAlign: 'center' }}>
            <div className="section-label">Help Someone Find Their Story</div>
            <h2 className="display" style={{ maxWidth: 600, margin: '16px auto 0' }}>Know Someone Who Needs Help?</h2>
            <p style={{ marginTop: 24, fontSize: 17, color: 'var(--muted)', maxWidth: 560, margin: '24px auto 0' }}>
              If you or someone you know needs a living kidney donor, liver donor, bone marrow match, or other life-saving miracle, contact Lauren Finkelstein to get started.
            </p>
            <div style={{ marginTop: 32, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="mailto:Save1Person@aol.com" className="btn btn-emerald" style={{ padding: '14px 28px' }}>Email Lauren</a>
              <a href="tel:9175726385" className="btn btn-navy" style={{ padding: '14px 28px' }}>Call 917-572-6385</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
