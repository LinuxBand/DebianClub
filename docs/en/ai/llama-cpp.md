---
title: llama.cpp Installation & Usage
description: Step-by-step guide to building and using llama.cpp, a high-performance C++ LLM inference library with a production-grade server, on Debian.
---

# llama.cpp

llama.cpp is a high-performance C++ library for local large language model inference. It provides both a CLI chat tool and a production-grade HTTP server with an OpenAI-compatible API. llama.cpp is the underlying engine behind many popular tools like Ollama and LM Studio, but using it directly gives you maximum control over model loading, quantization, and inference parameters.

## Prerequisites

Before building llama.cpp, make sure you have the following:

- **Debian 12 (Bookworm) or later** -- 64-bit x86_64 or ARM64
- **Build tools** -- GCC, CMake, Make, and Git
- **4 GB RAM minimum** -- More recommended for larger models
- **GPU (optional)** -- NVIDIA GPU with CUDA toolkit for GPU acceleration

## Installation

### Step 1: Install Build Dependencies

```bash
# Install essential build tools
sudo apt update
sudo apt install -y build-essential cmake git pkg-config
```

### Step 2: Clone the Repository

```bash
# Clone the llama.cpp repository
git clone https://github.com/ggerganov/llama.cpp.git
cd llama.cpp
```

### Step 3: Build (CPU Only)

```bash
# Create a build directory and compile
cmake -B build
cmake --build build --config Release -j $(nproc)

# Verify the build
./build/bin/llama-cli --version
./build/bin/llama-server --version
```

### Step 4: Build with CUDA Support (Optional)

If you have an NVIDIA GPU, you can build with CUDA acceleration for significantly faster inference.

```bash
# Install NVIDIA CUDA toolkit
sudo apt install -y nvidia-cuda-toolkit

# Build with CUDA support
cmake -B build -DGGML_CUDA=ON
cmake --build build --config Release -j $(nproc)

# Verify CUDA is enabled
./build/bin/llama-cli --version
```

::: tip
For the latest CUDA toolkit, you can also install it directly from NVIDIA's repository. See [NVIDIA CUDA Installation Guide](https://developer.nvidia.com/cuda-downloads) for Debian packages.
:::

### Optional: Install System-Wide

```bash
# Install the built binaries to /usr/local
sudo cmake --install build

# Verify system-wide installation
llama-cli --version
llama-server --version
```

## Configuration

### Downloading GGUF Models

llama.cpp uses the GGUF model format. You can download models from Hugging Face.

```bash
# Create a directory for models
mkdir -p ~/models

# Download a model using wget (example: Llama 3.2 1B Q4_K_M)
wget -O ~/models/llama-3.2-1b-q4_k_m.gguf \
  "https://huggingface.co/bartowski/Llama-3.2-1B-Instruct-GGUF/resolve/main/Llama-3.2-1B-Instruct-Q4_K_M.gguf"

# Download a larger model (example: Mistral 7B Q4_K_M)
wget -O ~/models/mistral-7b-q4_k_m.gguf \
  "https://huggingface.co/TheBloke/Mistral-7B-Instruct-v0.2-GGUF/resolve/main/mistral-7b-instruct-v0.2.Q4_K_M.gguf"
```

::: tip
When choosing a quantization level:
- **Q4_K_M** -- Best balance of quality and size for most users
- **Q5_K_M** -- Higher quality, ~15% larger than Q4
- **Q8_0** -- Near-original quality, significantly larger
- **Q3_K_S** -- Smallest size, noticeable quality reduction
:::

### Model File Locations

| Source | URL Pattern |
|--------|-------------|
| Hugging Face | `https://huggingface.co/{user}/{repo}/resolve/main/{filename}.gguf` |
| TheBloke's Collection | `https://huggingface.co/TheBloke` -- Large collection of pre-quantized models |
| bartowski's Collection | `https://huggingface.co/bartowski` -- Up-to-date GGUF conversions |

## Usage

### CLI Chat (llama-cli)

Use `llama-cli` for interactive chat sessions in the terminal.

```bash
# Start an interactive chat session
./build/bin/llama-cli \
  -m ~/models/llama-3.2-1b-q4_k_m.gguf \
  --conversation \
  -ngl 99

# Run with a specific prompt
./build/bin/llama-cli \
  -m ~/models/llama-3.2-1b-q4_k_m.gguf \
  -p "Explain the Debian package management system." \
  -n 256

# Run with custom parameters
./build/bin/llama-cli \
  -m ~/models/llama-3.2-1b-q4_k_m.gguf \
  --conversation \
  -ngl 99 \
  --temp 0.7 \
  --top-p 0.9 \
  -c 4096
```

Key parameters:

| Flag | Description |
|------|-------------|
| `-m` | Path to the GGUF model file |
| `-ngl` | Number of layers to offload to GPU (use `99` for all layers) |
| `-c` | Context size in tokens (default: 2048) |
| `--temp` | Temperature for sampling (0.0 = deterministic, 1.0 = creative) |
| `--top-p` | Top-p (nucleus) sampling threshold |
| `-n` | Maximum number of tokens to generate |
| `-t` | Number of CPU threads to use |
| `--conversation` | Enable interactive conversation mode |

### HTTP Server (llama-server)

`llama-server` provides a production-grade HTTP server with an OpenAI-compatible API and a built-in web UI.

```bash
# Start the server with a model
./build/bin/llama-server \
  -m ~/models/llama-3.2-1b-q4_k_m.gguf \
  --host 0.0.0.0 \
  --port 8080 \
  -ngl 99 \
  -c 4096

# Start with multiple slots for concurrent requests
./build/bin/llama-server \
  -m ~/models/llama-3.2-1b-q4_k_m.gguf \
  --host 0.0.0.0 \
  --port 8080 \
  -ngl 99 \
  -c 4096 \
  --parallel 4
```

After starting the server, open `http://localhost:8080` in your browser for the built-in web UI.

```bash
# Test the server with curl (OpenAI-compatible endpoint)
curl http://localhost:8080/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama-3.2-1b",
    "messages": [
      {"role": "user", "content": "What is Debian?"}
    ]
  }'

# Generate a text completion
curl http://localhost:8080/v1/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama-3.2-1b",
    "prompt": "Debian is a",
    "max_tokens": 100
  }'

# Check server health
curl http://localhost:8080/health
```

### Running as a Systemd Service

Create a systemd service to run llama-server in the background.

```bash
# Create a systemd service file
sudo tee /etc/systemd/system/llama-server.service << 'EOF'
[Unit]
Description=llama.cpp HTTP Server
After=network.target

[Service]
Type=simple
User=nobody
ExecStart=/usr/local/bin/llama-server \
  -m /home/user/models/llama-3.2-1b-q4_k_m.gguf \
  --host 0.0.0.0 \
  --port 8080 \
  -ngl 99 \
  -c 4096
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

# Reload systemd, enable and start the service
sudo systemctl daemon-reload
sudo systemctl enable llama-server
sudo systemctl start llama-server

# Check the service status
sudo systemctl status llama-server
```

## Update

```bash
# Navigate to the llama.cpp directory
cd llama.cpp

# Pull the latest changes
git pull origin master

# Rebuild
cmake -B build
cmake --build build --config Release -j $(nproc)

# If installed system-wide, reinstall
sudo cmake --install build
```

## Troubleshooting

### Build fails with missing dependencies

```bash
# Install all required build dependencies
sudo apt install -y build-essential cmake git pkg-config

# If CUDA build fails, verify CUDA toolkit installation
nvcc --version
dpkg -l | grep nvidia-cuda-toolkit
```

### CUDA not found during build

```bash
# Install CUDA toolkit
sudo apt install -y nvidia-cuda-toolkit

# Set CUDA path if cmake cannot find it
cmake -B build -DGGML_CUDA=ON -DCMAKE_CUDA_COMPILER=/usr/bin/nvcc
cmake --build build --config Release -j $(nproc)
```

### Model loading fails

```bash
# Verify the model file exists and is not corrupted
ls -lh ~/models/llama-3.2-1b-q4_k_m.gguf

# Check file integrity (re-download if the size looks wrong)
md5sum ~/models/llama-3.2-1b-q4_k_m.gguf

# Try loading with verbose output
./build/bin/llama-cli -m ~/models/llama-3.2-1b-q4_k_m.gguf --verbose-prompt
```

### Out of memory when loading large models

```bash
# Reduce the context size
./build/bin/llama-cli -m ~/models/large-model.gguf -c 2048 -ngl 99

# Use partial GPU offloading (offload fewer layers)
./build/bin/llama-cli -m ~/models/large-model.gguf -ngl 20

# Use a more aggressively quantized model (Q3 or Q4 instead of Q8)
```

### Slow inference on CPU

```bash
# Specify the number of threads to match your CPU cores
./build/bin/llama-cli -m ~/models/model.gguf -t $(nproc)

# Enable memory-mapped I/O (enabled by default, but verify)
./build/bin/llama-cli -m ~/models/model.gguf --mlock
```

## Related Resources

- [AI Tools Overview](/en/ai/) -- Overview of all AI tools on Debian
- [Ollama](/en/ai/ollama) -- User-friendly wrapper around llama.cpp
- [llamafile](/en/ai/llamafile) -- Single-file executable LLM based on llama.cpp
- [llama.cpp GitHub](https://github.com/ggerganov/llama.cpp) -- Official repository and documentation
