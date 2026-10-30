import type { Metadata } from 'next'
import { Inter, Fraunces } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.saveonepersonnow.org'),
  title: {
    default: 'Save One Person — One Introduction Can Save a Life',
    template: '%s | Save One Person',
  },
  description:
    'Save One Person uses the power of media, storytelling, and human connection to help people in need of living kidney donors, liver donors, bone marrow matches, and other life-saving miracles find the support they need.',
  keywords: [
    'organ donation',
    'living donor',
    'kidney donation',
    'bone marrow',
    'liver donation',
    'save a life',
    'nonprofit',
  ],
  authors: [{ name: 'Lauren Finkelstein' }],
  creator: 'Save One Person',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.saveonepersonnow.org',
    siteName: 'Save One Person',
    title: 'Save One Person — One Introduction Can Save a Life',
    description:
      'Connecting patients who need living organ donors and bone marrow matches with the people who can save their lives.',
    images: [
      {
        url: '/images/og-miracles.jpg',
        width: 1200,
        height: 630,
        alt: 'Miracles happen — Save One Person',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/og-miracles.jpg'],
    title: 'Save One Person — One Introduction Can Save a Life',
    description:
      'Connecting patients who need living organ donors and bone marrow matches with the people who can save their lives.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <head>
        <link rel="preconnect" href="https://stalwart-puffpuff-744c94.netlify.app" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body style={{ fontFamily: "'Inter', sans-serif" }}>{children}</body>
    </html>
  )
}
