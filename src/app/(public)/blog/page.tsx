import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { STATIC_BLOG_POSTS } from '@/lib/blogPosts'

export const metadata: Metadata = {
  title: 'Living Donor Stories & Kidney Donation Blog',
  description:
    'Real stories of people who need a living kidney donor, how living donation works, paired exchange, and how sharing a story can save a life.',
  alternates: { canonical: '/blog' },
}

type ListPost = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  featured_image_url: string | null
  author: string | null
  category: string | null
  published_at: string | null
  created_at: string | null
}

export default async function BlogPage() {
  let dbPosts: ListPost[] = []
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, featured_image_url, author, category, published_at, created_at')
      .eq('published', true)
      .order('published_at', { ascending: false })
    dbPosts = (data as ListPost[] | null) || []
  } catch {
    // Show the posts stored in code even if the database is unavailable.
  }

  const staticPosts: ListPost[] = STATIC_BLOG_POSTS.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    featured_image_url: p.featured_image_url,
    author: p.author,
    category: p.category,
    published_at: p.published_at,
    created_at: p.published_at,
  }))
  const dbSlugs = new Set(dbPosts.map((p) => p.slug))
  const posts = [...dbPosts, ...staticPosts.filter((p) => !dbSlugs.has(p.slug))].sort(
    (a, b) =>
      new Date(b.published_at || b.created_at || 0).getTime() - new Date(a.published_at || a.created_at || 0).getTime()
  )

  if (posts.length === 0) {
    notFound()
  }

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="section-label section-label-soft">Education & Stories</div>
          <h1 className="display-lg">Stories &amp; Living Donation</h1>
          <p style={{ marginTop: 24, fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
            Insights, education, and stories about organ donation, living donors, and building a world where no one waits alone.
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="card-grid">
            {posts.map((post) => (
                <div key={post.id} className="story-card">
                  <div className="story-card-img">
                    <Image
                      src={post.featured_image_url || 'https://kglvtgohmfulykkspfmj.supabase.co/storage/v1/object/public/site-assets/legacy/assets/hero-hands-f9VxfxAk.jpg'}
                      alt={post.title}
                      width={400}
                      height={200}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="story-card-body">
                    <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                      {post.category && <span className="badge badge-blue">{post.category}</span>}
                    </div>
                    <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
                    {post.excerpt && <p>{post.excerpt}</p>}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
                      <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                        {new Date(post.published_at || post.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <Link href={`/blog/${post.slug}`} className="btn btn-navy" style={{ padding: '8px 16px', fontSize: 12 }}>
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}
