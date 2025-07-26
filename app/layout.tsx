import 'css/tailwind.css'
import { GoogleTagManager } from '@next/third-parties/google'

import { Outfit } from 'next/font/google'
import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import Header from '@/components/Header'
import SectionContainer from '@/components/SectionContainer'
import Footer from '@/components/Footer'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from './theme-providers'
import { Metadata } from 'next'
import Script from 'next/script'

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={siteMetadata.language}
      className={`${outfit.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      {/* Core favicons */}
      <link rel="icon" href="/static/favicons/favicon.ico" type="image/x-icon" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="48x48" href="/static/favicons/favicon-48x48.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/static/favicons/favicon-96x96.png" />

      {/* Apple Touch Icons */}
      <link rel="apple-touch-icon" sizes="180x180" href="/static/favicons/apple-touch-icon.png" />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/static/favicons/apple-touch-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/static/favicons/apple-touch-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/static/favicons/apple-touch-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/static/favicons/apple-touch-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="/static/favicons/apple-touch-icon-76x76.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="/static/favicons/apple-touch-icon-72x72.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href="/static/favicons/apple-touch-icon-60x60.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href="/static/favicons/apple-touch-icon-57x57.png"
      />

      {/* Android/Chrome */}
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/static/favicons/android-chrome-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="512x512"
        href="/static/favicons/android-chrome-512x512.png"
      />

      {/* Web App Manifest */}
      <link rel="manifest" href="/static/favicons/manifest.json" />

      {/* Windows */}
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-TileImage" content="/static/favicons/mstile-144x144.png" />
      <meta name="msapplication-config" content="/static/favicons/browserconfig.xml" />

      {/* Theme colors */}
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fefdfb" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0f172a" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <body className="bg-gradient-mesh bg-gradient-subtle text-slate-900 antialiased transition-all duration-500 dark:bg-gradient-mesh-dark dark:bg-gradient-subtle-dark dark:text-slate-100">
        <Script
          data-goatcounter="https://arjunraov5.goatcounter.com/count"
          async
          src="//gc.zgo.at/count.js"
        ></Script>
        <ThemeProviders>
          <GoogleTagManager gtmId="G-29Z9K4REX1" />
          <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
          <SectionContainer>
            <div className="flex min-h-screen flex-col font-sans">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </SectionContainer>
        </ThemeProviders>
      </body>
    </html>
  )
}
