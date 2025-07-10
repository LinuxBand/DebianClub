# System Security and Kernel

## What are `AppArmor` and `SELinux`? Which one does Debian use by default?

AppArmor and SELinux are both **Mandatory Access Control (MAC)** systems. They are an additional security layer on top of the standard Linux Discretionary Access Control (the traditional model based on user and file permissions). Their goal is to confine system processes (even those running as root) to the minimum set of permissions they need to function, thereby reducing the potential damage from exploited vulnerabilities.

*   **SELinux (Security-Enhanced Linux)**
    *   **Developed by**: Led by the U.S. National Security Agency (NSA).
    *   **How it works**: It is **label-based**. Every object on the system (files, processes, ports, etc.) is given a security label. A large set of policy rules defines what operations a process with a certain label can perform on an object with another label.
    *   **Characteristics**: Extremely powerful and fine-grained, but also **extremely complex** to configure. Writing policies is very difficult.
    *   **Mainly used by**: Red Hat-based distributions (e.g., RHEL, CentOS, Fedora).

*   **AppArmor (Application Armor)**
    *   **Developed by**: Originally by Novell, now maintained by Canonical (the parent company of Ubuntu).
    *   **How it works**: It is **path-based**. It defines a profile for each application that needs to be confined. This profile file specifies which file paths the program is allowed to access and what operations it is allowed to perform (read, write, execute, network connections, etc.).
    *   **Characteristics**: **Much simpler** than SELinux, making it easier to understand and configure. Its policies are human-readable, and the learning curve is much gentler. While its control granularity is not as fine as SELinux, it is secure enough for the vast majority of use cases.
    *   **Mainly used by**: Debian, Ubuntu, SUSE, etc.

**Which one does Debian use by default?**

**Debian enables and uses `AppArmor` by default**. Since Debian 10 (Buster), AppArmor has been the default installed and enabled MAC system. You can install the `apparmor-utils` package to view and manage AppArmor's status and profiles.
```bash
# Install the tools
sudo apt install apparmor-utils

# Check the status of currently loaded profiles and their modes
sudo aa-status
```

## What are CPU vulnerabilities like `Spectre` and `Meltdown`? Do I need to worry?

Spectre and Meltdown are a class of hardware-level security vulnerabilities targeting the **speculative execution** mechanism of modern CPUs, which were publicly disclosed in early 2018.

*   **Speculative Execution**: To improve performance, CPUs guess which instruction branch a program is likely to take next and execute it in advance. If the guess is correct, time is saved; if it's wrong, the results are discarded as if nothing happened.
*   **Vulnerability Principle**: These vulnerabilities exploit a time window in the "discard after a wrong guess" process. Using side-channel attacks, it's possible to steal sensitive data (like passwords, keys, etc.) from the memory of other programs or the kernel that should have been discarded.

**Do I need to worry?**

For **personal desktop users**, you **generally do not need to worry excessively**.
*   The conditions for exploiting these vulnerabilities are very strict and require malicious code to already be running on your local machine.
*   The Linux kernel and major distributions (including Debian) have quickly released software-level mitigations (Microcode updates and kernel patches). As long as you keep your system updated, you are protected.

For **servers in multi-tenant environments** (e.g., cloud service providers running multiple customers' virtual machines on the same physical server), the risk is much greater, as one tenant's VM could potentially steal data from other tenants or the host machine via this vulnerability.

**How to check if my system is affected and its mitigation status?**

The Linux kernel provides a convenient interface to check the current status of all known CPU vulnerabilities.
```bash
grep . /sys/devices/system/cpu/vulnerabilities/*
```
This command will list all vulnerabilities and your system's current mitigation status. A healthy output should look something like this:
```
/sys/devices/system/cpu/vulnerabilities/spectre_v1:Mitigation: usercopy/swapgs barriers and __user pointer sanitization
/sys/devices/system/cpu/vulnerabilities/spectre_v2:Mitigation: Retpolines, IBPB: conditional, IBRS_FW, STIBP: conditional, RSB filling
/sys/devices/system/cpu/vulnerabilities/meltdown:Mitigation: PTI
...
```
If you see `Vulnerable`, or if you want to completely disable mitigations for performance (**highly not recommended**), you can do so by modifying the kernel boot parameters. For example, add `mitigations=off` to `GRUB_CMDLINE_LINUX_DEFAULT` in `/etc/default/grub`, and then run `sudo update-grub`.

## How to compile a custom kernel on Debian?

Compiling a kernel is usually done to enable experimental features, patch for specific hardware, or perform deep performance optimization. Debian provides a standard, relatively simple "Debian way" to compile a kernel, which packages the result into `.deb` files for easy management and uninstallation.

**Steps:**

1.  **Install dependencies**:
    ```bash
    sudo apt update
    sudo apt install build-essential fakeroot libncurses5-dev libssl-dev libelf-dev bison flex rsync bc
    ```

2.  **Get the kernel source code**:
    *   **Method 1: From Debian repositories (Recommended)**
        *   This ensures the source you get is identical to the official Debian kernel.
        ```bash
        sudo apt source linux-image-$(uname -r)
        ```
        This will download and extract the source code for your current kernel into a new directory, e.g., `linux-6.1.90`.
    *   **Method 2: From kernel.org**
        *   If you want to use the latest mainline kernel, you can download the source package from [www.kernel.org](https://www.kernel.org/).

3.  **Configure the kernel**:
    *   Enter the source directory: `cd linux-6.1.90`
    *   Copy your current system's kernel configuration as a base:
        ```bash
        cp /boot/config-$(uname -r) .config
        ```
    *   **Open the menu-based configuration interface**:
        ```bash
        make menuconfig
        ```
    *   This is a text-based graphical interface. Here you can browse all kernel options and use `Y` (compile into the kernel), `M` (compile as a module), or `N` (do not compile) to enable or disable specific features.
    *   After making your changes, select "Save" to save the `.config` file, then "Exit".

4.  **Start compiling**:
    *   The Debian-recommended way is to use the `make deb-pkg` command. This will automatically package the compilation result into several `.deb` files.
    *   Use `fakeroot` to simulate root privileges for packaging:
        ```bash
        # The number after -j is the number of CPU cores you want to use, which can speed up compilation
        fakeroot make -j$(nproc) deb-pkg
        ```
    *   This process will take a long time, from tens of minutes to several hours, depending on your CPU performance.

5.  **Install the new kernel**:
    *   After compilation is complete, you will find several newly generated `.deb` files in the **parent directory**, mainly including `linux-image-xxx.deb` and `linux-headers-xxx.deb`.
    *   Use `dpkg` to install them:
        ```bash
        cd ..
        sudo dpkg -i linux-image-*.deb linux-headers-*.deb
        ```

6.  **Reboot and verify**:
    *   The installation process will automatically update the GRUB boot menu.
    *   Reboot the computer. GRUB will default to booting with your newly installed kernel.
    *   After logging in, run `uname -a` to check. You should see the version information of your custom-compiled kernel. 