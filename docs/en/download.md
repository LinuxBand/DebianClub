---
title: System Download
description: How to download Debian system images and find the fastest download server.
---

# System Download

This guide will help you find the fastest Debian download server and choose the right system image.

## Official Download URLs

To ensure security and get the latest version, always download from the official Debian website or its recognized mirrors.

- **[Official Stable Release Download (Recommended)](https://www.debian.org/distrib/)**
  <br>
  This page will automatically detect your operating system and recommend the most suitable version.

- **[Global Mirror List](https://www.debian.org/mirror/list)**
  <br>
  If you want to manually browse and select a specific mirror server, the complete list is here.

- **[Historical Archives (Old Releases)](https://www.debian.org/releases/)**
  <br>
  If you need to download an older version of Debian, you can find it here.

## Finding the Fastest Mirror Server

Debian has hundreds of mirror servers worldwide, which are copies of the official package repository. Choosing a mirror that is geographically close to you and fast can significantly speed up downloading and updating software.

### Automatic Selection

In most cases, the official Debian installer will automatically detect your geographical location and recommend a suitable mirror server for you. For most users, accepting the recommended option is sufficient.

### For Users Worldwide: Using `netselect-apt`

For advanced users, you can use the `netselect-apt` tool to automatically test and find the fastest mirror for you.

1.  Install the tool:
    ```bash
    sudo apt update
    sudo apt install netselect-apt
    ```

2.  Run the test (this may take a few minutes):
    ```bash
    sudo netselect-apt
    ```
    This command will automatically test the latency and download speed of different mirrors and generate a new `sources.list` file.

## Choosing the Right Image

Debian offers several types of installation images to meet the needs of different users.

### 1. Network Install (netinst)

- **Size**: Very small (around 300-400 MB).
- **Features**: This is the recommended choice for most users. The image itself only contains the installer and the most essential packages. During the installation, the installer will download the latest packages from the mirror server you select.
- **Requirements**: A stable internet connection is required during installation.

### 2. Complete CD/DVD Images

- **Size**: Large (a single DVD is about 4.7 GB).
- **Features**: Contains a full set of packages, allowing you to complete a full desktop environment installation without an internet connection. There is usually a series of DVD images, but you typically only need the first DVD for a standard installation.
- **Requirements**: No internet connection needed.

### 3. Live Images

- **Size**: Medium (around 2-3 GB).
- **Features**: Live images allow you to boot directly from a USB drive or DVD and try out a full Debian desktop environment without installing it. This is an excellent way to test hardware compatibility if you are unsure. Live images also include a graphical installer.

## Verifying the Downloaded File

After the download is complete, it is highly recommended that you verify the integrity and authenticity of the file to ensure it has not been corrupted or tampered with during the download process.

Each download directory provides a file named `SHA256SUMS` or `SHA512SUMS`, which contains the checksums for all image files.

For example, if you downloaded `debian-12.5.0-amd64-netinst.iso`, you can verify it as follows:

1.  Download the `SHA256SUMS` file.
2.  Run the following command in your terminal:
    ```bash
    sha256sum debian-12.5.0-amd64-netinst.iso
    ```
3.  Compare the output with the corresponding entry in the `SHA256SUMS` file. If they match exactly, the file is complete and unmodified. 