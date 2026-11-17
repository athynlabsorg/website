# CLAUDE.md — Athyn Labs website

Read `AGENTS.md` first. It is the project map.

## Rules
- Follow the spec in `docs/superpowers/specs/2026-11-17-athynlabs-website-design.md`. If the spec and the code disagree, ask; don't silently diverge.
- Use the color/font tokens from spec §6 via Tailwind theme variables. Never hardcode hex values in components.
- Put all user-facing copy in the content module. Wrap placeholder values with the placeholder helper.
- Use shadcn/ui for primitives. Don't build custom button/dialog primitives.
- Illustrations are inline SVG components derived from `docs/design-assets/`. Decorative ones get `aria-hidden`.
- Motion is subtle and one-shot only, and always respects `prefers-reduced-motion`.
- Desktop-first, one responsive layout. No separate mobile components except the lab map's stacked fallback (spec §7).
- Verify features in a real browser before marking `passes: true`.
- Never commit unless Fodilu says so. Never push. No Claude attribution in commits.
