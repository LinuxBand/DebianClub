---
title: Jan Installation & Usage
description: Step-by-step guide to installing and using Jan, a privacy-first local AI chat application with a ChatGPT-like interface, on Debian.
---

# Jan

Jan is an open-source, privacy-first desktop application for running AI models locally. It provides a familiar ChatGPT-like chat interface, a built-in model hub for downloading models with one click, a local API server compatible with the OpenAI format, and integration with external providers like Ollama. All data stays on your machine, making Jan an excellent choice for users who want local AI with a polished user experience.

## Prerequisites

Before installing Jan, make sure your system meets these requirements:

- **Debian 12 (Bookworm) or later** -- 64-bit x86_64
- **8 GB RAM minimum** -- 16 GB or more recommended for larger models
- **GPU (optional)** -- NVIDIA GPU with CUDA support for accelerated inference
- **libfuse2** -- Required if using the AppImage version

## Installation

### Method 1: Debian Package (.deb) -- Recommended

The `.deb` package is the easiest way to install Jan on Debian.

```bash
# Download the latest .deb package from jan.ai
# Visit https://jan.ai/download for the latest URL
wget -O jan-latest.deb "https://app.jan.ai/download/latest/linux-amd64-deb"

# Install the package
sudo dpkg -i jan-latest.deb

# Fix any missing dependencies
sudo apt install -f -y

# Launch Jan
jan
```

### Method 2: AppImage

If you prefer not to install system-wide, use the AppImage.

```bash
# Install libfuse2 (required for AppImage)
sudo apt install -y libfuse2

# Create a directory for the application
mkdir -p ~/Applications

# Download the AppImage
wget -O ~/Applications/jan.AppImage "https://app.jan.ai/download/latest/linux-amd64-appimage"

# Make it executable
chmod +x ~/Applications/jan.AppImage

# Launch Jan
~/Applications/jan.AppImage
```

### Optional: Create a Desktop Shortcut (AppImage)

```bash
# Create a desktop entry for the AppImage version
cat << 'EOF' > ~/.local/share/applications/jan.desktop
[Desktop Entry]
Name=Jan
Comment=Privacy-first local AI chat
Exec=$HOME/Applications/jan.AppImage
Icon=jan
Type=Application
Categories=Development;Science;
Terminal=false
EOF

update-desktop-database ~/.local/share/applications/
```

## Configuration

### Data Storage Location

By default, Jan stores all data (models, conversations, settings) in `~/jan`. You can change this:

1. Open Jan and go to **Settings** (gear icon)
2. Under **Advanced Settings**, find the data folder option
3. Select your preferred location

```bash
# Check the current data directory size
du -sh ~/jan

# If you want to move data to a larger drive
# (Stop Jan first)
mv ~/jan /mnt/large-drive/jan
ln -s /mnt/large-drive/jan ~/jan
```

### NVIDIA GPU Setup

Jan will automatically use your NVIDIA GPU if drivers are properly installed.

```bash
# Install NVIDIA drivers (non-free repos must be enabled)
sudo apt install -y nvidia-driver firmware-misc-nonfree

# Reboot to load the driver
sudo reboot

# Verify GPU is working after reboot
nvidia-smi
```

After installing drivers, restart Jan. It should automatically detect and use the GPU.

### Thread and Memory Settings

In Jan's settings, you can configure:

- **CPU Threads** -- Number of CPU threads for inference (default: auto-detected)
- **GPU Layers** -- Number of model layers to offload to GPU
- **Context Length** -- Maximum conversation context window

## Usage

### Built-in Model Hub

Jan includes a model hub where you can browse and download models with a single click.

1. Open Jan and click the **Model Hub** tab
2. Browse recommended models organized by size and capability
3. Click **Download** on any model to fetch it
4. Once downloaded, select the model from the chat interface dropdown

Popular models available in Jan's hub:

| Model | Size | Best For |
|-------|------|----------|
| Llama 3.2 1B | ~1 GB | Quick responses, low hardware |
| Llama 3.2 3B | ~2 GB | General conversation |
| Mistral 7B | ~4 GB | Good all-round performance |
| Qwen 2.5 7B | ~4.5 GB | Multilingual, coding |
| DeepSeek R1 7B | ~4.5 GB | Reasoning tasks |

### Chat Interface

1. Select a downloaded model from the dropdown at the top of the chat area
2. Type your message and press Enter
3. Use the **New Thread** button to start a new conversation
4. Previous conversations are saved in the sidebar

### Customize Assistant Behavior

1. Click the settings icon in a chat thread
2. Set a **System Prompt** to define the AI's behavior
3. Adjust **Temperature** (creativity) and **Max Tokens** (response length)
4. These settings are saved per thread

### Local API Server

Jan can run as a local API server, compatible with the OpenAI API format.

1. Go to **Settings** > **Local API Server**
2. Click **Start Server**
3. The server runs on `http://localhost:1337` by default

```bash
# Test the local API server
curl http://localhost:1337/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama-3.2-1b-instruct",
    "messages": [
      {"role": "user", "content": "What is Debian?"}
    ]
  }'

# List available models
curl http://localhost:1337/v1/models
```

### Ollama Integration

Jan can connect to an existing Ollama instance to use its models.

1. Make sure [Ollama](/en/ai/ollama) is running (`ollama serve`)
2. In Jan, go to **Settings** > **Model Providers**
3. Enable **Ollama** and set the endpoint (default: `http://localhost:11434`)
4. Ollama models will appear in your model list

```bash
# Make sure Ollama is running
sudo systemctl status ollama

# Pull some models in Ollama that Jan can use
ollama pull llama3.2
ollama pull mistral
```

### Import Custom Models

You can import GGUF model files that you have downloaded manually.

1. Go to **Settings** > **My Models**
2. Click **Import Model**
3. Select a `.gguf` file from your filesystem
4. Configure the model parameters and save

## Update

### Updating the .deb Installation

```bash
# Download the latest .deb package
wget -O jan-latest.deb "https://app.jan.ai/download/latest/linux-amd64-deb"

# Install the update (overwrites the previous version)
sudo dpkg -i jan-latest.deb
sudo apt install -f -y
```

### Updating the AppImage

```bash
# Download the latest AppImage
wget -O ~/Applications/jan.AppImage "https://app.jan.ai/download/latest/linux-amd64-appimage"
chmod +x ~/Applications/jan.AppImage
```

## Troubleshooting

### Jan fails to launch

```bash
# Run from the terminal to see error output
jan --verbose

# Or for the AppImage version
~/Applications/jan.AppImage --verbose

# Check if all dependencies are met
ldd $(which jan) 2>/dev/null | grep "not found"
```

### AppImage fails to run

```bash
# Install libfuse2
sudo apt install -y libfuse2

# If it still fails, extract and run directly
cd ~/Applications
./jan.AppImage --appimage-extract
./squashfs-root/AppRun
```

### GPU not detected

```bash
# Verify NVIDIA drivers are loaded
nvidia-smi

# Check that Jan is using the GPU build
# In Jan, go to Settings > Advanced > GPU Acceleration
# Make sure it is enabled

# If drivers were installed after Jan, restart Jan
```

### Model download fails

1. Check your internet connection
2. Check available disk space: `df -h ~`
3. Try downloading the model manually from Hugging Face and importing it
4. Clear the download cache: remove incomplete files from `~/jan/models/`

### High memory usage

- Close unused chat threads
- Use smaller models (1B or 3B parameters)
- Reduce the context length in model settings
- Close and restart Jan to free cached memory

### API server not responding

```bash
# Check if the server port is in use
ss -tlnp | grep 1337

# Restart the server from Jan's settings
# Or restart Jan entirely

# Test connectivity
curl http://localhost:1337/v1/models
```

## Related Resources

- [AI Tools Overview](/en/ai/) -- Overview of all AI tools on Debian
- [Ollama](/en/ai/ollama) -- CLI-based LLM runner that integrates with Jan
- [LM Studio](/en/ai/lm-studio) -- Alternative GUI for local LLMs
- [Jan Website](https://jan.ai) -- Official download and documentation
- [Jan GitHub](https://github.com/janhq/jan) -- Source code and issue tracker
