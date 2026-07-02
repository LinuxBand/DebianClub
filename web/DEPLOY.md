# Deploying to Cloudflare Pages

This app is a static export (`output: 'export'`) — the whole site is plain
files under `out/`, so it runs on Cloudflare Pages with no server.

## Connect the repository (recommended)

In the Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**,
pick this repo and set:

| Setting | Value |
| --- | --- |
| Production branch | `main` (or `feat/fumadocs-migration` while previewing) |
| Framework preset | None / Next.js (Static HTML Export) |
| **Root directory** | `web` |
| **Build command** | `corepack enable && pnpm install --frozen-lockfile && pnpm build` |
| **Build output directory** | `out` |
| Node version | `24` or newer (set `NODE_VERSION=24` env var) |

That's all. `web/public/_headers` is copied into `out/` and applies caching +
the JSON content-type for the search index automatically.

## URLs / routing

- `zh` is served at the root (`/`, `/eol`, `/basics/installation`, …);
  other locales are prefixed (`/en/…`, `/de/…`). This matches the old site
  exactly — no redirects needed.
- Untranslated localized URLs don't exist; `404.html` redirects them
  client-side to the default-language page.
- `sitemap.xml`, `robots.txt`, `llms.txt`, `llms-full.txt` are generated.

## Local preview of the production build

```bash
cd web
corepack pnpm build
corepack pnpm exec serve out --listen 43018
```

In another shell, run the release and runtime gates:

```bash
corepack pnpm release:check
SMOKE_BASE_URL=http://localhost:43018 corepack pnpm smoke:check
```

## CLI deploy (optional)

From the repository root:

```bash
corepack pnpm --dir web build
npx wrangler pages deploy web/out --project-name debianclub
```
