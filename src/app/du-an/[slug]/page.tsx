import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { Container } from '@/components/ui/Container'
import { PortableTextBody } from '@/components/PortableTextBody'
import { ProjectCard, PROJECT_CATEGORY_LABEL } from '@/components/ProjectCard'
import type { Project } from '@/components/ProjectCard'
import { ContactCta } from '@/components/sections/ContactCta'
import { sanityFetch } from '@/sanity/lib/fetch'
import {
  PROJECT_BY_SLUG_QUERY,
  PROJECT_SLUGS_QUERY,
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

type ProjectDetail = Project & {
  body?: unknown
  gallery?: Array<{
    _key?: string
    asset?: { url?: string; metadata?: { lqip?: string } } | null
    alt?: string | null
  }> | null
  related?: Project[] | null
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<Array<{ slug: string }>>(PROJECT_SLUGS_QUERY)
  return slugs?.map(({ slug }) => ({ slug })) ?? []
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = await sanityFetch<ProjectDetail>(PROJECT_BY_SLUG_QUERY, { slug })
  if (!project) return { title: 'Dự án' }
  return {
    title: project.title,
    description: project.summary ?? undefined,
  }
}

function formatYear(iso?: string | null) {
  if (!iso) return null
  return new Date(iso).getFullYear()
}

export default async function DuAnDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [settings, project] = await Promise.all([
    sanityFetch<SettingsData>(SETTINGS_QUERY),
    sanityFetch<ProjectDetail>(PROJECT_BY_SLUG_QUERY, { slug }),
  ])

  if (!project) notFound()

  const coverUrl = project.coverImage?.asset?.url
  const coverLqip = project.coverImage?.asset?.metadata?.lqip
  const coverAlt = project.coverImage?.alt ?? project.title
  const year = formatYear(project.completedAt)

  const meta = [
    project.category ? PROJECT_CATEGORY_LABEL[project.category] : null,
    project.location,
    project.area ? `${project.area} m²` : null,
    year ? `Hoàn thành ${year}` : null,
  ].filter(Boolean) as string[]

  return (
    <>
      <Nav siteName={settings?.siteName ?? 'Tosa Home'} />
      <main className="flex-1">
        <section className="border-b border-line bg-cream pt-12 pb-10 md:pt-16">
          <Container>
            <Link
              href="/du-an"
              className="inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink"
            >
              <ArrowLeft size={16} />
              Tất cả dự án
            </Link>

            <h1 className="mt-8 max-w-[20ch] font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink md:text-6xl">
              {project.title}
            </h1>

            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
              {meta.map((m) => (
                <li key={m} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-tan" aria-hidden />
                  {m}
                </li>
              ))}
            </ul>
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
          <Container className="max-w-[820px]">
            {project.summary ? (
              <p className="font-display text-xl leading-relaxed tracking-tight text-ink md:text-2xl">
                {project.summary}
              </p>
            ) : null}

            {project.body ? (
              <div className="mt-8">
                <PortableTextBody value={project.body} />
              </div>
            ) : null}
          </Container>
        </section>

        {project.gallery?.length ? (
          <section className="bg-cream pb-16 md:pb-24">
            <Container>
              <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
                {project.gallery.map((img, i) => {
                  const url = img.asset?.url
                  if (!url) return null
                  return (
                    <li
                      key={img._key ?? i}
                      className={`relative w-full overflow-hidden bg-line ${i % 3 === 0 ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}
                    >
                      <Image
                        src={url}
                        alt={img.alt ?? project.title}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        placeholder={img.asset?.metadata?.lqip ? 'blur' : undefined}
                        blurDataURL={img.asset?.metadata?.lqip ?? undefined}
                        className="object-cover"
                      />
                    </li>
                  )
                })}
              </ul>
            </Container>
          </section>
        ) : null}

        {project.related?.length ? (
          <section className="border-t border-line bg-paper py-16 md:py-24">
            <Container>
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink md:text-4xl">
                Các dự án liên quan
              </h2>
              <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
                {project.related.map((rel) => (
                  <li key={rel._id}>
                    <ProjectCard project={rel} />
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
