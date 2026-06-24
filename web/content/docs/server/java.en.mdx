---
title: Installing Java
description: Install and manage multiple versions of the Java Development Kit (JDK) on Debian for your development and production environments.
---

# Installing Java Guide

This guide covers how to install OpenJDK (Open Java Development Kit) on a Debian system and manage multiple Java versions. Debian's `apt` package manager makes installing and updating Java very simple and secure.

## Why Choose OpenJDK?

OpenJDK is the official open-source reference implementation of the Java SE platform. It is powerful, performs excellently, and is backed by broad community support. For the vast majority of development and production environments, OpenJDK is an outstanding choice.

---

## Step 1: Install the Default OpenJDK

The default Java version in Debian 12 "Bookworm" is OpenJDK 17. This is generally the most recommended version to install as it has been thoroughly tested and receives long-term security updates.

### 1.1 Update Package List

First, ensure your system's package list is up to date.

```bash
sudo apt update
```

### 1.2 Install the Default JDK

Install the Java Development Kit (JDK). The JDK includes the JRE (Java Runtime Environment) needed to run Java programs, as well as the development tools required to compile and debug code.

```bash
sudo apt install default-jdk
```

### 1.3 Verify the Installation

Once the installation is complete, you can verify its success by checking the Java version.

```bash
java -version
```

You should see output similar to the following, indicating that OpenJDK 17 has been successfully installed:

```
openjdk version "17.0.8" 2023-07-18
OpenJDK Runtime Environment (build 17.0.8+7-Debian-1)
OpenJDK 64-Bit Server VM (build 17.0.8+7-Debian-1, mixed mode, sharing)
```

---

## Step 2: (Optional) Install Other Versions of OpenJDK

Sometimes, your application may require a specific version of Java, such as the older Java 11 (LTS) or the newer Java 21 (LTS). You can install them by specifying the version number in the package name.

### 2.1 Search for Available Versions

You can first search the software repository to see which OpenJDK versions are available.

```bash
apt search openjdk-
```

### 2.2 Install a Specific Version

For example, to install OpenJDK 11:

```bash
sudo apt install openjdk-11-jdk
```

Or, to install OpenJDK 21:

```bash
sudo apt install openjdk-21-jdk
```

---

## Step 3: Manage Multiple Java Versions

If you have multiple Java versions installed on your system, you can use the `update-alternatives` utility to configure the default version.

### 3.1 List Installed Versions

Run the following command. `update-alternatives` will list all recognized Java versions and let you choose one as the default interactively.

```bash
sudo update-alternatives --config java
```

You will see a menu similar to this:

```
There are 2 choices for the alternative java (providing /usr/bin/java).

  Selection    Path                                     Priority   Status
------------------------------------------------------------
* 0            /usr/lib/jvm/java-17-openjdk-amd64/bin/java   1711      auto mode
  1            /usr/lib/jvm/java-11-openjdk-amd64/bin/java   1111      manual mode
  2            /usr/lib/jvm/java-17-openjdk-amd64/bin/java   1711      manual mode

Press <enter> to keep the current choice[*], or type selection number:
```

### 3.2 Switch Versions

Simply enter the **selection number** of the version you want to set as the default and press Enter. You can use the same command to switch the version of the Java compiler, `javac`:

```bash
sudo update-alternatives --config javac
```

---

## Step 4: Set the JAVA_HOME Environment Variable

Many Java applications (such as Maven, Gradle, and Tomcat) rely on the `JAVA_HOME` environment variable to find the JDK installation location.

### 4.1 Find the Java Installation Path

The output of `update-alternatives` has already shown us the installation path for each JDK (e.g., `/usr/lib/jvm/java-17-openjdk-amd64`).

### 4.2 Configure the Environment Variable

The most recommended way to set this is by editing the `/etc/environment` file, which applies the variable for all users upon login.

```bash
sudo nano /etc/environment
```

Add the following line to the end of the file:

```
JAVA_HOME="/usr/lib/jvm/java-17-openjdk-amd64"
```

Save and close the file. To apply the change immediately, you can run:

```bash
source /etc/environment
```

Then, verify that `JAVA_HOME` has been set correctly:
```bash
echo $JAVA_HOME
```
You should see the path you just set. 