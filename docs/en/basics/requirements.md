---
title: System Requirements
description: Hardware requirements and compatibility guide for Debian 13 installation
---

# System Requirements Check

Before installing Debian 13, it's important to ensure your computer meets the basic requirements. This page will help you check hardware compatibility and system requirements.

## 🖥️ Hardware Requirements

### Minimum System Requirements

| Component | Minimum Requirement | Notes |
|-----------|---------------------|-------|
| **Processor** | 1 GHz single-core | i386 or amd64 architecture |
| **Memory** | 2 GB RAM | Desktop environments need more memory |
| **Storage** | 25 GB | Including basic system and applications |
| **Graphics** | Supports 1024×768 | Integrated graphics sufficient |
| **Network** | Wired or wireless | For configuring software sources after installation |

### Recommended System Configuration

| Component | Recommended | Benefits |
|-----------|-------------|----------|
| **Processor** | Dual-core 2 GHz+ | Smoother multitasking |
| **Memory** | 8 GB RAM+ | Support multiple applications running simultaneously |
| **Storage** | 50 GB SSD | Faster boot and response times |
| **Graphics** | Dedicated graphics card | Support hardware acceleration and gaming |

::: tip 💡 Beginner Tip
If you're unsure about your hardware configuration, you can press <span class="kbd">Win + R</span> in Windows, type `dxdiag` to view system information.
:::

## 🔍 Hardware Compatibility Check

### 1. Processor Architecture Check

Debian 13 supports multiple processor architectures:

#### Mainstream Architectures
- **amd64** (64-bit) - Intel/AMD 64-bit processors
- **i386** (32-bit) - Legacy 32-bit processors
- **arm64** - ARM 64-bit processors (new Macs, Raspberry Pi, etc.)

#### How to Check Your Architecture

**In Windows:**
```cmd
# Press Win + R, type cmd, then run:
wmic computersystem get systemtype
```

**In existing Linux:**
```bash
# Check processor architecture
uname -m
```

### 2. Memory Check

#### Memory Requirements for Different Desktop Environments

| Desktop Environment | Minimum Memory | Recommended Memory | Features |
|---------------------|----------------|--------------------| ---------|
| **GNOME** | 4 GB | 8 GB | Modern, feature-rich |
| **KDE Plasma** | 4 GB | 8 GB | Highly customizable |
| **Xfce** | 2 GB | 4 GB | Lightweight, suitable for older machines |
| **LXDE** | 1 GB | 2 GB | Extremely lightweight |
| **Command Line** | 512 MB | 1 GB | Text interface only |

::: warning ⚠️ Effects of Insufficient Memory
If memory is insufficient, the system may frequently use swap space, causing severe performance degradation.
:::

## 🔧 Hardware Compatibility

### Graphics Card Compatibility

#### NVIDIA Graphics Cards
```bash
# Debian support for NVIDIA
✅ Open source driver: nouveau (default)
✅ Official driver: nvidia-driver (requires additional installation)
⚠️  Legacy models may have limited support
```

#### AMD Graphics Cards
```bash
# AMD graphics card support
✅ Open source driver: radeon/amdgpu (default)
✅ Official driver: amdgpu-pro (optional)
✅ Most models have good support
```

#### Intel Integrated Graphics
```bash
# Intel graphics support
✅ Open source driver: i915 (default)
✅ Excellent support, works out of the box
✅ Good hardware acceleration support
```

### Network Device Compatibility

#### Wi-Fi Chipsets
Most modern Wi-Fi chips have good support, but some require non-free firmware:

| Vendor | Support Status | Notes |
|--------|----------------|-------|
| **Intel** | ✅ Excellent | Requires firmware packages |
| **Broadcom** | ⚠️ Fair | Some models need proprietary drivers |
| **Realtek** | ✅ Good | Most models supported |
| **Atheros** | ✅ Excellent | Good open source driver support |

#### Wired Network
Almost all wired network interfaces have full support.

## 📋 Pre-installation Checklist

### Essential Items

- [ ] **Processor**: Confirm architecture (amd64/i386/arm64)
- [ ] **Memory**: At least 2 GB, recommended 8 GB+
- [ ] **Storage**: At least 25 GB available space
- [ ] **Network**: Confirm network connection available
- [ ] **Boot Method**: Confirm UEFI or Legacy BIOS

### Recommended Checks

- [ ] **Graphics Card**: Check model, prepare appropriate drivers
- [ ] **Wi-Fi**: Record chipset model
- [ ] **Printer**: Check brand and model
- [ ] **Bluetooth**: Confirm if needed
- [ ] **Sound Card**: Generally all supported

## 📱 Testing Compatibility

### Using Live USB
```bash
# After booting Debian Live USB, run
sudo lshw -short          # Hardware overview
lscpu                     # CPU information
free -h                   # Memory information
lsblk                     # Storage devices
lspci                     # PCI devices
lsusb                     # USB devices
```

## ⚡ Performance Optimization Suggestions

### SSD vs HDD

| Storage Type | Advantages | Disadvantages | Use Case |
|--------------|------------|---------------|----------|
| **SSD** | Fast speed, no noise | More expensive | Recommended for system disk |
| **HDD** | Cheap, large capacity | Slow speed, noisy | Suitable for file storage |

### Dual Drive Configuration Recommendation
```bash
SSD (120GB+) → System + Programs
HDD (1TB+)   → Documents + Media files
```

## 🆘 Compatibility Issue Resolution

### Common Issues

#### Wi-Fi Not Working
**Solution:**
1. Check if non-free firmware is needed
2. Use wired network to install firmware packages
3. Consider using USB Wi-Fi adapter

#### Graphics Driver Issues
**Solution:**
1. Use open source drivers first
2. Install proprietary drivers after system is stable
3. Have integrated graphics as backup

#### No Sound Output
**Solution:**
1. Check ALSA configuration
2. Install PulseAudio
3. Kernel updates may resolve issues

## Next Steps

After hardware check is complete, you can continue with:

1. [Download Debian 13 Images](/en/basics/download) - Get installation files
2. [Create Bootable Media](/en/basics/bootable-media) - Prepare installation media
3. [Begin Installation Process](/en/basics/installation) - Officially install the system

---

**Hardware compatibility confirmed?** [Start downloading Debian 13 →](/en/basics/download) 