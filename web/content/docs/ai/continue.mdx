---
title: Continue 安装与使用
description: 在 Debian 上安装和使用 Continue 开源 AI 代码助手平台的完整指南
---

# Continue

Continue 是一个开源 AI 代码助手平台（GitHub 26K+ Stars），支持 VS Code 和 JetBrains IDE 扩展，以及独立的 CLI 工具，可连接任意 AI 模型。它提供代码自动补全、内联编辑和对话式编程等功能，并允许用户通过 Ollama 等工具连接本地模型，实现完全离线的 AI 辅助开发。

## 前置要求

- **VS Code 或 JetBrains IDE**：用于安装 Continue 编辑器扩展
- **Node.js 18+**（仅 CLI 工具需要）：安装方法参见 [AI 工具总览](/ai/#通用前置要求)
- **AI 模型提供商的 API Key** 或 **本地模型运行环境**（如 Ollama）

## 安装

### VS Code 扩展

```bash
# 命令行安装
code --install-extension Continue.continue

# 验证安装
code --list-extensions | grep Continue
```

或在 VS Code 中：扩展面板（Ctrl+Shift+X）→ 搜索 "Continue" → 安装。

### JetBrains IDE 插件

1. 打开 JetBrains IDE（IntelliJ IDEA、PyCharm、WebStorm 等）
2. 进入 Settings → Plugins
3. 搜索 "Continue" → 安装
4. 重启 IDE

### CLI 工具

```bash
# 通过 npm 全局安装
npm install -g @continuedev/cli

# 验证安装
continue --version
```

## 配置

### 模型提供商配置

Continue 通过 `config.json` 文件管理模型配置。首次启动时会自动创建配置文件：

```bash
# 配置文件位置
~/.continue/config.json
```

编辑配置文件，添加您的 AI 模型提供商：

```json
{
  "models": [
    {
      "title": "Claude 3.5 Sonnet",
      "provider": "anthropic",
      "model": "claude-3-5-sonnet-latest",
      "apiKey": "your-anthropic-api-key"
    },
    {
      "title": "GPT-4o",
      "provider": "openai",
      "model": "gpt-4o",
      "apiKey": "your-openai-api-key"
    }
  ]
}
```

### 使用本地模型（Ollama）

Continue 支持通过 Ollama 连接本地运行的开源模型，无需 API Key：

```bash
# 先安装 Ollama
curl -fsSL https://ollama.com/install.sh | sh

# 下载模型
ollama pull codellama
ollama pull llama3

# 在 config.json 中添加本地模型配置
```

对应的 `config.json` 配置：

```json
{
  "models": [
    {
      "title": "Ollama CodeLlama",
      "provider": "ollama",
      "model": "codellama"
    }
  ]
}
```

### 自动补全配置

Continue 提供 Tab 键代码自动补全功能，可在配置中设置自动补全使用的模型：

```json
{
  "tabAutocompleteModel": {
    "title": "Starcoder",
    "provider": "ollama",
    "model": "starcoder2:3b"
  }
}
```

## 基本使用

### 编辑器中使用

Continue 在 VS Code 和 JetBrains IDE 中提供以下核心交互方式：

| 快捷键 | 功能 | 说明 |
|--------|------|------|
| `Tab` | 代码自动补全 | 接受 AI 生成的代码补全建议 |
| `Ctrl+L` | 打开对话面板 | 与 AI 进行对话式交互 |
| `Ctrl+I` | 内联编辑 | 选中代码后直接在编辑器中进行 AI 修改 |
| `Ctrl+Shift+R` | 重构代码 | 对选中的代码进行 AI 辅助重构 |

### 对话式编程

在 Continue 对话面板中，您可以：

- 询问代码相关问题
- 请求生成新代码
- 要求解释现有代码
- 寻求调试帮助

### 上下文引用

在对话中可以使用 `@` 引用不同类型的上下文：

| 引用方式 | 说明 |
|---------|------|
| `@file` | 引用项目中的特定文件 |
| `@codebase` | 引用整个代码库（自动索引） |
| `@docs` | 引用项目文档 |
| `@terminal` | 引用终端输出内容 |
| `@git diff` | 引用当前的 Git 变更 |

### CLI 工具使用

```bash
# 启动交互式会话
continue

# 在项目目录中使用
cd /path/to/project
continue
```

## 更新与卸载

```bash
# VS Code 扩展更新
code --install-extension Continue.continue --force

# CLI 工具更新
npm update -g @continuedev/cli

# VS Code 扩展卸载
code --uninstall-extension Continue.continue

# CLI 工具卸载
npm uninstall -g @continuedev/cli
```

## 常见问题

### 自动补全不工作

1. 确认已在配置中设置了 `tabAutocompleteModel`
2. 检查对应的模型服务是否正常运行（本地模型需确认 Ollama 已启动）
3. 在 VS Code 中检查 Continue 扩展输出日志：

```
查看 → 输出 → 下拉菜单选择 "Continue"
```

### 无法连接本地模型

```bash
# 确认 Ollama 服务正在运行
systemctl status ollama

# 启动 Ollama 服务
ollama serve

# 验证模型已下载
ollama list

# 测试模型是否正常响应
curl http://localhost:11434/api/generate -d '{"model": "codellama", "prompt": "hello"}'
```

### 配置文件错误

```bash
# 检查配置文件语法
cat ~/.continue/config.json | python3 -m json.tool

# 如果配置损坏，可以删除后重新生成
rm ~/.continue/config.json
# 重启 VS Code，Continue 会自动创建默认配置
```

## 相关链接

- [Continue 官方网站](https://continue.dev/)
- [Continue GitHub 仓库](https://github.com/continuedev/continue)
- [Continue 文档](https://docs.continue.dev/)
- [AI 工具总览](/ai/) - 返回 AI 工具概览页

---

**Continue 配置好了吗？** [了解更多 AI 工具 →](/ai/github-copilot)
