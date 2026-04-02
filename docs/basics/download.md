---
title: 下载安装镜像
description: 下载 Debian 13 官方安装镜像和选择合适版本的完整指南
---

# 下载 Debian 13 安装镜像

::: tip 交互式下载
想要快速下载？访问 [交互式下载页面](/download)，选择您的地区和镜像站，一键获取最新 Debian 安装镜像。
:::

本页面将指导您下载正确的 Debian 13 安装镜像。我们会详细说明不同版本的区别，帮助您选择最适合的版本。

## 🎯 快速下载

### 推荐版本（大多数用户）

::: tip 🚀 推荐下载
**Debian 13.4 (Trixie) — 当前稳定版**
- 文件大小：约 400 MB（netinst）
- 适用于：现代 64 位计算机
- 需要网络连接进行安装
:::

**下载链接：**
- [官方下载页面](https://www.debian.org/download)
- [交互式下载页面](/download)（推荐，自动选择最佳镜像）

## 📦 版本选择指南

### 1. 按安装方式选择

#### 网络安装版（推荐）
```
debian-13.0.0-amd64-netinst.iso
大小：~400 MB
```
**优势：**
- ✅ 文件小，下载快
- ✅ 始终获得最新软件包
- ✅ 可选择安装的软件

**劣势：**
- ❌ 需要稳定的网络连接
- ❌ 安装时间较长

#### DVD 完整版
```
debian-13.0.0-amd64-DVD-1.iso
大小：~4.7 GB
```
**优势：**
- ✅ 包含大部分常用软件
- ✅ 无需网络连接安装
- ✅ 安装速度快

**劣势：**
- ❌ 文件大，下载时间长
- ❌ 软件包可能不是最新

#### Live DVD 版
```
debian-live-13.0.0-amd64-gnome.iso
大小：~3.5 GB
```
**优势：**
- ✅ 可以先体验后安装
- ✅ 包含图形界面
- ✅ 适合测试兼容性

**劣势：**
- ❌ 文件较大
- ❌ 安装选项相对较少

### 2. 按处理器架构选择

| 架构 | 适用设备 | 文件名包含 |
|------|----------|-----------|
| **amd64** | 现代 64位 PC/笔记本（主流推荐） | `-amd64-` |
| **arm64** | ARM 64位设备（树莓派4+、Apple M系列等） | `-arm64-` |
| **armhf** | ARM 32位设备（老版树莓派等） | `-armhf-` |

::: warning ⚠️ 架构选择重要提示
大部分现代计算机（2006年后）都应选择 **amd64** 版本，即使是 Intel 处理器也使用这个版本。Debian 13 不再提供 i386（32位）安装镜像，如需在旧式 32 位机器上安装，请使用 antiX Linux 等发行版。
:::

## 🌐 下载镜像站选择

### 中国大陆推荐镜像

| 镜像站 | 运营方 | 速度 | 稳定性 |
|--------|--------|------|--------|
| [清华大学](https://mirrors.tuna.tsinghua.edu.cn/debian-cd/) | TUNA | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| [中科大](https://mirrors.ustc.edu.cn/debian-cd/) | USTC | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| [腾讯云](https://mirrors.cloud.tencent.com/debian-cd/) | 腾讯 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| [阿里云](https://mirrors.aliyun.com/debian-cd/) | 阿里巴巴 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| [华为云](https://mirrors.huaweicloud.com/debian-cd/) | 华为 | ⭐⭐⭐ | ⭐⭐⭐ |

### 其他地区镜像

| 地区 | 推荐镜像站 |
|------|-----------|
| **台湾** | [NCHC](https://mirror.nchc.org.tw/debian-cd/) |
| **香港** | [CUHK](https://mirror.cse.cuhk.edu.hk/debian-cd/) |
| **日本** | [理研](https://ftp.riken.jp/Linux/debian-cd/) |
| **美国** | [MIT](https://debian.csail.mit.edu/debian-cd/) |
| **欧洲** | [官方镜像](https://cdimage.debian.org/debian-cd/) |

## 💾 下载方法详解

### 方法一：浏览器直接下载（推荐新手）

1. **选择镜像站**：推荐使用清华大学镜像
2. **进入目录**：`current/amd64/iso-cd/`
3. **选择文件**：`debian-13.0.0-amd64-netinst.iso`
4. **开始下载**：点击文件名开始下载

### 方法二：命令行下载

#### 使用 wget
```bash
# 下载网络安装版
wget https://mirrors.tuna.tsinghua.edu.cn/debian-cd/current/amd64/iso-cd/debian-13.0.0-amd64-netinst.iso

# 后台下载并显示进度
wget -c --progress=bar:force https://mirrors.tuna.tsinghua.edu.cn/debian-cd/current/amd64/iso-cd/debian-13.0.0-amd64-netinst.iso
```

#### 使用 curl
```bash
# 下载并显示进度
curl -L -O https://mirrors.tuna.tsinghua.edu.cn/debian-cd/current/amd64/iso-cd/debian-13.0.0-amd64-netinst.iso

# 断点续传
curl -L -C - -O https://mirrors.tuna.tsinghua.edu.cn/debian-cd/current/amd64/iso-cd/debian-13.0.0-amd64-netinst.iso
```

### 方法三：BT 下载（推荐）

BT 下载通常更快且对服务器友好：

```bash
# 下载种子文件
wget https://cdimage.debian.org/debian-cd/current/amd64/bt-cd/debian-13.0.0-amd64-netinst.iso.torrent

# 使用命令行 BT 客户端
transmission-cli debian-13.0.0-amd64-netinst.iso.torrent
```

**推荐 BT 客户端：**
- **qBittorrent**（跨平台，开源）
- **Transmission**（Linux/macOS）
- **Deluge**（跨平台）

## 🔐 文件完整性验证

下载完成后，**强烈建议**验证文件完整性：

### 1. 下载校验文件

```bash
# 下载 SHA256 校验文件
wget https://mirrors.tuna.tsinghua.edu.cn/debian-cd/current/amd64/iso-cd/SHA256SUMS

# 下载 GPG 签名（可选）
wget https://mirrors.tuna.tsinghua.edu.cn/debian-cd/current/amd64/iso-cd/SHA256SUMS.sign
```

### 2. 验证文件完整性

#### 在 Linux/macOS 中：
```bash
# 验证 SHA256 校验和
sha256sum -c SHA256SUMS 2>/dev/null | grep netinst

# 应该显示：debian-13.0.0-amd64-netinst.iso: OK
```

#### 在 Windows 中：
```powershell
# 使用 PowerShell
Get-FileHash debian-13.0.0-amd64-netinst.iso -Algorithm SHA256

# 对比 SHA256SUMS 文件中的值
```

### 3. GPG 签名验证（推荐）

```bash
# 导入 Debian CD 签名密钥
gpg --keyserver keyring.debian.org --recv-keys 0x988021A964E6EA7D

# 验证签名
gpg --verify SHA256SUMS.sign SHA256SUMS
```

::: tip 🔒 安全提示
文件完整性验证可以确保下载的镜像没有被篡改，这对系统安全非常重要。
:::

## 📂 桌面环境选择

不同的 Live 镜像包含不同的桌面环境：

| 镜像文件 | 桌面环境 | 特点 | 适合用户 |
|----------|----------|------|----------|
| `gnome.iso` | GNOME | 现代化，触控友好 | 新手，现代设计爱好者 |
| `kde.iso` | KDE Plasma | 高度可定制 | 喜欢自定义的用户 |
| `xfce.iso` | Xfce | 轻量级，传统 | 老机器，传统桌面爱好者 |
| `lxde.iso` | LXDE | 极简轻量 | 低配置机器 |
| `mate.iso` | MATE | GNOME 2 延续 | 喜欢传统界面的用户 |
| `cinnamon.iso` | Cinnamon | 现代但传统 | Windows 用户过渡 |

## 🚀 下载优化技巧

### 提高下载速度

1. **选择就近镜像**：使用本地或邻近地区的镜像站
2. **使用多线程下载**：
   ```bash
   # 使用 aria2 多线程下载
   aria2c -x 8 -s 8 https://mirrors.tuna.tsinghua.edu.cn/debian-cd/current/amd64/iso-cd/debian-13.0.0-amd64-netinst.iso
   ```
3. **避开高峰期**：在网络使用较少的时间段下载
4. **使用 BT 下载**：通常比 HTTP 更快更稳定

### 断点续传

如果下载中断，可以使用断点续传：

```bash
# wget 断点续传
wget -c https://mirrors.tuna.tsinghua.edu.cn/debian-cd/current/amd64/iso-cd/debian-13.0.0-amd64-netinst.iso

# curl 断点续传
curl -L -C - -O https://mirrors.tuna.tsinghua.edu.cn/debian-cd/current/amd64/iso-cd/debian-13.0.0-amd64-netinst.iso
```

## 🆘 下载问题解决

### 常见问题

#### 下载速度很慢
**解决方案：**
1. 更换镜像站
2. 使用 BT 下载
3. 检查网络连接
4. 避开网络高峰期

#### 下载失败或文件损坏
**解决方案：**
1. 检查网络连接稳定性
2. 使用断点续传
3. 验证文件完整性
4. 重新下载

#### 无法验证文件完整性
**解决方案：**
1. 确保校验文件完整下载
2. 检查命令语法
3. 使用图形界面工具验证

## 下一步

镜像下载完成后，您可以：

1. [虚拟机体验](/basics/virtual-machine) - 先在虚拟机中零风险体验 Debian
2. [制作启动盘](/basics/bootable-media) - 创建安装媒体
3. [开始安装过程](/basics/installation) - 正式安装 Debian
4. [了解桌面环境](/basics/desktop-environments) - 选择合适的界面

---

**镜像下载完成？** [继续制作启动盘 →](/basics/bootable-media) 