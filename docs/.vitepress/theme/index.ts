import { h } from 'vue'
import { useRoute, useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import type { Theme } from 'vitepress'
import { toRefs } from 'vue'

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

// Giscus 评论
import giscusTalk from 'vitepress-plugin-comment-with-giscus'

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
    const { frontmatter } = toRefs(useData())
    const route = useRoute()

    // Giscus 评论系统
    // TODO: 需要用户在 GitHub 启用 Discussions 后到 https://giscus.app 获取 repoId 和 categoryId
    giscusTalk({
      repo: 'LinuxBand/DebianClub',
      repoId: 'REPLACE_WITH_ACTUAL_REPO_ID',
      category: 'Announcements',
      categoryId: 'REPLACE_WITH_ACTUAL_CATEGORY_ID',
      mapping: 'pathname',
      inputPosition: 'top',
      lang: 'zh-CN',
      lightTheme: 'light',
      darkTheme: 'transparent_dark',
    }, {
      frontmatter,
      route
    }, true)
  }
} satisfies Theme
