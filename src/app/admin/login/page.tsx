'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }
    router.push('/admin')
    router.refresh()
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--grad-navy)', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--grad-emerald)', display: 'grid', placeItems: 'center', fontSize: 24, color: 'white', fontFamily: "'Fraunces', serif", fontWeight: 600, margin: '0 auto 16px' }}>
            S
          </div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, color: 'white', marginBottom: 4 }}>Save One Person</h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Admin CMS</p>
        </div>

        <div style={{ background: 'white', borderRadius: 'var(--r-3xl)', padding: 40, boxShadow: '0 24px 64px rgba(0,0,0,0.3)' }}>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, color: 'var(--navy)', marginBottom: 4 }}>Sign In</h2>
          <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 32 }}>Enter your admin credentials to continue.</p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="form-field" style={{ margin: 0 }}>
              <label className="form-label" htmlFor="email">Email Address</label>
              <input
                id="email"
                className="form-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
            <div className="form-field" style={{ margin: 0 }}>
              <label className="form-label" htmlFor="password">Password</label>
              <input
                id="password"
                className="form-input"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>
            {error && (
              <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: 'var(--r-xl)', padding: '12px 16px', fontSize: 14, color: '#991b1b' }}>
                {error}
              </div>
            )}
            <button
              type="submit"
              className="btn btn-emerald"
              disabled={loading}
              style={{ justifyContent: 'center', padding: '14px 24px', fontSize: 14, opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Signing in…' : 'Sign In to Admin'}
            </button>
          </form>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Link href="/" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', transition: 'color 200ms' }}>
            ← Back to saveonepersonnow.org
          </Link>
        </div>
      </div>
    </div>
  )
}
