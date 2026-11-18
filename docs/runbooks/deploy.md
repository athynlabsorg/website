# Deploy runbook: Athyn Labs website

The agent never pushes. Steps 1–4 and 6 are Fodilu's.

## 1. GitHub
1. Repo: `github.com/athynlabsorg/website` (org `athynlabsorg`, RoadRunner11 is owner).
2. From `~/Dev/athynlabs/website`:
   ```bash
   git remote add origin git@github.com:<you>/website.git
   git push -u origin dev
   ```
3. Create `main` from `dev` once you're happy (`git push origin dev:main`).

## 2. Vercel
1. vercel.com → Add New → Project → import the repo. Framework preset: Next.js (auto).
2. Settings → Environment Variables → tick **"Automatically expose System Environment Variables"**.
   This provides `VERCEL_ENV` (used by the placeholder guard) and `NEXT_PUBLIC_VERCEL_ENV`
   (hides placeholder tags only on production).
3. Settings → Environments → Production → branch `main` (older UI: Settings → Git).
   Do this before the first deploy: if `dev` is the only branch, Vercel builds it as production
   and the placeholder guard fails the build with "Production build blocked".

Every push to a non-`main` branch now gets a preview URL. Placeholder tags show there on purpose.

## 3. Domain
1. Vercel → Settings → Domains → add `athynlabs.com` (and `www.athynlabs.com`, redirecting to the apex).
2. At your registrar, set the DNS records Vercel shows (A record for the apex, CNAME for `www`).

## 4. Replace placeholder content
All copy is in `content/home.ts`. List what's still a placeholder:
```bash
npx tsx -e "import('./content/home').then(async (m) => { const { collectPlaceholders } = await import('./lib/placeholder'); console.log(collectPlaceholders(m.home).join('\n')) })"
```
For each one, replace `ph("…")` with the real value (plain string). For the photo, add the image
under `public/` and set `photo: "/fodilu.jpg"`. Run `npm test` after editing.

## 5. Check before going live
```bash
VERCEL_ENV=production npm run build   # must exit 0 and print "No placeholder content left."
```

## 6. Go live
Merge `dev` into `main` and push. Vercel builds production; the build fails loudly if any placeholder slipped through.

## Rollback
Vercel → Deployments → pick the previous production deployment → "Promote to Production".
