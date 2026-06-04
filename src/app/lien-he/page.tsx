import type { Metadata } from 'next'
import { Phone, MapPin, Clock, Envelope, Chat } from '@phosphor-icons/react/dist/ssr'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/PageHero'
import { ContactForm } from '@/components/ContactForm'
import { sanityFetch } from '@/sanity/lib/fetch'
import { SETTINGS_QUERY } from '@/sanity/lib/queries'

type SettingsData = {
  siteName?: string | null
  tagline?: string | null
  showroom?: {
    addressLine?: string | null
    city?: string | null
    mapEmbedUrl?: string | null
    openingHours?: string | null
  } | null
  contact?: {
    phone?: string | null
    email?: string | null
    zalo?: string | null
  } | null
}

const FALLBACK_MAP =
  'https://www.google.com/maps?q=KCN+Binh+Phu+Tay+Phuong+Ha+Noi&output=embed'

export const metadata: Metadata = {
  title: 'Liên hệ',
  description:
    'Gửi yêu cầu tư vấn cho Tosa Home: thiết kế kiến trúc, thiết kế nội thất, thi công, xây dựng trọn gói.',
}

export default async function LienHePage() {
  const settings = await sanityFetch<SettingsData>(SETTINGS_QUERY)

  const phone = settings?.contact?.phone ?? '083 363 6365'
  const email = settings?.contact?.email ?? 'hello@tosahome.vn'
  const zalo = settings?.contact?.zalo
  const address = settings?.showroom?.addressLine ?? 'KCN Bình Phú, xã Tây Phương'
  const city = settings?.showroom?.city ?? 'Hà Nội'
  const hours = settings?.showroom?.openingHours ?? 'T2 – CN, 8:30 – 18:00'
  const mapSrc = settings?.showroom?.mapEmbedUrl ?? FALLBACK_MAP

  return (
    <>
      <Nav siteName={settings?.siteName ?? 'Tosa Home'} />
      <main className="flex-1">
        <PageHero
          eyebrow="Liên hệ"
          heading="Bắt đầu dự án cùng Tosa Home"
          subheading="Để lại thông tin, đội ngũ của chúng tôi sẽ gọi lại trong vòng 24 giờ làm việc. Hoặc liên hệ trực tiếp các kênh dưới đây."
        />

        <section className="bg-cream py-16 md:py-24">
          <Container>
            <div className="grid gap-12 md:grid-cols-12 md:gap-16">
              <aside className="md:col-span-4">
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
                  Liên hệ trực tiếp
                </h2>
                <ul className="mt-8 space-y-6 text-sm md:text-base">
                  <li className="flex items-start gap-4">
                    <Phone size={20} weight="fill" className="mt-1 shrink-0 text-tan" />
                    <div>
                      <div className="text-xs uppercase tracking-[0.16em] text-ink-muted">
                        Hotline
                      </div>
                      <a
                        href={`tel:${phone.replace(/\s/g, '')}`}
                        className="mt-1 block text-base font-medium text-ink transition-colors hover:text-tan-dark md:text-lg"
                      >
                        {phone}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Envelope size={20} weight="fill" className="mt-1 shrink-0 text-tan" />
                    <div>
                      <div className="text-xs uppercase tracking-[0.16em] text-ink-muted">
                        Email
                      </div>
                      <a
                        href={`mailto:${email}`}
                        className="mt-1 block text-base font-medium text-ink transition-colors hover:text-tan-dark md:text-lg"
                      >
                        {email}
                      </a>
                    </div>
                  </li>
                  {zalo ? (
                    <li className="flex items-start gap-4">
                      <Chat size={20} weight="fill" className="mt-1 shrink-0 text-tan" />
                      <div>
                        <div className="text-xs uppercase tracking-[0.16em] text-ink-muted">
                          Zalo
                        </div>
                        <a
                          href={`https://zalo.me/${zalo.replace(/\s/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1 block text-base font-medium text-ink transition-colors hover:text-tan-dark md:text-lg"
                        >
                          {zalo}
                        </a>
                      </div>
                    </li>
                  ) : null}
                  <li className="flex items-start gap-4">
                    <MapPin size={20} weight="fill" className="mt-1 shrink-0 text-tan" />
                    <div>
                      <div className="text-xs uppercase tracking-[0.16em] text-ink-muted">
                        Showroom
                      </div>
                      <p className="mt-1 text-base text-ink md:text-lg">
                        {address}, {city}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Clock size={20} weight="fill" className="mt-1 shrink-0 text-tan" />
                    <div>
                      <div className="text-xs uppercase tracking-[0.16em] text-ink-muted">
                        Giờ làm việc
                      </div>
                      <p className="mt-1 text-base text-ink md:text-lg">{hours}</p>
                    </div>
                  </li>
                </ul>
              </aside>

              <div className="md:col-span-8">
                <ContactForm />
              </div>
            </div>
          </Container>
        </section>

        <section className="border-t border-line bg-paper">
          <div className="relative aspect-[21/9] w-full bg-line">
            <iframe
              src={mapSrc}
              title="Bản đồ showroom Tosa Home"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full"
              allowFullScreen
            />
          </div>
        </section>
      </main>
      <Footer
        siteName={settings?.siteName ?? 'Tosa Home'}
        tagline={settings?.tagline}
        contact={settings?.contact}
        showroom={settings?.showroom}
      />
    </>
  )
}
