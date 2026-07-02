'use client';

import {
  AlertTriangle,
  Bot,
  Check,
  Clipboard,
  Cpu,
  Database,
  Download,
  HardDrive,
  HelpCircle,
  Laptop,
  Monitor,
  Network,
  Server,
  Settings2,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react';
import type { ComponentType, ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
import registry from '../../skills/registry.json';

type ToolLanguage = 'zh' | 'en';
type ToolId = 'mirror' | 'install' | 'desktop' | 'partition' | 'troubleshoot' | 'safety' | 'skills';
type ReleaseId = 'trixie' | 'bookworm';
type ComponentMode = 'main' | 'firmware' | 'full';
type MirrorId = 'official' | 'ustc' | 'tuna' | 'aliyun' | 'jaist' | 'debian-de';
type InstallDevice = 'vm' | 'laptop' | 'desktop' | 'server';
type InstallGoal = 'learn' | 'daily' | 'server' | 'dev' | 'ai';
type RiskLevel = 'low' | 'balanced' | 'direct';
type DesktopHardware = 'old' | 'modest' | 'modern';
type DesktopWorkflow = 'simple' | 'custom' | 'light' | 'creative';
type PartitionDisk = 'small' | 'standard' | 'large' | 'multi';
type EncryptionMode = 'none' | 'home' | 'full';
type BootMode = 'single' | 'dual';
type SymptomId = 'network' | 'display' | 'boot' | 'packages' | 'audio' | 'performance';
type SkillTarget = 'codex' | 'agents' | 'local';
type CommandRiskLevel = 'critical' | 'warning' | 'review';

const skill = registry.skills[0];

const text = {
  zh: {
    title: 'Debian 交互工具',
    subtitle: '本地运行的选择器和向导。不会上传数据，也不会自动修改系统。',
    badge: '本地运行',
    copy: '复制',
    copied: '已复制',
    recommended: '推荐',
    why: '原因',
    next: '下一步',
    notes: '注意事项',
    output: '输出',
    commands: '只读检查',
    reviewBeforeUse: '应用前先核对发行版代号、镜像站、组件和当前系统状态。',
    tabs: {
      mirror: '镜像源',
      install: '安装方式',
      desktop: '桌面环境',
      partition: '分区方案',
      troubleshoot: '排障向导',
      safety: '命令安全',
      skills: 'AI Skills',
    },
    mirror: {
      title: '镜像源选择器',
      release: '发行版',
      mirror: '镜像站',
      components: '组件范围',
      snippet: 'deb822 sources 建议',
      command: '编辑命令',
      docs: '查看 deb822 源格式',
    },
    install: {
      title: '安装方式选择器',
      device: '设备',
      goal: '目标',
      risk: '风险偏好',
      docs: '查看安装指南',
    },
    desktop: {
      title: '桌面环境选择器',
      hardware: '硬件性能',
      workflow: '工作流',
      docs: '查看桌面环境',
    },
    partition: {
      title: '分区方案生成器',
      disk: '磁盘',
      boot: '启动模式',
      encryption: '加密',
      docs: '查看磁盘管理',
    },
    troubleshoot: {
      title: '排障问诊向导',
      symptom: '问题现象',
      docs: '查看排障文档',
    },
    safety: {
      title: '命令安全检查器',
      input: '粘贴要检查的命令',
      placeholder: '每行一个命令。示例：sudo apt update',
      summarySafe: '未命中已知高风险模式',
      summaryReview: '需要人工复核',
      summaryWarning: '发现高风险命令',
      summaryCritical: '发现应阻止的危险命令',
      noFindings:
        '没有发现远程脚本管道执行、递归强删、危险磁盘写入或 SSH 安全降级等模式。仍需确认命令来源、路径和当前机器状态。',
      docs: '查看 AI Skills 安全边界',
      critical: '阻止',
      warning: '高风险',
      review: '复核',
      safer: '更安全做法',
      share: '复制分享链接',
      shareCopied: '链接已复制',
    },
    skills: {
      title: 'AI Skills 安装命令生成器',
      target: '安装位置',
      replace: '替换已有安装',
      install: '安装命令',
      validate: '验证命令',
      docs: '查看 AI Skills 文档',
      targetNote: '命令需要在 DebianClub 仓库根目录执行。',
    },
  },
  en: {
    title: 'Debian Interactive Tools',
    subtitle: 'Local selectors and wizards. No data upload and no automatic system changes.',
    badge: 'Local tools',
    copy: 'Copy',
    copied: 'Copied',
    recommended: 'Recommended',
    why: 'Why',
    next: 'Next step',
    notes: 'Notes',
    output: 'Output',
    commands: 'Read-only checks',
    reviewBeforeUse: 'Before applying, verify the release codename, mirror, components, and current system state.',
    tabs: {
      mirror: 'Mirrors',
      install: 'Install',
      desktop: 'Desktop',
      partition: 'Partitions',
      troubleshoot: 'Troubleshoot',
      safety: 'Command Safety',
      skills: 'AI Skills',
    },
    mirror: {
      title: 'Mirror Selector',
      release: 'Release',
      mirror: 'Mirror',
      components: 'Components',
      snippet: 'Suggested deb822 sources',
      command: 'Edit command',
      docs: 'Read deb822 sources guide',
    },
    install: {
      title: 'Install Planner',
      device: 'Device',
      goal: 'Goal',
      risk: 'Risk preference',
      docs: 'Read installation guide',
    },
    desktop: {
      title: 'Desktop Picker',
      hardware: 'Hardware',
      workflow: 'Workflow',
      docs: 'Read desktop guide',
    },
    partition: {
      title: 'Partition Planner',
      disk: 'Disk',
      boot: 'Boot mode',
      encryption: 'Encryption',
      docs: 'Read disk management',
    },
    troubleshoot: {
      title: 'Troubleshooting Wizard',
      symptom: 'Symptom',
      docs: 'Read troubleshooting docs',
    },
    safety: {
      title: 'Command Safety Checker',
      input: 'Paste commands to check',
      placeholder: 'One command per line. Example: sudo apt update',
      summarySafe: 'No known high-risk pattern found',
      summaryReview: 'Manual review needed',
      summaryWarning: 'High-risk command found',
      summaryCritical: 'Dangerous command should be blocked',
      noFindings:
        'No remote script piping, recursive force deletion, destructive disk writes, or SSH security downgrades were detected. Still verify command source, paths, and the current machine state.',
      docs: 'Read AI Skills safety boundaries',
      critical: 'Block',
      warning: 'High risk',
      review: 'Review',
      safer: 'Safer approach',
      share: 'Copy share link',
      shareCopied: 'Link copied',
    },
    skills: {
      title: 'AI Skills Installer',
      target: 'Install target',
      replace: 'Replace existing install',
      install: 'Install command',
      validate: 'Validation command',
      docs: 'Read AI Skills docs',
      targetNote: 'Run the command from the DebianClub repository root.',
    },
  },
} as const;

const mirrors: Record<MirrorId, { label: string; archive: string; security: string; detail: Record<ToolLanguage, string> }> = {
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

const releaseLabels: Record<ReleaseId, string> = {
  trixie: 'Debian 13 Trixie',
  bookworm: 'Debian 12 Bookworm',
};

const componentSets: Record<ComponentMode, { value: string; label: Record<ToolLanguage, string>; note: Record<ToolLanguage, string> }> = {
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

const targetPaths: Record<SkillTarget, { label: Record<ToolLanguage, string>; target: string }> = {
  codex: { label: { zh: 'Codex 默认目录', en: 'Codex default' }, target: '"${CODEX_HOME:-$HOME/.codex}/skills"' },
  agents: { label: { zh: 'Agents 目录', en: 'Agents directory' }, target: '"$HOME/.agents/skills"' },
  local: { label: { zh: '仓库内本地目录', en: 'Local repository directory' }, target: './skills-local' },
};

const docsHref = {
  zh: {
    deb822: '/administration/deb822',
    install: '/basics/installation',
    desktop: '/basics/desktop-environments',
    disk: '/administration/disk-management',
    troubleshoot: '/troubleshooting/faq',
    safety: '/ai/skills/safety',
    skills: '/ai/skills/install',
  },
  en: {
    deb822: '/en/administration/deb822',
    install: '/en/basics/installation',
    desktop: '/en/basics/desktop-environments',
    disk: '/en/administration/disk-management',
    troubleshoot: '/en/troubleshooting/faq',
    safety: '/en/ai/skills/safety',
    skills: '/en/ai/skills/install',
  },
};

interface CommandRiskRule {
  id: string;
  level: CommandRiskLevel;
  pattern: RegExp;
  title: Record<ToolLanguage, string>;
  detail: Record<ToolLanguage, string>;
  safer: Record<ToolLanguage, string>;
}

interface CommandFinding extends CommandRiskRule {
  line: number;
  command: string;
}

const commandRiskRules: CommandRiskRule[] = [
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

const riskRank: Record<CommandRiskLevel, number> = {
  review: 1,
  warning: 2,
  critical: 3,
};

function analyzeCommandRisk(value: string): CommandFinding[] {
  return value
    .split(/\r?\n/)
    .flatMap((line, index) => {
      const command = line.trim();
      if (!command || command.startsWith('#')) return [];

      return commandRiskRules
        .filter((rule) => rule.pattern.test(command))
        .map((rule) => ({
          ...rule,
          line: index + 1,
          command,
        }));
    });
}

function highestRisk(findings: CommandFinding[]): CommandRiskLevel | null {
  return findings.reduce<CommandRiskLevel | null>((highest, finding) => {
    if (!highest || riskRank[finding.level] > riskRank[highest]) return finding.level;
    return highest;
  }, null);
}

function classNames(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(' ');
}

async function copyText(value: string) {
  async function fallbackCopy() {
    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
    } else {
      await fallbackCopy();
    }
  } catch {
    await fallbackCopy();
  }
}

function CopyButton({ value, label, copiedLabel }: { value: string; label: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await copyText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  const Icon = copied ? Check : Clipboard;

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-8 items-center gap-1.5 rounded-md border border-fd-border bg-fd-background px-2.5 text-xs font-medium text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
      title={copied ? copiedLabel : label}
      aria-label={copied ? copiedLabel : label}
    >
      <Icon className="size-3.5" />
      <span>{copied ? copiedLabel : label}</span>
    </button>
  );
}

function ButtonGroup<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: Array<{ value: T; label: string; description?: string }>;
  onChange: (value: T) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          aria-pressed={value === option.value}
          className={classNames(
            'min-h-14 rounded-md border px-3 py-2 text-left transition-colors',
            value === option.value
              ? 'border-fd-primary bg-fd-primary/10 text-fd-primary'
              : 'border-fd-border bg-fd-background text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground',
          )}
        >
          <span className="block text-sm font-medium">{option.label}</span>
          {option.description ? <span className="mt-1 block text-xs opacity-80">{option.description}</span> : null}
        </button>
      ))}
    </div>
  );
}

function ResultPanel({
  lang,
  title,
  children,
}: {
  lang: ToolLanguage;
  title: string;
  children: ReactNode;
}) {
  const t = text[lang];

  return (
    <section className="rounded-md border border-fd-border bg-fd-card p-4">
      <div className="mb-3 flex items-center gap-2">
        <ShieldCheck className="size-4 text-emerald-600" />
        <h3 className="m-0 text-base font-semibold">{title}</h3>
      </div>
      <div className="space-y-4 text-sm leading-6 text-fd-muted-foreground">{children}</div>
      <div className="mt-4 flex items-start gap-2 rounded-md border border-amber-500/30 bg-amber-500/10 p-3 text-xs leading-5 text-amber-700 dark:text-amber-300">
        <AlertTriangle className="mt-0.5 size-4 shrink-0" />
        <span>{t.reviewBeforeUse}</span>
      </div>
    </section>
  );
}

function CodeBlock({ lang, value }: { lang: ToolLanguage; value: string }) {
  const t = text[lang];

  return (
    <div className="overflow-hidden rounded-md border border-fd-border bg-fd-background">
      <div className="flex items-center justify-between gap-3 border-b border-fd-border px-3 py-2">
        <span className="text-xs font-medium text-fd-muted-foreground">{t.output}</span>
        <CopyButton value={value} label={t.copy} copiedLabel={t.copied} />
      </div>
      <pre className="m-0 max-h-80 overflow-auto p-3 text-xs leading-5">
        <code>{value}</code>
      </pre>
    </div>
  );
}

function MirrorTool({ lang }: { lang: ToolLanguage }) {
  const t = text[lang];
  const [release, setRelease] = useState<ReleaseId>('trixie');
  const [mirror, setMirror] = useState<MirrorId>(lang === 'zh' ? 'ustc' : 'official');
  const [components, setComponents] = useState<ComponentMode>('firmware');

  const selectedMirror = mirrors[mirror];
  const selectedComponents = componentSets[components];
  const snippet = useMemo(() => {
    const suites = `${release} ${release}-updates`;
    return `Types: deb
URIs: ${selectedMirror.archive}
Suites: ${suites}
Components: ${selectedComponents.value}
Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg

Types: deb
URIs: ${selectedMirror.security}
Suites: ${release}-security
Components: ${selectedComponents.value}
Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg`;
  }, [release, selectedComponents.value, selectedMirror.archive, selectedMirror.security]);

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.9fr)]">
      <section className="space-y-5">
        <div>
          <h3 className="mb-2 text-sm font-medium">{t.mirror.release}</h3>
          <ButtonGroup
            value={release}
            onChange={setRelease}
            options={[
              { value: 'trixie', label: releaseLabels.trixie, description: lang === 'zh' ? '当前 stable' : 'Current stable' },
              {
                value: 'bookworm',
                label: releaseLabels.bookworm,
                description: lang === 'zh' ? 'oldstable / 迁移期' : 'oldstable / migration period',
              },
            ]}
          />
        </div>

        <div>
          <h3 className="mb-2 text-sm font-medium">{t.mirror.mirror}</h3>
          <ButtonGroup
            value={mirror}
            onChange={setMirror}
            options={(Object.keys(mirrors) as MirrorId[]).map((id) => ({
              value: id,
              label: mirrors[id].label,
              description: mirrors[id].detail[lang],
            }))}
          />
        </div>

        <div>
          <h3 className="mb-2 text-sm font-medium">{t.mirror.components}</h3>
          <ButtonGroup
            value={components}
            onChange={setComponents}
            options={(Object.keys(componentSets) as ComponentMode[]).map((id) => ({
              value: id,
              label: componentSets[id].label[lang],
              description: componentSets[id].note[lang],
            }))}
          />
        </div>
      </section>

      <ResultPanel lang={lang} title={t.mirror.snippet}>
        <p>{selectedComponents.note[lang]}</p>
        <CodeBlock lang={lang} value={snippet} />
        <div>
          <div className="mb-2 font-medium text-fd-foreground">{t.mirror.command}</div>
          <CodeBlock lang={lang} value="sudoedit /etc/apt/sources.list.d/debian.sources" />
        </div>
        <a className="text-fd-primary no-underline hover:underline" href={docsHref[lang].deb822}>
          {t.mirror.docs}
        </a>
      </ResultPanel>
    </div>
  );
}

function installRecommendation(device: InstallDevice, goal: InstallGoal, risk: RiskLevel, lang: ToolLanguage) {
  if (device === 'vm' || risk === 'low') {
    return {
      title: lang === 'zh' ? '先用虚拟机或 Live USB 验证' : 'Start with a VM or Live USB',
      why:
        lang === 'zh'
          ? '风险最低，不改变磁盘分区，适合学习、试装和硬件兼容性确认。'
          : 'Lowest risk: no disk repartitioning, suitable for learning, trial installs, and hardware checks.',
      next:
        lang === 'zh'
          ? ['下载 live 或 netinst 镜像', '在虚拟机或 Live USB 中测试网络、显示、音频和睡眠', '确认后再决定是否完整安装']
          : ['Download a live or netinst image', 'Test networking, display, audio, and suspend', 'Decide on full install after validation'],
    };
  }

  if (device === 'server' || goal === 'server') {
    return {
      title: lang === 'zh' ? '使用 netinst 做最小服务器安装' : 'Use netinst for a minimal server install',
      why:
        lang === 'zh'
          ? '服务器更重视可控包集、远程维护、日志和备份。图形桌面通常不是默认需求。'
          : 'Servers benefit from controlled package sets, remote maintenance, logs, and backups. A desktop is usually unnecessary.',
      next:
        lang === 'zh'
          ? ['准备有线网络或远程控制台', '选择 SSH server 和 standard system utilities', '安装后先配置安全更新、防火墙和备份']
          : ['Prepare wired network or remote console', 'Select SSH server and standard system utilities', 'Configure updates, firewall, and backup first'],
    };
  }

  if (goal === 'ai') {
    return {
      title: lang === 'zh' ? '先完整安装，再处理 GPU 驱动' : 'Full install first, then GPU drivers',
      why:
        lang === 'zh'
          ? '本地 AI 更依赖稳定驱动、内核头文件和恢复路径。先保证系统可启动，再安装 NVIDIA 或 ROCm 相关组件。'
          : 'Local AI depends on stable drivers, kernel headers, and recovery paths. Boot reliably first, then add NVIDIA or ROCm components.',
      next:
        lang === 'zh'
          ? ['选择 Debian 13 stable', '保留可进入 TTY 的回退路径', '按硬件与驱动中心处理 GPU']
          : ['Choose Debian 13 stable', 'Keep a TTY fallback path', 'Use the hardware driver center for GPU setup'],
    };
  }

  return {
    title: lang === 'zh' ? '完整安装 Debian 13 stable' : 'Full install Debian 13 stable',
    why:
      lang === 'zh'
        ? '适合主力桌面或开发工作站，能获得完整支持周期和较新的桌面/工具链。'
        : 'Best for a primary desktop or development workstation with a full support runway and newer desktop/toolchain.',
    next:
      lang === 'zh'
        ? ['下载 netinst 或 live 镜像', '安装前备份数据', '安装后补齐 firmware、编辑器和开发工具']
        : ['Download netinst or live image', 'Back up data before installation', 'Add firmware, editor, and development tools after install'],
  };
}

function InstallTool({ lang }: { lang: ToolLanguage }) {
  const t = text[lang];
  const [device, setDevice] = useState<InstallDevice>('laptop');
  const [goal, setGoal] = useState<InstallGoal>('daily');
  const [risk, setRisk] = useState<RiskLevel>('balanced');
  const result = installRecommendation(device, goal, risk, lang);

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.85fr)]">
      <section className="space-y-5">
        <div>
          <h3 className="mb-2 text-sm font-medium">{t.install.device}</h3>
          <ButtonGroup
            value={device}
            onChange={setDevice}
            options={[
              { value: 'vm', label: lang === 'zh' ? '虚拟机' : 'Virtual machine' },
              { value: 'laptop', label: lang === 'zh' ? '笔记本' : 'Laptop' },
              { value: 'desktop', label: lang === 'zh' ? '台式机' : 'Desktop PC' },
              { value: 'server', label: lang === 'zh' ? '服务器' : 'Server' },
            ]}
          />
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium">{t.install.goal}</h3>
          <ButtonGroup
            value={goal}
            onChange={setGoal}
            options={[
              { value: 'learn', label: lang === 'zh' ? '学习体验' : 'Learning' },
              { value: 'daily', label: lang === 'zh' ? '日常桌面' : 'Daily desktop' },
              { value: 'server', label: lang === 'zh' ? '服务器' : 'Server' },
              { value: 'dev', label: lang === 'zh' ? '开发工作站' : 'Development' },
              { value: 'ai', label: lang === 'zh' ? '本地 AI' : 'Local AI' },
            ]}
          />
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium">{t.install.risk}</h3>
          <ButtonGroup
            value={risk}
            onChange={setRisk}
            options={[
              { value: 'low', label: lang === 'zh' ? '最低风险' : 'Lowest risk' },
              { value: 'balanced', label: lang === 'zh' ? '平衡' : 'Balanced' },
              { value: 'direct', label: lang === 'zh' ? '直接安装' : 'Direct install' },
            ]}
          />
        </div>
      </section>

      <ResultPanel lang={lang} title={result.title}>
        <div>
          <div className="mb-1 font-medium text-fd-foreground">{t.why}</div>
          <p>{result.why}</p>
        </div>
        <div>
          <div className="mb-1 font-medium text-fd-foreground">{t.next}</div>
          <ol className="m-0 list-decimal space-y-1 pl-5">
            {result.next.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
        <a className="text-fd-primary no-underline hover:underline" href={docsHref[lang].install}>
          {t.install.docs}
        </a>
      </ResultPanel>
    </div>
  );
}

function desktopRecommendation(hardware: DesktopHardware, workflow: DesktopWorkflow, lang: ToolLanguage) {
  if (hardware === 'old' || workflow === 'light') {
    return {
      title: 'Xfce',
      why: lang === 'zh' ? '资源占用低，行为稳定，适合旧机器、远程桌面和轻量工作流。' : 'Low resource use and stable behavior for older machines, remote desktops, and lightweight workflows.',
      packages: 'sudo apt install task-xfce-desktop',
    };
  }
  if (workflow === 'custom') {
    return {
      title: 'KDE Plasma',
      why: lang === 'zh' ? '可定制性强，适合需要细调窗口、快捷键、外观和多屏体验的用户。' : 'Highly configurable for users who tune windows, shortcuts, appearance, and multi-monitor behavior.',
      packages: 'sudo apt install task-kde-desktop',
    };
  }
  if (workflow === 'creative' && hardware === 'modern') {
    return {
      title: 'GNOME',
      why: lang === 'zh' ? '默认体验统一，Wayland 支持成熟，适合现代笔记本和触控板工作流。' : 'Cohesive defaults and mature Wayland support for modern laptops and touchpad-driven workflows.',
      packages: 'sudo apt install task-gnome-desktop',
    };
  }
  return {
    title: 'GNOME',
    why: lang === 'zh' ? '默认推荐，文档和社区覆盖最好，适合多数新装用户。' : 'Default recommendation with strong documentation and community coverage for most new users.',
    packages: 'sudo apt install task-gnome-desktop',
  };
}

function DesktopTool({ lang }: { lang: ToolLanguage }) {
  const t = text[lang];
  const [hardware, setHardware] = useState<DesktopHardware>('modern');
  const [workflow, setWorkflow] = useState<DesktopWorkflow>('simple');
  const result = desktopRecommendation(hardware, workflow, lang);

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.85fr)]">
      <section className="space-y-5">
        <div>
          <h3 className="mb-2 text-sm font-medium">{t.desktop.hardware}</h3>
          <ButtonGroup
            value={hardware}
            onChange={setHardware}
            options={[
              { value: 'old', label: lang === 'zh' ? '旧机器 / 4GB RAM' : 'Older / 4GB RAM' },
              { value: 'modest', label: lang === 'zh' ? '普通机器 / 8GB RAM' : 'Modest / 8GB RAM' },
              { value: 'modern', label: lang === 'zh' ? '现代机器 / 16GB+' : 'Modern / 16GB+' },
            ]}
          />
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium">{t.desktop.workflow}</h3>
          <ButtonGroup
            value={workflow}
            onChange={setWorkflow}
            options={[
              { value: 'simple', label: lang === 'zh' ? '默认简单' : 'Simple defaults' },
              { value: 'custom', label: lang === 'zh' ? '高度自定义' : 'Highly customizable' },
              { value: 'light', label: lang === 'zh' ? '轻量优先' : 'Lightweight first' },
              { value: 'creative', label: lang === 'zh' ? '触控板 / 创作' : 'Touchpad / creative' },
            ]}
          />
        </div>
      </section>

      <ResultPanel lang={lang} title={`${t.recommended}: ${result.title}`}>
        <p>{result.why}</p>
        <CodeBlock lang={lang} value={result.packages} />
        <a className="text-fd-primary no-underline hover:underline" href={docsHref[lang].desktop}>
          {t.desktop.docs}
        </a>
      </ResultPanel>
    </div>
  );
}

function partitionPlan(disk: PartitionDisk, boot: BootMode, encryption: EncryptionMode, lang: ToolLanguage) {
  const efi = boot === 'dual' ? '512 MB - 1 GB existing EFI' : '512 MB - 1 GB EFI';
  const rootSize = disk === 'small' ? '30-50 GB' : disk === 'large' || disk === 'multi' ? '80-120 GB' : '50-80 GB';
  const home = disk === 'small' ? 'rest of disk if needed' : 'remaining space';
  const rows = [
    ['EFI', efi, lang === 'zh' ? 'FAT32，挂载到 /boot/efi' : 'FAT32, mounted at /boot/efi'],
    ['/boot', encryption === 'full' ? '1 GB' : lang === 'zh' ? '可合并到 /' : 'Can live inside /', encryption === 'full' ? (lang === 'zh' ? '全盘加密时建议单独保留' : 'Recommended separately for full-disk encryption') : (lang === 'zh' ? '普通安装可不单独分区' : 'Optional for normal installs')],
    ['/', rootSize, lang === 'zh' ? 'ext4，系统和应用' : 'ext4 for system and applications'],
    ['/home', home, lang === 'zh' ? '用户数据，方便重装保留' : 'User data, easier to preserve across reinstalls'],
  ];
  if (disk === 'multi') rows.push([lang === 'zh' ? '数据盘' : 'Data disk', lang === 'zh' ? '单独磁盘' : 'Separate disk', lang === 'zh' ? '服务数据、备份或媒体库' : 'Service data, backups, or media library']);
  return rows;
}

function PartitionTool({ lang }: { lang: ToolLanguage }) {
  const t = text[lang];
  const [disk, setDisk] = useState<PartitionDisk>('standard');
  const [boot, setBoot] = useState<BootMode>('single');
  const [encryption, setEncryption] = useState<EncryptionMode>('none');
  const plan = partitionPlan(disk, boot, encryption, lang);
  const planText = plan.map((row) => row.join(' | ')).join('\n');

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.9fr)]">
      <section className="space-y-5">
        <div>
          <h3 className="mb-2 text-sm font-medium">{t.partition.disk}</h3>
          <ButtonGroup
            value={disk}
            onChange={setDisk}
            options={[
              { value: 'small', label: lang === 'zh' ? '小磁盘 < 256GB' : 'Small < 256GB' },
              { value: 'standard', label: lang === 'zh' ? '常规 512GB - 1TB' : 'Standard 512GB - 1TB' },
              { value: 'large', label: lang === 'zh' ? '大容量 2TB+' : 'Large 2TB+' },
              { value: 'multi', label: lang === 'zh' ? '多磁盘' : 'Multiple disks' },
            ]}
          />
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium">{t.partition.boot}</h3>
          <ButtonGroup
            value={boot}
            onChange={setBoot}
            options={[
              { value: 'single', label: lang === 'zh' ? '只装 Debian' : 'Debian only' },
              { value: 'dual', label: lang === 'zh' ? '与 Windows 双系统' : 'Dual boot with Windows' },
            ]}
          />
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium">{t.partition.encryption}</h3>
          <ButtonGroup
            value={encryption}
            onChange={setEncryption}
            options={[
              { value: 'none', label: lang === 'zh' ? '不加密' : 'No encryption' },
              { value: 'home', label: lang === 'zh' ? '只保护用户数据' : 'Protect user data' },
              { value: 'full', label: lang === 'zh' ? '全盘加密' : 'Full-disk encryption' },
            ]}
          />
        </div>
      </section>

      <ResultPanel lang={lang} title={t.partition.title}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-96 border-collapse text-sm">
            <thead>
              <tr className="border-b border-fd-border text-left text-fd-foreground">
                <th className="py-2 pr-3">{lang === 'zh' ? '分区' : 'Partition'}</th>
                <th className="py-2 pr-3">{lang === 'zh' ? '大小' : 'Size'}</th>
                <th className="py-2">{lang === 'zh' ? '说明' : 'Notes'}</th>
              </tr>
            </thead>
            <tbody>
              {plan.map(([name, size, note]) => (
                <tr key={name} className="border-b border-fd-border/60">
                  <td className="py-2 pr-3 font-mono text-fd-foreground">{name}</td>
                  <td className="py-2 pr-3">{size}</td>
                  <td className="py-2">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CopyButton value={planText} label={t.copy} copiedLabel={t.copied} />
        <a className="block text-fd-primary no-underline hover:underline" href={docsHref[lang].disk}>
          {t.partition.docs}
        </a>
      </ResultPanel>
    </div>
  );
}

const symptomData: Record<SymptomId, { title: Record<ToolLanguage, string>; commands: string[]; links: Record<ToolLanguage, Array<{ label: string; href: string }>> }> = {
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

function TroubleshootTool({ lang }: { lang: ToolLanguage }) {
  const t = text[lang];
  const [symptom, setSymptom] = useState<SymptomId>('network');
  const data = symptomData[symptom];

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.85fr)]">
      <section>
        <h3 className="mb-2 text-sm font-medium">{t.troubleshoot.symptom}</h3>
        <ButtonGroup
          value={symptom}
          onChange={setSymptom}
          options={(Object.keys(symptomData) as SymptomId[]).map((id) => ({ value: id, label: symptomData[id].title[lang] }))}
        />
      </section>

      <ResultPanel lang={lang} title={data.title[lang]}>
        <div>
          <div className="mb-2 font-medium text-fd-foreground">{t.commands}</div>
          <CodeBlock lang={lang} value={data.commands.join('\n')} />
        </div>
        <div>
          <div className="mb-2 font-medium text-fd-foreground">{t.next}</div>
          <div className="flex flex-wrap gap-2">
            {data.links[lang].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md border border-fd-border px-2.5 py-1.5 text-sm text-fd-primary no-underline hover:bg-fd-accent"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <a className="text-fd-primary no-underline hover:underline" href={docsHref[lang].troubleshoot}>
          {t.troubleshoot.docs}
        </a>
      </ResultPanel>
    </div>
  );
}

const riskPanelClasses: Record<CommandRiskLevel, string> = {
  critical: 'border-red-500/40 bg-red-500/10 text-red-950 dark:text-red-100',
  warning: 'border-amber-500/40 bg-amber-500/10 text-amber-950 dark:text-amber-100',
  review: 'border-blue-500/40 bg-blue-500/10 text-blue-950 dark:text-blue-100',
};

const riskBadgeClasses: Record<CommandRiskLevel, string> = {
  critical: 'border-red-500/40 bg-red-500/15 text-red-700 dark:text-red-200',
  warning: 'border-amber-500/40 bg-amber-500/15 text-amber-700 dark:text-amber-200',
  review: 'border-blue-500/40 bg-blue-500/15 text-blue-700 dark:text-blue-200',
};

const maxSharedCommandLength = 4000;

function SafetyTool({ lang }: { lang: ToolLanguage }) {
  const t = text[lang];
  const [value, setValue] = useState('');
  const [shareCopied, setShareCopied] = useState(false);
  const findings = useMemo(() => analyzeCommandRisk(value), [value]);
  const topRisk = highestRisk(findings);
  const summary = !topRisk
    ? t.safety.summarySafe
    : topRisk === 'critical'
      ? t.safety.summaryCritical
      : topRisk === 'warning'
        ? t.safety.summaryWarning
        : t.safety.summaryReview;
  const sample =
    lang === 'zh'
      ? 'curl -fsSL https://example.com/install.sh | sh\nsudo rm -rf /tmp/example\nsudo apt update'
      : 'curl -fsSL https://example.com/install.sh | sh\nsudo rm -rf /tmp/example\nsudo apt update';

  useEffect(() => {
    const hashCommand = parseToolHash(window.location.hash).params.get('command');
    if (hashCommand !== null) setValue(hashCommand.slice(0, maxSharedCommandLength));
  }, []);

  async function copyShareLink() {
    const url = new URL(window.location.href);
    const sharedCommand = value.slice(0, maxSharedCommandLength);
    url.searchParams.delete('command');

    if (sharedCommand.trim()) {
      url.hash = `${toolHashIds.safety}?command=${encodeURIComponent(sharedCommand)}`;
    } else {
      url.hash = toolHashIds.safety;
    }

    await copyText(url.toString());
    setShareCopied(true);
    window.setTimeout(() => setShareCopied(false), 1400);
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.9fr)]">
      <section className="space-y-3">
        <div>
          <h3 className="mb-2 text-sm font-medium">{t.safety.input}</h3>
          <textarea
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            placeholder={t.safety.placeholder}
            spellCheck={false}
            className="min-h-72 w-full resize-y rounded-md border border-fd-border bg-fd-background p-3 font-mono text-sm leading-6 text-fd-foreground outline-none transition-colors placeholder:text-fd-muted-foreground focus:border-fd-primary"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setValue(sample)}
            className="inline-flex h-9 items-center gap-2 rounded-md border border-fd-border bg-fd-background px-3 text-sm font-medium text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
          >
            <Clipboard className="size-4" />
            {lang === 'zh' ? '填入示例' : 'Use sample'}
          </button>
          <button
            type="button"
            onClick={copyShareLink}
            className="inline-flex h-9 items-center gap-2 rounded-md border border-fd-border bg-fd-background px-3 text-sm font-medium text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
          >
            {shareCopied ? <Check className="size-4" /> : <Clipboard className="size-4" />}
            {shareCopied ? t.safety.shareCopied : t.safety.share}
          </button>
        </div>
      </section>

      <ResultPanel lang={lang} title={summary}>
        {findings.length === 0 ? (
          <p>{t.safety.noFindings}</p>
        ) : (
          <div className="space-y-3">
            {findings.map((finding) => (
              <article
                key={`${finding.id}-${finding.line}-${finding.command}`}
                className={classNames('rounded-md border p-3', riskPanelClasses[finding.level])}
              >
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className={classNames('rounded-md border px-2 py-0.5 text-xs font-semibold', riskBadgeClasses[finding.level])}>
                    {t.safety[finding.level]}
                  </span>
                  <span className="text-xs opacity-80">{lang === 'zh' ? `第 ${finding.line} 行` : `Line ${finding.line}`}</span>
                </div>
                <h4 className="m-0 text-sm font-semibold">{finding.title[lang]}</h4>
                <p className="mt-1 text-sm opacity-85">{finding.detail[lang]}</p>
                <pre className="mt-2 overflow-auto rounded-md border border-current/15 bg-fd-background/80 p-2 text-xs leading-5 text-fd-foreground">
                  <code>{finding.command}</code>
                </pre>
                <div className="mt-2 text-sm">
                  <span className="font-medium">{t.safety.safer}: </span>
                  <span>{finding.safer[lang]}</span>
                </div>
              </article>
            ))}
          </div>
        )}
        <a className="text-fd-primary no-underline hover:underline" href={docsHref[lang].safety}>
          {t.safety.docs}
        </a>
      </ResultPanel>
    </div>
  );
}

function SkillsTool({ lang }: { lang: ToolLanguage }) {
  const t = text[lang];
  const [target, setTarget] = useState<SkillTarget>('codex');
  const [replace, setReplace] = useState(false);
  const targetPath = targetPaths[target].target;
  const installCommand = `bash ${skill.install.local_script.replace(
    ' debian-linux-reliability',
    `${replace ? ' --replace' : ''} --target ${targetPath} debian-linux-reliability`,
  )}`;
  const validateCommand = `bash ${skill.validation.script}`;

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.85fr)]">
      <section className="space-y-5">
        <div>
          <h3 className="mb-2 text-sm font-medium">{t.skills.target}</h3>
          <ButtonGroup
            value={target}
            onChange={setTarget}
            options={(Object.keys(targetPaths) as SkillTarget[]).map((id) => ({
              value: id,
              label: targetPaths[id].label[lang],
              description: targetPaths[id].target,
            }))}
          />
        </div>
        <label className="flex items-center gap-3 rounded-md border border-fd-border bg-fd-background p-3 text-sm">
          <input
            type="checkbox"
            checked={replace}
            onChange={(event) => setReplace(event.currentTarget.checked)}
            className="size-4"
          />
          <span>{t.skills.replace}</span>
        </label>
      </section>

      <ResultPanel lang={lang} title={`${skill.display_name} ${skill.version}`}>
        <p>{t.skills.targetNote}</p>
        <div>
          <div className="mb-2 font-medium text-fd-foreground">{t.skills.install}</div>
          <CodeBlock lang={lang} value={installCommand} />
        </div>
        <div>
          <div className="mb-2 font-medium text-fd-foreground">{t.skills.validate}</div>
          <CodeBlock lang={lang} value={validateCommand} />
        </div>
        <a className="text-fd-primary no-underline hover:underline" href={docsHref[lang].skills}>
          {t.skills.docs}
        </a>
      </ResultPanel>
    </div>
  );
}

const toolIcons: Record<ToolId, ComponentType<{ className?: string }>> = {
  mirror: Network,
  install: Download,
  desktop: Monitor,
  partition: HardDrive,
  troubleshoot: HelpCircle,
  safety: ShieldCheck,
  skills: Bot,
};

const toolHashIds: Record<ToolId, string> = {
  mirror: 'mirrors',
  install: 'install',
  desktop: 'desktop',
  partition: 'partitions',
  troubleshoot: 'troubleshoot',
  safety: 'command-safety',
  skills: 'ai-skills',
};

const toolIdByHash = Object.fromEntries(
  Object.entries(toolHashIds).map(([id, hash]) => [hash, id]),
) as Partial<Record<string, ToolId>>;

function normalizeToolHash(hash: string) {
  const value = hash.replace(/^#/, '');

  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function parseToolHash(hash: string) {
  const value = hash.replace(/^#/, '');
  const [rawId, query = ''] = value.split('?');

  return {
    id: normalizeToolHash(rawId),
    params: new URLSearchParams(query),
  };
}

function ToolBody({ active, lang }: { active: ToolId; lang: ToolLanguage }) {
  switch (active) {
    case 'mirror':
      return <MirrorTool lang={lang} />;
    case 'install':
      return <InstallTool lang={lang} />;
    case 'desktop':
      return <DesktopTool lang={lang} />;
    case 'partition':
      return <PartitionTool lang={lang} />;
    case 'troubleshoot':
      return <TroubleshootTool lang={lang} />;
    case 'safety':
      return <SafetyTool lang={lang} />;
    case 'skills':
      return <SkillsTool lang={lang} />;
  }
}

export function InteractiveTools({ lang = 'zh' }: { lang?: ToolLanguage }) {
  const t = text[lang];
  const [active, setActive] = useState<ToolId>('mirror');
  const tools = Object.keys(t.tabs) as ToolId[];
  const AccentIcon =
    active === 'skills'
      ? Sparkles
      : active === 'partition'
        ? Database
        : active === 'desktop'
          ? Cpu
          : active === 'install'
            ? Laptop
            : active === 'troubleshoot'
              ? Wrench
              : active === 'safety'
                ? ShieldCheck
                : Settings2;

  useEffect(() => {
    function syncFromHash() {
      const hash = parseToolHash(window.location.hash).id;
      const next = toolIdByHash[hash];
      if (next) setActive(next);
    }

    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  function selectTool(id: ToolId) {
    setActive(id);
    const nextUrl = `${window.location.pathname}${window.location.search}#${toolHashIds[id]}`;
    window.history.replaceState(null, '', nextUrl);
  }

  return (
    <section className="not-prose my-8 overflow-hidden rounded-lg border border-fd-border bg-fd-card text-fd-card-foreground">
      <div className="border-b border-fd-border bg-fd-muted/30 p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-md border border-fd-border bg-fd-background px-2.5 py-1 text-xs font-medium text-fd-muted-foreground">
              <AccentIcon className="size-3.5" />
              {t.badge}
            </div>
            <h2 className="m-0 text-2xl font-semibold tracking-normal">{t.title}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-fd-muted-foreground">{t.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="border-b border-fd-border p-3">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-7">
          {tools.map((id) => {
            const Icon = toolIcons[id];
            return (
              <button
                key={id}
                type="button"
                onClick={() => selectTool(id)}
                aria-pressed={active === id}
                className={classNames(
                  'flex min-h-11 items-center justify-center gap-2 rounded-md border px-2 text-sm font-medium transition-colors',
                  active === id
                    ? 'border-fd-primary bg-fd-primary/10 text-fd-primary'
                    : 'border-fd-border bg-fd-background text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground',
                )}
              >
                <Icon className="size-4" />
                <span>{t.tabs[id]}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-5">
        <ToolBody active={active} lang={lang} />
      </div>
    </section>
  );
}
