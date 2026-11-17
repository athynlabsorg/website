import { CtaLink } from "@/components/CtaLink";
import { LogoMark } from "@/components/art/LogoMark";
import { home } from "@/content/home";
import { val } from "@/lib/placeholder";

export function Nav() {
  const { nav, site } = home;
  return (
    <header className="flex items-center justify-between px-5 py-6 md:px-[72px] md:py-8">
      <a href="#top" className="flex shrink-0 items-center gap-2 whitespace-nowrap md:gap-3">
        <LogoMark />
        <span className="font-display text-xl font-extrabold md:text-2xl tracking-[-0.03em]">
          athyn<span className="font-accent text-[26px] font-normal italic tracking-normal text-evergreen"> labs</span>
        </span>
      </a>
      <nav aria-label="Main" className="flex items-center gap-9">
        <ul className="hidden items-center gap-9 md:flex">
          {nav.links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-base font-medium hover:text-evergreen">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <CtaLink href={val(site.bookingUrl)} tone="alpenglow" size="sm">
          {nav.cta}
        </CtaLink>
      </nav>
    </header>
  );
}
