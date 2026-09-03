import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

// NOTE for redirects agent: add a permanent redirect /blog → /success-stories in
// next.config.ts. Until the blog_posts table has published rows, /blog calls
// notFound() (returns 404); the redirect gives visitors a graceful destination
// instead. Remove/keep as desired once posts are published.

export const metadata: Metadata = {
  title: 'Blog — Organ Donation Education & Stories',
  description: 'Learn about organ donation, living donors, bone marrow matching, and how Save One Person is making a difference.',
}

export default async function BlogPage() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, featured_image_url, author, category, published_at, created_at')
    .eq('published', true)
    .order('published_at', { ascending: false })

  // No published posts yet: return a 404 rather than showing a bare placeholder,
  // so the route never looks unfinished. The dynamic listing below runs unchanged
  // once posts exist.
  if (!posts || posts.length === 0) {
    notFound()
  }

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="section-label section-label-soft">Education & Stories</div>
          <h1 className="display-lg">Blog</h1>
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
                    <h3>{post.title}</h3>
                    {post.excerpt && <p>{post.excerpt}</p>}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
                      <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                        {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
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
