---
title: 数据库服务
description: 学习如何在 Debian 上安装、配置和管理主流的关系型数据库，如 MariaDB 和 PostgreSQL。
---

# 数据库服务指南：配置 MariaDB

本指南将详细介绍如何在 Debian 系统上安装和配置 **MariaDB**。MariaDB 是 MySQL 的一个社区开发的、向后兼容的分支，也是 Debian 默认的数据库管理系统之一。它以高性能、稳定性和开放性而著称。

## 为什么选择 MariaDB?

- **完全开源**: 遵循 GPLv2 许可，由社区驱动。
- **与 MySQL 高度兼容**: 可以作为 MySQL 的直接替代品，迁移成本极低。
- **性能更优**: 在某些场景下，其存储引擎（如 Aria 和 XtraDB）提供了比 MySQL InnoDB 更好的性能。
- **Debian 官方支持**: 在 Debian 的软件仓库中可以直接获取，安装和更新都非常方便。

---

## 步骤 1: 安装 MariaDB 服务器

首先，更新您的包列表并安装 MariaDB 服务器。

```bash
sudo apt-get update
sudo apt-get install mariadb-server
```

安装完成后，MariaDB 服务会自动启动。您可以使用 `systemctl` 来检查其状态：

```bash
sudo systemctl status mariadb
```
您应该能看到 `active (running)` 的状态信息。

---

## 步骤 2: 安全加固

MariaDB 自带一个安全脚本，可以帮助我们移除不安全的默认设置，并为 `root` 账户设置密码。

```bash
sudo mysql_secure_installation
```
脚本会引导您完成以下操作，建议按照以下方式进行选择：
1.  **Enter current password for root (enter for none):** 直接按回车键，因为初始时没有密码。
2.  **Switch to unix_socket authentication? [Y/n]** 输入 `Y` 并回车。这是一种更安全的认证方式，它允许您使用系统的 `sudo` 权限直接登录 MariaDB 的 `root` 用户。
3.  **Change the root password? [Y/n]** 输入 `n` 并回车。因为我们已经启用了 `unix_socket` 认证，`root` 账户无法通过密码从远程登录，所以不需要单独设置密码。
4.  **Remove anonymous users? [Y/n]** 输入 `Y` 并回车，移除匿名用户。
5.  **Disallow root login remotely? [Y/n]** 输入 `Y` 并回车，禁止 `root` 用户远程登录。
6.  **Remove test database and access to it? [Y/n]** 输入 `Y` 并回车，移除测试数据库。
7.  **Reload privilege tables now? [Y/n]** 输入 `Y` 并回车，让所有改动立即生效。

---

## 步骤 3: 管理数据库和用户

完成安全设置后，我们来学习如何创建一个新的数据库和用户，这是绝大多数应用的必要步骤。

### 3.1 登录 MariaDB 控制台

由于我们开启了 `unix_socket` 认证，您可以使用 `sudo` 直接登录。

```bash
sudo mariadb
```
或者使用 `sudo mysql`，两者是等效的。成功后，您将看到 `MariaDB [(none)]>` 提示符。

### 3.2 创建数据库

将 `myapp_db` 替换为您的数据库名。

```sql
CREATE DATABASE myapp_db;
```
::: tip
在 SQL 命令中，分号 (`;`) 表示命令的结束，不要忘记它。
:::

### 3.3 创建新用户并授权

为了安全，我们不应该让应用程序直接使用 `root` 账户。让我们创建一个专用的用户。将 `myapp_user` 和 `your_strong_password` 替换为实际值。

```sql
CREATE USER 'myapp_user'@'localhost' IDENTIFIED BY 'your_strong_password';
```
这条命令创建了一个只允许从本机 (`localhost`) 登录的用户。

接下来，授予这个用户对 `myapp_db` 数据库的所有权限。

```sql
GRANT ALL PRIVILEGES ON myapp_db.* TO 'myapp_user'@'localhost';
```
- `myapp_db.*` 表示 `myapp_db` 数据库中的所有表。

### 3.4 刷新权限并退出

让权限变更立即生效，然后退出控制台。
```sql
FLUSH PRIVILEGES;
EXIT;
```

---

## 步骤 4: 测试新用户

现在，您可以尝试使用新创建的用户和密码登录了。

```bash
mysql -u myapp_user -p
```
系统会提示您输入密码。输入后，如果成功进入 MariaDB 控制台，并且提示符变为 `MariaDB [myapp_db]>`，则说明您的用户已成功创建并被授予了默认数据库的访问权限。

## (可选) 允许远程访问

如果您需要从其他服务器连接到这个数据库，您需要进行两项配置：
1.  **修改 MariaDB 配置**:
    编辑绑定地址。打开 `/etc/mysql/mariadb.conf.d/50-server.cnf` 文件，找到 `bind-address` 这一行，将其注释掉，或者改为 `0.0.0.0`。
    ```ini
    #bind-address = 127.0.0.1
    # 或者
    bind-address = 0.0.0.0
    ```
    然后重启 MariaDB: `sudo systemctl restart mariadb`。

2.  **创建可远程访问的用户**:
    在创建用户时，将 `'localhost'` 替换为允许访问的来源 IP 地址，或者使用 `%` 符号允许任何地址。
    ```sql
    CREATE USER 'remote_user'@'%' IDENTIFIED BY 'another_password';
    GRANT ALL PRIVILEGES ON myapp_db.* TO 'remote_user'@'%';
    FLUSH PRIVILEGES;
    ```
::: danger 注意
允许来自任何地址 (`%`) 的远程访问存在安全风险。在生产环境中，应尽可能指定具体的 IP 地址。同时，请确保您的防火墙 (如 UFW) 已配置为只允许受信任的 IP 访问 MariaDB 的端口（默认为 3306）。
::: 