---
title: Windows 兼容 (Wine)
description: 学习如何在 Debian 上安装和配置 Wine，以便运行您需要的 Windows 应用程序和游戏。
---

# Windows 兼容 (Wine)

Wine (Wine Is Not an Emulator) 是一个能够在多种 POSIX-compliant 操作系统（如 Linux、macOS 及 BSD 等）上运行 Windows 应用的兼容层。它不是虚拟机或模拟器，而是实时将 Windows API 调用翻译成 POSIX 调用，让你无需 Windows 许可即可运行 Windows 程序。

## 启用 32 位架构

大多数 Windows 应用仍然是 32 位的，因此您需要在 64 位的 Debian 系统上启用对 32 位应用的支持 (multi-arch)。

```bash
sudo dpkg --add-architecture i386
sudo apt update
```

## 安装 Wine

您可以选择从 Debian 官方仓库或 WineHQ 官方仓库安装。WineHQ 的版本通常更新。

### 方案一：从 Debian 仓库安装

这是最简单直接的方法，但版本可能不是最新的。

```bash
sudo apt install wine wine32 wine64 libwine fonts-wine
```

### 方案二：从 WineHQ 官方仓库安装 (推荐)

这种方式可以获取最新的 Wine 版本，兼容性更好。

1.  **添加 WineHQ 密钥**:
    ```bash
    sudo mkdir -pm755 /etc/apt/keyrings
    sudo wget -O /etc/apt/keyrings/winehq-archive.key https://dl.winehq.org/wine-builds/winehq.key
    ```

2.  **添加 WineHQ 仓库**:
    (请根据您的 Debian 版本选择相应的命令)
    ```bash
    # For Debian 12 (Bookworm)
    sudo wget -NP /etc/apt/sources.list.d/ https://dl.winehq.org/wine-builds/debian/dists/bookworm/winehq-bookworm.sources
    
    # For Debian 11 (Bullseye)
    # sudo wget -NP /etc/apt/sources.list.d/ https://dl.winehq.org/wine-builds/debian/dists/bullseye/winehq-bullseye.sources
    ```

3.  **更新并安装 Wine**:
    ```bash
    sudo apt update
    sudo apt install --install-recommends winehq-stable
    ```
    `winehq-stable` 是稳定版，您也可以选择 `winehq-devel` (开发版) 或 `winehq-staging` (测试版)。

## 配置 Wine

首次运行 `winecfg` 时，Wine 会在您的家目录下创建一个 `.wine` 文件夹，用于存放虚拟的 C: 盘和配置信息。

```bash
winecfg
```

这个命令会打开一个图形化配置窗口，您可以：
- **选择 Windows 版本**：在“应用程序”标签页，您可以为不同程序模拟不同的 Windows 版本 (如 Windows 10, Windows 7)。
- **配置显卡和声卡**：在“显示”和“音频”标签页进行设置。
- **管理驱动器映射**：在“驱动器”标签页，您可以将 Linux 目录映射为虚拟的 Windows 驱动器盘符。

## 运行 Windows 应用

配置好后，您可以直接用 `wine` 命令运行 `.exe` 文件。

1.  **下载一个 Windows 程序** (例如 Notepad++)。
2.  **使用 Wine 运行安装程序**:
    ```bash
    wine npp.8.6.2.Installer.x64.exe
    ```
    安装过程将和在 Windows 上一样。

3.  **从桌面快捷方式或终端运行程序**:
    安装完成后，Wine 可能会在桌面创建 `.desktop` 快捷方式。您也可以直接运行安装好的程序：
    ```bash
    wine ~/.wine/drive_c/Program\ Files/Notepad++/notepad++.exe
    ```

## 使用辅助工具 (Lutris)

对于复杂应用，特别是游戏，手动配置 Wine 可能非常繁琐。推荐使用 [Lutris](https://lutris.net/) 这样的工具来简化过程。Lutris 提供了大量由社区维护的安装脚本，可以自动完成 Wine 的配置、依赖安装等步骤。

1.  **安装 Lutris**:
    ```bash
    sudo apt install lutris
    ```

2.  **使用 Lutris**:
    打开 Lutris，搜索您想安装的应用或游戏，然后点击 "Install" 即可。Lutris 会在后台为您处理好一切。

## 具体应用案例

虽然 Wine 功能强大，但某些复杂应用（如最新版的 Microsoft Office）或大型游戏（特别是带反作弊系统的）的兼容性仍然是一个挑战。

### 案例一：安装 Microsoft Office

直接使用 Wine 安装最新版 Microsoft Office 非常困难，通常会失败。这是因为 Office 深度集成于 Windows 系统，依赖大量不对外开放的组件。

**解决方案**:
1.  **使用 CrossOver (商业软件)**: [CrossOver](https://www.codeweavers.com/crossover) 是一款基于 Wine 的商业软件，由 Wine 的主要贡献者 CodeWeavers 开发。它为 Office、Adobe 等流行软件提供了专业的支持和一键安装脚本，是目前在 Linux 上完美运行 Office 的最可靠方案。
2.  **使用 PlayOnLinux 或 Lutris**: 这些图形化工具提供了社区维护的安装脚本，它们会自动下载特定版本的 Wine、配置所需的环境变量和依赖库，大大提高了安装成功率。对于 Office 2013/2016 等旧版本，成功率相对较高。
3.  **安装 Office 365 / Online 版本**: 如果您只需要核心功能，使用浏览器访问 Office 365 是最简单、最无缝的替代方案。

### 案例二：运行 Windows 游戏

Linux 游戏生态近年来发展迅猛，核心驱动力就是 Valve 公司开发的 **Proton**。

**什么是 Proton?**
Proton 是 Valve 公司基于 Wine 开发的一个兼容层，内置于 Steam 客户端中。它集成了 DXVK (将 DirectX 9/10/11 转换为 Vulkan) 和 VKD3D-Proton (将 DirectX 12 转换为 Vulkan) 等技术，极大地提升了 Windows 游戏在 Linux 上的图形性能和兼容性。

**如何在 Steam 中使用 Proton?**
1.  **安装 Steam**:
    ```bash
    sudo apt install steam
    ```
2.  **启用 Steam Play**:
    - 打开 Steam 客户端，进入 “Steam” > “设置”。
    - 在 “兼容性” (Compatibility) 标签页中，勾选 “为所有其他产品启用 Steam Play” (Enable Steam Play for all other titles)。
    - 在下拉菜单中，选择一个较新的 Proton 版本，例如 “Proton Experimental”。
3.  **安装和运行游戏**:
    现在，您可以在 Steam 库中像在 Windows 上一样下载和运行 Windows 独占游戏。Steam 会在后台自动通过 Proton 进行兼容处理。您可以在 [ProtonDB](https://www.protondb.com/) 网站上查询特定游戏的兼容性报告和玩家反馈。

对于非 Steam 平台的游戏 (例如来自 GOG、Epic Games Store 或战网的游戏)，**Lutris** 是最佳选择。它为这些平台提供了专门的安装脚本，能够自动处理 Wine 版本、前缀配置和游戏启动器的安装。 