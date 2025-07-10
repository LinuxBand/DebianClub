# 安装与启动常见问题

## Debian 安装找不到硬盘/SSD

如果在 Debian 安装过程中，安装程序无法检测到您的硬盘驱动器（特别是 NVMe SSD），通常是由于缺少相应的驱动程序或 BIOS/UEFI 设置不正确。

**可能原因与解决方案：**

1.  **RAID/Optane 模式**：许多预装 Windows 的电脑默认在 BIOS/UEFI 中启用了 Intel RST (Rapid Storage Technology) 或 VMD (Volume Management Device) 功能，这会导致 Linux 系统无法直接识别硬盘。
    *   **解决方案**：进入您电脑的 BIOS/UEFI 设置（通常在开机时按 F2, F10 或 Del 键），找到 "SATA Mode"、"SATA Configuration" 或 "VMD Controller" 等选项，将其从 "RAID", "Intel RST" 或 "Intel Optane" 更改为 "**AHCI**"。保存设置并重启，然后再次尝试安装。

2.  **缺少驱动**：对于一些非常新的硬件，Debian 的稳定版 (Stable) 安装镜像可能不包含最新的驱动程序。
    *   **解决方案**：
        *   尝试使用包含非自由固件 (non-free firmware) 的 Debian 安装镜像。这些镜像包含了更多硬件驱动，可以从 [Debian 官网](https://cdimage.debian.org/cdimage/unofficial/non-free/cd-including-firmware/)下载。
        *   如果使用的是 Testing 或 Unstable (Sid) 分支，其内核更新，支持的硬件更广。

3.  **安全启动 (Secure Boot)**：虽然 Debian 支持安全启动，但在某些情况下它可能会引起问题。
    *   **解决方案**：可以尝试在 BIOS/UEFI 中暂时禁用 **Secure Boot**，完成安装后再重新启用它。

## Debian 安装卡在配置硬件检测 (hw-detect)

安装程序在“硬件检测”步骤卡住，通常也是由于固件 (firmware) 丢失，特别是针对无线网卡或显卡的固件。

**解决方案：**

1.  **使用包含固件的安装镜像**：这是最直接的解决方法。请下载并使用包含 non-free 固件的 Debian 安装镜像。
2.  **手动加载固件**：如果您正在使用标准安装镜像，并且安装程序提示缺少某个特定的固件文件（例如 `iwlwifi-xxxx.ucode`），您可以：
    *   在另一台电脑上，从 [Debian 固件包仓库](https://packages.debian.org/search?keywords=firmware-) 下载对应的固件包 (`.deb`)。
    *   用 `ar` 或 `dpkg-deb` 命令解压 `.deb` 文件，找到所需的固件文件。
    *   将这些固件文件（通常是 `.ucode` 文件）复制到另一个 U 盘的根目录，并插入到正在安装的电脑上。
    *   安装程序通常会自动检测到 U 盘上的固件并加载它们。
3.  **跳过网络配置**：如果卡住是因为缺少无线网卡固件，您可以先选择“不配置网络”，完成基本系统的安装。进入系统后，再通过有线网络或手动方式安装所需的固件。

## Debian 安装时无法连接 Wi-Fi

这几乎总是因为缺少无线网卡的非自由固件。

**解决方案：**

1.  **最佳方法**：使用集成了非自由固件的 Debian 安装镜像。这是最简单、最推荐的方法。
2.  **手动提供固件**：如上一问所述，您可以准备一个包含所需固件文件的 U 盘，在安装程序提示时插入。
3.  **使用有线网络**：如果可能，先用有线网络完成安装。进入系统后，编辑 `/etc/apt/sources.list` 文件，确保包含了 `non-free` 和 `non-free-firmware` 部分，然后安装固件。例如，对于 Intel 无线网卡：
    ```bash
    sudo apt update
    sudo apt install firmware-iwlwifi
    ```
    对于 Realtek 无线网卡：
    ```bash
    sudo apt install firmware-realtek
    ```
    安装后重启网络服务或重启电脑。

## Debian 安装后无法启动/黑屏/GRUB 错误

安装成功但无法启动通常与引导加载程序 (GRUB) 或显卡驱动有关。

**常见情况与修复：**

1.  **GRUB 未正确安装**：
    *   **原因**：在多系统环境下，GRUB 可能没有被安装到正确的硬盘（主引导记录 MBR 或 EFI 分区）。
    *   **解决方案**：使用 Debian 安装 U 盘启动，选择“高级选项” -> “救援模式 (Rescue mode)”。按照提示，系统会引导您进入一个修复环境。选择“重新安装 GRUB 引导加载程序”并将其安装到正确的设备上（例如 `/dev/sda` 或 EFI 分区）。

2.  **黑屏或“A start job is running for...”**：
    *   **原因**：这通常是显卡驱动问题，特别是 NVIDIA 显卡。系统尝试加载开源的 Nouveau 驱动，但它可能与某些新卡不兼容。
    *   **解决方案**：
        *   在 GRUB 菜单中，按 `e` 编辑启动项。
        *   找到以 `linux` 开头的那一行，在末尾添加 `nomodeset`。
        *   按 `Ctrl+X` 或 `F10` 启动。这会禁用内核模式设置，让您能进入一个低分辨率的桌面。
        *   成功进入系统后，立即着手[安装 NVIDIA 官方驱动](#debian-安装-nvidia-驱动)。

3.  **GRUB Rescue 错误**：
    *   **原因**：GRUB 无法找到它的配置文件或启动分区，通常是因为分区被删除、调整大小或 UUID 改变。
    *   **解决方案**：这比较复杂，需要手动在 GRUB Rescue 命令行中找到正确的分区并启动系统。
        *   使用 `ls` 命令查看所有分区，如 `(hd0,gpt1)`, `(hd0,gpt2)`。
        *   用 `ls (hdX,gptY)/` 逐一检查分区内容，找到包含 `/boot/grub` 的分区。
        *   设置 root 和 prefix：`set root=(hdX,gptY)`，`set prefix=(hdX,gptY)/boot/grub`。
        *   加载正常模式：`insmod normal`，`normal`。
        *   进入系统后，立即执行 `sudo update-grub` 和 `sudo grub-install /dev/sdX` 来修复引导。

## 如何为 Debian 创建启动 U 盘

推荐使用官方或社区推荐的工具，以确保兼容性和可靠性。

*   **官方推荐工具：Etcher**
    *   [balenaEtcher](https://www.balena.io/etcher/) 是一个开源工具，跨平台（Windows, macOS, Linux），界面简洁，操作安全（不会误格式化系统盘）。
    *   **步骤**：1. 选择 Debian ISO 镜像文件 -> 2. 选择您的 U 盘 -> 3. 点击 Flash!。

*   **Windows 用户：Rufus**
    *   [Rufus](https://rufus.ie/) 是 Windows 下非常强大和流行的工具。
    *   **步骤**：1. 在“设备”中选择 U 盘 -> 2. 点击“选择”加载 ISO 镜像 -> 3. 大多数设置保持默认即可 -> 4. **重要**：当询问写入模式时，选择 “**DD 镜像模式**”。这是写入 Debian 混合镜像的正确方式。

*   **Linux/macOS 用户：`dd` 命令**
    *   这是一种强大的命令行方式，但**风险很高**，如果目标设备 (`of=`) 写错，会**擦除整个硬盘的数据**。
    *   **步骤**：
        1.  找到 U 盘的设备名（例如 `/dev/sdb`，**不是** `/dev/sdb1`）。使用 `lsblk` 或 `sudo fdisk -l` 确认。
        2.  确保 U 盘已卸载。
        3.  执行命令：`sudo dd if=/path/to/debian.iso of=/dev/sdX bs=4M status=progress`
            *   `if=` 后面是你的 ISO 文件路径。
            *   `of=` 后面是你的 U 盘设备名。**请再三确认！**

## Debian 安装分区方案推荐

对于大多数桌面用户，推荐使用自动分区。如果需要手动分区，可以参考以下方案：

*   **启动模式**：首先确认您的系统是 **UEFI** 还是 **Legacy BIOS** 模式。这决定了是否需要 EFI 分区。

*   **UEFI 系统推荐方案**：
    1.  **EFI 系统分区 (ESP)**：
        *   **挂载点**：`/boot/efi`
        *   **大小**：`512 MB` ~ `1 GB`
        *   **格式**：`FAT32`
        *   **作用**：存放引导加载程序，UEFI 固件从这里启动系统。
    2.  **根分区**：
        *   **挂载点**：`/`
        *   **大小**：至少 `20 GB`，推荐 `50 GB` 或更多，取决于您计划安装多少软件。
        *   **格式**：`ext4`
        *   **作用**：存放系统核心文件、程序等。
    3.  **Home 分区**：
        *   **挂载点**：`/home`
        *   **大小**：剩余的全部空间。
        *   **格式**：`ext4`
        *   **作用**：存放用户个人文件（文档、图片、配置等）。将 `/home` 单独分区的好处是，重装系统时可以保留用户数据，只需格式化根分区即可。
    4.  **Swap (交换空间)**：
        *   **类型**：`swap` 分区或 `swap` 文件。
        *   **大小**：现代系统（8GB+ 内存）中，`Swap` 的重要性下降。推荐大小与内存相当或为其两倍，特别是如果您使用休眠功能。Debian 12 默认会创建一个 `1GB` 的 `swap` 文件，对多数用户已足够。如果需要休眠，建议创建大小等于或大于物理内存的 Swap 分区。

*   **Legacy BIOS 系统推荐方案**：
    *   与 UEFI 方案类似，但**不需要 EFI 分区**。GRUB 会被安装到硬盘的主引导记录 (MBR) 中。

## Debian 安装后 root 密码忘了怎么办

可以通过救援模式重置 root 密码。

**步骤：**

1.  在 GRUB 启动菜单，选择 "Advanced options for Debian"。
2.  选择带有 "(recovery mode)" 字样的内核选项，然后按 `e` 编辑。
3.  找到以 `linux` 开头的一行，将末尾的 `ro recovery nomodeset` 修改为 `rw single init=/bin/bash`。
    *   `rw` 表示以可读写模式挂载根文件系统。
    *   `init=/bin/bash` 表示使用 Bash Shell 作为初始进程，直接进入一个 root 权限的命令行。
4.  按 `Ctrl+X` 或 `F10` 启动。
5.  此时您会进入一个 root shell，提示符可能是 `root@...#`。
6.  输入 `passwd` 命令，然后按提示输入新的 root 密码两次。
7.  修改密码后，输入 `reboot -f` 或 `systemctl reboot` 重启电脑。

## Debian 安装时选哪个桌面环境好

Debian 提供了多种桌面环境 (Desktop Environment, DE)，各有优劣。选择哪个主要取决于您的硬件配置和个人偏好。

*   **GNOME**：
    *   **特点**：现代、简洁、注重工作流，是 Debian 的默认桌面环境。有丰富的扩展可以自定义功能。
    *   **优点**：设计统一，体验流畅，集成了许多现代化功能。
    *   **缺点**：对系统资源要求相对较高，自定义程度不如 KDE。
    *   **适合**：追求现代设计和高效工作流、硬件配置较好的用户。

*   **KDE Plasma**：
    *   **特点**：功能强大、高度可定制、外观华丽。
    *   **优点**：提供了海量的设置选项，几乎所有界面元素都可以调整。近年来资源占用优化得很好，不再是“资源大户”。
    *   **缺点**：选项过多可能让新手感到不知所措。
    *   **适合**：喜欢个性化、希望完全掌控自己桌面的用户。

*   **Xfce**：
    *   **特点**：轻量、快速、稳定。设计遵循传统的桌面布局（类似 Windows XP/7）。
    *   **优点**：资源占用极低，在老旧硬件上也能流畅运行。稳定可靠，不易出错。
    *   **缺点**：默认外观比较朴素，需要一些美化配置才能看起来更现代。
    *   **适合**：老旧电脑、追求极致性能和稳定性的用户。

**总结**：
*   **新电脑/追求现代感**：**GNOME** 或 **KDE Plasma**。
*   **旧电脑/追求性能**：**Xfce**。
*   **喜欢折腾/定制**：**KDE Plasma**。

您可以在安装时选择一个，也可以安装后再安装其他桌面环境进行切换。

## `main`, `contrib`, `non-free`, `non-free-firmware` 有什么区别？

这是 Debian 软件仓库的四个主要组成部分，根据软件的自由度（是否符合 DFSG - Debian 自由软件指导原则）和依赖关系来划分。

*   **`main` (主要)**：
    *   **内容**：完全符合 DFSG 的自由软件。这是 Debian 的核心部分，包含了操作系统的大部分基础软件。
    *   **状态**：官方完全支持。

*   **`contrib` (贡献)**：
    *   **内容**：这些软件本身是自由软件（符合 DFSG），但它们**依赖于** `non-free` 中的软件包才能运行。例如，一些开源的游戏可能需要非自由的显卡驱动来开启 3D 加速。
    *   **状态**：官方支持，但前提是您需要自己启用 `non-free`。

*   **`non-free` (非自由)**：
    *   **内容**：不符合 DFSG 的软件，即非自由软件。例如，NVIDIA 的闭源驱动、一些商业软件等。
    *   **状态**：Debian 不提供支持，但允许用户自行选择使用。使用这些软件的风险和许可问题由用户自己承担。

*   **`non-free-firmware` (非自由固件)**：
    *   **内容**：这是从 Debian 12 开始从 `non-free` 中分离出来的部分，专门存放非自由的硬件固件（Firmware）。例如，许多 Wi-Fi 网卡、显卡、声卡需要这些固件才能正常工作。
    *   **状态**：与 `non-free` 类似，Debian 不“支持”固件本身，但为了让用户硬件能正常工作，提供了这个分类并默认在安装时启用。这是 Debian 为了实用性做出的一个重要妥协。

**如何配置**：
在 `/etc/apt/sources.list` 文件中，一行典型的配置如下：
```
deb http://deb.debian.org/debian/ bookworm main contrib non-free non-free-firmware
```
这表示您同时启用了这四个软件源。

## 如何实现 Debian 与 Windows 双系统启动？

安装双系统最关键的步骤是在安装 Debian 之前，为它预留出未分配的磁盘空间。

**标准流程 (UEFI 模式):**

1.  **在 Windows 中压缩磁盘卷**：
    *   在 Windows 中，右键点击“开始”按钮，选择“磁盘管理”。
    *   选择一个有较大空余空间的分区（通常是 C 盘或 D 盘），右键点击它，选择“压缩卷”。
    *   在“输入要压缩的空间量”中，输入您想分给 Debian 的大小（例如 `51200` 表示 50GB）。点击“压缩”。
    *   完成后，您会看到一块黑色的“未分配”空间。这就是为 Debian 准备的。

2.  **关闭 Windows 快速启动**：
    *   进入 Windows 的“控制面板” -> “电源选项” -> “选择电源按钮的功能”。
    *   点击“更改当前不可用的设置”，然后**取消勾选**“启用快速启动”。
    *   这一步至关重要，因为快速启动会使 Windows 的文件系统处于一种“不完全关闭”的状态，Linux 可能无法访问。

3.  **制作 Debian 启动 U 盘并启动**：
    *   参考 **[如何为 Debian 创建启动 U 盘](#如何为-debian-创建启动-u-盘)** 的说明。
    *   从 U 盘启动电脑（可能需要在开机时按 F2, F12, ESC 等进入启动菜单）。

4.  **安装 Debian**：
    *   在“磁盘分区”步骤，选择“手动分区”或“使用最大的连续可用空间”。
    *   如果您选择了“使用最大的连续可用空间”，安装程序会自动在您之前准备好的未分配空间上创建分区。
    *   **关键点**：安装程序会自动检测到现有的 Windows 系统和 EFI 分区。在“安装 GRUB 引导加载程序”步骤，它会将 GRUB 安装到同一个 EFI 分区。
    *   完成安装并重启。

5.  **完成**：
    *   重启后，您应该会看到 GRUB 启动菜单，其中包含了 "Debian" 和 "Windows Boot Manager" 两个选项，让您可以选择进入哪个系统。
    *   如果开机直接进入了 Windows，可能是 BIOS/UEFI 的启动顺序问题。进入 BIOS 设置，将 "debian" 或 "Debian GNU/Linux" 设置为第一启动项。

## 如何校验下载的 Debian ISO 镜像的完整性？

校验 ISO 镜像是为了确保您下载的文件是官方发布的完整版本，没有被损坏或篡改。

**步骤：**

1.  **下载校验文件**：
    *   在下载 ISO 文件的同一个目录，您通常会找到一些校验和文件，如 `SHA256SUMS`, `SHA512SUMS`。请下载这些文件。
    *   您可能还会看到一个 `SHA256SUMS.sign` 或 `SHA512SUMS.sign` 文件，这是一个 GPG 签名文件，用于验证校验和文件本身是官方发布的。

2.  **在 Linux/macOS 上校验**：
    *   打开终端，`cd` 到您的下载目录。
    *   运行 `sha256sum` 或 `sha512sum` 命令进行比对：
        ```bash
        # -c 表示检查 (check)
        sha256sum -c SHA256SUMS
        ```
    *   终端会开始计算您下载的 ISO 文件的哈希值，并与 `SHA256SUMS` 文件中的记录进行比对。
    *   如果输出中包含类似 `debian-12.5.0-amd64-netinst.iso: OK` 的信息，表示文件完好无损。如果有任何 `FAILED` 信息，说明文件已损坏，需要重新下载。

3.  **在 Windows 上校验**：
    *   Windows 默认没有内置的校验工具。您可以使用一些第三方工具，如 [7-Zip](https://www.7-zip.org/) 或在 PowerShell 中使用 `Get-FileHash` 命令。
    *   **使用 PowerShell**：
        ```powershell
        Get-FileHash -Algorithm SHA256 .\debian-12.5.0-amd64-netinst.iso
        ```
        然后将输出的哈希值与 `SHA256SUMS` 文件中对应 ISO 的哈希值进行人工比对。

## `netinst`, `CD`, `DVD` 不同 ISO 镜像有什么区别？

Debian 提供了多种安装镜像，以适应不同的网络条件和安装需求。

*   **`netinst` (网络安装版)**：
    *   **大小**：非常小（约几百 MB）。
    *   **内容**：只包含安装系统所需的最核心组件。
    *   **工作方式**：在安装过程中，它会通过网络从 Debian 的官方软件源下载所有需要的软件包（包括桌面环境、各种应用等）。
    *   **优点**：镜像小，下载快；安装的系统永远是最新版的软件包。
    *   **缺点**：**必须有网络连接**才能完成安装。
    *   **推荐**：对于有稳定网络连接的用户，这是**最推荐**的镜像。

*   **`CD` 镜像 (已较少使用)**：
    *   **大小**：约 650-700 MB。
    *   **内容**：包含了一个基础的、可离线安装的桌面环境（通常是 Xfce 或 LXDE）。

*   **`DVD` 镜像**：
    *   **大小**：非常大（约 4.7 GB）。
    *   **内容**：包含了大量常用的软件包和多种桌面环境。
    *   **工作方式**：可以在完全没有网络的情况下，安装一个功能完备的桌面系统。
    *   **优点**：适合完全离线安装。
    *   **缺点**：镜像大，下载慢；里面的软件包版本是发布时的版本，安装后仍需大量更新。

**总结：**
*   有网：用 `netinst`。
*   没网：用 `DVD`。

另外，还有一种 **`live`** 镜像，它可以让您不安装系统，直接从 U 盘启动进入一个完整的 Debian 桌面环境进行体验。Live 镜像中也包含了安装程序的快捷方式。

## 如何从 Debian 11 "Bullseye" 无缝升级到 Debian 12 "Bookworm"？

Debian 的大版本升级过程非常可靠，但仍需谨慎操作，**强烈建议在升级前备份重要数据**。

**升级步骤：**

1.  **完全更新当前系统**：
    *   确保您当前的 Debian 11 系统是最新状态。
    ```bash
    sudo apt update
    sudo apt upgrade --without-new-pkgs
    sudo apt full-upgrade
    ```

2.  **修改软件源 (sources.list)**：
    *   这是升级的核心步骤。您需要将软件源中的发行版代号从 `bullseye` (Debian 11) 全部替换为 `bookworm` (Debian 12)。
    *   `sudo nano /etc/apt/sources.list`
    *   使用编辑器的替换功能，将所有 `bullseye` 字符串替换为 `bookworm`。
    *   检查 `/etc/apt/sources.list.d/` 目录下的其他源文件，一并修改。

3.  **开始升级过程**：
    *   **第一步：更新软件包列表**
        *   让 `apt` 从新的 `bookworm` 源获取软件包信息。
        ```bash
        sudo apt update
        ```
    *   **第二步：最小化升级**
        *   先进行一次基础升级，这会处理大部分核心包的升级，且冲突风险较小。
        ```bash
        sudo apt upgrade --without-new-pkgs
        ```
    *   **第三步：完整升级**
        *   这是主要步骤，会安装新版本的内核，处理所有软件包的依赖关系变更，并安装 `bookworm` 需要的新包。
        ```bash
        sudo apt full-upgrade
        ```
        *   这个过程会下载大量文件，耗时较长。期间可能会有一些交互提示，例如询问是否要保留旧的配置文件或使用新版本，通常选择“使用软件包维护者的版本 (install the package maintainer's version)”是比较安全的选择。

4.  **重启系统**：
    *   完整升级后，必须重启电脑以加载新的内核。
    ```bash
    sudo reboot
    ```

5.  **验证和清理**：
    *   重启后，运行 `lsb_release -a` 查看，应显示 `Distributor ID: Debian`, `Release: 12`。
    *   最后，可以运行 `sudo apt autoremove` 来清理升级过程中遗留的旧版本软件包。 