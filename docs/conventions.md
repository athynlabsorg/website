# Conventions

## Code
- TypeScript strict. Server Components by default; add `"use client"` only for scroll-triggered motion.
- Tailwind utility classes with theme tokens (`bg-spruce`, `text-evergreen`). No inline hex.
- One component per section in `components/sections/`. Sections take their copy from `content/home.ts`.
- Local state only. No global stores (nothing needs them).

## Copy
- Casual, warm, direct. Short sentences.
- **No em dashes** in user-facing copy. Use a period or comma.
- No "not X, just Y" or triple-negation lines ("no A, no B, no C").
- Italic accent word (Instrument Serif) at most once per heading.
- Caveat handwriting only in the lab map and the About greeting.
- Praxis: "in development" only. No compliance, privacy or clinical-accuracy claims.

## Testing
- Static marketing site: verification is browser-based (feature_list steps) plus `tsc --noEmit` and `next build`.
- Unit-test only the placeholder guard (it's the one piece of real logic).
