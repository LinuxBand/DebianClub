---
title: 用户和权限管理
description: Debian 13 用户账户创建、权限配置和安全管理完整指南
---

# Debian 13 用户和权限管理

本教程将详细介绍 Debian 13 系统中的用户管理、权限配置和安全设置，帮助您建立安全可靠的多用户环境。

## 👤 用户系统基础

### Linux 用户类型

#### 超级用户 (root)
```bash
# Root 用户特征
UID: 0
权限: 无限制系统访问权限
用途: 系统管理和维护
风险: 误操作可能损坏系统
```

#### 普通用户
```bash
# 普通用户特征
UID: 1000-65534
权限: 受限制的系统访问
用途: 日常使用和应用程序运行
安全: 相对安全，损坏有限
```

#### 系统用户
```bash
# 系统用户特征
UID: 1-999
权限: 特定服务相关
用途: 运行系统服务和守护进程
管理: 通常由系统自动管理
```

### 用户信息存储

#### 主要配置文件

| 文件 | 内容 | 作用 |
|------|------|------|
| `/etc/passwd` | 用户基本信息 | 用户名、UID、主目录 |
| `/etc/shadow` | 密码和过期信息 | 加密密码、密码策略 |
| `/etc/group` | 用户组信息 | 组名、GID、成员列表 |
| `/etc/gshadow` | 组密码信息 | 组管理员、组密码 |

#### 查看用户信息

```bash
# 查看当前用户
whoami
id

# 查看所有用户
cat /etc/passwd | cut -d: -f1

# 查看用户详细信息
finger username
getent passwd username

# 查看当前登录用户
who
w
```

## 👥 用户管理操作

### 创建用户

#### 使用 adduser（推荐）

```bash
# 交互式创建用户
sudo adduser newuser

# 创建过程：
# 1. 设置用户名和密码
# 2. 设置用户信息（全名、电话等）
# 3. 创建主目录
# 4. 复制默认配置文件
```

#### 使用 useradd（高级）

```bash
# 基本创建
sudo useradd -m -s /bin/bash newuser

# 详细参数创建
sudo useradd -m -c "用户全名" -s /bin/bash -G sudo newuser

# 参数说明：
# -m: 创建主目录
# -c: 设置用户全名（注释）
# -s: 设置默认 shell
# -G: 添加到附加组
# -d: 指定主目录路径
# -u: 指定 UID
```

#### 创建系统用户

```bash
# 创建系统服务用户
sudo useradd -r -s /bin/false serviceuser

# 参数说明：
# -r: 创建系统用户（UID < 1000）
# -s /bin/false: 禁止登录
```

### 修改用户

#### 修改用户信息

```bash
# 修改用户全名
sudo usermod -c "新的全名" username

# 修改用户主目录
sudo usermod -d /new/home/path -m username

# 修改用户 shell
sudo usermod -s /bin/zsh username

# 修改用户名
sudo usermod -l newname oldname
```

#### 用户组管理

```bash
# 添加用户到组
sudo usermod -aG groupname username

# 设置用户主组
sudo usermod -g newgroup username

# 从组中移除用户
sudo gpasswd -d username groupname

# 查看用户所属组
groups username
```

#### 锁定和解锁用户

```bash
# 锁定用户账户
sudo usermod -L username
# 或
sudo passwd -l username

# 解锁用户账户
sudo usermod -U username
# 或
sudo passwd -u username

# 设置账户过期时间
sudo usermod -e 2024-12-31 username
```

### 删除用户

#### 安全删除用户

```bash
# 删除用户但保留主目录
sudo userdel username

# 删除用户和主目录
sudo userdel -r username

# 强制删除（即使用户已登录）
sudo userdel -f username
```

#### 删除前检查

```bash
# 检查用户进程
ps -u username

# 检查用户文件
find / -user username 2>/dev/null

# 杀死用户进程
sudo pkill -u username
```

## 🔐 密码管理

### 设置密码

#### 设置用户密码

```bash
# 设置指定用户密码
sudo passwd username

# 设置当前用户密码
passwd

# 生成随机密码
openssl rand -base64 12

# 使用 pwgen 生成密码
sudo apt install pwgen
pwgen -s 16 1  # 生成16位安全密码
```

#### 密码策略配置

```bash
# 安装密码质量检查库
sudo apt install libpam-pwquality

# 编辑密码策略
sudo nano /etc/security/pwquality.conf

# 常用设置：
minlen = 12        # 最小长度
minclass = 3       # 最少字符类型
maxrepeat = 2      # 最大重复字符
dcredit = -1       # 至少一个数字
ucredit = -1       # 至少一个大写字母
lcredit = -1       # 至少一个小写字母
ocredit = -1       # 至少一个特殊字符
```

#### 密码有效期管理

```bash
# 设置密码最大有效期（天）
sudo chage -M 90 username

# 设置密码最小有效期
sudo chage -m 7 username

# 设置密码过期前警告期
sudo chage -W 7 username

# 查看密码状态
sudo chage -l username

# 强制用户下次登录时修改密码
sudo chage -d 0 username
```

### 密码安全

#### 检查弱密码

```bash
# 安装密码检查工具
sudo apt install john-the-ripper

# 检查系统密码强度
sudo john /etc/shadow

# 使用 hydra 检测弱密码
sudo apt install hydra
```

#### 实施强密码策略

```bash
# 编辑 PAM 配置
sudo nano /etc/pam.d/common-password

# 添加密码复杂度要求
password requisite pam_pwquality.so retry=3 minlen=12 difok=3 ucredit=-1 lcredit=-1 dcredit=-1 ocredit=-1
```

## 👥 用户组管理

### 创建和管理组

#### 创建用户组

```bash
# 创建新组
sudo groupadd groupname

# 创建系统组
sudo groupadd -r systemgroup

# 指定 GID 创建组
sudo groupadd -g 1500 customgroup
```

#### 修改用户组

```bash
# 修改组名
sudo groupmod -n newname oldname

# 修改组 GID
sudo groupmod -g 1600 groupname
```

#### 删除用户组

```bash
# 删除用户组
sudo groupdel groupname

# 检查组是否为主组
grep groupname /etc/passwd
```

### 重要的系统组

#### 管理员相关组

| 组名 | 权限 | 用途 |
|------|------|------|
| `sudo` | 管理员权限 | 执行 sudo 命令 |
| `wheel` | 管理员权限 | 传统管理员组 |
| `adm` | 日志查看 | 查看系统日志 |
| `admin` | 系统管理 | 系统管理任务 |

#### 系统服务组

| 组名 | 权限 | 用途 |
|------|------|------|
| `audio` | 音频设备 | 访问音频设备 |
| `video` | 视频设备 | 访问摄像头等 |
| `plugdev` | 可移动设备 | U盘、光驱等 |
| `netdev` | 网络管理 | 网络配置权限 |
| `dialout` | 串口设备 | 访问串口设备 |

#### 将用户添加到重要组

```bash
# 添加用户到 sudo 组（获得管理员权限）
sudo usermod -aG sudo username

# 添加用户到多个组
sudo usermod -aG sudo,audio,video,plugdev username

# 验证组成员
getent group sudo
```

## 🛡️ 权限管理

### 文件权限基础

#### 权限表示方法

```bash
# 符号表示法
r (read)    = 4  # 读权限
w (write)   = 2  # 写权限
x (execute) = 1  # 执行权限

# 权限组合
rwx = 7  # 读写执行
rw- = 6  # 读写
r-x = 5  # 读执行
r-- = 4  # 只读
```

#### 查看文件权限

```bash
# 详细查看权限
ls -la filename

# 查看目录权限
ls -ld directory/

# 查看权限的数字表示
stat -c "%a %n" filename
```

### 修改权限

#### 使用 chmod 命令

```bash
# 数字方式设置权限
chmod 755 filename    # rwxr-xr-x
chmod 644 filename    # rw-r--r--
chmod 600 filename    # rw-------

# 符号方式设置权限
chmod u+x filename    # 给所有者添加执行权限
chmod g-w filename    # 移除组写权限
chmod o=r filename    # 设置其他用户只读

# 递归设置目录权限
chmod -R 755 directory/
```

#### 使用 chown 命令

```bash
# 修改文件所有者
sudo chown username filename

# 修改文件所有者和组
sudo chown username:groupname filename

# 只修改组
sudo chown :groupname filename

# 递归修改目录
sudo chown -R username:groupname directory/
```

### 特殊权限

#### SUID、SGID 和 Sticky Bit

```bash
# SUID (Set User ID) - 4000
chmod 4755 filename   # 以所有者身份执行

# SGID (Set Group ID) - 2000
chmod 2755 directory  # 新文件继承目录组

# Sticky Bit - 1000
chmod 1777 directory  # 只有所有者可删除自己的文件

# 查看特殊权限
ls -la /tmp           # 查看 sticky bit
ls -la /usr/bin/sudo  # 查看 SUID
```

#### ACL 访问控制列表

```bash
# 安装 ACL 工具
sudo apt install acl

# 设置 ACL
setfacl -m u:username:rwx filename
setfacl -m g:groupname:rx filename

# 查看 ACL
getfacl filename

# 删除 ACL
setfacl -x u:username filename

# 递归设置 ACL
setfacl -R -m u:username:rwx directory/
```

## 🔒 Sudo 配置

### Sudo 基础

#### Sudo 工作原理

```bash
# Sudo 配置文件
/etc/sudoers

# 用户 sudo 权限检查
sudo -l

# 切换到其他用户
sudo -u username command

# 切换到 root 用户
sudo -i
sudo su -
```

#### 编辑 sudoers 文件

```bash
# 安全编辑 sudoers（推荐）
sudo visudo

# 基本语法：
# user  hosts=(runas) commands
username ALL=(ALL:ALL) ALL
```

### Sudo 配置示例

#### 用户权限配置

```bash
# 允许用户执行所有命令
username ALL=(ALL:ALL) ALL

# 允许用户无密码执行所有命令
username ALL=(ALL:ALL) NOPASSWD:ALL

# 允许用户执行特定命令
username ALL=(ALL) /usr/bin/systemctl, /usr/bin/apt

# 允许用户管理特定服务
username ALL=(ALL) NOPASSWD:/usr/bin/systemctl restart nginx
```

#### 组权限配置

```bash
# 允许 admin 组成员执行所有命令
%admin ALL=(ALL) ALL

# 允许 sudo 组成员无密码执行系统更新
%sudo ALL=(ALL) NOPASSWD:/usr/bin/apt update, /usr/bin/apt upgrade
```

#### 高级配置

```bash
# 设置默认编辑器
Defaults editor=/usr/bin/vim

# 设置 sudo 超时时间（分钟）
Defaults timestamp_timeout=30

# 要求 TTY
Defaults requiretty

# 记录 sudo 命令
Defaults log_host, log_year, logfile="/var/log/sudo.log"

# 设置安全路径
Defaults secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
```

## 🔐 SSH 和远程访问

### SSH 用户配置

#### 创建 SSH 用户

```bash
# 创建 SSH 专用用户
sudo adduser --disabled-password sshuser

# 设置 SSH 密钥目录
sudo mkdir -p /home/sshuser/.ssh
sudo chmod 700 /home/sshuser/.ssh
sudo chown sshuser:sshuser /home/sshuser/.ssh
```

#### 配置 SSH 密钥

```bash
# 生成 SSH 密钥对（在客户端）
ssh-keygen -t rsa -b 4096 -C "user@email.com"

# 复制公钥到服务器
ssh-copy-id username@server

# 手动添加公钥
cat ~/.ssh/id_rsa.pub | sudo tee -a /home/username/.ssh/authorized_keys
sudo chmod 600 /home/username/.ssh/authorized_keys
```

#### SSH 安全配置

```bash
# 编辑 SSH 配置
sudo nano /etc/ssh/sshd_config

# 安全设置：
Port 2222                    # 修改默认端口
PermitRootLogin no          # 禁止 root 登录
PasswordAuthentication no   # 禁用密码登录
PubkeyAuthentication yes    # 启用密钥登录
AllowUsers username        # 允许特定用户
MaxAuthTries 3             # 最大认证尝试次数

# 重启 SSH 服务
sudo systemctl restart ssh
```

## 🔍 用户监控和审计

### 登录监控

#### 查看登录记录

```bash
# 查看当前登录用户
who
w

# 查看最近登录记录
last

# 查看失败登录尝试
lastb

# 查看特定用户登录记录
last username
```

#### 实时监控

```bash
# 实时查看登录
watch -n 1 who

# 监控 SSH 连接
sudo tail -f /var/log/auth.log | grep ssh

# 监控 sudo 使用
sudo tail -f /var/log/auth.log | grep sudo
```

### 用户活动审计

#### 安装审计工具

```bash
# 安装 auditd
sudo apt install auditd audispd-plugins

# 启动审计服务
sudo systemctl enable auditd
sudo systemctl start auditd
```

#### 配置审计规则

```bash
# 编辑审计规则
sudo nano /etc/audit/rules.d/audit.rules

# 监控文件访问
-w /etc/passwd -p wa -k user_modification
-w /etc/shadow -p wa -k password_changes
-w /etc/sudoers -p wa -k sudo_changes

# 监控系统调用
-a always,exit -F arch=b64 -S execve -k process_execution

# 重新加载规则
sudo augenrules --load
```

### 安全检查脚本

#### 用户安全检查

```bash
#!/bin/bash
# 用户安全检查脚本

echo "=== 用户安全检查报告 ==="

echo "1. 检查空密码用户："
sudo awk -F: '($2 == "" ) { print $1 }' /etc/shadow

echo "2. 检查 UID 为 0 的用户："
awk -F: '($3 == 0) { print $1 }' /etc/passwd

echo "3. 检查重复 UID："
cut -d: -f3 /etc/passwd | sort | uniq -d

echo "4. 检查 sudo 权限用户："
getent group sudo | cut -d: -f4

echo "5. 检查最近登录用户："
last -n 10

echo "6. 检查失败登录尝试："
lastb -n 10 2>/dev/null || echo "无失败登录记录"
```

## 🚨 常见问题解决

### 忘记密码

#### Root 密码重置

```bash
# 方法1：单用户模式
# 1. 重启系统
# 2. 在 GRUB 菜单按 'e' 编辑
# 3. 在 linux 行末添加 init=/bin/bash
# 4. 按 Ctrl+X 启动
# 5. 重新挂载根分区
mount -o remount,rw /
# 6. 修改密码
passwd root
# 7. 重启系统
```

#### 用户密码重置

```bash
# 使用 root 权限重置用户密码
sudo passwd username

# 强制用户下次登录时修改密码
sudo chage -d 0 username
```

### 权限问题

#### 修复主目录权限

```bash
# 修复用户主目录权限
sudo chown -R username:username /home/username
sudo chmod 755 /home/username
sudo chmod 700 /home/username/.ssh
sudo chmod 600 /home/username/.ssh/authorized_keys
```

#### 修复 sudo 权限

```bash
# 修复 sudoers 文件权限
sudo chmod 440 /etc/sudoers

# 检查 sudoers 语法
sudo visudo -c
```

### 账户锁定

#### 解锁账户

```bash
# 解锁用户账户
sudo usermod -U username
sudo passwd -u username

# 清除账户过期时间
sudo chage -E -1 username

# 检查账户状态
sudo chage -l username
```

## 📋 最佳实践

### 用户管理最佳实践

1. **最小权限原则**
   - 只授予必要的权限
   - 定期审查用户权限
   - 及时删除不需要的账户

2. **强密码策略**
   - 强制复杂密码
   - 定期更换密码
   - 禁用弱密码

3. **账户监控**
   - 监控异常登录
   - 记录管理员操作
   - 定期审计用户活动

4. **安全配置**
   - 禁用不必要的账户
   - 使用 SSH 密钥认证
   - 限制 root 访问

### 权限管理最佳实践

1. **文件权限**
   - 敏感文件设置严格权限
   - 定期检查文件权限
   - 使用 ACL 进行细粒度控制

2. **Sudo 配置**
   - 避免 NOPASSWD 设置
   - 使用组而非个人授权
   - 记录所有 sudo 操作

3. **定期维护**
   - 清理过期账户
   - 审查权限配置
   - 更新安全策略

## 下一步

用户和权限管理配置完成后，您可以继续：

1. [网络配置](/administration/network) - 配置网络服务
2. [服务管理](/administration/services) - 管理系统服务
3. [安全加固](/administration/security) - 加强系统安全

---

**用户管理设置完成了吗？** [继续系统安全配置 →](/administration/security) 