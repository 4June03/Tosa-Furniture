import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/PageHero'
import { PostCard, type Post } from '@/components/PostCard'
import { ContactCta } from '@/components/sections/ContactCta'
import { sanityFetch } from '@/sanity/lib/fetch'
import {
  POSTS_COUNT_QUERY,
  POSTS_INDEX_QUERY,
  SETTINGS_QUERY,
} from '@/sanity/lib/queries'

type SettingsData = {
  siteName?: string | null
  tagline?: string | null
  showroom?: {
    addressLine?: string | null
    city?: string | null
    mapEmbedUrl?: string | null
    openingHours?: string | null
  } | null
  contact?: { phone?: string | null; email?: string | null } | null
}

const PER_PAGE = 9

export const metadata: Metadata = {
  title: 'Tin tức',
  description: 'Góc nhìn, kiến thức và xu hướng nội thất từ đội ngũ Tosa Home.',
}

export default async function TinTucIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page: pageParam } = await searchParams
  const pageNum = Math.max(1, parseInt(pageParam || '1', 10) || 1)
  const start = (pageNum - 1) * PER_PAGE
  const end = start + PER_PAGE

  const [settings, posts, total] = await Promise.all([
    sanityFetch<SettingsData>(SETTINGS_QUERY),
    sanityFetch<Post[]>(POSTS_INDEX_QUERY, { start, end }),
    sanityFetch<number>(POSTS_COUNT_QUERY),
  ])

  const totalCount = total ?? 0
  const totalPages = Math.max(1, Math.ceil(totalCount / PER_PAGE))
  const items = posts ?? []

  return (
    <>
      <Nav siteName={settings?.siteName ?? 'Tosa Home'} />
      <main className="flex-1">
        <PageHero
          eyebrow="Tin tức"
          heading="Góc nhìn về không gian sống"
          subheading="Kiến thức thiết kế, mẹo trang trí, xu hướng và những dự án mới của đội ngũ Tosa Home."
        />

        <section className="bg-cream py-16 md:py-24">
          <Container>
            {items.length === 0 ? (
              <p className="py-20 text-center text-ink-muted">
                Chưa có bài viết. Hãy quay lại sau nhé.
              </p>
            ) : (
              <ul className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
                {items.map((post) => (
                  <li key={post._id}>
                    <PostCard post={post} />
                  </li>
                ))}
              </ul>
            )}

            {totalPages > 1 ? (
              <nav
                aria-label="Phân trang"
                className="mt-16 flex items-center justify-center gap-6"
              >
                {pageNum > 1 ? (
                  <Link
                    href={pageNum === 2 ? '/tin-tuc' : `/tin-tuc?page=${pageNum - 1}`}
                    className="inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink"
                  >
                    <ArrowLeft size={16} />
                    Trang trước
                  </Link>
                ) : (
                  <span className="text-sm text-ink-muted/50">Trang trước</span>
                )}

                <span className="text-sm tracking-wide text-ink">
                  {pageNum} / {totalPages}
                </span>

                {pageNum < totalPages ? (
                  <Link
                    href={`/tin-tuc?page=${pageNum + 1}`}
                    className="inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink"
                  >
                    Trang sau
                    <ArrowRight size={16} />
                  </Link>
                ) : (
                  <span className="text-sm text-ink-muted/50">Trang sau</span>
                )}
              </nav>
            ) : null}
          </Container>
        </section>

        <ContactCta contact={settings?.contact} showroom={settings?.showroom} />
      </main>
      <Footer
        siteName={settings?.siteName ?? 'Tosa Home'}
        tagline={settings?.tagline}
        contact={settings?.contact}
        showroom={settings?.showroom}
      />
    </>
  )
}
