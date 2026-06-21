import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('success_stories')
    .select('seo_title, seo_description, patient_name')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  return {
    title: data?.seo_title || `${data?.patient_name}'s Story`,
    description: data?.seo_description || undefined,
  }
}

export default async function SuccessStoryPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: story } = await supabase
    .from('success_stories')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!story) notFound()

  const paragraphs = story.story_text.split('\n\n').filter(Boolean)

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="section-label section-label-soft">Success Story</div>
          <h1 className="display-lg" style={{ fontSize: 'clamp(36px,6vw,72px)' }}>{story.title}</h1>
          <p style={{ marginTop: 16, fontSize: 18, color: 'rgba(255,255,255,0.65)' }}>
            {story.patient_name}
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="container-md">
          {story.image_url && (
            <div style={{ borderRadius: 'var(--r-3xl)', overflow: 'hidden', marginBottom: 48, boxShadow: 'var(--shadow-soft)' }}>
              <Image
                src={story.image_url}
                alt={story.patient_name}
                width={896}
                height={480}
                style={{ width: '100%', height: 480, objectFit: 'cover' }}
              />
            </div>
          )}

          {story.outcome && (
            <div style={{ background: '#dcfce7', border: '1px solid #bbf7d0', borderRadius: 'var(--r-2xl)', padding: '20px 24px', marginBottom: 40, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <p style={{ fontSize: 16, color: '#166534', lineHeight: 1.6 }}><strong>Outcome:</strong> {story.outcome}</p>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontSize: 18, lineHeight: 1.85, color: 'rgba(28,32,41,0.85)' }}>
            {paragraphs.map((para: string, i: number) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div style={{ marginTop: 64, paddingTop: 48, borderTop: '1px solid var(--border)', display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'space-between' }}>
            <Link href="/success-stories" style={{ fontSize: 14, fontWeight: 600, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
              ← All Stories
            </Link>
            <div style={{ display: 'flex', gap: 8 }}>
              <a href="mailto:Save1Person@aol.com" className="btn btn-emerald" style={{ padding: '10px 20px', fontSize: 13 }}>Share Your Story</a>
              <a
                href={`https://save-one-person.myshopify.com/collections/all/products/save-one-person-tax-deductible-donation`}
                className="btn btn-navy"
                style={{ padding: '10px 20px', fontSize: 13 }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Donate
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
