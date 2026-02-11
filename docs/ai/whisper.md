---
title: OpenAI Whisper 安装与使用
description: 在 Debian 上安装和使用 OpenAI Whisper 进行本地语音识别和转录的完整指南
---

# OpenAI Whisper

Whisper 是 OpenAI 开源的自动语音识别（ASR）和转录工具，支持多种语言的语音转文字，包括中文、英文、日文等 99 种语言。它可以完全在本地运行，无需联网，具备出色的识别准确率，支持生成字幕文件、翻译等功能。对于需要批量转录音视频文件或构建语音处理流水线的用户而言，Whisper 是一个理想的选择。

## 前置要求

- **Python 3.9+**：Whisper 依赖 Python 运行环境
- **ffmpeg**：用于音视频文件解码
- **NVIDIA GPU**（可选）：GPU 加速可大幅提升转录速度；CPU 也可运行，但速度较慢

::: tip 提示
对于中文语音识别，建议使用 `medium` 或 `large-v3` 模型以获得最佳准确率。
:::

## 安装

### 安装系统依赖

```bash
# 安装 ffmpeg 和 Python 环境
sudo apt install ffmpeg python3 python3-pip python3-venv
```

### 安装 Whisper

```bash
# 创建虚拟环境（推荐）
python3 -m venv whisper-env
source whisper-env/bin/activate

# 方法 1：安装 OpenAI 官方 Whisper
pip install openai-whisper

# 方法 2：安装 faster-whisper（推荐，速度约为原版 4 倍）
pip install faster-whisper
```

::: tip 推荐 faster-whisper
faster-whisper 使用 CTranslate2 引擎重新实现了 Whisper，在保持相同准确率的前提下，速度提升约 4 倍，内存占用也更低。对于大部分使用场景，推荐优先选择 faster-whisper。
:::

## 基本使用

### 命令行转录

```bash
# 激活虚拟环境
source whisper-env/bin/activate

# 基本转录（自动检测语言）
whisper audio.mp3

# 指定语言为中文（跳过语言检测，速度更快、更准确）
whisper audio.mp3 --language zh

# 指定模型大小（默认使用 small）
whisper audio.mp3 --model medium

# 输出 SRT 字幕文件
whisper audio.mp3 --output_format srt

# 输出多种格式（txt、vtt、srt、tsv、json）
whisper audio.mp3 --output_format all

# 指定输出目录
whisper audio.mp3 --output_dir ./transcripts

# 将其他语言翻译为英文
whisper audio.mp3 --task translate

# 组合使用：中文音频转录为 SRT 字幕
whisper meeting.mp4 --language zh --model medium --output_format srt --output_dir ./subtitles
```

### 模型大小对比

Whisper 提供多种模型大小，可根据硬件条件和精度需求进行选择。

| 模型 | 参数量 | 磁盘占用 | 所需显存 | 相对速度 | 适用场景 |
|------|--------|----------|----------|----------|----------|
| `tiny` | 39M | ~75MB | ~1GB | 最快 | 快速预览、低配设备 |
| `base` | 74M | ~142MB | ~1GB | 很快 | 简单转录任务 |
| `small` | 244M | ~466MB | ~2GB | 快 | 日常使用的平衡选择 |
| `medium` | 769M | ~1.5GB | ~5GB | 中等 | 中文等非英语语言推荐 |
| `large-v3` | 1.5B | ~3GB | ~10GB | 较慢 | 最高精度需求 |

```bash
# 首次使用某个模型时会自动下载
# 模型缓存在 ~/.cache/whisper/ 目录下

# 查看已下载的模型
ls ~/.cache/whisper/
```

## 使用 faster-whisper

faster-whisper 提供了与原版 Whisper 相似的接口，但需要通过 Python 脚本调用。

```bash
# 激活虚拟环境
source whisper-env/bin/activate

# 创建转录脚本
cat > transcribe.py << 'PYEOF'
from faster_whisper import WhisperModel

# 加载模型（首次运行会自动下载）
# 设备选择：cuda（GPU）或 cpu
model = WhisperModel("medium", device="cuda", compute_type="float16")

# 转录音频文件
segments, info = model.transcribe("audio.mp3", language="zh")

print(f"检测到的语言: {info.language}，概率: {info.language_probability:.2f}")

# 输出转录结果
for segment in segments:
    print(f"[{segment.start:.2f}s -> {segment.end:.2f}s] {segment.text}")
PYEOF

# 运行脚本
python transcribe.py
```

### faster-whisper 生成 SRT 字幕

```bash
# 创建 SRT 字幕生成脚本
cat > generate_srt.py << 'PYEOF'
from faster_whisper import WhisperModel
import sys

def format_timestamp(seconds):
    """将秒数转换为 SRT 时间格式"""
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = int(seconds % 60)
    millis = int((seconds % 1) * 1000)
    return f"{hours:02d}:{minutes:02d}:{secs:02d},{millis:03d}"

# 从命令行参数获取文件名
audio_file = sys.argv[1] if len(sys.argv) > 1 else "audio.mp3"

model = WhisperModel("medium", device="cuda", compute_type="float16")
segments, info = model.transcribe(audio_file, language="zh")

# 生成 SRT 格式字幕
with open(audio_file.rsplit(".", 1)[0] + ".srt", "w", encoding="utf-8") as f:
    for i, segment in enumerate(segments, 1):
        f.write(f"{i}\n")
        f.write(f"{format_timestamp(segment.start)} --> {format_timestamp(segment.end)}\n")
        f.write(f"{segment.text.strip()}\n\n")

print(f"字幕文件已生成: {audio_file.rsplit('.', 1)[0]}.srt")
PYEOF

# 使用方式
python generate_srt.py meeting.mp4
```

## 批量转录

```bash
# 批量转录目录下的所有音频文件
cat > batch_transcribe.sh << 'BASHEOF'
#!/bin/bash
# 批量转录脚本

SOURCE_DIR="${1:-.}"
OUTPUT_DIR="${2:-./transcripts}"

mkdir -p "$OUTPUT_DIR"

source whisper-env/bin/activate

for file in "$SOURCE_DIR"/*.{mp3,wav,mp4,m4a,flac}; do
    [ -f "$file" ] || continue
    echo "正在转录: $file"
    whisper "$file" --language zh --model medium --output_format srt --output_dir "$OUTPUT_DIR"
done

echo "所有文件转录完成"
BASHEOF

chmod +x batch_transcribe.sh

# 使用方式
./batch_transcribe.sh /path/to/audio ./output
```

## 更新

```bash
# 激活虚拟环境
source whisper-env/bin/activate

# 更新 Whisper
pip install --upgrade openai-whisper

# 或更新 faster-whisper
pip install --upgrade faster-whisper
```

## 常见问题

### ffmpeg 未找到

```bash
# 确认 ffmpeg 已安装
ffmpeg -version

# 如果未安装
sudo apt install ffmpeg
```

### CUDA 相关错误

```bash
# 确认 GPU 驱动正常
nvidia-smi

# 确认 PyTorch CUDA 可用
python3 -c "import torch; print(f'CUDA 可用: {torch.cuda.is_available()}')"

# 如果 CUDA 不可用，重新安装 GPU 版本的 PyTorch
pip install torch torchaudio --index-url https://download.pytorch.org/whl/cu121
```

### 转录结果不准确

- 使用更大的模型（如从 `small` 升级到 `medium` 或 `large-v3`）
- 明确指定 `--language` 参数，避免语言检测错误
- 确保音频质量良好，减少背景噪声
- 对于混合语言的音频，`large-v3` 模型表现最佳

### 内存不足

- 使用更小的模型
- 使用 faster-whisper（内存占用更低）
- 将长音频分段处理
- 在 faster-whisper 中使用 `compute_type="int8"` 降低精度以节省内存

```bash
# faster-whisper 低内存模式
python3 -c "
from faster_whisper import WhisperModel
model = WhisperModel('medium', device='cpu', compute_type='int8')
segments, _ = model.transcribe('audio.mp3', language='zh')
for s in segments:
    print(f'[{s.start:.2f}s -> {s.end:.2f}s] {s.text}')
"
```

## 相关链接

- [OpenAI Whisper GitHub 仓库](https://github.com/openai/whisper)
- [faster-whisper GitHub 仓库](https://github.com/SYSTRAN/faster-whisper)
- [Hugging Face Whisper 模型页](https://huggingface.co/openai/whisper-large-v3)
- [AI 工具总览](/ai/) - 返回 AI 工具概览页

---

**想构建 AI 应用平台？** [了解 Dify →](/ai/dify)
