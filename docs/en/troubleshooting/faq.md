---
title: Frequently Asked Questions
description: Common questions and answers about Debian 13 installation, configuration, and usage
---

# Frequently Asked Questions

Quick answers to the most common Debian 13 questions.

## 🚀 Installation Questions

### Q: Which Debian 13 image should I download?

**A:** For most users, the **DVD-1** image is recommended as it contains a complete desktop environment and can install offline. If you have fast internet, the **netinst** image is smaller and downloads the latest packages during installation.

### Q: Can I install Debian alongside Windows?

**A:** Yes! Debian supports dual-boot installations. The installer can automatically resize Windows partitions to make space for Debian, or you can manually partition your drive.

### Q: My WiFi doesn't work during installation. What should I do?

**A:** Download the **firmware** version of Debian 13 which includes non-free drivers, or use an ethernet connection during installation and install WiFi drivers afterward.

### Q: How much disk space do I need?

**A:** Minimum 10GB, but 20GB+ is recommended for a comfortable desktop installation with room for your files and applications.

## 🖥️ Hardware Compatibility

### Q: Will Debian work on my old computer?

**A:** Debian supports a wide range of hardware. For computers older than 10 years, consider using the **i386** (32-bit) version or a lightweight desktop environment like **Xfce** or **LXDE**.

### Q: My graphics card isn't working properly. Help!

**A:** For NVIDIA cards, install the `nvidia-driver` package. For AMD cards, the open-source drivers work well out of the box. You can also try booting with `nomodeset` parameter for troubleshooting.

### Q: Can I run Debian on Apple Silicon Macs?

**A:** Debian has experimental support for Apple Silicon (M1/M2) Macs through the **arm64** architecture, but compatibility is limited. Consider using virtualization software for better compatibility.

## 📦 Software and Packages

### Q: How do I install software in Debian?

**A:** Use the `apt` package manager:
```bash
sudo apt update                    # Update package list
sudo apt install package-name     # Install software
sudo apt search keyword           # Search for software
```

### Q: Can I install .deb files from other distributions?

**A:** Generally not recommended. Debian packages are specifically built for Debian. Installing packages from Ubuntu or other distributions may cause conflicts.

### Q: How do I enable non-free software?

**A:** Edit `/etc/apt/sources.list` and add `contrib non-free non-free-firmware` to your repository lines, then run `sudo apt update`.

### Q: What's the difference between Stable, Testing, and Unstable?

**A:** 
- **Stable**: Rock-solid, older packages, perfect for servers
- **Testing**: Newer packages, good balance of stability and features
- **Unstable**: Latest packages, may have bugs, for experienced users

## 🔧 System Configuration

### Q: How do I change my desktop environment?

**A:** Install a new desktop environment (e.g., `sudo apt install kde-desktop`) and select it at the login screen, or use `sudo dpkg-reconfigure gdm3` to change the default.

### Q: My system is slow. How can I improve performance?

**A:** 
- Disable unnecessary startup services
- Use a lighter desktop environment (Xfce, LXDE)
- Add more RAM if possible
- Use an SSD for storage
- Disable visual effects

### Q: How do I set up printing?

**A:** Install CUPS: `sudo apt install cups printer-driver-all`. Access the web interface at `http://localhost:631` to configure printers.

## 🌐 Network and Internet

### Q: How do I connect to WiFi from the command line?

**A:** Use NetworkManager:
```bash
nmcli dev wifi list              # List networks
nmcli dev wifi connect "SSID" password "password"
```

### Q: My internet is slow in Debian. Why?

**A:** 
- Check if you're using the correct WiFi drivers
- Try different DNS servers (8.8.8.8, 1.1.1.1)
- Disable IPv6 if causing issues
- Check network adapter power management settings

### Q: How do I configure a static IP address?

**A:** Edit `/etc/network/interfaces` or use NetworkManager's GUI. For modern systems, use `nmcli` or the network settings in your desktop environment.

## 🔐 Security and Updates

### Q: How do I keep my system updated?

**A:** Run these commands regularly:
```bash
sudo apt update && sudo apt upgrade    # Update all packages
sudo apt full-upgrade                  # Major upgrades
sudo apt autoremove                    # Remove unneeded packages
```

### Q: Do I need antivirus software?

**A:** Linux is naturally more secure, but you can install `clamav` if desired. Good security practices (regular updates, careful with downloads) are more important.

### Q: How do I configure the firewall?

**A:** Debian uses UFW (Uncomplicated Firewall):
```bash
sudo ufw enable                    # Enable firewall
sudo ufw allow ssh                 # Allow SSH
sudo ufw status                    # Check status
```

## 🎯 Desktop and Applications

### Q: Where can I find software to install?

**A:** 
- Use the software center in your desktop environment
- Browse packages at https://packages.debian.org
- Install Flatpak for additional applications
- Use Snap packages (install `snapd` first)

### Q: Can I run Windows programs on Debian?

**A:** Use **Wine** to run many Windows applications, or consider virtualization software like **VirtualBox** for running Windows in a virtual machine.

### Q: How do I play multimedia files?

**A:** Install multimedia codecs:
```bash
sudo apt install vlc
sudo apt install ubuntu-restricted-extras  # Or debian-multimedia packages
```

## 🛠️ Troubleshooting

### Q: My system won't boot after an update. Help!

**A:** 
1. Boot from a previous kernel version in GRUB
2. Use recovery mode to fix issues
3. Boot from Live USB and chroot to repair
4. Check `/var/log/dpkg.log` for failed packages

### Q: I accidentally deleted important files. Can I recover them?

**A:** 
- Stop using the system immediately
- Boot from Live USB
- Use `testdisk` or `photorec` for file recovery
- For the future, set up regular backups

### Q: How do I reset my password?

**A:** 
1. Boot into recovery mode from GRUB
2. Select "Drop to root shell prompt"
3. Run: `passwd username`
4. Reboot normally

## 🏢 Advanced Usage

### Q: Can I use Debian as a server?

**A:** Absolutely! Debian is excellent for servers. Install the minimal system and add only what you need. Consider using Debian Stable for maximum reliability.

### Q: How do I set up SSH access?

**A:** 
```bash
sudo apt install openssh-server
sudo systemctl enable ssh
sudo systemctl start ssh
```

### Q: Can I upgrade from Debian 12 to 13?

**A:** Yes, but wait for the official upgrade guide. Generally involves updating `/etc/apt/sources.list` and running `apt update && apt full-upgrade`.

## 📱 Mobile and Cloud

### Q: Can I sync my files with cloud services?

**A:** Yes! Install clients for:
- **Nextcloud**: Native Linux client
- **Dropbox**: Official client available
- **Google Drive**: Use `rclone` or third-party clients
- **OneDrive**: Use `onedrive` or web interface

### Q: How do I access my Android device?

**A:** Install `mtp-tools` and `jmtpfs` for MTP support, or use `adb` for developer access.

## 🆘 Getting More Help

### Q: Where can I get help if these FAQs don't solve my problem?

**A:** 
- **Official Documentation**: https://www.debian.org/doc/
- **Community Forums**: https://forums.debian.org
- **IRC Channel**: #debian on OFTC network
- **Mailing Lists**: debian-user@lists.debian.org
- **Reddit**: r/debian
- **Stack Overflow**: Use 'debian' tag

### Q: How can I contribute to Debian?

**A:** 
- Report bugs through the Bug Tracking System
- Translate documentation
- Package software
- Write documentation
- Donate to the Debian project
- Help other users in forums

## 📚 Related Resources

- [Installation Guide](/en/basics/installation) - Complete installation instructions
- [First Boot Setup](/en/basics/first-boot) - Initial configuration
- [Package Management](/en/administration/packages) - Managing software
- [System Configuration](/en/basics/configuration) - Customize your system

**Need more specific help?** [Check our troubleshooting guides →](/en/troubleshooting/installation-issues) 