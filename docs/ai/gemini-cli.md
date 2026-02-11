---
title: Gemini CLI 安装与使用
description: 在 Debian 上安装和使用 Google Gemini CLI 开源命令行 AI 工具的完整指南
---

# Gemini CLI

Gemini CLI 是 Google 推出的开源命令行 AI 工具，基于 Gemini 模型，支持代码生成、项目管理和多模态交互。个人用户可通过 Google 账号免费使用，每分钟 60 次请求、每天 1000 次请求，非常适合日常开发使用。

## 前置要求

- **Node.js 18+**：安装方法参见 [AI 工具总览](/ai/#通用前置要求)
- **Google 账号**：用于认证和获取免费 API 额度

## 安装

```bash
# 通过 npm 全局安装
npm install -g @google/gemini-cli

# 验证安装
gemini --version

# 首次运行，登录 Google 账号
gemini
```

首次启动时，Gemini CLI 会引导您完成 Google 账号认证：

1. 终端中会显示一个认证 URL
2. 在浏览器中打开该 URL
3. 使用 Google 账号登录并授权
4. 认证完成后自动返回终端

::: tip 提示
个人 Google 账号即可免费使用 Gemini CLI，无需额外的 API Key 或付费订阅。
:::

## 配置

### 认证方式

Gemini CLI 支持多种认证方式：

```bash
# 方式 1：Google 账号登录（推荐，免费）
# 首次运行 gemini 时自动引导登录
gemini

# 方式 2：使用 Google AI Studio API Key
export GOOGLE_API_KEY='your-api-key-here'

# 将环境变量添加到 Shell 配置文件以永久生效
echo 'export GOOGLE_API_KEY="your-api-key-here"' >> ~/.bashrc
source ~/.bashrc
```

### 模型选择

```bash
# 使用默认模型（Gemini 2.5 Pro）
gemini

# 指定其他模型
gemini --model gemini-2.5-flash
```

### 项目配置

Gemini CLI 支持项目级配置文件 `GEMINI.md`，类似于 Claude Code 的 `CLAUDE.md`：

```bash
# 在项目根目录创建配置文件
touch GEMINI.md
```

在 `GEMINI.md` 中可以定义项目的上下文信息、编码规范和常用指令，Gemini CLI 启动时会自动读取。

## 基本使用

### 交互式模式

```bash
# 启动交互式会话
gemini

# 在项目目录中使用（自动识别项目上下文）
cd /path/to/project
gemini
```

### 常用交互命令

在 Gemini CLI 交互式会话中，可以使用以下命令：

| 命令 | 说明 |
|------|------|
| `/help` | 查看帮助信息 |
| `/clear` | 清除当前对话历史 |
| `/stats` | 查看当前会话的统计信息 |
| `/quit` | 退出 Gemini CLI |

### 使用示例

```bash
# 启动后直接提问
gemini
> 分析这个项目的目录结构并给出优化建议

# 代码生成
> 创建一个 Python Flask API，包含用户注册和登录功能

# 代码审查
> 审查 src/main.py 中的代码，指出潜在的安全问题

# 调试帮助
> 运行测试并帮我修复失败的用例
```

## 特色功能

### 免费额度

Gemini CLI 为个人 Google 账号用户提供慷慨的免费使用额度：

| 限制类型 | 额度 |
|---------|------|
| 每分钟请求数 | 60 次 |
| 每日请求数 | 1000 次 |
| 模型 | Gemini 2.5 Pro |

### Google 搜索集成

Gemini CLI 可以调用 Google 搜索获取最新信息，帮助您在编码过程中查找最新的文档、API 变更和最佳实践。

### 多模态支持

Gemini CLI 支持图片输入，您可以将截图、设计稿等图片文件作为上下文提供给 AI：

```bash
# 在交互式会话中引用图片
gemini
> 请根据这张截图 @screenshot.png 实现对应的页面布局
```

### MCP 支持

Gemini CLI 支持模型上下文协议（MCP），可以连接外部工具和数据源，扩展 AI 的能力范围。

### 项目上下文感知

Gemini CLI 会自动分析当前项目的结构、依赖和代码风格，提供贴合项目实际情况的建议和代码生成。

## 更新与卸载

```bash
# 更新到最新版本
npm update -g @google/gemini-cli

# 卸载
npm uninstall -g @google/gemini-cli
```

## 常见问题

### 安装后提示找不到 `gemini` 命令

```bash
# 重新加载 Shell 配置
source ~/.bashrc

# 检查 npm 全局安装路径是否在 PATH 中
npm config get prefix
# 确认输出路径下的 bin 目录在 PATH 中

# 如果缺少，手动添加
echo 'export PATH="$(npm config get prefix)/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

### Google 账号认证失败

```bash
# 清除本地认证缓存后重新登录
rm -rf ~/.gemini/auth
gemini

# 如果浏览器无法自动打开，手动复制终端中的 URL 到浏览器
```

### 免费额度耗尽

如果达到每日请求限制，可以选择：

1. 等待次日额度重置（每日零点 UTC 重置）
2. 使用 Google AI Studio 的 API Key，获取更高的配额
3. 升级到 Google Cloud 付费方案

### 网络连接超时

如果您所在的网络环境需要代理访问：

```bash
# 设置代理
export HTTPS_PROXY='http://your-proxy:port'
export HTTP_PROXY='http://your-proxy:port'
```

## 相关链接

- [Gemini CLI GitHub 仓库](https://github.com/google-gemini/gemini-cli)
- [Google AI Studio](https://aistudio.google.com/)
- [Gemini API 文档](https://ai.google.dev/docs)
- [AI 工具总览](/ai/) - 返回 AI 工具概览页

---

**Gemini CLI 配置好了吗？** [返回 AI 工具总览 →](/ai/)
