---
title: Zed 编辑器安装与使用
description: 在 Debian 上安装和使用 Zed 高性能 AI 代码编辑器的完整指南，涵盖安装配置、AI 集成和本地模型接入
---

# Zed 编辑器

Zed 是一款用 Rust 编写的高性能代码编辑器，由 Atom 编辑器的创建者开发。它以极致的性能为核心设计目标，内置 AI 辅助功能，支持 LLM 集成、Agent 编辑和内联助手，同时提供多人实时协作能力。

## 前置要求

- **架构**：64 位系统（x86_64 或 ARM64）
- **桌面环境**：GNOME、KDE Plasma 或其他桌面环境
- **依赖**：Vulkan 兼容的 GPU 驱动（用于 GPU 加速渲染）
- **网络**：使用 AI 功能时需要网络连接（本地模型除外）

## 安装

```bash
# 方法 1：官方安装脚本（推荐）
curl -f https://zed.dev/install.sh | sh

# 方法 2：手动下载安装
# 从 https://zed.dev/download 下载对应架构的 tar.gz 压缩包
tar -xzf zed-linux-x86_64.tar.gz
sudo ln -s $(pwd)/zed.app/bin/zed /usr/local/bin/zed

# 启动 Zed
zed
```

::: tip 提示
官方安装脚本会自动将 Zed 安装到 `~/.local/bin/` 目录并配置桌面快捷方式。如果安装后命令未找到，请确认 `~/.local/bin` 在 PATH 中。
:::

## 基本配置

### AI 功能配置

Zed 支持多种 AI 服务提供商，可在设置文件中配置：

```bash
# 打开 Zed 设置文件
# 在 Zed 中按 Ctrl+, 或通过菜单 Zed > Settings
```

在设置文件 `settings.json` 中配置 AI 提供商：

```json
{
  "language_models": {
    "anthropic": {
      "api_key": "your-anthropic-api-key"
    },
    "openai": {
      "api_key": "your-openai-api-key"
    }
  }
}
```

### 接入 Ollama 本地模型

Zed 支持直接接入本地运行的 Ollama 模型，无需消耗 API 额度：

```json
{
  "language_models": {
    "ollama": {
      "api_url": "http://localhost:11434"
    }
  }
}
```

::: tip 提示
使用 Ollama 本地模型前，需要先安装并运行 Ollama 服务。详见 [Ollama 安装与使用](/ai/ollama)。
:::

## 核心功能

### 高性能编辑

Zed 使用 Rust 编写并采用 GPU 加速渲染，在大型项目中依然保持流畅：

- **启动速度** -- 毫秒级冷启动，无需等待
- **文件搜索** -- 极速全项目文件和符号搜索
- **大文件处理** -- 流畅编辑大型文件而不卡顿

### AI 内联助手

在编辑器中直接与 AI 交互：

- 选中代码后使用 `Ctrl+Enter` 触发 AI 内联编辑
- 支持代码生成、重构、解释和修复
- AI 面板可用于多轮对话

### 多缓冲区编辑

Zed 支持同时在多个文件的多个位置进行编辑，配合 AI 功能可实现跨文件的智能修改。

### 实时协作

内置多人实时协作功能，支持：

- 共享编辑会话
- 实时光标跟踪
- 语音通话

## 常用快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl+P` | 快速打开文件 |
| `Ctrl+Shift+P` | 命令面板 |
| `Ctrl+Enter` | AI 内联助手 |
| `Ctrl+Shift+F` | 全项目搜索 |
| `Ctrl+,` | 打开设置 |

## 更新

```bash
# 官方脚本安装方式：重新运行安装脚本即可更新
curl -f https://zed.dev/install.sh | sh

# 手动安装方式：下载新版本替换旧文件
# 从 https://zed.dev/download 下载最新版本
```

## 常见问题

### 启动时提示 Vulkan 相关错误

Zed 依赖 Vulkan 进行 GPU 加速渲染，需要安装相应的驱动：

```bash
# 安装 Vulkan 相关组件
sudo apt install mesa-vulkan-drivers vulkan-tools

# 验证 Vulkan 是否可用
vulkaninfo --summary

# 如果使用 NVIDIA 显卡，确保安装了 NVIDIA 驱动
sudo apt install nvidia-driver
```

### 字体渲染异常

```bash
# 安装常用字体
sudo apt install fonts-firacode fonts-noto-cjk

# 在 Zed 设置中指定字体
# 打开 settings.json，添加：
# "buffer_font_family": "Fira Code"
```

### 安装脚本执行后命令未找到

```bash
# 确认 ~/.local/bin 在 PATH 中
echo $PATH | grep -q '.local/bin' || echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# 验证安装
which zed
zed --version
```

## 相关链接

- [Zed 官方网站](https://zed.dev/)
- [Zed GitHub 仓库](https://github.com/zed-industries/zed)
- [Zed 官方文档](https://zed.dev/docs)
- [AI 工具总览](/ai/) - 返回 AI 工具概览页

---

**Zed 配置好了吗？** [了解本地模型工具 Ollama ->](/ai/ollama)
