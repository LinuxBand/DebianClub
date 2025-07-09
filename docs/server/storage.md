---
title: 文件与网络存储
description: 了解如何在 Debian 上设置 Samba 和 NFS，以实现跨平台的文件共享和网络存储解决方案。
---

# 文件与网络存储指南：配置 Samba 文件共享

本指南将教您如何在 Debian 服务器上安装和配置 **Samba**，从而创建一个功能强大的文件服务器。Samba 实现了 SMB/CIFS 协议，该协议是 Windows 网络文件共享的标准协议，这意味着您可以轻松地让 Windows、macOS 和其他 Linux 机器访问您的共享文件。

## Samba 简介

- **跨平台兼容**: 完美地将 Linux 服务器融入 Windows 工作网络。
- **灵活的配置**: 您可以创建公共的、无需密码的匿名共享，也可以创建需要用户认证的私有安全共享。
- **不仅仅是文件共享**: Samba 还能提供打印服务和网络认证等功能（本指南仅聚焦文件共享）。

---

## 步骤 1: 安装 Samba

首先，更新您的包列表并安装 Samba 软件包。

```bash
sudo apt-get update
sudo apt-get install samba
```

安装完成后，Samba 的核心服务 `smbd` 和 `nmbd` 会自动启动。

---

## 步骤 2: 配置一个公共共享目录

让我们先创建一个任何人都可以无需密码访问的公共共享目录。

### 2.1 创建共享文件夹

```bash
# 创建文件夹路径
sudo mkdir -p /srv/samba/public

# 更改文件夹权限，允许任何人读写
sudo chmod -R 777 /srv/samba/public
```

### 2.2 编辑 Samba 配置文件

Samba 的主配置文件是 `/etc/samba/smb.conf`。在修改前，我们先备份它。

```bash
sudo cp /etc/samba/smb.conf /etc/samba/smb.conf.bak
```

现在，使用编辑器打开配置文件：
```bash
sudo nano /etc/samba/smb.conf
```

在文件的**最底部**添加以下内容来定义我们的公共共享：

```ini
[public]
    comment = Public Storage
    path = /srv/samba/public
    read only = no
    browsable = yes
    guest ok = yes
```
- `[public]`: 这是共享的名称，客户端将通过这个名字访问。
- `comment`: 共享的描述。
- `path`: 共享目录在服务器上的实际路径。
- `read only = no`: 允许用户写入文件。
- `browsable = yes`: 允许在网络邻居中看到这个共享。
- `guest ok = yes`: 允许匿名（访客）访问。

### 2.3 检查配置并重启 Samba

Samba 提供了一个工具来检查配置文件的语法是否正确。
```bash
testparm
```
如果没有错误，您会看到配置摘要。按回车键退出。

现在，重启 Samba 服务以应用更改。
```bash
sudo systemctl restart smbd
sudo systemctl restart nmbd
```

---

## 步骤 3: 配置一个私有共享目录

接下来，我们创建一个需要用户名和密码才能访问的私有目录。

### 3.1 创建共享文件夹和用户组

```bash
# 创建私有文件夹
sudo mkdir -p /srv/samba/private

# 创建一个专门用于访问私有共享的用户组
sudo groupadd smbgroup

# 将文件夹的所有权赋予 root 和这个新组
sudo chown root:smbgroup /srv/samba/private

# 设置权限，只有所有者和组内成员可以读、写、执行
sudo chmod -R 770 /srv/samba/private
```

### 3.2 创建 Samba 用户

Samba 有自己独立的用户密码数据库。您需要将一个**已存在的系统用户**添加到 Samba 中，并为其设置一个专门用于 Samba 访问的密码。

假设您想让系统用户 `alan` 能够访问私有共享。
```bash
# 将系统用户 alan 添加到 smbgroup 组中
sudo usermod -aG smbgroup alan

# 为 alan 设置 Samba 密码（这个密码可以和他的系统登录密码不同）
sudo smbpasswd -a alan
```
系统会提示您为 `alan` 输入并确认新的 Samba 密码。

### 3.3 编辑 Samba 配置文件

再次打开配置文件：
```bash
sudo nano /etc/samba/smb.conf
```
在文件底部，追加以下内容来定义私有共享：
```ini
[private]
    comment = Private Secure Storage
    path = /srv/samba/private
    read only = no
    browsable = yes
    valid users = @smbgroup
```
- `valid users = @smbgroup`: 这是关键。`@` 符号表示这是一个用户组。这行配置意味着只有属于 `smbgroup` 组的用户才能访问此共享。

### 3.4 重启 Samba

```bash
sudo systemctl restart smbd
sudo systemctl restart nmbd
```

---

## 步骤 4: 配置防火墙

如果您的防火墙（如 UFW）正在运行，您需要允许 Samba 的流量。

```bash
sudo ufw allow samba
```

---

## 步骤 5: 从客户端连接

### 从 Windows:
打开文件资源管理器，在地址栏输入 `\\<您的服务器IP>`，然后按回车。您应该能看到 `public` 和 `private` 两个文件夹。
- 点击 `public` 可以直接进入。
- 点击 `private` 会弹出认证窗口，输入您刚才设置的 Samba 用户名（如 `alan`）和密码即可访问。

### 从 macOS:
打开 Finder，点击菜单栏的 "前往" > "连接服务器"，然后输入 `smb://<您的服务器IP>` 并点击连接。

### 从 Linux:
在文件管理器中，通常有一个“连接到服务器”的选项，输入 `smb://<您的服务器IP>` 即可。

您现在已经成功地在 Debian 上搭建了一个同时提供公共和私有访问的文件服务器！ 