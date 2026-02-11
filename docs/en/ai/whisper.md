---
title: OpenAI Whisper Installation & Usage
description: Step-by-step guide to installing and using OpenAI Whisper and faster-whisper for local speech recognition and transcription on Debian.
---

# OpenAI Whisper

OpenAI Whisper is an open-source automatic speech recognition (ASR) model that can transcribe and translate audio in over 90 languages. It runs entirely locally on your machine, requiring no internet connection or API keys after installation. Whisper can transcribe audio files, generate subtitles in SRT or VTT format, and translate non-English speech to English. For better performance, the community-developed `faster-whisper` reimplementation provides the same accuracy at significantly higher speeds and lower memory usage.

## Prerequisites

Before installing Whisper, make sure you have the following:

- **Debian 12 (Bookworm) or later** -- 64-bit x86_64
- **Python 3.9 or later** -- Required runtime
- **ffmpeg** -- Required for audio file processing
- **GPU (optional but recommended)** -- NVIDIA GPU with CUDA for faster transcription

## Installation

### Step 1: Install System Dependencies

```bash
# Install Python, pip, ffmpeg, and build tools
sudo apt update
sudo apt install -y python3 python3-pip python3-venv ffmpeg
```

### Step 2: Install Whisper

Choose between the original OpenAI Whisper or the faster community reimplementation.

#### Option A: Original OpenAI Whisper

```bash
# Create a virtual environment
python3 -m venv ~/whisper-env
source ~/whisper-env/bin/activate

# Install OpenAI Whisper
pip install openai-whisper

# Verify the installation
whisper --help
```

#### Option B: faster-whisper (Recommended)

`faster-whisper` is a reimplementation using CTranslate2 that is up to 4x faster than the original and uses less memory.

```bash
# Create a virtual environment
python3 -m venv ~/whisper-env
source ~/whisper-env/bin/activate

# Install faster-whisper
pip install faster-whisper

# Verify the installation
python3 -c "from faster_whisper import WhisperModel; print('faster-whisper installed successfully')"
```

### Model Sizes

Whisper comes in several model sizes. Larger models are more accurate but slower and require more resources.

| Model | Parameters | English-Only | Multilingual | VRAM Required | Relative Speed |
|-------|-----------|-------------|-------------|--------------|----------------|
| `tiny` | 39 M | `tiny.en` | `tiny` | ~1 GB | ~10x |
| `base` | 74 M | `base.en` | `base` | ~1 GB | ~7x |
| `small` | 244 M | `small.en` | `small` | ~2 GB | ~4x |
| `medium` | 769 M | `medium.en` | `medium` | ~5 GB | ~2x |
| `large-v3` | 1550 M | -- | `large-v3` | ~10 GB | 1x |
| `turbo` | 809 M | -- | `turbo` | ~6 GB | ~8x |

::: tip
For most use cases, the `turbo` or `medium` model provides the best balance between accuracy and speed. Use `tiny` or `base` for quick drafts or real-time applications.
:::

## Usage

### Basic Transcription (Original Whisper)

```bash
# Activate the virtual environment
source ~/whisper-env/bin/activate

# Transcribe an audio file (auto-detects language)
whisper audio.mp3

# Transcribe with a specific model
whisper audio.mp3 --model medium

# Transcribe with a specific language
whisper audio.mp3 --language en --model medium

# Generate SRT subtitle file
whisper audio.mp3 --model medium --output_format srt

# Generate multiple output formats
whisper audio.mp3 --model medium --output_format all

# Translate non-English audio to English
whisper audio_french.mp3 --task translate --model medium

# Specify an output directory
whisper audio.mp3 --model medium --output_dir ./transcripts
```

### Output Formats

| Format | Flag | Description |
|--------|------|-------------|
| Text | `--output_format txt` | Plain text transcript |
| SRT | `--output_format srt` | SubRip subtitle format |
| VTT | `--output_format vtt` | WebVTT subtitle format |
| TSV | `--output_format tsv` | Tab-separated values with timestamps |
| JSON | `--output_format json` | Detailed JSON with word-level timestamps |
| All | `--output_format all` | Generate all formats |

### Using faster-whisper (Python Script)

`faster-whisper` does not include a CLI by default, but you can create a simple script.

```bash
# Create a transcription script
cat << 'PYEOF' > ~/transcribe.py
#!/usr/bin/env python3
"""Simple transcription script using faster-whisper."""

import sys
from faster_whisper import WhisperModel

def transcribe(audio_path, model_size="medium", language=None, task="transcribe"):
    # Use GPU if available, otherwise CPU
    model = WhisperModel(model_size, device="auto", compute_type="auto")

    print(f"Transcribing: {audio_path}")
    print(f"Model: {model_size}, Task: {task}")
    print("-" * 60)

    segments, info = model.transcribe(
        audio_path,
        language=language,
        task=task,
        beam_size=5
    )

    print(f"Detected language: {info.language} (probability: {info.language_probability:.2f})")
    print("-" * 60)

    for segment in segments:
        print(f"[{segment.start:.2f}s -> {segment.end:.2f}s] {segment.text}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 transcribe.py <audio_file> [model_size] [language]")
        sys.exit(1)

    audio_file = sys.argv[1]
    model = sys.argv[2] if len(sys.argv) > 2 else "medium"
    lang = sys.argv[3] if len(sys.argv) > 3 else None

    transcribe(audio_file, model_size=model, language=lang)
PYEOF

# Make it executable
chmod +x ~/transcribe.py

# Use the script
source ~/whisper-env/bin/activate
python3 ~/transcribe.py audio.mp3
python3 ~/transcribe.py audio.mp3 large-v3
python3 ~/transcribe.py audio.mp3 medium en
```

### Generate SRT Subtitles with faster-whisper

```bash
# Create an SRT generation script
cat << 'PYEOF' > ~/whisper-srt.py
#!/usr/bin/env python3
"""Generate SRT subtitles using faster-whisper."""

import sys
from faster_whisper import WhisperModel

def format_timestamp(seconds):
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = int(seconds % 60)
    millis = int((seconds % 1) * 1000)
    return f"{hours:02d}:{minutes:02d}:{secs:02d},{millis:03d}"

def generate_srt(audio_path, output_path, model_size="medium", language=None):
    model = WhisperModel(model_size, device="auto", compute_type="auto")
    segments, info = model.transcribe(audio_path, language=language, beam_size=5)

    with open(output_path, "w", encoding="utf-8") as f:
        for i, segment in enumerate(segments, start=1):
            f.write(f"{i}\n")
            f.write(f"{format_timestamp(segment.start)} --> {format_timestamp(segment.end)}\n")
            f.write(f"{segment.text.strip()}\n\n")

    print(f"SRT saved to: {output_path}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 whisper-srt.py <audio_file> [output.srt] [model_size]")
        sys.exit(1)

    audio = sys.argv[1]
    output = sys.argv[2] if len(sys.argv) > 2 else audio.rsplit(".", 1)[0] + ".srt"
    model = sys.argv[3] if len(sys.argv) > 3 else "medium"

    generate_srt(audio, output, model_size=model)
PYEOF

# Generate subtitles
source ~/whisper-env/bin/activate
python3 ~/whisper-srt.py recording.mp3
python3 ~/whisper-srt.py video.mp4 subtitles.srt large-v3
```

### Batch Processing

```bash
# Transcribe all audio files in a directory
source ~/whisper-env/bin/activate

# Using original whisper
for f in /path/to/audio/*.mp3; do
    whisper "$f" --model medium --output_format srt --output_dir ./transcripts
done

# Using faster-whisper script
for f in /path/to/audio/*.mp3; do
    python3 ~/whisper-srt.py "$f" "./transcripts/$(basename "${f%.*}").srt"
done
```

## Update

```bash
# Activate the virtual environment
source ~/whisper-env/bin/activate

# Update OpenAI Whisper
pip install --upgrade openai-whisper

# Or update faster-whisper
pip install --upgrade faster-whisper
```

## Troubleshooting

### "ffmpeg not found" error

```bash
# Install ffmpeg
sudo apt install -y ffmpeg

# Verify it is installed
ffmpeg -version
```

### CUDA not available / slow transcription

```bash
# Check if PyTorch can see the GPU
source ~/whisper-env/bin/activate
python3 -c "import torch; print('CUDA:', torch.cuda.is_available())"

# If CUDA is not available, install PyTorch with CUDA support
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu124

# Verify GPU is working
python3 -c "import torch; print(torch.cuda.get_device_name(0))"
```

### Out of memory with large models

```bash
# Use a smaller model
whisper audio.mp3 --model small

# For faster-whisper, use int8 quantization to reduce memory
python3 -c "
from faster_whisper import WhisperModel
model = WhisperModel('large-v3', device='cuda', compute_type='int8')
"

# Or use CPU if GPU memory is insufficient
python3 -c "
from faster_whisper import WhisperModel
model = WhisperModel('large-v3', device='cpu', compute_type='int8')
"
```

### Poor transcription quality

- Use a larger model (`medium` or `large-v3` instead of `tiny`)
- Specify the language explicitly with `--language` to avoid detection errors
- Ensure the audio quality is good (minimize background noise)
- For `faster-whisper`, increase the beam size for better accuracy

### Unsupported audio format

```bash
# Convert any audio/video format to WAV using ffmpeg
ffmpeg -i input.ogg -ar 16000 -ac 1 output.wav

# Convert video to audio only
ffmpeg -i video.mp4 -vn -acodec pcm_s16le -ar 16000 -ac 1 audio.wav

# Whisper accepts most common formats: mp3, wav, m4a, flac, ogg, mp4
```

## Related Resources

- [AI Tools Overview](/en/ai/) -- Overview of all AI tools on Debian
- [LocalAI](/en/ai/localai) -- Run Whisper through an OpenAI-compatible API
- [OpenAI Whisper GitHub](https://github.com/openai/whisper) -- Official repository
- [faster-whisper GitHub](https://github.com/SYSTRAN/faster-whisper) -- Optimized reimplementation
