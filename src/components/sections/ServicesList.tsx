import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { Container } from '../ui/Container'

type Service = {
  _id: string
  title: string
  slug: string
  summary?: string | null
}

const FALLBACK_SERVICES: Service[] = [
  {
    _id: 's-1',
    title: 'Thiết kế kiến trúc',
    slug: 'thiet-ke-kien-truc',
    summary:
      'Bố cục công năng, kết cấu, hệ thống điện nước và phong cách kiến trúc trọn vẹn từ phối cảnh tới bản vẽ thi công.',
  },
  {
    _id: 's-2',
    title: 'Thiết kế nội thất',
    slug: 'thiet-ke-noi-that',
    summary:
      'Concept không gian, vật liệu, ánh sáng và đồ nội thất phù hợp gu thẩm mỹ và ngân sách của gia chủ.',
  },
  {
    _id: 's-3',
    title: 'Xây nhà trọn gói',
    slug: 'xay-nha-tron-goi',
    summary:
      'Một đầu mối duy nhất từ thiết kế tới chìa khoá trao tay: kiểm soát chi phí, tiến độ và chất lượng.',
  },
  {
    _id: 's-4',
    title: 'Thi công nội thất',
    slug: 'thi-cong-noi-that',
    summary:
      'Sản xuất tại xưởng riêng và lắp đặt tại công trình, đảm bảo bám sát thiết kế và bàn giao đúng hạn.',
  },
  {
    _id: 's-5',
    title: 'Giám sát xây dựng',
    slug: 'giam-sat-xay-dung',
    summary:
      'Kỹ sư thường trú tại công trình kiểm tra vật tư, quy trình thi công và nghiệm thu theo từng giai đoạn.',
  },
]

export function ServicesList({ services }: { services?: Service[] | null }) {
  const items = services?.length ? services : FALLBACK_SERVICES

  return (
    <section className="border-t border-line bg-paper py-20 md:py-28">
      <Container>
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="text-xs uppercase tracking-[0.18em] text-tan">
              Dịch vụ
            </div>
            <h2 className="mt-3 max-w-[18ch] font-display text-3xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
              Đồng hành trọn vẹn, từ ý tưởng tới bàn giao
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-soft">
              Năm dịch vụ độc lập, có thể kết hợp linh hoạt theo nhu cầu của
              từng công trình. Một đội ngũ, một đầu mối duy nhất.
            </p>
          </div>

          <ul className="md:col-span-8">
            {items.map((s, i) => (
              <li
                key={s._id}
                className={`group ${i === 0 ? 'border-t border-line' : ''} border-b border-line`}
              >
                <Link
                  href={`/dich-vu/${s.slug}`}
                  className="flex items-start gap-6 py-7 transition-colors hover:bg-cream-warm md:gap-10 md:py-9"
                >
                  <span className="font-display text-sm font-medium text-tan md:text-base">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-semibold tracking-tight text-ink md:text-3xl">
                      {s.title}
                    </h3>
                    {s.summary ? (
                      <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-ink-soft md:text-base">
                        {s.summary}
                      </p>
                    ) : null}
                  </div>
                  <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center border border-line text-ink transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-cream md:h-12 md:w-12">
                    <ArrowRight size={18} weight="regular" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
