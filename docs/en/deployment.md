---
title: "Deployment"
description: "DebianClub static deployment runbook: Cloudflare Pages config, build output, security headers, launch checks, rollback, and runtime monitoring."
---

DebianClub currently runs as a Next.js static export, deployed to Cloudflare Pages from `web/out`.

## Standard Launch Commands

```bash
. "$HOME/.nvm/nvm.sh"
corepack pnpm --dir web types:check
corepack pnpm --dir web build
corepack pnpm --dir web release:check
```

Keep the Cloudflare Pages output directory as:

```text
web/out
```

## Deployment Checks

| Check | Goal |
|-------|------|
| `wrangler.toml` | `pages_build_output_dir` points to `web/out` |
| `Web Release Check` workflow | Run type, build, smoke, and release gates on pull requests and `main` changes |
| `web/out/_headers` | Caching and baseline security headers ship with the static output |
| `web/out/api/search/{locale}` | Every locale has its own search index shard |
| Key pages | `/deployment`, `/en/deployment`, `/tools`, and `/en/tools` return 200 |

## Rollback Flow

1. Roll back to the previous successful Cloudflare Pages deployment.
2. Compare `web/out/_headers`, `web/out/api/search`, and `web/out/sitemap.xml`.
3. Re-run `types:check`, `build`, and `release:check`.
4. Sample `/`, `/en`, `/deployment`, `/en/deployment`, `/api/search/zh`, and `/api/search/en`.

After local static preview is running, you can also run:

```bash
SMOKE_BASE_URL=http://localhost:43018 corepack pnpm --dir web smoke:check
```
