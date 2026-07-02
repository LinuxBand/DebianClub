---
title: "部署与运行"
description: "DebianClub 静态站点部署手册：Cloudflare Pages 配置、构建产物、安全头、上线检查、回滚和运行监控。"
---

DebianClub 当前按 Next.js 静态导出运行，部署目标是 Cloudflare Pages，产物目录是 `web/out`。

## 标准上线命令

```bash
. "$HOME/.nvm/nvm.sh"
corepack pnpm --dir web types:check
corepack pnpm --dir web build
corepack pnpm --dir web release:check
```

Cloudflare Pages 的输出目录保持为：

```text
web/out
```

## 部署检查

| 检查项 | 目标 |
|--------|------|
| `wrangler.toml` | `pages_build_output_dir` 指向 `web/out` |
| `Web Release Check` workflow | PR 和 main 分支变更自动跑类型、构建、冒烟检查、发布门禁 |
| `web/out/_headers` | 缓存和基础安全头已随静态产物发布 |
| `web/out/api/search/{locale}` | 每个语言搜索索引独立存在 |
| 关键页面 | `/deployment`、`/en/deployment`、`/tools`、`/en/tools` 返回 200 |

## 回滚流程

1. 在 Cloudflare Pages 回滚到上一条成功部署。
2. 对比 `web/out/_headers`、`web/out/api/search` 和 `web/out/sitemap.xml`。
3. 复跑 `types:check`、`build`、`release:check`。
4. 抽样验证 `/`、`/en`、`/deployment`、`/en/deployment`、`/api/search/zh`、`/api/search/en`。

本地静态预览启动后，也可以直接运行：

```bash
SMOKE_BASE_URL=http://localhost:43018 corepack pnpm --dir web smoke:check
```
