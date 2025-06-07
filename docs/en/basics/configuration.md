---
title: System Configuration
description: Configure and customize your Debian 13 system to meet your specific needs
---

# System Configuration

Customize and optimize your Debian 13 system for your specific needs and preferences.

## 🎨 Desktop Environment Configuration

### GNOME Settings

```bash
# Access GNOME Settings
gnome-control-center

# Install GNOME Tweaks for advanced options
sudo apt install gnome-tweaks

# Popular GNOME extensions
sudo apt install gnome-shell-extensions
```

### KDE Plasma Configuration

```bash
# System Settings (built-in)
systemsettings5

# Additional customization tools
sudo apt install kde-config-plasma
```

## 🔧 System Preferences

### Regional Settings

```bash
# Set system locale
sudo dpkg-reconfigure locales

# Set timezone
sudo timedatectl set-timezone America/New_York

# Configure keyboard layout
sudo dpkg-reconfigure keyboard-configuration
```

### Display Configuration

```bash
# Check available resolutions
xrandr

# Set resolution
xrandr --output HDMI-1 --mode 1920x1080

# Multi-monitor setup
xrandr --output HDMI-1 --auto --right-of eDP-1
```

## 📦 Package Management Configuration

### Repository Management

```bash
# Edit sources list
sudo nano /etc/apt/sources.list

# Example configuration:
deb http://deb.debian.org/debian trixie main contrib non-free non-free-firmware
deb-src http://deb.debian.org/debian trixie main contrib non-free non-free-firmware
```

### Third-Party Repositories

```bash
# Add Flatpak
sudo apt install flatpak
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo

# Add Snap support
sudo apt install snapd
```

## 🌐 Network Configuration

### NetworkManager Setup

```bash
# Configure using nmcli
nmcli connection show
nmcli connection add type ethernet con-name "Wired" ifname eth0

# WiFi configuration
nmcli dev wifi connect "Network-Name" password "password"
```

### Static IP Configuration

```bash
# Using nmcli
nmcli con add type ethernet con-name "static-ip" ifname eth0 ip4 192.168.1.100/24 gw4 192.168.1.1

# DNS configuration
nmcli con mod "static-ip" ipv4.dns "8.8.8.8,8.8.4.4"
```

## 🔐 Security Configuration

### Firewall Setup

```bash
# Enable UFW
sudo ufw enable

# Configure rules
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Check status
sudo ufw status verbose
```

### User Management

```bash
# Add new user
sudo adduser newuser

# Add user to groups
sudo usermod -aG sudo,audio,video newuser

# Set password policies
sudo nano /etc/security/pwquality.conf
```

## 🎵 Audio Configuration

### PulseAudio Setup

```bash
# Install audio tools
sudo apt install pulseaudio pavucontrol

# Configure audio
pavucontrol

# Test audio
speaker-test -t wav -c 2
```

### ALSA Configuration

```bash
# ALSA mixer
alsamixer

# List audio devices
aplay -l
arecord -l
```

## 🖨️ Printer Configuration

### CUPS Setup

```bash
# Install CUPS
sudo apt install cups

# Enable service
sudo systemctl enable cups
sudo systemctl start cups

# Web interface
# Open: http://localhost:631
```

### Printer Drivers

```bash
# Install common drivers
sudo apt install printer-driver-all

# HP printers
sudo apt install hplip

# Canon printers
sudo apt install printer-driver-canon
```

## 🔄 Boot Configuration

### GRUB Customization

```bash
# Edit GRUB configuration
sudo nano /etc/default/grub

# Common settings:
GRUB_TIMEOUT=5
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"

# Update GRUB
sudo update-grub
```

### Systemd Services

```bash
# List all services
systemctl list-units --type=service

# Enable/disable services
sudo systemctl enable service-name
sudo systemctl disable service-name

# Check service status
systemctl status service-name
```

## 📁 File System Configuration

### Mount Points

```bash
# View current mounts
mount | column -t

# Permanent mounts in fstab
sudo nano /etc/fstab

# Example entry:
/dev/sdb1 /mnt/data ext4 defaults 0 2
```

### Permissions and Ownership

```bash
# Change ownership
sudo chown user:group filename

# Change permissions
chmod 755 filename
chmod u+x filename

# Set default permissions
umask 022
```

## 🎮 Gaming Configuration

### Steam Setup

```bash
# Enable 32-bit architecture
sudo dpkg --add-architecture i386
sudo apt update

# Install Steam
sudo apt install steam

# Gaming libraries
sudo apt install mesa-vulkan-drivers
```

### Wine Configuration

```bash
# Install Wine
sudo apt install wine

# Configure Wine
winecfg

# Install additional Windows libraries
winetricks
```

## 🔋 Power Management

### Laptop Configuration

```bash
# Install power management tools
sudo apt install tlp tlp-rdw

# Enable TLP
sudo systemctl enable tlp
sudo systemctl start tlp

# Configure power settings
sudo nano /etc/tlp.conf
```

### CPU Frequency Scaling

```bash
# Install cpufrequtils
sudo apt install cpufrequtils

# Check current governor
cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor

# Set performance governor
sudo cpufreq-set -g performance
```

## 🎨 Appearance Customization

### Themes and Icons

```bash
# Install theme packages
sudo apt install gnome-themes-extra
sudo apt install papirus-icon-theme

# GTK themes
sudo apt install arc-theme
sudo apt install numix-gtk-theme
```

### Fonts Configuration

```bash
# Install additional fonts
sudo apt install fonts-noto
sudo apt install fonts-liberation
sudo apt install ttf-mscorefonts-installer

# Font configuration
fc-cache -fv
```

## 🚀 Performance Optimization

### System Monitoring

```bash
# Install monitoring tools
sudo apt install htop iotop nethogs

# System information
sudo apt install neofetch
neofetch
```

### Memory Management

```bash
# Check memory usage
free -h

# Configure swap
sudo swapon --show
sudo swapoff -a  # Disable swap temporarily
```

## 🔧 Advanced Configuration

### Kernel Parameters

```bash
# View current parameters
cat /proc/cmdline

# Edit GRUB for permanent changes
sudo nano /etc/default/grub

# Add to GRUB_CMDLINE_LINUX_DEFAULT:
# "acpi=off nomodeset"
```

### Custom Scripts

```bash
# Create startup scripts
sudo nano /etc/rc.local

# User-specific startup
nano ~/.bashrc
nano ~/.profile

# Desktop autostart
mkdir -p ~/.config/autostart
```

## 📊 System Backup

### Configuration Backup

```bash
# Backup important configs
sudo tar -czf system-config-backup.tar.gz \
  /etc/apt/sources.list \
  /etc/fstab \
  /etc/default/grub \
  ~/.bashrc \
  ~/.config

# Restore configuration
sudo tar -xzf system-config-backup.tar.gz -C /
```

## 🔍 Troubleshooting Configuration

### Log Files

```bash
# System logs
sudo journalctl -xeu service-name

# Boot logs
dmesg | less

# Application logs
tail -f ~/.local/share/applications/app.log
```

### Reset Configuration

```bash
# Reset user settings
mv ~/.config ~/.config.backup

# Reset system network
sudo rm /etc/NetworkManager/system-connections/*
sudo systemctl restart NetworkManager
```

## 📚 Related Resources

- [First Boot Setup](/en/basics/first-boot) - Initial configuration
- [Package Management](/en/administration/packages) - Software installation
- [Security Settings](/en/administration/security) - System hardening
- [Desktop Environments](/en/basics/desktop-environments) - Interface options

**Configuration complete?** [Explore advanced administration →](/en/administration/packages) 