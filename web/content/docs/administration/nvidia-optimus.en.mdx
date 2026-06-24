---
title: "NVIDIA Optimus Dual Graphics Configuration"
description: "Configure NVIDIA Optimus hybrid graphics on a Debian 13 laptop, install drivers and use PRIME Render Offload"
---

# NVIDIA Optimus Dual Graphics Configuration

Many laptops are equipped with both **Intel/AMD integrated graphics** and **NVIDIA discrete graphics**. NVIDIA calls this technology **Optimus**. In daily use, the power-efficient integrated GPU drives the display; when high performance is needed (gaming, rendering, CUDA), it switches to the discrete GPU. This article describes how to correctly install drivers and use PRIME Render Offload on Debian 13.

## Step 1: Confirm Hardware

```bash
# List all graphics cards, confirm both Intel/AMD and NVIDIA are present
lspci | grep -E "VGA|3D"
```

If you see two graphics cards (e.g., one Intel and one NVIDIA), it is an Optimus hybrid architecture.

## Step 2: Enable non-free-firmware and non-free repositories

NVIDIA proprietary drivers are in the `non-free` component. Ensure your sources include `non-free` and `non-free-firmware` (for Debian 13's default deb822 format, see [deb822 sources format](/en/administration/deb822)):

```text
Components: main contrib non-free non-free-firmware
```

After modification, run:

```bash
sudo apt update
```

## Step 3: Install NVIDIA Driver

The official Debian repository contains tested NVIDIA drivers. **Prefer official packages** over the `.run` installer from the NVIDIA website:

```bash
# Install kernel headers (needed to compile driver modules)
sudo apt install linux-headers-amd64

# Install NVIDIA driver and PRIME support
sudo apt install nvidia-driver firmware-misc-nonfree

# Reboot to load the driver
sudo reboot
```

The installation automatically compiles modules for the current kernel via DKMS. Debian's `nvidia-driver` package configures PRIME by default: the integrated GPU still drives the desktop on boot, and the discrete GPU is enabled on demand — this is the power-saving behavior desired for laptops.

## Step 4: Verification

```bash
# Check discrete GPU status (if driver is working, GPU info will be listed)
nvidia-smi

# Confirm current OpenGL renderer (should default to Intel/AMD integrated GPU)
glxinfo | grep "OpenGL renderer"
```

`glxinfo` is provided by the `mesa-utils` package (`sudo apt install mesa-utils`).

## Step 5: Run Programs with Discrete GPU on Demand (PRIME Render Offload)

Use the integrated GPU for daily tasks, and pass **individual programs** to the discrete GPU only when needed. This is called **PRIME Render Offload**:

```bash
# Run a program with the discrete GPU
__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia <program-name>

# For example, run glxgears test with the discrete GPU
__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia glxgears
```

For convenience, define an alias in `~/.bashrc`:

```bash
alias nv-run='__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia'
# Then use: nv-run blender
```

Desktop environments (GNOME/KDE) usually provide a "Run with dedicated graphics card" option in the right-click menu of applications, which uses the same mechanism under the hood.

## CUDA / Computational Use

If you only need to run CUDA computations (e.g., AI inference) rather than graphics rendering, once the driver is installed and `nvidia-smi` recognizes the discrete GPU, there is no need for PRIME offload. Install the CUDA toolkit:

```bash
sudo apt install nvidia-cuda-toolkit
```

## Wayland and Common Issues

- **Wayland**: Newer NVIDIA drivers have good support for Wayland. If you encounter display corruption or cannot log in, switch to an **Xorg** session at the login screen for debugging.
- **Black screen / cannot enter desktop**: Temporarily add `nomodeset` at the end of the `linux` line in the GRUB boot entry to enter a low-resolution desktop, then check driver installation.
- **`nvidia-smi` reports "No devices found"**: Usually means the driver was not compiled successfully for the current kernel. Check if `linux-headers-amd64` is installed and re-run `sudo apt install --reinstall nvidia-driver`.

## Summary

- Enable `non-free` repository → Install `linux-headers-amd64` + `nvidia-driver` → Reboot.
- By default, the integrated GPU saves power; use `__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia` to call the discrete GPU on demand.
- Prefer Debian official driver packages; avoid the `.run` installer from the official website.

Further reading: [Hardware Compatibility](/en/basics/hardware-compatibility) · [deb822 sources format](/en/administration/deb822)
