import Image from 'next/image'
import Link from 'next/link'

export type Post = {
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

export const POST_CATEGORY_LABEL: Record<string, string> = {
  'kien-thuc-thiet-ke': 'Kiến thức thiết kế',
  'meo-trang-tri': 'Mẹo trang trí',
  'phong-thuy': 'Phong thuỷ',
  'xu-huong': 'Xu hướng',
  'du-an-moi': 'Dự án mới',
  khac: 'Khác',
}

export function formatPostDate(iso?: string | null) {
  if (!iso) return ''
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(iso))
}

export function PostCard({ post }: { post: Post }) {
  const url = post.coverImage?.asset?.url
  const lqip = post.coverImage?.asset?.metadata?.lqip
  const alt = post.coverImage?.alt ?? post.title

  return (
    <Link href={`/tin-tuc/${post.slug}`} className="group block">
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
        <span>{formatPostDate(post.publishedAt)}</span>
        {post.category ? (
          <>
            <span className="h-1 w-1 rounded-full bg-ink-muted" aria-hidden />
            <span>{POST_CATEGORY_LABEL[post.category] ?? post.category}</span>
          </>
        ) : null}
      </div>
      <h3 className="mt-3 font-display text-lg font-semibold leading-tight tracking-tight text-ink transition-colors group-hover:text-tan-dark md:text-xl">
        {post.title}
      </h3>
      {post.excerpt ? (
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-soft">
          {post.excerpt}
        </p>
      ) : null}
    </Link>
  )
}
