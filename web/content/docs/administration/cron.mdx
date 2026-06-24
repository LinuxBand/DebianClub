---
title: 定时任务
description: Debian 13 定时任务配置指南，包括 cron 和 systemd timer 的使用
---

# 定时任务管理

本教程介绍如何在 Debian 13 中设置和管理定时任务，包括传统的 cron 和现代的 systemd timer。

## ⏰ Cron 定时任务

### 基本概念

Cron 是 Unix/Linux 系统中的时间调度器，用于执行计划任务。

```bash
# Cron 时间格式
# 分钟(0-59) 小时(0-23) 日期(1-31) 月份(1-12) 星期(0-7) 命令
#     *         *         *         *         *     command

# 示例：
# 每天凌晨2点执行备份
0 2 * * * /usr/local/bin/backup.sh

# 每小时执行一次
0 * * * * /usr/local/bin/hourly-task.sh

# 每周日凌晨3点执行
0 3 * * 0 /usr/local/bin/weekly-cleanup.sh
```

### 管理 Crontab

```bash
# 编辑当前用户的 crontab
crontab -e

# 查看当前用户的 crontab
crontab -l

# 删除当前用户的 crontab
crontab -r

# 编辑其他用户的 crontab（需要 root 权限）
sudo crontab -u username -e
sudo crontab -u www-data -e

# 查看其他用户的 crontab
sudo crontab -u username -l
```

### 系统级 Crontab

```bash
# 编辑系统级 crontab
sudo nano /etc/crontab

# 系统 crontab 格式（多了用户字段）
# 分钟 小时 日期 月份 星期 用户 命令
0 2 * * * root /usr/local/bin/system-backup.sh

# 查看系统 crontab
cat /etc/crontab
```

### 目录式 Cron 配置

```bash
# 系统预定义目录
ls -la /etc/cron.*

# 每小时执行的脚本
/etc/cron.hourly/

# 每天执行的脚本
/etc/cron.daily/

# 每周执行的脚本
/etc/cron.weekly/

# 每月执行的脚本
/etc/cron.monthly/

# 添加脚本到目录
sudo cp my-script.sh /etc/cron.daily/
sudo chmod +x /etc/cron.daily/my-script.sh
```

### 常用时间表达式

```bash
# 基本时间模式
* * * * *    # 每分钟执行
0 * * * *    # 每小时执行（整点）
0 0 * * *    # 每天午夜执行
0 0 * * 0    # 每周日午夜执行
0 0 1 * *    # 每月1日午夜执行
0 0 1 1 *    # 每年1月1日午夜执行

# 特殊关键字
@reboot      # 系统启动时执行
@yearly      # 每年执行一次（等同于 0 0 1 1 *）
@annually    # 每年执行一次（同 @yearly）
@monthly     # 每月执行一次（等同于 0 0 1 * *）
@weekly      # 每周执行一次（等同于 0 0 * * 0）
@daily       # 每天执行一次（等同于 0 0 * * *）
@hourly      # 每小时执行一次（等同于 0 * * * *）

# 区间和步长
*/5 * * * *    # 每5分钟执行
0 */2 * * *    # 每2小时执行
0 9-17 * * *   # 每天9点到17点，每小时执行
0 9 * * 1-5    # 周一到周五的9点执行
```

### 实用示例

```bash
# 添加到 crontab -e

# 每天凌晨2点备份数据库
0 2 * * * /usr/local/bin/mysql-backup.sh

# 每5分钟检查服务状态
*/5 * * * * /usr/local/bin/check-services.sh

# 每周一清理临时文件
0 3 * * 1 find /tmp -type f -mtime +7 -delete

# 每月1日生成报告
0 8 1 * * /usr/local/bin/monthly-report.sh

# 工作日每小时同步数据
0 * * * 1-5 rsync -av /source/ /destination/

# 系统启动时启动特定服务
@reboot /usr/local/bin/startup-script.sh
```

## 🕐 systemd Timer

### systemd Timer 优势

- 更好的日志记录
- 依赖管理
- 资源控制
- 更灵活的时间配置

### 创建 systemd Timer

#### 步骤1：创建服务文件

```bash
# 创建服务文件
sudo nano /etc/systemd/system/backup.service
```

```ini
[Unit]
Description=Daily Backup Service
Wants=backup.timer

[Service]
Type=oneshot
User=backup
ExecStart=/usr/local/bin/backup.sh
```

#### 步骤2：创建定时器文件

```bash
# 创建定时器文件
sudo nano /etc/systemd/system/backup.timer
```

```ini
[Unit]
Description=Daily Backup Timer
Requires=backup.service

[Timer]
OnCalendar=daily
Persistent=true

[Install]
WantedBy=timers.target
```

#### 步骤3：启用和启动定时器

```bash
# 重载 systemd 配置
sudo systemctl daemon-reload

# 启用定时器
sudo systemctl enable backup.timer

# 启动定时器
sudo systemctl start backup.timer

# 查看定时器状态
systemctl status backup.timer
```

### Timer 时间配置

```bash
# OnCalendar 时间格式示例
OnCalendar=daily                # 每天午夜
OnCalendar=weekly               # 每周
OnCalendar=monthly              # 每月
OnCalendar=*-*-01 03:00:00     # 每月1日凌晨3点
OnCalendar=Mon *-*-* 09:00:00  # 每周一上午9点
OnCalendar=*:0/15               # 每15分钟

# 相对时间
OnBootSec=15min                 # 启动15分钟后
OnStartupSec=1h                 # 系统启动1小时后
OnActiveSec=30min               # 服务激活30分钟后
OnUnitActiveSec=1h              # 单元上次激活1小时后
```

### 管理 systemd Timer

```bash
# 查看所有定时器
systemctl list-timers

# 查看定时器状态
systemctl status backup.timer

# 查看定时器日志
journalctl -u backup.timer
journalctl -u backup.service

# 手动触发服务
sudo systemctl start backup.service

# 停止定时器
sudo systemctl stop backup.timer

# 禁用定时器
sudo systemctl disable backup.timer

# 重新加载配置
sudo systemctl daemon-reload
```

## 🔧 高级配置

### 环境变量

```bash
# 在 crontab 中设置环境变量
crontab -e

# 添加环境变量
PATH=/usr/local/bin:/usr/bin:/bin
MAILTO=admin@example.com
HOME=/home/username

# 使用环境变量的任务
0 2 * * * $HOME/scripts/backup.sh
```

### 邮件通知

```bash
# 安装邮件工具
sudo apt install postfix mailutils

# 在 crontab 中设置邮件
MAILTO=admin@example.com

# 有输出时才发送邮件
0 2 * * * /usr/local/bin/backup.sh

# 始终发送邮件
0 2 * * * /usr/local/bin/backup.sh | mail -s "Backup Result" admin@example.com
```

### 日志记录

```bash
# Cron 任务日志记录
0 2 * * * /usr/local/bin/backup.sh >> /var/log/backup.log 2>&1

# 带时间戳的日志
0 2 * * * echo "$(date): Starting backup" >> /var/log/backup.log; /usr/local/bin/backup.sh >> /var/log/backup.log 2>&1

# systemd timer 自动记录日志
journalctl -u backup.service -f
```

### 错误处理

```bash
# 创建错误处理脚本
#!/bin/bash
# backup-with-error-handling.sh

LOG_FILE="/var/log/backup.log"
ERROR_LOG="/var/log/backup-error.log"

{
    echo "$(date): Starting backup"
    
    if /usr/local/bin/backup.sh; then
        echo "$(date): Backup completed successfully"
    else
        echo "$(date): Backup failed" | tee -a "$ERROR_LOG"
        # 发送错误通知
        echo "Backup failed at $(date)" | mail -s "BACKUP FAILURE" admin@example.com
        exit 1
    fi
} >> "$LOG_FILE" 2>&1
```

## 📊 监控和管理

### Cron 服务管理

```bash
# 检查 cron 服务状态
systemctl status cron

# 启动/停止 cron 服务
sudo systemctl start cron
sudo systemctl stop cron
sudo systemctl restart cron

# 查看 cron 日志
journalctl -u cron
tail -f /var/log/cron.log
```

### 定时任务监控

```bash
# 查看当前运行的 cron 任务
ps aux | grep cron

# 监控定时器执行
watch systemctl list-timers

# 查看最近的任务执行
journalctl --since "1 hour ago" -u cron
```

### 调试定时任务

```bash
# 测试 cron 表达式
# 使用在线工具或安装 cron-validator

# 手动执行任务测试
/usr/local/bin/backup.sh

# 检查用户权限
sudo -u username /usr/local/bin/backup.sh

# 检查环境变量
env | grep PATH
```

## 🛠️ 实用脚本

### 备份脚本示例

```bash
#!/bin/bash
# /usr/local/bin/mysql-backup.sh

# 配置
DB_USER="backup_user"
DB_PASS="backup_password"
BACKUP_DIR="/backups/mysql"
DATE=$(date +%Y%m%d_%H%M%S)

# 创建备份目录
mkdir -p "$BACKUP_DIR"

# 备份所有数据库
mysqldump --user="$DB_USER" --password="$DB_PASS" --all-databases | gzip > "$BACKUP_DIR/all_databases_$DATE.sql.gz"

# 删除7天前的备份
find "$BACKUP_DIR" -name "*.sql.gz" -mtime +7 -delete

echo "Backup completed: $BACKUP_DIR/all_databases_$DATE.sql.gz"
```

### 系统监控脚本

```bash
#!/bin/bash
# /usr/local/bin/system-monitor.sh

# 检查磁盘使用率
DISK_USAGE=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -gt 80 ]; then
    echo "WARNING: Disk usage is $DISK_USAGE%" | mail -s "Disk Space Alert" admin@example.com
fi

# 检查内存使用率
MEM_USAGE=$(free | awk 'NR==2{printf "%.2f", $3*100/$2}')
if (( $(echo "$MEM_USAGE > 90" | bc -l) )); then
    echo "WARNING: Memory usage is $MEM_USAGE%" | mail -s "Memory Usage Alert" admin@example.com
fi

# 检查服务状态
SERVICES=("nginx" "mysql" "ssh")
for service in "${SERVICES[@]}"; do
    if ! systemctl is-active --quiet "$service"; then
        echo "WARNING: $service is not running" | mail -s "Service Alert" admin@example.com
    fi
done
```

### 日志轮转脚本

```bash
#!/bin/bash
# /usr/local/bin/log-rotation.sh

LOG_DIR="/var/log/myapp"
MAX_SIZE="100M"
KEEP_DAYS=30

# 压缩大日志文件
find "$LOG_DIR" -name "*.log" -size +"$MAX_SIZE" -exec gzip {} \;

# 删除旧日志文件
find "$LOG_DIR" -name "*.log.gz" -mtime +$KEEP_DAYS -delete

echo "Log rotation completed for $LOG_DIR"
```

## 🔒 安全考虑

### 权限管理

```bash
# 设置 crontab 文件权限
sudo chmod 600 /var/spool/cron/crontabs/*

# 限制 cron 使用
echo "username" | sudo tee -a /etc/cron.allow
echo "baduser" | sudo tee -a /etc/cron.deny

# 检查 cron 相关文件权限
ls -la /etc/cron*
ls -la /var/spool/cron/
```

### 脚本安全

```bash
# 使用绝对路径
/usr/bin/mysqldump instead of mysqldump

# 设置安全的 PATH
export PATH=/usr/local/bin:/usr/bin:/bin

# 验证输入参数
if [ -z "$1" ]; then
    echo "Error: No argument provided"
    exit 1
fi

# 使用适当的文件权限
chmod 700 /usr/local/bin/sensitive-script.sh
```

## 📝 最佳实践

### 设计原则

1. **幂等性**：脚本可以安全地重复执行
2. **错误处理**：妥善处理失败情况
3. **日志记录**：记录执行结果和错误
4. **资源清理**：清理临时文件和旧数据
5. **通知机制**：重要事件及时通知

### 性能优化

```bash
# 避免在高峰时段执行密集任务
0 2 * * * /usr/local/bin/heavy-task.sh  # 凌晨执行

# 错开多个任务的执行时间
0 2 * * * /usr/local/bin/backup.sh
15 2 * * * /usr/local/bin/cleanup.sh
30 2 * * * /usr/local/bin/report.sh

# 使用锁文件防止重复执行
#!/bin/bash
LOCK_FILE="/var/lock/backup.lock"
exec 200>"$LOCK_FILE"
if ! flock -n 200; then
    echo "Another instance is running"
    exit 1
fi
# 脚本内容...
```

## 下一步

掌握定时任务后，您可以继续：

1. [日志管理](/administration/logs) - 查看任务执行日志
2. [系统服务](/administration/services) - 管理相关系统服务
3. [性能优化](/troubleshooting/performance) - 优化定时任务性能

---

**定时任务配置完成了吗？** [继续学习日志管理 →](/administration/logs) 