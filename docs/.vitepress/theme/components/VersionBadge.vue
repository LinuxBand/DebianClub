<template>
  <span class="version-badge-group">
    <span
      v-for="ver in versions"
      :key="ver"
      class="version-badge"
      :class="{ current: ver === '13' }"
    >
      Debian {{ ver }}
    </span>
    <span v-if="label" class="version-label">{{ label }}</span>
  </span>
</template>

<script setup lang="ts">
defineProps<{
  versions: string[]
  label?: string
}>()
</script>

<style scoped>
.version-badge-group {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  vertical-align: middle;
}

.version-badge {
  display: inline-block;
  padding: 1px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
}

.version-badge.current {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.version-label {
  font-size: 11px;
  color: var(--vp-c-text-3);
  margin-left: 4px;
}
</style>
