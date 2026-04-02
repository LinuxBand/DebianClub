---
title: Debian 变体发行版
description: 基于 Debian 的主要衍生发行版介绍
---

# Debian 变体发行版

Debian 是众多知名 Linux 发行版的上游基础。凭借其稳定的软件包体系、严格的质量标准和成熟的 APT 包管理器，数百个发行版以 Debian 为基础构建，面向不同的用户群体和使用场景。

下面汇总了十个最具代表性的 Debian 衍生发行版，涵盖桌面易用性、安全渗透测试、隐私保护、轻量化运行等多种方向。

## 发行版对比一览

| 发行版 | 基于 | 默认桌面 | 目标用户 | 特色 |
|--------|------|----------|----------|------|
| [Ubuntu](/variants/ubuntu) | Debian unstable/testing | GNOME | 广泛用户 | 最流行的桌面 Linux |
| [Kali Linux](/variants/kali) | Debian testing | Xfce | 安全研究人员 | 600+ 渗透测试工具 |
| [Linux Mint / LMDE](/variants/mint) | Ubuntu / Debian stable | Cinnamon | 初学者 | 极其友好的桌面体验 |
| [MX Linux](/variants/mx-linux) | Debian stable | Xfce | 中级用户 | 轻量、稳定、工具丰富 |
| [Raspberry Pi OS](/variants/raspberry-pi-os) | Debian | LXDE/Pixel | 树莓派用户 | ARM 优化，官方支持 |
| [Tails](/variants/tails) | Debian stable | GNOME | 隐私用户 | 全流量走 Tor，不留痕迹 |
| [Parrot OS](/variants/parrot) | Debian testing | MATE/KDE | 安全/开发者 | 安全工具 + 日常使用兼顾 |
| [Deepin](/variants/deepin) | Debian stable | DDE | 中国及国际用户 | 精美 UI，国产自研桌面 |
| [Devuan](/variants/devuan) | Debian | Xfce/其他 | 反 systemd 用户 | 替换 systemd 为传统 init |
| [antiX](/variants/antix) | Debian stable | IceWM | 老旧硬件用户 | 极度轻量，256MB 内存可运行 |

## 各发行版简介

### [Ubuntu](/variants/ubuntu)
全球最流行的桌面 Linux 发行版，由 Canonical 公司维护，每六个月发布一次，每两年发布一次长期支持版（LTS）。拥有庞大的社区和丰富的软件生态。

### [Kali Linux](/variants/kali)
专为渗透测试和网络安全研究设计，预装 600 多个安全工具，由 Offensive Security 维护，采用滚动发布模式。

### [Linux Mint / LMDE](/variants/mint)
以简洁易用著称的桌面发行版，主版本基于 Ubuntu，LMDE（Linux Mint Debian Edition）直接基于 Debian stable，是从 Windows 迁移的首选之一。

### [MX Linux](/variants/mx-linux)
长期位居 DistroWatch 下载榜前列，基于 Debian stable，融合 antiX 底层和 MX 工具集，兼顾轻量与易用。

### [Raspberry Pi OS](/variants/raspberry-pi-os)
树莓派基金会官方推荐操作系统，基于 Debian 并针对 ARM 硬件深度优化，提供桌面版和精简版。

### [Tails](/variants/tails)
以匿名和隐私为核心设计的 Live 系统，所有网络流量强制通过 Tor，关机后不在本机留下任何痕迹。

### [Parrot OS](/variants/parrot)
意大利 Frozenbox 团队开发，兼顾安全研究与日常使用，提供 Security、Home 和 HTB 多个版本。

### [Deepin](/variants/deepin)
武汉深之度科技出品，自研 DDE（Deepin 桌面环境）界面精美，是最受关注的国产 Linux 发行版之一。

### [Devuan](/variants/devuan)
Debian 的 fork，以保留 init 系统自由为目标，用 sysvinit/runit/OpenRC 替代 systemd，版本号与 Debian 同步。

### [antiX](/variants/antix)
超轻量级发行版，256MB 内存即可流畅运行，不依赖 systemd，适合运行在老旧 PC 和低配置硬件上。

---

::: tip 如何选择？
- 日常桌面使用，追求生态丰富 → **Ubuntu** 或 **Linux Mint**
- 安全研究、渗透测试 → **Kali Linux** 或 **Parrot OS**
- 隐私保护、匿名上网 → **Tails**
- 树莓派项目 → **Raspberry Pi OS**
- 老旧硬件复活 → **antiX** 或 **MX Linux**
- 喜欢精美 UI → **Deepin**
- 拒绝 systemd → **Devuan** 或 **antiX**
:::
