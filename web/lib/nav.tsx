import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  AppWindow,
  Archive,
  ArrowLeftRight,
  ArrowUpCircle,
  Bot,
  Box,
  Boxes,
  Brain,
  CalendarClock,
  ClipboardCheck,
  Cloud,
  Container,
  Cpu,
  Database,
  GitBranch,
  GitCompare,
  GitFork,
  HardDrive,
  HardDriveDownload,
  House,
  Lamp,
  Layers,
  Link2,
  Monitor,
  Newspaper,
  NotebookPen,
  Package,
  Radar,
  Rocket,
  ServerCog,
  Settings,
  ShieldCheck,
  Sparkles,
  SquareTerminal,
  Star,
  Timer,
  Usb,
  Users,
  Wrench,
} from 'lucide-react';
import { i18n } from './i18n';
import { source } from './source';

type LinkItemType = NonNullable<BaseLayoutProps['links']>[number];

type Locale = (typeof i18n.languages)[number];


interface TriggerLabels {
  download: string;
  basics: string;
  admin: string;
  server: string;
  scenarios: string;
  versions: string;
  aiTools: string;
  more: string;
}

const TRIGGERS: Record<Locale, TriggerLabels> = {
  zh: {
    download: '下载',
    basics: '入门',
    admin: '系统管理',
    server: '服务器',
    scenarios: '场景方案',
    versions: '版本',
    aiTools: 'AI 工具',
    more: '更多',
  },
  en: {
    download: 'Download',
    basics: 'Basics',
    admin: 'Admin',
    server: 'Server',
    scenarios: 'Scenarios',
    versions: 'Versions',
    aiTools: 'AI',
    more: 'More',
  },
  de: {
    download: 'Download',
    basics: 'Grundlagen',
    admin: 'Systemverwaltung',
    server: 'Server',
    scenarios: 'Szenarien',
    versions: 'Versionen',
    aiTools: 'KI & Werkzeuge',
    more: 'Mehr',
  },
  es: {
    download: 'Descarga',
    basics: 'Conceptos básicos',
    admin: 'Administración',
    server: 'Servidor',
    scenarios: 'Escenarios',
    versions: 'Versiones',
    aiTools: 'IA y herramientas',
    more: 'Más',
  },
  fr: {
    download: 'Téléchargement',
    basics: 'Bases',
    admin: 'Administration',
    server: 'Serveur',
    scenarios: 'Scénarios',
    versions: 'Versions',
    aiTools: 'IA et outils',
    more: 'Plus',
  },
  ja: {
    download: 'ダウンロード',
    basics: '基本',
    admin: 'システム管理',
    server: 'サーバー',
    scenarios: 'シナリオ',
    versions: 'バージョン',
    aiTools: 'AI とツール',
    more: 'その他',
  },
  ko: {
    download: '다운로드',
    basics: '기본',
    admin: '시스템 관리',
    server: '서버',
    scenarios: '시나리오',
    versions: '버전',
    aiTools: 'AI 및 도구',
    more: '더보기',
  },
  pt: {
    download: 'Download',
    basics: 'Fundamentos',
    admin: 'Administração',
    server: 'Servidor',
    scenarios: 'Cenários',
    versions: 'Versões',
    aiTools: 'IA e ferramentas',
    more: 'Mais',
  },
};

// Panel item descriptions are maintained for the two primary locales first;
// other locales fall back to icon + localized page title cards.
type Descriptions = Record<string, { zh: string; en: string }>;

const DESCRIPTIONS: Descriptions = {
  '/basics/introduction': {
    zh: '了解 Debian 的定位、版本和社区',
    en: 'What Debian is, its releases and community',
  },
  '/basics/installation': {
    zh: '从镜像到首次登录的完整安装流程',
    en: 'Full install walkthrough, from ISO to first login',
  },
  '/basics/bootable-media': {
    zh: '制作 U 盘 / DVD 启动介质',
    en: 'Create bootable USB or DVD media',
  },
  '/basics/desktop-environments': {
    zh: 'GNOME、KDE、Xfce 等桌面对比与选择',
    en: 'Compare GNOME, KDE, Xfce and more',
  },
  '/basics/first-boot': {
    zh: '装好系统后先做的十件事',
    en: 'The first things to do after installing',
  },
  '/basics/configuration': {
    zh: '网络、源、输入法和常用系统设置',
    en: 'Network, APT sources, input methods and settings',
  },
  '/basics/upgrade': {
    zh: '跨版本升级的标准流程与回滚准备',
    en: 'Standard release upgrade flow and rollback prep',
  },
  '/basics/virtual-machine': {
    zh: '在 VMware、VirtualBox 等环境中安装',
    en: 'Install Debian in VMware, VirtualBox and more',
  },
  '/administration/users': {
    zh: '用户、组、sudo 与权限管理',
    en: 'Users, groups, sudo and permissions',
  },
  '/administration/packages': {
    zh: 'apt、dpkg 与软件包管理',
    en: 'apt, dpkg and package management',
  },
  '/administration/network': {
    zh: 'IP、DNS 与网络排障',
    en: 'IP, DNS and network troubleshooting',
  },
  '/administration/security': {
    zh: '防火墙、SSH 加固与安全基线',
    en: 'Firewall, SSH hardening and security baseline',
  },
  '/administration/backup': {
    zh: '系统与数据的备份恢复',
    en: 'Backup and restore for systems and data',
  },
  '/administration/disk-management': {
    zh: '分区、挂载与磁盘扩容',
    en: 'Partitions, mounts and disk resizing',
  },
  '/server/lamp': {
    zh: 'Apache/Nginx + MariaDB + PHP 一键路线',
    en: 'Apache/Nginx + MariaDB + PHP stack',
  },
  '/server/docker': {
    zh: '官方仓库安装 Docker 与常用配置',
    en: 'Install Docker from the official repo',
  },
  '/server/podman': {
    zh: '无守护进程的 rootless 容器方案',
    en: 'Daemonless, rootless container workflow',
  },
  '/server/kubernetes': {
    zh: '在 Debian 上部署 K8s 集群',
    en: 'Deploy Kubernetes clusters on Debian',
  },
  '/server/database': {
    zh: 'PostgreSQL、MariaDB 运维要点',
    en: 'Running PostgreSQL and MariaDB well',
  },
  '/server/reverse-proxy': {
    zh: 'Nginx / Caddy 反向代理与 HTTPS',
    en: 'Nginx / Caddy reverse proxy and HTTPS',
  },
  '/server/cloud': {
    zh: '官方云镜像、AMI 与 Azure URN',
    en: 'Official cloud images, AMIs and Azure URNs',
  },
  '/scenarios': {
    zh: '按真实使用目标选择部署路线',
    en: 'Pick a deployment path by real-world goal',
  },
  '/scenarios/home-server': {
    zh: '把闲置设备变成家庭服务节点',
    en: 'Turn idle hardware into a home services box',
  },
  '/scenarios/nas-file-sharing': {
    zh: 'Samba/NFS 集中管理照片与备份',
    en: 'Centralize photos and backups with Samba/NFS',
  },
  '/scenarios/docker-host': {
    zh: '稳定的容器运行环境从零配置',
    en: 'A reliable container host from scratch',
  },
  '/scenarios/development-workstation': {
    zh: 'Debian 主力开发环境配置',
    en: 'Set up Debian as a daily dev machine',
  },
  '/scenarios/local-ai-inference': {
    zh: '本地运行 LLM 与推理服务',
    en: 'Run local LLM and inference services',
  },
  '/scenarios/ops-jump-box': {
    zh: '集中 SSH 入口、审计与诊断',
    en: 'Central SSH entry, audit and diagnostics',
  },
  '/scenarios/monitoring-server': {
    zh: 'Prometheus + Grafana 监控体系',
    en: 'Monitoring stack with Prometheus + Grafana',
  },
  '/scenarios/git-forge': {
    zh: '自托管 Git 仓库与 CI 流水线',
    en: 'Self-hosted Git repos and CI pipelines',
  },
  '/versions': {
    zh: 'stable、oldstable、testing 怎么选',
    en: 'Choosing stable, oldstable or testing',
  },
  '/eol': {
    zh: '各版本支持周期与 EOL 日期速查',
    en: 'Support windows and EOL dates at a glance',
  },
  '/debian-13': {
    zh: 'Debian 13 专题：新特性、下载与支持周期',
    en: 'The Debian 13 hub: new features, downloads, lifecycle',
  },
  '/debian-14': {
    zh: '下一代 Debian（Forky）进展与预览',
    en: 'Progress and preview of next Debian (Forky)',
  },
  '/news': {
    zh: '版本发布、社区与安全动态',
    en: 'Releases, community and security updates',
  },
  '/variants': {
    zh: '官方变体与衍生发行版',
    en: 'Official variants and derivatives',
  },
  '/ai/skills': {
    zh: '让 AI 助手先验证 Debian 事实再动手',
    en: 'Make AI agents verify Debian facts first',
  },
  '/ai': {
    zh: 'AI 工具在 Debian 上的使用总览',
    en: 'Overview of AI tooling on Debian',
  },
  '/tools': {
    zh: '镜像源选择器、安装选择器与排障向导',
    en: 'Mirror picker, install selector and wizards',
  },
  '/hardware': {
    zh: 'NVIDIA、Wi-Fi、蓝牙等驱动指南',
    en: 'Guides for NVIDIA, Wi-Fi, Bluetooth drivers',
  },
  '/deployment': {
    zh: '从写完文档到发布的工程流程',
    en: 'Engineering flow from docs to deployment',
  },
  '/production-observability': {
    zh: '线上站点的观测与告警实践',
    en: 'Observability and alerting in production',
  },
  '/release-readiness': {
    zh: '发布前质量门禁与检查清单',
    en: 'Quality gates and checklists before release',
  },
  '/content-freshness': {
    zh: '内容时效基线与复核机制',
    en: 'Freshness baseline and review process',
  },
  '/links': {
    zh: '推荐的 Debian 相关站点',
    en: 'Recommended Debian-related sites',
  },
};

interface ItemSpec {
  path: string;
  icon: LucideIcon;
}

interface SectionSpec {
  trigger: keyof TriggerLabels;
  items: ItemSpec[];
}

const SECTIONS: SectionSpec[] = [
  {
    trigger: 'basics',
    items: [
      { path: '/basics/introduction', icon: NotebookPen },
      { path: '/basics/installation', icon: HardDriveDownload },
      { path: '/basics/bootable-media', icon: Usb },
      { path: '/basics/desktop-environments', icon: Monitor },
      { path: '/basics/first-boot', icon: Rocket },
      { path: '/basics/configuration', icon: Settings },
      { path: '/basics/upgrade', icon: ArrowUpCircle },
      { path: '/basics/virtual-machine', icon: AppWindow },
    ],
  },
  {
    trigger: 'admin',
    items: [
      { path: '/administration/users', icon: Users },
      { path: '/administration/packages', icon: Package },
      { path: '/administration/network', icon: SquareTerminal },
      { path: '/administration/security', icon: ShieldCheck },
      { path: '/administration/backup', icon: Archive },
      { path: '/administration/disk-management', icon: HardDrive },
    ],
  },
  {
    trigger: 'server',
    items: [
      { path: '/server/lamp', icon: Lamp },
      { path: '/server/docker', icon: Container },
      { path: '/server/podman', icon: Box },
      { path: '/server/kubernetes', icon: Boxes },
      { path: '/server/database', icon: Database },
      { path: '/server/reverse-proxy', icon: ArrowLeftRight },
      { path: '/server/cloud', icon: Cloud },
    ],
  },
  {
    trigger: 'scenarios',
    items: [
      { path: '/scenarios', icon: Layers },
      { path: '/scenarios/home-server', icon: House },
      { path: '/scenarios/nas-file-sharing', icon: HardDrive },
      { path: '/scenarios/docker-host', icon: Container },
      { path: '/scenarios/development-workstation', icon: Monitor },
      { path: '/scenarios/local-ai-inference', icon: Brain },
      { path: '/scenarios/ops-jump-box', icon: SquareTerminal },
      { path: '/scenarios/monitoring-server', icon: Activity },
      { path: '/scenarios/git-forge', icon: GitBranch },
    ],
  },
  {
    trigger: 'versions',
    items: [
      { path: '/versions', icon: GitCompare },
      { path: '/eol', icon: Timer },
      { path: '/debian-13', icon: Star },
      { path: '/debian-14', icon: GitFork },
      { path: '/news', icon: Newspaper },
      { path: '/variants', icon: Layers },
    ],
  },
  {
    trigger: 'aiTools',
    items: [
      { path: '/ai/skills', icon: Sparkles },
      { path: '/ai', icon: Bot },
      { path: '/tools', icon: Wrench },
      { path: '/hardware', icon: Cpu },
    ],
  },
  {
    trigger: 'more',
    items: [
      { path: '/deployment', icon: ServerCog },
      { path: '/production-observability', icon: Radar },
      { path: '/release-readiness', icon: ClipboardCheck },
      { path: '/content-freshness', icon: CalendarClock },
      { path: '/links', icon: Link2 },
    ],
  },
];

// Resolve to a locale where the page actually exists (fallback is disabled),
// so the navbar never links to a missing localized route: current -> en -> zh.
// page.url is already locale-prefixed by fumadocs' i18n source.
function resolvePage(path: string, locale: string) {
  const slug = path.replace(/^\//, '').split('/').filter(Boolean);
  const page =
    source.getPage(slug, locale) ??
    (locale !== 'en' ? source.getPage(slug, 'en') : undefined);
  const title = page ? (page.data as { title?: string }).title : undefined;
  if (!page || !title) return undefined;
  return { title, url: page.url };
}

function triggerLabel(key: keyof TriggerLabels, locale: string): string {
  const labels = TRIGGERS[locale as Locale] ?? TRIGGERS.en;
  return labels[key];
}

export function navLinks(locale: string): LinkItemType[] {
  const menus: LinkItemType[] = [];

  for (const section of SECTIONS) {
    const items: Extract<LinkItemType, { type: 'menu' }>['items'] = [];
    for (const spec of section.items) {
      const page = resolvePage(spec.path, locale);
      if (!page) continue;
      const desc = DESCRIPTIONS[spec.path]?.[locale as 'zh' | 'en'];
      const Icon = spec.icon;
      items.push({
        type: 'main',
        text: page.title,
        url: page.url,
        icon: <Icon className="size-4" />,
        ...(desc ? { description: desc } : {}),
        menu: {
          banner: (
            <div className="w-fit rounded-md border bg-fd-muted p-1 [&_svg]:size-4">
              <Icon className="size-4" />
            </div>
          ),
        },
      });
    }
    if (items.length === 0) continue;
    const landing = resolvePage(section.items[0].path, locale);
    menus.push({
      type: 'menu',
      text: triggerLabel(section.trigger, locale),
      ...(landing ? { url: landing.url } : {}),
      items,
    });
  }

  const download = resolvePage('/download', locale);
  const links: LinkItemType[] = download
    ? [{ type: 'main', text: triggerLabel('download', locale), url: download.url }]
    : [];
  links.push(...menus);
  return links;
}
