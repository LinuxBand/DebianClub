---
title: Windsurf Installation & Usage
description: Step-by-step guide to installing and using Windsurf, the AI agent-powered IDE by Codeium, on Debian.
---

# Windsurf

Windsurf is the first AI agent-powered IDE, developed by Codeium. Built on the VS Code architecture, Windsurf goes beyond traditional code editors by deeply integrating AI capabilities at every level. Its flagship feature, Cascade, is an AI agent that can reason across your entire codebase, make multi-file edits, run terminal commands, and maintain context throughout long development sessions. If you are familiar with VS Code, you will find Windsurf immediately comfortable, with the added benefit of a deeply integrated AI workflow.

## Prerequisites

Before installing Windsurf, make sure you have the following:

- **Debian 10 (Buster) or later** -- Windsurf supports Debian 10 and all newer releases.
- **64-bit architecture** -- x86_64 (amd64) processor required.
- **Desktop environment** -- GNOME, KDE Plasma, Xfce, or any other graphical desktop.
- **RAM**: 4 GB minimum (8 GB or more recommended).
- **Display**: 1024x768 resolution or higher.

## Installation

### Method 1: APT Repository (Recommended)

Setting up the official Windsurf APT repository allows you to install and update Windsurf through the system package manager.

```bash
# Install prerequisites
sudo apt update
sudo apt install -y curl gpg apt-transport-https

# Download and install the Windsurf GPG key
curl -fsSL https://windsurf-stable.codeiumdata.com/wVxQEIFkbUDsNBIWBJakLA/windsurf.gpg | sudo gpg --dearmor -o /usr/share/keyrings/windsurf-stable-archive-keyring.gpg

# Add the Windsurf APT repository
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/windsurf-stable-archive-keyring.gpg] https://windsurf-stable.codeiumdata.com/wVxQEIFkbUDsNBIWBJakLA/apt stable main" | sudo tee /etc/apt/sources.list.d/windsurf.list > /dev/null

# Update the package lists and install Windsurf
sudo apt update
sudo apt install -y windsurf
```

### Method 2: .deb Package

If you prefer to install from a downloaded package:

1. Visit [https://codeium.com/windsurf/download](https://codeium.com/windsurf/download) and download the `.deb` package for Linux.

2. Install the package:

```bash
# Install the downloaded .deb package
sudo dpkg -i windsurf_*.deb

# Fix any missing dependencies
sudo apt install -f
```

### Launching Windsurf

After installation, launch Windsurf from your application menu or the terminal:

```bash
# Launch Windsurf from the terminal
windsurf

# Open a specific project directory
windsurf /path/to/project

# Open a specific file
windsurf file.py
```

## Configuration

### Account Login

When you first launch Windsurf, you will be prompted to create a Codeium account or sign in. A free tier is available with AI features included.

1. Launch Windsurf.
2. Click **Sign In** or **Create Account** when prompted.
3. Complete the authentication flow in your browser.

### AI Model Settings

Windsurf allows you to configure which AI model powers the Cascade agent and code completions:

1. Open Settings with `Ctrl + ,`.
2. Search for "Windsurf" or "Cascade" in the settings.
3. Configure your preferred model and behavior settings.

### Importing VS Code Settings

If you are migrating from VS Code, Windsurf can import your settings, extensions, and keybindings:

1. On first launch, Windsurf offers to import VS Code settings automatically.
2. Follow the prompts to transfer your configuration.

To import manually:

```bash
# Copy VS Code settings to Windsurf
cp -r ~/.config/Code/User/settings.json ~/.config/Windsurf/User/
cp -r ~/.config/Code/User/keybindings.json ~/.config/Windsurf/User/

# Copy VS Code extensions
cp -r ~/.vscode/extensions ~/.windsurf/extensions
```

::: tip
After importing extensions, restart Windsurf to ensure all extensions load correctly.
:::

### Proxy Configuration

If you are behind a corporate proxy:

```bash
# Set proxy environment variables before launching Windsurf
export HTTP_PROXY="http://your-proxy:port"
export HTTPS_PROXY="http://your-proxy:port"

# Or configure in Windsurf settings
# Open Settings (Ctrl + ,) and search for "proxy"
```

## Features

### Cascade AI Agent

Cascade is Windsurf's flagship AI feature. It operates as an autonomous agent that understands your entire codebase and can perform complex, multi-step tasks.

**How to use Cascade:**

1. Open the Cascade panel from the sidebar or press the designated shortcut.
2. Describe your task in natural language.
3. Cascade analyzes your codebase, creates a plan, and proposes changes.
4. Review and approve each step.

Cascade can:

- **Edit multiple files** simultaneously to implement features.
- **Run terminal commands** such as installing dependencies or running tests.
- **Search your codebase** for relevant context before making changes.
- **Maintain conversation context** across long development sessions.

### Inline Editing

For quick, targeted code modifications:

1. Select the code you want to modify.
2. Press `Ctrl + I` to open the inline editing prompt.
3. Describe the change in natural language.
4. Review and accept the proposed diff.

### Tab Autocomplete

Windsurf provides intelligent code completions as you type, powered by Codeium's AI:

- **Accept a suggestion**: Press `Tab`.
- **Dismiss**: Press `Escape`.
- **Cycle through suggestions**: Use `Alt + ]` and `Alt + [`.

### Multi-File Context Awareness

Windsurf's AI understands your entire project structure, not just the current file. When you ask Cascade for help, it automatically searches relevant files for context, making its suggestions more accurate and project-aware.

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + I` | Open inline editing prompt |
| `Ctrl + L` | Open Cascade chat panel |
| `Ctrl + Shift + P` | Open the command palette |
| `Ctrl + P` | Quick file open |
| `Tab` | Accept autocomplete suggestion |
| `Escape` | Dismiss suggestion |
| `` Ctrl + ` `` | Toggle integrated terminal |

## Update

### Updating via APT

If you installed Windsurf through the APT repository, updates are handled by the system package manager:

```bash
# Update Windsurf along with other system packages
sudo apt update
sudo apt upgrade windsurf
```

### Updating a .deb Installation

Download the latest `.deb` file from the Windsurf website and install it over the existing version:

```bash
# Download the latest .deb and install
sudo dpkg -i windsurf_*.deb
sudo apt install -f
```

### Uninstalling Windsurf

```bash
# Remove Windsurf
sudo apt remove windsurf

# Remove Windsurf and its configuration files
sudo apt purge windsurf

# Remove the APT repository (optional)
sudo rm /etc/apt/sources.list.d/windsurf.list
sudo rm /usr/share/keyrings/windsurf-stable-archive-keyring.gpg
sudo apt update
```

## Troubleshooting

### Black or blank screen on launch

This is typically caused by GPU acceleration issues:

```bash
# Launch Windsurf with GPU acceleration disabled
windsurf --disable-gpu
```

If this resolves the issue, you can make the flag permanent by adding it to your desktop shortcut or creating a shell alias:

```bash
# Create a permanent alias
echo 'alias windsurf="windsurf --disable-gpu"' >> ~/.bashrc
source ~/.bashrc
```

### GPG key or repository errors during installation

If you encounter errors when adding the APT repository:

```bash
# Re-download the GPG key
sudo rm /usr/share/keyrings/windsurf-stable-archive-keyring.gpg
curl -fsSL https://windsurf-stable.codeiumdata.com/wVxQEIFkbUDsNBIWBJakLA/windsurf.gpg | sudo gpg --dearmor -o /usr/share/keyrings/windsurf-stable-archive-keyring.gpg

# Update package lists
sudo apt update
```

### Input method (IBus/Fcitx) not working

If your input method does not work inside Windsurf, set the following environment variables before launching:

```bash
# For IBus
export GTK_IM_MODULE=ibus
export XMODIFIERS=@im=ibus
export QT_IM_MODULE=ibus

# For Fcitx
export GTK_IM_MODULE=fcitx
export XMODIFIERS=@im=fcitx
export QT_IM_MODULE=fcitx
```

Add these lines to your `~/.bashrc` or `~/.profile` for persistence.

### AI features not responding

If Cascade or autocomplete stops working:

1. **Check your internet connection** -- AI features require a network connection.
2. **Check your account status** -- Make sure you are signed in and your subscription is active.
3. **Restart Windsurf** -- Sometimes a restart resolves temporary connection issues.
4. **Check the output panel** -- Press `Ctrl + Shift + U` and select "Windsurf" or "Codeium" from the dropdown to see error messages.

```bash
# Test connectivity to Codeium's servers
curl -I https://api.codeium.com
```

### High memory usage

Windsurf, like VS Code, can consume significant memory with many extensions and large projects:

```bash
# Launch with a lower memory limit
windsurf --max-memory=4096

# Disable unused extensions to reduce memory
# Open Extensions panel (Ctrl + Shift + X) and disable unnecessary ones
```

### Extension compatibility issues

Most VS Code extensions work with Windsurf, but some may have compatibility issues:

1. Check the extension's marketplace page for known issues with Windsurf.
2. Try disabling recently installed extensions to isolate the conflict.
3. Report incompatible extensions to the Windsurf team or the extension developer.

## Related Resources

- [AI Tools Overview](/en/ai/) -- Overview of all AI tools on Debian
- [Cursor](/en/ai/cursor) -- Alternative AI-powered IDE
- [Desktop Environments](/en/basics/desktop-environments) -- Choosing a desktop for Debian
- [Windsurf Official Website](https://codeium.com/windsurf) -- Downloads and documentation
