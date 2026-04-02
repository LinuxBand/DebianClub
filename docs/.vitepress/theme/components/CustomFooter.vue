<template>
  <footer class="custom-footer">
    <div class="featured-badges">
      <a href="https://hicyou.com/" target="_blank" rel="noopener noreferrer">
        <img
          :src="hicyouBadgeUrl"
          alt="Featured on Hicyou"
          class="badge-image"
        />
      </a>
      <a href="https://www.aat.ee/" target="_blank" rel="noopener noreferrer">
        <img
          :src="aatBadgeUrl"
          alt="Featured on AAT"
          class="badge-image"
        />
      </a>
      <a href="https://www.mf8.biz" target="_blank" rel="noopener noreferrer">
        <img
          :src="mf8BadgeUrl"
          alt="已收录于 米饭粑"
          class="badge-image"
        />
      </a>
      <a href="https://bigkr.com" target="_blank" rel="noopener noreferrer">
        <img
          :src="bigkrBadgeUrl"
          alt="Featured on BigKr"
          class="badge-image"
        />
      </a>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { isDark } = useData()

const hicyouBadgeUrl = computed(() => {
  return isDark.value
    ? 'https://hicyou.com/badge/featured-dark.svg'
    : 'https://hicyou.com/badge/featured-light.svg'
})

const aatBadgeUrl = computed(() => {
  return isDark.value
    ? 'https://www.aat.ee/images/badges/top1-dark.svg'
    : 'https://www.aat.ee/images/badges/top1-light.svg'
})

const mf8BadgeUrl = computed(() => {
  return isDark.value
    ? 'https://www.mf8.biz/badge/badge_dark.svg'
    : 'https://www.mf8.biz/badge/badge_light.svg'
})

const bigkrBadgeUrl = computed(() => {
  return isDark.value
    ? 'https://bigkr.com/badge/badge_dark.svg'
    : 'https://bigkr.com/badge/badge_light.svg'
})
</script>

<style scoped>
.custom-footer {
  padding: 32px 24px;
  text-align: center;
  border-top: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
}

.featured-badges {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.badge-image {
  height: 32px;
  width: auto;
  transition: transform 0.2s ease;
}

.badge-image:hover {
  transform: scale(1.05);
}
</style>
