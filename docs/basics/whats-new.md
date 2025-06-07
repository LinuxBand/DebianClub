---
title: Debian 13 新特性
description: Debian 13 (Trixie) 的新功能、改进和重要变化
---

# Debian 13 (Trixie) 新特性

Debian 13 代号"Trixie"，预计将于2025年下半年正式发布。本页面介绍这个新版本带来的重要变化和新特性。

::: warning 📢 开发状态
Debian 13 目前仍在开发中，以下信息基于当前测试版本，正式发布时可能会有变化。
:::

## 🚀 主要新特性

### 📦 软件包更新

| 软件 | Debian 13 版本 | Debian 12 版本 | 主要改进 |
|------|---------------|---------------|----------|
| **Linux 内核** | 6.12 | 6.1 | 更好的硬件支持，性能优化 |
| **Python** | 3.12 | 3.11 | 更快的执行速度，新语言特性 |
| **GCC** | 15.x | 12.2 | 最新编译器技术，C++26 部分支持 |
| **GNOME** | 48 | 43 | 现代化界面，改进的用户体验 |
| **KDE Plasma** | 6.3 | 5.27 | 功能增强，稳定性提升 |
| **LibreOffice** | 25.2.3 | 7.4 | 更好的文档兼容性 |
| **Firefox ESR** | ~115 ESR | 102 | 增强的隐私保护和性能 |

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

#### 新的组件结构
Debian 13 对软件源组件进行了重要调整：

```bash
# 新的组件结构
main contrib non-free-firmware

# 取代了之前的
main contrib non-free
```

#### non-free-firmware 组件
专门用于包含硬件固件的新组件：

- **目的**：分离自由软件和非自由固件
- **内容**：显卡驱动、WiFi固件、蓝牙固件等
- **优势**：更清晰的许可证分类

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

- **zswap 默认启用**：压缩交换，减少磁盘 I/O
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

::: warning ⚠️ 升级注意
目前 Debian 13 仍在开发中，不建议在生产环境进行升级。
:::

```bash
# 准备升级（当正式发布后）
sudo apt update
sudo apt upgrade

# 备份重要数据
sudo cp /etc/apt/sources.list /etc/apt/sources.list.backup

# 更新软件源（发布后）
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

## 📝 测试参与

### 如何参与测试

```bash
# 安装测试版本
# 1. 下载每日构建镜像
wget https://cdimage.debian.org/cdimage/daily-builds/daily/arch-latest/amd64/iso-cd/

# 2. 或从稳定版升级到测试版
sudo sed -i 's/bookworm/trixie/g' /etc/apt/sources.list
sudo apt update && sudo apt full-upgrade
```

### 报告问题

```bash
# 安装错误报告工具
sudo apt install reportbug

# 报告问题
reportbug package-name

# 查看已知问题
https://bugs.debian.org/
```

## 🔮 发布时间表

### 重要里程碑

| 时间 | 里程碑 | 描述 |
|------|--------|------|
| **2024年** | 开发开始 | Trixie 分支创建 |
| **2025年初** | 功能冻结 | 停止添加新功能 |
| **2025年中** | 软冻结 | 主要包版本确定 |
| **2025年下半年** | 正式发布 | Debian 13 正式版 |

### 支持周期

- **维护期**：约3年（至2028年）
- **长期支持**：可能提供 LTS 版本
- **安全更新**：发布后立即开始

## 下一步

了解 Debian 13 新特性后，您可以：

1. [安装 Debian 13](/basics/installation) - 体验最新版本
2. [系统配置](/basics/configuration) - 优化系统设置
3. [参与测试](https://wiki.debian.org/DebianTesting) - 帮助改进 Debian

---

**想体验最新特性？** [立即安装 Debian 13 →](/basics/installation) 