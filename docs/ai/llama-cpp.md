---
title: llama.cpp 安装与使用
description: 在 Debian 上编译安装和使用 llama.cpp 高效大模型推理库的完整指南，涵盖 CPU/GPU 编译、模型运行和 API 服务
---

# llama.cpp

llama.cpp 是高效的 C++ 大模型推理库，提供生产级别的推理服务器（llama-server），兼容 OpenAI API。它是众多本地 AI 工具（如 Ollama、LM Studio、llamafile）的底层引擎，支持 GGUF 格式模型，特别适合需要精细控制推理参数和追求最佳 CPU 推理性能的场景。

## 前置要求

- **编译工具**：GCC/G++ 编译器、CMake 3.14+、Git
- **内存**：运行模型所需内存取决于模型大小
- **NVIDIA GPU**（可选）：启用 CUDA 加速需要 NVIDIA 驱动和 CUDA Toolkit
- **模型文件**：需要 GGUF 格式的模型文件

## 安装

### 编译安装

```bash
# 安装编译依赖
sudo apt install build-essential cmake git

# 克隆源码
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp

# 编译（CPU 版本）
cmake -B build
cmake --build build --config Release -j$(nproc)

# 编译（CUDA GPU 加速）
cmake -B build -DGGML_CUDA=ON
cmake --build build --config Release -j$(nproc)

# 验证编译结果
./build/bin/llama-cli --version
```

::: tip 提示
CPU 编译即可正常使用，GPU 加速是可选的。如果不确定是否需要 GPU 支持，建议先编译 CPU 版本进行测试。
:::

### CUDA 编译的前置准备

如果需要 GPU 加速，请先安装 CUDA Toolkit：

```bash
# 确认 NVIDIA 驱动已安装
nvidia-smi

# 安装 CUDA Toolkit
sudo apt install nvidia-cuda-toolkit

# 验证 CUDA
nvcc --version

# 然后使用 CUDA 选项编译 llama.cpp
cmake -B build -DGGML_CUDA=ON
cmake --build build --config Release -j$(nproc)
```

## 获取模型

llama.cpp 使用 GGUF 格式的模型文件，可从 Hugging Face 下载：

```bash
# 安装 huggingface-cli（可选，方便下载）
pip install huggingface-hub

# 下载模型示例（Llama 3.2 8B Q4_K_M 量化版）
huggingface-cli download \
  bartowski/Meta-Llama-3.1-8B-Instruct-GGUF \
  Meta-Llama-3.1-8B-Instruct-Q4_K_M.gguf \
  --local-dir ./models

# 或使用 wget 直接下载
wget -P ./models https://huggingface.co/bartowski/Meta-Llama-3.1-8B-Instruct-GGUF/resolve/main/Meta-Llama-3.1-8B-Instruct-Q4_K_M.gguf
```

### 常用量化等级

| 量化等级 | 质量 | 大小（7B 模型） | 说明 |
|----------|------|-----------------|------|
| `Q2_K` | 较低 | 约 2.8GB | 最小体积，适合极端资源限制 |
| `Q4_K_M` | 良好 | 约 4.1GB | 推荐的平衡选择 |
| `Q5_K_M` | 较高 | 约 4.8GB | 质量与大小的良好平衡 |
| `Q6_K` | 高 | 约 5.5GB | 接近原始质量 |
| `Q8_0` | 极高 | 约 7.2GB | 几乎无损 |

## CLI 推理

```bash
# 基本对话
./build/bin/llama-cli \
  -m ./models/Meta-Llama-3.1-8B-Instruct-Q4_K_M.gguf \
  -p "请用简洁的语言介绍 Debian 操作系统" \
  -n 512

# 交互式对话模式
./build/bin/llama-cli \
  -m ./models/Meta-Llama-3.1-8B-Instruct-Q4_K_M.gguf \
  --interactive \
  --color

# 指定推理参数
./build/bin/llama-cli \
  -m ./models/Meta-Llama-3.1-8B-Instruct-Q4_K_M.gguf \
  -p "你好" \
  -n 256 \
  --temp 0.7 \
  --top-p 0.9 \
  -ngl 99  # GPU 层数（使用 GPU 加速时设置）
```

### 常用参数说明

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `-m` | 模型文件路径 | 无（必填） |
| `-p` | 输入提示词 | 无 |
| `-n` | 最大生成 Token 数 | 128 |
| `--temp` | 温度（越高越随机） | 0.8 |
| `--top-p` | Top-P 采样 | 0.95 |
| `-ngl` | GPU 加速的层数（0 表示纯 CPU） | 0 |
| `-c` | 上下文长度 | 2048 |
| `-t` | CPU 线程数 | 自动 |

## API 服务器

llama-server 提供与 OpenAI 兼容的 HTTP API：

```bash
# 启动 API 服务器
./build/bin/llama-server \
  -m ./models/Meta-Llama-3.1-8B-Instruct-Q4_K_M.gguf \
  --host 0.0.0.0 \
  --port 8080 \
  -ngl 99

# 服务器启动后，访问 http://localhost:8080 可看到内置 Web UI
```

### API 调用示例

```bash
# Chat Completions 接口（OpenAI 兼容）
curl http://localhost:8080/v1/chat/completions -d '{
  "model": "llama3",
  "messages": [
    {"role": "system", "content": "你是一个有帮助的 AI 助手。"},
    {"role": "user", "content": "什么是 Linux 内核？"}
  ],
  "temperature": 0.7
}'

# Completions 接口
curl http://localhost:8080/completion -d '{
  "prompt": "Debian 是",
  "n_predict": 128
}'

# 健康检查
curl http://localhost:8080/health
```

### 作为 systemd 服务运行

```bash
# 创建 systemd 服务文件
sudo tee /etc/systemd/system/llama-server.service << 'EOF'
[Unit]
Description=llama.cpp Server
After=network.target

[Service]
Type=simple
User=llama
ExecStart=/opt/llama.cpp/build/bin/llama-server \
  -m /opt/llama.cpp/models/model.gguf \
  --host 127.0.0.1 \
  --port 8080 \
  -ngl 99
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

# 启动服务
sudo systemctl daemon-reload
sudo systemctl enable --now llama-server

# 查看日志
sudo journalctl -u llama-server -f
```

## 更新

```bash
# 进入 llama.cpp 目录
cd llama.cpp

# 拉取最新代码
git pull

# 重新编译
cmake -B build
cmake --build build --config Release -j$(nproc)
```

## 常见问题

### 编译失败提示 CMake 版本过低

```bash
# 查看当前 CMake 版本
cmake --version

# 如果版本低于 3.14，从官方安装新版
wget https://github.com/Kitware/CMake/releases/download/v3.28.0/cmake-3.28.0-linux-x86_64.sh
chmod +x cmake-3.28.0-linux-x86_64.sh
sudo ./cmake-3.28.0-linux-x86_64.sh --prefix=/usr/local --skip-license
```

### CUDA 编译失败

```bash
# 确认 CUDA Toolkit 已正确安装
nvcc --version

# 确认环境变量
echo $CUDA_HOME
echo $PATH | grep cuda

# 如果环境变量缺失，添加到 ~/.bashrc
export CUDA_HOME=/usr/local/cuda
export PATH=$CUDA_HOME/bin:$PATH
export LD_LIBRARY_PATH=$CUDA_HOME/lib64:$LD_LIBRARY_PATH
source ~/.bashrc
```

### 模型加载时提示内存不足

```bash
# 查看可用内存
free -h

# 解决方案：
# 1. 使用更小的量化版本（如 Q2_K 或 Q4_K_M）
# 2. 减少上下文长度：-c 1024
# 3. 如果有 GPU，使用 -ngl 参数将层卸载到 GPU
# 4. 增加 swap 空间（会降低速度）
```

## 相关链接

- [llama.cpp GitHub 仓库](https://github.com/ggerganov/llama.cpp)
- [GGUF 模型搜索（Hugging Face）](https://huggingface.co/models?library=gguf)
- [AI 工具总览](/ai/) - 返回 AI 工具概览页

---

**llama.cpp 配置好了吗？** [了解零安装方案 llamafile ->](/ai/llamafile)
