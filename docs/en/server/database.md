---
title: Database Services
description: Learn how to install, configure, and manage popular relational databases like MariaDB and PostgreSQL on Debian.
---

# Database Services Guide: Configuring MariaDB

This guide provides detailed instructions on how to install and configure **MariaDB** on a Debian system. MariaDB is a community-developed, backward-compatible fork of MySQL and one of the default database management systems in Debian. It is known for its high performance, stability, and open-source nature.

## Why Choose MariaDB?

- **Fully Open Source**: Licensed under GPLv2, driven by the community.
- **Highly Compatible with MySQL**: Can be used as a drop-in replacement for MySQL with minimal migration effort.
- **Enhanced Performance**: In some scenarios, its storage engines (like Aria and XtraDB) offer better performance than MySQL's InnoDB.
- **Official Debian Support**: Available directly from Debian's software repositories, making installation and updates very convenient.

---

## Step 1: Install the MariaDB Server

First, update your package list and install the MariaDB server.

```bash
sudo apt-get update
sudo apt-get install mariadb-server
```

After the installation is complete, the MariaDB service will start automatically. You can check its status using `systemctl`:

```bash
sudo systemctl status mariadb
```
You should see an `active (running)` status message.

---

## Step 2: Secure the Installation

MariaDB comes with a security script that helps remove insecure default settings and set a password for the `root` account.

```bash
sudo mysql_secure_installation
```
The script will guide you through the following actions. It's recommended to choose the options as follows:
1.  **Enter current password for root (enter for none):** Just press Enter, as there is no password initially.
2.  **Switch to unix_socket authentication? [Y/n]** Type `Y` and press Enter. This is a more secure authentication method that allows you to use your system's `sudo` privileges to log in as MariaDB's `root` user.
3.  **Change the root password? [Y/n]** Type `n` and press Enter. Since we have enabled `unix_socket` authentication, the `root` account cannot be accessed remotely with a password, so there's no need to set one.
4.  **Remove anonymous users? [Y/n]** Type `Y` and press Enter to remove anonymous users.
5.  **Disallow root login remotely? [Y/n]** Type `Y` and press Enter to prohibit remote root login.
6.  **Remove test database and access to it? [Y/n]** Type `Y` and press Enter to remove the test database.
7.  **Reload privilege tables now? [Y/n]** Type `Y` and press Enter to apply all changes immediately.

---

## Step 3: Manage Databases and Users

After securing the installation, let's learn how to create a new database and user, a necessary step for most applications.

### 3.1 Log in to the MariaDB Console

Since we enabled `unix_socket` authentication, you can log in directly using `sudo`.

```bash
sudo mariadb
```
Or use `sudo mysql`, they are equivalent. Upon success, you will see the `MariaDB [(none)]>` prompt.

### 3.2 Create a Database

Replace `myapp_db` with your desired database name.

```sql
CREATE DATABASE myapp_db;
```
::: tip
In SQL commands, the semicolon (`;`) signifies the end of the command. Don't forget it.
:::

### 3.3 Create a New User and Grant Permissions

For security, applications should not use the `root` account directly. Let's create a dedicated user. Replace `myapp_user` and `your_strong_password` with actual values.

```sql
CREATE USER 'myapp_user'@'localhost' IDENTIFIED BY 'your_strong_password';
```
This command creates a user that is only allowed to log in from the local machine (`localhost`).

Next, grant this user all permissions on the `myapp_db` database.

```sql
GRANT ALL PRIVILEGES ON myapp_db.* TO 'myapp_user'@'localhost';
```
- `myapp_db.*` refers to all tables within the `myapp_db` database.

### 3.4 Flush Privileges and Exit

Apply the privilege changes immediately and then exit the console.
```sql
FLUSH PRIVILEGES;
EXIT;
```

---

## Step 4: Test the New User

Now, you can try to log in with the newly created user and password.

```bash
mysql -u myapp_user -p
```
The system will prompt you for the password. If you successfully enter the MariaDB console and the prompt changes to `MariaDB [myapp_db]>`, it means your user has been created successfully and granted access to the default database.

## (Optional) Allow Remote Access

If you need to connect to this database from another server, you need to make two configurations:
1.  **Modify MariaDB Configuration**:
    Edit the bind address. Open the `/etc/mysql/mariadb.conf.d/50-server.cnf` file, find the `bind-address` line, and either comment it out or change it to `0.0.0.0`.
    ```ini
    #bind-address = 127.0.0.1
    # or
    bind-address = 0.0.0.0
    ```
    Then restart MariaDB: `sudo systemctl restart mariadb`.

2.  **Create a Remotely Accessible User**:
    When creating the user, replace `'localhost'` with the source IP address you want to allow, or use the `%` symbol to allow any address.
    ```sql
    CREATE USER 'remote_user'@'%' IDENTIFIED BY 'another_password';
    GRANT ALL PRIVILEGES ON myapp_db.* TO 'remote_user'@'%';
    FLUSH PRIVILEGES;
    ```
::: danger Note
Allowing remote access from any address (`%`) is a security risk. In a production environment, you should specify concrete IP addresses whenever possible. Also, ensure your firewall (like UFW) is configured to only allow access to MariaDB's port (default is 3306) from trusted IPs.
::: 