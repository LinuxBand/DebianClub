---
title: LM Studio Installation & Usage
description: Step-by-step guide to installing and using LM Studio, a GUI application for discovering, downloading, and running LLMs locally on Debian.
---

# LM Studio

LM Studio is a desktop application for discovering, downloading, and running large language models locally. It provides a polished graphical interface for chatting with models, a built-in model search engine that connects to Hugging Face, and a local server mode that exposes an OpenAI-compatible API. LM Studio makes local LLM experimentation accessible without requiring any command-line knowledge.

## Prerequisites

Before installing LM Studio, make sure your system meets these requirements:

- **Debian 12 (Bookworm) or later** -- 64-bit x86_64
- **8 GB RAM minimum** -- 16 GB or more recommended
- **libfuse2** -- Required for running AppImage applications
- **GPU (optional)** -- NVIDIA GPU with CUDA support for accelerated inference

::: tip
LM Studio bundles its own inference engine, so you do not need to install llama.cpp or any other backend separately.
:::

## Installation

### Step 1: Install libfuse2

LM Studio is distributed as an AppImage, which requires `libfuse2` to run.

```bash
# Install the FUSE library required for AppImage
sudo apt update
sudo apt install -y libfuse2
```

### Step 2: Download LM Studio

Download the latest AppImage from the official website.

```bash
# Create a directory for the application
mkdir -p ~/Applications

# Download LM Studio AppImage (visit lmstudio.ai for the latest URL)
wget -O ~/Applications/LMStudio.AppImage "https://lmstudio.ai/download/linux"

# Make the AppImage executable
chmod +x ~/Applications/LMStudio.AppImage
```

### Step 3: Launch LM Studio

```bash
# Run LM Studio
~/Applications/LMStudio.AppImage
```

### Optional: Create a Desktop Shortcut

Create a `.desktop` file so LM Studio appears in your application menu.

```bash
# Create a desktop entry
cat << 'EOF' > ~/.local/share/applications/lm-studio.desktop
[Desktop Entry]
Name=LM Studio
Comment=Discover, download, and run local LLMs
Exec=$HOME/Applications/LMStudio.AppImage
Icon=lm-studio
Type=Application
Categories=Development;Science;
Terminal=false
EOF

# Update the desktop database
update-desktop-database ~/.local/share/applications/
```

## Configuration

### Model Storage Location

By default, LM Studio stores downloaded models in `~/.cache/lm-studio/models`. You can change this in the application settings:

1. Open LM Studio
2. Click the gear icon (Settings) in the bottom-left corner
3. Under "Models Directory", click "Change" and select your preferred location

```bash
# Check how much space your models are using
du -sh ~/.cache/lm-studio/models/

# If you want to move models to a larger drive, create a symlink
# (Stop LM Studio first)
mv ~/.cache/lm-studio/models /mnt/large-drive/lm-studio-models
ln -s /mnt/large-drive/lm-studio-models ~/.cache/lm-studio/models
```

### GPU Acceleration

If you have an NVIDIA GPU, LM Studio will automatically detect and use it. Make sure your NVIDIA drivers are installed:

```bash
# Install NVIDIA drivers (non-free repos must be enabled)
sudo apt install -y nvidia-driver firmware-misc-nonfree

# Reboot to load the driver
sudo reboot

# Verify the GPU is recognized after reboot
nvidia-smi
```

## Usage

### Discovering and Downloading Models

1. Launch LM Studio and click the **Search** tab (magnifying glass icon)
2. Search for a model by name, such as "llama 3.2" or "mistral"
3. Browse the results and select a quantization level (Q4_K_M is a good balance of quality and size)
4. Click **Download** to fetch the model

::: tip
Quantization levels affect both quality and file size. Common options:
- **Q4_K_M** -- Good balance, recommended for most users
- **Q5_K_M** -- Higher quality, uses more RAM
- **Q8_0** -- Near-original quality, large file size
- **Q3_K_S** -- Smallest, lower quality, for limited hardware
:::

### Chatting with Models

1. Click the **Chat** tab (speech bubble icon)
2. Select a downloaded model from the dropdown at the top
3. Type your message and press Enter to chat
4. Adjust parameters like temperature, top-p, and system prompt in the right panel

### Local Server Mode

LM Studio can run as a local server, exposing an OpenAI-compatible API that other tools can connect to.

1. Click the **Server** tab (network icon)
2. Select a model to serve
3. Click **Start Server**
4. The server runs on `http://localhost:1234` by default

```bash
# Test the local server with curl
curl http://localhost:1234/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "loaded-model-name",
    "messages": [
      {"role": "user", "content": "What is Debian?"}
    ]
  }'

# List available models on the server
curl http://localhost:1234/v1/models
```

### LM Studio CLI (lms)

LM Studio includes a command-line tool called `lms` for advanced users.

```bash
# Bootstrap the CLI (run this once after installing LM Studio)
~/.cache/lm-studio/bin/lms bootstrap

# After bootstrapping, restart your shell or source your profile
source ~/.bashrc

# Check the CLI version
lms version

# List downloaded models
lms ls

# Load a model into memory
lms load llama-3.2-1b

# Start the local server from the CLI
lms server start

# Stop the local server
lms server stop

# Get server status
lms status

# Unload all models from memory
lms unload --all
```

## Update

LM Studio checks for updates automatically when launched. You can also update manually:

```bash
# Download the latest version (visit lmstudio.ai for the current URL)
wget -O ~/Applications/LMStudio.AppImage "https://lmstudio.ai/download/linux"

# Make it executable
chmod +x ~/Applications/LMStudio.AppImage
```

## Troubleshooting

### AppImage fails to launch

```bash
# Verify libfuse2 is installed
dpkg -l | grep libfuse2

# If not installed, install it
sudo apt install -y libfuse2

# Try running from the terminal to see error messages
~/Applications/LMStudio.AppImage --verbose
```

### "FUSE not found" error

```bash
# Install FUSE and related packages
sudo apt install -y libfuse2 fuse

# If the issue persists, try extracting the AppImage instead
cd ~/Applications
./LMStudio.AppImage --appimage-extract
# Run the extracted version
./squashfs-root/AppRun
```

### Model loading fails with out-of-memory error

If a model fails to load, it may be too large for your available RAM or VRAM.

- Try a smaller quantization (e.g., Q3_K_S instead of Q5_K_M)
- Try a smaller model (e.g., 1B or 3B parameter versions)
- Close other applications to free up RAM
- In settings, reduce the context length (lower values use less memory)

### GPU not detected in LM Studio

```bash
# Verify NVIDIA drivers are working
nvidia-smi

# Check that the CUDA libraries are available
ldconfig -p | grep libcuda

# Reinstall drivers if needed
sudo apt install -y nvidia-driver firmware-misc-nonfree
sudo reboot
```

### Server mode connection refused

```bash
# Check if the server is running
curl http://localhost:1234/v1/models

# Make sure no other service is using port 1234
ss -tlnp | grep 1234

# Restart the server from the CLI
lms server stop
lms server start
```

## Related Resources

- [AI Tools Overview](/en/ai/) -- Overview of all AI tools on Debian
- [Ollama](/en/ai/ollama) -- CLI-based alternative for local LLM inference
- [llama.cpp](/en/ai/llama-cpp) -- The underlying inference engine
- [LM Studio Website](https://lmstudio.ai) -- Official download and documentation
