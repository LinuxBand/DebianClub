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

---

## Database Services Guide: Configuring PostgreSQL

**PostgreSQL** is a powerful, open-source object-relational database system known for its high reliability, robust feature set, and performance. It is often used for large-scale applications that require complex queries and data integrity.

### Why Choose PostgreSQL?

- **High SQL Standards Compliance**: PostgreSQL has the most complete implementation of the SQL standard among all databases.
- **Highly Extensible**: Supports custom functions, data types, operators, and even index methods.
- **Advanced Features**: Supports advanced data types and functionalities like JSONB, geospatial data (PostGIS), and full-text search.
- **Concurrency Control**: Has a very mature Multi-Version Concurrency Control (MVCC), where read and write operations rarely block each other.

### Step 1: Install PostgreSQL

PostgreSQL is available in the Debian repositories.

```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
```
The `postgresql-contrib` package provides some additional tools and functionality.

After installation, the service will start automatically. You can check its status:
```bash
sudo systemctl status postgresql
```

### Step 2: Login and Role Management

PostgreSQL uses the concept of "roles" to handle authentication and authorization. By default, it creates a database superuser named `postgres` and uses the `peer` authentication method. This means if you can log in as the `postgres` system user, you can access the database as the `postgres` database role.

To log in to the `psql` console, you need to switch to the `postgres` system user:
```bash
sudo -i -u postgres
psql
```
Upon success, you will see the `postgres=#` prompt. To exit the `psql` console, type `\q`. To return to your own system user, type `exit`.

### Step 3: Create a New Role and Database

Similar to MariaDB, the best practice is to create dedicated roles and databases for each application.

1.  **Create a New Role**:
    Inside the `psql` console, create a new role. We will set a password for it to allow password-based connections.
    ```sql
    CREATE ROLE myapp_user WITH LOGIN PASSWORD 'your_strong_password';
    ```

2.  **Create a New Database**:
    Create a database owned by the new role.
    ```sql
    CREATE DATABASE myapp_db OWNER myapp_user;
    ```

3.  **Connection Test (Optional)**:
    You can try to connect to the new database with the new user. First, exit with `\q`, then reconnect with the following command:
    ```bash
    psql -d myapp_db -U myapp_user
    ```
    This might fail due to the default `pg_hba.conf` configuration. We will fix this in the next step.

### Step 4: Configure Client Authentication

Edit the `pg_hba.conf` file to allow users to log in with a password.
```bash
sudo nano /etc/postgresql/$(pg_config --version | cut -d' ' -f2 | cut -d'.' -f1)/main/pg_hba.conf
```
At the bottom of the file, find a line similar to this:
```
# "local" is for Unix domain socket connections only
local   all             all                                     peer
```
Modify it or add a new line below it, replacing `peer` with `md5` or `scram-sha-256` (more secure and recommended):
```
# "local" is for Unix domain socket connections only
local   all             all                                     scram-sha-256
```
This allows local users to connect to all databases by providing an encrypted password.

After modifying, restart the PostgreSQL service:
```bash
sudo systemctl restart postgresql
```
Now, you should be able to log in successfully using `psql -d myapp_db -U myapp_user -W` (`-W` forces a password prompt).

---

## Database Services Guide: Configuring Redis

**Redis** is an open-source, in-memory data structure store, used as a database, cache, and message broker. It is renowned for its extremely high performance.

### Why Choose Redis?

- **Extremely Fast**: Data is stored in memory, making read and write operations very fast, suitable for high-concurrency scenarios.
- **Rich Data Types**: Supports various data structures like strings, hashes, lists, sets, and sorted sets.
- **Atomic Operations**: All operations are atomic, ensuring data consistency.
- **Versatile**: Can be used for caching, session management, leaderboards, real-time analytics, and more.

### Step 1: Install Redis

Install the Redis server from the Debian repositories.

```bash
sudo apt-get update
sudo apt-get install redis-server
```

Check the service status:
```bash
sudo systemctl status redis-server
```

### Step 2: Configure Redis

The main configuration file for Redis is `/etc/redis/redis.conf`. Some common configuration items:

1.  **Set a Password (Recommended)**:
    For security, you should set a password for Redis. Open the configuration file:
    ```bash
    sudo nano /etc/redis/redis.conf
    ```
    Find the line `# requirepass foobared`, uncomment it, and change it to your own strong password.
    ```
    requirepass your_strong_password
    ```

2.  **Memory Management**:
    You can set the maximum memory Redis can use. Find `# maxmemory <bytes>` and change it to your desired value, for example:
    ```
    maxmemory 256mb
    ```
    And set the eviction policy for when the memory is full, for example, `allkeys-lru` (remove the least recently used keys):
    ```
    maxmemory-policy allkeys-lru
    ```

After modifying the configuration, restart the Redis service:
```bash
sudo systemctl restart redis-server
```

### Step 3: Connect and Test with redis-cli

`redis-cli` is the command-line interface for Redis.

```bash
redis-cli
```
If you have set a password, you need to authenticate first:
```
AUTH your_strong_password
```
Or provide the password directly when connecting:
```bash
redis-cli -a your_strong_password
```

**Test Commands**:
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

## Database Services Guide: Configuring MongoDB

**MongoDB** is a leading NoSQL database that uses JSON-like documents (BSON) to store data. It is designed for scalability, high performance, and high availability.

### Why Choose MongoDB?

- **Flexible Document Model**: No predefined schema is required, making it easy to store complex hierarchical data.
- **High Scalability**: Can distribute data across multiple servers through sharding, supporting massive datasets.
- **Rich Query Language**: Supports powerful ad-hoc queries, indexing, and aggregation.
- **Developer-Oriented**: Its document model maps directly to objects in application code, making it very intuitive.

### Step 1: Install MongoDB

The MongoDB version in the official Debian repositories might be outdated. To get the latest version, we usually need to add its official software repository.

1.  **Import the GPG Key**:
    ```bash
    sudo apt-get install gnupg
    curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
       sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
       --dearmor
    ```

2.  **Add the MongoDB Repository**:
    ```bash
    echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/debian bookworm/mongodb-org/7.0 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
    ```
    > **Note**: Adjust this command based on your Debian version (e.g., `bookworm`, `bullseye`) and the required MongoDB version (e.g., `7.0`, `6.0`).

3.  **Install MongoDB**:
    ```bash
    sudo apt-get update
    sudo apt-get install -y mongodb-org
    ```

### Step 2: Start and Manage MongoDB

After installation, start the service and enable it to start on boot.

```bash
sudo systemctl start mongod
sudo systemctl enable mongod
```

Check its status:
```bash
sudo systemctl status mongod
```

### Step 3: Connect and Basic Operations

Connect to MongoDB using `mongosh`.

```bash
mongosh
```
This will successfully take you into the MongoDB Shell.

**Basic Operations**:

-   **Show all databases**: `show dbs`
-   **Switch or create a database**: `use myapp_db` (if `myapp_db` doesn't exist, it will be created upon the first data insertion)
-   **Insert a document**: `db.mycollection.insertOne({ name: "test", value: 123 })`
-   **Query documents**: `db.mycollection.find()`

### Step 4: Enable Access Control (Security)

By default, MongoDB is installed without user authentication enabled, meaning any local user can connect and have full permissions. This is very insecure in a production environment.

1.  **Create an Administrator User**:
    First, connect to `mongosh`, switch to the `admin` database, and then create an administrator user.
    ```javascript
    use admin
    db.createUser({
      user: "myAdmin",
      pwd: passwordPrompt(), // Securely prompts for a password
      roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
    })
    ```

2.  **Enable Authentication**:
    Edit the MongoDB configuration file `/etc/mongod.conf`:
    ```bash
    sudo nano /etc/mongod.conf
    ```
    Find the `security` section, uncomment it, and enable it:
    ```yaml
    security:
      authorization: "enabled"
    ```

3.  **Restart MongoDB**:
    ```bash
    sudo systemctl restart mongod
    ```

Now, if you run `mongosh` directly again, you will not be able to perform most operations. You need to log in as the administrator:
```bash
mongosh -u myAdmin -p --authenticationDatabase admin
```

---

## Database Services Guide: Configuring MySQL

**MySQL** is the world's most popular open-source relational database. Although Debian has defaulted to MariaDB, MySQL remains the top choice for many applications and developers.

### Why Choose MySQL?

- **Extensive Community and Commercial Support**: Has a huge user base and strong commercial support from Oracle.
- **Mature Ecosystem**: Very well-integrated with various programming languages, frameworks, and tools.
- **Proven Reliability**: Widely used and validated in various large-scale, high-concurrency applications.

### Step 1: Install MySQL

Similar to MongoDB, the version in the Debian repositories may not be the latest. Installing from the official MySQL repository is often a better choice.

1.  **Download the Official APT Repository Configuration Package**:
    Go to the [MySQL APT Repository](https://dev.mysql.com/downloads/repo/apt/) page and download the `.deb` package for Debian.
    ```bash
    # Example for Debian 12
    wget https://dev.mysql.com/get/mysql-apt-config_0.8.29-1_all.deb
    ```

2.  **Install the Configuration Package**:
    ```bash
    sudo dpkg -i mysql-apt-config_0.8.29-1_all.deb
    ```
    During the installation, a configuration interface will appear, allowing you to choose the MySQL version you want to install. Usually, the default options are sufficient.

3.  **Install the MySQL Server**:
    ```bash
    sudo apt-get update
    sudo apt-get install mysql-server
    ```
    During the installation, you may be prompted to set a password for the `root` user. Please set a strong password and remember it.

### Step 2: Secure the Installation

MySQL also provides a security script, very similar to MariaDB's.

```bash
sudo mysql_secure_installation
```
Follow the prompts to complete the operations, including setting a password policy, removing anonymous users, disabling remote root login, and removing the test database.

### Step 3: Manage Users and Databases

Log in to MySQL:
```bash
mysql -u root -p
```
Enter the `root` password you set during installation.

The commands to create a new database and user are **exactly the same** as for MariaDB:

```sql
-- Create database
CREATE DATABASE myapp_db;

-- Create user and grant permissions
CREATE USER 'myapp_user'@'localhost' IDENTIFIED BY 'your_strong_password';
GRANT ALL PRIVILEGES ON myapp_db.* TO 'myapp_user'@'localhost';

-- Flush privileges and exit
FLUSH PRIVILEGES;
EXIT;
``` 