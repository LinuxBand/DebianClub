---
title: Claude Code Installation & Usage
description: Step-by-step guide to installing and using Claude Code, Anthropic's terminal-based AI coding assistant, on Debian.
---

# Claude Code

Claude Code is Anthropic's official terminal-based AI coding tool. It lets you interact with Claude directly from the command line to write code, debug issues, manage projects, and perform complex code reviews -- all without leaving your terminal.

## Prerequisites

Before installing Claude Code, make sure you have the following:

- **Node.js 18+** -- Required for the npm installation method. See the [AI Tools overview](/en/ai/) for installation instructions.
- **Anthropic API Key** or **Claude Pro/Max subscription** -- You need one of these to authenticate.
- **Internet connection** -- Claude Code communicates with Anthropic's API.

::: tip
You can check your Node.js version at any time with `node --version`. If the output shows v18 or higher, you are ready to proceed.
:::

## Installation

### Method 1: Native Installer (Recommended)

The native installer handles everything automatically, including path setup.

```bash
# Download and run the official installer
curl -fsSL https://claude.ai/install.sh | bash

# Refresh your shell environment
source ~/.bashrc

# Verify the installation
claude --version
```

### Method 2: Install via npm

If you already have Node.js and npm set up, you can install Claude Code globally with npm.

```bash
# Install Claude Code globally
npm install -g @anthropic-ai/claude-code

# Verify the installation
claude --version
```

## Authentication & Configuration

Claude Code supports two authentication methods. Choose the one that matches your account type.

### Option 1: API Key Authentication

If you have an Anthropic API key, set it as an environment variable.

```bash
# Set the API key for the current session
export ANTHROPIC_API_KEY='your-api-key-here'

# To make it persistent across sessions, add it to your shell config
echo 'export ANTHROPIC_API_KEY="your-api-key-here"' >> ~/.bashrc
source ~/.bashrc
```

::: warning
Keep your API key secret. Never commit it to version control or share it publicly. Consider using a secrets manager for production workflows.
:::

### Option 2: OAuth Authentication (Claude Pro/Max)

If you have a Claude Pro or Max subscription, Claude Code can authenticate through your browser.

```bash
# Simply run Claude Code -- it will open your browser for authentication on first launch
claude
```

Follow the on-screen prompts to complete the OAuth flow.

## Basic Usage

### Interactive Mode

Start an interactive session where you can have a back-and-forth conversation with Claude about your code.

```bash
# Start an interactive session in the current directory
claude

# Start in a specific project directory
cd /path/to/project
claude
```

### One-Shot Prompts

Send a single prompt and get an immediate response without entering interactive mode.

```bash
# Ask Claude to explain code
claude "explain what this code does"

# Ask Claude to suggest improvements
claude "review this project for potential bugs"
```

### Piping Content

You can pipe files or command output directly into Claude Code for analysis.

```bash
# Analyze an error log
cat error.log | claude "analyze this error log and suggest fixes"

# Review a specific file
cat src/main.py | claude "review this code for security issues"

# Pipe diff output for review
git diff | claude "review these changes"
```

### Getting Help

```bash
# View all available options
claude --help
```

## Common Commands

When inside an interactive Claude Code session, you can use the following slash commands:

| Command | Description |
|---------|-------------|
| `/init` | Initialize a project-level CLAUDE.md configuration file |
| `/compact` | Compress the conversation context to save tokens |
| `/clear` | Clear the current conversation history |
| `/cost` | Display token usage and cost for the current session |
| `Tab` | Accept a suggested code change |
| `Escape` | Reject a suggested code change |

## Update & Uninstall

### Updating Claude Code

```bash
# Update using the built-in command
claude update

# Or update via npm
npm update -g @anthropic-ai/claude-code
```

### Uninstalling Claude Code

```bash
# Uninstall via npm
npm uninstall -g @anthropic-ai/claude-code
```

## Troubleshooting

### "command not found" after installation

If `claude` is not recognized after installation, your PATH may not include the npm global bin directory.

```bash
# Check where npm installs global binaries
npm config get prefix

# Add the npm bin directory to your PATH (adjust the path if needed)
echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

### Authentication failures

If authentication fails, verify the following:

1. **API Key**: Make sure `ANTHROPIC_API_KEY` is set correctly -- `echo $ANTHROPIC_API_KEY` should display your key.
2. **OAuth**: Try clearing your browser cookies for `claude.ai` and running `claude` again.
3. **Network**: Make sure your system can reach `api.anthropic.com` -- `curl -I https://api.anthropic.com` should return a response.

### Network timeouts or connection errors

```bash
# Test connectivity to Anthropic's API
curl -v https://api.anthropic.com

# If you are behind a proxy, set the proxy environment variables
export HTTP_PROXY="http://your-proxy:port"
export HTTPS_PROXY="http://your-proxy:port"
```

### Permission denied during installation

```bash
# If npm install fails with EACCES, configure a user-level global directory
mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Then retry the installation
npm install -g @anthropic-ai/claude-code
```

## Related Resources

- [AI Tools Overview](/en/ai/) -- Overview of all AI tools on Debian
- [Command Line Basics](/en/basics/command-line) -- Terminal fundamentals
- [Anthropic Documentation](https://docs.anthropic.com/en/docs/claude-code) -- Official Claude Code documentation
