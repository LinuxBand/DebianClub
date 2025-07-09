---
title: LAMP 和 LEMP 网站服务器部署
description: 学习如何在 Debian 上快速部署和配置经典的 LAMP (Linux, Apache, MySQL, PHP) 和 LEMP (Linux, Nginx, MySQL, PHP) 网站服务器环境。
---

# LAMP 和 LEMP 部署指南

本指南将详细介绍如何在 Debian 系统上安装和配置 LAMP 和 LEMP 网站服务器。这两个技术栈都是经过长期考验、非常成熟的网站托管方案。

## 什么是 LAMP 和 LEMP？

- **LAMP** 指的是 **L**inux / **A**pache / **M**ySQL / **P**HP。
- **LEMP** 指的是 **L**inux / **E**ngine-X (Nginx) / **M**ySQL / **P**HP。

它们唯一的区别在于使用的 Web 服务器软件：Apache 功能全面、配置生态成熟；Nginx 轻量、高性能，尤其擅长处理高并发和静态文件。

## 先决条件

- 一台已安装 Debian 12 (Bookworm) 的服务器。
- 一个拥有 `sudo` 权限的非 root 用户。

---

## 部署 LAMP (Apache)

### 步骤 1: 更新软件包列表

首先，确保你的系统软件包列表是最新的。

```bash
sudo apt update
sudo apt upgrade
```

### 步骤 2: 安装 Apache

安装 Apache Web 服务器。

```bash
sudo apt install apache2
```

安装完成后，你可以通过在浏览器中访问服务器的 IP 地址 (`http://你的服务器IP`) 来验证 Apache 是否正在运行。如果看到 Apache 的默认欢迎页面，说明安装成功。

### 步骤 3: 安装 MariaDB (MySQL)

MariaDB 是 MySQL 的一个社区驱动、完全兼容的分支，也是 Debian 中的默认实现。

```bash
sudo apt install mariadb-server
```

安装后，建议运行安全脚本来移除不安全的默认设置。

```bash
sudo mysql_secure_installation
```
根据提示操作，设置 root 密码并回答一系列安全问题。

### 步骤 4: 安装 PHP

安装 PHP 以及它与 Apache 和 MySQL 通信所需的模块。

```bash
sudo apt install php libapache2-mod-php php-mysql
```

- `php`: PHP 核心包。
- `libapache2-mod-php`: 使 Apache 能够处理 PHP 文件。
- `php-mysql`: 使 PHP 能够连接到 MySQL/MariaDB 数据库。

### 步骤 5: 测试 PHP

为了验证 Apache 是否能正确处理 PHP 文件，我们创建一个简单的 PHP 文件。

```bash
sudo nano /var/www/html/info.php
```

在编辑器中粘贴以下内容：

```php
<?php
phpinfo();
?>
```

保存并关闭文件。现在，在浏览器中访问 `http://你的服务器IP/info.php`。如果你看到了一个包含详细 PHP信息的页面，那么 LAMP 堆栈已成功部署！

**重要**: 出于安全考虑，测试完成后请务必删除这个文件。
```bash
sudo rm /var/www/html/info.php
```

---

## 部署 LEMP (Nginx)

如果你更倾向于使用 Nginx，可以按照以下步骤操作。

### 步骤 1: 安装 Nginx

```bash
sudo apt install nginx
```
同样，访问服务器 IP (`http://你的服务器IP`)，如果看到 Nginx 的欢迎页面，则表示安装成功。

### 步骤 2: 安装 MariaDB

此步骤与 LAMP 安装完全相同。如果已经安装，则无需重复。

```bash
sudo apt install mariadb-server
sudo mysql_secure_installation
```

### 步骤 3: 安装 PHP-FPM

Nginx 不像 Apache 那样有内建的 PHP 处理模块，它需要一个外部程序来处理 PHP 请求，这就是 `PHP-FPM` (FastCGI Process Manager)。

```bash
sudo apt install php-fpm php-mysql
```

### 步骤 4: 配置 Nginx

这是 LEMP 部署中最关键的一步。你需要编辑 Nginx 的服务器块配置文件，告诉它如何将 `.php` 文件的请求传递给 PHP-FPM。

打开默认的服务器块配置文件：
```bash
sudo nano /etc/nginx/sites-available/default
```

你需要修改文件，使其看起来像下面这样。注意添加 `index.php` 和 `location ~ \.php$` 块。

```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    root /var/www/html;
    index index.html index.htm index.php; # 添加 index.php

    server_name _;

    location / {
        try_files $uri $uri/ =404;
    }

    # 这是需要取消注释或添加的关键部分
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        # 注意: 路径可能因 PHP 版本而异
        fastcgi_pass unix:/run/php/php8.2-fpm.sock;
    }
}
```

保存并关闭文件。然后，测试 Nginx 配置是否有语法错误。

```bash
sudo nginx -t
```
如果显示 `syntax is ok` 和 `test is successful`，则可以安全地重启 Nginx 来应用更改。

```bash
sudo systemctl restart nginx
```

### 步骤 5: 测试 PHP

此步骤与 LAMP 测试类似，创建一个 `info.php` 文件。

```bash
sudo nano /var/www/html/info.php
```

```php
<?php
phpinfo();
?>
```

现在访问 `http://你的服务器IP/info.php`，如果看到 PHP 信息页面，说明 LEMP 堆栈已成功部署！

**同样，请务必在测试后删除此文件。**
```bash
sudo rm /var/www/html/info.php
```

## 下一步

现在你已经拥有了一个功能完备的 Web 服务器环境。下一步，你可以考虑：
- 为你的网站配置虚拟主机 (Virtual Hosts)。
- 使用 Let's Encrypt 为你的网站启用 HTTPS。
- 部署你自己的应用程序或安装一个 CMS，如 WordPress。 