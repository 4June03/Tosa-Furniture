import { defineQuery } from 'next-sanity'

export const SETTINGS_QUERY = defineQuery(`
  *[_type == "settings"][0]{
    siteName,
    tagline,
    logo,
    showroom,
    contact,
    socialLinks
  }
`)

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage"][0]{
    heroSlides[]{
      "key": _key,
      heading,
      subheading,
      ctaLabel,
      ctaHref,
      image{
        ...,
        asset->{
          url,
          metadata{ dimensions, lqip }
        }
      }
    },
    introHeading,
    introBody,
    featuredProjects[]->{
      _id,
      title,
      "slug": slug.current,
      category,
      area,
      location,
      summary,
      coverImage{
        ...,
        asset->{ url, metadata{ dimensions, lqip } }
      }
    },
    featuredServices[]->{
      _id,
      title,
      "slug": slug.current,
      summary
    },
    seoTitle,
    seoDescription,
    ogImage
  }
`)

export const ABOUT_HIGHLIGHTS_QUERY = defineQuery(`
  *[_type == "aboutPage"][0]{
    heroHeading,
    heroSubheading,
    foundedYear,
    highlights[]{
      "key": _key,
      value,
      label
    }
  }
`)

export const LATEST_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(publishedAt)] | order(publishedAt desc)[0...3]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    publishedAt,
    coverImage{
      ...,
      asset->{ url, metadata{ dimensions, lqip } }
    }
  }
`)
