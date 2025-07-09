import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import type { Theme } from 'vitepress'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // 可以在这里添加自定义布局插槽
    })
  },
  enhanceApp({ app, router, siteData }) {
    // 这里可以注册其他自定义组件
  }
} satisfies Theme 