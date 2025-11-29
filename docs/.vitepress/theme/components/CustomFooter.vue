<template>
  <footer class="custom-footer">
    <div class="featured-badges">
      <a href="https://hicyou.com/debian-club" target="_blank" rel="noopener noreferrer">
        <img 
          :src="hicyouBadgeUrl" 
          alt="Featured on Hicyou" 
          class="badge-image"
        />
      </a>
      <a href="https://www.aat.ee/projects/debian-club" target="_blank" rel="noopener noreferrer">
        <img 
          :src="aatBadgeUrl" 
          alt="Top 1 on AAT" 
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
