---
title: 版本对比
description: Debian 11, 12, 13 各版本详细对比与选择指南
---

# Debian 版本对比指南

::: info 关于本页面
本页面详细对比了 Debian 13 (Trixie)、Debian 12 (Bookworm) 和 Debian 11 (Bullseye) 三个版本的主要差异，帮助您选择最适合的版本。
:::

## 📋 版本概览

| 版本信息 | Debian 13 (Trixie) | Debian 12 (Bookworm) | Debian 11 (Bullseye) |
|---|---|---|---|
| **发布状态** | 当前稳定版 (stable) | 旧稳定版 (oldstable) | LTS 支持中 |
| **发布时间** | 2025 年 8 月 | 2023 年 6 月 | 2021 年 8 月 |
| **最新点版本** | 13.4 (2026-03-08) | 12.13 (2026-01-10) | — |
| **支持期限** | ~ 2030 年 (含 LTS) | ~ 2028 年 6 月 | 2026 年 6 月 |
| **Linux 内核** | 6.12 | 6.1 LTS | 5.10 LTS |
| **GNOME 版本**| 48 | 43 | 3.38 |

## ⚙️ 核心组件与开发工具

| 软件/工具 | Trixie (Debian 13) | Bookworm (Debian 12) | Bullseye (Debian 11) |
|---|---|---|---|
| **GCC** | 14.2 | 12.2 | 10.2 |
| **LLVM/Clang** | 16+ | 14.0 | 11.0 |
| **Python** | 3.13 | 3.11 | 3.9 |
| **Node.js** | 20.x | 18.13 | 12.22 |
| **Go** | 1.21+ | 1.19 | 1.15 |
| **Rust** | 1.70+ | 1.63 | 1.48 |
| **PHP** | 8.3 | 8.2 | 7.4 |

## 🎯 版本选择建议

### 按使用场景推荐

- **🖥️ 桌面用户**:
  - **推荐**: 选择 **Debian 13 (Trixie)**。它是当前稳定版，带有最新的 GNOME 48 / KDE Plasma 6.3 桌面环境。
  - **保守选择**: **Debian 12 (Bookworm)** 作为旧稳定版仍在维护中，适合不愿立即迁移的用户。

- **💻 开发者**:
  - **现代应用开发**: 选择 **Debian 13 (Trixie)**。包含 GCC 14.2、Python 3.13、PHP 8.3 等最新工具链。
  - **兼容性优先**: **Debian 12 (Bookworm)** 仍在安全维护中，适合需要 oldstable 环境的项目。

- **🖧 服务器管理员**:
  - **新服务器部署**: 强烈推荐 **Debian 13 (Trixie)**。这是当前稳定版，拥有最新安全补丁和完整的支持周期。
  - **维护旧系统**: 如果仍在使用 **Debian 12 (Bookworm)**，它作为 oldstable 仍在维护中（至 ~2028 年）。**Debian 11 (Bullseye)** LTS 支持将于 2026 年 6 月结束，应尽快规划升级。

### 升级路径

- **从 Debian 11 升级**: 建议先升级到 **Debian 12**，再升级到 **Debian 13**。跨大版本升级应逐步进行。
- **从 Debian 12 升级**: 推荐升级到 **Debian 13**。Debian 13 已经发布多个点更新（13.4），足够成熟。

---

**想了解特定软件的版本？** [访问 packages.debian.org](https://packages.debian.org/) | [查看安装指南 →](/basics/installation) 