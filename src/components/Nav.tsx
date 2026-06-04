import Link from 'next/link'
import { Container } from './ui/Container'
import { Button } from './ui/Button'

const NAV_ITEMS = [
  { href: '/gioi-thieu', label: 'Giới thiệu' },
  { href: '/dich-vu', label: 'Dịch vụ' },
  { href: '/du-an', label: 'Dự án' },
  { href: '/tin-tuc', label: 'Tin tức' },
  { href: '/lien-he', label: 'Liên hệ' },
]

export function Nav({ siteName = 'Tosa Home' }: { siteName?: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/90 backdrop-blur supports-[backdrop-filter]:bg-cream/75">
      <Container className="flex h-16 items-center justify-between md:h-[72px]">
        <Link
          href="/"
          className="font-display text-xl font-bold tracking-tight text-ink md:text-2xl"
        >
          {siteName}
        </Link>

        <nav aria-label="Chính" className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-ink-soft transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Button href="/lien-he" size="md" className="hidden md:inline-flex">
          Nhận tư vấn
        </Button>
      </Container>
    </header>
  )
}
