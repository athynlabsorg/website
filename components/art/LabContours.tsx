const BLOB = "M0,-100 C60,-100 110,-50 105,5 C100,60 50,95 -5,92 C-65,88 -110,45 -100,-10 C-92,-60 -55,-100 0,-100 Z";

/** Topographic map behind the lab section (1440×880). Peaks: Praxis (420,520), Agent Review (960,400), Toren (1210,660). */
export function LabContours({
  className,
  preserveAspectRatio,
  maskId,
}: {
  className?: string;
  preserveAspectRatio?: string;
  /** Unique per instance: the dotted trail is revealed through a solid mask path (data-trail). */
  maskId: string;
}) {
  const TRAIL = "M420 520 C560 520 700 380 960 400 S1150 560 1210 660";
  return (
    <svg viewBox="0 0 1440 880" className={className} preserveAspectRatio={preserveAspectRatio} aria-hidden="true">
      <g fill="none" className="stroke-contour-outer" strokeWidth="1.4">
        <path d="M-20 140 C200 90 380 190 640 130 S1100 60 1460 120" />
        <path d="M-20 200 C220 150 400 250 660 190 S1120 120 1460 180" />
        <path d="M-20 820 C240 760 520 860 800 790 S1200 740 1460 800" />
        <path d="M-20 860 C260 810 540 900 820 840 S1220 790 1460 850" />
      </g>
      <g fill="none" className="stroke-contour" strokeWidth="1.4" vectorEffect="non-scaling-stroke">
        <g transform="translate(420 520) rotate(-12)">
          <path transform="scale(2.4)" d={BLOB} />
          <path transform="scale(1.95)" d={BLOB} />
          <path transform="scale(1.5)" d={BLOB} />
          <path transform="scale(1.05)" d={BLOB} />
          <path transform="scale(0.62)" d={BLOB} />
          <path transform="scale(0.26)" d={BLOB} />
        </g>
        <g transform="translate(960 400) rotate(28)">
          <path transform="scale(1.7)" d={BLOB} />
          <path transform="scale(1.3)" d={BLOB} />
          <path transform="scale(0.9)" d={BLOB} />
          <path transform="scale(0.5)" d={BLOB} />
          <path transform="scale(0.18)" d={BLOB} />
        </g>
        <g transform="translate(1210 660) rotate(70)">
          <path transform="scale(1.5)" d={BLOB} />
          <path transform="scale(1.1)" d={BLOB} />
          <path transform="scale(0.72)" d={BLOB} />
          <path transform="scale(0.36)" d={BLOB} />
        </g>
      </g>
      <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="1440" height="880">
        <path data-trail d={TRAIL} fill="none" stroke="white" strokeWidth="8" strokeLinecap="round" />
      </mask>
      <path
        d={TRAIL}
        mask={`url(#${maskId})`}
        fill="none"
        className="stroke-alpenglow"
        strokeWidth="2"
        strokeDasharray="2 9"
        strokeLinecap="round"
      />
    </svg>
  );
}

export const PEAKS = [
  { x: 420, y: 520 },
  { x: 960, y: 400 },
  { x: 1210, y: 660 },
] as const;
