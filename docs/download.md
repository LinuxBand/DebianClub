---
layout: page
title: Debian 系统下载
description: "下载最新的 Debian Stable、Testing 或 Unstable (Sid) 版本的 ISO 镜像，包括 netinst、DVD 和 live 版本。为您的服务器或桌面选择最合适的 Debian。"
---

# Debian 系统下载

为您的计算机下载最新、最稳定的 Debian。

## 我应该选择哪个版本？

- **Stable (稳定版)**:
  - **推荐给大多数用户**，特别是用于服务器和日常桌面使用。它经过了充分的测试，拥有最高的稳定性和最及时的安全支持。
  - 当前稳定版: **Debian 12 (Bookworm)**

- **Testing (测试版)**:
  - 下一个稳定版的“候选版本”。包含了比稳定版更新的软件，但在稳定性和安全支持上稍逊一筹。
  - **适合开发者和希望体验新功能的用户**，他们不介意偶尔遇到一些小问题。
  - 当前测试版: **Debian 13 (Trixie)**

- **Unstable (不稳定版, 代号 Sid)**:
  - 滚动发行版，包含了最新鲜的软件包。
  - **只推荐给有经验的 Debian 开发者和高级用户**，他们知道如何处理系统可能出现的故障。

---

## 推荐镜像站点

为了获得最快的下载速度，建议您从就近的镜像站点下载。

<MirrorSelector />

---

## 下载链接

### Debian 12 (Bookworm) - 稳定版

| 架构      | 网络安装版 (netinst) | Live 桌面版 (GNOME) | DVD 版 |
| :-------- | :----------- | :----------- | :---------- |
| **amd64** (64位) | [下载](https://cdimage.debian.org/debian-cd/current/amd64/iso-cd/debian-12.5.0-amd64-netinst.iso) | [下载](https://cdimage.debian.org/debian-cd/current-live/amd64/iso-hybrid/debian-live-12.5.0-amd64-gnome.iso) | [下载](https://cdimage.debian.org/debian-cd/current/amd64/iso-dvd/debian-12.5.0-amd64-DVD-1.iso) |
| **arm64** (64位 ARM) | [下载](https://cdimage.debian.org/debian-cd/current/arm64/iso-cd/debian-12.5.0-arm64-netinst.iso) | - | [下载](https://cdimage.debian.org/debian-cd/current/arm64/iso-dvd/debian-12.5.0-arm64-DVD-1.iso) |
| **i386** (32位) | [下载](https://cdimage.debian.org/debian-cd/current/i386/iso-cd/debian-12.5.0-i386-netinst.iso) | [下载](https://cdimage.debian.org/debian-cd/current-live/i386/iso-hybrid/debian-live-12.5.0-i386-gnome.iso) | [下载](https://cdimage.debian.org/debian-cd/current/i386/iso-dvd/debian-12.5.0-i386-DVD-1.iso) |

> **提示**: `netinst` 镜像是大多数用户的推荐选择，它体积小，安装过程中会从网络下载最新的软件包。

### Debian 13 (Trixie) - 测试版

| 架构      | 网络安装版 (netinst) |
| :-------- | :----------- |
| **amd64** (64位) | [下载](https://cdimage.debian.org/cdimage/weekly-builds/amd64/iso-cd/debian-testing-amd64-netinst.iso) |
| **arm64** (64位 ARM) | [下载](https://cdimage.debian.org/cdimage/weekly-builds/arm64/iso-cd/debian-testing-arm64-netinst.iso) |
| **i386** (32位) | [下载](https://cdimage.debian.org/cdimage/weekly-builds/i386/iso-cd/debian-testing-i386-netinst.iso) |

---

### 历史版本

- **Debian 11 (Bullseye)** - [旧稳定版下载](https://cdimage.debian.org/cdimage/archive/11.9.0/amd64/iso-cd/)
- **Debian 10 (Buster)** - [旧的LTS版本下载](https://cdimage.debian.org/cdimage/archive/10.13.0/amd64/iso-cd/)

在安装任何系统前，强烈建议您校验 ISO 镜像的完整性。
