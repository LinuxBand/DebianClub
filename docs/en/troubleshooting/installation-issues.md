---
title: Installation Troubleshooting
description: Solutions for common Debian 13 installation problems including hardware compatibility, partitioning, and boot issues
---

# Installation Troubleshooting

Comprehensive solutions for common issues during Debian 13 installation.

## 🚫 Boot Problems

### Cannot Boot from USB

::: details 🔍 Solutions
```bash
# Check these items:
1. BIOS/UEFI Settings
   - Enable USB Boot
   - Disable Secure Boot
   - Disable Fast Boot
   - Adjust boot order

2. USB Drive Issues
   - Recreate boot drive
   - Use different creation tool
   - Verify ISO integrity
   - Try different USB ports

3. Hardware Compatibility
   - Check minimum requirements
   - Update BIOS firmware
   - Remove unnecessary hardware
```
:::

### Black Screen or Graphics Issues

::: details 🖥️ Display Problems
```bash
# Boot parameter adjustments:
1. Press 'e' at GRUB menu
2. Add to linux line:
   nomodeset                    # Disable graphics drivers
   acpi=off                     # Disable ACPI
   noapic                       # Disable APIC
   vga=normal                   # Standard VGA mode

# Safe Graphics Mode:
3. Select "Advanced options"
4. Choose "Safe graphics mode"
```
:::

## 🔧 Hardware Compatibility

### Network Card Not Recognized

::: details 🌐 Network Hardware Issues
```bash
# Check network information:
lspci | grep -i network
lsusb | grep -i wireless

# Common solutions:
1. Use wired connection for installation
2. Download non-free firmware image
3. Manual driver installation:
   # Download firmware-linux-nonfree
   # Place in /firmware directory

# Post-installation driver setup:
sudo apt update
sudo apt install firmware-linux-nonfree
sudo apt install firmware-realtek
sudo apt install firmware-iwlwifi
```
:::

### Audio Driver Issues

::: details 🔊 Sound Device Problems
```bash
# Check audio devices:
lspci | grep -i audio
aplay -l

# Install audio drivers:
sudo apt install alsa-utils pulseaudio
sudo apt install firmware-sof-signed

# Configure audio:
alsamixer                     # Adjust volume
pulseaudio --start           # Start audio service
```
:::

## 💾 Disk and Partitioning Issues

### Hard Drive Not Detected

::: details 🗄️ Storage Device Issues
```bash
# Check disks:
sudo fdisk -l
lsblk
dmesg | grep -i sata

# Common causes and solutions:
1. SATA Mode Settings
   - Change SATA mode to AHCI in BIOS
   - Avoid RAID mode

2. Hardware Connections
   - Check SATA data cables
   - Verify power connections
   - Try different SATA ports

3. Drive Compatibility
   - Some NVMe drives need BIOS updates
   - Check drive health status
```
:::

### Partition Table Errors

::: details ⚠️ Partition Repair
```bash
# Check partition table:
sudo parted /dev/sda print

# Repair GPT partition table:
sudo gdisk /dev/sda
# Select r (recovery)
# Select d (use main GPT header)
# Select w (write table)

# Repair MBR partition table:
sudo fdisk /dev/sda
# Press w to write new partition table
```
:::

### UEFI Boot Issues

::: details 🔧 UEFI Repair
```bash
# Manual EFI partition creation:
1. Create FAT32 partition (200-500MB)
2. Set boot and esp flags
3. Mount to /boot/efi

# Repair GRUB:
sudo mount /dev/sda1 /boot/efi
sudo grub-install --target=x86_64-efi --efi-directory=/boot/efi
sudo update-grub
```
:::

## 🔧 Installation Process Issues

### Package Download Failures

::: details 📦 Network and Repository Issues
```bash
# Check network connection:
ping google.com
ping deb.debian.org

# Change mirror sites:
1. Select nearest mirror
2. Use local mirrors:
   - US: ftp.us.debian.org
   - Europe: ftp.de.debian.org
   - Asia: ftp.jp.debian.org

# Manual network configuration:
sudo dhclient eth0              # DHCP
sudo ip addr add 192.168.1.100/24 dev eth0  # Static IP
sudo ip route add default via 192.168.1.1
```
:::

### Insufficient Disk Space

::: details 💾 Space Management
```bash
# Check disk usage:
df -h
du -sh /*

# Free up space:
sudo apt clean                 # Clean package cache
sudo apt autoremove            # Remove unneeded packages
sudo rm -rf /var/cache/apt/archives/*

# Resize partitions:
sudo resize2fs /dev/sda1       # Expand partition
```
:::

### Time Zone and Clock Issues

::: details 🕐 Time Synchronization
```bash
# Set timezone:
sudo timedatectl set-timezone America/New_York

# Sync time:
sudo ntpdate pool.ntp.org
sudo systemctl enable systemd-timesyncd

# Fix dual-boot time issues:
sudo timedatectl set-local-rtc 1 --adjust-system-clock
```
:::

## 🖥️ Desktop Environment Issues

### Desktop Won't Start

::: details 🎨 Desktop Repair
```bash
# Check display manager:
sudo systemctl status gdm3
sudo systemctl status lightdm

# Reconfigure display manager:
sudo dpkg-reconfigure gdm3
sudo systemctl restart gdm3

# Install missing components:
sudo apt install --reinstall gnome-core
sudo apt install xorg

# Start desktop manually:
startx
```
:::

### Resolution Problems

::: details 📺 Display Settings
```bash
# View available resolutions:
xrandr

# Set resolution:
xrandr --output HDMI-1 --mode 1920x1080

# Add custom resolution:
cvt 1920 1080
xrandr --newmode "1920x1080_60.00" ...
xrandr --addmode HDMI-1 1920x1080_60.00
```
:::

## 🔍 Diagnostic Tools

### System Information Collection

```bash
# Hardware information:
sudo lshw -short
lspci -v
lsusb -v
cat /proc/cpuinfo
free -h

# Boot logs:
dmesg | less
journalctl -b
sudo tail -f /var/log/syslog

# Network diagnostics:
ip addr show
ip route show
cat /etc/resolv.conf
```

### Memory Testing

```bash
# Using memtest86+:
1. Select memory test from GRUB menu
2. Or download memtest86+ ISO
3. Run complete test (may take hours)

# System memory check:
sudo apt install memtester
sudo memtester 1024 1    # Test 1GB memory
```

## 🆘 Emergency Recovery

### Rescue Mode

```bash
# Boot to rescue mode:
1. Select "Advanced options" in GRUB
2. Choose "recovery mode"
3. Select "Drop to root shell prompt"

# Mount filesystems:
mount -o remount,rw /
mount -a

# Repair boot loader:
sudo update-grub
sudo grub-install /dev/sda
```

### Live USB Recovery

```bash
# Using Live USB to repair:
1. Boot from Live USB
2. Mount installed system:
   sudo mount /dev/sda2 /mnt
   sudo mount /dev/sda1 /mnt/boot/efi
   
3. Chroot into system:
   sudo chroot /mnt
   
4. Perform repair operations
5. Exit and reboot
```

## 📞 Getting Help

### Log File Locations

```bash
# Important log files:
/var/log/dpkg.log           # Package management log
/var/log/apt/history.log    # APT operation history
/var/log/Xorg.0.log         # X server log
/var/log/installer/         # Installation logs
~/.xsession-errors          # Desktop session errors
```

### Community Support

::: info 💬 Get Help
- **Official Forums**: forums.debian.org
- **Mailing Lists**: debian-user@lists.debian.org
- **IRC Channel**: #debian on OFTC
- **Reddit**: r/debian
- **Stack Overflow**: Use 'debian' tag
:::

## 📚 Related Resources

1. [BIOS Settings](/en/basics/bios-settings) - Boot configuration
2. [Create Boot Media](/en/basics/bootable-media) - Installation media
3. [System Recovery](/en/troubleshooting/recovery) - Disaster recovery
4. [FAQ](/en/troubleshooting/faq) - Frequently asked questions

**Installation issues resolved?** [Continue with first boot →](/en/basics/first-boot) 