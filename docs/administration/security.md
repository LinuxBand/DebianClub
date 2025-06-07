---
title: 系统安全配置
description: Debian 13 系统安全加固指南，包括用户安全、文件权限、网络安全等
---

# 系统安全配置

本教程详细介绍如何加固 Debian 13 系统的安全性，保护系统免受各种威胁。

## 🔐 用户安全

### 密码策略

```bash
# 安装密码质量检查工具
sudo apt install libpam-pwquality

# 编辑密码策略配置
sudo nano /etc/security/pwquality.conf

# 设置密码最小长度
minlen = 12

# 要求包含不同类型字符
minclass = 3

# 设置密码历史
remember = 5
```

### SSH 安全配置

```bash
# 编辑SSH配置
sudo nano /etc/ssh/sshd_config

# 禁用root登录
PermitRootLogin no

# 修改默认端口
Port 2222

# 禁用密码认证，启用密钥认证
PasswordAuthentication no
PubkeyAuthentication yes

# 限制登录尝试
MaxAuthTries 3

# 重启SSH服务
sudo systemctl restart sshd
```

## 🛡️ 系统加固

### 文件权限管理

```bash
# 设置关键文件权限
sudo chmod 600 /boot/grub/grub.cfg
sudo chmod 644 /etc/passwd
sudo chmod 600 /etc/shadow
sudo chmod 644 /etc/group

# 查找SUID文件
find / -perm -4000 -type f 2>/dev/null

# 移除不必要的SUID权限
sudo chmod u-s /usr/bin/some_file
```

### 内核参数调优

```bash
# 编辑系统参数
sudo nano /etc/sysctl.conf

# 网络安全参数
net.ipv4.ip_forward = 0
net.ipv4.conf.all.send_redirects = 0
net.ipv4.conf.default.send_redirects = 0
net.ipv4.conf.all.accept_redirects = 0
net.ipv4.conf.default.accept_redirects = 0

# 应用配置
sudo sysctl -p
```

## 🔍 安全监控

### 日志监控

```bash
# 安装日志分析工具
sudo apt install logwatch fail2ban

# 配置fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban

# 查看fail2ban状态
sudo fail2ban-client status
```

### 文件完整性检查

```bash
# 安装AIDE
sudo apt install aide

# 初始化数据库
sudo aideinit

# 检查文件完整性
sudo aide --check
```

## 🚫 恶意软件防护

### ClamAV 安装配置

```bash
# 安装ClamAV
sudo apt install clamav clamav-daemon

# 更新病毒库
sudo freshclam

# 扫描系统
sudo clamscan -r /home --infected
```

## 🔧 系统更新策略

### 自动安全更新

```bash
# 安装无人值守升级
sudo apt install unattended-upgrades

# 配置自动更新
sudo dpkg-reconfigure unattended-upgrades

# 编辑配置文件
sudo nano /etc/apt/apt.conf.d/50unattended-upgrades
```

## 📊 安全检查清单

| 检查项目 | 状态 | 操作 |
|----------|------|------|
| 防火墙启用 | ✅ | `sudo ufw status` |
| SSH密钥认证 | ✅ | 检查 `/etc/ssh/sshd_config` |
| 系统更新 | ✅ | `sudo apt update && sudo apt upgrade` |
| 用户权限 | ✅ | `sudo` 权限检查 |
| 服务安全 | ✅ | 禁用不必要服务 |

## 📚 相关资源

1. [防火墙配置](/administration/firewall) - 网络安全设置
2. [用户管理](/administration/users) - 用户权限控制
3. [服务管理](/administration/services) - 系统服务安全

**系统安全加固完成了吗？** [继续学习故障排除 →](/troubleshooting/faq) 