---
title: GitHub Copilot CLI 安装与使用
description: 在 Debian 上安装和使用 GitHub Copilot CLI 及编辑器扩展的完整指南
---

# GitHub Copilot CLI

GitHub Copilot 是 GitHub 官方推出的 AI 编码助手，提供 CLI 工具和编辑器扩展，支持代码补全、聊天和命令行辅助。通过 GitHub CLI 的 Copilot 扩展，您可以直接在终端中获取命令建议、代码解释等 AI 辅助功能。

## 前置要求

- **GitHub 账户**：需要拥有 GitHub Copilot 订阅（个人版、商业版或企业版）
- **GitHub CLI（gh）**：用于安装和使用 Copilot CLI 扩展
- 需要稳定的网络连接

::: tip 提示
GitHub Copilot 提供免费试用期，学生和开源项目维护者可以申请免费使用。GitHub Copilot Free 计划每月提供 2000 次代码补全和 50 条聊天消息。
:::

## 安装

### GitHub CLI 安装

```bash
# 安装 GitHub CLI
sudo apt update
sudo apt install gh

# 验证安装
gh --version

# 登录 GitHub（会引导浏览器认证）
gh auth login
```

### Copilot CLI 扩展

```bash
# 安装 Copilot CLI 扩展
gh extension install github/gh-copilot

# 验证安装
gh copilot --help
```

### VS Code 扩展

```bash
# 安装 GitHub Copilot VS Code 扩展
code --install-extension GitHub.copilot

# 安装 GitHub Copilot Chat 扩展
code --install-extension GitHub.copilot-chat

# 验证安装
code --list-extensions | grep copilot
```

## 配置

### GitHub 认证

Copilot CLI 通过 GitHub CLI 的认证机制工作，确保已登录即可：

```bash
# 检查认证状态
gh auth status

# 如果未登录，执行登录
gh auth login

# 选择 GitHub.com → HTTPS → 浏览器认证
```

### VS Code 中配置

安装 Copilot 扩展后，首次使用时 VS Code 会弹出提示要求登录 GitHub 账户：

1. 点击 VS Code 右下角的 Copilot 图标
2. 按照提示完成 GitHub 账户授权
3. 授权成功后即可使用

## 基本使用

### CLI 命令建议

```bash
# 根据自然语言描述获取命令建议
gh copilot suggest "查找当前目录下所有大于100MB的文件"

# 获取 Git 相关命令建议
gh copilot suggest "撤销最近一次提交但保留代码变更"

# 获取系统管理命令建议
gh copilot suggest "查看占用 8080 端口的进程"
```

### CLI 命令解释

```bash
# 解释复杂命令的作用
gh copilot explain "git rebase -i HEAD~3"

# 解释管道命令
gh copilot explain "find . -name '*.log' -mtime +7 -exec rm {} \;"

# 解释系统命令
gh copilot explain "iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE"
```

### VS Code 中使用

| 功能 | 操作方式 | 说明 |
|------|---------|------|
| 代码补全 | 正常编码时自动触发 | 按 Tab 接受建议，按 Esc 忽略 |
| 内联聊天 | `Ctrl+I` | 在编辑器中直接与 Copilot 对话 |
| 聊天面板 | `Ctrl+Shift+I` | 打开侧边栏聊天面板 |
| 代码解释 | 选中代码 → 右键 → Copilot | 解释选中的代码 |

### 聊天面板使用

在 VS Code 的 Copilot Chat 面板中，可以使用以下命令：

| 命令 | 说明 |
|------|------|
| `/explain` | 解释选中的代码 |
| `/fix` | 修复代码中的问题 |
| `/tests` | 为选中的代码生成测试 |
| `/doc` | 为代码生成文档注释 |
| `@workspace` | 引用整个工作区作为上下文 |
| `@terminal` | 引用终端输出 |

## 更新与卸载

```bash
# 更新 Copilot CLI 扩展
gh extension upgrade github/gh-copilot

# 更新 VS Code 扩展
code --install-extension GitHub.copilot --force
code --install-extension GitHub.copilot-chat --force

# 卸载 Copilot CLI 扩展
gh extension remove github/gh-copilot

# 卸载 VS Code 扩展
code --uninstall-extension GitHub.copilot
code --uninstall-extension GitHub.copilot-chat
```

## 常见问题

### GitHub CLI 登录失败

```bash
# 清除现有认证并重新登录
gh auth logout
gh auth login

# 如果浏览器认证有问题，可以使用令牌方式
# 在 GitHub 设置中生成 Personal Access Token
gh auth login --with-token < token.txt
```

### Copilot 扩展安装失败

```bash
# 确认 GitHub CLI 版本符合要求
gh --version

# 如果版本过低，更新 GitHub CLI
sudo apt update
sudo apt install --only-upgrade gh

# 重新安装扩展
gh extension install github/gh-copilot
```

### VS Code 中 Copilot 不工作

1. 确认已登录 GitHub 账户且有活跃的 Copilot 订阅
2. 检查 VS Code 右下角的 Copilot 图标状态
3. 查看输出面板中的 Copilot 日志：

```
查看 → 输出 → 下拉菜单选择 "GitHub Copilot"
```

### 网络连接问题

如果您所在的网络环境需要代理访问：

```bash
# 为 GitHub CLI 设置代理
gh config set http_proxy http://your-proxy:port

# 为 VS Code 设置代理
# 在 VS Code 设置中搜索 "proxy"，配置 Http: Proxy
```

## 相关链接

- [GitHub Copilot 官方网站](https://github.com/features/copilot)
- [GitHub Copilot 文档](https://docs.github.com/en/copilot)
- [GitHub CLI 文档](https://cli.github.com/)
- [AI 工具总览](/ai/) - 返回 AI 工具概览页

---

**GitHub Copilot 配置好了吗？** [了解更多 AI 工具 →](/ai/gemini-cli)
