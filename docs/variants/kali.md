---
title: Kali Linux — Debian 变体
description: 专为渗透测试与网络安全研究设计的 Debian 衍生发行版，预装 600+ 安全工具
---

# Kali Linux

Kali Linux 是业界最广为人知的安全研究和渗透测试专用 Linux 发行版，由 Offensive Security 团队于 2013 年发布，是早期 BackTrack Linux 的继承者。它基于 Debian testing 分支，采用滚动发布模式，预装超过 600 个渗透测试、数字取证和逆向工程工具。

## 基本信息

| 属性 | 详情 |
|------|------|
| 基于 | Debian testing（滚动） |
| 发布周期 | 滚动发布（rolling release） |
| 默认桌面 | Xfce（自 2019 年起），可选 GNOME、KDE 等 |
| 目标用户 | 安全研究人员、渗透测试工程师、CTF 参赛者 |
| 官网 | [https://www.kali.org](https://www.kali.org) |

## 主要特点

- **600+ 预装安全工具**：涵盖 Nmap、Metasploit、Burp Suite、Wireshark、Aircrack-ng、John the Ripper 等主流安全工具，按类别分组管理。
- **滚动发布模式**：跟踪 Debian testing，工具持续更新，无需定期重装系统。
- **多平台支持**：提供 x86_64、ARM、WSL（Windows 子系统）、Docker 镜像以及树莓派专用版本。
- **Live 模式**：支持从 U 盘直接启动，不需要安装到硬盘，适合临时安全评估任务。
- **Kali Undercover 模式**：一键将桌面切换为类似 Windows 10 的外观，适合在公共场所使用。

## 与 Debian 的关系

Kali Linux 基于 Debian testing 分支，软件包会定期从 Debian testing 同步，但 Offensive Security 添加了大量自定义内核补丁（网卡注入支持等）和独立维护的安全工具仓库。Kali 的软件包管理系统与 Debian 兼容，但**不建议**在 Kali 上混用标准 Debian/Ubuntu 软件源，以免破坏系统稳定性。

## 安装方式

```bash
# 下载 ISO：https://www.kali.org/get-kali/
# 推荐使用 Installer 版本安装到硬盘，或 Live 版本从 U 盘运行

# 安装完成后更新系统
sudo apt update && sudo apt full-upgrade -y

# 安装额外工具集（例如完整的工具包）
sudo apt install kali-linux-everything -y

# 仅安装最常用的 Top 10 工具
sudo apt install kali-tools-top10 -y

# 启用/切换桌面环境（以 GNOME 为例）
sudo apt install kali-desktop-gnome -y
```

## 适合人群

- 从事网络安全渗透测试的专业人员
- 参加 CTF（Capture The Flag）比赛的选手
- 学习网络安全课程的学生
- 进行数字取证和恶意软件分析的研究人员

::: warning 注意事项
Kali Linux 中的工具仅应用于合法授权的测试环境。未经授权对他人系统使用渗透测试工具在大多数国家和地区属于违法行为。
:::

## 相关链接

- 官网：[https://www.kali.org](https://www.kali.org)
- 下载页：[https://www.kali.org/get-kali/](https://www.kali.org/get-kali/)
- 官方文档：[https://www.kali.org/docs/](https://www.kali.org/docs/)
- 工具列表：[https://www.kali.org/tools/](https://www.kali.org/tools/)
- Offensive Security 培训：[https://www.offsec.com](https://www.offsec.com)

---

## 下一步

返回 [Debian 变体发行版总览](/variants/)，了解其他基于 Debian 的发行版。
