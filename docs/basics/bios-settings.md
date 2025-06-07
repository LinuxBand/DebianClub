---
title: BIOS 设置指南
description: 详细的 BIOS/UEFI 设置指南，帮助配置启动选项以安装 Debian 13
---

# BIOS 设置指南

本教程详细介绍如何配置 BIOS/UEFI 设置，以便从 USB 启动盘安装 Debian 13。

## 🔧 进入 BIOS/UEFI

### 常见按键方式

| 品牌 | 按键 | 时机 |
|------|------|------|
| **Dell** | F2 或 F12 | 开机时反复按压 |
| **HP** | F2 或 F10 | 看到品牌logo时 |
| **Lenovo** | F1、F2 或 Enter | 开机即按 |
| **Asus** | F2 或 Delete | 开机时连续按 |
| **Acer** | F2 或 Delete | 品牌画面出现时 |
| **MSI** | Delete 或 F11 | 开机立即按 |
| **华硕** | F2 或 Delete | 开机时按住 |
| **联想** | F1 或 F2 | 启动时按压 |

### 进入方法

::: tip 💡 操作技巧
1. **关闭快速启动** - 在 Windows 中禁用快速启动功能
2. **冷启动** - 完全关机后再开机，不要重启
3. **连续按压** - 开机后立即连续按压相应按键
4. **多次尝试** - 如果失败，重启后再试
:::

## ⚙️ BIOS 设置项目

### 启动相关设置

#### Boot Mode (启动模式)
```
UEFI Mode (推荐)
- 支持大于 2TB 硬盘
- 更快的启动速度  
- 更好的安全性

Legacy Mode (传统模式)
- 兼容老旧硬件
- 传统 MBR 分区表
```

#### Secure Boot (安全启动)
```
状态：通常需要禁用
位置：Security > Secure Boot
设置：Disabled

原因：部分 Linux 发行版需要禁用安全启动
```

#### Fast Boot (快速启动)
```
状态：建议禁用
位置：Boot > Fast Boot
设置：Disabled

原因：可能跳过 USB 设备检测
```

### USB 启动设置

#### USB Boot Priority (USB启动优先级)
```bash
# 设置步骤：
1. 进入 Boot 选项卡
2. 找到 Boot Priority 或 Boot Order
3. 将 USB Storage 或 USB HDD 置顶
4. 保存并退出
```

#### Legacy USB Support
```
状态：启用
位置：Advanced > USB Options
设置：Enabled

作用：支持在 BIOS 中识别 USB 设备
```

## 🖥️ 不同品牌 BIOS 设置

### Dell 电脑设置

```bash
# 进入方式：开机按 F2
1. 选择 "Boot Sequence"
2. 将 "USB Storage Device" 设为第一位
3. 如果是 UEFI 模式，选择 "UEFI Boot"
4. 按 F10 保存退出
```

### 联想电脑设置

```bash
# 进入方式：开机按 F1 或 F2
1. 进入 "Startup" 选项卡
2. 设置 "Boot Mode" 为 UEFI
3. 在 "Boot Priority Order" 中将 USB 设为第一
4. 保存设置 (F10)
```

### 华硕电脑设置

```bash
# 进入方式：开机按 F2 或 Delete
1. 进入 "Boot" 选项卡
2. 将 "Launch CSM" 设为 Enabled (如需Legacy支持)
3. 设置 "Boot Option #1" 为 USB 设备
4. 按 F10 保存
```

### HP 电脑设置

```bash
# 进入方式：开机按 F10
1. 选择 "System Configuration"
2. 进入 "Boot Options"
3. 启用 "USB Boot"
4. 调整启动顺序，USB 设备优先
5. 保存退出
```

## 🔍 UEFI vs Legacy 对比

### UEFI 模式 (推荐)

::: tip ✅ UEFI 优势
- **更大硬盘支持** - 支持 >2TB 硬盘
- **更快启动** - 启动速度更快
- **图形界面** - 现代化的设置界面
- **网络支持** - 可以从网络启动
- **安全启动** - 防止恶意软件
:::

```bash
# UEFI 设置要点：
Boot Mode: UEFI
Secure Boot: Disabled (安装时)
Fast Boot: Disabled
CSM: Disabled
```

### Legacy 模式

::: warning ⚠️ Legacy 限制
- **硬盘限制** - 最大支持 2TB
- **启动较慢** - 传统启动方式
- **文本界面** - 基于文本的设置
- **兼容性** - 适合老旧硬件
:::

```bash
# Legacy 设置要点：
Boot Mode: Legacy
USB Boot: Enabled
Boot Priority: USB First
```

## 🔧 常见问题解决

### 找不到 USB 启动选项

::: details 🔍 解决方案
```bash
1. 确认 USB 制作成功
   - 使用其他电脑验证
   - 重新制作启动盘

2. 检查 BIOS 设置
   - 启用 Legacy USB Support
   - 禁用 Fast Boot
   - 切换 UEFI/Legacy 模式

3. USB 端口问题
   - 尝试不同 USB 端口
   - 使用 USB 2.0 端口
   - 避免使用 USB Hub
```
:::

### 安全启动问题

::: details 🔐 Secure Boot 处理
```bash
# 临时解决方案：
1. 禁用 Secure Boot
2. 安装完成后可重新启用

# 长期方案：
1. 使用支持 Secure Boot 的发行版
2. 签名自定义内核
3. 添加可信密钥
```
:::

### 启动失败问题

::: details ❌ 启动故障排除
```bash
# 检查列表：
□ USB 启动盘制作正确
□ BIOS 启动顺序正确
□ 禁用 Fast Boot
□ 禁用 Secure Boot
□ USB 端口工作正常
□ 内存条安装正确

# 高级选项：
1. 清除 CMOS
2. 更新 BIOS 版本
3. 检查硬件兼容性
```
:::

## 📝 设置检查清单

在进行 Debian 安装前，请确认以下设置：

| 项目 | 设置值 | 状态 |
|------|--------|------|
| Boot Mode | UEFI (推荐) | ☐ |
| Secure Boot | Disabled | ☐ |
| Fast Boot | Disabled | ☐ |
| USB Boot | Enabled | ☐ |
| Boot Priority | USB First | ☐ |
| Legacy USB Support | Enabled | ☐ |

## 🚀 下一步操作

BIOS 设置完成后：

1. **插入 USB 启动盘** - 确保制作正确的启动媒体
2. **保存设置** - 按 F10 保存 BIOS 设置
3. **重启电脑** - 从 USB 启动盘启动
4. **开始安装** - 进入 Debian 安装界面

## 📚 相关资源

- [制作启动盘](/basics/bootable-media) - 创建安装媒体
- [安装过程](/basics/installation) - 详细安装步骤
- [安装故障排除](/troubleshooting/installation-issues) - 解决安装问题

**BIOS 设置完成了吗？** [开始制作启动盘 →](/basics/bootable-media) 