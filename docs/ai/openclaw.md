---
title: OpenClaw 安装与使用
description: 在 Debian 上安装和使用 OpenClaw 自托管 AI Agent 平台的完整指南
---

# OpenClaw

OpenClaw 是一个自托管的 AI Agent 平台，可在本地运行 AI 代理。它支持配置多种 AI 模型，提供 Web 管理界面，让用户能够在自己的基础设施上部署和管理 AI 代理，而无需依赖第三方托管服务。

## 前置要求

- 稳定的**网络连接**
- **AI 模型提供商 API Key**（如 Anthropic、OpenAI 等）
- 建议至少 **2GB 可用内存**

## 安装

```bash
# 使用安装脚本
curl -fsSL https://openclaw.ai/install.sh | bash

# 运行初始化向导（首次安装后执行）
openclaw onboard
```

初始化向导会引导您完成以下配置：

1. 设置管理员账户和密码
2. 配置 AI 模型提供商和 API Key
3. 选择默认的 AI 模型

## 配置与使用

### 启动 Dashboard

```bash
# 启动 OpenClaw Dashboard
openclaw dashboard

# 访问 Web 管理界面
# 默认地址: http://127.0.0.1:18789/
```

### Web 管理界面

OpenClaw 的 Web 管理界面提供了以下功能：

- **模型配置** — 添加和管理不同的 AI 模型提供商及其 API Key
- **权限管理** — 控制 AI 代理的文件访问和命令执行权限
- **Skill 安装** — 浏览和安装社区提供的 Skill 扩展，增强代理能力
- **会话管理** — 查看和管理与 AI 代理的交互历史

### 自定义端口

如果默认端口 18789 与其他服务冲突，可以指定其他端口：

```bash
# 使用自定义端口启动
openclaw dashboard --port 9090

# 此时访问地址变为: http://127.0.0.1:9090/
```

## 安全注意事项

::: warning 安全提醒
OpenClaw 作为自托管服务，默认仅监听本地回环地址。在实际部署中请务必注意以下安全事项：
:::

- **修改默认密码** — 初始化完成后，立即修改默认的管理员密码
- **不要将服务暴露到公网** — 除非配置了适当的认证和加密措施，否则不应将 OpenClaw 服务暴露到公共网络
- **使用反向代理** — 如需远程访问，建议通过 Nginx 或 Caddy 等反向代理配置 HTTPS
- **定期更新** — 及时更新 OpenClaw 以获取最新的安全修复

```bash
# 配置防火墙规则，仅允许本地访问
sudo ufw allow from 127.0.0.1 to any port 18789

# 如需通过反向代理提供远程访问，参考 Nginx 配置示例
# server {
#     listen 443 ssl;
#     server_name openclaw.example.com;
#     location / {
#         proxy_pass http://127.0.0.1:18789;
#     }
# }
```

## 更新与卸载

```bash
# 更新到最新版本
curl -fsSL https://openclaw.ai/install.sh | bash

# 查看当前版本
openclaw --version
```

## 常见问题

### 启动失败提示端口被占用

```bash
# 检查端口占用情况
sudo ss -tlnp | grep 18789

# 终止占用端口的进程，或使用其他端口启动
openclaw dashboard --port 9090
```

### 无法连接 AI 模型

```bash
# 确认 API Key 配置正确
# 可在 Web 管理界面的模型配置页面检查

# 检查网络连接
curl -I https://api.anthropic.com

# 如需使用代理
export HTTPS_PROXY='http://your-proxy:port'
openclaw dashboard
```

### Dashboard 页面无法加载

```bash
# 确认服务已正常启动
openclaw dashboard

# 检查浏览器是否正确访问了 http://127.0.0.1:18789/
# 注意：默认仅监听 127.0.0.1，使用局域网 IP 无法访问
```

## 相关链接

- [OpenClaw 官方网站](https://openclaw.ai/)
- [OpenClaw GitHub 仓库](https://github.com/openclaw-ai/openclaw)
- [反向代理配置](/server/reverse-proxy) - 配置 Nginx/Caddy 反向代理
- [AI 工具总览](/ai/) - 返回 AI 工具概览页

---

**OpenClaw 配置好了吗？** [返回 AI 工具总览 →](/ai/)
