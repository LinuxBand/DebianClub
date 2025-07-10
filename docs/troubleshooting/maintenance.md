# 系统问题与维护

## Debian 开机进入 emergency mode/rescue mode

进入紧急模式 (emergency mode) 意味着系统在启动过程中遇到了严重错误，无法正常挂载根文件系统或启动关键服务。最常见的原因是 `/etc/fstab` 文件配置错误。

**排查步骤：**

1.  **阅读错误信息**：
    *   在进入紧急模式的界面上，通常会提示您 "journalctl -xb" 来查看详细日志。仔细阅读日志，特别是红色的错误信息，它会告诉您是哪个挂载点出了问题。

2.  **检查 `/etc/fstab`**：
    *   **最常见原因**：您手动编辑了 `/etc/fstab` 文件，但存在语法错误、设备不存在或 UUID 错误。
    *   **解决方法**：
        1.  在紧急模式的提示符下，输入 `root` 密码进入一个维护 shell。
        2.  文件系统此时可能是只读的，需要重新挂载为可读写：
            ```bash
            mount -o remount,rw /
            ```
        3.  编辑 fstab 文件：`nano /etc/fstab`
        4.  仔细检查您修改过的行。如果不确定，可以在问题行前面加上 `#` 将其注释掉，让系统可以先正常启动。
        5.  获取正确的 UUID：运行 `blkid` 命令，它会列出所有分区的 UUID。核对 fstab 中的 UUID 是否正确。
        6.  保存文件后，重启 `reboot`。

3.  **文件系统损坏**：
    *   **原因**：非正常关机（如突然断电）可能导致文件系统损坏。
    *   **解决方法**：
        1.  在紧急模式下，日志可能会提示您对某个分区运行 `fsck` (file system check)。
        2.  运行命令，例如：`fsck /dev/sda1` (请将 `/dev/sda1` 替换为提示有问题的分区)。
        3.  根据提示修复错误。修复完成后重启。

## Debian 磁盘空间不足如何清理

当根目录 `/` 或家目录 `/home` 空间不足时，系统可能会变得不稳定。

**清理策略：**

1.  **清理 APT 缓存**：
    *   APT 会缓存下载过的 `.deb` 包。这些缓存会占用大量空间。
    *   **清理旧的包文件**：`sudo apt-get clean`
        *   这个命令会删除 `/var/cache/apt/archives/` 目录下所有的包文件，是安全且有效的。
    *   **只清理不再需要的包**：`sudo apt-get autoclean`
        *   这个命令只删除那些版本过旧、已无法从软件源下载的包。

2.  **卸载不再需要的“孤儿”软件包**：
    *   这些是作为依赖被安装，但现在已没有任何包需要它们的软件。
    *   `sudo apt autoremove`

3.  **清理旧的内核**：
    *   系统更新时，旧的内核版本会保留下来，占用 `/boot` 和 `/lib/modules` 的空间。
    *   通常 `apt autoremove` 会自动处理旧内核，但如果需要手动清理，请**极其小心**。**永远不要卸载当前正在使用的内核** (`uname -r`)。

4.  **分析磁盘占用大户**：
    *   使用工具来查找哪些文件和目录占用了最多空间。
    *   **`ncdu`** (推荐)：一个非常方便的交互式磁盘使用分析工具。
        ```bash
        sudo apt install ncdu
        # 分析根目录
        sudo ncdu /
        # 分析家目录
        ncdu ~
        ```
    *   **`du`** (传统命令)：
        ```bash
        # 查看 /var 目录下第一层子目录的大小
        sudo du -h --max-depth=1 /var
        ```

5.  **清理日志文件**：
    *   `journald` 的日志可能会变得非常大。
    *   查看当前日志大小：`journalctl --disk-usage`
    *   清理日志，只保留最近两周的：
        ```bash
        sudo journalctl --vacuum-time=2weeks
        ```

## Debian 如何查看系统信息

*   **CPU 信息**：
    *   `lscpu`：详细列出 CPU 架构、核心数、线程、频率等。
    *   `cat /proc/cpuinfo`：原始的 CPU 信息。

*   **内存信息**：
    *   `free -h`：以人类可读的格式显示总内存、已用、可用内存和 Swap 情况。
    *   `cat /proc/meminfo`：更详细的内存信息。

*   **硬盘信息**：
    *   `lsblk`：以树状结构显示所有块设备（硬盘、分区、U盘）。
    *   `df -h`：显示已挂载文件系统的总空间、已用空间和可用空间。
    *   `sudo fdisk -l`：列出所有硬盘及其分区表信息。

*   **综合信息工具**：
    *   `neofetch` 或 `fastfetch`：以美观的方式显示系统 Logo 和主要的软硬件信息。
        ```bash
        sudo apt install neofetch
        neofetch
        ```

## Debian 如何修改主机名

主机名 (hostname) 是计算机在网络中的名称。

**方法一：使用 `hostnamectl`**

这是 `systemd` 系统下的标准方法，它会自动修改所有相关文件。

```bash
sudo hostnamectl set-hostname new-hostname
```
将 `new-hostname` 替换为您想要的新名称。这个命令立即生效，无需重启。

**方法二：手动修改文件 (传统方法)**

1.  **修改 `/etc/hostname`**：
    *   这个文件只包含一行，即当前的主机名。
    *   `sudo nano /etc/hostname`
    *   将其中的旧名称改为新名称。

2.  **修改 `/etc/hosts`**：
    *   这个文件用于本地的域名解析。
    *   `sudo nano /etc/hosts`
    *   找到类似 `127.0.1.1 old-hostname` 的行，将其中的 `old-hostname` 改为 `new-hostname`。

3.  **让更改生效**：
    *   运行 `sudo hostname new-hostname` 来立即在当前会话中更新主机名。
    *   或者直接重启电脑。

## 如何在 Debian 上安装 NVIDIA 显卡驱动？

这是一个常见且重要的问题，不正确的安装方法会导致很多问题。

**简要回答**：请**不要**从 NVIDIA 官网下载 `.run` 文件安装。应当使用 Debian 官方仓库中的 `nvidia-driver` 包。

详细的安装步骤，请参考 **[桌面环境与显示 -> Debian 安装 NVIDIA 驱动](./desktop-display.md#debian-安装-nvidia-驱动)** 部分的完整教程。

## 如何在 Debian 中安装中文输入法？

Debian 的中文环境配置分为“设置中文语言环境 (Locale)”和“安装中文输入法框架”两步。目前推荐使用 Fcitx5 框架。

详细的配置步骤，请参考 **[系统配置与基础使用 -> Debian 如何设置中文语言和输入法](./system-usage.md#debian-如何设置中文语言和输入法)** 部分的完整教程。

## Debian 如何添加新用户

**使用 `adduser` (推荐)**

`adduser` 是一个对用户友好的脚本，它会在创建用户的同时，自动创建家目录、设置密码等。

```bash
sudo adduser new_username
```
将 `new_username` 替换为您想创建的用户名。执行后，它会以交互的方式：
1.  要求您为新用户设置密码。
2.  要求您输入用户的全名等可选信息（可以直接按回车跳过）。
3.  确认信息是否正确。

**将新用户添加到 `sudo` 组（如果需要）**

如果希望这个新用户也能执行 `sudo` 命令，需要将其添加到 `sudo` 用户组。
```bash
sudo usermod -aG sudo new_username
``` 