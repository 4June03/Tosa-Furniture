import type { Metadata } from 'next'
import { Be_Vietnam_Pro, Plus_Jakarta_Sans } from 'next/font/google'
import { sanityFetch } from '@/sanity/lib/fetch'
import { SETTINGS_QUERY } from '@/sanity/lib/queries'
import './globals.css'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tosa.home.vn'

const beVietnamPro = Be_Vietnam_Pro({
  variable: '--font-display',
  subsets: ['vietnamese', 'latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-body',
  subsets: ['vietnamese', 'latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Tosa Home — Thiết kế & thi công nội thất',
    template: '%s | Tosa Home',
  },
  description:
    'Tosa Home — đơn vị thiết kế và thi công nội thất trọn gói tại Hà Nội. Biệt thự, nhà phố, chung cư, showroom.',
  metadataBase: new URL(SITE_URL),
}

type SettingsData = {
  siteName?: string | null
  tagline?: string | null
  showroom?: {
    addressLine?: string | null
    city?: string | null
    openingHours?: string | null
  } | null
  contact?: {
    phone?: string | null
    email?: string | null
  } | null
  socialLinks?: Array<{ platform?: string | null; url?: string | null }> | null
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const settings = await sanityFetch<SettingsData>(SETTINGS_QUERY)

  const sameAs = settings?.socialLinks
    ?.map((s) => s.url)
    .filter((u): u is string => Boolean(u))

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}#business`,
    name: settings?.siteName ?? 'Tosa Home',
    description:
      settings?.tagline ??
      'Đơn vị thiết kế và thi công nội thất trọn gói tại Hà Nội.',
    url: SITE_URL,
    areaServed: 'Hà Nội',
  }

  if (settings?.contact?.phone) jsonLd.telephone = settings.contact.phone
  if (settings?.contact?.email) jsonLd.email = settings.contact.email
  if (settings?.showroom?.addressLine) {
    jsonLd.address = {
      '@type': 'PostalAddress',
      streetAddress: settings.showroom.addressLine,
      addressLocality: settings.showroom.city ?? 'Hà Nội',
      addressCountry: 'VN',
    }
  }
  if (settings?.showroom?.openingHours)
    jsonLd.openingHours = settings.showroom.openingHours
  if (sameAs?.length) jsonLd.sameAs = sameAs

  return (
    <html
      lang="vi"
      className={`${beVietnamPro.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink font-body">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
        {children}
      </body>
    </html>
  )
}
