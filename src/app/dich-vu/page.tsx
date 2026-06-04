import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/PageHero'
import { ContactCta } from '@/components/sections/ContactCta'
import { sanityFetch } from '@/sanity/lib/fetch'
import { ALL_SERVICES_QUERY, SETTINGS_QUERY } from '@/sanity/lib/queries'

type SettingsData = {
  siteName?: string | null
  tagline?: string | null
  showroom?: {
    addressLine?: string | null
    city?: string | null
    mapEmbedUrl?: string | null
    openingHours?: string | null
  } | null
  contact?: { phone?: string | null; email?: string | null } | null
}

type ServiceItem = {
  _id: string
  title: string
  slug: string
  summary?: string | null
}

const FALLBACK_SERVICES: ServiceItem[] = [
  {
    _id: 's-1',
    title: 'Thiết kế kiến trúc',
    slug: 'thiet-ke-kien-truc',
    summary:
      'Bố cục công năng, kết cấu, hệ thống điện nước, mặt đứng và phong cách kiến trúc cho biệt thự, nhà phố, văn phòng.',
  },
  {
    _id: 's-2',
    title: 'Thiết kế nội thất',
    slug: 'thiet-ke-noi-that',
    summary:
      'Concept không gian, lựa chọn vật liệu, ánh sáng và đồ nội thất phù hợp gu thẩm mỹ và ngân sách của gia chủ.',
  },
  {
    _id: 's-3',
    title: 'Xây nhà trọn gói',
    slug: 'xay-nha-tron-goi',
    summary:
      'Một đầu mối duy nhất từ thiết kế đến chìa khoá trao tay: kiểm soát chi phí, tiến độ và chất lượng vật tư.',
  },
  {
    _id: 's-4',
    title: 'Thi công nội thất',
    slug: 'thi-cong-noi-that',
    summary:
      'Sản xuất tại xưởng riêng và lắp đặt tại công trình, đảm bảo bám sát thiết kế và bàn giao đúng tiến độ.',
  },
  {
    _id: 's-5',
    title: 'Giám sát xây dựng',
    slug: 'giam-sat-xay-dung',
    summary:
      'Kỹ sư thường trú tại công trình kiểm tra vật tư, quy trình và nghiệm thu theo từng giai đoạn.',
  },
]

export const metadata: Metadata = {
  title: 'Dịch vụ',
  description: 'Năm dịch vụ trọn gói của Tosa Home: thiết kế kiến trúc, thiết kế nội thất, xây nhà, thi công, giám sát.',
}

export default async function DichVuIndexPage() {
  const [settings, services] = await Promise.all([
    sanityFetch<SettingsData>(SETTINGS_QUERY),
    sanityFetch<ServiceItem[]>(ALL_SERVICES_QUERY),
  ])

  const items = services?.length ? services : FALLBACK_SERVICES

  return (
    <>
      <Nav siteName={settings?.siteName ?? 'Tosa Home'} />
      <main className="flex-1">
        <PageHero
          eyebrow="Dịch vụ"
          heading="Năm dịch vụ, một đầu mối"
          subheading="Các dịch vụ có thể đặt độc lập hoặc kết hợp linh hoạt theo nhu cầu công trình của bạn."
        />

        <section className="bg-cream py-16 md:py-24">
          <Container>
            <ul>
              {items.map((s, i) => (
                <li
                  key={s._id}
                  className={`group ${i === 0 ? 'border-t border-line' : ''} border-b border-line`}
                >
                  <Link
                    href={`/dich-vu/${s.slug}`}
                    className="flex items-start gap-6 py-8 transition-colors hover:bg-cream-warm md:gap-10 md:py-12"
                  >
                    <span className="font-display text-base font-medium text-tan md:text-lg">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                        {s.title}
                      </h3>
                      {s.summary ? (
                        <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-ink-soft md:text-base">
                          {s.summary}
                        </p>
                      ) : null}
                    </div>
                    <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center border border-line text-ink transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-cream md:h-12 md:w-12">
                      <ArrowRight size={18} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <ContactCta contact={settings?.contact} showroom={settings?.showroom} />
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
