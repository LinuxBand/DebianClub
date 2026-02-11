---
title: Aider Installation & Usage
description: Step-by-step guide to installing and using Aider, an open-source AI pair programming CLI tool, on Debian.
---

# Aider

Aider is an open-source AI pair programming tool that runs directly in your terminal. It connects to large language models such as Claude, GPT, DeepSeek, and locally hosted models to help you write, refactor, and debug code through natural language conversations. Aider understands your entire Git repository, makes targeted edits across multiple files, and automatically commits changes with meaningful messages -- all without leaving the command line.

## Prerequisites

Before installing Aider, make sure you have the following:

- **Python 3.9+** -- Required for installation via pip or pipx.
- **Git** -- Aider integrates deeply with Git for tracking and committing changes.
- **API key** -- You need at least one AI provider API key (Anthropic, OpenAI, DeepSeek, etc.) or a locally running model.

::: tip
You can check your Python version with `python3 --version`. If the output shows 3.9 or higher, you are ready to proceed.
:::

### Install Python and Git

If Python or Git is not already installed on your system:

```bash
# Install Python 3, pip, and Git
sudo apt update
sudo apt install -y python3 python3-pip python3-venv git

# Verify the installations
python3 --version
git --version
```

## Installation

### Method 1: Install via pipx (Recommended)

Using `pipx` installs Aider in an isolated virtual environment, preventing dependency conflicts with other Python packages on your system.

```bash
# Install pipx if you do not have it
sudo apt install -y pipx
pipx ensurepath

# Restart your shell or source the updated PATH
source ~/.bashrc

# Install Aider
pipx install aider-chat

# Verify the installation
aider --version
```

### Method 2: Install via pip

You can also install Aider directly with pip. Using the `--user` flag avoids requiring root permissions.

```bash
# Install Aider for the current user
python3 -m pip install --user aider-chat

# Verify the installation
aider --version
```

### Method 3: One-Line Installer

Aider provides a convenience installer script:

```bash
# Download and run the official installer
python3 -m pip install aider-install
aider-install

# Verify the installation
aider --version
```

## Configuration

### API Key Setup

Aider needs an API key from at least one AI provider. Set your preferred provider's key as an environment variable.

```bash
# For Anthropic (Claude models)
export ANTHROPIC_API_KEY='your-anthropic-api-key-here'

# For OpenAI (GPT models)
export OPENAI_API_KEY='your-openai-api-key-here'

# For DeepSeek
export DEEPSEEK_API_KEY='your-deepseek-api-key-here'

# To make the key persistent across sessions, add it to your shell config
echo 'export ANTHROPIC_API_KEY="your-anthropic-api-key-here"' >> ~/.bashrc
source ~/.bashrc
```

::: warning
Keep your API keys secret. Never commit them to version control or share them publicly.
:::

### Selecting a Model

You can specify which model Aider should use with the `--model` flag:

```bash
# Use Claude Sonnet (default for Anthropic)
aider --model claude-sonnet-4-20250514

# Use GPT-4o
aider --model gpt-4o

# Use DeepSeek
aider --model deepseek/deepseek-chat

# Use a local Ollama model
aider --model ollama/llama3
```

### Configuration File

You can create a persistent configuration file so you do not have to specify options every time:

```bash
# Create a global config file
mkdir -p ~/.config/aider
cat > ~/.config/aider/.aider.conf.yml << 'EOF'
# Default model
model: claude-sonnet-4-20250514

# Automatically commit changes
auto-commits: true

# Use dark mode for the terminal UI
dark-mode: true

# Git integration
gitignore: true
EOF
```

You can also create a project-level `.aider.conf.yml` in any repository root to override global settings for that project.

## Usage

### Starting a Session

Navigate to your project directory and launch Aider:

```bash
# Start Aider in the current Git repository
cd /path/to/your/project
aider

# Start Aider with specific files pre-loaded
aider src/main.py src/utils.py

# Start Aider with a specific model
aider --model gpt-4o
```

### In-Chat Commands

While in an Aider session, you can use the following slash commands:

| Command | Description |
|---------|-------------|
| `/add <file>` | Add a file to the chat context for Aider to read and edit |
| `/drop <file>` | Remove a file from the chat context |
| `/diff` | Show the diff of the most recent changes |
| `/undo` | Undo the last change and Git commit made by Aider |
| `/run <command>` | Run a shell command and optionally share the output with Aider |
| `/test <command>` | Run a test command and let Aider fix failures automatically |
| `/lint` | Run the linter and let Aider fix any issues |
| `/tokens` | Display token usage for the current session |
| `/clear` | Clear the conversation history |
| `/help` | Show all available commands |
| `/quit` | Exit the Aider session |

### Git Integration

Aider automatically tracks changes with Git. Every edit Aider makes is committed with a descriptive message.

```bash
# Start Aider in a Git repository -- it will auto-commit its changes
aider

# If you want to disable auto-commits
aider --no-auto-commits

# Review the changes Aider has made
git log --oneline

# Undo the last Aider commit
aider
# Then type: /undo
```

### Working with Multiple Files

Aider can work across multiple files simultaneously. You can add files to the session at startup or interactively.

```bash
# Start with multiple files
aider app.py models.py templates/index.html

# Or add files during the session
# /add tests/test_app.py
# /add config.yaml
```

### Using Aider with Local Models (Ollama)

If you run models locally via Ollama, Aider can connect to them:

```bash
# Make sure Ollama is running
ollama serve

# Start Aider with a local model
aider --model ollama/llama3

# Or use a custom Ollama endpoint
aider --model ollama/codellama --ollama-base-url http://localhost:11434
```

## Update

### Updating Aider

```bash
# Update via pipx
pipx upgrade aider-chat

# Update via pip
python3 -m pip install --user --upgrade aider-chat
```

### Uninstalling Aider

```bash
# Uninstall via pipx
pipx uninstall aider-chat

# Uninstall via pip
python3 -m pip uninstall aider-chat
```

## Troubleshooting

### "command not found" after installation

If `aider` is not recognized after installation, your PATH may not include the pip user bin directory.

```bash
# Check if the user bin directory is in your PATH
echo $PATH | tr ':' '\n' | grep -i local

# Add the user bin directory to PATH
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

### API key not recognized

If Aider cannot find your API key, verify it is set correctly:

```bash
# Check that the key is set
echo $ANTHROPIC_API_KEY

# If empty, re-export it
export ANTHROPIC_API_KEY='your-api-key-here'
```

### Git errors on launch

Aider requires a Git repository. If you see Git-related errors, make sure you are in a valid repository:

```bash
# Initialize a new Git repository if needed
cd /path/to/your/project
git init
git add .
git commit -m "Initial commit"

# Then launch Aider
aider
```

### Python dependency conflicts

If you encounter dependency conflicts, use `pipx` to install Aider in an isolated environment:

```bash
# Remove the pip installation
python3 -m pip uninstall aider-chat

# Reinstall with pipx
pipx install aider-chat
```

### Network or proxy issues

If you are behind a corporate proxy:

```bash
# Set proxy environment variables
export HTTP_PROXY="http://your-proxy:port"
export HTTPS_PROXY="http://your-proxy:port"

# Then run Aider
aider
```

## Related Resources

- [AI Tools Overview](/en/ai/) -- Overview of all AI tools on Debian
- [Command Line Basics](/en/basics/command-line) -- Terminal fundamentals
- [Aider Official Website](https://aider.chat) -- Official documentation and changelog
- [Aider GitHub Repository](https://github.com/paul-gauthier/aider) -- Source code and issue tracker
