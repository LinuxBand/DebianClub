# Debian Linux Reliability Skill 繁體中文說明

此文件供維護者與繁體中文使用者閱讀。實際的 `SKILL.md` 保持英文，讓 AI agent 更穩定地觸發與執行。

## 定位

`debian-linux-reliability` 是面向 Debian/Linux 開發、維運與故障排查的可靠性 skill。它的目標不是讓 AI 背更多知識，而是要求 AI 先收集系統事實，再依照模組化流程給出建議。

## 預設邊界

- 預設只做唯讀診斷。
- 預設不安裝軟體、不刪除檔案、不修改系統設定、不重啟服務、不修改防火牆、不修改磁碟分割。
- 使用者明確要求執行修改時，必須先說明風險、影響範圍、驗證方式與回復方式。

## 子功能

- 環境識別：發行版、版本、架構、WSL、容器、systemd、權限。
- APT 安全：套件名稱驗證、軟體來源檢查、backports、第三方來源風險。
- 指令安全：識別 `rm -rf`、`dd`、`mkfs`、`curl | sh` 等高風險指令。
- systemd 排障：服務狀態、unit 檔案、journal 日誌、啟動失敗。
- 網路排障：DNS、路由、連接埠、防火牆、NetworkManager、systemd-networkd。
- 開發環境：Node、Python、Rust、Go、C/C++、Git、建置依賴。
- GPU 驅動：NVIDIA、AMD、Intel、Mesa、Wayland/X11、Secure Boot、DKMS。
- 容器：Podman、Docker、rootless、Compose、volume 權限、cgroup v2。
- Debian 打包：`debian/control`、`sbuild`、`lintian`、backports 打包。
- 安全審計：Lynis 可用性、審計輸出解讀、分階段加固建議。

## DebianClub 綁定

當 DebianClub 已有對應內容時，AI 應優先讀取倉庫內的 DebianClub 頁面，再結合使用者機器上的唯讀診斷結果回答。DebianClub 文件用於解釋與教學，實時套件名稱、版本與服務狀態必須以使用者機器上的檢查結果為準。
