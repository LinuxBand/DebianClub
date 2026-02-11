# Other Common Questions

## What Are the Differences Between Debian and Ubuntu

Debian and Ubuntu are two of the most closely related Linux distributions. Ubuntu is built on Debian's `unstable` (Sid) branch, but they differ significantly in philosophy, release cycle, and target audience.

| Feature | Debian | Ubuntu |
| :--- | :--- | :--- |
| **Philosophy** | **Community-driven, 100% free software** (by default). Pursues stability and software freedom, maintained by a global community of volunteers. | **Led by a commercial company (Canonical)**. Pursues ease of use and the latest features, includes proprietary drivers and software, and is more beginner-friendly. |
| **Release Cycle** | **Slow and steady**. The Stable release publishes a major version approximately every 2 years. After a version is released, software is essentially frozen, with only security updates provided. | **Fast and fresh**. A new version is released every 6 months, with a Long Term Support (LTS) version every 2 years. Software versions are updated more frequently. |
| **Stability** | **Extremely stable (Stable branch)**. Regarded as one of the most stable Linux distributions, making it an ideal choice for servers. | **Relatively stable (LTS versions)**. LTS versions are thoroughly tested and suitable for most users and production environments. However, non-LTS versions tend to be more experimental. |
| **Software Repositories** | By default, only free software is included. `non-free` and `contrib` must be manually enabled by the user. Software versions are older, but newer versions can be obtained via Backports. | Includes a large amount of non-free firmware and drivers by default for out-of-the-box convenience. Provides PPAs (Personal Package Archives) for easy installation of third-party software. |
| **Ease of Use** | The installation and configuration process is more "vanilla," requiring users to have some Linux knowledge. | The installation process is highly graphical and extremely beginner-friendly. Provides many additional tools and driver managers to simplify configuration. |
| **Desktop Environment** | Provides an unmodified, vanilla GNOME desktop by default. Also offers installation options for all other major desktop environments. | Uses a GNOME desktop heavily customized by Canonical, integrated with its own themes and extensions. |

**Summary: Which Should I Choose?**

*   **Choose Debian if you are:**
    *   A server administrator or developer seeking ultimate stability and reliability.
    *   Looking to build a clean, lightweight system without unnecessary modifications.
    *   Aligned with the free software philosophy.
    *   Experienced with Linux and willing to spend time on manual configuration.

*   **Choose Ubuntu if you are:**
    *   A Linux beginner looking for an "out-of-the-box" experience.
    *   A desktop user who wants to easily install the latest software and proprietary drivers (such as NVIDIA drivers).
    *   In need of software available through a large number of PPA repositories.

To put it simply, **Debian is like a piece of high-quality lumber — you can craft anything you want from it; Ubuntu is like IKEA furniture — ready to use right out of the box, slightly less customizable, but convenient and quick.**

## How to Compile and Install Software on Debian

Compiling and installing software from source code is typically a last resort for obtaining software that is not available in the official repositories or that requires specific compilation options. This process is commonly referred to as "make install."

**Warning:**
Software installed via `make install` is not tracked by the `apt` package manager. This means `apt` is unaware of its existence and cannot provide updates, handle dependencies, or cleanly uninstall it when it is no longer needed. This can lead to so-called "dependency hell" or cluttered system files.

**Before compiling, consider the following alternatives first:**
1.  Use the `Backports` repository.
2.  Use `Flatpak` or `Snap`.
3.  Look for official or unofficial `.deb` packages.

**Standard Compilation and Installation Steps (`./configure && make && sudo make install`)**

1.  **Install the build toolchain**:
    ```bash
    sudo apt install build-essential
    ```
    `build-essential` is a meta-package that installs a set of tools required for compilation, such as `gcc` (C compiler), `g++` (C++ compiler), and `make`.

2.  **Resolve build dependencies**:
    *   This is the most critical and error-prone step. Almost all software depends on other library files for compilation. You need to read the `README` or `INSTALL` file included in the software's source package, which will list all required dependencies.
    *   You need to manually install these dependency packages using `apt`. Note that you need to install the development packages (usually ending in `-dev`). For example, if the software requires `libpng`, you need to install `libpng-dev`.

3.  **Extract the source code and enter the directory**:
    ```bash
    tar -xvf software-1.2.3.tar.gz
    cd software-1.2.3
    ```

4.  **Configure (configure)**:
    *   Run the `./configure` script. This script checks your system environment, ensures all dependencies are met, and generates a `Makefile`.
    *   You can customize features via parameters. For example, `--prefix` lets you specify the installation path.
        ```bash
        ./configure --prefix=/usr/local
        ```
        If `prefix` is not specified, the default installation location is usually under `/usr/local` in the `bin`, `lib`, `share`, and other directories. This helps keep it separate from the system package management path (`/usr`).

5.  **Compile (make)**:
    *   Run the `make` command. This process invokes the compiler (such as `gcc`) to convert source code into executable binary files.
    *   If your CPU has multiple cores, you can use the `-j` parameter for parallel compilation to speed things up. For example, `make -j4` (using 4 cores).

6.  **Install (make install)**:
    *   Run `sudo make install`. This command copies the compiled files, documentation, and configuration files from the previous step to the system directories you specified during the `configure` step. `sudo` is required because it writes to system directories.

**How to Uninstall**:
Since `apt` is unaware of these files, you cannot use `apt remove` to uninstall them.
*   **Best method**: Run `sudo make uninstall` from the source code directory. **However, not all software authors provide this feature.**
*   **Manual deletion**: If you specified a `prefix` during `configure`, you can manually delete the files from the corresponding directory. But this is a tedious and error-prone process.

## How to View Log Files on Debian

Linux system logs are a treasure trove for troubleshooting. Modern Debian systems primarily use `systemd-journald` to manage logs.

**Using `journalctl` (Recommended)**

`journalctl` is a powerful tool for viewing `journald` logs.

*   **View all logs (oldest to newest)**:
    ```bash
    journalctl
    ```
    (Press `q` to quit, use arrow keys and PageUp/Down to navigate)

*   **View all logs in reverse order (newest to oldest)**:
    ```bash
    journalctl -r
    ```

*   **Monitor logs in real time**:
    ```bash
    journalctl -f
    ```
    This continuously displays newly generated logs, which is very useful for monitoring ongoing events.

*   **View all logs since the current boot**:
    ```bash
    journalctl -b
    ```

*   **View logs from the previous boot**:
    ```bash
    journalctl -b -1
    ```

*   **Filter by time**:
    ```bash
    # View all logs from today
    journalctl --since=today
    # View logs from the past hour
    journalctl --since="1 hour ago"
    ```

*   **Filter by service unit**:
    ```bash
    # View only SSH service logs
    journalctl -u ssh.service
    ```

*   **Filter by priority (view error messages)**:
    *   `p` stands for priority.
    ```bash
    # View only error level (error, level 3) and above logs
    journalctl -p 3
    # View errors from the current boot
    journalctl -p 3 -b
    ```

**The Traditional `/var/log` Directory**

Although `journald` is the mainstream approach, many traditional services and applications still store their log files as plain text in the `/var/log` directory.

*   **View general system logs**:
    *   `cat /var/log/syslog`
    *   `cat /var/log/messages`

*   **View authentication-related logs (e.g., login, sudo)**:
    *   `cat /var/log/auth.log`

*   **View kernel logs**:
    *   `cat /var/log/kern.log`
    *   Or use the `dmesg` command.

*   **View APT package management logs**:
    *   `cat /var/log/apt/history.log`

To view these files, you can use commands such as `cat`, `less`, `more`, or `tail -f` (real-time monitoring). For example, `tail -f /var/log/syslog`.
