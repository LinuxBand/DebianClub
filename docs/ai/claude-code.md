---
title: Claude Code 安装与使用
description: 在 Debian 上安装和使用 Anthropic Claude Code 终端 AI 编码工具的完整指南
---

# Claude Code

Claude Code 是 Anthropic 官方推出的终端 AI 编码工具，可直接在命令行中与 Claude 交互进行代码编写、调试和项目管理。它能够理解整个项目的代码库，执行文件操作、运行命令，并提供智能的代码建议和修改方案。

## 前置要求

- **Node.js 18+**：安装方法参见 [AI 工具总览](/ai/#通用前置要求)
- **Anthropic API Key**（API 方式）或 **Claude Pro/Max 订阅**（OAuth 方式）
- 需要稳定的网络连接

## 安装

```bash
# 方法 1：原生安装器（推荐）
curl -fsSL https://claude.ai/install.sh | bash

# 刷新 Shell 环境
source ~/.bashrc

# 验证安装
claude --version

# 方法 2：通过 npm 全局安装
npm install -g @anthropic-ai/claude-code
```

::: tip 提示
原生安装器会自动处理 PATH 配置，推荐大多数用户使用此方式。
:::

## 认证与配置

Claude Code 支持两种认证方式，根据您的订阅情况选择其一即可。

```bash
# 方式 1：使用 API Key
export ANTHROPIC_API_KEY='your-api-key-here'

# 将环境变量添加到 Shell 配置文件以永久生效
echo 'export ANTHROPIC_API_KEY="your-api-key-here"' >> ~/.bashrc
source ~/.bashrc

# 方式 2：使用 OAuth（Claude Pro/Max 订阅用户）
# 首次运行 claude 时会自动引导浏览器登录
claude
```

::: warning 注意
API Key 属于敏感信息，请妥善保管，切勿将其提交到版本控制系统中。
:::

## 基本使用

```bash
# 启动交互式会话
claude

# 直接发送提示
claude "解释这段代码的作用"

# 在项目目录中使用（Claude Code 会自动分析项目结构）
cd /path/to/project
claude

# 使用管道传入内容
cat error.log | claude "分析这个错误日志"

# 查看帮助
claude --help
```

## 常用功能

在 Claude Code 交互式会话中，可以使用以下斜杠命令：

| 命令 | 说明 |
|------|------|
| `/init` | 初始化项目配置，生成 CLAUDE.md 文件 |
| `/compact` | 压缩当前上下文，释放 Token 空间 |
| `/clear` | 清除当前对话历史 |
| `/cost` | 查看当前会话的 Token 用量和费用 |

其他实用操作：

- 按 **Tab** 键可接受 Claude 的建议
- 按 **Esc** 键可取消正在进行的操作
- 使用 **Ctrl+C** 中断当前生成

## 更新与卸载

```bash
# 更新到最新版本（原生安装方式）
claude update

# npm 方式更新
npm update -g @anthropic-ai/claude-code

# 卸载（npm 方式）
npm uninstall -g @anthropic-ai/claude-code
```

## 常见问题

### 安装后提示找不到 `claude` 命令

这通常是 PATH 环境变量未正确配置所致。

```bash
# 重新加载 Shell 配置
source ~/.bashrc

# 如果仍然无效，检查 npm 全局安装路径是否在 PATH 中
npm config get prefix
# 确认输出的路径下的 bin 目录在 PATH 中
```

### 认证失败

```bash
# API Key 方式：确认环境变量已正确设置
echo $ANTHROPIC_API_KEY

# OAuth 方式：清除本地认证缓存后重新登录
claude auth logout
claude
```

### 网络连接超时

如果您所在的网络环境需要代理访问，可配置相应的代理环境变量：

```bash
# 设置代理
export HTTPS_PROXY='http://your-proxy:port'
export HTTP_PROXY='http://your-proxy:port'
```

## 相关链接

- [Claude Code 官方文档](https://docs.anthropic.com/en/docs/claude-code)
- [Anthropic API 文档](https://docs.anthropic.com/)
- [AI 工具总览](/ai/) - 返回 AI 工具概览页

---

**Claude Code 配置好了吗？** [了解更多 AI 工具 →](/ai/cursor)
