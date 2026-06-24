---
title: Java 环境安装
description: 在 Debian 上为您的开发和生产环境安装并管理多个版本的 Java Development Kit (JDK)。
---

# Java 环境安装指南

本指南将介绍如何在 Debian 系统上安装 OpenJDK (开放爪哇开发工具包)，并管理多个 Java 版本。Debian 的 `apt` 软件包管理器使得安装和更新 Java 变得非常简单和安全。

## 为什么选择 OpenJDK?

OpenJDK 是 Java SE 平台的官方开源参考实现。它功能强大、性能优越，并且获得了广泛的社区支持。对于绝大多数开发和生产环境，OpenJDK 都是一个优秀的选择。

---

## 步骤 1: 安装默认的 OpenJDK

Debian 12 "Bookworm" 的默认 Java 版本是 OpenJDK 17。这通常是最推荐安装的版本，因为它经过了充分的测试，并且能够获得长期的安全更新。

### 1.1 更新软件包列表

首先，确保你的系统软件包列表是最新的。

```bash
sudo apt update
```

### 1.2 安装默认的 JDK

安装 Java Development Kit (JDK)。JDK 包含了运行 Java 程序所需的 JRE (Java 运行时环境) 以及编译和调试代码所需的开发工具。

```bash
sudo apt install default-jdk
```

### 1.3 验证安装

安装完成后，可以通过检查 Java 版本来验证是否成功。

```bash
java -version
```

你应该会看到类似以下的输出，表明 OpenJDK 17 已成功安装：

```
openjdk version "17.0.8" 2023-07-18
OpenJDK Runtime Environment (build 17.0.8+7-Debian-1)
OpenJDK 64-Bit Server VM (build 17.0.8+7-Debian-1, mixed mode, sharing)
```

---

## 步骤 2: (可选) 安装其他版本的 OpenJDK

有时，你的应用程序可能需要一个特定版本的 Java，例如较旧的 Java 11 (LTS) 或最新的 Java 21 (LTS)。你可以通过在包名中指定版本号来安装它们。

### 2.1 搜索可用版本

你可以先搜索软件仓库，看看提供了哪些 OpenJDK 版本。

```bash
apt search openjdk-
```

### 2.2 安装特定版本

例如，要安装 OpenJDK 11：

```bash
sudo apt install openjdk-11-jdk
```

或者，安装 OpenJDK 21：

```bash
sudo apt install openjdk-21-jdk
```

---

## 步骤 3: 管理多个 Java 版本

如果你在系统上安装了多个 Java 版本，你可以使用 `update-alternatives` 工具来配置默认使用的版本。

### 3.1 查看已安装的版本

运行以下命令，`update-alternatives` 会列出所有已识别的 Java 版本，并让你以交互方式选择一个作为默认。

```bash
sudo update-alternatives --config java
```

你会看到一个类似下面的菜单：

```
There are 2 choices for the alternative java (providing /usr/bin/java).

  Selection    Path                                     Priority   Status
------------------------------------------------------------
* 0            /usr/lib/jvm/java-17-openjdk-amd64/bin/java   1711      auto mode
  1            /usr/lib/jvm/java-11-openjdk-amd64/bin/java   1111      manual mode
  2            /usr/lib/jvm/java-17-openjdk-amd64/bin/java   1711      manual mode

Press <enter> to keep the current choice[*], or type selection number:
```

### 3.2 切换版本

直接输入你想要设为默认的版本的**选择编号 (Selection Number)**，然后按回车即可。你也可以用同样的命令来切换 Java 编译器 `javac` 的版本：

```bash
sudo update-alternatives --config javac
```

---

## 步骤 4: 设置 JAVA_HOME 环境变量

很多 Java 程序（例如 Maven, Gradle, Tomcat）依赖于 `JAVA_HOME` 环境变量来找到 JDK 的安装位置。

### 4.1 查找 Java 安装路径

`update-alternatives` 的输出已经告诉了我们每个 JDK 的安装路径 (例如 `/usr/lib/jvm/java-17-openjdk-amd64`)。

### 4.2 配置环境变量

最推荐的方式是编辑 `/etc/environment` 文件，这样所有用户登录时都能应用这个环境变量。

```bash
sudo nano /etc/environment
```

在文件的末尾添加以下这行：

```
JAVA_HOME="/usr/lib/jvm/java-17-openjdk-amd64"
```

保存并关闭文件。要让这个改动立即生效，可以运行：

```bash
source /etc/environment
```

然后，验证一下 `JAVA_HOME` 是否已设置成功：
```bash
echo $JAVA_HOME
```
你应该会看到你刚才设置的路径。 