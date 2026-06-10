import Link from 'next/link'
import { Container } from './ui/Container'
import { Button } from './ui/Button'
import { Logo } from './ui/Logo'

const NAV_ITEMS = [
  { href: '/gioi-thieu', label: 'Giới thiệu' },
  { href: '/dich-vu', label: 'Dịch vụ' },
  { href: '/du-an', label: 'Dự án' },
  { href: '/lien-he', label: 'Liên hệ' },
]

export function Nav({ siteName = 'Tosa Interior' }: { siteName?: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/90 backdrop-blur supports-[backdrop-filter]:bg-cream/75">
      <Container className="flex h-16 items-center justify-between md:h-[72px]">
        <Link href="/" aria-label={siteName} className="flex items-center">
          <Logo alt={siteName} className="h-11 w-auto rounded-xl md:h-14" />
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
