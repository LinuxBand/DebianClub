---
title: LocalAI 安装与使用
description: 在 Debian 上安装和使用 LocalAI 本地 OpenAI API 替代方案的完整指南，涵盖 Docker 部署、多模态功能和 API 使用
---

# LocalAI

LocalAI 是一个免费开源的 OpenAI API 替代品，用于在本地运行 AI 推理服务。它不仅支持文本生成，还支持图像生成、语音合成（TTS）和语音识别（STT），提供完整的多模态 AI 能力。LocalAI 可在消费级硬件上运行，无需 GPU 即可使用，是构建本地 AI 应用的理想后端。

## 前置要求

- **Docker**（推荐）：安装方法参见 [Docker 指南](/server/docker)
- **内存**：8GB 以上（推荐 16GB+，取决于模型大小）
- **存储**：至少 20GB 可用空间（用于模型存储）
- **GPU**（可选）：NVIDIA GPU 可显著加速推理

## 安装

### 方法 1：Docker 运行（推荐）

```bash
# 基本运行（CPU 模式）
docker run -d --name localai \
  -p 8080:8080 \
  -v localai-models:/models \
  localai/localai:latest

# 验证服务已启动
curl http://localhost:8080/readyz
```

### 方法 2：Docker Compose

```bash
# 创建工作目录
mkdir -p ~/localai && cd ~/localai

# 下载 Docker Compose 配置文件
wget https://raw.githubusercontent.com/mudler/LocalAI/master/docker-compose.yaml

# 启动服务
docker compose up -d

# 查看日志
docker compose logs -f
```

### 方法 3：带 GPU 支持（NVIDIA CUDA）

```bash
# 确认 NVIDIA Container Toolkit 已安装
# 参见：https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html
sudo apt install nvidia-container-toolkit
sudo systemctl restart docker

# 运行带 GPU 支持的 LocalAI
docker run -d --name localai \
  --gpus all \
  -p 8080:8080 \
  -v localai-models:/models \
  localai/localai:latest-gpu-nvidia-cuda-12

# 验证 GPU 是否被识别
curl http://localhost:8080/system
```

::: tip 提示
Docker 方式是最简单的安装方式，推荐所有用户使用。GPU 版本需要先安装 NVIDIA Container Toolkit。
:::

## 模型管理

### 从模型库安装

LocalAI 提供内置的模型库，可直接下载常用模型：

```bash
# 访问 LocalAI 模型库
# 浏览器打开 http://localhost:8080 即可看到模型库界面

# 通过 API 安装模型
curl http://localhost:8080/models/apply -d '{
  "id": "huggingface@thebloke__llama-2-7b-chat-gguf__llama-2-7b-chat.Q4_K_M.gguf"
}'

# 列出已安装的模型
curl http://localhost:8080/v1/models
```

### 手动添加模型

```bash
# 将 GGUF 模型文件复制到模型目录
docker cp your-model.gguf localai:/models/

# 或挂载本地目录
docker run -d --name localai \
  -p 8080:8080 \
  -v /path/to/your/models:/models \
  localai/localai:latest
```

## API 使用

LocalAI 提供与 OpenAI 完全兼容的 API 接口，可作为 OpenAI API 的直接替代。

### 文本生成（Chat Completions）

```bash
# 对话生成
curl http://localhost:8080/v1/chat/completions -d '{
  "model": "llama-2-7b-chat",
  "messages": [
    {"role": "system", "content": "你是一个有帮助的 AI 助手。"},
    {"role": "user", "content": "请介绍一下 Debian 操作系统"}
  ],
  "temperature": 0.7
}'

# 流式输出
curl http://localhost:8080/v1/chat/completions -d '{
  "model": "llama-2-7b-chat",
  "messages": [
    {"role": "user", "content": "你好"}
  ],
  "stream": true
}'
```

### 文本嵌入（Embeddings）

```bash
# 生成文本嵌入向量
curl http://localhost:8080/v1/embeddings -d '{
  "model": "text-embedding-ada-002",
  "input": "Debian 是一个自由的操作系统"
}'
```

### 图像生成

```bash
# 安装图像生成模型后，调用 API 生成图像
curl http://localhost:8080/v1/images/generations -d '{
  "prompt": "a beautiful landscape of mountains",
  "size": "512x512"
}'
```

### 语音合成（TTS）

```bash
# 文字转语音
curl http://localhost:8080/v1/audio/speech -d '{
  "model": "tts-1",
  "input": "你好，欢迎使用 LocalAI",
  "voice": "alloy"
}' --output speech.mp3
```

### 语音识别（STT）

```bash
# 语音转文字
curl http://localhost:8080/v1/audio/transcriptions \
  -F file=@audio.wav \
  -F model=whisper-1
```

## 与其他工具集成

由于 LocalAI 完全兼容 OpenAI API，任何支持自定义 OpenAI API 端点的工具都可以使用 LocalAI 作为后端：

```bash
# 在支持 OpenAI API 的工具中，将 API 地址设置为：
# http://localhost:8080/v1

# 示例：使用 Python OpenAI 库
# pip install openai
```

```python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:8080/v1",
    api_key="not-needed"  # LocalAI 不需要 API Key
)

response = client.chat.completions.create(
    model="llama-2-7b-chat",
    messages=[
        {"role": "user", "content": "你好"}
    ]
)
print(response.choices[0].message.content)
```

## 管理与监控

```bash
# 查看容器状态
docker ps | grep localai

# 查看日志
docker logs -f localai

# 重启服务
docker restart localai

# 停止服务
docker stop localai

# 删除容器（模型数据保留在 volume 中）
docker rm localai

# 更新到最新版本
docker pull localai/localai:latest
docker stop localai && docker rm localai
docker run -d --name localai \
  -p 8080:8080 \
  -v localai-models:/models \
  localai/localai:latest
```

## 更新

```bash
# Docker 方式更新
docker pull localai/localai:latest
docker stop localai && docker rm localai

# 使用相同的参数重新创建容器
docker run -d --name localai \
  -p 8080:8080 \
  -v localai-models:/models \
  localai/localai:latest

# Docker Compose 方式更新
cd ~/localai
docker compose pull
docker compose up -d
```

## 常见问题

### 容器启动后 API 无响应

```bash
# 查看容器日志确认是否仍在初始化
docker logs -f localai

# 检查端口是否正确映射
docker port localai

# 确认服务已就绪
curl http://localhost:8080/readyz
```

### 模型加载失败

```bash
# 查看日志中的错误信息
docker logs localai | tail -50

# 确认模型文件格式正确（需要 GGUF 格式）
# 确认模型文件权限正确
docker exec localai ls -la /models/
```

### GPU 未被检测到

```bash
# 确认 NVIDIA Container Toolkit 已安装
nvidia-container-cli info

# 确认 Docker 能访问 GPU
docker run --rm --gpus all nvidia/cuda:12.0-base nvidia-smi

# 使用正确的 GPU 镜像标签
docker run -d --name localai \
  --gpus all \
  -p 8080:8080 \
  -v localai-models:/models \
  localai/localai:latest-gpu-nvidia-cuda-12
```

### 内存不足导致容器被 OOM 终止

```bash
# 查看容器是否被 OOM 终止
docker inspect localai | grep -i oom

# 限制容器内存使用
docker run -d --name localai \
  -p 8080:8080 \
  -v localai-models:/models \
  --memory=8g \
  localai/localai:latest

# 使用更小的模型以减少内存占用
```

## 相关链接

- [LocalAI 官方网站](https://localai.io/)
- [LocalAI GitHub 仓库](https://github.com/mudler/LocalAI)
- [LocalAI 模型库](https://models.localai.io/)
- [LocalAI 官方文档](https://localai.io/docs/)
- [AI 工具总览](/ai/) - 返回 AI 工具概览页

---

**LocalAI 配置好了吗？** [返回 AI 工具总览 ->](/ai/)
