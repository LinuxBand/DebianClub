---
title: OpenCode 安装与使用
description: 在 Debian 上安装和使用 OpenCode 开源终端 AI 编码代理的完整指南
---

# OpenCode

OpenCode 是一个开源的终端 AI 编码代理，支持多种 AI 模型提供商（Anthropic Claude、OpenAI、Google Gemini、本地模型等），提供类似 Claude Code 的终端 AI 编程体验。作为开源项目，OpenCode 允许用户自由选择 AI 服务商，并且可以根据需要进行自定义配置。

## 前置要求

- **Node.js 18+**：安装方法参见 [AI 工具总览](/ai/#通用前置要求)
- **AI 提供商的 API Key**：至少需要一个 AI 模型提供商的 API Key（如 Anthropic、OpenAI 或 Google 等）

## 安装

```bash
# 方法 1：安装脚本（推荐）
curl -fsSL https://opencode.ai/install | bash

# 方法 2：通过 npm 安装
npm install -g opencode-ai@latest

# 验证安装
opencode --version
```

## 配置

在使用 OpenCode 之前，需要配置至少一个 AI 提供商的 API Key。

```bash
# 设置 AI 提供商 API Key（以 Anthropic 为例）
export ANTHROPIC_API_KEY='your-api-key-here'

# 或使用 OpenAI
export OPENAI_API_KEY='your-api-key-here'

# 或使用 Google Gemini
export GOOGLE_API_KEY='your-api-key-here'

# 将环境变量添加到 Shell 配置文件以永久生效
echo 'export ANTHROPIC_API_KEY="your-api-key-here"' >> ~/.bashrc
source ~/.bashrc
```

首次运行 OpenCode 时，会引导选择默认使用的 AI 模型：

```bash
# 首次运行，进入配置向导
opencode
```

## 基本使用

```bash
# 启动交互式会话
opencode

# 在项目目录中使用
cd /path/to/project
opencode
```

### 代理模式

OpenCode 内置了不同的代理模式以适应不同的使用场景：

| 模式 | 说明 |
|------|------|
| **build** | 完全权限的开发模式，可以读写文件、执行命令 |
| **plan** | 只读分析模式，仅分析代码结构和提供建议，不执行修改操作 |

在交互式会话中，可以根据需要切换不同的代理模式，以控制 OpenCode 对项目的操作权限。

## 多模型支持

OpenCode 的一大优势是支持灵活切换多种 AI 模型。您可以同时配置多个提供商的 API Key，根据任务需求选择最适合的模型：

```bash
# 同时配置多个提供商
export ANTHROPIC_API_KEY='your-anthropic-key'
export OPENAI_API_KEY='your-openai-key'
export GOOGLE_API_KEY='your-google-key'
```

## 更新与卸载

```bash
# 通过安装脚本更新
curl -fsSL https://opencode.ai/install | bash

# npm 方式更新
npm update -g opencode-ai

# 卸载
npm uninstall -g opencode-ai
```

## 常见问题

### 安装后提示找不到 `opencode` 命令

```bash
# 重新加载 Shell 配置
source ~/.bashrc

# 检查 npm 全局安装路径
npm config get prefix
# 确认该路径下的 bin 目录在 PATH 中
```

### 模型请求返回错误

```bash
# 确认 API Key 已正确设置
echo $ANTHROPIC_API_KEY

# 检查网络连接是否正常
curl -I https://api.anthropic.com

# 如需使用代理
export HTTPS_PROXY='http://your-proxy:port'
```

### 如何使用本地模型

OpenCode 支持通过兼容 OpenAI API 的本地模型服务（如 Ollama）使用本地模型。配置本地模型的 API 端点即可使用：

```bash
# 以 Ollama 为例，先安装并启动 Ollama
# 然后将 OpenCode 的 API 端点指向本地服务
export OPENAI_API_BASE='http://localhost:11434/v1'
```

## 相关链接

- [OpenCode 官方网站](https://opencode.ai/)
- [OpenCode GitHub 仓库](https://github.com/opencode-ai/opencode)
- [AI 工具总览](/ai/) - 返回 AI 工具概览页

---

**OpenCode 配置好了吗？** [了解自托管 AI 平台 OpenClaw →](/ai/openclaw)
