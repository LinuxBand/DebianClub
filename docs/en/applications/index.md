---
title: Applications Guide
description: Discover and install applications for Debian 13 - office, development, entertainment, and more
---

# Applications Guide

Explore the vast world of applications available for Debian 13, from productivity tools to entertainment software.

## 📱 Application Categories

### 🏢 Office & Productivity

Professional applications for work and productivity.

- **LibreOffice** - Complete office suite
- **OnlyOffice** - Modern office applications
- **GIMP** - Image editing
- **Thunderbird** - Email client

```bash
# Install office applications
sudo apt install libreoffice
sudo apt install thunderbird
sudo apt install gimp
```

### 💻 Development Tools

Tools for programmers and developers.

- **Visual Studio Code** - Modern code editor
- **Git** - Version control
- **Docker** - Containerization
- **IDEs** - Various development environments

```bash
# Install development tools
sudo apt install git curl wget
sudo apt install build-essential
sudo apt install code  # VS Code from repository
```

### 🎮 Entertainment & Media

Games and multimedia applications.

- **Steam** - Gaming platform
- **VLC** - Media player
- **Audacity** - Audio editing
- **Blender** - 3D modeling

```bash
# Install multimedia applications
sudo apt install vlc
sudo apt install audacity
sudo apt install blender
```

### 🌐 Internet & Communication

Web browsers and communication tools.

- **Firefox** - Web browser (default)
- **Chromium** - Open-source browser
- **Discord** - Chat application
- **Telegram** - Messaging

```bash
# Install browsers and communication
sudo apt install firefox-esr
sudo apt install chromium
```

## 📦 Installation Methods

### APT Package Manager

```bash
# Update package list
sudo apt update

# Install application
sudo apt install application-name

# Search for applications
apt search keyword
```

### Flatpak Applications

```bash
# Install Flatpak
sudo apt install flatpak

# Add Flathub repository
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo

# Install application
flatpak install flathub app.name
```

### Snap Packages

```bash
# Install Snap
sudo apt install snapd

# Install snap application
sudo snap install application-name
```

## 🔍 Finding Applications

### Package Repositories

- **Debian Repositories** - Official packages
- **Flathub** - Flatpak applications
- **Snap Store** - Snap packages
- **AppImage** - Portable applications

### Graphical Software Centers

```bash
# GNOME Software
sudo apt install gnome-software

# KDE Discover
sudo apt install plasma-discover

# Synaptic Package Manager
sudo apt install synaptic
```

## 🎯 Recommended Applications

### Essential Applications

| Category | Application | Description |
|----------|-------------|-------------|
| **Text Editor** | gedit, nano, vim | Text editing |
| **File Manager** | Nautilus, Dolphin | File management |
| **Terminal** | GNOME Terminal | Command line |
| **Archive Manager** | File Roller | Extract/create archives |

### Popular Choices

```bash
# Productivity
sudo apt install firefox thunderbird libreoffice

# Development
sudo apt install git vim code

# Multimedia
sudo apt install vlc gimp audacity

# System tools
sudo apt install htop neofetch
```

## 📚 Related Resources

- [Package Management](/en/administration/packages) - Installing software
- [Desktop Environments](/en/basics/desktop-environments) - Interface options
- [System Configuration](/en/basics/configuration) - Customize your system
- [First Boot Setup](/en/basics/first-boot) - Initial configuration

**Ready to explore?** [Learn package management →](/en/administration/packages) 