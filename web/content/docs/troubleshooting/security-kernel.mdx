# 系统安全与内核

## `AppArmor` 和 `SELinux` 是什么？Debian 默认使用哪个？

AppArmor 和 SELinux 都是 **强制访问控制 (Mandatory Access Control, MAC)** 系统。它们是标准的 Linux 自主访问控制（即基于用户和文件权限的传统模型）之上的一个额外安全层，旨在将系统进程（即使是那些以 root 身份运行的进程）限制在最小权限范围内，从而减少漏洞被利用时可能造成的损害。

*   **SELinux (Security-Enhanced Linux)**
    *   **开发方**：由美国国家安全局 (NSA) 牵头开发。
    *   **工作方式**：基于**标签**。系统中的每个对象（文件、进程、端口等）都会被贴上一个安全标签。通过大量的策略规则来定义不同标签的进程可以对不同标签的对象执行何种操作。
    *   **特点**：极其强大和细粒度，但配置也**极其复杂**，策略编写难度很高。
    *   **主要使用者**：Red Hat系的发行版（如 RHEL, CentOS, Fedora）。

*   **AppArmor (Application Armor)**
    *   **开发方**：由 Novell 公司开发，现在是 Canonical (Ubuntu 的母公司) 在维护。
    *   **工作方式**：基于**路径**。它为每个需要被限制的应用程序定义一个配置文件（Profile），在文件中声明该程序被允许访问哪些文件路径、允许执行哪些操作（读、写、执行、网络连接等）。
    *   **特点**：比 SELinux **简单得多**，更容易理解和配置。它的策略是人类可读的，学习曲线平缓很多。虽然控制粒度不如 SELinux 细，但对绝大多数应用场景来说已经足够安全。
    *   **主要使用者**：Debian, Ubuntu, SUSE 等。

**Debian 默认使用哪个？**

**Debian 默认启用并使用的是 `AppArmor`**。从 Debian 10 (Buster) 开始，AppArmor 成为了默认安装和启用的 MAC 系统。您可以安装 `apparmor-utils` 包来查看和管理 AppArmor 的状态和配置文件。
```bash
# 安装工具
sudo apt install apparmor-utils

# 查看当前加载的配置文件和模式
sudo aa-status
```

## `Spectre`, `Meltdown` 这些 CPU 漏洞是什么？我需要担心吗？

Spectre (幽灵) 和 Meltdown (熔断) 是 2018 年初被公开的一类针对现代 CPU **推测执行 (Speculative Execution)** 机制的硬件级安全漏洞。

*   **推测执行**：为了提高性能，CPU 会猜测程序接下来可能要执行哪条指令分支，并提前去执行它。如果猜对了，就节省了时间；如果猜错了，就把结果丢弃，装作无事发生。
*   **漏洞原理**：这些漏洞利用了上述“猜错后丢弃”过程中的一个时间窗口，通过旁路攻击（Side-channel attack）的手段，可以窃取到那些本应被丢弃的、其他程序或内核内存中的敏感数据（如密码、密钥等）。

**我需要担心吗？**

对于**个人桌面用户**来说，**通常不需要过度担心**。
*   利用这些漏洞的攻击条件非常苛刻，需要恶意代码已经在您的本地机器上运行。
*   Linux 内核和各大发行版（包括 Debian）已经迅速发布了软件层面的缓解措施（Microcode 更新和内核补丁）。只要您保持系统更新，就已经受到了保护。

对于**多租户环境的服务器**（例如，在同一台物理服务器上运行多个客户的虚拟机的云服务提供商），这个风险要大得多，因为一个租户的虚拟机有可能通过此漏洞窃取到其他租户或宿主机的数据。

**如何查看我的系统是否受影响和缓解状态？**

Linux 内核提供了一个方便的接口来查看所有已知 CPU 漏洞的当前状态。
```bash
grep . /sys/devices/system/cpu/vulnerabilities/*
```
这个命令会列出所有漏洞以及您的系统当前的缓解状态。一个健康的输出应该看起来像这样：
```
/sys/devices/system/cpu/vulnerabilities/spectre_v1:Mitigation: usercopy/swapgs barriers and __user pointer sanitization
/sys/devices/system/cpu/vulnerabilities/spectre_v2:Mitigation: Retpolines, IBPB: conditional, IBRS_FW, STIBP: conditional, RSB filling
/sys/devices/system/cpu/vulnerabilities/meltdown:Mitigation: PTI
...
```
如果您看到的是 `Vulnerable` (易受攻击)，或者想完全禁用缓解措施以换取性能（**极不推荐**），可以通过修改内核启动参数来实现，例如在 `/etc/default/grub` 的 `GRUB_CMDLINE_LINUX_DEFAULT` 中添加 `mitigations=off`，然后运行 `sudo update-grub`。

## 如何在 Debian 上编译自定义内核？

编译内核通常是为了启用某些实验性功能、为特定硬件打补丁或进行深度性能优化。Debian 提供了一套标准的、相对简单的“Debian 方式”来编译内核，它会将编译结果打包成 `.deb` 文件，便于管理和卸载。

**步骤：**

1.  **安装依赖工具**：
    ```bash
    sudo apt update
    sudo apt install build-essential fakeroot libncurses5-dev libssl-dev libelf-dev bison flex rsync bc
    ```

2.  **获取内核源代码**：
    *   **方法一：从 Debian 仓库获取 (推荐)**
        *   这能确保您得到的源码和 Debian 官方内核是完全一致的。
        ```bash
        sudo apt source linux-image-$(uname -r)
        ```
        这会下载并解压当前内核的源码到一个新目录中，例如 `linux-6.1.90`。
    *   **方法二：从 kernel.org 获取**
        *   如果您想使用最新的主线内核，可以从 [www.kernel.org](https://www.kernel.org/) 下载源码包。

3.  **配置内核**：
    *   进入源码目录：`cd linux-6.1.90`
    *   复制当前系统的内核配置作为基础：
        ```bash
        cp /boot/config-$(uname -r) .config
        ```
    *   **打开菜单式配置界面**：
        ```bash
        make menuconfig
        ```
    *   这是一个基于文本的图形化界面。您可以在里面浏览所有内核选项，使用 `Y` (编译进内核)、`M` (编译为模块) 或 `N` (不编译) 来开启或关闭特定功能。
    *   完成修改后，选择 "Save" 保存 `.config` 文件，然后 "Exit" 退出。

4.  **开始编译**：
    *   Debian 推荐使用 `make deb-pkg` 命令来编译。这会自动将编译结果打包成几个 `.deb` 文件。
    *   使用 `fakeroot` 来模拟 root 权限进行打包：
        ```bash
        # -j 后面的数字是您想使用的 CPU 核心数，可以加快编译速度
        fakeroot make -j$(nproc) deb-pkg
        ```
    *   这个过程会花费很长时间，从几十分钟到几小时不等，取决于您的 CPU 性能。

5.  **安装新内核**：
    *   编译完成后，您会在**上一级目录**中找到几个新生成的 `.deb` 文件，主要包括 `linux-image-xxx.deb` 和 `linux-headers-xxx.deb`。
    *   使用 `dpkg` 来安装它们：
        ```bash
        cd ..
        sudo dpkg -i linux-image-*.deb linux-headers-*.deb
        ```

6.  **重启并验证**：
    *   安装过程会自动更新 GRUB 启动菜单。
    *   重启电脑，`GRUB` 会默认使用您新安装的内核启动。
    *   进入系统后，运行 `uname -a` 查看，您应该能看到自己编译的内核版本信息。 