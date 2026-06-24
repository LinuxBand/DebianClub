---
title: 性能优化
description: Debian 13 系统性能优化和调优指南
---

# 系统性能优化

本教程介绍如何优化 Debian 13 系统性能，包括 CPU、内存、磁盘和网络等各个方面的调优。

## 📊 性能监控

### 系统性能指标

```bash
# 查看系统负载
uptime
htop
top

# CPU 信息和使用率
lscpu
cat /proc/cpuinfo
mpstat 1 5  # 需要安装 sysstat

# 内存使用情况
free -h
cat /proc/meminfo
vmstat 1 5

# 磁盘 I/O 性能
iostat -x 1 5  # 需要安装 sysstat
iotop  # 需要安装 iotop

# 网络性能
ss -tulpn
netstat -i
iftop  # 需要安装 iftop
```

### 安装监控工具

```bash
# 安装系统监控工具包
sudo apt install sysstat iotop htop iftop nmon

# 启用 sysstat 数据收集
sudo systemctl enable sysstat
sudo systemctl start sysstat

# 查看历史性能数据
sar -u 1 10  # CPU 使用率
sar -r 1 10  # 内存使用率
sar -d 1 10  # 磁盘 I/O
```

### 性能基准测试

```bash
# CPU 基准测试
sudo apt install sysbench
sysbench cpu --cpu-max-prime=20000 run

# 内存基准测试
sysbench memory --memory-total-size=10G run

# 磁盘基准测试
sysbench fileio --file-total-size=1G prepare
sysbench fileio --file-total-size=1G --file-test-mode=rndrw run
sysbench fileio --file-total-size=1G cleanup

# 网络基准测试
sudo apt install iperf3
iperf3 -s  # 服务器模式
iperf3 -c server_ip  # 客户端模式
```

## 🚀 CPU 优化

### CPU 调度器调优

```bash
# 查看当前 CPU 调度策略
cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor

# 设置性能模式
echo performance | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor

# 永久设置（编辑配置文件）
echo 'GOVERNOR="performance"' | sudo tee -a /etc/default/cpufrequtils

# 安装 CPU 频率管理工具
sudo apt install cpufrequtils

# 查看 CPU 频率
cpufreq-info
```

### CPU 亲和性设置

```bash
# 查看进程的 CPU 亲和性
taskset -p PID

# 设置进程只在特定 CPU 核心运行
taskset -cp 0,1 PID  # 限制在核心 0 和 1

# 启动程序时设置 CPU 亲和性
taskset -c 0-3 program_name

# NUMA 优化
numactl --hardware  # 查看 NUMA 拓扑
numactl --cpubind=0 --membind=0 program_name
```

### 中断处理优化

```bash
# 查看中断分布
cat /proc/interrupts

# 设置网卡中断 CPU 亲和性
echo 1 | sudo tee /proc/irq/IRQ_NUMBER/smp_affinity

# 安装 irqbalance 优化中断分布
sudo apt install irqbalance
sudo systemctl enable irqbalance
sudo systemctl start irqbalance
```

## 💾 内存优化

### 内存管理参数

```bash
# 查看当前内存参数
sysctl vm.swappiness
sysctl vm.dirty_ratio
sysctl vm.dirty_background_ratio

# 优化 swap 使用
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf

# 优化脏页回写
echo 'vm.dirty_ratio=15' | sudo tee -a /etc/sysctl.conf
echo 'vm.dirty_background_ratio=5' | sudo tee -a /etc/sysctl.conf

# 应用配置
sudo sysctl -p
```

### 内存压缩和回收

```bash
# 启用内存压缩
echo 'vm.compact_memory=1' | sudo tee -a /etc/sysctl.conf

# 配置内存回收
echo 'vm.min_free_kbytes=65536' | sudo tee -a /etc/sysctl.conf

# 透明大页设置
echo never | sudo tee /sys/kernel/mm/transparent_hugepage/enabled
echo 'transparent_hugepage=never' | sudo tee -a /etc/default/grub
sudo update-grub
```

### 内存缓存优化

```bash
# 清理系统缓存
sync
echo 3 | sudo tee /proc/sys/vm/drop_caches

# 预读优化
echo 'vm.page-cluster=3' | sudo tee -a /etc/sysctl.conf

# 文件系统缓存优化
echo 'vm.vfs_cache_pressure=50' | sudo tee -a /etc/sysctl.conf
```

## 💽 磁盘 I/O 优化

### I/O 调度器优化

```bash
# 查看当前 I/O 调度器
cat /sys/block/sda/queue/scheduler

# 设置 SSD 的最佳调度器
echo noop | sudo tee /sys/block/sda/queue/scheduler

# 设置 HDD 的最佳调度器
echo deadline | sudo tee /sys/block/sda/queue/scheduler

# 永久设置
echo 'GRUB_CMDLINE_LINUX_DEFAULT="elevator=deadline"' | sudo tee -a /etc/default/grub
sudo update-grub
```

### 文件系统优化

```bash
# ext4 文件系统优化挂载选项
sudo nano /etc/fstab
# 添加 noatime,nodiratime 选项
# UUID=xxx / ext4 defaults,noatime,nodiratime 0 1

# SSD 优化 - 启用 TRIM
sudo systemctl enable fstrim.timer
sudo systemctl start fstrim.timer

# 手动执行 TRIM
sudo fstrim -av

# 查看 TRIM 支持
lsblk --discard
```

### 磁盘队列优化

```bash
# 增加磁盘队列深度
echo 128 | sudo tee /sys/block/sda/queue/nr_requests

# 调整预读大小
echo 256 | sudo tee /sys/block/sda/queue/read_ahead_kb

# 永久设置
cat > /etc/udev/rules.d/60-schedulers.rules << 'EOF'
ACTION=="add|change", KERNEL=="sd[a-z]", ATTR{queue/rotational}=="0", ATTR{queue/scheduler}="noop"
ACTION=="add|change", KERNEL=="sd[a-z]", ATTR{queue/rotational}=="1", ATTR{queue/scheduler}="deadline"
EOF
```

## 🌐 网络优化

### TCP 参数调优

```bash
# 增加 TCP 缓冲区大小
echo 'net.core.rmem_default = 262144' | sudo tee -a /etc/sysctl.conf
echo 'net.core.rmem_max = 16777216' | sudo tee -a /etc/sysctl.conf
echo 'net.core.wmem_default = 262144' | sudo tee -a /etc/sysctl.conf
echo 'net.core.wmem_max = 16777216' | sudo tee -a /etc/sysctl.conf

# 优化 TCP 窗口缩放
echo 'net.ipv4.tcp_window_scaling = 1' | sudo tee -a /etc/sysctl.conf
echo 'net.ipv4.tcp_rmem = 4096 65536 16777216' | sudo tee -a /etc/sysctl.conf
echo 'net.ipv4.tcp_wmem = 4096 65536 16777216' | sudo tee -a /etc/sysctl.conf

# 启用 TCP Fast Open
echo 'net.ipv4.tcp_fastopen = 3' | sudo tee -a /etc/sysctl.conf
```

### 网络队列优化

```bash
# 增加网络设备队列长度
echo 'net.core.netdev_max_backlog = 5000' | sudo tee -a /etc/sysctl.conf

# 增加连接跟踪表大小
echo 'net.netfilter.nf_conntrack_max = 131072' | sudo tee -a /etc/sysctl.conf

# 优化 TCP 连接
echo 'net.ipv4.tcp_max_syn_backlog = 8192' | sudo tee -a /etc/sysctl.conf
echo 'net.core.somaxconn = 32768' | sudo tee -a /etc/sysctl.conf

# 应用网络优化
sudo sysctl -p
```

### DNS 优化

```bash
# 配置更快的 DNS 服务器
sudo nano /etc/systemd/resolved.conf
# 添加：
# DNS=1.1.1.1 8.8.8.8
# FallbackDNS=1.0.0.1 8.8.4.4

# 重启 DNS 解析服务
sudo systemctl restart systemd-resolved

# 或使用 dnsmasq 缓存
sudo apt install dnsmasq
echo 'server=1.1.1.1' | sudo tee -a /etc/dnsmasq.conf
echo 'server=8.8.8.8' | sudo tee -a /etc/dnsmasq.conf
sudo systemctl enable dnsmasq
sudo systemctl start dnsmasq
```

## ⚡ 启动优化

### 系统服务优化

```bash
# 查看启动时间
systemd-analyze
systemd-analyze blame
systemd-analyze critical-chain

# 禁用不需要的服务
sudo systemctl disable bluetooth
sudo systemctl disable cups
sudo systemctl disable apache2
sudo systemctl disable mysql

# 延迟启动非关键服务
sudo systemctl edit service-name
# 添加：
[Service]
ExecStartPre=/bin/sleep 10
```

### GRUB 启动优化

```bash
# 减少 GRUB 等待时间
sudo nano /etc/default/grub
# 修改：
GRUB_TIMEOUT=2

# 禁用图形启动画面（提高启动速度）
GRUB_CMDLINE_LINUX_DEFAULT="quiet"

# 更新 GRUB 配置
sudo update-grub
```

### initramfs 优化

```bash
# 只包含当前系统需要的模块
echo 'MODULES=dep' | sudo tee -a /etc/initramfs-tools/conf.d/driver-policy

# 压缩 initramfs
echo 'COMPRESS=lz4' | sudo tee -a /etc/initramfs-tools/conf.d/compress

# 重建 initramfs
sudo update-initramfs -u
```

## 🔧 桌面环境优化

### GNOME 优化

```bash
# 安装 GNOME 调整工具
sudo apt install gnome-tweaks gnome-shell-extensions

# 禁用动画效果
gsettings set org.gnome.desktop.interface enable-animations false

# 减少 Dock 图标大小
gsettings set org.gnome.shell.extensions.dash-to-dock dash-max-icon-size 32

# 禁用不需要的扩展
gnome-extensions disable extension-name
```

### 字体渲染优化

```bash
# 安装更好的字体
sudo apt install fonts-dejavu fonts-liberation2

# 配置字体渲染
gsettings set org.gnome.settings-daemon.plugins.xsettings antialiasing 'rgba'
gsettings set org.gnome.settings-daemon.plugins.xsettings hinting 'slight'
```

### 文件管理器优化

```bash
# 禁用文件索引（如果不需要）
sudo apt remove tracker

# 或限制索引范围
tracker-preferences  # 只索引重要目录
```

## 🛠️ 应用程序优化

### 浏览器优化

```bash
# Firefox 优化
# about:config 中设置：
# browser.cache.disk.capacity = 1048576  # 1GB 缓存
# network.http.max-connections = 48
# network.http.max-persistent-connections-per-server = 16

# Chrome/Chromium 优化
# 启动参数：
google-chrome --disk-cache-size=1073741824 --max_old_space_size=4096
```

### 数据库优化

```bash
# MySQL/MariaDB 优化
sudo nano /etc/mysql/mariadb.conf.d/50-server.cnf
# 添加：
[mysqld]
innodb_buffer_pool_size = 1G
query_cache_limit = 1M
query_cache_size = 16M
thread_cache_size = 8
tmp_table_size = 32M
max_heap_table_size = 32M

sudo systemctl restart mariadb
```

### 编译优化

```bash
# 设置编译优化标志
export CFLAGS="-O2 -march=native -mtune=native"
export CXXFLAGS="$CFLAGS"
export MAKEFLAGS="-j$(nproc)"

# 添加到 .bashrc 永久生效
echo 'export MAKEFLAGS="-j$(nproc)"' >> ~/.bashrc
```

## 📈 性能调优脚本

### 一键优化脚本

```bash
# 创建系统优化脚本
cat > ~/bin/optimize-system.sh << 'EOF'
#!/bin/bash

echo "开始系统性能优化..."

# CPU 优化
echo performance | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor

# 内存优化
echo 10 | sudo tee /proc/sys/vm/swappiness
echo 15 | sudo tee /proc/sys/vm/dirty_ratio
echo 5 | sudo tee /proc/sys/vm/dirty_background_ratio

# 网络优化
echo 5000 | sudo tee /proc/sys/net/core/netdev_max_backlog

# 清理系统缓存
sync
echo 3 | sudo tee /proc/sys/vm/drop_caches

# SSD TRIM
if [ -f /sys/block/sda/queue/rotational ] && [ "$(cat /sys/block/sda/queue/rotational)" = "0" ]; then
    sudo fstrim -av
fi

echo "系统优化完成！"
EOF

chmod +x ~/bin/optimize-system.sh
```

### 性能监控脚本

```bash
# 创建性能监控脚本
cat > ~/bin/performance-monitor.sh << 'EOF'
#!/bin/bash

echo "=== 系统性能监控 ==="
echo "时间: $(date)"
echo "系统负载: $(uptime | awk -F'load average:' '{print $2}')"
echo "CPU 使用率: $(top -bn1 | grep "Cpu(s)" | awk '{print $2+$4"%"}')"
echo "内存使用: $(free | awk 'NR==2{printf "%.1f%%", $3*100/$2}')"
echo "磁盘使用: $(df -h / | awk 'NR==2{print $5}')"

# 检查最占用资源的进程
echo -e "\n=== CPU 使用最高的进程 ==="
ps aux --sort=-%cpu | head -6

echo -e "\n=== 内存使用最高的进程 ==="
ps aux --sort=-%mem | head -6

# 检查磁盘 I/O
if command -v iotop >/dev/null; then
    echo -e "\n=== 磁盘 I/O 统计 ==="
    sudo iotop -b -n 1 | head -10
fi
EOF

chmod +x ~/bin/performance-monitor.sh
```

### 自动调优

```bash
# 创建自动调优脚本
cat > ~/bin/auto-tune.sh << 'EOF'
#!/bin/bash

# 检测硬件类型并应用相应优化
detect_ssd() {
    for disk in /sys/block/sd*; do
        if [ "$(cat $disk/queue/rotational)" = "0" ]; then
            echo "检测到 SSD: $(basename $disk)"
            echo noop | sudo tee $disk/queue/scheduler
            echo 1 | sudo tee $disk/queue/iosched/fifo_batch
        fi
    done
}

# 根据内存大小调整参数
tune_memory() {
    total_mem=$(free -m | awk 'NR==2{print $2}')
    if [ $total_mem -gt 8192 ]; then
        echo "大内存系统，应用激进优化"
        echo 5 | sudo tee /proc/sys/vm/swappiness
    elif [ $total_mem -gt 4096 ]; then
        echo "中等内存系统，应用标准优化"
        echo 10 | sudo tee /proc/sys/vm/swappiness
    else
        echo "小内存系统，保守优化"
        echo 20 | sudo tee /proc/sys/vm/swappiness
    fi
}

detect_ssd
tune_memory

echo "自动调优完成"
EOF

chmod +x ~/bin/auto-tune.sh
```

## 📊 性能基准和对比

### 建立性能基线

```bash
# 创建性能基线测试
cat > ~/bin/benchmark.sh << 'EOF'
#!/bin/bash

LOG_FILE="benchmark-$(date +%Y%m%d-%H%M%S).log"

echo "系统性能基准测试" | tee $LOG_FILE
echo "=================" | tee -a $LOG_FILE
echo "测试时间: $(date)" | tee -a $LOG_FILE
echo "内核版本: $(uname -r)" | tee -a $LOG_FILE
echo "CPU: $(lscpu | grep "Model name" | cut -d: -f2 | xargs)" | tee -a $LOG_FILE
echo "内存: $(free -h | awk 'NR==2{print $2}')" | tee -a $LOG_FILE

echo -e "\nCPU 测试:" | tee -a $LOG_FILE
sysbench cpu --cpu-max-prime=20000 run | grep "events per second" | tee -a $LOG_FILE

echo -e "\n内存测试:" | tee -a $LOG_FILE
sysbench memory --memory-total-size=1G run | grep "transferred" | tee -a $LOG_FILE

echo -e "\n磁盘测试:" | tee -a $LOG_FILE
dd if=/dev/zero of=/tmp/testfile bs=1G count=1 oflag=direct 2>&1 | grep "copied" | tee -a $LOG_FILE
rm -f /tmp/testfile

echo "基准测试完成，结果保存在 $LOG_FILE"
EOF

chmod +x ~/bin/benchmark.sh
```

## 下一步

完成性能优化后，您可以继续：

1. [网络故障排除](/troubleshooting/network-issues) - 解决网络性能问题
2. [系统恢复](/troubleshooting/recovery) - 系统备份和恢复
3. [日志管理](/administration/logs) - 监控系统性能日志

---

**系统性能满意了吗？** [继续学习系统监控 →](/administration/logs) 