import Image from 'next/image'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { Play } from '@phosphor-icons/react/dist/ssr'

type Highlight = { key?: string; value: string; label: string }

type AboutSnippetProps = {
  heroHeading?: string | null
  heroSubheading?: string | null
  highlights?: Highlight[] | null
  foundedYear?: number | null
  videoUrl?: string | null
}

// Tạm dùng ảnh hero làm fallback cho tới khi có ảnh riêng cho phần "Về Tosa".
const FALLBACK_IMAGE = '/images/hero-desktop.png'

const FALLBACK_HIGHLIGHTS: Highlight[] = [
  { value: '12+', label: 'Năm kinh nghiệm' },
  { value: '200+', label: 'Dự án hoàn thành' },
  { value: '180+', label: 'Khách hàng tin tưởng' },
  { value: '01', label: 'Xưởng sản xuất riêng' },
]

export function AboutSnippet({
  heroHeading,
  heroSubheading,
  highlights,
  foundedYear,
  videoUrl,
}: AboutSnippetProps) {
  const lead =
    heroSubheading ??
    'Tosa khởi đầu từ một xưởng nội thất nhỏ. Hơn một thập kỉ sau, chúng tôi vận hành showroom, xưởng sản xuất và đội thi công riêng — giúp gia chủ kiểm soát chất lượng và chi phí ở mọi khâu, theo phong cách Hiện đại, Indochine và Luxury.'

  let stats: Highlight[] = highlights?.length ? highlights : FALLBACK_HIGHLIGHTS
  if (foundedYear && !highlights?.length) {
    const years = new Date().getFullYear() - foundedYear
    stats = [{ value: `${years}+`, label: 'Năm kinh nghiệm' }, ...FALLBACK_HIGHLIGHTS.slice(1)]
  }
  stats = stats.slice(0, 4)

  return (
    <section className="bg-ink py-20 text-cream md:py-28">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
          {/* Cột nội dung */}
          <div>
            <div className="flex items-stretch gap-4">
              <span className="w-1 shrink-0 rounded bg-tan" aria-hidden />
              <h2 className="font-display text-4xl font-extrabold uppercase leading-none tracking-tight text-cream md:text-6xl lg:text-7xl">
                Về Tosa
              </h2>
            </div>

            {heroHeading ? (
              <p className="mt-7 max-w-[44ch] font-display text-lg font-semibold text-cream md:text-xl">
                {heroHeading}
              </p>
            ) : null}

            <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-cream/75 md:text-lg">
              {lead}
            </p>

            <dl className="mt-11 grid max-w-md grid-cols-2 gap-x-6 gap-y-9">
              {stats.map((s, i) => (
                <div key={s.key ?? `${s.label}-${i}`}>
                  <dt className="font-display text-4xl font-extrabold leading-none text-cream md:text-5xl">
                    {s.value}
                  </dt>
                  <dd className="mt-2 text-sm text-cream/65">{s.label}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-11">
              <Button href="/gioi-thieu" variant="outline-light" size="lg">
                Tìm hiểu thêm
              </Button>
            </div>
          </div>

          {/* Cột media */}
          <div className="relative aspect-[16/11] w-full overflow-hidden rounded">
            <Image
              src={FALLBACK_IMAGE}
              alt="Không gian và đội ngũ Tosa"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-ink/25" />
            {videoUrl ? (
              <a
                href={videoUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Xem video giới thiệu Tosa"
                className="absolute inset-0 grid place-items-center"
              >
                <span className="grid h-20 w-20 place-items-center rounded-full bg-cream/95 text-ink transition-transform duration-200 hover:scale-105">
                  <Play size={30} weight="fill" />
                </span>
              </a>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  )
}
