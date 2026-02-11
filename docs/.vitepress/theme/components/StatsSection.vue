<template>
  <section class="stats-section">
    <h2 class="stats-title">{{ isZh ? 'Debian 数字概览' : 'Debian by the Numbers' }}</h2>
    <div class="stats-grid">
      <div v-for="stat in stats" :key="stat.labelEn" class="stat-card">
        <div class="stat-number">{{ stat.number }}</div>
        <div class="stat-label">{{ isZh ? stat.labelZh : stat.labelEn }}</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()
const isZh = computed(() => lang.value.startsWith('zh'))

const stats = [
  { number: '50,000+', labelZh: '软件包', labelEn: 'Packages' },
  { number: '14+', labelZh: '支持架构', labelEn: 'Architectures' },
  { number: '1,000+', labelZh: '活跃开发者', labelEn: 'Active Developers' },
  { number: '30+', labelZh: '年历史', labelEn: 'Years of History' },
]
</script>

<style scoped>
.stats-section {
  padding: 48px 24px;
  text-align: center;
}

.stats-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 32px;
  color: var(--vp-c-text-1);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  max-width: 800px;
  margin: 0 auto;
}

.stat-card {
  padding: 24px 16px;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
}

.stat-number {
  font-size: 32px;
  font-weight: 800;
  color: var(--vp-c-brand-1);
  line-height: 1;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

@media (max-width: 640px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
