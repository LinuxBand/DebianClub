---
title: 系统下载指南
description: 学习如何为您的 PC 下载 Debian，包括稳定版、测试版和历史版本。
---

# 系统下载指南

欢迎来到 Debian 下载指南。本文档将指导您如何选择、下载并校验最适合您的 Debian 系统镜像。

## 1. 如何下载镜像

### 步骤一：选择离你最近的镜像站

从地理位置上离你更近的镜像站下载通常会获得更快的速度。

| 国家/地区 | 镜像站名称 | 镜像目录地址 |
| :---------- | :------------- | :------------------------------------------------------- |
| **中国** | 中科大 (USTC) | `https://mirrors.ustc.edu.cn/debian-cd/` |
| **中国** | 阿里云 (Aliyun) | `https://mirrors.aliyun.com/debian-cd/` |
| **中国** | 清华大学 (Tsinghua) | `https://mirrors.tuna.tsinghua.edu.cn/debian-cd/` |
| **全球** | Debian 官方 | `https://cdimage.debian.org/debian-cd/` |
| **德国** | 德国官方镜像 | `https://ftp.de.debian.org/debian-cd/` |
| **日本** | 日本官方镜像 | `https://ftp.jp.debian.org/debian-cd/` |
| **美国** | MIT | `https://mirror.csail.mit.edu/debian-cd/` |
| **美国** | Kernel.org | `https://mirrors.kernel.org/debian-cd/` |
| **英国** | University of Kent | `https://mirrorservice.org/sites/cdimage.debian.org/debian-cd/` |
| **法国** | 法国官方镜像 | `https://debian.proxad.net/debian-cd/` |
| **澳大利亚** | AARNet | `https://mirror.aarnet.edu.au/pub/debian-cd/` |
| **俄罗斯** | Yandex | `https://mirror.yandex.ru/debian-cd/` |
| **印度** | NIT Trichy | `https://mirror.nitt.edu/debian-cd/` |
| **新加坡** | NUS | `https://debian.sg.debian.org/debian-cd/` |

更多镜像站请访问：[Debian 官方镜像列表](https://www.debian.org/mirror/list)

### 步骤二：根据版本在镜像站中导航

- **下载最新稳定版 (Stable)**:
  1.  进入镜像站后，点击 `current/` 目录。
  2.  选择你的处理器架构 (`amd64` 适用于绝大多数64位电脑)。
  3.  进入 `iso-cd/` (网络安装版) 或 `iso-dvd/` (DVD版)。
  4.  找到对应的 `.iso` 文件并下载。**请务必同时下载该目录下的 `SHA256SUMS` 文件！**

- **下载测试版 (Testing)**:
  1.  测试版的存放路径较为特殊，通常在 `debian-cdimage/` 或 `cdimage/` 根目录下。
  2.  寻找 `weekly-builds/` (每周构建) 或 `daily-builds/` (每日构建) 目录。
  3.  后续步骤与稳定版类似。

- **下载历史归档版 (Archive)**:
  1.  所有旧版本都存放在官方归档服务器：[`https://cdimage.debian.org/cdimage/archive/`](https://cdimage.debian.org/cdimage/archive/)
  2.  点击你想下载的版本号目录（如 `11.9.0/`）。
  3.  后续步骤与稳定版类似。


## 2. 版本选择：稳定版 vs 测试版

Debian 总会同时提供至少两个主要的版本分支，了解它们的区别至关重要。

### 稳定版 (Stable)

- **当前版本**: Debian 13, 代号 "Trixie"
- **历史版本**: Debian 12, 代号 "Bookworm"，OldStable
- **推荐人群**: **绝大多数用户**，特别是用于服务器、生产环境和日常桌面办公。
- **特点**:
  - **极致可靠**: 经过长时间的开发和冻结测试期，稳定性是其最高优先级。
  - **安全保障**: 获得 Debian 安全团队的长期、及时的安全更新支持。
  - **软件版本**: 为了追求稳定，其软件包版本相对较旧，但都经过了充分考验。

> 如果你的核心需求是“稳定”和“省心”，那么稳定版是你的不二之选。

### 测试版 (Testing)

- **当前版本**: Debian 14, 代码名 "Forky"
- **推荐人群**: 开发者、技术爱好者，以及希望体验最新软件功能的用户。
- **特点**:
  - **软件更新**: 包含即将进入下一个稳定版的较新软件包。
  - **滚动更新**: 版本会持续更新，直到进入下一个稳定版的“冻结”开发阶段。
  - **潜在风险**: 可能会遇到一些未解决的 bug，且安全更新的响应速度不如稳定版。

> 如果你热衷于追新，不介意偶尔动手解决一些小问题，那么测试版会让你充满乐趣。


## 3. 镜像类型：我该用哪个？

在下载目录中，你会看到不同类型的 `.iso` 文件，它们分别用于不同的安装场景。

### 网络安装镜像 (Net-install)

- **文件名通常包含**: `netinst`
- **特点**:
  - **体积小**: 通常只有几百MB，便于快速下载。
  - **系统最新**: 在安装过程中，它会从网络实时下载最新的软件包。
  - **高度定制**: 你可以在安装时精确选择需要安装的组件，打造最精简的系统。
- **要求**: 安装过程中**必须全程联网**。
- ⭐ **强烈推荐给大多数用户，尤其是服务器安装。**

### 完整安装镜像 (Complete DVD/CD)

- **文件名通常包含**: `DVD-1`, `DVD-2`... 或 `CD-1`...
- **特点**:
  - **体积庞大**: DVD 镜像通常有几GB大小，包含了海量的软件包。
  - **支持离线安装**: 即使没有网络连接，也能安装一个功能完备的桌面系统。
- **要求**: 仅下载第一个（`DVD-1` 或 `CD-1`）就足以完成标准安装。后续的镜像是额外的软件包仓库。
- ⭐ **推荐给需要在无网络环境下安装的用户。**

### Live 镜像 (Live Images)

- **文件名通常包含**: `live`