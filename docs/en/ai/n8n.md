---
title: n8n Installation & Usage
description: Step-by-step guide to installing and using n8n, a self-hosted workflow automation platform with AI integration and 400+ app connectors, on Debian.
---

# n8n

n8n is a self-hosted workflow automation platform that connects over 400 applications and services through a visual node-based editor. Its AI integration features include an AI Agent node, LangChain support, RAG capabilities, and connections to multiple AI model providers. n8n lets you build sophisticated automation workflows that combine traditional app integrations with AI-powered processing, all running on your own infrastructure with full data privacy.

## Prerequisites

Before installing n8n, make sure you have one of the following:

- **Docker and Docker Compose** -- The recommended installation method
- **Node.js 18 or later** -- Required for the npm installation method

Additional requirements:

- **Debian 12 (Bookworm) or later** -- 64-bit x86_64
- **2 GB RAM minimum** -- 4 GB or more recommended for AI workflows
- **Internet connection** -- For connecting to external services and APIs

::: tip
Docker is the recommended installation method as it handles all dependencies automatically and provides better isolation.
:::

## Installation

### Method 1: Docker (Recommended)

The simplest way to get started with n8n using Docker.

```bash
# Run n8n with Docker (basic setup)
docker run -d \
  --name n8n \
  -p 5678:5678 \
  -v n8n_data:/home/node/.n8n \
  n8nio/n8n

# Verify the container is running
docker ps | grep n8n

# View logs
docker logs n8n
```

Open `http://localhost:5678` in your browser to access n8n.

### Method 2: Docker Compose (Production Setup)

For a production-ready deployment with persistent storage, authentication, and proper configuration.

```bash
# Create a project directory
mkdir -p ~/n8n && cd ~/n8n
```

Create the `docker-compose.yml` file:

```yaml
# docker-compose.yml
version: '3.8'

services:
  n8n:
    image: n8nio/n8n
    container_name: n8n
    ports:
      - "5678:5678"
    environment:
      # Basic authentication
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=your-secure-password
      # Timezone
      - GENERIC_TIMEZONE=UTC
      - TZ=UTC
      # Webhook URL (set to your domain for production)
      - N8N_HOST=localhost
      - N8N_PORT=5678
      - N8N_PROTOCOL=http
      - WEBHOOK_URL=http://localhost:5678/
      # Enable community nodes
      - N8N_COMMUNITY_PACKAGES_ENABLED=true
    volumes:
      - n8n_data:/home/node/.n8n
      - n8n_files:/files
    restart: unless-stopped

volumes:
  n8n_data:
  n8n_files:
```

```bash
# Start n8n with Docker Compose
cd ~/n8n
docker compose up -d

# Check the logs
docker compose logs -f

# Stop n8n
docker compose down
```

### Method 3: Docker Compose with PostgreSQL

For larger deployments, use PostgreSQL instead of the default SQLite database.

```yaml
# docker-compose-postgres.yml
version: '3.8'

services:
  n8n:
    image: n8nio/n8n
    container_name: n8n
    ports:
      - "5678:5678"
    environment:
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=postgres
      - DB_POSTGRESDB_PORT=5432
      - DB_POSTGRESDB_DATABASE=n8n
      - DB_POSTGRESDB_USER=n8n
      - DB_POSTGRESDB_PASSWORD=n8n-secure-password
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=your-secure-password
      - GENERIC_TIMEZONE=UTC
      - N8N_COMMUNITY_PACKAGES_ENABLED=true
    volumes:
      - n8n_data:/home/node/.n8n
      - n8n_files:/files
    depends_on:
      postgres:
        condition: service_healthy
    restart: unless-stopped

  postgres:
    image: postgres:16
    container_name: n8n-postgres
    environment:
      - POSTGRES_USER=n8n
      - POSTGRES_PASSWORD=n8n-secure-password
      - POSTGRES_DB=n8n
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U n8n"]
      interval: 5s
      timeout: 5s
      retries: 10
    restart: unless-stopped

volumes:
  n8n_data:
  n8n_files:
  postgres_data:
```

```bash
# Start with PostgreSQL
docker compose -f docker-compose-postgres.yml up -d
```

### Method 4: npm Installation

If you prefer to run n8n without Docker.

```bash
# Install n8n globally via npm
npm install -g n8n

# Start n8n
n8n start

# Or start with a specific port
n8n start --port 5678
```

To run n8n as a systemd service with npm:

```bash
# Create a systemd service file
sudo tee /etc/systemd/system/n8n.service << 'EOF'
[Unit]
Description=n8n Workflow Automation
After=network.target

[Service]
Type=simple
User=your-username
Environment="N8N_BASIC_AUTH_ACTIVE=true"
Environment="N8N_BASIC_AUTH_USER=admin"
Environment="N8N_BASIC_AUTH_PASSWORD=your-secure-password"
ExecStart=/usr/bin/n8n start
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# Enable and start the service
sudo systemctl daemon-reload
sudo systemctl enable n8n
sudo systemctl start n8n

# Check the status
sudo systemctl status n8n
```

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `N8N_BASIC_AUTH_ACTIVE` | Enable basic authentication | `false` |
| `N8N_BASIC_AUTH_USER` | Basic auth username | -- |
| `N8N_BASIC_AUTH_PASSWORD` | Basic auth password | -- |
| `N8N_HOST` | Hostname for n8n | `localhost` |
| `N8N_PORT` | Port number | `5678` |
| `N8N_PROTOCOL` | Protocol (`http` or `https`) | `http` |
| `WEBHOOK_URL` | External URL for webhooks | -- |
| `N8N_ENCRYPTION_KEY` | Key for encrypting credentials | Auto-generated |
| `EXECUTIONS_DATA_SAVE_ON_ERROR` | Save execution data on error | `all` |
| `EXECUTIONS_DATA_SAVE_ON_SUCCESS` | Save execution data on success | `all` |
| `N8N_COMMUNITY_PACKAGES_ENABLED` | Allow community node packages | `false` |
| `GENERIC_TIMEZONE` | Default timezone | `America/New_York` |

### Reverse Proxy with Nginx

For production deployments behind a reverse proxy:

```bash
# Install Nginx
sudo apt install -y nginx

# Create an Nginx configuration for n8n
sudo tee /etc/nginx/sites-available/n8n << 'EOF'
server {
    listen 80;
    server_name n8n.yourdomain.com;

    location / {
        proxy_pass http://localhost:5678;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        chunked_transfer_encoding off;
        proxy_buffering off;
        proxy_cache off;
    }
}
EOF

# Enable the site and restart Nginx
sudo ln -s /etc/nginx/sites-available/n8n /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Usage

### Creating Your First Workflow

1. Open `http://localhost:5678` and log in
2. Click **New Workflow**
3. Click the **+** button to add a trigger node (e.g., **Schedule Trigger** for timed execution)
4. Add processing nodes by clicking **+** after the trigger
5. Connect nodes by dragging between their connection points
6. Click **Test Workflow** to run it manually
7. Toggle **Active** to enable automatic execution

### AI Features

n8n includes powerful AI nodes for building intelligent workflows.

#### AI Agent Node

The AI Agent node creates an autonomous agent that can use tools to accomplish tasks.

1. Add an **AI Agent** node to your workflow
2. Connect an LLM (Chat Model) node as the agent's brain
3. Add tool nodes that the agent can use (e.g., HTTP Request, Code, Calculator)
4. Configure the agent's system prompt and behavior

#### Supported AI Model Providers

| Provider | Node Name | Notes |
|----------|-----------|-------|
| OpenAI | Chat OpenAI | GPT-4, GPT-3.5, etc. |
| Anthropic | Chat Anthropic | Claude models |
| Ollama | Chat Ollama | Local models via [Ollama](/en/ai/ollama) |
| Google | Chat Google Gemini | Gemini models |
| Hugging Face | Hugging Face | Various open models |
| Azure OpenAI | Chat Azure OpenAI | Azure-hosted models |

#### Connecting Ollama for Local AI

1. Make sure [Ollama](/en/ai/ollama) is running on your system
2. In n8n, add a **Chat Ollama** node
3. Create credentials with the Ollama base URL:
   - If n8n runs in Docker: `http://host.docker.internal:11434`
   - If n8n runs natively: `http://localhost:11434`
4. Select the model to use

#### LangChain Integration

n8n includes LangChain nodes for advanced AI workflows:

| Node | Purpose |
|------|---------|
| **Vector Store** | Store and retrieve embeddings for RAG |
| **Text Splitter** | Split documents into chunks for processing |
| **Embeddings** | Generate text embeddings |
| **Memory** | Add conversation memory to AI agents |
| **Output Parser** | Parse structured data from LLM responses |
| **Retriever** | Retrieve relevant documents from vector stores |

#### RAG (Retrieval-Augmented Generation) Workflow

Build a RAG pipeline in n8n:

1. **Ingest**: Use a trigger to watch for new documents
2. **Split**: Use **Text Splitter** to chunk documents
3. **Embed**: Use **Embeddings** node to generate vectors
4. **Store**: Save vectors in a **Vector Store** (Pinecone, Qdrant, etc.)
5. **Query**: Use **Retriever** + **AI Agent** to answer questions using the stored knowledge

### Webhook Triggers

Create workflows that respond to HTTP requests.

```bash
# n8n exposes webhook URLs for each workflow
# Example: trigger a workflow via webhook
curl -X POST http://localhost:5678/webhook/your-webhook-path \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Process this text with AI",
    "data": "Some data to analyze"
  }'
```

### Importing and Exporting Workflows

```bash
# Export a workflow via the API
curl http://localhost:5678/api/v1/workflows \
  -H "Authorization: Bearer YOUR_API_KEY" | python3 -m json.tool

# Import a workflow JSON file through the n8n UI:
# 1. Click the three-dot menu in the workflow list
# 2. Select "Import from File"
# 3. Choose a .json workflow file
```

### Community Nodes

n8n supports community-created nodes that extend its functionality.

1. Go to **Settings** > **Community Nodes**
2. Click **Install a community node**
3. Enter the npm package name (e.g., `n8n-nodes-chatgpt`)
4. Click **Install**

::: warning
Community nodes are not verified by n8n. Review the source code before installing third-party nodes in production environments.
:::

## Update

### Docker

```bash
# Pull the latest image
cd ~/n8n
docker compose pull

# Restart with the new version
docker compose up -d

# Check the version
docker compose logs n8n | head -20
```

### npm

```bash
# Update n8n via npm
npm update -g n8n

# Restart the service
sudo systemctl restart n8n

# Verify the version
n8n --version
```

## Troubleshooting

### n8n fails to start

```bash
# Check the container logs
docker compose logs n8n

# Verify Docker is running
sudo systemctl status docker

# Check available resources
free -h
df -h

# Restart the services
docker compose down && docker compose up -d
```

### Cannot access the web interface

```bash
# Check if the port is exposed
ss -tlnp | grep 5678

# Test local connectivity
curl http://localhost:5678

# If running in Docker, check port mapping
docker port n8n

# Check firewall rules
sudo iptables -L -n | grep 5678
```

### Webhook not receiving requests

```bash
# Verify the workflow is active (toggle must be ON)
# Check that the webhook URL is correct

# Test the webhook URL
curl -v http://localhost:5678/webhook/your-path

# If behind a reverse proxy, ensure WebSocket support is enabled
# and the WEBHOOK_URL environment variable matches your external URL
```

### AI nodes fail to connect to Ollama

```bash
# If n8n is in Docker, use host.docker.internal
# Verify Ollama is accessible from the container
docker exec n8n curl http://host.docker.internal:11434/api/tags

# If that fails, try the Docker bridge IP
docker exec n8n curl http://172.17.0.1:11434/api/tags

# Make sure Ollama is listening on all interfaces
# Set OLLAMA_HOST=0.0.0.0:11434 in Ollama's configuration
```

### Execution failures or timeouts

1. Check the **Executions** page for error details
2. Increase the timeout in **Settings** > **Workflow Settings**
3. For memory issues, increase Docker container memory limits
4. Check external service connectivity from the container

### Database errors (PostgreSQL)

```bash
# Check PostgreSQL container health
docker compose ps | grep postgres

# View PostgreSQL logs
docker compose logs postgres

# Restart the database
docker compose restart postgres

# If the database is corrupted, restore from backup
docker compose exec postgres pg_restore -U n8n -d n8n /path/to/backup
```

## Related Resources

- [AI Tools Overview](/en/ai/) -- Overview of all AI tools on Debian
- [Ollama](/en/ai/ollama) -- Local LLM backend for n8n AI workflows
- [Dify](/en/ai/dify) -- Alternative AI application platform
- [Docker Setup](/en/server/docker) -- Docker installation guide for Debian
- [n8n Documentation](https://docs.n8n.io) -- Official documentation
- [n8n Community](https://community.n8n.io) -- Community forum and workflow templates
- [n8n GitHub](https://github.com/n8n-io/n8n) -- Source code and issue tracker
