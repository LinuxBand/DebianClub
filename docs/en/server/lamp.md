---
title: LAMP and LEMP Deployment
description: Learn how to quickly deploy and configure the classic LAMP (Linux, Apache, MySQL, PHP) and LEMP (Linux, Nginx, MySQL, PHP) web server environments on Debian.
---

# LAMP and LEMP Deployment Guide

This guide will detail how to install and configure LAMP and LEMP web server stacks on a Debian system. Both stacks are time-tested and highly mature solutions for hosting websites.

## What are LAMP and LEMP?

- **LAMP** stands for **L**inux / **A**pache / **M**ySQL / **P**HP.
- **LEMP** stands for **L**inux / **E**ngine-X (Nginx) / **M**ySQL / **P**HP.

The only difference between them is the web server software used: Apache is feature-rich with a mature configuration ecosystem, while Nginx is lightweight, high-performance, and excels at handling high concurrency and static files.

## Prerequisites

- A server running a fresh installation of Debian 12 (Bookworm).
- A non-root user with `sudo` privileges.

---

## Deploying LAMP (Apache)

### Step 1: Update Package Index

First, ensure your system's package list is up to date.

```bash
sudo apt update
sudo apt upgrade
```

### Step 2: Install Apache

Install the Apache web server.

```bash
sudo apt install apache2
```

After the installation is complete, you can verify that Apache is running by visiting your server's IP address (`http://your_server_ip`) in a web browser. If you see the default Apache welcome page, the installation was successful.

### Step 3: Install MariaDB (MySQL)

MariaDB is a community-driven, fully compatible fork of MySQL and is the default implementation in Debian.

```bash
sudo apt install mariadb-server
```

After installation, it is recommended to run the security script to remove insecure default settings.

```bash
sudo mysql_secure_installation
```
Follow the prompts to set a root password and answer a series of security questions.

### Step 4: Install PHP

Install PHP and the modules required for it to communicate with Apache and MySQL.

```bash
sudo apt install php libapache2-mod-php php-mysql
```

- `php`: The core PHP package.
- `libapache2-mod-php`: Enables Apache to handle PHP files.
- `php-mysql`: Allows PHP to connect to a MySQL/MariaDB database.

### Step 5: Test PHP

To verify that Apache can correctly process PHP files, let's create a simple PHP file.

```bash
sudo nano /var/www/html/info.php
```

Paste the following content into the editor:

```php
<?php
phpinfo();
?>
```

Save and close the file. Now, visit `http://your_server_ip/info.php` in your browser. If you see a page with detailed PHP information, the LAMP stack has been successfully deployed!

**Important**: For security reasons, be sure to delete this file after testing.
```bash
sudo rm /var/www/html/info.php
```

---

## Deploying LEMP (Nginx)

If you prefer to use Nginx, follow these steps.

### Step 1: Install Nginx

```bash
sudo apt install nginx
```
Similarly, visit your server's IP (`http://your_server_ip`). If you see the Nginx welcome page, the installation is successful.

### Step 2: Install MariaDB

This step is identical to the LAMP installation. If you have already installed it, there is no need to repeat it.

```bash
sudo apt install mariadb-server
sudo mysql_secure_installation
```

### Step 3: Install PHP-FPM

Unlike Apache, Nginx does not have a built-in module for processing PHP. It requires an external program, `PHP-FPM` (FastCGI Process Manager), to handle PHP requests.

```bash
sudo apt install php-fpm php-mysql
```

### Step 4: Configure Nginx

This is the most critical step in a LEMP deployment. You need to edit Nginx's server block configuration file to tell it how to pass `.php` file requests to PHP-FPM.

Open the default server block configuration file:
```bash
sudo nano /etc/nginx/sites-available/default
```

You need to modify the file to look like the one below. Pay attention to adding `index.php` and the `location ~ \.php$` block.

```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    root /var/www/html;
    index index.html index.htm index.php; # Add index.php

    server_name _;

    location / {
        try_files $uri $uri/ =404;
    }

    # This is the key part to uncomment or add
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        # Note: The path may vary depending on the PHP version
        fastcgi_pass unix:/run/php/php8.2-fpm.sock;
    }
}
```

Save and close the file. Then, test the Nginx configuration for syntax errors.

```bash
sudo nginx -t
```
If it displays `syntax is ok` and `test is successful`, you can safely restart Nginx to apply the changes.

```bash
sudo systemctl restart nginx
```

### Step 5: Test PHP

This step is similar to the LAMP test. Create an `info.php` file.

```bash
sudo nano /var/www/html/info.php
```

```php
<?php
phpinfo();
?>
```

Now, visit `http://your_server_ip/info.php`. If you see the PHP information page, the LEMP stack has been successfully deployed!

**Again, be sure to delete this file after testing.**
```bash
sudo rm /var/www/html/info.php
```

## Next Steps

You now have a fully functional web server environment. Your next steps might include:
- Configuring Virtual Hosts for your websites.
- Enabling HTTPS for your site using Let's Encrypt.
- Deploying your own application or installing a CMS like WordPress.
