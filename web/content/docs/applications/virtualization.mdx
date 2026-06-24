---
title: 虚拟化环境
description: Debian 13 虚拟化应用指南，包括Docker、VirtualBox、QEMU等虚拟化工具
---

# 虚拟化环境

本教程介绍如何在 Debian 13 中使用各种虚拟化技术，包括容器化和虚拟机。

## 🐳 Docker 容器化

### Docker 安装

```bash
# 更新包索引
sudo apt update

# 安装必要依赖
sudo apt install apt-transport-https ca-certificates curl gnupg lsb-release

# 添加Docker官方GPG密钥
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# 添加Docker软件源
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 安装Docker
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io
```

### Docker 配置

```bash
# 启用Docker服务
sudo systemctl enable docker
sudo systemctl start docker

# 将用户添加到docker组
sudo usermod -aG docker $USER

# 重新登录或执行
newgrp docker

# 验证安装
docker --version
docker run hello-world
```

### Docker Compose

```bash
# 安装Docker Compose
sudo apt install docker-compose

# 或者使用pip安装最新版
sudo apt install python3-pip
sudo pip3 install docker-compose

# 验证安装
docker-compose --version
```

## 💻 VirtualBox 虚拟机

### VirtualBox 安装

```bash
# 添加VirtualBox软件源
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/oracle-virtualbox-2016.gpg] https://download.virtualbox.org/virtualbox/debian $(lsb_release -cs) contrib" | sudo tee /etc/apt/sources.list.d/virtualbox.list

# 添加Oracle密钥
wget -O- https://www.virtualbox.org/download/oracle_vbox_2016.asc | sudo gpg --dearmor --yes --output /usr/share/keyrings/oracle-virtualbox-2016.gpg

# 安装VirtualBox
sudo apt update
sudo apt install virtualbox-7.0

# 安装扩展包
sudo apt install virtualbox-ext-pack
```

### VirtualBox 配置

```bash
# 将用户添加到vboxusers组
sudo usermod -aG vboxusers $USER

# 加载内核模块
sudo modprobe vboxdrv
sudo modprobe vboxnetflt
sudo modprobe vboxnetadp

# 设置自动加载
echo 'vboxdrv' | sudo tee -a /etc/modules
echo 'vboxnetflt' | sudo tee -a /etc/modules
echo 'vboxnetadp' | sudo tee -a /etc/modules
```

## 🚀 QEMU/KVM 虚拟化

### QEMU 安装

```bash
# 检查硬件虚拟化支持
egrep -c '(vmx|svm)' /proc/cpuinfo

# 安装QEMU和相关工具
sudo apt install qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils virt-manager

# 启用libvirt服务
sudo systemctl enable libvirtd
sudo systemctl start libvirtd

# 将用户添加到相关组
sudo usermod -aG libvirt $USER
sudo usermod -aG kvm $USER
```

### virt-manager 图形界面

```bash
# 安装图形管理工具
sudo apt install virt-manager virt-viewer

# 启动virt-manager
virt-manager
```

## 📦 LXC 容器

### LXC 安装配置

```bash
# 安装LXC
sudo apt install lxc lxc-templates

# 配置网络
sudo nano /etc/lxc/default.conf

# 创建容器
sudo lxc-create -n mycontainer -t debian

# 启动容器
sudo lxc-start -n mycontainer

# 连接到容器
sudo lxc-attach -n mycontainer
```

## 🔧 Podman 替代方案

### Podman 安装

```bash
# 安装Podman
sudo apt install podman

# 配置rootless模式
echo "$USER:100000:65536" | sudo tee -a /etc/subuid
echo "$USER:100000:65536" | sudo tee -a /etc/subgid

# 验证安装
podman --version
podman run hello-world
```

## 🌐 开发环境容器化

### Web开发环境

```yaml
# docker-compose.yml
version: '3.8'
services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./html:/usr/share/nginx/html
  
  php:
    image: php:8.2-fpm
    volumes:
      - ./html:/var/www/html
  
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: myapp
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

### 启动开发环境

```bash
# 启动服务
docker-compose up -d

# 查看运行状态
docker-compose ps

# 停止服务
docker-compose down
```

## 🛠️ 常用命令

### Docker 常用操作

```bash
# 镜像管理
docker images                    # 列出镜像
docker pull ubuntu:latest       # 拉取镜像
docker rmi image_id             # 删除镜像

# 容器管理
docker ps                       # 列出运行中容器
docker ps -a                    # 列出所有容器
docker run -it ubuntu:latest bash  # 运行容器
docker stop container_id        # 停止容器
docker rm container_id          # 删除容器

# 系统清理
docker system prune            # 清理未使用资源
docker volume prune            # 清理未使用卷
```

### VirtualBox 命令行

```bash
# 虚拟机管理
VBoxManage list vms            # 列出虚拟机
VBoxManage startvm "VM名称"    # 启动虚拟机
VBoxManage controlvm "VM名称" poweroff  # 关闭虚拟机

# 快照管理
VBoxManage snapshot "VM名称" take "快照名"     # 创建快照
VBoxManage snapshot "VM名称" restore "快照名" # 恢复快照
```

## 📊 性能监控

### 资源监控

```bash
# Docker资源使用
docker stats

# 系统虚拟化状态
sudo virt-host-validate

# 内存和CPU使用
htop
free -h
```

## 🔒 安全考虑

### Docker 安全

```bash
# 使用非root用户运行容器
docker run -u 1000:1000 ubuntu:latest

# 限制容器资源
docker run --memory=512m --cpus=1 ubuntu:latest

# 只读文件系统
docker run --read-only ubuntu:latest
```

### 网络隔离

```bash
# 创建自定义网络
docker network create mynetwork

# 在指定网络运行容器
docker run --network=mynetwork ubuntu:latest
```

## 📚 相关资源

1. [开发环境配置](/applications/development) - 开发工具链
2. [网络配置](/administration/network) - 网络设置
3. [系统监控](/administration/logs) - 系统监控

**虚拟化环境配置完成了吗？** [继续学习开发工具 →](/applications/development) 