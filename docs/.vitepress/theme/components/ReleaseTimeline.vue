<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useData } from 'vitepress'
import { pickStrings } from '../data/infographics'

const { lang } = useData()
const t = computed(() => pickStrings(lang.value).timeline)

// Language-neutral data (decimal years). End dates for 13/14 are estimates.
const A0 = 2021, A1 = 2031, PX0 = 168, PX1 = 975
const TOP = 26, ROWH = 40
const x = (y: number) => PX0 + ((y - A0) / (A1 - A0)) * (PX1 - PX0)

// "Today" marker: static fallback for SSR, then the real date after mount
// (kept out of setup-time SSR to avoid a hydration mismatch).
const today = ref(2026.45)
onMounted(() => {
  const d = new Date()
  today.value = d.getFullYear() + d.getMonth() / 12 + d.getDate() / 365
})

const data = [
  { v: 'Debian 14', code: 'Forky',    rel: 2027.4, planned: true },
  { v: 'Debian 13', code: 'Trixie',   rel: 2025.6, reg: 2028.6,  lts: 2030.6 },
  { v: 'Debian 12', code: 'Bookworm', rel: 2023.45, reg: 2026.45, lts: 2028.45 },
  { v: 'Debian 11', code: 'Bullseye', rel: 2021.6, reg: 2024.55, lts: 2026.6 },
]

const rows = computed(() => data.map((d, i) => {
  const y = TOP + i * ROWH
  const base = { v: d.v, code: d.code, y, l1: y + 9, l2: y + 22 }
  if (d.planned) return { ...base, planned: true, px: x(d.rel), pw: Math.max(8, x(2029.4) - x(d.rel)) }
  return { ...base, full: { x: x(d.rel!), w: x(d.reg!) - x(d.rel!) }, lts: { x: x(d.reg!), w: x(d.lts!) - x(d.reg!) } }
}))

const ticks = [2021, 2023, 2025, 2027, 2029, 2031]
const axisY = TOP + 4 * ROWH + 4
const todayX = computed(() => x(Math.min(A1, Math.max(A0, today.value))))
const H = axisY + 26
</script>

<template>
  <figure class="ig">
    <figcaption class="ig-title">{{ t.title }}</figcaption>
    <div class="ig-row">
      <div class="ig-grow">
        <svg class="tl" :viewBox="`0 0 1000 ${H}`" role="img" :aria-label="t.title">
          <line class="today" :x1="todayX" y1="14" :x2="todayX" :y2="axisY" />
          <text class="today-label" :x="todayX" y="10" text-anchor="middle">{{ t.today }}</text>
          <g v-for="r in rows" :key="r.v">
            <text class="vlabel" x="6" :y="r.l1">{{ r.v }}</text>
            <text class="vcode" x="6" :y="r.l2">{{ r.code }}</text>
            <template v-if="r.planned">
              <rect class="bar planned" :x="r.px" :y="r.y" :width="r.pw" height="22" rx="5" />
            </template>
            <template v-else>
              <rect class="bar full" :x="r.full!.x" :y="r.y" :width="r.full!.w" height="22" rx="5" />
              <rect class="bar lts" :x="r.lts!.x" :y="r.y" :width="r.lts!.w" height="22" rx="5" />
            </template>
          </g>
          <line class="axis" :x1="PX0" :y1="axisY" :x2="PX1" :y2="axisY" />
          <g v-for="yr in ticks" :key="yr">
            <line class="tick" :x1="x(yr)" :y1="axisY" :x2="x(yr)" :y2="axisY + 5" />
            <text class="tickn" :x="x(yr)" :y="axisY + 18" text-anchor="middle">{{ yr }}</text>
          </g>
        </svg>
        <div class="legend">
          <span><i class="sw full"></i>{{ t.full }}</span>
          <span><i class="sw lts"></i>{{ t.lts }}</span>
          <span><i class="sw planned"></i>{{ t.planned }}</span>
        </div>
      </div>
      <img class="ig-art" src="/images/info-calendar.png" alt="" loading="lazy" />
    </div>
    <p class="ig-note">{{ t.note }}</p>
  </figure>
</template>

<style scoped>
.ig { border: 1px solid var(--vp-c-divider); border-radius: 12px; background: var(--vp-c-bg-soft); padding: 20px 22px; margin: 22px 0; }
.ig-title { font-weight: 600; font-size: 15px; color: var(--vp-c-text-1); margin-bottom: 12px; }
.ig-row { display: flex; gap: 18px; align-items: center; flex-wrap: wrap; }
.ig-grow { flex: 1 1 380px; min-width: 0; }
.ig-art { width: 120px; height: auto; flex: 0 0 auto; align-self: center; }
.tl { width: 100%; height: auto; display: block; }
.bar.full { fill: var(--vp-c-green-1); }
.bar.lts { fill: var(--vp-c-yellow-1); }
.bar.planned { fill: var(--vp-c-indigo-soft); stroke: var(--vp-c-indigo-1); stroke-width: 1.5; stroke-dasharray: 5 4; }
.today { stroke: var(--vp-c-brand-1); stroke-width: 2; stroke-dasharray: 4 3; }
.today-label { fill: var(--vp-c-brand-1); font-size: 11px; font-weight: 700; }
.vlabel { fill: var(--vp-c-text-1); font-size: 13px; font-weight: 600; }
.vcode { fill: var(--vp-c-text-3); font-size: 11px; }
.axis, .tick { stroke: var(--vp-c-divider); stroke-width: 1; }
.tickn { fill: var(--vp-c-text-3); font-size: 11px; }
.legend { display: flex; gap: 18px; flex-wrap: wrap; margin-top: 12px; font-size: 13px; color: var(--vp-c-text-2); }
.legend span { display: inline-flex; align-items: center; gap: 6px; }
.sw { width: 14px; height: 10px; border-radius: 3px; display: inline-block; }
.sw.full { background: var(--vp-c-green-1); }
.sw.lts { background: var(--vp-c-yellow-1); }
.sw.planned { background: var(--vp-c-indigo-soft); border: 1.5px dashed var(--vp-c-indigo-1); }
.ig-note { color: var(--vp-c-text-2); font-size: 13px; margin: 14px 0 0; line-height: 1.6; }
@media (max-width: 640px) { .ig-art { width: 88px; } }
</style>
