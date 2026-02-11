---
title: Cline 安装与使用
description: 在 Debian 上安装和使用 Cline 自主 AI 编码代理 VS Code 扩展的完整指南
---

# Cline

Cline 是一个自主 AI 编码代理，作为 VS Code 扩展运行，可以编辑文件、运行命令、使用浏览器，支持 MCP（模型上下文协议），已拥有超过 500 万用户。Cline 能够自主完成复杂的开发任务，同时在执行每一步操作前都会征求用户确认，确保开发者始终掌控全局。

## 前置要求

- **VS Code 或 Cursor**：需要安装 Visual Studio Code 或 Cursor 编辑器
- **AI 提供商的 API Key**：支持 Anthropic Claude、OpenAI、Google Gemini、AWS Bedrock 等多种提供商
- 需要稳定的网络连接

## 安装

```bash
# 方法 1：VS Code 扩展市场安装
# 打开 VS Code → 扩展（Ctrl+Shift+X）→ 搜索 "Cline" → 安装

# 方法 2：命令行安装扩展
code --install-extension saoudrizwan.claude-dev

# 验证安装（查看已安装的扩展列表）
code --list-extensions | grep claude-dev
```

::: tip 提示
Cline 的扩展 ID 为 `saoudrizwan.claude-dev`，这是其早期名称的遗留。在 VS Code 扩展市场中直接搜索 "Cline" 即可找到。
:::

## 配置

### API Key 设置

安装完成后，需要在 Cline 设置面板中配置 AI 模型提供商：

1. 打开 VS Code 侧边栏中的 Cline 面板（点击 Cline 图标）
2. 点击设置齿轮图标
3. 选择 API 提供商（如 Anthropic、OpenAI、OpenRouter 等）
4. 输入对应的 API Key
5. 选择要使用的模型

### 支持的模型提供商

| 提供商 | 推荐模型 | 说明 |
|--------|---------|------|
| Anthropic | Claude 3.5 Sonnet | 编码能力最强，推荐首选 |
| OpenAI | GPT-4o | 通用性强，响应快速 |
| OpenRouter | 多种模型 | 支持多种模型的统一接口 |
| Google Gemini | Gemini Pro | Google 的大语言模型 |
| AWS Bedrock | Claude 系列 | 企业级部署方案 |

### 自动审批设置

Cline 默认在执行每个操作前都会请求用户确认。您可以根据需要配置自动审批规则：

```
设置路径：Cline 面板 → 设置 → Auto Approve

可配置的自动审批项：
- 读取文件
- 写入文件
- 执行命令
- 浏览器操作
```

::: warning 注意
建议初次使用时保持默认设置（全部需要确认），熟悉 Cline 的行为模式后再根据需要开启自动审批。
:::

## 基本使用

### 启动 Cline

1. 点击 VS Code 侧边栏中的 Cline 图标，打开 Cline 面板
2. 在输入框中输入您的需求描述
3. Cline 会分析任务并逐步执行，每步操作都会展示给您确认

### 上下文引用

Cline 支持使用 `@` 符号引用项目中的文件和文件夹作为上下文：

| 引用方式 | 说明 |
|---------|------|
| `@file` | 引用特定文件作为上下文 |
| `@folder` | 引用整个文件夹作为上下文 |
| `@problems` | 引用 VS Code 问题面板中的诊断信息 |
| `@url` | 引用网页内容作为上下文 |

### 使用示例

```
# 在 Cline 面板输入以下提示：

请阅读 @src/main.py 并为所有公共函数添加类型注解

帮我修复 @problems 中列出的所有 TypeScript 类型错误

根据 @docs/api-spec.md 中的 API 规范，生成对应的路由处理函数
```

## 特色功能

### MCP 支持

Cline 支持模型上下文协议（MCP），可以连接外部工具和数据源，扩展 AI 的能力范围：

- 连接数据库查询数据
- 集成项目管理工具
- 访问外部 API 服务

### 浏览器自动化

Cline 可以启动浏览器执行操作，适用于前端开发调试：

- 自动打开开发服务器
- 截取页面截图进行视觉分析
- 交互式调试 Web 应用

### 终端命令执行

Cline 可以在 VS Code 集成终端中执行命令：

- 安装依赖包
- 运行测试套件
- 启动开发服务器
- 执行构建和部署脚本

## 更新

Cline 作为 VS Code 扩展，会通过 VS Code 的扩展更新机制自动更新。您也可以手动检查更新：

```bash
# 命令行更新扩展
code --install-extension saoudrizwan.claude-dev --force
```

或在 VS Code 中：扩展面板 → 找到 Cline → 点击更新按钮（如有可用更新）。

## 常见问题

### Cline 面板未显示

```bash
# 确认扩展已正确安装
code --list-extensions | grep claude-dev

# 如果未安装，重新安装
code --install-extension saoudrizwan.claude-dev

# 重启 VS Code
```

### API Key 配置后无法连接

1. 确认 API Key 正确无误，没有多余的空格或换行符
2. 检查网络连接是否正常
3. 如需使用代理，在 VS Code 设置中配置代理：

```json
{
  "http.proxy": "http://your-proxy:port"
}
```

### 文件操作权限不足

Cline 的文件操作依赖于 VS Code 的工作区权限。确保已正确打开项目文件夹：

```bash
# 以项目目录打开 VS Code
code /path/to/project
```

## 相关链接

- [Cline 官方网站](https://cline.bot/)
- [Cline GitHub 仓库](https://github.com/cline/cline)
- [VS Code 扩展市场](https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev)
- [AI 工具总览](/ai/) - 返回 AI 工具概览页

---

**Cline 配置好了吗？** [了解更多 AI 工具 →](/ai/continue)
