---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Debian.Club"
  text: "Debian 初学者完全指南"
  tagline: "从零开始学习 Debian 13 - 最稳定的 Linux 发行版"
  image:
    src: /images/debian-logo.svg
    alt: Debian Logo
  actions:
    - theme: brand
      text: 🚀 开始学习
      link: /basics/introduction
    - theme: alt
      text: 📥 系统下载
      link: /download
    - theme: alt
      text: 📖 查看教程
      link: /basics/installation

features:
  - icon: 🚀
    title: 完全免费
    details: 所有内容完全免费，无需注册，随时访问学习。开源社区驱动，永远为用户服务。
  - icon: 👨‍🎓
    title: 初学者友好
    details: 专为 Linux 新手设计，提供详细步骤和截图说明。从零基础到熟练使用的完整路径。
  - icon: 🔧
    title: 实用教程
    details: 真实可操作的命令和配置，直接复制粘贴即可使用。每个步骤都经过验证。
  - icon: 🌍
    title: 多语言支持
    details: 提供中文和英文版本，更多语言正在添加中。本地化内容，适合中国用户。
  - icon: 📱
    title: 响应式设计
    details: 完美适配手机、平板和桌面设备。随时随地学习，体验一致。
  - icon: ⚡
    title: 持续更新
    details: 跟随 Debian 13 最新变化，及时更新内容。社区贡献，内容保持最新。
---

<style>
.custom-block {
  margin: 2rem 0;
}

.learning-path-container {
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  border-radius: 16px;
  padding: 2rem;
  margin: 3rem 0;
  position: relative;
  overflow: hidden;
}

.learning-path-container::before {
  content: '🎯';
  position: absolute;
  top: 20px;
  right: 30px;
  font-size: 3rem;
  opacity: 0.1;
  z-index: 0;
  animation: float 6s ease-in-out infinite;
}

.learning-path-container::after {
  content: '📚';
  position: absolute;
  bottom: 20px;
  left: 30px;
  font-size: 2.5rem;
  opacity: 0.1;
  z-index: 0;
}

.learning-path {
  position: relative;
  z-index: 1;
}

.learning-path h3 {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0 1rem 0;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  border-left: 4px solid var(--vp-c-brand);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.step-counter {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-weight: bold;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.step-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-left: 3.5rem;
}

.step-content ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.step-content li {
  margin: 0.5rem 0;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 8px;
  border-left: 3px solid var(--vp-c-brand-lighter);
}

.step-content a {
  text-decoration: none;
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.step-content a:hover {
  color: var(--vp-c-brand);
}

.why-debian {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 16px;
  padding: 2rem;
  margin: 3rem 0;
  position: relative;
  overflow: hidden;
}

/* Removed complex grid and card styles - using native VitePress components now */

/* Simplified styles - removed complex community and CTA styles */

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@media (max-width: 768px) {
  .learning-path-container {
    padding: 1.5rem;
  }
  
  .step-content {
    margin-left: 0;
  }
  
  .learning-path h3 {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
}
</style>

## 🎯 4步学会 Debian

<div class="learning-path-container">  
  <div class="learning-path">
    
### <span class="step-counter">1</span> 基础入门 - 了解和准备

<div class="step-content">

- [📘 Debian 13 介绍](/basics/introduction) - 了解 Debian 的特点和优势
- [🆕 Debian 13 新特性](/basics/whats-new) - 了解最新版本的改进功能
- [💻 系统要求检查](/basics/requirements) - 确认你的硬件配置
- [⬇️ 下载安装镜像](/basics/download) - 获取最新的安装文件

</div>

### <span class="step-counter">2</span> 系统安装 - 动手实践

<div class="step-content">

- [🔥 制作启动盘](/basics/bootable-media) - 创建安装媒体
- [🛠️ 安装过程详解](/basics/installation) - 完整的安装指导
- [🎉 首次启动配置](/basics/first-boot) - 初始系统设置

</div>

### <span class="step-counter">3</span> 系统配置 - 个性化定制

<div class="step-content">

- [⚙️ 基本系统配置](/basics/configuration) - 优化系统设置
- [🎨 选择桌面环境](/basics/desktop-environments) - 打造专属界面
- [📦 安装常用软件](/administration/packages) - 丰富系统功能

</div>

### <span class="step-counter">4</span> 日常使用 - 熟练掌握

<div class="step-content">

- [👤 用户管理](/administration/users) - 安全和权限控制
- [🌐 网络设置](/administration/network) - 连接互联网
- [🚀 常用应用程序](/applications/index) - 办公娱乐软件

</div>

  </div>
</div>

## 💡 为什么选择 Debian？

::: tip 🔒 稳定可靠
Debian 以其出色的稳定性著称，是许多服务器和关键系统的首选。经过严格测试，确保系统稳定运行。
:::

::: info 🆓 完全免费
Debian 是真正的自由软件，永远免费且开源。没有任何许可费用，可以自由使用、修改和分发。
:::

::: warning 🛡️ 安全第一
强大的安全团队确保系统安全更新及时发布。定期的安全补丁和专业的安全审计。
:::

::: details 📦 软件丰富
拥有超过 50,000 个预编译软件包，涵盖各种应用场景。一键安装，无需编译。支持多种架构，包括新增的 RISC-V 64位架构。
:::

## 🎮 快速体验 Debian

想要快速体验 Debian？选择最适合你的方式开始：

| 方式 | 难度 | 时间 | 适合人群 |
|------|------|------|----------|
| 🖥️ **虚拟机安装** | ⭐⭐ 简单 | ⏱️ 30分钟 | 初学者练习 |
| 💿 **Live USB 体验** | ⭐ 最简单 | ⏱️ 10分钟 | 快速体验 |
| 🔧 **双系统安装** | ⭐⭐⭐ 中等 | ⏱️ 1小时 | 准备深度使用 |
| 🚀 **完整替换** | ⭐⭐⭐⭐ 高级 | ⏱️ 2小时 | Linux 爱好者 |

## 🚀 开始你的 Debian 之旅

### 准备好了吗？

加入数百万用户的选择，体验最稳定的 Linux 发行版！

<p style="text-align: center; margin: 2rem 0;">
  <a href="/basics/introduction" style="background: var(--vp-c-brand); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin: 0 8px; display: inline-block; font-weight: 500;">🎯 立即开始</a>
  <a href="/download" style="background: transparent; color: var(--vp-c-brand); padding: 12px 24px; border-radius: 8px; text-decoration: none; margin: 0 8px; display: inline-block; font-weight: 500; border: 2px solid var(--vp-c-brand);">📥 系统下载</a>
  <a href="/basics/installation" style="background: transparent; color: var(--vp-c-brand); padding: 12px 24px; border-radius: 8px; text-decoration: none; margin: 0 8px; display: inline-block; font-weight: 500; border: 2px solid var(--vp-c-brand);">📖 查看安装教程</a>
  <a href="/troubleshooting/faq" style="background: transparent; color: var(--vp-c-brand); padding: 12px 24px; border-radius: 8px; text-decoration: none; margin: 0 8px; display: inline-block; font-weight: 500; border: 2px solid var(--vp-c-brand);">❓ 常见问题</a>
</p>

