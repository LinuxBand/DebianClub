---
title: Devuan — Debian 变体
description: Debian 的 fork，以 sysvinit/runit/OpenRC 替代 systemd，保留 init 系统自由
---

# Devuan

Devuan（发音类似 "dev-one"）是 Debian 的一个 fork，由 Veteran Unix Admins 团队于 2015 年发起，起因是 Debian 8 Jessie 引入 systemd 作为默认初始化系统所引发的社区争议。Devuan 的核心目标是提供一个不依赖 systemd 的 Debian 体验，支持 sysvinit、runit 和 OpenRC 等多种 init 系统。

## 基本信息

| 属性 | 详情 |
|------|------|
| 基于 | Debian（去除 systemd 依赖） |
| 发布周期 | 与 Debian stable 同步（Devuan 5 Daedalus = Debian 12 Bookworm） |
| 默认桌面 | Xfce（默认），可选 GNOME、KDE、LXQt 等 |
| 目标用户 | 偏好传统 init 系统的用户、系统管理员、嵌入式开发者 |
| 官网 | [https://www.devuan.org](https://www.devuan.org) |

## 主要特点

- **Init 系统自由**：安装时可选择 sysvinit（传统）、runit（轻量快速）或 OpenRC（Gentoo 使用的 init 框架），不强制使用 systemd。
- **高度兼容 Debian**：Devuan 软件包与 Debian 软件包几乎完全兼容，只有涉及 systemd 依赖的包被替换或打补丁。大多数 Debian 文档和命令同样适用于 Devuan。
- **版本与 Debian 对齐**：Devuan 版本命名与 Debian 对应（Devuan 1 = Debian 8 Jessie，Devuan 5 Daedalus = Debian 12 Bookworm），便于用户理解版本关系。
- **适合嵌入式和容器环境**：无 systemd 的精简环境在容器（Docker/LXC）和嵌入式设备中占用资源更少，启动更快。
- **多种安装介质**：提供标准安装镜像、Live 镜像、Netinstall 镜像以及 ARM 设备专用镜像。

## 与 Debian 的关系

Devuan 是 Debian 的直接 fork，而不是衍生发行版。其软件包仓库基于 Debian，但对所有引入 systemd 强依赖的软件包进行了修改，使用 libsystemd0 的仿替代实现（libelogind0）来满足二进制兼容性，同时实际运行的 init 系统不是 systemd。这意味着绝大多数 Debian 软件可以在 Devuan 上直接运行，但 GNOME 等深度集成 systemd 的桌面环境需要额外的适配工作。

## 安装方式

```bash
# 从官网下载 ISO：https://www.devuan.org/get-devuan
# 提供 netinstall、desktop-live、minimal-live 等多种镜像

# 安装完成后更新系统
sudo apt update && sudo apt full-upgrade -y

# 查看当前 init 系统
cat /proc/1/comm  # 应显示 sysvinit、runit 或 openrc

# 服务管理（sysvinit 风格）
sudo service nginx start
sudo service nginx status
sudo update-rc.d nginx enable

# 如果使用 runit
sudo sv start nginx
sudo sv status nginx
```

## 适合人群

- 对 systemd 的设计哲学持保留意见、偏好传统 Unix init 系统的用户
- 需要在容器或嵌入式环境中运行精简系统的系统管理员
- 希望更好理解和控制系统启动过程的 Linux 学习者
- 有老旧服务器或特殊硬件，与 systemd 存在兼容问题的用户

## 相关链接

- 官网：[https://www.devuan.org](https://www.devuan.org)
- 下载页：[https://www.devuan.org/get-devuan](https://www.devuan.org/get-devuan)
- 官方文档：[https://www.devuan.org/os/documentation](https://www.devuan.org/os/documentation)
- 邮件列表/社区：[https://www.devuan.org/os/community](https://www.devuan.org/os/community)

---

## 下一步

返回 [Debian 变体发行版总览](/variants/)，了解其他基于 Debian 的发行版。
