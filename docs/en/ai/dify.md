---
title: Dify Installation & Usage
description: Step-by-step guide to installing and using Dify, an open-source LLM application development platform with visual workflow and RAG capabilities, on Debian.
---

# Dify

Dify is an open-source platform for building LLM-powered applications. It provides a visual workflow editor for designing AI pipelines, built-in RAG (Retrieval-Augmented Generation) for knowledge base integration, an agent builder for creating autonomous AI agents, and a full API for deploying AI features into your own applications. Dify supports dozens of model providers including OpenAI, Anthropic, and local models through Ollama, making it a versatile hub for AI application development.

## Prerequisites

Before installing Dify, make sure your system meets these requirements:

- **Debian 12 (Bookworm) or later** -- 64-bit x86_64
- **Docker and Docker Compose** -- Required for the recommended installation method
- **2 CPU cores minimum** -- 4 cores recommended
- **4 GB RAM minimum** -- 8 GB or more recommended
- **20 GB+ free disk space** -- For Docker images, databases, and uploaded files

::: tip
If you do not have Docker installed, see the [Docker Setup Guide](/en/server/docker) for installation instructions on Debian.
:::

## Installation

### Step 1: Clone the Dify Repository

```bash
# Clone the Dify repository
git clone https://github.com/langgenius/dify.git
cd dify/docker
```

### Step 2: Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env

# Review and edit the configuration (optional for default setup)
nano .env
```

Key environment variables to consider:

| Variable | Description | Default |
|----------|-------------|---------|
| `SECRET_KEY` | Application secret key (change for production) | Random |
| `INIT_PASSWORD` | Initial admin password | Empty (set during first login) |
| `LOG_LEVEL` | Logging level | `INFO` |
| `STORAGE_TYPE` | File storage type (`local` or `s3`) | `local` |
| `DB_USERNAME` | PostgreSQL username | `postgres` |
| `DB_PASSWORD` | PostgreSQL password | `difyai123456` |
| `REDIS_PASSWORD` | Redis password | `difyai123456` |

::: warning
For production deployments, always change the default database and Redis passwords in the `.env` file before starting the services.
:::

### Step 3: Start Dify

```bash
# Start all Dify services
cd dify/docker
docker compose up -d

# Check that all containers are running
docker compose ps
```

Dify starts the following services:
- **Web frontend** -- The main user interface
- **API server** -- Backend API service
- **Worker** -- Background task processor
- **PostgreSQL** -- Database
- **Redis** -- Cache and message queue
- **Weaviate/Qdrant** -- Vector database for RAG
- **Nginx** -- Reverse proxy

### Step 4: Complete Setup in Browser

1. Open `http://localhost/install` in your browser
2. Create your admin account with email and password
3. You will be redirected to the Dify dashboard

::: tip
If port 80 is already in use, you can change the Nginx port in the `.env` file by setting `NGINX_PORT=8080` (or another available port), then restart with `docker compose up -d`.
:::

## Configuration

### Adding Model Providers

Dify supports many model providers. Configure them in the web interface.

1. Log in to Dify and go to **Settings** (gear icon in the top-right)
2. Click **Model Providers**
3. Select a provider and enter your API key or endpoint

#### Connecting Ollama (Local Models)

If you have [Ollama](/en/ai/ollama) running locally, connect it to Dify:

1. Go to **Settings** > **Model Providers** > **Ollama**
2. Set the **Base URL** to `http://host.docker.internal:11434` (or your Ollama server address)
3. Click **Save**
4. Your Ollama models will appear in the model selection dropdown

```bash
# Make sure Ollama is running and accessible
# If Dify runs in Docker, use the host's IP or host.docker.internal
curl http://localhost:11434/api/tags

# If using Docker's bridge network, find the host IP
ip addr show docker0 | grep inet
```

::: tip
When running both Dify and Ollama in Docker, you may need to use the host machine's IP address (e.g., `http://172.17.0.1:11434`) instead of `localhost` for Ollama's URL, since containers have separate network namespaces.
:::

#### Connecting OpenAI, Anthropic, or Other Cloud Providers

1. Go to **Settings** > **Model Providers**
2. Select the provider (e.g., OpenAI, Anthropic, Google)
3. Enter your API key
4. Click **Save**

### Knowledge Base (RAG) Setup

Dify's RAG feature lets your AI applications reference custom documents.

1. Go to **Knowledge** in the left sidebar
2. Click **Create Knowledge Base**
3. Upload documents (PDF, TXT, Markdown, HTML, DOCX, CSV)
4. Configure the chunking strategy and embedding model
5. Click **Save and Process**

The knowledge base can then be attached to any chatbot or workflow as a context source.

## Usage

### Creating a Chatbot Application

1. Go to **Studio** in the left sidebar
2. Click **Create App** > **Chatbot**
3. Give it a name and select the LLM model
4. Write a system prompt to define the chatbot's behavior
5. Optionally attach a knowledge base for RAG
6. Click **Publish** to deploy the chatbot

### Visual Workflow Editor

The workflow editor lets you build complex AI pipelines with a drag-and-drop interface.

1. Go to **Studio** > **Create App** > **Workflow**
2. Drag nodes from the sidebar onto the canvas
3. Connect nodes to define the processing flow

Available node types:

| Node | Purpose |
|------|---------|
| **Start** | Entry point with input variables |
| **LLM** | Call a language model |
| **Knowledge Retrieval** | Query a knowledge base |
| **Code** | Execute custom Python or JavaScript |
| **HTTP Request** | Call external APIs |
| **Conditional** | Branch logic based on conditions |
| **Variable Aggregator** | Combine multiple inputs |
| **Template Transform** | Format text with templates |
| **End** | Output the final result |

### Agent Builder

Create autonomous AI agents that can use tools and make decisions.

1. Go to **Studio** > **Create App** > **Agent**
2. Select the LLM model (use a capable model like GPT-4 or Claude)
3. Add tools the agent can use (web search, calculator, API calls)
4. Configure the agent's instructions and behavior
5. Test and publish

### API Access

Every Dify application exposes an API that you can integrate into your own systems.

```bash
# Get the API key from the application's settings page in Dify
# Then call the chat API

# Chat completion request
curl -X POST 'http://localhost/v1/chat-messages' \
  -H 'Authorization: Bearer YOUR_APP_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "inputs": {},
    "query": "How do I install packages on Debian?",
    "response_mode": "blocking",
    "user": "user-123"
  }'

# Streaming response
curl -X POST 'http://localhost/v1/chat-messages' \
  -H 'Authorization: Bearer YOUR_APP_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "inputs": {},
    "query": "Explain the apt command",
    "response_mode": "streaming",
    "user": "user-123"
  }'

# Upload a file to a knowledge base
curl -X POST 'http://localhost/v1/files/upload' \
  -H 'Authorization: Bearer YOUR_APP_API_KEY' \
  -F 'file=@document.pdf' \
  -F 'user=user-123'
```

### Embedding the Chat Widget

Dify provides an embeddable chat widget for websites.

1. Open your published application
2. Go to **Monitoring** > **Embed in Website**
3. Copy the HTML snippet and paste it into your webpage

## Update

```bash
# Navigate to the Dify Docker directory
cd dify/docker

# Pull the latest images
docker compose pull

# Restart with the new version
docker compose up -d

# Check that all services are running
docker compose ps

# View logs if needed
docker compose logs -f
```

::: warning
Before updating, it is a good practice to back up your data:
```bash
# Back up the PostgreSQL database
docker compose exec db pg_dump -U postgres dify > dify-backup.sql

# Back up uploaded files
cp -r volumes/app/storage ./storage-backup
```
:::

## Troubleshooting

### Dify fails to start

```bash
# Check the status of all containers
cd dify/docker
docker compose ps

# View logs for the failing service
docker compose logs api
docker compose logs web
docker compose logs worker

# Check available disk space
df -h

# Check available memory
free -h

# Restart all services
docker compose down && docker compose up -d
```

### Cannot access the web interface

```bash
# Check if Nginx is running
docker compose ps | grep nginx

# Check which port is exposed
docker compose port nginx 80

# Verify the port is not blocked by a firewall
sudo ss -tlnp | grep 80

# Try accessing with the explicit port
curl http://localhost:80
```

### Model provider connection fails

1. Verify the API key is correct in **Settings** > **Model Providers**
2. Check network connectivity from the Docker container:

```bash
# Test connectivity from inside the container
docker compose exec api curl -I https://api.openai.com

# For Ollama, test the connection
docker compose exec api curl http://host.docker.internal:11434/api/tags
```

### Knowledge base processing fails

```bash
# Check the worker logs for processing errors
docker compose logs worker

# Verify the vector database is running
docker compose ps | grep weaviate

# Check available disk space (embedding generation requires space)
df -h
```

### Database connection errors

```bash
# Check if PostgreSQL is running
docker compose ps | grep db

# View database logs
docker compose logs db

# Restart the database
docker compose restart db
```

## Related Resources

- [AI Tools Overview](/en/ai/) -- Overview of all AI tools on Debian
- [Ollama](/en/ai/ollama) -- Local LLM backend for Dify
- [Docker Setup](/en/server/docker) -- Docker installation guide for Debian
- [Dify Documentation](https://docs.dify.ai) -- Official documentation
- [Dify GitHub](https://github.com/langgenius/dify) -- Source code and issue tracker
