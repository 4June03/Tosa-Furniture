import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'

export type Project = {
  _id: string
  title: string
  slug: string
  category?: string | null
  area?: number | null
  location?: string | null
  summary?: string | null
  completedAt?: string | null
  coverImage?: {
    asset?: { url?: string; metadata?: { lqip?: string } } | null
    alt?: string | null
  } | null
}

export const PROJECT_CATEGORY_LABEL: Record<string, string> = {
  'biet-thu': 'Biệt thự',
  'nha-pho': 'Nhà phố',
  'chung-cu': 'Chung cư',
  'van-phong': 'Văn phòng',
  showroom: 'Showroom',
  khac: 'Khác',
}

export function ProjectCard({
  project,
  aspect = 'aspect-[4/3]',
  sizes = '(min-width: 768px) 33vw, 100vw',
}: {
  project: Project
  aspect?: string
  sizes?: string
}) {
  const url = project.coverImage?.asset?.url
  const lqip = project.coverImage?.asset?.metadata?.lqip
  const alt = project.coverImage?.alt ?? project.title

  return (
    <Link
      href={`/du-an/${project.slug}`}
      className={`group relative block w-full overflow-hidden bg-line ${aspect}`}
    >
      {url ? (
        <Image
          src={url}
          alt={alt}
          fill
          sizes={sizes}
          placeholder={lqip ? 'blur' : undefined}
          blurDataURL={lqip ?? undefined}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-cream md:p-7">
        <div className="text-[11px] uppercase tracking-[0.18em] text-cream/75">
          {project.category
            ? (PROJECT_CATEGORY_LABEL[project.category] ?? project.category)
            : ''}
        </div>
        <h3 className="mt-2 font-display text-lg font-semibold leading-tight tracking-tight md:text-xl">
          {project.title}
        </h3>
        <div className="mt-2 flex items-center gap-4 text-xs text-cream/70">
          {project.area ? <span>{project.area} m²</span> : null}
          {project.location ? <span>{project.location}</span> : null}
        </div>
      </div>
      <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-cream/90 text-ink opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <ArrowUpRight size={16} weight="bold" />
      </span>
    </Link>
  )
}
