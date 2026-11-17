import { Elevation, WAYPOINTS } from "@/components/art/Elevation";
import { DrawOnView } from "@/components/DrawOnView";
import { SectionHeading } from "@/components/SectionHeading";
import { home } from "@/content/home";

/** Horizontal offset of each label from its waypoint, from Paper v3 (the summit label sits left so it stays on screen). */
const LABEL_OFFSET_PX = [-40, -40, -164];

export function Process() {
  const { process } = home;
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="bg-mist pt-24 md:pt-[120px]"
    >
      <SectionHeading
        id="process-heading"
        text={process.heading}
        accent={process.accent}
        className="px-5 md:px-[72px]"
      />

      {/* Desktop: labels hang under their waypoints on the profile. */}
      {/* The peach strip below the profile gives labels room to grow; they may overflow the profile box into it. */}
      <div className="mt-10 hidden xl:block">
        <div className="relative aspect-[1440/500] w-full">
          <DrawOnView className="absolute inset-0">
            <Elevation className="h-full w-full" />
          </DrawOnView>
          {WAYPOINTS.map((w, i) => (
            <span
              key={i}
              aria-hidden="true"
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-spruce ${w.summit ? "size-6 bg-evergreen" : "size-5 bg-snow"}`}
              style={{ left: `${w.x}%`, top: `${w.y}%` }}
            />
          ))}
          <ol className="absolute inset-0">
            {process.steps.map((s, i) => (
              <li
                key={s.title}
                className="absolute flex w-[320px] flex-col gap-1"
                style={{
                  left: `min(calc(${WAYPOINTS[i].x}% + ${LABEL_OFFSET_PX[i]}px), calc(100% - 344px))`,
                  top: `calc(${WAYPOINTS[i].y}% + 36px)`,
                }}
              >
                <StepText {...s} />
              </li>
            ))}
          </ol>
        </div>
        <div aria-hidden="true" className="h-28 bg-alpenglow/60" />
      </div>

      {/* Below xl: a short profile band, then the steps stacked on the alpenglow fill. */}
      <div className="mt-10 xl:hidden">
        <DrawOnView>
          <Elevation className="block h-[160px] w-full" />
        </DrawOnView>
        <ol className="flex flex-col gap-8 bg-alpenglow/60 px-5 pt-2 pb-16 md:grid md:grid-cols-3 md:px-[72px]">
          {process.steps.map((s) => (
            <li key={s.title} className="flex flex-col gap-1">
              <StepText {...s} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function StepText({
  label,
  title,
  body,
}: {
  label: string;
  title: string;
  body: string;
}) {
  return (
    <>
      <span className="text-[13px] font-semibold tracking-[0.1em] text-spruce uppercase">
        {label}
      </span>
      <h3 className="font-display text-[28px] font-extrabold tracking-[-0.02em]">
        {title}
      </h3>
      <p className="text-base leading-6">{body}</p>
    </>
  );
}
