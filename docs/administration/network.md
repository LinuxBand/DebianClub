---
title: 网络配置
description: Debian 13 网络配置指南，包括有线网络、WiFi、防火墙和网络故障排除
---

# Debian 13 网络配置

本教程详细介绍如何在 Debian 13 中配置和管理网络连接，包括有线网络、无线网络、网络服务和故障排除。

## 🌐 网络管理基础

### NetworkManager

NetworkManager 是 Debian 的默认网络管理工具：

```bash
# 检查 NetworkManager 状态
systemctl status NetworkManager

# 重启 NetworkManager
sudo systemctl restart NetworkManager

# 查看网络设备
nmcli device status

# 查看网络连接
nmcli connection show
```

### 传统网络工具

```bash
# 查看网络接口
ip addr show
ifconfig  # 需要安装 net-tools

# 查看路由表
ip route show
route -n  # 需要安装 net-tools

# 测试网络连通性
ping google.com
traceroute google.com
```

## 🔌 有线网络配置

### 自动配置 (DHCP)

大多数有线网络使用 DHCP 自动获取 IP 地址：

```bash
# 查看有线连接
nmcli connection show --active

# 创建有线连接
sudo nmcli connection add type ethernet con-name "Wired" ifname eth0

# 启用连接
sudo nmcli connection up "Wired"

# 重新获取 IP 地址
sudo nmcli connection down "Wired" && sudo nmcli connection up "Wired"
```

### 静态 IP 配置

```bash
# 创建静态 IP 连接
sudo nmcli connection add type ethernet con-name "Static" ifname eth0 \
    ip4 192.168.1.100/24 gw4 192.168.1.1

# 设置 DNS 服务器
sudo nmcli connection modify "Static" ipv4.dns "8.8.8.8,8.8.4.4"

# 设置手动配置
sudo nmcli connection modify "Static" ipv4.method manual

# 启用连接
sudo nmcli connection up "Static"
```

### 网络接口命名

```bash
# 查看网络接口名称
ip link show

# 查看持久化网络接口名称
ls /sys/class/net/

# 修改接口名称（可选）
sudo nano /etc/systemd/network/10-eth0.link
```

## 📶 WiFi 网络配置

### 图形界面配置

在 GNOME 中：
1. 点击右上角网络图标
2. 选择 WiFi 网络
3. 输入密码连接

### 命令行配置

```bash
# 扫描 WiFi 网络
nmcli device wifi list

# 连接 WiFi 网络
sudo nmcli device wifi connect "WiFi名称" password "密码"

# 连接隐藏网络
sudo nmcli device wifi connect "WiFi名称" password "密码" hidden yes

# 查看已保存的 WiFi 连接
nmcli connection show

# 删除 WiFi 连接
sudo nmcli connection delete "WiFi名称"
```

### WiFi 热点创建

```bash
# 创建 WiFi 热点
sudo nmcli device wifi hotspot ifname wlan0 ssid "MyHotspot" password "mypassword"

# 查看热点状态
nmcli device status

# 停止热点
sudo nmcli device disconnect wlan0
```

### WiFi 驱动问题

```bash
# 检查 WiFi 设备
lspci | grep -i wifi
lsusb | grep -i wifi

# 检查无线模块
lsmod | grep wifi
iwconfig

# 安装额外的 WiFi 驱动
sudo apt install firmware-iwlwifi  # Intel 网卡
sudo apt install firmware-realtek  # Realtek 网卡
sudo apt install firmware-atheros  # Atheros 网卡

# 重新加载网络模块
sudo modprobe -r iwlwifi && sudo modprobe iwlwifi
```

## 🔧 高级网络配置

### 网络桥接

```bash
# 安装桥接工具
sudo apt install bridge-utils

# 创建网络桥接
sudo nmcli connection add type bridge con-name br0 ifname br0
sudo nmcli connection add type bridge-slave con-name br0-eth0 ifname eth0 master br0

# 配置桥接 IP
sudo nmcli connection modify br0 ipv4.addresses 192.168.1.100/24
sudo nmcli connection modify br0 ipv4.gateway 192.168.1.1
sudo nmcli connection modify br0 ipv4.dns 8.8.8.8
sudo nmcli connection modify br0 ipv4.method manual

# 启用桥接
sudo nmcli connection up br0
```

### VLAN 配置

```bash
# 创建 VLAN 接口
sudo nmcli connection add type vlan con-name vlan100 ifname eth0.100 \
    dev eth0 id 100

# 配置 VLAN IP
sudo nmcli connection modify vlan100 ipv4.addresses 192.168.100.10/24
sudo nmcli connection modify vlan100 ipv4.method manual

# 启用 VLAN
sudo nmcli connection up vlan100
```

### 网络绑定 (Bonding)

```bash
# 创建绑定接口
sudo nmcli connection add type bond con-name bond0 ifname bond0 \
    bond.options "mode=active-backup,miimon=1000"

# 添加绑定从接口
sudo nmcli connection add type bond-slave con-name bond0-eth0 ifname eth0 master bond0
sudo nmcli connection add type bond-slave con-name bond0-eth1 ifname eth1 master bond0

# 配置绑定 IP
sudo nmcli connection modify bond0 ipv4.addresses 192.168.1.100/24
sudo nmcli connection modify bond0 ipv4.method manual

# 启用绑定
sudo nmcli connection up bond0
```

## 🌍 DNS 配置

### systemd-resolved

Debian 13 使用 systemd-resolved 管理 DNS：

```bash
# 查看 DNS 状态
systemctl status systemd-resolved

# 查看 DNS 配置
resolvectl status

# 查看 DNS 统计
resolvectl statistics

# 清空 DNS 缓存
sudo resolvectl flush-caches
```

### 手动 DNS 配置

```bash
# 临时修改 DNS（重启后失效）
sudo nano /etc/resolv.conf

# 添加 DNS 服务器
nameserver 8.8.8.8
nameserver 8.8.4.4

# 永久修改 DNS（通过 NetworkManager）
sudo nmcli connection modify "连接名称" ipv4.dns "8.8.8.8,8.8.4.4"
sudo nmcli connection up "连接名称"
```

### 自定义 DNS 服务器

```bash
# 安装 dnsmasq
sudo apt install dnsmasq

# 配置 dnsmasq
sudo nano /etc/dnsmasq.conf

# 基本配置
listen-address=127.0.0.1
bind-interfaces
cache-size=1000

# 启用 dnsmasq
sudo systemctl enable dnsmasq
sudo systemctl start dnsmasq
```

## 🔒 网络安全

### 防火墙配置

```bash
# 安装和启用 UFW
sudo apt install ufw
sudo ufw enable

# 基本规则
sudo ufw default deny incoming
sudo ufw default allow outgoing

# 允许特定端口
sudo ufw allow 22        # SSH
sudo ufw allow 80        # HTTP
sudo ufw allow 443       # HTTPS

# 允许特定 IP
sudo ufw allow from 192.168.1.100

# 查看规则
sudo ufw status verbose
```

### 网络监控

```bash
# 安装网络监控工具
sudo apt install nethogs iftop nload

# 监控网络流量
sudo nethogs    # 按进程监控
sudo iftop      # 实时流量监控
nload           # 网络负载监控

# 查看网络连接
ss -tuln        # 查看监听端口
netstat -tuln   # 需要安装 net-tools
```

### VPN 配置

#### OpenVPN 客户端

```bash
# 安装 OpenVPN
sudo apt install openvpn

# 导入配置文件
sudo cp client.ovpn /etc/openvpn/client.conf

# 启动 VPN
sudo systemctl start openvpn@client
sudo systemctl enable openvpn@client

# 通过 NetworkManager 管理 VPN
sudo apt install network-manager-openvpn-gnome
```

#### WireGuard VPN

```bash
# 安装 WireGuard
sudo apt install wireguard

# 生成密钥对
wg genkey | tee privatekey | wg pubkey > publickey

# 创建配置文件
sudo nano /etc/wireguard/wg0.conf

# 示例配置
[Interface]
PrivateKey = 你的私钥
Address = 10.0.0.2/24
DNS = 8.8.8.8

[Peer]
PublicKey = 服务器公钥
Endpoint = 服务器IP:端口
AllowedIPs = 0.0.0.0/0

# 启动 WireGuard
sudo wg-quick up wg0
sudo systemctl enable wg-quick@wg0
```

## 📊 网络性能优化

### 网络参数调优

```bash
# 查看当前网络参数
sysctl net.core.rmem_max
sysctl net.core.wmem_max

# 临时调整参数
sudo sysctl -w net.core.rmem_max=134217728
sudo sysctl -w net.core.wmem_max=134217728

# 永久调整参数
sudo nano /etc/sysctl.d/99-network-performance.conf

# 添加优化参数
net.core.rmem_max = 134217728
net.core.wmem_max = 134217728
net.core.netdev_max_backlog = 5000
net.ipv4.tcp_congestion_control = bbr

# 应用配置
sudo sysctl -p /etc/sysctl.d/99-network-performance.conf
```

### 带宽测试

```bash
# 安装速度测试工具
sudo apt install speedtest-cli

# 测试网络速度
speedtest-cli

# 使用 iperf3 测试
sudo apt install iperf3

# 服务器端
iperf3 -s

# 客户端测试
iperf3 -c 服务器IP
```

## 🆘 网络故障排除

### 基本诊断

```bash
# 1. 检查网络接口
ip link show

# 2. 检查 IP 地址
ip addr show

# 3. 检查路由
ip route show

# 4. 检查 DNS
nslookup google.com
dig google.com

# 5. 测试连通性
ping -c 4 8.8.8.8        # 测试外网
ping -c 4 192.168.1.1    # 测试网关
```

### 常见问题解决

#### 无法获取 IP 地址

```bash
# 重启网络服务
sudo systemctl restart NetworkManager

# 手动获取 IP
sudo dhclient eth0

# 检查 DHCP 日志
journalctl -u NetworkManager
```

#### DNS 解析失败

```bash
# 检查 DNS 配置
cat /etc/resolv.conf

# 测试 DNS 服务器
nslookup google.com 8.8.8.8

# 清空 DNS 缓存
sudo resolvectl flush-caches

# 重置 DNS 配置
sudo systemctl restart systemd-resolved
```

#### WiFi 连接问题

```bash
# 检查 WiFi 设备状态
nmcli radio wifi

# 启用 WiFi
nmcli radio wifi on

# 重启 WiFi 设备
sudo nmcli device disconnect wlan0
sudo nmcli device connect wlan0

# 检查驱动程序
dmesg | grep -i wifi
```

### 网络诊断脚本

创建网络诊断脚本：

```bash
#!/bin/bash
# 网络诊断脚本

echo "=== 网络接口状态 ==="
ip link show

echo -e "\n=== IP 地址信息 ==="
ip addr show

echo -e "\n=== 路由表 ==="
ip route show

echo -e "\n=== DNS 配置 ==="
cat /etc/resolv.conf

echo -e "\n=== 网关连通性测试 ==="
ping -c 3 $(ip route | grep default | awk '{print $3}')

echo -e "\n=== 外网连通性测试 ==="
ping -c 3 8.8.8.8

echo -e "\n=== DNS 解析测试 ==="
nslookup google.com

echo -e "\n=== 活动连接 ==="
nmcli connection show --active
```

## 📝 网络配置备份

### 备份网络配置

```bash
# 备份 NetworkManager 配置
sudo tar -czf network-backup.tar.gz /etc/NetworkManager/

# 备份连接配置
sudo cp -r /etc/NetworkManager/system-connections/ ~/network-connections-backup/

# 导出网络配置
nmcli -f all connection show > network-connections.txt
```

### 恢复网络配置

```bash
# 恢复配置文件
sudo tar -xzf network-backup.tar.gz -C /

# 重载 NetworkManager
sudo systemctl reload NetworkManager

# 重新连接网络
nmcli connection reload
```

## 下一步

掌握网络配置后，您可以继续学习：

1. [防火墙配置](/administration/firewall) - 加强网络安全
2. [系统服务管理](/administration/services) - 管理网络服务
3. [日志管理](/administration/logs) - 查看网络日志

---

**网络配置完成了吗？** [继续学习防火墙配置 →](/administration/firewall) 