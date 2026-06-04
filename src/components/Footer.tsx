import Link from 'next/link'
import { Container } from './ui/Container'

type FooterProps = {
  siteName?: string
  tagline?: string | null
  contact?: {
    phone?: string | null
    email?: string | null
    zalo?: string | null
  } | null
  showroom?: {
    addressLine?: string | null
    city?: string | null
    openingHours?: string | null
  } | null
}

const SERVICE_LINKS = [
  { href: '/dich-vu/thiet-ke-kien-truc', label: 'Thiết kế kiến trúc' },
  { href: '/dich-vu/thiet-ke-noi-that', label: 'Thiết kế nội thất' },
  { href: '/dich-vu/xay-nha-tron-goi', label: 'Xây nhà trọn gói' },
  { href: '/dich-vu/thi-cong-noi-that', label: 'Thi công nội thất' },
  { href: '/dich-vu/giam-sat-xay-dung', label: 'Giám sát xây dựng' },
]

const COMPANY_LINKS = [
  { href: '/gioi-thieu', label: 'Giới thiệu' },
  { href: '/du-an', label: 'Dự án' },
  { href: '/tin-tuc', label: 'Tin tức' },
  { href: '/lien-he', label: 'Liên hệ' },
]

export function Footer({
  siteName = 'Tosa Home',
  tagline,
  contact,
  showroom,
}: FooterProps) {
  return (
    <footer className="bg-ink text-cream/85">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="font-display text-2xl font-bold tracking-tight text-cream">
              {siteName}
            </div>
            {tagline ? (
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/70">
                {tagline}
              </p>
            ) : null}
          </div>

          <div className="md:col-span-3">
            <div className="font-display text-xs uppercase tracking-[0.16em] text-tan">
              Dịch vụ
            </div>
            <ul className="mt-5 space-y-3 text-sm">
              {SERVICE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-cream/75 transition-colors hover:text-cream"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="font-display text-xs uppercase tracking-[0.16em] text-tan">
              Công ty
            </div>
            <ul className="mt-5 space-y-3 text-sm">
              {COMPANY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-cream/75 transition-colors hover:text-cream"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="font-display text-xs uppercase tracking-[0.16em] text-tan">
              Liên hệ
            </div>
            <ul className="mt-5 space-y-3 text-sm">
              {contact?.phone ? (
                <li>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, '')}`}
                    className="text-cream/85 transition-colors hover:text-cream"
                  >
                    {contact.phone}
                  </a>
                </li>
              ) : null}
              {contact?.email ? (
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-cream/85 transition-colors hover:text-cream"
                  >
                    {contact.email}
                  </a>
                </li>
              ) : null}
              {showroom?.addressLine ? (
                <li className="text-cream/70">
                  {showroom.addressLine}
                  {showroom.city ? `, ${showroom.city}` : ''}
                </li>
              ) : null}
              {showroom?.openingHours ? (
                <li className="text-cream/60">{showroom.openingHours}</li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-cream/15 pt-6 text-xs text-cream/50">
          © {new Date().getFullYear()} {siteName}. Thiết kế & thi công nội thất.
        </div>
      </Container>
    </footer>
  )
}
