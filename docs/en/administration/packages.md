---
title: Package Management
description: Master APT package management in Debian 13 - install, update, and maintain software
---

# Package Management

Learn how to effectively manage software packages in Debian 13 using APT and other package management tools.

## 📦 APT Package Manager

APT (Advanced Package Tool) is the primary package management system for Debian.

### Basic APT Commands

```bash
# Update package database
sudo apt update

# Upgrade all packages
sudo apt upgrade

# Full system upgrade
sudo apt full-upgrade

# Install a package
sudo apt install package-name

# Remove a package
sudo apt remove package-name

# Remove package and configuration
sudo apt purge package-name

# Search for packages
apt search keyword

# Show package information
apt show package-name

# List installed packages
apt list --installed
```

### Package Information

```bash
# Show package details
apt show firefox

# Check if package is installed
dpkg -l | grep firefox

# Find package containing file
dpkg -S /usr/bin/firefox

# List package contents
dpkg -L package-name
```

## 🔍 Finding Software

### Searching Packages

```bash
# Search by name
apt search web-browser

# Search by description
apt search "text editor"

# Advanced search with aptitude
sudo apt install aptitude
aptitude search '~dweb~nbrowser'
```

### Package Categories

```bash
# List available tasks
sudo apt install tasksel
sudo tasksel

# Common tasks:
# - Desktop environment
# - Web server
# - Mail server
# - Development
```

## 🛠️ Software Installation

### Installing from Repositories

```bash
# Install single package
sudo apt install firefox

# Install multiple packages
sudo apt install git vim curl

# Install specific version
sudo apt install firefox=version

# Install with dependencies
sudo apt install --install-suggests package-name
```

### Installing .deb Files

```bash
# Install downloaded .deb file
sudo dpkg -i package.deb

# Fix broken dependencies
sudo apt install -f

# Alternative method
sudo apt install ./package.deb
```

### Installing from Source

```bash
# Install build tools
sudo apt install build-essential

# Download source
apt source package-name

# Build dependencies
sudo apt build-dep package-name

# Compile and install
./configure
make
sudo make install
```

## 🔧 Repository Management

### Sources List

```bash
# Edit sources list
sudo nano /etc/apt/sources.list

# Example entries:
deb http://deb.debian.org/debian trixie main contrib non-free non-free-firmware
deb-src http://deb.debian.org/debian trixie main contrib non-free non-free-firmware
```

### Adding Third-Party Repositories

```bash
# Add repository key
wget -qO- https://example.com/key.gpg | sudo apt-key add -

# Add repository
echo "deb https://example.com/repo stable main" | sudo tee /etc/apt/sources.list.d/example.list

# Update package list
sudo apt update
```

### Repository Components

| Component | Description | License |
|-----------|-------------|---------|
| **main** | Free software officially supported | DFSG-compliant |
| **contrib** | Free software depending on non-free | DFSG-compliant |
| **non-free** | Proprietary software | Non-free |
| **non-free-firmware** | Hardware firmware | Non-free |

## 📊 Package Status and Maintenance

### System Maintenance

```bash
# Clean package cache
sudo apt clean

# Remove unnecessary packages
sudo apt autoremove

# Remove orphaned packages
sudo apt autoremove --purge

# Fix broken packages
sudo apt install -f

# Reconfigure packages
sudo dpkg-reconfigure package-name
```

### Package Holds

```bash
# Hold package (prevent updates)
sudo apt-mark hold package-name

# Unhold package
sudo apt-mark unhold package-name

# Show held packages
apt-mark showhold
```

### Package Pinning

```bash
# Create preferences file
sudo nano /etc/apt/preferences.d/pin-package

# Example pinning configuration:
Package: firefox
Pin: version 91.*
Pin-Priority: 1001
```

## 🌐 Alternative Package Managers

### Flatpak

```bash
# Install Flatpak
sudo apt install flatpak

# Add Flathub repository
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo

# Install application
flatpak install flathub org.mozilla.firefox

# Run application
flatpak run org.mozilla.firefox

# Update Flatpaks
flatpak update
```

### Snap

```bash
# Install Snap
sudo apt install snapd

# Install snap package
sudo snap install package-name

# List installed snaps
snap list

# Update snaps
sudo snap refresh
```

### AppImage

```bash
# Download AppImage
wget https://example.com/application.AppImage

# Make executable
chmod +x application.AppImage

# Run application
./application.AppImage

# Optional: Install AppImageLauncher
sudo apt install appimagelauncher
```

## 🔐 Package Security

### Package Verification

```bash
# Verify package integrity
apt-cache policy package-name

# Check package signatures
apt-key list

# Verify installed packages
debsums -c
```

### Security Updates

```bash
# Install security updates only
sudo apt install unattended-upgrades

# Configure automatic updates
sudo dpkg-reconfigure unattended-upgrades

# Manual security update
sudo apt upgrade -s | grep -i security
```

## 🛡️ Backups and Recovery

### Package Selection Backup

```bash
# Save package list
dpkg --get-selections > packages.txt

# Restore packages
sudo dpkg --set-selections < packages.txt
sudo apt-get dselect-upgrade
```

### APT Configuration Backup

```bash
# Backup APT configuration
sudo tar -czf apt-backup.tar.gz /etc/apt/

# Restore configuration
sudo tar -xzf apt-backup.tar.gz -C /
```

## 📈 Advanced Package Management

### Package Building

```bash
# Install build tools
sudo apt install devscripts build-essential

# Create package directory
mkdir my-package
cd my-package

# Initialize package
dh_make --createorig

# Build package
debuild -us -uc
```

### Virtual Packages

```bash
# List virtual packages
apt-cache showpkg virtual-package

# Find providers
apt-cache show mail-transport-agent

# Install virtual package
sudo apt install text-editor
```

### Package Dependencies

```bash
# Show dependencies
apt depends package-name

# Show reverse dependencies
apt rdepends package-name

# Check for conflicts
apt install --dry-run package-name
```

## 🔍 Troubleshooting

### Common Issues

```bash
# Fix broken packages
sudo apt --fix-broken install

# Clear package cache
sudo apt clean && sudo apt autoclean

# Reset package database
sudo rm /var/lib/apt/lists/*
sudo apt update

# Force package reinstallation
sudo apt install --reinstall package-name
```

### Package Conflicts

```bash
# Identify conflicting packages
apt list --upgradable

# Resolve conflicts
sudo apt full-upgrade

# Force package removal
sudo dpkg --remove --force-remove-reinstreq package-name
```

## 📚 Package Management Tools

### Graphical Tools

```bash
# GNOME Software Center
sudo apt install gnome-software

# Synaptic Package Manager
sudo apt install synaptic

# KDE Discover
sudo apt install plasma-discover
```

### Command Line Tools

```bash
# Aptitude (alternative to apt)
sudo apt install aptitude

# Package information tools
sudo apt install apt-file

# Update apt-file database
sudo apt-file update

# Find files in packages
apt-file search filename
```

## 📊 Performance Optimization

### Faster Downloads

```bash
# Use apt-fast for parallel downloads
sudo apt install apt-fast

# Configure mirror selection
sudo apt install netselect-apt
sudo netselect-apt
```

### Local Package Cache

```bash
# Set up apt-cacher-ng
sudo apt install apt-cacher-ng

# Configure clients to use cache
echo 'Acquire::http::Proxy "http://cache-server:3142";' | sudo tee /etc/apt/apt.conf.d/01proxy
```

## 📚 Related Resources

- [System Configuration](/en/basics/configuration) - Configure your system
- [Software Installation](/en/applications/index) - Application guides
- [Security Settings](/en/administration/security) - System security
- [Troubleshooting](/en/troubleshooting/faq) - Common problems

**Package management mastered?** [Explore user management →](/en/administration/users) 