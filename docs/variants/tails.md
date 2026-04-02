---
title: Tails — Debian 变体
description: 以隐私和匿名为核心设计的 Live 系统，全流量走 Tor，关机后不留任何痕迹
---

# Tails

Tails（The Amnesic Incognito Live System）是一个以保护隐私和实现匿名为首要目标的 Live 操作系统，基于 Debian stable 构建。它被设计为从 U 盘或 DVD 启动，关闭后不在使用的计算机上留下任何痕迹。所有网络流量都被强制通过 Tor 匿名网络路由，是记者、活动人士和隐私敏感用户的重要工具。

## 基本信息

| 属性 | 详情 |
|------|------|
| 基于 | Debian stable |
| 发布周期 | 约每 6–8 周发布安全更新版本 |
| 默认桌面 | GNOME（定制精简版） |
| 目标用户 | 记者、维权人士、隐私保护需求用户、高风险环境用户 |
| 官网 | [https://tails.boum.org](https://tails.boum.org) |

## 主要特点

- **遗忘性（Amnesia）**：系统运行在内存中，关机后所有临时文件、历史记录、元数据都会从内存中清除，不写入硬盘。
- **全流量 Tor 路由**：所有网络连接都通过 Tor 网络，非 Tor 流量会被自动阻断，防止意外泄露真实 IP 地址。
- **预装隐私工具**：内置 Tor Browser、Thunderbird（配合 OpenPGP 邮件加密）、OnionShare、KeePassXC 密码管理器等。
- **持久化加密存储**：可选在 U 盘上创建加密的持久化分区，用于保存文档、书签和密钥等需要跨次会话保留的数据。
- **防篡改启动验证**：Tails 提供完整的下载验证机制，确保镜像未被篡改，并支持通过 UEFI 安全启动环境运行。

## 与 Debian 的关系

Tails 以 Debian stable 为基础，使用 Debian 的软件包和安全更新机制。在 Debian 的基础上，Tails 做了大量安全加固：禁用不必要的服务、强化 AppArmor 配置、修改内核参数以减少信息泄露风险，并集成了 Tor 项目的软件栈。Tails 团队会在 Debian 发布安全补丁后迅速跟进，更新周期约 6–8 周一次。

## 安装方式

```bash
# Tails 必须从 U 盘（至少 8GB）运行，推荐使用官方安装工具

# 步骤 1：从官网下载 ISO 镜像
# https://tails.boum.org/install/

# 步骤 2：使用 Tails Installer（或 balenaEtcher）写入 U 盘
# 官方推荐从另一个 Tails 系统内使用 Tails Installer 进行克隆安装
# 首次安装可使用 balenaEtcher：https://www.balena.io/etcher/

# 步骤 3：验证下载文件（强烈推荐）
# 官网提供 OpenPGP 签名和浏览器扩展验证方式

# 注意：Tails 不建议安装到硬盘，也无法通过虚拟机获得完整保护
```

## 适合人群

- 记者、律师、人权活动人士等需要保护通信安全的专业人员
- 在公共计算机（网吧、图书馆）上需要私密操作的用户
- 高度重视个人隐私、希望最大程度减少数字痕迹的普通用户
- 需要绕过网络审查或访问 .onion 暗网站点的用户

::: warning 注意事项
Tails 能保护的是使用过程中的隐私，但无法防范硬件级别的监控（如 BIOS 后门、物理键盘记录器）或用户自身的操作失误（如在 Tails 内登录个人账号）。
:::

## 相关链接

- 官网：[https://tails.boum.org](https://tails.boum.org)
- 安装指南：[https://tails.boum.org/install/](https://tails.boum.org/install/)
- 官方文档：[https://tails.boum.org/doc/](https://tails.boum.org/doc/)
- Tor 项目：[https://www.torproject.org](https://www.torproject.org)

---

## 下一步

返回 [Debian 变体发行版总览](/variants/)，了解其他基于 Debian 的发行版。
