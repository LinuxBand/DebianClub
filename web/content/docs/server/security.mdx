---
title: 服务器安全加固指南
description: 学习保护您的 Debian 服务器的基础知识，涵盖用户管理、SSH 加固、防火墙配置和自动安全更新。
---

# 服务器安全加固基础指南

本指南提供了一系列基础但至关重要的步骤，来加固您的 Debian 服务器，抵御常见的网络威胁。安全是一个持续的过程，但完成这些初始步骤将极大地提高您服务器的安全基线。

## 核心安全原则

- **最小权限原则**: 只授予用户和程序完成其任务所必需的最小权限。
- **纵深防御**: 建立多层安全防护，即使一层被攻破，其他层仍然可以提供保护。
- **保持更新**: 及时应用安全补丁是抵御已知漏洞的最有效方法。
- **定期审计**: 定期检查系统日志和配置，发现潜在的安全问题。

---

## 步骤 1: 用户账户安全

永远不要直接使用 `root` 用户进行日常操作。第一步应该是创建一个拥有 `sudo` 权限的普通用户。

### 1.1 创建新用户

将 `your_username` 替换为您想用的用户名。

```bash
adduser your_username
```
系统会提示您设置密码和其他信息。

### 1.2 给予 sudo 权限

将新创建的用户添加到 `sudo` 用户组，这样他就可以执行管理员命令。

```bash
usermod -aG sudo your_username
```

现在，请**退出 `root` 账户并使用您的新用户账户登录**，继续后面的所有操作。

---

## 步骤 2: SSH 服务加固

SSH 是远程管理服务器的主要入口，因此保护它至关重要。

### 2.1 禁用 root 远程登录

这可以防止攻击者直接尝试破解 `root` 账户。

编辑 SSH 配置文件：
```bash
sudo nano /etc/ssh/sshd_config
```

找到 `PermitRootLogin` 这一行，修改或添加如下内容：
```
PermitRootLogin no
```

### 2.2 (推荐) 禁用密码认证

使用 SSH 密钥对进行身份验证比使用密码更安全。

**在您的本地计算机上** (而不是服务器上) 生成 SSH 密钥对：
```bash
ssh-keygen -t rsa -b 4096
```

将您的公钥复制到服务器上：
```bash
# 将 your_username 和 your_server_ip 替换为实际值
ssh-copy-id your_username@your_server_ip
```

公钥上传成功后，再次编辑服务器上的 SSH 配置文件：
```bash
sudo nano /etc/ssh/sshd_config
```

找到 `PasswordAuthentication` 这一行，修改为：
```
PasswordAuthentication no
```

### 2.3 重启 SSH 服务

应用所有改动。
```bash
sudo systemctl restart sshd
```
**重要**: 在断开当前连接之前，请务必**打开一个新的终端窗口**，尝试使用新配置（和 SSH 密钥）登录，确保一切正常。否则您可能会将自己锁在服务器之外。

---

## 步骤 3: 配置 UFW 防火墙

UFW (Uncomplicated Firewall) 是一个用户友好的 `iptables` 前端。

### 3.1 安装 UFW

```bash
sudo apt-get update
sudo apt-get install ufw
```

### 3.2 设置默认规则

通常，我们默认拒绝所有传入连接，并允许所有传出连接。

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
```

### 3.3 允许必要的服务

在启用防火墙之前，必须先允许 SSH 连接，否则您将会被断开。

```bash
# 允许标准的 SSH (端口 22)
sudo ufw allow ssh

# 如果您将 SSH 端口改成了非标准端口（例如 2222），则应使用：
# sudo ufw allow 2222/tcp

# 同时允许 HTTP 和 HTTPS 流量
sudo ufw allow http
sudo ufw allow https
```

### 3.4 启用防火墙

```bash
sudo ufw enable
```
系统会警告您这可能会中断现有连接，输入 `y` 继续。

### 3.5 查看防火墙状态

```bash
sudo ufw status verbose
```

---

## 步骤 4: 自动安全更新

确保您的系统能自动安装最新的安全补丁。

### 4.1 安装 unattended-upgrades

```bash
sudo apt-get install unattended-upgrades apt-listchanges
```

### 4.2 启用自动更新

运行配置向导：
```bash
sudo dpkg-reconfigure -plow unattended-upgrades
```
在弹出的交互界面中选择“是”(Yes)来启用自动更新。

这会在 `/etc/apt/apt.conf.d/20auto-upgrades` 文件中创建正确的配置。

---

## 步骤 5: 使用 Fail2Ban 防止暴力破解

Fail2Ban 会扫描日志文件，并自动封禁那些有恶意行为（如多次密码尝试失败）的 IP 地址。

### 5.1 安装 Fail2Ban

```bash
sudo apt-get install fail2ban
```

### 5.2 创建本地配置文件

不要直接修改 `jail.conf`。我们应该创建一个本地副本 `jail.local` 来覆盖默认设置。

```bash
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
```

### 5.3 配置 SSH 防护

使用编辑器打开 `jail.local`：
```bash
sudo nano /etc/fail2ban/jail.local
```
找到 `[sshd]` 部分，确保它是启用的 (`enabled = true`)。您可以根据需要调整 `maxretry` (最大尝试次数) 和 `bantime` (封禁时长)。
```
[sshd]
enabled = true
port    = ssh
maxretry = 5
bantime  = 1h
```

### 5.4 重启 Fail2Ban

```bash
sudo systemctl restart fail2ban
```

现在，Fail2Ban 将在后台默默保护您的 SSH 服务。 