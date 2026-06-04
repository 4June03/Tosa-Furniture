import Link from 'next/link'
import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/PageHero'
import { ProjectCard, PROJECT_CATEGORY_LABEL } from '@/components/ProjectCard'
import type { Project } from '@/components/ProjectCard'
import { ContactCta } from '@/components/sections/ContactCta'
import { sanityFetch } from '@/sanity/lib/fetch'
import {
  PROJECTS_INDEX_QUERY,
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

const CATEGORIES = [
  { value: '', label: 'Tất cả' },
  { value: 'biet-thu', label: PROJECT_CATEGORY_LABEL['biet-thu'] },
  { value: 'nha-pho', label: PROJECT_CATEGORY_LABEL['nha-pho'] },
  { value: 'chung-cu', label: PROJECT_CATEGORY_LABEL['chung-cu'] },
  { value: 'van-phong', label: PROJECT_CATEGORY_LABEL['van-phong'] },
  { value: 'showroom', label: PROJECT_CATEGORY_LABEL['showroom'] },
]

const FALLBACK_PROJECTS: Project[] = [
  {
    _id: 'fp-1',
    title: 'Biệt thự An Khánh',
    slug: 'biet-thu-an-khanh',
    category: 'biet-thu',
    area: 320,
    location: 'Hoài Đức, Hà Nội',
    coverImage: { asset: { url: 'https://picsum.photos/seed/tosa-project-1/900/700' } },
  },
  {
    _id: 'fp-2',
    title: 'Penthouse Vinhomes',
    slug: 'penthouse-vinhomes',
    category: 'chung-cu',
    area: 180,
    location: 'Long Biên, Hà Nội',
    coverImage: { asset: { url: 'https://picsum.photos/seed/tosa-project-2/900/700' } },
  },
  {
    _id: 'fp-3',
    title: 'Nhà phố Tây Hồ',
    slug: 'nha-pho-tay-ho',
    category: 'nha-pho',
    area: 240,
    location: 'Tây Hồ, Hà Nội',
    coverImage: { asset: { url: 'https://picsum.photos/seed/tosa-project-3/900/700' } },
  },
  {
    _id: 'fp-4',
    title: 'Showroom Tosa Home',
    slug: 'showroom-tosa-home',
    category: 'showroom',
    area: 420,
    location: 'KCN Bình Phú, Hà Nội',
    coverImage: { asset: { url: 'https://picsum.photos/seed/tosa-project-4/900/700' } },
  },
  {
    _id: 'fp-5',
    title: 'Văn phòng Tâm An',
    slug: 'van-phong-tam-an',
    category: 'van-phong',
    area: 150,
    location: 'Cầu Giấy, Hà Nội',
    coverImage: { asset: { url: 'https://picsum.photos/seed/tosa-project-5/900/700' } },
  },
  {
    _id: 'fp-6',
    title: 'Biệt thự Vinhomes Riverside',
    slug: 'biet-thu-vinhomes-riverside',
    category: 'biet-thu',
    area: 280,
    location: 'Long Biên, Hà Nội',
    coverImage: { asset: { url: 'https://picsum.photos/seed/tosa-project-6/900/700' } },
  },
]

export const metadata: Metadata = {
  title: 'Dự án',
  description: 'Portfolio dự án thiết kế và thi công nội thất của Tosa Home.',
}

export default async function DuAnIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>
}) {
  const { cat } = await searchParams
  const category = cat && CATEGORIES.some((c) => c.value === cat) ? cat : ''

  const [settings, projects] = await Promise.all([
    sanityFetch<SettingsData>(SETTINGS_QUERY),
    sanityFetch<Project[]>(PROJECTS_INDEX_QUERY, {
      category: category || null,
      limit: 60,
    }),
  ])

  const items = projects?.length
    ? projects
    : category
      ? FALLBACK_PROJECTS.filter((p) => p.category === category)
      : FALLBACK_PROJECTS

  return (
    <>
      <Nav siteName={settings?.siteName ?? 'Tosa Home'} />
      <main className="flex-1">
        <PageHero
          eyebrow="Dự án"
          heading="Mỗi không gian, một câu chuyện"
          subheading="Tuyển chọn các công trình biệt thự, nhà phố, chung cư và showroom Tosa Home đã thiết kế và thi công."
        />

        <section className="border-t border-line bg-cream-warm">
          <Container className="py-5 md:py-6">
            <nav aria-label="Lọc theo loại công trình" className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => {
                const active = c.value === category
                const href = c.value ? `/du-an?cat=${c.value}` : '/du-an'
                return (
                  <Link
                    key={c.value || 'all'}
                    href={href}
                    className={`inline-flex items-center px-4 py-2 text-sm transition-colors ${
                      active
                        ? 'bg-ink text-cream'
                        : 'border border-line bg-paper text-ink-soft hover:border-ink hover:text-ink'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    {c.label}
                  </Link>
                )
              })}
            </nav>
          </Container>
        </section>

        <section className="bg-cream py-16 md:py-24">
          <Container>
            {items.length === 0 ? (
              <p className="py-20 text-center text-ink-muted">
                Chưa có dự án trong danh mục này.
              </p>
            ) : (
              <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
                {items.map((project) => (
                  <li key={project._id}>
                    <ProjectCard
                      project={project}
                      aspect="aspect-[4/3]"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                  </li>
                ))}
              </ul>
            )}
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
