---
title: AI Tools
description: A comprehensive guide to installing and using AI tools on Debian — coding assistants, AI editors, local LLMs, image generation, and AI platforms.
---

# AI Tools Guide

AI tools have become an integral part of the modern development workflow — from terminal-based coding agents and intelligent IDEs to locally-run language models and image generators. This guide covers how to install and use the most popular AI tools on Debian.

## AI Editors / IDEs

Code editors with built-in AI capabilities for intelligent completion, conversational programming, and code refactoring.

| Tool | Description | Open Source | Installation |
|------|-------------|------------|-------------|
| [Cursor](/en/ai/cursor) | VS Code-based AI editor with built-in assistant | No | .deb / AppImage |
| [Windsurf](/en/ai/windsurf) | AI Agent IDE by Codeium | No | APT repository |
| [Zed](/en/ai/zed) | High-performance Rust editor with LLM integration | Yes | Install script |

## AI Coding Assistants (CLI)

Terminal-based AI coding tools for command-line workflows.

| Tool | Description | Open Source | Installation |
|------|-------------|------------|-------------|
| [Claude Code](/en/ai/claude-code) | Anthropic's official terminal AI coding tool | No | Install script / npm |
| [Aider](/en/ai/aider) | AI pair programming CLI, multi-model support | Yes | pip |
| [OpenCode](/en/ai/opencode) | Open-source terminal AI coding agent | Yes | Install script / npm |
| [Cline](/en/ai/cline) | VS Code autonomous coding agent (5M+ users) | Yes | VS Code extension |
| [Continue](/en/ai/continue) | Open-source AI code assistant (26K+ Stars) | Yes | VS Code / JetBrains / CLI |
| [GitHub Copilot](/en/ai/github-copilot) | GitHub's official AI coding assistant | No | gh CLI extension |
| [Gemini CLI](/en/ai/gemini-cli) | Google's open-source CLI AI tool, free for personal use | Yes | npm |

## Local LLM Runners

Run large language models locally for privacy and offline use.

| Tool | Description | Installation |
|------|-------------|-------------|
| [Ollama](/en/ai/ollama) | Most popular local LLM runner with model registry | Install script |
| [LM Studio](/en/ai/lm-studio) | GUI application for discovering and running LLMs | AppImage |
| [llama.cpp](/en/ai/llama-cpp) | High-performance C++ LLM inference engine | Build from source |
| [llamafile](/en/ai/llamafile) | Single-file portable LLM, zero dependencies | Download and run |
| [Jan](/en/ai/jan) | Privacy-first local AI chat application | AppImage / .deb |
| [LocalAI](/en/ai/localai) | OpenAI API-compatible local inference server | Docker |

## AI Image & Speech

Locally-run AI image generation and speech recognition tools.

| Tool | Description | Installation |
|------|-------------|-------------|
| [Stable Diffusion WebUI](/en/ai/stable-diffusion) | Most popular AI image generation interface | Git + Python |
| [ComfyUI](/en/ai/comfyui) | Node-based AI image generation UI | Python |
| [OpenAI Whisper](/en/ai/whisper) | Speech recognition and transcription | pip |

## AI Platforms & Automation

Visual AI application builders and workflow automation tools.

| Tool | Description | Installation |
|------|-------------|-------------|
| [Dify](/en/ai/dify) | LLM app development platform with visual workflow + RAG | Docker |
| [n8n](/en/ai/n8n) | Workflow automation platform, 400+ app integrations | Docker / npm |
| [OpenClaw](/en/ai/openclaw) | Self-hosted AI agent platform | Install script |

## Common Prerequisites

Many AI tools share common dependencies. Install these before proceeding with individual guides.

### Node.js

Required for Claude Code, OpenCode, Gemini CLI, and other tools.

```bash
# Install Node.js 22.x LTS (via NodeSource)
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# Verify
node --version
npm --version
```

### Python

Required for Aider, Whisper, Stable Diffusion, and other ML tools.

```bash
# Debian 13 includes Python 3 by default
sudo apt install python3 python3-pip python3-venv
```

### Docker

Recommended for Dify, n8n, LocalAI, and other platforms.

```bash
sudo apt install docker.io docker-compose-plugin
sudo usermod -aG docker $USER
# Log out and back in for changes to take effect
```

### NVIDIA GPU Drivers

Optional but recommended for local LLMs and image generation.

```bash
# Install NVIDIA drivers
sudo apt install nvidia-driver

# Verify after reboot
nvidia-smi
```

::: tip
Not all tools require a GPU. Ollama, llama.cpp, and others can run in CPU-only mode — just slower.
:::

## Related Resources

1. [Development Tools](/en/applications/) — Application installation on Debian
2. [Docker Guide](/en/server/docker) — Docker installation and usage
3. [Command Line Basics](/en/basics/command-line) — Getting comfortable with the terminal

---

**Ready to boost your productivity?** [Start with Claude Code →](/en/ai/claude-code)
