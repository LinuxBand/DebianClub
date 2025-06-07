---
title: 网络故障排除
description: Debian 13 网络问题排查指南，包括有线网络、WiFi、DNS、防火墙等网络故障解决方案
---

# 网络故障排除

本指南帮助您诊断和解决 Debian 13 系统中的各种网络问题。

## 🌐 网络连接诊断

### 基本网络检查

```bash
# 检查网络接口
ip addr show
ifconfig -a

# 检查网络状态
ip link show
sudo ethtool eth0  # 有线网卡状态

# 检查路由表
ip route show
route -n

# 检查DNS设置
cat /etc/resolv.conf
systemd-resolve --status
```

### 连接测试

```bash
# ping 测试
ping google.com
ping 8.8.8.8
ping 223.5.5.5  # 阿里DNS

# traceroute 路径追踪
traceroute google.com
mtr google.com  # 实时路径监控

# 端口连接测试
telnet google.com 80
nc -zv google.com 80
```

## 🔌 有线网络问题

### 网卡驱动问题

::: details 🖧 以太网卡故障
```bash
# 检查网卡硬件
lspci | grep -i ethernet
lsmod | grep -i ethernet

# 重新加载网卡驱动
sudo modprobe -r r8169  # 移除驱动
sudo modprobe r8169     # 重新加载

# 安装额外驱动
sudo apt install firmware-realtek
sudo apt install firmware-linux-nonfree

# 检查网卡链路状态
sudo ethtool eth0
sudo mii-tool eth0
```
:::

### 网络配置问题

::: details ⚙️ 网络配置修复
```bash
# NetworkManager 重启
sudo systemctl restart NetworkManager

# 手动配置网络
sudo ip addr add 192.168.1.100/24 dev eth0
sudo ip route add default via 192.168.1.1
echo "nameserver 8.8.8.8" | sudo tee /etc/resolv.conf

# 检查网络服务
sudo systemctl status networking
sudo systemctl restart networking

# 重置网络配置
sudo rm /etc/NetworkManager/system-connections/*
sudo systemctl restart NetworkManager
```
:::

## 📶 WiFi 无线网络问题

### WiFi 硬件问题

::: details 📡 无线网卡诊断
```bash
# 检查WiFi硬件
lspci | grep -i wireless
lsusb | grep -i wireless
iwconfig

# 检查无线驱动
lsmod | grep -i wifi
lsmod | grep -i wireless

# 安装WiFi固件
sudo apt install firmware-iwlwifi       # Intel
sudo apt install firmware-realtek       # Realtek
sudo apt install firmware-atheros       # Atheros
sudo apt install broadcom-sta-dkms      # Broadcom

# 重启WiFi服务
sudo systemctl restart wpa_supplicant
sudo systemctl restart NetworkManager
```
:::

### WiFi 连接问题

::: details 🔐 WiFi 连接故障
```bash
# 扫描WiFi网络
sudo iwlist scan | grep ESSID
nmcli dev wifi list

# 手动连接WiFi
sudo wpa_passphrase "WiFi名称" "密码" >> /etc/wpa_supplicant/wpa_supplicant.conf
sudo wpa_supplicant -B -i wlan0 -c /etc/wpa_supplicant/wpa_supplicant.conf
sudo dhclient wlan0

# 使用nmcli连接
nmcli dev wifi connect "WiFi名称" password "密码"

# 查看保存的连接
nmcli connection show
nmcli connection delete "连接名称"  # 删除有问题的连接
```
:::

### WiFi 信号和速度问题

::: details 📊 WiFi 性能优化
```bash
# 查看WiFi信号强度
iwconfig wlan0
watch -n 1 cat /proc/net/wireless

# 检查WiFi频道
sudo iwlist wlan0 scan | grep Frequency

# 切换到5GHz频段
sudo iwconfig wlan0 freq 5GHz

# 检查WiFi速度
speedtest-cli
iperf3 -c 服务器IP

# 重置WiFi适配器
sudo ip link set wlan0 down
sudo ip link set wlan0 up
```
:::

## 🌍 DNS 解析问题

### DNS 服务器问题

::: details 🔍 DNS 故障排查
```bash
# 测试DNS解析
nslookup google.com
dig google.com
host google.com

# 检查DNS配置
cat /etc/resolv.conf
systemd-resolve --status

# 手动设置DNS
echo "nameserver 8.8.8.8" | sudo tee /etc/resolv.conf
echo "nameserver 223.5.5.5" >> /etc/resolv.conf

# 清除DNS缓存
sudo systemd-resolve --flush-caches
sudo systemctl restart systemd-resolved

# 使用不同DNS测试
dig @8.8.8.8 google.com
dig @223.5.5.5 google.com
```
:::

### systemd-resolved 配置

::: details ⚙️ DNS 服务配置
```bash
# 配置systemd-resolved
sudo nano /etc/systemd/resolved.conf

# 添加配置：
[Resolve]
DNS=8.8.8.8 223.5.5.5
FallbackDNS=1.1.1.1 114.114.114.114
Domains=~.

# 重启DNS服务
sudo systemctl restart systemd-resolved

# 创建resolv.conf链接
sudo ln -sf /run/systemd/resolve/resolv.conf /etc/resolv.conf
```
:::

## 🔥 防火墙问题

### UFW 防火墙诊断

::: details 🛡️ 防火墙故障排查
```bash
# 检查防火墙状态
sudo ufw status verbose
sudo iptables -L -n

# 临时禁用防火墙测试
sudo ufw disable
# 测试网络连接
# 重新启用
sudo ufw enable

# 检查特定端口
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow ssh

# 查看防火墙日志
sudo tail -f /var/log/ufw.log
```
:::

### iptables 规则问题

::: details 🔧 iptables 调试
```bash
# 查看iptables规则
sudo iptables -L -n -v
sudo iptables -t nat -L -n

# 清空iptables规则（谨慎使用）
sudo iptables -F
sudo iptables -X
sudo iptables -t nat -F
sudo iptables -t nat -X

# 允许基本连接
sudo iptables -A INPUT -i lo -j ACCEPT
sudo iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
```
:::

## 🔗 代理和VPN问题

### 代理配置问题

::: details 🌐 代理设置
```bash
# 检查系统代理
echo $http_proxy
echo $https_proxy

# 设置临时代理
export http_proxy=http://proxy.example.com:8080
export https_proxy=http://proxy.example.com:8080

# 永久代理设置
echo 'export http_proxy=http://proxy.example.com:8080' >> ~/.bashrc
echo 'export https_proxy=http://proxy.example.com:8080' >> ~/.bashrc

# APT代理设置
echo 'Acquire::http::Proxy "http://proxy.example.com:8080";' | sudo tee /etc/apt/apt.conf.d/proxy.conf

# 取消代理
unset http_proxy https_proxy
```
:::

### VPN 连接问题

::: details 🔒 VPN 故障排查
```bash
# OpenVPN 诊断
sudo openvpn --config client.ovpn --verb 4

# 检查VPN接口
ip addr show tun0
ip route show | grep tun0

# NetworkManager VPN
nmcli connection show
nmcli connection up "VPN名称"

# 检查VPN日志
sudo journalctl -u openvpn@client
sudo tail -f /var/log/openvpn/client.log
```
:::

## 📱 移动热点和共享

### 创建WiFi热点

::: details 📡 WiFi 热点设置
```bash
# 安装热点工具
sudo apt install hostapd dnsmasq

# 配置热点
sudo nano /etc/hostapd/hostapd.conf

# 添加配置：
interface=wlan0
driver=nl80211
ssid=MyHotspot
hw_mode=g
channel=7
wmm_enabled=0
macaddr_acl=0
auth_algs=1
ignore_broadcast_ssid=0
wpa=2
wpa_passphrase=MyPassword
wpa_key_mgmt=WPA-PSK
wpa_pairwise=TKIP
rsn_pairwise=CCMP

# 启动热点
sudo systemctl start hostapd
sudo systemctl start dnsmasq
```
:::

## 🔧 网络工具和监控

### 网络监控工具

```bash
# 安装网络工具
sudo apt install net-tools iftop nethogs nmap tcpdump wireshark

# 实时网络监控
sudo iftop                    # 接口流量
sudo nethogs                  # 进程网络使用
sudo tcpdump -i eth0         # 数据包捕获

# 网络扫描
nmap -sP 192.168.1.0/24     # 扫描网段
nmap -sS 192.168.1.1        # 端口扫描

# 带宽测试
speedtest-cli
iperf3 -s                    # 服务器模式
iperf3 -c 服务器IP           # 客户端测试
```

### 网络配置备份

```bash
# 备份网络配置
sudo cp -r /etc/NetworkManager/system-connections/ ~/network-backup/
sudo cp /etc/network/interfaces ~/network-backup/
sudo cp /etc/resolv.conf ~/network-backup/

# 导出网络设置
nmcli connection export "连接名称" > connection.nmconnection

# 恢复网络配置
sudo cp ~/network-backup/interfaces /etc/network/
sudo systemctl restart networking
```

## 🆘 紧急网络修复

### 网络完全无法连接

::: details 🚨 紧急修复步骤
```bash
# 重置所有网络服务
sudo systemctl stop NetworkManager
sudo systemctl stop networking
sudo systemctl stop systemd-networkd
sudo systemctl stop systemd-resolved

# 重启网络服务
sudo systemctl start systemd-resolved
sudo systemctl start NetworkManager

# 手动配置临时网络
sudo ip addr add 192.168.1.100/24 dev eth0
sudo ip route add default via 192.168.1.1
echo "nameserver 8.8.8.8" | sudo tee /etc/resolv.conf

# 测试连接
ping 8.8.8.8
```
:::

### 网络硬件重置

```bash
# 重置网络硬件
sudo modprobe -r 驱动名称
sudo modprobe 驱动名称

# USB WiFi适配器重置
sudo usb_modeswitch -v 厂商ID -p 产品ID

# 重启网络硬件
echo '1' | sudo tee /sys/class/net/eth0/device/reset
```

## 📚 相关资源

1. [网络配置](/administration/network) - 基本网络设置
2. [防火墙配置](/administration/firewall) - 网络安全
3. [系统监控](/administration/logs) - 网络日志分析
4. [性能优化](/troubleshooting/performance) - 网络性能调优

**网络问题解决了吗？** [继续学习系统恢复 →](/troubleshooting/recovery) 