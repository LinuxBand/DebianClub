---
title: ComfyUI 安装与使用
description: 在 Debian 上安装和使用 ComfyUI 基于节点的 AI 图像生成界面的完整指南
---

# ComfyUI

ComfyUI 是一个强大的基于节点的 AI 图像生成 UI，通过可视化的工作流方式使用 Stable Diffusion 等模型。相比 AUTOMATIC1111 WebUI，ComfyUI 更加灵活，生成速度更快，内存占用更低，并且能够第一时间支持最新的模型架构（如 SDXL、SD3、Flux 等）。其节点式设计让用户可以自由组合和定制图像生成流程。

## 前置要求

- **Python 3.10+**：ComfyUI 依赖 Python 运行环境
- **NVIDIA GPU**：推荐，也支持 AMD GPU（ROCm）和 CPU 模式
- **Git**：用于克隆仓库
- **磁盘空间**：至少 10GB（不含模型文件）

::: tip 提示
ComfyUI 的显存管理效率非常高，即使 4GB 显存的 GPU 也可以运行大部分模型。
:::

## 安装

### 方法 1：使用 comfy CLI（推荐）

comfy-cli 是官方推荐的安装和管理工具，可以简化安装和更新流程。

```bash
# 安装系统依赖
sudo apt install python3 python3-venv python3-pip git

# 安装 comfy-cli
pip install comfy-cli

# 使用 comfy-cli 安装 ComfyUI
comfy install

# 启动 ComfyUI
comfy launch

# 允许局域网访问
comfy launch -- --listen
```

### 方法 2：手动安装

```bash
# 安装系统依赖
sudo apt install python3 python3-venv python3-pip git

# 克隆仓库
git clone https://github.com/comfyanonymous/ComfyUI.git
cd ComfyUI

# 创建并激活 Python 虚拟环境
python3 -m venv venv
source venv/bin/activate

# 安装 PyTorch（NVIDIA GPU + CUDA 12.1 版本）
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121

# 安装 ComfyUI 依赖
pip install -r requirements.txt

# 运行
python main.py

# 允许局域网访问
python main.py --listen
```

::: warning 注意
如果使用 AMD GPU，请将 PyTorch 安装命令替换为 ROCm 版本：
```bash
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/rocm6.0
```
:::

启动成功后，在浏览器中访问 `http://localhost:8188` 即可打开节点编辑器界面。

## 模型管理

ComfyUI 的模型文件按类型存放在 `models/` 目录下的不同子目录中。

| 模型类型 | 存放路径 |
|----------|----------|
| Checkpoint 主模型 | `models/checkpoints/` |
| LoRA 微调模型 | `models/loras/` |
| VAE 模型 | `models/vae/` |
| ControlNet 模型 | `models/controlnet/` |
| CLIP 模型 | `models/clip/` |
| Upscale 放大模型 | `models/upscale_models/` |

```bash
# 示例：下载模型到对应目录
cd ComfyUI

# 下载 SDXL 基础模型
wget -P models/checkpoints/ \
  https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0/resolve/main/sd_xl_base_1.0.safetensors
```

::: tip 共享模型
如果您同时安装了 AUTOMATIC1111 WebUI，可以通过修改 `extra_model_paths.yaml` 文件共享模型目录，避免重复下载。

```bash
# 复制示例配置文件
cp extra_model_paths.yaml.example extra_model_paths.yaml

# 编辑配置，将路径指向 WebUI 的模型目录
nano extra_model_paths.yaml
```
:::

## 工作流基础

ComfyUI 的核心概念是**节点式工作流**。每个节点负责一项特定功能，通过连接节点来构建完整的图像生成流程。

### 核心节点类型

| 节点 | 功能 |
|------|------|
| Load Checkpoint | 加载 Stable Diffusion 模型 |
| CLIP Text Encode | 编码文本提示词 |
| KSampler | 采样器，控制生成过程 |
| VAE Decode | 将潜在空间解码为图像 |
| Save Image | 保存生成的图像 |
| Load Image | 加载输入图像 |
| ControlNet Apply | 应用 ControlNet 控制 |

### 基本操作

- **添加节点**：在空白区域右键单击，从菜单中选择节点
- **连接节点**：从一个节点的输出端口拖拽到另一个节点的输入端口
- **删除节点**：选中节点后按 Delete 键
- **运行工作流**：点击界面上方的 "Queue Prompt" 按钮

### 导入导出工作流

ComfyUI 的工作流以 JSON 格式保存，方便分享和复用。

- **保存工作流**：菜单 → Save（保存为 `.json` 文件）
- **加载工作流**：菜单 → Load，或将 `.json` 文件拖入浏览器窗口
- **从图像加载**：ComfyUI 生成的图像中嵌入了工作流信息，直接拖入即可还原

## ComfyUI Manager

ComfyUI Manager 是一个功能强大的扩展管理器，可以方便地安装、更新和管理自定义节点。

```bash
# 安装 ComfyUI Manager
cd ComfyUI/custom_nodes
git clone https://github.com/ltdrdata/ComfyUI-Manager.git

# 重启 ComfyUI 后在界面中会出现 Manager 按钮
```

ComfyUI Manager 提供以下功能：

- 搜索和安装社区自定义节点
- 一键更新所有已安装的节点
- 检测工作流中缺失的节点并提供安装
- 管理模型下载

## 配置优化

### 常用启动参数

| 参数 | 说明 |
|------|------|
| `--listen` | 允许局域网访问 |
| `--port 8188` | 指定监听端口 |
| `--lowvram` | 低显存优化模式 |
| `--cpu` | 仅使用 CPU 运行 |
| `--preview-method auto` | 生成过程中显示预览图 |
| `--use-pytorch-cross-attention` | 使用 PyTorch 原生注意力机制 |

### 设置为系统服务

```bash
# 创建服务文件
sudo tee /etc/systemd/system/comfyui.service << 'EOF'
[Unit]
Description=ComfyUI
After=network.target

[Service]
Type=simple
User=你的用户名
WorkingDirectory=/home/你的用户名/ComfyUI
ExecStart=/home/你的用户名/ComfyUI/venv/bin/python main.py --listen
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# 启用并启动服务
sudo systemctl daemon-reload
sudo systemctl enable comfyui
sudo systemctl start comfyui

# 查看运行状态
sudo systemctl status comfyui
```

## 更新

```bash
# 方法 1：使用 comfy-cli 更新
comfy update

# 方法 2：手动更新
cd ComfyUI
git pull

# 更新依赖
source venv/bin/activate
pip install -r requirements.txt
```

## 常见问题

### 节点连接报错或类型不匹配

ComfyUI 的节点端口有严格的类型匹配要求。确保连接的输出和输入类型一致（例如 MODEL 只能连接到 MODEL 类型的输入端口）。不同颜色的端口代表不同的数据类型。

### 缺失自定义节点

当加载的工作流使用了未安装的自定义节点时，会出现红色标记的节点。

```bash
# 使用 ComfyUI Manager 可以自动检测并安装缺失的节点
# 或者手动安装到 custom_nodes 目录
cd ComfyUI/custom_nodes
git clone <节点仓库地址>

# 安装节点依赖
cd <节点目录>
pip install -r requirements.txt
```

### 显存不足

- 使用 `--lowvram` 启动参数
- 降低生成分辨率
- 分步生成：先低分辨率生成，再使用放大节点提升分辨率
- 关闭预览功能以节省显存

### 生成结果全黑或全白

- 检查 VAE 模型是否正确加载
- 尝试使用不同的 VAE 模型
- 确认 KSampler 的参数设置合理（CFG Scale 不宜过高）

## 相关链接

- [ComfyUI GitHub 仓库](https://github.com/comfyanonymous/ComfyUI)
- [ComfyUI Manager](https://github.com/ltdrdata/ComfyUI-Manager)
- [ComfyUI 示例工作流](https://comfyanonymous.github.io/ComfyUI_examples/)
- [AI 工具总览](/ai/) - 返回 AI 工具概览页

---

**想用 AI 进行语音转文字？** [了解 Whisper →](/ai/whisper)
