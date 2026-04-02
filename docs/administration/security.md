---
title: 安全管理
description: 学习如何管理 Debian 系统的安全性，包括用户访问控制、防火墙配置、自动更新和入侵检测。
---

# 安全管理

确保 Debian 系统的安全是系统管理中的一项核心任务。本指南将介绍几个关键领域，帮助您加固系统，防范潜在威胁。

## 🔐 用户与访问控制

限制对系统的访问是安全的第一道防线。

### 强制执行强密码策略

使用 `libpam-pwquality` 模块可以强制用户创建更安全的密码。

1.  **安装模块**:
    ```bash
    sudo apt update
    sudo apt install libpam-pwquality
    ```

2.  **配置策略**:
    编辑 `/etc/security/pwquality.conf` 文件来定义密码规则。
    ```ini
    # 示例配置：
    minlen = 10                  # 最小长度为 10
    dcredit = -1                 # 至少包含 1 个数字
    ucredit = -1                 # 至少包含 1 个大写字母
    lcredit = -1                 # 至少包含 1 个小写字母
    ocredit = -1                 # 至少包含 1 个特殊字符
    difok = 3                    # 新密码中至少有 3 个字符与旧密码不同
    ```

### SSH 安全加固

远程访问服务器最常用的方式是 SSH。以下是一些加固建议：

1.  **编辑 SSH 配置文件**:
    ```bash
    sudo nano /etc/ssh/sshd_config
    ```

2.  **推荐配置**:
    - **禁用 root 登录**: `PermitRootLogin no`
    - **禁用密码认证 (推荐使用密钥)**: `PasswordAuthentication no`
    - **启用公钥认证**: `PubkeyAuthentication yes`
    - **更改默认端口 (可选)**: `Port 2222`

3.  **重启 SSH 服务**:
    ```bash
    sudo systemctl restart sshd
    ```

## 🔥 防火墙配置 (UFW)

Debian 默认不启用防火墙。`UFW` (Uncomplicated Firewall) 是一个用户友好的前端工具。在 Debian 13 中，UFW 底层使用 `nftables` 框架（兼容旧版 `iptables` 语法）。

1.  **安装 UFW**:
    ```bash
    sudo apt install ufw
    ```

2.  **配置基本规则**:
    ```bash
    sudo ufw default deny incoming   # 拒绝所有入站连接
    sudo ufw default allow outgoing  # 允许所有出站连接
    sudo ufw allow ssh               # 允许 SSH 连接 (或者你更改的端口)
    sudo ufw allow http              # 如果是 Web 服务器，允许 HTTP
    sudo ufw allow https             # 允许 HTTPS
    ```

3.  **启用 UFW**:
    ```bash
    sudo ufw enable
    ```
    系统会警告你这可能会中断现有的 SSH 连接，确认即可。

4.  **检查状态**:
    ```bash
    sudo ufw status verbose
    ```

## 🔄 自动安全更新

及时应用安全补丁至关重要。`unattended-upgrades` 可以自动安装安全更新。

1.  **安装**:
    ```bash
    sudo apt install unattended-upgrades
    ```

2.  **启用**:
    运行配置向导，它会创建一个基础配置文件。
    ```bash
    sudo dpkg-reconfigure -plow unattended-upgrades
    ```
    在弹出的对话框中选择“是”。

3.  **微调配置 (可选)**:
    您可以编辑 `/etc/apt/apt.conf.d/50unattended-upgrades` 文件，以自定义更新行为，例如启用自动重启。

## 🛡️ 入侵防护 (Fail2Ban)

`Fail2Ban` 可以监控日志文件，并根据可疑行为（如多次失败的登录尝试）自动更新防火墙规则来封禁 IP 地址。

1.  **安装 Fail2Ban**:
    ```bash
    sudo apt install fail2ban
    ```

2.  **创建本地配置文件**:
    不要直接修改 `.conf` 文件，而应创建 `.local` 文件进行覆盖。
    ```bash
    sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
    sudo nano /etc/fail2ban/jail.local
    ```

3.  **配置 SSH 防护**:
    在 `jail.local` 中找到 `[sshd]` 部分，并确保 `enabled = true`。您可以调整 `maxretry` (最大尝试次数) 和 `bantime` (封禁时长)。
    ```ini
    [sshd]
    enabled = true
    port    = ssh
    maxretry = 3
    bantime = 3600  # 封禁 1 小时
    ```

4.  **重启服务**:
    ```bash
    sudo systemctl restart fail2ban
    ```

## 📝 日志管理与审计

定期检查系统日志是发现异常活动的关键。

- **使用 `journalctl` 查看日志**:
  ```bash
  # 查看所有日志 (从旧到新)
  journalctl

  # 实时监控日志
  journalctl -f

  # 查看特定服务的日志，例如 sshd
  journalctl -u sshd.service

  # 查看内核日志
  journalctl -k
  ``` 