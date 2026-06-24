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
  ai: string;
  more: string;
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
  ai: 'AI Tools',
  more: 'More',
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
  ai: 'AI 工具',
  more: '更多',
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
    { text: t.ai, url: u('/ai') },
    {
      type: 'menu',
      text: t.more,
      items: [
        { text: t.debian14, url: u('/debian-14') },
        { text: t.news, url: u('/news') },
        { text: t.eol, url: u('/eol') },
        { text: t.variants, url: u('/variants') },
        { text: t.links, url: u('/links') },
      ],
    },
  ];
}
