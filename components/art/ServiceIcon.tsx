export type ServiceIconName = "agents" | "product" | "public";

export function ServiceIcon({ name }: { name: ServiceIconName }) {
  const common = { width: 56, height: 56, viewBox: "0 0 56 56", "aria-hidden": true } as const;
  if (name === "agents") {
    return (
      <svg {...common}>
        <circle cx="28" cy="28" r="9" className="fill-alpenglow stroke-spruce" strokeWidth="2.5" />
        <g fill="none" className="stroke-spruce" strokeWidth="2.5" strokeLinecap="round">
          <circle cx="9" cy="12" r="5" />
          <circle cx="47" cy="12" r="5" />
          <circle cx="28" cy="49" r="5" />
          <path d="M13 15.5 L21 22 M43 15.5 L35 22 M28 37 V44" />
        </g>
      </svg>
    );
  }
  if (name === "product") {
    return (
      <svg {...common}>
        <path d="M28 6 L50 17 L28 28 L6 17 Z" className="fill-alpenglow stroke-spruce" strokeWidth="2.5" strokeLinejoin="round" />
        <g fill="none" className="stroke-spruce" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 28 L28 39 L50 28" />
          <path d="M6 39 L28 50 L50 39" />
        </g>
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M6 20 L28 7 L50 20 Z" className="fill-alpenglow stroke-snow" strokeWidth="2.5" strokeLinejoin="round" />
      <g fill="none" className="stroke-snow" strokeWidth="2.5" strokeLinecap="round">
        <path d="M13 25 V43 M23 25 V43 M33 25 V43 M43 25 V43" />
        <path d="M6 49 H50" />
      </g>
    </svg>
  );
}
