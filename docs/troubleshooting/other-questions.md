# 其他常见问题

## Debian vs Ubuntu 有什么区别

Debian 和 Ubuntu 是两个关系最密切的 Linux 发行版。Ubuntu 基于 Debian 的 `unstable` (Sid) 分支构建，但它们在理念、发布周期和用户群体上存在显著差异。

| 特性 | Debian | Ubuntu |
| :--- | :--- | :--- |
| **哲学** | **社区驱动，100% 自由软件** (默认)。追求稳定性和软件自由，由全球志愿者组成的社区维护。 | **商业公司 (Canonical) 主导**。追求易用性和最新的功能，包含商业驱动和软件，对新手更友好。 |
| **发布周期** | **慢而稳**。稳定版 (Stable) 大约每 2 年发布一个大版本。版本发布后，软件基本冻结，只提供安全更新。 | **快而新**。每 6 个月发布一个新版本，每 2 年发布一个长期支持版 (LTS)。软件版本更新快。 |
| **稳定性** | **极其稳定 (Stable 分支)**。被誉为最稳定的 Linux 发行版之一，是服务器的理想选择。 | **相对稳定 (LTS 版本)**。LTS 版本经过了充分测试，适合大多数用户和生产环境。但非 LTS 版本则更具实验性。 |
| **软件源** | 默认只包含自由软件。`non-free` 和 `contrib` 需要用户手动启用。软件版本较旧，但可通过 Backports 获取新版。 | 默认就包含大量非自由固件和驱动，方便开箱即用。提供 PPA (Personal Package Archives) 方便用户安装第三方新软件。 |
| **易用性** | 安装和配置过程更“原生”，需要用户具备一定的 Linux 基础。 | 安装过程非常图形化，对新手极其友好。提供了许多额外的工具和驱动管理器来简化配置。 |
| **桌面环境** | 默认提供一个未经修改的、原生的 GNOME 桌面。也提供其他所有主流桌面的安装选项。 | 使用一个经过 Canonical 公司深度定制的 GNOME 桌面，集成了自己的主题和扩展。 |

**总结：我该选哪个？**

*   **选择 Debian，如果你是：**
    *   服务器管理员或开发者，追求极致的稳定性和可靠性。
    *   希望构建一个纯净、轻量、没有多余修改的系统。
    *   认同自由软件的理念。
    *   有一定 Linux 经验，不介意花时间进行手动配置。

*   **选择 Ubuntu，如果你是：**
    *   Linux 新手，希望获得“开箱即用”的体验。
    *   桌面用户，希望轻松地安装最新的软件和专有驱动（如 NVIDIA 驱动）。
    *   需要使用大量 PPA 源中的软件。

可以说，**Debian 像是一块优质的木材，你可以用它打造任何你想要的东西；而 Ubuntu 则像一个宜家家具，买回来就能用，虽然定制性差一点，但方便快捷。**

## Debian 如何编译安装软件

从源代码编译安装软件通常是获取官方软件源中没有的、或者需要特定编译选项的软件的最后手段。这个过程通常称为 "make install"。

**警告：**
通过 `make install` 安装的软件不会被 `apt` 包管理器追踪。这意味着 `apt` 不知道它的存在，无法为它提供更新、处理依赖或在不再需要时干净地卸载它。这可能导致所谓的“依赖地狱”或系统文件混乱。

**在编译前，优先考虑以下替代方案：**
1.  使用 `Backports` 仓库。
2.  使用 `Flatpak` 或 `Snap`。
3.  寻找官方或非官方的 `.deb` 包。

**标准编译安装步骤 (`./configure && make && sudo make install`)**

1.  **安装编译工具链**：
    ```bash
    sudo apt install build-essential
    ```
    `build-essential` 是一个元软件包，它会安装编译所需的一系列工具，如 `gcc` (C 编译器), `g++` (C++ 编译器) 和 `make`。

2.  **解决编译依赖**：
    *   这是最关键也最容易出错的一步。几乎所有软件都依赖于其他库文件才能编译。您需要阅读软件源代码包里的 `README` 或 `INSTALL` 文件，它会列出所有必需的依赖项。
    *   您需要手动使用 `apt` 来安装这些依赖包。注意，您需要安装的是开发包（通常以 `-dev` 结尾），例如，如果软件需要 `libpng`，您需要安装 `libpng-dev`。

3.  **解压源代码并进入目录**：
    ```bash
    tar -xvf software-1.2.3.tar.gz
    cd software-1.2.3
    ```

4.  **配置 (configure)**：
    *   运行 `./configure` 脚本。这个脚本会检查您的系统环境，确保所有依赖都已满足，并生成一个 `Makefile` 文件。
    *   您可以通过参数来定制功能，例如 `--prefix` 可以指定安装路径。
        ```bash
        ./configure --prefix=/usr/local
        ```
        如果不指定 `prefix`，默认通常会安装到 `/usr/local` 下的 `bin`, `lib`, `share` 等目录，这有助于和系统包管理的路径 (`/usr`) 分离开。

5.  **编译 (make)**：
    *   运行 `make` 命令。这个过程会调用编译器（如 `gcc`）将源代码转换成可执行的二进制文件。
    *   如果您的 CPU 有多个核心，可以使用 `-j` 参数来并行编译以加快速度，例如 `make -j4` (使用 4 个核心)。

6.  **安装 (make install)**：
    *   运行 `sudo make install`。这个命令会把上一步编译好的文件、文档和配置文件复制到您在 `configure` 步骤中指定的系统目录中。需要 `sudo` 是因为要向系统目录写入文件。

**如何卸载**：
由于 `apt` 不知道这些文件的存在，您不能用 `apt remove` 来卸载。
*   **最佳方式**：在源代码目录中运行 `sudo make uninstall`。**然而，并非所有软件的作者都提供了这个功能。**
*   **手动删除**：如果您在 `configure` 时指定了 `prefix`，可以手动去对应的目录删除文件。但这是一个繁琐且容易出错的过程。

## Debian 如何查看日志文件

Linux 系统日志是排查问题的宝库。现代 Debian 系统主要使用 `systemd-journald` 来管理日志。

**使用 `journalctl` (推荐)**

`journalctl` 是查看 `journald` 日志的强大工具。

*   **查看所有日志（从旧到新）**：
    ```bash
    journalctl
    ```
    (按 `q` 退出，使用箭头键和 PageUp/Down 翻页)

*   **反向查看所有日志（从新到旧）**：
    ```bash
    journalctl -r
    ```

*   **实时监控日志**：
    ```bash
    journalctl -f
    ```
    这会持续显示新产生的日志，对于监控正在发生的事情非常有用。

*   **查看本次启动以来的所有日志**：
    ```bash
    journalctl -b
    ```

*   **查看上次启动的日志**：
    ```bash
    journalctl -b -1
    ```

*   **按时间过滤**：
    ```bash
    # 查看今天的所有日志
    journalctl --since=today
    # 查看过去一小时的日志
    journalctl --since="1 hour ago"
    ```

*   **按服务单元过滤**：
    ```bash
    # 只看 ssh 服务的日志
    journalctl -u ssh.service
    ```

*   **按优先级过滤（看错误信息）**：
    *   `p` 代表 priority。
    ```bash
    # 只看错误级别 (error, 级别3) 及以上的日志
    journalctl -p 3
    # 同时看本次启动的错误
    journalctl -p 3 -b
    ```

**传统的 `/var/log` 目录**

虽然 `journald` 是主流，但许多传统服务和应用仍然会将它们的日志文件以纯文本形式存放在 `/var/log` 目录下。

*   **查看通用系统日志**：
    *   `cat /var/log/syslog`
    *   `cat /var/log/messages`

*   **查看认证相关的日志（如登录、sudo）**：
    *   `cat /var/log/auth.log`

*   **查看内核日志**：
    *   `cat /var/log/kern.log`
    *   或者使用 `dmesg` 命令。

*   **查看 APT 包管理的日志**：
    *   `cat /var/log/apt/history.log`

要查看这些文件，可以使用 `cat`, `less`, `more` 或 `tail -f` (实时监控) 等命令。例如 `tail -f /var/log/syslog`。 