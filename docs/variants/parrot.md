---
title: Parrot OS — Debian 变体
description: 兼顾安全研究与日常使用的 Debian 衍生发行版，提供 Security、Home 等多个版本
---

# Parrot OS

Parrot OS（也称 ParrotSec）是由意大利 Frozenbox 团队开发的 Debian 衍生发行版，基于 Debian testing 分支并采用滚动发布模式。与 Kali Linux 相比，Parrot OS 在安全工具之外更注重日常桌面可用性和隐私保护，提供面向不同需求的多个版本。

## 基本信息

| 属性 | 详情 |
|------|------|
| 基于 | Debian testing（滚动） |
| 发布周期 | 滚动发布（rolling release） |
| 默认桌面 | MATE（Security/Home 版）、KDE Plasma（可选） |
| 目标用户 | 安全研究人员、开发者、注重隐私的日常用户 |
| 官网 | [https://parrotsec.org](https://parrotsec.org) |

## 主要特点

- **多版本覆盖多场景**：Security 版（渗透测试工具）、Home 版（轻量日常桌面）、HTB 版（专为 Hack The Box 平台优化）、Cloud/Docker 版（服务器/容器环境）。
- **轻量且流畅**：MATE 桌面加上 Parrot 的内核优化，在内存占用上比 Kali Linux 更低，2GB 内存即可流畅运行。
- **隐私工具集成**：内置 AnonSurf（一键将全部流量通过 Tor 路由）、Firejail 应用沙箱、OnionShare 等隐私保护工具。
- **开发友好**：Home 版预装多种编程语言运行时和开发工具，适合作为日常开发工作站使用。
- **滚动更新**：基于 Debian testing，工具和软件包持续更新，无需定期重装。

## 与 Debian 的关系

Parrot OS 基于 Debian testing，软件包直接来自 Debian testing 仓库，并叠加 Parrot 官方仓库（包含安全工具、自研工具和部分版本更新的软件）。Parrot 团队对内核进行了安全加固补丁，并维护专属的工具仓库。由于使用 Debian testing 而非 stable，软件版本更新，但稳定性略逊于 Debian stable 系发行版。

## 安装方式

```bash
# 从官网下载对应版本 ISO：https://parrotsec.org/download/
# 推荐 Security 版（安全研究）或 Home 版（日常使用）

# 安装后更新系统
sudo parrot-upgrade
# 或等同于
sudo apt update && sudo apt full-upgrade -y

# 一键启用 AnonSurf（全流量走 Tor）
sudo anonsurf start
sudo anonsurf status
sudo anonsurf stop

# 安装额外安全工具
sudo apt install metasploit-framework burpsuite -y
```

## 适合人群

- 希望在安全工具和日常使用之间取得平衡的用户
- 参加 Hack The Box、TryHackMe 等平台练习的安全学习者
- 注重隐私保护、希望一键开启 Tor 匿名的普通用户
- 需要轻量级渗透测试环境的安全研究人员

::: tip 与 Kali Linux 的区别
Kali Linux 专注于专业渗透测试工具的完整性；Parrot OS 更适合作为兼顾安全工具和日常使用的全能工作站，系统资源占用更低。
:::

## 相关链接

- 官网：[https://parrotsec.org](https://parrotsec.org)
- 下载页：[https://parrotsec.org/download/](https://parrotsec.org/download/)
- 官方文档：[https://parrotsec.org/docs/](https://parrotsec.org/docs/)
- GitLab（源码）：[https://gitlab.com/parrotsec](https://gitlab.com/parrotsec)

---

## 下一步

返回 [Debian 变体发行版总览](/variants/)，了解其他基于 Debian 的发行版。
