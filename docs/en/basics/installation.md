---
title: Installation Guide
description: Complete step-by-step Debian 13 installation guide with detailed instructions and troubleshooting
---

# Debian 13 Installation Guide

This tutorial provides a comprehensive guide to installing Debian 13. We assume you have already created a bootable installation media and are ready to begin the installation process.

## 🎯 Pre-Installation Preparation

### Installation Checklist

Before starting the installation, ensure:

- ✅ **Bootable media created**
- ✅ **Important data backed up**
- ✅ **Network connection available** (recommended)
- ✅ **Stable power connection** (laptop users)
- ✅ **At least 1 hour of free time**

### Installation Methods

| Method | Use Case | Advantages | Considerations |
|--------|----------|------------|----------------|
| **Fresh Install** | New computer or complete replacement | Cleanest system | Will erase all data |
| **Dual Boot** | Keep existing Windows | Can switch systems | Requires partition adjustment |
| **Virtual Machine** | Learning and testing | Safe and risk-free | Reduced performance |

::: warning ⚠️ Important
Fresh installation will **completely erase** hard disk data! Please backup important files.
:::

## 💿 Starting the Installer

### 1. BIOS/UEFI Setup

#### Access BIOS/UEFI Settings

Common keys:
- **Dell**: <span class="kbd">F2</span> or <span class="kbd">F12</span>
- **HP**: <span class="kbd">F10</span> or <span class="kbd">F9</span>
- **Lenovo**: <span class="kbd">F1</span> or <span class="kbd">F12</span>
- **ASUS**: <span class="kbd">F2</span> or <span class="kbd">Del</span>
- **MSI**: <span class="kbd">Del</span> or <span class="kbd">F11</span>

#### Modify Boot Order

1. Find "Boot" or startup options
2. Set USB device as first boot device
3. Disable "Secure Boot" (if present)
4. Save settings and restart

### 2. Boot Debian Installer

Insert the bootable media and restart. You'll see the Debian boot menu:

```
Debian GNU/Linux installer boot menu

Graphical install
Install
Advanced options >
Accessible dark contrast installer menu >
Help
Install with speech synthesis
```

#### Choose Installation Method

**Recommended for beginners:**
- **Graphical install** - GUI installer (recommended)
- **Install** - Text-based installer

::: tip 💡 Beginner Tip
Choose "Graphical install" for a more user-friendly interface.
:::

## 🌍 Language and Region Settings

### 1. Select Language

- Choose **English** or your preferred language
- Select the language you're most comfortable with

### 2. Select Location

- **United States**: Choose "United States"
- **Other regions**: Choose your corresponding country

### 3. Configure Keyboard

- **English users**: Choose "American English"
- **Others**: Choose your keyboard layout

## 🌐 Network Configuration

### Automatic Network Configuration

The installer will automatically attempt to configure the network:

```bash
# Wired network: Usually auto-detected
# Wi-Fi network: Manual configuration required
```

### Manual Wi-Fi Configuration

If Wi-Fi configuration is needed:

1. **Select network**: Choose your Wi-Fi network from the list
2. **Enter password**: Input your Wi-Fi password
3. **Wait for connection**: Wait until connection is established

### Configure Network Mirror

Choose a Debian software repository mirror:

**Recommended for users in different regions:**
- `deb.debian.org` (Global CDN)
- `ftp.us.debian.org` (United States)
- `ftp.uk.debian.org` (United Kingdom)

## 👤 User and Password Setup

### 1. Set Root Password

```bash
# Root user is the system administrator account
# Password requirements: At least 8 characters, include letters and numbers
```

**Password Security Recommendations:**
- ✅ At least 12 characters
- ✅ Include uppercase, lowercase, numbers, special characters
- ❌ Avoid personal information like birthdays, names

### 2. Create Regular User

#### User Information Setup

```bash
Full name: John Doe           # Display name
Username: johndoe            # Login name (lowercase)
Password: ************       # User password
```

::: tip 💡 Username Suggestions
- Use lowercase letters and numbers
- Avoid special characters
- Recommended to use English names
:::

## 💾 Disk Partitioning

This is the most important step in the installation process!

### Partition Scheme Selection

#### 1. Guided Partitioning (Recommended for beginners)

```bash
Use entire disk
├── Use entire disk and set up LVM
├── Use entire disk and set up encrypted LVM
└── Manual partitioning (advanced users)
```

**Recommended choice: "Use entire disk"**

#### 2. Custom Partition Scheme

For experienced users, recommended partition scheme:

| Mount Point | Size | File System | Description |
|-------------|------|-------------|-------------|
| `/boot/efi` | 512 MB | FAT32 | UEFI boot partition |
| `/` | 25-50 GB | ext4 | Root partition |
| `/home` | Remaining space | ext4 | User data |
| `swap` | 4-8 GB | swap | Swap partition |

### Practical Partitioning

#### Use Entire Disk (Recommended)

1. **Select disk**: Choose the disk to install on
2. **Partition scheme**: Choose "All files in one partition"
3. **Confirm operation**: Review partition table, confirm when satisfied

#### Manual Partitioning (Advanced)

1. **Create partition table**:
   ```bash
   # UEFI system: Choose GPT partition table
   # BIOS system: Choose MBR partition table
   ```

2. **Create EFI partition** (UEFI systems):
   ```bash
   Size: 512 MB
   Type: EFI System Partition
   File system: FAT32
   Mount point: /boot/efi
   ```

3. **Create root partition**:
   ```bash
   Size: 25-50 GB
   Type: Primary partition
   File system: ext4
   Mount point: /
   ```

4. **Create swap partition**:
   ```bash
   Size: Equal to memory size (4-8 GB)
   Type: Swap partition
   ```

5. **Create Home partition**:
   ```bash
   Size: All remaining space
   Type: Primary partition
   File system: ext4
   Mount point: /home
   ```

## 📦 Software Package Selection

### Desktop Environment Selection

```bash
Debian Desktop Environment Selection:

□ Debian desktop environment    # Default selected
□ ... GNOME                    # Modern interface (recommended for beginners)
□ ... Xfce                     # Lightweight interface
□ ... KDE Plasma               # Highly customizable
□ ... Cinnamon                 # Traditional style
□ ... MATE                     # Classic interface
□ ... LXDE                     # Minimal interface
□ web server
□ SSH server                   # Recommended
□ standard system utilities    # Recommended
```

**Recommended combination for beginners:**
- ✅ Debian desktop environment
- ✅ GNOME (or your preferred desktop)
- ✅ SSH server
- ✅ Standard system utilities

### Desktop Environment Comparison

| Desktop | Resource Usage | Features | Suitable For |
|---------|----------------|----------|--------------|
| **GNOME** | High | Modern, touch-friendly | Beginners, modern design lovers |
| **KDE Plasma** | Medium-High | Highly customizable, feature-rich | Users who like customization |
| **Xfce** | Low | Traditional interface, stable | Older machines, traditional desktop users |
| **LXDE** | Very Low | Extremely lightweight | Low-spec machines |

## ⚡ Installation Process

### System Installation Progress

The installation process will show a progress bar and current step:

```bash
Installing base system... (15%)
Configuring apt... (35%)
Installing packages... (60%)
Installing bootloader... (85%)
Finishing installation... (95%)
```

### Installation Time Estimate

| Installation Method | Estimated Time | Main Factor |
|-------------------|----------------|-------------|
| **Network Install** | 30-60 minutes | Network speed |
| **DVD Install** | 15-30 minutes | Hard disk speed |
| **SSD Install** | 10-20 minutes | SSD performance |

::: tip 💡 During Installation
- Keep network connection stable
- Don't force shutdown
- You can leave the installer to run automatically
:::

## 🔧 Bootloader Configuration

### GRUB Bootloader

#### Installation Location Selection

```bash
# Single system installation
Install GRUB bootloader to master boot record?
Choose: Yes

# Dual boot installation
Installation device:
Choose main hard disk (usually /dev/sda)
```

#### Dual Boot Configuration

If you have multiple operating systems:

```bash
# GRUB will automatically detect other operating systems
Detected operating systems:
- Windows Boot Manager
- Debian GNU/Linux
```

## 🎉 Installation Complete

### Finishing Installation

When you see the "Installation complete" message:

1. **Remove installation media**: Remove the USB boot drive
2. **Restart system**: Click "Restart"
3. **First boot**: Wait for system to boot to login screen

### First Login

#### GNOME Welcome Screen

First boot will show GNOME initial setup:

```bash
1. Select language
2. Connect to network
3. Online accounts (can skip)
4. Privacy settings
5. Complete setup
```

#### Login Screen

```bash
User selection: Choose the user you created
Password input: Enter user password
Desktop environment: Choose desktop environment (if multiple)
```

## 🔧 Post-Installation Basic Configuration

### 1. Update System

First, update the system after login:

```bash
# Open terminal (Ctrl + Alt + T)
sudo apt update
sudo apt upgrade -y
```

### 2. Install Common Software

```bash
# Install basic tools
sudo apt install curl wget git vim

# Install multimedia codecs
sudo apt install debian-multimedia-keyring
sudo apt update
sudo apt install ffmpeg

# Install fonts (for international users)
sudo apt install fonts-noto
```

### 3. Configure Input Methods

```bash
# Install ibus input method
sudo apt install ibus

# Setup input method
ibus-setup
```

### 4. Install Browser and Office Suite

```bash
# Firefox browser (usually pre-installed)
sudo apt install firefox-esr

# LibreOffice office suite
sudo apt install libreoffice

# Image viewer
sudo apt install eog
```

## 🆘 Common Installation Issues

### Cannot Boot to Installer

**Possible causes:**
- Incorrect BIOS settings
- Failed bootable media creation
- Hardware compatibility issues

**Solutions:**
1. Check BIOS boot order
2. Disable Secure Boot
3. Try different USB ports
4. Recreate bootable media

### Network Connection Failure

**Solutions:**
1. Check cable connection
2. Try mobile hotspot
3. Skip network configuration, set up after installation
4. Use offline DVD installation

### Partition Operation Failure

**Solutions:**
1. Check if hard disk space is sufficient
2. Disable Windows Fast Startup
3. Run disk check in Windows
4. Pre-partition using GParted Live

### Installation Stuck at Certain Step

**Solutions:**
1. Wait patiently (some steps are slow)
2. Check network connection
3. Restart installer
4. Try basic installation (don't select desktop environment)

### GRUB Installation Failure

**Solutions:**
1. Confirm correct hard disk selection
2. Check UEFI/BIOS mode
3. Disable Secure Boot in BIOS
4. Manually repair GRUB

## 📝 Post-Installation Checklist

After installation completion, please check:

- [ ] **System boots normally**
- [ ] **Network connection works**
- [ ] **Audio output works**
- [ ] **Display works properly**
- [ ] **Input methods work**
- [ ] **Software installation works**
- [ ] **System updates work**

## Next Steps

After completing installation, you can continue with:

1. [First Boot Configuration](/en/basics/first-boot) - Complete basic system setup
2. [Desktop Environment Selection](/en/basics/desktop-environments) - Customize desktop experience
3. [Installing Common Software](/en/administration/packages) - Install applications you need

---

**Installation successful?** [Continue with first boot configuration →](/en/basics/first-boot) 