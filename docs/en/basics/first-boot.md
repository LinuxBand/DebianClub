---
title: First Boot Setup
description: Initial configuration and setup after installing Debian 13
---

# First Boot Setup

Complete the essential configuration steps after your first Debian 13 boot.

## 🎉 Welcome to Debian!

Congratulations on successfully installing Debian 13! This guide walks you through the essential first-time setup steps.

## 🔐 Initial Login

### Desktop Login

1. **Select User**: Choose your user account
2. **Enter Password**: Type the password you created during installation
3. **Choose Session**: Select your preferred desktop environment (if multiple installed)

### Command Line Login

```bash
# If you installed without a desktop environment
debian login: username
Password: [enter your password]

# Switch to graphical mode (if available)
sudo systemctl start gdm3
```

## 📶 Network Configuration

### WiFi Setup (Desktop)

```bash
# GNOME: Click network icon in top bar
# KDE: Click network icon in system tray
# Command line option:
nmcli dev wifi list
nmcli dev wifi connect "WiFi-Name" password "your-password"
```

### Wired Network

```bash
# Usually configured automatically via DHCP
# Check connection:
ip addr show
ping google.com

# Manual configuration if needed:
sudo nmcli con add type ethernet con-name "Wired" ifname eth0
```

## 🔄 System Updates

### Update Package Lists

```bash
# Update repository information
sudo apt update

# Upgrade all packages
sudo apt upgrade

# Full system upgrade
sudo apt full-upgrade

# Clean up
sudo apt autoremove
sudo apt autoclean
```

### Configure Automatic Updates

```bash
# Install unattended upgrades
sudo apt install unattended-upgrades

# Configure automatic security updates
sudo dpkg-reconfigure unattended-upgrades

# Check configuration
sudo nano /etc/apt/apt.conf.d/50unattended-upgrades
```

## 🛡️ Security Setup

### Firewall Configuration

```bash
# Enable UFW firewall
sudo ufw enable

# Check status
sudo ufw status

# Allow SSH (if using remote access)
sudo ufw allow ssh

# Allow common services
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
```

### User Account Security

```bash
# Add user to sudo group (if not done during installation)
sudo usermod -aG sudo username

# Set password policy
sudo nano /etc/security/pwquality.conf

# Check sudo access
sudo whoami
```

## 📦 Essential Software Installation

### Development Tools

```bash
# Basic development packages
sudo apt install build-essential git curl wget

# Text editors
sudo apt install vim nano

# Compression tools
sudo apt install zip unzip rar unrar
```

### Multimedia Support

```bash
# Install multimedia codecs
sudo apt install vlc

# Enable non-free repositories for additional codecs
sudo nano /etc/apt/sources.list
# Add 'contrib non-free non-free-firmware' to your deb lines

sudo apt update
sudo apt install firmware-linux-nonfree
```

### Additional Package Managers

```bash
# Flatpak for additional applications
sudo apt install flatpak
sudo flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo

# Snap packages (optional)
sudo apt install snapd
```

## 🎨 Desktop Customization

### GNOME Customization

```bash
# Install GNOME Tweaks
sudo apt install gnome-tweaks

# Install extensions
sudo apt install gnome-shell-extensions

# Popular extensions to consider:
# - Dash to Dock
# - User Themes
# - Clipboard Indicator
```

### KDE Customization

```bash
# System Settings are built-in
# Access via: System Settings

# Popular customizations:
# - Desktop themes
# - Window decorations
# - Panel configuration
# - Shortcuts
```

### Icon Themes and Fonts

```bash
# Popular icon themes
sudo apt install papirus-icon-theme
sudo apt install numix-icon-theme

# Additional fonts
sudo apt install fonts-noto
sudo apt install fonts-liberation
sudo apt install ttf-mscorefonts-installer
```

## 🔧 Hardware Configuration

### Graphics Drivers

```bash
# NVIDIA drivers (if you have NVIDIA graphics)
sudo apt install nvidia-driver

# AMD drivers (usually work out of the box)
sudo apt install firmware-amd-graphics

# Intel graphics (usually pre-installed)
sudo apt install xserver-xorg-video-intel
```

### Audio Configuration

```bash
# Install PulseAudio control
sudo apt install pavucontrol

# ALSA mixer
sudo apt install alsa-utils

# Test audio
speaker-test -t wav -c 2
```

### Bluetooth Setup

```bash
# Install Bluetooth support
sudo apt install bluetooth bluez bluez-tools

# Enable Bluetooth service
sudo systemctl enable bluetooth
sudo systemctl start bluetooth

# GUI management
sudo apt install blueman
```

## 📁 File System Setup

### Home Directory Organization

```bash
# Create useful directories
mkdir -p ~/Documents/Projects
mkdir -p ~/Downloads/Software
mkdir -p ~/Pictures/Screenshots
mkdir -p ~/Videos/Recordings

# Set up development workspace
mkdir -p ~/Development/github
mkdir -p ~/Development/scripts
```

### External Storage

```bash
# Auto-mount external drives
sudo apt install udisks2

# NTFS support for Windows drives
sudo apt install ntfs-3g

# exFAT support
sudo apt install exfat-fuse exfatprogs
```

## 🌐 Browser and Internet

### Web Browser Setup

```bash
# Firefox is usually pre-installed
# Install additional browsers:

# Chromium
sudo apt install chromium

# Google Chrome (from web)
wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
echo "deb http://dl.google.com/linux/chrome/deb/ stable main" | sudo tee /etc/apt/sources.list.d/google-chrome.list
sudo apt update
sudo apt install google-chrome-stable
```

### Email Client

```bash
# Thunderbird email client
sudo apt install thunderbird

# Evolution (GNOME)
sudo apt install evolution

# KMail (KDE)
sudo apt install kmail
```

## 🖨️ Printer Setup

### CUPS Configuration

```bash
# Install printing system
sudo apt install cups printer-driver-all

# Enable CUPS service
sudo systemctl enable cups
sudo systemctl start cups

# Web interface for printer management
# Open browser to: http://localhost:631
```

### Scanner Support

```bash
# Install scanner support
sudo apt install sane-utils xsane

# Test scanner detection
scanimage -L
```

## 💾 Backup Configuration

### Setup Regular Backups

```bash
# Install backup tools
sudo apt install rsync timeshift

# Timeshift for system snapshots
sudo timeshift --create --comments "Fresh installation"

# Setup automatic backups
sudo timeshift --setup
```

### Cloud Storage

```bash
# Nextcloud client
sudo apt install nextcloud-desktop

# Dropbox (download from web)
# OneDrive via rclone
sudo apt install rclone
```

## 🔍 System Information

### Check System Status

```bash
# System information
neofetch
# or
sudo apt install screenfetch && screenfetch

# Hardware information
lshw -short
lscpu
lsblk

# Memory usage
free -h

# Disk usage
df -h
```

## 📚 Documentation and Help

### Install Documentation

```bash
# Man pages
sudo apt install man-db manpages-dev

# Info pages
sudo apt install info

# Debian reference
sudo apt install debian-reference-en
```

### Useful Commands to Remember

```bash
# Package management
apt search package-name      # Search for packages
apt show package-name        # Show package information
apt list --installed         # List installed packages

# System management
systemctl status service     # Check service status
journalctl -u service        # View service logs
dmesg                        # Kernel messages

# File operations
ls -la                       # List files with details
chmod +x filename            # Make file executable
chown user:group filename    # Change file ownership
```

## 🎯 Next Steps

### Recommended Actions

1. **Join Community**: Connect with Debian forums and mailing lists
2. **Learn Package Management**: Master apt and package installation
3. **Explore Software**: Browse available applications
4. **Configure Workflow**: Set up your development/work environment
5. **Create Backups**: Set up regular system and data backups

### Learning Resources

- **Debian Handbook**: Online comprehensive guide
- **Man Pages**: Built-in documentation (`man command`)
- **Info Pages**: Detailed program documentation (`info program`)
- **Community Forums**: Ask questions and share experiences

## 🔧 Troubleshooting First Boot

### Common Issues

::: details 🖥️ No Desktop Environment
```bash
# Install desktop environment
sudo apt update
sudo apt install task-gnome-desktop

# Start display manager
sudo systemctl start gdm3
```
:::

::: details 📶 No Network Connection
```bash
# Check network interfaces
ip link show

# Restart NetworkManager
sudo systemctl restart NetworkManager

# Manual network configuration
sudo dhclient eth0
```
:::

::: details 🔊 No Audio
```bash
# Check audio devices
aplay -l

# Restart audio service
pulseaudio --kill
pulseaudio --start

# Install additional drivers
sudo apt install firmware-sof-signed
```
:::

## 📚 Related Resources

- [System Configuration](/en/basics/configuration) - Advanced customization
- [Package Management](/en/administration/packages) - Software installation
- [Desktop Environments](/en/basics/desktop-environments) - Choose your interface
- [Troubleshooting](/en/troubleshooting/faq) - Common problems and solutions

**System configured?** [Explore desktop environments →](/en/basics/desktop-environments) 