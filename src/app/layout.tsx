import type { Metadata } from 'next'
import { Be_Vietnam_Pro, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

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
  metadataBase: new URL('https://tosa.home.vn'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="vi"
      className={`${beVietnamPro.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink font-body">
        {children}
      </body>
    </html>
  )
}
