<template>
  <span class="difficulty-badge" :class="level" :title="tooltip">
    {{ label }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const props = defineProps<{
  level: 'beginner' | 'intermediate' | 'advanced'
}>()

const { lang } = useData()

const isZh = computed(() => lang.value.startsWith('zh'))

const label = computed(() => {
  const labels = {
    beginner: isZh.value ? '入门' : 'Beginner',
    intermediate: isZh.value ? '中级' : 'Intermediate',
    advanced: isZh.value ? '高级' : 'Advanced',
  }
  return labels[props.level]
})

const tooltip = computed(() => {
  const tooltips = {
    beginner: isZh.value ? '适合新手' : 'Suitable for newcomers',
    intermediate: isZh.value ? '需要一些基础' : 'Requires some experience',
    advanced: isZh.value ? '需要丰富经验' : 'Requires significant experience',
  }
  return tooltips[props.level]
})
</script>

<style scoped>
.difficulty-badge {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.5;
  vertical-align: middle;
}

.difficulty-badge.beginner {
  background-color: #dcfce7;
  color: #166534;
}

.difficulty-badge.intermediate {
  background-color: #fef3c7;
  color: #92400e;
}

.difficulty-badge.advanced {
  background-color: #fee2e2;
  color: #991b1b;
}

.dark .difficulty-badge.beginner {
  background-color: rgba(34, 197, 94, 0.15);
  color: #86efac;
}

.dark .difficulty-badge.intermediate {
  background-color: rgba(245, 158, 11, 0.15);
  color: #fcd34d;
}

.dark .difficulty-badge.advanced {
  background-color: rgba(239, 68, 68, 0.15);
  color: #fca5a5;
}
</style>
