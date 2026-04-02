---
title: Linux Mint / LMDE — Debian 变体
description: 以简洁友好著称的桌面 Linux，LMDE 版直接基于 Debian stable
---

# Linux Mint / LMDE

Linux Mint 是最受初学者欢迎的 Linux 桌面发行版之一，以"开箱即用、对用户友好"为核心理念，由社区团队自 2006 年起持续维护。主版本基于 Ubuntu，而 **LMDE（Linux Mint Debian Edition）** 则直接基于 Debian stable，为希望使用纯 Debian 基础同时保留 Mint 体验的用户提供了另一种选择。

## 基本信息

| 属性 | 详情 |
|------|------|
| 基于 | Ubuntu（主版本）/ Debian stable（LMDE） |
| 发布周期 | 与 Ubuntu LTS 同步（主版本）；跟随 Debian stable（LMDE） |
| 默认桌面 | Cinnamon（主推）、MATE、Xfce |
| 目标用户 | 桌面初学者、Windows 迁移用户 |
| 官网 | [https://linuxmint.com](https://linuxmint.com) |

## 主要特点

- **极低的上手门槛**：预装多媒体解码器、Flash 替代品和常用软件，安装完成即可播放视频、音乐，无需额外配置。
- **Cinnamon 桌面**：Linux Mint 自研的 Cinnamon 桌面环境布局接近 Windows，任务栏、开始菜单、系统托盘一应俱全，迁移成本极低。
- **Mint 工具集**：包含 Timeshift 备份工具、Update Manager（带风险等级标注的更新管理器）、Driver Manager 等实用工具。
- **LMDE 的独立价值**：LMDE 不依赖 Ubuntu，直接从 Debian stable 获取软件包，适合希望减少依赖层级、更贴近 Debian 的用户。
- **保守的更新策略**：Update Manager 默认只推送安全更新和低风险更新，系统稳定性出色。

## 与 Debian 的关系

- **主版本**：基于 Ubuntu LTS，Ubuntu 本身又基于 Debian，因此主版本与 Debian 之间隔了一层。软件包来自 Ubuntu 仓库，并叠加 Linux Mint 自有仓库。
- **LMDE**：直接基于 Debian stable（当前 LMDE 6 基于 Debian 12 Bookworm），软件包直接来自 Debian 官方仓库加 Mint 自有仓库，层级更简单，更新节奏跟随 Debian stable。

## 安装方式

```bash
# 从官网下载 ISO 后写入 U 盘安装
# https://linuxmint.com/download.php（主版本）
# https://linuxmint.com/download_lmde.php（LMDE）

# 安装后更新系统
sudo apt update && sudo apt upgrade -y

# 安装 Timeshift 备份工具（通常已预装）
sudo apt install timeshift -y

# 安装中文输入法（Fcitx5）
sudo apt install fcitx5 fcitx5-chinese-addons -y
```

## 适合人群

- 从 Windows 迁移到 Linux 的新用户
- 希望桌面体验接近传统 Windows 风格的用户
- 需要稳定系统、不想频繁折腾的家庭或办公用户
- 希望使用纯 Debian 基础同时保留友好体验的中级用户（选 LMDE）

## 相关链接

- 官网：[https://linuxmint.com](https://linuxmint.com)
- 下载（主版本）：[https://linuxmint.com/download.php](https://linuxmint.com/download.php)
- 下载（LMDE）：[https://linuxmint.com/download_lmde.php](https://linuxmint.com/download_lmde.php)
- 用户指南：[https://linuxmint.com/documentation.php](https://linuxmint.com/documentation.php)
- 社区论坛：[https://forums.linuxmint.com](https://forums.linuxmint.com)

---

## 下一步

返回 [Debian 变体发行版总览](/variants/)，了解其他基于 Debian 的发行版。
