---
title: n8n 安装与使用
description: 在 Debian 上安装和使用 n8n 自托管工作流自动化平台及其 AI 集成功能的完整指南
---

# n8n

n8n 是一个可自托管的工作流自动化平台，提供强大的 AI 集成能力，支持连接 400+ 应用和服务。通过可视化的节点编辑器，用户可以构建复杂的自动化工作流和 AI Agent，无需编写大量代码。n8n 的开源特性使您可以完全掌控数据和部署环境，非常适合需要数据隐私保障的企业和个人用户。

## 前置要求

- **Docker**（推荐）或 **Node.js 18+**
- **内存**：2GB 以上（推荐 4GB）
- **磁盘空间**：至少 5GB 可用空间

## 安装

### 方法 1：Docker 快速启动

```bash
# 使用 Docker 运行 n8n（最简单的方式）
docker run -d --name n8n \
  -p 5678:5678 \
  -v n8n_data:/home/node/.n8n \
  n8nio/n8n
```

### 方法 2：Docker Compose（推荐，支持持久化和完整配置）

```bash
# 创建项目目录
mkdir -p ~/n8n && cd ~/n8n

# 创建 Docker Compose 配置文件
cat > docker-compose.yml << 'EOF'
services:
  n8n:
    image: n8nio/n8n
    ports:
      - "5678:5678"
    volumes:
      - n8n_data:/home/node/.n8n
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=changeme
      - GENERIC_TIMEZONE=Asia/Shanghai
      - TZ=Asia/Shanghai
    restart: unless-stopped

volumes:
  n8n_data:
EOF

# 启动服务
docker compose up -d

# 查看运行状态
docker compose ps

# 查看日志
docker compose logs -f
```

### 方法 3：npm 全局安装

```bash
# 确保 Node.js 18+ 已安装
node --version

# 全局安装 n8n
npm install -g n8n

# 启动 n8n
n8n start

# 后台运行
n8n start &
```

::: warning 注意
请务必修改 Docker Compose 配置中的 `N8N_BASIC_AUTH_PASSWORD`，不要使用默认密码。
:::

启动成功后，在浏览器中访问 `http://localhost:5678`，首次访问需要创建管理员账号。

## 配置

### 环境变量

n8n 支持通过环境变量进行配置。以下是常用的配置项。

| 环境变量 | 说明 | 默认值 |
|----------|------|--------|
| `N8N_BASIC_AUTH_ACTIVE` | 启用基础认证 | `false` |
| `N8N_BASIC_AUTH_USER` | 认证用户名 | - |
| `N8N_BASIC_AUTH_PASSWORD` | 认证密码 | - |
| `N8N_PORT` | 服务监听端口 | `5678` |
| `N8N_PROTOCOL` | 协议（http/https） | `http` |
| `WEBHOOK_URL` | Webhook 回调地址 | - |
| `GENERIC_TIMEZONE` | 时区设置 | `America/New_York` |
| `N8N_ENCRYPTION_KEY` | 数据加密密钥 | 自动生成 |
| `EXECUTIONS_DATA_PRUNE` | 自动清理执行记录 | `true` |
| `EXECUTIONS_DATA_MAX_AGE` | 执行记录保留天数 | `336`（14 天） |

### 使用 PostgreSQL 持久化（生产环境推荐）

默认情况下 n8n 使用 SQLite 存储数据。对于生产环境，建议使用 PostgreSQL。

```bash
# 创建带 PostgreSQL 的 Docker Compose 配置
cat > docker-compose.yml << 'EOF'
services:
  n8n:
    image: n8nio/n8n
    ports:
      - "5678:5678"
    volumes:
      - n8n_data:/home/node/.n8n
    environment:
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=postgres
      - DB_POSTGRESDB_PORT=5432
      - DB_POSTGRESDB_DATABASE=n8n
      - DB_POSTGRESDB_USER=n8n
      - DB_POSTGRESDB_PASSWORD=n8n_password
      - GENERIC_TIMEZONE=Asia/Shanghai
      - TZ=Asia/Shanghai
    depends_on:
      postgres:
        condition: service_healthy
    restart: unless-stopped

  postgres:
    image: postgres:16
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_USER=n8n
      - POSTGRES_PASSWORD=n8n_password
      - POSTGRES_DB=n8n
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U n8n"]
      interval: 10s
      timeout: 5s
      retries: 5
    restart: unless-stopped

volumes:
  n8n_data:
  postgres_data:
EOF

# 启动服务
docker compose up -d
```

### 配置反向代理

如果需要通过域名和 HTTPS 访问 n8n，建议配合 Nginx 反向代理使用。

```bash
# 在 Docker Compose 中设置 Webhook URL
# 添加以下环境变量
# WEBHOOK_URL=https://n8n.yourdomain.com
# N8N_HOST=n8n.yourdomain.com
# N8N_PROTOCOL=https
```

::: tip 提示
反向代理的详细配置方法请参考 [反向代理指南](/server/reverse-proxy)。
:::

## AI 功能

n8n 内置了丰富的 AI 节点，可以方便地构建 AI 驱动的自动化工作流。

### AI 相关节点

| 节点 | 功能 |
|------|------|
| AI Agent | 构建能使用工具的 AI 代理 |
| Basic LLM Chain | 基础的 LLM 调用链 |
| Information Extractor | 从文本中提取结构化信息 |
| Text Classifier | 文本分类 |
| Summarization Chain | 文本摘要 |
| Vector Store | 向量数据库操作 |
| Document Loader | 加载文档用于 RAG |
| Text Splitter | 文本分段 |
| Embeddings | 文本向量化 |

### 配置 AI 模型凭据

在使用 AI 节点之前，需要先配置模型提供商的凭据。

1. 进入 **Settings（设置）** → **Credentials（凭据）**
2. 点击 **Add Credential（添加凭据）**
3. 选择对应的服务（如 OpenAI、Anthropic 等）
4. 填入 API Key 并保存

支持的 AI 模型提供商：

| 提供商 | 支持的节点 | 配置要求 |
|--------|-----------|----------|
| OpenAI | Chat、Embeddings、Tools | API Key |
| Anthropic | Chat | API Key |
| Ollama | Chat、Embeddings | 服务地址（本地免费） |
| Google AI | Chat、Embeddings | API Key |
| 混合使用 | 不同节点可用不同提供商 | 各自的凭据 |

### 接入本地 Ollama

n8n 可以直接连接本地运行的 Ollama，实现完全离线的 AI 工作流。

```bash
# 确保 Ollama 正在运行
# 如果 n8n 使用 Docker 部署，Ollama 地址配置为：
# http://host.docker.internal:11434（Docker Desktop）
# http://172.17.0.1:11434（Linux Docker 网桥）
```

在 n8n 中配置 Ollama：

1. 添加 **Ollama** 类型的凭据
2. Base URL 填入 Ollama 服务地址
3. 在 AI 节点中选择 Ollama 作为模型提供商

### 构建 AI 聊天 Agent 示例

以下是一个简单的 AI Agent 工作流示例，通过 Webhook 接收消息，使用 AI 生成回复。

1. **创建新工作流**
2. 添加 **Webhook** 节点作为触发器
3. 添加 **AI Agent** 节点
4. 在 AI Agent 中配置：
   - **Chat Model**：选择已配置的模型（如 OpenAI GPT-4o）
   - **System Message**：设置 Agent 的角色和行为准则
   - **Tools**：添加需要的工具节点（如网络搜索、代码执行等）
5. 添加 **Respond to Webhook** 节点返回结果
6. 连接节点并激活工作流

### 构建 RAG 工作流

n8n 支持构建完整的 RAG（检索增强生成）流水线：

1. 使用 **Document Loader** 加载文档
2. 使用 **Text Splitter** 进行文本分段
3. 使用 **Embeddings** 节点生成向量
4. 存入 **Vector Store**（支持 Pinecone、Qdrant、Supabase 等）
5. 查询时通过 **Vector Store Retriever** 检索相关内容
6. 将检索结果传入 **AI Agent** 或 **LLM Chain** 生成回答

## 设置为系统服务

### Docker Compose 方式

Docker Compose 配置中已包含 `restart: unless-stopped`，服务会在系统重启后自动恢复。

### npm 安装方式

```bash
# 创建 systemd 服务文件
sudo tee /etc/systemd/system/n8n.service << 'EOF'
[Unit]
Description=n8n Workflow Automation
After=network.target

[Service]
Type=simple
User=你的用户名
Environment=N8N_PORT=5678
Environment=GENERIC_TIMEZONE=Asia/Shanghai
ExecStart=/usr/bin/n8n start
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# 启用并启动服务
sudo systemctl daemon-reload
sudo systemctl enable n8n
sudo systemctl start n8n

# 查看运行状态
sudo systemctl status n8n
```

## 数据备份

```bash
# Docker Compose 方式备份
cd ~/n8n

# 导出所有工作流
docker compose exec n8n n8n export:workflow --all --output=/home/node/.n8n/backups/workflows.json

# 导出所有凭据（已加密）
docker compose exec n8n n8n export:credentials --all --output=/home/node/.n8n/backups/credentials.json

# 备份整个数据卷
docker compose down
docker run --rm \
  -v n8n_n8n_data:/data \
  -v $(pwd):/backup \
  alpine tar czf /backup/n8n-backup-$(date +%Y%m%d).tar.gz -C /data .
docker compose up -d
```

## 更新

```bash
# Docker Compose 方式更新
cd ~/n8n
docker compose pull
docker compose up -d

# npm 方式更新
npm update -g n8n

# 验证版本
docker compose exec n8n n8n --version
# 或
n8n --version
```

::: tip 提示
n8n 更新频率较高，建议定期更新以获取最新功能和安全修复。更新前建议先备份数据。
:::

## 常见问题

### 无法访问 Web 界面

```bash
# 检查服务是否正在运行
docker compose ps

# 检查端口是否被占用
sudo ss -tlnp | grep :5678

# 查看日志排查错误
docker compose logs -f n8n
```

### Webhook 无法触发

- 确认 `WEBHOOK_URL` 环境变量设置正确
- 如果使用反向代理，确认代理配置支持 WebSocket
- 检查防火墙是否放行了对应端口
- 确认工作流已激活（Active 状态）

### AI 节点调用失败

- 确认凭据中的 API Key 正确且有效
- 检查网络连通性（某些 AI 服务需要代理访问）
- 对于 Ollama，确认服务地址在 Docker 网络中可达
- 查看节点的执行日志获取详细错误信息

### 工作流执行超时

```bash
# 在环境变量中调整超时时间
# EXECUTIONS_TIMEOUT=300（秒）
# EXECUTIONS_TIMEOUT_MAX=600（秒）
```

### 内存占用过高

- 启用执行记录自动清理：`EXECUTIONS_DATA_PRUNE=true`
- 减少保留天数：`EXECUTIONS_DATA_MAX_AGE=168`（7 天）
- 对于大量工作流，考虑使用 PostgreSQL 替代 SQLite
- 适当增加 Docker 容器的内存限制

## 相关链接

- [n8n 官方网站](https://n8n.io)
- [n8n GitHub 仓库](https://github.com/n8n-io/n8n)
- [n8n 官方文档](https://docs.n8n.io)
- [n8n 社区节点库](https://www.npmjs.com/search?q=n8n-nodes)
- [AI 工具总览](/ai/) - 返回 AI 工具概览页

---

**想探索更多 AI 工具？** [返回 AI 工具总览 →](/ai/)
