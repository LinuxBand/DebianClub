---
title: llamafile 安装与使用
description: 在 Debian 上使用 llamafile 零安装运行大语言模型的完整指南，涵盖下载运行、Web UI 和 CLI 模式
---

# llamafile

llamafile 是 Mozilla 推出的创新项目，将 llama.cpp 与 Cosmopolitan Libc 结合，创建单个可移植的可执行文件。无需安装任何依赖，无需配置运行环境，下载后添加执行权限即可直接运行大语言模型。它是体验本地 AI 最简单的方式。

## 前置要求

- **操作系统**：Linux 2.6.18 或更高版本（几乎所有现代 Linux 系统均满足）
- **内存**：取决于模型大小，通常 8GB 以上
- **存储**：单个 llamafile 文件大小因模型而异（通常 4GB - 10GB）

::: tip 提示
llamafile 的核心优势是零依赖。不需要安装 Python、Docker、CUDA 或任何其他软件，下载即可运行。
:::

## 安装与运行

### 下载 llamafile

```bash
# 下载 llamafile（以 Llama 3.1 8B 为例）
wget https://huggingface.co/Mozilla/Meta-Llama-3.1-8B-Instruct-llamafile/resolve/main/Meta-Llama-3.1-8B-Instruct.Q5_K_M.llamafile

# 添加执行权限
chmod +x Meta-Llama-3.1-8B-Instruct.Q5_K_M.llamafile

# 直接运行（自动启动 Web UI，默认端口 8080）
./Meta-Llama-3.1-8B-Instruct.Q5_K_M.llamafile
```

运行后，在浏览器中打开 `http://localhost:8080` 即可使用内置的 Web 聊天界面。

### CLI 模式

```bash
# 以 CLI 模式运行（不启动 Web UI）
./Meta-Llama-3.1-8B-Instruct.Q5_K_M.llamafile \
  -p "请用简洁的语言介绍 Debian 操作系统" \
  --no-display-prompt \
  -n 256

# 交互式对话模式
./Meta-Llama-3.1-8B-Instruct.Q5_K_M.llamafile \
  --interactive \
  --color
```

### 仅使用 llamafile 运行器

如果希望将运行器和模型分离，可以单独下载 llamafile 运行器，然后搭配任意 GGUF 模型使用：

```bash
# 下载 llamafile 运行器
wget https://github.com/Mozilla-Ocho/llamafile/releases/latest/download/llamafile
chmod +x llamafile

# 搭配本地 GGUF 模型运行
./llamafile -m /path/to/your-model.gguf
```

## 可用的 llamafile 模型

Mozilla 在 Hugging Face 上提供了多个预打包的 llamafile：

| 模型 | 大小 | 说明 |
|------|------|------|
| Meta-Llama-3.1-8B-Instruct | 约 5.7GB | 通用对话，性能均衡 |
| Mistral-7B-Instruct | 约 4.1GB | 轻量通用模型 |
| Phi-3-mini-4k-instruct | 约 2.4GB | 微软轻量模型 |
| TinyLlama-1.1B | 约 0.7GB | 极轻量，适合测试 |

::: tip 提示
更多预打包的 llamafile 可在 [Hugging Face 上搜索](https://huggingface.co/models?library=llamafile)。也可以使用 llamafile 运行器加载任何 GGUF 格式的模型。
:::

## 高级用法

### API 服务模式

llamafile 运行时默认提供 OpenAI 兼容的 API：

```bash
# 启动服务（默认端口 8080）
./Meta-Llama-3.1-8B-Instruct.Q5_K_M.llamafile \
  --server \
  --host 0.0.0.0 \
  --port 8080

# 调用 API
curl http://localhost:8080/v1/chat/completions -d '{
  "model": "llama3",
  "messages": [
    {"role": "user", "content": "你好"}
  ]
}'
```

### GPU 加速

llamafile 支持自动检测并使用 GPU 加速：

```bash
# 如果系统有 NVIDIA GPU 和驱动，llamafile 会自动启用 GPU 加速
# 通过 -ngl 参数控制 GPU 加载的层数
./Meta-Llama-3.1-8B-Instruct.Q5_K_M.llamafile -ngl 99

# 禁用 GPU 加速（强制使用 CPU）
./Meta-Llama-3.1-8B-Instruct.Q5_K_M.llamafile -ngl 0
```

### 性能调优

```bash
# 指定 CPU 线程数
./Meta-Llama-3.1-8B-Instruct.Q5_K_M.llamafile -t 8

# 调整上下文长度
./Meta-Llama-3.1-8B-Instruct.Q5_K_M.llamafile -c 4096

# 组合多个参数
./Meta-Llama-3.1-8B-Instruct.Q5_K_M.llamafile \
  -t 8 \
  -c 4096 \
  -ngl 99 \
  --host 0.0.0.0
```

## 更新

```bash
# llamafile 是独立的可执行文件，更新只需下载新版本
# 下载新的 llamafile 替换旧文件即可

# 更新 llamafile 运行器
wget https://github.com/Mozilla-Ocho/llamafile/releases/latest/download/llamafile
chmod +x llamafile
```

## 常见问题

### 执行时提示 "Exec format error"

```bash
# 这通常是因为系统的 binfmt_misc 设置阻止了 llamafile 的执行
# 解决方案 1：安装 qemu-user-static
sudo apt install qemu-user-static

# 解决方案 2：通过 sh 运行
sh ./Meta-Llama-3.1-8B-Instruct.Q5_K_M.llamafile

# 解决方案 3：禁止 binfmt_misc 拦截
sudo sh -c 'echo -1 > /proc/sys/fs/binfmt_misc/status'
```

### 运行时内存不足

```bash
# 查看系统内存
free -h

# 选择更小的模型
# TinyLlama (约 0.7GB) 或 Phi-3-mini (约 2.4GB) 适合低内存系统

# 减少上下文长度
./model.llamafile -c 1024
```

### Web UI 无法访问

```bash
# 检查端口是否被占用
ss -tlnp | grep 8080

# 指定其他端口
./Meta-Llama-3.1-8B-Instruct.Q5_K_M.llamafile --port 8888

# 确认防火墙未阻止
sudo ufw allow 8080
```

### 下载速度慢

```bash
# 使用代理下载
export HTTPS_PROXY=http://your-proxy:port
wget https://huggingface.co/...

# 或使用 Hugging Face 镜像站
export HF_ENDPOINT=https://hf-mirror.com
```

## 相关链接

- [llamafile GitHub 仓库](https://github.com/Mozilla-Ocho/llamafile)
- [Mozilla llamafile 模型集合](https://huggingface.co/Mozilla)
- [GGUF 模型搜索（Hugging Face）](https://huggingface.co/models?library=gguf)
- [AI 工具总览](/ai/) - 返回 AI 工具概览页

---

**llamafile 体验完了吗？** [了解隐私优先的 AI 聊天应用 Jan ->](/ai/jan)
