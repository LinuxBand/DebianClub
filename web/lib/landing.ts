// Landing-page copy. zh + en authored; other locales fall back to en for now
// (full localisation is a follow-on, like the infographics were).
export interface LandingStrings {
  tagline: string;
  actions: { label: string; href: string; primary?: boolean }[];
  features: { title: string; detail: string }[];
  pathTitle: string;
  steps: { title: string; links: { label: string; href: string }[] }[];
  tryTitle: string;
  tryText: string;
  ctaLabel: string;
  ctaHref: string;
}

const en: LandingStrings = {
  tagline: 'Learn Debian 13 from zero · the most stable Linux distribution',
  actions: [
    { label: 'Get started', href: '/basics/introduction', primary: true },
    { label: 'Download', href: '/download' },
    { label: 'Tutorials', href: '/basics/installation' },
  ],
  features: [
    { title: 'Free', detail: 'All content is free, no sign-up, available anytime.' },
    { title: 'Beginner-friendly', detail: 'Designed for Linux newcomers, with detailed steps.' },
    { title: 'Practical', detail: 'Real, copy-paste-ready commands and configuration.' },
    { title: 'Multilingual', detail: 'Available in 8 languages, more being added.' },
    { title: 'Responsive', detail: 'Works on phone, tablet and desktop.' },
    { title: 'Up to date', detail: 'Tracks Debian 13 changes; kept current.' },
  ],
  pathTitle: 'Learn Debian in 4 steps',
  steps: [
    {
      title: '1. Basics & prep',
      links: [
        { label: 'Introduction', href: '/basics/introduction' },
        { label: "What's new", href: '/basics/whats-new' },
        { label: 'Requirements', href: '/basics/requirements' },
      ],
    },
    {
      title: '2. Install',
      links: [
        { label: 'Bootable media', href: '/basics/bootable-media' },
        { label: 'Installation', href: '/basics/installation' },
        { label: 'First boot', href: '/basics/first-boot' },
      ],
    },
    {
      title: '3. Configure',
      links: [
        { label: 'Configuration', href: '/basics/configuration' },
        { label: 'Desktop environments', href: '/basics/desktop-environments' },
        { label: 'Packages', href: '/administration/packages' },
      ],
    },
    {
      title: '4. Daily use',
      links: [
        { label: 'Users & permissions', href: '/administration/users' },
        { label: 'Network', href: '/administration/network' },
        { label: 'Applications', href: '/applications' },
      ],
    },
  ],
  tryTitle: 'Try Debian quickly',
  tryText: 'Run it in a virtual machine, from a live USB, dual-boot, or go all in.',
  ctaLabel: 'More quality sites → Friend Links',
  ctaHref: '/links',
};

const zh: LandingStrings = {
  tagline: '从零开始学习 Debian 13 · 最稳定的 Linux 发行版',
  actions: [
    { label: '🚀 开始学习', href: '/basics/introduction', primary: true },
    { label: '📥 系统下载', href: '/download' },
    { label: '📖 查看教程', href: '/basics/installation' },
  ],
  features: [
    { title: '完全免费', detail: '所有内容完全免费，无需注册，随时访问学习。' },
    { title: '初学者友好', detail: '专为 Linux 新手设计，提供详尽步骤与截图。' },
    { title: '实用教程', detail: '真实可操作的命令与配置，复制粘贴即可用。' },
    { title: '多语言支持', detail: '提供 8 种语言版本，更多语言陆续添加。' },
    { title: '响应式设计', detail: '完美适配手机、平板与桌面设备。' },
    { title: '持续更新', detail: '紧跟 Debian 13 变化，内容及时更新。' },
  ],
  pathTitle: '4 步学会 Debian',
  steps: [
    {
      title: '1. 基础入门',
      links: [
        { label: 'Debian 13 介绍', href: '/basics/introduction' },
        { label: 'Debian 13 新特性', href: '/basics/whats-new' },
        { label: '系统要求', href: '/basics/requirements' },
      ],
    },
    {
      title: '2. 系统安装',
      links: [
        { label: '制作启动盘', href: '/basics/bootable-media' },
        { label: '安装过程详解', href: '/basics/installation' },
        { label: '首次启动配置', href: '/basics/first-boot' },
      ],
    },
    {
      title: '3. 系统配置',
      links: [
        { label: '基本系统配置', href: '/basics/configuration' },
        { label: '选择桌面环境', href: '/basics/desktop-environments' },
        { label: '安装常用软件', href: '/administration/packages' },
      ],
    },
    {
      title: '4. 日常使用',
      links: [
        { label: '用户与权限', href: '/administration/users' },
        { label: '网络设置', href: '/administration/network' },
        { label: '常用应用', href: '/applications' },
      ],
    },
  ],
  tryTitle: '快速体验 Debian',
  tryText: '用虚拟机安装、Live USB 体验、双系统安装，或完整替换。',
  ctaLabel: '🔗 更多优质站点 → 友情链接',
  ctaHref: '/links',
};

const MAP: Record<string, LandingStrings> = { zh, en };

export function pickLanding(locale: string | undefined): LandingStrings {
  return (locale && MAP[locale]) || en;
}
