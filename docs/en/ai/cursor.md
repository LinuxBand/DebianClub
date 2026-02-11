---
title: Cursor Installation & Usage
description: Step-by-step guide to installing and configuring Cursor, an AI-powered code editor built on VS Code, on Debian.
---

# Cursor AI Editor

Cursor is an AI-powered code editor built on the VS Code architecture. It comes with a built-in AI assistant, intelligent code completion, conversational programming capabilities, and advanced code refactoring tools. If you are already familiar with VS Code, you will feel right at home with Cursor.

## Prerequisites

- **Architecture**: 64-bit x86_64 or ARM64 processor
- **RAM**: 4 GB minimum (8 GB or more recommended)
- **Desktop environment**: GNOME, KDE Plasma, Xfce, or any other graphical desktop
- **Display**: 1024x768 resolution or higher

## Installation

### Method 1: .deb Package (Recommended)

The `.deb` package is the cleanest way to install Cursor on Debian. It integrates with the system package manager and places menu entries automatically.

1. Visit [https://www.cursor.com/downloads](https://www.cursor.com/downloads) and download the `.deb` package for Linux.

2. Install the package:

```bash
# Install the downloaded .deb package
sudo dpkg -i cursor_*.deb

# Fix any missing dependencies
sudo apt install -f
```

### Method 2: AppImage

AppImage files are portable and do not require installation. This method is useful if you want to test Cursor without modifying your system.

1. Visit [https://www.cursor.com/downloads](https://www.cursor.com/downloads) and download the AppImage for Linux.

2. Make it executable and run:

```bash
# Make the AppImage executable
chmod +x Cursor-*.AppImage

# Run Cursor
./Cursor-*.AppImage
```

3. (Optional) Create a desktop shortcut so Cursor appears in your application menu:

```bash
# Create the applications directory if it does not exist
mkdir -p ~/.local/share/applications

# Create a desktop entry file
cat > ~/.local/share/applications/cursor.desktop << 'EOF'
[Desktop Entry]
Name=Cursor
Comment=AI-powered code editor
Exec=/home/your-username/Applications/Cursor.AppImage
Icon=cursor
Type=Application
Categories=Development;IDE;TextEditor;
StartupWMClass=Cursor
EOF
```

::: tip
Replace `/home/your-username/Applications/Cursor.AppImage` with the actual path where you placed the AppImage file.
:::

::: warning
AppImage requires `libfuse2` on Debian. If Cursor fails to launch, install it first:
```bash
sudo apt install libfuse2
```
:::

## Basic Configuration

### Account Login

When you first launch Cursor, you will be prompted to sign in or create an account. A free tier is available with limited AI usage, while paid plans unlock full functionality.

### AI Model Selection

Cursor supports multiple AI models. You can select your preferred model in the settings:

1. Open Settings with `Ctrl + ,`
2. Search for "AI model" or navigate to the AI section
3. Choose from available models (GPT-4, Claude, etc.)

### Essential Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + K` | Open the AI code editing prompt -- type a natural language instruction to modify selected code |
| `Ctrl + L` | Open the AI chat panel for conversational interactions |
| `Ctrl + I` | Open Composer for multi-file AI-assisted editing |
| `Ctrl + Shift + P` | Open the command palette |
| `Ctrl + P` | Quick file open |
| `Ctrl + `` ` | Toggle the integrated terminal |

## Migrating from VS Code

Cursor is built on VS Code, so migration is straightforward.

### Import Extensions

On first launch, Cursor will offer to import your VS Code extensions and settings automatically. You can also do this manually:

1. Open the Command Palette (`Ctrl + Shift + P`)
2. Type "Import" and select the VS Code import option
3. Follow the prompts to transfer extensions, settings, and keybindings

### Manual Settings Migration

If automatic import is not available, you can copy your VS Code configuration files manually:

```bash
# Copy VS Code settings to Cursor
cp -r ~/.config/Code/User/settings.json ~/.config/Cursor/User/
cp -r ~/.config/Code/User/keybindings.json ~/.config/Cursor/User/

# Copy extensions
cp -r ~/.vscode/extensions ~/.cursor/extensions
```

::: tip
After migrating extensions, restart Cursor to ensure all extensions load correctly.
:::

## Updating Cursor

### .deb Package

When a new version is available, download the latest `.deb` file from the Cursor website and install it over the existing version:

```bash
# Download the latest .deb and install
sudo dpkg -i cursor_*.deb
sudo apt install -f
```

### AppImage

Simply download the new AppImage file and replace the old one:

```bash
# Remove the old version
rm ~/Applications/Cursor-old.AppImage

# Make the new version executable
chmod +x Cursor-*.AppImage
```

## Troubleshooting

### Black or blank screen on launch

This is typically caused by GPU acceleration issues. Try launching Cursor with GPU acceleration disabled:

```bash
# Launch with GPU acceleration disabled
./Cursor-*.AppImage --disable-gpu
```

If this resolves the issue, you can make the flag permanent by editing your desktop shortcut or alias.

### Input method (IBus/Fcitx) not working

If your input method does not work inside Cursor, set the following environment variables before launching:

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

You can add these lines to your `~/.bashrc` or `~/.profile` for persistence.

### AppImage fails to launch -- libfuse2 missing

Debian 12 and later do not include `libfuse2` by default. Install it:

```bash
sudo apt install libfuse2
```

### High memory usage

Cursor, like VS Code, can consume significant memory with many extensions. To reduce memory usage:

```bash
# Launch with a lower memory limit
./Cursor-*.AppImage --max-memory=4096
```

Also consider disabling unused extensions via the Extensions panel (`Ctrl + Shift + X`).

## Related Resources

- [AI Tools Overview](/en/ai/) -- Overview of all AI tools on Debian
- [Desktop Environments](/en/basics/desktop-environments) -- Choosing a desktop for Debian
- [Cursor Official Website](https://www.cursor.com) -- Downloads and documentation
