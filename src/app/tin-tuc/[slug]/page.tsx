import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { Container } from '@/components/ui/Container'
import { PortableTextBody } from '@/components/PortableTextBody'
import {
  PostCard,
  POST_CATEGORY_LABEL,
  formatPostDate,
  type Post,
} from '@/components/PostCard'
import { ContactCta } from '@/components/sections/ContactCta'
import { sanityFetch } from '@/sanity/lib/fetch'
import {
  POST_BY_SLUG_QUERY,
  POST_SLUGS_QUERY,
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

type PostDetail = Post & {
  body?: unknown
  seoTitle?: string | null
  seoDescription?: string | null
  related?: Post[] | null
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<Array<{ slug: string }>>(POST_SLUGS_QUERY)
  return slugs?.map(({ slug }) => ({ slug })) ?? []
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await sanityFetch<PostDetail>(POST_BY_SLUG_QUERY, { slug })
  if (!post) return { title: 'Tin tức' }
  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt ?? undefined,
  }
}

export default async function TinTucDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [settings, post] = await Promise.all([
    sanityFetch<SettingsData>(SETTINGS_QUERY),
    sanityFetch<PostDetail>(POST_BY_SLUG_QUERY, { slug }),
  ])

  if (!post) notFound()

  const coverUrl = post.coverImage?.asset?.url
  const coverLqip = post.coverImage?.asset?.metadata?.lqip
  const coverAlt = post.coverImage?.alt ?? post.title

  return (
    <>
      <Nav siteName={settings?.siteName ?? 'Tosa Home'} />
      <main className="flex-1">
        <article>
          <section className="border-b border-line bg-cream pt-12 pb-10 md:pt-16">
            <Container className="max-w-[820px]">
              <Link
                href="/tin-tuc"
                className="inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink"
              >
                <ArrowLeft size={16} />
                Tất cả bài viết
              </Link>

              <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-[0.16em] text-ink-muted">
                <span>{formatPostDate(post.publishedAt)}</span>
                {post.category ? (
                  <>
                    <span className="h-1 w-1 rounded-full bg-ink-muted" aria-hidden />
                    <span>{POST_CATEGORY_LABEL[post.category] ?? post.category}</span>
                  </>
                ) : null}
              </div>

              <h1 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight text-ink md:text-5xl">
                {post.title}
              </h1>

              {post.excerpt ? (
                <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-ink-soft md:text-xl">
                  {post.excerpt}
                </p>
              ) : null}
            </Container>
          </section>

          {coverUrl ? (
            <section className="bg-cream">
              <div className="relative aspect-[16/9] w-full bg-line">
                <Image
                  src={coverUrl}
                  alt={coverAlt}
                  fill
                  priority
                  sizes="100vw"
                  placeholder={coverLqip ? 'blur' : undefined}
                  blurDataURL={coverLqip ?? undefined}
                  className="object-cover"
                />
              </div>
            </section>
          ) : null}

          <section className="bg-cream py-16 md:py-24">
            <Container className="max-w-[760px]">
              {post.body ? (
                <PortableTextBody value={post.body} />
              ) : (
                <p className="text-base leading-relaxed text-ink-soft md:text-lg">
                  Nội dung bài viết đang được cập nhật.
                </p>
              )}
            </Container>
          </section>
        </article>

        {post.related?.length ? (
          <section className="border-t border-line bg-paper py-16 md:py-24">
            <Container>
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink md:text-4xl">
                Bài viết khác
              </h2>
              <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3">
                {post.related.map((rel) => (
                  <li key={rel._id}>
                    <PostCard post={rel} />
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        ) : null}

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
