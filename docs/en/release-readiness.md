---
title: "Release Readiness"
description: "DebianClub pre-release quality gates for builds, search indexes, key routes, static export artifacts, and rollback checks."
---

Release readiness turns the Phase 0-5 content work into a deployable site. The focus is making sure high-traffic entries, search, static export output, and deployment boundaries work.

## Release Gates

| Check | Goal | If it fails |
|-------|------|-------------|
| Type check | MDX, route types, and TypeScript pass | Fix component registration or type issues first |
| Production build | Next.js static export completes | Inspect the failing page or component |
| Search index | Per-locale search shards exist and stay below 25 MiB | Split the index again or reduce file size |
| Key pages | Home, AI Skills, scenarios, hardware, versions, and tools load | Fix navigation, metadata, or content paths |

## Local Commands

```bash
. "$HOME/.nvm/nvm.sh"
corepack pnpm --dir web types:check
corepack pnpm --dir web build
corepack pnpm --dir web release:check
```

## Search Verification

The frontend search path is `/api/search/{locale}`, for example `/api/search/zh` and `/api/search/en`. Do not treat `/api/search?locale=zh` as the real client path.

## Pre-Deployment Checks

- Confirm `web/out/api/search/*` stays below the Cloudflare Pages per-file limit.
- Confirm Chinese and English navigation entries point to existing pages.
- Confirm new content does not pipe remote installer scripts directly into a shell.
- Confirm AI Skills install commands still call repository-local scripts.
