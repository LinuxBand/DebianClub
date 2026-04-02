---
title: Debian 13をダウンロード
description: Debian 13インストールイメージのダウンロード
---

# Debian 13をダウンロード

::: tip インタラクティブダウンロード
[インタラクティブダウンロードページ](/ja/download)でリージョンとミラーを選択してください。
:::

## ダウンロードの選択

| ユースケース | 推奨ダウンロード | サイズ |
|-----------|--------------|------|
| **ほとんどのユーザー** | DVD-1 (フルデスクトップ) | ~3.7GB |
| **最小インストール** | netinst (ネットワークインストール) | ~400MB |
| **オフラインインストール** | 完全DVDセット | ~20GB |

## 公式ダウンロードソース

- **メインサイト**: [debian.org/download](https://www.debian.org/download)
- **CDイメージ**: [cdimage.debian.org](https://cdimage.debian.org/)
- **ミラーリスト**: [debian.org/mirror/list](https://www.debian.org/mirror/list)

## ダウンロードの確認

```bash
# SHA256でファイルの整合性を確認
sha256sum debian-13.4.0-amd64-netinst.iso
```

## 次のステップ

- [ブータブルメディアを作成](/ja/basics/bootable-media)
- [インストールガイド](/ja/basics/installation)
