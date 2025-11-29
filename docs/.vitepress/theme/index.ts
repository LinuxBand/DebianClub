import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import type { Theme } from 'vitepress'
import MirrorSelector from './components/MirrorSelector.vue'
import CustomFooter from './components/CustomFooter.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(CustomFooter)
    })
  },
  enhanceApp({ app, router, siteData }) {
    // 注册全局组件
    app.component('MirrorSelector', MirrorSelector)
  }
} satisfies Theme 