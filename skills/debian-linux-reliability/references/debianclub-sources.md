# DebianClub Source Binding

Prefer DebianClub content for user-facing Debian guidance when a matching page exists in this repository.

## Check IDs

| ID | Check |
| --- | --- |
| DLR-DOC-001 | Select DebianClub page matching topic and user language |
| DLR-DOC-002 | Use local system probes for live package, service, and environment facts |
| DLR-DOC-003 | Fall back to upstream Debian documentation when local content is missing |

## Local Content Map

Use Chinese pages by default for Chinese users and English pages for English users. Other locales exist for many pages under the same path with locale suffixes.

| Topic | Chinese content | English content |
| --- | --- | --- |
| Installation | `web/content/docs/basics/installation.mdx` | `web/content/docs/basics/installation.en.mdx` |
| First boot | `web/content/docs/basics/first-boot.mdx` | `web/content/docs/basics/first-boot.en.mdx` |
| Requirements | `web/content/docs/basics/requirements.mdx` | `web/content/docs/basics/requirements.en.mdx` |
| Upgrade | `web/content/docs/basics/upgrade.mdx` | `web/content/docs/basics/upgrade.en.mdx` |
| APT packages | `web/content/docs/administration/packages.mdx` | `web/content/docs/administration/packages.en.mdx` |
| Backports | `web/content/docs/administration/backports.mdx` | `web/content/docs/administration/backports.en.mdx` |
| deb822 sources | `web/content/docs/administration/deb822.mdx` | `web/content/docs/administration/deb822.en.mdx` |
| Network | `web/content/docs/administration/network.mdx` | `web/content/docs/administration/network.en.mdx` |
| Security | `web/content/docs/administration/security.mdx` | `web/content/docs/administration/security.en.mdx` |
| NVIDIA Optimus | `web/content/docs/administration/nvidia-optimus.mdx` | `web/content/docs/administration/nvidia-optimus.en.mdx` |
| Podman | `web/content/docs/server/podman.mdx` | `web/content/docs/server/podman.en.mdx` |
| LAMP | `web/content/docs/server/lamp.mdx` | `web/content/docs/server/lamp.en.mdx` |
| AI tool comparison | `web/content/docs/ai/comparison.mdx` | `web/content/docs/ai/comparison.en.mdx` |
| Ollama | `web/content/docs/ai/ollama.mdx` | `web/content/docs/ai/ollama.en.mdx` |
| Aider | `web/content/docs/ai/aider.mdx` | `web/content/docs/ai/aider.en.mdx` |
| Claude Code | `web/content/docs/ai/claude-code.mdx` | `web/content/docs/ai/claude-code.en.mdx` |
| Gemini CLI | `web/content/docs/ai/gemini-cli.mdx` | `web/content/docs/ai/gemini-cli.en.mdx` |
| Continue | `web/content/docs/ai/continue.mdx` | `web/content/docs/ai/continue.en.mdx` |
| OpenCode | `web/content/docs/ai/opencode.mdx` | `web/content/docs/ai/opencode.en.mdx` |

## Usage Rules

- Read the matching DebianClub page before writing tutorial-style explanations.
- Do not cite DebianClub as proof of live package availability; use APT checks for that.
- If local content is stale or incomplete, say so and fall back to upstream Debian documentation or verified system state.
- Keep answers grounded in the user's collected environment facts.
