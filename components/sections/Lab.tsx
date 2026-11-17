import { Flag } from "@/components/art/Flag";
import { LabContours, PEAKS } from "@/components/art/LabContours";
import { DrawOnView } from "@/components/DrawOnView";
import { LabCard } from "@/components/sections/LabCard";
import { home } from "@/content/home";

/** Card width (px at 1440) and side of the flag each card sits on, from Paper v3. */
const LAYOUT = [
  { widthPx: 310, side: "right" },
  { widthPx: 380, side: "right" },
  { widthPx: 380, side: "left" },
] as const;

// Flag artwork is 32×40 with its base dot at (16,36); gap between flag and card is 18 (all px at 1440).
const cq = (px: number) => (px / 1440) * 100;

export function Lab() {
  const { lab } = home;
  return (
    <section id="lab" aria-labelledby="lab-heading" data-surface="dark" className="bg-spruce">
      {/* Desktop (xl+): the whole map scales as one picture via container query units. */}
      <div className="@container relative hidden aspect-[1440/880] w-full overflow-hidden xl:block">
        <DrawOnView className="absolute inset-0">
          <LabContours className="h-full w-full" maskId="lab-trail-desktop" />
        </DrawOnView>
        <Heading lab={lab} scaled />
        {lab.products.map((p, i) => {
          const { widthPx, side } = LAYOUT[i];
          const groupPx = 32 + 18 + widthPx;
          const dotFromLeftPx = side === "right" ? 16 : groupPx - 16;
          return (
            <div
              key={i}
              className={`absolute flex items-start gap-[1.25cqw] ${side === "left" ? "flex-row-reverse" : ""}`}
              style={{
                left: `calc(${(PEAKS[i].x / 1440) * 100}% - ${cq(dotFromLeftPx)}cqw)`,
                top: `calc(${(PEAKS[i].y / 880) * 100}% - ${cq(36)}cqw)`,
              }}
            >
              <Flag className="h-[2.78cqw] w-[2.22cqw] shrink-0" />
              <LabCard product={p} widthPx={widthPx} scaled />
            </div>
          );
        })}
      </div>

      {/* Below xl: heading over a cropped map banner, then the products stacked. */}
      <div className="xl:hidden">
        <div className="relative h-[260px] overflow-hidden">
          <DrawOnView className="absolute inset-0">
            <LabContours className="h-full w-full" preserveAspectRatio="xMidYMid slice" maskId="lab-trail-mobile" />
          </DrawOnView>
          <Heading lab={lab} scaled={false} />
        </div>
        <ul className="flex flex-col gap-4 px-5 pb-20 md:px-[72px]">
          {lab.products.map((p, i) => (
            <li key={i}>
              <LabCard product={p} widthPx={LAYOUT[i].widthPx} scaled={false} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Heading({ lab, scaled }: { lab: typeof home.lab; scaled: boolean }) {
  return (
    <div
      className={
        scaled
          ? "absolute top-[6.11cqw] left-[5cqw] flex w-[43cqw] flex-col gap-[0.97cqw]"
          : "relative flex flex-col gap-2 px-5 pt-16 md:px-[72px]"
      }
    >
      <p className={`-rotate-2 font-hand font-semibold text-alpenglow ${scaled ? "text-[1.94cqw]" : "text-2xl"}`}>{lab.kicker}</p>
      <h2
        id={scaled ? "lab-heading" : undefined}
        className={`font-display leading-none font-extrabold tracking-[-0.04em] text-snow ${scaled ? "text-[5cqw]" : "text-[clamp(40px,8vw,64px)]"}`}
      >
        {lab.heading}{" "}
        <span className="font-accent text-[1.11em] font-normal italic tracking-[-0.02em] text-alpenglow">{lab.accent}</span>
      </h2>
    </div>
  );
}
