/** Big display heading with one italic accent phrase (spec §6). */
export function SectionHeading({
  id,
  text,
  accent,
  tone = "dark",
  className = "",
}: {
  id: string;
  text: string;
  accent: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  const base = tone === "dark" ? "text-spruce" : "text-snow";
  const accentColor = tone === "dark" ? "text-evergreen" : "text-alpenglow";
  return (
    <h2
      id={id}
      className={`font-display text-[clamp(44px,5vw,72px)] leading-none font-extrabold tracking-[-0.04em] ${base} ${className}`}
    >
      {text}{" "}
      <span className={`font-accent text-[1.11em] font-normal italic tracking-[-0.02em] ${accentColor}`}>{accent}</span>
    </h2>
  );
}
