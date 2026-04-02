---
title: What's New in Debian 13
description: New features, improvements and important changes in Debian 13 (Trixie)
---

# What's New in Debian 13 (Trixie)

Debian 13 codenamed "Trixie" was officially released in August 2025 and is the current stable release. As of March 2026, the latest point release is **13.4**. This page introduces the important changes and new features in this version.

## 🚀 Major New Features

### 📦 Software Package Updates

| Software | Debian 13 Version | Debian 12 Version | Key Improvements |
|----------|------------------|------------------|------------------|
| **Linux Kernel** | 6.12 | 6.1 | Better hardware support, performance optimization |
| **Python** | 3.13 | 3.11 | Faster execution speed, new language features |
| **GCC** | 14.2 | 12.2 | Latest compiler technology, C++23 support |
| **GNOME** | 48 | 43 | Modern interface, improved user experience |
| **KDE Plasma** | 6.3 | 5.27 | Enhanced features, improved stability |
| **LibreOffice** | 25.2.3 | 7.4 | Better document compatibility |
| **Firefox ESR** | 128+ | 102 | Enhanced privacy protection and performance |

### 🖥️ Desktop Environment Improvements

#### GNOME 48 Optimizations
- **Performance Boost**: Faster startup, optimized memory usage
- **User Interface**: More modern design language
- **File Manager**: Enhanced Nautilus functionality
- **Settings Center**: More intuitive system settings interface

#### KDE Plasma 6.3 Enhancements
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

#### New non-free-firmware Component
Debian 13 added a dedicated component for hardware firmware:

```bash
# Full recommended sources.list (including non-free software)
main contrib non-free non-free-firmware
```

::: warning Note
`non-free-firmware` is a **new addition**, not a replacement for `non-free`. The `non-free` component continues to exist. If you need packages like `nvidia-driver`, you still need to include `non-free`.
:::

#### non-free-firmware Component
Dedicated component for hardware firmware:

- **Purpose**: Separates hardware firmware from other non-free software for clearer license classification
- **Content**: GPU firmware, WiFi firmware, Bluetooth firmware, etc.
- **Impact**: The Debian Installer now automatically prompts whether non-free firmware is needed

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

- **`/tmp` mounted as tmpfs**: Debian 13 mounts `/tmp` in memory (tmpfs) by default, automatically cleared on reboot, improving I/O performance
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

```bash
# Prepare for upgrade
sudo apt update
sudo apt upgrade

# Backup important data
sudo cp /etc/apt/sources.list /etc/apt/sources.list.backup

# Update software sources
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

## 🔮 Release Timeline & Point Updates

### Released Versions

| Version | Release Date | Notes |
|---------|-------------|-------|
| **13.0** | 2025-08-09 | Initial stable release |
| **13.3** | 2026-01-10 | Security fixes and critical bug fixes |
| **13.4** | 2026-03-08 | Security fixes and critical bug fixes |
| **13.5** | 2026-05-16 (est.) | Next planned point release |
| **13.6** | 2026-07-11 (est.) | Next planned point release |

### Support Lifecycle

- **Regular Security Support**: ~3 years (until ~2028)
- **Long Term Support (LTS)**: Expected until ~2030
- **Security Updates**: DSA security advisories actively published

## Next Steps

After learning about Debian 13 new features, you can:

1. [Install Debian 13](/en/basics/installation) - Experience the latest version
2. [System Configuration](/en/basics/configuration) - Optimize system settings
3. [Participate in Testing](https://wiki.debian.org/DebianTesting) - Help improve Debian

---

**Want to experience the latest features?** [Install Debian 13 Now →](/en/basics/installation) 