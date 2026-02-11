---
title: Gemini CLI Installation & Usage
description: Step-by-step guide to installing and using Gemini CLI, Google's open-source command-line AI tool, on Debian.
---

# Gemini CLI

Gemini CLI is Google's open-source command-line AI tool that brings the power of Gemini models directly to your terminal. It is free for personal use with generous daily limits, making it an accessible option for AI-assisted development without upfront costs. Gemini CLI supports interactive conversations, multimodal input (including images and files), Google Search integration, and the Model Context Protocol (MCP) for extended tool use.

## Prerequisites

Before installing Gemini CLI, make sure you have the following:

- **Node.js 18+** -- Required for the npm installation.
- **Google account** -- Needed for authentication (no separate API key required for personal use).
- **Internet connection** -- Gemini CLI communicates with Google's API.

::: tip
Gemini CLI's free personal tier includes a generous daily request limit. For higher usage, you can configure a paid Gemini API key.
:::

### Install Node.js

If Node.js is not already installed on your system:

```bash
# Install Node.js 22.x LTS via NodeSource
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# Verify the installation
node --version
npm --version
```

## Installation

### Method 1: Install via npm (Recommended)

```bash
# Install Gemini CLI globally
npm install -g @google/gemini-cli

# Verify the installation
gemini --version
```

If you encounter permission errors:

```bash
# Configure a user-level global directory for npm
mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Retry the installation
npm install -g @google/gemini-cli
```

### Method 2: Run without installing

You can use `npx` to run Gemini CLI without a global installation:

```bash
# Run directly with npx
npx @google/gemini-cli
```

## Configuration

### Authentication with Google Account

On first launch, Gemini CLI will guide you through authentication:

```bash
# Start Gemini CLI -- it will open your browser for authentication
gemini
```

Follow the prompts to:

1. Open the authentication URL in your browser.
2. Sign in with your Google account.
3. Authorize Gemini CLI to use the Gemini API.

The authentication token is stored locally and persists across sessions.

### API Key Authentication (Optional)

If you prefer to use an API key (for higher rate limits or enterprise use):

```bash
# Set the Gemini API key
export GEMINI_API_KEY='your-gemini-api-key-here'

# Make it persistent across sessions
echo 'export GEMINI_API_KEY="your-gemini-api-key-here"' >> ~/.bashrc
source ~/.bashrc
```

::: tip
You can obtain a Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey).
:::

### Model Selection

Gemini CLI defaults to the latest Gemini model. You can specify a different model:

```bash
# Use a specific model
gemini --model gemini-2.5-pro

# Use Gemini Flash for faster, lighter responses
gemini --model gemini-2.5-flash
```

### Configuration File

Gemini CLI supports a configuration file for persistent settings:

```bash
# Create the config directory
mkdir -p ~/.config/gemini-cli

# Create a settings file
cat > ~/.config/gemini-cli/settings.json << 'EOF'
{
  "model": "gemini-2.5-pro",
  "theme": "dark",
  "sandbox": true
}
EOF
```

## Usage

### Interactive Mode

Start an interactive session for back-and-forth conversations:

```bash
# Start interactive mode
gemini

# Start in a specific directory context
cd /path/to/project
gemini
```

Once in interactive mode, type your prompts and press Enter. Gemini will respond with code suggestions, explanations, and more.

### One-Shot Prompts

Send a single prompt without entering interactive mode:

```bash
# Ask a quick question
gemini "Explain the difference between TCP and UDP"

# Get a code suggestion
gemini "Write a Python script to rename all .jpg files in the current directory to lowercase"

# Analyze a file
gemini "Review this code for bugs" < src/main.py
```

### Multimodal Support

Gemini CLI supports multimodal input, including images:

```bash
# Analyze an image
gemini "Describe what is in this image" --file screenshot.png

# Analyze a diagram
gemini "Explain this architecture diagram" --file architecture.png

# Process multiple files
gemini "Compare these two config files" --file config-old.yaml --file config-new.yaml
```

### Google Search Integration

Gemini CLI can ground its responses with real-time information from Google Search:

```bash
# Ask about current events or recent information
gemini "What are the latest security updates for Debian 12?"

# Search for documentation
gemini "How do I configure Nginx as a reverse proxy on Debian?"
```

Google Search integration is enabled by default and provides up-to-date answers backed by web sources.

### File and Codebase Analysis

Gemini CLI can analyze files and directories in your project:

```bash
# Analyze the current directory structure
gemini "Explain the structure of this project"

# Review specific files
gemini "Find potential security issues in this code" < app.py

# Generate documentation
gemini "Write API documentation for the functions in this file" < api/routes.py
```

### MCP (Model Context Protocol) Support

Gemini CLI supports MCP servers for extended tool capabilities:

```bash
# Configure MCP servers in the settings file
cat > ~/.config/gemini-cli/settings.json << 'EOF'
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/home/user/projects"]
    }
  }
}
EOF

# MCP servers provide additional tools like:
# - File system access
# - Database queries
# - Web scraping
# - Custom integrations
```

### Useful Prompt Patterns

```bash
# Code review
gemini "Review this code for best practices and suggest improvements"

# Debugging
gemini "This script throws a segfault when processing large files. Help me debug it."

# Learning
gemini "Explain how Linux cgroups work with practical examples"

# DevOps
gemini "Write a Dockerfile for a Python Flask application with multi-stage build"

# System administration
gemini "Create an iptables script that allows SSH, HTTP, HTTPS and blocks everything else"
```

## Update

### Updating Gemini CLI

```bash
# Update via npm
npm update -g @google/gemini-cli

# Verify the new version
gemini --version
```

### Uninstalling Gemini CLI

```bash
# Uninstall via npm
npm uninstall -g @google/gemini-cli

# Remove the configuration directory (optional)
rm -rf ~/.config/gemini-cli
```

## Troubleshooting

### "command not found" after installation

If `gemini` is not recognized after installation:

```bash
# Check where npm installs global binaries
npm config get prefix

# Ensure the npm bin directory is in your PATH
echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Or check the default npm path
ls $(npm config get prefix)/bin/gemini
```

### Authentication failures

If authentication fails or the browser flow does not complete:

```bash
# Clear stored credentials and re-authenticate
rm -rf ~/.config/gemini-cli/auth*

# Restart Gemini CLI to trigger a new authentication flow
gemini
```

If you are in a headless (no GUI) environment:

```bash
# Use API key authentication instead of browser-based OAuth
export GEMINI_API_KEY='your-api-key-here'
gemini
```

### Rate limiting

If you hit the free tier's daily limit:

1. **Wait for the reset** -- The free tier limit resets daily.
2. **Use an API key** -- Configure a paid API key for higher limits.
3. **Switch to a lighter model** -- `gemini-2.5-flash` may have different rate limits.

```bash
# Check if rate limiting is the issue by looking at error messages
gemini "test prompt"

# If rate limited, switch to API key authentication
export GEMINI_API_KEY='your-paid-api-key'
```

### Network or proxy issues

If Gemini CLI cannot reach Google's servers:

```bash
# Test connectivity to Google's API
curl -I https://generativelanguage.googleapis.com

# If behind a proxy, set the proxy environment variables
export HTTP_PROXY="http://your-proxy:port"
export HTTPS_PROXY="http://your-proxy:port"

# Configure npm proxy as well (for updates)
npm config set proxy http://your-proxy:port
npm config set https-proxy http://your-proxy:port
```

### Node.js version compatibility

If you encounter errors about unsupported Node.js features:

```bash
# Check your Node.js version
node --version

# If below v18, update Node.js
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# Verify the update
node --version
```

## Related Resources

- [AI Tools Overview](/en/ai/) -- Overview of all AI tools on Debian
- [Command Line Basics](/en/basics/command-line) -- Terminal fundamentals
- [Gemini CLI GitHub Repository](https://github.com/google-gemini/gemini-cli) -- Source code and issue tracker
- [Google AI Studio](https://aistudio.google.com) -- API key management and model playground
