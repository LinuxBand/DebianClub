---
title: Aider 安装与使用
description: 在 Debian 上安装和使用 Aider 开源 AI 配对编程命令行工具的完整指南
---

# Aider

Aider 是一个开源的 AI 配对编程命令行工具，支持 Claude、GPT、DeepSeek 和本地模型，可直接在终端中进行 AI 辅助代码编写。它与 Git 深度集成，能够自动提交代码变更，支持多文件同时编辑，是终端用户进行 AI 辅助开发的理想选择。

## 前置要求

- **Python 3.9+**：Debian 13 已预装 Python 3，可通过 `python3 --version` 确认版本
- **AI 提供商的 API Key**：至少需要一个 AI 模型提供商的 API Key（如 Anthropic、OpenAI 或 DeepSeek 等）
- **Git**：Aider 依赖 Git 进行版本管理，Debian 13 通常已预装

## 安装

```bash
# 方法 1：pip 安装（推荐）
pip install aider-chat

# 方法 2：pipx 安装（隔离环境，避免依赖冲突）
sudo apt install pipx
pipx install aider-chat

# 方法 3：使用官方安装脚本
curl -LsSf https://aider.chat/install.sh | sh

# 验证安装
aider --version
```

::: tip 提示
如果系统提示 `pip` 需要使用虚拟环境，推荐使用 `pipx` 方式安装，它会自动创建隔离的 Python 环境。
:::

## 配置

### API Key 设置

根据您使用的 AI 模型提供商，设置对应的环境变量：

```bash
# Anthropic Claude（推荐）
export ANTHROPIC_API_KEY='your-api-key-here'

# OpenAI
export OPENAI_API_KEY='your-api-key-here'

# DeepSeek
export DEEPSEEK_API_KEY='your-api-key-here'

# 将环境变量添加到 Shell 配置文件以永久生效
echo 'export ANTHROPIC_API_KEY="your-api-key-here"' >> ~/.bashrc
source ~/.bashrc
```

::: warning 注意
API Key 属于敏感信息，请妥善保管，切勿将其提交到版本控制系统中。
:::

### 模型选择

Aider 支持多种 AI 模型，可通过 `--model` 参数指定：

```bash
# 使用 Claude 3.5 Sonnet
aider --model claude-3.5-sonnet

# 使用 GPT-4o
aider --model gpt-4o

# 使用 DeepSeek
aider --model deepseek/deepseek-chat

# 查看所有支持的模型
aider --models
```

## 基本使用

```bash
# 在项目目录中启动 Aider
cd /path/to/project
aider

# 指定要编辑的文件
aider file1.py file2.py

# 直接发送提示信息
aider --message "给这个函数添加错误处理"
```

### 交互式命令

在 Aider 会话中，可以使用以下斜杠命令：

| 命令 | 说明 |
|------|------|
| `/add <文件>` | 将文件添加到当前会话的编辑范围 |
| `/drop <文件>` | 从当前会话中移除文件 |
| `/diff` | 查看当前的代码变更差异 |
| `/undo` | 撤销上一次代码修改 |
| `/run <命令>` | 运行 Shell 命令并将输出分享给 AI |
| `/clear` | 清除当前对话历史 |
| `/help` | 查看帮助信息 |

## 特色功能

### Git 集成

Aider 与 Git 深度集成，每次代码修改都会自动创建 Git 提交，方便追踪所有 AI 辅助的变更：

```bash
# 启动时 Aider 会自动检测 Git 仓库
aider

# 如果不想自动提交，可以禁用此功能
aider --no-auto-commits

# 查看 Aider 生成的提交记录
git log --oneline
```

### 多文件编辑

Aider 能够理解项目中多个文件之间的关系，并同时对多个文件进行协调编辑：

```bash
# 同时编辑多个文件
aider src/main.py src/utils.py tests/test_main.py
```

### 语音编码

Aider 支持语音输入，您可以通过语音描述需求来编写代码：

```bash
# 启用语音模式
aider --voice
```

### 图片支持

Aider 支持将图片作为上下文发送给 AI，适用于根据设计稿编写代码等场景：

```bash
# 添加图片作为上下文
aider --read design.png
```

## 更新与卸载

```bash
# pip 方式更新
pip install --upgrade aider-chat

# pipx 方式更新
pipx upgrade aider-chat

# pip 方式卸载
pip uninstall aider-chat

# pipx 方式卸载
pipx uninstall aider-chat
```

## 常见问题

### 安装后提示找不到 `aider` 命令

```bash
# 检查 Python 用户级安装路径是否在 PATH 中
echo $PATH | tr ':' '\n' | grep -i local

# 如果缺少，添加到 PATH
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

### Git 相关错误

```bash
# 确认当前目录是一个 Git 仓库
git status

# 如果不是 Git 仓库，先初始化
git init
git add .
git commit -m "初始提交"
```

### 网络连接超时

如果您所在的网络环境需要代理访问，可配置相应的代理环境变量：

```bash
# 设置代理
export HTTPS_PROXY='http://your-proxy:port'
export HTTP_PROXY='http://your-proxy:port'
```

## 相关链接

- [Aider 官方网站](https://aider.chat/)
- [Aider GitHub 仓库](https://github.com/Aider-AI/aider)
- [AI 工具总览](/ai/) - 返回 AI 工具概览页

---

**Aider 配置好了吗？** [了解更多 AI 工具 →](/ai/cline)
