---
title: Debian 13 新特性
description: Debian 13 (Trixie) 的新功能、改进和重要变化
---

# Debian 13 (Trixie) 新特性

Debian 13 代号"Trixie"，已于 2025 年 8 月正式发布，是当前的 stable（稳定版）。截至 2026 年 3 月，最新点版本为 **13.4**。本页面介绍此版本带来的重要变化和新特性。

## 🚀 主要新特性

### 📦 软件包更新

| 软件 | Debian 13 版本 | Debian 12 版本 | 主要改进 |
|------|---------------|---------------|----------|
| **Linux 内核** | 6.12 | 6.1 | 更好的硬件支持，性能优化 |
| **Python** | 3.13 | 3.11 | 更快的执行速度，新语言特性 |
| **GCC** | 14.2 | 12.2 | 最新编译器技术，C++23 支持 |
| **GNOME** | 48 | 43 | 现代化界面，改进的用户体验 |
| **KDE Plasma** | 6.3 | 5.27 | 功能增强，稳定性提升 |
| **LibreOffice** | 25.2.3 | 7.4 | 更好的文档兼容性 |
| **Firefox ESR** | 128+ ESR | 102 | 增强的隐私保护和性能 |

### 🖥️ 桌面环境改进

#### GNOME 48 优化
- **性能提升**：启动速度更快，内存使用优化
- **用户界面**：更现代化的设计语言
- **文件管理器**：Nautilus 功能增强
- **设置中心**：更直观的系统设置界面

#### KDE Plasma 6.3 增强
- **Wayland 支持**：更好的 Wayland 兼容性
- **主题系统**：改进的主题定制功能
- **系统集成**：更深度的系统集成

### 🏗️ 架构支持

#### 新增架构
- **RISC-V 64位** (riscv64) - 首次官方支持开源指令集架构
- **ARM64 安全增强** - 支持 PAC/BTI 安全特性

#### 继续支持的架构
| 架构 | 描述 | 适用设备 |
|------|------|----------|
| **amd64** | 64位 x86 | 主流PC和服务器 |
| **arm64** | ARM 64位 | 树莓派4、Mac M系列 |
| **armhf** | ARM 32位硬浮点 | 老版树莓派 |
| **ppc64el** | PowerPC 64位小端序 | IBM Power 服务器 |
| **s390x** | IBM z/Architecture | 大型机 |

## 🔧 系统改进

### 软件源变化

#### 新增 non-free-firmware 组件
Debian 13 新增了专用于硬件固件的 `non-free-firmware` 组件：

```bash
# Debian 13 完整推荐源配置（含非自由软件）
main contrib non-free non-free-firmware
```

::: warning 注意
`non-free-firmware` 是**新增**组件，不是替代 `non-free`。`non-free` 组件继续存在，如需安装 NVIDIA 驱动等非自由软件，仍需保留 `non-free`。
:::

#### non-free-firmware 组件说明
专门用于包含硬件固件的组件：

- **目的**：将硬件固件从其他非自由软件中分离，更清晰地标识许可证
- **内容**：显卡固件、WiFi 固件、蓝牙固件等
- **影响**：安装 Debian 时，安装程序会自动提示是否需要非自由固件

### 网络启动增强

#### HTTP Boot 支持
- **UEFI HTTP Boot**：支持通过 HTTP/HTTPS 网络启动
- **云原生**：更适合云环境和容器化部署
- **IPv6 支持**：完整的 IPv6 网络启动支持

### 容器技术改进

```bash
# 更好的容器支持
sudo apt install podman buildah

# cgroup v2 默认启用
systemctl --user enable podman.socket

# 改进的 systemd 集成
podman generate systemd --new container_name
```

## 🛡️ 安全增强

### ARM64 安全特性

#### PAC (Pointer Authentication)
- **指针认证**：防止 ROP/JOP 攻击
- **硬件支持**：需要支持 ARMv8.3-A 的处理器
- **自动启用**：在支持的硬件上自动启用

#### BTI (Branch Target Identification)
- **分支目标识别**：防止代码重用攻击
- **编译器支持**：GCC 和 Clang 完整支持
- **性能影响**：极小的性能开销

### 加密算法更新

```bash
# 更强的加密算法
# SHA-3 哈希算法支持
# ChaCha20-Poly1305 密码套件
# Ed25519 签名算法

# 检查支持的算法
openssl list -cipher-algorithms
openssl list -digest-algorithms
```

## 🚀 启动和系统优化

### systemd 优化

```bash
# 更快的启动速度
systemd-analyze time

# 并行启动优化
systemd-analyze critical-chain

# 服务依赖优化
systemd-analyze plot > bootup.svg
```

### 内存管理改进

- **`/tmp` 挂载为 tmpfs**：Debian 13 默认将 `/tmp` 放入内存中的 tmpfs，重启后自动清空，提升 I/O 性能
- **内存回收优化**：更智能的内存管理
- **ZRAM 支持增强**：更好的内存压缩

## 📊 开发工具更新

### 编程语言

```bash
# Python 3.13 新特性
- 实验性 JIT 编译器
- 更好的错误消息
- 新的 typing 特性
- 性能提升 5-15%

# Rust 更新到最新版本
sudo apt install rustc

# Go 语言
sudo apt install golang-1.21

# Node.js LTS
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install nodejs
```

### 开发环境

```bash
# 容器开发
sudo apt install podman podman-compose

# 云原生工具
sudo apt install kubectl helm

# 现代化构建工具
sudo apt install meson cmake ninja-build
```

## 🌐 国际化改进

### 中文支持优化

```bash
# 更好的中文字体渲染
fonts-noto-cjk-extra

# 改进的输入法支持
ibus-libpinyin

# 中文语言包
libreoffice-l10n-zh-cn
firefox-l10n-zh-cn
```

### 多语言环境

- **更多语言包**：新增多种语言支持
- **字体优化**：改进的多语言字体渲染
- **时区数据**：最新的时区信息

## 🔄 迁移指南

### 从 Debian 12 升级

```bash
# 准备升级
sudo apt update
sudo apt upgrade

# 备份重要数据
sudo cp /etc/apt/sources.list /etc/apt/sources.list.backup

# 更新软件源
sudo sed -i 's/bookworm/trixie/g' /etc/apt/sources.list
sudo apt update
sudo apt full-upgrade
```

### 配置文件变化

```bash
# 检查配置文件变化
sudo apt list --upgradable
debconf-show package-name

# 处理配置文件冲突
sudo dpkg-reconfigure package-name
```

## 🔮 发布时间表与点更新

### 已发布版本

| 版本 | 发布日期 | 说明 |
|------|----------|------|
| **13.0** | 2025-08-09 | 首次正式发布 |
| **13.3** | 2026-01-10 | 安全修复与严重问题修正 |
| **13.4** | 2026-03-08 | 安全修复与严重问题修正 |
| **13.5** | 2026-05-16（预计）| 下一个点更新 |
| **13.6** | 2026-07-11（预计）| 下一个点更新 |

### 支持周期

- **常规安全支持**：约 3 年（至 ~2028 年）
- **长期支持 (LTS)**：预计延长至 ~2030 年
- **安全更新**：DSA 安全公告持续发布中

## 下一步

了解 Debian 13 新特性后，您可以：

1. [安装 Debian 13](/basics/installation) - 体验最新版本
2. [系统配置](/basics/configuration) - 优化系统设置
3. [参与测试](https://wiki.debian.org/DebianTesting) - 帮助改进 Debian

---

**想体验最新特性？** [立即安装 Debian 13 →](/basics/installation) 