---
title: llamafile Installation & Usage
description: Step-by-step guide to using llamafile, a single portable executable for running LLMs with zero dependencies, on Debian.
---

# llamafile

llamafile turns a large language model into a single portable executable file. There is nothing to install and no dependencies to manage -- you download one file, make it executable, and run it. Each llamafile bundles the model weights together with the llama.cpp inference engine, and it includes a built-in web UI for browser-based chat. This makes llamafile the simplest possible way to get started with local AI on Debian.

## Prerequisites

llamafile has minimal requirements:

- **Debian 12 (Bookworm) or later** -- 64-bit x86_64 or ARM64
- **Sufficient RAM** -- At least as much RAM as the llamafile size (plus overhead)
- **GPU (optional)** -- NVIDIA GPU with drivers for accelerated inference

::: tip
llamafile truly has zero software dependencies. You do not need Python, Node.js, Docker, or any other runtime. The only requirement is a 64-bit Linux kernel.
:::

## Installation

### Method 1: Download a Pre-Built llamafile

The easiest approach is to download a llamafile that already includes a model.

```bash
# Create a directory for llamafiles
mkdir -p ~/llamafiles
cd ~/llamafiles

# Download a llamafile (example: TinyLlama 1.1B for quick testing)
wget https://huggingface.co/Mozilla/TinyLlama-1.1B-Chat-v1.0-llamafile/resolve/main/TinyLlama-1.1B-Chat-v1.0.Q5_K_M.llamafile

# Make it executable
chmod +x TinyLlama-1.1B-Chat-v1.0.Q5_K_M.llamafile

# Run it -- a web UI opens in your browser automatically
./TinyLlama-1.1B-Chat-v1.0.Q5_K_M.llamafile
```

### Method 2: Download the llamafile Runtime + Separate Model

You can also use the standalone llamafile runtime to load any GGUF model.

```bash
# Download the llamafile runtime
wget -O ~/llamafiles/llamafile \
  https://github.com/Mozilla-Ocho/llamafile/releases/latest/download/llamafile

# Make it executable
chmod +x ~/llamafiles/llamafile

# Download a GGUF model separately
wget -O ~/llamafiles/mistral-7b-instruct-v0.2.Q4_K_M.gguf \
  "https://huggingface.co/TheBloke/Mistral-7B-Instruct-v0.2-GGUF/resolve/main/mistral-7b-instruct-v0.2.Q4_K_M.gguf"

# Run the runtime with the external model
~/llamafiles/llamafile -m ~/llamafiles/mistral-7b-instruct-v0.2.Q4_K_M.gguf
```

### Popular Pre-Built llamafiles

| llamafile | Size | Description |
|-----------|------|-------------|
| TinyLlama-1.1B | ~800 MB | Small and fast, great for testing |
| Mistral-7B-Instruct | ~4.4 GB | General-purpose, good quality |
| Llava 1.5 7B | ~4.3 GB | Multimodal model (text + image input) |
| Phi-2 | ~1.8 GB | Microsoft's compact model |
| Mixtral 8x7B | ~26 GB | Powerful mixture-of-experts model |

Browse all available llamafiles at the [Mozilla-Ocho Hugging Face page](https://huggingface.co/Mozilla).

## Usage

### Web UI Mode (Default)

By default, running a llamafile starts a local server and opens a web-based chat interface in your browser.

```bash
# Run with web UI (default behavior)
./TinyLlama-1.1B-Chat-v1.0.Q5_K_M.llamafile

# Specify a custom port
./TinyLlama-1.1B-Chat-v1.0.Q5_K_M.llamafile --port 8888

# Bind to all network interfaces (accessible from other machines)
./TinyLlama-1.1B-Chat-v1.0.Q5_K_M.llamafile --host 0.0.0.0
```

The web UI is available at `http://localhost:8080` by default.

### CLI Mode

Run a llamafile in CLI mode for terminal-based interaction.

```bash
# Run in CLI chat mode (no web server)
./TinyLlama-1.1B-Chat-v1.0.Q5_K_M.llamafile --cli \
  -p "What is the Debian package manager?" \
  -n 200

# Interactive conversation in the terminal
./TinyLlama-1.1B-Chat-v1.0.Q5_K_M.llamafile --cli --conversation
```

### Server Mode with API

Run as an API server compatible with the OpenAI API format.

```bash
# Start as an API server
./TinyLlama-1.1B-Chat-v1.0.Q5_K_M.llamafile --server --host 0.0.0.0 --port 8080

# Test the API with curl
curl http://localhost:8080/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "tinyllama",
    "messages": [
      {"role": "user", "content": "Explain apt-get in one paragraph."}
    ]
  }'

# Generate a simple completion
curl http://localhost:8080/v1/completions \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Debian is",
    "max_tokens": 100
  }'
```

### GPU Acceleration

llamafile automatically detects and uses NVIDIA GPUs if drivers are installed.

```bash
# Run with GPU acceleration (automatic if nvidia-smi works)
./TinyLlama-1.1B-Chat-v1.0.Q5_K_M.llamafile -ngl 99

# Verify GPU is being used by checking the startup output
# Look for "CUDA" or "GPU" in the log output

# Offload only some layers to GPU (for models larger than VRAM)
./TinyLlama-1.1B-Chat-v1.0.Q5_K_M.llamafile -ngl 20
```

### Advanced Options

```bash
# Run with custom inference parameters
./TinyLlama-1.1B-Chat-v1.0.Q5_K_M.llamafile \
  --temp 0.7 \
  --top-p 0.9 \
  --ctx-size 4096 \
  --threads $(nproc) \
  -ngl 99

# Run with a system prompt
./TinyLlama-1.1B-Chat-v1.0.Q5_K_M.llamafile --cli \
  --system-prompt "You are a Debian Linux expert." \
  --conversation
```

## Running as a Systemd Service

You can run a llamafile as a persistent background service.

```bash
# Create a systemd service file
sudo tee /etc/systemd/system/llamafile.service << 'EOF'
[Unit]
Description=llamafile LLM Server
After=network.target

[Service]
Type=simple
User=nobody
ExecStart=/home/user/llamafiles/TinyLlama-1.1B-Chat-v1.0.Q5_K_M.llamafile \
  --server --host 0.0.0.0 --port 8080 -ngl 99
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

# Reload systemd, enable and start the service
sudo systemctl daemon-reload
sudo systemctl enable llamafile
sudo systemctl start llamafile

# Check the service status
sudo systemctl status llamafile
```

## Update

To update, simply download the latest llamafile and replace the old one.

```bash
# Download the latest version of a llamafile
cd ~/llamafiles
wget -O TinyLlama-1.1B-Chat-v1.0.Q5_K_M.llamafile \
  https://huggingface.co/Mozilla/TinyLlama-1.1B-Chat-v1.0-llamafile/resolve/main/TinyLlama-1.1B-Chat-v1.0.Q5_K_M.llamafile

chmod +x TinyLlama-1.1B-Chat-v1.0.Q5_K_M.llamafile

# Update the standalone runtime
wget -O ~/llamafiles/llamafile \
  https://github.com/Mozilla-Ocho/llamafile/releases/latest/download/llamafile
chmod +x ~/llamafiles/llamafile
```

## Troubleshooting

### "Permission denied" when running

```bash
# Make sure the file is executable
chmod +x ./your-model.llamafile

# Try running with explicit shell
sh ./your-model.llamafile
```

### "Exec format error"

This usually means the kernel cannot execute the file directly.

```bash
# Install binfmt-support for better binary format handling
sudo apt install -y binfmt-support

# Alternatively, run it explicitly through sh
sh ./your-model.llamafile
```

### Web UI does not open automatically

```bash
# Run with a specific port and manually open the URL
./your-model.llamafile --port 8080

# Open in your browser manually
xdg-open http://localhost:8080
```

### Slow performance without GPU

```bash
# Ensure you are using all CPU threads
./your-model.llamafile --threads $(nproc)

# Try a smaller model or more aggressively quantized version
# Q3_K_S and Q4_K_S variants are faster on CPU
```

### Out of memory

```bash
# Check available memory
free -h

# Use a smaller model file
# llamafile requires roughly the file size + 1-2 GB overhead in RAM

# Reduce context size to save memory
./your-model.llamafile --ctx-size 2048
```

## Related Resources

- [AI Tools Overview](/en/ai/) -- Overview of all AI tools on Debian
- [llama.cpp](/en/ai/llama-cpp) -- The underlying inference engine
- [Ollama](/en/ai/ollama) -- Managed LLM runner with model registry
- [llamafile GitHub](https://github.com/Mozilla-Ocho/llamafile) -- Official repository
- [Mozilla llamafiles on Hugging Face](https://huggingface.co/Mozilla) -- Pre-built llamafile downloads
