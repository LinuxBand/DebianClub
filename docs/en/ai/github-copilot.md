---
title: GitHub Copilot CLI Installation & Usage
description: Step-by-step guide to installing and using GitHub Copilot, GitHub's official AI coding assistant with CLI and editor extensions, on Debian.
---

# GitHub Copilot

GitHub Copilot is GitHub's official AI-powered coding assistant. It provides intelligent code completions, chat-based programming help, and a command-line tool that can suggest and explain shell commands. With deep integration into the GitHub ecosystem, Copilot works seamlessly with repositories, pull requests, and issues. The CLI extension brings AI assistance directly to your terminal, while editor extensions provide inline completions in VS Code, JetBrains, and other editors.

## Prerequisites

Before installing GitHub Copilot, make sure you have the following:

- **GitHub account** -- Required for authentication.
- **GitHub Copilot subscription** -- Copilot requires an active subscription (Individual, Business, or Enterprise). A free tier with limited usage is available for verified students, teachers, and open-source maintainers.
- **GitHub CLI (`gh`)** -- Required for the Copilot CLI extension.

::: tip
You can check your Copilot subscription status at [github.com/settings/copilot](https://github.com/settings/copilot).
:::

## Installation

### Step 1: Install the GitHub CLI

The GitHub CLI (`gh`) is the foundation for the Copilot command-line extension.

```bash
# Install the GitHub CLI from the official Debian repository
sudo apt update
sudo apt install -y gh

# Verify the installation
gh --version
```

If `gh` is not available in your Debian repositories, install it from the official source:

```bash
# Add the GitHub CLI repository
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null

# Install gh
sudo apt update
sudo apt install -y gh
```

### Step 2: Authenticate with GitHub

Log in to your GitHub account through the CLI:

```bash
# Start the authentication flow
gh auth login

# Follow the prompts:
# 1. Select "GitHub.com"
# 2. Choose your preferred authentication method (browser or token)
# 3. Complete the login process
```

Verify your authentication:

```bash
# Check authentication status
gh auth status
```

### Step 3: Install the Copilot CLI Extension

```bash
# Install the GitHub Copilot CLI extension
gh extension install github/gh-copilot

# Verify the installation
gh copilot --version
```

### Installing the VS Code Extension

For editor-based Copilot features:

```bash
# Install the GitHub Copilot extension for VS Code
code --install-extension GitHub.copilot

# Install the Copilot Chat extension for conversational AI
code --install-extension GitHub.copilot-chat

# Verify the extensions are installed
code --list-extensions | grep -i copilot
```

## Configuration

### CLI Configuration

The Copilot CLI extension works out of the box once authenticated. You can configure optional settings:

```bash
# Set an alias for quicker access
echo 'alias gcs="gh copilot suggest"' >> ~/.bashrc
echo 'alias gce="gh copilot explain"' >> ~/.bashrc
source ~/.bashrc
```

### VS Code Configuration

After installing the VS Code extensions:

1. Open VS Code.
2. Sign in to your GitHub account when prompted.
3. Copilot will activate automatically once authenticated.

You can customize Copilot behavior in VS Code settings (`Ctrl + ,`):

- **Enable/disable inline suggestions** -- Search for "copilot.enable".
- **Configure language-specific behavior** -- You can enable or disable Copilot for specific programming languages.
- **Adjust suggestion display** -- Configure when and how suggestions appear.

## Usage

### CLI: Suggest Commands

The `gh copilot suggest` command generates shell commands based on natural language descriptions:

```bash
# Get a command suggestion
gh copilot suggest "find all Python files modified in the last 7 days"

# Suggest a Git command
gh copilot suggest "squash the last 3 commits into one"

# Suggest a system administration command
gh copilot suggest "list all listening ports on the system"

# Suggest a command for a specific shell
gh copilot suggest -t shell "compress all log files in /var/log older than 30 days"
```

When Copilot suggests a command, you can:

- **Run it** directly from the prompt.
- **Copy it** to your clipboard.
- **Revise it** by providing additional context.
- **Rate it** to help improve future suggestions.

### CLI: Explain Commands

The `gh copilot explain` command breaks down complex shell commands into plain language:

```bash
# Explain a complex command
gh copilot explain "find . -type f -name '*.log' -mtime +30 -exec gzip {} \;"

# Explain a Git command
gh copilot explain "git rebase -i HEAD~5"

# Explain a networking command
gh copilot explain "ss -tulnp"

# Explain a pipeline
gh copilot explain "ps aux | awk '{print \$2, \$11}' | sort -k2"
```

### VS Code: Inline Completions

In VS Code, Copilot provides real-time code suggestions as you type:

- **Accept a suggestion**: Press `Tab`.
- **Dismiss a suggestion**: Press `Escape`.
- **See alternative suggestions**: Press `Alt + ]` or `Alt + [`.
- **Trigger a suggestion manually**: Press `Alt + \`.

### VS Code: Copilot Chat

Open the Copilot Chat panel for conversational interactions:

1. Press `Ctrl + Shift + I` to open Copilot Chat.
2. Ask questions about your code, request explanations, or describe changes you want.
3. Use `@workspace` to reference your entire project context.

Example prompts:

```
@workspace How does the authentication module work?

Explain the error in the selected code

Write a unit test for this function

Refactor this code to improve performance
```

### VS Code Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Tab` | Accept inline suggestion |
| `Escape` | Dismiss suggestion |
| `Alt + ]` | Next suggestion |
| `Alt + [` | Previous suggestion |
| `Alt + \` | Trigger suggestion manually |
| `Ctrl + Shift + I` | Open Copilot Chat |

## Update

### Updating the CLI Extension

```bash
# Update the Copilot CLI extension
gh extension upgrade github/gh-copilot

# Verify the new version
gh copilot --version
```

### Updating the VS Code Extensions

VS Code extensions update automatically. To manually check:

1. Press `Ctrl + Shift + X` to open the Extensions panel.
2. Check for available updates on the GitHub Copilot extensions.

Or force an update from the terminal:

```bash
# Force reinstall the latest version
code --install-extension GitHub.copilot --force
code --install-extension GitHub.copilot-chat --force
```

### Uninstalling

```bash
# Remove the CLI extension
gh extension remove github/gh-copilot

# Remove the VS Code extensions
code --uninstall-extension GitHub.copilot
code --uninstall-extension GitHub.copilot-chat
```

## Troubleshooting

### "gh copilot" command not found

If `gh copilot` is not recognized after installation:

```bash
# Check installed extensions
gh extension list

# If gh-copilot is not listed, reinstall it
gh extension install github/gh-copilot

# If gh itself is not found, check your PATH
which gh
```

### Authentication issues

If Copilot cannot authenticate:

```bash
# Check your current authentication status
gh auth status

# If not authenticated, re-login
gh auth login

# Refresh your authentication token
gh auth refresh -s copilot
```

### Copilot not providing suggestions in VS Code

If inline completions are not appearing:

1. **Check subscription** -- Make sure your Copilot subscription is active at [github.com/settings/copilot](https://github.com/settings/copilot).
2. **Check extension status** -- Look for the Copilot icon in the VS Code status bar. A spinning icon means it is processing; a crossed-out icon means it is disabled.
3. **Check language support** -- Copilot may be disabled for certain file types. Go to Settings and search for "copilot.enable".
4. **Restart VS Code** -- Sometimes a simple restart resolves connectivity issues.

### Network or proxy errors

If you are behind a corporate proxy:

```bash
# Configure Git proxy settings (used by gh)
git config --global http.proxy http://your-proxy:port
git config --global https.proxy http://your-proxy:port

# Set environment variables for the CLI
export HTTP_PROXY="http://your-proxy:port"
export HTTPS_PROXY="http://your-proxy:port"

# Test connectivity
gh api rate_limit
```

### Rate limiting or quota errors

If you hit usage limits:

1. Check your subscription tier -- free tier has limited monthly usage.
2. Wait for the rate limit to reset (usually resets monthly).
3. Consider upgrading to a paid plan for higher limits.

```bash
# Check your current rate limit status
gh api rate_limit
```

## Related Resources

- [AI Tools Overview](/en/ai/) -- Overview of all AI tools on Debian
- [Command Line Basics](/en/basics/command-line) -- Terminal fundamentals
- [GitHub Copilot Documentation](https://docs.github.com/en/copilot) -- Official GitHub Copilot docs
- [GitHub CLI Documentation](https://cli.github.com/manual/) -- Official gh CLI manual
