const PROFILE =
  "M0 352 C100 346 200 336 332 290 C432 278 472 230 592 210 C712 190 772 150 892 120 C1002 92 1072 60 1172 46 C1252 36 1312 40 1440 26";

/** Full-bleed mountain profile for "How a project goes". Waypoints at (332,290), (792,158), (1222,40). */
export function Elevation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1440 500" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path d={`${PROFILE} L1440 500 L0 500 Z`} className="fill-alpenglow" opacity="0.6" />
      <path
        data-trail
        d={PROFILE}
        fill="none"
        className="stroke-spruce"
        strokeWidth="3"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Waypoint positions as % of the 1440×500 viewBox, shared by dots and labels. */
export const WAYPOINTS: { x: number; y: number; summit?: boolean }[] = [
  { x: (332 / 1440) * 100, y: (290 / 500) * 100 },
  { x: (792 / 1440) * 100, y: (158 / 500) * 100 },
  { x: (1222 / 1440) * 100, y: (40 / 500) * 100, summit: true },
];
