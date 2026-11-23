import { seoTitle } from '@/lib/seoTitle'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getStaticBlogPost } from '@/lib/blogPosts'
import HowYouCanHelp from '@/components/ui/HowYouCanHelp'
import DonateCallout from '@/components/ui/DonateCallout'

const SITE_URL = 'https://www.saveonepersonnow.org'

// **bold** and [text](url) inside a paragraph or list item.
function inline(text: string) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(((?:\/|https:\/\/|mailto:)[^)\s]*)\)/g, (_m, label: string, href: string) => {
      const external = href.startsWith('https://')
      return `<a href="${href}" style="color:var(--emerald);font-weight:600;text-decoration:underline"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${label}</a>`
    })
}

async function getDbPost(slug: string, columns: string) {
  try {
    const supabase = await createClient()
    const { data } = await supabase.from('blog_posts').select(columns).eq('slug', slug).eq('published', true).single()
    return (data as unknown) as Record<string, unknown> | null
  } catch {
    return null
  }
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const sp = getStaticBlogPost(slug)
  if (sp) {
    const url = `${SITE_URL}/blog/${sp.slug}`
    return {
      title: seoTitle(sp.seo_title),
      description: sp.seo_description,
      alternates: { canonical: url },
      openGraph: {
        type: 'article',
        title: sp.seo_title,
        description: sp.seo_description,
        url,
        images: [sp.featured_image_url],
        publishedTime: sp.published_at,
      },
      twitter: { card: 'summary_large_image', title: sp.seo_title, description: sp.seo_description, images: [sp.featured_image_url] },
    }
  }
  const data = (await getDbPost(slug, 'seo_title, seo_description, title, excerpt')) as
    | { seo_title?: string; seo_description?: string; title?: string; excerpt?: string }
    | null

  return {
    title: seoTitle(data?.seo_title || data?.title),
    description: data?.seo_description || data?.excerpt || undefined,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const staticPost = getStaticBlogPost(slug)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const post: any = staticPost || (await getDbPost(slug, '*'))

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
              <Image src={post.featured_image_url} alt={post.image_alt || post.title} width={896} height={480} priority style={{ width: '100%', height: 'clamp(240px, 50vw, 480px)', objectFit: 'cover', objectPosition: 'center 30%' }} />
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
                        <span dangerouslySetInnerHTML={{ __html: inline(item.slice(2)) }} />
                      </li>
                    ))}
                  </ul>
                )
              }
              return <p key={i} style={{ marginTop: 24 }} dangerouslySetInnerHTML={{ __html: inline(section) }} />
            })}
          </div>

          {post.tags?.length > 0 && (
            <div style={{ marginTop: 48, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {post.tags.map((tag: string) => (
                <span key={tag} className="badge badge-gray">{tag}</span>
              ))}
            </div>
          )}

          <HowYouCanHelp
            shareUrl={post.share_url || `${SITE_URL}/blog/${post.slug}`}
            shareText={post.share_text || post.title}
            showDonate={post.show_donate !== false}
          />

          {Array.isArray(post.related) && post.related.length > 0 && (
            <nav aria-label="Related pages" style={{ marginTop: 40 }}>
              <div className="section-label">Keep Reading</div>
              <ul style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {post.related.map((r: { href: string; label: string }) => (
                  <li key={r.href}>
                    <Link href={r.href} style={{ color: 'var(--emerald)', fontWeight: 600 }}>{r.label} →</Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div style={{ marginTop: 48, paddingTop: 40, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <Link href="/blog" style={{ fontSize: 14, fontWeight: 600, color: 'var(--muted)' }}>← All Posts</Link>
            <a href="mailto:Save1Person@aol.com" className="btn btn-emerald" style={{ padding: '10px 20px', fontSize: 13 }}>Contact Lauren</a>
          </div>
        </div>
      </div>
      {post.show_donate !== false && <DonateCallout />}
    </>
  )
}
