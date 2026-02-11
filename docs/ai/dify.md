---
title: Dify 安装与使用
description: 在 Debian 上安装和使用 Dify 开源 LLM 应用开发平台的完整指南
---

# Dify

Dify 是一个开源的 LLM（大语言模型）应用开发平台，提供可视化的工作流编排、RAG（检索增强生成）、Agent 构建和模型管理功能。它让非技术人员也能通过拖拽式的界面构建 AI 应用，同时为开发者提供完整的 API 接口。Dify 支持接入 OpenAI、Anthropic、本地 Ollama 等多种模型提供商，是搭建企业级 AI 应用的优秀选择。

## 前置要求

- **Docker 和 Docker Compose**：Dify 通过容器化部署，需要 Docker 环境
- **CPU**：2 核心以上
- **内存**：4GB 以上（推荐 8GB）
- **磁盘空间**：至少 20GB 可用空间

::: tip 提示
如果您尚未安装 Docker，可以参考 [Docker 安装指南](/server/docker) 完成安装。
:::

## 安装

### 安装 Docker 环境

```bash
# 安装 Docker 和 Docker Compose 插件
sudo apt install docker.io docker-compose-plugin

# 将当前用户添加到 docker 组（避免每次使用 sudo）
sudo usermod -aG docker $USER

# 重新登录以使用户组变更生效
# 或执行以下命令在当前会话中生效
newgrp docker

# 验证 Docker 安装
docker --version
docker compose version
```

### 部署 Dify

```bash
# 克隆 Dify 仓库
git clone https://github.com/langgenius/dify.git
cd dify/docker

# 复制环境变量配置文件
cp .env.example .env

# 启动所有服务
docker compose up -d

# 查看容器运行状态
docker compose ps

# 查看启动日志（可选，排查启动问题）
docker compose logs -f
```

启动完成后，访问以下地址：

| 服务 | 地址 | 说明 |
|------|------|------|
| Web 界面 | `http://localhost/install` | 首次访问需设置管理员账号 |
| API 服务 | `http://localhost/v1` | API 接口（需要 API Key） |

::: warning 注意
首次访问 `http://localhost/install` 时需要设置管理员账号和密码，请务必牢记这些凭据。
:::

## 配置

### 环境变量配置

Dify 的主要配置通过 `.env` 文件管理。以下是一些常用的配置项。

```bash
# 编辑环境变量文件
nano dify/docker/.env
```

重要配置项说明：

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| `SECRET_KEY` | 应用密钥，用于加密敏感数据 | 随机生成 |
| `CONSOLE_WEB_URL` | 控制台 Web 地址 | 空 |
| `CONSOLE_API_URL` | 控制台 API 地址 | 空 |
| `LOG_LEVEL` | 日志级别 | `INFO` |
| `MIGRATION_ENABLED` | 是否自动执行数据库迁移 | `true` |

```bash
# 修改配置后需要重启服务
cd dify/docker
docker compose down
docker compose up -d
```

### 配置模型提供商

Dify 支持多种 AI 模型提供商，可在 Web 界面中进行配置。

1. 登录 Dify 控制台
2. 进入 **Settings（设置）** → **Model Provider（模型提供商）**
3. 选择需要配置的提供商并填入对应的 API Key

支持的主要模型提供商：

| 提供商 | 模型示例 | 配置要求 |
|--------|----------|----------|
| OpenAI | GPT-4o、GPT-4 | API Key |
| Anthropic | Claude 3.5 Sonnet、Claude 3 Opus | API Key |
| 本地 Ollama | Llama 3、Qwen、Mistral | Ollama 服务地址 |
| 讯飞星火 | Spark 系列 | APP ID、API Key、API Secret |
| 百度文心 | ERNIE 系列 | API Key、Secret Key |
| 阿里通义 | Qwen 系列 | API Key |

### 接入本地 Ollama 模型

如果您在本机运行了 Ollama，可以将其接入 Dify，实现完全离线的 AI 应用。

```bash
# 确保 Ollama 已启动并运行
# 如果 Ollama 和 Dify 运行在同一台机器上，
# 需要让 Ollama 监听所有网络接口

# 修改 Ollama 的监听地址
sudo systemctl edit ollama

# 在编辑器中添加以下内容：
# [Service]
# Environment="OLLAMA_HOST=0.0.0.0"

# 重启 Ollama
sudo systemctl restart ollama
```

在 Dify Web 界面中配置 Ollama：

1. 进入 **Settings** → **Model Provider** → **Ollama**
2. 填入 Ollama 服务地址：
   - 如果 Dify 使用 Docker 部署：`http://host.docker.internal:11434`
   - 如果 Dify 和 Ollama 在同一主机：`http://172.17.0.1:11434`（Docker 网桥地址）
3. 保存后即可在应用中选择 Ollama 提供的模型

## 主要功能

### 工作流编排

Dify 提供可视化的工作流编辑器，通过拖拽节点的方式构建 AI 应用逻辑。

- **LLM 节点**：调用大语言模型
- **知识检索节点**：从知识库中检索相关信息
- **条件分支节点**：根据条件执行不同逻辑
- **代码执行节点**：运行自定义 Python/JavaScript 代码
- **HTTP 请求节点**：调用外部 API
- **变量聚合节点**：合并多个分支的输出

### RAG 知识库

Dify 内置了完整的 RAG（检索增强生成）功能，可以让 AI 基于您的私有数据进行回答。

1. 进入 **Knowledge（知识）** 页面
2. 创建新的知识库
3. 上传文档（支持 PDF、Word、Markdown、TXT、HTML 等格式）
4. 系统会自动进行文本分段和向量化
5. 在应用中关联知识库即可使用

### Agent 构建

Dify 支持构建具备工具调用能力的 AI Agent：

- 内置工具：网络搜索、天气查询、计算器等
- 自定义工具：通过 OpenAPI 规范导入外部 API
- 工作流即工具：将已创建的工作流作为 Agent 的工具

### API 发布

创建的 AI 应用可以通过 API 形式对外发布，方便集成到其他系统中。

```bash
# 调用 Dify API 示例
curl -X POST 'http://localhost/v1/chat-messages' \
  -H 'Authorization: Bearer your-api-key' \
  -H 'Content-Type: application/json' \
  -d '{
    "inputs": {},
    "query": "你好，请介绍一下 Debian",
    "response_mode": "blocking",
    "user": "user-001"
  }'
```

## 数据备份

```bash
# 备份 Dify 数据
cd dify/docker

# 停止服务
docker compose down

# 备份数据卷
sudo tar czf dify-backup-$(date +%Y%m%d).tar.gz \
  /var/lib/docker/volumes/docker_db_data \
  /var/lib/docker/volumes/docker_redis_data \
  /var/lib/docker/volumes/docker_weaviate_data \
  .env

# 重新启动服务
docker compose up -d
```

## 更新

```bash
# 进入项目目录
cd dify/docker

# 拉取最新代码
git pull origin main

# 拉取最新镜像
docker compose pull

# 重新启动（会自动执行数据库迁移）
docker compose down
docker compose up -d

# 确认所有服务正常运行
docker compose ps
```

::: warning 更新前请备份
建议在更新前备份数据，以防万一。特别是跨大版本更新时，请先查阅官方的更新说明。
:::

## 常见问题

### 服务启动失败

```bash
# 查看详细日志
cd dify/docker
docker compose logs -f

# 常见原因：端口被占用
# 检查 80 端口是否被其他服务占用
sudo ss -tlnp | grep :80

# 如需修改端口，编辑 .env 文件中的 EXPOSE_NGINX_PORT
# 或修改 docker-compose.yaml 中的端口映射
```

### 无法连接模型提供商

- 确认 API Key 正确无误
- 检查网络连通性，某些提供商可能需要代理访问
- 对于 Ollama，确认服务地址和端口配置正确
- 检查 Docker 容器是否能访问宿主机网络

### 知识库索引速度慢

- 上传文档过大时，考虑将文档拆分为多个小文件
- 检查 Embedding 模型的配置，本地 Embedding 模型性能受硬件限制
- 适当调整分段策略（分段大小和重叠度）

### 数据库迁移报错

```bash
# 手动执行数据库迁移
cd dify/docker
docker compose exec api flask db upgrade
```

## 相关链接

- [Dify GitHub 仓库](https://github.com/langgenius/dify)
- [Dify 官方文档](https://docs.dify.ai/)
- [Dify 社区论坛](https://github.com/langgenius/dify/discussions)
- [AI 工具总览](/ai/) - 返回 AI 工具概览页

---

**想构建自动化工作流？** [了解 n8n →](/ai/n8n)
