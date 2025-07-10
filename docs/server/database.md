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

---

## 数据库服务指南：配置 PostgreSQL

**PostgreSQL** 是一个功能强大的开源对象-关系型数据库系统，以其高可靠性、功能健壮性和性能而闻名。它通常被用于需要复杂查询和数据完整性的大型应用。

### 为什么选择 PostgreSQL?

- **高度符合 SQL 标准**: 在所有数据库中，PostgreSQL 对 SQL 标准的实现最为完整。
- **扩展性强**: 支持自定义函数、数据类型、操作符甚至索引方法。
- **高级特性**: 支持 JSONB、地理空间数据 (PostGIS)、全文搜索等高级数据类型和功能。
- **并发控制**: 拥有非常成熟的多版本并发控制 (MVCC)，读写操作几乎不会相互阻塞。

### 步骤 1: 安装 PostgreSQL

Debian 仓库中包含了 PostgreSQL。

```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
```
`postgresql-contrib` 包提供了一些额外的工具和功能。

安装后，服务会自动启动。你可以检查其状态：
```bash
sudo systemctl status postgresql
```

### 步骤 2: 登录和角色管理

PostgreSQL 使用“角色” (role) 的概念来处理认证和授权。默认情况下，它会创建一个名为 `postgres` 的数据库超级用户，并使用 `peer` 认证方式。这意味着，如果你能以名为 `postgres` 的系统用户登录，你就能作为 `postgres` 数据库角色访问数据库。

要登录 `psql` 控制台，你需要切换到 `postgres` 系统用户：
```bash
sudo -i -u postgres
psql
```
成功后，你会看到 `postgres=#` 的提示符。要退出 `psql` 控制台，输入 `\q`。要退回到你自己的系统用户，输入 `exit`。

### 步骤 3: 创建新角色和数据库

与 MariaDB 类似，最佳实践是为每个应用创建专用的角色和数据库。

1.  **创建新角色**:
    在 `psql` 控制台内，创建一个新角色。我们将为其设置密码，以便通过密码进行连接。
    ```sql
    CREATE ROLE myapp_user WITH LOGIN PASSWORD 'your_strong_password';
    ```

2.  **创建新数据库**:
    创建一个由新角色拥有的数据库。
    ```sql
    CREATE DATABASE myapp_db OWNER myapp_user;
    ```

3.  **连接测试 (可选)**:
    你可以尝试用新用户连接到新数据库。首先用 `\q` 退出，然后用以下命令重新连接：
    ```bash
    psql -d myapp_db -U myapp_user
    ```
    由于默认的 `pg_hba.conf` 配置，这可能会失败。下一步我们将修复它。

### 步骤 4: 配置客户端认证

编辑 `pg_hba.conf` 文件来允许用户通过密码登录。
```bash
sudo nano /etc/postgresql/$(pg_config --version | cut -d' ' -f2 | cut -d'.' -f1)/main/pg_hba.conf
```
在文件底部，找到类似下面的一行：
```
# "local" is for Unix domain socket connections only
local   all             all                                     peer
```
将其修改或在下方添加一行，使用 `md5` 或 `scram-sha-256` (更安全，推荐) 代替 `peer`：
```
# "local" is for Unix domain socket connections only
local   all             all                                     scram-sha-256
```
这样就允许本地用户通过提供加密的密码来连接所有数据库。

修改后，重启 PostgreSQL 服务：
```bash
sudo systemctl restart postgresql
```
现在，你应该可以使用 `psql -d myapp_db -U myapp_user -W` ( `-W` 会强制提示输入密码) 成功登录了。

---

## 数据库服务指南：配置 Redis

**Redis** 是一个开源的、内存中的数据结构存储系统，可用作数据库、缓存和消息代理。它以其极高的性能而闻名。

### 为什么选择 Redis?

- **速度极快**: 数据存储在内存中，读写速度非常快，适用于高并发场景。
- **丰富的数据类型**: 支持字符串、哈希、列表、集合、有序集合等多种数据结构。
- **原子操作**: 所有操作都是原子的，保证了数据的一致性。
- **多功能**: 可用于缓存、会话管理、排行榜、实时分析等多种用途。

### 步骤 1: 安装 Redis

从 Debian 仓库安装 Redis 服务器。

```bash
sudo apt-get update
sudo apt-get install redis-server
```

检查服务状态：
```bash
sudo systemctl status redis-server
```

### 步骤 2: 配置 Redis

Redis 的主配置文件是 `/etc/redis/redis.conf`。一些常见的配置项：

1.  **设置密码 (推荐)**:
    为了安全，应为 Redis 设置密码。打开配置文件：
    ```bash
    sudo nano /etc/redis/redis.conf
    ```
    找到 `# requirepass foobared` 这一行，去掉注释并将其修改为你自己的强密码。
    ```
    requirepass your_strong_password
    ```

2.  **内存管理**:
    你可以设置 Redis 可以使用的最大内存。找到 `# maxmemory <bytes>`，修改为你需要的值，例如：
    ```
    maxmemory 256mb
    ```
    并设置当内存满时的淘汰策略，例如 `allkeys-lru` (移除最近最少使用的 key)：
    ```
    maxmemory-policy allkeys-lru
    ```

修改配置后，重启 Redis 服务：
```bash
sudo systemctl restart redis-server
```

### 步骤 3: 使用 redis-cli 连接和测试

`redis-cli` 是 Redis 的命令行工具。

```bash
redis-cli
```
如果你设置了密码，你需要先进行认证：
```
AUTH your_strong_password
```
或者在连接时直接提供密码：
```bash
redis-cli -a your_strong_password
```

**测试命令**:
```
> PING
PONG
> SET mykey "Hello Redis"
OK
> GET mykey
"Hello Redis"
> EXIT
```

---

## 数据库服务指南：配置 MongoDB

**MongoDB** 是一个领先的 NoSQL 数据库，它使用类似 JSON 的文档 (BSON) 来存储数据。它为可扩展性、高性能和高可用性而设计。

### 为什么选择 MongoDB?

- **灵活的文档模型**: 不需要预定义 Schema，可以轻松存储结构复杂的层级数据。
- **高可扩展性**: 可以通过分片 (Sharding) 将数据分布在多个服务器上，支持海量数据。
- **丰富的查询语言**: 支持强大的即席查询、索引和聚合。
- **面向开发人员**: 其文档模型直接映射到应用程序代码中的对象，非常直观。

### 步骤 1: 安装 MongoDB

Debian 官方仓库中的 MongoDB 版本可能较旧。为了获得最新版本，我们通常需要从 MongoDB 官方添加其软件源。

1.  **导入 GPG 密钥**:
    ```bash
    sudo apt-get install gnupg
    curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
       sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
       --dearmor
    ```

2.  **添加 MongoDB 仓库**:
    ```bash
    echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/debian bookworm/mongodb-org/7.0 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
    ```
    > **注意**: 请根据你的 Debian 版本 (如 `bookworm`, `bullseye`) 和需要的 MongoDB 版本 (如 `7.0`, `6.0`) 调整此命令。

3.  **安装 MongoDB**:
    ```bash
    sudo apt-get update
    sudo apt-get install -y mongodb-org
    ```

### 步骤 2: 启动和管理 MongoDB

安装后，启动并设置为开机自启。

```bash
sudo systemctl start mongod
sudo systemctl enable mongod
```

检查其状态：
```bash
sudo systemctl status mongod
```

### 步骤 3: 连接和基本操作

使用 `mongosh` 连接到 MongoDB。

```bash
mongosh
```
成功后会进入 MongoDB Shell。

**基本操作**:

-   **查看所有数据库**: `show dbs`
-   **切换或创建数据库**: `use myapp_db` (如果 `myapp_db` 不存在，会在第一次插入数据时被创建)
-   **插入文档**: `db.mycollection.insertOne({ name: "test", value: 123 })`
-   **查询文档**: `db.mycollection.find()`

### 步骤 4: 启用访问控制 (安全)

默认安装的 MongoDB 没有启用用户认证，任何本地用户都可以连接并拥有全部权限。在生产环境中这是非常不安全的。

1.  **创建管理员用户**:
    首先，连接到 `mongosh`，切换到 `admin` 数据库，然后创建一个管理员用户。
    ```javascript
    use admin
    db.createUser({
      user: "myAdmin",
      pwd: passwordPrompt(), // 会安全地提示你输入密码
      roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
    })
    ```

2.  **启用认证**:
    编辑 MongoDB 配置文件 `/etc/mongod.conf`：
    ```bash
    sudo nano /etc/mongod.conf
    ```
    找到 `security` 部分，去掉注释并启用它：
    ```yaml
    security:
      authorization: "enabled"
    ```

3.  **重启 MongoDB**:
    ```bash
    sudo systemctl restart mongod
    ```

现在，如果你再次直接运行 `mongosh`，你将无法执行大多数操作。你需要以管理员身份登录：
```bash
mongosh -u myAdmin -p --authenticationDatabase admin
```

---

## 数据库服务指南：配置 MySQL

**MySQL** 是世界上最流行的开源关系型数据库。虽然 Debian 默认转向了 MariaDB，但 MySQL 仍然是许多应用和开发者的首选。

### 为什么选择 MySQL?

- **广泛的社区和商业支持**: 拥有庞大的用户群体和来自 Oracle 的强大商业支持。
- **生态系统成熟**: 与各种编程语言、框架和工具的集成非常完善。
- **经过验证的可靠性**: 在各种大规模、高并发的应用中被广泛使用和验证。

### 步骤 1: 安装 MySQL

与 MongoDB 类似，Debian 仓库中的版本可能不是最新的。通常从 MySQL 官方仓库安装是更好的选择。

1.  **下载官方 APT 仓库配置包**:
    访问 [MySQL APT Repository](https://dev.mysql.com/downloads/repo/apt/) 页面，下载适用于 Debian 的 `.deb` 包。
    ```bash
    # 以 Debian 12 为例
    wget https://dev.mysql.com/get/mysql-apt-config_0.8.29-1_all.deb
    ```

2.  **安装配置包**:
    ```bash
    sudo dpkg -i mysql-apt-config_0.8.29-1_all.deb
    ```
    在安装过程中，会出现一个配置界面，让你选择要安装的 MySQL 版本。通常选择默认选项即可。

3.  **安装 MySQL 服务器**:
    ```bash
    sudo apt-get update
    sudo apt-get install mysql-server
    ```
    在安装过程中，可能会提示你为 `root` 用户设置密码。请设置一个强密码并记住它。

### 步骤 2: 安全加固

MySQL 也提供了一个安全脚本，与 MariaDB 的非常相似。

```bash
sudo mysql_secure_installation
```
根据提示完成操作，包括设置密码策略、移除匿名用户、禁止远程 root 登录和移除测试数据库。

### 步骤 3: 管理用户和数据库

登录 MySQL:
```bash
mysql -u root -p
```
输入你在安装时设置的 `root` 密码。

创建新数据库和用户的命令与 MariaDB **完全相同**:

```sql
-- 创建数据库
CREATE DATABASE myapp_db;

-- 创建用户并授权
CREATE USER 'myapp_user'@'localhost' IDENTIFIED BY 'your_strong_password';
GRANT ALL PRIVILEGES ON myapp_db.* TO 'myapp_user'@'localhost';

-- 刷新权限并退出
FLUSH PRIVILEGES;
EXIT;
``` 