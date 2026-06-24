---
title: Docker Setup & Usage
description: Learn how to install the Docker Engine on Debian and start building, sharing, and running your applications with container technology.
---

# Docker Setup & Usage Guide

This guide details how to install the Docker Engine on a Debian system. We will use the method recommended by Docker, installing it from Docker's official `apt` repository to ensure we get the latest and most stable version.

## Why Use Docker?

Docker is an open-source containerization platform that allows developers to package applications and all their dependencies (libraries, system tools, code, etc.) into a lightweight, portable container.

- **Environment Consistency**: Ensures that an application runs the same in development, testing, and production environments.
- **Rapid Deployment**: Containers start and stop extremely quickly, far surpassing traditional virtual machines.
- **Resource Isolation**: Containers are isolated from each other, ensuring higher security.
- **Powerful Ecosystem**: Docker Hub has millions of pre-built images that can significantly speed up the development process.

---

## Step 1: Set Up Docker's apt Repository

On a fresh system, we first need to perform some setup to allow the system to trust and download software from the official Docker repository.

### 1.1 Uninstall Old Versions (Optional)

If you have older versions of Docker installed on your system, it's recommended to uninstall them first.

```bash
sudo apt-get remove docker docker-engine docker.io containerd runc
```

### 1.2 Install Dependencies

Install some necessary packages to allow `apt` to use a repository over HTTPS.

```bash
sudo apt-get update
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg
```

### 1.3 Add Docker's Official GPG Key

This ensures that the packages you download are officially signed by Docker and have not been tampered with.

```bash
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
```

### 1.4 Set Up the Repository Address

Add the address of the Docker official repository to your `apt` sources list.

```bash
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

---

## Step 2: Install Docker Engine

Now we can officially install Docker.

```bash
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

- `docker-ce`: Docker Community Edition, the Docker engine itself.
- `docker-ce-cli`: The Docker command-line tool.
- `containerd.io`: A container runtime.
- `docker-buildx-plugin`: Provides support for BuildKit, enhancing build capabilities.
- `docker-compose-plugin`: Integrates the `docker compose` command.

After the installation, the Docker service will start automatically.

---

## Step 3: Verify and Manage the Docker Service

### 3.1 Verify Installation

Run the classic `hello-world` image to verify that Docker is installed correctly and can run.

```bash
sudo docker run hello-world
```

If you see a message including "Hello from Docker!", then congratulations, everything is working correctly!

### 3.2 Manage the Docker Daemon

You can use `systemctl` to manage the state of the Docker service.

```bash
# Check the Docker service status
sudo systemctl status docker

# Stop the Docker service
sudo systemctl stop docker

# Start the Docker service
sudo systemctl start docker

# Enable auto-start on boot (enabled by default)
sudo systemctl enable docker

# Disable auto-start on boot
sudo systemctl disable docker
```

---

## Step 4: (Recommended) Manage Docker as a Non-root User

By default, the `docker` command requires `sudo` privileges. To avoid typing `sudo` every time, you can add your current user to the `docker` group.

### 4.1 Create the docker group (if it doesn't exist)

It is usually created automatically during installation, but you can check.
```bash
sudo groupadd docker
```
If it says the group already exists, you can ignore it.

### 4.2 Add Your User to the Group

```bash
sudo usermod -aG docker $USER
```
`$USER` is an environment variable that will be automatically replaced with your current username.

### 4.3 Activate the Changes

**Important**: After running this command, you must **log out completely and log back in** to the server, or reboot the system, for your group permissions to update.

After logging back in, you can use the `docker` command directly, for example:
```bash
docker ps
```

---

## Core Commands

Here are some of the most basic and frequently used Docker commands:

- `docker pull <image_name>`: Pulls an image from Docker Hub.
- `docker images`: Lists all locally available images.
- `docker run [options] <image_name>`: Creates and starts a container from an image.
- `docker ps`: Lists currently running containers.
- `docker ps -a`: Lists all containers (including stopped ones).
- `docker stop <container_id_or_name>`: Stops a running container.
- `docker start <container_id_or_name>`: Starts a stopped container.
- `docker rm <container_id_or_name>`: Removes one or more containers.
- `docker rmi <image_id_or_name>`: Removes one or more images.

You are now ready to start your containerization journey on Debian! 