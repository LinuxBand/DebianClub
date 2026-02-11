---
title: ComfyUI Installation & Usage
description: Step-by-step guide to installing and using ComfyUI, a node-based AI image generation UI that is faster and more flexible than AUTOMATIC1111, on Debian.
---

# ComfyUI

ComfyUI is a node-based user interface for AI image generation. Instead of a traditional form-based layout, ComfyUI uses a visual graph editor where you connect processing nodes to build custom generation workflows. This approach offers significantly more flexibility than AUTOMATIC1111's WebUI, is generally faster due to built-in workflow optimizations, and supports advanced pipelines like multi-model generation, cascaded refinement, and custom node logic.

## Prerequisites

Before installing ComfyUI, make sure you have the following:

- **Debian 12 (Bookworm) or later** -- 64-bit x86_64
- **Python 3.10 or later** -- Required runtime
- **NVIDIA GPU with 4 GB+ VRAM** -- 8 GB+ recommended for SDXL models
- **15 GB+ free disk space** -- For the application and model files
- **Git** -- For cloning the repository

::: tip
ComfyUI uses less VRAM than AUTOMATIC1111 by default, making it a better choice for users with limited GPU memory.
:::

## Installation

### Method 1: comfy-cli (Recommended)

The `comfy-cli` tool automates the entire installation process.

```bash
# Install comfy-cli
pip install comfy-cli

# Install ComfyUI (interactive setup)
comfy install

# Launch ComfyUI
comfy launch
```

During installation, `comfy-cli` will ask you to choose:
- Installation directory
- PyTorch version (select CUDA for NVIDIA GPUs)
- Whether to download a default model

### Method 2: Manual Installation

```bash
# Install system dependencies
sudo apt update
sudo apt install -y python3 python3-pip python3-venv git wget

# Clone the ComfyUI repository
git clone https://github.com/comfyanonymous/ComfyUI.git
cd ComfyUI

# Create and activate a Python virtual environment
python3 -m venv venv
source venv/bin/activate

# Install PyTorch with CUDA support (for NVIDIA GPUs)
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu124

# Install ComfyUI dependencies
pip install -r requirements.txt
```

### Verify PyTorch CUDA Setup

```bash
# Activate the virtual environment
cd ComfyUI
source venv/bin/activate

# Verify PyTorch can see the GPU
python3 -c "import torch; print('CUDA available:', torch.cuda.is_available()); print('GPU:', torch.cuda.get_device_name(0) if torch.cuda.is_available() else 'None')"
```

### Download Models

You need at least one Stable Diffusion checkpoint to generate images.

```bash
# Navigate to the checkpoints directory
cd ComfyUI/models/checkpoints

# Download Stable Diffusion XL base model
wget "https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0/resolve/main/sd_xl_base_1.0.safetensors"

# Download a VAE for SDXL (optional but recommended)
cd ../vae
wget "https://huggingface.co/stabilityai/sdxl-vae/resolve/main/sdxl_vae.safetensors"
```

## Configuration

### Launch Options

```bash
# Start ComfyUI (default: http://127.0.0.1:8188)
cd ComfyUI
source venv/bin/activate
python3 main.py

# Listen on all interfaces (accessible from other devices)
python3 main.py --listen 0.0.0.0

# Use a custom port
python3 main.py --port 8188

# Low VRAM mode (for GPUs with 4 GB or less)
python3 main.py --lowvram

# Use CPU only (very slow, for testing only)
python3 main.py --cpu
```

| Argument | Description |
|----------|-------------|
| `--listen` | Bind address (default: `127.0.0.1`) |
| `--port` | Port number (default: `8188`) |
| `--lowvram` | Reduce VRAM usage for limited GPUs |
| `--highvram` | Keep models in VRAM for faster generation |
| `--cpu` | Run on CPU only |
| `--preview-method auto` | Enable live preview during generation |
| `--use-pytorch-cross-attention` | Use PyTorch's built-in cross-attention |

### Model Directory Structure

```
ComfyUI/models/
  checkpoints/      # Main Stable Diffusion models (.safetensors)
  loras/            # LoRA models
  vae/              # VAE models
  controlnet/       # ControlNet models
  upscale_models/   # Upscaler models (ESRGAN, etc.)
  clip/             # CLIP text encoder models
  embeddings/       # Textual inversion embeddings
```

### Sharing Models with AUTOMATIC1111

If you already have models from AUTOMATIC1111, you can share them instead of downloading duplicates.

```bash
# Edit the extra model paths configuration
cp ComfyUI/extra_model_paths.yaml.example ComfyUI/extra_model_paths.yaml
```

Edit `extra_model_paths.yaml`:

```yaml
# extra_model_paths.yaml
a111:
  base_path: /home/user/stable-diffusion-webui

  checkpoints: models/Stable-diffusion
  configs: models/Stable-diffusion
  vae: models/VAE
  loras: |
    models/Lora
    models/LyCORIS
  upscale_models: |
    models/ESRGAN
    models/RealESRGAN
  embeddings: embeddings
  controlnet: models/ControlNet
```

## Usage

### Basic Workflow

1. Open `http://localhost:8188` in your browser
2. The default workflow appears with basic txt2img nodes
3. Click on the **KSampler** node to set sampling parameters
4. Click on **CLIP Text Encode** nodes to enter your positive and negative prompts
5. Click **Queue Prompt** to generate an image

### Understanding Nodes

ComfyUI uses a node-based graph system. Key node types:

| Node | Purpose |
|------|---------|
| **Load Checkpoint** | Load a Stable Diffusion model |
| **CLIP Text Encode** | Convert text prompts to model-readable format |
| **KSampler** | The main generation node (controls steps, CFG, seed) |
| **Empty Latent Image** | Set the output image dimensions |
| **VAE Decode** | Convert latent space to a visible image |
| **Save Image** | Save the generated image to disk |

### Loading and Saving Workflows

```bash
# Workflows are saved as JSON files
# Use the menu: Workflow > Save to save your current workflow

# Load a workflow from a JSON file
# Use the menu: Workflow > Open to load a saved workflow

# You can also drag and drop workflow JSON files onto the ComfyUI canvas

# Workflows are also embedded in generated PNG images
# Drag a ComfyUI-generated image onto the canvas to load its workflow
```

### Installing ComfyUI Manager

ComfyUI Manager is an essential extension that adds a GUI for installing custom nodes, models, and workflows.

```bash
# Navigate to the custom nodes directory
cd ComfyUI/custom_nodes

# Clone ComfyUI Manager
git clone https://github.com/ltdrdata/ComfyUI-Manager.git

# Restart ComfyUI
```

After restarting, a **Manager** button appears in the ComfyUI interface. From there you can:
- Browse and install custom nodes
- Search for missing nodes in a workflow
- Update installed custom nodes
- Install models directly from the UI

### Popular Custom Nodes

Install these through ComfyUI Manager or manually:

| Custom Node | Purpose |
|-------------|---------|
| **ComfyUI-Manager** | Node and model management |
| **ComfyUI-Impact-Pack** | Advanced image processing nodes |
| **ComfyUI-AnimateDiff** | Video generation from images |
| **ComfyUI-ControlNet-Auxiliary** | ControlNet preprocessors |
| **ComfyUI-KJNodes** | Utility nodes for workflow building |

### Running as a Systemd Service

```bash
# Create a systemd service file
sudo tee /etc/systemd/system/comfyui.service << 'EOF'
[Unit]
Description=ComfyUI Image Generation Server
After=network.target

[Service]
Type=simple
User=your-username
WorkingDirectory=/home/your-username/ComfyUI
ExecStart=/home/your-username/ComfyUI/venv/bin/python3 main.py --listen 0.0.0.0 --port 8188
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# Enable and start the service
sudo systemctl daemon-reload
sudo systemctl enable comfyui
sudo systemctl start comfyui

# Check the service status
sudo systemctl status comfyui
```

## Update

### Using comfy-cli

```bash
# Update ComfyUI
comfy update

# Update all custom nodes
comfy nodes update all
```

### Manual Update

```bash
# Navigate to the ComfyUI directory
cd ComfyUI

# Pull the latest changes
git pull origin master

# Update dependencies
source venv/bin/activate
pip install -r requirements.txt

# Update custom nodes
cd custom_nodes
for dir in */; do (cd "$dir" && git pull 2>/dev/null); done
```

## Troubleshooting

### ComfyUI fails to start

```bash
# Activate the virtual environment and check for errors
cd ComfyUI
source venv/bin/activate
python3 main.py

# If modules are missing, reinstall dependencies
pip install -r requirements.txt

# If the venv is corrupted, recreate it
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu124
pip install -r requirements.txt
```

### CUDA out of memory

```bash
# Use low VRAM mode
python3 main.py --lowvram

# Reduce image resolution in the Empty Latent Image node
# Use 512x512 for SD 1.5 or 1024x1024 for SDXL

# Close other GPU-intensive applications
```

### Workflow errors (red nodes)

- Red nodes indicate missing custom nodes
- Open **ComfyUI Manager** and click **Install Missing Custom Nodes**
- Or manually install the missing node package from the custom_nodes directory

### Generated images are black or corrupted

```bash
# Try a different VAE
# Download and load the SDXL VAE explicitly in your workflow

# Check if the model file is corrupted
ls -lh models/checkpoints/

# Try running with --force-fp32 for precision issues
python3 main.py --force-fp32
```

### Slow generation speed

```bash
# Make sure CUDA is being used
python3 -c "import torch; print(torch.cuda.is_available())"

# Enable xformers for better performance
pip install xformers

# Use --highvram if you have plenty of VRAM (keeps models loaded)
python3 main.py --highvram
```

## Related Resources

- [AI Tools Overview](/en/ai/) -- Overview of all AI tools on Debian
- [Stable Diffusion WebUI](/en/ai/stable-diffusion) -- Traditional UI alternative
- [ComfyUI GitHub](https://github.com/comfyanonymous/ComfyUI) -- Official repository
- [ComfyUI Examples](https://comfyanonymous.github.io/ComfyUI_examples/) -- Official workflow examples
- [OpenArt Workflow Gallery](https://openart.ai/workflows) -- Community-shared workflows
