<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { pickStrings } from '../data/infographics'

const { lang } = useData()
const t = computed(() => pickStrings(lang.value).disk)

const segs = [
  { key: 'efi',  mount: '/boot/efi', bar: 'EFI',   fs: 'FAT32', cls: 'c-indigo', x: 0,   w: 66  },
  { key: 'root', mount: '/',         bar: '/',     fs: 'ext4',  cls: 'c-red',    x: 70,  w: 300 },
  { key: 'home', mount: '/home',     bar: '/home', fs: 'ext4',  cls: 'c-green',  x: 374, w: 540 },
  { key: 'swap', mount: 'swap',      bar: 'swap',  fs: 'swap',  cls: 'c-gray',   x: 918, w: 82  },
] as const
</script>

<template>
  <figure class="ig">
    <figcaption class="ig-title">{{ t.title }}</figcaption>
    <div class="ig-row">
      <div class="ig-grow">
        <svg class="bar" viewBox="0 0 1000 56" role="img" :aria-label="t.title">
          <rect v-for="s in segs" :key="s.key" :class="['seg', s.cls]" :x="s.x" y="6" :width="s.w" height="44" rx="5" />
          <text v-for="s in segs" :key="s.key + 'l'" class="seg-label" :x="s.x + s.w / 2" y="34" text-anchor="middle">{{ s.bar }}</text>
        </svg>
        <ul class="parts">
          <li v-for="s in segs" :key="s.key" class="part">
            <span :class="['dot', s.cls]" aria-hidden="true"></span>
            <div>
              <div class="part-head"><code>{{ s.mount }}</code> <span class="muted">{{ s.fs }} · {{ (t as any)[s.key].size }}</span></div>
              <div class="part-desc">{{ (t as any)[s.key].desc }}</div>
            </div>
          </li>
        </ul>
      </div>
      <img class="ig-art" src="/images/info-disk.png" alt="" loading="lazy" />
    </div>
    <p class="ig-note">{{ t.note }}</p>
  </figure>
</template>

<style scoped>
.ig { border: 1px solid var(--vp-c-divider); border-radius: 12px; background: var(--vp-c-bg-soft); padding: 20px 22px; margin: 22px 0; }
.ig-title { font-weight: 600; font-size: 15px; color: var(--vp-c-text-1); margin-bottom: 14px; }
.ig-row { display: flex; gap: 20px; align-items: center; flex-wrap: wrap; }
.ig-grow { flex: 1 1 360px; min-width: 0; }
.ig-art { width: 132px; height: auto; flex: 0 0 auto; align-self: center; }
.bar { width: 100%; height: auto; display: block; }
.seg { stroke: var(--vp-c-bg-soft); stroke-width: 3; }
.seg-label { fill: #fff; font-size: 15px; font-weight: 600; font-family: var(--vp-font-family-mono); }
.c-indigo { fill: var(--vp-c-indigo-1); }
.c-red { fill: var(--vp-c-brand-1); }
.c-green { fill: var(--vp-c-green-1); }
.c-gray { fill: var(--vp-c-gray-1); }
.parts { list-style: none; padding: 0; margin: 16px 0 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 10px 18px; }
.part { display: flex; gap: 8px; }
.dot { width: 12px; height: 12px; border-radius: 3px; flex: 0 0 auto; margin-top: 5px; }
.dot.c-indigo { background: var(--vp-c-indigo-1); }
.dot.c-red { background: var(--vp-c-brand-1); }
.dot.c-green { background: var(--vp-c-green-1); }
.dot.c-gray { background: var(--vp-c-gray-1); }
.part-head { font-size: 14px; color: var(--vp-c-text-1); }
.part-head code { font-size: 13px; }
.muted { color: var(--vp-c-text-3); font-size: 12px; }
.part-desc { color: var(--vp-c-text-2); font-size: 13px; margin-top: 2px; line-height: 1.5; }
.ig-note { color: var(--vp-c-text-2); font-size: 13px; margin: 16px 0 0; line-height: 1.6; }
@media (max-width: 640px) { .ig-art { width: 96px; } .seg-label { font-size: 18px; } }
</style>
