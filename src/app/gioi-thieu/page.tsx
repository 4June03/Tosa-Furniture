import Image from 'next/image'
import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/PageHero'
import { PortableTextBody } from '@/components/PortableTextBody'
import { ContactCta } from '@/components/sections/ContactCta'
import { sanityFetch } from '@/sanity/lib/fetch'
import { ABOUT_PAGE_QUERY, SETTINGS_QUERY } from '@/sanity/lib/queries'

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

type AboutData = {
  heroHeading?: string | null
  heroSubheading?: string | null
  heroImage?: {
    asset?: { url?: string; metadata?: { lqip?: string } } | null
    alt?: string | null
  } | null
  foundedYear?: number | null
  highlights?: Array<{ key?: string; value: string; label: string }> | null
  storyHeading?: string | null
  storyBody?: unknown
  missionStatement?: string | null
  teamPhoto?: {
    asset?: { url?: string; metadata?: { lqip?: string } } | null
    alt?: string | null
  } | null
  workshopGallery?: Array<{
    _key?: string
    asset?: { url?: string; metadata?: { lqip?: string } } | null
    alt?: string | null
  }> | null
  seoTitle?: string | null
  seoDescription?: string | null
}

export async function generateMetadata(): Promise<Metadata> {
  const about = await sanityFetch<AboutData>(ABOUT_PAGE_QUERY)
  return {
    title: about?.seoTitle ?? 'Giới thiệu',
    description:
      about?.seoDescription ??
      about?.heroSubheading ??
      'Câu chuyện và đội ngũ Tosa Home.',
  }
}

export default async function GioiThieuPage() {
  const [settings, about] = await Promise.all([
    sanityFetch<SettingsData>(SETTINGS_QUERY),
    sanityFetch<AboutData>(ABOUT_PAGE_QUERY),
  ])

  const heading = about?.heroHeading ?? 'Một thập kỉ kiến tạo không gian sống Việt'
  const subheading =
    about?.heroSubheading ??
    'Tosa Home khởi đầu từ một xưởng nội thất nhỏ tại Hà Nội. Hôm nay, chúng tôi vận hành showroom, xưởng sản xuất và đội thi công riêng để đồng hành gia chủ ở mọi khâu.'

  const heroImage = about?.heroImage?.asset?.url ?? 'https://picsum.photos/seed/tosa-about-hero/1800/1000'
  const heroAlt = about?.heroImage?.alt ?? 'Showroom Tosa Home Hà Nội'

  const highlights = about?.highlights?.length
    ? about.highlights
    : [
        { value: '12+', label: 'Năm kinh nghiệm' },
        { value: '200+', label: 'Dự án hoàn thành' },
        { value: '180+', label: 'Khách hàng tin tưởng' },
        { value: '1', label: 'Showroom tại Hà Nội' },
      ]

  const teamPhoto = about?.teamPhoto?.asset?.url ?? 'https://picsum.photos/seed/tosa-team-portrait/1400/1000'
  const teamAlt = about?.teamPhoto?.alt ?? 'Đội ngũ Tosa Home'

  const gallery = about?.workshopGallery?.length
    ? about.workshopGallery
    : [
        { _key: 'w1', asset: { url: 'https://picsum.photos/seed/tosa-workshop-1/900/1100' }, alt: 'Xưởng nội thất' },
        { _key: 'w2', asset: { url: 'https://picsum.photos/seed/tosa-workshop-2/900/1100' }, alt: 'Xưởng nội thất' },
        { _key: 'w3', asset: { url: 'https://picsum.photos/seed/tosa-workshop-3/900/1100' }, alt: 'Xưởng nội thất' },
        { _key: 'w4', asset: { url: 'https://picsum.photos/seed/tosa-workshop-4/900/1100' }, alt: 'Xưởng nội thất' },
      ]

  return (
    <>
      <Nav siteName={settings?.siteName ?? 'Tosa Home'} />
      <main className="flex-1">
        <PageHero eyebrow="Giới thiệu" heading={heading} subheading={subheading} />

        <section className="bg-cream">
          <div className="relative aspect-[16/7] w-full bg-line">
            <Image
              src={heroImage}
              alt={heroAlt}
              fill
              sizes="100vw"
              priority
              placeholder={about?.heroImage?.asset?.metadata?.lqip ? 'blur' : undefined}
              blurDataURL={about?.heroImage?.asset?.metadata?.lqip ?? undefined}
              className="object-cover"
            />
          </div>
        </section>

        <section className="border-t border-line bg-cream-warm py-12 md:py-16">
          <Container>
            <ul className="grid grid-cols-2 gap-y-8 md:grid-cols-4 md:divide-x md:divide-line">
              {highlights.map((h, i) => (
                <li
                  key={h.key ?? `${h.label}-${i}`}
                  className="flex flex-col items-center text-center md:px-8"
                >
                  <span className="font-display text-3xl font-bold tracking-tight text-ink md:text-5xl">
                    {h.value}
                  </span>
                  <span className="mt-2 text-sm tracking-[0.05em] text-ink-muted">
                    {h.label}
                  </span>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <section className="border-t border-line bg-paper py-20 md:py-28">
          <Container>
            <div className="grid gap-12 md:grid-cols-12 md:gap-16">
              <div className="md:col-span-5">
                <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-ink md:text-4xl">
                  {about?.storyHeading ?? 'Câu chuyện chúng tôi'}
                </h2>
                {about?.missionStatement ? (
                  <p className="mt-6 text-base italic leading-relaxed text-ink-soft md:text-lg">
                    {about.missionStatement}
                  </p>
                ) : (
                  <p className="mt-6 text-base italic leading-relaxed text-ink-soft md:text-lg">
                    Sứ mệnh của chúng tôi là tạo ra những không gian sống vừa
                    đẹp, vừa bền, vừa thật sự thuộc về gia chủ.
                  </p>
                )}
              </div>

              <div className="md:col-span-7">
                {about?.storyBody ? (
                  <PortableTextBody value={about.storyBody} />
                ) : (
                  <div className="space-y-5 text-base leading-relaxed text-ink-soft md:text-lg">
                    <p>
                      Tosa Home được thành lập năm {about?.foundedYear ?? 2013}{' '}
                      bởi một nhóm kiến trúc sư và nghệ nhân mộc tại Hà Nội. Bắt
                      đầu từ một xưởng nhỏ chuyên đóng nội thất gỗ tự nhiên,
                      chúng tôi mở rộng dần sang thiết kế kiến trúc và thi công
                      trọn gói.
                    </p>
                    <p>
                      Hơn một thập kỉ sau, đội ngũ của chúng tôi gồm hơn 30
                      kiến trúc sư, kĩ sư và thợ lành nghề, làm việc cùng nhau
                      trên các dự án biệt thự, nhà phố và chung cư trên khắp
                      miền Bắc.
                    </p>
                    <p>
                      Chúng tôi giữ một triết lý đơn giản: ít đồ hơn, chất liệu
                      thật hơn, công năng đặt trước thẩm mỹ. Mỗi không gian phải
                      kể câu chuyện của người ở, không phải catalog của nhà
                      thiết kế.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </section>

        <section className="border-t border-line bg-cream py-20 md:py-28">
          <Container>
            <div className="grid gap-12 md:grid-cols-12 md:items-center md:gap-16">
              <div className="md:col-span-7">
                <div className="relative aspect-[7/5] w-full overflow-hidden bg-line">
                  <Image
                    src={teamPhoto}
                    alt={teamAlt}
                    fill
                    sizes="(min-width: 768px) 60vw, 100vw"
                    placeholder={about?.teamPhoto?.asset?.metadata?.lqip ? 'blur' : undefined}
                    blurDataURL={about?.teamPhoto?.asset?.metadata?.lqip ?? undefined}
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="md:col-span-5">
                <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-ink md:text-4xl">
                  Đội ngũ làm nên Tosa Home
                </h2>
                <p className="mt-6 text-base leading-relaxed text-ink-soft md:text-lg">
                  Kiến trúc sư từ các trường Kiến trúc Hà Nội, kỹ sư xây dựng,
                  hoạ sĩ và nghệ nhân mộc cùng làm việc trên mỗi dự án. Một đầu
                  mối duy nhất từ ý tưởng tới bàn giao.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="border-t border-line bg-paper py-20 md:py-28">
          <Container>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-ink md:text-4xl">
              Xưởng sản xuất riêng tại Hà Nội
            </h2>
            <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-ink-soft md:text-lg">
              Toàn bộ nội thất gỗ được sản xuất tại xưởng riêng của chúng tôi,
              cho phép kiểm soát chất lượng từng chi tiết.
            </p>
            <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
              {gallery.map((img, i) => {
                const url = img.asset?.url
                if (!url) return null
                return (
                  <li key={img._key ?? i} className="relative aspect-[3/4] w-full overflow-hidden bg-line">
                    <Image
                      src={url}
                      alt={img.alt ?? 'Xưởng nội thất Tosa Home'}
                      fill
                      sizes="(min-width: 768px) 25vw, 50vw"
                      placeholder={img.asset?.metadata?.lqip ? 'blur' : undefined}
                      blurDataURL={img.asset?.metadata?.lqip ?? undefined}
                      className="object-cover"
                    />
                  </li>
                )
              })}
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
