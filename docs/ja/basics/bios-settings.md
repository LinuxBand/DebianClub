---
title: BIOS/UEFI設定
description: USB媒体から起動するためのBIOS/UEFI設定方法
---

# BIOS/UEFI設定

Debianインストールメディアから起動するには、BIOS/UEFI設定を変更する必要がある場合があります。

## BIOS/UEFIへのアクセス

起動時にメーカーに対応するキーを押してください：

| メーカー | BIOSキー | ブートメニューキー |
|---------|---------|----------------|
| Dell | F2 | F12 |
| HP | F10 | F9 |
| Lenovo | F1 / Enter | F12 |
| ASUS | F2 / Del | F8 |
| MSI | Del | F11 |
| Acer | F2 | F12 |

## ブート順序の変更

1. BIOS/UEFIにアクセス
2. 「Boot」または「起動」セクションを見つける
3. 「USB Drive」を最初の位置に移動
4. 保存して再起動（通常F10）

## 重要なUEFI設定

### Secure Bootの有効化/無効化

```
UEFI → Security → Secure Boot → Disabled
```

::: tip ヒント
Debian 13はSecure Bootをサポートしています。通常は無効にする必要はありませんが、一部の古いシステムでは無効にする必要がある場合があります。
:::

## インストール後

インストール後は起動順序を元の状態に戻してください。
