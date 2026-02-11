---
title: Ollama 安装与使用
description: 在 Debian 上安装和使用 Ollama 本地大语言模型运行工具的完整指南，涵盖 GPU 加速、模型管理和 API 服务
---

# Ollama

Ollama 是目前最流行的本地大语言模型运行工具，提供简洁的命令行界面和丰富的模型仓库，支持 NVIDIA GPU 和 CPU 推理加速。作为本地 AI 生态的基础设施，Ollama 可为 Aider、Continue、Zed、Open WebUI 等众多工具提供本地模型后端。

## 前置要求

- **内存**：8GB 以上（推荐 16GB+，运行大模型需要更多内存）
- **存储**：模型文件通常在 4GB - 30GB 之间，确保有足够的磁盘空间
- **GPU**（可选）：NVIDIA GPU 可显著加速推理速度，需安装 NVIDIA 驱动和 CUDA

## 安装

```bash
# 方法 1：官方安装脚本（推荐）
curl -fsSL https://ollama.com/install.sh | sh

# 方法 2：手动安装
# 从 https://ollama.com/download/linux 下载二进制文件
sudo cp ollama /usr/local/bin/
sudo chmod +x /usr/local/bin/ollama

# 验证安装
ollama --version
```

::: tip 提示
官方安装脚本会自动检测系统架构和 GPU 类型，配置 systemd 服务并设置开机自启。推荐大多数用户使用此方式。
:::

## 模型管理

### 下载与运行模型

```bash
# 下载模型
ollama pull llama3.2

# 运行模型（下载完成后直接进入对话）
ollama run llama3.2

# 下载指定参数量的模型
ollama pull qwen2.5:7b
ollama pull deepseek-r1:14b

# 运行模型并发送单条消息
ollama run llama3.2 "用简单的语言解释量子计算"
```

### 常用模型推荐

| 模型 | 参数量 | 内存需求 | 适用场景 |
|------|--------|----------|----------|
| `llama3.2` | 3B / 8B | 4GB / 8GB | 通用对话、代码生成 |
| `qwen2.5` | 7B / 14B | 6GB / 12GB | 中文对话、文本处理 |
| `deepseek-r1` | 7B / 14B | 6GB / 12GB | 推理、数学、代码 |
| `codellama` | 7B / 13B | 6GB / 10GB | 代码生成与补全 |
| `mistral` | 7B | 6GB | 通用对话、指令跟随 |
| `gemma2` | 9B / 27B | 8GB / 20GB | 通用文本生成 |
| `phi3` | 3.8B / 14B | 4GB / 12GB | 轻量推理、代码 |

### 模型管理命令

```bash
# 列出已下载的模型
ollama list

# 查看模型详细信息
ollama show llama3.2

# 删除模型（释放磁盘空间）
ollama rm llama3.2

# 复制模型（创建别名）
ollama cp llama3.2 my-llama
```

## GPU 加速配置

### NVIDIA GPU

```bash
# 检查 NVIDIA 驱动是否已安装
nvidia-smi

# 如果未安装驱动，先安装 NVIDIA 驱动
sudo apt install nvidia-driver

# 重启后验证
sudo reboot
nvidia-smi

# Ollama 会自动检测 NVIDIA GPU 并启用 CUDA 加速
# 运行模型时通过 nvidia-smi 可以看到 GPU 显存占用
ollama run llama3.2
```

::: warning 注意
NVIDIA 驱动安装后需要重启系统。如果 Ollama 未检测到 GPU，请确认 `nvidia-smi` 命令能正常输出 GPU 信息。
:::

### 指定 GPU 设备

```bash
# 如果系统中有多块 GPU，可通过环境变量指定
CUDA_VISIBLE_DEVICES=0 ollama serve

# 限制 GPU 显存使用
OLLAMA_MAX_VRAM=8192 ollama serve
```

## API 服务

### 启动服务

```bash
# Ollama 安装后默认以 systemd 服务方式运行
# 服务默认监听 http://localhost:11434

# 查看服务状态
sudo systemctl status ollama

# 手动启动/停止/重启服务
sudo systemctl start ollama
sudo systemctl stop ollama
sudo systemctl restart ollama

# 设置开机自启
sudo systemctl enable ollama
```

### API 调用示例

Ollama 提供与 OpenAI 兼容的 API 接口：

```bash
# 生成对话（Chat 接口）
curl http://localhost:11434/api/chat -d '{
  "model": "llama3.2",
  "messages": [
    {"role": "user", "content": "你好，请介绍一下 Debian 系统"}
  ]
}'

# 生成文本（Generate 接口）
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.2",
  "prompt": "用 Python 写一个快速排序算法"
}'

# OpenAI 兼容接口
curl http://localhost:11434/v1/chat/completions -d '{
  "model": "llama3.2",
  "messages": [
    {"role": "user", "content": "Hello!"}
  ]
}'

# 列出可用模型
curl http://localhost:11434/api/tags
```

### 远程访问配置

默认情况下 Ollama 仅监听 localhost，如需从其他设备访问：

```bash
# 编辑 systemd 服务配置
sudo systemctl edit ollama

# 添加以下内容
[Service]
Environment="OLLAMA_HOST=0.0.0.0"

# 重启服务
sudo systemctl restart ollama
```

::: warning 注意
开放远程访问时请确保通过防火墙限制访问来源，避免模型服务暴露在公网上。
:::

## Systemd 服务管理

```bash
# 查看服务日志
sudo journalctl -u ollama -f

# 自定义模型存储路径
sudo systemctl edit ollama
# 添加：
# [Service]
# Environment="OLLAMA_MODELS=/path/to/models"

# 重新加载配置并重启
sudo systemctl daemon-reload
sudo systemctl restart ollama
```

## 与其他工具集成

Ollama 作为本地模型后端，可与众多 AI 工具集成：

| 工具 | 集成方式 | 说明 |
|------|----------|------|
| [Zed](/ai/zed) | 设置中配置 Ollama URL | AI 编辑器中使用本地模型 |
| Open WebUI | 配置 Ollama API 地址 | 提供 Web 聊天界面 |
| [LM Studio](/ai/lm-studio) | 兼容 OpenAI API | 可互为补充 |
| Aider | `--model ollama/model-name` | 终端 AI 编程助手 |
| Continue | 设置中添加 Ollama 提供商 | VS Code AI 插件 |

## 更新

```bash
# 使用官方安装脚本更新（与安装命令相同）
curl -fsSL https://ollama.com/install.sh | sh

# 更新后验证版本
ollama --version
```

## 常见问题

### 模型下载速度慢

```bash
# 可设置代理加速下载
export HTTPS_PROXY=http://your-proxy:port
ollama pull llama3.2

# 或在 systemd 服务中配置代理
sudo systemctl edit ollama
# 添加：
# [Service]
# Environment="HTTPS_PROXY=http://your-proxy:port"
```

### 运行模型时内存不足

```bash
# 查看系统内存使用情况
free -h

# 选择参数量更小的模型
ollama run phi3:3.8b    # 约需 4GB 内存
ollama run llama3.2:3b  # 约需 4GB 内存

# 如果有 swap 空间可适当增加（会降低推理速度）
sudo fallocate -l 8G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

### Ollama 服务无法启动

```bash
# 检查端口是否被占用
ss -tlnp | grep 11434

# 查看详细错误日志
sudo journalctl -u ollama --no-pager -n 50

# 检查是否有权限问题
ls -la /usr/local/bin/ollama
```

## 相关链接

- [Ollama 官方网站](https://ollama.com/)
- [Ollama GitHub 仓库](https://github.com/ollama/ollama)
- [Ollama 模型库](https://ollama.com/library)
- [AI 工具总览](/ai/) - 返回 AI 工具概览页

---

**Ollama 配置好了吗？** [了解图形化模型管理工具 LM Studio ->](/ai/lm-studio)
