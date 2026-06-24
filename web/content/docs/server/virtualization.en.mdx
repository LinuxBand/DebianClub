---
title: Virtualization Platform
description: Explore how to use KVM and QEMU on Debian to turn your server into a powerful virtualization host for running multiple virtual machines.
---

# Virtualization Platform Guide: Using KVM and QEMU

This guide will walk you through setting up a powerful virtualization environment on your Debian server based on **KVM (Kernel-based Virtual Machine)**. KVM is a virtualization solution integrated into the Linux kernel that leverages hardware virtualization extensions (like Intel VT-x or AMD-V) to provide excellent performance. We will use it in combination with **QEMU** (an emulation and virtualization software) and **libvirt** (a management tool suite) to create and manage full-featured virtual machines.

## Why Choose KVM?

- **High Performance**: As a Type 1 Hypervisor integrated into the kernel, its performance is very close to bare metal.
- **Cost-Effective**: It is completely open-source and free, with no expensive licensing fees.
- **Mature and Stable**: KVM is the cornerstone of many large-scale cloud platforms (like OpenStack) and enterprise virtualization solutions.
- **Seamless Integration with Linux**: It fully utilizes all Linux features, such as networking, storage, and security models.

---

## Step 1: Check Hardware Compatibility

Before installation, you must confirm that your CPU supports hardware virtualization.

```bash
# Check if the CPU has the vmx (Intel) or svm (AMD) flag
egrep -c '(vmx|svm)' /proc/cpuinfo
```
If the output is `1` or a higher number, your CPU supports hardware virtualization. If the result is `0`, you cannot use KVM and must first enable virtualization technology (often called VT-x, AMD-V, or Virtualization Technology) in your server's BIOS/UEFI.

You can also install a utility to check:
```bash
sudo apt-get install cpu-checker
sudo kvm-ok
```
If everything is correct, you will see the message "KVM acceleration can be used".

---

## Step 2: Install KVM and Related Packages

We need to install QEMU, KVM, the libvirt management daemon, and some virtual machine management tools.

```bash
sudo apt-get update
sudo apt-get install qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils virt-install
```
- `qemu-kvm`: The core packages for QEMU and KVM.
- `libvirt-daemon-system`: Runs the libvirt daemon.
- `libvirt-clients`: Provides client tools for managing virtual machines, such as `virsh`.
- `bridge-utils`: For creating and managing network bridges.
- `virt-install`: A convenient tool for creating virtual machines from the command line.

After installation, add your current user to the `libvirt` and `kvm` groups so you can manage virtual machines without using `sudo`.

```bash
sudo adduser `id -un` libvirt
sudo adduser `id -un` kvm
```
**Important**: You need to log out and log back in for the group changes to take effect.

---

## Step 3: Create a Virtual Machine with virt-install

Now, we will create a new Debian 12 virtual machine from the command line. `virt-install` supports various installation methods; here we'll use a network install, which automatically downloads the necessary files from Debian's official mirror.

```bash
virt-install \
--name=debian12-vm \
--ram=2048 \
--vcpus=2 \
--disk path=/var/lib/libvirt/images/debian12-vm.qcow2,size=20 \
--os-variant=debian12 \
--network network=default \
--graphics none \
--console pty,target_type=serial \
--location='http://deb.debian.org/debian/dists/bookworm/main/installer-amd64/' \
--extra-args='console=ttyS0,115200n8 serial'
```

- `--name`: The name of the virtual machine.
- `--ram`: The amount of memory to allocate (in MB).
- `--vcpus`: The number of virtual CPU cores to allocate.
- `--disk`: Defines the virtual disk. `path` is the image file location, and `size` is in GB.
- `--os-variant`: The operating system variant, which helps libvirt optimize the VM's configuration.
- `--network`: Connects to the default NAT network named `default`.
- `--graphics none`: Indicates we are not using a graphical interface and will install via a text-based console.
- `--console`: Sets up a serial console so we can see the installation process in our terminal.
- `--location`: Specifies the URL of the network installation source.
- `--extra-args`: Passes extra arguments to the kernel to ensure the installer's output is redirected to our serial console.

After executing this command, the installation process will start directly in your current terminal window. You will need to complete the standard Debian installation steps (language, timezone, partitioning, user setup, etc.) just as you would on a physical machine.

---

## Step 4: Manage VMs with virsh

`virsh` is a powerful command-line tool for managing virtual machines and the virtualization host.

```bash
# List all running virtual machines
virsh list

# List all virtual machines (including shut down ones)
virsh list --all

# Start a virtual machine
virsh start debian12-vm

# Gracefully shut down a virtual machine
virsh shutdown debian12-vm

# Forcefully shut down a virtual machine (like pulling the plug)
virsh destroy debian12-vm

# Connect to the virtual machine's console
virsh console debian12-vm
```
To exit the `virsh console`, press `Ctrl + ]`.

---

## (Optional) Graphical Management

If you are working on a machine with a desktop environment or can use X11 forwarding, you can also use the graphical `virt-manager`.

```bash
sudo apt-get install virt-manager
```
Running `virt-manager` will provide you with an easy-to-use graphical interface to create, manage, and monitor all your virtual machines. 