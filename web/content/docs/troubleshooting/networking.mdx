# 网络连接问题

## Debian 连不上 Wi-Fi

在 Debian 上无法连接 Wi-Fi，**99% 的情况是由于缺少对应的无线网卡固件 (Firmware)**。Debian 出于对自由软件的坚持，默认的标准安装镜像不包含这些非自由的固件。

**核心解决方案：安装固件包**

1.  **识别您的无线网卡**：
    *   打开终端，输入 `lspci | grep -i network` 或 `lsusb | grep -i network` 来查看您的无线网卡型号。常见的厂商有 Intel, Realtek, Broadcom, Atheros。

2.  **获取并安装固件**：
    *   **最佳方式：使用有线网络**
        *   如果您的电脑有以太网口，先插上网线。
        *   编辑 `/etc/apt/sources.list`，确保包含了 `non-free` 和 `non-free-firmware`。
        *   更新软件包列表：`sudo apt update`
        *   根据您的网卡厂商，安装对应的固件包：
            *   **Intel 网卡**：`sudo apt install firmware-iwlwifi`
            *   **Realtek 网卡**：`sudo apt install firmware-realtek`
            *   **Broadcom 网卡**：`sudo apt install firmware-brcm80211`
            *   **Atheros 网卡**：`sudo apt install firmware-atheros`
        *   如果不确定，可以安装一个集合包：`sudo apt install firmware-linux-nonfree`
        *   安装后，最好**重启电脑**，或者重新加载内核模块。

    *   **没有有线网络：手动安装**
        1.  在另一台可上网的电脑上，访问 [Debian 软件包网站](https://packages.debian.org/)。
        2.  搜索并下载您需要的固件包（例如 `firmware-iwlwifi`），得到一个 `.deb` 文件。
        3.  将这个 `.deb` 文件通过 U 盘拷贝到您的 Debian 电脑上。
        4.  使用 `apt` 命令安装它：`sudo apt install ./firmware-iwlwifi_xxxxxxxx_all.deb`。

    *   **一劳永逸：使用非官方的固件集成镜像**
        *   在安装 Debian 时，直接从 [Debian 非官方镜像站](https://cdimage.debian.org/cdimage/unofficial/non-free/cd-including-firmware/) 下载包含所有非自由固件的安装镜像。这样在安装过程中就能直接识别并配置好无线网络。

## Debian 有线网络无法连接

有线网络通常比无线网络问题少，因为它需要的固件更通用。如果遇到问题，可以按以下步骤排查：

1.  **检查物理连接**：
    *   确保网线两端都已插好。
    *   检查路由器或交换机的对应端口指示灯是否正常闪烁。

2.  **检查网卡是否被识别**：
    *   `lspci | grep -i ethernet`
    *   如果能看到您的网卡信息，说明硬件已被系统识别。

3.  **检查网络管理器状态**：
    *   Debian 桌面版通常使用 `NetworkManager` 服务来管理网络。
    *   检查服务状态：`sudo systemctl status NetworkManager`
    *   如果服务未运行，启动它：`sudo systemctl start NetworkManager`
    *   在系统托盘的网络图标上点击，查看是否有可用的有线连接。

4.  **检查 IP 地址**：
    *   运行 `ip a` 或 `ifconfig`。
    *   查看您的有线网卡接口（通常是 `enpXsY` 或 `eth0`）是否获取到了 IP 地址。
    *   如果 IP 地址是 `169.254.x.x`，这表示您的电脑无法从路由器（DHCP 服务器）获取到 IP 地址。请检查路由器设置或重启路由器。

## Debian 如何设置静态 IP

在服务器或需要固定地址的设备上，设置静态 IP 很常见。

**方法一：使用 `nmtui` (推荐，简单)**

`nmtui` 是一个基于文本的 NetworkManager 配置工具，非常直观。

1.  在终端中运行 `sudo nmtui`。
2.  选择 “Edit a connection”，回车。
3.  选择您的有线或无线连接，移动到 “Edit...”，回车。
4.  在 “IPv4 CONFIGURATION” 部分，将 `<Automatic>` 改为 `<Manual>`。
5.  在右侧 “Addresses” 部分点击 `<Add...>`，输入您想设置的静态 IP 地址和子网掩码，格式为 `192.168.1.100/24`。
6.  在 “Gateway” 处输入您的网关地址（通常是路由器的 IP）。
7.  在 “DNS servers” 处添加 DNS 服务器地址，如 `8.8.8.8` 或 `114.114.114.114`。
8.  移动到最下方的 `<OK>`，回车保存。
9.  退出 `nmtui`，然后重启网络连接使其生效：`sudo systemctl restart NetworkManager`。

**方法二：修改配置文件 (服务器常用)**

对于没有桌面的服务器，可以直接编辑 `/etc/network/interfaces` 文件。

**注意**：如果您的系统正在使用 NetworkManager，请不要使用此方法，会产生冲突。此方法适用于由 `ifupdown` 管理网络接口的系统。

1.  编辑文件 `sudo nano /etc/network/interfaces`。
2.  找到对应的网络接口配置，修改如下：
    ```
    # The primary network interface
    allow-hotplug enp1s0
    # iface enp1s0 inet dhcp  <-- 注释掉或删除 DHCP 行

    # Static IP configuration
    iface enp1s0 inet static
        address 192.168.1.100
        netmask 255.255.255.0
        gateway 192.168.1.1
        dns-nameservers 8.8.8.8 1.1.1.1
    ```
3.  保存后，重启网络服务：`sudo systemctl restart networking` 或 `sudo /etc/init.d/networking restart`。

## Debian 如何共享文件夹

*   **Samba**：用于与 Windows 系统进行文件共享，也广泛用于 Linux 间共享。
*   **NFS (Network File System)**：是 Linux/UNIX 系统之间原生、高效的文件共享方式。

**使用 Samba (与 Windows 兼容)**

1.  **安装 Samba**：
    ```bash
    sudo apt install samba
    ```
2.  **创建共享目录**：
    ```bash
    mkdir /home/<your_username>/Share
    ```
3.  **配置 Samba**：
    *   编辑 `smb.conf` 文件：`sudo nano /etc/samba/smb.conf`
    *   在文件末尾添加您的共享配置：
        ```
        [PublicShare]
           comment = Public Shared Folder
           path = /home/<your_username>/Share
           browseable = yes
           writable = yes
           guest ok = yes
           read only = no
        ```
        这是一个简单的匿名共享配置，允许网络内任何人读写。
4.  **创建 Samba 用户**：
    *   为了安全，通常需要创建密码访问。Samba 的用户密码独立于系统密码。
    *   `sudo smbpasswd -a your_username` (用户名必须是已存在的系统用户)
    *   然后按提示为该用户设置 Samba 密码。
5.  **重启 Samba 服务**：
    ```bash
    sudo systemctl restart smbd nmbd
    ```
6.  **访问**：在 Windows 的文件资源管理器地址栏输入 `\\<debian_ip_address>\`，或者在 Linux 文件管理器中连接到 `smb://<debian_ip_address>/`。

## Debian 如何远程桌面连接

*   **VNC (Virtual Network Computing)**：跨平台，像直接操作屏幕一样。
*   **RDP (Remote Desktop Protocol)**：微软的协议，通过 `xrdp` 可以在 Linux 上实现。

**使用 VNC (以 TigerVNC 为例)**

1.  **在 Debian 上安装 VNC 服务器**：
    ```bash
    sudo apt install tigervnc-standalone-server tigervnc-xorg-extension
    ```
2.  **首次运行以设置密码**：
    *   运行 `vncserver`，它会提示您设置一个用于连接的密码。
3.  **配置 VNC 会话**：
    *   VNC 启动时需要知道要加载哪个桌面环境。编辑 `~/.vnc/xstartup` 文件：
        ```bash
        nano ~/.vnc/xstartup
        ```
    *   确保文件内容类似（以 Xfce 为例）：
        ```bash
        #!/bin/sh
        unset SESSION_MANAGER
        unset DBUS_SESSION_BUS_ADDRESS
        exec startxfce4
        ```
        如果是 GNOME，可能是 `exec gnome-session`；KDE 是 `exec startplasma-x11`。
    *   给文件添加执行权限：`chmod +x ~/.vnc/xstartup`
4.  **启动 VNC 服务器**：
    *   `vncserver :1` (这里的 `:1` 表示一个显示端口，连接时需要用到)
5.  **在另一台电脑上连接**：
    *   使用任何 VNC 客户端（如 RealVNC, TightVNC, TigerVNC Viewer）。
    *   服务器地址输入：`<debian_ip_address>:1`
    *   输入您之前设置的 VNC 密码。

**使用 RDP (xrdp)**

`xrdp` 实际上是在后台把 RDP 的请求转换成了一个 VNC 或本地 Xorg 会话。

1.  **安装 `xrdp`**：
    ```bash
    sudo apt install xrdp
    ```
2.  **将 `xrdp` 用户添加到 `ssl-cert` 组**：
    ```bash
    sudo adduser xrdp ssl-cert
    ```
3.  **重启 `xrdp` 服务**：
    ```bash
    sudo systemctl restart xrdp
    ```
4.  **连接**：
    *   在 Windows 上，打开“远程桌面连接”，输入 Debian 电脑的 IP 地址即可。
    *   登录时会看到 `xrdp` 的登录界面，选择 `Xorg` 会话，输入您的 Debian 用户名和密码。

## `/etc/network/interfaces` 和 `NetworkManager` 有什么关系？我应该用哪个？

这两者是 Debian 上两种不同的网络配置管理工具，通常您只应使用其中一种来避免冲突。

*   `/etc/network/interfaces` (由 `ifupdown` 包提供)
    *   **定位**：传统、稳定、基于文本文件的网络配置方式。
    *   **工作方式**：您需要手动编辑 `/etc/network/interfaces` 这个文件，在里面定义好每个网络接口（如 `enp3s0`）的配置（是 DHCP 还是静态 IP、地址是什么等等）。然后通过 `ifup <interface>` 和 `ifdown <interface>` 命令来启动或关闭该接口。
    *   **优点**：配置静态，非常可靠，没有多余的后台进程，在服务器环境中是首选。
    *   **缺点**：不灵活。对于需要频繁切换 Wi-Fi、使用 VPN、连接蓝牙网络的桌面用户来说，每次都手动修改文件非常不便。
    *   **适用场景**：**服务器**，或者网络环境固定不变的设备。

*   `NetworkManager`
    *   **定位**：现代、动态、功能强大的网络管理服务。
    *   **工作方式**：它是一个在后台持续运行的服务，能自动检测网络硬件、管理有线和无线连接、处理 VPN、提供图形化的配置界面（如系统托盘的网络图标、`nmtui`、`nm-connection-editor`）。
    *   **优点**：极其方便和强大。能轻松应对复杂的桌面网络需求，如保存多个 Wi-Fi 密码、在不同网络间自动切换、图形化配置等。
    *   **缺点**：对于极简的服务器环境来说，它是一个相对“重”的服务。
    *   **适用场景**：**所有桌面和笔记本电脑用户**。

**我应该用哪个？**

*   **如果您安装的是 Debian 桌面版 (GNOME, KDE, Xfce 等)，请使用 `NetworkManager`**。这是默认的配置方式，并且您看到的所有图形化网络工具都是它的前端。此时，您的 `/etc/network/interfaces` 文件内容应该非常简单，可能只包含 `source /etc/network/interfaces.d/*` 和一个回环 (`lo`) 接口的配置。**不要手动编辑它来配置您的主网卡**。
*   **如果您安装的是没有图形界面的 Debian 服务器，推荐使用 `/etc/network/interfaces`**。它更轻量和直接。

**如何知道哪个正在管理我的网络？**
默认情况下，如果 NetworkManager 服务正在运行，它会接管所有在 `/etc/network/interfaces` 中没有明确配置的设备。您可以通过 `sudo systemctl status NetworkManager` 查看其状态。

## `ping` 不通但能上网是什么问题？`DNS` 问题如何排查？

这是一个经典的网络问题，几乎总是指向 **DNS (Domain Name System)** 解析故障。

**问题分析**：
*   **能上网** (例如，在浏览器里直接访问 `114.114.114.114` 这样的 IP 地址可以打开页面)，这证明您的设备到互联网的 IP 路由是通的，物理连接、IP 地址、网关都没有问题。
*   **`ping` 不通** (例如，`ping www.baidu.com` 显示 `Name or service not known` 或 `Temporary failure in name resolution`)，这证明您的系统无法将 `www.baidu.com` 这个**域名**转换成它对应的 **IP 地址**。

DNS 的作用就像是互联网的电话本，负责将好记的域名翻译成机器能懂的 IP 地址。

**DNS 问题排查步骤：**

1.  **确认问题**：
    *   尝试 `ping` 一个域名：`ping www.debian.org` (很可能失败)
    *   尝试 `ping` 一个公网 IP 地址：`ping 8.8.8.8` (谷歌的 DNS 服务器)
    *   如果前者失败而后者成功，那么 100% 是 DNS 问题。

2.  **查看当前 DNS 配置**：
    *   DNS 服务器的地址记录在 `/etc/resolv.conf` 文件中。
    *   `cat /etc/resolv.conf`
    *   查看里面的 `nameserver` 条目。如果这个文件是空的，或者里面的 IP 地址是一个无法访问的内网地址（如 `127.0.0.53`，这是 `systemd-resolved` 的本地存根），就说明 DNS 配置有误。
    *   **注意**：这个文件通常由 NetworkManager 或 `resolvconf` 程序自动生成，**不建议直接手动修改**，因为重启网络后修改会丢失。

3.  **临时解决方法 (用于测试)**：
    *   手动修改 `/etc/resolv.conf`，加入一个可靠的公共 DNS。
    ```bash
    # 先备份
    sudo cp /etc/resolv.conf /etc/resolv.conf.bak
    # 编辑文件
    sudo nano /etc/resolv.conf
    ```
    *   删除所有内容，然后添加：
    ```
    nameserver 8.8.8.8
    nameserver 1.1.1.1
    ```
    *   保存后，立即再次尝试 `ping www.debian.org`，此时应该就通了。

4.  **永久解决方法 (通过网络管理工具)**：
    *   既然直接修改会被覆盖，我们就需要通过“上游”工具来配置。
    *   **使用 NetworkManager (桌面版)**：
        *   通过图形界面：在网络连接的设置里，找到 "IPv4" 标签页，将“方式”从“自动 (DHCP)”改为“自动 (DHCP，仅地址)”，然后在 "DNS 服务器" 字段中手动填入 `8.8.8.8, 1.1.1.1`。
        *   通过 `nmtui`：`sudo nmtui` -> "Edit a connection" -> 选择你的连接并编辑 -> 在 "DNS servers" 处添加。
    *   **使用 `/etc/network/interfaces` (服务器版)**：
        *   在静态配置中，添加 `dns-nameservers` 选项。
        ```
        iface enp1s0 inet static
            # ... 其他配置 ...
            dns-nameservers 8.8.8.8 1.1.1.1
        ```

## 如何在 Debian 上搭建和使用 `ssh` 服务？

SSH (Secure Shell) 是 Linux 系统管理和远程操作的基石。

**1. 在 Debian 上安装 SSH 服务器 (`openssh-server`)**

```bash
sudo apt update
sudo apt install openssh-server
```
安装过程非常简单。安装完成后，SSH 服务会自动启动并设置为开机自启。

**2. 检查 SSH 服务状态**

```bash
sudo systemctl status ssh
```
如果看到 `active (running)`，说明服务已正常运行。

**3. (可选) 修改 SSH 配置**

SSH 的主配置文件是 `/etc/ssh/sshd_config`。对于初次使用，默认配置通常已经足够安全和好用。一些常见的修改包括：

*   **修改默认端口**：将 `Port 22` 改为其他端口（如 `Port 2222`），可以减少被互联网上的自动扫描工具骚扰。
*   **禁止 root 登录**：确保 `PermitRootLogin` 设置为 `prohibit-password` (禁止密码登录) 或 `no` (完全禁止)，这是非常重要的安全实践。
*   **使用密钥认证**：禁用密码认证，只允许通过 SSH 密钥登录，是最高安全性的配置。将 `PasswordAuthentication` 设置为 `no`。

每次修改完配置文件后，都需要重启 SSH 服务来使其生效：
`sudo systemctl restart ssh`

**4. 如何从其他电脑连接到 Debian**

你需要知道你的 Debian 电脑的 IP 地址（通过 `ip a` 命令查看）和你的用户名。

*   **从 Linux 或 macOS 连接**：
    *   打开终端，使用 `ssh` 客户端命令：
    ```bash
    # 语法: ssh <username>@<ip_address>
    ssh alan@192.168.1.100

    # 如果修改了端口
    # 语法: ssh -p <port> <username>@<ip_address>
    ssh -p 2222 alan@192.168.1.100
    ```
    *   第一次连接时，会提示你确认服务器的指纹信息，输入 `yes` 即可。

*   **从 Windows 连接**：
    *   **现代 Windows (Windows 10/11)**：已经内置了 OpenSSH 客户端。直接打开 PowerShell 或命令提示符 (CMD)，使用和 Linux/macOS 完全相同的 `ssh` 命令。
    *   **使用第三方客户端**：可以使用经典的 PuTTY、MobaXterm、Xshell 等图形化 SSH 客户端。在主机名处输入 IP 地址，端口处输入端口号，然后点击连接。 