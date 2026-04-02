import { h, onMounted, watch } from 'vue'
import { useRoute, useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import type { Theme } from 'vitepress'
import { toRefs } from 'vue'

function injectJsonLd(title: string, description: string, url: string) {
  if (typeof document === 'undefined') return
  const existing = document.getElementById('json-ld-schema')
  if (existing) existing.remove()
  const script = document.createElement('script')
  script.id = 'json-ld-schema'
  script.type = 'application/ld+json'
  script.text = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    name: title,
    description,
    url,
    publisher: {
      '@type': 'Organization',
      name: 'Debian.Club',
      url: 'https://www.debian.club',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.debian.club/images/debian-logo.svg',
      },
    },
    inLanguage: document.documentElement.lang || 'zh-CN',
  })
  document.head.appendChild(script)
}

// 组件
import MirrorSelector from './components/MirrorSelector.vue'
import CustomFooter from './components/CustomFooter.vue'
import StepWizard from './components/StepWizard.vue'
import DifficultyBadge from './components/DifficultyBadge.vue'
import CommandBlock from './components/CommandBlock.vue'
import VersionBadge from './components/VersionBadge.vue'
import StatsSection from './components/StatsSection.vue'
import TestimonialsSection from './components/TestimonialsSection.vue'
import DownloadPage from './components/DownloadPage.vue'

// Nolebase 阅读增强
import {
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu,
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client'
import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css'

// 进度条
import vitepressBprogress from 'vitepress-plugin-bprogress'
import 'vitepress-plugin-bprogress/style'


export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(CustomFooter),
      'nav-bar-content-after': () => h(NolebaseEnhancedReadabilitiesMenu),
      'nav-screen-content-after': () => h(NolebaseEnhancedReadabilitiesScreenMenu),
    })
  },
  enhanceApp({ app, router, siteData }) {
    // 注册全局组件
    app.component('MirrorSelector', MirrorSelector)
    app.component('StepWizard', StepWizard)
    app.component('DifficultyBadge', DifficultyBadge)
    app.component('CommandBlock', CommandBlock)
    app.component('VersionBadge', VersionBadge)
    app.component('StatsSection', StatsSection)
    app.component('TestimonialsSection', TestimonialsSection)
    app.component('DownloadPage', DownloadPage)

    // 进度条
    vitepressBprogress({ app, router, siteData })
  },
  setup() {
    const { frontmatter, page, site } = toRefs(useData())
    const route = useRoute()

    // Inject JSON-LD on every page navigation
    const updateJsonLd = () => {
      const title = frontmatter.value.title
        ? `${frontmatter.value.title} | Debian.Club`
        : site.value.title
      const description = frontmatter.value.description || site.value.description
      const url = `https://www.debian.club/${page.value.relativePath.replace(/\.md$/, '').replace(/\/index$/, '')}`
      injectJsonLd(title, description, url)
    }

    onMounted(updateJsonLd)
    watch(() => route.path, updateJsonLd)

  }
} satisfies Theme
