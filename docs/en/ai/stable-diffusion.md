---
title: Stable Diffusion WebUI (AUTOMATIC1111) Installation & Usage
description: Step-by-step guide to installing and using AUTOMATIC1111 Stable Diffusion WebUI, the most popular AI image generation interface, on Debian.
---

# Stable Diffusion WebUI (AUTOMATIC1111)

AUTOMATIC1111's Stable Diffusion WebUI is the most widely used web interface for AI image generation. It supports text-to-image, image-to-image, inpainting, outpainting, and dozens of advanced features through a browser-based UI. The project has a massive ecosystem of extensions, models, and community resources. It runs entirely on your local machine, giving you full control over the generation process.

## Prerequisites

Before installing Stable Diffusion WebUI, make sure you have the following:

- **Debian 12 (Bookworm) or later** -- 64-bit x86_64
- **Python 3.10 or later** -- Required for the application and its dependencies
- **NVIDIA GPU with 4 GB+ VRAM** -- 8 GB+ recommended for higher resolutions
- **20 GB+ free disk space** -- For the application, models, and generated images
- **Git** -- For cloning the repository

::: warning
While Stable Diffusion WebUI can run on CPU, it is extremely slow (minutes per image instead of seconds). An NVIDIA GPU is strongly recommended for a usable experience.
:::

## Installation

### Step 1: Install System Dependencies

```bash
# Update package lists
sudo apt update

# Install Python and required system packages
sudo apt install -y python3 python3-pip python3-venv python3-dev
sudo apt install -y git wget curl
sudo apt install -y libgl1-mesa-glx libglib2.0-0 libsm6 libxrender1 libxext6
```

### Step 2: Install NVIDIA Drivers and CUDA

```bash
# Install NVIDIA drivers (non-free repos must be enabled)
sudo apt install -y nvidia-driver firmware-misc-nonfree

# Reboot to load the driver
sudo reboot

# After reboot, verify the GPU
nvidia-smi
```

### Step 3: Clone and Run the WebUI

```bash
# Clone the repository
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git
cd stable-diffusion-webui

# Launch the WebUI (first run will download dependencies and set up a venv)
./webui.sh
```

The first launch will take several minutes as it:
1. Creates a Python virtual environment
2. Downloads and installs PyTorch with CUDA support
3. Installs all Python dependencies
4. Downloads the default Stable Diffusion model

Once ready, open `http://localhost:7860` in your browser.

### Step 4: Download Additional Models

The default model is Stable Diffusion v1.5. You can download better models from Civitai or Hugging Face.

```bash
# Navigate to the models directory
cd stable-diffusion-webui/models/Stable-diffusion

# Download Stable Diffusion XL (SDXL) base model
wget "https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0/resolve/main/sd_xl_base_1.0.safetensors"

# Download the SDXL refiner (optional, for higher quality)
wget "https://huggingface.co/stabilityai/stable-diffusion-xl-refiner-1.0/resolve/main/sd_xl_refiner_1.0.safetensors"
```

::: tip
Civitai.com hosts thousands of community-created models, LoRAs, and embeddings. Download `.safetensors` files and place them in the appropriate `models/` subdirectory.
:::

## Configuration

### Launch Arguments

You can customize the WebUI behavior by editing the launch arguments.

```bash
# Edit the webui-user.sh file to set persistent launch arguments
nano stable-diffusion-webui/webui-user.sh
```

Common launch arguments:

```bash
# Example webui-user.sh configuration
export COMMANDLINE_ARGS="--xformers --enable-insecure-extension-access --listen"
```

| Argument | Description |
|----------|-------------|
| `--listen` | Listen on all network interfaces (access from other devices) |
| `--port 7860` | Set the web server port |
| `--xformers` | Enable xformers for faster, memory-efficient inference |
| `--medvram` | Reduce VRAM usage (for 4-6 GB VRAM GPUs) |
| `--lowvram` | Aggressively reduce VRAM usage (for 2-4 GB VRAM GPUs) |
| `--no-half` | Disable half-precision (fixes issues on some GPUs) |
| `--api` | Enable the REST API alongside the web UI |
| `--enable-insecure-extension-access` | Allow installing extensions from the UI |
| `--autolaunch` | Automatically open the browser on startup |
| `--theme dark` | Use dark theme |

### Low VRAM Options

If you have limited GPU memory, use these optimizations:

```bash
# For 4-6 GB VRAM GPUs
./webui.sh --medvram --xformers

# For 2-4 GB VRAM GPUs
./webui.sh --lowvram --xformers

# For extremely limited VRAM (slow but functional)
./webui.sh --lowvram --no-half --opt-sub-quad-attention
```

### Model Directory Structure

```
stable-diffusion-webui/models/
  Stable-diffusion/     # Main checkpoint models (.safetensors, .ckpt)
  Lora/                 # LoRA fine-tuned models
  VAE/                  # VAE models for improved image quality
  ControlNet/           # ControlNet models for guided generation
  ESRGAN/               # Upscaler models
  hypernetworks/        # Hypernetwork models
  embeddings/           # Textual inversion embeddings
```

## Usage

### Text-to-Image (txt2img)

1. Open `http://localhost:7860` in your browser
2. Select a model from the **Stable Diffusion checkpoint** dropdown
3. Enter a text prompt describing the image you want
4. Optionally add a **Negative prompt** for things to avoid
5. Set the image dimensions, sampling steps, and CFG scale
6. Click **Generate**

Example prompts:

```
Prompt: a serene mountain landscape at sunset, photorealistic, 4k, detailed
Negative prompt: blurry, low quality, watermark, text, deformed
```

### Image-to-Image (img2img)

1. Click the **img2img** tab
2. Upload a source image
3. Enter a prompt describing the desired modifications
4. Adjust the **Denoising strength** (0.3-0.5 for subtle changes, 0.7-0.9 for major changes)
5. Click **Generate**

### Inpainting

1. Click the **img2img** tab, then select **Inpaint**
2. Upload an image and paint over the area you want to change
3. Enter a prompt describing what should replace the painted area
4. Click **Generate**

### ControlNet

ControlNet allows precise control over image generation using reference images (poses, depth maps, edges).

```bash
# Install the ControlNet extension
cd stable-diffusion-webui/extensions
git clone https://github.com/Mikubill/sd-webui-controlnet.git

# Download ControlNet models
cd ../models/ControlNet
wget "https://huggingface.co/lllyasviel/ControlNet-v1-1/resolve/main/control_v11p_sd15_openpose.pth"
```

After restarting the WebUI, a ControlNet section appears in the txt2img and img2img tabs.

### LoRA (Low-Rank Adaptation)

LoRA models are small fine-tuned layers that modify the base model's output style or subject.

```bash
# Place LoRA files in the Lora directory
cp my-lora-model.safetensors stable-diffusion-webui/models/Lora/
```

In the prompt, reference a LoRA with the syntax: `<lora:model-name:weight>`, for example:

```
a portrait photo <lora:my-style:0.8>, detailed, realistic
```

### API Usage

Enable the API with `--api` and interact programmatically.

```bash
# Start with API enabled
./webui.sh --api

# Generate an image via API
curl -X POST http://localhost:7860/sdapi/v1/txt2img \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "a beautiful sunset over the ocean",
    "negative_prompt": "blurry, low quality",
    "steps": 25,
    "width": 512,
    "height": 512,
    "cfg_scale": 7
  }'
```

### Running as a Systemd Service

```bash
# Create a systemd service file
sudo tee /etc/systemd/system/stable-diffusion.service << 'EOF'
[Unit]
Description=Stable Diffusion WebUI
After=network.target

[Service]
Type=simple
User=your-username
WorkingDirectory=/home/your-username/stable-diffusion-webui
ExecStart=/home/your-username/stable-diffusion-webui/webui.sh --listen --xformers --api
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# Enable and start the service
sudo systemctl daemon-reload
sudo systemctl enable stable-diffusion
sudo systemctl start stable-diffusion
```

## Update

```bash
# Navigate to the WebUI directory
cd stable-diffusion-webui

# Pull the latest changes
git pull origin master

# Restart the WebUI (dependencies will be updated automatically)
./webui.sh
```

## Troubleshooting

### "CUDA out of memory" error

```bash
# Use lower VRAM mode
./webui.sh --medvram --xformers

# Reduce image resolution (use 512x512 instead of 1024x1024)
# Reduce batch size to 1
# Close other GPU-intensive applications

# For extreme cases
./webui.sh --lowvram --no-half --opt-sub-quad-attention
```

### WebUI fails to start

```bash
# Check for Python version
python3 --version

# Remove the virtual environment and let it recreate
rm -rf stable-diffusion-webui/venv

# Restart the WebUI
./webui.sh
```

### Black or corrupted images

```bash
# Try disabling half-precision
./webui.sh --no-half

# Or use a specific VAE model
# Download a VAE and place it in models/VAE/

# Check GPU driver compatibility
nvidia-smi
```

### Extensions not loading

```bash
# Make sure extension access is enabled
./webui.sh --enable-insecure-extension-access

# Update all extensions
cd stable-diffusion-webui/extensions
for dir in */; do (cd "$dir" && git pull); done
```

### Slow generation speed

```bash
# Enable xformers for better performance
./webui.sh --xformers

# Make sure you are using the GPU (not CPU)
# Check nvidia-smi while generating -- GPU utilization should be high

# Use smaller image sizes for faster generation
# Use fewer sampling steps (20-25 is usually sufficient)
```

## Related Resources

- [AI Tools Overview](/en/ai/) -- Overview of all AI tools on Debian
- [ComfyUI](/en/ai/comfyui) -- Node-based alternative with more flexibility
- [AUTOMATIC1111 Wiki](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki) -- Official documentation
- [Civitai](https://civitai.com) -- Community models, LoRAs, and resources
- [Hugging Face](https://huggingface.co) -- Model hosting and downloads
