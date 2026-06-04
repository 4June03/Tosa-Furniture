import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { Container } from '../ui/Container'

type Post = {
  _id: string
  title: string
  slug: string
  excerpt?: string | null
  category?: string | null
  publishedAt?: string | null
  coverImage?: {
    asset?: { url?: string; metadata?: { lqip?: string } } | null
    alt?: string | null
  } | null
}

const CATEGORY_LABEL: Record<string, string> = {
  'kien-thuc-thiet-ke': 'Kiến thức thiết kế',
  'meo-trang-tri': 'Mẹo trang trí',
  'phong-thuy': 'Phong thuỷ',
  'xu-huong': 'Xu hướng',
  'du-an-moi': 'Dự án mới',
  khac: 'Khác',
}

const FALLBACK_POSTS: Post[] = [
  {
    _id: 'p-1',
    title: 'Chọn vật liệu gỗ cho nội thất bền vững',
    slug: '#',
    excerpt: 'Gỗ óc chó, sồi, tần bì — đặc tính và cách phối hợp trong nhà ở Hà Nội.',
    category: 'kien-thuc-thiet-ke',
    publishedAt: new Date().toISOString(),
    coverImage: {
      asset: { url: 'https://picsum.photos/seed/tosa-post-1/900/600' },
      alt: 'Vật liệu gỗ',
    },
  },
  {
    _id: 'p-2',
    title: 'Ánh sáng trong căn hộ chung cư hiện đại',
    slug: '#',
    excerpt:
      'Bố trí đèn theo lớp: ánh sáng nền, ánh sáng nhiệm vụ và ánh sáng nhấn.',
    category: 'meo-trang-tri',
    publishedAt: new Date().toISOString(),
    coverImage: {
      asset: { url: 'https://picsum.photos/seed/tosa-post-2/900/600' },
      alt: 'Ánh sáng nội thất',
    },
  },
  {
    _id: 'p-3',
    title: 'Xu hướng nội thất tối giản 2026',
    slug: '#',
    excerpt: 'Ít đồ hơn, chất liệu thật hơn, không gian thở thoáng hơn.',
    category: 'xu-huong',
    publishedAt: new Date().toISOString(),
    coverImage: {
      asset: { url: 'https://picsum.photos/seed/tosa-post-3/900/600' },
      alt: 'Xu hướng',
    },
  },
]

function formatDate(iso?: string | null) {
  if (!iso) return ''
  const d = new Date(iso)
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(d)
}

export function LatestPosts({ posts }: { posts?: Post[] | null }) {
  const items = posts?.length ? posts.slice(0, 3) : FALLBACK_POSTS

  return (
    <section className="border-t border-line bg-cream py-20 md:py-28">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-tan">
              Tin tức
            </div>
            <h2 className="mt-3 max-w-[20ch] font-display text-3xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
              Góc nhìn mới về không gian sống
            </h2>
          </div>
          <Link
            href="/tin-tuc"
            className="hidden shrink-0 items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink md:inline-flex"
          >
            Xem tất cả
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-3 md:gap-10">
          {items.map((post) => {
            const url = post.coverImage?.asset?.url
            const lqip = post.coverImage?.asset?.metadata?.lqip
            const alt = post.coverImage?.alt ?? post.title
            const isLive = post.slug && post.slug !== '#'
            return (
              <li key={post._id}>
                <Link
                  href={isLive ? `/tin-tuc/${post.slug}` : '#'}
                  className="group block"
                >
                  <div className="relative aspect-[3/2] w-full overflow-hidden bg-line">
                    {url ? (
                      <Image
                        src={url}
                        alt={alt}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        placeholder={lqip ? 'blur' : undefined}
                        blurDataURL={lqip ?? undefined}
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    ) : null}
                  </div>
                  <div className="mt-5 flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-ink-muted">
                    <span>{formatDate(post.publishedAt)}</span>
                    {post.category ? (
                      <>
                        <span className="h-1 w-1 rounded-full bg-ink-muted" aria-hidden />
                        <span>{CATEGORY_LABEL[post.category] ?? post.category}</span>
                      </>
                    ) : null}
                  </div>
                  <h3 className="mt-3 font-display text-xl font-semibold leading-tight tracking-tight text-ink transition-colors group-hover:text-tan-dark md:text-2xl">
                    {post.title}
                  </h3>
                  {post.excerpt ? (
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-soft">
                      {post.excerpt}
                    </p>
                  ) : null}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="mt-10 md:hidden">
          <Link
            href="/tin-tuc"
            className="inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink"
          >
            Xem tất cả tin tức
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </Container>
    </section>
  )
}
