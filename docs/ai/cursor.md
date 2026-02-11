---
title: Cursor 安装与使用
description: 在 Debian 上安装和使用 Cursor AI 代码编辑器的完整指南
---

# Cursor AI 编辑器

Cursor 是一款基于 VS Code 架构的 AI 驱动代码编辑器，内置 AI 助手，支持智能代码补全、对话式编程和代码重构。它保留了 VS Code 的全部功能和扩展生态，同时深度集成了 AI 能力，为开发者提供更高效的编码体验。

## 前置要求

- **64 位系统**：x86_64 或 ARM64 架构
- **内存**：4GB 以上（推荐 8GB+）
- **桌面环境**：GNOME、KDE 或其他桌面环境
- **Cursor 账户**：需注册 Cursor 账户使用 AI 功能

## 安装

```bash
# 方法 1：下载 .deb 包安装（推荐）
# 从 https://www.cursor.com/downloads 下载对应架构的 .deb 文件
sudo dpkg -i cursor_*.deb
sudo apt install -f  # 修复可能缺少的依赖

# 方法 2：AppImage 方式
# 从 https://www.cursor.com/downloads 下载 AppImage 文件
chmod +x Cursor-*.AppImage
./Cursor-*.AppImage
```

### 为 AppImage 创建桌面快捷方式

如果使用 AppImage 方式安装，可以手动创建桌面快捷方式以便从应用菜单启动。

```bash
# 将 AppImage 移动到固定位置
mkdir -p ~/.local/bin
mv Cursor-*.AppImage ~/.local/bin/cursor.AppImage

# 创建桌面快捷方式
mkdir -p ~/.local/share/applications
cat > ~/.local/share/applications/cursor.desktop << 'EOF'
[Desktop Entry]
Name=Cursor
Exec=$HOME/.local/bin/cursor.AppImage
Icon=cursor
Type=Application
Categories=Development;IDE;
Comment=AI-powered code editor
EOF
```

## 基本配置

### 首次启动

首次启动 Cursor 时，需要完成以下配置：

1. **登录账户** — 使用 Cursor 账户登录以启用 AI 功能
2. **选择 AI 模型** — Cursor 支持多种 AI 模型（Claude、GPT-4 等），可在设置中切换
3. **导入设置** — 如果此前使用 VS Code，Cursor 会提示导入已有配置

### 常用快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl+K` | 内联 AI 编辑（在光标位置生成或修改代码） |
| `Ctrl+L` | 打开 AI Chat 面板 |
| `Ctrl+I` | 打开 Composer（多文件 AI 编辑） |
| `Ctrl+Shift+P` | 命令面板 |
| `Ctrl+P` | 快速打开文件 |

## 从 VS Code 迁移

Cursor 基于 VS Code 构建，支持一键导入 VS Code 的全部配置。

```bash
# Cursor 首次启动时会提示导入，包括：
# - 扩展（Extensions）
# - 主题和设置（Themes & Settings）
# - 键位绑定（Keybindings）

# 如果错过了初始导入提示，可以在命令面板中搜索：
# Cursor Settings > General > Import VS Code Settings
```

::: tip 提示
Cursor 与 VS Code 使用相同的扩展市场，绝大部分 VS Code 扩展可以直接在 Cursor 中使用。
:::

## 更新

```bash
# .deb 方式：下载新版本覆盖安装
sudo dpkg -i cursor_new_version.deb

# AppImage 方式：下载新文件替换旧文件
mv Cursor-new-version.AppImage ~/.local/bin/cursor.AppImage
chmod +x ~/.local/bin/cursor.AppImage
```

## 常见问题

### 启动时出现黑屏或白屏

这通常与 GPU 加速相关，可尝试禁用 GPU 加速启动：

```bash
# 使用 --disable-gpu 参数启动
cursor --disable-gpu

# 或修改 AppImage 的启动方式
~/.local/bin/cursor.AppImage --disable-gpu
```

### 中文输入法无法正常使用

在某些桌面环境下，需要设置输入法相关环境变量：

```bash
# 在 ~/.bashrc 或 ~/.profile 中添加
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS=@im=fcitx

# 如果使用 ibus 输入法
export GTK_IM_MODULE=ibus
export QT_IM_MODULE=ibus
export XMODIFIERS=@im=ibus
```

### AppImage 提示无法运行

AppImage 依赖 FUSE 文件系统，需要确保系统已安装 `libfuse2`。

```bash
# 安装 libfuse2
sudo apt install libfuse2

# 如果仍然无法运行，尝试解压后运行
./Cursor-*.AppImage --appimage-extract
./squashfs-root/AppRun
```

## 相关链接

- [Cursor 官方网站](https://www.cursor.com/)
- [Cursor 下载页](https://www.cursor.com/downloads)
- [AI 工具总览](/ai/) - 返回 AI 工具概览页

---

**Cursor 配置好了吗？** [了解开源替代方案 OpenCode →](/ai/opencode)
