---
title: Ubuntu — Debian 变体
description: 全球最流行的 Debian 衍生桌面 Linux 发行版，由 Canonical 公司维护
---

# Ubuntu

Ubuntu 是全球使用人数最多的 Linux 桌面发行版，由英国公司 Canonical Ltd. 于 2004 年创立。它以 Debian 的软件包体系为基础，致力于提供对普通用户友好、开箱即用的桌面和服务器环境，每六个月发布一个新版本，每两年发布一个长期支持版本（LTS）。

## 基本信息

| 属性 | 详情 |
|------|------|
| 基于 | Debian unstable / testing |
| 发布周期 | 每 6 个月（4 月/10 月）；LTS 每 2 年 |
| 默认桌面 | GNOME（主版本），另有 KDE、Xfce、MATE 等官方 Flavor |
| 目标用户 | 桌面普通用户、开发者、企业服务器 |
| 官网 | [https://ubuntu.com](https://ubuntu.com) |

## 主要特点

- **庞大生态**：APT 软件仓库收录数万个软件包，Snap 商店提供额外应用，覆盖几乎所有使用场景。
- **LTS 长期支持**：LTS 版本提供 5 年标准支持，付费订阅可延长至 10 年，广泛用于企业生产环境。
- **多官方 Flavor**：Kubuntu（KDE）、Xubuntu（Xfce）、Lubuntu（LXQt）、Ubuntu MATE 等覆盖不同桌面偏好。
- **云与容器一流支持**：Ubuntu 是 AWS、Azure、GCP 上最流行的 Linux 镜像，也是 Docker 官方镜像的重要基础。
- **活跃社区**：Ask Ubuntu、Ubuntu 中文论坛等提供丰富的中文和英文支持资源。

## 与 Debian 的关系

Ubuntu 直接从 Debian unstable（Sid）和 testing 分支同步软件包，在每个发布周期前约 5 个月开始冻结并打补丁。Canonical 会在 Debian 包的基础上添加 Ubuntu 特有的补丁（尤其是内核和硬件支持），并维护独立的软件仓库。Ubuntu 的许多改进也会反向贡献给 Debian 上游。由于发布节奏不同，同一软件在 Ubuntu 和 Debian 中的版本可能存在差异。

## 安装方式

```bash
# 从官网下载 ISO 后制作启动盘，或在已有 Ubuntu 系统中升级
# 检查当前版本
lsb_release -a

# 升级到最新 LTS
sudo do-release-upgrade -d

# 安装常用工具（以 Ubuntu 24.04 为例）
sudo apt update && sudo apt upgrade -y
sudo apt install build-essential curl wget git -y
```

也可以通过官网 [https://ubuntu.com/download](https://ubuntu.com/download) 下载 ISO 镜像，使用 Rufus 或 `dd` 命令写入 U 盘后启动安装。

## 适合人群

- 从 Windows 或 macOS 迁移到 Linux 的新用户
- 希望使用稳定、文档丰富的开发环境的程序员
- 需要长期稳定支持的企业服务器管理员
- 对 Linux 感兴趣、希望快速上手的学习者

## 相关链接

- 官网：[https://ubuntu.com](https://ubuntu.com)
- 下载页：[https://ubuntu.com/download](https://ubuntu.com/download)
- 官方文档：[https://help.ubuntu.com](https://help.ubuntu.com)
- 中文社区：[https://forum.ubuntu.com.cn](https://forum.ubuntu.com.cn)
- Ask Ubuntu：[https://askubuntu.com](https://askubuntu.com)

---

## 下一步

返回 [Debian 变体发行版总览](/variants/)，了解其他基于 Debian 的发行版。
