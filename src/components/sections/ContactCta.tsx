import { Phone, MapPin, Clock, ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'

type ContactCtaProps = {
  contact?: {
    phone?: string | null
    email?: string | null
    zalo?: string | null
  } | null
  showroom?: {
    addressLine?: string | null
    city?: string | null
    mapEmbedUrl?: string | null
    openingHours?: string | null
  } | null
}

const FALLBACK_MAP =
  'https://www.google.com/maps?q=KCN+Binh+Phu+Tay+Phuong+Ha+Noi&output=embed'

export function ContactCta({ contact, showroom }: ContactCtaProps) {
  const phone = contact?.phone ?? '083 363 6365'
  const address = showroom?.addressLine ?? 'KCN Bình Phú, xã Tây Phương'
  const city = showroom?.city ?? 'Hà Nội'
  const hours = showroom?.openingHours ?? 'T2 – CN, 8:30 – 18:00'
  const mapSrc = showroom?.mapEmbedUrl ?? FALLBACK_MAP

  return (
    <section className="border-t border-line bg-paper">
      <Container className="py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-6">
            <div className="text-xs uppercase tracking-[0.18em] text-tan">
              Bắt đầu dự án của bạn
            </div>
            <h2 className="mt-4 max-w-[18ch] font-display text-3xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
              Một cuộc gặp 30 phút đủ để bắt đầu
            </h2>
            <p className="mt-6 max-w-[55ch] text-base leading-relaxed text-ink-soft md:text-lg">
              Đặt lịch tới showroom hoặc để chúng tôi gọi lại. Không ràng buộc,
              không tính phí tư vấn cho buổi gặp đầu tiên.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button href="/lien-he" variant="primary" size="lg">
                Gửi yêu cầu tư vấn
                <ArrowRight size={18} />
              </Button>
              <a
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 text-base text-ink transition-colors hover:text-tan"
              >
                <Phone size={18} weight="fill" />
                {phone}
              </a>
            </div>

            <ul className="mt-12 space-y-4 text-sm text-ink-soft">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-tan" />
                <span>
                  {address}, {city}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="mt-0.5 shrink-0 text-tan" />
                <span>{hours}</span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-line bg-cream">
              <iframe
                src={mapSrc}
                title="Bản đồ showroom Tosa"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
