---
title: 硬件兼容性
description: 了解 Debian 对各类硬件（CPU、GPU、网络适配器等）的支持情况，以及如何查找和安装驱动程序。
---

# 硬件兼容性

Debian 以其卓越的稳定性和广泛的硬件支持而闻名。由于其开源理念，它主要依赖内核中包含的自由和开源驱动程序。本指南将帮助您了解 Debian 如何处理硬件，以及如何解决常见的兼容性问题。

## 概览

Debian GNU/Linux 支持大量的硬件架构和设备。大多数常见硬件（如 Intel/AMD CPU、普通有线网卡、基本显卡）在安装后都可以“开箱即用”。挑战通常来自以下几个方面：
- **最新的硬件**：新发布的硬件可能需要更新的内核或固件。
- **专有驱动**：某些设备（特别是 NVIDIA 和部分 Broadcom 无线网卡）需要非自由 (non-free) 的专有驱动程序才能完全发挥功能。
- **特殊设备**：如指纹读取器、触控板的特殊手势等。

## 检查您的硬件

在安装或排查问题前，了解系统中的具体硬件型号至关重要。

- **列出所有硬件 (PCI 设备)**: `lspci` 命令会显示所有连接到 PCI 总线的设备，包括显卡、网卡、声卡等。
  ```bash
  lspci -v
  ```

- **列出 USB 设备**: `lsusb` 命令用于显示所有 USB 设备的信息。
  ```bash
  lsusb
  ```

- **查看 CPU 信息**:
  ```bash
  lscpu
  # 或者
  cat /proc/cpuinfo
  ```

## CPU

Debian 支持所有现代的 x86_64 (AMD64) 架构的 CPU，包括 Intel 和 AMD 的全系列处理器。对于 ARM 架构（如树莓派、一些笔记本电脑和服务器），Debian 也提供了官方支持。基本上，您无需担心 CPU 的兼容性问题。

## 显卡 (GPU)

### Intel
Intel 集成显卡拥有最好的开源驱动支持，通常开箱即用，无需任何额外配置。

### AMD
AMD 的现代显卡也拥有高质量的开源驱动 (`amdgpu`)，并且性能出色。这些驱动已经包含在 Linux 内核中，可直接使用。

### NVIDIA
NVIDIA 的情况最为复杂。
- **开源驱动 (Nouveau)**: 由社区逆向工程开发，默认安装。对于桌面应用和轻度使用来说足够，但在游戏和高性能计算方面性能较差，且可能不支持最新的显卡。
- **专有驱动 (NVIDIA Driver)**: 由 NVIDIA 官方提供，性能最佳，并支持 CUDA、Optimus 等高级功能。
  - **安装方法**：Debian 12 以后，安装 NVIDIA 驱动变得非常简单。首先，确保您的 `sources.list` 中包含了 `non-free-firmware` 和 `non-free` 组件。
    ```bash
    # 1. 确保 sources.list 正确
    # 2. 更新并安装驱动
    sudo apt update
    sudo apt install nvidia-driver firmware-misc-nonfree
    # 3. 重启系统
    sudo reboot
    ```

## 网络适配器

### 有线网卡
绝大多数有线以太网卡（特别是 Realtek 和 Intel 的）都可以被 Linux 内核直接识别和驱动，无需手动干预。

### 无线网卡 (Wi-Fi)
无线网卡是兼容性问题的常见来源。
- **Intel**: 大多数 Intel 无线网卡支持良好，但通常需要对应的固件。这些固件位于 `firmware-iwlwifi` 包中。
- **Broadcom**: 许多 Broadcom 网卡需要专有的 `broadcom-sta-dkms` 驱动。
- **Realtek**: 情况不一，部分型号开箱即用，部分则需要从 `non-free` 仓库安装固件。

**如何解决 Wi-Fi 问题?**
1.  **使用包含非自由固件的安装镜像**: 在 Debian 官网下载时，选择包含 "non-free firmware" 的 ISO 镜像，它会在安装过程中自动检测并安装所需的 Wi-Fi 驱动和固件。
2.  **手动安装固件**: 如果系统已经装好但 Wi-Fi 无法工作，可以先通过有线网络连接，然后使用 `apt` 搜索并安装相关的固件包。例如：
    ```bash
    # 搜索你的设备可能需要的固件
    apt search broadcom
    # 安装固件
    sudo apt install firmware-brcm80211
    ```

## 总结
Debian 的硬件兼容性非常广泛。对于大多数用户来说，推荐使用包含非自由固件的官方安装镜像，这可以避免许多常见的驱动问题。如果遇到特定硬件不工作的情况，关键在于使用 `lspci` 或 `lsusb` 确定硬件型号，然后在网上搜索 `Debian [你的版本] [你的硬件型号]` 来寻找解决方案。 