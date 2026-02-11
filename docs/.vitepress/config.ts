import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  title: 'Debian.Club',
  description: 'Debian 初学者完全指南',
  cleanUrls: true,
  vite: {
    optimizeDeps: {
      include: ['mermaid'],
    },
    ssr: {
      noExternal: ['mermaid'],
    },
  },
  head: [
    ['meta', { charset: 'UTF-8' }],
    ['meta', { name: 'theme-color', content: '#d41443' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    // Google Analytics
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-KQDJQSRRNS' }],
    ['script', {}, `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-KQDJQSRRNS');`]
  ],
  sitemap: { hostname: 'https://www.debian.club' },

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/',
      themeConfig: {
        logo: '/images/debian-logo.svg',
        siteTitle: 'Debian.Club',
        search: { provider: 'local' },
        nav: [
          { text: '首页', link: '/' },
          { text: '下载', link: '/download' },
          {
            text: '入门',
            items: [
              { text: 'Debian 13 介绍', link: '/basics/introduction' },
              { text: '新特性', link: '/basics/whats-new' },
              { text: '系统要求', link: '/basics/requirements' },
              { text: '虚拟机体验', link: '/basics/virtual-machine' },
              { text: '硬件兼容性', link: '/basics/hardware-compatibility' },
              { text: '下载镜像', link: '/basics/download' },
              { text: 'BIOS/UEFI 设置', link: '/basics/bios-settings' },
              { text: '制作启动盘', link: '/basics/bootable-media' },
              { text: '安装指南', link: '/basics/installation' },
              { text: '双系统安装', link: '/basics/dual-boot' },
              { text: '首次启动', link: '/basics/first-boot' },
              { text: 'Shell 与命令行', link: '/basics/command-line' },
              { text: '系统配置', link: '/basics/configuration' },
              { text: '桌面环境', link: '/basics/desktop-environments' }
            ]
          },
          {
            text: '系统管理',
            items: [
              { text: '用户与权限', link: '/administration/users' },
              { text: 'APT 包管理', link: '/administration/packages' },
              { text: '替代包管理', link: '/administration/alternative-packages' },
              { text: '系统服务', link: '/administration/services' },
              { text: '网络设置', link: '/administration/network' },
              { text: '安全加固', link: '/administration/security' },
              { text: '日志管理', link: '/administration/logs' },
              { text: '计划任务', link: '/administration/cron' },
              { text: '防火墙', link: '/administration/firewall' },
              { text: '备份与恢复', link: '/administration/backup' },
              { text: '磁盘管理', link: '/administration/disk-management' }
            ]
          },
          {
            text: '应用软件',
            items: [
              { text: '总览', link: '/applications/' },
              { text: '网络与浏览', link: '/applications/internet' },
              { text: '办公', link: '/applications/office' },
              { text: '多媒体', link: '/applications/multimedia' },
              { text: '游戏', link: '/applications/gaming' },
              { text: '开发', link: '/applications/development' },
              { text: '虚拟化', link: '/applications/virtualization' },
              { text: 'Wine', link: '/applications/wine' },
              { text: 'IDE', link: '/applications/ide' }
            ]
          },
          {
            text: '服务器',
            items: [
              { text: 'LAMP/LEMP', link: '/server/lamp' },
              { text: 'Docker', link: '/server/docker' },
              { text: 'Kubernetes 入门', link: '/server/k8s' },
              { text: 'Kubernetes 进阶', link: '/server/kubernetes' },
              { text: '安全与合规', link: '/server/security' },
              { text: '数据库', link: '/server/database' },
              { text: '存储', link: '/server/storage' },
              { text: '虚拟化', link: '/server/virtualization' },
              { text: '反向代理', link: '/server/reverse-proxy' }
            ]
          },
          { text: '故障排查', link: '/troubleshooting/faq' },
          { text: '社区', link: '/community' },
          { text: 'English', link: '/en/' }
        ],
        sidebar: {
          '/basics/': [
            {
              text: '基础入门',
              items: [
                { text: 'Debian 13 介绍', link: '/basics/introduction' },
                { text: '新特性', link: '/basics/whats-new' },
                { text: '系统要求', link: '/basics/requirements' },
                { text: '虚拟机体验指南', link: '/basics/virtual-machine' },
                { text: '硬件兼容性', link: '/basics/hardware-compatibility' },
                { text: '下载镜像', link: '/basics/download' },
                { text: 'BIOS/UEFI 设置', link: '/basics/bios-settings' },
                { text: '制作启动盘', link: '/basics/bootable-media' },
                { text: '安装指南', link: '/basics/installation' },
                { text: '双系统安装指南', link: '/basics/dual-boot' },
                { text: '首次启动', link: '/basics/first-boot' },
                { text: 'Shell 与命令行基础', link: '/basics/command-line' },
                { text: '系统配置', link: '/basics/configuration' },
                { text: '桌面环境', link: '/basics/desktop-environments' }
              ]
            }
          ],
          '/administration/': [
            {
              text: '系统管理',
              items: [
                { text: '用户与权限', link: '/administration/users' },
                { text: 'APT 包管理', link: '/administration/packages' },
                { text: '替代包管理', link: '/administration/alternative-packages' },
                { text: '系统服务', link: '/administration/services' },
                { text: '网络设置', link: '/administration/network' },
                { text: '安全加固', link: '/administration/security' },
                { text: '日志管理', link: '/administration/logs' },
                { text: '计划任务', link: '/administration/cron' },
                { text: '防火墙', link: '/administration/firewall' },
                { text: '备份与恢复', link: '/administration/backup' },
                { text: '磁盘与存储管理', link: '/administration/disk-management' }
              ]
            }
          ],
          '/applications/': [
            {
              text: '应用软件',
              items: [
                { text: '总览', link: '/applications/' },
                { text: '网络与浏览', link: '/applications/internet' },
                { text: '办公', link: '/applications/office' },
                { text: '多媒体', link: '/applications/multimedia' },
                { text: '游戏', link: '/applications/gaming' },
                { text: '开发', link: '/applications/development' },
                { text: '虚拟化', link: '/applications/virtualization' },
                { text: 'Wine', link: '/applications/wine' },
                { text: 'IDE', link: '/applications/ide' }
              ]
            }
          ],
          '/server/': [
            {
              text: '服务器',
              items: [
                { text: 'LAMP/LEMP', link: '/server/lamp' },
                { text: 'Docker', link: '/server/docker' },
                { text: 'Kubernetes 入门', link: '/server/k8s' },
                { text: 'Kubernetes 进阶', link: '/server/kubernetes' },
                { text: '安全与合规', link: '/server/security' },
                { text: '数据库', link: '/server/database' },
                { text: '存储', link: '/server/storage' },
                { text: '虚拟化', link: '/server/virtualization' },
                { text: '反向代理', link: '/server/reverse-proxy' }
              ]
            }
          ],
          '/troubleshooting/': [
            {
              text: '故障排查',
              items: [
                { text: 'FAQ 常见问题', link: '/troubleshooting/faq' },
                { text: '安装与引导', link: '/troubleshooting/installation-boot' },
                { text: '安装问题', link: '/troubleshooting/installation-issues' },
                { text: '桌面与显示', link: '/troubleshooting/desktop-display' },
                { text: '硬件', link: '/troubleshooting/hardware' },
                { text: '网络', link: '/troubleshooting/networking' },
                { text: '软件包管理', link: '/troubleshooting/package-management' },
                { text: '性能', link: '/troubleshooting/performance' },
                { text: '恢复', link: '/troubleshooting/recovery' },
                { text: '安全与内核', link: '/troubleshooting/security-kernel' },
                { text: '系统使用', link: '/troubleshooting/system-usage' },
                { text: '特定软件', link: '/troubleshooting/specific-software' },
                { text: '其它', link: '/troubleshooting/others' },
                { text: '其它问题', link: '/troubleshooting/other-questions' }
              ]
            }
          ],
          '/': [
            {
              text: '概览',
              items: [
                { text: '下载', link: '/download' },
                { text: '版本对比', link: '/comparison' },
                { text: '版本与发布', link: '/versions' },
                { text: '生命周期 (EOL)', link: '/eol' },
                { text: '社区', link: '/community' }
              ]
            }
          ]
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      themeConfig: {
        logo: '/images/debian-logo.svg',
        siteTitle: 'Debian.Club',
        search: { provider: 'local' },
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Download', link: '/en/download' },
          { text: 'Basics', link: '/en/basics/introduction' },
          { text: 'Administration', link: '/en/administration/users' },
          { text: 'Applications', link: '/en/applications/' },
          { text: 'Server', link: '/en/server/lamp' },
          { text: 'Troubleshooting', link: '/en/troubleshooting/faq' },
          { text: '中文', link: '/' }
        ],
        sidebar: {
          '/en/basics/': [
            {
              text: 'Basics',
              items: [
                { text: 'Introduction', link: '/en/basics/introduction' },
                { text: 'What’s New', link: '/en/basics/whats-new' },
                { text: 'Requirements', link: '/en/basics/requirements' },
                { text: 'Virtual Machine Guide', link: '/en/basics/virtual-machine' },
                { text: 'Hardware Compatibility', link: '/en/basics/hardware-compatibility' },
                { text: 'Download', link: '/en/basics/download' },
                { text: 'BIOS/UEFI Settings', link: '/en/basics/bios-settings' },
                { text: 'Bootable Media', link: '/en/basics/bootable-media' },
                { text: 'Installation', link: '/en/basics/installation' },
                { text: 'Dual Boot Guide', link: '/en/basics/dual-boot' },
                { text: 'First Boot', link: '/en/basics/first-boot' },
                { text: 'Command Line Basics', link: '/en/basics/command-line' },
                { text: 'Configuration', link: '/en/basics/configuration' },
                { text: 'Desktop Environments', link: '/en/basics/desktop-environments' }
              ]
            }
          ],
          '/en/administration/': [
            {
              text: 'Administration',
              items: [
                { text: 'Users', link: '/en/administration/users' },
                { text: 'Packages', link: '/en/administration/packages' },
                { text: 'Network', link: '/en/administration/network' },
                { text: 'Security', link: '/en/administration/security' },
                { text: 'Backup & Recovery', link: '/en/administration/backup' },
                { text: 'Disk Management', link: '/en/administration/disk-management' }
              ]
            }
          ],
          '/en/applications/': [
            {
              text: 'Applications',
              items: [
                { text: 'Overview', link: '/en/applications/' },
                { text: 'Wine', link: '/en/applications/wine' }
              ]
            }
          ],
          '/en/server/': [
            {
              text: 'Server',
              items: [
                { text: 'LAMP/LEMP', link: '/en/server/lamp' },
                { text: 'Docker', link: '/en/server/docker' },
                { text: 'Kubernetes Intro', link: '/en/server/k8s' },
                { text: 'Kubernetes Advanced', link: '/en/server/kubernetes' },
                { text: 'Security', link: '/en/server/security' },
                { text: 'Database', link: '/en/server/database' },
                { text: 'Storage', link: '/en/server/storage' },
                { text: 'Virtualization', link: '/en/server/virtualization' },
                { text: 'Reverse Proxy', link: '/en/server/reverse-proxy' }
              ]
            }
          ],
          '/en/troubleshooting/': [
            {
              text: 'Troubleshooting',
              items: [
                { text: 'FAQ', link: '/en/troubleshooting/faq' },
                { text: 'Installation & Boot', link: '/en/troubleshooting/installation-boot' },
                { text: 'Installation Issues', link: '/en/troubleshooting/installation-issues' },
                { text: 'Desktop & Display', link: '/en/troubleshooting/desktop-display' },
                { text: 'Hardware', link: '/en/troubleshooting/hardware' },
                { text: 'Networking', link: '/en/troubleshooting/networking' },
                { text: 'Package Management', link: '/en/troubleshooting/package-management' },
                { text: 'Performance', link: '/en/troubleshooting/performance' },
                { text: 'Recovery', link: '/en/troubleshooting/recovery' },
                { text: 'Security & Kernel', link: '/en/troubleshooting/security-kernel' },
                { text: 'System Usage', link: '/en/troubleshooting/system-usage' },
                { text: 'Specific Software', link: '/en/troubleshooting/specific-software' },
                { text: 'Others', link: '/en/troubleshooting/others' },
                { text: 'Other Questions', link: '/en/troubleshooting/other-questions' }
              ]
            }
          ],
          '/en/': [
            {
              text: 'Overview',
              items: [
                { text: 'Download', link: '/en/download' },
                { text: 'Comparison', link: '/en/comparison' },
                { text: 'Versions', link: '/en/versions' },
                { text: 'End of Life (EOL)', link: '/en/eol' },
                { text: 'Community', link: '/en/community' }
              ]
            }
          ]
        }
      }
    }
  }
}))
