import Image from 'next/image'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'

type AboutSnippetProps = {
  heroHeading?: string | null
  heroSubheading?: string | null
}

const FALLBACK_IMAGE = 'https://picsum.photos/seed/tosa-team/1400/1000'

export function AboutSnippet({
  heroHeading,
  heroSubheading,
}: AboutSnippetProps) {
  const heading = heroHeading ?? 'Xưởng riêng, kiến trúc sư riêng, một đầu mối'
  const subheading =
    heroSubheading ??
    'Tosa Home khởi đầu từ một xưởng nội thất nhỏ ở Hà Nội. Hơn một thập kỉ sau, chúng tôi vận hành showroom, xưởng sản xuất và đội thi công riêng — giúp gia chủ kiểm soát chất lượng và chi phí ở mọi khâu.'

  return (
    <section className="border-t border-line bg-paper py-20 md:py-28">
      <Container>
        <div className="grid gap-12 md:grid-cols-12 md:items-center md:gap-16">
          <div className="md:col-span-6">
            <div className="relative aspect-[7/5] w-full overflow-hidden bg-line">
              <Image
                src={FALLBACK_IMAGE}
                alt="Đội ngũ Tosa Home tại xưởng nội thất Hà Nội"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-6">
            <div className="text-xs uppercase tracking-[0.18em] text-tan">
              Về Tosa Home
            </div>
            <h2 className="mt-3 max-w-[18ch] font-display text-3xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
              {heading}
            </h2>
            <p className="mt-6 max-w-[55ch] text-base leading-relaxed text-ink-soft md:text-lg">
              {subheading}
            </p>

            <div className="mt-9">
              <Button href="/gioi-thieu" variant="ghost" size="lg">
                Tìm hiểu thêm
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
