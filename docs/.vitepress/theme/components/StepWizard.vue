<template>
  <div class="step-wizard">
    <div
      v-for="(step, index) in steps"
      :key="index"
      class="step-item"
    >
      <div class="step-indicator">
        <div class="step-circle">{{ index + 1 }}</div>
        <div v-if="index < steps.length - 1" class="step-line"></div>
      </div>
      <div class="step-content">
        <h4 class="step-title">{{ step.title }}</h4>
        <p class="step-description">{{ step.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Step {
  title: string
  description: string
}

defineProps<{
  steps: Step[]
}>()
</script>

<style scoped>
.step-wizard {
  padding: 16px 0;
}

.step-item {
  display: flex;
  gap: 16px;
  position: relative;
}

.step-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.step-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  z-index: 1;
}

.step-line {
  width: 2px;
  flex: 1;
  background: linear-gradient(to bottom, var(--vp-c-brand-1), var(--vp-c-brand-soft));
  min-height: 24px;
}

.step-content {
  padding-bottom: 24px;
}

.step-title {
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.step-description {
  margin: 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}
</style>
