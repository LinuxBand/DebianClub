import type {
  BootMode,
  CommandRiskLevel,
  ComponentMode,
  DesktopHardware,
  DesktopWorkflow,
  EncryptionMode,
  InstallDevice,
  InstallGoal,
  MirrorId,
  PartitionDisk,
  ReleaseId,
  RiskLevel,
  SkillTarget,
  SymptomId,
  ToolLanguage,
  UpgradeCurrent,
  UpgradeExposure,
  UpgradeTarget,
} from './types';

export const mirrors: Record<MirrorId, { label: string; archive: string; security: string; detail: Record<ToolLanguage, string> }> = {
  official: {
    label: 'deb.debian.org',
    archive: 'https://deb.debian.org/debian',
    security: 'https://security.debian.org/debian-security',
    detail: { zh: '官方 CDN，适合全球多数网络。', en: 'Official CDN, suitable for most global networks.' },
  },
  ustc: {
    label: 'USTC',
    archive: 'https://mirrors.ustc.edu.cn/debian',
    security: 'https://mirrors.ustc.edu.cn/debian-security',
    detail: { zh: '中国大陆常用高校镜像。', en: 'Common university mirror for mainland China.' },
  },
  tuna: {
    label: 'TUNA',
    archive: 'https://mirrors.tuna.tsinghua.edu.cn/debian',
    security: 'https://mirrors.tuna.tsinghua.edu.cn/debian-security',
    detail: { zh: '中国大陆常用高校镜像。', en: 'Common university mirror for mainland China.' },
  },
  aliyun: {
    label: 'Aliyun',
    archive: 'https://mirrors.aliyun.com/debian',
    security: 'https://mirrors.aliyun.com/debian-security',
    detail: { zh: '云厂商镜像，适合阿里云及周边网络。', en: 'Cloud provider mirror, useful near Alibaba Cloud networks.' },
  },
  jaist: {
    label: 'JAIST',
    archive: 'https://ftp.jaist.ac.jp/pub/Linux/debian',
    security: 'https://security.debian.org/debian-security',
    detail: { zh: '日本 JAIST 镜像，安全源保留官方地址。', en: 'JAIST mirror in Japan; security keeps official URL.' },
  },
  'debian-de': {
    label: 'Germany',
    archive: 'https://ftp.de.debian.org/debian',
    security: 'https://security.debian.org/debian-security',
    detail: { zh: '德国官方镜像，适合欧洲网络。', en: 'German Debian mirror, useful in Europe.' },
  },
};

export const releaseLabels: Record<ReleaseId, string> = {
  trixie: 'Debian 13 Trixie',
  bookworm: 'Debian 12 Bookworm',
};

export const componentSets: Record<ComponentMode, { value: string; label: Record<ToolLanguage, string>; note: Record<ToolLanguage, string> }> = {
  main: {
    value: 'main',
    label: { zh: '只使用 main', en: 'main only' },
    note: { zh: '最保守，只启用自由软件。', en: 'Most conservative; free software only.' },
  },
  firmware: {
    value: 'main non-free-firmware',
    label: { zh: 'main + firmware', en: 'main + firmware' },
    note: { zh: '适合需要 Wi-Fi、蓝牙或显卡固件的普通设备。', en: 'Good for devices needing Wi-Fi, Bluetooth, or graphics firmware.' },
  },
  full: {
    value: 'main contrib non-free non-free-firmware',
    label: { zh: '完整组件', en: 'Full components' },
    note: { zh: '适合 NVIDIA、Steam 或其他非自由软件需求。', en: 'Useful for NVIDIA, Steam, or other non-free software needs.' },
  },
};

export const installDevices = {
  vm: true,
  laptop: true,
  desktop: true,
  server: true,
} satisfies Record<InstallDevice, true>;

export const installGoals = {
  learn: true,
  daily: true,
  server: true,
  dev: true,
  ai: true,
} satisfies Record<InstallGoal, true>;

export const riskLevels = {
  low: true,
  balanced: true,
  direct: true,
} satisfies Record<RiskLevel, true>;

export const desktopHardwareProfiles = {
  old: true,
  modest: true,
  modern: true,
} satisfies Record<DesktopHardware, true>;

export const desktopWorkflows = {
  simple: true,
  custom: true,
  light: true,
  creative: true,
} satisfies Record<DesktopWorkflow, true>;

export const partitionDisks = {
  small: true,
  standard: true,
  large: true,
  multi: true,
} satisfies Record<PartitionDisk, true>;

export const bootModes = {
  single: true,
  dual: true,
} satisfies Record<BootMode, true>;

export const encryptionModes = {
  none: true,
  home: true,
  full: true,
} satisfies Record<EncryptionMode, true>;

export const targetPaths: Record<SkillTarget, { label: Record<ToolLanguage, string>; target: string }> = {
  codex: { label: { zh: 'Codex 默认目录', en: 'Codex default' }, target: '"${CODEX_HOME:-$HOME/.codex}/skills"' },
  agents: { label: { zh: 'Agents 目录', en: 'Agents directory' }, target: '"$HOME/.agents/skills"' },
  local: { label: { zh: '仓库内本地目录', en: 'Local repository directory' }, target: './skills-local' },
};

export const upgradeCurrentReleases = {
  trixie: true,
  bookworm: true,
  bullseye: true,
  buster: true,
} satisfies Record<UpgradeCurrent, true>;

export const upgradeTargets = {
  keep: true,
  trixie: true,
  bookworm: true,
} satisfies Record<UpgradeTarget, true>;

export const upgradeExposures = {
  offline: true,
  internal: true,
  public: true,
} satisfies Record<UpgradeExposure, true>;

export interface CommandRiskRule {
  id: string;
  level: CommandRiskLevel;
  pattern: RegExp;
  title: Record<ToolLanguage, string>;
  detail: Record<ToolLanguage, string>;
  safer: Record<ToolLanguage, string>;
}

export interface CommandFinding extends CommandRiskRule {
  line: number;
  command: string;
}

export const commandRiskRules: CommandRiskRule[] = [
  {
    id: 'remote-script-pipe',
    level: 'critical',
    pattern: /\b(?:(?:curl|wget)\b[^\n|;]*(?:\|\s*(?:sudo(?:\s+-[A-Za-z]+)*\s+)?(?:bash|sh|zsh)\b)|(?:bash|sh|zsh)\s+<\s*\([^)]*(?:curl|wget)\b)/i,
    title: { zh: '远程脚本直接交给 shell 执行', en: 'Remote script piped directly into a shell' },
    detail: {
      zh: '这会在未审查脚本内容、签名和回滚方式前执行远程代码。',
      en: 'This executes remote code before reviewing script contents, signatures, or rollback path.',
    },
    safer: {
      zh: '先下载到临时文件，确认来源和内容，再按项目文档选择包管理器、签名仓库或本地脚本。',
      en: 'Download to a temporary file first, review source and contents, then prefer signed repositories, package managers, or local scripts.',
    },
  },
  {
    id: 'delete-root-or-home',
    level: 'critical',
    pattern: /\brm\s+-(?=[\w-]*r)(?=[\w-]*f)[\w-]*\s+(?:--no-preserve-root\s+)?(?:\/(?:\s|$)|\/\*|\$HOME(?:\s|$)|~(?:\s|$))/i,
    title: { zh: '递归强制删除根目录或家目录', en: 'Recursive force deletion of root or home' },
    detail: {
      zh: '该命令可能删除整个系统、用户目录或不可恢复的大量数据。',
      en: 'This can remove the whole system, a home directory, or a large amount of unrecoverable data.',
    },
    safer: {
      zh: '先用 `ls` 和 `find ... -maxdepth` 确认目标，再使用更具体路径；需要删除前先做备份。',
      en: 'Confirm the target with `ls` and `find ... -maxdepth`, use a more specific path, and back up before deleting.',
    },
  },
  {
    id: 'destructive-disk-write',
    level: 'critical',
    pattern: /\b(?:dd\s+.*\bof=\/dev\/(?:sd|vd|xvd|nvme|mmcblk)|mkfs\.[a-z0-9]+\s+\/dev\/|wipefs\s+.*\/dev\/|sgdisk\s+.*\/dev\/|parted\s+.*\/dev\/|fdisk\s+\/dev\/)/i,
    title: { zh: '可能破坏磁盘或分区表', en: 'Potentially destructive disk or partition operation' },
    detail: {
      zh: '磁盘写入、格式化和分区表操作可能立即破坏数据。',
      en: 'Disk writes, formatting, and partition table operations can destroy data immediately.',
    },
    safer: {
      zh: '先运行 `lsblk -f`、`findmnt`，确认设备名和备份；能预演的工具先使用 dry-run 或只读模式。',
      en: 'Run `lsblk -f` and `findmnt` first, confirm device names and backups, and use dry-run or read-only modes where available.',
    },
  },
  {
    id: 'recursive-force-delete',
    level: 'warning',
    pattern: /\brm\s+-(?=[\w-]*r)(?=[\w-]*f)[\w-]*\s+/i,
    title: { zh: '递归强制删除', en: 'Recursive force deletion' },
    detail: {
      zh: '`rm -rf` 会跳过确认并递归删除。路径变量、通配符或 sudo 会显著放大风险。',
      en: '`rm -rf` skips confirmation and deletes recursively. Variables, wildcards, or sudo make the risk much larger.',
    },
    safer: {
      zh: '先用 `rm -ri`、`find` 预览或移动到隔离目录；确认路径后再删除。',
      en: 'Preview with `rm -ri`, `find`, or move files into a quarantine directory before deleting.',
    },
  },
  {
    id: 'ssh-security-downgrade',
    level: 'warning',
    pattern: /\b(?:PasswordAuthentication\s+yes|PermitRootLogin\s+yes|PermitRootLogin\s+without-password|PubkeyAuthentication\s+no)\b/i,
    title: { zh: 'SSH 安全基线降级', en: 'SSH security baseline downgrade' },
    detail: {
      zh: '启用密码登录、root 登录或禁用公钥登录会扩大暴力破解和误配置风险。',
      en: 'Enabling password login, root login, or disabling public key auth increases brute-force and misconfiguration risk.',
    },
    safer: {
      zh: '保留已有 SSH 会话，先运行 `sshd -t`，优先使用密钥登录、限制来源地址和用户组。',
      en: 'Keep an existing SSH session, run `sshd -t`, and prefer key auth, source restrictions, and allowed groups.',
    },
  },
  {
    id: 'firewall-flush',
    level: 'warning',
    pattern: /\b(?:ufw\s+disable|iptables\s+-F|nft\s+flush\s+ruleset)\b/i,
    title: { zh: '关闭或清空防火墙规则', en: 'Firewall disabled or flushed' },
    detail: {
      zh: '直接关闭防火墙可能让管理端口和内部服务暴露到不可信网络。',
      en: 'Disabling the firewall can expose management ports and internal services to untrusted networks.',
    },
    safer: {
      zh: '先列出规则并只调整必要端口；远程机器上保留回滚会话和控制台路径。',
      en: 'List rules first and change only the needed ports; keep rollback access and console access on remote machines.',
    },
  },
  {
    id: 'insecure-apt',
    level: 'warning',
    pattern: /\b(?:apt-key\s+add|trusted=yes|--allow-unauthenticated|Acquire::AllowInsecureRepositories=true)\b/i,
    title: { zh: 'APT 信任边界变弱', en: 'APT trust boundary weakened' },
    detail: {
      zh: '全局信任 key、跳过签名或允许不安全仓库会削弱包来源验证。',
      en: 'Global keys, skipped signatures, or insecure repositories weaken package source verification.',
    },
    safer: {
      zh: '使用 deb822、`Signed-By` 和仓库专用 keyring，并确认仓库来源。',
      en: 'Use deb822, `Signed-By`, and repository-specific keyrings after verifying the repository source.',
    },
  },
  {
    id: 'wide-open-permissions',
    level: 'warning',
    pattern: /\bchmod\s+(?:-[^\s]+\s+)*777\b|\bchmod\s+-R\s+.*777\b/i,
    title: { zh: '过宽权限', en: 'Overly broad permissions' },
    detail: {
      zh: '`777` 或递归放宽权限可能让其他用户修改脚本、服务数据或敏感文件。',
      en: '`777` or recursive permission loosening can let other users modify scripts, service data, or sensitive files.',
    },
    safer: {
      zh: '按用户和组授权，优先使用 `chmod 750`、`chmod 640`、ACL 或专用服务账号。',
      en: 'Grant access by user and group, preferring `chmod 750`, `chmod 640`, ACLs, or dedicated service accounts.',
    },
  },
  {
    id: 'sudo-or-third-party-source',
    level: 'review',
    pattern: /\b(?:sudo|add-apt-repository|\/etc\/apt\/sources\.list\.d\/|curl\b.*gpg|wget\b.*gpg)\b/i,
    title: { zh: '需要人工复核的系统级变更', en: 'System-level change needs manual review' },
    detail: {
      zh: '该命令可能修改系统状态、软件源或信任材料，执行前应确认来源和回滚方式。',
      en: 'This may change system state, repositories, or trust material; verify source and rollback before running it.',
    },
    safer: {
      zh: '先阅读项目文档，确认发行版代号、仓库 key、影响范围和备份。',
      en: 'Read the project documentation first, then confirm release codename, repository key, impact scope, and backups.',
    },
  },
];

export const riskRank: Record<CommandRiskLevel, number> = {
  review: 1,
  warning: 2,
  critical: 3,
};

export const symptomData: Record<SymptomId, { title: Record<ToolLanguage, string>; commands: string[]; links: Record<ToolLanguage, Array<{ label: string; href: string }>> }> = {
  network: {
    title: { zh: '网络或 Wi-Fi 不可用', en: 'Network or Wi-Fi unavailable' },
    commands: ['ip link', 'nmcli device', 'rfkill list', 'dmesg | grep -iE "firmware|iwlwifi|rtl|brcm|network"'],
    links: {
      zh: [
        { label: 'Wi-Fi 与无线固件', href: '/hardware/wifi' },
        { label: '网络问题排查', href: '/troubleshooting/networking' },
      ],
      en: [
        { label: 'Wi-Fi & Wireless Firmware', href: '/en/hardware/wifi' },
        { label: 'Networking troubleshooting', href: '/en/troubleshooting/networking' },
      ],
    },
  },
  display: {
    title: { zh: '黑屏、花屏或外接显示器异常', en: 'Black screen, flicker, or external display issues' },
    commands: ['lspci -nnk | grep -A4 -E "VGA|3D|Display"', 'journalctl -b -p warning --no-pager', 'dmesg | grep -iE "drm|nvidia|amdgpu|i915|firmware"'],
    links: {
      zh: [
        { label: 'NVIDIA 与 Optimus', href: '/hardware/nvidia' },
        { label: 'AMD / Intel 图形', href: '/hardware/graphics' },
      ],
      en: [
        { label: 'NVIDIA & Optimus', href: '/en/hardware/nvidia' },
        { label: 'AMD / Intel Graphics', href: '/en/hardware/graphics' },
      ],
    },
  },
  boot: {
    title: { zh: '无法启动或进入救援模式', en: 'Boot failure or rescue mode' },
    commands: ['systemctl --failed', 'journalctl -b -p err --no-pager', 'lsblk -f', 'cat /etc/fstab'],
    links: {
      zh: [
        { label: '启动问题', href: '/troubleshooting/installation-boot' },
        { label: '恢复模式', href: '/troubleshooting/recovery' },
      ],
      en: [
        { label: 'Installation boot issues', href: '/en/troubleshooting/installation-boot' },
        { label: 'Recovery', href: '/en/troubleshooting/recovery' },
      ],
    },
  },
  packages: {
    title: { zh: 'APT 或软件包问题', en: 'APT or package management issue' },
    commands: ['apt-cache policy', 'apt list --upgradable', 'dpkg --audit', 'apt-mark showhold'],
    links: {
      zh: [
        { label: '软件包管理', href: '/administration/packages' },
        { label: '包管理排障', href: '/troubleshooting/package-management' },
      ],
      en: [
        { label: 'Package management', href: '/en/administration/packages' },
        { label: 'Package troubleshooting', href: '/en/troubleshooting/package-management' },
      ],
    },
  },
  audio: {
    title: { zh: '蓝牙、声音或麦克风问题', en: 'Bluetooth, audio, or microphone issue' },
    commands: ['systemctl --user status pipewire wireplumber --no-pager', 'systemctl status bluetooth --no-pager', 'wpctl status', 'dmesg | grep -iE "bluetooth|btusb|firmware|snd|audio"'],
    links: {
      zh: [{ label: '蓝牙与音频', href: '/hardware/bluetooth-audio' }],
      en: [{ label: 'Bluetooth & Audio', href: '/en/hardware/bluetooth-audio' }],
    },
  },
  performance: {
    title: { zh: '系统卡顿或资源异常', en: 'System is slow or resource usage is abnormal' },
    commands: ['uptime', 'free -h', 'df -h', 'systemctl --failed', 'journalctl -b -p warning --no-pager'],
    links: {
      zh: [{ label: '性能排查', href: '/troubleshooting/performance' }],
      en: [{ label: 'Performance troubleshooting', href: '/en/troubleshooting/performance' }],
    },
  },
};
