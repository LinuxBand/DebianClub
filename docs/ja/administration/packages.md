---
title: APT パッケージ管理
description: Debian 13 の APT パッケージ管理システムをマスターし、ソフトウェアパッケージのインストール、更新、管理を学びましょう
---

# APT パッケージ管理システム

APT（Advanced Package Tool）は Debian システムのコアパッケージ管理ツールです。このチュートリアルでは、APT を使用してソフトウェアパッケージをインストール、更新、削除する方法を説明します。

## 🎯 APT の基本概念

### APT とは？

APT は Debian システムのパッケージ管理ツールで、以下の機能を担当します：
- 📦 **ソフトウェアパッケージのインストール**：リポジトリからソフトウェアをダウンロードしてインストール
- 🔄 **依存関係の処理**：ソフトウェアパッケージの依存関係を自動的に解決
- ⬆️ **システム更新**：インストール済みのソフトウェアパッケージをアップグレード
- 🗑️ **ソフトウェアの削除**：不要なソフトウェアを安全にアンインストール

### ソフトウェアリポジトリ（Repository）

ソフトウェアリポジトリはソフトウェアパッケージの保管庫です：

```bash
# 主なソフトウェアリポジトリの種類
main        # Debian 公式がメンテナンスするフリーソフトウェア
contrib     # 非フリーソフトウェアに依存するフリーソフトウェア
non-free    # 非フリーソフトウェア
security    # セキュリティアップデート
updates     # 安定版の更新
```

## 🔧 APT 基本コマンド

### パッケージリストの更新

APT を使用する前に、まずパッケージリストを更新します：

```bash
# パッケージリストを更新（使用前に実行することを推奨）
sudo apt update

# 出力例：
# 命中:1 http://deb.debian.org/debian bookworm InRelease
# 取得:2 http://security.debian.org/debian-security bookworm-security InRelease [48.0 kB]
# パッケージリストを読み込んでいます... 完了
```

::: tip 💡 初心者向けヒント
`apt update` はパッケージリストのみを更新し、実際にソフトウェアをインストールまたはアップグレードすることはありません。このコマンドは「店舗の商品カタログを更新する」ようなものです。
:::

### ソフトウェアパッケージのインストール

#### 単一パッケージのインストール

```bash
# 基本インストールコマンド
sudo apt install パッケージ名

# 例：テキストエディタをインストール
sudo apt install vim

# 詳細情報を表示しながらインストール
sudo apt install -v firefox-esr
```

#### 複数パッケージのインストール

```bash
# 一度に複数のパッケージをインストール
sudo apt install git curl wget

# 特定バージョンをインストール
sudo apt install python3=3.11.2-1

# 再インストール（破損したインストールを修復）
sudo apt install --reinstall firefox-esr
```

#### 推奨パッケージのインストール

```bash
# 推奨パッケージを含めてインストール
sudo apt install --install-suggests libreoffice

# 推奨パッケージをインストールしない（デフォルト動作）
sudo apt install --no-install-suggests gimp
```

### パッケージの検索

#### 基本検索

```bash
# パッケージ名と説明を検索
apt search キーワード

# 例：エディタを検索
apt search editor

# 特定機能を検索
apt search "media player"
```

#### 正確な検索

```bash
# パッケージ名のみを検索
apt search --names-only firefox

# 正規表現を使用して検索
apt search '^python3-'
```

### パッケージ情報の表示

```bash
# パッケージの詳細情報を表示
apt show パッケージ名

# 例
apt show firefox-esr

# インストール済みバージョン情報を表示
apt list --installed firefox-esr

# 利用可能なバージョンを表示
apt list firefox-esr
```

### システムのアップグレード

#### インストール済みパッケージのアップグレード

```bash
# 更新可能なすべてのパッケージをアップグレード
sudo apt upgrade

# 特定パッケージをアップグレード
sudo apt upgrade firefox-esr

# 完全アップグレード（競合するパッケージの削除を含む）
sudo apt full-upgrade
```

#### セキュリティアップデート

```bash
# セキュリティアップデートのみをインストール
sudo apt upgrade -s | grep security
sudo apt install $(apt list --upgradable 2>/dev/null | grep security | cut -d/ -f1)
```

### パッケージの削除

#### パッケージの削除

```bash
# パッケージを削除（設定ファイルは保持）
sudo apt remove パッケージ名

# 例
sudo apt remove firefox-esr

# 完全削除（設定ファイルを含む）
sudo apt purge パッケージ名

# 不要な依存関係を自動削除
sudo apt autoremove
```

#### システムのクリーンアップ

```bash
# ダウンロードしたパッケージファイルのキャッシュをクリーンアップ
sudo apt clean

# 古くなったパッケージファイルのみをクリーンアップ
sudo apt autoclean

# 孤立したパッケージを削除
sudo apt autoremove --purge
```

## 📋 おすすめのパッケージ

### 開発ツール

```bash
# 基本開発ツール
sudo apt install build-essential

# Git バージョン管理
sudo apt install git

# コードエディタ
sudo apt install vim nano code

# プログラミング言語
sudo apt install python3 python3-pip nodejs npm
```

### マルチメディアツール

```bash
# オーディオプレーヤー
sudo apt install audacity rhythmbox

# ビデオプレーヤー
sudo apt install vlc mpv

# 画像編集
sudo apt install gimp inkscape

# オーディオ/ビデオコーデック
sudo apt install ubuntu-restricted-extras
```

### ネットワークツール

```bash
# ネットワーク診断
sudo apt install net-tools curl wget

# ダウンロードツール
sudo apt install aria2 youtube-dl

# ブラウザ
sudo apt install firefox-esr chromium
```

### オフィスソフトウェア

```bash
# LibreOffice オフィススイート
sudo apt install libreoffice

# PDF リーダー
sudo apt install evince okular

# マインドマップ
sudo apt install freemind
```

## ⚙️ ソフトウェアリポジトリの管理

### 現在のソフトウェアリポジトリの確認

```bash
# ソフトウェアリポジトリ設定を確認
cat /etc/apt/sources.list

# 追加ソフトウェアリポジトリを確認
ls /etc/apt/sources.list.d/
```

### ソフトウェアリポジトリの編集

```bash
# メインソフトウェアリポジトリファイルを編集
sudo nano /etc/apt/sources.list

# Debian 13 (Trixie) 完全ソフトウェアリポジトリ設定（非フリーソフトウェアおよびファームウェアを含む）：
deb http://deb.debian.org/debian trixie main contrib non-free non-free-firmware
deb-src http://deb.debian.org/debian trixie main contrib non-free non-free-firmware

deb http://security.debian.org/debian-security trixie-security main contrib non-free non-free-firmware
deb-src http://security.debian.org/debian-security trixie-security main contrib non-free non-free-firmware

deb http://deb.debian.org/debian trixie-updates main contrib non-free non-free-firmware
deb-src http://deb.debian.org/debian trixie-updates main contrib non-free non-free-firmware
```

::: tip non-free と non-free-firmware の違い
- `non-free-firmware`：ハードウェアファームウェア（WiFi、グラフィックスカード、Bluetooth ファームウェアなど）、Debian 13 で新たに追加された専用コンポーネント
- `non-free`：その他の非フリーソフトウェア（NVIDIA ドライバーラッパー、プロプライエタリフォントなど）

NVIDIA ドライバー（`nvidia-driver`）などの非フリーソフトウェアをインストールする必要がある場合は、`non-free` コンポーネントも保持する必要があります。
:::

### 中国ミラーソースの使用

ダウンロード速度を向上させるために、中国ミラーを使用できます：

```bash
# 元のファイルをバックアップ
sudo cp /etc/apt/sources.list /etc/apt/sources.list.backup

# ソフトウェアリポジトリを編集
sudo nano /etc/apt/sources.list
```

**清華大学ミラー：**
```bash
# 清華大学ミラーソース
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ trixie main contrib non-free-firmware
deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ trixie main contrib non-free-firmware

deb https://mirrors.tuna.tsinghua.edu.cn/debian-security trixie-security main contrib non-free-firmware
deb-src https://mirrors.tuna.tsinghua.edu.cn/debian-security trixie-security main contrib non-free-firmware

deb https://mirrors.tuna.tsinghua.edu.cn/debian/ trixie-updates main contrib non-free-firmware
deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ trixie-updates main contrib non-free-firmware
```

**中国科学技術大学ミラー：**
```bash
# 中国科学技術大学ミラーソース
deb https://mirrors.ustc.edu.cn/debian/ trixie main contrib non-free-firmware
deb-src https://mirrors.ustc.edu.cn/debian/ trixie main contrib non-free-firmware

deb https://mirrors.ustc.edu.cn/debian-security/ trixie-security main contrib non-free-firmware
deb-src https://mirrors.ustc.edu.cn/debian-security/ trixie-security main contrib non-free-firmware

deb https://mirrors.ustc.edu.cn/debian/ trixie-updates main contrib non-free-firmware
deb-src https://mirrors.ustc.edu.cn/debian/ trixie-updates main contrib non-free-firmware
```

### サードパーティソフトウェアリポジトリの追加

#### GPG キーの追加

```bash
# GPG キーをダウンロードして追加
wget -qO - https://example.com/key.gpg | sudo apt-key add -

# 現代的な方法（推奨）
wget -qO - https://example.com/key.gpg | sudo gpg --dearmor -o /usr/share/keyrings/example-keyring.gpg
```

#### ソフトウェアリポジトリの追加

```bash
# 新しいソフトウェアリポジトリファイルを作成
echo "deb [signed-by=/usr/share/keyrings/example-keyring.gpg] https://example.com/debian stable main" | sudo tee /etc/apt/sources.list.d/example.list

# パッケージリストを更新
sudo apt update
```

## 🔍 高度な APT 操作

### パッケージの依存関係

```bash
# パッケージの依存関係を表示
apt depends パッケージ名

# どのパッケージがこのパッケージに依存しているかを表示
apt rdepends パッケージ名

# インストールをシミュレート（実際にはインストールしない）
sudo apt install -s パッケージ名
```

### パッケージファイルの操作

```bash
# パッケージファイルをダウンロード（インストールしない）
apt download パッケージ名

# パッケージ内のファイルリストを表示
dpkg -L パッケージ名

# ファイルがどのパッケージに属するかを検索
dpkg -S /path/to/file

# パッケージのインストールスクリプトを表示
apt-get source パッケージ名
```

### バージョン管理

```bash
# パッケージバージョンをロック（アップグレードを防止）
sudo apt-mark hold パッケージ名

# バージョンロックを解除
sudo apt-mark unhold パッケージ名

# ロックされているパッケージを表示
apt-mark showhold

# パッケージをダウングレード（利用可能な古いバージョンが必要）
sudo apt install パッケージ名=バージョン番号
```

## 🛡️ セキュリティとベストプラクティス

### セキュリティアップデート

```bash
# 自動セキュリティアップデートを設定
sudo apt install unattended-upgrades

# 自動更新を設定
sudo dpkg-reconfigure unattended-upgrades

# 手動でセキュリティアップデートを確認
sudo unattended-upgrade --dry-run
```

### システムメンテナンス

```bash
# 定期的なメンテナンスコマンド（週に1回実行することを推奨）
sudo apt update && sudo apt upgrade
sudo apt autoremove
sudo apt autoclean

# システムの整合性をチェック
sudo apt check

# 破損したパッケージを修復
sudo apt install -f
```

### バックアップと復元

```bash
# インストール済みパッケージリストをエクスポート
dpkg --get-selections > installed-packages.txt

# パッケージリストを復元
sudo dpkg --set-selections < installed-packages.txt
sudo apt-get dselect-upgrade
```

## 🆘 トラブルシューティング

### よくある問題

#### GPG キーエラー
```bash
# 問題：NO_PUBKEY エラー
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys キーID

# または現代的な方法を使用
wget -qO - https://keyserver.ubuntu.com/pks/lookup?op=get&search=0xキーID | sudo gpg --dearmor -o /usr/share/keyrings/package-keyring.gpg
```

#### パッケージ依存関係の問題
```bash
# 破損した依存関係を修復
sudo apt install -f

# クリーンアップして再設定
sudo dpkg --configure -a

# 問題のあるパッケージを強制削除
sudo dpkg --remove --force-remove-reinstreq パッケージ名
```

#### ディスク容量不足
```bash
# パッケージキャッシュをクリーンアップ
sudo apt clean

# 不要なパッケージを削除
sudo apt autoremove --purge

# 大きなファイルを検索
sudo du -h /var/cache/apt/archives/
```

## 📱 グラフィカルインターフェースのパッケージ管理

### Synaptic パッケージマネージャー

```bash
# グラフィカルインターフェースのパッケージマネージャーをインストール
sudo apt install synaptic

# Synaptic を実行
sudo synaptic
```

### GNOME ソフトウェアセンター

```bash
# GNOME ソフトウェアセンターをインストール
sudo apt install gnome-software

# ソフトウェアセンターを起動
gnome-software
```

## 次のステップ

APT パッケージ管理をマスターしたら、次を学習できます：

1. [システムサービス管理](/administration/services) - システムサービスの管理
2. [ユーザー権限管理](/administration/users) - ユーザーと権限の設定
3. [ネットワーク設定](/administration/network) - ネットワークの設定と管理

---

**システム管理のスキルをもっと学びたいですか？** [システムサービスの学習を続ける →](/administration/services)