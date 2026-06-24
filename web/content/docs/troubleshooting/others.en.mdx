# Other Questions

## How to use Docker or Podman on Debian?

Docker and Podman are both popular containerization technologies that allow developers to package applications and all their dependencies into a portable container.

*   **Docker**: The de facto industry standard with a very mature ecosystem. It uses a central daemon to manage all containers.
*   **Podman**: A daemonless container engine, considered a more modern and secure alternative to Docker. Its command-line interface is **fully compatible** with Docker's, so you can often just replace the `docker` command with `podman`.

**Installing Docker on Debian (Recommended Way)**

The Docker version in the official Debian repositories might be outdated. It is recommended to follow the official Docker documentation to add their official APT repository to get the latest version.

1.  **Uninstall old versions**:
    ```bash
    sudo apt-get remove docker docker-engine docker.io containerd runc
    ```

2.  **Set up Docker's APT repository**:
    ```bash
    # Install essential tools
    sudo apt-get update
    sudo apt-get install ca-certificates curl
    # Create GPG key storage directory
    sudo install -m 0755 -d /etc/apt/keyrings
    # Download Docker's GPG key
    sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
    sudo chmod a+r /etc/apt/keyrings/docker.asc

    # Add the repository to sources.list
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
      $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
      sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    ```

3.  **Install Docker Engine**:
    ```bash
    sudo apt-get update
    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    ```

4.  **Add your user to the `docker` group (Important)**:
    *   To avoid having to use `sudo` every time you use the `docker` command, you need to add your current user to the `docker` group.
    ```bash
    sudo usermod -aG docker $USER
    ```
    *   You **must log out and log back in** (or restart your computer) for this change to take effect.

5.  **Verify the installation**:
    *   After logging back in, run `docker run hello-world`. If it successfully pulls and runs the `hello-world` image, the installation was successful.

**Installing Podman on Debian**

Installing Podman is much simpler; you can install it directly from Debian's official repositories.

```bash
sudo apt update
sudo apt install podman
```
After installation, you can use it directly without a daemon and without configuring user groups. For example: `podman run hello-world`.

## Can I play games on Debian? How to set it up?

**Of course!** Gaming on Linux has made great strides in recent years, thanks mainly to the **Proton** technology developed by Valve. Proton is a compatibility layer (based on Wine) integrated into the Steam client, which allows thousands of Windows games to run "out of the box" on Linux with minimal performance loss.

**Core Configuration Steps:**

1.  **Install the latest graphics drivers**:
    *   This is an **absolute prerequisite** for good gaming performance. Whether you have NVIDIA or AMD, make sure you have the latest proprietary or open-source drivers installed.
    *   Please refer to the tutorial in the **[Desktop Environment & Display](#how-to-install-nvidia-drivers-on-debian)** section to install NVIDIA drivers.
    *   For AMD graphics cards, installing `firmware-amd-graphics` and using the latest kernel (e.g., via backports) is usually sufficient for good performance.

2.  **Install Steam**:
    *   Debian 12 includes the latest Steam package in its `non-free` repository.
    *   First, you need to enable `i386` architecture support for 32-bit programs (as Steam and many older games depend on 32-bit libraries):
        ```bash
        sudo dpkg --add-architecture i386
        sudo apt update
        ```
    *   Then install Steam:
        ```bash
        sudo apt install steam
        ```

3.  **Enable Steam Play (Proton) in Steam**:
    *   Open the Steam client.
    *   Click the "Steam" menu in the top left -> "Settings".
    *   Select "Compatibility" from the left navigation bar.
    *   Check **"Enable Steam Play for all other titles"**.
    *   In the "Run other titles with:" dropdown menu below, select the latest `Proton` version (e.g., `Proton Experimental` or the latest numbered version).
    *   Click "OK" to save.

4.  **Install and run games**:
    *   Now, you can install any game from your Steam library by clicking the "Install" button, just like on Windows.
    *   After installation, click "Play", and Steam will automatically launch it through Proton.

**Other Tools and Tips**:

*   **ProtonDB**: Before trying a new game, it is highly recommended to visit [www.protondb.com](https://www.protondb.com/). It's a community-driven database where users report how well each game runs under Proton, its performance, and any special fixes or launch options that might be needed.
*   **Lutris**: An open-source gaming platform that not only supports Steam but also integrates games from multiple platforms like GOG, Epic Games Store, and Origin. It provides community-maintained installation scripts for each game that can complete complex configurations with a single click.
*   **Heroic Games Launcher**: An unofficial launcher for Epic Games and GOG, with a beautiful interface and very convenient Wine/Proton integration.
*   **Performance Monitoring**: You can use tools like `mangohud` to display real-time frame rates, CPU/GPU usage, temperature, and other information as an overlay in your games. 