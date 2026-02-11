---
title: Windsurf 安装与使用
description: 在 Debian 上安装和使用 Windsurf AI IDE 的完整指南，涵盖 APT 仓库配置、AI 功能使用和常见问题
---

# Windsurf AI IDE

Windsurf 是 Codeium 推出的首款 AI Agent IDE，基于 VS Code 架构构建，提供深度 AI 集成的开发体验。它不仅继承了 VS Code 的全部功能和扩展生态，还能自动导入现有的 VS Code 插件和设置，让开发者以最低的迁移成本享受 AI 驱动的编码流程。

## 前置要求

- **操作系统**：Debian 10 或更高版本
- **架构**：64 位系统（amd64）
- **桌面环境**：GNOME、KDE Plasma 或其他桌面环境
- **网络**：需要稳定的互联网连接以使用 AI 功能
- **Codeium 账户**：需注册 Codeium 账户以激活 AI 功能

## 安装

```bash
# 通过 APT 仓库安装（推荐）
# 添加 GPG 签名密钥
curl -fsSL https://windsurf-stable.codeiumdata.com/wVxQEIWkwPUEAGf3/windsurf.gpg | sudo gpg --dearmor -o /usr/share/keyrings/windsurf-stable-archive-keyring.gpg

# 添加 APT 仓库
echo "deb [signed-by=/usr/share/keyrings/windsurf-stable-archive-keyring.gpg arch=amd64] https://windsurf-stable.codeiumdata.com/wVxQEIWkwPUEAGf3/apt stable main" | sudo tee /etc/apt/sources.list.d/windsurf.list

# 更新软件包索引并安装
sudo apt update
sudo apt install windsurf

# 启动 Windsurf
windsurf
```

::: tip 提示
通过 APT 仓库安装后，Windsurf 会在系统更新时自动获取新版本，无需手动维护。
:::

## 基本配置

### 首次启动

首次启动 Windsurf 时，需要完成以下步骤：

1. **登录账户** -- 使用 Codeium 账户登录以启用 AI 功能
2. **选择 AI 模型** -- 在设置中选择偏好的 AI 模型（支持多种模型切换）
3. **导入 VS Code 设置** -- Windsurf 会自动检测并提示导入已有的 VS Code 扩展、主题和键位绑定

### 常用快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl+Shift+P` | 命令面板 |
| `Ctrl+P` | 快速打开文件 |
| `Ctrl+L` | 打开 AI 对话面板 |
| `Ctrl+I` | 内联 AI 编辑 |

## 核心功能

### Cascade（AI Agent 流）

Cascade 是 Windsurf 的核心 AI 功能，它不仅能回答编程问题，还能主动执行操作：

- **代码生成** -- 根据自然语言描述自动生成代码
- **多文件编辑** -- 理解项目上下文，同时修改多个相关文件
- **命令执行** -- 在终端中自动运行构建、测试等命令
- **调试协助** -- 分析错误信息并提供修复建议

### 内联编辑

在编辑器中选中代码后，可直接通过 AI 进行修改：

- 选中代码 -> 右键 -> AI 编辑
- 或使用快捷键触发内联 AI 编辑
- 支持代码重构、优化、添加注释等操作

### 多文件上下文

Windsurf 能够自动索引整个项目，理解文件之间的依赖关系，在 AI 交互时提供完整的项目上下文。

## 更新

```bash
# 通过 APT 自动更新
sudo apt update
sudo apt upgrade windsurf
```

## 常见问题

### 启动时出现黑屏或白屏

这通常与 GPU 加速相关，可尝试禁用 GPU 加速：

```bash
# 使用 --disable-gpu 参数启动
windsurf --disable-gpu
```

### 中文输入法无法正常使用

在某些桌面环境下，需要配置输入法相关环境变量：

```bash
# 在 ~/.bashrc 或 ~/.profile 中添加（以 fcitx 为例）
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS=@im=fcitx
```

### GPG 密钥过期或无效

如果 APT 更新时提示密钥问题，可重新导入密钥：

```bash
# 删除旧密钥并重新导入
sudo rm /usr/share/keyrings/windsurf-stable-archive-keyring.gpg
curl -fsSL https://windsurf-stable.codeiumdata.com/wVxQEIWkwPUEAGf3/windsurf.gpg | sudo gpg --dearmor -o /usr/share/keyrings/windsurf-stable-archive-keyring.gpg
sudo apt update
```

## 相关链接

- [Windsurf 官方网站](https://windsurf.com/)
- [Codeium 官方文档](https://docs.codeium.com/)
- [AI 工具总览](/ai/) - 返回 AI 工具概览页

---

**Windsurf 配置好了吗？** [了解更多 AI 编辑器 Zed ->](/ai/zed)
