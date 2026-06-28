<template>
  <footer class="custom-footer">
    <nav class="nav-sites" aria-label="导航站合作伙伴 / Navigation partners">
      <a
        v-for="site in navSites"
        :key="site.url"
        :href="site.url"
        target="_blank"
        rel="noopener"
        class="nav-site"
      >
        <img :src="site.logo" alt="" class="nav-logo" loading="lazy" />
        <span class="nav-name">{{ site.name }}</span>
      </a>
    </nav>
  </footer>
</template>

<script setup lang="ts">
// 数据来源：directories-links 项目 link.json -> footer_navigation_sites（导航站）
// 所有外链均为 dofollow（不要添加 rel="nofollow"）。
const navSites = [
  { name: 'aat.ee', url: 'https://www.aat.ee/', logo: '/assets/logos/aat-ee.svg' },
  { name: 'MiFar', url: 'http://mifar.net/', logo: '/assets/logos/mifar.svg' },
  { name: 'Qoo.IM', url: 'https://qoo.im/', logo: '/assets/logos/qoo-im.svg' },
  { name: 'FastD', url: 'http://fastd.top/', logo: '/assets/logos/fastd.svg' },
  { name: 'Xlayers', url: 'http://xlayers.dev/', logo: '/assets/logos/xlayers.svg' },
  { name: 'Upperstory', url: 'http://upperstory.io/', logo: '/assets/logos/upperstory.svg' },
  { name: 'XemVIP', url: 'http://xemvip.com/', logo: '/assets/logos/xemvip.svg' },
  { name: 'SkaChat', url: 'http://skachat.xyz/', logo: '/assets/logos/skachat.svg' },
  { name: 'NexaBlocks', url: 'http://nexablocks.com/', logo: '/assets/logos/nexablocks.svg' },
  { name: 'BlackHawkGame', url: 'http://blackhawkegames.com/', logo: '/assets/logos/blackhawkgame.svg' },
  { name: 'HiCyou', url: 'https://hicyou.com/', logo: '/assets/logos/hicyou.svg' },
  { name: 'BigKr', url: 'https://bigkr.com/', logo: '/assets/logos/bigkr.svg' },
  { name: 'MF8', url: 'https://www.mf8.biz/', logo: '/assets/logos/mf8.svg' },
]
</script>

<style scoped>
.custom-footer {
  padding: 28px 24px;
  border-top: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
}

.nav-sites {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 12px;
  flex-wrap: wrap;
  max-width: 1100px;
  margin: 0 auto;
}

.nav-site {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  text-decoration: none;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.nav-site:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}

.nav-logo {
  height: 22px;
  width: auto;
  display: block;
}

.nav-name {
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.nav-site:hover .nav-name {
  color: var(--vp-c-brand-1);
}
</style>
