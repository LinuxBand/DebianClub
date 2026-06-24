---
title: "Backports 使用指南"
description: "在 Debian 13 稳定版上通过 trixie-backports 安全地安装较新版本软件的完整指南"
---

# Backports 使用指南

Debian 稳定版（Stable）以「稳定」著称，但软件版本相对保守。**Backports** 是 Debian 官方提供的折中方案：它把 `testing` 中较新的软件**重新编译**到当前稳定版上，让你在不离开 Stable 的前提下，按需安装个别较新的软件。

对 Debian 13 而言，对应的源是 **`trixie-backports`**。

## 什么时候用 Backports

- ✅ 需要某个软件的较新版本（如新内核以支持新硬件、较新的 LibreOffice）。
- ✅ 希望系统整体保持稳定，只升级个别软件。
- ❌ 不要为了「全都用新版」而把所有包都装成 backports——那样会失去 Stable 的稳定性优势。

> Backports 中的软件**不享受 Debian 安全团队的常规支持**，优先级也低于 Stable，需要时再按需安装。

## 启用 trixie-backports

### 方式一：deb822 格式（推荐）

新建 `/etc/apt/sources.list.d/trixie-backports.sources`：

```bash
sudo tee /etc/apt/sources.list.d/trixie-backports.sources > /dev/null <<'EOF'
Types: deb
URIs: http://deb.debian.org/debian
Suites: trixie-backports
Components: main contrib non-free non-free-firmware
Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg
EOF

sudo apt update
```

### 方式二：传统单行格式

也可直接把 `Suites` 加入官方 `debian.sources` 的 `Suites` 行（如 `Suites: trixie trixie-updates trixie-backports`），或在 `sources.list` 中添加：

```
deb http://deb.debian.org/debian trixie-backports main contrib non-free non-free-firmware
```

关于两种格式的区别，参见 [deb822 源格式](/administration/deb822)。

## 安装 backports 软件

启用后，backports 的默认优先级**低于** Stable，所以普通的 `apt install` **不会**自动从 backports 安装。必须用 `-t`（`--target-release`）显式指定：

```bash
# 从 backports 安装最新版 LibreOffice
sudo apt install -t trixie-backports libreoffice

# 安装较新的内核（对新硬件很有用）
sudo apt install -t trixie-backports linux-image-amd64
```

后续 `sudo apt upgrade` 会把已装的 backports 软件升级到 backports 中的新版本，其余软件仍走 Stable。

## 用 APT Pinning 精细控制（可选）

如果希望某些包**默认**就从 backports 安装，可创建 `/etc/apt/preferences.d/backports`：

```
# 让 backports 默认优先级低于 stable，避免自动升级所有包
Package: *
Pin: release n=trixie-backports
Pin-Priority: 400

# 仅让内核相关包优先从 backports 安装（优先级高于 stable 的 500）
Package: linux-image-* linux-headers-*
Pin: release n=trixie-backports
Pin-Priority: 501
```

- 优先级 `< 500`：仅在显式 `-t` 时才安装。
- 优先级 `> 500`：自动优先选用 backports 版本。

## 卸载与回退

backports 的软件可以像普通包一样卸载。若想退回 Stable 版本，可指定版本号或先卸载再从 Stable 重装：

```bash
sudo apt install <软件名>/trixie
```

## 小结

- Debian 13 用 `trixie-backports` 获取较新软件，同时保持系统稳定。
- 安装必须用 `apt install -t trixie-backports <包名>`，不会自动升级。
- 按需启用、按需安装；backports 不享受常规安全支持。

延伸阅读：[deb822 源格式](/administration/deb822) · [APT 包管理](/administration/packages)
