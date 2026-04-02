---
title: antiX — Debian 变体
description: 超轻量级 Debian 衍生发行版，256MB 内存可运行，无 systemd，专为老旧硬件设计
---

# antiX

antiX 是一个极度轻量的 Debian stable 衍生发行版，由希腊开发者 anticapitalista 主导，专为老旧计算机和低配置硬件设计。它不使用 systemd，采用传统的 sysvinit 初始化系统，提供多种轻量级窗口管理器，最低只需 256MB 内存即可流畅运行，是赋予老旧 PC 第二生命的首选之一。

## 基本信息

| 属性 | 详情 |
|------|------|
| 基于 | Debian stable |
| 发布周期 | 跟随 Debian stable，定期发布更新版本 |
| 默认桌面 | IceWM（默认）、Fluxbox、JWM、Herbstluftwm（可选） |
| 目标用户 | 老旧硬件用户、追求极致轻量的用户、反 systemd 用户 |
| 官网 | [https://antixlinux.com](https://antixlinux.com) |

## 主要特点

- **极度轻量**：完整桌面系统内存占用可低至 150–200MB，256MB 内存即可正常运行，512MB 可流畅使用，赋予十年以上的老旧 PC 新生命。
- **无 systemd**：使用 sysvinit 作为 init 系统，启动速度极快，系统结构更简单透明，也是 MX Linux 的底层组件提供者。
- **四个版本**：Full（完整版）、Base（基础版）、Core（极简版）、Net（网络安装版），用户可根据需求选择最小化安装。
- **强大的 Live 功能**：Live 模式支持持久化存储，也可通过 antiX Live USB Maker 工具将 Live 系统写入 U 盘并保留设置。
- **32 位支持**：少数仍维护 32 位版本的发行版之一，可在 PAE 内核不支持的超老旧硬件上运行。

## 与 Debian 的关系

antiX 直接基于 Debian stable，软件包来自 Debian 官方仓库叠加 antiX 专属仓库。核心差异在于：移除了 systemd，以 sysvinit 替代；替换了部分 Debian 默认服务；提供更轻量的窗口管理器代替完整桌面环境。antiX 是 MX Linux 的底层基础，MX Linux 在 antiX 之上增加了图形工具和更友好的配置体验。

## 安装方式

```bash
# 从官网下载 ISO：https://antixlinux.com/download/
# 提供 Full、Base、Core、Net 四个版本，支持 32 位和 64 位

# 安装后更新系统
sudo apt update && sudo apt upgrade -y

# 查看内存使用情况（验证轻量特性）
free -h

# 服务管理（sysvinit）
sudo service <服务名> start
sudo service <服务名> stop
sudo update-rc.d <服务名> enable

# 安装额外轻量软件（如 Midori 浏览器）
sudo apt install midori -y

# 切换窗口管理器（通过会话管理器选择）
# IceWM / Fluxbox / JWM 均可在登录时选择
```

## 适合人群

- 拥有 10 年以上老旧 PC（512MB 内存以下）希望继续使用 Linux 的用户
- 希望系统尽可能轻量，了解并喜欢传统 Unix 工具链的用户
- 对 systemd 持批评态度、偏好 sysvinit 的用户
- 需要从 U 盘运行完整 Linux 环境的用户

::: tip 与 MX Linux 的关系
antiX 是 MX Linux 的底层基础。antiX 更极端轻量、更接近命令行；MX Linux 在此之上加入了图形工具，更适合不熟悉命令行的用户。
:::

## 相关链接

- 官网：[https://antixlinux.com](https://antixlinux.com)
- 下载页：[https://antixlinux.com/download/](https://antixlinux.com/download/)
- 官方论坛：[https://www.antixforum.com](https://www.antixforum.com)
- SourceForge 镜像：[https://sourceforge.net/projects/antix-linux/](https://sourceforge.net/projects/antix-linux/)

---

## 下一步

返回 [Debian 变体发行版总览](/variants/)，了解其他基于 Debian 的发行版。
