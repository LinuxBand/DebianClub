---
title: Deepin — Debianデリバティブ
description: 中国発の視覚的に美しいDebian系ディストリビューション。独自開発のDDE（Deepin Desktop Environment）を特徴とします。
---

# Deepin

Deepinは中国の武漢Deepin Technology Co., Ltd.が開発・維持するLinuxディストリビューションです。Debian stableをベースにしており、独自開発のDDE（Deepin Desktop Environment）で最もよく知られています。DDEはあらゆるOSの中で最も視覚的に洗練されたデスクトップ環境の一つとして広く認められています。現在のメジャーリリースシリーズはdeepin 23です。

## 基本情報

| 属性 | 詳細 |
|---|---|
| ベース | Debian stable |
| リリースサイクル | Debian stableに準拠；deepin 23が現在のメジャーシリーズ |
| デフォルトデスクトップ | DDE（Deepin Desktop Environment） |
| 対象ユーザー | 中国語・国際的なデスクトップユーザー、UI重視ユーザー、初心者 |
| ウェブサイト | [https://www.deepin.org](https://www.deepin.org) |

## 主な特徴

- **美しいDDEデスクトップ**: スムーズなアニメーション、統一されたビジュアル言語、macOS風のDock、統合されたコントロールセンターにより、DDEはあらゆるプラットフォームで最も美しいデスクトップ環境の一つです。
- **中国語アプリケーションエコシステム**: Deepin App StoreにはWeChat、WPS Office、NetEase Cloud Music、Baidu Netdiskなど、中国で一般的に使われるアプリのネイティブLinux版が含まれており、インストール後すぐに使用できます。
- **他のディストリビューションでもDDEが利用可能**: DDEはArch Linux、Fedora、NixOSなどに移植されており、完全なDeepinディストリビューションに切り替えることなくDeepinデスクトップを体験できます。
- **deepin 23のアーキテクチャ改善**: Debian 12 Bookwormをベースにしたdeepin 23は、改善されたサンドボックスとクロスディストロアプリ互換性のためのLinglongアプリケーションフォーマットを導入しています。
- **活発なオープンソースコミュニティ**: DDEとほとんどのコアDeepinアプリケーションはオープンソースで、GitHubでホストされており、活発な国際的コントリビューターベースがあります。

## Debianとの関係

Deepinは公式DebianリポジトリとDeepinの独自・コミュニティリポジトリからパッケージを取得し、Debian stableを直接ベースにしています。DDEデスクトップ環境、Deepin File Manager、Deepin Terminal、Deepin Screenshotなどのバンドルアプリケーションはすべて独自開発されており、Debianから取得したものではありません。deepin 23はDebian 12 Bookwormと連携し、Debianのセキュリティアップデートトラックに従います。

## はじめに

```bash
# ISOのダウンロード先: https://www.deepin.org/en/download/
# 標準64ビットエディションはUEFIとレガシーBIOSの両方をサポート

# インストール後、システムを更新
sudo apt update && sudo apt full-upgrade -y

# Deepin App Storeをインストール（通常はプリインストール済み）
sudo apt install deepin-appstore -y

# 既存のDebian 12システムにDDEをインストール（デスクトップを試す）
sudo apt install dde -y

# WeChat Linuxネイティブ版をインストール（Deepinリポジトリ経由）
sudo apt install com.tencent.weixin -y
```

## こんな方におすすめ

- Linux上で美しく洗練されたデスクトップ体験を優先するユーザー
- WeChat、WPSなどのアプリへのネイティブアクセスを必要とする中国語ユーザー
- 親しみやすく視覚的に魅力的なインターフェースを求めてWindowsまたはmacOSから移行するユーザー
- LinuxデスクトップUIのイノベーションに関心がある開発者とデザイナー

## 関連リンク

- ウェブサイト：[https://www.deepin.org](https://www.deepin.org)
- ダウンロード：[https://www.deepin.org/en/download/](https://www.deepin.org/en/download/)
- Wiki：[https://wiki.deepin.org](https://wiki.deepin.org)
- DDEソースコード：[https://github.com/linuxdeepin](https://github.com/linuxdeepin)
- コミュニティフォーラム：[https://bbs.deepin.org](https://bbs.deepin.org)

---

## 次のステップ

[Debianデリバティブの概要](/ja/variants/)に戻って、他のDebianベースのディストリビューションを探索しましょう。
