import Image from 'next/image'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { urlFor } from '@/sanity/lib/image'

type SanityImageBlock = {
  _key: string
  _type: 'image'
  asset?: {
    _ref?: string
    url?: string
    metadata?: { lqip?: string; dimensions?: { width: number; height: number } }
  }
  alt?: string
  caption?: string
  hotspot?: { x: number; y: number }
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 font-display text-xl font-semibold tracking-tight text-ink md:text-2xl">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 font-display text-lg font-semibold tracking-tight text-ink">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mt-5 text-base leading-relaxed text-ink-soft md:text-lg">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-8 border-l-2 border-tan pl-5 font-display text-lg italic leading-relaxed text-ink md:text-xl">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="text-ink">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-tan-dark underline underline-offset-2 hover:text-ink"
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={value?.href?.startsWith('http') ? 'noreferrer' : undefined}
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 list-disc space-y-2 pl-5 text-base text-ink-soft md:text-lg">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-2 pl-5 text-base text-ink-soft md:text-lg">
        {children}
      </ol>
    ),
  },
  types: {
    image: ({ value }: { value: SanityImageBlock }) => {
      if (!value?.asset) return null
      const url = urlFor(value).width(1600).fit('max').auto('format').url()
      const w = value.asset.metadata?.dimensions?.width ?? 1600
      const h = value.asset.metadata?.dimensions?.height ?? 1200
      return (
        <figure className="mt-10">
          <div className="relative w-full overflow-hidden bg-line">
            <Image
              src={url}
              alt={value.alt ?? ''}
              width={w}
              height={h}
              sizes="(min-width: 1024px) 800px, 100vw"
              placeholder={value.asset.metadata?.lqip ? 'blur' : undefined}
              blurDataURL={value.asset.metadata?.lqip ?? undefined}
              className="h-auto w-full object-cover"
            />
          </div>
          {value.caption ? (
            <figcaption className="mt-3 text-sm text-ink-muted">
              {value.caption}
            </figcaption>
          ) : null}
        </figure>
      )
    },
  },
}

export function PortableTextBody({ value }: { value: unknown }) {
  if (!value) return null
  return (
    <div className="prose-tosa">
      <PortableText value={value as never} components={components} />
    </div>
  )
}
