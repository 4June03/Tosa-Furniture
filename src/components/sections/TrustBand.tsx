import { Container } from '../ui/Container'

type Highlight = { key?: string; value: string; label: string }

const FALLBACK_HIGHLIGHTS: Highlight[] = [
  { value: '12+', label: 'Năm kinh nghiệm' },
  { value: '200+', label: 'Dự án hoàn thành' },
  { value: '180+', label: 'Khách hàng tin tưởng' },
  { value: '1', label: 'Showroom tại Hà Nội' },
]

export function TrustBand({
  highlights,
  foundedYear,
}: {
  highlights?: Highlight[] | null
  foundedYear?: number | null
}) {
  let items = highlights?.length ? highlights : FALLBACK_HIGHLIGHTS

  if (foundedYear && !highlights?.length) {
    const years = new Date().getFullYear() - foundedYear
    items = [
      { value: `${years}+`, label: 'Năm kinh nghiệm' },
      ...FALLBACK_HIGHLIGHTS.slice(1),
    ]
  }

  return (
    <section className="border-b border-line bg-cream-warm">
      <Container className="py-10 md:py-14">
        <ul className="grid grid-cols-2 gap-y-8 md:grid-cols-4 md:divide-x md:divide-line">
          {items.map((h, i) => (
            <li
              key={h.key ?? `${h.label}-${i}`}
              className="flex flex-col items-center text-center md:px-8"
            >
              <span className="font-display text-3xl font-bold tracking-tight text-ink md:text-5xl">
                {h.value}
              </span>
              <span className="mt-2 text-xs uppercase tracking-[0.16em] text-ink-muted md:text-sm md:tracking-[0.14em] md:normal-case">
                {h.label}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
