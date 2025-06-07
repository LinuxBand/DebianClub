---
title: What's New in Debian 13
description: New features, improvements and important changes in Debian 13 (Trixie)
---

# What's New in Debian 13 (Trixie)

Debian 13 codenamed "Trixie" is expected to be released in the second half of 2025. This page introduces the important changes and new features in this new version.

::: warning 📢 Development Status
Debian 13 is currently under development. The information below is based on the current testing version and may change before the official release.
:::

## 🚀 Major New Features

### 📦 Software Package Updates

| Software | Debian 13 Version | Debian 12 Version | Key Improvements |
|----------|------------------|------------------|------------------|
| **Linux Kernel** | 6.12 | 6.1 | Better hardware support, performance optimization |
| **Python** | 3.13 | 3.11 | Faster execution speed, new language features |
| **GCC** | 14.2 | 12.2 | Latest compiler technology, C++23 support |
| **GNOME** | 43 | 43 | Modern interface, improved user experience |
| **KDE Plasma** | 5.27 | 5.27 | Enhanced features, improved stability |
| **LibreOffice** | 7.4+ | 7.4 | Better document compatibility |
| **Firefox ESR** | 115+ | 102 | Enhanced privacy protection and performance |

### 🖥️ Desktop Environment Improvements

#### GNOME 43 Optimizations
- **Performance Boost**: Faster startup, optimized memory usage
- **User Interface**: More modern design language
- **File Manager**: Enhanced Nautilus functionality
- **Settings Center**: More intuitive system settings interface

#### KDE Plasma 5.27 Enhancements
- **Wayland Support**: Better Wayland compatibility
- **Theme System**: Improved theme customization features
- **System Integration**: Deeper system integration

### 🏗️ Architecture Support

#### New Architectures
- **RISC-V 64-bit** (riscv64) - First official support for open-source instruction set architecture
- **ARM64 Security Enhancements** - Support for PAC/BTI security features

#### Continued Support for Architectures
| Architecture | Description | Applicable Devices |
|--------------|-------------|-------------------|
| **amd64** | 64-bit x86 | Mainstream PCs and servers |
| **arm64** | ARM 64-bit | Raspberry Pi 4, Mac M-series |
| **armhf** | ARM 32-bit hard float | Older Raspberry Pi |
| **ppc64el** | PowerPC 64-bit little endian | IBM Power servers |
| **s390x** | IBM z/Architecture | Mainframes |

## 🔧 System Improvements

### Software Repository Changes

#### New Component Structure
Debian 13 made important adjustments to software repository components:

```bash
# New component structure
main contrib non-free-firmware

# Replaces the previous
main contrib non-free
```

#### non-free-firmware Component
A new component specifically for hardware firmware:

- **Purpose**: Separate free software from non-free firmware
- **Content**: Graphics drivers, WiFi firmware, Bluetooth firmware, etc.
- **Advantage**: Clearer license classification

### Network Boot Enhancements

#### HTTP Boot Support
- **UEFI HTTP Boot**: Support for network booting via HTTP/HTTPS
- **Cloud Native**: Better suited for cloud environments and containerized deployments
- **IPv6 Support**: Complete IPv6 network boot support

### Container Technology Improvements

```bash
# Better container support
sudo apt install podman buildah

# cgroup v2 enabled by default
systemctl --user enable podman.socket

# Improved systemd integration
podman generate systemd --new container_name
```

## 🛡️ Security Enhancements

### ARM64 Security Features

#### PAC (Pointer Authentication)
- **Pointer Authentication**: Prevents ROP/JOP attacks
- **Hardware Support**: Requires processors supporting ARMv8.3-A
- **Auto-enabled**: Automatically enabled on supported hardware

#### BTI (Branch Target Identification)
- **Branch Target Identification**: Prevents code reuse attacks
- **Compiler Support**: Full support from GCC and Clang
- **Performance Impact**: Minimal performance overhead

### Cryptographic Algorithm Updates

```bash
# Stronger cryptographic algorithms
# SHA-3 hash algorithm support
# ChaCha20-Poly1305 cipher suites
# Ed25519 signature algorithm

# Check supported algorithms
openssl list -cipher-algorithms
openssl list -digest-algorithms
```

## 🚀 Boot and System Optimizations

### systemd Optimizations

```bash
# Faster boot times
systemd-analyze time

# Parallel boot optimization
systemd-analyze critical-chain

# Service dependency optimization
systemd-analyze plot > bootup.svg
```

### Memory Management Improvements

- **zswap enabled by default**: Compressed swap, reduced disk I/O
- **Memory reclaim optimization**: Smarter memory management
- **Enhanced ZRAM support**: Better memory compression

## 📊 Development Tools Updates

### Programming Languages

```bash
# Python 3.13 new features
- Experimental JIT compiler
- Better error messages
- New typing features
- 5-15% performance improvement

# Rust updated to latest version
sudo apt install rustc

# Go language
sudo apt install golang-1.21

# Node.js LTS
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install nodejs
```

### Development Environment

```bash
# Container development
sudo apt install podman podman-compose

# Cloud native tools
sudo apt install kubectl helm

# Modern build tools
sudo apt install meson cmake ninja-build
```

## 🌐 Internationalization Improvements

### Chinese Support Optimization

```bash
# Better Chinese font rendering
fonts-noto-cjk-extra

# Improved input method support
ibus-libpinyin

# Chinese language packs
libreoffice-l10n-zh-cn
firefox-l10n-zh-cn
```

### Multilingual Environment

- **More language packs**: Added support for multiple languages
- **Font optimization**: Improved multilingual font rendering
- **Timezone data**: Latest timezone information

## 🔄 Migration Guide

### Upgrading from Debian 12

::: warning ⚠️ Upgrade Warning
Debian 13 is currently under development. Upgrading in production environments is not recommended.
:::

```bash
# Prepare for upgrade (when officially released)
sudo apt update
sudo apt upgrade

# Backup important data
sudo cp /etc/apt/sources.list /etc/apt/sources.list.backup

# Update software sources (after release)
sudo sed -i 's/bookworm/trixie/g' /etc/apt/sources.list
sudo apt update
sudo apt full-upgrade
```

### Configuration File Changes

```bash
# Check configuration file changes
sudo apt list --upgradable
debconf-show package-name

# Handle configuration file conflicts
sudo dpkg-reconfigure package-name
```

## 📝 Testing Participation

### How to Participate in Testing

```bash
# Install testing version
# 1. Download daily build images
wget https://cdimage.debian.org/cdimage/daily-builds/daily/arch-latest/amd64/iso-cd/

# 2. Or upgrade from stable to testing
sudo sed -i 's/bookworm/trixie/g' /etc/apt/sources.list
sudo apt update && sudo apt full-upgrade
```

### Reporting Issues

```bash
# Install bug reporting tool
sudo apt install reportbug

# Report issues
reportbug package-name

# View known issues
https://bugs.debian.org/
```

## 🔮 Release Timeline

### Important Milestones

| Time | Milestone | Description |
|------|-----------|-------------|
| **2024** | Development Start | Trixie branch created |
| **Early 2025** | Feature Freeze | Stop adding new features |
| **Mid 2025** | Soft Freeze | Major package versions determined |
| **Late 2025** | Official Release | Debian 13 stable release |

### Support Lifecycle

- **Maintenance Period**: About 3 years (until 2028)
- **Long Term Support**: May provide LTS version
- **Security Updates**: Begin immediately after release

## Next Steps

After learning about Debian 13 new features, you can:

1. [Install Debian 13](/en/basics/installation) - Experience the latest version
2. [System Configuration](/en/basics/configuration) - Optimize system settings
3. [Participate in Testing](https://wiki.debian.org/DebianTesting) - Help improve Debian

---

**Want to experience the latest features?** [Install Debian 13 Now →](/en/basics/installation) 