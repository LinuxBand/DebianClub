---
title: Kubernetes (K8s) 部署指南 (使用 k3s)
description: 学习如何使用 k3s 在您的 Debian 服务器上快速部署一个轻量级、功能完备的 Kubernetes 集群。
---

# Kubernetes (K8s) 部署指南 (使用 k3s)

本指南将向您展示如何在 Debian 系统上安装 **k3s**，一个由 Rancher (现为 SUSE 的一部分) 开发的轻量级 Kubernetes 发行版。k3s 极大地简化了 Kubernetes 的安装和运维，是学习、开发、边缘计算和物联网场景的理想选择。

## 什么是 Kubernetes 和 k3s?

- **Kubernetes (K8s)**: 是一个开源的容器编排平台，用于自动部署、扩展和管理容器化应用程序。它已成为容器化世界的标准。
- **k3s**: 是一个完全兼容、经过 CNCF 认证的 Kubernetes 发行版。它被打包成一个小于 100MB 的二进制文件，移除了很多非默认和旧有的功能，并用更轻量的组件替代。这使得它的资源占用极小（推荐内存仅需 512MB），启动速度极快。

---

## 步骤 1: 系统准备

在安装 k3s 之前，我们需要对 Debian 系统进行一些基础配置。

### 1.1 系统更新

确保您的系统是最新状态。

```bash
sudo apt-get update
sudo apt-get upgrade -y
```

### 1.2 禁用 Swap (推荐)

Kubernetes 的调度器在计算节点可用资源时，不希望考虑 Swap 空间。禁用它可以提高集群的稳定性和可预测性。

```bash
# 临时禁用
sudo swapoff -a

# 永久禁用：编辑 fstab 文件，注释掉 swap 分区行
# 使用 sed 命令快速注释掉所有包含 "swap" 的行
sudo sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab
```

### 1.3 配置内核参数

为了让 Kubernetes 的网络正常工作，需要启用一些内核模块和网络设置。

```bash
# 加载必要的内核模块
sudo modprobe overlay
sudo modprobe br_netfilter

# 设置 sysctl 参数，这些设置在重启后也会保持
cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward                 = 1
EOF

# 应用所有 sysctl 配置
sudo sysctl --system
```

---

## 步骤 2: 安装 k3s

k3s 提供了一个非常方便的安装脚本，可以一键完成安装。

```bash
curl -sfL https://get.k3s.io | sh -
```

这个命令会下载最新的 k3s 安装脚本并执行。脚本会自动检测您的系统，并以最佳方式安装 k3s 服务。

安装完成后，k3s 服务 (`k3s.service`) 会自动启动并设置为开机自启。

---

## 步骤 3: 验证集群状态

### 3.1 检查 k3s 服务

```bash
sudo systemctl status k3s
```
您应该能看到服务状态为 `active (running)`。

### 3.2 使用 kubectl 检查节点

k3s 内置了 `kubectl` 命令。我们可以用它来检查集群的状态。

```bash
sudo k3s kubectl get node
```

如果一切正常，您会看到类似下面的输出，表示您的主节点 (master) 已经准备就绪 (`Ready`)。

```
NAME      STATUS   ROLES                  AGE   VERSION
my-node   Ready    control-plane,master   60s   v1.28.x+k3s1
```

---

## 步骤 4: 配置 kubectl 访问

每次都输入 `sudo k3s kubectl` 很不方便。我们可以配置一个本地的 `kubeconfig` 文件，以便直接使用 `kubectl` 命令。

### 4.1 复制 Kubeconfig 文件

k3s 的配置文件位于 `/etc/rancher/k3s/k3s.yaml`。

```bash
# 在您的用户主目录下创建 .kube 文件夹
mkdir -p $HOME/.kube

# 复制配置文件
sudo cp /etc/rancher/k3s/k3s.yaml $HOME/.kube/config

# 将配置文件的所有权变更为您的当前用户
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

**现在，您可以直接使用 `kubectl` 了！**

```bash
kubectl get node
```

---

## 步骤 5: 部署一个示例应用

让我们部署一个简单的 Nginx 应用来测试集群是否正常工作。

### 5.1 创建 Deployment

```bash
kubectl create deployment nginx-test --image=nginx
```
这会创建一个 Deployment，Kubernetes 将在后台拉取 Nginx 镜像并启动一个 Pod。

### 5.2 查看 Pod 状态

```bash
kubectl get pods
```
等待片刻，直到 Pod 的状态变为 `Running`。

### 5.3 暴露服务

默认情况下，Pod 只能在集群内部访问。我们需要创建一个 Service 来将它暴露出来。

```bash
# 使用 NodePort 类型暴露 Deployment
kubectl expose deployment nginx-test --port=80 --type=NodePort
```

### 5.4 查看服务并访问

```bash
kubectl get service nginx-test
```
您会看到类似这样的输出：
```
NAME         TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
nginx-test   NodePort   10.43.172.115   <none>        80:31234/TCP   30s
```
这里的 `31234` 就是外部端口 (NodePort)。现在，您可以通过服务器的 IP 地址和这个端口号访问 Nginx 欢迎页面：`http://<您的服务器IP>:31234`

恭喜！您已经在 Debian 上成功部署并运行了一个完整的 Kubernetes 集群。 