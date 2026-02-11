---
title: Continue Installation & Usage
description: Step-by-step guide to installing and using Continue, an open-source AI code assistant with VS Code and JetBrains support, on Debian.
---

# Continue

Continue is an open-source AI code assistant platform with over 26,000 GitHub stars. It provides AI-powered tab autocomplete, inline editing, and chat functionality through extensions for VS Code and JetBrains IDEs, as well as a standalone CLI tool. Continue is designed to be model-agnostic -- you can connect it to commercial APIs like Claude, GPT, and Gemini, or use locally hosted models through Ollama for a fully private, offline experience.

## Prerequisites

Before installing Continue, make sure you have the following:

- **VS Code, Cursor, or a JetBrains IDE** -- For the editor extension.
- **Node.js 18+** -- Required only if you want to use the standalone CLI.
- **API key or local model** -- At least one AI model provider (or Ollama for local models).

::: tip
Continue works out of the box with free trial models. You can start using it immediately without configuring an API key, though you will want to set up your preferred model for regular use.
:::

## Installation

### VS Code Extension (Recommended)

Install Continue directly from the VS Code Extensions panel.

1. Open VS Code.
2. Press `Ctrl + Shift + X` to open the Extensions panel.
3. Search for **"Continue"** in the marketplace.
4. Click **Install** on the extension by Continue (publisher ID: `continue.continue`).

Or install from the terminal:

```bash
# Install the Continue extension via CLI
code --install-extension continue.continue

# Verify the installation
code --list-extensions | grep continue
```

### JetBrains Plugin

For JetBrains IDEs (IntelliJ IDEA, PyCharm, WebStorm, etc.):

1. Open your JetBrains IDE.
2. Go to **Settings** > **Plugins** > **Marketplace**.
3. Search for **"Continue"**.
4. Click **Install** and restart the IDE.

Or install from the terminal:

```bash
# For IntelliJ-based IDEs, the plugin can also be installed via the JetBrains Toolbox
# or by downloading the .zip from the JetBrains Marketplace:
# https://plugins.jetbrains.com/plugin/22707-continue
```

### Standalone CLI

Continue also offers a CLI tool for terminal-based usage:

```bash
# Install the Continue CLI globally via npm
npm install -g @continuedev/continue-cli

# Verify the installation
continue --version
```

If you encounter permission errors with npm:

```bash
# Configure a user-level global directory for npm
mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Retry the installation
npm install -g @continuedev/continue-cli
```

## Configuration

### Configuration File

Continue stores its configuration in a JSON file. After installing the extension and opening it for the first time, Continue creates a default configuration file.

```bash
# The configuration file is located at:
# ~/.continue/config.json

# View the current configuration
cat ~/.continue/config.json
```

### Setting Up Model Providers

Edit the configuration file to add your preferred AI model providers:

```bash
# Open the config file for editing
# You can also edit this from within VS Code via the Continue settings UI

cat > ~/.continue/config.json << 'JSONEOF'
{
  "models": [
    {
      "title": "Claude Sonnet",
      "provider": "anthropic",
      "model": "claude-sonnet-4-20250514",
      "apiKey": "your-anthropic-api-key"
    },
    {
      "title": "GPT-4o",
      "provider": "openai",
      "model": "gpt-4o",
      "apiKey": "your-openai-api-key"
    },
    {
      "title": "Ollama Local",
      "provider": "ollama",
      "model": "llama3"
    }
  ],
  "tabAutocompleteModel": {
    "title": "Ollama Autocomplete",
    "provider": "ollama",
    "model": "starcoder2:3b"
  },
  "embeddingsProvider": {
    "provider": "ollama",
    "model": "nomic-embed-text"
  }
}
JSONEOF
```

::: warning
If you include API keys in the config file, make sure to restrict its permissions:
```bash
chmod 600 ~/.continue/config.json
```
:::

### Using Ollama for Local Models

For a fully offline and private experience, set up Ollama:

```bash
# Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Pull models for chat and autocomplete
ollama pull llama3
ollama pull starcoder2:3b
ollama pull nomic-embed-text

# Verify the models are available
ollama list
```

Then configure Continue to use Ollama as shown in the configuration example above. No API key is needed for local models.

### Context Providers

Continue supports various context providers that give the AI additional information about your project:

```json
{
  "contextProviders": [
    { "name": "code", "params": {} },
    { "name": "docs", "params": {} },
    { "name": "diff", "params": {} },
    { "name": "terminal", "params": {} },
    { "name": "problems", "params": {} },
    { "name": "folder", "params": {} },
    { "name": "codebase", "params": {} }
  ]
}
```

Add this section to your `~/.continue/config.json` to enable these providers.

## Usage

### Tab Autocomplete

Continue provides intelligent tab autocomplete as you type. It predicts the next code you are likely to write and offers suggestions inline.

- **Accept a suggestion**: Press `Tab`.
- **Dismiss a suggestion**: Press `Escape` or keep typing.
- **Cycle through suggestions**: Use `Alt + ]` and `Alt + [`.

### Chat Panel (Ctrl + L)

The chat panel allows you to have a conversation with the AI about your code.

1. Press `Ctrl + L` to open the Continue chat panel.
2. Type your question or instruction.
3. Continue can reference your current file, selection, or entire project.

Example prompts:

```
Explain what this function does

Write a unit test for the selected code

Refactor this class to use the strategy pattern

How can I optimize this database query?
```

### Inline Editing (Ctrl + I)

For quick, targeted edits directly in your code:

1. Select the code you want to modify (or place your cursor where you want new code).
2. Press `Ctrl + I` to open the inline editing prompt.
3. Describe the change in natural language.
4. Review the proposed diff and accept or reject it.

### Using Context References

You can reference specific files and context in your prompts:

- `@file` -- Reference a specific file.
- `@codebase` -- Search your entire codebase for relevant context.
- `@docs` -- Reference indexed documentation.
- `@terminal` -- Include recent terminal output.
- `@diff` -- Include current Git diff.
- `@problems` -- Include VS Code diagnostics.

### Keyboard Shortcuts Summary

| Shortcut | Action |
|----------|--------|
| `Tab` | Accept autocomplete suggestion |
| `Escape` | Dismiss autocomplete suggestion |
| `Ctrl + L` | Open the AI chat panel |
| `Ctrl + I` | Open inline editing prompt |
| `Ctrl + Shift + L` | Add selection to chat context |
| `Ctrl + Shift + R` | Toggle autocomplete on/off |

## Update

### Updating the VS Code Extension

Continue updates automatically through the VS Code marketplace. To manually update:

```bash
# Force update via CLI
code --install-extension continue.continue --force
```

Or update through the VS Code Extensions panel by clicking the **Update** button when available.

### Updating the CLI

```bash
# Update the Continue CLI
npm update -g @continuedev/continue-cli
```

### Uninstalling Continue

```bash
# Remove the VS Code extension
code --uninstall-extension continue.continue

# Remove the CLI tool
npm uninstall -g @continuedev/continue-cli

# Remove the configuration directory (optional)
rm -rf ~/.continue
```

## Troubleshooting

### Autocomplete not working

If tab autocomplete is not providing suggestions:

1. **Check the model is configured** -- Open `~/.continue/config.json` and verify `tabAutocompleteModel` is set.
2. **Check Ollama is running** (if using local models):

```bash
# Check if Ollama is running
systemctl status ollama

# Start Ollama if it is not running
ollama serve
```

3. **Check the Continue output log** -- In VS Code, press `Ctrl + Shift + U`, then select "Continue" from the dropdown.

### Chat panel shows an error

If the chat panel displays connection or authentication errors:

```bash
# For API-based providers, verify your API key
echo $ANTHROPIC_API_KEY

# Test connectivity to the API
curl -I https://api.anthropic.com

# For Ollama, make sure the model is downloaded
ollama list

# If the model is missing, pull it
ollama pull llama3
```

### High CPU usage during autocomplete

If autocomplete causes excessive CPU usage, especially with local models:

1. Switch to a smaller autocomplete model (e.g., `starcoder2:3b` instead of a 7B model).
2. Increase the autocomplete debounce delay in the config:

```json
{
  "tabAutocompleteOptions": {
    "debounceDelay": 500
  }
}
```

3. Disable autocomplete for large files by setting a file size limit.

### Extension conflicts with other AI tools

If Continue conflicts with other AI extensions (such as GitHub Copilot or Cline):

1. Disable the conflicting extension temporarily.
2. Check if keyboard shortcuts overlap -- open **Preferences > Keyboard Shortcuts** and search for conflicts.
3. Reassign shortcuts as needed to avoid collisions.

### Configuration file syntax errors

If Continue stops working after editing the config:

```bash
# Validate the JSON syntax
python3 -m json.tool ~/.continue/config.json

# If validation fails, fix the JSON errors or reset the config
# Back up the current config first
cp ~/.continue/config.json ~/.continue/config.json.bak

# Reset to default by deleting the config (Continue will recreate it)
rm ~/.continue/config.json
```

## Related Resources

- [AI Tools Overview](/en/ai/) -- Overview of all AI tools on Debian
- [Claude Code](/en/ai/claude-code) -- Terminal-based AI coding assistant
- [Command Line Basics](/en/basics/command-line) -- Terminal fundamentals
- [Continue Official Website](https://continue.dev) -- Official documentation
- [Continue GitHub Repository](https://github.com/continuedev/continue) -- Source code and issue tracker
