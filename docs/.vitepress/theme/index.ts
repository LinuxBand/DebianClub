import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import type { Theme } from 'vitepress'
import MirrorSelector from './components/MirrorSelector.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // 可以在这里添加自定义布局插槽
    })
  },
  enhanceApp({ app, router, siteData }) {
    // 注册全局组件
    app.component('MirrorSelector', MirrorSelector)
  }
} satisfies Theme 