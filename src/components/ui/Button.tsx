import Link from 'next/link'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'ghost' | 'inverse' | 'outline-light'
type Size = 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 font-medium tracking-tight ' +
  'transition-[transform,background-color,color] duration-200 ease-out ' +
  'active:translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tan focus-visible:ring-offset-2 focus-visible:ring-offset-cream'

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-cream hover:bg-tan hover:text-ink',
  ghost: 'border border-ink text-ink hover:bg-ink hover:text-cream',
  inverse: 'bg-cream text-ink hover:bg-tan hover:text-cream',
  'outline-light': 'border border-cream/60 text-cream hover:bg-cream hover:text-ink',
}

const sizes: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

export function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
}: {
  children: ReactNode
  href: string
  variant?: Variant
  size?: Size
  className?: string
}) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  )
}
