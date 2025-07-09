---
title: File & Network Storage
description: Learn how to set up Samba and NFS on Debian for cross-platform file sharing and network storage solutions.
---

# File & Network Storage Guide: Configuring a Samba File Share

This guide will teach you how to install and configure **Samba** on your Debian server to create a powerful file server. Samba implements the SMB/CIFS protocol, which is the standard for network file sharing in Windows. This means you can easily allow Windows, macOS, and other Linux machines to access your shared files.

## Introduction to Samba

- **Cross-Platform Compatibility**: Perfectly integrates a Linux server into a Windows workgroup network.
- **Flexible Configuration**: You can create public, password-free anonymous shares, as well as private, secure shares that require user authentication.
- **More Than Just File Sharing**: Samba can also provide print services and network authentication (this guide focuses only on file sharing).

---

## Step 1: Install Samba

First, update your package list and install the Samba package.

```bash
sudo apt-get update
sudo apt-get install samba
```

Once the installation is complete, Samba's core services, `smbd` and `nmbd`, will start automatically.

---

## Step 2: Configure a Public Share

Let's start by creating a public share that anyone can access without a password.

### 2.1 Create the Share Directory

```bash
# Create the directory path
sudo mkdir -p /srv/samba/public

# Change the directory permissions to allow anyone to read and write
sudo chmod -R 777 /srv/samba/public
```

### 2.2 Edit the Samba Configuration File

Samba's main configuration file is `/etc/samba/smb.conf`. Before modifying it, let's make a backup.

```bash
sudo cp /etc/samba/smb.conf /etc/samba/smb.conf.bak
```

Now, open the configuration file with an editor:
```bash
sudo nano /etc/samba/smb.conf
```

At the very **bottom** of the file, add the following lines to define our public share:

```ini
[public]
    comment = Public Storage
    path = /srv/samba/public
    read only = no
    browsable = yes
    guest ok = yes
```
- `[public]`: This is the name of the share, which clients will use to access it.
- `comment`: A description of the share.
- `path`: The actual path to the shared directory on the server.
- `read only = no`: Allows users to write files.
- `browsable = yes`: Makes the share visible in network neighborhood browsing.
- `guest ok = yes`: Allows anonymous (guest) access.

### 2.3 Test Configuration and Restart Samba

Samba provides a tool to check if the configuration file syntax is correct.
```bash
testparm
```
If there are no errors, you will see a summary of your configuration. Press Enter to exit.

Now, restart the Samba services to apply the changes.
```bash
sudo systemctl restart smbd
sudo systemctl restart nmbd
```

---

## Step 3: Configure a Private Share

Next, let's create a private directory that requires a username and password to access.

### 3.1 Create the Share Directory and Group

```bash
# Create the private directory
sudo mkdir -p /srv/samba/private

# Create a group specifically for accessing the private share
sudo groupadd smbgroup

# Assign ownership of the directory to root and the new group
sudo chown root:smbgroup /srv/samba/private

# Set permissions so only the owner and group members can read, write, and execute
sudo chmod -R 770 /srv/samba/private
```

### 3.2 Create a Samba User

Samba maintains its own separate password database. You need to add an **existing system user** to Samba and set a specific password for Samba access.

Let's say you want to allow the system user `alan` to access the private share.
```bash
# Add the system user alan to the smbgroup
sudo usermod -aG smbgroup alan

# Set a Samba password for alan (this can be different from his system login password)
sudo smbpasswd -a alan
```
The system will prompt you to enter and confirm the new Samba password for `alan`.

### 3.3 Edit the Samba Configuration File

Open the configuration file again:
```bash
sudo nano /etc/samba/smb.conf
```
Append the following at the bottom of the file to define the private share:
```ini
[private]
    comment = Private Secure Storage
    path = /srv/samba/private
    read only = no
    browsable = yes
    valid users = @smbgroup
```
- `valid users = @smbgroup`: This is the key. The `@` symbol indicates a group. This line means only users belonging to the `smbgroup` can access this share.

### 3.4 Restart Samba

```bash
sudo systemctl restart smbd
sudo systemctl restart nmbd
```

---

## Step 4: Configure the Firewall

If you have a firewall running (like UFW), you need to allow Samba traffic.

```bash
sudo ufw allow samba
```

---

## Step 5: Connect from a Client

### From Windows:
Open File Explorer, type `\\<your_server_ip>` in the address bar, and press Enter. You should see the `public` and `private` folders.
- Clicking `public` will grant you immediate access.
- Clicking `private` will prompt for authentication. Enter the Samba username (e.g., `alan`) and the password you set to gain access.

### From macOS:
Open Finder, go to "Go" > "Connect to Server...", and enter `smb://<your_server_ip>`, then click Connect.

### From Linux:
In your file manager, there is usually an option to "Connect to Server". Enter `smb://<your_server_ip>`.

You have now successfully set up a file server on Debian that provides both public and private access! 