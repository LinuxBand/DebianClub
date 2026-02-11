---
title: Stable Diffusion WebUI 安装与使用
description: 在 Debian 上安装和使用 AUTOMATIC1111 Stable Diffusion WebUI 进行 AI 图像生成的完整指南
---

# Stable Diffusion WebUI

Stable Diffusion WebUI（AUTOMATIC1111）是目前最流行的 AI 图像生成 Web 界面，提供丰富的功能和直观的操作界面。它支持文生图（txt2img）、图生图（img2img）、局部重绘（Inpainting）等多种生成模式，并拥有活跃的社区和大量扩展插件，是在本地运行 Stable Diffusion 模型的首选工具。

## 前置要求

- **Python 3.10+**：Stable Diffusion WebUI 依赖 Python 运行环境
- **NVIDIA GPU**：建议 4GB 以上显存（8GB 以上效果最佳）；也支持 CPU 模式，但速度较慢
- **磁盘空间**：至少 20GB 可用空间（模型文件通常较大）
- **Git**：用于克隆仓库和更新

::: tip 提示
虽然 Stable Diffusion WebUI 也支持 AMD GPU（通过 ROCm），但 NVIDIA GPU + CUDA 是兼容性最好、性能最优的方案。
:::

## 安装

### 安装系统依赖

```bash
# 安装基础依赖包
sudo apt install python3 python3-venv python3-pip git wget libgl1 libglib2.0-0
```

### 安装 NVIDIA 驱动和 CUDA

如果使用 NVIDIA GPU 进行加速，需要先安装驱动和 CUDA 工具包。

```bash
# 安装 NVIDIA 驱动和 CUDA 工具包
sudo apt install nvidia-driver nvidia-cuda-toolkit

# 重启系统以加载驱动
sudo reboot

# 重启后验证驱动是否正常
nvidia-smi
```

::: warning 注意
安装 NVIDIA 驱动后必须重启系统。如果 `nvidia-smi` 命令能正常输出 GPU 信息，说明驱动安装成功。
:::

### 克隆并运行

```bash
# 克隆仓库
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git
cd stable-diffusion-webui

# 运行（首次运行会自动下载依赖和基础模型，耗时较长）
./webui.sh

# 使用 --listen 参数允许局域网访问
./webui.sh --listen

# 低显存模式（4-8GB 显存推荐）
./webui.sh --medvram

# 极低显存模式（4GB 以下显存）
./webui.sh --lowvram
```

启动成功后，在浏览器中访问 `http://localhost:7860` 即可打开 Web 界面。

## 模型管理

Stable Diffusion 的生成效果取决于所使用的模型。您可以从以下平台下载社区分享的模型。

### 模型下载

常用模型下载平台：

| 平台 | 说明 |
|------|------|
| [Civitai](https://civitai.com) | 最大的 SD 模型社区，包含模型、LoRA、嵌入等 |
| [Hugging Face](https://huggingface.co) | 开源 AI 模型托管平台，提供官方和社区模型 |

### 模型存放目录

下载的模型文件需要放置到对应的目录中：

| 模型类型 | 存放路径 |
|----------|----------|
| Checkpoint 主模型 | `models/Stable-diffusion/` |
| LoRA 微调模型 | `models/Lora/` |
| VAE 模型 | `models/VAE/` |
| ControlNet 模型 | `models/ControlNet/` |
| Embedding 嵌入 | `embeddings/` |

```bash
# 示例：下载模型到对应目录
cd stable-diffusion-webui

# 下载 Stable Diffusion v1.5 基础模型
wget -P models/Stable-diffusion/ \
  https://huggingface.co/stable-diffusion-v1-5/stable-diffusion-v1-5/resolve/main/v1-5-pruned-emaonly.safetensors
```

## 主要功能

### 文生图（txt2img）

通过文本提示词（Prompt）生成图像，是最基本的使用方式。

- **正向提示词**：描述您希望生成的内容
- **反向提示词**：描述您希望避免的内容
- **采样步数**：通常 20-30 步即可获得良好效果
- **CFG Scale**：控制提示词对生成结果的影响程度，一般设为 7-12

### 图生图（img2img）

以现有图片为基础，结合提示词生成新图像，可用于风格转换、细节增强等场景。

### 局部重绘（Inpainting）

选择图像中的特定区域进行重新生成，可以精确修改图片的局部内容。

### ControlNet

通过额外的控制条件（如线稿、姿势、深度图）精确控制生成结果的构图和姿态。

### LoRA

轻量级微调模型，可以在不替换主模型的情况下调整生成风格或添加特定角色、概念。

### 扩展（Extensions）

WebUI 支持丰富的社区扩展，可在 Extensions 选项卡中搜索并安装。

## 配置优化

### 命令行参数

常用的启动参数可以在 `webui-user.sh` 中配置，避免每次手动输入。

```bash
# 编辑启动配置文件
nano webui-user.sh
```

常用参数说明：

| 参数 | 说明 |
|------|------|
| `--listen` | 允许局域网访问 |
| `--port 7860` | 指定监听端口 |
| `--medvram` | 中等显存优化（4-8GB 显存推荐） |
| `--lowvram` | 极低显存优化（4GB 以下显存） |
| `--xformers` | 启用 xformers 加速（推荐，可显著提升速度） |
| `--no-half-vae` | 修复 VAE 生成黑图的问题 |
| `--api` | 启用 API 接口 |

### 设置为系统服务

如果需要开机自动启动，可以创建 systemd 服务。

```bash
# 创建服务文件
sudo tee /etc/systemd/system/sd-webui.service << 'EOF'
[Unit]
Description=Stable Diffusion WebUI
After=network.target

[Service]
Type=simple
User=你的用户名
WorkingDirectory=/home/你的用户名/stable-diffusion-webui
ExecStart=/home/你的用户名/stable-diffusion-webui/webui.sh --listen
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# 启用并启动服务
sudo systemctl daemon-reload
sudo systemctl enable sd-webui
sudo systemctl start sd-webui

# 查看运行状态
sudo systemctl status sd-webui
```

## 更新

```bash
# 进入项目目录
cd stable-diffusion-webui

# 拉取最新代码
git pull

# 重新启动（会自动更新依赖）
./webui.sh
```

## 常见问题

### CUDA 相关错误

```bash
# 确认 NVIDIA 驱动和 CUDA 正常工作
nvidia-smi

# 检查 PyTorch 是否识别到 GPU
python3 -c "import torch; print(torch.cuda.is_available())"

# 如果 CUDA 不可用，尝试重新安装对应版本的 PyTorch
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu121
```

### 显存不足（Out of Memory）

如果在生成过程中遇到 CUDA Out of Memory 错误：

- 降低生成图像的分辨率（如 512x512）
- 使用 `--medvram` 或 `--lowvram` 启动参数
- 启用 `--xformers` 加速
- 减少批量生成数量（Batch Size 设为 1）
- 关闭其他占用显存的应用程序

### 生成速度慢

- 确认正在使用 GPU 而非 CPU（检查终端输出中是否显示 CUDA 设备）
- 安装 xformers：使用 `--xformers` 启动参数
- 适当降低采样步数（20 步通常足够）
- 使用更小的分辨率进行预览，满意后再提升分辨率

### 启动时报错 Python 版本不兼容

```bash
# 确认 Python 版本为 3.10 或更高
python3 --version

# 如果版本过低，可以从 Debian backports 或 deadsnakes PPA 安装
# 或使用 pyenv 管理多个 Python 版本
```

## 相关链接

- [AUTOMATIC1111 GitHub 仓库](https://github.com/AUTOMATIC1111/stable-diffusion-webui)
- [Stable Diffusion WebUI Wiki](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki)
- [Civitai 模型社区](https://civitai.com)
- [AI 工具总览](/ai/) - 返回 AI 工具概览页

---

**想尝试节点式工作流？** [了解 ComfyUI →](/ai/comfyui)
