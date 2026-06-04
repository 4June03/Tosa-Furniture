import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/sections/Hero'
import { TrustBand } from '@/components/sections/TrustBand'
import { FeaturedProjects } from '@/components/sections/FeaturedProjects'
import { ServicesList } from '@/components/sections/ServicesList'
import { Process } from '@/components/sections/Process'
import { AboutSnippet } from '@/components/sections/AboutSnippet'
import { LatestPosts } from '@/components/sections/LatestPosts'
import { ContactCta } from '@/components/sections/ContactCta'
import { sanityFetch } from '@/sanity/lib/fetch'
import {
  SETTINGS_QUERY,
  HOME_PAGE_QUERY,
  ABOUT_HIGHLIGHTS_QUERY,
  LATEST_POSTS_QUERY,
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
  contact?: {
    phone?: string | null
    email?: string | null
    zalo?: string | null
  } | null
}

type HomeData = {
  heroSlides?: Array<{
    key?: string
    heading?: string | null
    subheading?: string | null
    ctaLabel?: string | null
    ctaHref?: string | null
    image?: {
      asset?: { url?: string; metadata?: { lqip?: string } } | null
      alt?: string | null
    } | null
  }> | null
  featuredProjects?: Array<{
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
  }> | null
  featuredServices?: Array<{
    _id: string
    title: string
    slug: string
    summary?: string | null
  }> | null
}

type AboutData = {
  heroHeading?: string | null
  heroSubheading?: string | null
  foundedYear?: number | null
  highlights?: Array<{ key?: string; value: string; label: string }> | null
}

type PostData = {
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

export default async function HomePage() {
  const [settings, home, about, posts] = await Promise.all([
    sanityFetch<SettingsData>(SETTINGS_QUERY),
    sanityFetch<HomeData>(HOME_PAGE_QUERY),
    sanityFetch<AboutData>(ABOUT_HIGHLIGHTS_QUERY),
    sanityFetch<PostData[]>(LATEST_POSTS_QUERY),
  ])

  return (
    <>
      <Nav siteName={settings?.siteName ?? 'Tosa Home'} />
      <main className="flex-1">
        <Hero slide={home?.heroSlides?.[0]} />
        <TrustBand
          highlights={about?.highlights}
          foundedYear={about?.foundedYear}
        />
        <FeaturedProjects projects={home?.featuredProjects} />
        <ServicesList services={home?.featuredServices} />
        <Process />
        <AboutSnippet
          heroHeading={about?.heroHeading}
          heroSubheading={about?.heroSubheading}
        />
        <LatestPosts posts={posts} />
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
