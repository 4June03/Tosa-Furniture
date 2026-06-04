import Link from 'next/link'
import { ArrowRight, House } from '@phosphor-icons/react/dist/ssr'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { sanityFetch } from '@/sanity/lib/fetch'
import { SETTINGS_QUERY } from '@/sanity/lib/queries'

type SettingsData = {
  siteName?: string | null
  tagline?: string | null
  showroom?: {
    addressLine?: string | null
    city?: string | null
    openingHours?: string | null
  } | null
  contact?: { phone?: string | null; email?: string | null } | null
}

const SUGGESTIONS = [
  { href: '/du-an', label: 'Dự án', description: 'Portfolio biệt thự, nhà phố, chung cư' },
  { href: '/dich-vu', label: 'Dịch vụ', description: '5 dịch vụ thiết kế và thi công trọn gói' },
  { href: '/gioi-thieu', label: 'Giới thiệu', description: 'Câu chuyện và đội ngũ Tosa Home' },
  { href: '/lien-he', label: 'Liên hệ', description: 'Để lại yêu cầu, gọi hotline hoặc Zalo' },
]

export default async function NotFound() {
  const settings = await sanityFetch<SettingsData>(SETTINGS_QUERY)
  const siteName = settings?.siteName ?? 'Tosa Home'

  return (
    <>
      <Nav siteName={siteName} />
      <main className="flex-1">
        <section className="border-b border-line bg-cream">
          <Container className="py-24 md:py-32">
            <div className="grid gap-12 md:grid-cols-12 md:items-center md:gap-16">
              <div className="md:col-span-7">
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-tan">
                  <span className="h-px w-8 bg-tan" aria-hidden />
                  Lỗi 404
                </div>

                <h1 className="mt-6 max-w-[20ch] font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink md:text-6xl lg:text-[68px]">
                  Trang này không có ở đây
                </h1>

                <p className="mt-6 max-w-[55ch] text-base leading-relaxed text-ink-soft md:text-lg">
                  Có thể địa chỉ bị nhập sai, hoặc trang đã được di chuyển. Bạn
                  có thể quay về trang chủ hoặc chọn một trong các gợi ý bên
                  dưới.
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <Button href="/" size="lg" variant="primary">
                    <House size={18} weight="fill" />
                    Về trang chủ
                  </Button>
                  <Button href="/lien-he" size="lg" variant="ghost">
                    Liên hệ tư vấn
                  </Button>
                </div>
              </div>

              <div
                aria-hidden
                className="select-none md:col-span-5 md:text-right"
              >
                <span className="block font-display text-[180px] font-bold leading-none tracking-tighter text-tan/80 md:text-[260px]">
                  404
                </span>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-paper py-16 md:py-24">
          <Container>
            <div className="text-xs uppercase tracking-[0.18em] text-tan">
              Có thể bạn đang tìm
            </div>
            <h2 className="mt-3 max-w-[20ch] font-display text-2xl font-bold leading-tight tracking-tight text-ink md:text-4xl">
              Một số trang chính của Tosa Home
            </h2>

            <ul className="mt-10 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
              {SUGGESTIONS.map((item) => (
                <li key={item.href} className="bg-paper">
                  <Link
                    href={item.href}
                    className="group flex items-center justify-between gap-6 p-6 transition-colors hover:bg-cream-warm md:p-8"
                  >
                    <div>
                      <div className="font-display text-lg font-semibold tracking-tight text-ink md:text-xl">
                        {item.label}
                      </div>
                      <p className="mt-1 text-sm text-ink-soft">
                        {item.description}
                      </p>
                    </div>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-line text-ink transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-cream">
                      <ArrowRight size={16} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      </main>
      <Footer
        siteName={siteName}
        tagline={settings?.tagline}
        contact={settings?.contact}
        showroom={settings?.showroom}
      />
    </>
  )
}
