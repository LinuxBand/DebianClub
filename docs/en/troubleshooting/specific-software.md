# Specific Software Installation & Issues

## How to Install Chrome/Chromium on Debian

*   **Chromium**: The open-source foundation of Chrome, which can be installed directly from Debian's official repositories.
*   **Google Chrome**: A closed-source browser developed by Google on top of Chromium, which includes some additional proprietary components (such as a built-in Flash Player and certain multimedia codecs). You need to add Google's official repository to install it.

**Installing Chromium**

```bash
sudo apt update
sudo apt install chromium
```

**Installing Google Chrome (Recommended)**

1.  **Add Google's software repository and key**:
    *   Google provides a `.deb` package that automatically adds the software repository and key for you.
    *   **Steps**:
        1.  Visit the [Google Chrome official website](https://www.google.com/chrome/).
        2.  Click "Download Chrome". The website will automatically detect that you are running a Debian/Ubuntu system and offer a `64 bit .deb` package.
        3.  Download this `.deb` file (e.g., `google-chrome-stable_current_amd64.deb`).

2.  **Install the `.deb` package**:
    *   Open a terminal and `cd` to your download directory.
    *   Use `apt` to install it, which will automatically handle dependencies:
        ```bash
        sudo apt install ./google-chrome-stable_current_amd64.deb
        ```
    *   After installation, Google's software repository will be automatically added to the `/etc/apt/sources.list.d/` directory. This means that every time you run `sudo apt upgrade`, Chrome will automatically update to the latest version.

## How to Install Office/Word/Excel on Debian

There are multiple approaches for running Microsoft Office on Linux, ranging from highly compatible open-source alternatives to using compatibility layers to run the native Windows version.

**Option 1: Use LibreOffice (Default, Recommended)**

*   The default office suite installed with Debian is [LibreOffice](https://www.libreoffice.org/). It is a powerful and free open-source office application that is highly compatible with Microsoft Office document formats (`.docx`, `.xlsx`, `.pptx`).
*   For the vast majority of daily office and document editing tasks, LibreOffice is more than capable.
    ```bash
    sudo apt install libreoffice
    ```

**Option 2: Use WPS Office for Linux**

*   WPS Office more closely mimics the interface and workflow of Microsoft Office, so users transitioning from Windows may find it more familiar.
*   **Installation method**:
    1.  Visit the [WPS Office for Linux official website](https://www.wps.cn/product/wpslinux/).
    2.  Download the `.deb` package corresponding to your system architecture.
    3.  Install using `apt`: `sudo apt install ./wps-office_xxxx.deb`.

**Option 3: Use Online Office 365**

*   If you have an Office 365 subscription, you can use the web-based versions of Word, Excel, and PowerPoint directly in your browser. The features are relatively complete, and compatibility is the best.

**Option 4: Run the Native Windows Version via Wine/CrossOver**

*   This is the ultimate solution for users who require 100% compatibility (e.g., handling Excel files with complex macros).
*   **Wine**: A free compatibility layer that allows you to run Windows programs on Linux. The configuration process can be quite complex.
*   **CrossOver**: A commercial software based on Wine that provides pre-configured installation scripts for many popular Windows applications (including Microsoft Office), greatly simplifying the installation and configuration process with better compatibility. If your work heavily depends on MS Office, purchasing CrossOver is a worthwhile investment.

## How to Install WeChat/QQ on Debian

Since Tencent has not released native Linux versions of WeChat and QQ, we similarly need to rely on compatibility layers or third-party clients.

**Option 1: Use Wine (General, Free)**

*   This is the most basic method. You need to install Wine first, then download the Windows version of the WeChat or QQ installer (`.exe`) and run it through Wine.
*   The experience may be unstable, and different versions of Wine have varying levels of support for WeChat/QQ. You may encounter issues with fonts, windows, input methods, etc.

**Option 2: Use Third-Party Packaged Clients (Recommended, More Stable)**

*   Community developers have packaged Wine together with the Windows versions of WeChat/QQ into ready-to-use Linux applications, typically distributed as Flatpak, AppImage, or `.deb` packages.
*   **deepin-wine-wechat / deepin-wine-qq**: This is a Wine environment maintained by the Deepin team, with compatibility specifically optimized for WeChat and QQ. Other distributions can install it through pre-packaged projects.
*   **Installing on non-Deepin systems**: You can search for and use projects that port deepin-wine to other distributions, for example, searching on GitHub for `deepin-wine-wechat-arch` (although packaged for Arch, you can learn from its approach) or look for the corresponding Flatpak versions.
*   **Installing via Flatpak**: This is currently one of the most recommended methods because it is sandboxed and does not pollute the host system.
    ```bash
    # Make sure Flatpak is installed and the Flathub repository is added
    flatpak install flathub com.qq.QQ # or other community-packaged identifiers
    flatpak install flathub io.github.wechat-universal # this is an example; check the Flathub website for the exact identifier
    ```

## How to Install Steam on Debian

Installing Steam and playing games on Debian has become very straightforward.

**Installation Steps:**

1.  **Enable 32-bit architecture support**:
    *   The Steam client itself and many Windows games (run via Proton) require 32-bit library support.
    ```bash
    sudo dpkg --add-architecture i386
    ```

2.  **Enable the `contrib` and `non-free` repositories**:
    *   Edit `/etc/apt/sources.list` to make sure it includes `contrib` and `non-free`.

3.  **Update and install Steam**:
    ```bash
    sudo apt update
    sudo apt install steam
    ```
    The `steam` package in the Debian repository is a launcher that will automatically download and install the latest Steam client.

4.  **Install graphics drivers**:
    *   **This is an absolute prerequisite for a smooth gaming experience!** Make sure to install the latest proprietary drivers for your NVIDIA or AMD graphics card.
    *   Refer to the **[Desktop Environment & Display](#installing-nvidia-drivers-on-debian)** tutorial section.

5.  **Enable Steam Play (Proton)**:
    *   Proton is a compatibility layer developed by Valve based on Wine, built into the Steam client, that allows you to run a vast number of Windows games with a single click.
    *   **Steps**:
        1.  Open the Steam client.
        2.  Click "Steam" -> "Settings" in the top-left corner.
        3.  Select the "Steam Play" tab on the left.
        4.  Check "Enable Steam Play for all other titles".
        5.  In the dropdown menu, select the latest Proton version (e.g., Proton Experimental).
        6.  Restart Steam.

Now you can play Windows games just like on Windows by clicking "Install" and "Play" directly from your game library.
