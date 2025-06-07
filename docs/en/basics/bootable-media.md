---
title: Create Bootable Media
description: Create a bootable USB drive or DVD to install Debian 13 on your computer
---

# Create Bootable Media

Learn how to create bootable installation media for Debian 13 using USB drives or DVDs.

## 🎯 Choose Your Method

| Method | Difficulty | Speed | Capacity |
|--------|------------|-------|----------|
| **USB Drive** | ⭐ Easy | ⚡ Fast | 8GB+ |
| **DVD** | ⭐ Easy | 🐌 Slow | 4.7GB |
| **Blu-ray** | ⭐⭐ Medium | 🐌 Slow | 25GB+ |

## 💾 USB Drive Method (Recommended)

### Requirements

::: tip 📋 What You Need
- **USB Drive**: 8GB or larger
- **Computer**: Windows, macOS, or Linux
- **ISO File**: Downloaded Debian 13 image
- **USB Tool**: Balena Etcher, Rufus, or dd command
:::

### Tools for Different Operating Systems

#### Windows Users

**Rufus (Recommended)**
```bash
# Download from: https://rufus.ie/
1. Insert USB drive
2. Select Debian ISO file
3. Choose GPT partition scheme
4. Select UEFI target system
5. Click START
```

**Balena Etcher**
```bash
# Download from: https://www.balena.io/etcher/
1. Select ISO image
2. Select USB target
3. Click Flash!
```

#### macOS Users

**Balena Etcher (GUI)**
```bash
# Download from: https://www.balena.io/etcher/
# Same steps as Windows
```

**dd Command (Terminal)**
```bash
# Find USB device
diskutil list

# Unmount USB
diskutil unmountDisk /dev/diskX

# Write ISO to USB
sudo dd if=debian-13.0.0-amd64-DVD-1.iso of=/dev/rdiskX bs=1M

# Eject safely
diskutil eject /dev/diskX
```

#### Linux Users

**GNOME Disks (GUI)**
```bash
# Install if needed
sudo apt install gnome-disk-utility

# Steps:
1. Open Disks application
2. Select USB drive
3. Click hamburger menu → Restore Disk Image
4. Select Debian ISO
5. Click Start Restoring
```

**dd Command (Terminal)**
```bash
# Find USB device
lsblk
# or
sudo fdisk -l

# Unmount if mounted
sudo umount /dev/sdX*

# Write ISO to USB
sudo dd if=debian-13.0.0-amd64-DVD-1.iso of=/dev/sdX bs=1M status=progress

# Sync filesystem
sync
```

### Step-by-Step USB Creation

#### Using Balena Etcher (Cross-platform)

1. **Download Etcher**
   - Visit: https://www.balena.io/etcher/
   - Download for your operating system
   - Install and run

2. **Prepare USB Drive**
   ```bash
   # Insert USB drive (8GB+ recommended)
   # Backup any important data (will be erased!)
   ```

3. **Flash Process**
   ```bash
   Step 1: Click "Flash from file"
   Step 2: Select your Debian ISO
   Step 3: Click "Select target" 
   Step 4: Choose your USB drive
   Step 5: Click "Flash!"
   ```

4. **Verification**
   ```bash
   # Etcher automatically verifies the write
   # Wait for "Flash Complete!" message
   ```

## 💿 DVD/Blu-ray Method

### DVD Creation

#### Windows
```bash
# Using Windows built-in burning
1. Right-click ISO file
2. Select "Burn disc image"
3. Choose DVD drive
4. Click "Burn"

# Using ImgBurn (Free)
1. Download ImgBurn
2. Choose "Write image file to disc"
3. Select ISO and DVD drive
4. Click Write button
```

#### macOS
```bash
# Using Disk Utility
1. Open Disk Utility
2. Insert blank DVD
3. Click "Burn" in toolbar
4. Select Debian ISO
5. Click "Burn"

# Using Terminal
hdiutil burn debian-13.0.0-amd64-DVD-1.iso
```

#### Linux
```bash
# Using Brasero (GUI)
sudo apt install brasero
# Open Brasero → Burn Image → Select ISO

# Using command line
sudo apt install wodim
sudo wodim -v -dao debian-13.0.0-amd64-DVD-1.iso
```

## 🔍 Verification and Testing

### Verify Boot Media

```bash
# Check USB contents (should see these folders)
- boot/
- dists/
- pool/
- EFI/

# Test boot without installing
1. Insert USB/DVD
2. Restart computer
3. Enter BIOS/UEFI
4. Set USB/DVD as first boot device
5. Save and restart
```

### Boot Testing

::: warning ⚠️ Important Notes
- **Backup Data**: Save important files before testing
- **BIOS Settings**: May need to disable Secure Boot
- **Boot Order**: USB/DVD should be first in boot sequence
:::

### Common Boot Issues

::: details 🚫 USB Not Detected
```bash
# Solutions:
1. Try different USB ports (USB 2.0 preferred)
2. Recreate bootable USB with different tool
3. Check BIOS settings:
   - Enable Legacy USB Support
   - Disable Fast Boot
   - Enable USB Boot
```
:::

::: details 🖥️ Black Screen on Boot
```bash
# Try these boot parameters:
1. Press 'e' at GRUB menu
2. Add to linux line:
   nomodeset acpi=off noapic
3. Press Ctrl+X to boot

# Or select "Safe Graphics Mode" if available
```
:::

## 🛠️ Advanced Options

### Multiple ISOs on One USB

**Ventoy (Recommended)**
```bash
# Download from: https://www.ventoy.net/
1. Install Ventoy on USB drive
2. Copy multiple ISO files to USB
3. Boot and select which ISO to use
```

**YUMI (Windows)**
```bash
# Download from: https://www.pendrivelinux.com/yumi/
# Allows multiple distributions on one USB
```

### Creating USB from Another Linux System

```bash
# Using cp command (simple)
sudo cp debian-13.0.0-amd64-DVD-1.iso /dev/sdX

# Using cat command
cat debian-13.0.0-amd64-DVD-1.iso | sudo dd of=/dev/sdX bs=1M

# Using pv (with progress bar)
sudo apt install pv
pv debian-13.0.0-amd64-DVD-1.iso | sudo dd of=/dev/sdX bs=1M
```

### Hybrid ISO Creation

```bash
# Make ISO hybrid (works with both CD and USB)
sudo apt install syslinux-utils
isohybrid debian-13.0.0-amd64-DVD-1.iso
```

## 📱 Mobile Device Methods

### Android Devices
```bash
# Apps available:
- EtchDroid (Free, open source)
- ISO 2 USB (Premium features)

# Requirements:
- USB OTG cable
- File manager with root access
```

### iOS Devices
```bash
# Limited options due to iOS restrictions
# Consider using:
- iSH Shell (for advanced users)
- Lightning to USB adapter
```

## 🔧 Troubleshooting

### USB Creation Fails

::: details ❌ Common Issues
```bash
# Problem: "Access denied" or permission errors
Solution: Run tool as administrator/root

# Problem: USB appears corrupted
Solution: 
1. Format USB completely
2. Use different USB port
3. Try different creation tool

# Problem: ISO file corrupted
Solution:
1. Verify ISO checksum
2. Re-download from different mirror
3. Check disk space during download
```
:::

### Boot Media Not Working

::: details 🔄 Boot Troubleshooting
```bash
# Check BIOS/UEFI Settings:
- Boot Mode: UEFI (recommended) or Legacy
- Secure Boot: Disabled
- Fast Boot: Disabled  
- USB Boot: Enabled

# Hardware Issues:
- Try different USB ports
- Test USB drive on another computer
- Use different USB drive
- Check USB drive health
```
:::

### Speed Optimization

```bash
# For faster USB creation:
1. Use USB 3.0 drives and ports
2. Close other applications
3. Use tools with multi-threading support
4. Disable antivirus temporarily

# For faster boot:
1. Use USB 3.0 ports
2. Enable UEFI mode
3. Disable unnecessary BIOS options
4. Use SSD-based USB drives
```

## 📊 Performance Comparison

| Tool | Speed | Verification | GUI | CLI | Multi-OS |
|------|-------|-------------|-----|-----|----------|
| **Balena Etcher** | ⭐⭐⭐ | ✅ Yes | ✅ | ❌ | ✅ |
| **Rufus** | ⭐⭐⭐⭐ | ✅ Yes | ✅ | ❌ | ❌ Win only |
| **dd command** | ⭐⭐⭐⭐⭐ | ❌ Manual | ❌ | ✅ | ✅ Unix |
| **Ventoy** | ⭐⭐⭐ | ✅ Yes | ✅ | ✅ | ✅ |

## 🎯 Quick Start Checklist

Before proceeding to installation:

- [ ] Downloaded correct Debian 13 ISO
- [ ] Verified ISO checksum  
- [ ] Created bootable USB/DVD
- [ ] Tested boot media
- [ ] Configured BIOS settings
- [ ] Backed up important data

## 📚 Next Steps

1. **Test Boot**: Verify your media boots correctly
2. **BIOS Configuration**: [Configure boot settings](/en/basics/bios-settings)
3. **Installation**: [Begin Debian installation](/en/basics/installation)
4. **Troubleshooting**: [Solve installation issues](/en/troubleshooting/installation-issues)

**Boot media ready?** [Configure BIOS settings →](/en/basics/bios-settings) 