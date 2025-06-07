---
title: Security Configuration
description: Secure your Debian 13 system with proper security configurations and best practices
---

# Security Configuration

Implement essential security measures to protect your Debian 13 system from threats.

## 🔐 User Security

### Password Policies

```bash
# Install password quality tools
sudo apt install libpam-pwquality

# Configure password requirements
sudo nano /etc/security/pwquality.conf

# Example settings:
minlen = 12
minclass = 3
maxrepeat = 2
```

### SSH Security

```bash
# Configure SSH
sudo nano /etc/ssh/sshd_config

# Recommended settings:
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
Port 2222

# Restart SSH
sudo systemctl restart sshd
```

## 🛡️ System Hardening

### Firewall Configuration

```bash
# Enable UFW firewall
sudo ufw enable

# Basic rules
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh

# Check status
sudo ufw status verbose
```

### File Permissions

```bash
# Set secure permissions
sudo chmod 644 /etc/passwd
sudo chmod 600 /etc/shadow
sudo chmod 644 /etc/group

# Find SUID files
find / -perm -4000 -type f 2>/dev/null
```

## 🔄 System Updates

### Automatic Security Updates

```bash
# Install unattended upgrades
sudo apt install unattended-upgrades

# Configure automatic updates
sudo dpkg-reconfigure unattended-upgrades

# Check configuration
sudo nano /etc/apt/apt.conf.d/50unattended-upgrades
```

## 🔍 Security Monitoring

### Log Monitoring

```bash
# Check authentication logs
sudo tail -f /var/log/auth.log

# Failed login attempts
sudo lastb

# Monitor system logs
sudo journalctl -f
```

### Security Tools

```bash
# Install security tools
sudo apt install fail2ban chkrootkit rkhunter

# Configure fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

## 📚 Related Resources

- [User Management](/en/administration/users) - User account security
- [Network Configuration](/en/administration/network) - Network security
- [Package Management](/en/administration/packages) - Software security
- [System Configuration](/en/basics/configuration) - General setup

**Security configured?** [Monitor system performance →](/en/troubleshooting/performance) 