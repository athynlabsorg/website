<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

## Project
Marketing website for Athyn Labs, a Canadian software studio. Its main job is to win contract work from business and public-sector buyers, and it shows the lab products (Praxis, Agent Review, Toren) as proof.

**Stack:** Next.js (App Router, TypeScript) + Tailwind v4 + shadcn/ui, deployed on Vercel at athynlabs.com
**Status:** Active development (pre-scaffold)

---

## Quick Start

```bash
./init.sh        # Install deps + start dev server on :3100 (3000 is taken by OrbStack)
./smoke-test.sh  # Verify homepage renders
```

---

## Agent Workflow

1. Read `claude-progress.txt` for recent session history
2. Read `feature_list.json` — pick the highest-priority `"passes": false` feature
3. Run `./init.sh` then `./smoke-test.sh` to confirm clean starting state
4. If smoke test fails: fix before starting new work (expected to fail until setup-001 is done)
5. Implement one feature, verify end-to-end in a browser, update `feature_list.json`
6. Update `claude-progress.txt`. Commit **only when Fodilu says "commit"**
7. End in clean state (typecheck + build passing, no partial implementations)

**Never:** mark a feature as passing without running all verification steps.
**Never:** commit unless asked, and never `git push`. Pushing is Fodilu's decision.
**Never:** let more than 3 commits go by without updating `claude-progress.txt`. The smoke test will block you.

---

## Key Docs

| Doc | When to read |
|-----|-------------|
| `docs/superpowers/specs/2026-11-17-athynlabs-website-design.md` | **The spec.** Read before any UI work |
| `docs/design-assets/` | Exact SVG artwork from the Paper design |
| `docs/architecture.md` | Project structure |
| `docs/conventions.md` | Code and copy conventions |
| Paper file "Athynlabs", artboard "Home — v3" | Visual reference (Paper MCP; free plan has a weekly call limit) |

---

## Critical Constraints

- **Placeholders must never ship.** All copy lives in the content module; placeholders are flagged, show a dashed tag in dev, and fail `VERCEL_ENV=production` builds.
- **No AI tells in copy:** no em dashes, no "not X, just Y", no numbered mono eyebrow labels.
- **No compliance or privacy claims about Praxis.** It is described only as "in development".
- **Caveat handwriting appears in exactly two places:** the lab map and the About greeting.
- Match Paper "Home — v3" closely. Tokens and coordinates are in spec §6.

---

## Available Tools / MCPs

- Paper MCP: read the design (`get_jsx`, `get_computed_styles`). Limited weekly calls, so use sparingly.
- Claude in Chrome / chrome-devtools MCP: browser verification of features, Lighthouse
