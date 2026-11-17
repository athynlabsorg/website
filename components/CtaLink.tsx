import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tones = {
  alpenglow: "bg-alpenglow text-spruce border-spruce [--tw-shadow-color:var(--color-spruce)] hover:bg-alpenglow",
  spruce: "bg-spruce text-snow border-spruce [--tw-shadow-color:var(--color-alpenglow)] hover:bg-spruce",
} as const;

const sizes = {
  sm: "px-3.5 py-2.5 text-sm md:px-5 md:py-3 md:text-base shadow-offset-xs",
  md: "px-6 py-4 text-[17px] shadow-offset-sm",
  lg: "px-8 py-5 text-[19px] shadow-offset",
} as const;

/** shadcn button styling on a plain link: 2px border, hard offset shadow, subtle press. */
export function CtaLink({
  href,
  tone,
  size = "md",
  className,
  children,
}: {
  href: string;
  tone: keyof typeof tones;
  size?: keyof typeof sizes;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={cn(
        buttonVariants(),
        "h-auto rounded-[10px] border-2 font-body font-semibold transition-transform duration-[120ms]",
        "hover:-translate-x-px hover:-translate-y-px active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
        "motion-reduce:transition-none motion-reduce:hover:translate-x-0 motion-reduce:hover:translate-y-0",
        tones[tone],
        sizes[size],
        className,
      )}
    >
      {children}
    </a>
  );
}
