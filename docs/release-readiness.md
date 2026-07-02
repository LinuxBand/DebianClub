---
title: "发布准备"
description: "DebianClub 发布前质量门禁：构建、搜索索引、关键路由、静态导出产物和回滚检查。"
---

发布准备阶段用于把 Phase 0-5 的内容改动收束成可上线状态。重点不是新增页面数量，而是确认用户会访问的入口、搜索、静态导出和部署边界都可用。

## 发布门禁

| 检查项 | 目标 | 失败时处理 |
|--------|------|------------|
| 类型检查 | MDX、路由类型和 TypeScript 能通过 | 先修类型或组件注册问题 |
| 生产构建 | Next.js 静态导出能完整生成 | 查看具体页面或组件报错 |
| 搜索索引 | 每个语言索引分片存在且小于 25 MiB | 重新拆分索引或减少单文件体积 |
| 关键页面 | 首页、AI Skills、场景、硬件、版本、工具箱可访问 | 修复导航、meta 或内容路径 |

## 本地命令

```bash
. "$HOME/.nvm/nvm.sh"
corepack pnpm --dir web types:check
corepack pnpm --dir web build
corepack pnpm --dir web release:check
```

## 搜索验证

前端搜索请求 `/api/search/{locale}`，例如 `/api/search/zh` 和 `/api/search/en`。不要把 `/api/search?locale=zh` 当成真实客户端路径。

## 部署前检查

- 确认 `web/out/api/search/*` 没有超过 Cloudflare Pages 单文件限制。
- 确认导航中的中文和英文入口都指向已存在页面。
- 确认新增内容没有把远程安装脚本直接管道给 shell 的不可审计安装方式。
- 确认 AI Skills 安装命令仍然只引用仓库内脚本。
