import Image from 'next/image'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'

type HeroSlide = {
  key?: string
  heading?: string | null
  subheading?: string | null
  ctaLabel?: string | null
  ctaHref?: string | null
  image?: {
    asset?: { url?: string; metadata?: { lqip?: string } } | null
    alt?: string | null
  } | null
}

const FALLBACK_IMAGE = 'https://picsum.photos/seed/tosa-home-hero/1400/1600'

export function Hero({ slide }: { slide?: HeroSlide | null }) {
  const heading = slide?.heading ?? 'Không gian sống đúng chuẩn thiết kế'
  const subheading =
    slide?.subheading ??
    'Tosa Home thiết kế và thi công trọn gói biệt thự, nhà phố, chung cư tại Hà Nội. Đội ngũ kiến trúc sư đồng hành từ ý tưởng tới bàn giao.'
  const ctaLabel = slide?.ctaLabel ?? 'Nhận tư vấn'
  const ctaHref = slide?.ctaHref ?? '/lien-he'
  const imageUrl = slide?.image?.asset?.url ?? FALLBACK_IMAGE
  const lqip = slide?.image?.asset?.metadata?.lqip
  const alt = slide?.image?.alt ?? 'Không gian nội thất Tosa Home'

  return (
    <section className="relative overflow-hidden border-b border-line bg-cream">
      <Container className="pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="grid gap-10 md:grid-cols-12 md:items-center md:gap-12">
          <div className="md:col-span-7">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-ink-muted">
              <span className="h-px w-8 bg-tan" aria-hidden />
              Thiết kế & thi công nội thất
            </div>

            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink md:text-6xl lg:text-[68px]">
              {heading}
            </h1>

            <p className="mt-6 max-w-[58ch] text-base leading-relaxed text-ink-soft md:text-lg">
              {subheading}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button href={ctaHref} size="lg" variant="primary">
                {ctaLabel}
                <ArrowRight weight="regular" size={18} />
              </Button>
              <Button href="/du-an" size="lg" variant="ghost">
                Xem dự án
              </Button>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-line">
              <Image
                src={imageUrl}
                alt={alt}
                fill
                priority
                placeholder={lqip ? 'blur' : undefined}
                blurDataURL={lqip ?? undefined}
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/10" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
