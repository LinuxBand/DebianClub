# 特定软件安装与问题

## Debian 如何安装 Chrome/Chromium

*   **Chromium**：是 Chrome 的开源基础，可以直接从 Debian 的官方仓库安装。
*   **Google Chrome**：是 Google 在 Chromium 基础上开发的闭源浏览器，包含了一些额外的专有组件（如内嵌的 Flash Player、某些多媒体编解码器）。需要添加 Google 的官方源来安装。

**安装 Chromium**

```bash
sudo apt update
sudo apt install chromium
```

**安装 Google Chrome (推荐)**

1.  **添加 Google 的软件源和密钥**：
    *   Google 提供了一个 `.deb` 包，它会自动帮你完成添加软件源和密钥的工作。
    *   **步骤**：
        1.  访问 [Google Chrome 官网](https://www.google.com/chrome/)。
        2.  点击“下载 Chrome”，网站会自动检测到您是 Debian/Ubuntu 系统，并提供一个 `64 bit .deb` 包。
        3.  下载这个 `.deb` 文件 (例如 `google-chrome-stable_current_amd64.deb`)。

2.  **安装 `.deb` 包**：
    *   打开终端，`cd` 到您的下载目录。
    *   使用 `apt` 来安装，它会自动处理依赖：
        ```bash
        sudo apt install ./google-chrome-stable_current_amd64.deb
        ```
    *   安装完成后，Google 的软件源会被自动添加到 `/etc/apt/sources.list.d/` 目录下。这意味着，以后您每次运行 `sudo apt upgrade` 时，Chrome 都会自动更新到最新版本。

## Debian 如何安装 Office/Word/Excel

在 Linux 上运行 Microsoft Office 有多种方案，从高度兼容的开源替代品到使用兼容层运行原生 Windows 版本。

**方案一：使用 LibreOffice (默认，推荐)**

*   Debian 默认安装的办公套件就是 [LibreOffice](https://www.libreoffice.org/)。它是一个功能强大且免费开源的办公软件，高度兼容 Microsoft Office 文档格式（`.docx`, `.xlsx`, `.pptx`）。
*   对于绝大多数日常办公和文档编辑任务，LibreOffice 完全可以胜任。
    ```bash
    sudo apt install libreoffice
    ```

**方案二：使用 WPS Office for Linux**

*   WPS Office 对 Microsoft Office 的界面和操作习惯模仿得更像，因此对于从 Windows 过渡来的用户可能感觉更亲切。
*   **安装方法**：
    1.  访问 [WPS Office for Linux 官网](https://www.wps.cn/product/wpslinux/)。
    2.  下载对应您系统架构的 `.deb` 包。
    3.  使用 `apt` 安装：`sudo apt install ./wps-office_xxxx.deb`。

**方案三：使用在线版 Office 365**

*   如果您有 Office 365 订阅，可以直接在浏览器中使用网页版的 Word, Excel, PowerPoint。功能相对完整，兼容性是最好的。

**方案四：通过 Wine/CrossOver 运行原生 Windows 版**

*   这是为要求 100% 兼容性（例如处理带有复杂宏的 Excel 文件）的用户准备的终极方案。
*   **Wine**：是一个免费的兼容层，可以让你在 Linux 上运行 Windows 程序。配置过程可能比较复杂。
*   **CrossOver**：是一个基于 Wine 的商业软件，它为许多流行的 Windows 应用（包括 Microsoft Office）提供了预配置好的安装脚本，大大简化了安装和配置过程，兼容性也更好。如果您的工作严重依赖 MS Office，购买 CrossOver 是一个值得的投资。

## Debian 如何安装微信/QQ

由于腾讯官方没有发布原生的 Linux 版微信和 QQ，我们同样需要借助兼容层或第三方客户端。

**方案一：使用 Wine (通用，免费)**

*   这是最基础的方法。您需要先安装 Wine，然后下载 Windows 版的微信或 QQ 安装包 (`.exe`)，通过 Wine 来运行它。
*   体验可能不稳定，不同版本的 Wine 对微信/QQ 的支持程度也不同，可能会遇到字体、窗口、输入法等问题。

**方案二：使用第三方封装的客户端 (推荐，更稳定)**

*   社区中有开发者将 Wine 和 Windows 版的微信/QQ 打包在一起，做成了开箱即用的 Linux 应用，通常以 Flatpak, AppImage 或 `.deb` 的形式发布。
*   **deepin-wine-wechat / deepin-wine-qq**：这是由深度 (Deepin) 团队维护的 Wine 环境，对微信和 QQ 的兼容性做了特别优化。其他发行版可以通过打包好的项目来安装。
*   **在非 Deepin 系统上安装**：可以查找并使用一些将 deepin-wine 移植过来的项目，例如在 GitHub 上搜索 `deepin-wine-wechat-arch` (虽然是为 Arch 打包，但可以借鉴其思路) 或寻找对应的 Flatpak 版本。
*   **使用 Flatpak 安装**：这是目前最推荐的方式之一，因为它沙箱化，不污染主系统。
    ```bash
    # 确保已安装 Flatpak 并添加了 Flathub 源
    flatpak install flathub com.qq.QQ # 或其他社区打包的标识符
    flatpak install flathub io.github.wechat-universal # 这是一个例子，具体标识符请在 Flathub 网站查询
    ```

## Debian 如何安装 Steam

在 Debian 上安装 Steam 并玩游戏已经变得非常简单。

**安装步骤：**

1.  **启用 32 位架构支持**：
    *   Steam 客户端本身以及许多 Windows 游戏（通过 Proton 运行）都需要 32 位库的支持。
    ```bash
    sudo dpkg --add-architecture i386
    ```

2.  **启用 `contrib` 和 `non-free` 源**：
    *   编辑 `/etc/apt/sources.list`，确保包含了 `contrib` 和 `non-free`。

3.  **更新并安装 Steam**：
    ```bash
    sudo apt update
    sudo apt install steam
    ```
    Debian 仓库中的 `steam` 包是一个启动器，它会自动下载并安装最新的 Steam 客户端。

4.  **安装显卡驱动**：
    *   **这是流畅游戏体验的绝对前提！** 请务必为您的 NVIDIA 或 AMD 显卡安装最新的闭源驱动。
    *   参考 **[桌面环境与显示](#debian-安装-nvidia-驱动)** 部分的教程。

5.  **开启 Steam Play (Proton)**：
    *   Proton 是 Valve 公司基于 Wine 开发的一个兼容层，内置于 Steam 客户端，可以让你一键运行海量的 Windows 游戏。
    *   **步骤**：
        1.  打开 Steam 客户端。
        2.  点击左上角的 “Steam” -> “设置”。
        3.  在左侧选择 “Steam Play” 选项卡。
        4.  勾选 “为所有其他产品启用 Steam Play”。
        5.  在下拉菜单中选择一个最新的 Proton 版本（例如 Proton Experimental）。
        6.  重启 Steam。

现在，您就可以像在 Windows 上一样，直接在您的游戏库中点击“安装”和“运行”来玩 Windows 游戏了。 