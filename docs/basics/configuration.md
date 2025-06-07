---
title: 系统基本配置
description: Debian 13 首次启动后的基本系统配置和优化设置指南
---

# Debian 13 系统基本配置

安装完成 Debian 13 后，还需要进行一些基本配置来优化系统使用体验。本教程将指导您完成这些必要的设置。

## 🎯 首次启动配置

### 系统更新

首先，确保系统是最新的：

```bash
# 更新软件包列表
sudo apt update

# 升级已安装的软件包
sudo apt upgrade -y

# 删除不需要的软件包
sudo apt autoremove -y

# 清理软件包缓存
sudo apt autoclean
```

### 安装必要的工具

```bash
# 基础工具
sudo apt install curl wget git vim nano htop tree unzip

# 编译工具
sudo apt install build-essential

# 网络工具
sudo apt install net-tools dnsutils

# 系统监控工具
sudo apt install neofetch lsb-release
```

## 🌐 网络配置

### Wi-Fi 配置

#### 使用图形界面

1. **打开网络设置**
   - 点击右上角网络图标
   - 选择"Wi-Fi 设置"

2. **连接 Wi-Fi**
   - 选择您的网络名称
   - 输入密码
   - 点击"连接"

#### 使用命令行

```bash
# 查看可用网络
nmcli dev wifi

# 连接 Wi-Fi 网络
nmcli dev wifi connect "网络名称" password "密码"

# 查看连接状态
nmcli con show

# 设置静态 IP（可选）
nmcli con mod "连接名称" ipv4.addresses 192.168.1.100/24
nmcli con mod "连接名称" ipv4.gateway 192.168.1.1
nmcli con mod "连接名称" ipv4.dns 8.8.8.8,8.8.4.4
nmcli con mod "连接名称" ipv4.method manual
nmcli con up "连接名称"
```

### 网络故障排除

```bash
# 检查网络接口
ip addr show

# 检查路由表
ip route show

# 测试网络连接
ping -c 4 google.com

# 检查 DNS 解析
nslookup google.com

# 重启网络服务
sudo systemctl restart NetworkManager
```

## 🎨 桌面个性化

### GNOME 桌面配置

#### 安装 GNOME Tweaks

```bash
# 安装 GNOME 优化工具
sudo apt install gnome-tweaks

# 安装扩展支持
sudo apt install gnome-shell-extensions

# 启动 Tweaks
gnome-tweaks
```

#### 推荐的 GNOME 扩展

```bash
# Dash to Dock
sudo apt install gnome-shell-extension-dashtodock

# AppIndicator 系统托盘
sudo apt install gnome-shell-extension-appindicator

# 用户主题支持
sudo apt install gnome-shell-extension-user-theme
```

#### 主题和图标

```bash
# 安装流行主题
sudo apt install arc-theme

# 安装图标主题
sudo apt install papirus-icon-theme

# 安装字体
sudo apt install fonts-noto fonts-noto-cjk
```

### 壁纸设置

```bash
# 设置壁纸（GNOME）
gsettings set org.gnome.desktop.background picture-uri file:///path/to/wallpaper.jpg

# 设置锁屏壁纸
gsettings set org.gnome.desktop.screensaver picture-uri file:///path/to/wallpaper.jpg

# 壁纸目录
ls /usr/share/pixmaps/
ls /usr/share/backgrounds/
```

## 🔊 音频配置

### 音频系统设置

```bash
# 安装音频工具
sudo apt install alsa-utils pulseaudio pavucontrol

# 检查音频设备
aplay -l
pactl list sinks

# 音量控制
alsamixer

# 图形音频控制
pavucontrol
```

### 音频问题解决

```bash
# 重启音频服务
pulseaudio -k
pulseaudio --start

# 设置默认音频设备
pactl set-default-sink sink_name

# 检查音频权限
groups $USER | grep audio
sudo usermod -aG audio $USER
```

## 🖨️ 打印机配置

### CUPS 打印系统

```bash
# 安装 CUPS
sudo apt install cups system-config-printer

# 启动 CUPS 服务
sudo systemctl enable cups
sudo systemctl start cups

# 添加用户到打印组
sudo usermod -aG lpadmin $USER
```

### 打印机设置

#### 网页界面配置

1. 打开浏览器访问 `http://localhost:631`
2. 点击"Administration" -> "Add Printer"
3. 选择打印机类型
4. 按照向导完成设置

#### 命令行配置

```bash
# 查找网络打印机
lpinfo -v

# 添加网络打印机
sudo lpadmin -p PrinterName -E -v ipp://printer-ip/ipp/print -m everywhere

# 设置默认打印机
lpoptions -d PrinterName

# 测试打印
lp /etc/passwd
```

## ⚙️ 系统服务管理

### Systemd 服务

```bash
# 查看所有服务状态
systemctl list-unit-files --type=service

# 查看运行中的服务
systemctl list-units --type=service --state=running

# 启动/停止/重启服务
sudo systemctl start service-name
sudo systemctl stop service-name
sudo systemctl restart service-name

# 启用/禁用服务
sudo systemctl enable service-name
sudo systemctl disable service-name

# 查看服务状态
systemctl status service-name
```

### 常用服务配置

```bash
# SSH 服务
sudo systemctl enable ssh
sudo systemctl start ssh

# 防火墙服务
sudo apt install ufw
sudo ufw enable
sudo ufw status

# 时间同步服务
sudo systemctl enable systemd-timesyncd
sudo systemctl start systemd-timesyncd
```

## 🕒 时间和日期配置

### 时区设置

```bash
# 查看当前时区
timedatectl

# 列出可用时区
timedatectl list-timezones | grep Asia

# 设置时区
sudo timedatectl set-timezone Asia/Shanghai

# 启用网络时间同步
sudo timedatectl set-ntp true
```

### 硬件时钟

```bash
# 查看硬件时钟
sudo hwclock --show

# 同步硬件时钟到系统时间
sudo hwclock --systohc

# 设置硬件时钟为本地时间（双系统用户）
sudo timedatectl set-local-rtc 1
```

## 🌏 本地化设置

### 语言包安装

```bash
# 安装中文语言包
sudo apt install locales-all

# 配置本地化
sudo dpkg-reconfigure locales

# 查看已安装的语言包
locale -a

# 设置环境变量
export LANG=zh_CN.UTF-8
export LC_ALL=zh_CN.UTF-8
```

### 中文输入法

#### IBus 输入法

```bash
# 安装 IBus 和中文输入法
sudo apt install ibus ibus-pinyin ibus-libpinyin

# 设置 IBus
ibus-setup

# 添加到启动项
echo "ibus-daemon -drx" >> ~/.bashrc
```

#### Fcitx 输入法

```bash
# 安装 Fcitx
sudo apt install fcitx fcitx-pinyin fcitx-config-gtk

# 设置输入法框架
im-config

# 配置 Fcitx
fcitx-config-gtk3
```

### 字体配置

```bash
# 安装中文字体
sudo apt install fonts-noto-cjk fonts-wqy-zenhei fonts-wqy-microhei

# 安装 Windows 字体（可选）
sudo apt install ttf-mscorefonts-installer

# 刷新字体缓存
sudo fc-cache -fv

# 查看已安装字体
fc-list | grep -i chinese
```

## 🔐 安全配置

### 防火墙设置

```bash
# 安装和启用 UFW
sudo apt install ufw
sudo ufw enable

# 基本规则
sudo ufw default deny incoming
sudo ufw default allow outgoing

# 允许 SSH
sudo ufw allow ssh

# 允许特定端口
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# 查看规则
sudo ufw status verbose
```

### SSH 安全配置

```bash
# 编辑 SSH 配置
sudo nano /etc/ssh/sshd_config

# 推荐设置：
Port 2222                    # 修改默认端口
PermitRootLogin no          # 禁止 root 登录
PasswordAuthentication yes  # 允许密码认证（初期）
PubkeyAuthentication yes    # 启用密钥认证
MaxAuthTries 3              # 最大尝试次数

# 重启 SSH 服务
sudo systemctl restart ssh
```

### 自动更新配置

```bash
# 安装 unattended-upgrades
sudo apt install unattended-upgrades

# 配置自动更新
sudo dpkg-reconfigure unattended-upgrades

# 编辑配置文件
sudo nano /etc/apt/apt.conf.d/50unattended-upgrades
```

## 🚀 性能优化

### 内存和交换空间

```bash
# 查看内存使用
free -h

# 查看交换空间
swapon --show

# 调整 swappiness（推荐值：10-20）
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf

# 立即应用
sudo sysctl vm.swappiness=10
```

### 启动优化

```bash
# 分析启动时间
systemd-analyze

# 查看启动项详细时间
systemd-analyze blame

# 禁用不必要的服务
sudo systemctl disable bluetooth
sudo systemctl disable cups-browsed

# 查看用户启动项
ls ~/.config/autostart/
```

### 磁盘优化

```bash
# 检查磁盘使用
df -h
du -sh /*

# 清理系统
sudo apt autoremove --purge
sudo apt autoclean

# 清理日志
sudo journalctl --vacuum-time=3d
sudo journalctl --vacuum-size=100M

# 清理缓存
rm -rf ~/.cache/*
```

## 🔧 开发环境配置

### 编程语言

```bash
# Python 开发环境
sudo apt install python3 python3-pip python3-venv

# Node.js 开发环境
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install nodejs

# Java 开发环境
sudo apt install default-jdk

# Git 配置
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 代码编辑器

```bash
# Visual Studio Code
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
sudo install -o root -g root -m 644 packages.microsoft.gpg /etc/apt/trusted.gpg.d/
sudo sh -c 'echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/trusted.gpg.d/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list'
sudo apt update
sudo apt install code

# Vim 配置
sudo apt install vim-gtk3
```

## 📊 系统监控

### 监控工具安装

```bash
# 系统监控工具
sudo apt install htop iotop nethogs

# 磁盘使用分析
sudo apt install ncdu

# 网络监控
sudo apt install iftop nload

# 硬件信息
sudo apt install lshw hardinfo

# 温度监控
sudo apt install lm-sensors
sudo sensors-detect
```

### 日志管理

```bash
# 查看系统日志
sudo journalctl -f

# 查看特定服务日志
sudo journalctl -u service-name

# 查看启动日志
sudo journalctl -b

# 清理日志
sudo journalctl --vacuum-time=30d
```

## 🔄 备份策略

### Timeshift 系统快照

```bash
# 安装 Timeshift
sudo apt install timeshift

# 配置 Timeshift
sudo timeshift --create

# 设置自动快照
sudo timeshift --create --comments "First snapshot"
```

### 用户数据备份

```bash
# 使用 rsync 备份
rsync -av --progress /home/username/ /backup/location/

# 创建备份脚本
#!/bin/bash
BACKUP_DIR="/backup/$(date +%Y%m%d)"
mkdir -p $BACKUP_DIR
rsync -av /home/username/ $BACKUP_DIR/

# 定时备份（crontab）
crontab -e
# 添加：0 2 * * * /path/to/backup-script.sh
```

## 📝 配置检查清单

完成基本配置后，请检查以下项目：

- [ ] **系统已更新到最新版本**
- [ ] **网络连接正常**
- [ ] **音频设备工作正常**
- [ ] **中文输入法已配置**
- [ ] **防火墙已启用**
- [ ] **SSH 服务已配置**
- [ ] **时区设置正确**
- [ ] **必要软件已安装**
- [ ] **系统监控工具已安装**
- [ ] **备份策略已配置**

## 🆘 常见问题

### 配置丢失

```bash
# 备份配置文件
cp ~/.bashrc ~/.bashrc.backup
cp ~/.profile ~/.profile.backup

# 恢复默认配置
cp /etc/skel/.bashrc ~/
cp /etc/skel/.profile ~/
```

### 权限问题

```bash
# 修复主目录权限
sudo chown -R $USER:$USER /home/$USER
chmod 755 /home/$USER

# 修复 sudo 权限
sudo usermod -aG sudo $USER
```

### 服务启动失败

```bash
# 查看服务状态
systemctl status service-name

# 查看详细错误
journalctl -u service-name

# 重新加载配置
sudo systemctl daemon-reload
sudo systemctl restart service-name
```

## 下一步

基本配置完成后，您可以继续：

1. [安装常用软件](/administration/packages) - 安装办公和娱乐软件
2. [系统安全配置](/administration/security) - 加强系统安全
3. [高级网络配置](/administration/network) - 配置高级网络功能

---

**系统配置完成了吗？** [继续安装常用软件 →](/administration/packages) 