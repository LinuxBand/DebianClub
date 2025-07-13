import { defineConfig } from 'vitepress'

// 共享配置
const sharedConfig = {
  title: 'Debian.Club',
  description: 'Debian 初学者完全指南 - Complete Debian Guide for Beginners',
  cleanUrls: true,
  
  themeConfig: {
    logo: '/images/debian-logo.svg',
    siteTitle: 'Debian.Club',
    
    search: {
      provider: 'local' as const,
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    },

    footer: {
      copyright: 'Copyright © 2025 Debian.Club'
    }
  },

  markdown: {
    lineNumbers: true,
    container: {
      tipLabel: '提示',
      warningLabel: '注意',
      dangerLabel: '警告',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    }
  },

  sitemap: {
    hostname: 'https://www.debian.club'
  }
}

export default defineConfig({
  ...sharedConfig,
  head: [
    ['meta', { charset: 'UTF-8' }],
    ['meta', { name: 'theme-color', content: '#d41443' }, ''],
    ['meta', { name: 'og:type', content: 'website' }, ''],
    ['meta', { name: 'og:locale', content: 'zh_CN' }, ''],
    ['meta', { name: 'og:site_name', content: 'Debian.Club' }, ''],
    ['meta', { name: 'og:image', content: '/images/debian-club-banner.png' }, ''],
    ['link', { rel: 'icon', href: '/favicon.ico' }, ''],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }, ''],
    ['meta', { name: 'keywords', content: 'Debian, Linux, 教程, Tutorial, 初学者, Beginner, Guide' }, ''],
    ['meta', { name: 'author', content: 'Debian.Club' }, ''],
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID' }, ''],
    ['script', {}, `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID');`]
  ],
  
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'Debian.Club',
      description: 'Debian 初学者完全指南 - 从零开始学习 Debian Linux',
      head: [['meta', { charset: 'UTF-8' }]],
      
      themeConfig: {
        nav: [
          { text: '首页', link: '/' },
          { text: '系统下载', link: '/download' },
          {
            text: '服务器',
            items: [
              { text: 'LAMP/LEMP 部署', link: '/server/lamp' },
              { text: 'Java 环境安装', link: '/server/java' },
              { text: 'Docker 安装与使用', link: '/server/docker' },
              { text: 'Kubernetes (K8s) 部署', link: '/server/k8s' },
              { text: '服务器安全加固', link: '/server/security' },
              { text: '数据库服务', link: '/server/database' },
              { text: '文件与网络存储', link: '/server/storage' },
              { text: '虚拟化平台', link: '/server/virtualization' },
              { text: '反向代理', link: '/server/reverse-proxy' },
            ]
          },
          { 
            text: '基础', 
            items: [
              { text: 'Debian 13 简介', link: '/basics/introduction' },
              { text: '安装指南', link: '/basics/installation' },
              { text: '系统配置', link: '/basics/configuration' },
              { text: '桌面环境', link: '/basics/desktop-environments' },
              { text: '硬件兼容性', link: '/basics/hardware-compatibility' },
              { text: '版本支持周期 (EOL)', link: '/eol' },
            ]
          },
          { 
            text: '对比',
            items: [
              { text: '系统对比', link: '/comparison' },
              { text: '版本对比', link: '/versions' }
            ]
          },
          { 
            text: '系统管理', 
            items: [
              { text: '用户管理', link: '/administration/users' },
              { text: '软件包管理', link: '/administration/packages' },
              { text: '系统服务', link: '/administration/services' },
              { text: '网络配置', link: '/administration/network' },
              { text: '安全管理', link: '/administration/security' },
            ]
          },
          { 
            text: '常用应用', 
            items: [
              { text: '开发环境', link: '/applications/development' },
              { text: '办公软件', link: '/applications/office' },
              { text: '多媒体', link: '/applications/multimedia' },
              { text: '游戏', link: '/applications/gaming' },
              { text: 'Windows 兼容', link: '/applications/wine' },
            ]
          },
          { 
            text: 'FAQ', 
            link: '/troubleshooting/installation-boot'
          }
        ],

        sidebar: {
          '/server/': [
            {
              text: '服务器配置',
              items: [
                { text: 'LAMP/LEMP 部署', link: '/server/lamp' },
                { text: 'Java 环境安装', link: '/server/java' },
                { text: 'Docker 安装与使用', link: '/server/docker' },
                { text: 'Kubernetes (K8s) 部署', link: '/server/k8s' },
                { text: '服务器安全加固', link: '/server/security' },
                { text: '数据库服务', link: '/server/database' },
                { text: '文件与网络存储', link: '/server/storage' },
                { text: '虚拟化平台', link: '/server/virtualization' },
                { text: '反向代理', link: '/server/reverse-proxy' },
              ]
            }
          ],
          '/basics/': [
            {
              text: '基础教程',
              items: [
                { text: 'Debian 13 介绍', link: '/basics/introduction' },
                { text: 'Debian 13 新特性', link: '/basics/whats-new' },
                { text: '系统要求', link: '/basics/requirements' },
                { text: '硬件兼容性', link: '/basics/hardware-compatibility' },
                { text: '下载镜像', link: '/basics/download' },
                { text: '制作启动盘', link: '/basics/bootable-media' },
                { text: '安装过程', link: '/basics/installation' },
                { text: '首次启动', link: '/basics/first-boot' },
                { text: '基本配置', link: '/basics/configuration' },
                { text: '桌面环境选择', link: '/basics/desktop-environments' }
              ]
            }
          ],
          '/administration/': [
            {
              text: '系统管理',
              items: [
                { text: '用户和权限', link: '/administration/users' },
                { text: 'APT 包管理', link: '/administration/packages' },
                { text: 'Snap 和 Flatpak', link: '/administration/alternative-packages' },
                { text: '系统服务', link: '/administration/services' },
                { text: '网络设置', link: '/administration/network' },
                { text: '防火墙配置', link: '/administration/firewall' },
                { text: '定时任务', link: '/administration/cron' },
                { text: '日志管理', link: '/administration/logs' },
                { text: '安全管理', link: '/administration/security' },
              ]
            }
          ],
          '/applications/': [
            {
              text: '应用程序',
              items: [
                { text: '开发环境搭建', link: '/applications/development' },
                { text: 'VS Code 和 IDE', link: '/applications/ide' },
                { text: 'LibreOffice 办公', link: '/applications/office' },
                { text: '图像和视频', link: '/applications/multimedia' },
                { text: 'Steam 游戏', link: '/applications/gaming' },
                { text: '虚拟化', link: '/applications/virtualization' },
                { text: 'Windows 兼容 (Wine)', link: '/applications/wine' },
              ]
            }
          ],
          '/troubleshooting/': [
            {
              text: '常见问题解答',
              items: [
                { text: '安装与启动', link: '/troubleshooting/installation-boot' },
                { text: '系统配置与使用', link: '/troubleshooting/system-usage' },
                { text: '软件包管理 (APT)', link: '/troubleshooting/package-management' },
                { text: '桌面环境与显示', link: '/troubleshooting/desktop-display' },
                { text: '网络连接', link: '/troubleshooting/networking' },
                { text: '系统安全与内核', link: '/troubleshooting/security-kernel' },
                { text: '其他问题', link: '/troubleshooting/others' }
              ]
            }
          ]
        },

        // editLink: {
        //   pattern: 'https://github.com/debian-club/debian.club/edit/main/docs/:path',
        //   text: '编辑此页面'
        // },

        lastUpdated: {
          text: '最后更新于'
        },

        docFooter: {
          prev: '上一页',
          next: '下一页'
        },

        outline: {
          label: '页面导航'
        },

        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式'
      }
    },

    en: {
      label: 'English',
      lang: 'en-US',
      title: 'Debian.Club',
      description: 'A Complete Debian Guide for Beginners - Learn Debian Linux from Scratch',
      head: [['meta', { charset: 'UTF-8' }]],
      
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Download', link: '/en/download' },
          {
            text: 'Server',
            items: [
              { text: 'LAMP/LEMP Deployment', link: '/en/server/lamp' },
              { text: 'Java Environment', link: '/en/server/java' },
              { text: 'Docker', link: '/en/server/docker' },
              { text: 'Kubernetes (K8s)', link: '/en/server/k8s' },
              { text: 'Server Hardening', link: '/en/server/security' },
              { text: 'Database Services', link: '/en/server/database' },
              { text: 'File & Network Storage', link: '/en/server/storage' },
              { text: 'Virtualization Platforms', link: '/en/server/virtualization' },
              { text: 'Reverse Proxy', link: '/en/server/reverse-proxy' },
            ]
          },
          { 
            text: 'Basics', 
            items: [
              { text: 'Intro to Debian 13', link: '/en/basics/introduction' },
              { text: 'Installation Guide', link: '/en/basics/installation' },
              { text: 'System Configuration', link: '/en/basics/configuration' },
              { text: 'Desktop Environments', link: '/en/basics/desktop-environments' },
              { text: 'Hardware Compatibility', link: '/en/basics/hardware-compatibility' },
              { text: 'Release EOL', link: '/en/eol' },
            ]
          },
          { 
            text: 'Comparisons',
            items: [
              { text: 'System Comparisons', link: '/en/comparison' },
              { text: 'Version Comparisons', link: '/en/versions' }
            ]
          },
          { 
            text: 'Administration', 
            items: [
              { text: 'User Management', link: '/en/administration/users' },
              { text: 'Package Management', link: '/en/administration/packages' },
              { text: 'System Services', link: '/en/administration/services' },
              { text: 'Network Configuration', link: '/en/administration/network' },
              { text: 'Security Management', link: '/en/administration/security' },
            ]
          },
          { 
            text: 'Applications', 
            items: [
              { text: 'Development', link: '/en/applications/development' },
              { text: 'Office Software', link: '/en/applications/office' },
              { text: 'Multimedia', link: '/en/applications/multimedia' },
              { text: 'Gaming', link: '/en/applications/gaming' },
              { text: 'Windows Compatibility', link: '/en/applications/wine' },
            ]
          },
          { 
            text: 'FAQ', 
            link: '/en/troubleshooting/installation-boot'
          }
        ],

        sidebar: {
          '/en/server/': [
            {
              text: 'Server Configuration',
              items: [
                { text: 'LAMP/LEMP Deployment', link: '/en/server/lamp' },
                { text: 'Java Environment', link: '/en/server/java' },
                { text: 'Docker', link: '/en/server/docker' },
                { text: 'Kubernetes (K8s)', link: '/en/server/k8s' },
                { text: 'Server Hardening', link: '/en/server/security' },
                { text: 'Database Services', link: '/en/server/database' },
                { text: 'File & Network Storage', link: '/en/server/storage' },
                { text: 'Virtualization', link: '/en/server/virtualization' },
                { text: 'Reverse Proxy', link: '/en/server/reverse-proxy' },
              ]
            }
          ],
          '/en/basics/': [
            {
              text: 'Basic Tutorials',
              items: [
                { text: 'Introduction to Debian 13', link: '/en/basics/introduction' },
                { text: "What's New in Debian 13", link: '/en/basics/whats-new' },
                { text: 'System Requirements', link: '/en/basics/requirements' },
                { text: 'Hardware Compatibility', link: '/en/basics/hardware-compatibility' },
                { text: 'Download Images', link: '/en/basics/download' },
                { text: 'Create Bootable Media', link: '/en/basics/bootable-media' },
                { text: 'Installation Process', link: '/en/basics/installation' },
                { text: 'First Boot', link: '/en/basics/first-boot' },
                { text: 'Basic Configuration', link: '/en/basics/configuration' },
                { text: 'Desktop Environments', link: '/en/basics/desktop-environments' }
              ]
            }
          ],
          '/en/administration/': [
            {
              text: 'System Administration',
              items: [
                { text: 'Users and Permissions', link: '/en/administration/users' },
                { text: 'APT Package Management', link: '/en/administration/packages' },
                { text: 'Snap & Flatpak', link: '/en/administration/alternative-packages' },
                { text: 'System Services', link: '/en/administration/services' },
                { text: 'Network Settings', link: '/en/administration/network' },
                { text: 'Firewall Configuration', link: '/en/administration/firewall' },
                { text: 'Cron Jobs', link: '/en/administration/cron' },
                { text: 'Log Management', link: '/en/administration/logs' },
                { text: 'Security Management', link: '/en/administration/security' },
              ]
            }
          ],
          '/en/applications/': [
            {
              text: 'Applications',
              items: [
                { text: 'Development Setup', link: '/en/applications/development' },
                { text: 'VS Code & IDEs', link: '/en/applications/ide' },
                { text: 'LibreOffice Suite', link: '/en/applications/office' },
                { text: 'Graphics & Video', link: '/en/applications/multimedia' },
                { text: 'Steam Gaming', link: '/en/applications/gaming' },
                { text: 'Virtualization', link: '/en/applications/virtualization' },
                { text: 'Windows Compatibility (Wine)', link: '/en/applications/wine' },
              ]
            }
          ],
          '/en/troubleshooting/': [
            {
              text: 'FAQ',
              items: [
                { text: 'Installation & Boot', link: '/en/troubleshooting/installation-boot' },
                { text: 'System Configuration & Usage', link: '/en/troubleshooting/system-usage' },
                { text: 'Package Management (APT)', link: '/en/troubleshooting/package-management' },
                { text: 'Desktop Environment & Display', link: '/en/troubleshooting/desktop-display' },
                { text: 'Networking', link: '/en/troubleshooting/networking' },
                { text: 'System Security & Kernel', link: '/en/troubleshooting/security-kernel' },
                { text: 'Others', link: '/en/troubleshooting/others' }
              ]
            }
          ]
        },

        editLink: {
          pattern: 'https://github.com/debian-club/debian.club/edit/main/docs/:path',
          text: 'Edit this page'
        },

        lastUpdated: {
          text: 'Last Updated'
        },

        docFooter: {
          prev: 'Previous page',
          next: 'Next page'
        },

        outline: {
          label: 'On this page'
        },

        returnToTopLabel: 'Return to top',
        sidebarMenuLabel: 'Menu',
        darkModeSwitchLabel: 'Theme',
        lightModeSwitchTitle: 'Switch to light theme',
        darkModeSwitchTitle: 'Switch to dark theme'
      }
    }
  }
}) 