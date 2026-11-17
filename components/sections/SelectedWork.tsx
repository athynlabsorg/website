import { ContentText, GroupPlaceholderTag } from "@/components/ContentText";
import { SectionHeading } from "@/components/SectionHeading";
import { home } from "@/content/home";

export function SelectedWork() {
  const { work } = home;
  return (
    <section id="work" aria-labelledby="work-heading" className="px-5 pb-24 md:px-[72px] md:pb-36">
      <div className="flex flex-col gap-6 border-t-2 border-spruce pt-14 lg:flex-row lg:items-end lg:justify-between lg:pt-[72px]">
        <SectionHeading id="work-heading" text={work.heading} accent={work.accent} />
        <p className="max-w-[420px] text-lg leading-7 text-lichen">{work.note}</p>
      </div>
      <ul className="mt-10 lg:mt-14">
        {work.cases.map((c, i) => (
          <li key={i} className="flex flex-col gap-4 border-b border-line py-10 md:flex-row md:gap-12">
            <div className="flex shrink-0 flex-col gap-1 md:w-[300px]">
              <span className="font-display text-[clamp(56px,6vw,80px)] leading-none font-extrabold tracking-[-0.05em] text-evergreen">
                <ContentText f={c.metric} tag={false} />
              </span>
              <span className="text-[15px] text-lichen">
                <ContentText f={c.metricLabel} tag={false} />
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-2.5">
              <span className="text-sm font-semibold tracking-[0.08em] text-lichen uppercase">
                <ContentText f={c.sector} tag={false} />
              </span>
              <p className="max-w-[620px] font-display text-[clamp(22px,2.2vw,30px)] leading-[1.2] font-bold tracking-[-0.02em]">
                <ContentText f={c.summary} tag={false} />
              </p>
            </div>
            <GroupPlaceholderTag fields={[c.metric, c.metricLabel, c.sector, c.summary]} className="shrink-0 self-start md:pt-1" />
          </li>
        ))}
      </ul>
    </section>
  );
}
