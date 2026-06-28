<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { pickStrings } from '../data/infographics'

const { lang } = useData()
const t = computed(() => pickStrings(lang.value).perms)

const rwx = ['r', 'w', 'x']
const weights = [4, 2, 1]
const groups = computed(() => [
  { key: 'owner', label: t.value.owner, bits: [true, true, true] },   // rwx = 7
  { key: 'group', label: t.value.group, bits: [true, false, true] },  // r-x = 5
  { key: 'other', label: t.value.other, bits: [true, false, true] },  // r-x = 5
])
const digit = (bits: boolean[]) => (bits[0] ? 4 : 0) + (bits[1] ? 2 : 0) + (bits[2] ? 1 : 0)
</script>

<template>
  <figure class="ig">
    <figcaption class="ig-title">
      {{ t.title }}
      <img class="ig-art" src="/images/info-lock.png" alt="" loading="lazy" />
    </figcaption>
    <div class="perm">
      <span class="seg t">-</span>
      <span class="seg g-owner">rwx</span>
      <span class="seg g-group">r-x</span>
      <span class="seg g-other">r-x</span>
      <span class="eq">= 755</span>
    </div>
    <div class="cards">
      <div v-for="g in groups" :key="g.key" class="card" :class="g.key">
        <div class="clabel">{{ g.label }}</div>
        <svg class="bits" viewBox="0 0 134 38" aria-hidden="true">
          <g v-for="(b, bi) in g.bits" :key="bi">
            <rect class="bit" :class="b ? 'on ' + g.key : 'off'" :x="bi * 44 + 2" y="2" width="40" height="34" rx="5" />
            <text class="bc" :class="{ off: !b }" :x="bi * 44 + 22" y="18" text-anchor="middle">{{ b ? rwx[bi] : '-' }}</text>
            <text class="bw" :class="{ off: !b }" :x="bi * 44 + 22" y="30" text-anchor="middle">{{ weights[bi] }}</text>
          </g>
        </svg>
        <div class="digit" :class="g.key">{{ digit(g.bits) }}</div>
      </div>
    </div>
    <div class="legend">
      <span><b>r</b> {{ t.r }} · 4</span>
      <span><b>w</b> {{ t.w }} · 2</span>
      <span><b>x</b> {{ t.x }} · 1</span>
    </div>
    <p class="ig-note">{{ t.note }}</p>
  </figure>
</template>

<style scoped>
.ig { border: 1px solid var(--vp-c-divider); border-radius: 12px; background: var(--vp-c-bg-soft); padding: 20px 22px; margin: 22px 0; }
.ig-title { font-weight: 600; font-size: 15px; color: var(--vp-c-text-1); margin-bottom: 14px; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.ig-art { width: 52px; height: 52px; flex: 0 0 auto; }
.perm { font-family: var(--vp-font-family-mono); font-size: 26px; letter-spacing: 2px; display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
.perm .seg { padding: 2px 8px; border-radius: 6px; font-weight: 700; }
.perm .t { color: var(--vp-c-text-3); }
.perm .g-owner { background: var(--vp-c-red-soft); color: var(--vp-c-red-1); }
.perm .g-group { background: var(--vp-c-green-soft); color: var(--vp-c-green-1); }
.perm .g-other { background: var(--vp-c-indigo-soft); color: var(--vp-c-indigo-1); }
.perm .eq { font-size: 22px; color: var(--vp-c-text-2); margin-left: 4px; }
.cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 16px; }
.card { border: 1px solid var(--vp-c-divider); border-radius: 9px; padding: 10px; text-align: center; background: var(--vp-c-bg); }
.clabel { font-size: 13px; font-weight: 600; color: var(--vp-c-text-1); margin-bottom: 6px; }
.bits { width: 100%; max-width: 134px; height: auto; }
.bit.off { fill: var(--vp-c-bg-alt); stroke: var(--vp-c-divider); }
.bit.on.owner { fill: var(--vp-c-red-soft); stroke: var(--vp-c-red-1); }
.bit.on.group { fill: var(--vp-c-green-soft); stroke: var(--vp-c-green-1); }
.bit.on.other { fill: var(--vp-c-indigo-soft); stroke: var(--vp-c-indigo-1); }
.bit { stroke-width: 1.4; }
.bc { fill: var(--vp-c-text-1); font-size: 13px; font-weight: 700; font-family: var(--vp-font-family-mono); }
.bw { fill: var(--vp-c-text-3); font-size: 9px; }
.bc.off, .bw.off { fill: var(--vp-c-text-3); }
.digit { font-size: 22px; font-weight: 700; margin-top: 4px; font-family: var(--vp-font-family-mono); }
.digit.owner { color: var(--vp-c-red-1); }
.digit.group { color: var(--vp-c-green-1); }
.digit.other { color: var(--vp-c-indigo-1); }
.legend { display: flex; gap: 18px; flex-wrap: wrap; margin-top: 14px; font-size: 13px; color: var(--vp-c-text-2); }
.legend b { font-family: var(--vp-font-family-mono); color: var(--vp-c-text-1); }
.ig-note { color: var(--vp-c-text-2); font-size: 13px; margin: 14px 0 0; line-height: 1.6; }
@media (max-width: 520px) { .cards { grid-template-columns: 1fr; } .perm { font-size: 22px; } }
</style>
