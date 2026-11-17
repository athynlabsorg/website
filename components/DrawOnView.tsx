"use client";

import { useEffect, useRef } from "react";

/**
 * Draws every descendant `[data-trail]` path once when it scrolls into view (spec §6 motion).
 * The server HTML is fully drawn; the hidden starting state is only applied when JS runs,
 * IntersectionObserver exists and the visitor hasn't asked for reduced motion.
 */
export function DrawOnView({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const paths = Array.from(root.querySelectorAll<SVGPathElement>("[data-trail]"));
    if (paths.length === 0) return;

    for (const p of paths) {
      p.setAttribute("pathLength", "1");
      p.style.strokeDasharray = "1";
      p.style.strokeDashoffset = "1";
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        for (const p of paths) {
          p.style.transition = "stroke-dashoffset 1.6s ease-out";
          p.style.strokeDashoffset = "0";
        }
        observer.disconnect();
      },
      { threshold: 0.3 },
    );
    observer.observe(root);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
