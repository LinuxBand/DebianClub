# Hardware & Peripherals

## Debian Printer Not Recognized / Setup (CUPS)

Debian uses CUPS (Common Unix Printing System) as its printing service. Most modern printers can be automatically detected, but some require manual configuration or driver installation.

**Troubleshooting Steps:**

1.  **Install CUPS and printer support packages**:
    *   Make sure the CUPS service is installed and running.
        ```bash
        sudo apt install cups printer-driver-gutenprint
        sudo systemctl enable --now cups
        ```
        The `printer-driver-gutenprint` package contains a large number of open-source printer drivers and supports printers from many brands.

2.  **Check the physical connection**:
    *   Make sure the printer is powered on and properly connected to the computer or local network via USB or network.

3.  **Configure using the Web interface**:
    *   CUPS provides a convenient Web management interface. Visit `http://localhost:631` in your browser.
    *   Click the **"Administration"** tab, then click **"Add Printer"**.
    *   The system may ask for your username and password (you need to be a member of the `lpadmin` group; usually users with `sudo` privileges are sufficient).
    *   Follow the wizard steps:
        1.  **Select the printer**: CUPS will list discovered local (USB) and network printers. Select your printer.
        2.  **Edit information**: You can modify the printer's name, description, and location.
        3.  **Select driver/PPD file**: This is the most critical step. CUPS will automatically recommend a driver based on the printer model.
            *   If your printer model is in the list, select it directly.
            *   If not, try selecting a driver from the same series or a generic driver (such as Generic PostScript/PCL Driver).
            *   If the manufacturer provides a PPD (PostScript Printer Description) file, you can select "Provide a PPD File" and upload it.

4.  **Install manufacturer drivers**:
    *   For certain printer brands (such as HP), installing official drivers and tools will provide better support.
        ```bash
        sudo apt install hplip hplip-gui
        ```
        After installation, you can run the `hp-setup` command to configure HP printers through a graphical interface.

## Debian Bluetooth Not Working / Pairing Issues

Bluetooth issues are usually related to firmware, drivers, or the service not running.

**Troubleshooting Steps:**

1.  **Install Bluetooth-related packages**:
    ```bash
    sudo apt install bluetooth bluez blueman
    ```
    *   `bluez` is the official Bluetooth protocol stack for Linux.
    *   `blueman` is a Bluetooth manager that is more powerful than the default settings tool.

2.  **Check the Bluetooth service status**:
    ```bash
    sudo systemctl enable --now bluetooth
    sudo systemctl status bluetooth
    ```
    Make sure the service is in `active (running)` state.

3.  **Check if the hardware is recognized and enabled**:
    *   Use the `rfkill list` command to check.
        ```bash
        rfkill list
        # 0: hci0: Bluetooth
        #   Soft blocked: no
        #   Hard blocked: no
        ```
    *   Make sure the Bluetooth device is not "Soft blocked" or "Hard blocked".
    *   If it is soft blocked, use `rfkill unblock bluetooth` to unblock it.
    *   If it is hard blocked, you usually need to enable it via a physical switch or Fn function key on the laptop.

4.  **Install firmware**:
    *   Just like Wi-Fi, some Bluetooth chips also require non-free firmware. Try installing `firmware-linux-nonfree` or firmware packages specific to the vendor.

5.  **Use the `bluetoothctl` command-line tool**:
    *   This is a powerful interactive Bluetooth control tool.
    *   Type `bluetoothctl` in the terminal.
    *   At the `[bluetooth]#` prompt, enter the following commands:
        ```
        power on
        agent on
        default-agent
        scan on     # Start scanning for devices
        # After finding your device's MAC address
        pair <device_MAC_address>
        trust <device_MAC_address>
        connect <device_MAC_address>
        scan off
        ```

## Debian External Monitor Not Displaying / Setup

External monitor issues are usually related to graphics card drivers, cables, or the desktop environment's display settings.

**Troubleshooting Steps:**

1.  **Check the physical connection**:
    *   Make sure the HDMI/DisplayPort/USB-C cable is securely plugged in on both ends.
    *   Try a different cable to rule out cable failure.

2.  **Install the correct graphics card drivers**:
    *   This is the most common cause. Make sure you have installed the correct drivers for your NVIDIA/AMD graphics card. Refer to the **[Desktop Environment & Display](#debian-installing-nvidia-drivers)** section for the tutorial. Without the correct drivers, the system may not recognize or properly drive multiple monitors.

3.  **Use display settings tools**:
    *   **GNOME**: Go to "Settings" -> "Displays". Here you should be able to see all connected monitors. You can adjust their arrangement (primary/secondary, left/right position), resolution, refresh rate, and scaling. If not detected, try clicking "Detect Displays".
    *   **KDE Plasma**: Go to "System Settings" -> "Display and Monitor". The functionality is similar to GNOME.
    *   **Xfce**: Go to "Settings" -> "Display".
    *   **Command-line tool `xrandr`**:
        *   Run `xrandr` to view all detected monitors and their supported modes.
        *   If the external monitor (e.g., `HDMI-1`) is connected but not enabled, you can manually enable it:
            ```bash
            # --auto uses the best resolution, --right-of eDP-1 places it to the right of the main screen
            xrandr --output HDMI-1 --auto --right-of eDP-1
            ```

4.  **Laptop lid issues**:
    *   Some systems default to suspending or turning off the external monitor when the laptop lid is closed.
    *   You can change the "When lid is closed" action to "Do nothing" in the "Power Management" settings of your desktop environment.

## Debian Touchpad Settings / Not Working

A non-functional touchpad or limited functionality (such as no multi-finger gestures) is usually caused by missing drivers or improper configuration.

**Troubleshooting Steps:**

1.  **Confirm the driver type**:
    *   Modern laptops typically use `libinput` as the touchpad driver, which provides good support for multi-finger gestures. Older systems may use the `synaptics` driver.
    *   Check if the `libinput` driver is installed:
        ```bash
        sudo apt install xserver-xorg-input-libinput
        ```

2.  **Check if the touchpad is disabled**:
    *   Many laptops have an `Fn` function key to disable the touchpad; check if it was accidentally pressed.
    *   In the "Mouse and Touchpad" settings of your desktop environment, check if there is a "Disable Touchpad" option.

3.  **GNOME: Use the "Tweaks" tool**:
    *   `sudo apt install gnome-tweaks`
    *   Open "Tweaks" -> "Keyboard & Mouse", where you can adjust the touchpad's click behavior (tap to click, right-click method, etc.).

4.  **Check kernel logs**:
    *   Running `dmesg | grep -i psmouse` or `dmesg | grep -i synaptics` may reveal error messages related to the touchpad.

5.  **BIOS/UEFI settings**:
    *   In rare cases, the BIOS may have touchpad-related settings, such as "Advanced" or "Basic" mode. Check and ensure it is set to "Advanced" mode to support more features.
