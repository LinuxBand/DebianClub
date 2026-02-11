---
title: Zed Editor Installation & Usage
description: Step-by-step guide to installing and using Zed, a high-performance Rust-based code editor with built-in AI features, on Debian.
---

# Zed Editor

Zed is a high-performance code editor written in Rust by the original creators of Atom and Tree-sitter. It is designed from the ground up for speed, featuring GPU-accelerated rendering, near-instant startup, and minimal memory usage compared to Electron-based editors. Zed includes built-in AI integration with support for multiple LLM providers, real-time collaboration, and an Agent Panel for autonomous AI-assisted editing. If you value performance and want a modern editor with native AI capabilities, Zed is an excellent choice.

## Prerequisites

Before installing Zed, make sure you have the following:

- **64-bit Linux** -- x86_64 (amd64) architecture required.
- **glibc 2.29+** -- Debian 11 (Bullseye) or later meets this requirement.
- **Desktop environment** -- A graphical desktop with a Wayland or X11 display server.
- **Vulkan drivers** (recommended) -- For GPU-accelerated rendering. OpenGL is used as a fallback.

### Install Vulkan Drivers (Recommended)

For the best rendering performance, install Vulkan drivers for your GPU:

```bash
# For Intel GPUs
sudo apt install -y mesa-vulkan-drivers

# For AMD GPUs
sudo apt install -y mesa-vulkan-drivers

# For NVIDIA GPUs (proprietary drivers)
sudo apt install -y nvidia-vulkan-icd

# Verify Vulkan is available
sudo apt install -y vulkan-tools
vulkaninfo --summary
```

## Installation

### Method 1: Official Installer Script (Recommended)

Zed provides an official installer script that handles everything automatically:

```bash
# Download and run the Zed installer
curl -f https://zed.dev/install.sh | sh

# The installer places the Zed binary in ~/.local/bin
# Refresh your shell environment
source ~/.bashrc

# Verify the installation
zed --version
```

The installer also creates a desktop entry so Zed appears in your application menu.

### Method 2: Manual Tarball Installation

If you prefer a manual installation:

```bash
# Download the latest Linux tarball
curl -fLO https://zed.dev/api/releases/stable/latest/zed-linux-x86_64.tar.gz

# Extract to a local directory
mkdir -p ~/.local/lib
tar -xzf zed-linux-x86_64.tar.gz -C ~/.local/lib

# Create a symlink to make zed available in PATH
ln -sf ~/.local/lib/zed.app/bin/zed ~/.local/bin/zed

# Make sure ~/.local/bin is in your PATH
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Verify the installation
zed --version

# Clean up the downloaded archive
rm zed-linux-x86_64.tar.gz
```

### Method 3: Flatpak

Zed is also available as a Flatpak:

```bash
# Install Flatpak if not already installed
sudo apt install -y flatpak

# Add the Flathub repository
flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo

# Install Zed
flatpak install flathub dev.zed.Zed

# Run Zed via Flatpak
flatpak run dev.zed.Zed
```

### Launching Zed

```bash
# Launch Zed
zed

# Open a specific project directory
zed /path/to/project

# Open a specific file
zed file.py
```

## Configuration

Zed uses a JSON-based configuration system. Settings are stored in `~/.config/zed/settings.json`.

### Open Settings

You can open the settings file directly from within Zed:

1. Press `Ctrl + ,` to open settings.
2. Or use the command palette: `Ctrl + Shift + P` and type "Open Settings".

### AI Provider Setup

Zed supports multiple AI providers for its built-in AI features. Configure them in your settings file:

```bash
# Open or create the Zed settings file
mkdir -p ~/.config/zed
cat > ~/.config/zed/settings.json << 'EOF'
{
  "language_model": {
    "version": "2",
    "providers": {
      "anthropic": {
        "api_key": "your-anthropic-api-key"
      },
      "openai": {
        "api_key": "your-openai-api-key"
      },
      "google": {
        "api_key": "your-google-api-key"
      }
    },
    "default_model": {
      "provider": "anthropic",
      "model": "claude-sonnet-4-20250514"
    }
  }
}
EOF
```

::: warning
Keep your API keys secret. Restrict the settings file permissions:
```bash
chmod 600 ~/.config/zed/settings.json
```
:::

### Using Ollama for Local Models

For a private, offline AI experience with locally hosted models:

```bash
# Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Pull a coding model
ollama pull llama3
ollama pull codellama

# Verify the models
ollama list
```

Then configure Zed to use Ollama:

```json
{
  "language_model": {
    "version": "2",
    "providers": {
      "ollama": {
        "api_url": "http://localhost:11434"
      }
    },
    "default_model": {
      "provider": "ollama",
      "model": "llama3"
    }
  }
}
```

### Theme and Appearance

Zed includes several built-in themes. You can change the theme in settings:

```json
{
  "theme": {
    "mode": "system",
    "light": "One Light",
    "dark": "One Dark"
  },
  "ui_font_size": 16,
  "buffer_font_size": 14,
  "buffer_font_family": "JetBrains Mono"
}
```

### Vim Mode

If you prefer Vim keybindings, Zed has built-in Vim emulation:

```json
{
  "vim_mode": true
}
```

## Features

### Performance

Zed's key differentiator is performance. Built in Rust with GPU-accelerated rendering:

- **Startup time**: Near-instant, even with large projects.
- **Memory usage**: Significantly lower than Electron-based editors like VS Code.
- **Rendering**: GPU-accelerated text rendering for smooth scrolling and editing.
- **Large files**: Handles large files without lag.

### AI Inline Assist

Zed's inline assist lets you edit code with AI directly in the editor:

1. Select code you want to modify (or place your cursor where you want new code).
2. Press `Ctrl + Enter` to open the inline assist prompt.
3. Describe the change in natural language.
4. Review the proposed changes and accept or reject them.

### Agent Panel

The Agent Panel provides a chat-based AI interface for complex tasks:

1. Open the Agent Panel from the sidebar or via the command palette.
2. Describe your task or ask a question.
3. The agent can read files, propose edits, and reason about your codebase.

### Real-Time Collaboration

Zed includes built-in collaboration features:

1. Share your workspace with teammates.
2. Edit the same files simultaneously with real-time cursors.
3. Voice chat and screen sharing built in.

To start a collaboration session:

1. Click the collaboration icon in the top-right corner.
2. Create or join a shared project.
3. Share the invite link with teammates.

### Tree-sitter Integration

Zed uses Tree-sitter for syntax highlighting and code understanding, providing:

- Accurate syntax highlighting for dozens of languages.
- Structural code navigation.
- Intelligent code folding based on syntax structure.

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + P` | Quick file open |
| `Ctrl + Shift + P` | Command palette |
| `Ctrl + ,` | Open settings |
| `Ctrl + Enter` | AI inline assist |
| `Ctrl + Shift + F` | Search across project |
| `Ctrl + B` | Toggle sidebar |
| `Ctrl + \`` | Toggle terminal panel |
| `Ctrl + /` | Toggle line comment |
| `F2` | Rename symbol |
| `F12` | Go to definition |

## Update

### Updating Zed (Installer Method)

If you installed Zed via the official script, re-run it to update:

```bash
# Re-run the installer to update to the latest version
curl -f https://zed.dev/install.sh | sh

# Verify the new version
zed --version
```

Zed also checks for updates automatically and will notify you when a new version is available.

### Updating Zed (Flatpak)

```bash
# Update Zed via Flatpak
flatpak update dev.zed.Zed
```

### Uninstalling Zed

```bash
# Remove the Zed binary and app directory
rm -rf ~/.local/lib/zed.app
rm -f ~/.local/bin/zed

# Remove the desktop entry
rm -f ~/.local/share/applications/dev.zed.Zed.desktop

# Remove configuration files (optional)
rm -rf ~/.config/zed

# For Flatpak installations
flatpak uninstall dev.zed.Zed
```

## Troubleshooting

### Zed fails to launch -- Vulkan errors

If Zed crashes on launch with Vulkan-related errors:

```bash
# Check if Vulkan drivers are installed
vulkaninfo --summary

# If Vulkan is not available, install the appropriate drivers
# For Intel/AMD
sudo apt install -y mesa-vulkan-drivers

# For NVIDIA
sudo apt install -y nvidia-vulkan-icd

# As a fallback, try launching Zed with OpenGL instead of Vulkan
# (Check Zed documentation for the latest flag)
```

### Blank or corrupted rendering

If the editor displays garbled text or blank areas:

```bash
# Try launching with software rendering
LIBGL_ALWAYS_SOFTWARE=1 zed

# Or disable GPU rendering
ZED_DISABLE_GPU=1 zed
```

If software rendering fixes the issue, update your GPU drivers to the latest available version.

### "command not found" after installation

If `zed` is not recognized after running the installer:

```bash
# Check if ~/.local/bin is in your PATH
echo $PATH | tr ':' '\n' | grep local

# Add it to PATH if missing
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Verify the binary exists
ls -la ~/.local/bin/zed
```

### AI features not working

If the AI assistant does not respond:

1. **Check your API key** -- Open settings (`Ctrl + ,`) and verify the key is correct.
2. **Check network connectivity**:

```bash
# Test connectivity to the AI provider
curl -I https://api.anthropic.com
curl -I https://api.openai.com
```

3. **Check Ollama** (if using local models):

```bash
# Make sure Ollama is running
systemctl status ollama

# Start Ollama if needed
ollama serve
```

### Wayland compatibility issues

If you experience issues on Wayland:

```bash
# Force Zed to use X11 via XWayland
WAYLAND_DISPLAY="" zed

# Or set the display server explicitly
GDK_BACKEND=x11 zed
```

### High CPU usage

If Zed uses excessive CPU:

1. Check for extensions or language servers consuming resources -- open the command palette and search for "Language Server" status.
2. Reduce the number of open files and split panes.
3. Disable features you do not use (like real-time collaboration).

### Font rendering issues

If fonts look blurry or incorrect:

```json
{
  "buffer_font_family": "Monospace",
  "buffer_font_size": 14,
  "buffer_font_features": {
    "calt": true,
    "liga": true
  }
}
```

Install popular programming fonts for best results:

```bash
# Install common monospace fonts
sudo apt install -y fonts-jetbrains-mono fonts-firacode
```

## Related Resources

- [AI Tools Overview](/en/ai/) -- Overview of all AI tools on Debian
- [Cursor](/en/ai/cursor) -- Alternative AI-powered IDE
- [Desktop Environments](/en/basics/desktop-environments) -- Choosing a desktop for Debian
- [Zed Official Website](https://zed.dev) -- Downloads and documentation
- [Zed GitHub Repository](https://github.com/zed-industries/zed) -- Source code and issue tracker
