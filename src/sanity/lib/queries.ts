import { defineQuery } from 'next-sanity'

/* -------- Settings -------- */
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

/* -------- Home -------- */
export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage"][0]{
    heroSlides[]{
      "key": _key,
      heading, subheading, ctaLabel, ctaHref,
      image{
        ..., asset->{ url, metadata{ dimensions, lqip } }
      }
    },
    introHeading, introBody,
    featuredProjects[]->{
      _id, title, "slug": slug.current, category, area, location, summary,
      coverImage{ ..., asset->{ url, metadata{ dimensions, lqip } } }
    },
    featuredServices[]->{
      _id, title, "slug": slug.current, summary
    },
    seoTitle, seoDescription, ogImage
  }
`)

/* -------- About full page -------- */
export const ABOUT_PAGE_QUERY = defineQuery(`
  *[_type == "aboutPage"][0]{
    heroHeading, heroSubheading,
    heroImage{ ..., asset->{ url, metadata{ dimensions, lqip } } },
    foundedYear,
    highlights[]{ "key": _key, value, label },
    storyHeading, storyBody, missionStatement,
    teamPhoto{ ..., asset->{ url, metadata{ dimensions, lqip } } },
    workshopGallery[]{ ..., asset->{ url, metadata{ dimensions, lqip } } },
    seoTitle, seoDescription
  }
`)

export const ABOUT_HIGHLIGHTS_QUERY = defineQuery(`
  *[_type == "aboutPage"][0]{
    heroHeading, heroSubheading, foundedYear,
    highlights[]{ "key": _key, value, label }
  }
`)

/* -------- Services -------- */
export const ALL_SERVICES_QUERY = defineQuery(`
  *[_type == "service"] | order(order asc){
    _id, title, "slug": slug.current, summary,
    icon{ ..., asset->{ url, metadata{ dimensions, lqip } } }
  }
`)

export const SERVICE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "service" && slug.current == $slug][0]{
    _id, title, "slug": slug.current, summary, body,
    icon{ ..., asset->{ url, metadata{ dimensions, lqip } } }
  }
`)

export const SERVICE_SLUGS_QUERY = defineQuery(`
  *[_type == "service" && defined(slug.current)]{ "slug": slug.current }
`)

/* -------- Projects -------- */
export const PROJECTS_INDEX_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current) && (!defined($category) || category == $category)]
  | order(completedAt desc)[0...$limit]{
    _id, title, "slug": slug.current, category, area, location, summary, completedAt,
    coverImage{ ..., asset->{ url, metadata{ dimensions, lqip } } }
  }
`)

export const PROJECTS_COUNT_QUERY = defineQuery(`
  count(*[_type == "project" && defined(slug.current) && (!defined($category) || category == $category)])
`)

export const PROJECT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0]{
    _id, title, "slug": slug.current, category, area, location, completedAt,
    summary, body, featured,
    coverImage{ ..., asset->{ url, metadata{ dimensions, lqip } } },
    gallery[]{ ..., asset->{ url, metadata{ dimensions, lqip } } },
    "related": *[_type == "project" && slug.current != $slug && category == ^.category]
      | order(completedAt desc)[0...3]{
        _id, title, "slug": slug.current, category, area, location,
        coverImage{ ..., asset->{ url, metadata{ dimensions, lqip } } }
      }
  }
`)

export const PROJECT_SLUGS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)]{ "slug": slug.current }
`)

/* -------- Posts -------- */
export const LATEST_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(publishedAt)] | order(publishedAt desc)[0...3]{
    _id, title, "slug": slug.current, excerpt, category, publishedAt,
    coverImage{ ..., asset->{ url, metadata{ dimensions, lqip } } }
  }
`)

export const POSTS_INDEX_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current) && defined(publishedAt)]
  | order(publishedAt desc)[$start...$end]{
    _id, title, "slug": slug.current, excerpt, category, publishedAt,
    coverImage{ ..., asset->{ url, metadata{ dimensions, lqip } } }
  }
`)

export const POSTS_COUNT_QUERY = defineQuery(`
  count(*[_type == "post" && defined(slug.current) && defined(publishedAt)])
`)

export const POST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    _id, title, "slug": slug.current, excerpt, category, publishedAt, body,
    seoTitle, seoDescription,
    coverImage{ ..., asset->{ url, metadata{ dimensions, lqip } } },
    "related": *[_type == "post" && slug.current != $slug && defined(publishedAt)]
      | order(publishedAt desc)[0...3]{
        _id, title, "slug": slug.current, excerpt, category, publishedAt,
        coverImage{ ..., asset->{ url, metadata{ dimensions, lqip } } }
      }
  }
`)

export const POST_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]{ "slug": slug.current }
`)
