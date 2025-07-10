# Installation and Boot FAQ

## Debian installer does not find my hard drive/SSD

If the Debian installer cannot detect your hard drive, especially NVMe SSDs, it's usually due to missing drivers or incorrect BIOS/UEFI settings.

**Possible Causes and Solutions:**

1.  **RAID/Optane Mode**: Many computers with pre-installed Windows have Intel RST (Rapid Storage Technology) or VMD (Volume Management Device) enabled in the BIOS/UEFI by default. This prevents Linux systems from directly recognizing the hard drive.
    *   **Solution**: Enter your computer's BIOS/UEFI setup (usually by pressing F2, F10, or Del during boot). Find the "SATA Mode", "SATA Configuration", or "VMD Controller" option and change it from "RAID", "Intel RST", or "Intel Optane" to "**AHCI**". Save the settings, reboot, and try the installation again.

2.  **Missing Drivers**: For very new hardware, the Debian Stable installation image may not include the latest drivers.
    *   **Solutions**:
        *   Try using a Debian installation image that includes non-free firmware. These images contain more hardware drivers and can be downloaded from the [official Debian website](https://cdimage.debian.org/cdimage/unofficial/non-free/cd-including-firmware/).
        *   If you are using the Testing or Unstable (Sid) branch, they have newer kernels and broader hardware support.

3.  **Secure Boot**: Although Debian supports Secure Boot, it can cause issues in some cases.
    *   **Solution**: Try temporarily disabling **Secure Boot** in the BIOS/UEFI, complete the installation, and then re-enable it.

## Debian installation freezes at hardware detection (hw-detect)

The installer getting stuck at the "Detect hardware" step is also often caused by missing firmware, especially for wireless cards or graphics cards.

**Solutions:**

1.  **Use an installation image with firmware**: This is the most straightforward solution. Please download and use a Debian installation image that includes non-free firmware.
2.  **Manually load firmware**: If you are using a standard installation image and the installer reports a missing firmware file (e.g., `iwlwifi-xxxx.ucode`), you can:
    *   On another computer, download the corresponding firmware package (`.deb`) from the [Debian firmware package repository](https://packages.debian.org/search?keywords=firmware-).
    *   Use the `ar` or `dpkg-deb` command to extract the `.deb` file and find the required firmware file.
    *   Copy these firmware files (usually `.ucode` files) to the root directory of another USB drive and plug it into the computer you are installing on.
    *   The installer will usually detect and load the firmware from the USB drive automatically.
3.  **Skip network configuration**: If the freeze is due to missing wireless card firmware, you can choose "Do not configure the network" for now and complete the base system installation. After booting into the system, you can install the required firmware via a wired connection or manually.

## Cannot connect to Wi-Fi during Debian installation

This is almost always due to missing non-free firmware for the wireless card.

**Solutions:**

1.  **Best method**: Use a Debian installation image that integrates non-free firmware. This is the simplest and most recommended method.
2.  **Provide firmware manually**: As mentioned in the previous question, you can prepare a USB drive containing the required firmware files and insert it when prompted by the installer.
3.  **Use a wired network**: If possible, complete the installation using a wired network first. After booting into the system, edit the `/etc/apt/sources.list` file to ensure it includes the `non-free` and `non-free-firmware` components, then install the firmware. For example, for an Intel wireless card:
    ```bash
    sudo apt update
    sudo apt install firmware-iwlwifi
    ```
    For a Realtek wireless card:
    ```bash
    sudo apt install firmware-realtek
    ```
    Restart the network service or the computer after installation.

## System fails to boot/black screen/GRUB error after Debian installation

A successful installation that fails to boot is usually related to the bootloader (GRUB) or graphics drivers.

**Common Scenarios and Fixes:**

1.  **GRUB not installed correctly**:
    *   **Cause**: In a multi-boot environment, GRUB may not have been installed to the correct hard drive (Master Boot Record MBR or EFI partition).
    *   **Solution**: Boot from the Debian installation USB drive, select "Advanced options" -> "Rescue mode". Follow the prompts, and the system will guide you to a rescue environment. Choose "Reinstall GRUB boot loader" and install it to the correct device (e.g., `/dev/sda` or the EFI partition).

2.  **Black screen or "A start job is running for..."**:
    *   **Cause**: This is usually a graphics driver issue, especially with NVIDIA cards. The system tries to load the open-source Nouveau driver, which may be incompatible with some newer cards.
    *   **Solution**:
        *   In the GRUB menu, press `e` to edit the boot entry.
        *   Find the line that starts with `linux` and add `nomodeset` to the end.
        *   Press `Ctrl+X` or `F10` to boot. This will disable Kernel Mode Setting and allow you to enter a low-resolution desktop.
        *   Once you've successfully booted, proceed to [install the official NVIDIA drivers](#how-to-install-nvidia-drivers-on-debian).

3.  **GRUB Rescue error**:
    *   **Cause**: GRUB cannot find its configuration files or boot partition, usually because a partition was deleted, resized, or its UUID changed.
    *   **Solution**: This is more complex and requires manually finding the correct partition in the GRUB Rescue command line to boot the system.
        *   Use the `ls` command to list all partitions, e.g., `(hd0,gpt1)`, `(hd0,gpt2)`.
        *   Use `ls (hdX,gptY)/` to check the contents of each partition to find the one containing `/boot/grub`.
        *   Set the root and prefix: `set root=(hdX,gptY)`, `set prefix=(hdX,gptY)/boot/grub`.
        *   Load normal mode: `insmod normal`, then `normal`.
        *   After booting into the system, immediately run `sudo update-grub` and `sudo grub-install /dev/sdX` to fix the bootloader.

## How to create a bootable Debian USB drive

It is recommended to use official or community-recommended tools to ensure compatibility and reliability.

*   **Official Recommended Tool: Etcher**
    *   [balenaEtcher](https://www.balena.io/etcher/) is an open-source, cross-platform tool (Windows, macOS, Linux) with a simple interface and safe operation (it won't accidentally format your system disk).
    *   **Steps**: 1. Select the Debian ISO image file -> 2. Select your USB drive -> 3. Click Flash!.

*   **For Windows Users: Rufus**
    *   [Rufus](https://rufus.ie/) is a very powerful and popular tool for Windows.
    *   **Steps**: 1. Select your USB drive in "Device" -> 2. Click "SELECT" to load the ISO image -> 3. Keep most settings at their default -> 4. **Important**: When asked for the write mode, select "**DD Image mode**". This is the correct way to write a Debian hybrid image.

*   **For Linux/macOS Users: `dd` command**
    *   This is a powerful command-line method, but it is **very risky**. If the target device (`of=`) is wrong, you will **erase all data on that drive**.
    *   **Steps**:
        1.  Find the device name of your USB drive (e.g., `/dev/sdb`, **not** `/dev/sdb1`). Use `lsblk` or `sudo fdisk -l` to confirm.
        2.  Make sure the USB drive is unmounted.
        3.  Execute the command: `sudo dd if=/path/to/debian.iso of=/dev/sdX bs=4M status=progress`
            *   `if=` is the path to your ISO file.
            *   `of=` is your USB drive's device name. **Please double-check!**

## Recommended partitioning scheme for Debian

For most desktop users, automatic partitioning is recommended. If you need to partition manually, you can refer to the following scheme:

*   **Boot Mode**: First, confirm whether your system is in **UEFI** or **Legacy BIOS** mode. This determines whether you need an EFI partition.

*   **Recommended Scheme for UEFI Systems**:
    1.  **EFI System Partition (ESP)**:
        *   **Mount Point**: `/boot/efi`
        *   **Size**: `512 MB` ~ `1 GB`
        *   **Format**: `FAT32`
        *   **Purpose**: Stores the bootloader; the UEFI firmware boots the system from here.
    2.  **Root Partition**:
        *   **Mount Point**: `/`
        *   **Size**: At least `20 GB`, `50 GB` or more recommended, depending on how much software you plan to install.
        *   **Format**: `ext4`
        *   **Purpose**: Stores the core system files, programs, etc.
    3.  **Home Partition**:
        *   **Mount Point**: `/home`
        *   **Size**: All remaining space.
        *   **Format**: `ext4`
        *   **Purpose**: Stores user's personal files (documents, pictures, configurations, etc.). The benefit of having a separate `/home` partition is that you can reinstall the system while preserving user data by only formatting the root partition.
    4.  **Swap Space**:
        *   **Type**: `swap` partition or `swap` file.
        *   **Size**: On modern systems (8GB+ RAM), the importance of `Swap` has decreased. A size equal to or double your RAM is recommended, especially if you use the hibernation feature. Debian 12 creates a `1GB` `swap` file by default, which is sufficient for most users. If you need hibernation, it's recommended to create a Swap partition equal to or larger than your physical memory.

*   **Recommended Scheme for Legacy BIOS Systems**:
    *   Similar to the UEFI scheme, but **no EFI partition is needed**. GRUB will be installed to the Master Boot Record (MBR) of the hard drive.

## What to do if I forget the root password after installing Debian?

You can reset the root password using rescue mode.

**Steps:**

1.  In the GRUB boot menu, select "Advanced options for Debian".
2.  Select the kernel option with "(recovery mode)" and press `e` to edit.
3.  Find the line starting with `linux`, and change `ro recovery nomodeset` at the end to `rw single init=/bin/bash`.
    *   `rw` means mount the root filesystem in read-write mode.
    *   `init=/bin/bash` tells the system to use Bash Shell as the initial process, directly entering a command line with root privileges.
4.  Press `Ctrl+X` or `F10` to boot.
5.  You will now be in a root shell, with a prompt like `root@...#`.
6.  Enter the `passwd` command, then enter the new root password twice as prompted.
7.  After changing the password, type `reboot -f` or `systemctl reboot` to restart the computer.

## Which desktop environment should I choose during Debian installation?

Debian offers several Desktop Environments (DEs), each with its own pros and cons. The choice mainly depends on your hardware configuration and personal preference.

*   **GNOME**:
    *   **Features**: Modern, clean, workflow-oriented. It's the default desktop environment for Debian. Has a rich collection of extensions for customization.
    *   **Pros**: Unified design, smooth experience, integrates many modern features.
    *   **Cons**: Requires relatively more system resources, less customizable than KDE.
    *   **Best for**: Users who prefer a modern design and efficient workflow, and have reasonably good hardware.

*   **KDE Plasma**:
    *   **Features**: Powerful, highly customizable, and visually appealing.
    *   **Pros**: Offers a vast number of settings; almost every UI element can be tweaked. Resource usage has been greatly optimized in recent years and it's no longer a "resource hog".
    *   **Cons**: The sheer number of options can be overwhelming for new users.
    *   **Best for**: Users who love personalization and want full control over their desktop.

*   **Xfce**:
    *   **Features**: Lightweight, fast, and stable. Follows a traditional desktop layout (similar to Windows XP/7).
    *   **Pros**: Extremely low resource consumption, runs smoothly even on old hardware. Stable and reliable.
    *   **Cons**: The default look is a bit dated and requires some tweaking to look more modern.
    *   **Best for**: Older computers, users who prioritize performance and stability.

**Summary**:
*   **New computer/Modern feel**: **GNOME** or **KDE Plasma**.
*   **Old computer/Performance focus**: **Xfce**.
*   **Love to tinker/customize**: **KDE Plasma**.

You can choose one during installation and install others later to switch between them.

## What's the difference between `main`, `contrib`, `non-free`, and `non-free-firmware`?

These are the four main components of the Debian software repository, categorized based on the software's freedom (whether it complies with the DFSG - Debian Free Software Guidelines) and its dependencies.

*   **`main`**:
    *   **Content**: Software that is fully compliant with the DFSG (free software). This is the core part of Debian and includes most of the base operating system software.
    *   **Status**: Fully supported by the Debian project.

*   **`contrib` (contributed)**:
    *   **Content**: The software in this component is free itself (DFSG-compliant), but it **depends on** packages from `non-free` to run. For example, some open-source games might require non-free graphics drivers for 3D acceleration.
    *   **Status**: Officially supported, but you must enable `non-free` yourself.

*   **`non-free`**:
    *   **Content**: Software that does not comply with the DFSG (i.e., non-free software). Examples include NVIDIA's proprietary drivers, some commercial software, etc.
    *   **Status**: Debian does not provide support for this software. Users choose to use it at their own risk and are responsible for licensing issues.

*   **`non-free-firmware`**:
    *   **Content**: Separated from `non-free` starting with Debian 12, this component is specifically for non-free hardware firmware. For example, many Wi-Fi cards, graphics cards, and sound cards need this firmware to function correctly.
    *   **Status**: Similar to `non-free`, Debian does not "support" the firmware itself, but to enable users' hardware to work, it provides this category and enables it by default during installation. This is an important compromise Debian has made for practicality.

**How to configure**:
In the `/etc/apt/sources.list` file, a typical line looks like this:
```
deb http://deb.debian.org/debian/ bookworm main contrib non-free non-free-firmware
```
This means you have enabled all four software sources.

## How to set up a dual boot with Debian and Windows?

The most critical step in setting up a dual boot is to free up unallocated disk space for Debian *before* you install it.

**Standard Procedure (UEFI Mode):**

1.  **Shrink a volume in Windows**:
    *   In Windows, right-click the Start button and select "Disk Management".
    *   Choose a partition with plenty of free space (usually the C: or D: drive), right-click it, and select "Shrink Volume".
    *   In "Enter the amount of space to shrink in MB", enter the size you want to allocate to Debian (e.g., `51200` for 50GB). Click "Shrink".
    *   You will now see a black "Unallocated" space. This is for Debian.

2.  **Disable Fast Startup in Windows**:
    *   Go to Windows "Control Panel" -> "Power Options" -> "Choose what the power buttons do".
    *   Click "Change settings that are currently unavailable" and **uncheck** "Turn on fast startup".
    *   This step is crucial because Fast Startup leaves the Windows filesystem in a state that is not fully shut down, which can prevent Linux from accessing it.

3.  **Create a bootable Debian USB and boot from it**:
    *   Refer to the **[How to create a bootable Debian USB drive](#how-to-create-a-bootable-debian-usb-drive)** section.
    *   Boot your computer from the USB drive (you may need to press F2, F12, ESC, etc., during startup to enter the boot menu).

4.  **Install Debian**:
    *   At the "Partitioning" step, choose "Guided - use the largest continuous free space" or "Manual".
    *   If you choose "Guided - use the largest continuous free space", the installer will automatically create partitions in the unallocated space you prepared.
    *   **Key point**: The installer will automatically detect the existing Windows system and its EFI partition. At the "Install the GRUB boot loader" step, it will install GRUB to the same EFI partition.
    *   Complete the installation and reboot.

5.  **Finish**:
    *   After rebooting, you should see the GRUB boot menu with options for both "Debian" and "Windows Boot Manager", allowing you to choose which OS to boot.
    *   If the computer boots directly into Windows, it's likely a boot order issue in the BIOS/UEFI. Enter the BIOS setup and set "debian" or "Debian GNU/Linux" as the first boot option.

## How to verify the integrity of a downloaded Debian ISO image?

Verifying the ISO image ensures that the file you downloaded is the complete, official version and has not been corrupted or tampered with.

**Steps:**

1.  **Download the checksum files**:
    *   In the same directory where you downloaded the ISO file, you will usually find checksum files like `SHA256SUMS`, `SHA512SUMS`. Download these files.
    *   You may also see a `SHA256SUMS.sign` or `SHA512SUMS.sign` file. This is a GPG signature file used to verify that the checksum file itself is authentic.

2.  **Verifying on Linux/macOS**:
    *   Open a terminal and `cd` to your download directory.
    *   Run the `sha256sum` or `sha512sum` command to perform the check:
        ```bash
        # The -c flag means "check"
        sha256sum -c SHA256SUMS
        ```
    *   The terminal will compute the hash of your downloaded ISO and compare it with the record in the `SHA256SUMS` file.
    *   If the output includes a line like `debian-12.5.0-amd64-netinst.iso: OK`, the file is intact. If you see any `FAILED` messages, the file is corrupted and you need to download it again.

3.  **Verifying on Windows**:
    *   Windows does not have a built-in checksum tool by default. You can use third-party tools like [7-Zip](https://www.7-zip.org/) or use the `Get-FileHash` command in PowerShell.
    *   **Using PowerShell**:
        ```powershell
        Get-FileHash -Algorithm SHA256 .\debian-12.5.0-amd64-netinst.iso
        ```
        Then, manually compare the output hash with the corresponding hash for the ISO in the `SHA256SUMS` file.

## What's the difference between `netinst`, `CD`, and `DVD` ISO images?

Debian provides several types of installation images to suit different network conditions and installation needs.

*   **`netinst` (Network Install)**:
    *   **Size**: Very small (around a few hundred MB).
    *   **Content**: Contains only the most essential components needed to install the system.
    *   **How it works**: During installation, it downloads all required packages (including the desktop environment, applications, etc.) from Debian's official repositories over the network.
    *   **Pros**: Small image, fast to download; the installed system will always have the latest packages.
    *   **Cons**: **Requires a network connection** to complete the installation.
    *   **Recommended**: This is the **most recommended** image for users with a stable internet connection.

*   **`CD` Image (less common now)**:
    *   **Size**: Around 650-700 MB.
    *   **Content**: Includes a basic desktop environment (usually Xfce or LXDE) that can be installed offline.

*   **`DVD` Image**:
    *   **Size**: Very large (around 4.7 GB).
    *   **Content**: Includes a large number of common packages and multiple desktop environments.
    *   **How it works**: You can install a fully-featured desktop system completely offline.
    *   **Pros**: Suitable for completely offline installations.
    *   **Cons**: Large image, slow to download; the packages inside are from the release date and will require significant updates after installation.

**Summary:**
*   Have internet: Use `netinst`.
*   No internet: Use `DVD`.

Additionally, there is a **`live`** image, which allows you to boot into a full Debian desktop environment directly from a USB drive without installing anything, just to try it out. The live image also includes a shortcut to the installer.

## How to seamlessly upgrade from Debian 11 "Bullseye" to Debian 12 "Bookworm"?

Debian's major version upgrade process is very reliable, but it still requires caution. **It is strongly recommended to back up important data before upgrading.**

**Upgrade Steps:**

1.  **Fully update the current system**:
    *   Make sure your current Debian 11 system is completely up-to-date.
    ```bash
    sudo apt update
    sudo apt upgrade --without-new-pkgs
    sudo apt full-upgrade
    ```

2.  **Modify software sources (sources.list)**:
    *   This is the core step of the upgrade. You need to replace all instances of the release codename `bullseye` (Debian 11) with `bookworm` (Debian 12) in your software sources.
    *   `sudo nano /etc/apt/sources.list`
    *   Use the editor's replace function to change all `bullseye` strings to `bookworm`.
    *   Check and modify other source files in the `/etc/apt/sources.list.d/` directory as well.

3.  **Begin the upgrade process**:
    *   **Step 1: Update package lists**
        *   Let `apt` fetch package information from the new `bookworm` sources.
        ```bash
        sudo apt update
        ```
    *   **Step 2: Minimal upgrade**
        *   First, perform a basic upgrade. This will handle the upgrade of most core packages with a lower risk of conflicts.
        ```bash
        sudo apt upgrade --without-new-pkgs
        ```
    *   **Step 3: Full upgrade**
        *   This is the main step. It will install the new kernel version, resolve all package dependency changes, and install new packages required by `bookworm`.
        ```bash
        sudo apt full-upgrade
        ```
        *   This process will download a large number of files and will take a long time. You may see some interactive prompts, such as asking whether to keep an old configuration file or use the new version. It's usually safe to choose "install the package maintainer's version".

4.  **Reboot the system**:
    *   After the full upgrade is complete, you must reboot the computer to load the new kernel.
    ```bash
    sudo reboot
    ```

5.  **Verify and clean up**:
    *   After rebooting, run `lsb_release -a`. The output should show `Distributor ID: Debian`, `Release: 12`.
    *   Finally, you can run `sudo apt autoremove` to clean up old packages that are no longer needed. 