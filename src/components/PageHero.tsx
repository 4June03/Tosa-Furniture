import { Container } from './ui/Container'

export function PageHero({
  eyebrow,
  heading,
  subheading,
}: {
  eyebrow?: string
  heading: string
  subheading?: string | null
}) {
  return (
    <section className="border-b border-line bg-cream pt-16 pb-14 md:pt-24 md:pb-20">
      <Container>
        {eyebrow ? (
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-tan">
            <span className="h-px w-8 bg-tan" aria-hidden />
            {eyebrow}
          </div>
        ) : null}
        <h1 className="mt-5 max-w-[22ch] font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink md:text-6xl">
          {heading}
        </h1>
        {subheading ? (
          <p className="mt-6 max-w-[60ch] text-base leading-relaxed text-ink-soft md:text-lg">
            {subheading}
          </p>
        ) : null}
      </Container>
    </section>
  )
}
