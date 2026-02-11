---
title: Cline Installation & Usage
description: Step-by-step guide to installing and using Cline, an autonomous AI coding agent for VS Code, on Debian.
---

# Cline

Cline is an autonomous AI coding agent that runs as a VS Code extension. With over 5 million users, it is one of the most popular AI coding tools in the VS Code ecosystem. Cline can create and edit files, run terminal commands, automate browser interactions, and integrate with the Model Context Protocol (MCP) for extended tool use. Unlike simple autocomplete tools, Cline acts as a full coding agent that can plan and execute multi-step tasks with your approval at each step.

## Prerequisites

Before installing Cline, make sure you have the following:

- **VS Code or Cursor** -- Cline is a VS Code extension and works in any VS Code-compatible editor.
- **API key** -- You need an API key from a supported AI provider (Anthropic, OpenAI, Google, OpenRouter, or others).
- **Desktop environment** -- A graphical desktop is required to run VS Code.

::: tip
Cline also works with locally hosted models through Ollama or LM Studio, so you can use it without an external API key if you run models locally.
:::

### Install VS Code

If VS Code is not already installed:

```bash
# Download the VS Code .deb package
wget -qO code.deb 'https://code.visualstudio.com/sha/download?build=stable&os=linux-deb-x64'

# Install the package
sudo dpkg -i code.deb
sudo apt install -f

# Clean up the downloaded file
rm code.deb
```

## Installation

### Method 1: VS Code Marketplace (Recommended)

The easiest way to install Cline is directly from the VS Code Extensions panel.

1. Open VS Code.
2. Press `Ctrl + Shift + X` to open the Extensions panel.
3. Search for **"Cline"** in the marketplace.
4. Click **Install** on the extension by Saoud Rizwan (publisher ID: `saoudrizwan.claude-dev`).

### Method 2: Command Line

You can install the extension from the terminal:

```bash
# Install Cline via the VS Code CLI
code --install-extension saoudrizwan.claude-dev

# Verify the extension is installed
code --list-extensions | grep claude-dev
```

### Method 3: VSIX File

If you need to install offline or a specific version:

```bash
# Download the latest VSIX from the VS Code Marketplace or GitHub releases
# Then install it manually
code --install-extension cline-*.vsix
```

## Configuration

### API Key Setup

After installing Cline, you need to configure an API provider.

1. Open VS Code.
2. Click the Cline icon in the sidebar (or press `Ctrl + Shift + P` and type "Cline").
3. In the Cline panel, click the settings gear icon.
4. Select your API provider and enter your API key.

Supported providers include:

| Provider | Models | Notes |
|----------|--------|-------|
| Anthropic | Claude Sonnet, Opus, Haiku | Direct API access |
| OpenAI | GPT-4o, GPT-4.1, o1, o3 | Direct API access |
| Google | Gemini 2.5 Pro, Flash | Direct API access |
| OpenRouter | Multiple providers | Unified API gateway |
| AWS Bedrock | Claude, other models | Enterprise option |
| Ollama | Local models | Free, runs locally |
| LM Studio | Local models | Free, runs locally |

### Using with Ollama (Local Models)

If you want to use Cline without paying for API access:

```bash
# Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Pull a coding-capable model
ollama pull qwen2.5-coder:14b

# Verify the model is available
ollama list
```

Then in Cline settings, select **Ollama** as the provider and choose your model.

### Custom Instructions

You can add custom instructions that Cline will follow in every conversation:

1. Open the Cline settings panel.
2. Find the "Custom Instructions" field.
3. Add project-specific guidelines, coding conventions, or preferred frameworks.

## Usage

### Opening Cline

There are several ways to open the Cline panel:

- Click the Cline icon in the VS Code sidebar.
- Press `Ctrl + Shift + P` and type "Cline: Open".
- Use the keyboard shortcut (configurable in VS Code keybindings).

### Basic Workflow

Cline operates as an autonomous agent with a human-in-the-loop approval model. Here is the typical workflow:

1. **Describe your task** in natural language in the Cline chat panel.
2. Cline **analyzes your codebase** and creates a plan.
3. Cline **proposes changes** -- file edits, new files, terminal commands.
4. You **review and approve** each step (or reject and guide Cline differently).
5. Cline **executes the approved changes** and continues until the task is complete.

### File References with @-Mentions

You can reference specific files in your prompts to give Cline focused context:

- `@file:src/main.py` -- Reference a specific file.
- `@folder:src/` -- Reference an entire directory.
- `@url:https://docs.example.com` -- Fetch and include web content.
- `@problems` -- Include current VS Code diagnostic problems.
- `@terminal` -- Include recent terminal output.

### Autonomous Editing

Cline can create, edit, and delete files across your project. Before making any changes, Cline shows you a diff preview:

- **Approve** the change to apply it.
- **Reject** the change and provide alternative instructions.
- **Edit** the proposed change before applying.

### Running Terminal Commands

Cline can execute terminal commands on your behalf, such as installing packages, running tests, or starting development servers. Each command requires your approval before execution.

### Browser Automation

Cline includes browser automation capabilities for testing web applications:

1. Cline can launch a headless browser.
2. Navigate to URLs and interact with pages.
3. Take screenshots and analyze the results.
4. Debug UI issues directly.

### MCP (Model Context Protocol) Support

Cline supports MCP servers, allowing it to use external tools:

```bash
# Example: Cline can connect to MCP servers for
# database access, file system tools, web scraping, and more

# MCP servers are configured in Cline's settings
# Navigate to: Cline Settings > MCP Servers
```

### Common Prompt Examples

```
Create a REST API endpoint for user registration with input validation

Refactor the database module to use connection pooling

Write unit tests for the authentication service

Find and fix the memory leak in the data processing pipeline

Set up a CI/CD pipeline with GitHub Actions for this project
```

## Update

Cline updates automatically through the VS Code extension marketplace. To manually check for updates:

1. Press `Ctrl + Shift + X` to open the Extensions panel.
2. Click on Cline in your installed extensions.
3. If an update is available, click **Update**.

Or update from the command line:

```bash
# VS Code will update extensions automatically, but you can force it
code --install-extension saoudrizwan.claude-dev --force
```

## Troubleshooting

### Cline sidebar panel does not appear

If the Cline icon is not visible in the VS Code sidebar:

```bash
# Verify the extension is installed
code --list-extensions | grep claude-dev

# If not installed, install it
code --install-extension saoudrizwan.claude-dev

# Restart VS Code
```

You can also try resetting the sidebar by right-clicking the sidebar and making sure Cline is checked.

### API connection errors

If Cline cannot connect to your API provider:

1. **Verify your API key** -- Open Cline settings and re-enter your key.
2. **Check network connectivity** -- Make sure your system can reach the API endpoint.
3. **Check proxy settings** -- If you are behind a proxy, configure VS Code proxy settings:

```bash
# Test API connectivity (example for Anthropic)
curl -I https://api.anthropic.com

# Configure VS Code proxy if needed
# Open VS Code settings (Ctrl + ,) and search for "proxy"
```

### High memory or CPU usage

Cline with large codebases can consume significant resources:

1. Limit the number of files in your workspace.
2. Use `.clineignore` to exclude large directories:

```bash
# Create a .clineignore file in your project root
cat > .clineignore << 'EOF'
node_modules/
dist/
build/
*.log
.git/
EOF
```

### Extension conflicts

If Cline conflicts with other AI extensions:

1. Disable other AI coding extensions temporarily.
2. Check the VS Code Output panel (`Ctrl + Shift + U`) for error messages.
3. Select "Cline" from the output channel dropdown to view Cline-specific logs.

### File permission errors

If Cline cannot edit files in your project:

```bash
# Check file ownership
ls -la /path/to/your/project

# Fix permissions if needed
sudo chown -R $USER:$USER /path/to/your/project
```

## Related Resources

- [AI Tools Overview](/en/ai/) -- Overview of all AI tools on Debian
- [Cursor](/en/ai/cursor) -- AI-powered IDE as an alternative editor
- [Command Line Basics](/en/basics/command-line) -- Terminal fundamentals
- [Cline Official Documentation](https://docs.cline.bot) -- Official Cline documentation
- [Cline GitHub Repository](https://github.com/cline/cline) -- Source code and issue tracker
