/** The small topographic map that sits inside the hero headline. Sized in em so it scales with the type. */
export function MapChip({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 100" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <clipPath id="mapchip-clip">
          <rect width="260" height="100" rx="50" />
        </clipPath>
      </defs>
      <rect width="260" height="100" rx="50" className="fill-spruce" />
      <g fill="none" className="stroke-evergreen" strokeWidth="1.5" clipPath="url(#mapchip-clip)">
        <path d="M-10 80 C40 60 70 90 120 70 S200 30 270 55" />
        <path d="M-10 64 C35 46 75 72 122 54 S205 14 270 38" />
        <path d="M-10 48 C30 32 80 54 124 38 S210 0 270 22" />
        <path d="M60 50 C80 30 120 28 140 44 C160 60 120 76 90 70 C70 66 52 62 60 50 Z" />
        <path d="M84 52 C94 42 116 40 124 49 C130 57 110 64 98 62 C88 60 80 58 84 52 Z" />
      </g>
      <circle cx="106" cy="52" r="7" className="fill-alpenglow" />
      <circle cx="106" cy="52" r="14" fill="none" className="stroke-alpenglow" strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}
