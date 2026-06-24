---
title: 防火墙配置
description: Debian 13 防火墙配置指南，包括 UFW 和 iptables 的使用
---

# 防火墙配置

本教程详细介绍如何在 Debian 13 中配置和管理防火墙，保护系统安全。

## 🔥 UFW 防火墙

### 安装和启用 UFW

```bash
# 安装 UFW
sudo apt install ufw

# 启用防火墙
sudo ufw enable

# 查看状态
sudo ufw status verbose
```

### 基本规则配置

```bash
# 默认策略
sudo ufw default deny incoming
sudo ufw default allow outgoing

# 允许 SSH
sudo ufw allow ssh
sudo ufw allow 22

# 允许 HTTP 和 HTTPS
sudo ufw allow 80
sudo ufw allow 443

# 允许特定 IP
sudo ufw allow from 192.168.1.100

# 查看规则
sudo ufw status numbered

# 删除规则
sudo ufw delete 2
```

## 🛡️ 高级配置

### 端口范围和协议

```bash
# 允许端口范围
sudo ufw allow 1000:2000/tcp

# 指定协议
sudo ufw allow 53/udp

# 限制连接频率
sudo ufw limit ssh
```

### 应用配置文件

```bash
# 查看可用应用
sudo ufw app list

# 允许应用
sudo ufw allow "Apache Full"
sudo ufw allow "OpenSSH"

# 查看应用配置
sudo ufw app info "Apache Full"
```

## 🔧 iptables 高级配置

### 查看 iptables 规则

```bash
# 查看当前规则
sudo iptables -L -n -v

# 查看 NAT 表
sudo iptables -t nat -L -n -v

# 查看 mangle 表
sudo iptables -t mangle -L -n -v
```

### 基本 iptables 规则

```bash
# 允许回环接口
sudo iptables -A INPUT -i lo -j ACCEPT

# 允许已建立的连接
sudo iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# 允许 SSH
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# 拒绝其他入站连接
sudo iptables -A INPUT -j DROP
```

### 端口转发

```bash
# 启用 IP 转发
echo 'net.ipv4.ip_forward=1' | sudo tee -a /etc/sysctl.conf

# 端口转发规则
sudo iptables -t nat -A PREROUTING -p tcp --dport 8080 -j REDIRECT --to-port 80

# NAT 转发
sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
```

## 🚪 网络访问控制

### IP 白名单和黑名单

```bash
# UFW 黑名单
sudo ufw deny from 192.168.1.100

# UFW 白名单特定服务
sudo ufw allow from 192.168.1.0/24 to any port 22

# 地理位置阻止（需要额外配置）
sudo apt install xtables-addons-common
```

### 服务特定规则

```bash
# Web 服务器
sudo ufw allow 'Apache Full'
sudo ufw allow 'Nginx Full'

# 数据库服务器（限制IP）
sudo ufw allow from 192.168.1.0/24 to any port 3306
sudo ufw allow from 192.168.1.0/24 to any port 5432

# FTP 服务器
sudo ufw allow 20/tcp
sudo ufw allow 21/tcp
sudo ufw allow 1024:65535/tcp  # 被动模式端口范围
```

## 📊 防火墙监控

### 日志配置

```bash
# 启用 UFW 日志
sudo ufw logging on

# 设置日志级别
sudo ufw logging medium

# 查看防火墙日志
sudo tail -f /var/log/ufw.log
```

### 连接监控

```bash
# 查看当前连接
ss -tuln
netstat -tuln

# 监控网络流量
sudo apt install nethogs
sudo nethogs

# 实时连接监控
sudo apt install iftop
sudo iftop
```

## 🔒 DDoS 防护

### 连接限制

```bash
# 限制每个IP的连接数
sudo iptables -A INPUT -p tcp --dport 80 -m connlimit --connlimit-above 10 -j DROP

# 限制新连接速率
sudo iptables -A INPUT -p tcp --dport 80 -m limit --limit 25/minute --limit-burst 100 -j ACCEPT
```

### Fail2ban 集成

```bash
# 安装 Fail2ban
sudo apt install fail2ban

# 配置 Fail2ban
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
sudo nano /etc/fail2ban/jail.local

# 启用服务
sudo systemctl enable fail2ban
sudo systemctl start fail2ban

# 查看状态
sudo fail2ban-client status
```

## 🔄 规则管理

### 备份和恢复

```bash
# 备份 UFW 规则
sudo cp -r /etc/ufw /backup/ufw-backup

# 备份 iptables 规则
sudo iptables-save > /backup/iptables.rules

# 恢复 iptables 规则
sudo iptables-restore < /backup/iptables.rules
```

### 规则脚本

```bash
# 创建防火墙脚本
sudo nano /usr/local/bin/firewall-setup.sh

#!/bin/bash
# 防火墙配置脚本

# 清空现有规则
ufw --force reset

# 默认策略
ufw default deny incoming
ufw default allow outgoing

# 基本服务
ufw allow ssh
ufw allow 80
ufw allow 443

# 启用防火墙
ufw --force enable

# 设置执行权限
sudo chmod +x /usr/local/bin/firewall-setup.sh
```

## 🌐 IPv6 防火墙

### IPv6 UFW 配置

```bash
# 启用 IPv6 支持
sudo nano /etc/default/ufw
# 设置 IPV6=yes

# IPv6 规则
sudo ufw allow from ::1
sudo ufw allow out 53/udp
sudo ufw allow out 80/tcp
sudo ufw allow out 443/tcp
```

### IPv6 iptables

```bash
# 查看 IPv6 规则
sudo ip6tables -L -n -v

# 基本 IPv6 规则
sudo ip6tables -A INPUT -i lo -j ACCEPT
sudo ip6tables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
sudo ip6tables -A INPUT -p tcp --dport 22 -j ACCEPT
sudo ip6tables -A INPUT -j DROP
```

## 🔍 故障排除

### 常见问题

```bash
# 检查防火墙状态
sudo ufw status verbose

# 测试端口连通性
telnet server-ip port
nc -zv server-ip port

# 查看阻止的连接
sudo grep "BLOCK" /var/log/ufw.log

# 临时禁用防火墙
sudo ufw disable
```

### 调试规则

```bash
# 显示规则行号
sudo ufw status numbered

# 插入规则到特定位置
sudo ufw insert 1 allow from 192.168.1.0/24

# 详细规则信息
sudo ufw show added
```

## 📝 最佳实践

### 安全建议

1. **最小权限原则**：只开放必要的端口
2. **定期审查规则**：删除不需要的规则
3. **监控日志**：定期检查防火墙日志
4. **备份配置**：定期备份防火墙配置
5. **测试规则**：在生产环境前测试规则

### 性能优化

```bash
# 优化 conntrack 表大小
echo 'net.netfilter.nf_conntrack_max = 262144' | sudo tee -a /etc/sysctl.conf

# 优化超时设置
echo 'net.netfilter.nf_conntrack_tcp_timeout_established = 1200' | sudo tee -a /etc/sysctl.conf

# 应用设置
sudo sysctl -p
```

## 下一步

防火墙配置完成后，建议继续：

1. [网络配置](/administration/network) - 网络安全设置
2. [系统服务](/administration/services) - 服务安全管理
3. [日志管理](/administration/logs) - 安全日志分析

---

**防火墙配置完成了吗？** [继续学习系统安全 →](/administration/security) 