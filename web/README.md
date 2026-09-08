# Debian.Club Web

Debian.Club 的站点应用：基于 [Next.js](https://nextjs.org/)（静态导出）与
[Fumadocs](https://fumadocs.dev/) 的多语言 Debian 初学者教程网站。

## 常用命令

```bash
pnpm dev              # 本地开发（http://localhost:3000）
pnpm build            # 生产构建（同步友情链接 → next build → 拆分搜索索引）
pnpm start            # 预览静态产物（serve out）
pnpm types:check      # MDX + 路由 + TypeScript 类型检查
pnpm facts:sync       # 刷新 Debian 版本事实、云镜像构建 ID 和 Docker 官方 tag
pnpm facts:check      # 校验事实源、下载页和 8 语言版本页面是否漂移
pnpm release:check    # 发布门禁：内容时效 + i18n + Debian 事实 + pkgseek + 构建产物
pnpm smoke:check      # 运行时冒烟检查（需先 serve 产物，见 DEPLOY.md）
pnpm browser:check    # 浏览器端冒烟检查
```

## 目录结构

| 路径 | 说明 |
| --- | --- |
| `app/[[...segments]]` | 中文（默认语言）所有页面的 catch-all 路由（首页 + 文档页） |
| `app/[lang]/(docs)` | 其他 7 种语言的文档路由 |
| `app/api/search/route.ts` | 搜索 Route Handler |
| `content/docs/` | 全部文档内容（8 种语言；中文为无后缀主版本） |
| `lib/` | 站点配置、内容加载（`lib/source.ts`） |
| `_migration/` | 构建与发布门禁脚本（同步友情链接、搜索索引拆分、各类检查） |
| `public/` | 静态资源（含 `_headers`，随产物发布缓存/安全头） |
| `out/` | 静态导出产物（部署到 Cloudflare Pages） |

## 内容约定

- 每个文档页面以中文 `xxx.mdx` 为主版本，其他语言为 `xxx.<locale>.mdx`
  （`en/de/es/fr/ja/ko/pt`）。
- 生命周期和点更新版本以 [debian.org/releases](https://www.debian.org/releases/)
  与 Debian 官方 Release 文件为准，统一记录在 `lib/debian-facts.json`。
- `_migration/sync-debian-facts.mjs` 负责从 `deb.debian.org` 同步事实；
  `_migration/debian-facts-check.mjs` 会校验下载页、`whats-new`、`versions`、
  `eol`、`news` 和 `server/cloud` 等版本敏感页面（含云镜像构建 ID 与
  Docker 官方 tag），`_migration/content-freshness-check.mjs` 负责复核日期到期检查。

## 部署

静态导出部署到 Cloudflare Pages，详见 [DEPLOY.md](./DEPLOY.md)。
