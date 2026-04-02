---
title: Deepin — Debian 变体
description: 武汉深之度科技出品的国产 Linux 发行版，自研 DDE 桌面界面精美，基于 Debian stable
---

# Deepin

Deepin（深度操作系统）是由武汉深之度科技有限公司开发和维护的国产 Linux 发行版，基于 Debian stable。其最大亮点是自研的 DDE（Deepin Desktop Environment，深度桌面环境），以精美的视觉设计和流畅的交互体验著称，被认为是界面最精致的 Linux 桌面环境之一。

## 基本信息

| 属性 | 详情 |
|------|------|
| 基于 | Debian stable |
| 发布周期 | 跟随 Debian stable，deepin 23 系列为当前主力版本 |
| 默认桌面 | DDE（Deepin Desktop Environment，深度桌面） |
| 目标用户 | 中国及国际桌面用户、注重 UI 体验的用户、初学者 |
| 官网 | [https://www.deepin.org](https://www.deepin.org) |

## 主要特点

- **精美的 DDE 桌面**：深度桌面环境拥有流畅的动画效果、统一的视觉风格，提供类似 macOS 的 Dock 栏和控制中心，颜值在 Linux 桌面中首屈一指。
- **国产应用生态支持**：内置深度商店，提供微信（Linux 原生版）、WPS Office、网易云音乐、百度网盘等国人常用应用，开箱即可满足日常需求。
- **DDE 跨发行版移植**：DDE 已被移植到 Arch Linux、Fedora、NixOS 等多个主流发行版，用户不必切换到 Deepin 也能体验深度桌面。
- **deepin 23 架构升级**：deepin 23 基于 Debian 12 Bookworm，引入 Linglong 独立应用包格式，提升应用隔离性和兼容性。
- **活跃的中文社区**：拥有完善的中文文档、活跃的官方论坛和贡献者社区，对中国用户友好。

## 与 Debian 的关系

Deepin 直接基于 Debian stable，软件包来自 Debian 官方仓库加深之度维护的专属仓库。DDE 桌面环境、深度应用（深度文件管理器、深度终端、深度截图等）均为自研，不依赖 Debian 上游。Deepin 23 系列与 Debian 12 Bookworm 同步，在 Debian 安全更新方面及时跟进。

## 安装方式

```bash
# 从官网下载 ISO：https://www.deepin.org/zh/download/
# 提供 64 位标准版，支持 UEFI 和传统 BIOS

# 安装后更新系统
sudo apt update && sudo apt full-upgrade -y

# 安装深度商店（通常已预装）
sudo apt install deepin-appstore -y

# 在其他 Debian/Ubuntu 系统上安装 DDE（体验深度桌面）
# 以 Debian 12 为例
sudo apt install dde -y

# 安装微信 Linux 版（通过深度仓库）
sudo apt install com.tencent.weixin -y
```

## 适合人群

- 希望在 Linux 上获得精美桌面体验的用户
- 需要使用微信、WPS 等国产应用的中国用户
- 从 Windows 迁移到 Linux 并希望界面友好的新用户
- 对 Linux 桌面 UI 设计感兴趣的开发者和设计师

## 相关链接

- 官网：[https://www.deepin.org](https://www.deepin.org)
- 下载页：[https://www.deepin.org/zh/download/](https://www.deepin.org/zh/download/)
- 官方文档：[https://wiki.deepin.org](https://wiki.deepin.org)
- DDE 开源仓库：[https://github.com/linuxdeepin](https://github.com/linuxdeepin)
- 中文论坛：[https://bbs.deepin.org](https://bbs.deepin.org)

---

## 下一步

返回 [Debian 变体发行版总览](/variants/)，了解其他基于 Debian 的发行版。
