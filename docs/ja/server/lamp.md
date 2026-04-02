---
title: LAMP および LEMP Webサーバー環境のデプロイ
description: Debian 上で、古典的な LAMP (Linux, Apache, MySQL, PHP) および LEMP (Linux, Nginx, MySQL, PHP) Webサーバー環境を迅速にデプロイ・設定する方法を学びます。
---

# LAMP および LEMP デプロイガイド

このガイドでは、Debian システム上で LAMP および LEMP Webサーバーをインストール・設定する方法を詳しく説明します。これら2つの技術スタックは、長年にわたって実証された非常に成熟したWebホスティングソリューションです。

## LAMP と LEMP とは？

- **LAMP** は、**L**inux / **A**pache / **M**ySQL / **P**HP を指します。
- **LEMP** は、**L**inux / **E**ngine-X (Nginx) / **M**ySQL / **P**HP を指します。

唯一の違いは、使用するWebサーバーソフトウェアです：Apache は機能が豊富で設定のエコシステムが成熟しており、Nginx は軽量で高性能、特に高同時接続と静的ファイルの処理に優れています。

## 前提条件

- Debian 13 (Trixie) がインストールされたサーバー。
- `sudo` 権限を持つ非 root ユーザー。

---

## LAMP (Apache) のデプロイ

### ステップ 1: パッケージリストの更新

まず、システムのパッケージリストが最新であることを確認します。

```bash
sudo apt update
sudo apt upgrade
```

### ステップ 2: Apache のインストール

Apache Webサーバーをインストールします。

```bash
sudo apt install apache2
```

インストールが完了したら、ブラウザでサーバーのIPアドレス (`http://あなたのサーバーIP`) にアクセスすることで、Apache が実行されているか確認できます。Apache のデフォルトのウェルカムページが表示されれば、インストールは成功です。

### ステップ 3: MariaDB (MySQL) のインストール

MariaDB は MySQL のコミュニティ主導で完全互換のフォークであり、Debian におけるデフォルトの実装です。

```bash
sudo apt install mariadb-server
```

インストール後、安全でないデフォルト設定を削除するためにセキュリティスクリプトを実行することをお勧めします。

```bash
sudo mysql_secure_installation
```
プロンプトに従って操作し、root パスワードを設定し、一連のセキュリティに関する質問に答えてください。

### ステップ 4: PHP のインストール

PHP および Apache や MySQL と通信するために必要なモジュールをインストールします。

```bash
sudo apt install php libapache2-mod-php php-mysql
```

- `php`: PHP コアパッケージ。
- `libapache2-mod-php`: Apache が PHP ファイルを処理できるようにします。
- `php-mysql`: PHP が MySQL/MariaDB データベースに接続できるようにします。

### ステップ 5: PHP のテスト

Apache が PHP ファイルを正しく処理できることを確認するために、簡単な PHP ファイルを作成します。

```bash
sudo nano /var/www/html/info.php
```

エディタに以下の内容を貼り付けます：

```php
<?php
phpinfo();
?>
```

ファイルを保存して閉じます。次に、ブラウザで `http://あなたのサーバーIP/info.php` にアクセスします。詳細な PHP 情報を含むページが表示されたら、LAMP スタックのデプロイは成功です！

**重要**: セキュリティ上の理由から、テストが完了したらこのファイルを必ず削除してください。
```bash
sudo rm /var/www/html/info.php
```

---

## LEMP (Nginx) のデプロイ

Nginx を好む場合は、以下の手順に従ってください。

### ステップ 1: Nginx のインストール

```bash
sudo apt install nginx
```
同様に、サーバーIP (`http://あなたのサーバーIP`) にアクセスし、Nginx のウェルカムページが表示されれば、インストールは成功です。

### ステップ 2: MariaDB のインストール

このステップは LAMP インストールと全く同じです。すでにインストール済みの場合は繰り返す必要はありません。

```bash
sudo apt install mariadb-server
sudo mysql_secure_installation
```

### ステップ 3: PHP-FPM のインストール

Nginx には Apache のような組み込みの PHP 処理モジュールがないため、PHP リクエストを処理する外部プログラムが必要です。それが `PHP-FPM` (FastCGI Process Manager) です。

```bash
sudo apt install php-fpm php-mysql
```

### ステップ 4: Nginx の設定

これは LEMP デプロイで最も重要なステップです。Nginx のサーバーブロック設定ファイルを編集し、`.php` ファイルのリクエストをどのように PHP-FPM に渡すかを指示する必要があります。

デフォルトのサーバーブロック設定ファイルを開きます：
```bash
sudo nano /etc/nginx/sites-available/default
```

以下のように見えるようにファイルを修正する必要があります。`index.php` と `location ~ \.php$` ブロックを追加することに注意してください。

```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    root /var/www/html;
    index index.html index.htm index.php; # index.php を追加

    server_name _;

    location / {
        try_files $uri $uri/ =404;
    }

    # これはコメントを解除または追加する必要がある重要な部分です
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        # 注意: パスは PHP バージョンによって異なる場合があります
        fastcgi_pass unix:/run/php/php8.3-fpm.sock;
    }
}
```

ファイルを保存して閉じます。次に、Nginx 設定に構文エラーがないかテストします。

```bash
sudo nginx -t
```
`syntax is ok` と `test is successful` と表示されれば、変更を適用するために Nginx を安全に再起動できます。

```bash
sudo systemctl restart nginx
```

### ステップ 5: PHP のテスト

このステップは LAMP のテストと同様で、`info.php` ファイルを作成します。

```bash
sudo nano /var/www/html/info.php
```

```php
<?php
phpinfo();
?>
```

次に `http://あなたのサーバーIP/info.php` にアクセスします。PHP 情報ページが表示されれば、LEMP スタックのデプロイは成功です！

**同様に、テスト後はこのファイルを必ず削除してください。**
```bash
sudo rm /var/www/html/info.php
```

## 次のステップ

これで、機能完全な Web サーバー環境が整いました。次に、以下のことを検討できます：
- あなたのウェブサイト用に仮想ホスト (Virtual Hosts) を設定する。
- Let's Encrypt を使用してウェブサイトに HTTPS を有効にする。
- あなた自身のアプリケーションをデプロイするか、WordPress などの CMS をインストールする。