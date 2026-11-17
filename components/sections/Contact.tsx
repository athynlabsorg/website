import { ContentText } from "@/components/ContentText";
import { CtaLink } from "@/components/CtaLink";
import { home } from "@/content/home";
import { val } from "@/lib/placeholder";

export function Contact() {
  const { contact, site } = home;
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      data-surface="dark"
      className="flex flex-col gap-14 bg-evergreen px-5 pt-24 pb-28 md:px-[72px] md:pt-[140px]"
    >
      <h2
        id="contact-heading"
        className="max-w-[1200px] font-display text-[clamp(56px,10.4vw,150px)] leading-[0.9] font-extrabold tracking-[-0.05em] text-snow"
      >
        {contact.heading}{" "}
        <span className="font-accent text-[1.09em] font-normal italic tracking-[-0.03em] text-alpenglow">{contact.accent}</span>
      </h2>

      <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-9">
        <CtaLink href={val(site.bookingUrl)} tone="alpenglow" size="lg">
          {contact.button}
        </CtaLink>
        <p className="text-[19px] text-mint-text">
          {contact.emailLead}{" "}
          <a href={`mailto:${val(site.email)}`} className="text-snow underline underline-offset-4">
            <ContentText f={site.email} />
          </a>
        </p>
      </div>
    </section>
  );
}
