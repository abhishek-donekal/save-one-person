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
    .from('blog_posts')
    .select('seo_title, seo_description, title, excerpt')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  return {
    title: data?.seo_title || data?.title,
    description: data?.seo_description || data?.excerpt || undefined,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!post) notFound()

  const sections = post.content.split('\n\n').filter(Boolean)

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          {post.category && <div className="section-label section-label-soft">{post.category}</div>}
          <h1 className="display-lg" style={{ fontSize: 'clamp(32px,5vw,64px)', marginTop: 8 }}>{post.title}</h1>
          <p style={{ marginTop: 16, fontSize: 15, color: 'rgba(255,255,255,0.55)' }}>
            By {post.author} &middot; {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="container-md">
          {post.featured_image_url && (
            <div style={{ borderRadius: 'var(--r-3xl)', overflow: 'hidden', marginBottom: 48, boxShadow: 'var(--shadow-soft)' }}>
              <Image src={post.featured_image_url} alt={post.title} width={896} height={480} style={{ width: '100%', height: 480, objectFit: 'cover' }} />
            </div>
          )}

          <div style={{ fontSize: 18, lineHeight: 1.85, color: 'rgba(28,32,41,0.85)' }}>
            {sections.map((section: string, i: number) => {
              if (section.startsWith('## ')) {
                return <h2 key={i} style={{ fontFamily: "'Fraunces', serif", fontSize: 28, color: 'var(--navy)', marginTop: 48, marginBottom: 16 }}>{section.slice(3)}</h2>
              }
              if (section.startsWith('### ')) {
                return <h3 key={i} style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: 'var(--navy)', marginTop: 32, marginBottom: 12 }}>{section.slice(4)}</h3>
              }
              if (section.startsWith('- ')) {
                const items = section.split('\n').filter((l) => l.startsWith('- '))
                return (
                  <ul key={i} style={{ marginTop: 16, marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {items.map((item, j) => (
                      <li key={j} style={{ display: 'flex', gap: 12 }}>
                        <span style={{ color: 'var(--emerald)', marginTop: 4 }}>•</span>
                        <span dangerouslySetInnerHTML={{ __html: item.slice(2).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
                      </li>
                    ))}
                  </ul>
                )
              }
              return <p key={i} style={{ marginTop: 24 }} dangerouslySetInnerHTML={{ __html: section.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
            })}
          </div>

          {post.tags?.length > 0 && (
            <div style={{ marginTop: 48, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {post.tags.map((tag: string) => (
                <span key={tag} className="badge badge-gray">{tag}</span>
              ))}
            </div>
          )}

          <div style={{ marginTop: 48, paddingTop: 40, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <Link href="/blog" style={{ fontSize: 14, fontWeight: 600, color: 'var(--muted)' }}>← All Posts</Link>
            <a href="mailto:Save1Person@aol.com" className="btn btn-emerald" style={{ padding: '10px 20px', fontSize: 13 }}>Contact Lauren</a>
          </div>
        </div>
      </div>
    </>
  )
}
