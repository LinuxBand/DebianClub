# 硬件与外设问题

## Debian 打印机无法识别/设置 (CUPS)

Debian 使用 CUPS (Common Unix Printing System) 作为打印服务。大多数现代打印机都能被自动检测到，但有些需要手动配置或安装驱动。

**排查步骤：**

1.  **安装 CUPS 和打印机支持包**：
    *   确保 CUPS 服务已安装并正在运行。
        ```bash
        sudo apt install cups printer-driver-gutenprint
        sudo systemctl enable --now cups
        ```
        `printer-driver-gutenprint` 包含了大量开源的打印机驱动，支持许多品牌的打印机。

2.  **检查物理连接**：
    *   确保打印机已开机，并通过 USB 或网络正确连接到电脑或局域网。

3.  **使用 Web 界面配置**：
    *   CUPS 提供了一个方便的 Web 管理界面。在浏览器中访问 `http://localhost:631`。
    *   点击 **“管理 (Administration)”** 选项卡，然后点击 **“添加打印机 (Add Printer)”**。
    *   系统可能会要求输入您的用户名和密码（您需要是 `lpadmin` 组的成员，通常有 `sudo` 权限的用户即可）。
    *   按照向导的步骤操作：
        1.  **选择打印机**：CUPS 会列出发现的本地（USB）和网络打印机。选择您的打印机。
        2.  **编辑信息**：可以修改打印机的名称、描述和位置。
        3.  **选择驱动/PPD文件**：这是最关键的一步。CUPS 会根据打印机型号自动推荐一个驱动。
            *   如果列表里有您的打印机型号，直接选择它。
            *   如果没有，可以尝试选择一个同系列或通用的驱动（如 Generic PostScript/PCL Driver）。
            *   如果厂商提供了 PPD (PostScript Printer Description) 文件，您可以选择“Provide a PPD File”并上传它。

4.  **安装厂商驱动**：
    *   对于某些品牌的打印机（如惠普 HP），安装官方驱动和工具会获得更好的支持。
        ```bash
        sudo apt install hplip hplip-gui
        ```
        安装后，可以运行 `hp-setup` 命令来通过图形界面配置 HP 打印机。

## Debian 蓝牙无法使用/配对

蓝牙问题通常与固件、驱动或服务未运行有关。

**排查步骤：**

1.  **安装蓝牙相关的软件包**：
    ```bash
    sudo apt install bluetooth bluez blueman
    ```
    *   `bluez` 是 Linux 的官方蓝牙协议栈。
    *   `blueman` 是一个比默认设置更强大的蓝牙管理器。

2.  **检查蓝牙服务状态**：
    ```bash
    sudo systemctl enable --now bluetooth
    sudo systemctl status bluetooth
    ```
    确保服务是 `active (running)` 状态。

3.  **检查硬件是否被识别和开启**：
    *   使用 `rfkill list` 命令查看。
        ```bash
        rfkill list
        # 0: hci0: Bluetooth
        #   Soft blocked: no
        #   Hard blocked: no
        ```
    *   确保蓝牙设备没有被“软屏蔽 (Soft blocked)”或“硬屏蔽 (Hard blocked)”。
    *   如果软屏蔽了，使用 `rfkill unblock bluetooth` 来解锁。
    *   如果硬屏蔽了，通常需要通过笔记本电脑上的物理开关或 Fn 功能键来开启。

4.  **安装固件**：
    *   和 Wi-Fi 一样，一些蓝牙芯片也需要非自由固件。可以尝试安装 `firmware-linux-nonfree` 或针对特定厂商的固件包。

5.  **使用 `bluetoothctl` 命令行工具**：
    *   这是一个强大的交互式蓝牙控制工具。
    *   在终端输入 `bluetoothctl`。
    *   在 `[bluetooth]#` 提示符下，输入以下命令：
        ```
        power on
        agent on
        default-agent
        scan on     # 开始扫描设备
        # 找到你的设备MAC地址后
        pair <device_MAC_address>
        trust <device_MAC_address>
        connect <device_MAC_address>
        scan off
        ```

## Debian 外接显示器不显示/设置

外接显示器的问题通常和显卡驱动、连接线或桌面环境的显示设置有关。

**排查步骤：**

1.  **检查物理连接**：
    *   确保 HDMI/DisplayPort/USB-C 线缆两端都已插好。
    *   尝试更换一根线缆，排除线缆故障的可能。

2.  **安装正确的显卡驱动**：
    *   这是最常见的原因。请确保您已经为 NVIDIA/AMD 显卡安装了正确的驱动。参考 **[桌面环境与显示](#debian-安装-nvidia-驱动)** 部分的教程。没有正确的驱动，系统可能无法识别或正确驱动多台显示器。

3.  **使用显示设置工具**：
    *   **GNOME**：进入“设置” -> “显示”。在这里您应该能看到所有已连接的显示器。您可以调整它们的排列方式（主副屏、左右位置）、分辨率、刷新率和缩放比例。如果未检测到，尝试点击“检测显示器”。
    *   **KDE Plasma**：进入“系统设置” -> “显示与监控”。功能与 GNOME 类似。
    *   **Xfce**：进入“设置” -> “显示”。
    *   **命令行工具 `xrandr`**：
        *   运行 `xrandr` 查看所有检测到的显示器及其支持的模式。
        *   如果外接显示器（如 `HDMI-1`）已连接但未启用，可以手动启用它：
            ```bash
            # --auto 使用最佳分辨率，--right-of eDP-1 表示将其放在主屏右侧
            xrandr --output HDMI-1 --auto --right-of eDP-1
            ```

4.  **笔记本盖子问题**：
    *   有些系统默认在合上笔记本盖子时会挂起或关闭外接显示器。
    *   您可以在桌面环境的“电源管理”设置中，修改“合上盖子时”的动作为“不执行任何操作”。

## Debian 触摸板设置/失灵

触摸板失灵或功能不全（如无法多指手势）通常是因为缺少驱动或配置不当。

**排查步骤：**

1.  **确认驱动类型**：
    *   现代笔记本电脑通常使用 `libinput` 作为触摸板的驱动，它提供了对多指手势的良好支持。旧系统可能使用 `synaptics` 驱动。
    *   检查是否安装了 `libinput` 驱动：
        ```bash
        sudo apt install xserver-xorg-input-libinput
        ```

2.  **检查触摸板是否被禁用**：
    *   很多笔记本有禁用触摸板的 `Fn` 功能键，检查是否误触了。
    *   在桌面环境的“鼠标和触摸板”设置中，检查是否有“禁用触摸板”的选项。

3.  **GNOME: 使用“优化”工具**：
    *   `sudo apt install gnome-tweaks`
    *   打开“优化” -> “键盘和鼠标”，在这里可以调整触摸板的点击方式（轻触点击、右键方式等）。

4.  **查看内核日志**：
    *   运行 `dmesg | grep -i psmouse` 或 `dmesg | grep -i synaptics` 可能会看到与触摸板相关的错误信息。

5.  **BIOS/UEFI 设置**：
    *   在极少数情况下，BIOS 中可能有触摸板相关的设置，例如 "Advanced" 或 "Basic" 模式。可以检查并确保其设置为 "Advanced" 模式以支持更多功能。 