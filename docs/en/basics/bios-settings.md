---
title: BIOS Settings Guide
description: A detailed BIOS/UEFI settings guide to help configure boot options for installing Debian 13
---

# BIOS Settings Guide

This tutorial explains in detail how to configure BIOS/UEFI settings to install Debian 13 from a USB boot drive.

## 🔧 Entering BIOS/UEFI

### Common Key Combinations

| Brand | Key | Timing |
|-------|-----|--------|
| **Dell** | F2 or F12 | Press repeatedly at power-on |
| **HP** | F2 or F10 | When the brand logo appears |
| **Lenovo** | F1, F2, or Enter | Press immediately at power-on |
| **Asus** | F2 or Delete | Press continuously at power-on |
| **Acer** | F2 or Delete | When the brand splash screen appears |
| **MSI** | Delete or F11 | Press immediately at power-on |
| **Asus** | F2 or Delete | Hold at power-on |
| **Lenovo** | F1 or F2 | Press at startup |

### How to Enter

::: tip 💡 Tip
1. **Disable Fast Startup** - Disable the Fast Startup feature in Windows
2. **Cold Boot** - Shut down completely before powering on; do not restart
3. **Press Continuously** - Start pressing the corresponding key repeatedly right after powering on
4. **Try Multiple Times** - If it fails, restart and try again
:::

## ⚙️ BIOS Settings Items

### Boot-Related Settings

#### Boot Mode
```
UEFI Mode (Recommended)
- Supports hard drives larger than 2TB
- Faster boot speed
- Better security

Legacy Mode
- Compatible with older hardware
- Traditional MBR partition table
```

#### Secure Boot
```
Status: Usually needs to be disabled
Location: Security > Secure Boot
Setting: Disabled

Reason: Some Linux distributions require Secure Boot to be disabled
```

#### Fast Boot
```
Status: Recommended to disable
Location: Boot > Fast Boot
Setting: Disabled

Reason: May skip USB device detection
```

### USB Boot Settings

#### USB Boot Priority
```bash
# Setup steps:
1. Go to the Boot tab
2. Find Boot Priority or Boot Order
3. Move USB Storage or USB HDD to the top
4. Save and exit
```

#### Legacy USB Support
```
Status: Enabled
Location: Advanced > USB Options
Setting: Enabled

Purpose: Allows BIOS to recognize USB devices
```

## 🖥️ BIOS Settings for Different Brands

### Dell Computer Settings

```bash
# How to enter: Press F2 at power-on
1. Select "Boot Sequence"
2. Set "USB Storage Device" as first
3. If in UEFI mode, select "UEFI Boot"
4. Press F10 to save and exit
```

### Lenovo Computer Settings

```bash
# How to enter: Press F1 or F2 at power-on
1. Go to the "Startup" tab
2. Set "Boot Mode" to UEFI
3. Move USB to first in "Boot Priority Order"
4. Save settings (F10)
```

### Asus Computer Settings

```bash
# How to enter: Press F2 or Delete at power-on
1. Go to the "Boot" tab
2. Set "Launch CSM" to Enabled (if Legacy support is needed)
3. Set "Boot Option #1" to the USB device
4. Press F10 to save
```

### HP Computer Settings

```bash
# How to enter: Press F10 at power-on
1. Select "System Configuration"
2. Go to "Boot Options"
3. Enable "USB Boot"
4. Adjust boot order, USB device first
5. Save and exit
```

## 🔍 UEFI vs Legacy Comparison

### UEFI Mode (Recommended)

::: tip ✅ UEFI Advantages
- **Larger Disk Support** - Supports >2TB hard drives
- **Faster Boot** - Quicker startup speed
- **Graphical Interface** - Modern settings interface
- **Network Support** - Can boot from network
- **Secure Boot** - Prevents malware
:::

```bash
# UEFI key settings:
Boot Mode: UEFI
Secure Boot: Disabled (during installation)
Fast Boot: Disabled
CSM: Disabled
```

### Legacy Mode

::: warning ⚠️ Legacy Limitations
- **Disk Limitation** - Maximum 2TB support
- **Slower Boot** - Traditional boot method
- **Text Interface** - Text-based settings
- **Compatibility** - Suitable for older hardware
:::

```bash
# Legacy key settings:
Boot Mode: Legacy
USB Boot: Enabled
Boot Priority: USB First
```

## 🔧 Common Troubleshooting

### USB Boot Option Not Found

::: details 🔍 Solutions
```bash
1. Confirm the USB was created successfully
   - Verify using another computer
   - Recreate the boot drive

2. Check BIOS settings
   - Enable Legacy USB Support
   - Disable Fast Boot
   - Switch between UEFI/Legacy mode

3. USB port issues
   - Try a different USB port
   - Use a USB 2.0 port
   - Avoid using a USB Hub
```
:::

### Secure Boot Issues

::: details 🔐 Handling Secure Boot
```bash
# Temporary solution:
1. Disable Secure Boot
2. You can re-enable it after installation is complete

# Long-term solution:
1. Use a distribution that supports Secure Boot
2. Sign custom kernels
3. Add trusted keys
```
:::

### Boot Failure Issues

::: details ❌ Boot Troubleshooting
```bash
# Checklist:
□ USB boot drive created correctly
□ BIOS boot order is correct
□ Fast Boot disabled
□ Secure Boot disabled
□ USB port is working properly
□ RAM modules installed correctly

# Advanced options:
1. Clear CMOS
2. Update BIOS version
3. Check hardware compatibility
```
:::

## 📝 Settings Checklist

Before proceeding with the Debian installation, please confirm the following settings:

| Item | Setting Value | Status |
|------|---------------|--------|
| Boot Mode | UEFI (Recommended) | ☐ |
| Secure Boot | Disabled | ☐ |
| Fast Boot | Disabled | ☐ |
| USB Boot | Enabled | ☐ |
| Boot Priority | USB First | ☐ |
| Legacy USB Support | Enabled | ☐ |

## 🚀 Next Steps

After completing BIOS setup:

1. **Insert the USB boot drive** - Make sure you have a correctly created boot media
2. **Save settings** - Press F10 to save BIOS settings
3. **Restart the computer** - Boot from the USB drive
4. **Begin installation** - Enter the Debian installation interface

## 📚 Related Resources

- [Creating Boot Media](/en/basics/bootable-media) - Create installation media
- [Installation Process](/en/basics/installation) - Detailed installation steps
- [Installation Troubleshooting](/en/troubleshooting/installation-issues) - Resolve installation issues

**Done with BIOS settings?** [Start creating boot media →](/en/basics/bootable-media)
