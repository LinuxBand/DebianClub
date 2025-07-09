---
title: Kubernetes (K8s) Deployment Guide (using k3s)
description: Learn how to quickly deploy a lightweight yet fully-featured Kubernetes cluster on your Debian server using k3s.
---

# Kubernetes (K8s) Deployment Guide (using k3s)

This guide will show you how to install **k3s**, a lightweight Kubernetes distribution developed by Rancher (now part of SUSE), on a Debian system. k3s greatly simplifies the installation and operation of Kubernetes, making it an ideal choice for learning, development, edge computing, and IoT scenarios.

## What are Kubernetes and k3s?

- **Kubernetes (K8s)**: An open-source container orchestration platform for automating the deployment, scaling, and management of containerized applications. It has become the standard in the containerization world.
- **k3s**: A fully compliant, CNCF-certified Kubernetes distribution. It is packaged as a single binary of less than 100MB, removing many non-default and legacy features and replacing components with lighter alternatives. This results in minimal resource usage (only 512MB of RAM recommended) and an extremely fast startup time.

---

## Step 1: System Preparation

Before installing k3s, we need to perform some basic configuration on the Debian system.

### 1.1 System Update

Ensure your system is up-to-date.

```bash
sudo apt-get update
sudo apt-get upgrade -y
```

### 1.2 Disable Swap (Recommended)

The Kubernetes scheduler does not expect to consider swap space when calculating available node resources. Disabling it improves the stability and predictability of the cluster.

```bash
# Temporarily disable swap
sudo swapoff -a

# Permanently disable: edit the fstab file to comment out the swap partition line
# Use sed to quickly comment out any line containing "swap"
sudo sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab
```

### 1.3 Configure Kernel Parameters

To ensure Kubernetes networking functions correctly, some kernel modules and network settings need to be enabled.

```bash
# Load necessary kernel modules
sudo modprobe overlay
sudo modprobe br_netfilter

# Set sysctl params, which will persist across reboots
cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward                 = 1
EOF

# Apply all sysctl configs
sudo sysctl --system
```

---

## Step 2: Install k3s

k3s provides a very convenient installation script that completes the setup with a single command.

```bash
curl -sfL https://get.k3s.io | sh -
```

This command downloads and executes the latest k3s installation script. The script automatically detects your system and installs the k3s service in the optimal way.

Once finished, the k3s service (`k3s.service`) will start automatically and be enabled on boot.

---

## Step 3: Verify Cluster Status

### 3.1 Check the k3s Service

```bash
sudo systemctl status k3s
```
You should see the service status as `active (running)`.

### 3.2 Use kubectl to Check Nodes

k3s comes with the `kubectl` command built-in. We can use it to check the cluster's status.

```bash
sudo k3s kubectl get node
```

If everything is correct, you will see output similar to the following, indicating your master node is ready.

```
NAME      STATUS   ROLES                  AGE   VERSION
my-node   Ready    control-plane,master   60s   v1.28.x+k3s1
```

---

## Step 4: Configure kubectl Access

Typing `sudo k3s kubectl` every time is inconvenient. We can set up a local `kubeconfig` file to use the `kubectl` command directly.

### 4.1 Copy the Kubeconfig File

The k3s configuration file is located at `/etc/rancher/k3s/k3s.yaml`.

```bash
# Create a .kube directory in your home directory
mkdir -p $HOME/.kube

# Copy the config file
sudo cp /etc/rancher/k3s/k3s.yaml $HOME/.kube/config

# Change the ownership of the config file to your current user
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

**Now you can use `kubectl` directly!**

```bash
kubectl get node
```

---

## Step 5: Deploy a Sample Application

Let's deploy a simple Nginx application to test if the cluster is working correctly.

### 5.1 Create a Deployment

```bash
kubectl create deployment nginx-test --image=nginx
```
This creates a Deployment, and Kubernetes will pull the Nginx image and start a Pod in the background.

### 5.2 Check Pod Status

```bash
kubectl get pods
```
Wait a moment until the Pod's status changes to `Running`.

### 5.3 Expose the Service

By default, the Pod is only accessible from within the cluster. We need to create a Service to expose it.

```bash
# Expose the Deployment using NodePort type
kubectl expose deployment nginx-test --port=80 --type=NodePort
```

### 5.4 Check the Service and Access It

```bash
kubectl get service nginx-test
```
You will see output similar to this:
```
NAME         TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
nginx-test   NodePort   10.43.172.115   <none>        80:31234/TCP   30s
```
Here, `31234` is the external port (NodePort). You can now access the Nginx welcome page via your server's IP address and this port: `http://<your-server-ip>:31234`

Congratulations! You have successfully deployed and are running a full Kubernetes cluster on Debian. 