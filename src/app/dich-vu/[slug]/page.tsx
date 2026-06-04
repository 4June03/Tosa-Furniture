import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/PageHero'
import { PortableTextBody } from '@/components/PortableTextBody'
import { ContactCta } from '@/components/sections/ContactCta'
import { sanityFetch } from '@/sanity/lib/fetch'
import {
  SERVICE_BY_SLUG_QUERY,
  SERVICE_SLUGS_QUERY,
  SETTINGS_QUERY,
} from '@/sanity/lib/queries'

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

type ServiceData = {
  _id: string
  title: string
  slug: string
  summary?: string | null
  body?: unknown
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<Array<{ slug: string }>>(SERVICE_SLUGS_QUERY)
  return slugs?.map(({ slug }) => ({ slug })) ?? []
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = await sanityFetch<ServiceData>(SERVICE_BY_SLUG_QUERY, { slug })
  if (!service) return { title: 'Dịch vụ' }
  return {
    title: service.title,
    description: service.summary ?? undefined,
  }
}

export default async function DichVuDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [settings, service] = await Promise.all([
    sanityFetch<SettingsData>(SETTINGS_QUERY),
    sanityFetch<ServiceData>(SERVICE_BY_SLUG_QUERY, { slug }),
  ])

  if (!service) notFound()

  return (
    <>
      <Nav siteName={settings?.siteName ?? 'Tosa Home'} />
      <main className="flex-1">
        <PageHero
          eyebrow="Dịch vụ"
          heading={service.title}
          subheading={service.summary}
        />

        <section className="bg-cream py-16 md:py-24">
          <Container className="max-w-[820px]">
            <Link
              href="/dich-vu"
              className="inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink"
            >
              <ArrowLeft size={16} />
              Tất cả dịch vụ
            </Link>

            <div className="mt-10">
              {service.body ? (
                <PortableTextBody value={service.body} />
              ) : (
                <p className="text-base leading-relaxed text-ink-soft md:text-lg">
                  Nội dung chi tiết về dịch vụ sẽ được cập nhật sớm. Trong lúc
                  chờ, bạn có thể liên hệ trực tiếp để được tư vấn cụ thể cho
                  công trình của mình.
                </p>
              )}
            </div>
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
