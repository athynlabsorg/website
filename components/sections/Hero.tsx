import { CtaLink } from "@/components/CtaLink";
import { MapChip } from "@/components/art/MapChip";
import { home } from "@/content/home";
import { val } from "@/lib/placeholder";

export function Hero() {
  const { hero, site } = home;
  const accent = "font-accent font-normal italic text-evergreen text-[1.12em] tracking-[-0.03em]";
  return (
    <section aria-labelledby="hero-heading" className="px-5 pt-14 pb-20 md:px-[72px] md:pt-24 md:pb-24">
      <h1
        id="hero-heading"
        className="font-display text-[clamp(48px,9.2vw,132px)] leading-[0.94] font-extrabold tracking-[-0.045em]"
      >
        {/* The {" "} nodes keep the text a sentence for crawlers and screen readers; layout ignores them. */}
        <span className="block">{hero.line1}</span>{" "}
        <span className="flex items-center gap-[0.21em]">
          <span>{hero.line2}</span>{" "}
          <MapChip className="h-[0.76em] w-[1.97em] shrink-0 -rotate-3" />
          <span className={accent}>{hero.accent1}</span>
        </span>{" "}
        <span className={`block leading-[1.03] ${accent}`}>{hero.accent2}</span>
      </h1>

      <div className="mt-10 flex max-w-[470px] flex-col gap-7 lg:-mt-12 lg:ml-auto">
        <p className="text-lg leading-[1.55] md:text-xl md:leading-[30px]">{hero.intro}</p>
        <div className="flex flex-wrap items-center gap-6">
          <CtaLink href={val(site.bookingUrl)} tone="spruce">
            {hero.primary}
          </CtaLink>
          <a href={hero.secondary.href} className="text-[17px] font-semibold text-evergreen underline underline-offset-4">
            {hero.secondary.label}
          </a>
        </div>
      </div>
    </section>
  );
}
