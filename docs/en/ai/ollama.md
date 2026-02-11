---
title: Ollama Installation & Usage
description: Step-by-step guide to installing and using Ollama, the most popular local LLM runner, on Debian with GPU and CPU acceleration.
---

# Ollama

Ollama is the most popular tool for running large language models locally. It provides a clean command-line interface, a built-in model registry with hundreds of pre-quantized models, and automatic GPU/CPU acceleration. Ollama abstracts away the complexity of model management and inference configuration, making it straightforward to get started with local AI on Debian.

## Prerequisites

Before installing Ollama, make sure your system meets these requirements:

- **Debian 12 (Bookworm) or later** -- 64-bit x86_64 or ARM64
- **4 GB RAM minimum** -- 16 GB or more recommended for larger models
- **Internet connection** -- Required for downloading models
- **GPU (optional but recommended)** -- NVIDIA GPU with CUDA support for accelerated inference; AMD ROCm GPUs are also supported

::: tip
Ollama works on CPU-only machines. GPU acceleration is optional but significantly improves performance for larger models.
:::

## Installation

### Method 1: Official Install Script (Recommended)

The official installer handles all dependencies, creates a systemd service, and configures the environment automatically.

```bash
# Download and run the official Ollama installer
curl -fsSL https://ollama.com/install.sh | sh

# Verify the installation
ollama --version
```

### Method 2: Manual Installation

If you prefer to install manually, download the binary directly.

```bash
# Download the Ollama binary
curl -L https://ollama.com/download/ollama-linux-amd64.tgz -o ollama-linux-amd64.tgz

# Extract to /usr/local
sudo tar -C /usr -xzf ollama-linux-amd64.tgz

# Verify the installation
ollama --version
```

### NVIDIA GPU Setup

If you have an NVIDIA GPU and want to enable CUDA acceleration, install the NVIDIA drivers first.

```bash
# Install NVIDIA driver (non-free repository must be enabled)
sudo apt install -y nvidia-driver firmware-misc-nonfree

# Reboot to load the driver
sudo reboot

# After reboot, verify the GPU is recognized
nvidia-smi
```

::: warning
Make sure you have the `non-free` and `non-free-firmware` components enabled in your `/etc/apt/sources.list`. Without these, the NVIDIA driver packages will not be available.
:::

## Configuration

### Systemd Service Management

The installer creates a systemd service that runs Ollama in the background.

```bash
# Check the service status
sudo systemctl status ollama

# Start the service
sudo systemctl start ollama

# Stop the service
sudo systemctl stop ollama

# Enable the service to start on boot
sudo systemctl enable ollama

# Disable the service from starting on boot
sudo systemctl disable ollama

# View Ollama service logs
journalctl -u ollama -f
```

### Environment Variables

You can customize Ollama's behavior with environment variables. Edit the systemd service file or create an override.

```bash
# Create a systemd override for custom environment variables
sudo systemctl edit ollama
```

Add your custom settings in the editor:

```ini
[Service]
Environment="OLLAMA_HOST=0.0.0.0:11434"
Environment="OLLAMA_MODELS=/path/to/custom/models"
Environment="OLLAMA_NUM_PARALLEL=4"
```

```bash
# Reload systemd and restart Ollama
sudo systemctl daemon-reload
sudo systemctl restart ollama
```

| Variable | Description | Default |
|----------|-------------|---------|
| `OLLAMA_HOST` | Bind address and port for the API server | `127.0.0.1:11434` |
| `OLLAMA_MODELS` | Directory where models are stored | `~/.ollama/models` |
| `OLLAMA_NUM_PARALLEL` | Number of parallel request slots | `1` |
| `OLLAMA_MAX_LOADED_MODELS` | Maximum number of models loaded simultaneously | `1` |
| `OLLAMA_KEEP_ALIVE` | Duration to keep models loaded in memory | `5m` |

## Usage

### Pulling and Running Models

```bash
# Pull a model from the Ollama registry
ollama pull llama3.2

# Run a model in interactive chat mode
ollama run llama3.2

# Run a model with a one-shot prompt
ollama run llama3.2 "Explain the Debian release cycle in three sentences."

# Pull and run a specific size variant
ollama pull llama3.2:1b
ollama run llama3.2:1b
```

### Model Management

```bash
# List all downloaded models
ollama list

# Show detailed information about a model
ollama show llama3.2

# Copy a model with a new name
ollama cp llama3.2 my-llama

# Remove a model
ollama rm llama3.2

# List currently running models
ollama ps
```

### Popular Models

| Model | Sizes | Description |
|-------|-------|-------------|
| `llama3.2` | 1B, 3B | Meta's latest compact models, great for general use |
| `llama3.1` | 8B, 70B, 405B | Meta's larger models for advanced reasoning |
| `mistral` | 7B | Fast general-purpose model from Mistral AI |
| `mixtral` | 8x7B, 8x22B | Mixture-of-experts model, strong coding and reasoning |
| `codellama` | 7B, 13B, 34B | Meta's code-specialized model |
| `qwen2.5-coder` | 1.5B, 7B, 32B | Alibaba's code-focused model |
| `deepseek-r1` | 1.5B, 7B, 8B, 14B, 32B, 70B, 671B | DeepSeek's reasoning model |
| `phi3` | 3.8B, 14B | Microsoft's small but capable model |
| `gemma2` | 2B, 9B, 27B | Google's open model |
| `nomic-embed-text` | 137M | Text embedding model for RAG applications |

### API Server

Ollama exposes a REST API on port 11434 by default. You can interact with it using `curl` or any HTTP client.

```bash
# Generate a completion
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.2",
  "prompt": "What is Debian?",
  "stream": false
}'

# Chat with conversation history
curl http://localhost:11434/api/chat -d '{
  "model": "llama3.2",
  "messages": [
    {"role": "user", "content": "What is the latest Debian release?"}
  ],
  "stream": false
}'

# List available models via API
curl http://localhost:11434/api/tags

# Generate text embeddings
curl http://localhost:11434/api/embed -d '{
  "model": "nomic-embed-text",
  "input": "Debian is a free operating system."
}'
```

### Custom Modelfiles

You can create custom model configurations using a Modelfile.

```bash
# Create a custom Modelfile
cat << 'EOF' > Modelfile
FROM llama3.2
SYSTEM "You are a helpful Debian Linux expert. Answer questions about Debian administration, packages, and troubleshooting."
PARAMETER temperature 0.7
PARAMETER top_p 0.9
EOF

# Build the custom model
ollama create debian-expert -f Modelfile

# Run the custom model
ollama run debian-expert
```

## Integration with Other Tools

Ollama integrates with many AI tools and frameworks thanks to its OpenAI-compatible API:

- **[Dify](/en/ai/dify)** -- Add Ollama as a model provider for LLM application development
- **[Jan](/en/ai/jan)** -- Connect Jan to Ollama's local models
- **[LocalAI](/en/ai/localai)** -- Use alongside LocalAI for extended functionality
- **[n8n](/en/ai/n8n)** -- Use Ollama models in automated AI workflows
- **Open WebUI** -- Popular web chat interface that connects directly to Ollama

```bash
# Test OpenAI-compatible endpoint (supported by many tools)
curl http://localhost:11434/v1/chat/completions -d '{
  "model": "llama3.2",
  "messages": [
    {"role": "user", "content": "Hello!"}
  ]
}'
```

## Update

```bash
# Update Ollama to the latest version using the same install script
curl -fsSL https://ollama.com/install.sh | sh

# Verify the new version
ollama --version
```

## Troubleshooting

### Ollama service fails to start

```bash
# Check the service logs for errors
journalctl -u ollama --no-pager -n 50

# Verify the binary exists and is executable
which ollama
ollama --version

# Restart the service
sudo systemctl restart ollama
```

### GPU not detected

```bash
# Check if NVIDIA drivers are loaded
nvidia-smi

# If nvidia-smi fails, reinstall the drivers
sudo apt install -y nvidia-driver firmware-misc-nonfree
sudo reboot

# After reboot, verify Ollama can see the GPU
ollama run llama3.2 "test" 2>&1 | head -5
```

### Out of memory errors

If a model is too large for your available RAM or VRAM, try a smaller variant.

```bash
# Use a smaller model variant
ollama run llama3.2:1b

# Or use a quantized version (smaller file size, less memory)
ollama run llama3.2:1b-q4_0
```

### Cannot connect to Ollama API

```bash
# Check if Ollama is running
sudo systemctl status ollama

# Check if the port is in use
ss -tlnp | grep 11434

# Test the API endpoint
curl http://localhost:11434/api/tags
```

### Slow model downloads

```bash
# Check your network connection
curl -sI https://ollama.com | head -5

# Models are stored in ~/.ollama/models by default
# You can change the storage location using the OLLAMA_MODELS variable
du -sh ~/.ollama/models
```

## Related Resources

- [AI Tools Overview](/en/ai/) -- Overview of all AI tools on Debian
- [Dify](/en/ai/dify) -- Build LLM apps with Ollama as backend
- [Jan](/en/ai/jan) -- Desktop chat interface with Ollama integration
- [Ollama Model Library](https://ollama.com/library) -- Browse all available models
- [Ollama Documentation](https://github.com/ollama/ollama/blob/main/docs/README.md) -- Official documentation
