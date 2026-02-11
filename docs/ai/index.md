---
title: AI 工具
description: Debian 上 AI 工具的安装与使用指南，涵盖编码助手、AI 编辑器、本地大模型、图像生成、AI 平台等
---

# AI 工具指南

随着人工智能技术的快速发展，AI 工具已深入开发者日常工作流的方方面面 —— 从终端里的编码代理、智能 IDE，到本地运行的大语言模型和图像生成工具。本指南将介绍如何在 Debian 系统上安装和使用各类主流 AI 工具。

## AI 编辑器 / IDE

内置 AI 功能的代码编辑器，提供智能补全、对话式编程和代码重构。

| 工具 | 说明 | 开源 | 安装方式 |
|------|------|------|----------|
| [Cursor](/ai/cursor) | 基于 VS Code 的 AI 编辑器，内置 AI 助手 | 否 | .deb / AppImage |
| [Windsurf](/ai/windsurf) | Codeium 推出的 AI Agent IDE | 否 | APT 仓库 |
| [Zed](/ai/zed) | Rust 编写的高性能编辑器，内置 LLM 集成 | 是 | 安装脚本 |

## AI 编码助手 (CLI)

在终端中运行的 AI 编码工具，适合命令行工作流。

| 工具 | 说明 | 开源 | 安装方式 |
|------|------|------|----------|
| [Claude Code](/ai/claude-code) | Anthropic 官方终端 AI 编码工具 | 否 | 安装脚本 / npm |
| [Aider](/ai/aider) | AI 配对编程 CLI，支持多模型 | 是 | pip |
| [OpenCode](/ai/opencode) | 开源终端 AI 编码代理 | 是 | 安装脚本 / npm |
| [Cline](/ai/cline) | VS Code 自主编码代理（500 万+用户） | 是 | VS Code 扩展 |
| [Continue](/ai/continue) | 开源 AI 代码助手（26K+ Stars） | 是 | VS Code / JetBrains / CLI |
| [GitHub Copilot](/ai/github-copilot) | GitHub 官方 AI 编码助手 | 否 | gh CLI 扩展 |
| [Gemini CLI](/ai/gemini-cli) | Google 开源命令行 AI 工具，个人免费 | 是 | npm |

## 本地大模型

在本地运行大语言模型，保护隐私，无需联网。

| 工具 | 说明 | 安装方式 |
|------|------|----------|
| [Ollama](/ai/ollama) | 最流行的本地 LLM 运行工具 | 安装脚本 |
| [LM Studio](/ai/lm-studio) | 图形化本地 LLM 管理 | AppImage |
| [llama.cpp](/ai/llama-cpp) | 高效 C++ LLM 推理引擎 | 编译安装 |
| [llamafile](/ai/llamafile) | 单文件可执行 LLM，零依赖 | 下载即用 |
| [Jan](/ai/jan) | 本地 AI 聊天应用，隐私优先 | AppImage / .deb |
| [LocalAI](/ai/localai) | OpenAI API 兼容的本地推理服务 | Docker |

## AI 图像与语音

本地运行的 AI 图像生成和语音识别工具。

| 工具 | 说明 | 安装方式 |
|------|------|----------|
| [Stable Diffusion WebUI](/ai/stable-diffusion) | 最流行的 AI 图像生成界面 | Git + Python |
| [ComfyUI](/ai/comfyui) | 节点式 AI 图像生成 UI | Python |
| [OpenAI Whisper](/ai/whisper) | 语音识别和转录工具 | pip |

## AI 平台与自动化

可视化 AI 应用构建平台和工作流自动化工具。

| 工具 | 说明 | 安装方式 |
|------|------|----------|
| [Dify](/ai/dify) | LLM 应用开发平台，可视化工作流 + RAG | Docker |
| [n8n](/ai/n8n) | 工作流自动化平台，400+ 应用集成 | Docker / npm |
| [OpenClaw](/ai/openclaw) | 自托管 AI Agent 平台 | 安装脚本 |

## 通用前置要求

许多 AI 工具依赖 Node.js 或 Python 运行环境，建议提前安装。

### Node.js

Claude Code、OpenCode、Gemini CLI 等工具需要 Node.js 18+。

```bash
# 安装 Node.js 22.x (通过 NodeSource)
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# 验证
node --version
npm --version
```

### Python

Aider、Whisper、Stable Diffusion 等工具需要 Python 3.9+。

```bash
# Debian 13 默认包含 Python 3
sudo apt install python3 python3-pip python3-venv
```

### Docker

Dify、n8n、LocalAI 等平台推荐使用 Docker 部署。

```bash
sudo apt install docker.io docker-compose-plugin
sudo usermod -aG docker $USER
# 重新登录以生效
```

### NVIDIA GPU 驱动

本地大模型和图像生成工具可使用 GPU 加速。

```bash
# 安装 NVIDIA 驱动
sudo apt install nvidia-driver

# 验证
nvidia-smi
```

::: tip 提示
不是所有工具都需要 GPU。Ollama、llama.cpp 等工具在纯 CPU 模式下也能运行，只是速度较慢。
:::

## 相关资源

1. [开发环境搭建](/applications/development) — 编程语言和开发框架
2. [IDE 配置详解](/applications/ide) — VS Code 等 IDE 的深度配置
3. [Docker 指南](/server/docker) — Docker 安装和使用

---

**准备好提升开发效率了吗？** [从 Claude Code 开始 →](/ai/claude-code)
