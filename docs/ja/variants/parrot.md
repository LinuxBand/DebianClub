---
title: Parrot OS — Debianデリバティブ
description: セキュリティ研究ツールと実用的な日常デスクトップを両立させたDebian系ローリングリリース。Security、Home、HTBエディションを提供。
---

# Parrot OS

Parrot OS（ParrotSecとも知られる）は、イタリアのFrozenboxチームが開発したDebian系ローリングリリースディストリビューションです。純粋にセキュリティ特化のディストリビューションとは異なり、Parrot OSは有能なセキュリティ研究プラットフォームと快適な日常使いデスクトップの両方として設計されています。異なるワークフローに対応するいくつかの異なるエディションを提供しています。

## 基本情報

| 属性 | 詳細 |
|---|---|
| ベース | Debian testing（ローリング） |
| リリースサイクル | ローリングリリース |
| デフォルトデスクトップ | MATE（Security/Home）、KDE Plasma（オプション） |
| 対象ユーザー | セキュリティ研究者、開発者、プライバシー意識の高いデスクトップユーザー |
| ウェブサイト | [https://parrotsec.org](https://parrotsec.org) |

## 主な特徴

- **複数の目的別エディション**: Security（フルペンテストツールキット）、Home（軽量日常デスクトップ）、HTB（Hack The Box用事前設定）、サーバーとコンテナ使用のためのCloud/Dockerエディション。
- **Kaliより軽量**: MATEデスクトップとParrotのカーネル調整により、RAMの使用量はKali Linuxより低くなっています。2 GBのRAMで快適に動作します。
- **内蔵プライバシーツール**: AnonSurf（すべてのトラフィックのワンクリックTorルーティング）、Firejailアプリケーションサンドボックス、OnionShareが含まれており、追加設定なしに日常ユーザーへの強力なプライバシーコントロールを提供します。
- **開発者フレンドリーなHomeエディション**: Homeエディションは重いセキュリティツールなしに、一般的なプログラミングランタイムと開発ユーティリティを搭載しており、プログラマーの日常ドライバーとして実用的です。
- **ローリングアップデート**: Debian testingをベースにしており、定期的な再インストールなしにソフトウェアが最新の状態に保たれます。

## Debianとの関係

Parrot OSはDebian testingをベースにしており、そのブランチから直接パッケージを取得し、Parrotリポジトリ（セキュリティツール、プロプライエタリソフトウェア、バージョンアップされたパッケージを含む）で補完されています。Parrotチームはセキュリティ強化されたカーネルパッチと独自のツーリングリポジトリを維持しています。Debian stableではなくDebian testingを追跡するため、ソフトウェアバージョンはより最新ですが、stableベースのディストリビューションと比べてシステムの安定性はわずかに低くなっています。

## はじめに

```bash
# 適切なエディションのISOをダウンロード: https://parrotsec.org/download/

# インストール後、Parrotアップグレードコマンドを使用して更新
sudo parrot-upgrade
# これと同等:
sudo apt update && sudo apt full-upgrade -y

# AnonSurfを有効にしてすべてのトラフィックをTorを通じてルーティング
sudo anonsurf start
sudo anonsurf status
sudo anonsurf stop

# 必要に応じて追加のセキュリティツールをインストール
sudo apt install metasploit-framework burpsuite -y
```

## こんな方におすすめ

- 日常使いデスクトップとしても機能する環境が欲しいセキュリティ実務者
- Hack The Box、TryHackMeなどのプラットフォームの学生（HTBエディションは事前設定済み）
- ライブオンリーシステムなしにワンクリックTorルーティングを望むプライバシー意識の高いユーザー
- 内蔵プライバシーツールを備えたモダンなローリングリリースDebianベースを求める開発者

::: tip Parrot OSとKali Linuxの比較
Kali Linuxはセキュリティツールライブラリの完全性を優先し、プロフェッショナルなペンテストに厳密に特化しています。セキュリティ作業もこなせる汎用ワークステーションが必要な場合、特に低スペックのハードウェアでは、Parrot OSの方が適しています。
:::

## 関連リンク

- ウェブサイト：[https://parrotsec.org](https://parrotsec.org)
- ダウンロード：[https://parrotsec.org/download/](https://parrotsec.org/download/)
- ドキュメント：[https://parrotsec.org/docs/](https://parrotsec.org/docs/)
- GitLab（ソース）：[https://gitlab.com/parrotsec](https://gitlab.com/parrotsec)

---

## 次のステップ

[Debianデリバティブの概要](/ja/variants/)に戻って、他のDebianベースのディストリビューションを探索しましょう。
