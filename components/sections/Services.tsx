import { ServiceIcon } from "@/components/art/ServiceIcon";
import { SectionHeading } from "@/components/SectionHeading";
import { home } from "@/content/home";

export function Services() {
  const { services } = home;
  return (
    <section id="services" aria-labelledby="services-heading" className="px-5 pt-10 pb-24 md:px-[72px] md:pb-36">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading id="services-heading" text={services.heading} accent={services.accent} className="max-w-[760px]" />
        <p className="max-w-[380px] text-lg leading-7 text-lichen">{services.note}</p>
      </div>
      <ul className="mt-14 grid gap-8 lg:mt-[72px] lg:grid-cols-3">
        {services.cards.map((card) => {
          const dark = card.tone === "evergreen";
          return (
            <li
              key={card.title}
              className={`flex flex-col gap-16 rounded-xl border-2 border-spruce p-8 shadow-offset-sm ${dark ? "bg-evergreen" : "bg-snow"}`}
            >
              <ServiceIcon name={card.icon} />
              <div className="flex flex-col gap-3">
                <h3
                  className={`font-display text-[clamp(28px,2.5vw,36px)] leading-[1.06] font-extrabold tracking-[-0.03em] ${dark ? "text-snow" : "text-spruce"}`}
                >
                  {card.title}
                </h3>
                <p className={`text-[17px] leading-[26px] ${dark ? "text-mint-text" : "text-spruce"}`}>{card.body}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
