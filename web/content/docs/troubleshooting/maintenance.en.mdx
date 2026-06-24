# System Issues & Maintenance

## Debian Boots into Emergency Mode / Rescue Mode

Entering emergency mode means the system encountered a critical error during boot and was unable to mount the root filesystem or start essential services. The most common cause is an incorrect configuration in the `/etc/fstab` file.

**Troubleshooting Steps:**

1.  **Read the Error Messages**:
    *   On the emergency mode screen, you will usually be prompted to run "journalctl -xb" to view detailed logs. Read the logs carefully, especially the red error messages, which will tell you which mount point has the problem.

2.  **Check `/etc/fstab`**:
    *   **Most Common Cause**: You manually edited the `/etc/fstab` file, but there is a syntax error, a non-existent device, or an incorrect UUID.
    *   **Solution**:
        1.  At the emergency mode prompt, enter the `root` password to access a maintenance shell.
        2.  The filesystem may be read-only at this point and needs to be remounted as read-write:
            ```bash
            mount -o remount,rw /
            ```
        3.  Edit the fstab file: `nano /etc/fstab`
        4.  Carefully check the lines you modified. If you are unsure, add `#` at the beginning of the problematic line to comment it out, allowing the system to boot normally first.
        5.  Get the correct UUID: Run the `blkid` command, which will list the UUIDs of all partitions. Verify that the UUIDs in fstab are correct.
        6.  After saving the file, reboot with `reboot`.

3.  **Filesystem Corruption**:
    *   **Cause**: An improper shutdown (such as a sudden power outage) can cause filesystem corruption.
    *   **Solution**:
        1.  In emergency mode, the logs may prompt you to run `fsck` (file system check) on a specific partition.
        2.  Run the command, for example: `fsck /dev/sda1` (replace `/dev/sda1` with the partition indicated as problematic).
        3.  Follow the prompts to repair errors. Reboot after the repair is complete.

## How to Free Up Disk Space on Debian

When the root directory `/` or home directory `/home` is running out of space, the system may become unstable.

**Cleanup Strategies:**

1.  **Clean the APT Cache**:
    *   APT caches downloaded `.deb` packages. These caches can take up a significant amount of space.
    *   **Remove all cached package files**: `sudo apt-get clean`
        *   This command deletes all package files in the `/var/cache/apt/archives/` directory. It is safe and effective.
    *   **Remove only obsolete packages**: `sudo apt-get autoclean`
        *   This command only removes packages that are outdated and can no longer be downloaded from the repositories.

2.  **Remove Unnecessary "Orphan" Packages**:
    *   These are packages that were installed as dependencies but are no longer required by any other package.
    *   `sudo apt autoremove`

3.  **Clean Up Old Kernels**:
    *   When the system is updated, old kernel versions are retained, taking up space in `/boot` and `/lib/modules`.
    *   Usually `apt autoremove` handles old kernels automatically, but if you need to clean them up manually, be **extremely careful**. **Never uninstall the kernel you are currently using** (`uname -r`).

4.  **Analyze Disk Space Usage**:
    *   Use tools to find which files and directories are taking up the most space.
    *   **`ncdu`** (Recommended): A very convenient interactive disk usage analyzer.
        ```bash
        sudo apt install ncdu
        # Analyze the root directory
        sudo ncdu /
        # Analyze the home directory
        ncdu ~
        ```
    *   **`du`** (Traditional command):
        ```bash
        # View the size of first-level subdirectories under /var
        sudo du -h --max-depth=1 /var
        ```

5.  **Clean Up Log Files**:
    *   `journald` logs can grow very large.
    *   Check current log size: `journalctl --disk-usage`
    *   Clean up logs, keeping only the last two weeks:
        ```bash
        sudo journalctl --vacuum-time=2weeks
        ```

## How to View System Information on Debian

*   **CPU Information**:
    *   `lscpu`: Lists detailed CPU architecture, core count, threads, frequency, etc.
    *   `cat /proc/cpuinfo`: Raw CPU information.

*   **Memory Information**:
    *   `free -h`: Displays total, used, and available memory and swap in a human-readable format.
    *   `cat /proc/meminfo`: More detailed memory information.

*   **Disk Information**:
    *   `lsblk`: Displays all block devices (hard drives, partitions, USB drives) in a tree structure.
    *   `df -h`: Shows total, used, and available space for mounted filesystems.
    *   `sudo fdisk -l`: Lists all hard drives and their partition table information.

*   **Comprehensive Information Tools**:
    *   `neofetch` or `fastfetch`: Displays the system logo along with key hardware and software information in an attractive format.
        ```bash
        sudo apt install neofetch
        neofetch
        ```

## How to Change the Hostname on Debian

The hostname is the name of the computer on the network.

**Method 1: Using `hostnamectl`**

This is the standard method on `systemd` systems. It automatically modifies all related files.

```bash
sudo hostnamectl set-hostname new-hostname
```
Replace `new-hostname` with your desired new name. This command takes effect immediately without requiring a reboot.

**Method 2: Manually Editing Files (Traditional Method)**

1.  **Edit `/etc/hostname`**:
    *   This file contains only one line: the current hostname.
    *   `sudo nano /etc/hostname`
    *   Replace the old name with the new name.

2.  **Edit `/etc/hosts`**:
    *   This file is used for local name resolution.
    *   `sudo nano /etc/hosts`
    *   Find the line similar to `127.0.1.1 old-hostname` and replace `old-hostname` with `new-hostname`.

3.  **Apply the Changes**:
    *   Run `sudo hostname new-hostname` to update the hostname immediately in the current session.
    *   Or simply reboot the computer.

## How to Install NVIDIA Graphics Drivers on Debian?

This is a common and important question. An incorrect installation method can cause many problems.

**Short Answer**: **Do not** download the `.run` file from the NVIDIA website to install. Instead, use the `nvidia-driver` package from the official Debian repositories.

For detailed installation steps, please refer to the full tutorial in **[Desktop & Display -> Installing NVIDIA Drivers on Debian](./desktop-display.md#debian-安装-nvidia-驱动)**.

## How to Install a Chinese Input Method on Debian?

Configuring the Chinese environment on Debian involves two steps: "Setting the Chinese locale" and "Installing a Chinese input method framework." The currently recommended framework is Fcitx5.

For detailed configuration steps, please refer to the full tutorial in **[System Configuration & Basic Usage -> How to Set Up Chinese Language and Input Method on Debian](./system-usage.md#debian-如何设置中文语言和输入法)**.

## How to Add a New User on Debian

**Using `adduser` (Recommended)**

`adduser` is a user-friendly script that automatically creates a home directory, sets a password, and more when creating a user.

```bash
sudo adduser new_username
```
Replace `new_username` with the username you want to create. After execution, it will interactively:
1.  Ask you to set a password for the new user.
2.  Ask you to enter optional information such as the user's full name (you can press Enter to skip).
3.  Ask you to confirm whether the information is correct.

**Add the New User to the `sudo` Group (If Needed)**

If you want the new user to be able to run `sudo` commands, you need to add them to the `sudo` group.
```bash
sudo usermod -aG sudo new_username
```
