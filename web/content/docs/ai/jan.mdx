---
title: Jan 安装与使用
description: 在 Debian 上安装和使用 Jan 本地 AI 聊天应用的完整指南，涵盖模型管理、对话界面和本地 API 服务
---

# Jan

Jan 是一个注重隐私的本地 AI 聊天应用，提供类似 ChatGPT 的对话界面，所有数据和模型都存储在本地，不会上传到任何远程服务器。它支持下载和运行多种开源模型，并提供本地 API 服务和扩展系统，适合重视数据隐私的个人和团队使用。

## 前置要求

- **架构**：64 位系统（x86_64）
- **内存**：8GB 以上（推荐 16GB+）
- **桌面环境**：GNOME、KDE Plasma 或其他桌面环境
- **GPU**（可选）：NVIDIA GPU 可加速模型推理

## 安装

```bash
# 方法 1：使用 .deb 包安装（推荐）
# 从 https://jan.ai 下载 Linux .deb 版本
sudo dpkg -i jan-linux-amd64-*.deb
sudo apt install -f  # 修复可能缺少的依赖

# 方法 2：AppImage 方式
# 从 https://jan.ai 下载 Linux AppImage 版本
chmod +x jan-linux-x86_64-*.AppImage
./jan-linux-x86_64-*.AppImage

# 如果 AppImage 无法运行，安装 FUSE 支持
sudo apt install libfuse2
```

### 为 AppImage 创建桌面快捷方式

```bash
# 移动到固定位置
mkdir -p ~/.local/bin
mv jan-linux-x86_64-*.AppImage ~/.local/bin/jan.AppImage

# 创建桌面快捷方式
mkdir -p ~/.local/share/applications
cat > ~/.local/share/applications/jan.desktop << 'EOF'
[Desktop Entry]
Name=Jan
Exec=$HOME/.local/bin/jan.AppImage
Icon=jan
Type=Application
Categories=Utility;Chat;
Comment=Privacy-first local AI chat
EOF
```

## 基本使用

### 下载模型

1. 启动 Jan 后，点击左侧的「Hub」标签页
2. 浏览可用模型列表，支持按类别和大小筛选
3. 点击模型旁的下载按钮开始下载
4. 下载完成后，模型会出现在本地模型列表中

### 推荐模型

| 模型 | 大小 | 说明 |
|------|------|------|
| Llama 3.2 8B | 约 4.9GB | 通用对话，性能均衡 |
| Mistral 7B | 约 4.1GB | 轻量通用模型 |
| Phi-3 Mini | 约 2.4GB | 微软轻量模型，适合低资源设备 |
| Qwen 2.5 7B | 约 4.7GB | 中文对话表现优秀 |

### 对话界面

1. 点击左侧的「Chat」标签页
2. 创建新对话或选择已有对话
3. 从顶部下拉菜单选择要使用的模型
4. 开始输入消息进行对话

界面支持以下功能：
- **对话管理** -- 创建、重命名和删除对话
- **消息编辑** -- 编辑已发送的消息重新生成回复
- **参数调整** -- 在右侧面板调整温度、Top-P 等推理参数
- **Markdown 渲染** -- 支持代码高亮和 Markdown 格式

## 本地 API 服务

Jan 提供与 OpenAI 兼容的本地 API 服务器：

```bash
# 在 Jan 中启用 API 服务器：
# 设置 -> Local API Server -> 开启

# 默认监听 http://localhost:1337

# 测试 API 调用
curl http://localhost:1337/v1/chat/completions -d '{
  "model": "your-model-name",
  "messages": [
    {"role": "user", "content": "你好"}
  ]
}'

# 列出可用模型
curl http://localhost:1337/v1/models
```

## 高级功能

### 接入远程 API

Jan 支持连接外部 AI 服务作为后端：

1. 进入「设置」->「Model Providers」
2. 可添加以下服务：
   - **OpenAI** -- 使用 OpenAI API Key
   - **Anthropic** -- 使用 Claude API
   - **Ollama** -- 连接本地运行的 Ollama 服务

### 扩展系统

Jan 提供扩展机制以增强功能：

1. 进入「设置」->「Extensions」
2. 浏览和安装可用扩展
3. 扩展涵盖模型推理引擎、数据导出等功能

### 数据存储

Jan 的所有数据默认存储在本地：

```bash
# 默认数据目录
~/.jan/

# 目录结构
~/.jan/
├── models/      # 下载的模型文件
├── threads/     # 对话记录
└── extensions/  # 已安装的扩展
```

## 更新

```bash
# .deb 方式：下载新版本覆盖安装
sudo dpkg -i jan-linux-amd64-new-version.deb

# AppImage 方式：下载新文件替换旧文件
mv jan-linux-x86_64-new-version.AppImage ~/.local/bin/jan.AppImage
chmod +x ~/.local/bin/jan.AppImage
```

## 常见问题

### AppImage 提示无法运行

```bash
# 安装 FUSE 支持
sudo apt install libfuse2

# 如果仍然无法运行，尝试解压后运行
./jan-linux-x86_64-*.AppImage --appimage-extract
./squashfs-root/AppRun
```

### 模型下载失败或速度慢

```bash
# 检查网络连接
curl -I https://huggingface.co

# 在终端中设置代理后启动 Jan
export HTTPS_PROXY=http://your-proxy:port
jan  # 或 ~/.local/bin/jan.AppImage
```

### GPU 加速未生效

```bash
# 确认 NVIDIA 驱动已安装
nvidia-smi

# 如果未安装
sudo apt install nvidia-driver
sudo reboot

# 在 Jan 的设置中确认 GPU 加速选项已开启
# 设置 -> Advanced -> GPU Acceleration
```

### 应用卡顿或响应缓慢

```bash
# 查看系统资源使用情况
free -h
top

# 可能的解决方案：
# 1. 选择更小的模型
# 2. 减少上下文长度
# 3. 关闭其他占用资源的应用程序
# 4. 如果有 GPU，确保 GPU 加速已启用
```

## 相关链接

- [Jan 官方网站](https://jan.ai/)
- [Jan GitHub 仓库](https://github.com/janhq/jan)
- [Jan 官方文档](https://jan.ai/docs)
- [AI 工具总览](/ai/) - 返回 AI 工具概览页

---

**Jan 配置好了吗？** [了解 OpenAI API 替代方案 LocalAI ->](/ai/localai)
