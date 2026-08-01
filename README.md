# Debian.Club

🚀 **Debian 初学者完全指南** - 面向新手的 Debian 13 学习网站

## 项目简介

Debian.Club 是一个专为 Debian 初学者设计的多语言教程网站，使用 Next.js 与 Fumadocs 构建。我们的目标是让 Linux 新手能够轻松上手 Debian 13，从安装到日常使用，提供全方位的指导。

## 特性

- 🌍 **多语言支持** - 中文、英文、日语、韩语、法语、德语、西班牙语、葡萄牙语
- 👨‍🎓 **初学者友好** - 详细的步骤说明和截图描述
- 📱 **响应式设计** - 完美适配移动端和桌面端
- 🔍 **全文搜索** - 快速找到需要的信息
- ⚡ **快速加载** - 基于 Next.js 静态导出的高性能站点
- 🛡️ **无障碍访问** - 遵循 WCAG 标准

## 技术栈

- [Next.js](https://nextjs.org/) - 静态导出与路由
- [Fumadocs](https://fumadocs.dev/) - 文档站点框架
- [React](https://react.dev/) - 前端框架
- [TypeScript](https://www.typescriptlang.org/) - 类型安全
- [Tailwind CSS](https://tailwindcss.com/) - 样式系统
- [Markdown](https://daringfireball.net/projects/markdown/) - 内容格式

## 快速开始

### 环境要求

- Node.js 20+（Cloudflare Pages 构建使用 Node 24，见 [web/DEPLOY.md](./web/DEPLOY.md)）
- pnpm

### 安装依赖

```bash
corepack enable
pnpm --dir web install
```

### 本地开发

```bash
pnpm dev
```

访问 http://localhost:3000 查看网站

### 构建生产版本

```bash
pnpm build
```

### 预览生产版本

```bash
pnpm start
```

## 目录结构

```
web/
├── app/                  # Next.js App Router 页面
├── content/              # Fumadocs MDX 内容（8 种语言，内容唯一来源）
├── lib/                  # 站点配置与内容加载
├── public/               # 静态资源
└── out/                  # 静态导出产物

docs/                     # 旧 VitePress 站内容，已冻结为只读归档，不再更新
skills/                   # Debian Linux 可靠性技能包
wrangler.toml             # Cloudflare Pages 部署配置
.github/workflows/        # CI：发布门禁与技能包发布
```

## 贡献指南

我们欢迎所有形式的贡献！请通过 [GitHub Issues](https://github.com/yeagoo/DebianClub/issues) 提交问题或建议。

### 内容贡献

- ✍️ 编写新教程
- 🔄 翻译现有内容
- 🐛 修复错误和改进
- 📸 添加截图和示例

### 技术贡献

- 💻 功能开发
- 🎨 界面设计
- 📱 移动端优化
- ♿ 无障碍改进

## 开发规范

- 使用 Next.js / Fumadocs 结构
- 遵循多语言文件组织（中文为无后缀主版本，其余语言使用 `.<locale>` 后缀）
- 保持内容对初学者友好
- 包含实际可用的代码示例
- 优化 SEO 和性能

## 许可证

本项目基于 [MIT License](./LICENSE) 开源。

## 社区

- 🐛 [问题反馈](https://github.com/yeagoo/DebianClub/issues)
- 💻 [源代码](https://github.com/yeagoo/DebianClub)

## 致谢

感谢所有为这个项目做出贡献的开发者和内容创作者！

---

**让 Debian 学习变得更简单！** 🎉
