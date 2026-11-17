import { ContentText, GroupPlaceholderTag } from "@/components/ContentText";
import { LogoMark } from "@/components/art/LogoMark";
import { home } from "@/content/home";
import { val } from "@/lib/placeholder";

/** Page footer; shares the contact section's evergreen ground so the two read as one block. */
export function Footer() {
  const { footer, site } = home;
  const links = [
    { label: "LinkedIn", f: site.linkedin },
    { label: "GitHub", f: site.github },
  ];
  return (
    <footer data-surface="dark" className="bg-evergreen px-5 pb-12 md:px-[72px]">
      <div className="flex flex-col gap-6 border-t border-footer-rule pt-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <LogoMark variant="light" className="h-[22px] w-7 shrink-0" />
          <p className="text-[15px] text-mint-text">
            <ContentText f={site.legalName} /> {footer.tagline}
          </p>
        </div>
        <ul className="flex items-center gap-8 text-[15px] font-medium text-snow">
          {links.map((l) => (
            <li key={l.label}>
              <a href={val(l.f)} className="hover:underline">
                {l.label}
              </a>
              <GroupPlaceholderTag fields={[l.f]} />
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
