# Athyn Labs Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Athyn Labs single-page marketing site matching Paper "Home — v3". Placeholder content is flagged and blocked from production.

**Architecture:**
- Next.js App Router, statically rendered.
- One section component per homepage section, each reading copy from a single typed content module.
- A small placeholder library flags unreal content: it renders a dashed tag outside production and fails the build when `VERCEL_ENV=production`.
- Illustrations are inline SVG React components ported from `docs/design-assets/`.

**Tech Stack:** Next.js (latest, App Router, TypeScript strict), Tailwind CSS v4, shadcn/ui (Button), Vitest, tsx, next/font/google, next/og.

**Spec:** `docs/superpowers/specs/2026-11-17-athynlabs-website-design.md`. Read it alongside this plan. The tokens, coordinates and anti-goals are there.

## Global Constraints

- **Dev server:** port **3100** (3000 is taken by OrbStack). The `dev` script is `next dev --port 3100`.
- **Never commit unless Fodilu explicitly says "commit". Never `git push`. No Claude/Anthropic attribution in commits.** Each task ends with a checkpoint instead of a commit.
- **After each task:**
  - Run `./smoke-test.sh` (once setup-001 passes).
  - Mark the task's features in `feature_list.json` (`passes: true`, `verified_by`) only after their steps are verified in a browser.
  - Append a session entry to `claude-progress.txt`.
- **Colors:** use the spec §6 tokens only, via Tailwind theme classes. No raw hex in components.
- **Fonts:** Bricolage Grotesque 800 (display), Instrument Serif italic 400 (accent words), Instrument Sans 400–600 (body), Caveat 600–700 (**only** in the lab map and the About greeting).
- **Copy:** no em dash (`—`) anywhere user-facing. No "not X, just Y". No numbered mono eyebrow labels.
- **Praxis:** no compliance, privacy or clinical-accuracy claims.
- **Shapes:** 10–14px radius, 2px spruce borders on buttons and cards, hard offset shadows `Npx Npx 0`. No blur shadows.
- **Motion:** one-shot only. Respect `prefers-reduced-motion`. Final (drawn) state is the default, so the page is correct without JS.
- **Layout:** 1440px desktop reference with 72px side padding. One responsive layout with no horizontal scroll at 320px.

## Review Focus

1. **Placeholders nested in arrays/objects** (e.g. `work.cases[1].metric`) must be caught by the production guard and reported by path. Tested in Task 3.
2. **Vercel preview builds** (`VERCEL_ENV=preview`) must succeed *and* show placeholder tags. Production must fail. Tested in Task 3.
3. **Real content longer than the placeholders** (a three-line case description, a longer product name) must wrap without overlapping. This matters most in the absolutely positioned lab cards. Verified in Tasks 5 and 7 with doubled text.
4. **Narrow phones (320px)** must have no horizontal scroll from the map chip, contour SVG or elevation SVG. Verified in Tasks 4, 6 and 7.
5. **No JS / no IntersectionObserver / reduced motion** must render the trail lines fully drawn and never stuck invisible. Tested in Task 9.

---

### Task 1: Scaffold the app (feature setup-001)

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `components/ui/button.tsx`, `components.json`, `lib/utils.ts`, `vitest.config.ts`
- Keep untouched: `docs/`, `AGENTS.md`, `CLAUDE.md`, harness files, `.gitignore` (merge any extra entries create-next-app adds)

**Interfaces:**
- Produces: `npm run dev` (port 3100), `npm run build`, `npm test` (vitest run), `npm run typecheck` (`tsc --noEmit`), `@/*` import alias at repo root (no `src/`).

- [ ] **Step 1:** Scaffold in a temp dir (this one isn't empty): `npx create-next-app@latest /tmp/athyn-scaffold --ts --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm`. Copy everything except `.git`, `README.md` and `.gitignore` into the project root. Merge `.gitignore` lines by hand.
- [ ] **Step 2:** Set scripts:
  - `"dev": "next dev --port 3100"`
  - `"start": "next start --port 3100"`
  - `"typecheck": "tsc --noEmit"`
  - `"test": "vitest run"`
- [ ] **Step 3:** `npx shadcn@latest init` with defaults, then `npx shadcn@latest add button`.
- [ ] **Step 4:** Install the test tooling: `npm i -D vitest tsx`. Then create `vitest.config.ts` with the `@` alias resolved to the repo root, and `environment: 'node'`.
- [ ] **Step 5:** Replace `app/page.tsx` with a minimal `<main>` containing an `<h1>` "We build software that pays attention." and a link "Start a project". The smoke test greps for both. The content module replaces them in Task 3.
- [ ] **Step 6: Verify.** Run `./init.sh`, then `./smoke-test.sh`. Expected: app/homepage/headline/CTA/typecheck all ✓. The progress-log line warns (no commits yet). `npm run build` succeeds.
- [ ] **Step 7: Checkpoint.** Mark setup-001 and log progress. Ask Fodilu whether to commit.

### Task 2: Design tokens and fonts (feature setup-002)

**Files:**
- Modify: `app/globals.css`, `app/layout.tsx`
- Test: `tests/tokens.test.ts`

**Interfaces:**
- Produces:
  - Tailwind color classes: `snow, spruce, evergreen, alpenglow, lichen, mist, line, contour, contour-outer, fog, placeholder`
  - Font classes: `font-display` (Bricolage), `font-accent` (Instrument Serif), `font-body` (Instrument Sans), `font-hand` (Caveat)
  - Shadow utilities: `shadow-offset-sm` (`5px 5px 0`), `shadow-offset` (`6px 6px 0`), `shadow-offset-lg` (`8px 8px 0`). Shadow color is set by a `--tw-shadow-color` utility, e.g. `shadow-spruce`.

- [ ] **Step 1: Write the failing test.** `tests/tokens.test.ts` reads `app/globals.css` and asserts each `@theme` variable equals its spec hex:

```ts
const expected = {
  '--color-snow': '#FFFFFF', '--color-spruce': '#0B2B1F', '--color-evergreen': '#14704A',
  '--color-alpenglow': '#F7B49A', '--color-lichen': '#5B6B63', '--color-mist': '#EEF4F0',
  '--color-line': '#D5DED9', '--color-contour': '#2C6B4F', '--color-contour-outer': '#1E4A37',
  '--color-fog': '#C9D6CF', '--color-placeholder': '#C2410C',
}
// for each: expect(css).toMatch(new RegExp(`${name}:\\s*${hex}`, 'i'))
```

- [ ] **Step 2:** Run `npm test`. Expected: FAIL.
- [ ] **Step 3:** Add the tokens to the `@theme` block in `globals.css`. Remove the shadcn neutral color overrides that conflict, but keep the shadcn variables the Button needs, mapped to spruce/alpenglow.
- [ ] **Step 4:** In `layout.tsx`, load the four fonts via `next/font/google`:
  - `Bricolage_Grotesque` with weights `['800']`
  - `Instrument_Serif` with weights `['400']` and styles `['italic']`
  - `Instrument_Sans` with weights `['400','500','600']`
  - `Caveat` with weights `['600','700']`

  Expose each as a CSS variable, and map `--font-display/accent/body/hand` in `@theme` to those variables. Set the body to `font-body text-spruce bg-snow`.
- [ ] **Step 5:** Run `npm test`. Expected: PASS. Open `http://localhost:3100`: the headline renders in Instrument Sans and the network tab shows four self-hosted font files.
- [ ] **Step 6: Checkpoint.** Mark setup-002, log progress, ask about committing.

### Task 3: Content module and placeholder guard (features content-001, content-002, content-003, quality-001)

**Files:**
- Create: `lib/placeholder.ts`, `content/home.ts`, `components/ContentText.tsx`, `components/PlaceholderTag.tsx`, `scripts/check-placeholders.ts`
- Modify: `package.json` (`"build": "tsx scripts/check-placeholders.ts && next build"`)
- Test: `tests/placeholder.test.ts`, `tests/copy-lint.test.ts`

**Interfaces:**
- Produces (`lib/placeholder.ts`):
  - `type Ph<T> = { readonly value: T; readonly placeholder: true }`
  - `type Field<T> = T | Ph<T>`
  - `ph<T>(value: T): Ph<T>`
  - `isPh(x: unknown): x is Ph<unknown>`
  - `val<T>(f: Field<T>): T`
  - `collectPlaceholders(node: unknown, path = ''): string[]`: dotted paths with array indexes, e.g. `work.cases.1.metric`
  - `placeholderGuard(vercelEnv: string | undefined, paths: string[]): { ok: boolean; message: string }`: not ok only when `vercelEnv === 'production'` and `paths.length > 0`. The message lists every path.
- Produces (`content/home.ts`): `export const home: HomeContent` with the type exported. Shape below.
- Produces (`components/ContentText.tsx`): `<ContentText f={Field<string>} />` renders `val(f)`. When `isPh(f)` and `process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production'`, it renders `val(f)` plus `<PlaceholderTag/>`. `<PlaceholderTag/>` is a dashed 1.5px `border-placeholder`, `text-placeholder`, 12px uppercase "Placeholder" chip.

- [ ] **Step 1: Write failing tests.** `tests/placeholder.test.ts`:
  - `collectPlaceholders({a: ph('x'), b: [{c: 'real'}, {c: ph('y')}]})` → `['a', 'b.1.c']` *(Review Focus 1)*
  - `collectPlaceholders(home)` includes `work.cases.0.metric`, `about.credentials.0.figure` and `site.bookingUrl`, and **excludes** `about.credentials.2.figure` (the true "CA" figure)
  - `placeholderGuard('production', ['a']).ok === false` and its message contains `'a'`
  - `placeholderGuard('preview', ['a']).ok === true` *(Review Focus 2)*
  - `placeholderGuard(undefined, ['a']).ok === true`
  - `placeholderGuard('production', []).ok === true`
- [ ] **Step 2: Write the copy lint test.** `tests/copy-lint.test.ts` walks `content/` and `components/` (`.ts`/`.tsx`) and asserts no file contains `—` (U+2014). It also walks `home` values and asserts none matches `/\bnot\b[^.]*,\s*just\b/i`.
- [ ] **Step 3:** Run `npm test`. Expected: FAIL (modules missing).
- [ ] **Step 4:** Implement `lib/placeholder.ts` per the Interfaces block.
- [ ] **Step 5:** Implement `content/home.ts` with this exact copy. Accent words are separate fields so sections can italicize them. `ph(...)` marks placeholders.

```ts
site: { bookingUrl: ph('https://cal.com/athynlabs/intro'), email: ph('hello@athynlabs.com'),
        legalName: ph('Athyn Labs Inc.'), linkedin: ph('https://www.linkedin.com/'), github: ph('https://github.com/') }
nav: { links: [{label:'Work with us',href:'#services'},{label:'The lab',href:'#lab'},{label:'About',href:'#about'}], cta: 'Start a project' }
hero: { line1: 'We build software', line2: 'that', accent1: 'pays', accent2: 'attention.',
        intro: 'Athyn Labs is a small engineering studio in Canada. We build AI systems for companies and public teams, and we grow our own products on the side.',
        primary: 'Start a project', secondary: { label: 'Peek inside the lab', href: '#lab' } }
services: { heading: 'Need a hand? Here’s what we’re', accent: 'good at.',
  note: 'You talk to the person writing the code, from the first call all the way to launch day.',
  cards: [
   { icon:'agents', tone:'light', title:'AI agents for real workflows', body:'Intake, document processing, triage and reporting. Built with the guardrails and monitoring to run in production.' },
   { icon:'product', tone:'light', title:'Product engineering', body:'Web and mobile products built to last. We scope a first release you can launch, then keep building as it grows.' },
   { icon:'public', tone:'evergreen', title:'Public sector projects', body:'Clear scopes, a fixed price you can take to procurement, and documentation your own team can run with.' } ] }
work: { heading:'Selected', accent:'work.', note:'A few recent projects. Some clients prefer to stay unnamed, so we describe them by industry.',
  cases: [
   { metric: ph('40%'), metricLabel: ph('less time on manual intake'), sector: ph('Insurance brokerage, Ontario'), summary: ph('An intake agent that reads claim documents and fills in case files for the team to review.') },
   { metric: ph('6 wks'), metricLabel: ph('from kickoff to launch'), sector: ph('Municipal government, Canada'), summary: ph('A resident-facing service portal that replaced a paper form process for permit requests.') },
   { metric: ph('3×'), metricLabel: ph('faster weekly reporting'), sector: ph('Logistics company, North America'), summary: ph('An internal dashboard and reporting pipeline that pulls shipment data from four systems into one view.') } ] }
process: { heading:'How a project', accent:'goes.', steps: [
   { label:'Step 1', title:'Plan it', body:'A quick call, then a written plan with milestones and a price you can sign off on.' },
   { label:'Step 2', title:'Build it', body:'Working software every week, live in a test space you can click around in.' },
   { label:'Step 3', title:'Launch it', body:'We ship, write everything down, and either hand you the keys or stay on to keep it running.' } ] }
about: { greeting:'hi, I’m Fodilu', heading:'The engineer you’ll actually', accent:'work with.',
  photo: ph<string | null>(null), initials:'FA',
  bio: ph('I’ve spent years building software for companies across Canada. Athyn Labs is where I take on client work and grow our own products. When you hire us, I’m the one on your calls and in your codebase.'),
  credentials: [ { figure: ph('8+ yrs'), label: ph('shipping production software') },
                 { figure: ph('20+'), label: ph('client projects delivered') },
                 { figure: 'CA', label: 'incorporated, contract-ready' } ] }
lab: { kicker:'out in the lab…', heading:'Three peaks we’re', accent:'climbing.', products: [
   { name:'Praxis', status:'on the ascent', body:'An AI clinic assistant that sits in on patient visits and writes the chart, notes and insurance forms. Clinicians get their evenings back.' },
   { name: ph('Agent Review'), status:'at base camp', body:'A second pair of eyes for your AI agents. It watches them in production and tells you what they did, and where they slipped.' },
   { name:'Toren', status:'at base camp', body:'A living map of your city. Know what’s happening right now at the spots you care about, before you head out.' } ] }
contact: { heading:'Tell us what you’re', accent:'building.', button:'Book a 30-minute chat', emailLead:'or email' }
footer: { tagline:'Made with care in Canada.' }
```

- [ ] **Step 6:** Implement `scripts/check-placeholders.ts`. It imports `home`, runs `placeholderGuard(process.env.VERCEL_ENV, collectPlaceholders(home))`, prints the message, and calls `process.exit(1)` when not ok.
- [ ] **Step 7:** Implement `ContentText` and `PlaceholderTag`.
- [ ] **Step 8: Verify.**
  - `npm test` passes.
  - `VERCEL_ENV=production npm run build` exits non-zero and lists the paths.
  - `npm run build` succeeds.
- [ ] **Step 9: Checkpoint.** Mark content-001 and content-003. content-002 and quality-001 are marked once the sections render (Task 10). Log progress and ask about committing.

### Task 4: Art components, Nav and Hero (features nav-001, hero-001)

**Files:**
- Create: `components/art/LogoMark.tsx`, `components/art/MapChip.tsx`, `components/sections/Nav.tsx`, `components/sections/Hero.tsx`
- Modify: `app/page.tsx` (compose sections inside `<main>`)

**Interfaces:**
- Consumes: `home.nav`, `home.hero`, `home.site.bookingUrl`, `<ContentText>`, `val`.
- Produces:
  - `LogoMark({ className?, variant?: 'dark' | 'light' })`
  - `MapChip({ className? })`
  - Section ids: `services`, `work`, `process`, `about`, `lab`, `contact`. Each section component renders `<section id=...>`.

- [ ] **Step 1:** Port `docs/design-assets/logo-mark.svg` and `map-chip.svg` into TSX components. Swap fills to `currentColor` or token classes where they map to tokens. Decorative art gets `aria-hidden`.
- [ ] **Step 2:** Build `Nav`.
  - Wordmark: "athyn" in `font-display` 24px + " labs" in `font-accent` italic 26px evergreen.
  - Links: Instrument Sans 16px/500.
  - CTA: a shadcn `Button` (`asChild` on an `<a href={val(bookingUrl)}>`), styled alpenglow, `border-2 border-spruce`, `rounded-[10px]`, offset shadow 3px spruce.
  - Below `md`, links collapse to just the CTA. No hamburger in this slice.
- [ ] **Step 3:** Build `Hero`.
  - Headline is the page's only `<h1>`, with `font-display` lines and `font-accent` italic evergreen accent words.
  - Size: `clamp(56px, 9vw, 132px)` with line-height 0.94. Accent words are 1.12× the display size.
  - `MapChip` is inline after "that", 260×100 at desktop, scaled by the same `vw` factor, `-rotate-3`.
  - Intro block sits right-aligned beside line 3 at ≥1024px and stacks below at smaller sizes.
  - Primary button: spruce fill, white text, offset shadow 4px alpenglow. Secondary: an underlined evergreen link.
- [ ] **Step 4: Verify in a browser** at 1440, 768, 390 and 320px. It should closely match Paper v3 at 1440px. There must be no horizontal scroll at 320px *(Review Focus 4)*. Nav links scroll to their sections once those exist; check this again after Task 8.
- [ ] **Step 5: Checkpoint.** Mark nav-001 and hero-001, log progress, ask about committing.

### Task 5: Services and Selected work (features services-001, work-001)

**Files:**
- Create: `components/art/ServiceIcon.tsx`, `components/sections/Services.tsx`, `components/sections/SelectedWork.tsx`

**Interfaces:**
- Consumes: `home.services`, `home.work`, `<ContentText>`.
- Produces: `ServiceIcon({ name: 'agents' | 'product' | 'public' })`.

- [ ] **Step 1:** Port the three `icon-*.svg` files into `ServiceIcon`. The `public` icon uses white strokes because it sits on the evergreen card.
- [ ] **Step 2:** Build `Services` (`id="services"`).
  - Header row: 72px display heading with accent, and a note to the right (`lichen`, 18/28, width 380).
  - Three equal cards in a row at ≥1024px, stacked below that. Cards are `p-8 border-2 border-spruce rounded-xl` with a 5px spruce offset shadow and no rotation.
  - Card content is top-aligned: icon, then a 64px gap, then the title (`font-display` 36/38) and body (17/26).
  - The `tone:'evergreen'` card gets an evergreen background with white title text and `#E3F0E9` body text (add a `mint-text` token if needed).
- [ ] **Step 3:** Build `SelectedWork` (`id="work"`).
  - A 2px spruce top rule, then the header row.
  - Case rows have a bottom border in `line`.
  - Left column (300px): the metric in `font-display` 80px evergreen over a 15px lichen label.
  - Right column: the sector (14px uppercase, 0.08em tracking) over the summary (`font-display` 700, 30/36, max-width 620). All fields go through `<ContentText>` so the tags appear.
  - The row stacks below 768px.
- [ ] **Step 4: Verify in a browser.**
  - Titles align across the cards. Each case row shows a Placeholder tag.
  - *(Review Focus 3)* Temporarily double a case summary's length. It wraps with no overlap. Revert.
  - No horizontal scroll at 320px.
- [ ] **Step 5: Checkpoint.** Mark services-001 and work-001, log progress, ask about committing.

### Task 6: Process and About (features process-001, about-001, responsive-001, responsive-003)

**Files:**
- Create: `components/art/Elevation.tsx`, `components/sections/Process.tsx`, `components/sections/About.tsx`

**Interfaces:**
- Consumes: `home.process`, `home.about`, `<ContentText>`.
- Produces: `Elevation({ className?, drawn?: boolean })`. The trail path carries `data-trail` for Task 9.

- [ ] **Step 1:** Port `elevation.svg` (1440×500 viewBox) with `preserveAspectRatio="none"` on the fill and the line. The waypoint circles sit at (332,290), (792,158) and (1222,40).
- [ ] **Step 2:** Build `Process` (`id="process"`, mist background, no bottom padding).
  - The SVG bleeds full-width with no side padding and `overflow-hidden` on the section.
  - At ≥1024px, the step labels are absolutely positioned under their waypoints. Use percentages of the 1440 viewBox: left 15.3%, 47.2% and 68.5%; top 64%, 38% and 15.2% of the 500 height.
  - Below 1024px, the SVG shows as a 200px-tall band and the steps stack below it on the alpenglow fill.
  - Step label: Instrument Sans 13px uppercase 0.1em, evergreen. Title: `font-display` 28. Body: 16/24.
- [ ] **Step 3:** Build `About` (`id="about"`).
  - Portrait: 440×520, evergreen, 2px spruce border, `rounded-xl`, 8px alpenglow offset shadow. When `val(photo)` is null, show the initials in `font-display` 120px white. Otherwise use `next/image`.
  - Greeting: `font-hand` 34px evergreen, `-rotate-2`.
  - Heading: 60/62 with accent. Bio: 19/30, max-width 620.
  - Credentials row: `border-t line`, three figures (`font-display` 40px) with 15px lichen labels, each through `<ContentText>`.
  - The section stacks below 1024px, with the portrait shrinking to full width at a 4:5 aspect ratio.
- [ ] **Step 4: Verify in a browser** at 1440, 768, 390 and 320px.
  - The labels sit under their waypoints at 1440px.
  - The credential tags show on the first two figures only.
  - No horizontal scroll *(Review Focus 4)*.
- [ ] **Step 5: Checkpoint.** Mark process-001, about-001, responsive-001 and responsive-003 (responsive-001 now covers hero, services, work and about). Log progress and ask about committing.

### Task 7: The lab map (features lab-001, responsive-002)

**Files:**
- Create: `components/art/LabContours.tsx`, `components/art/Flag.tsx`, `components/sections/Lab.tsx`, `components/sections/LabCard.tsx`

**Interfaces:**
- Consumes: `home.lab`, `<ContentText>`.
- Produces:
  - `LabContours({ className? })`, where the dotted trail path carries `data-trail`
  - `LabCard({ product, width })`
  - `Flag()`

- [ ] **Step 1:** Port `lab-contours.svg` (1440×880) and `flag.svg`.
- [ ] **Step 2:** Build the desktop layout (≥1024px, `id="lab"`, spruce background).
  - The section is a relative box with a 1440:880 aspect ratio. Everything inside is positioned in percentages of 1440×880, so it scales between 1024 and 1440+.
  - Heading at (5%, 10%): a `font-hand` 28px alpenglow kicker, then the heading at 72px white with an alpenglow accent.
  - Flag base dots on the peak centers:
    - Praxis (420,520), card to the right, width 310
    - Agent Review (960,400), card to the right, width 380
    - Toren (1210,660), card to the **left** (row-reverse), width 380
  - `LabCard`: spruce fill, 1.5px `contour` border, `rounded-lg`, padding 16/20. Content: a `font-hand` 22px alpenglow status, then the name in `font-display` 34px white, then the body at 16/24 `fog`.
  - Praxis gets no extra claims.
- [ ] **Step 3:** Build the stacked layout (<1024px). The contours become a 240px-tall decorative banner (`object-cover` crop centered on the Praxis peak), followed by the three `LabCard`s stacked full-width with a gap of 16.
- [ ] **Step 4: Verify in a browser.**
  - At 1440px: flags sit on the peak centers, no cards overlap, and the Toren card sits left of its flag.
  - At 1024px: same, at scale.
  - At 768/390/320px: cards are stacked with no horizontal scroll.
  - *(Review Focus 3)* Temporarily use a 2× body text and a 20-character product name. At 1440px nothing overlaps; if it does, cap the body with `line-clamp-4` and note it in progress. Revert.
- [ ] **Step 5: Checkpoint.** Mark lab-001 and responsive-002, log progress, ask about committing.

### Task 8: Contact and Footer (features contact-001, footer-001)

**Files:**
- Create: `components/sections/Contact.tsx` (renders the footer inside it)

**Interfaces:**
- Consumes: `home.contact`, `home.footer`, `home.site`, `LogoMark` (variant `light`).

- [ ] **Step 1:** Build `Contact` (`id="contact"`, evergreen background, padding 140/72/48).
  - Heading: `clamp(64px, 10vw, 150px)`, line-height 0.9, white, with the accent in alpenglow `font-accent`.
  - Button: alpenglow, 2px spruce border, 6px spruce offset shadow, linking to `val(site.bookingUrl)`.
  - Email: `mailto:${val(site.email)}`, underlined, white.
- [ ] **Step 2:** Build the footer row inside the section, under a `border-t` in `#3C8A66`.
  - Left: `LogoMark` light, then `<ContentText f={site.legalName}/>` and the tagline.
  - Right: LinkedIn and GitHub links via `val`.
  - Use semantic `<footer>`.
- [ ] **Step 3: Verify in a browser.**
  - The button href equals the booking URL and the email is a `mailto:`.
  - All nav anchors (`#services`, `#lab`, `#about`) and "Peek inside the lab" land on their sections.
  - Placeholder tags show on the email, legal name and links.
- [ ] **Step 4: Checkpoint.** Mark contact-001 and footer-001, re-verify nav-001's anchor step, log progress, ask about committing.

### Task 9: Trail draw-in motion (feature motion-001)

**Files:**
- Create: `components/DrawOnView.tsx`
- Modify: `components/sections/Process.tsx`, `components/sections/Lab.tsx`

**Interfaces:**
- Produces: `DrawOnView({ children })`, a `"use client"` wrapper. On the first intersection it animates every descendant `[data-trail]` path from hidden to drawn over 1.6s ease-out, then disconnects.

- [ ] **Step 1:** Implement `DrawOnView`. Server HTML renders paths **fully drawn**. On mount, if `IntersectionObserver` exists **and** `matchMedia('(prefers-reduced-motion: reduce)')` is false, set the hidden state, then animate on intersect. *(Review Focus 5: never hidden by default.)*
  - The solid elevation line uses `stroke-dasharray = getTotalLength()`.
  - The already-dashed lab trail is animated by masking with a duplicate solid path instead.
- [ ] **Step 2:** Add a subtle hover/press nudge to all offset-shadow buttons: `hover:-translate-x-px hover:-translate-y-px`, and `active:translate-x-[2px] active:translate-y-[2px] active:shadow-none`, with `transition-transform 120ms`. Disable it under `motion-reduce`.
- [ ] **Step 3: Verify in a browser.**
  - Lines draw once on scroll.
  - With reduced motion emulated (DevTools), lines show drawn with no animation.
  - With JavaScript disabled, lines show drawn.
- [ ] **Step 4: Checkpoint.** Mark motion-001, log progress, ask about committing.

### Task 10: SEO, accessibility and quality gate (features seo-001, a11y-001, quality-001, content-002, perf-001)

**Files:**
- Create: `app/opengraph-image.tsx`, `app/sitemap.ts`, `app/robots.ts`, `app/icon.svg` (the mountain mark)
- Modify: `app/layout.tsx` (metadata)

**Interfaces:**
- Consumes: `LogoMark` artwork, `home.hero`.

- [ ] **Step 1:** Set metadata in `layout.tsx`:
  - `metadataBase: new URL('https://athynlabs.com')`
  - title: "Athyn Labs | Software that pays attention"
  - description: the hero intro
  - `openGraph` and `twitter: { card: 'summary_large_image' }`
  - `<html lang="en">`
- [ ] **Step 2:** Build `opengraph-image.tsx` (1200×630, `next/og`): a snow background with the logo mark, "We build software that" in spruce, and "pays attention." in evergreen. Load the Bricolage and Instrument Serif TTFs via fetch from Google Fonts at build time.
- [ ] **Step 3:** `sitemap.ts` returns `[{ url: 'https://athynlabs.com', lastModified: new Date() }]`. `robots.ts` allows all and points to the sitemap.
- [ ] **Step 4: Run the accessibility checks.**
  - Landmarks are `<header>` (Nav), `<main>` and `<footer>`, with exactly one `<h1>`. Section headings are `<h2>` and card titles `<h3>`.
  - Every focusable element shows a visible focus ring: a 2px evergreen outline with 2px offset, alpenglow on dark sections.
- [ ] **Step 5: Verify.**
  - `npm test` passes, including the copy lint.
  - `curl -s localhost:3100 | grep -E 'og:image|twitter:card|<title>'` shows all three.
  - `curl localhost:3100/sitemap.xml` and `/robots.txt` are valid.
  - `/opengraph-image` renders.
  - Lighthouse (production build, `npm start`) scores accessibility ≥ 95 and desktop performance ≥ 90.
  - The dev page shows placeholder tags everywhere listed in spec §8.3 (content-002).
- [ ] **Step 6: Checkpoint.** Mark seo-001, a11y-001, quality-001, content-002 and perf-001, log progress, ask about committing.

### Task 11: Deploy runbook (features deploy-001, deploy-002, which need Fodilu)

**Files:**
- Create: `docs/runbooks/deploy.md`

- [ ] **Step 1:** Write the runbook covering Fodilu's steps:
  1. Create a GitHub repo and push `dev` (Fodilu runs the push).
  2. Import it in Vercel, keeping the framework preset. Enable "Automatically expose System Environment Variables" so `VERCEL_ENV` and `NEXT_PUBLIC_VERCEL_ENV` exist.
  3. Set the production branch to `main`.
  4. Add the `athynlabs.com` domain and set the DNS records Vercel shows.
  5. Replace the placeholders in `content/home.ts` (list them via `npx tsx -e "import('./content/home').then(m=>console.log(require('./lib/placeholder').collectPlaceholders(m.home)))"`).
  6. Merge to `main`.
- [ ] **Step 2: Verify.**
  - The runbook's placeholder-listing command prints the current list.
  - *(After Fodilu pushes)* The preview URL renders with tags (deploy-001).
  - *(After content and DNS)* https://athynlabs.com renders with no tags (deploy-002).
- [ ] **Step 3: Checkpoint.** Log progress, ask about committing. deploy-001/002 stay `passes: false` until Fodilu's steps are done and verified.

---

## Spec coverage check

| Spec | Task |
|---|---|
| §5 sections 1–9 | 4, 5, 6, 7, 8 |
| §6 tokens and fonts | 2 |
| §6 artwork and lab coordinates | 4–7 |
| §6 motion | 9 |
| §7 responsive | 4–7 |
| §8.2–8.3 content and guard | 3 |
| §8.4 contact | 8 |
| §8.5 SEO | 10 |
| §8.6 a11y | 10 |
| §8.7 deploy | 11 |
| §3 anti-goals (placeholders, AI tells, Praxis) | 3, 7, 10 |
