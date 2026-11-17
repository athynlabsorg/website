export function Flag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 40" className={className} aria-hidden="true">
      <path d="M16 4 V36" className="stroke-alpenglow" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M17 5 L30 10 L17 15 Z" className="fill-alpenglow" />
      <circle cx="16" cy="36" r="4" className="fill-alpenglow" />
    </svg>
  );
}
