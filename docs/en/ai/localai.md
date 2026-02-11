---
title: LocalAI Installation & Usage
description: Step-by-step guide to installing and using LocalAI, an OpenAI API drop-in replacement for local inference supporting text, image, and audio, on Debian.
---

# LocalAI

LocalAI is a self-hosted, OpenAI API-compatible inference server that supports text generation, image generation, audio transcription, text-to-speech, and embeddings -- all running locally without sending data to external services. It serves as a drop-in replacement for the OpenAI API, which means any application or library that works with OpenAI can be pointed at LocalAI instead. LocalAI supports a wide range of model backends and includes a built-in model gallery for easy setup.

## Prerequisites

Before installing LocalAI, make sure your system has the following:

- **Debian 12 (Bookworm) or later** -- 64-bit x86_64
- **Docker and Docker Compose** -- The recommended installation method
- **8 GB RAM minimum** -- 16 GB or more recommended
- **GPU (optional)** -- NVIDIA GPU with CUDA for accelerated inference

::: tip
If you do not have Docker installed, see the [Docker Setup Guide](/en/server/docker) for installation instructions on Debian.
:::

## Installation

### Method 1: Docker (Recommended)

Docker is the easiest and most reliable way to run LocalAI.

```bash
# Pull and run LocalAI (CPU version)
docker run -d \
  --name localai \
  -p 8080:8080 \
  -v localai-models:/build/models \
  localai/localai:latest-cpu

# Verify the container is running
docker ps | grep localai

# Check the logs
docker logs localai
```

### Method 2: Docker with NVIDIA GPU

```bash
# Run LocalAI with NVIDIA GPU support
docker run -d \
  --name localai \
  --gpus all \
  -p 8080:8080 \
  -v localai-models:/build/models \
  localai/localai:latest-gpu-nvidia-cuda-12

# Verify GPU is available inside the container
docker exec localai nvidia-smi
```

### Method 3: Docker Compose

Create a `docker-compose.yml` for easier management.

```bash
# Create a project directory
mkdir -p ~/localai && cd ~/localai
```

Create the `docker-compose.yml` file:

```yaml
# docker-compose.yml
version: '3.8'

services:
  localai:
    image: localai/localai:latest-cpu
    # For GPU: localai/localai:latest-gpu-nvidia-cuda-12
    container_name: localai
    ports:
      - "8080:8080"
    volumes:
      - ./models:/build/models
    environment:
      - THREADS=4
      - CONTEXT_SIZE=4096
      - DEBUG=false
    restart: unless-stopped
    # Uncomment for GPU support:
    # deploy:
    #   resources:
    #     reservations:
    #       devices:
    #         - driver: nvidia
    #           count: all
    #           capabilities: [gpu]
```

```bash
# Start LocalAI with Docker Compose
cd ~/localai
docker compose up -d

# Check the logs
docker compose logs -f

# Stop LocalAI
docker compose down
```

### Docker Compose with GPU Support

```yaml
# docker-compose-gpu.yml
version: '3.8'

services:
  localai:
    image: localai/localai:latest-gpu-nvidia-cuda-12
    container_name: localai-gpu
    ports:
      - "8080:8080"
    volumes:
      - ./models:/build/models
    environment:
      - THREADS=4
      - CONTEXT_SIZE=4096
    restart: unless-stopped
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: all
              capabilities: [gpu]
```

```bash
# Start with GPU compose file
docker compose -f docker-compose-gpu.yml up -d
```

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `THREADS` | Number of CPU threads for inference | Auto-detected |
| `CONTEXT_SIZE` | Maximum context window size | `512` |
| `DEBUG` | Enable debug logging | `false` |
| `MODELS_PATH` | Path to models directory inside container | `/build/models` |
| `GALLERIES` | JSON array of model gallery URLs | Default gallery |
| `CORS` | Enable CORS for cross-origin requests | `false` |
| `API_KEY` | Set an API key for authentication | None |

### Setting an API Key

```bash
# Run with an API key for security
docker run -d \
  --name localai \
  -p 8080:8080 \
  -v localai-models:/build/models \
  -e API_KEY="your-secret-key" \
  localai/localai:latest-cpu

# Now requests must include the authorization header
curl http://localhost:8080/v1/models \
  -H "Authorization: Bearer your-secret-key"
```

## Usage

### Installing Models from the Gallery

LocalAI includes a model gallery that lets you install pre-configured models.

```bash
# List available models in the gallery
curl http://localhost:8080/models/available

# Install a model from the gallery
curl -X POST http://localhost:8080/models/apply \
  -H "Content-Type: application/json" \
  -d '{
    "id": "llama-3.2-1b-instruct"
  }'

# Check the installation progress
curl http://localhost:8080/models/jobs
```

### Text Generation (Chat Completions)

```bash
# Send a chat completion request (OpenAI-compatible)
curl http://localhost:8080/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama-3.2-1b-instruct",
    "messages": [
      {"role": "system", "content": "You are a helpful Debian Linux expert."},
      {"role": "user", "content": "How do I update all packages on Debian?"}
    ],
    "temperature": 0.7
  }'

# Text completion endpoint
curl http://localhost:8080/v1/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama-3.2-1b-instruct",
    "prompt": "The main advantages of Debian are",
    "max_tokens": 200
  }'
```

### Text Embeddings

```bash
# Generate text embeddings
curl http://localhost:8080/v1/embeddings \
  -H "Content-Type: application/json" \
  -d '{
    "model": "text-embedding-ada-002",
    "input": "Debian is a free and open-source operating system."
  }'
```

### Image Generation

```bash
# Generate an image (requires a Stable Diffusion model)
curl http://localhost:8080/v1/images/generations \
  -H "Content-Type: application/json" \
  -d '{
    "model": "stablediffusion",
    "prompt": "A penguin working on a laptop, digital art",
    "size": "512x512"
  }'
```

### Audio Transcription

```bash
# Transcribe audio (requires a Whisper model)
curl http://localhost:8080/v1/audio/transcriptions \
  -F "file=@recording.mp3" \
  -F "model=whisper-1"
```

### Text-to-Speech

```bash
# Generate speech from text
curl http://localhost:8080/v1/audio/speech \
  -H "Content-Type: application/json" \
  -d '{
    "model": "tts-1",
    "input": "Welcome to Debian Linux.",
    "voice": "alloy"
  }' --output speech.mp3
```

### Using with Python (OpenAI SDK)

Because LocalAI is OpenAI API-compatible, you can use the official OpenAI Python library.

```bash
# Install the OpenAI Python SDK
pip install openai
```

```python
# example.py
from openai import OpenAI

# Point the client at LocalAI instead of OpenAI
client = OpenAI(
    base_url="http://localhost:8080/v1",
    api_key="not-needed"  # or your API_KEY if set
)

response = client.chat.completions.create(
    model="llama-3.2-1b-instruct",
    messages=[
        {"role": "user", "content": "What makes Debian stable?"}
    ]
)

print(response.choices[0].message.content)
```

### List Available Models

```bash
# List all loaded and available models
curl http://localhost:8080/v1/models

# Check system health
curl http://localhost:8080/readyz
```

## Update

```bash
# Pull the latest image
docker compose pull

# Restart with the new version
docker compose up -d

# Or if running without Compose
docker pull localai/localai:latest-cpu
docker stop localai && docker rm localai
docker run -d \
  --name localai \
  -p 8080:8080 \
  -v localai-models:/build/models \
  localai/localai:latest-cpu
```

## Troubleshooting

### Container fails to start

```bash
# Check the container logs
docker logs localai

# Verify Docker is running
sudo systemctl status docker

# Check available disk space
df -h

# Remove and recreate the container
docker stop localai && docker rm localai
docker compose up -d
```

### Model loading fails

```bash
# Check which models are available
docker exec localai ls /build/models/

# Verify model file integrity
docker exec localai du -sh /build/models/*

# Check logs for model loading errors
docker logs localai 2>&1 | grep -i error
```

### GPU not detected in container

```bash
# Verify NVIDIA Container Toolkit is installed
dpkg -l | grep nvidia-container-toolkit

# Install if missing
sudo apt install -y nvidia-container-toolkit
sudo systemctl restart docker

# Test GPU access in Docker
docker run --rm --gpus all nvidia/cuda:12.0-base nvidia-smi
```

### API returns errors or empty responses

```bash
# Test with a simple request
curl -v http://localhost:8080/v1/models

# Check if the model is loaded
curl http://localhost:8080/v1/models | python3 -m json.tool

# Increase context size if responses are being truncated
# Add to environment: CONTEXT_SIZE=4096
```

### High memory usage

- Use smaller models (1B or 3B parameter variants)
- Reduce `CONTEXT_SIZE` in the environment configuration
- Limit concurrent requests with `THREADS`
- Consider using quantized models (Q4 or lower)

## Related Resources

- [AI Tools Overview](/en/ai/) -- Overview of all AI tools on Debian
- [Ollama](/en/ai/ollama) -- Simpler alternative for running LLMs locally
- [Docker Setup](/en/server/docker) -- Docker installation guide for Debian
- [LocalAI Documentation](https://localai.io) -- Official documentation
- [LocalAI GitHub](https://github.com/mudler/LocalAI) -- Source code and issue tracker
