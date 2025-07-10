# 系统配置与基础使用

## Debian 安装后没有声音

声音问题通常与驱动程序、错误的输出设备选择或音量被静音有关。

**排查步骤：**

1.  **检查是否静音**：
    *   点击系统托盘的声音图标，确保音量没有被设置为静音，并且滑动条不在最左侧。
    *   打开 `alsamixer`。在终端中输入 `alsamixer` 并回车。
        *   这是一个命令行混音器。使用左右箭头键选择不同的控制条，如 `Master`, `Headphone`, `Speaker`, `PCM`。
        *   使用上下箭头键调整音量。
        *   如果某个控制条下方显示 `MM`，表示它被静音了，按 `M` 键可以取消静音（变为 `00`）。
        *   按 `Esc` 退出。

2.  **选择正确的输出设备**：
    *   进入“系统设置” -> “声音”。
    *   在“输出”标签页下，检查“输出设备”是否选择了正确的设备（例如“内置扬声器”或“耳机”）。有时候系统可能会错误地选择了 HDMI 或其他数字输出。

3.  **重新加载 ALSA (Advanced Linux Sound Architecture)**：
    ```bash
    sudo alsa force-reload
    ```
    这个命令会强制重新加载声卡驱动模块。

4.  **安装 `pavucontrol` 进行详细诊断**：
    *   `pavucontrol` 是 PulseAudio 的音量控制工具，提供比默认设置更详细的选项。
    *   安装：`sudo apt install pavucontrol`
    *   打开 `pavucontrol`：
        *   在 **“输出设备”** 选项卡中，确保正确的设备（如内置声卡）旁边的绿色对勾图标是亮着的，表示它是备用设备。
        *   在 **“配置”** 选项卡中，确保您的声卡配置文件被设置为“模拟立体声双工”或类似的选项，而不是“关闭”。

## Debian 屏幕分辨率不对/无法设置

分辨率问题多与显卡驱动或显示器识别有关。

**解决方案：**

1.  **安装正确的显卡驱动**：
    *   这是最根本的解决方法。开源的 `nouveau` (NVIDIA) 或 `modesetting` (AMD/Intel) 驱动可能无法支持所有显示器的所有分辨率。
    *   请参考 **[桌面环境与显示](#debian-安装-nvidia-驱动)** 部分安装对应的闭源驱动。

2.  **使用 `xrandr` 手动添加分辨率**：
    *   如果驱动已正确安装但所需分辨率仍未出现，可以尝试手动添加。
    *   **步骤**：
        1.  查看显示器接口名称。运行 `xrandr`，找到已连接的显示器，名称可能是 `DP-1`, `HDMI-1`, `eDP-1` 等。
        2.  生成新分辨率的模式行。使用 `cvt` 命令，例如为您想要的分辨率 `1920 1080` 生成模式行：
            ```bash
            cvt 1920 1080
            ```
            它会输出一行类似 `Modeline "1920x1080_60.00" ...` 的内容。
        3.  创建新模式。复制 `cvt` 输出中从 `"1920x1080_60.00"` 开始的所有内容，粘贴到 `xrandr --newmode` 后面。
            ```bash
            xrandr --newmode "1920x1080_60.00"  173.00  1920 2048 2248 2576  1080 1083 1088 1120 -hsync +vsync
            ```
        4.  将新模式添加到显示器。
            ```bash
            xrandr --addmode DP-1 "1920x1080_60.00"
            ```
            (将 `DP-1` 替换为您的显示器接口名)
        5.  应用新分辨率。
            ```bash
            xrandr --output DP-1 --mode "1920x1080_60.00"
            ```
    *   为了让这个设置在重启后依然生效，需要将 `xrandr` 的 `newmode`, `addmode`, `output` 命令写入到启动脚本中，例如 `~/.xprofile`。

## Debian 如何设置中文语言和输入法

**1. 设置中文语言环境 (Locale)**

*   安装语言包：
    ```bash
    sudo apt install locales-all
    ```
*   配置 locale：
    ```bash
    sudo dpkg-reconfigure locales
    ```
*   在图形界面中，找到并选择 `zh_CN.UTF-8 UTF-8`，按空格键选中，然后按 Tab 键到 `<Ok>`。
*   在下一个界面中，选择 `zh_CN.UTF-8` 作为默认语言环境。
*   重启系统后，界面语言将变为中文。

**2. 安装中文输入法 (Fcitx5)**

Fcitx5 是目前推荐的输入法框架，它比旧的 IBus 或 Fcitx4 更现代、更稳定。

*   **安装 Fcitx5 及中文引擎**：
    ```bash
    sudo apt install fcitx5 fcitx5-chinese-addons fcitx5-frontend-gtk3 fcitx5-frontend-qt5
    ```
    `fcitx5-chinese-addons` 包含了一些常用的中文输入法，如拼音、双拼、五笔等。

*   **配置环境变量**：
    *   创建一个配置文件：
        ```bash
        sudo nano /etc/environment.d/90-fcitx5.conf
        ```
    *   在文件中添加以下内容：
        ```
        GTK_IM_MODULE=fcitx
        QT_IM_MODULE=fcitx
        XMODIFIERS=@im=fcitx
        ```
    *   保存并退出。

*   **配置输入法**：
    *   重启电脑使环境变量生效。
    *   在应用程序菜单中找到并打开“Fcitx5 配置”。
    *   在“输入法”标签页中，确保“Pinyin”或其他你需要的中文输入法在列表中。如果不在，点击左下角的“+”号，取消勾选“仅显示当前语言”，然后搜索并添加。
    *   通常使用 `Ctrl+Space` 可以在中英文之间切换。

## Debian 时间不对/时区设置

*   **自动同步时间 (NTP)**
    *   Debian 默认使用 `systemd-timesyncd` 来通过网络自动同步时间。
    *   检查服务状态：`timedatectl status`
    *   如果 `NTP service` 是 `inactive`，可以启用它：
        ```bash
        sudo timedatectl set-ntp true
        ```

*   **设置时区**
    *   使用 `timedatectl` 命令：
        ```bash
        sudo timedatectl set-timezone Asia/Shanghai
        ```
        (将 `Asia/Shanghai` 替换为您所在的时区。可以使用 `timedatectl list-timezones` 查看所有可用时区。)
    *   使用图形界面：在“设置” -> “日期与时间”中，关闭“自动时区”，然后手动在地图上选择或搜索您的位置。

*   **解决与 Windows 双系统的时间冲突**
    *   **问题**：Windows 默认将硬件时钟 (RTC) 设为本地时间，而 Linux 默认将其设为协调世界时 (UTC)。这导致切换系统后时间会相差几个小时。
    *   **解决方案 (推荐)**：让 Linux 使用本地时间，以兼容 Windows。
        ```bash
        sudo timedatectl set-local-rtc 1 --adjust-system-clock
        ```

## Debian 如何启用 sudo

在 Debian 安装过程中，如果您为 root 用户设置了密码，那么默认情况下，您创建的普通用户是不在 `sudo` 用户组里的。

**解决方案：**

1.  **切换到 root 用户**：
    *   打开终端，输入 `su -` 并回车。
    *   输入您在安装时设置的 `root` 密码。

2.  **将您的用户添加到 `sudo` 组**：
    *   执行以下命令，将 `your_username` 替换为您的实际用户名：
        ```bash
        usermod -aG sudo your_username
        ```
        *   `-a` 表示追加 (append)，`-G` 指定用户组。

3.  **验证**：
    *   退出 root shell (输入 `exit` 或按 `Ctrl+D`)。
    *   **完全注销或重启电脑**，以使用户组的变更完全生效。
    *   重新登录后，打开终端，尝试执行一个需要 `sudo` 的命令，如 `sudo apt update`。它应该会提示您输入**您自己的用户密码**，而不是 root 密码。

## Debian 如何修改软件源 sources.list

为了加快下载速度，通常建议将 Debian 官方源更换为国内的镜像源。

**步骤：**

1.  **备份原始文件**：这是一个好习惯。
    ```bash
    sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
    ```

2.  **编辑 `sources.list` 文件**：
    ```bash
    sudo nano /etc/apt/sources.list
    ```

3.  **替换内容**：
    *   删除或用 `#` 注释掉文件中的所有现有行。
    *   选择一个国内镜像源，例如清华大学源，并将以下内容粘贴进去 (以 Debian 12 "Bookworm" 为例)：
        ```
        deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bookworm main contrib non-free non-free-firmware
        deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bookworm-updates main contrib non-free non-free-firmware
        deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bookworm-backports main contrib non-free non-free-firmware
        deb https://security.debian.org/debian-security bookworm-security main contrib non-free non-free-firmware
        ```
    *   其他常用镜像源还包括：
        *   阿里云：`https://mirrors.aliyun.com/debian/`
        *   中科大：`https://mirrors.ustc.edu.cn/debian/`

4.  **保存并更新**：
    *   保存文件并退出编辑器。
    *   执行 `sudo apt update` 来刷新软件包列表。您应该会看到下载地址已经变成了您新设置的镜像地址。

## Debian 如何更新系统

保持系统更新是获取安全补丁和软件修复的重要途径。

**标准更新流程：**

1.  **更新软件包列表**：
    *   这个命令会从您 `sources.list` 中配置的所有软件源下载最新的软件包信息（但**不下载**软件包本身）。
    ```bash
    sudo apt update
    ```

2.  **升级已安装的软件包**：
    *   这个命令会将您系统中所有已安装的软件包升级到 `apt update` 获取到的最新版本。
    ```bash
    sudo apt upgrade
    ```
    *   在升级过程中，它会列出将要升级的软件包，并询问您是否继续。输入 `y` 并回车。

**`full-upgrade` vs `upgrade`**：

*   `sudo apt upgrade`：只会升级现有的包，**不会**为了解决依赖关系而**删除**任何包。
*   `sudo apt full-upgrade` (等同于 `apt-get dist-upgrade`)：更智能。在升级时，如果为了解决一个重要包的升级，需要**安装新包**或**删除旧包**，它会这样做。
    *   在进行大的版本更新（例如从 Debian 11 升级到 12）时，或者在 `testing`/`sid` 分支上，推荐使用 `full-upgrade`。对于日常在 `stable` 分支上的更新，`upgrade` 通常足够了。

**组合命令**：
您可以将两个命令合二为一：
```bash
sudo apt update && sudo apt upgrade -y
```
*   `&&` 表示只有前一个命令成功执行后，才会执行后一个命令。
*   `-y` 表示自动对所有提示回答“是”，适用于您信任所有待更新的包。

## `sudo` 和 `su` 有什么区别？

`su` 和 `sudo` 都是用于提升用户权限的命令，但它们的工作哲学和使用场景有所不同。

*   **`su` (Switch User)**
    *   **作用**：完全切换到另一个用户，最常见的是切换到 `root` 用户。
    *   **如何工作**：当您执行 `su -` 或 `su -l root` 时，系统会要求您输入 **`root` 用户的密码**。成功后，您会获得一个 `root` 的完整登录 Shell，拥有 `root` 的所有权限和环境变量，直到您输入 `exit` 退出。
    *   **优点**：对于需要长时间执行多条管理命令的场景，一次 `su` 切换后很方便。
    *   **缺点**：
        *   需要知道并共享 `root` 密码，降低了安全性。如果多个用户都需要管理权限，他们都得知道同一个 `root` 密码。
        *   操作无法追溯。系统日志只会记录某个用户 `su` 成了 `root`，但之后 `root` 执行的所有命令都无法直接追溯到是哪个原始用户操作的。

*   **`sudo` (Superuser Do)**
    *   **作用**：以另一个用户（默认为 `root`）的身份，**临时**执行**单条**命令。
    *   **如何工作**：当您执行 `sudo apt update` 时，系统会要求您输入 **您自己的用户密码** 来进行身份验证。验证成功后，只有 `apt update` 这条命令会以 `root` 权限运行。
    *   **优点**：
        *   **更安全**：不需要共享 `root` 密码。权限可以精细地分配给指定的用户或用户组，并且可以限制他们只能执行特定的命令。
        *   **可追溯**：每个通过 `sudo` 执行的命令都会被详细记录在系统日志中（通常是 `/var/log/auth.log`），包括哪个用户、在何时、执行了什么命令。
        *   **便利性**：`sudo` 默认会缓存认证结果 15 分钟，在此期间内执行后续的 `sudo` 命令无需再次输入密码。
    *   **缺点**：对于每一条需要提升权限的命令，都需要在前面加上 `sudo`，可能稍显繁琐。

**为什么 Debian 默认不给普通用户 `sudo` 权限？**

这源于 Debian 传统且保守的安全哲学。在安装过程中，如果用户为 `root` 账户设置了密码，Debian 会认为用户倾向于使用传统的 `su` 方式进行系统管理。这种方式强制将日常操作和系统管理明确分开，被认为是一种更安全的实践，可以防止用户在无意中以高权限执行了危险的命令。

相比之下，像 Ubuntu 这样的发行版则默认禁用 `root` 账户，并把初始用户加入 `sudo` 组，鼓励用户使用 `sudo` 进行所有管理操作。这两种方式各有优劣，Debian 提供了选择的自由。

## 如何使用 Timeshift 备份和恢复我的系统？

Timeshift 是一个强大的系统快照工具，类似于 Windows 的“系统还原”或 macOS 的 Time Machine。它专注于备份系统文件和配置，默认不包含用户个人数据（`/home` 目录），是防止系统更新或错误配置导致问题的利器。

**1. 安装 Timeshift**
```bash
sudo apt install timeshift
```

**2. 首次配置**

*   打开 Timeshift，它会首先进行设置向导。
*   **选择快照类型**：
    *   **RSYNC**：推荐选项。它会将文件复制到一个指定的备份盘上，格式为人可读的文件和目录。任何格式化的 Linux 分区都可以作为备份目标。
    *   **BTRFS**：如果您的根分区 `/` 使用了 BTRFS 文件系统，可以选择此项。它利用 BTRFS 的内置快照功能，创建和恢复速度极快，且占用空间小。
*   **选择快照位置**：选择一个**非系统盘**的分区来存储快照。例如，如果您有一块额外的硬盘或一个专门的备份分区，请选择它。**强烈不建议将快照存储在系统盘 `/` 上**。
*   **设置快照计划**：可以设置自动快照的频率（每日、每周、每月等）以及保留的数量。合理的设置可以确保您总有近期的快照可用，同时不会占满硬盘。

**3. 创建与恢复**

*   **创建手动快照**：在主界面点击“创建”按钮，即可立即生成一个当前的系统快照。建议在进行重大系统更改（如升级系统、安装新驱动）前手动创建一个。
*   **恢复系统**：
    *   如果您的系统还能正常启动，只需打开 Timeshift，从列表中选择一个您想要恢复到的时间点，点击“恢复”。
    *   如果系统已经无法启动，您需要使用 Debian Live U 盘启动电脑。
    *   在 Live 环境中安装 Timeshift，然后运行它。它会自动检测到您存储在其他分区上的快照。
    *   选择快照并点击“恢复”，它会将您的系统分区恢复到快照创建时的状态。

## 如何管理和切换系统的默认应用程序？

在 Debian 中，默认应用程序的管理由 `update-alternatives` 系统负责。它通过符号链接机制，让管理员可以方便地在多个提供相同功能的程序之间进行切换。

**常见场景：**

*   **切换默认文本编辑器 (`editor`)**
    1.  查看当前所有可用的“编辑器”选项：
        ```bash
        sudo update-alternatives --config editor
        ```
    2.  系统会列出所有已安装并注册为 `editor` 的程序（如 `nano`, `vim`, `code` 等），并带有一个编号。
    3.  输入您想设为默认的编辑器的编号，然后按回车即可。

*   **切换 Java 版本 (`java`)**
    1.  查看可用的 Java 版本：
        ```bash
        sudo update-alternatives --config java
        ```
    2.  输入编号进行切换。

*   **切换默认浏览器 (`x-www-browser`)**
    1.  查看可用的浏览器选项：
        ```bash
        sudo update-alternatives --config x-www-browser
        ```
    2.  选择您想作为默认的浏览器，如 `firefox-esr` 或 `google-chrome`。

**工作原理：**
`update-alternatives` 在 `/etc/alternatives/` 目录下创建符号链接。例如，`/usr/bin/editor` 这个命令本身就是一个指向 `/etc/alternatives/editor` 的符号链接，而 `/etc/alternatives/editor` 又会指向您选择的真实程序，如 `/bin/nano`。当你使用 `--config` 切换时，实际上就是改变了 `/etc/alternatives/editor` 这个“中间人”链接的目标。

## `~/.bashrc`, `~/.profile`, `/etc/profile` 这些文件有什么区别？

这些都是 Shell 的配置文件，用于定义环境变量、别名、函数等，但它们的加载时机和作用域各不相同。

*   **/etc/profile**:
    *   **作用域**：全局，对系统上**所有用户**生效。
    *   **加载时机**：当任何用户**登录 (login)** 时加载。这包括通过终端登录、SSH 登录或图形界面登录。
    *   **用途**：用于设置对所有用户都重要的系统级环境变量，如 `PATH`。

*   **~/.profile**:
    *   **作用域**：单个用户。`~` 代表用户的主目录（例如 `/home/alan`）。
    *   **加载时机**：当该用户**登录 (login)** 时加载。它会在 `/etc/profile` 之后被加载。
    *   **用途**：用于设置该用户专属的环境变量和启动脚本。一个典型的 `~/.profile` 文件会检查 `~/.bashrc` 是否存在，如果存在则加载它。

*   **~/.bashrc**:
    *   **作用域**：单个用户。
    *   **加载时机**：当该用户启动一个**交互式的、非登录 (non-login)** 的 Shell 时加载。最常见的例子就是您在图形界面中打开一个新的终端窗口。
    *   **用途**：用于定义别名 (`alias`)、自定义的 Shell 函数、设置命令提示符 (`PS1`) 等与交互式操作强相关的内容。

**总结：**

| 文件              | 加载时机                               | 作用                                       |
| ----------------- | -------------------------------------- | ------------------------------------------ |
| `/etc/profile`    | **所有用户**的**登录** Shell          | 全局环境变量和脚本                         |
| `~/.profile`      | **单个用户**的**登录** Shell          | 用户个人环境变量和脚本，通常会调用 `.bashrc` |
| `~/.bashrc`       | **单个用户**的**交互式非登录** Shell | 用户个人的别名、函数、命令提示符等         |

**一个常见的混淆点**：为什么我在图形界面里打开终端，`~/.profile` 里的环境变量也生效了？
这是因为大多数现代的终端模拟器（如 GNOME Terminal）在启动时，会默认将自己作为“登录 Shell”来运行，从而主动加载 `/etc/profile` 和 `~/.profile`，以确保用户环境的统一性。但从严格的定义上讲，打开终端窗口属于“交互式非登录 Shell”的范畴。 