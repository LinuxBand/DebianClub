# System Configuration and Basic Usage

## No sound after installing Debian

Sound issues are usually related to drivers, incorrect output device selection, or the volume being muted.

**Troubleshooting Steps:**

1.  **Check if muted**:
    *   Click the sound icon in the system tray and make sure the volume is not muted and the slider is not at the far left.
    *   Open `alsamixer`. Type `alsamixer` in a terminal and press Enter.
        *   This is a command-line mixer. Use the left and right arrow keys to select different controls like `Master`, `Headphone`, `Speaker`, `PCM`.
        *   Use the up and down arrow keys to adjust the volume.
        *   If a control shows `MM` underneath, it is muted. Press the `M` key to unmute it (it will change to `00`).
        *   Press `Esc` to exit.

2.  **Select the correct output device**:
    *   Go to "System Settings" -> "Sound".
    *   Under the "Output" tab, check if the "Output Device" is set to the correct device (e.g., "Built-in Speakers" or "Headphones"). Sometimes the system might have incorrectly selected HDMI or another digital output.

3.  **Reload ALSA (Advanced Linux Sound Architecture)**:
    ```bash
    sudo alsa force-reload
    ```
    This command forces a reload of the sound card driver modules.

4.  **Install `pavucontrol` for detailed diagnostics**:
    *   `pavucontrol` is a volume control tool for PulseAudio that offers more detailed options than the default settings.
    *   Install it: `sudo apt install pavucontrol`
    *   Open `pavucontrol`:
        *   In the **"Output Devices"** tab, make sure the green checkmark icon next to the correct device (like your built-in sound card) is lit, indicating it is the fallback device.
        *   In the **"Configuration"** tab, make sure your sound card's profile is set to "Analog Stereo Duplex" or a similar option, not "Off".

## Incorrect screen resolution / Cannot set resolution in Debian

Resolution problems are often related to graphics drivers or monitor detection.

**Solutions:**

1.  **Install the correct graphics drivers**:
    *   This is the most fundamental solution. The open-source `nouveau` (for NVIDIA) or `modesetting` (for AMD/Intel) drivers may not support all resolutions for all monitors.
    *   Please refer to the **[Desktop Environment & Display](#how-to-install-nvidia-drivers-on-debian)** section to install the appropriate proprietary drivers.

2.  **Manually add a resolution with `xrandr`**:
    *   If the drivers are installed correctly but the desired resolution is still missing, you can try adding it manually.
    *   **Steps**:
        1.  Find the display interface name. Run `xrandr` and find the connected monitor. The name might be `DP-1`, `HDMI-1`, `eDP-1`, etc.
        2.  Generate a modeline for the new resolution. Use the `cvt` command. For example, to generate a modeline for `1920 1080`:
            ```bash
            cvt 1920 1080
            ```
            It will output a line similar to `Modeline "1920x1080_60.00" ...`.
        3.  Create the new mode. Copy everything from `"1920x1080_60.00"` onwards from the `cvt` output and paste it after `xrandr --newmode`.
            ```bash
            xrandr --newmode "1920x1080_60.00"  173.00  1920 2048 2248 2576  1080 1083 1088 1120 -hsync +vsync
            ```
        4.  Add the new mode to the display.
            ```bash
            xrandr --addmode DP-1 "1920x1080_60.00"
            ```
            (Replace `DP-1` with your display interface name).
        5.  Apply the new resolution.
            ```bash
            xrandr --output DP-1 --mode "1920x1080_60.00"
            ```
    *   To make this setting persistent across reboots, you need to add the `xrandr` `newmode`, `addmode`, and `output` commands to a startup script, like `~/.xprofile`.

## How to set up Chinese language and input method in Debian

**1. Set up Chinese Locale**

*   Install language packs:
    ```bash
    sudo apt install locales-all
    ```
*   Configure locales:
    ```bash
    sudo dpkg-reconfigure locales
    ```
*   In the graphical interface, find and select `zh_CN.UTF-8 UTF-8`, select it with the spacebar, then Tab to `<Ok>`.
*   On the next screen, choose `zh_CN.UTF-8` as the default locale.
*   After rebooting, the interface language will change to Chinese.

**2. Install Chinese Input Method (Fcitx5)**

Fcitx5 is the currently recommended input method framework. It is more modern and stable than the older IBus or Fcitx4.

*   **Install Fcitx5 and Chinese engines**:
    ```bash
    sudo apt install fcitx5 fcitx5-chinese-addons fcitx5-frontend-gtk3 fcitx5-frontend-qt5
    ```
    `fcitx5-chinese-addons` includes common Chinese input methods like Pinyin, Shuangpin, Wubi, etc.

*   **Configure environment variables**:
    *   Create a configuration file:
        ```bash
        sudo nano /etc/environment.d/90-fcitx5.conf
        ```
    *   Add the following content to the file:
        ```
        GTK_IM_MODULE=fcitx
        QT_IM_MODULE=fcitx
        XMODIFIERS=@im=fcitx
        ```
    *   Save and exit.

*   **Configure the input method**:
    *   Reboot the computer for the environment variables to take effect.
    *   Find and open "Fcitx5 Configuration" in the application menu.
    *   In the "Input Method" tab, make sure "Pinyin" or another Chinese input method you need is in the list. If not, click the "+" button in the bottom left, uncheck "Only Show Current Language", then search for and add it.
    *   You can usually switch between Chinese and English with `Ctrl+Space`.

## Incorrect time / Timezone settings in Debian

*   **Automatic Time Synchronization (NTP)**
    *   Debian uses `systemd-timesyncd` by default to automatically synchronize time over the network.
    *   Check the service status: `timedatectl status`
    *   If `NTP service` is `inactive`, you can enable it:
        ```bash
        sudo timedatectl set-ntp true
        ```

*   **Set Timezone**
    *   Using the `timedatectl` command:
        ```bash
        sudo timedatectl set-timezone Asia/Shanghai
        ```
        (Replace `Asia/Shanghai` with your timezone. You can use `timedatectl list-timezones` to see all available timezones.)
    *   Using the graphical interface: In "Settings" -> "Date & Time", turn off "Automatic Time Zone", then manually select your location on the map or by searching.

*   **Resolving time conflicts in a dual-boot setup with Windows**
    *   **Problem**: Windows defaults to setting the hardware clock (RTC) to local time, while Linux defaults to setting it to Coordinated Universal Time (UTC). This causes the time to be off by several hours when switching between systems.
    *   **Solution (Recommended)**: Make Linux use local time to be compatible with Windows.
        ```bash
        sudo timedatectl set-local-rtc 1 --adjust-system-clock
        ```

## How to enable sudo in Debian

During the Debian installation process, if you set a password for the root user, the regular user you create is not in the `sudo` group by default.

**Solution:**

1.  **Switch to the root user**:
    *   Open a terminal, type `su -` and press Enter.
    *   Enter the `root` password you set during installation.

2.  **Add your user to the `sudo` group**:
    *   Execute the following command, replacing `your_username` with your actual username:
        ```bash
        usermod -aG sudo your_username
        ```
        *   `-a` stands for append, `-G` specifies the group.

3.  **Verify**:
    *   Exit the root shell (type `exit` or press `Ctrl+D`).
    *   **Log out completely or reboot the computer** for the group change to take full effect.
    *   After logging back in, open a terminal and try running a command that requires `sudo`, like `sudo apt update`. It should prompt you for **your own user password**, not the root password.

## How to modify the software sources.list in Debian

To speed up downloads, it's often recommended to switch from the official Debian repositories to a regional mirror.

**Steps:**

1.  **Back up the original file**: This is a good practice.
    ```bash
    sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
    ```

2.  **Edit the `sources.list` file**:
    ```bash
    sudo nano /etc/apt/sources.list
    ```

3.  **Replace the content**:
    *   Delete or comment out all existing lines in the file with a `#`.
    *   Choose a mirror, for example, the Tsinghua University mirror, and paste the following content (example for Debian 12 "Bookworm"):
        ```
        deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bookworm main contrib non-free non-free-firmware
        deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bookworm-updates main contrib non-free non-free-firmware
        deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bookworm-backports main contrib non-free non-free-firmware
        deb https://security.debian.org/debian-security bookworm-security main contrib non-free non-free-firmware
        ```
    *   Other popular mirrors include:
        *   Aliyun: `https://mirrors.aliyun.com/debian/`
        *   USTC: `https://mirrors.ustc.edu.cn/debian/`

4.  **Save and update**:
    *   Save the file and exit the editor.
    *   Run `sudo apt update` to refresh the package list. You should see that the download URLs have changed to the new mirror address.

## How to update the system in Debian

Keeping the system updated is important for receiving security patches and software fixes.

**Standard Update Procedure:**

1.  **Update the package list**:
    *   This command downloads the latest package information from all repositories configured in your `sources.list` (it does **not** download the packages themselves).
    ```bash
    sudo apt update
    ```

2.  **Upgrade installed packages**:
    *   This command upgrades all installed packages on your system to the latest versions found by `apt update`.
    ```bash
    sudo apt upgrade
    ```
    *   During the upgrade, it will list the packages to be upgraded and ask for confirmation. Type `y` and press Enter.

**`full-upgrade` vs `upgrade`**:

*   `sudo apt upgrade`: Only upgrades existing packages. It will **never remove** any packages to resolve dependencies.
*   `sudo apt full-upgrade` (equivalent to `apt-get dist-upgrade`): Smarter. During an upgrade, if resolving a dependency for an important package requires **installing new packages** or **removing old ones**, it will do so.
    *   `full-upgrade` is recommended for major version upgrades (e.g., from Debian 11 to 12) or when on the `testing`/`sid` branches. For daily updates on the `stable` branch, `upgrade` is usually sufficient.

**Combined command**:
You can combine the two commands into one:
```bash
sudo apt update && sudo apt upgrade -y
```
*   `&&` means the second command will only run if the first one succeeds.
*   `-y` automatically answers "yes" to all prompts, suitable when you trust all the pending updates.

## What is the difference between `sudo` and `su`?

`su` and `sudo` are both commands used to elevate user privileges, but their philosophies and use cases are different.

*   **`su` (Switch User)**
    *   **Purpose**: To completely switch to another user, most commonly the `root` user.
    *   **How it works**: When you run `su -` or `su -l root`, the system prompts you for the **`root` user's password**. Upon success, you get a full login shell as `root`, with all of `root`'s privileges and environment variables, until you type `exit`.
    *   **Pros**: Convenient for scenarios requiring many administrative commands over a long period.
    *   **Cons**:
        *   Requires sharing the `root` password, which reduces security. If multiple users need admin access, they all have to know the same `root` password.
        *   Actions are not traceable. System logs will only record that a user switched to `root`, but all subsequent commands executed as `root` cannot be directly traced back to the original user.

*   **`sudo` (Superuser Do)**
    *   **Purpose**: To **temporarily** execute a **single** command as another user (defaults to `root`).
    *   **How it works**: When you run `sudo apt update`, the system prompts you for **your own user password** for authentication. If successful, only the `apt update` command runs with `root` privileges.
    *   **Pros**:
        *   **More secure**: No need to share the `root` password. Permissions can be finely granted to specific users or groups, and you can restrict them to executing only certain commands.
        *   **Traceable**: Every command executed with `sudo` is logged in detail (usually in `/var/log/auth.log`), including which user, when, and what command was executed.
        *   **Convenience**: `sudo` caches authentication by default for 15 minutes, so you don't need to re-enter your password for subsequent `sudo` commands within that window.
    *   **Cons**: You have to prefix every command that needs elevated privileges with `sudo`, which can be slightly tedious.

**Why doesn't Debian give `sudo` privileges to regular users by default?**

This stems from Debian's traditional and conservative security philosophy. During installation, if the user sets a password for the `root` account, Debian assumes the user prefers the traditional `su` method for system administration. This approach enforces a clear separation between daily tasks and system management, which is considered a safer practice to prevent users from accidentally running dangerous commands with high privileges.

In contrast, distributions like Ubuntu disable the `root` account by default and add the initial user to the `sudo` group, encouraging the use of `sudo` for all administrative tasks. Both approaches have their pros and cons, and Debian offers the freedom to choose.

## How to use Timeshift to back up and restore my system?

Timeshift is a powerful system snapshot tool, similar to "System Restore" in Windows or Time Machine in macOS. It focuses on backing up system files and configurations, excluding user personal data (`/home` directory) by default. It's an excellent tool to protect against issues caused by system updates or misconfigurations.

**1. Install Timeshift**
```bash
sudo apt install timeshift
```

**2. First-time Setup**

*   Open Timeshift, and it will start with a setup wizard.
*   **Select Snapshot Type**:
    *   **RSYNC**: The recommended option. It copies files to a specified backup disk as human-readable files and directories. Any formatted Linux partition can be a backup destination.
    *   **BTRFS**: If your root partition `/` uses the BTRFS filesystem, you can choose this option. It utilizes BTRFS's built-in snapshot feature, which is extremely fast for creation and restoration and uses minimal space.
*   **Select Snapshot Location**: Choose a **non-system partition** to store the snapshots. For example, if you have an extra hard drive or a dedicated backup partition, select it. **It is strongly discouraged to store snapshots on the system drive `/`**.
*   **Set up Snapshot Schedule**: You can set the frequency of automatic snapshots (daily, weekly, monthly, etc.) and the number to keep. A reasonable schedule ensures you always have recent snapshots available without filling up your hard drive.

**3. Create and Restore**

*   **Create a manual snapshot**: Click the "Create" button in the main window to immediately generate a snapshot of the current system. It's a good practice to create one manually before making significant system changes (like upgrading the system or installing new drivers).
*   **Restore the system**:
    *   If your system can still boot normally, just open Timeshift, select a snapshot from the list you want to restore to, and click "Restore".
    *   If the system can no longer boot, you need to boot your computer using a Debian Live USB.
    *   Install Timeshift in the Live environment and then run it. It will automatically detect the snapshots you have stored on other partitions.
    *   Select a snapshot and click "Restore". It will restore your system partition to the state it was in when the snapshot was created.

## How to manage and switch default applications?

In Debian, default applications are managed by the `update-alternatives` system. It uses a symbolic link mechanism to allow administrators to easily switch between multiple programs that provide the same functionality.

**Common Scenarios:**

*   **Switching the default text editor (`editor`)**
    1.  View all available "editor" options:
        ```bash
        sudo update-alternatives --config editor
        ```
    2.  The system will list all installed programs registered as `editor` (e.g., `nano`, `vim`, `code`), each with a number.
    3.  Enter the number of the editor you want to set as default and press Enter.

*   **Switching the Java version (`java`)**
    1.  View available Java versions:
        ```bash
        sudo update-alternatives --config java
        ```
    2.  Enter the number to switch.

*   **Switching the default web browser (`x-www-browser`)**
    1.  View available browser options:
        ```bash
        sudo update-alternatives --config x-www-browser
        ```
    2.  Select the browser you want as default, such as `firefox-esr` or `google-chrome`.

**How it works:**
`update-alternatives` creates symbolic links in the `/etc/alternatives/` directory. For example, the command `/usr/bin/editor` is itself a symbolic link to `/etc/alternatives/editor`, which in turn points to the actual program you selected, like `/bin/nano`. When you use `--config` to switch, you are actually changing the target of the `/etc/alternatives/editor` "middleman" link.

## What is the difference between `~/.bashrc`, `~/.profile`, and `/etc/profile`?

These are all Shell configuration files used to define environment variables, aliases, functions, etc., but they are loaded at different times and have different scopes.

*   **/etc/profile**:
    *   **Scope**: Global, affects **all users** on the system.
    *   **When it's loaded**: When any user **logs in**. This includes logging in via a terminal, SSH, or a graphical desktop session.
    *   **Purpose**: Used to set system-wide environment variables that are important for all users, such as `PATH`.

*   **~/.profile**:
    *   **Scope**: Single user. `~` represents the user's home directory (e.g., `/home/alan`).
    *   **When it's loaded**: When that specific user **logs in**. It is loaded after `/etc/profile`.
    *   **Purpose**: Used to set user-specific environment variables and startup scripts. A typical `~/.profile` will check if `~/.bashrc` exists and source it if it does.

*   **~/.bashrc**:
    *   **Scope**: Single user.
    *   **When it's loaded**: When that user starts an **interactive, non-login** shell. The most common example is opening a new terminal window in a graphical environment.
    *   **Purpose**: Used to define aliases, custom shell functions, set the command prompt (`PS1`), and other settings highly related to interactive use.

**Summary:**

| File              | When Loaded                            | Purpose                                    |
| ----------------- | -------------------------------------- | ------------------------------------------ |
| `/etc/profile`    | **Login** shell for **all users**      | Global environment variables and scripts   |
| `~/.profile`      | **Login** shell for a **single user**  | User's personal env vars, often calls `.bashrc` |
| `~/.bashrc`       | **Interactive, non-login** shell for a **single user** | User's personal aliases, functions, prompt, etc. |

**A Common Point of Confusion**: Why do environment variables from `~/.profile` work when I open a terminal in a GUI?
This is because most modern terminal emulators (like GNOME Terminal) will run themselves as a "login shell" by default. This sources `/etc/profile` and `~/.profile` to ensure a consistent user environment. However, by strict definition, opening a terminal window is an "interactive, non-login shell" action. 