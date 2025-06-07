---
title: 开发环境搭建
description: Debian 13 开发环境搭建指南，包括各种编程语言、IDE、版本控制和开发工具
---

# Debian 13 开发环境搭建

本教程详细介绍如何在 Debian 13 中搭建完整的开发环境，包括各种编程语言、IDE、版本控制工具和开发框架。

## 🐍 Python 开发环境

### Python 基础安装

```bash
# Python 3 已预装在 Debian 13 中
python3 --version

# 安装 pip 包管理器
sudo apt install python3-pip

# 安装开发工具
sudo apt install python3-dev python3-venv

# 创建虚拟环境
python3 -m venv myproject
source myproject/bin/activate

# 升级 pip
pip install --upgrade pip
```

### Python 开发工具

```bash
# 安装常用开发包
pip install \
    requests \
    numpy \
    pandas \
    matplotlib \
    jupyter \
    black \
    flake8 \
    pytest

# 安装 Django（Web 开发）
pip install django

# 安装 Flask（轻量级 Web 框架）
pip install flask

# 安装 FastAPI（现代 API 框架）
pip install fastapi uvicorn
```

### Python 项目管理

```bash
# 使用 pipenv
sudo apt install pipenv
pipenv install requests
pipenv shell

# 使用 poetry
curl -sSL https://install.python-poetry.org | python3 -
poetry new myproject
poetry add requests
```

## ☕ Java 开发环境

### Java 安装

```bash
# 安装 OpenJDK
sudo apt install default-jdk

# 或安装特定版本
sudo apt install openjdk-11-jdk
sudo apt install openjdk-17-jdk

# 查看 Java 版本
java -version
javac -version

# 管理多个 Java 版本
sudo update-alternatives --config java
```

### Maven 和 Gradle

```bash
# 安装 Maven
sudo apt install maven
mvn -version

# 创建 Maven 项目
mvn archetype:generate -DgroupId=com.example -DartifactId=myapp

# 安装 Gradle
sudo apt install gradle
gradle -version

# 创建 Gradle 项目
gradle init --type java-application
```

## 🌐 Node.js 开发环境

### Node.js 安装

```bash
# 使用 NodeSource 仓库安装最新版本
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install nodejs

# 验证安装
node --version
npm --version

# 安装 Yarn
npm install -g yarn
```

### Node.js 开发工具

```bash
# 全局工具
npm install -g \
    @angular/cli \
    @vue/cli \
    create-react-app \
    typescript \
    ts-node \
    nodemon \
    pm2

# 创建项目
npx create-react-app myapp
npx create-vue@latest myapp
ng new myapp
```

## 🦀 Rust 开发环境

### Rust 安装

```bash
# 使用 rustup 安装 Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source ~/.cargo/env

# 验证安装
rustc --version
cargo --version

# 创建新项目
cargo new hello_world
cd hello_world
cargo run
```

### Rust 开发工具

```bash
# 安装额外组件
rustup component add clippy rustfmt

# 代码检查
cargo clippy

# 代码格式化
cargo fmt

# 安装 cargo-edit
cargo install cargo-edit

# 添加依赖
cargo add serde
```

## 🐹 Go 开发环境

### Go 安装

```bash
# 安装 Go
sudo apt install golang-go

# 或下载最新版本
wget https://go.dev/dl/go1.21.0.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.21.0.linux-amd64.tar.gz

# 设置环境变量
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
source ~/.bashrc

# 验证安装
go version
```

### Go 开发工具

```bash
# 初始化模块
go mod init myproject

# 安装依赖
go get github.com/gin-gonic/gin

# 运行项目
go run main.go

# 构建项目
go build
```

## 💎 Ruby 开发环境

### Ruby 安装

```bash
# 安装 Ruby
sudo apt install ruby-full

# 安装 rbenv（Ruby 版本管理）
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc

# 安装 ruby-build
git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build

# 安装特定 Ruby 版本
rbenv install 3.2.0
rbenv global 3.2.0
```

### Ruby 开发工具

```bash
# 安装 Bundler
gem install bundler

# 安装 Rails
gem install rails

# 创建 Rails 应用
rails new myapp
cd myapp
bundle install
rails server
```

## 🗄️ 数据库环境

### PostgreSQL

```bash
# 安装 PostgreSQL
sudo apt install postgresql postgresql-contrib

# 启动服务
sudo systemctl start postgresql
sudo systemctl enable postgresql

# 创建用户和数据库
sudo -u postgres createuser --interactive
sudo -u postgres createdb mydatabase

# 连接数据库
sudo -u postgres psql
```

### MySQL/MariaDB

```bash
# 安装 MariaDB
sudo apt install mariadb-server

# 安全配置
sudo mysql_secure_installation

# 连接数据库
sudo mysql -u root -p

# 创建数据库和用户
CREATE DATABASE mydatabase;
CREATE USER 'myuser'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON mydatabase.* TO 'myuser'@'localhost';
```

### MongoDB

```bash
# 添加 MongoDB 仓库
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/debian bookworm/mongodb-org/7.0 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# 安装 MongoDB
sudo apt update
sudo apt install mongodb-org

# 启动服务
sudo systemctl start mongod
sudo systemctl enable mongod
```

### Redis

```bash
# 安装 Redis
sudo apt install redis-server

# 启动服务
sudo systemctl start redis-server
sudo systemctl enable redis-server

# 测试连接
redis-cli ping
```

## 🛠️ 开发工具和 IDE

### Visual Studio Code

```bash
# 添加 Microsoft 仓库
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
sudo install -o root -g root -m 644 packages.microsoft.gpg /etc/apt/trusted.gpg.d/

# 添加源
sudo sh -c 'echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/trusted.gpg.d/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list'

# 安装 VS Code
sudo apt update
sudo apt install code
```

### IntelliJ IDEA

```bash
# 下载 IntelliJ IDEA
wget https://download.jetbrains.com/idea/ideaIC-2023.2.2.tar.gz

# 解压安装
sudo tar -xzf ideaIC-2023.2.2.tar.gz -C /opt/

# 创建桌面快捷方式
sudo /opt/idea-IC-232.9559.62/bin/idea.sh
```

### 其他编辑器

```bash
# Vim 配置
sudo apt install vim-gtk3

# 安装 vim-plug
curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim

# Neovim
sudo apt install neovim

# Emacs
sudo apt install emacs
```

## 📊 版本控制

### Git 配置

```bash
# Git 已预装，配置用户信息
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 配置编辑器
git config --global core.editor nano

# 查看配置
git config --list

# 生成 SSH 密钥
ssh-keygen -t ed25519 -C "your.email@example.com"
```

### Git 工具

```bash
# 安装 Git 工具
sudo apt install git-extras gitk git-cola

# 安装 GitKraken（图形界面）
wget https://release.gitkraken.com/linux/gitkraken-amd64.deb
sudo dpkg -i gitkraken-amd64.deb
```

## 🐳 容器化开发

### Docker

```bash
# 安装 Docker
sudo apt update
sudo apt install apt-transport-https ca-certificates curl gnupg lsb-release

# 添加 Docker 官方 GPG 密钥
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# 添加 Docker 仓库
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 安装 Docker
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io

# 将用户添加到 docker 组
sudo usermod -aG docker $USER

# 安装 Docker Compose
sudo apt install docker-compose-plugin
```

### Podman

```bash
# 安装 Podman
sudo apt install podman

# 基本使用
podman run hello-world
podman pull nginx
podman run -d -p 8080:80 nginx
```

## 🧪 测试环境

### 自动化测试工具

```bash
# Python 测试
pip install pytest pytest-cov

# JavaScript 测试
npm install -g jest

# Java 测试（已包含在 Maven/Gradle 中）
# JUnit, TestNG

# 性能测试
sudo apt install apache2-utils  # ab 命令
npm install -g artillery
```

### CI/CD 工具

```bash
# Jenkins 本地安装
wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt update
sudo apt install jenkins

# GitLab Runner
curl -L "https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.deb.sh" | sudo bash
sudo apt install gitlab-runner
```

## 🔧 开发环境配置

### 环境变量管理

```bash
# 创建 .env 文件
nano ~/.env

# 添加到 .bashrc
echo 'source ~/.env' >> ~/.bashrc

# 使用 direnv（项目级环境变量）
sudo apt install direnv
echo 'eval "$(direnv hook bash)"' >> ~/.bashrc
```

### 开发服务器配置

```bash
# 安装 Nginx
sudo apt install nginx

# 基本配置
sudo nano /etc/nginx/sites-available/development

# Apache 替代方案
sudo apt install apache2
sudo a2enmod rewrite
```

### SSL 证书（开发环境）

```bash
# 安装 mkcert
wget https://github.com/FiloSottile/mkcert/releases/download/v1.4.4/mkcert-v1.4.4-linux-amd64
chmod +x mkcert-v1.4.4-linux-amd64
sudo mv mkcert-v1.4.4-linux-amd64 /usr/local/bin/mkcert

# 创建本地 CA
mkcert -install

# 生成证书
mkcert localhost 127.0.0.1
```

## 📦 包管理器

### 系统级包管理

```bash
# APT（系统包）
sudo apt install build-essential

# Snap（应用包）
sudo apt install snapd
snap install code --classic

# Flatpak（应用包）
sudo apt install flatpak
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
```

### 语言特定包管理

```bash
# Python: pip, pipenv, poetry
# Node.js: npm, yarn
# Ruby: gem, bundler
# Rust: cargo
# Go: go get
# Java: maven, gradle
```

## 🚀 性能优化

### 开发环境优化

```bash
# 增加文件监控限制
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

# SSD 优化
sudo nano /etc/fstab
# 添加 noatime 选项

# 内存优化
sudo sysctl vm.swappiness=10
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf
```

### 开发工具配置

```bash
# VS Code 性能优化
# 在设置中禁用不需要的扩展
# 调整 files.watcherExclude

# Git 性能优化
git config --global core.preloadindex true
git config --global core.fscache true
git config --global gc.auto 256
```

## 📝 开发环境检查清单

完成开发环境搭建后，请检查：

- [ ] **编程语言环境已安装**
- [ ] **IDE/编辑器已配置**
- [ ] **版本控制系统已设置**
- [ ] **数据库环境已安装**
- [ ] **包管理器工作正常**
- [ ] **开发服务器已配置**
- [ ] **测试工具已安装**
- [ ] **容器化环境已准备**

## 下一步

开发环境搭建完成后，您可以继续：

1. [IDE 配置详解](/applications/ide) - 深度定制开发工具
2. [虚拟化环境](/applications/virtualization) - 设置开发虚拟机
3. [多媒体开发](/applications/multimedia) - 图形和音视频开发

---

**开发环境准备好了吗？** [继续配置 IDE →](/applications/ide) 