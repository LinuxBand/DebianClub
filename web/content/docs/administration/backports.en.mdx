---
title: "Backports Usage Guide"
description: "A complete guide to safely install newer software on Debian 13 stable via trixie-backports"
---

# Backports Usage Guide

Debian Stable is known for its stability, but its software versions are relatively conservative. **Backports** is an official Debian compromise: it **recompiles** newer software from `testing` for the current stable release, allowing you to install individual newer packages on demand without leaving Stable.

For Debian 13, the corresponding repository is **`trixie-backports`**.

## When to Use Backports

- ✅ You need a newer version of a specific software (e.g., a newer kernel to support new hardware, a newer LibreOffice).
- ✅ You want to keep the system overall stable and only upgrade individual packages.
- ❌ Do not install all packages as backports just to "have everything new" — that would undermine the stability advantage of Stable.

> Software from Backports **does not receive regular security support** from the Debian Security Team, and its priority is lower than Stable. Install only what you need when you need it.

## Enabling trixie-backports

### Method 1: deb822 format (recommended)

Create `/etc/apt/sources.list.d/trixie-backports.sources`:

```bash
sudo tee /etc/apt/sources.list.d/trixie-backports.sources > /dev/null <<'EOF'
Types: deb
URIs: http://deb.debian.org/debian
Suites: trixie-backports
Components: main contrib non-free non-free-firmware
Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg
EOF

sudo apt update
```

### Method 2: Traditional one-line format

You can also add the `Suites` line directly to the official `debian.sources` file (e.g., `Suites: trixie trixie-updates trixie-backports`), or add the following to `sources.list`:

```
deb http://deb.debian.org/debian trixie-backports main contrib non-free non-free-firmware
```

For the differences between the two formats, see [deb822 source format](/en/administration/deb822).

## Installing Backported Software

After enabling, the default priority of backports is **lower** than Stable, so a normal `apt install` will **not** automatically install from backports. You must explicitly specify it with `-t` (`--target-release`):

```bash
# Install the latest LibreOffice from backports
sudo apt install -t trixie-backports libreoffice

# Install a newer kernel (useful for new hardware)
sudo apt install -t trixie-backports linux-image-amd64
```

Subsequent `sudo apt upgrade` will update already installed backports packages to newer versions in backports, while all other packages remain on Stable.

## Fine Control with APT Pinning (Optional)

If you want certain packages to be installed from backports **by default**, create `/etc/apt/preferences.d/backports`:

```
# Make backports default priority lower than stable to avoid automatic upgrade of all packages
Package: *
Pin: release n=trixie-backports
Pin-Priority: 400

# Only let kernel-related packages be preferentially installed from backports (priority higher than stable's 500)
Package: linux-image-* linux-headers-*
Pin: release n=trixie-backports
Pin-Priority: 501
```

- Priority `< 500`: Only install with explicit `-t`.
- Priority `> 500`: Prefer backports version automatically.

## Uninstalling and Rolling Back

Backported packages can be uninstalled like normal packages. To revert to the stable version, specify the version number or uninstall first and reinstall from stable:

```bash
sudo apt install <package-name>/trixie
```

## Summary

- For Debian 13, use `trixie-backports` to get newer software while keeping the system stable.
- Installation requires `apt install -t trixie-backports <package>`; it will not auto-upgrade.
- Enable and install as needed; backports do not receive regular security support.

Further reading: [deb822 source format](/en/administration/deb822) · [APT package management](/en/administration/packages)
