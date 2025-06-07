---
title: 日志管理
description: Debian 13 系统日志管理指南，包括 journalctl 和传统日志的使用
---

# 系统日志管理

本教程详细介绍如何在 Debian 13 中查看、管理和分析系统日志，包括 systemd 日志和传统日志文件。

## 📜 systemd 日志 (journalctl)

### 基本查看命令

```bash
# 查看所有日志
journalctl

# 查看最新日志（实时跟踪）
journalctl -f

# 查看当前启动的日志
journalctl -b

# 查看上次启动的日志
journalctl -b -1

# 查看指定启动的日志
journalctl -b 0     # 当前启动
journalctl -b -2    # 前两次启动

# 显示最后N行日志
journalctl -n 50    # 最后50行
journalctl --lines=100  # 最后100行
```

### 按时间过滤

```bash
# 查看今天的日志
journalctl --since today
journalctl --since "2024-01-01"

# 查看昨天的日志
journalctl --since yesterday

# 查看最近1小时的日志
journalctl --since "1 hour ago"

# 查看指定时间范围的日志
journalctl --since "2024-01-01 10:00:00" --until "2024-01-01 11:00:00"

# 查看最近N分钟的日志
journalctl --since "30 minutes ago"
```

### 按服务过滤

```bash
# 查看特定服务的日志
journalctl -u ssh
journalctl -u NetworkManager
journalctl -u nginx

# 查看多个服务的日志
journalctl -u ssh -u NetworkManager

# 查看特定服务的实时日志
journalctl -u nginx -f

# 查看服务的最新日志
journalctl -u ssh -n 20
```

### 按优先级过滤

```bash
# 查看错误级别的日志
journalctl -p err

# 查看警告及以上级别的日志
journalctl -p warning

# 优先级级别：
# 0: emerg   (紧急)
# 1: alert   (警报)
# 2: crit    (严重)
# 3: err     (错误)
# 4: warning (警告)
# 5: notice  (通知)
# 6: info    (信息)
# 7: debug   (调试)

# 查看指定优先级范围
journalctl -p 3..5  # 错误到通知级别
```

### 按进程过滤

```bash
# 查看特定进程ID的日志
journalctl _PID=1234

# 查看特定用户的日志
journalctl _UID=1000

# 查看特定组的日志
journalctl _GID=100

# 查看内核消息
journalctl -k
journalctl --dmesg
```

## 📋 传统日志文件

### 重要日志文件位置

```bash
# 系统消息日志
/var/log/syslog      # 主系统日志
/var/log/messages    # 系统消息（某些发行版）

# 认证和授权日志
/var/log/auth.log    # 认证尝试
/var/log/secure      # 安全相关（某些发行版）

# 内核日志
/var/log/kern.log    # 内核消息

# 启动日志
/var/log/boot.log    # 启动过程日志

# 邮件日志
/var/log/mail.log    # 邮件系统日志

# Web 服务器日志
/var/log/apache2/    # Apache 日志目录
/var/log/nginx/      # Nginx 日志目录

# 数据库日志
/var/log/mysql/      # MySQL 日志
/var/log/postgresql/ # PostgreSQL 日志

# 应用程序日志
/var/log/             # 各种应用程序日志
```

### 查看传统日志

```bash
# 查看文件内容
cat /var/log/syslog
less /var/log/syslog

# 实时查看日志
tail -f /var/log/syslog
tail -f /var/log/auth.log

# 查看最后N行
tail -n 100 /var/log/syslog

# 查看文件头部
head -n 50 /var/log/syslog

# 查看文件统计信息
wc -l /var/log/syslog
```

## 🔍 日志分析工具

### 使用 grep 搜索

```bash
# 搜索特定内容
grep "error" /var/log/syslog
grep -i "failed" /var/log/auth.log  # 忽略大小写

# 搜索多个文件
grep "nginx" /var/log/*.log

# 显示匹配行的行号
grep -n "error" /var/log/syslog

# 显示匹配行前后的内容
grep -A 5 -B 5 "error" /var/log/syslog  # 前后5行

# 统计匹配行数
grep -c "error" /var/log/syslog

# 搜索不匹配的行
grep -v "info" /var/log/syslog

# 使用正则表达式
grep -E "error|warning|critical" /var/log/syslog
```

### 使用 awk 分析

```bash
# 提取特定字段
awk '{print $1, $2, $3}' /var/log/syslog

# 统计每小时的日志条数
awk '{print $3}' /var/log/syslog | cut -d: -f1 | sort | uniq -c

# 分析 Apache 访问日志中的IP
awk '{print $1}' /var/log/apache2/access.log | sort | uniq -c | sort -nr

# 查找特定时间范围的日志
awk '/Jan 15 10:/ {print}' /var/log/syslog

# 计算响应时间统计（Apache）
awk '{sum+=$10; count++} END {print "Average:", sum/count}' /var/log/apache2/access.log
```

### 使用 sed 处理

```bash
# 删除特定行
sed '/debug/d' /var/log/syslog

# 替换文本
sed 's/error/ERROR/g' /var/log/syslog

# 提取特定行
sed -n '100,200p' /var/log/syslog  # 第100到200行

# 删除空行
sed '/^$/d' /var/log/syslog
```

## 📊 日志轮转管理

### logrotate 配置

```bash
# 查看 logrotate 配置
cat /etc/logrotate.conf

# 查看具体服务的轮转配置
ls -la /etc/logrotate.d/
cat /etc/logrotate.d/rsyslog

# 手动执行日志轮转
sudo logrotate /etc/logrotate.conf

# 强制轮转（调试模式）
sudo logrotate -d /etc/logrotate.conf

# 强制轮转特定配置
sudo logrotate -f /etc/logrotate.d/nginx
```

### 创建自定义轮转配置

```bash
# 创建应用程序的轮转配置
sudo nano /etc/logrotate.d/myapp
```

```bash
/var/log/myapp/*.log {
    daily                    # 每天轮转
    missingok               # 文件不存在不报错
    rotate 30               # 保留30个备份
    compress                # 压缩旧日志
    delaycompress           # 延迟压缩
    notifempty              # 空文件不轮转
    create 644 myapp myapp  # 创建新日志文件的权限
    postrotate
        systemctl reload myapp
    endscript
}
```

### systemd journal 管理

```bash
# 查看 journal 占用空间
journalctl --disk-usage

# 清理日志（按时间）
sudo journalctl --vacuum-time=30d    # 保留30天
sudo journalctl --vacuum-time=1week  # 保留1周

# 清理日志（按大小）
sudo journalctl --vacuum-size=100M   # 限制为100MB
sudo journalctl --vacuum-size=1G     # 限制为1GB

# 清理日志（按文件数量）
sudo journalctl --vacuum-files=10    # 保留10个文件

# 验证日志完整性
sudo journalctl --verify
```

### 配置 journal 持久化

```bash
# 编辑 journald 配置
sudo nano /etc/systemd/journald.conf

# 关键配置选项：
Storage=persistent          # 持久化存储
Compress=yes               # 压缩日志
SystemMaxUse=500M          # 最大占用空间
SystemMaxFileSize=50M      # 单文件最大大小
MaxRetentionSec=1month     # 最长保留时间
MaxFileSec=1week          # 单文件最长时间

# 重启 journald 服务
sudo systemctl restart systemd-journald
```

## 🔔 日志监控和告警

### 实时日志监控

```bash
# 监控多个日志文件
multitail /var/log/syslog /var/log/auth.log

# 安装 multitail
sudo apt install multitail

# 使用 watch 监控日志统计
watch "tail -n 20 /var/log/syslog"

# 监控特定错误
watch "grep -c 'error' /var/log/syslog"
```

### 自动化监控脚本

```bash
#!/bin/bash
# /usr/local/bin/log-monitor.sh

LOG_FILE="/var/log/syslog"
ERROR_COUNT=$(grep -c "error" "$LOG_FILE")
WARN_COUNT=$(grep -c "warning" "$LOG_FILE")

# 发送告警邮件
if [ "$ERROR_COUNT" -gt 10 ]; then
    echo "High error count: $ERROR_COUNT" | mail -s "Log Alert" admin@example.com
fi

if [ "$WARN_COUNT" -gt 50 ]; then
    echo "High warning count: $WARN_COUNT" | mail -s "Log Warning" admin@example.com
fi

# 记录统计信息
echo "$(date): Errors: $ERROR_COUNT, Warnings: $WARN_COUNT" >> /var/log/log-stats.log
```

### 使用 fail2ban 监控

```bash
# 安装 fail2ban
sudo apt install fail2ban

# 配置 fail2ban
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
sudo nano /etc/fail2ban/jail.local

# 基本 SSH 保护配置
[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 3600
findtime = 600

# 启动服务
sudo systemctl enable fail2ban
sudo systemctl start fail2ban

# 查看状态
sudo fail2ban-client status
sudo fail2ban-client status sshd
```

## 📈 日志分析和报告

### 生成日志报告

```bash
#!/bin/bash
# /usr/local/bin/log-report.sh

REPORT_FILE="/tmp/log-report-$(date +%Y%m%d).txt"
START_DATE=$(date -d "yesterday" +%Y-%m-%d)

echo "Daily Log Report for $START_DATE" > "$REPORT_FILE"
echo "=================================" >> "$REPORT_FILE"

# SSH 登录统计
echo -e "\nSSH Login Attempts:" >> "$REPORT_FILE"
grep "$START_DATE" /var/log/auth.log | grep "sshd" | grep "Accepted" | wc -l >> "$REPORT_FILE"

# 错误统计
echo -e "\nError Count:" >> "$REPORT_FILE"
grep "$START_DATE" /var/log/syslog | grep -i "error" | wc -l >> "$REPORT_FILE"

# 最活跃的IP地址
echo -e "\nTop IP Addresses:" >> "$REPORT_FILE"
grep "$START_DATE" /var/log/auth.log | awk '{print $NF}' | sort | uniq -c | sort -nr | head -10 >> "$REPORT_FILE"

# 发送报告
mail -s "Daily Log Report" admin@example.com < "$REPORT_FILE"
```

### 使用专业工具

```bash
# 安装 goaccess（Web 日志分析）
sudo apt install goaccess

# 分析 Apache 日志
goaccess /var/log/apache2/access.log -o report.html --log-format=COMBINED

# 分析 Nginx 日志
goaccess /var/log/nginx/access.log -o report.html --log-format=COMBINED

# 实时分析
goaccess /var/log/nginx/access.log -o report.html --log-format=COMBINED --real-time-html
```

## 🔧 日志优化

### 减少日志噪音

```bash
# 配置 rsyslog 过滤
sudo nano /etc/rsyslog.d/50-filter.conf

# 过滤特定消息
:msg, contains, "debug message" stop
:msg, regex, "unnecessary.*pattern" stop

# 重启 rsyslog
sudo systemctl restart rsyslog
```

### 日志性能优化

```bash
# 优化 journal 性能
sudo nano /etc/systemd/journald.conf

# 性能相关配置
RateLimitInterval=30s
RateLimitBurst=10000
SystemMaxUse=200M
RuntimeMaxUse=100M
SyncIntervalSec=5m

# 重启服务
sudo systemctl restart systemd-journald
```

### 远程日志收集

```bash
# 配置 rsyslog 发送到远程服务器
sudo nano /etc/rsyslog.conf

# 添加远程日志配置
*.* @@log-server.example.com:514

# 配置接收远程日志
$ModLoad imudp
$UDPServerRun 514
$UDPServerAddress 0.0.0.0

# 重启服务
sudo systemctl restart rsyslog
```

## 🛠️ 日志分析脚本

### 安全分析脚本

```bash
#!/bin/bash
# /usr/local/bin/security-analysis.sh

# 分析失败的SSH登录
echo "Failed SSH Logins:"
grep "Failed password" /var/log/auth.log | awk '{print $11}' | sort | uniq -c | sort -nr

# 分析sudo使用
echo -e "\nSudo Usage:"
grep "sudo:" /var/log/auth.log | awk '{print $5,$6}' | sort | uniq -c

# 分析用户登录
echo -e "\nUser Logins:"
grep "session opened" /var/log/auth.log | awk '{print $11}' | sort | uniq -c

# 检查异常大文件访问
echo -e "\nLarge File Access (>100MB):"
awk '$10 > 104857600 {print $1, $7, $10}' /var/log/apache2/access.log
```

### 性能分析脚本

```bash
#!/bin/bash
# /usr/local/bin/performance-analysis.sh

# 分析慢查询（MySQL）
echo "MySQL Slow Queries:"
grep "Query_time" /var/log/mysql/mysql-slow.log | tail -10

# 分析响应时间（Apache）
echo -e "\nAverage Response Time:"
awk '{sum+=$10; count++} END {print "Average:", sum/count "ms"}' /var/log/apache2/access.log

# 分析HTTP状态码分布
echo -e "\nHTTP Status Codes:"
awk '{print $9}' /var/log/apache2/access.log | sort | uniq -c | sort -nr

# 分析最访问的页面
echo -e "\nTop Pages:"
awk '{print $7}' /var/log/apache2/access.log | sort | uniq -c | sort -nr | head -10
```

## 📝 最佳实践

### 日志管理策略

1. **合理设置日志级别**：避免过多调试信息
2. **定期轮转日志**：防止磁盘空间耗尽
3. **集中日志收集**：便于分析和监控
4. **安全存储**：保护敏感日志信息
5. **自动化分析**：及时发现问题

### 存储优化

```bash
# 压缩旧日志
find /var/log -name "*.log" -mtime +7 -exec gzip {} \;

# 定期清理临时日志
find /tmp -name "*.log" -mtime +1 -delete

# 监控日志目录大小
du -sh /var/log/*
```

### 安全建议

```bash
# 设置适当的文件权限
sudo chmod 640 /var/log/auth.log
sudo chown syslog:adm /var/log/auth.log

# 定期备份重要日志
rsync -av /var/log/ /backup/logs/

# 使用 logrotate 防止日志泄露
# 在轮转配置中使用 shred 替代删除
shredcycles 3
```

## 下一步

掌握日志管理后，您可以继续：

1. [系统服务](/administration/services) - 管理相关系统服务
2. [网络配置](/administration/network) - 网络日志分析
3. [性能优化](/troubleshooting/performance) - 基于日志的性能优化

---

**日志管理配置完成了吗？** [继续学习系统监控 →](/troubleshooting/performance) 