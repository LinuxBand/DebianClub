---
title: System Download Guide
description: Learn how to download Debian for your PC, including stable, testing, and archived versions.
---

# System Download Guide

Welcome to the Debian Download Guide. This document will walk you through how to choose, download, and verify the best Debian system image for your needs.

## 1. How to Download Debian Images

### Step 1: Choose a Mirror Near You

Downloading from a geographically closer mirror usually gives you faster speeds.

| Country/Region | Mirror Name         | Mirror Directory URL                                     |
| :------------- | :------------------ | :------------------------------------------------------- |
| **China**      | USTC                | `https://mirrors.ustc.edu.cn/debian-cd/`                 |
| **China**      | Alibaba Cloud       | `https://mirrors.aliyun.com/debian-cd/`                  |
| **China**      | Tsinghua University | `https://mirrors.tuna.tsinghua.edu.cn/debian-cd/`        |
| **Global**     | Debian Official     | `https://cdimage.debian.org/debian-cd/`                  |
| **Germany**    | Official German Mirror | `https://ftp.de.debian.org/debian-cd/`                 |
| **Japan**      | Official Japanese Mirror | `https://ftp.jp.debian.org/debian-cd/`                |
| **USA**        | MIT                 | `https://mirror.csail.mit.edu/debian-cd/`                |
| **USA**        | Kernel.org          | `https://mirrors.kernel.org/debian-cd/`                  |
| **UK**         | University of Kent  | `https://mirrorservice.org/sites/cdimage.debian.org/debian-cd/` |
| **France**     | Official French Mirror | `https://debian.proxad.net/debian-cd/`                 |
| **Australia**  | AARNet              | `https://mirror.aarnet.edu.au/pub/debian-cd/`            |
| **Russia**     | Yandex              | `https://mirror.yandex.ru/debian-cd/`                    |
| **India**      | NIT Trichy          | `https://mirror.nitt.edu/debian-cd/`                     |
| **Singapore**  | NUS                 | `https://debian.sg.debian.org/debian-cd/`                |

See more at the [official Debian mirror list](https://www.debian.org/mirror/list)

### Step 2: Navigate the Mirror by Version

- **To download the latest Stable version:**
  1. Enter the mirror and click the `current/` directory.
  2. Choose your processor architecture (`amd64` is for most 64-bit PCs).
  3. Enter `iso-cd/` (for net-install) or `iso-dvd/` (for DVD).
  4. Find and download the corresponding `.iso` file. **Be sure to also download the `SHA256SUMS` file in the same directory!**

- **To download the Testing version:**
  1. The Testing version is usually in a special path, often under the `debian-cdimage/` or `cdimage/` root directory.
  2. Look for the `weekly-builds/` (weekly builds) or `daily-builds/` (daily builds) directory.
  3. The rest of the steps are similar to Stable.

- **To download an Archived version:**
  1. All old versions are stored on the official archive server: [`https://cdimage.debian.org/cdimage/archive/`](https://cdimage.debian.org/cdimage/archive/)
  2. Click the version number directory you want (e.g., `11.9.0/`).
  3. The rest of the steps are similar to Stable.


## 2. Version Selection: Stable vs. Testing

Debian always provides at least two main version branches. Understanding their differences is crucial.

### Stable

- **Current Version**: Debian 13, codename "Trixie"
- **Old Stable**: Debian 12, codename "Bookworm"
- **Recommended For**: **Most users**, especially for servers, production environments, and daily desktop use.
- **Features**:
  - **Maximum reliability**: Highest priority is stability, achieved through long development and freeze-testing.
  - **Security assurance**: Receives long-term, timely security updates from the Debian Security Team.
  - **Software versions**: To ensure stability, packages are relatively older but thoroughly tested.

> If your core requirements are "stability" and "peace of mind," Stable is your best choice.

### Testing

- **Current Version**: Debian 14, codename "Forky"
- **Recommended For**: Developers, tech enthusiasts, and users who want to experience the latest software features.
- **Features**:
  - **Newer software**: Contains packages that will be included in the next Stable release.
  - **Rolling updates**: Continuously updated until the next Stable freeze.
  - **Potential risks**: You may encounter unresolved bugs, and security updates are slower than Stable.

> If you enjoy new features and don't mind occasionally troubleshooting, Testing will be a fun experience.

## 3. Image Types: Which One Should I Use?

In the download directories, you will see different types of `.iso` files, each for a different installation scenario.

### Net-install Image

- **Filename usually contains**: `netinst`
- **Features**:
  - **Small size**: Usually only a few hundred MB, quick to download.
  - **Up-to-date system**: Installs the latest packages from the network during installation.
  - **Highly customizable**: Choose exactly what you want to install for a minimal system.
- **Requirement**: **Must be online during installation.**
- ⭐ **Highly recommended for most users, especially for servers.**

### Complete Installation Image (DVD/CD)

- **Filename usually contains**: `DVD-1`, `DVD-2`... or `CD-1`...
- **Features**:
  - **Large size**: DVD images are several GB, containing a huge number of packages.
  - **Offline installation**: Install a full-featured desktop system even without a network connection.
- **Note**: Downloading just the first (`DVD-1` or `CD-1`) is enough for a standard installation. The rest are extra package repositories.
- ⭐ **Recommended for users who need to install offline.**

### Live Image

- **Filename usually contains**: `live` and a desktop environment name (e.g., `gnome`, `kde`).
- **Features**:
  - **Try without installing**: Burn the image to a USB drive or disc and boot directly into a full Debian system.
  - **Built-in installer**: If you like it, launch the installer from the Live environment to install to your hard drive.
- ⭐ **Recommended for users who want to try Debian before installing.**

## 4. How to Verify Your Download (Important!)

Verification ensures your downloaded image is **complete, uncorrupted, and untampered**. **Strongly recommended for all users.**

### Step 1: Get the Official Checksum

In the same directory as your `.iso` file, download the `SHA256SUMS` or `SHA512SUMS` file. This plain text file contains the official checksums for all files in that directory.

### Step 2: Calculate the Checksum of Your Local File

Use the following command based on your operating system to calculate the SHA256 checksum of your `.iso` file.

#### On Linux or macOS

Open a terminal and enter (replace the file path):

```bash
sha256sum /path/to/your/debian-image.iso
# If the above command doesn't exist, macOS users can try:
shasum -a 256 /path/to/your/debian-image.iso
```

#### On Windows

Open **PowerShell** or **Command Prompt (CMD)** and enter (replace the file path):

```powershell
certutil -hashfile C:\path\to\your\debian-image.iso SHA256
```

### Step 3: Compare the Results

Compare the string you calculated in Step 2 with the one next to your ISO's filename in the `SHA256SUMS` file.

- **If they match exactly**: Congratulations! Your file is complete and secure.
- **If there is any difference**: **DO NOT USE THIS IMAGE!** The file was corrupted during download or has been tampered with. Please delete and re-download. 