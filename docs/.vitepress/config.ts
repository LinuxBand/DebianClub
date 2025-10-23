import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Debian.Club',
  description: 'Debian 初学者完全指南',
  cleanUrls: true,
  lang: 'zh-CN',

  head: [
    ['meta', { charset: 'UTF-8' }],
    ['meta', { name: 'theme-color', content: '#d41443' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

  themeConfig: {
    logo: '/images/debian-logo.svg',
    siteTitle: 'Debian.Club',
    search: { provider: 'local' },
    nav: [
      { text: '首页', link: '/' },
      { text: '下载', link: '/download' },
      { text: '入门', link: '/basics/introduction' },
      { text: 'English', link: '/en/' }
    ],
    footer: {
      copyright: 'Copyright © 2025 Debian.Club'
    }
  },

  sitemap: {
    hostname: 'https://www.debian.club'
  }
})

