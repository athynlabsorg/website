export function LogoMark({ className, variant = "dark" }: { className?: string; variant?: "dark" | "light" }) {
  const mountain = variant === "dark" ? "fill-spruce" : "fill-snow";
  const snowcap = variant === "dark" ? "fill-snow" : "fill-spruce";
  return (
    <svg viewBox="0 0 34 26" width="34" height="26" className={className} aria-hidden="true">
      <path d="M1 25 L12 6 L18 15 L23 9 L33 25 Z" className={mountain} />
      <path d="M12 6 L15.5 12 L13 11 L10.5 13 Z" className={snowcap} />
      <circle cx="27" cy="5" r="3.5" className="fill-alpenglow" />
    </svg>
  );
}
