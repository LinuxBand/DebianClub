# Debian.Club

🚀 **Debian 初学者完全指南** - 面向新手的 Debian 13 学习网站

## 项目简介

Debian.Club 是一个专为 Debian 初学者设计的中英文双语教程网站，使用 VitePress 构建。我们的目标是让 Linux 新手能够轻松上手 Debian 13，从安装到日常使用，提供全方位的指导。

## 特性

- 🌍 **多语言支持** - 中文、英文，更多语言正在添加中
- 👨‍🎓 **初学者友好** - 详细的步骤说明和截图描述
- 📱 **响应式设计** - 完美适配移动端和桌面端
- 🔍 **全文搜索** - 快速找到需要的信息
- ⚡ **快速加载** - 基于 VitePress 的高性能静态站点
- 🛡️ **无障碍访问** - 遵循 WCAG 标准

## 技术栈

- [VitePress](https://vitepress.dev/) - 静态站点生成器
- [Vue.js 3](https://vuejs.org/) - 前端框架
- [TypeScript](https://www.typescriptlang.org/) - 类型安全
- [Markdown](https://daringfireball.net/projects/markdown/) - 内容格式

## 快速开始

### 环境要求

- Node.js 18+ 
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run docs:dev
```

访问 http://localhost:5173 查看网站

### 构建生产版本

```bash
npm run docs:build
```

### 预览生产版本

```bash
npm run docs:preview
```

## 目录结构

```
docs/
├── .vitepress/           # VitePress 配置
│   ├── config.ts         # 主配置文件
│   └── theme/            # 自定义主题
├── public/               # 静态资源
│   └── images/           # 图片资源
├── basics/               # 基础教程 (中文)
├── administration/       # 系统管理 (中文)
├── applications/         # 应用程序 (中文)
├── troubleshooting/      # 故障排除 (中文)
├── en/                   # 英文版本
│   ├── basics/
│   ├── administration/
│   ├── applications/
│   └── troubleshooting/
├── index.md              # 中文首页
└── community.md          # 社区页面
```

## 贡献指南

我们欢迎所有形式的贡献！请阅读 [贡献指南](./docs/community.md) 了解详情。

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

请遵循 [.cursorrules](./.cursorrules) 中定义的项目规范：

- 使用 VitePress 标准结构
- 遵循多语言文件组织
- 保持内容对初学者友好
- 包含实际可用的代码示例
- 优化 SEO 和性能

## 许可证

本项目基于 [MIT License](./LICENSE) 开源。

## 社区

- 💬 [Discord](https://discord.gg/debian-club)
- 📧 [邮件列表](mailto:help@debian.club)
- 🐛 [问题反馈](https://github.com/debian-club/debian.club/issues)

## 致谢

感谢所有为这个项目做出贡献的开发者和内容创作者！

---

**让 Debian 学习变得更简单！** 🎉 