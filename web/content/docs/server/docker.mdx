---
title: Docker 安装与使用
description: 学习如何在 Debian 上安装 Docker 引擎，并开始使用容器技术来构建、分享和运行您的应用程序。
---

# Docker 安装与使用指南

本指南将详细介绍如何在 Debian 系统上安装 Docker 引擎 (Docker Engine)。我们将使用 Docker 官方推荐的方法，通过其官方的 `apt` 软件仓库来安装，以确保我们能获得最新、最稳定的版本。

## 为什么使用 Docker?

Docker 是一种开源的容器化平台，它允许开发者将应用程序及其所有依赖（库、系统工具、代码等）打包到一个轻量级、可移植的容器中。

- **环境一致性**: 确保应用在开发、测试和生产环境中运行得一模一样。
- **快速部署**: 容器的启动和停止速度极快，远超传统虚拟机。
- **资源隔离**: 容器之间相互隔离，保证了更高的安全性。
- **强大的生态**: Docker Hub 上有数以百万计的预构建镜像，可以极大加速开发进程。

---

## 步骤 1: 设置 Docker 的 apt 软件仓库

在全新安装的系统上，我们需要先进行一些设置，让系统能够信任并从 Docker 官方仓库下载软件。

### 1.1 清理旧版本 (可选)

如果你的系统上曾安装过旧版本的 Docker，建议先将它们卸载。

```bash
sudo apt-get remove docker docker-engine docker.io containerd runc
```

### 1.2 安装依赖

安装一些必要的软件包，以允许 `apt` 通过 HTTPS 使用软件仓库。

```bash
sudo apt-get update
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg
```

### 1.3 添加 Docker 的官方 GPG 密钥

这确保了你下载的软件包是经过 Docker 官方签名、未经篡改的。

```bash
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
```

### 1.4 设置软件仓库地址

将 Docker 官方仓库的地址添加到你的 `apt` 源列表中。

```bash
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

---

## 步骤 2: 安装 Docker 引擎

现在我们可以正式安装 Docker 了。

```bash
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

- `docker-ce`: Docker Community Edition，即 Docker 引擎。
- `docker-ce-cli`: Docker 命令行工具。
- `containerd.io`: 一个容器运行时。
- `docker-buildx-plugin`: 提供对 BuildKit 的支持，增强构建功能。
- `docker-compose-plugin`: 集成了 `docker compose` 命令。

安装完成后，Docker 服务会自动启动。

---

## 步骤 3: 验证并管理 Docker 服务

### 3.1 验证安装

运行经典的 `hello-world` 镜像来验证 Docker 是否已正确安装并可以运行。

```bash
sudo docker run hello-world
```

如果你看到一条包含 "Hello from Docker!" 的消息，那么恭喜你，一切正常！

### 3.2 管理 Docker 守护进程

你可以使用 `systemctl` 来管理 Docker 服务的状态。

```bash
# 查看 Docker 服务状态
sudo systemctl status docker

# 停止 Docker 服务
sudo systemctl stop docker

# 启动 Docker 服务
sudo systemctl start docker

# 设置开机自启 (默认已设置)
sudo systemctl enable docker

# 取消开机自启
sudo systemctl disable docker
```

---

## 步骤 4: (推荐) 以非 root 用户身份管理 Docker

默认情况下，`docker` 命令需要 `sudo` 权限。为了避免每次都输入 `sudo`，你可以将你的当前用户添加到 `docker` 用户组中。

### 4.1 创建 docker 用户组 (如果不存在)

通常在安装时会自动创建，但可以确认一下。
```bash
sudo groupadd docker
```
如果提示已存在，则可以忽略。

### 4.2 将你的用户添加到组中

```bash
sudo usermod -aG docker $USER
```
`$USER` 是一个环境变量，它会自动替换为你的当前用户名。

### 4.3 激活改动

**重要**: 运行此命令后，你需要**完全注销并重新登录**服务器，或者重启系统，这样你的用户组权限才会更新。

重新登录后，你就可以直接使用 `docker` 命令了，例如：
```bash
docker ps
```

---

## 常用核心命令

以下是一些最基础和常用的 Docker 命令：

- `docker pull <image_name>`: 从 Docker Hub 拉取一个镜像。
- `docker images`: 列出本地已有的所有镜像。
- `docker run [options] <image_name>`: 从一个镜像创建并启动一个容器。
- `docker ps`: 列出当前正在运行的容器。
- `docker ps -a`: 列出所有容器（包括已停止的）。
- `docker stop <container_id_or_name>`: 停止一个正在运行的容器。
- `docker start <container_id_or_name>`: 启动一个已停止的容器。
- `docker rm <container_id_or_name>`: 删除一个或多个容器。
- `docker rmi <image_id_or_name>`: 删除一个或多个镜像。

现在，你已经准备好在 Debian 上开始你的容器化之旅了！ 