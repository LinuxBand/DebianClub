---
title: Server Security Hardening Guide
description: Learn the fundamentals of securing your Debian server, covering user management, SSH hardening, firewall configuration, and automatic security updates.
---

# Basic Server Security Hardening Guide

This guide provides a series of fundamental yet crucial steps to harden your Debian server against common network threats. Security is an ongoing process, but completing these initial steps will significantly improve your server's security baseline.

## Core Security Principles

- **Principle of Least Privilege**: Grant users and programs only the minimum permissions necessary to complete their tasks.
- **Defense in Depth**: Establish multiple layers of security, so if one layer is breached, others can still provide protection.
- **Stay Updated**: Promptly applying security patches is the most effective way to defend against known vulnerabilities.
- **Regular Audits**: Periodically check system logs and configurations to identify potential security issues.

---

## Step 1: User Account Security

Never use the `root` user for daily operations. The first step should always be to create a regular user with `sudo` privileges.

### 1.1 Create a New User

Replace `your_username` with the username you want to use.

```bash
adduser your_username
```
The system will prompt you to set a password and other information.

### 1.2 Grant sudo Privileges

Add the newly created user to the `sudo` group so they can execute administrative commands.

```bash
usermod -aG sudo your_username
```

Now, **log out of the `root` account and log in with your new user account** to continue with all subsequent steps.

---

## Step 2: Harden the SSH Service

SSH is the primary entry point for remotely managing your server, so protecting it is critical.

### 2.1 Disable Root Remote Login

This prevents attackers from directly trying to brute-force the `root` account.

Edit the SSH configuration file:
```bash
sudo nano /etc/ssh/sshd_config
```

Find the `PermitRootLogin` line and modify or add it as follows:
```
PermitRootLogin no
```

### 2.2 (Recommended) Disable Password Authentication

Using SSH key pairs for authentication is much more secure than using passwords.

**On your local computer** (not the server), generate an SSH key pair:
```bash
ssh-keygen -t rsa -b 4096
```

Copy your public key to the server:
```bash
# Replace your_username and your_server_ip with actual values
ssh-copy-id your_username@your_server_ip
```

After the public key is successfully uploaded, edit the SSH configuration file on the server again:
```bash
sudo nano /etc/ssh/sshd_config
```

Find the `PasswordAuthentication` line and change it to:
```
PasswordAuthentication no
```

### 2.3 Restart the SSH Service

Apply all changes.
```bash
sudo systemctl restart sshd
```
**Important**: Before disconnecting your current session, **open a new terminal window** and try to log in with the new configuration (and your SSH key) to ensure everything works. Otherwise, you might lock yourself out of the server.

---

## Step 3: Configure the UFW Firewall

UFW (Uncomplicated Firewall) is a user-friendly frontend for `iptables`.

### 3.1 Install UFW

```bash
sudo apt-get update
sudo apt-get install ufw
```

### 3.2 Set Default Rules

Typically, we deny all incoming connections by default and allow all outgoing connections.

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
```

### 3.3 Allow Necessary Services

Before enabling the firewall, you must allow SSH connections, or you will be disconnected.

```bash
# Allow standard SSH (port 22)
sudo ufw allow ssh

# If you changed the SSH port to a non-standard one (e.g., 2222), use:
# sudo ufw allow 2222/tcp

# Also allow HTTP and HTTPS traffic
sudo ufw allow http
sudo ufw allow https
```

### 3.4 Enable the Firewall

```bash
sudo ufw enable
```
The system will warn you that this might disrupt existing connections. Enter `y` to continue.

### 3.5 Check Firewall Status

```bash
sudo ufw status verbose
```

---

## Step 4: Automatic Security Updates

Ensure your system automatically installs the latest security patches.

### 4.1 Install unattended-upgrades

```bash
sudo apt-get install unattended-upgrades apt-listchanges
```

### 4.2 Enable Automatic Updates

Run the configuration wizard:
```bash
sudo dpkg-reconfigure -plow unattended-upgrades
```
In the interactive interface that appears, select "Yes" to enable automatic updates.

This will create the correct configuration in the `/etc/apt/apt.conf.d/20auto-upgrades` file.

---

## Step 5: Prevent Brute-Force Attacks with Fail2Ban

Fail2Ban scans log files and automatically bans IP addresses that exhibit malicious behavior (like multiple failed password attempts).

### 5.1 Install Fail2Ban

```bash
sudo apt-get install fail2ban
```

### 5.2 Create a Local Configuration File

Do not directly modify `jail.conf`. You should create a local copy, `jail.local`, to override the default settings.

```bash
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
```

### 5.3 Configure SSH Protection

Open `jail.local` with an editor:
```bash
sudo nano /etc/fail2ban/jail.local
```
Find the `[sshd]` section and ensure it is enabled (`enabled = true`). You can adjust `maxretry` (maximum attempts) and `bantime` (ban duration) as needed.
```
[sshd]
enabled = true
port    = ssh
maxretry = 5
bantime  = 1h
```

### 5.4 Restart Fail2Ban

```bash
sudo systemctl restart fail2ban
```

Now, Fail2Ban will silently protect your SSH service in the background. 