import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { Container } from '../ui/Container'

type Project = {
  _id: string
  title: string
  slug: string
  category?: string | null
  area?: number | null
  location?: string | null
  summary?: string | null
  coverImage?: {
    asset?: { url?: string; metadata?: { lqip?: string } } | null
    alt?: string | null
  } | null
}

const CATEGORY_LABEL: Record<string, string> = {
  'biet-thu': 'Biệt thự',
  'nha-pho': 'Nhà phố',
  'chung-cu': 'Chung cư',
  'van-phong': 'Văn phòng',
  showroom: 'Showroom',
  khac: 'Khác',
}

const FALLBACK_PROJECTS: Project[] = [
  {
    _id: 'fp-1',
    title: 'Biệt thự An Khánh',
    slug: 'biet-thu-an-khanh',
    category: 'biet-thu',
    area: 320,
    location: 'Hoài Đức, Hà Nội',
    summary: 'Phong cách Indochine ấm áp, gỗ tự nhiên kết hợp gạch bông cổ điển.',
    coverImage: {
      asset: { url: 'https://picsum.photos/seed/tosa-project-1/1600/1200' },
      alt: 'Biệt thự An Khánh',
    },
  },
  {
    _id: 'fp-2',
    title: 'Penthouse Vinhomes',
    slug: 'penthouse-vinhomes',
    category: 'chung-cu',
    area: 180,
    location: 'Long Biên, Hà Nội',
    coverImage: {
      asset: { url: 'https://picsum.photos/seed/tosa-project-2/900/1200' },
      alt: 'Penthouse Vinhomes',
    },
  },
  {
    _id: 'fp-3',
    title: 'Nhà phố Tây Hồ',
    slug: 'nha-pho-tay-ho',
    category: 'nha-pho',
    area: 240,
    location: 'Tây Hồ, Hà Nội',
    coverImage: {
      asset: { url: 'https://picsum.photos/seed/tosa-project-3/900/1200' },
      alt: 'Nhà phố Tây Hồ',
    },
  },
  {
    _id: 'fp-4',
    title: 'Showroom Tosa Home',
    slug: 'showroom-tosa-home',
    category: 'showroom',
    area: 420,
    location: 'KCN Bình Phú, Hà Nội',
    coverImage: {
      asset: { url: 'https://picsum.photos/seed/tosa-project-4/1600/900' },
      alt: 'Showroom Tosa Home',
    },
  },
  {
    _id: 'fp-5',
    title: 'Văn phòng Tâm An',
    slug: 'van-phong-tam-an',
    category: 'van-phong',
    area: 150,
    location: 'Cầu Giấy, Hà Nội',
    coverImage: {
      asset: { url: 'https://picsum.photos/seed/tosa-project-5/900/900' },
      alt: 'Văn phòng Tâm An',
    },
  },
]

function ProjectCard({
  project,
  aspect,
  size,
}: {
  project: Project
  aspect: string
  size: string
}) {
  const url = project.coverImage?.asset?.url
  const lqip = project.coverImage?.asset?.metadata?.lqip
  const alt = project.coverImage?.alt ?? project.title

  return (
    <Link
      href={`/du-an/${project.slug}`}
      className={`group relative block overflow-hidden bg-line ${aspect}`}
    >
      {url ? (
        <Image
          src={url}
          alt={alt}
          fill
          sizes={size}
          placeholder={lqip ? 'blur' : undefined}
          blurDataURL={lqip ?? undefined}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-cream md:p-8">
        <div className="text-[11px] uppercase tracking-[0.18em] text-cream/75">
          {project.category ? (CATEGORY_LABEL[project.category] ?? project.category) : ''}
        </div>
        <h3 className="mt-2 font-display text-xl font-semibold leading-tight tracking-tight md:text-2xl">
          {project.title}
        </h3>
        <div className="mt-2 flex items-center gap-4 text-xs text-cream/70 md:text-sm">
          {project.area ? <span>{project.area} m²</span> : null}
          {project.location ? <span>{project.location}</span> : null}
        </div>
      </div>
      <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-cream/90 text-ink opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <ArrowUpRight size={18} weight="bold" />
      </span>
    </Link>
  )
}

export function FeaturedProjects({ projects }: { projects?: Project[] | null }) {
  const items = projects?.length ? projects.slice(0, 5) : FALLBACK_PROJECTS

  return (
    <section className="bg-cream py-20 md:py-28">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-tan">
              Dự án nổi bật
            </div>
            <h2 className="mt-3 max-w-[20ch] font-display text-3xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
              Những không gian Tosa Home đã kiến tạo
            </h2>
          </div>
          <Link
            href="/du-an"
            className="hidden shrink-0 items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink md:inline-flex"
          >
            Xem tất cả
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="mt-10 grid auto-rows-[280px] grid-cols-1 gap-4 md:mt-14 md:auto-rows-[300px] md:grid-cols-6 md:gap-5 lg:auto-rows-[340px]">
          {/* Cell 1 - large left */}
          {items[0] ? (
            <div className="md:col-span-4 md:row-span-2">
              <ProjectCard
                project={items[0]}
                aspect="h-full w-full"
                size="(min-width: 768px) 66vw, 100vw"
              />
            </div>
          ) : null}
          {/* Cell 2 + 3 - stacked right */}
          {items[1] ? (
            <div className="md:col-span-2">
              <ProjectCard
                project={items[1]}
                aspect="h-full w-full"
                size="(min-width: 768px) 33vw, 100vw"
              />
            </div>
          ) : null}
          {items[2] ? (
            <div className="md:col-span-2">
              <ProjectCard
                project={items[2]}
                aspect="h-full w-full"
                size="(min-width: 768px) 33vw, 100vw"
              />
            </div>
          ) : null}
          {/* Cell 4 - wide bottom left */}
          {items[3] ? (
            <div className="md:col-span-4">
              <ProjectCard
                project={items[3]}
                aspect="h-full w-full"
                size="(min-width: 768px) 66vw, 100vw"
              />
            </div>
          ) : null}
          {/* Cell 5 - bottom right */}
          {items[4] ? (
            <div className="md:col-span-2">
              <ProjectCard
                project={items[4]}
                aspect="h-full w-full"
                size="(min-width: 768px) 33vw, 100vw"
              />
            </div>
          ) : null}
        </div>

        <div className="mt-8 md:hidden">
          <Link
            href="/du-an"
            className="inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink"
          >
            Xem tất cả dự án
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </Container>
    </section>
  )
}
