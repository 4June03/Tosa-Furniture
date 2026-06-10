import Link from 'next/link'
import {
  FacebookLogo,
  InstagramLogo,
  YoutubeLogo,
  TiktokLogo,
  PinterestLogo,
} from '@phosphor-icons/react/dist/ssr'
import { Container } from './ui/Container'
import { Logo } from './ui/Logo'

type SocialLink = { platform?: string | null; url?: string | null }

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
  socialLinks?: SocialLink[] | null
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
  { href: '/lien-he', label: 'Liên hệ' },
]

// Link mạng xã hội mặc định (dùng khi Sanity chưa cấu hình socialLinks)
const SOCIAL_FALLBACK: SocialLink[] = [
  { platform: 'facebook', url: 'https://www.facebook.com/profile.php?id=61590223204752' },
  { platform: 'instagram', url: 'https://www.instagram.com/_tosahome_/' },
  { platform: 'youtube', url: 'https://www.youtube.com/@tosahome' },
]

const SOCIAL_ICON: Record<
  string,
  React.ComponentType<{ size?: number; weight?: 'fill' | 'regular' }>
> = {
  facebook: FacebookLogo,
  instagram: InstagramLogo,
  youtube: YoutubeLogo,
  tiktok: TiktokLogo,
  pinterest: PinterestLogo,
}

const SOCIAL_LABEL: Record<string, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  pinterest: 'Pinterest',
}

export function Footer({
  siteName = 'Tosa Interior',
  tagline,
  contact,
  showroom,
  socialLinks,
}: FooterProps) {
  const fromCms = socialLinks?.filter(
    (s): s is { platform: string; url: string } =>
      Boolean(s.platform && s.url),
  )
  const socials = fromCms?.length ? fromCms : SOCIAL_FALLBACK

  return (
    <footer className="bg-ink text-cream/85">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Thương hiệu + social */}
          <div className="md:col-span-4">
            <Link href="/" aria-label={siteName} className="inline-flex">
              <Logo alt={siteName} className="h-16 w-auto rounded-xl" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/70">
              {tagline ??
                'Đơn vị thiết kế & thi công nội thất trọn gói. Một xưởng riêng, một đội ngũ, một đầu mối.'}
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socials.map((s) => {
                const platform = (s.platform ?? '').toLowerCase()
                const Icon = SOCIAL_ICON[platform]
                if (!Icon || !s.url) return null
                return (
                  <a
                    key={platform + s.url}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={SOCIAL_LABEL[platform] ?? platform}
                    className="grid h-10 w-10 place-items-center rounded-full border border-cream/25 text-cream transition-colors hover:border-tan hover:bg-tan hover:text-ink"
                  >
                    <Icon size={19} weight="fill" />
                  </a>
                )
              })}
            </div>
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

          <div className="md:col-span-3">
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
          © {new Date().getFullYear()} {siteName}. Thiết kế &amp; thi công nội thất.
        </div>
      </Container>
    </footer>
  )
}
