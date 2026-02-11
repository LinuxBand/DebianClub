---
title: OpenClaw Installation & Usage
description: Step-by-step guide to installing and using OpenClaw, a self-hosted AI Agent platform, on Debian.
---

# OpenClaw

OpenClaw is a self-hosted AI Agent platform designed for running AI agents locally on your own hardware. It supports multiple AI models, provides a web-based management interface, and gives you full control over your AI workflows without relying on third-party hosted services.

## Prerequisites

- **Internet connection** -- Required to download the installer and communicate with AI providers.
- **AI provider API key** -- At least one of the following:
  - Anthropic API key
  - OpenAI API key
  - Other supported provider keys
- **Debian 12 or later** -- The install script is designed for modern Debian-based systems.

## Installation

### Install Using the Official Script

The official install script downloads the latest release and sets up the necessary system components.

```bash
# Download and run the installer
curl -fsSL https://openclaw.ai/install.sh | bash
```

### Run the Setup Wizard

After installation, run the onboarding wizard to configure your API keys and initial settings.

```bash
# Start the interactive setup wizard
openclaw onboard
```

The wizard will guide you through:

1. Selecting your AI provider(s)
2. Entering your API key(s)
3. Configuring default agent behavior
4. Setting up the web dashboard

## Configuration & Usage

### Starting the Service

After the initial setup, start the OpenClaw service:

```bash
# Start OpenClaw
openclaw start

# Check service status
openclaw status

# Stop the service
openclaw stop
```

### Web Dashboard

Once OpenClaw is running, access the management dashboard through your browser:

```
http://127.0.0.1:18789/
```

The dashboard provides:

- **Agent Management** -- Create, configure, and monitor AI agents
- **Task Queue** -- View running and queued tasks
- **Model Configuration** -- Switch between AI models and adjust parameters
- **Logs & History** -- Review agent activity and conversation history

### Managing Agents

You can create and manage agents through the web interface or the command line:

```bash
# List running agents
openclaw agents list

# View detailed agent info
openclaw agents info <agent-name>
```

### API Key Management

If you need to add or update API keys after the initial setup:

```bash
# Re-run the onboard wizard
openclaw onboard

# Or edit the configuration file directly
nano ~/.config/openclaw/config.yaml
```

## Security Considerations

::: warning Important Security Notice
OpenClaw runs a web server on your local machine. If you are operating on a server or shared network, take the following precautions:

- **Change default credentials** -- If OpenClaw provides default login credentials, change them immediately after setup.
- **Do not expose to the public internet** -- The default configuration binds to `127.0.0.1` (localhost only). Do not change this to `0.0.0.0` or forward the port unless you have proper authentication and firewall rules in place.
- **Use a reverse proxy for remote access** -- If you need to access OpenClaw remotely, place it behind a reverse proxy (e.g., Nginx or Caddy) with TLS and authentication. See the [Reverse Proxy guide](/en/server/reverse-proxy) for instructions.
- **Keep your API keys secure** -- API keys stored in the configuration file should have restricted file permissions.
- **Update regularly** -- Check for updates periodically to receive security patches.
:::

### Securing the Configuration File

```bash
# Restrict permissions on the config file to your user only
chmod 600 ~/.config/openclaw/config.yaml
```

### Firewall Configuration

If you are running OpenClaw on a server, make sure the port is not exposed externally:

```bash
# Verify that OpenClaw only listens on localhost
ss -tlnp | grep 18789

# If using ufw, ensure the port is not open externally
sudo ufw status
```

## Troubleshooting

### OpenClaw fails to start

Check the logs for detailed error messages:

```bash
# View recent logs
openclaw logs

# Check if the port is already in use
ss -tlnp | grep 18789
```

If another application is using port 18789, you can either stop that application or configure OpenClaw to use a different port in its configuration file.

### Web dashboard is not accessible

1. Make sure the service is running: `openclaw status`
2. Verify the port is listening: `ss -tlnp | grep 18789`
3. Try accessing the dashboard with `curl`:

```bash
curl http://127.0.0.1:18789/
```

4. If you are accessing from a remote machine, ensure you have set up a reverse proxy or SSH tunnel:

```bash
# SSH tunnel from your local machine to the server
ssh -L 18789:127.0.0.1:18789 user@your-server
```

### API key errors

If agents fail to communicate with AI providers:

```bash
# Verify the key is set in the config
cat ~/.config/openclaw/config.yaml | grep -i api_key

# Test the API key directly
curl -H "Authorization: Bearer your-api-key" https://api.anthropic.com/v1/messages
```

### Updating OpenClaw

```bash
# Re-run the install script to get the latest version
curl -fsSL https://openclaw.ai/install.sh | bash

# Restart the service after updating
openclaw stop
openclaw start
```

## Related Resources

- [AI Tools Overview](/en/ai/) -- Overview of all AI tools on Debian
- [Reverse Proxy Setup](/en/server/reverse-proxy) -- Secure remote access with Nginx or Caddy
- [Security Hardening](/en/administration/security) -- General Debian security best practices
- [Docker Setup](/en/server/docker) -- Run OpenClaw in a container for added isolation
