# 其他问题

## 如何在 Debian 上使用 Docker 或 Podman？

Docker 和 Podman 都是流行的容器化技术，让开发者可以打包应用程序及其所有依赖项到一个可移植的容器中。

*   **Docker**：是目前业界的事实标准，生态系统非常成熟。它使用一个中央守护进程 (daemon) 来管理所有容器。
*   **Podman**：是一个无守护进程 (daemonless) 的容器引擎，被视为 Docker 的一个更现代、更安全的替代品。它的命令行接口与 Docker **完全兼容**，您通常可以直接用 `podman` 替换 `docker` 命令。

**在 Debian 上安装 Docker (推荐方式)**

Debian 官方仓库里的 Docker 版本可能较旧。推荐遵循 Docker 官方文档来添加其官方 APT 仓库以获取最新版本。

1.  **卸载旧版本**：
    ```bash
    sudo apt-get remove docker docker-engine docker.io containerd runc
    ```

2.  **设置 Docker 的 APT 仓库**：
    ```bash
    # 安装基础工具
    sudo apt-get update
    sudo apt-get install ca-certificates curl
    # 创建GPG密钥存储目录
    sudo install -m 0755 -d /etc/apt/keyrings
    # 下载Docker的GPG密钥
    sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
    sudo chmod a+r /etc/apt/keyrings/docker.asc

    # 添加仓库到sources.list
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
      $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
      sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    ```

3.  **安装 Docker Engine**：
    ```bash
    sudo apt-get update
    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    ```

4.  **将您的用户添加到 `docker` 组 (重要)**：
    *   为了避免每次使用 `docker` 命令都需要加 `sudo`，需要将当前用户添加到 `docker` 用户组。
    ```bash
    sudo usermod -aG docker $USER
    ```
    *   **必须注销并重新登录**（或重启电脑）才能使此更改生效。

5.  **验证安装**：
    *   重新登录后，运行 `docker run hello-world`。如果它成功拉取并运行了 `hello-world` 镜像，说明安装成功。

**在 Debian 上安装 Podman**

Podman 的安装则简单得多，可以直接从 Debian 的官方仓库安装。

```bash
sudo apt update
sudo apt install podman
```
安装后即可直接使用，无需守护进程，也无需配置用户组。例如：`podman run hello-world`。

## 我可以在 Debian 上玩游戏吗？如何配置？

**当然可以！** 近年来，在 Linux 上玩游戏已经取得了长足的进步，这主要归功于 Valve 公司开发的 **Proton** 技术。Proton 是一个集成在 Steam 客户端中的兼容层（基于 Wine），它使得成千上万的 Windows 游戏可以在 Linux 上“开箱即用”，而且性能损失很小。

**核心配置步骤：**

1.  **安装最新的显卡驱动**：
    *   这是获得良好游戏性能的**绝对前提**。无论是 NVIDIA 还是 AMD，请确保您安装了最新的闭源或开源驱动。
    *   请参考 **[桌面环境与显示](#debian-安装-nvidia-驱动)** 部分的教程来安装 NVIDIA 驱动。
    *   对于 AMD 显卡，通常安装 `firmware-amd-graphics` 并使用最新的内核（例如通过 backports）即可获得良好性能。

2.  **安装 Steam**：
    *   Debian 12 已在其 `non-free` 仓库中包含了最新的 Steam 安装包。
    *   首先，需要为 32 位程序启用 `i386` 架构支持（因为 Steam 和许多老游戏依赖 32 位库）：
        ```bash
        sudo dpkg --add-architecture i386
        sudo apt update
        ```
    *   然后安装 Steam：
        ```bash
        sudo apt install steam
        ```

3.  **在 Steam 中启用 Steam Play (Proton)**：
    *   打开 Steam 客户端。
    *   点击左上角的“Steam”菜单 -> “设置”。
    *   在左侧导航栏选择“兼容性 (Compatibility)”。
    *   勾选 **“为所有其他产品启用 Steam Play (Enable Steam Play for all other titles)”**。
    *   在下方的“运行其他产品时使用：”下拉菜单中，选择一个最新的 `Proton` 版本（例如 `Proton Experimental` 或最新的数字版本）。
    *   点击“确定”保存。

4.  **安装和运行游戏**：
    *   现在，您可以像在 Windows 上一样，直接从您的 Steam 库中点击“安装”按钮来下载和安装任何游戏。
    *   安装完成后，点击“运行”，Steam 会自动通过 Proton 来启动它。

**其他工具和提示**：

*   **ProtonDB**：在尝试一个新游戏前，强烈建议访问 [www.protondb.com](https://www.protondb.com/) 网站。这是一个社区驱动的数据库，用户在上面报告了每个游戏在 Proton 下的运行情况、性能表现以及可能需要的特殊修复或启动选项。
*   **Lutris**：是一个开源的游戏管理平台，它不仅支持 Steam，还集成了 GOG, Epic Games Store, Origin 等多个平台的游戏，并为每个游戏提供了社区维护的安装脚本，可以一键完成复杂的配置。
*   **Heroic Games Launcher**：一个非官方的 Epic Games 和 GOG 启动器，界面美观，集成 Wine/Proton 非常方便。
*   **性能监控**：可以使用 `mangohud` 这样的工具在游戏画面上显示实时的帧率、CPU/GPU 占用率和温度等信息。 