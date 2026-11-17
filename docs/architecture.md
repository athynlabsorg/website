# Architecture

A static single-page marketing site. There is no backend, database or auth.

## Planned structure (created by setup-001)

```
app/
  layout.tsx           # fonts (next/font), metadata, theme tokens
  page.tsx             # composes homepage sections in order
  opengraph-image.tsx  # next/og share image
  sitemap.ts, robots.ts
components/
  sections/            # Nav, Hero, Services, SelectedWork, Process, About, Lab, Contact, Footer
  art/                 # inline SVG components (MapChip, LabContours, Elevation, Flag, icons, LogoMark)
  ui/                  # shadcn primitives
  Placeholder.tsx      # dashed tag shown in dev for flagged content
content/
  home.ts              # all copy; placeholders flagged
lib/
  placeholder.ts       # placeholder helper + list of unresolved placeholders
scripts/
  check-placeholders.ts  # fails build when VERCEL_ENV=production and placeholders remain
```

## Section order
Nav → Hero → Services → Selected work → How a project goes → About → The lab → Contact + Footer (spec §5).

## External links
Booking URL (Cal.com/Calendly) and mailto. No contact form.

## Deploy
Vercel, connected to GitHub. `main` deploys to production; other branches get previews. Domain: athynlabs.com.
