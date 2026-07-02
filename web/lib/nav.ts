import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { i18n } from './i18n';
import { source } from './source';

type LinkItemType = NonNullable<BaseLayoutProps['links']>[number];

interface NavLabels {
  download: string;
  basics: string;
  introduction: string;
  installation: string;
  desktops: string;
  upgrade: string;
  admin: string;
  users: string;
  packages: string;
  network: string;
  security: string;
  server: string;
  scenarios: string;
  hardware: string;
  ai: string;
  aiOverview: string;
  aiSkills: string;
  tools: string;
  more: string;
  versions: string;
  release: string;
  deployment: string;
  debian14: string;
  news: string;
  eol: string;
  variants: string;
  links: string;
}

const en: NavLabels = {
  download: 'Download',
  basics: 'Basics',
  introduction: 'Introduction',
  installation: 'Installation',
  desktops: 'Desktops',
  upgrade: 'Upgrade',
  admin: 'Administration',
  users: 'Users & permissions',
  packages: 'Packages',
  network: 'Network',
  security: 'Security',
  server: 'Server',
  scenarios: 'Scenarios',
  hardware: 'Hardware',
  ai: 'AI Tools',
  aiOverview: 'AI Tools Overview',
  aiSkills: 'DebianClub AI Skills',
  tools: 'Tools',
  more: 'More',
  versions: 'Versions',
  release: 'Release Readiness',
  deployment: 'Deployment',
  debian14: 'Debian 14',
  news: 'News',
  eol: 'EOL',
  variants: 'Variants',
  links: 'Friend Links',
};

const zh: NavLabels = {
  download: '下载',
  basics: '入门',
  introduction: '介绍',
  installation: '安装',
  desktops: '桌面环境',
  upgrade: '升级',
  admin: '系统管理',
  users: '用户与权限',
  packages: '软件包',
  network: '网络',
  security: '安全',
  server: '服务器',
  scenarios: '场景方案',
  hardware: '硬件与驱动',
  ai: 'AI 工具',
  aiOverview: 'AI 工具总览',
  aiSkills: 'DebianClub AI Skills',
  tools: '工具箱',
  more: '更多',
  versions: '版本对比',
  release: '发布准备',
  deployment: '部署与运行',
  debian14: 'Debian 14',
  news: '最新动态',
  eol: '生命周期',
  variants: '变体发行版',
  links: '友情链接',
};

const MAP: Record<string, NavLabels> = { zh, en };

export function navLinks(locale: string): LinkItemType[] {
  const t = MAP[locale] ?? en;
  const p = locale === i18n.defaultLanguage ? '' : `/${locale}`;
  // Resolve to a locale where the page actually exists (fallback is disabled),
  // so the navbar never links to a missing localized route: current -> en -> zh.
  const u = (path: string) => {
    const slug = path.replace(/^\//, '').split('/').filter(Boolean);
    if (source.getPage(slug, locale)) return `${p}${path}`;
    if (locale !== 'en' && source.getPage(slug, 'en')) return `/en${path}`;
    return path;
  };
  return [
    { text: t.download, url: u('/download') },
    {
      type: 'menu',
      text: t.basics,
      items: [
        { text: t.introduction, url: u('/basics/introduction') },
        { text: t.installation, url: u('/basics/installation') },
        { text: t.desktops, url: u('/basics/desktop-environments') },
        { text: t.upgrade, url: u('/basics/upgrade') },
      ],
    },
    {
      type: 'menu',
      text: t.admin,
      items: [
        { text: t.users, url: u('/administration/users') },
        { text: t.packages, url: u('/administration/packages') },
        { text: t.network, url: u('/administration/network') },
        { text: t.security, url: u('/administration/security') },
      ],
    },
    {
      type: 'menu',
      text: t.server,
      items: [
        { text: 'LAMP / LEMP', url: u('/server/lamp') },
        { text: 'Docker', url: u('/server/docker') },
        { text: 'Kubernetes', url: u('/server/kubernetes') },
      ],
    },
    {
      type: 'menu',
      text: t.ai,
      items: [
        { text: t.aiSkills, url: u('/ai/skills') },
        { text: t.aiOverview, url: u('/ai') },
      ],
    },
    {
      type: 'menu',
      text: t.more,
      items: [
        { text: t.scenarios, url: u('/scenarios') },
        { text: t.hardware, url: u('/hardware') },
        { text: t.tools, url: u('/tools') },
        { text: t.versions, url: u('/versions') },
        { text: t.release, url: u('/release-readiness') },
        { text: t.deployment, url: u('/deployment') },
        { text: t.debian14, url: u('/debian-14') },
        { text: t.news, url: u('/news') },
        { text: t.eol, url: u('/eol') },
        { text: t.variants, url: u('/variants') },
        { text: t.links, url: u('/links') },
      ],
    },
  ];
}
