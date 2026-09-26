import {
  commandRiskRules,
  componentSets,
  mirrors,
  riskRank,
} from './data.ts';
import type { CommandFinding } from './data.ts';
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
  ToolId,
  ToolLanguage,
  UpgradeCurrent,
  UpgradeExposure,
  UpgradeTarget,
} from './types';

export const toolHashIds: Record<ToolId, string> = {
  mirror: 'mirrors',
  install: 'install',
  desktop: 'desktop',
  partition: 'partitions',
  troubleshoot: 'troubleshoot',
  safety: 'command-safety',
  skills: 'ai-skills',
  upgrade: 'upgrade',
};

export const toolIdByHash = Object.fromEntries(
  Object.entries(toolHashIds).map(([id, hash]) => [hash, id]),
) as Partial<Record<string, ToolId>>;

export function classNames(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(' ');
}

export function hasRecordKey<T extends object>(record: T, key: string | null): key is Extract<keyof T, string> {
  return key !== null && Object.prototype.hasOwnProperty.call(record, key);
}

export function buildMirrorSnippet(release: ReleaseId, mirror: MirrorId, components: ComponentMode): string {
  const selectedMirror = mirrors[mirror];
  const suites = `${release} ${release}-updates`;

  return `Types: deb
URIs: ${selectedMirror.archive}
Suites: ${suites}
Components: ${componentSets[components].value}
Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg

Types: deb
URIs: ${selectedMirror.security}
Suites: ${release}-security
Components: ${componentSets[components].value}
Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg`;
}

export function analyzeCommandRisk(value: string): CommandFinding[] {
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

export function highestRisk(findings: CommandFinding[]): CommandRiskLevel | null {
  return findings.reduce<CommandRiskLevel | null>((highest, finding) => {
    if (!highest || riskRank[finding.level] > riskRank[highest]) return finding.level;
    return highest;
  }, null);
}

export function installRecommendation(device: InstallDevice, goal: InstallGoal, risk: RiskLevel, lang: ToolLanguage) {
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

export function desktopRecommendation(hardware: DesktopHardware, workflow: DesktopWorkflow, lang: ToolLanguage) {
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

export function partitionPlan(disk: PartitionDisk, boot: BootMode, encryption: EncryptionMode, lang: ToolLanguage) {
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

export function upgradeRecommendation(current: UpgradeCurrent, target: UpgradeTarget, exposure: UpgradeExposure, lang: ToolLanguage) {
  const publicFacing = exposure === 'public';
  const checks = [
    'cat /etc/debian_version',
    'apt update',
    'apt list --upgradable',
    'dpkg --audit',
    'apt-mark showhold',
    'systemctl --failed',
    'df -h',
    'find /etc/apt -type f -maxdepth 3 -print',
  ];

  if (current === 'trixie') {
    return {
      title: lang === 'zh' ? '保持 Debian 13 并持续更新' : 'Stay on Debian 13 and keep it updated',
      why:
        lang === 'zh'
          ? 'Debian 13 当前是 stable。除非你在做 Debian 14 适配测试，否则不需要迁移发行版。'
          : 'Debian 13 is the current stable release. Unless you are testing Debian 14 compatibility, no release migration is needed.',
      schedule:
        lang === 'zh'
          ? publicFacing
            ? '公网服务建议每周安装安全更新，并在点更新后安排重启窗口。'
            : '每周或每月安装安全更新，点更新后评估是否重启。'
          : publicFacing
            ? 'Install security updates weekly for public services and schedule reboot windows after point releases.'
            : 'Install security updates weekly or monthly and decide on reboots after point releases.',
      checks,
    };
  }

  if (current === 'bookworm') {
    return {
      title: target === 'keep' ? (lang === 'zh' ? '短期留在 Debian 12，但建立升级窗口' : 'Stay on Debian 12 briefly, but schedule migration') : (lang === 'zh' ? '规划升级到 Debian 13' : 'Plan the Debian 13 upgrade'),
      why:
        lang === 'zh'
          ? 'Debian 12 已接近常规安全支持结束，进入 LTS 后不适合继续新增长期负载。'
          : 'Debian 12 is near the end of regular security support. After LTS starts, it should not be used for new long-lived workloads.',
      schedule:
        lang === 'zh'
          ? publicFacing
            ? '公网服务建议在常规安全支持结束前完成升级，至少准备快照、控制台和回滚路径。'
            : '内网或桌面系统可以分批升级，但应先完成备份恢复验证。'
          : publicFacing
            ? 'For public services, finish migration before regular security support ends and prepare snapshots, console access, and rollback.'
            : 'Internal or desktop systems can move in batches, but validate backup restore first.',
      checks,
    };
  }

  if (current === 'bullseye') {
    return {
      title: lang === 'zh' ? '先升 Debian 12，再升 Debian 13' : 'Upgrade to Debian 12 first, then Debian 13',
      why:
        lang === 'zh'
          ? 'Debian 11 处于 LTS 尾声。不要直接跨多个 stable 版本升级，先稳定到 12，再规划 13。'
          : 'Debian 11 is late in its LTS window. Avoid skipping multiple stable releases; stabilize on 12 first, then plan 13.',
      schedule:
        lang === 'zh'
          ? publicFacing
            ? '公网机器应优先迁移或替换，不能升级时先限制暴露面。'
            : '先清理第三方源和 hold 包，再在测试机演练两段升级。'
          : publicFacing
            ? 'Public machines should be migrated or replaced first; restrict exposure if they cannot be upgraded immediately.'
            : 'Clean third-party sources and held packages, then rehearse the two-step upgrade on a test machine.',
      checks,
    };
  }

  return {
    title: lang === 'zh' ? '优先重装或替换旧系统' : 'Prefer reinstalling or replacing the old system',
    why:
      lang === 'zh'
        ? 'Debian 10 或更早版本已经结束公开安全支持，直接多级升级风险高。'
        : 'Debian 10 or older has ended public security support, and direct multi-release upgrades are high risk.',
    schedule:
      lang === 'zh'
        ? publicFacing
          ? '公网服务应尽快迁移到新主机或隔离网络，不建议继续原地维护。'
          : '优先导出数据和配置，使用 Debian 13 新装后恢复服务。'
        : publicFacing
          ? 'Move public services to a new host or isolate the network quickly; do not keep maintaining in place.'
          : 'Export data and configuration, reinstall Debian 13, then restore services.',
    checks,
  };
}

export function normalizeToolHash(hash: string) {
  const value = hash.replace(/^#/, '');

  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function parseToolHash(hash: string) {
  const value = hash.replace(/^#/, '');
  const [rawId, query = ''] = value.split('?');

  return {
    id: normalizeToolHash(rawId),
    params: new URLSearchParams(query),
  };
}
