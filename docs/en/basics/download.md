---
title: Download Debian 13
description: Download Debian 13 installation images and choose the right version for your needs
---

# Download Debian 13

::: tip Interactive Download
Looking for a quick download? Visit the [Interactive Download Page](/en/download) to select your region and mirror for the fastest Debian ISO download.
:::

This guide helps you download the appropriate Debian 13 installation images for your system.

## 🎯 Choose Your Download

### Quick Selection

| Use Case | Recommended Download | Size |
|----------|---------------------|------|
| **Most Users** | DVD-1 (Full Desktop) | ~3.7GB |
| **Minimal Install** | netinst (Network Install) | ~400MB |
| **Offline Install** | Complete DVD Set | ~20GB |
| **USB/CD Install** | ISO Images | Various |

## 💿 Official Download Links

### Primary Download Sites

::: tip 🌐 Official Sources
- **Main Site**: [debian.org/download](https://www.debian.org/download)
- **CD Images**: [cdimage.debian.org](https://cdimage.debian.org/)
- **Mirror List**: [debian.org/mirror/list](https://www.debian.org/mirror/list)
:::

### Mirror Sites (Faster Downloads)

#### United States
- MIT: http://mirrors.mit.edu/debian-cd/
- Berkeley: http://mirrors.ocf.berkeley.edu/debian-cd/

#### Europe
- Germany: http://ftp.de.debian.org/debian-cd/
- UK: http://ftp.uk.debian.org/debian-cd/

#### Asia Pacific
- Japan: http://ftp.jp.debian.org/debian-cd/
- Australia: http://ftp.au.debian.org/debian-cd/

## 📦 Installation Image Types

### DVD Images (Recommended)

```bash
# DVD-1 (Primary desktop environments)
debian-13.0.0-amd64-DVD-1.iso      # ~3.7GB
# Contains: GNOME, KDE, Xfce, LXDE

# DVD-2 (Additional software)
debian-13.0.0-amd64-DVD-2.iso      # ~4.4GB

# DVD-3 (More software packages)
debian-13.0.0-amd64-DVD-3.iso      # ~4.4GB
```

### Network Install (netinst)

```bash
# Minimal installer (downloads packages online)
debian-13.0.0-amd64-netinst.iso    # ~400MB
# Best for: Fast internet, custom installations
```

### CD Images

```bash
# CD-1 (Basic system only)
debian-13.0.0-amd64-CD-1.iso       # ~650MB
# Contains: Base system + one desktop environment
```

### Live Images

```bash
# Live Desktop environments
debian-live-13.0.0-amd64-gnome.iso      # ~2.9GB
debian-live-13.0.0-amd64-kde.iso        # ~3.1GB
debian-live-13.0.0-amd64-xfce.iso       # ~2.7GB
debian-live-13.0.0-amd64-lxde.iso       # ~2.5GB

# Try before installing
```

## 🏗️ Architecture Selection

### Intel/AMD Systems (Most Common)

```bash
# 64-bit (Recommended)
amd64     # Intel Core, AMD Ryzen, most modern PCs

# 32-bit (Legacy)
i386      # Older computers (pre-2007)
```

### ARM Systems

```bash
# ARM 64-bit
arm64     # Raspberry Pi 4, Apple Silicon Macs

# ARM 32-bit
armhf     # Raspberry Pi 2/3, older ARM devices
```

### Other Architectures

```bash
# PowerPC
ppc64el   # IBM POWER8/9 systems

# RISC-V (New!)
riscv64   # RISC-V development boards

# S/390
s390x     # IBM mainframes
```

## 🔍 Download Verification

### Check File Integrity

```bash
# Download checksums
wget https://cdimage.debian.org/debian-cd/current/amd64/iso-dvd/SHA256SUMS
wget https://cdimage.debian.org/debian-cd/current/amd64/iso-dvd/SHA256SUMS.sign

# Verify checksum
sha256sum debian-13.0.0-amd64-DVD-1.iso
# Compare with SHA256SUMS file

# Verify GPG signature (Advanced)
gpg --verify SHA256SUMS.sign SHA256SUMS
```

### Download Tools

```bash
# Command line download
wget https://cdimage.debian.org/debian-cd/current/amd64/iso-dvd/debian-13.0.0-amd64-DVD-1.iso

# Resume interrupted download
wget -c URL

# Torrent download (Recommended for large files)
# Download .torrent file and use BitTorrent client
```

## 🚀 Specialized Images

### Firmware Images (Non-free)

```bash
# For systems requiring proprietary drivers
debian-13.0.0-amd64-DVD-1-firmware.iso

# Includes:
- WiFi drivers (Broadcom, Intel, Realtek)
- Graphics drivers (NVIDIA, AMD)
- Network drivers
```

### Cloud Images

```bash
# Cloud platforms
debian-13-generic-amd64.qcow2       # QEMU/KVM
debian-13-generic-amd64.vmdk        # VMware
debian-13-generic-amd64.vhd         # Hyper-V
```

### Minimal Images

```bash
# Very small installations
debian-13.0.0-amd64-mini.iso        # ~50MB
# Network boot only, download everything
```

## 💾 Download Size Planning

### Storage Requirements

| Image Type | Download Size | Installed Size |
|------------|---------------|----------------|
| **netinst** | 400MB | 2-10GB+ |
| **CD-1** | 650MB | 3-8GB |
| **DVD-1** | 3.7GB | 5-15GB |
| **Live** | 2.5-3.1GB | N/A |
| **Complete** | 20GB+ | 20GB+ |

### Internet Requirements

::: warning 📡 Network Considerations
- **netinst**: Requires stable internet during installation
- **DVD**: Can install completely offline
- **Firmware**: May need internet for latest drivers
:::

## 🔧 Download Recommendations

### For Beginners

1. **DVD-1 Image** - Complete offline installation
2. **Firmware version** if you have modern hardware
3. **amd64 architecture** for most computers

### For Advanced Users

1. **netinst** - Minimal download, latest packages
2. **Custom network mirror** for faster downloads
3. **Torrent download** for large files

### For Specific Scenarios

::: details 🏠 Home Users
- **DVD-1**: Complete desktop environment
- **Live image**: Try before installing
- **Firmware version**: For WiFi/graphics support
:::

::: details 🏢 Enterprise/Servers
- **netinst**: Minimal system, add what you need
- **Business Card**: Very minimal (50MB)
- **Network install**: Always latest packages
:::

::: details 🎓 Students/Learning
- **Live images**: Experiment without installing
- **Multiple DVDs**: Explore different desktops
- **Virtual machine images**: Easy setup
:::

## 🌐 Regional Mirrors

### Fastest Download Tips

1. **Choose nearby mirror** - Geographic proximity
2. **University mirrors** - Often very fast
3. **CDN services** - Automatic optimization
4. **Torrent protocol** - Distributed download

### Mirror Selection Tool

```bash
# Use netselect to find fastest mirror
sudo apt install netselect
netselect -v $(wget -qO- https://www.debian.org/mirror/list | grep -P  '^http' | head -20)
```

## ⚡ Download Acceleration

### Browser Extensions
- **DownThemAll** (Firefox)
- **Free Download Manager** (Chrome/Firefox)

### Command Line Tools
```bash
# aria2 (Multi-connection downloads)
sudo apt install aria2
aria2c -x 16 -s 16 URL

# axel (Lightweight accelerator)
sudo apt install axel
axel -n 8 URL
```

## 📚 Next Steps

After downloading:

1. [Verify Download](/en/basics/download#verification) - Check file integrity
2. [Create Bootable Media](/en/basics/bootable-media) - Make installation USB
3. [Check System Requirements](/en/basics/requirements) - Ensure compatibility
4. [Begin Installation](/en/basics/installation) - Install Debian

## 🆘 Download Issues

### Common Problems

::: details 🐌 Slow Downloads
- Try different mirror sites
- Use torrent downloads
- Download during off-peak hours
- Use download accelerators
:::

::: details ❌ Corrupted Downloads
- Verify checksums before using
- Re-download from different mirror
- Check available disk space
- Disable antivirus temporarily
:::

::: details 🔒 Access Blocked
- Try different mirrors
- Use VPN if necessary
- Download via torrent
- Use mobile data as backup
:::

## 📞 Getting Help

- **Official Documentation**: debian.org/doc
- **Community Forums**: forums.debian.org  
- **IRC Channel**: #debian on OFTC
- **Mailing Lists**: debian-user@lists.debian.org

**Download ready?** [Create bootable media →](/en/basics/bootable-media) 