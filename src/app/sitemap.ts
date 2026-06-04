import type { MetadataRoute } from 'next'
import { sanityFetch } from '@/sanity/lib/fetch'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tosa.home.vn'

const SLUGS_QUERY = `{
  "services": *[_type == "service" && defined(slug.current)]{ "slug": slug.current, _updatedAt },
  "projects": *[_type == "project" && defined(slug.current)]{ "slug": slug.current, _updatedAt },
  "posts": *[_type == "post" && defined(slug.current) && defined(publishedAt)]{ "slug": slug.current, _updatedAt }
}`

type SlugRow = { slug: string; _updatedAt: string }
type SlugsData = {
  services: SlugRow[] | null
  projects: SlugRow[] | null
  posts: SlugRow[] | null
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await sanityFetch<SlugsData>(SLUGS_QUERY, {}, { revalidate: 3600 })
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/gioi-thieu`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/dich-vu`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/du-an`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/tin-tuc`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/lien-he`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
  ]

  const services = (data?.services ?? []).map((r) => ({
    url: `${SITE_URL}/dich-vu/${r.slug}`,
    lastModified: new Date(r._updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const projects = (data?.projects ?? []).map((r) => ({
    url: `${SITE_URL}/du-an/${r.slug}`,
    lastModified: new Date(r._updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const posts = (data?.posts ?? []).map((r) => ({
    url: `${SITE_URL}/tin-tuc/${r.slug}`,
    lastModified: new Date(r._updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...services, ...projects, ...posts]
}
