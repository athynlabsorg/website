# Athyn Labs website: design

**Date:** 2026-11-17
**Status:** Approved by Fodilu 2026-11-17
**Visual source of truth:** Paper file "Athynlabs", artboard **"Home — v3"** (v1 and v2 are kept for reference only)

---

## 1. Intent

Athyn Labs is Fodilu's incorporated Canadian business. Today it is used for independent engineering contracts. The goal is to turn it into a software company: one parent brand that does client work (contracting, agency work, government and business contracts) **and** launches its own products. No single product should become the face of the company.

The website is the company's front door. Over the next six months it has **one primary job: convince businesses and public-sector buyers to hire Athyn Labs for contract work.** The lab products appear further down the page as proof that Athyn Labs builds real things. They are not the pitch.

### Positioning
The shared idea across the client work and all three products is *software that understands what's happening in real time and gets smarter over time*. The hero line expresses it: **"We build software that pays attention."**

## 2. Audience

| Priority | Who | What they need from the page |
|---|---|---|
| Primary | Business and public-sector buyers hiring a contractor | What you do, proof you've done it, who they'll work with, how a project runs, how to start |
| Secondary | People curious about the lab products | What each product is and its status |
| Later | Product users | Out of scope here. Each product gets its own site when it's ready |

## 3. Goals, non-goals, anti-goals

**Goals**
- A buyer understands what Athyn Labs does and how to start a project within 5 seconds of landing.
- The page builds trust: real past work, a real person, a clear process.
- It looks distinctive and human, not like an AI-generated template.
- Lab products are visible with honest status labels.

**Non-goals (this slice)**
- Separate product pages or product sign-ups/waitlists.
- Blog, CMS, case-study detail pages.
- Separate Services/About pages. Nav items scroll to sections on the homepage.
- Analytics, cookie banner.
- Dark mode. The design deliberately uses dark and light *sections*; there is no theme toggle.

**Anti-goals (would make this a failure even if it works)**
- **Shipping placeholder content as if it were real.** Invented case studies, stats or credentials going live would damage credibility with exactly the buyers we're targeting. See §8.3.
- AI tells: em dashes, "not X, just Y" phrasing, numbered mono eyebrow labels ("01 — Services"), generic Inter-on-white layouts.
- Over-promising on Praxis. It handles patient health data; the site describes it as in development and makes **no** compliance or privacy claims.
- Feeling playful enough to make a procurement officer nervous. Personality is kept to two moments (the lab map and the founder greeting).

## 4. Approaches considered

| Approach | Trade-off | Decision |
|---|---|---|
| **Next.js (App Router) + Tailwind + shadcn/ui** | Slightly heavier than a static site needs, but matches Fodilu's usual stack and grows into product pages, waitlists and a blog without a rebuild | **Chosen** (by Fodilu) |
| Astro + Tailwind | Fastest content site, near-zero JS. Off-stack, shadcn less natural, app-like features harder later | Rejected |
| Site builder (Framer/Webflow) | Fastest to live, but no code ownership and design changes trapped in their editor | Rejected |

Design process: designed in Paper first, iterated three times (v1 too generic, v2 too playful for buyers, v3 balances character and credibility).

## 5. Page structure (homepage, top to bottom)

Matches Paper artboard "Home — v3". Desktop frame is 1440px wide with 72px side padding.

1. **Nav.** Wordmark (mountain mark + "athyn" in Bricolage ExtraBold + "labs" in Instrument Serif italic). Links: Work with us, The lab, About (anchor links). CTA button: "Start a project" (alpenglow fill, 2px spruce border, offset shadow). "Peek inside the lab" scrolls to the lab section.
2. **Hero.** Three-line headline: "We build software / that [map chip] *pays* / *attention.*" The map chip is an inline pill (260×100, spruce, slight -3° tilt) holding a small contour drawing with an alpenglow dot. Right column: one-paragraph intro + primary button "Start a project" + text link "Peek inside the lab".
3. **Services.** Heading "Need a hand? Here's what we're *good at.*" plus side note "You talk to the person writing the code, from the first call all the way to launch day." Three straight (untilted) cards with offset shadows and line icons:
   - AI agents for real workflows (white card)
   - Product engineering (white card)
   - Public sector projects (evergreen card, white text)
4. **Selected work.** Heading "Selected *work.*" Three case rows: big result figure on the left, sector label + one-sentence description on the right. **All three are placeholders today.**
5. **How a project goes.** Light mint section with a full-bleed elevation-profile illustration (peach fill under a dark line) and three waypoints: Step 1 Plan it, Step 2 Build it, Step 3 Launch it.
6. **About.** Portrait (placeholder block with initials "FA"), handwritten greeting "hi, I'm Fodilu", heading "The engineer you'll actually *work with.*", short bio, three credential figures. **Bio figures and photo are placeholders.**
7. **The lab.** Dark spruce section drawn as a topographic map: three contour "peaks" joined by a dotted alpenglow trail, each with a flag and a label card:
   - Praxis, "on the ascent". AI clinic assistant (chart, notes, insurance forms).
   - Agent Review (placeholder name), "at base camp". Watches AI agents in production.
   - Toren, "at base camp". Live map / digital twin of your city.
8. **Contact.** Evergreen section. Headline "Tell us what you're *building.*" Button "Book a 30-minute chat" + "or email hello@athynlabs.com".
9. **Footer** (inside the contact section). Mark + "Athyn Labs Inc. Made with care in Canada." + LinkedIn, GitHub.

## 6. Visual system

Extract exact values from Paper (`get_jsx` / `get_computed_styles`) when the Paper MCP is available. The tokens below are what the design was built with and are authoritative if Paper is unavailable.

**Colors**

| Token | Hex | Use |
|---|---|---|
| `snow` | `#FFFFFF` | Main background |
| `spruce` | `#0B2B1F` | Text, borders, offset shadows, dark sections |
| `evergreen` | `#14704A` | Primary accent, italic accent words, contact section |
| `alpenglow` | `#F7B49A` | Secondary accent: CTAs, flags, trail, mountain fill (60% opacity) |
| `lichen` | `#5B6B63` | Secondary text on light |
| `mist` | `#EEF4F0` | "How a project goes" background |
| `line` | `#D5DED9` | Dividers on light |
| `contour` | `#2C6B4F` / `#1E4A37` | Map contour lines (inner / outer) |
| `fog` | `#C9D6CF` | Secondary text on dark |
| `placeholder` | `#C2410C` | Placeholder tags (design-time only, must never render in production) |

**Type** (all via `next/font/google`)

| Role | Font | Notes |
|---|---|---|
| Display | Bricolage Grotesque 800 | Hero 132/124px, section 72/72px, tracking -0.04em to -0.05em |
| Accent words | Instrument Serif Italic 400 | Set ~10% larger than the surrounding display text, evergreen or alpenglow |
| Body / UI | Instrument Sans 400–600 | Body 17–20px, labels 13–15px uppercase with 0.08–0.1em tracking |
| Handwriting | Caveat 600–700 | **Only** in the lab map and the About greeting |

**Artwork:** source SVGs live in `docs/design-assets/`:
- `logo-mark`, `map-chip`, `flag`
- `lab-contours` (1440×880 panel, including the dotted trail)
- `elevation` (1440×500)
- `icon-agents`, `icon-product`, `icon-public`

These are the exact artwork from v3. Match v3 closely; it is the reference, not a loose guide.

**Lab map layout** (1440×880 desktop panel, coordinates in panel space):
- **Heading:** left 72, top 88. Caveat "out in the lab…" above "Three peaks we're *climbing.*" (72px).
- **Flags:** each flag's base dot sits on its peak center.
  - Praxis: peak (420, 520). Card to the right of the flag, 310px wide.
  - Agent Review: peak (960, 400). Card to the right, 380px wide.
  - Toren: peak (1210, 660). Card to the **left** of the flag, 380px wide.
- **Label cards:**
  - Fill: spruce. Border: 1.5px `#2C6B4F`. Radius: 8px. Padding: 16/20.
  - Content: Caveat status line (alpenglow, 22px), then the name (Bricolage 800, 34px, white), then a description (Instrument Sans 16/24, fog).

**Shapes:** 10–14px radius; 2px spruce borders on buttons and cards; hard offset shadows (`5–8px 5–8px 0`) instead of soft blur shadows.

**Motion** (subtle, per Fodilu's preferences): the trail line and lab dotted path draw in once when scrolled into view; buttons nudge on hover/press. Everything respects `prefers-reduced-motion`. No decorative looping animation.

## 7. Responsive behaviour

Desktop-first; one responsive layout, no separate mobile views. Mobile was not designed in Paper. These are proposals for the builder:
- Hero headline scales down with `clamp()`. The map chip stays inline and shrinks.
- Services cards and case rows stack vertically.
- **Lab map:** absolute-positioned cards don't survive small screens. Below ~900px, show the contour map as a shorter decorative banner and list the three products as stacked cards beneath it.
- Elevation profile: keep the illustration, stack the three steps below it.

## 8. Technical design

### 8.1 Stack
- Next.js (App Router, TypeScript), Tailwind CSS v4 with the tokens above as theme variables, shadcn/ui for primitives (Button at minimum).
- Static rendering. No server data needed for this slice.
- Illustrations (map chip, contour map, elevation profile, icons, logo mark) as inline SVG React components, taken from the Paper design.

### 8.2 Content
All copy lives in one typed content module (e.g. `content/home.ts`), not hardcoded in JSX, so placeholder swaps are one-file edits.

### 8.3 Placeholder guard
Every placeholder value in the content module is wrapped/flagged (e.g. `{ value, placeholder: true }`).
- **Dev:** placeholders render with the orange dashed "Placeholder" tag so they're impossible to miss.
- **Production build:** fails if any flagged placeholder remains. The check runs only when `VERCEL_ENV=production`, so Vercel preview deploys and local builds still work, with the tags visible.
- **Launch policy:** the site goes live only once real content replaces every placeholder. Proof sections are never hidden to ship early. (This is Claude's recommendation; Fodilu can override it.)

This enforces the main anti-goal mechanically. Today's placeholders:
- 3 case studies (figures, sectors, descriptions)
- Credentials: the first two figures (8+ yrs, 20+ projects) only. The third, "CA / incorporated, contract-ready", is true and not a placeholder.
- Portrait photo and bio
- `hello@athynlabs.com`
- "Agent Review" product name
- "Athyn Labs Inc." legal name
- LinkedIn/GitHub URLs
- Booking link

### 8.4 Contact
- "Start a project" and "Book a 30-minute chat" link to an external scheduling URL (e.g. Cal.com/Calendly; the URL is a placeholder until Fodilu provides one).
- Email is a `mailto:` link.
- No contact form or backend in this slice.

### 8.5 SEO and sharing
Page title and description, Open Graph/Twitter card image (a simple static OG image using the wordmark and hero line), favicon from the mountain mark, `sitemap.xml` and `robots.txt`.

### 8.6 Accessibility
- Semantic landmarks and one `h1`.
- Decorative SVGs get `aria-hidden`.
- Visible focus states.
- Text contrast meets WCAG AA. Check `lichen` on `snow` and `fog` on `spruce`.

### 8.7 Deployment
- **Vercel** (Fodilu), connected to a GitHub repo. Pushes to `main` deploy to production; every other branch gets a preview URL.
- **Domain:** `athynlabs.com`, which Fodilu already owns. It points at Vercel and is used for `metadataBase`, OG URLs, the sitemap and robots.
- **Repo:**
  - The builder runs `git init` locally on a `dev` branch, matching Fodilu's personal-project branching.
  - Creating the GitHub repo, pushing, and connecting Vercel and DNS are Fodilu's steps. The builder never pushes.
- The OG image can use `next/og`, since Vercel supports it natively.

## 9. Decisions log

| Decision | Who |
|---|---|
| Primary audience is contract buyers; lab is secondary proof | Fodilu |
| Next.js + Tailwind + shadcn | Fodilu |
| Design in Paper first | Fodilu |
| Move away from v1 (too AI-looking); be creative | Fodilu |
| Revise v2 rather than start v3 from scratch; add proof and founder sections, calm the playfulness | Fodilu (accepted recommendation) |
| "Lookout / field map" concept, alpine palette, type choices | Claude (proposed, shown in Paper) |
| Single homepage with anchor nav for this slice | Claude (proxy: thin vertical slice) |
| Content module + placeholder build guard | Claude |
| No contact form; external booking link + mailto | Claude (proxy: simplest thing that works) |
| Mobile layout rules in §7 | Claude (not yet designed in Paper) |
| Host on Vercel; `athynlabs.com` already owned | Fodilu |
| Production launch waits for real content; placeholder guard only on Vercel production | Claude (recommended; Fodilu can override) |
| Artwork exported to `docs/design-assets/`; v3 is the close-match reference | Claude |

## 10. Open items for Fodilu

1. Real content: 2–3 past projects, your bio, years of experience, project count, a photo.
2. Real email address, booking link, LinkedIn/GitHub URLs, exact legal name.
3. Final name for the AI reviewer product (or keep "Agent Review").
4. Create the GitHub repo, connect it to Vercel, and point `athynlabs.com` DNS at Vercel. These steps happen when we deploy.

## 11. Left to the builder
- Component breakdown and file structure.
- Exact breakpoint values and `clamp()` ranges.
- How the placeholder guard is implemented (type wrapper + build-time check).
- Whether contour SVGs are hand-tuned for mobile or simply scaled/cropped.
