---
title: 首次启动配置
description: Debian 13 首次启动后的基本配置指南，包括语言设置、用户配置和基本系统优化
---

# Debian 13 首次启动配置

恭喜您成功安装了 Debian 13！本页面将指导您完成首次启动后的基本配置，确保系统正常运行并优化使用体验。

## 🎉 首次启动流程

### 1. 系统启动

安装完成后，系统会自动重启并进入 GRUB 引导界面：

```bash
                     GNU GRUB  version 2.12

      Debian GNU/Linux
      Advanced options for Debian GNU/Linux
      Windows Boot Manager (on /dev/sda1)  # 如果是双系统

Use the ↑ and ↓ keys to select which entry is highlighted.
Press enter to boot the selected OS, `e' to edit the commands
before booting or `c' for a command-line.
```

### 2. 登录界面

首次启动会显示图形登录界面：

- **用户选择**：选择安装时创建的用户
- **密码输入**：输入用户密码
- **桌面环境**：如果安装了多个桌面环境，可在此选择

## ⚙️ GNOME 初始设置向导

如果安装了 GNOME 桌面环境，首次登录会启动初始设置向导：

### 步骤 1：欢迎界面

```bash
欢迎使用 GNOME
即将进行一些快速设置来个性化您的体验
```

点击"开始设置"继续。

### 步骤 2：隐私设置

```bash
位置服务
□ 启用位置服务

自动问题报告
□ 自动发送错误报告给开发者
```

根据个人喜好选择，建议关闭以保护隐私。

### 步骤 3：在线账户

```bash
连接您的在线账户
- Google
- Microsoft
- Nextcloud
- ...
```

可以跳过此步骤，稍后在需要时添加。

### 步骤 4：完成设置

点击"开始使用 Debian"完成设置。

## 🔧 基本系统配置

### 1. 检查网络连接

```bash
# 检查网络状态
ip addr show

# 测试网络连接
ping -c 4 debian.org

# 检查 DNS 解析
nslookup debian.org
```

### 2. 更新系统

**重要：首次启动后立即更新系统**

```bash
# 更新软件包列表
sudo apt update

# 升级系统
sudo apt upgrade -y

# 如果有新内核，重启系统
sudo reboot
```

### 3. 安装基础工具

```bash
# 安装常用工具
sudo apt install -y \
    curl wget git vim \
    htop tree unzip \
    build-essential \
    software-properties-common

# 安装网络工具
sudo apt install -y \
    net-tools dnsutils \
    traceroute nmap
```

## 🌏 语言和区域设置

### 1. 中文语言支持

```bash
# 安装中文语言包
sudo apt install -y \
    language-pack-zh-hans \
    language-pack-zh-hans-base

# 安装中文字体
sudo apt install -y \
    fonts-noto-cjk \
    fonts-wqy-zenhei \
    fonts-wqy-microhei

# 重新配置语言环境
sudo dpkg-reconfigure locales
```

**在 locales 配置中：**
1. 选择 `zh_CN.UTF-8 UTF-8`
2. 设置系统默认语言（可保持英文）

### 2. 输入法配置

```bash
# 安装 iBus 中文输入法
sudo apt install -y \
    ibus ibus-pinyin \
    ibus-libpinyin

# 启动 iBus
ibus-daemon -drx

# 配置输入法
ibus-setup
```

**iBus 配置步骤：**
1. 打开"输入法"选项卡
2. 点击"添加"按钮
3. 选择"中文" → "拼音"
4. 添加"Intelligent Pinyin"

### 3. 时区设置

```bash
# 查看当前时区
timedatectl

# 列出可用时区
timedatectl list-timezones | grep Shanghai

# 设置时区
sudo timedatectl set-timezone Asia/Shanghai

# 启用网络时间同步
sudo timedatectl set-ntp true
```

## 🎨 桌面环境配置

### GNOME 个性化

#### 1. 安装 GNOME 扩展

```bash
# 安装 GNOME 扩展管理器
sudo apt install gnome-shell-extensions

# 安装常用扩展
sudo apt install \
    gnome-shell-extension-appindicator \
    gnome-shell-extension-dash-to-dock \
    gnome-shell-extension-desktop-icons-ng
```

#### 2. 主题配置

```bash
# 安装 GNOME Tweaks
sudo apt install gnome-tweaks

# 安装额外主题
sudo apt install \
    gnome-themes-extra \
    gtk2-engines-murrine \
    gtk2-engines-pixbuf
```

**使用 GNOME Tweaks 配置：**
- **外观** → 选择主题和图标
- **字体** → 调整字体大小
- **窗口** → 配置窗口行为

#### 3. Dock 配置

如果安装了 Dash to Dock 扩展：

```bash
# 通过扩展管理器配置 Dash to Dock
gnome-extensions prefs dash-to-dock@micxgx.gmail.com
```

## 🔒 安全配置

### 1. 防火墙设置

```bash
# 安装和启用 UFW
sudo apt install ufw
sudo ufw enable

# 基本规则
sudo ufw default deny incoming
sudo ufw default allow outgoing

# 允许 SSH（如果需要）
sudo ufw allow ssh
```

### 2. 自动更新配置

```bash
# 安装无人值守升级
sudo apt install unattended-upgrades

# 配置自动更新
sudo dpkg-reconfigure unattended-upgrades

# 编辑配置文件
sudo nano /etc/apt/apt.conf.d/50unattended-upgrades
```

### 3. 用户权限检查

```bash
# 检查用户组
groups $USER

# 确保用户在 sudo 组中
sudo usermod -aG sudo $USER

# 检查 sudo 权限
sudo -l
```

## 📱 必要软件安装

### 1. 浏览器

```bash
# Firefox ESR（通常已预装）
sudo apt install firefox-esr

# 或安装 Chromium
sudo apt install chromium-browser

# 或安装 Google Chrome
wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" | sudo tee /etc/apt/sources.list.d/google-chrome.list
sudo apt update
sudo apt install google-chrome-stable
```

### 2. 媒体编解码器

```bash
# 安装多媒体编解码器
sudo apt install \
    gstreamer1.0-plugins-base \
    gstreamer1.0-plugins-good \
    gstreamer1.0-plugins-bad \
    gstreamer1.0-plugins-ugly \
    gstreamer1.0-libav

# 安装 DVD 支持
sudo apt install libdvd-pkg
sudo dpkg-reconfigure libdvd-pkg
```

### 3. 办公软件

```bash
# 安装 LibreOffice
sudo apt install \
    libreoffice \
    libreoffice-l10n-zh-cn \
    libreoffice-help-zh-cn

# 安装 PDF 阅读器
sudo apt install evince
```

## 🔧 系统优化

### 1. 性能优化

```bash
# 安装性能监控工具
sudo apt install \
    htop iotop \
    sysstat nethogs

# 优化交换分区使用
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf

# 清理启动项
sudo systemctl disable bluetooth  # 如果不使用蓝牙
```

### 2. 电源管理

```bash
# 笔记本电源优化
sudo apt install tlp tlp-rdw

# 启用 TLP
sudo systemctl enable tlp
sudo systemctl start tlp

# 检查 TLP 状态
sudo tlp-stat
```

### 3. 清理系统

```bash
# 清理软件包缓存
sudo apt autoremove --purge
sudo apt autoclean

# 清理日志
sudo journalctl --vacuum-time=3d
```

## 📝 配置检查清单

完成首次配置后，请检查以下项目：

- [ ] **网络连接正常**
- [ ] **系统已更新到最新版本**
- [ ] **时区设置正确**
- [ ] **中文字体显示正常**
- [ ] **中文输入法工作正常**
- [ ] **音频设备正常工作**
- [ ] **必要软件已安装**
- [ ] **防火墙已启用**
- [ ] **用户权限配置正确**
- [ ] **自动更新已启用**

## 🆘 常见问题

### 登录问题

**问题：无法登录桌面**
```bash
# 切换到控制台（Ctrl+Alt+F2）
# 检查磁盘空间
df -h

# 检查用户主目录权限
ls -la /home/$USER

# 重置桌面配置
mv ~/.config ~/.config.backup
```

### 网络问题

**问题：无法连接网络**
```bash
# 检查网络接口
ip link show

# 重启网络服务
sudo systemctl restart NetworkManager

# 检查 DNS 配置
cat /etc/resolv.conf
```

### 语言显示问题

**问题：中文显示为方块**
```bash
# 重新安装中文字体
sudo apt install --reinstall fonts-noto-cjk

# 更新字体缓存
sudo fc-cache -fv

# 重新登录桌面
```

## 下一步

首次配置完成后，您可以继续：

1. [Shell 与命令行基础](/basics/command-line) - 学习 Linux 命令行操作
2. [深度系统配置](/basics/configuration) - 进一步优化系统
3. [选择桌面环境](/basics/desktop-environments) - 自定义桌面体验
4. [安装常用软件](/administration/packages) - 安装您需要的应用程序

---

**配置完成了吗？** [继续系统配置 →](/basics/configuration) 