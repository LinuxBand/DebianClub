---
title: OpenCode Installation & Usage
description: Step-by-step guide to installing and using OpenCode, an open-source terminal AI coding agent with multi-model support, on Debian.
---

# OpenCode

OpenCode is an open-source terminal AI coding agent that supports multiple AI providers, including Anthropic Claude, OpenAI, Google Gemini, and local models. It provides a rich terminal-based AI programming experience with features like built-in agents, project-aware context, and interactive code editing.

## Prerequisites

- **Node.js 18+** -- Required for the npm installation method. See the [AI Tools overview](/en/ai/) for installation instructions.
- **API key from an AI provider** -- At least one of the following:
  - Anthropic API key (for Claude models)
  - OpenAI API key (for GPT models)
  - Google AI API key (for Gemini models)
  - A local model endpoint (e.g., Ollama)
- **Internet connection** -- Required for cloud-based AI providers.

## Installation

### Method 1: Install Script (Recommended)

The official install script handles dependency checks and path configuration automatically.

```bash
# Download and run the official installer
curl -fsSL https://opencode.ai/install | bash

# Refresh your shell environment
source ~/.bashrc

# Verify the installation
opencode --version
```

### Method 2: Install via npm

If you already have Node.js set up, install OpenCode globally with npm.

```bash
# Install OpenCode globally
npm install -g opencode-ai@latest

# Verify the installation
opencode --version
```

## Configuration

### Setting Up API Keys

OpenCode supports multiple AI providers. Set the environment variable for the provider you want to use.

```bash
# Anthropic (Claude)
export ANTHROPIC_API_KEY='your-anthropic-key-here'

# OpenAI (GPT)
export OPENAI_API_KEY='your-openai-key-here'

# Google (Gemini)
export GOOGLE_API_KEY='your-google-key-here'
```

To persist these across sessions, add the relevant lines to your shell configuration file:

```bash
# Add your preferred provider key to ~/.bashrc
echo 'export ANTHROPIC_API_KEY="your-anthropic-key-here"' >> ~/.bashrc
source ~/.bashrc
```

::: warning
Never commit API keys to version control. Use environment variables or a secrets manager to keep them secure.
:::

### First-Run Model Selection

When you launch OpenCode for the first time, it will prompt you to select your default AI model. You can change this later in the configuration.

```bash
# Launch OpenCode -- follow the prompts to select a model
opencode
```

## Basic Usage

### Interactive Session

Start an interactive session to have a conversation with the AI about your code.

```bash
# Start an interactive session in the current directory
opencode

# Start in a specific project
cd /path/to/project
opencode
```

### Working with Projects

OpenCode is project-aware. When launched from a project directory, it automatically picks up context from the project structure, README files, and configuration files.

```bash
# Navigate to your project and start OpenCode
cd ~/projects/my-app
opencode
```

### Built-in Agents

OpenCode includes specialized agents for common tasks:

| Agent | Description |
|-------|-------------|
| **build** | Helps build, compile, and run projects |
| **plan** | Creates detailed implementation plans before writing code |
| **debug** | Assists with debugging errors and tracing issues |

You can invoke agents directly within an interactive session by referencing them in your prompts, or use command flags if supported by your version.

### One-Shot Prompts

Send a single question without entering interactive mode:

```bash
# Ask a quick question
opencode "how do I set up a systemd service on Debian?"

# Analyze a file
cat app.py | opencode "find bugs in this code"
```

## Update & Uninstall

### Updating OpenCode

```bash
# If installed via the install script
curl -fsSL https://opencode.ai/install | bash

# If installed via npm
npm update -g opencode-ai
```

### Uninstalling OpenCode

```bash
# If installed via npm
npm uninstall -g opencode-ai

# Remove configuration files (optional)
rm -rf ~/.config/opencode
```

## Troubleshooting

### "command not found" after installation

Make sure the installation directory is in your PATH.

```bash
# Check your PATH
echo $PATH

# If the npm global bin directory is missing, add it
echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

### API key not recognized

Verify that your environment variable is set correctly:

```bash
# Check if the key is set
echo $ANTHROPIC_API_KEY

# If empty, re-export it
export ANTHROPIC_API_KEY='your-key-here'
```

### Connection errors with local models

If you are using a local model (e.g., through Ollama), make sure the model server is running:

```bash
# Check if Ollama is running
systemctl status ollama

# Start it if needed
systemctl start ollama
```

### Slow responses or timeouts

- Check your internet connection for cloud providers.
- For local models, ensure you have sufficient RAM and GPU resources.
- Try switching to a smaller or faster model in the configuration.

## Related Resources

- [AI Tools Overview](/en/ai/) -- Overview of all AI tools on Debian
- [Command Line Basics](/en/basics/command-line) -- Terminal fundamentals
- [OpenCode GitHub Repository](https://github.com/opencode-ai/opencode) -- Source code and issue tracker
