---
title: セキュリティ管理
description: Debianシステムのセキュリティ管理方法を学びます。ユーザーアクセス制御、ファイアウォール設定、自動更新、侵入検知などが含まれます。
---

# セキュリティ管理

Debianシステムのセキュリティを確保することは、システム管理における中心的な課題です。このガイドでは、システムを強化し、潜在的な脅威から守るためのいくつかの重要な分野を紹介します。

## 🔐 ユーザーとアクセス制御

システムへのアクセスを制限することは、セキュリティの第一の防衛線です。

### 強力なパスワードポリシーの強制

`libpam-pwquality` モジュールを使用すると、ユーザーがより安全なパスワードを作成することを強制できます。

1.  **モジュールをインストール**:
    ```bash
    sudo apt update
    sudo apt install libpam-pwquality
    ```

2.  **ポリシーを設定**:
    `/etc/security/pwquality.conf` ファイルを編集してパスワードルールを定義します。
    ```ini
    # 設定例：
    minlen = 10                  # 最小長は 10
    dcredit = -1                 # 少なくとも 1 つの数字を含む
    ucredit = -1                 # 少なくとも 1 つの大文字を含む
    lcredit = -1                 # 少なくとも 1 つの小文字を含む
    ocredit = -1                 # 少なくとも 1 つの特殊文字を含む
    difok = 3                    # 新しいパスワードには、古いパスワードと少なくとも 3 文字異なる文字が含まれている必要がある
    ```

### SSH セキュリティ強化

サーバーへのリモートアクセスで最も一般的に使用される方法は SSH です。以下はいくつかの強化の推奨事項です：

1.  **SSH 設定ファイルを編集**:
    ```bash
    sudo nano /etc/ssh/sshd_config
    ```

2.  **推奨設定**:
    - **root ログインを無効化**: `PermitRootLogin no`
    - **パスワード認証を無効化 (キー認証を推奨)**: `PasswordAuthentication no`
    - **公開鍵認証を有効化**: `PubkeyAuthentication yes`
    - **デフォルトポートを変更 (オプション)**: `Port 2222`

3.  **SSH サービスを再起動**:
    ```bash
    sudo systemctl restart sshd
    ```

## 🔥 ファイアウォール設定 (UFW)

Debian はデフォルトでファイアウォールを有効にしていません。`UFW` (Uncomplicated Firewall) はユーザーフレンドリーなフロントエンドツールです。Debian 13 では、UFW は内部で `nftables` フレームワークを使用しています（従来の `iptables` 構文と互換性があります）。

1.  **UFW をインストール**:
    ```bash
    sudo apt install ufw
    ```

2.  **基本ルールを設定**:
    ```bash
    sudo ufw default deny incoming   # すべての着信接続を拒否
    sudo ufw default allow outgoing  # すべての発信接続を許可
    sudo ufw allow ssh               # SSH 接続を許可 (または変更したポート)
    sudo ufw allow http              # Web サーバーの場合は HTTP を許可
    sudo ufw allow https             # HTTPS を許可
    ```

3.  **UFW を有効化**:
    ```bash
    sudo ufw enable
    ```
    システムは、これが既存の SSH 接続を切断する可能性があることを警告します。確認してください。

4.  **ステータスを確認**:
    ```bash
    sudo ufw status verbose
    ```

## 🔄 自動セキュリティ更新

セキュリティパッチをタイムリーに適用することは非常に重要です。`unattended-upgrades` はセキュリティ更新を自動的にインストールできます。

1.  **インストール**:
    ```bash
    sudo apt install unattended-upgrades
    ```

2.  **有効化**:
    設定ウィザードを実行すると、基本的な設定ファイルが作成されます。
    ```bash
    sudo dpkg-reconfigure -plow unattended-upgrades
    ```
    表示されるダイアログで「はい」を選択します。

3.  **設定を微調整 (オプション)**:
    `/etc/apt/apt.conf.d/50unattended-upgrades` ファイルを編集して、自動再起動の有効化など、更新動作をカスタマイズできます。

## 🛡️ 侵入防止 (Fail2Ban)

`Fail2Ban` はログファイルを監視し、疑わしい行動（例えば、複数回のログイン失敗）に基づいてファイアウォールルールを自動的に更新し、IPアドレスをブロックします。

1.  **Fail2Ban をインストール**:
    ```bash
    sudo apt install fail2ban
    ```

2.  **ローカル設定ファイルを作成**:
    `.conf` ファイルを直接変更するのではなく、`.local` ファイルを作成して上書きします。
    ```bash
    sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
    sudo nano /etc/fail2ban/jail.local
    ```

3.  **SSH 保護を設定**:
    `jail.local` で `[sshd]` セクションを見つけ、`enabled = true` であることを確認します。`maxretry` (最大試行回数) や `bantime` (ブロック時間) を調整できます。
    ```ini
    [sshd]
    enabled = true
    port    = ssh
    maxretry = 3
    bantime = 3600  # 1時間ブロック
    ```

4.  **サービスを再起動**:
    ```bash
    sudo systemctl restart fail2ban
    ```

## 📝 ログ管理と監査

システムログを定期的に確認することは、異常な活動を発見するための鍵です。

- **`journalctl` を使用してログを表示**:
  ```bash
  # すべてのログを表示 (古いものから新しいものへ)
  journalctl

  # ログをリアルタイムで監視
  journalctl -f

  # 特定のサービスのログを表示、例えば sshd
  journalctl -u sshd.service

  # カーネルログを表示
  journalctl -k
  ```