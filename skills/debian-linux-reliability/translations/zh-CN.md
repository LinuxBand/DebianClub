# Debian Linux Reliability Skill 中文说明

这个文件是给维护者和中文用户看的说明。实际 `SKILL.md` 保持英文，以便 AI agent 更稳定地触发和执行。

## 定位

`debian-linux-reliability` 是一个面向 Debian/Linux 开发、运维和故障排查的可靠性 skill。它的目标不是让 AI 背更多知识，而是要求 AI 先收集系统事实，再根据模块化流程给出建议。

## 默认边界

- 默认只做只读诊断。
- 默认不安装软件、不删除文件、不修改系统配置、不重启服务、不改防火墙、不改磁盘分区。
- 用户明确要求执行修改时，必须先说明风险、影响范围、验证方式和回滚方式。

## 子功能

- 环境识别：发行版、版本、架构、WSL、容器、systemd、权限。
- APT 安全：包名验证、软件源检查、backports、第三方源风险。
- 命令安全：识别 `rm -rf`、`dd`、`mkfs`、`curl | sh` 等高风险命令。
- systemd 排障：服务状态、unit 文件、journal 日志、启动失败。
- 网络排障：DNS、路由、端口、防火墙、NetworkManager、systemd-networkd。
- 开发环境：Node、Python、Rust、Go、C/C++、Git、构建依赖。
- GPU 驱动：NVIDIA、AMD、Intel、Mesa、Wayland/X11、Secure Boot、DKMS。
- 容器：Podman、Docker、rootless、Compose、卷权限、cgroup v2。
- Debian 打包：`debian/control`、`sbuild`、`lintian`、backports 打包。
- 安全审计：Lynis 可用性、审计输出解释、分阶段加固建议。

## DebianClub 绑定

当 DebianClub 已有对应内容时，AI 应优先读取仓库内的 DebianClub 页面，再结合用户机器上的只读诊断结果回答。DebianClub 文档用于解释和教学，实时包名、版本和服务状态必须以用户机器上的检查结果为准。
