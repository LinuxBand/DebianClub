---
title: System Recovery
description: Recover your Debian 13 system from boot failures and critical errors
---

# System Recovery

Learn how to recover your Debian 13 system from various failures and restore functionality.

## 🆘 Boot Recovery

### GRUB Recovery

```bash
# Boot from GRUB rescue mode
grub> ls
grub> set root=(hd0,gpt2)
grub> linux /boot/vmlinuz root=/dev/sda2
grub> initrd /boot/initrd.img
grub> boot

# Reinstall GRUB
sudo grub-install /dev/sda
sudo update-grub
```

### Single User Mode

```bash
# Boot to single user mode
# At GRUB, press 'e' and add 'single' to kernel line
# Or add 'init=/bin/bash'

# Remount root as writable
mount -o remount,rw /

# Fix issues and reboot
reboot
```

## 💾 File System Recovery

### Check and Repair File Systems

```bash
# Check file system (unmount first)
sudo umount /dev/sda1
sudo fsck /dev/sda1

# Force check
sudo fsck -f /dev/sda1

# Automatic repair
sudo fsck -y /dev/sda1
```

### Recovery from Live USB

```bash
# Boot from Live USB
# Mount damaged system
sudo mount /dev/sda2 /mnt
sudo mount /dev/sda1 /mnt/boot/efi

# Chroot into system
sudo chroot /mnt

# Perform repairs
apt update
apt install --reinstall grub-efi
update-grub

# Exit and reboot
exit
sudo umount /mnt/boot/efi
sudo umount /mnt
reboot
```

## 🔧 System Repair

### Package System Recovery

```bash
# Fix broken packages
sudo apt --fix-broken install

# Reconfigure packages
sudo dpkg-reconfigure -a

# Reinstall critical packages
sudo apt install --reinstall systemd
```

### User Access Recovery

```bash
# Reset user password from recovery mode
passwd username

# Fix sudo access
usermod -aG sudo username

# Reset permissions
chown -R username:username /home/username
```

## 📚 Related Resources

- [Installation Issues](/en/troubleshooting/installation-issues) - Installation problems
- [FAQ](/en/troubleshooting/faq) - Common questions
- [System Configuration](/en/basics/configuration) - System setup

**System recovered?** [Return to normal operation →](/en/basics/first-boot) 