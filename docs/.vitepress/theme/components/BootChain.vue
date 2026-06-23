<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { pickStrings } from '../data/infographics'

const { lang } = useData()
const t = computed(() => pickStrings(lang.value).boot)

// language-neutral Phosphor duotone icon per boot stage
const icons = ['ph-cpu', 'ph-list-bullets', 'ph-circuitry', 'ph-gear', 'ph-desktop-tower']
</script>

<template>
  <figure class="ig">
    <figcaption class="ig-title">
      {{ t.title }}
      <img class="ig-art" src="/images/info-chip.png" alt="" loading="lazy" />
    </figcaption>
    <ol class="chain">
      <li v-for="(n, i) in t.nodes" :key="i" class="node">
        <div class="badge" aria-hidden="true"><i :class="['ph-duotone', icons[i]]"></i></div>
        <div class="node-name">{{ n.name }}</div>
        <div class="node-desc">{{ n.desc }}</div>
        <svg v-if="i < t.nodes.length - 1" class="arrow" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 12h15M13 6l6 6-6 6" />
        </svg>
      </li>
    </ol>
  </figure>
</template>

<style scoped>
.ig { border: 1px solid var(--vp-c-divider); border-radius: 12px; background: var(--vp-c-bg-soft); padding: 20px 22px; margin: 22px 0; }
.ig-title { font-weight: 600; font-size: 15px; color: var(--vp-c-text-1); margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.ig-art { width: 56px; height: 56px; flex: 0 0 auto; }
.chain { list-style: none; padding: 0; margin: 0; display: flex; gap: 0; align-items: flex-start; flex-wrap: nowrap; }
.node { position: relative; flex: 1 1 0; min-width: 0; text-align: center; padding: 0 10px; }
.badge { width: 42px; height: 42px; margin: 0 auto 8px; border-radius: 50%; background: var(--vp-c-brand-1); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 22px; }
.node-name { font-size: 13.5px; font-weight: 600; color: var(--vp-c-text-1); line-height: 1.3; }
.node-desc { font-size: 12px; color: var(--vp-c-text-2); margin-top: 4px; line-height: 1.45; }
.arrow { position: absolute; top: 8px; right: -12px; width: 24px; height: 24px; }
.arrow path { fill: none; stroke: var(--vp-c-brand-1); stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
@media (max-width: 720px) {
  .chain { flex-direction: column; gap: 18px; }
  .node { display: grid; grid-template-columns: 42px 1fr; text-align: left; gap: 4px 12px; padding: 0; }
  .badge { margin: 0; grid-row: span 2; }
  .node-name { align-self: center; }
  .arrow { top: auto; bottom: -16px; left: 6px; right: auto; transform: rotate(90deg); }
}
</style>
