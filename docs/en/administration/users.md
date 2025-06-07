---
title: User Management
description: Manage users, groups, and permissions in Debian 13
---

# User Management

Learn how to create, manage, and secure user accounts in Debian 13.

## 👤 User Account Management

### Creating Users

```bash
# Add new user
sudo adduser username

# Add user with home directory
sudo useradd -m username

# Set password
sudo passwd username

# Add user with specific shell
sudo useradd -m -s /bin/bash username
```

### User Information

```bash
# List all users
cut -d: -f1 /etc/passwd

# Show user details
id username

# Display user info
finger username

# Last login information
lastlog
```

## 👥 Group Management

### Working with Groups

```bash
# Create new group
sudo groupadd groupname

# Add user to group
sudo usermod -aG groupname username

# Remove user from group
sudo gpasswd -d username groupname

# List user groups
groups username

# List all groups
cut -d: -f1 /etc/group
```

### System Groups

| Group | Purpose |
|-------|---------|
| **sudo** | Administrative privileges |
| **audio** | Audio device access |
| **video** | Video device access |
| **plugdev** | USB device access |
| **netdev** | Network management |

## 🔐 Sudo Configuration

### Managing Sudo Access

```bash
# Edit sudoers file
sudo visudo

# Add user to sudo group
sudo usermod -aG sudo username

# Check sudo access
sudo -l

# Run command as another user
sudo -u username command
```

### Sudo Rules

```bash
# Example sudoers entries:
username ALL=(ALL:ALL) ALL
%group ALL=(ALL) NOPASSWD: /specific/command

# Sudo timeout configuration
Defaults timestamp_timeout=15
```

## 🏠 Home Directory Management

### Directory Setup

```bash
# Create user home directory
sudo mkhomedir_helper username

# Copy skeleton files
sudo cp -r /etc/skel/. /home/username/

# Set ownership
sudo chown -R username:username /home/username
```

### User Profiles

```bash
# Bash profile files
~/.bashrc      # Interactive shell configuration
~/.profile     # Login shell configuration
~/.bash_logout # Logout actions

# Example .bashrc additions:
alias ll='ls -la'
export EDITOR=nano
```

## 🔒 Password Management

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

### Password Aging

```bash
# Set password expiry
sudo chage -M 90 username

# View password aging info
sudo chage -l username

# Force password change
sudo chage -d 0 username

# Account expiry
sudo chage -E 2024-12-31 username
```

## 🛡️ Account Security

### Account Locking

```bash
# Lock user account
sudo usermod -L username

# Unlock user account
sudo usermod -U username

# Disable account (no login)
sudo usermod -s /usr/sbin/nologin username

# Check account status
sudo passwd -S username
```

### SSH Key Management

```bash
# Generate SSH key pair
ssh-keygen -t rsa -b 4096

# Copy public key to server
ssh-copy-id username@server

# Add key to authorized_keys
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys

# Set proper permissions
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

## 📁 File Permissions

### Basic Permissions

```bash
# Change file ownership
sudo chown user:group filename

# Change permissions
chmod 755 filename
chmod u+x filename

# View permissions
ls -la filename

# Default permissions
umask 022
```

### Access Control Lists (ACL)

```bash
# Install ACL tools
sudo apt install acl

# Set ACL
setfacl -m u:username:rw filename

# View ACL
getfacl filename

# Remove ACL
setfacl -x u:username filename
```

## 💼 User Environment

### Environment Variables

```bash
# System-wide variables
sudo nano /etc/environment

# User-specific variables
nano ~/.bashrc

# Example variables:
export PATH=$PATH:/custom/path
export EDITOR=nano
export BROWSER=firefox
```

### Desktop Settings

```bash
# Set default desktop
sudo update-alternatives --config x-session-manager

# User desktop configuration
~/.config/         # Modern applications
~/.local/share/    # User data

# GNOME settings
dconf dump / > settings-backup.dconf
dconf load / < settings-backup.dconf
```

## 🔄 User Migration

### Backup User Data

```bash
# Backup user account
sudo tar -czf user-backup.tar.gz /home/username

# Backup user configuration
sudo tar -czf config-backup.tar.gz \
  /home/username/.bashrc \
  /home/username/.profile \
  /home/username/.config
```

### User Transfer

```bash
# Export user info
getent passwd username > user-export.txt

# Create user on new system
sudo useradd -m -u $(id -u username) username

# Restore user data
sudo tar -xzf user-backup.tar.gz -C /
```

## 📊 User Monitoring

### Login Monitoring

```bash
# Show logged in users
who
w

# Login history
last
last username

# Failed login attempts
sudo lastb

# Login logs
sudo tail -f /var/log/auth.log
```

### Resource Usage

```bash
# Disk usage by user
sudo du -sh /home/*

# Process by user
ps aux | grep username

# User limits
ulimit -a

# Set resource limits
sudo nano /etc/security/limits.conf
```

## 🔧 Advanced User Management

### Bulk User Operations

```bash
# Create multiple users from file
while read username; do
  sudo adduser $username
done < userlist.txt

# Mass password reset
while read username; do
  echo "$username:newpassword" | sudo chpasswd
done < userlist.txt
```

### User Templates

```bash
# Customize /etc/skel for new users
sudo nano /etc/skel/.bashrc
sudo cp custom-files /etc/skel/

# All new users will inherit these files
```

## 🚀 Automation Scripts

### User Management Script

```bash
#!/bin/bash
# create-user.sh

read -p "Username: " username
read -s -p "Password: " password

sudo adduser --disabled-password --gecos "" $username
echo "$username:$password" | sudo chpasswd
sudo usermod -aG sudo,audio,video $username

echo "User $username created successfully"
```

## 📚 Related Resources

- [System Security](/en/administration/security) - Security configuration
- [Network Configuration](/en/administration/network) - Network access
- [Package Management](/en/administration/packages) - Software installation
- [System Configuration](/en/basics/configuration) - General setup

**User management configured?** [Set up network access →](/en/administration/network) 