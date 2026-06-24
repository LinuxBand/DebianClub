---
title: Hardware Compatibility
description: Learn about Debian's support for various hardware components (CPU, GPU, network adapters, etc.) and how to find and install drivers.
---

# Hardware Compatibility

Debian is renowned for its exceptional stability and broad hardware support. Due to its open-source philosophy, it primarily relies on free and open-source drivers included in the Linux kernel. This guide will help you understand how Debian handles hardware and how to resolve common compatibility issues.

## Overview

Debian GNU/Linux supports a vast range of hardware architectures and devices. Most common hardware (like Intel/AMD CPUs, standard wired network cards, and basic graphics cards) works "out of the box" after installation. Challenges typically arise from:
- **The latest hardware**: Newly released hardware may require a newer kernel or firmware.
- **Proprietary drivers**: Some devices (especially NVIDIA GPUs and certain Broadcom wireless cards) need non-free proprietary drivers to function fully.
- **Specialized devices**: Such as fingerprint readers, special gestures on touchpads, etc.

## Checking Your Hardware

Before installing or troubleshooting, it's crucial to know the specific hardware models in your system.

- **List all hardware (PCI devices)**: The `lspci` command displays all devices connected to the PCI bus, including graphics cards, network cards, sound cards, etc.
  ```bash
  lspci -v
  ```

- **List USB devices**: The `lsusb` command is used to display information about all USB devices.
  ```bash
  lsusb
  ```

- **Check CPU information**:
  ```bash
  lscpu
  # Or
  cat /proc/cpuinfo
  ```

## CPU

Debian supports all modern x86_64 (AMD64) architecture CPUs, including the full range of processors from Intel and AMD. Debian also provides official support for ARM architectures (like the Raspberry Pi, some laptops, and servers). Essentially, you don't need to worry about CPU compatibility.

## Graphics Cards (GPU)

### Intel
Intel integrated graphics have the best open-source driver support and usually work out of the box without any extra configuration.

### AMD
Modern AMD graphics cards also have high-quality open-source drivers (`amdgpu`) with excellent performance. These drivers are included in the Linux kernel and are ready to use.

### NVIDIA
The situation with NVIDIA is the most complex.
- **Open-source driver (Nouveau)**: Developed by the community through reverse engineering and installed by default. It's sufficient for desktop use and light tasks but performs poorly in gaming and high-performance computing and may not support the latest cards.
- **Proprietary driver (NVIDIA Driver)**: Provided by NVIDIA, it offers the best performance and supports advanced features like CUDA and Optimus.
  - **Installation**: Since Debian 12, installing NVIDIA drivers has become very simple. First, ensure your `sources.list` includes the `non-free-firmware` and `non-free` components.
    ```bash
    # 1. Ensure sources.list is correct
    # 2. Update and install the driver
    sudo apt update
    sudo apt install nvidia-driver firmware-misc-nonfree
    # 3. Reboot the system
    sudo reboot
    ```

## Network Adapters

### Wired Network Cards
The vast majority of wired Ethernet cards (especially from Realtek and Intel) are recognized and driven directly by the Linux kernel without manual intervention.

### Wireless Network Cards (Wi-Fi)
Wireless cards are a common source of compatibility issues.
- **Intel**: Most Intel wireless cards are well-supported but often require corresponding firmware, found in the `firmware-iwlwifi` package.
- **Broadcom**: Many Broadcom cards require the proprietary `broadcom-sta-dkms` driver.
- **Realtek**: The situation varies; some models work out of the box, while others require firmware from the `non-free` repository.

**How to solve Wi-Fi problems?**
1.  **Use an installation image with non-free firmware**: When downloading from the Debian website, choose the ISO image that includes "non-free firmware." It will automatically detect and install the necessary Wi-Fi drivers and firmware during installation.
2.  **Install firmware manually**: If the system is already installed but Wi-Fi doesn't work, you can connect via a wired network first, then use `apt` to search for and install the relevant firmware package. For example:
    ```bash
    # Search for firmware your device might need
    apt search broadcom
    # Install the firmware
    sudo apt install firmware-brcm80211
    ```

## Summary
Debian's hardware compatibility is very broad. For most users, it is recommended to use the official installation image that includes non-free firmware, as this can prevent many common driver issues. If you encounter a specific piece of hardware that doesn't work, the key is to use `lspci` or `lsusb` to identify the hardware model, then search online for `Debian [your version] [your hardware model]` to find a solution. 