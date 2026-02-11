---
title: LM Studio 安装与使用
description: 在 Debian 上安装和使用 LM Studio 图形化本地大模型管理工具的完整指南，涵盖模型下载、对话和本地 API 服务
---

# LM Studio

LM Studio 是一个图形化的本地大模型管理工具，提供友好的界面来发现、下载和运行各种大语言模型。它基于 llama.cpp 构建，支持 GGUF 格式模型，特别适合不熟悉命令行操作的用户在本地体验和使用 AI 模型。

## 前置要求

- **架构**：64 位系统（x86_64 或 ARM64）
- **内存**：8GB 以上（推荐 16GB+）
- **桌面环境**：GNOME、KDE Plasma 或其他桌面环境
- **GPU**（可选）：NVIDIA GPU 可加速推理

## 安装

```bash
# 下载 AppImage
# 从 https://lmstudio.ai 下载 Linux 版本（.AppImage 文件）

# 添加执行权限
chmod +x LM-Studio-*.AppImage

# 直接运行
./LM-Studio-*.AppImage

# 如果 AppImage 无法运行，安装 FUSE 支持
sudo apt install libfuse2
```

### 固定安装位置

为方便日常使用，建议将 AppImage 移动到固定位置并创建桌面快捷方式：

```bash
# 移动到固定位置
mkdir -p ~/.local/bin
mv LM-Studio-*.AppImage ~/.local/bin/lm-studio.AppImage

# 创建桌面快捷方式
mkdir -p ~/.local/share/applications
cat > ~/.local/share/applications/lm-studio.desktop << 'EOF'
[Desktop Entry]
Name=LM Studio
Exec=$HOME/.local/bin/lm-studio.AppImage
Icon=lm-studio
Type=Application
Categories=Development;Science;
Comment=Local LLM management tool
EOF
```

## 基本使用

### 搜索和下载模型

1. 启动 LM Studio 后，点击左侧的搜索图标
2. 在搜索栏输入模型名称（如 `llama`、`qwen`、`deepseek`）
3. 浏览搜索结果，选择合适的量化版本下载
4. 下载完成后，模型会出现在本地模型列表中

::: tip 提示
模型的量化等级影响质量和资源占用的平衡。`Q4_K_M` 是常用的平衡选项，`Q5_K_M` 质量更高但占用更多资源，`Q2_K` 或 `Q3_K_S` 则更轻量。
:::

### 对话界面

1. 点击左侧的对话图标进入聊天界面
2. 从顶部下拉菜单选择已下载的模型
3. 等待模型加载完成后即可开始对话
4. 支持调整温度、上下文长度等推理参数

### 本地 API 服务

LM Studio 可启动与 OpenAI 兼容的本地 API 服务器：

1. 点击左侧的服务器图标
2. 选择要提供服务的模型
3. 点击「Start Server」启动，默认监听 `http://localhost:1234`

```bash
# 测试 API 服务
curl http://localhost:1234/v1/chat/completions -d '{
  "model": "loaded-model-name",
  "messages": [
    {"role": "user", "content": "你好"}
  ]
}'

# 列出可用模型
curl http://localhost:1234/v1/models
```

## CLI 模式

LM Studio 提供 `lms` 命令行工具用于服务管理：

```bash
# 查看 CLI 帮助
lms --help

# 启动服务器
lms server start

# 停止服务器
lms server stop

# 查看服务器状态
lms server status

# 列出已下载的模型
lms ls

# 加载模型
lms load model-name
```

::: tip 提示
`lms` 命令在 LM Studio 首次运行后才会安装到系统中。如果命令未找到，请先启动一次 LM Studio 图形界面。
:::

## 更新

```bash
# 从官方网站下载新版本替换旧文件
# https://lmstudio.ai

# 替换 AppImage
mv LM-Studio-new-version.AppImage ~/.local/bin/lm-studio.AppImage
chmod +x ~/.local/bin/lm-studio.AppImage
```

## 常见问题

### AppImage 提示无法运行

```bash
# 安装 FUSE 支持
sudo apt install libfuse2

# 如果仍然无法运行，尝试解压后运行
./LM-Studio-*.AppImage --appimage-extract
./squashfs-root/AppRun
```

### 模型加载时内存不足

```bash
# 查看系统内存
free -h

# 选择更小的量化版本
# 例如选择 Q3_K_S 或 Q2_K 量化的模型而非 Q5_K_M

# 在 LM Studio 设置中调整：
# - 降低上下文长度（Context Length）
# - 启用 GPU Offloading（如果有 NVIDIA GPU）
```

### GPU 加速未生效

```bash
# 确认 NVIDIA 驱动已安装
nvidia-smi

# 如果未安装驱动
sudo apt install nvidia-driver
sudo reboot

# 在 LM Studio 中确认 GPU Offloading 已开启
# 设置 -> GPU Offloading -> 设置合适的层数
```

### 无法下载模型

```bash
# 检查网络连接
curl -I https://huggingface.co

# 如果需要代理，可在终端中设置代理后启动 LM Studio
export HTTPS_PROXY=http://your-proxy:port
~/.local/bin/lm-studio.AppImage
```

## 相关链接

- [LM Studio 官方网站](https://lmstudio.ai/)
- [LM Studio 官方文档](https://lmstudio.ai/docs)
- [AI 工具总览](/ai/) - 返回 AI 工具概览页

---

**LM Studio 配置好了吗？** [了解底层推理引擎 llama.cpp ->](/ai/llama-cpp)
