import Image from "next/image";
import { ContentText, GroupPlaceholderTag } from "@/components/ContentText";
import { home } from "@/content/home";
import { val } from "@/lib/placeholder";

export function About() {
  const { about } = home;
  const photo = val(about.photo);
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="flex flex-col gap-12 px-5 py-24 md:px-[72px] lg:flex-row lg:items-center lg:gap-24 lg:py-[140px]"
    >
      <div className="relative aspect-[4/5] w-full max-w-[440px] shrink-0 overflow-hidden rounded-xl border-2 border-spruce bg-evergreen shadow-offset-lg [--tw-shadow-color:var(--color-alpenglow)] lg:w-[440px]">
        {photo ? (
          <Image src={photo} alt="Fodilu Akorede" fill sizes="440px" className="object-cover" />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3">
            <span className="font-display text-[120px] font-extrabold tracking-[-0.05em] text-snow" aria-hidden="true">
              {about.initials}
            </span>
            <GroupPlaceholderTag fields={[about.photo]} />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-7">
        <p className="-rotate-2 font-hand text-[34px] font-bold text-evergreen">{about.greeting}</p>
        <h2
          id="about-heading"
          className="font-display text-[clamp(40px,4.2vw,60px)] leading-[1.03] font-extrabold tracking-[-0.04em]"
        >
          {about.heading}{" "}
          <span className="font-accent text-[1.13em] font-normal italic tracking-[-0.02em] text-evergreen">{about.accent}</span>
        </h2>
        <p className="max-w-[620px] text-[19px] leading-[30px]">
          <ContentText f={about.bio} />
        </p>
        <ul className="flex flex-wrap gap-x-12 gap-y-6 border-t border-line pt-7">
          {about.credentials.map((c, i) => (
            <li key={i} className="flex flex-col gap-1">
              <span className="font-display text-[40px] leading-tight font-extrabold tracking-[-0.03em]">
                <ContentText f={c.figure} tag={false} />
              </span>
              <span className="text-[15px] text-lichen">
                <ContentText f={c.label} tag={false} />
              </span>
              <GroupPlaceholderTag fields={[c.figure, c.label]} className="-ml-2" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
