import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";

type HeroSlide = {
  key?: string;
  heading?: string | null;
  subheading?: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
  image?: {
    asset?: { url?: string; metadata?: { lqip?: string } } | null;
    alt?: string | null;
  } | null;
};

// Ảnh đặt trong public/. Mobile dùng ảnh dọc, desktop dùng ảnh ngang.
const FALLBACK_DESKTOP = "/images/hero-desktop.png";
const FALLBACK_MOBILE = "/images/hero-desktop.png";

export function Hero({ slide }: { slide?: HeroSlide | null }) {
  const heading = slide?.heading ?? "Không gian sống đúng chuẩn thiết kế";
  const subheading =
    slide?.subheading ??
    "Tosa thiết kế và thi công trọn gói biệt thự, nhà phố, chung cư. Đội ngũ kiến trúc sư đồng hành từ ý tưởng tới bàn giao.";
  const ctaLabel = slide?.ctaLabel ?? "Nhận tư vấn";
  const ctaHref = slide?.ctaHref ?? "/lien-he";
  const sanityUrl = slide?.image?.asset?.url;
  const lqip = slide?.image?.asset?.metadata?.lqip;
  const alt = slide?.image?.alt ?? "Không gian nội thất Tosa";
  const desktopSrc = sanityUrl ?? FALLBACK_DESKTOP;
  const mobileSrc = sanityUrl ?? FALLBACK_MOBILE;

  return (
    <section className="relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-ink">
      {/* Desktop: ảnh ngang */}
      <Image
        src={desktopSrc}
        alt={alt}
        fill
        priority
        sizes="100vw"
        placeholder={lqip ? "blur" : undefined}
        blurDataURL={lqip ?? undefined}
        className="hidden object-cover md:block"
      />
      {/* Mobile: ảnh dọc */}
      <Image
        src={mobileSrc}
        alt={alt}
        fill
        priority
        sizes="100vw"
        placeholder={lqip ? "blur" : undefined}
        blurDataURL={lqip ?? undefined}
        className="object-cover md:hidden"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/35 to-ink/60" />

      <Container className="relative z-10 flex h-full flex-col items-center justify-center text-center">
        <div className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] text-tan">
          <span className="h-px w-8 bg-tan" aria-hidden />
          Thiết kế &amp; thi công nội thất
          <span className="h-px w-8 bg-tan" aria-hidden />
        </div>

        <h1 className="mt-5 max-w-[20ch] font-display text-4xl font-extrabold leading-[1.04] tracking-tight text-cream sm:text-5xl md:text-6xl lg:text-7xl">
          {heading}
        </h1>

        <p className="mx-auto mt-6 max-w-[58ch] text-base leading-relaxed text-cream/85 md:text-lg">
          {subheading}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href={ctaHref} size="lg" variant="inverse">
            {ctaLabel}
            <ArrowRight weight="regular" size={18} />
          </Button>
          <Button href="/du-an" size="lg" variant="outline-light">
            Xem dự án
          </Button>
        </div>
      </Container>
    </section>
  );
}
