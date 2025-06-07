---
title: 制作启动盘
description: 制作 Debian 13 安装启动盘的详细教程，支持 Windows、macOS 和 Linux
---

# 制作 Debian 启动盘

本教程将指导您使用下载的 Debian 13 镜像文件制作启动盘，支持从 Windows、macOS 和 Linux 系统制作。

## 🎯 准备工作

### 必需物品
- ✅ 已下载的 Debian 13 镜像文件（.iso）
- ✅ USB 闪存盘（至少 8GB 容量）
- ✅ 镜像写入工具

::: warning ⚠️ 重要提醒
制作启动盘会**完全擦除** USB 盘中的所有数据，请务必备份重要文件！
:::

### USB 盘要求

| 镜像类型 | 最小容量 | 推荐容量 | 备注 |
|----------|----------|----------|------|
| 网络安装版 | 1 GB | 4 GB | 下载的是 netinst.iso |
| DVD 完整版 | 8 GB | 16 GB | 完整安装包 |
| Live 版本 | 8 GB | 16 GB | 可以体验系统 |

## 🖥️ Windows 系统制作启动盘

### 方法一：Rufus（推荐）

**Rufus** 是最受欢迎的启动盘制作工具：

#### 1. 下载 Rufus
- 访问 [Rufus 官网](https://rufus.ie/)
- 下载最新版本（推荐便携版）

#### 2. 使用 Rufus 制作
1. **插入 USB 盘**
2. **运行 Rufus**
3. **选择设备**：在"设备"下拉菜单中选择您的 USB 盘
4. **选择镜像**：点击"选择"按钮，选择 Debian ISO 文件
5. **分区方案**：
   - UEFI 电脑：选择 "GPT"
   - 老式 BIOS：选择 "MBR"
6. **文件系统**：保持默认 "FAT32"
7. **开始制作**：点击"开始"按钮

::: tip 💡 分区方案选择
- 2012年后的电脑通常支持 UEFI，选择 GPT
- 老电脑或不确定的情况下选择 MBR
:::

#### 3. Rufus 详细设置

```
设备：[您的 USB 盘]
引导类型选择：磁盘或 ISO 镜像
分区方案：GPT（UEFI）或 MBR（BIOS）
目标系统：UEFI（非 CSM）或 BIOS
文件系统：FAT32
簇大小：4096字节（默认）
卷标：DEBIAN13
```

### 方法二：Etcher

**Balena Etcher** 操作更简单：

#### 1. 下载安装 Etcher
- 访问 [Etcher 官网](https://www.balena.io/etcher/)
- 下载 Windows 版本并安装

#### 2. 制作启动盘
1. **运行 Etcher**
2. **选择镜像**：点击"Flash from file"，选择 ISO 文件
3. **选择设备**：点击"Select target"，选择 USB 盘
4. **开始制作**：点击"Flash!"

### 方法三：Windows 自带工具

对于支持的系统，可以使用 Windows 自带的工具：

```powershell
# 使用 PowerShell（管理员权限）
# 1. 查看 USB 盘盘符
Get-Disk

# 2. 格式化 USB 盘（假设是盘符 E:）
Format-Volume -DriveLetter E -FileSystem FAT32 -NewFileSystemLabel "DEBIAN13"

# 3. 挂载 ISO 文件
Mount-DiskImage -ImagePath "C:\path\to\debian-13.0.0-amd64-netinst.iso"

# 4. 复制文件到 USB 盘
# 将挂载的 ISO 内容复制到 USB 盘
```

## 🍎 macOS 系统制作启动盘

### 方法一：Etcher（推荐）

与 Windows 版本相同：
1. 下载 [Etcher for macOS](https://www.balena.io/etcher/)
2. 安装并运行
3. 选择 ISO → 选择 USB → Flash

### 方法二：命令行 dd 命令

#### 1. 打开终端
按 <span class="kbd">⌘ + 空格</span>，输入"终端"

#### 2. 查找 USB 盘
```bash
# 查看所有磁盘
diskutil list

# 找到您的 USB 盘，通常类似 /dev/disk2
```

#### 3. 卸载 USB 盘
```bash
# 卸载但不弹出（假设是 disk2）
diskutil unmountDisk /dev/disk2
```

#### 4. 写入镜像
```bash
# 使用 dd 命令写入（注意：diskN 而不是 diskNs1）
sudo dd if=/path/to/debian-13.0.0-amd64-netinst.iso of=/dev/rdisk2 bs=1m

# 显示进度版本（macOS Big Sur+）
sudo dd if=/path/to/debian-13.0.0-amd64-netinst.iso of=/dev/rdisk2 bs=1m status=progress
```

::: danger ⚠️ 重要警告
dd 命令非常危险，务必确认 USB 盘的设备名称！错误的设备名可能擦除您的硬盘数据。
:::

#### 5. 弹出 USB 盘
```bash
diskutil eject /dev/disk2
```

## 🐧 Linux 系统制作启动盘

### 方法一：dd 命令（通用）

#### 1. 查找 USB 盘设备
```bash
# 插入 USB 盘前后对比
lsblk

# 或者查看内核消息
dmesg | tail

# USB 盘通常显示为 /dev/sdb、/dev/sdc 等
```

#### 2. 卸载 USB 盘
```bash
# 卸载所有分区（假设设备是 /dev/sdb）
sudo umount /dev/sdb*
```

#### 3. 写入镜像
```bash
# 基本写入
sudo dd if=/path/to/debian-13.0.0-amd64-netinst.iso of=/dev/sdb bs=4M

# 显示进度
sudo dd if=/path/to/debian-13.0.0-amd64-netinst.iso of=/dev/sdb bs=4M status=progress

# 确保写入完成
sync
```

### 方法二：GNOME Disks（图形界面）

#### 1. 打开 GNOME Disks
```bash
gnome-disks
```

#### 2. 制作启动盘
1. 选择您的 USB 盘
2. 点击右上角菜单
3. 选择"恢复磁盘映像"
4. 选择 ISO 文件
5. 开始恢复

### 方法三：使用 Etcher

Linux 版本的 Etcher：
```bash
# 下载 AppImage 版本
wget https://github.com/balena-io/etcher/releases/download/v1.18.11/balena-etcher-electron-1.18.11-linux-x64.AppImage

# 添加执行权限
chmod +x balena-etcher-electron-1.18.11-linux-x64.AppImage

# 运行
./balena-etcher-electron-1.18.11-linux-x64.AppImage
```

## 🔧 高级选项

### UEFI vs BIOS 启动

#### UEFI 启动盘制作
```bash
# 创建 UEFI 兼容的启动盘
# 分区表：GPT
# 文件系统：FAT32
# 启动文件：/EFI/boot/bootx64.efi
```

#### BIOS 启动盘制作
```bash
# 创建 BIOS 兼容的启动盘
# 分区表：MBR
# 文件系统：FAT32 或 ext4
# 启动代码：写入 MBR
```

### 混合启动盘

制作同时支持 UEFI 和 BIOS 的启动盘：

```bash
# 使用 isohybrid 工具
isohybrid --uefi debian-13.0.0-amd64-netinst.iso

# 然后用 dd 写入
sudo dd if=debian-13.0.0-amd64-netinst.iso of=/dev/sdb bs=4M status=progress
```

## ✅ 验证启动盘

### 检查文件结构

制作完成后，检查启动盘内容：

```bash
# 查看启动盘内容
ls -la /media/usb_mount_point/

# 应该看到类似的结构：
# EFI/          # UEFI 启动文件
# isolinux/     # BIOS 启动文件
# live/         # 系统文件
# boot/         # 内核文件
```

### 测试启动

**推荐测试方法：**
1. **虚拟机测试**：使用 VirtualBox 或 VMware 测试启动
2. **重启测试**：在目标机器上测试启动（不安装）

## 🛠️ 故障排除

### 常见问题

#### USB 盘无法启动
**可能原因：**
- BIOS/UEFI 设置问题
- 启动盘制作失败
- USB 盘硬件问题

**解决方案：**
1. 检查 BIOS 启动顺序
2. 尝试不同的 USB 端口
3. 重新制作启动盘
4. 使用不同的 USB 盘

#### 制作过程失败
**解决方案：**
1. 检查 ISO 文件完整性
2. 尝试不同的制作工具
3. 使用管理员权限运行
4. 检查 USB 盘是否有写保护

#### 启动后黑屏
**解决方案：**
1. 尝试"安全图形模式"启动选项
2. 检查显卡兼容性
3. 更换 USB 端口
4. 检查内存是否充足

### 调试命令

```bash
# 检查 USB 盘健康状况
sudo badblocks -v /dev/sdb

# 检查文件系统
sudo fsck /dev/sdb1

# 查看启动日志
dmesg | grep -i usb
```

## 📱 移动设备制作

### 使用手机制作启动盘

**Android 设备：**
- 使用 "DriveDroid" 应用
- 需要 root 权限
- 可以从手机存储启动

**iOS 设备：**
- 使用 "iSH" 应用
- 功能相对有限
- 主要用于测试

## 下一步

启动盘制作完成后：

1. [开始安装过程](/basics/installation) - 正式安装 Debian
2. [BIOS 设置指南](/basics/bios-settings) - 配置启动选项
3. [安装故障排除](/troubleshooting/installation-issues) - 解决安装问题

---

**启动盘制作完成？** [开始安装 Debian 13 →](/basics/installation) 