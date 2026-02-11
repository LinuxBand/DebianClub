<template>
  <div class="download-page">
    <!-- Hero -->
    <div class="download-hero">
      <h1>{{ t.pageTitle }}</h1>
      <p>{{ t.pageSubtitle }}</p>
    </div>

    <!-- Step 1: Country & Mirror -->
    <section class="download-section">
      <h2><span class="step-num">1</span> {{ t.step1 }}</h2>
      <div class="mirror-panel">
        <select v-model="selectedCountryCode" class="country-select">
          <option value="">{{ t.useOfficialMirror }}</option>
          <optgroup v-for="group in groupedCountries" :key="group.id" :label="regionLabel(group)">
            <option v-for="country in group.countries" :key="country.code" :value="country.code">
              {{ country.flag }} {{ countryName(country) }}
            </option>
          </optgroup>
        </select>

        <div v-if="selectedCountry" class="mirror-grid">
          <div
            v-for="mirror in selectedCountry.mirrors"
            :key="mirror.id"
            class="mirror-card"
            :class="{ active: selectedMirror.id === mirror.id }"
            @click="selectMirror(mirror)"
          >
            <span class="mirror-name">{{ mirrorName(mirror) }}</span>
            <span v-if="mirror.sponsor" class="mirror-sponsor">{{ mirror.sponsor }}</span>
          </div>
        </div>

        <div v-if="!selectedCountry" class="mirror-current">
          <span class="mirror-label">{{ t.selectedMirror }}:</span>
          <span class="mirror-value">{{ mirrorName(OFFICIAL_MIRROR) }}</span>
        </div>
      </div>
    </section>

    <!-- Step 2: Version -->
    <section class="download-section">
      <h2><span class="step-num">2</span> {{ t.step2 }}</h2>
      <div class="version-tabs">
        <button
          v-for="ver in debianVersions"
          :key="ver.id"
          class="version-tab"
          :class="[ver.badge, { active: selectedVersion.id === ver.id }]"
          @click="selectedVersion = ver"
        >
          <div class="version-tab-header">
            <span class="version-name">{{ ver.label[langKey] }}</span>
            <span class="channel-badge" :class="ver.badge">{{ channelLabel(ver) }}</span>
            <span v-if="ver.channel === 'stable'" class="rec-badge">{{ t.recommended }}</span>
          </div>
          <div class="version-desc">{{ ver.description[langKey] }}</div>
        </button>
      </div>

      <div v-if="selectedVersion.releaseDate || selectedVersion.eolDate" class="version-meta">
        <span v-if="selectedVersion.releaseDate">{{ t.releasedOn }}: {{ selectedVersion.releaseDate }}</span>
        <span v-if="selectedVersion.eolDate"> · {{ t.supportedUntil }}: {{ selectedVersion.eolDate }}</span>
      </div>

      <div v-if="selectedVersion.channel === 'testing'" class="notice warning">
        {{ t.testingWarning }}
      </div>
      <div v-if="selectedVersion.channel === 'unstable'" class="notice danger">
        {{ t.unstableWarning }}
      </div>
    </section>

    <!-- Step 3: Architecture & ISO Type -->
    <section class="download-section">
      <h2><span class="step-num">3</span> {{ t.step3 }}</h2>
      <div class="selection-row">
        <div class="select-group">
          <label>{{ t.selectArchitecture }}</label>
          <select v-model="selectedArch" class="arch-select">
            <option v-for="arch in selectedVersion.architectures" :key="arch.id" :value="arch.id">
              {{ arch.label }} — {{ arch.description[langKey] }}
            </option>
          </select>
          <span class="select-tip">{{ t.archTip }}</span>
        </div>
        <div class="select-group">
          <label>{{ t.selectIsoType }}</label>
          <div class="iso-cards">
            <button
              v-for="iso in selectedVersion.isoTypes"
              :key="iso.id"
              class="iso-card"
              :class="{ active: selectedIsoType === iso.id }"
              @click="selectedIsoType = iso.id"
            >
              <div class="iso-card-top">
                <span class="iso-name">{{ iso.label[langKey] }}</span>
                <span v-if="iso.recommended" class="rec-tag">{{ t.recommendedTag }}</span>
              </div>
              <span class="iso-size">{{ iso.size }}</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Download Actions -->
    <section class="download-actions">
      <div v-if="usingFallback" class="notice info">
        {{ t.fallbackNotice }}
      </div>

      <a :href="urls.directoryUrl" target="_blank" rel="noopener" class="btn-download">
        {{ t.downloadNow }}
      </a>

      <div class="secondary-actions">
        <a v-if="urls.torrentUrl" :href="urls.torrentUrl" target="_blank" rel="noopener" class="btn-secondary">
          {{ t.downloadTorrent }}
        </a>
        <a :href="urls.directoryUrl" target="_blank" rel="noopener" class="btn-secondary">
          {{ t.browseDirectory }}
        </a>
        <button class="btn-secondary" @click="copyLink">
          {{ linkCopied ? t.linkCopied : t.copyLink }}
        </button>
        <a :href="urls.checksumUrl" target="_blank" rel="noopener" class="btn-secondary">
          {{ t.viewChecksum }}
        </a>
      </div>
    </section>

    <!-- Verification -->
    <section class="download-section verification">
      <h3>{{ t.verificationTitle }}</h3>
      <p>{{ t.verificationDesc }}</p>
      <div class="verify-commands">
        <div class="verify-block">
          <span class="verify-label">Linux / macOS:</span>
          <div class="verify-cmd">
            <code>sha256sum -c SHA256SUMS</code>
          </div>
        </div>
        <div class="verify-block">
          <span class="verify-label">Windows (PowerShell):</span>
          <div class="verify-cmd">
            <code>Get-FileHash debian-*.iso -Algorithm SHA256</code>
          </div>
        </div>
      </div>
    </section>

    <!-- Help & Next Steps -->
    <section class="download-section">
      <details class="help-details">
        <summary>{{ t.helpTitle }}</summary>
        <ul>
          <li>{{ t.helpNetinst }}</li>
          <li>{{ t.helpDvd }}</li>
          <li>{{ t.helpLive }}</li>
          <li>{{ t.helpArch }}</li>
        </ul>
        <a :href="detailedGuidePath" class="help-link">{{ t.helpMore }} →</a>
      </details>

      <div class="next-steps">
        <h3>{{ t.nextSteps }}</h3>
        <div class="next-links">
          <a :href="bootableMediaPath" class="next-card">
            <span class="next-icon">💿</span>
            <span>{{ t.nextBootableMedia }}</span>
          </a>
          <a :href="installationPath" class="next-card">
            <span class="next-icon">🛠️</span>
            <span>{{ t.nextInstallation }}</span>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useData } from 'vitepress'
import { countries, regions, OFFICIAL_MIRROR, getDefaultCountryCode, type Mirror, type Country } from '../data/mirrors'
import { debianVersions, buildDownloadUrls } from '../data/debian-versions'
import { downloadI18n } from '../data/i18n/download'

const { lang } = useData()
const langKey = computed<'zh' | 'en'>(() => lang.value.startsWith('zh') ? 'zh' : 'en')
const t = computed(() => downloadI18n[langKey.value])

const selectedCountryCode = ref('')
const selectedMirror = ref<Mirror>(OFFICIAL_MIRROR)
const selectedVersion = ref(debianVersions[0])
const selectedArch = ref('amd64')
const selectedIsoType = ref('netinst')
const linkCopied = ref(false)

const selectedCountry = computed(() =>
  countries.find(c => c.code === selectedCountryCode.value) || null
)

const groupedCountries = computed(() => {
  const priorityCountry = langKey.value === 'zh' ? 'CN' : 'US'
  const regionOrder: Record<string, string[]> = {
    zh: ['asia', 'europe', 'americas', 'oceania'],
    en: ['americas', 'europe', 'asia', 'oceania'],
  }
  const order = regionOrder[langKey.value] || regionOrder.en
  const sorted = [...regions].sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id))
  return sorted.map(r => ({
    ...r,
    countries: countries
      .filter(c => c.region === r.id)
      .sort((a, b) => (a.code === priorityCountry ? -1 : b.code === priorityCountry ? 1 : 0)),
  })).filter(g => g.countries.length > 0)
})

const effectiveMirror = computed(() => {
  const ch = selectedVersion.value.channel
  if ((ch === 'testing' || ch === 'unstable') && !selectedMirror.value.hasFullCdimage) {
    return OFFICIAL_MIRROR
  }
  return selectedMirror.value
})

const usingFallback = computed(() =>
  effectiveMirror.value.id !== selectedMirror.value.id
)

const urls = computed(() =>
  buildDownloadUrls(
    selectedVersion.value,
    selectedArch.value,
    selectedIsoType.value,
    effectiveMirror.value.cdImageBaseUrl,
    effectiveMirror.value.cdimageBaseUrl,
  )
)

const detailedGuidePath = computed(() => langKey.value === 'zh' ? '/basics/download' : '/en/basics/download')
const bootableMediaPath = computed(() => langKey.value === 'zh' ? '/basics/bootable-media' : '/en/basics/bootable-media')
const installationPath = computed(() => langKey.value === 'zh' ? '/basics/installation' : '/en/basics/installation')

watch(selectedVersion, (v) => {
  if (!v.architectures.find(a => a.id === selectedArch.value)) {
    selectedArch.value = v.architectures[0]?.id || 'amd64'
  }
  if (!v.isoTypes.find(t => t.id === selectedIsoType.value)) {
    selectedIsoType.value = v.isoTypes[0]?.id || 'netinst'
  }
})

watch(selectedCountryCode, (code) => {
  if (!code) {
    selectedMirror.value = OFFICIAL_MIRROR
    return
  }
  const country = countries.find(c => c.code === code)
  if (country?.mirrors.length) {
    selectedMirror.value = country.mirrors[0]
  }
})

function selectMirror(mirror: Mirror) {
  selectedMirror.value = mirror
}

function mirrorName(m: Mirror) {
  return langKey.value === 'zh' ? m.name.zh : m.name.en
}

function countryName(c: Country) {
  return langKey.value === 'zh' ? c.name.zh : c.name.en
}

function regionLabel(r: typeof groupedCountries.value[0]) {
  return langKey.value === 'zh' ? r.name.zh : r.name.en
}

function channelLabel(v: typeof debianVersions[0]) {
  const map = { stable: t.value.stable, oldstable: t.value.oldstable, testing: t.value.testing, unstable: t.value.unstable }
  return map[v.channel] || v.channel
}

function copyLink() {
  navigator.clipboard.writeText(urls.value.directoryUrl).then(() => {
    linkCopied.value = true
    setTimeout(() => { linkCopied.value = false }, 2000)
  })
}

onMounted(() => {
  const code = getDefaultCountryCode()
  if (code) selectedCountryCode.value = code
})
</script>

<style scoped>
.download-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 24px 48px;
}

/* Hero */
.download-hero {
  text-align: center;
  padding: 32px 0 16px;
}
.download-hero h1 {
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #d41443, #a0122e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 8px;
}
.download-hero p {
  color: var(--vp-c-text-2);
  font-size: 16px;
  margin: 0;
}

/* Sections */
.download-section {
  margin-bottom: 32px;
}
.download-section h2 {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 16px;
  border: none;
}
.download-section h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px;
}
.step-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  color: white;
  font-size: 14px;
  font-weight: bold;
  flex-shrink: 0;
}

/* Country & Mirror */
.mirror-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.country-select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 14px;
  cursor: pointer;
}
.mirror-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 8px;
}
.mirror-card {
  padding: 10px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: var(--vp-c-bg-soft);
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.mirror-card:hover {
  border-color: var(--vp-c-brand-2);
}
.mirror-card.active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
.mirror-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.mirror-sponsor {
  font-size: 11px;
  color: var(--vp-c-text-3);
}
.mirror-current {
  font-size: 14px;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 8px;
}
.mirror-label {
  font-weight: 600;
}

/* Version Tabs */
.version-tabs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}
.version-tab {
  padding: 14px;
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}
.version-tab:hover {
  border-color: var(--vp-c-brand-2);
}
.version-tab.active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
.version-tab-header {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 4px;
}
.version-name {
  font-weight: 700;
  font-size: 14px;
  color: var(--vp-c-text-1);
}
.channel-badge {
  display: inline-block;
  padding: 1px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
}
.channel-badge.success { background: #d1fae5; color: #059669; }
.channel-badge.info { background: #dbeafe; color: #2563eb; }
.channel-badge.warning { background: #fef3c7; color: #d97706; }
.channel-badge.danger { background: #fee2e2; color: #dc2626; }
.dark .channel-badge.success { background: rgba(16,185,129,0.15); color: #6ee7b7; }
.dark .channel-badge.info { background: rgba(59,130,246,0.15); color: #93bbfd; }
.dark .channel-badge.warning { background: rgba(245,158,11,0.15); color: #fcd34d; }
.dark .channel-badge.danger { background: rgba(239,68,68,0.15); color: #fca5a5; }
.rec-badge {
  display: inline-block;
  padding: 1px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: var(--vp-c-brand-1);
  color: white;
}
.version-desc {
  font-size: 12px;
  color: var(--vp-c-text-2);
}
.version-meta {
  font-size: 13px;
  color: var(--vp-c-text-3);
  margin-top: 8px;
}

/* Notices */
.notice {
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 13px;
  margin-top: 10px;
}
.notice.warning {
  background: #fef3c7;
  color: #92400e;
  border: 1px solid #fde68a;
}
.notice.danger {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #fecaca;
}
.notice.info {
  background: #dbeafe;
  color: #1e40af;
  border: 1px solid #bfdbfe;
}
.dark .notice.warning { background: rgba(245,158,11,0.1); color: #fcd34d; border-color: rgba(245,158,11,0.2); }
.dark .notice.danger { background: rgba(239,68,68,0.1); color: #fca5a5; border-color: rgba(239,68,68,0.2); }
.dark .notice.info { background: rgba(59,130,246,0.1); color: #93bbfd; border-color: rgba(59,130,246,0.2); }

/* Architecture & ISO Type */
.selection-row {
  display: flex;
  gap: 24px;
}
.select-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.select-group label {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.arch-select {
  padding: 10px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 14px;
}
.select-tip {
  font-size: 12px;
  color: var(--vp-c-text-3);
}
.iso-cards {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.iso-card {
  flex: 1;
  min-width: 120px;
  padding: 10px 14px;
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}
.iso-card:hover {
  border-color: var(--vp-c-brand-2);
}
.iso-card.active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
.iso-card-top {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 2px;
}
.iso-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.rec-tag {
  font-size: 10px;
  font-weight: 600;
  padding: 1px 6px;
  border-radius: 8px;
  background: var(--vp-c-brand-1);
  color: white;
}
.iso-size {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

/* Download Actions */
.download-actions {
  text-align: center;
  margin-bottom: 32px;
  padding: 24px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
}
.btn-download {
  display: inline-block;
  padding: 14px 48px;
  border-radius: 10px;
  background: var(--vp-c-brand-1);
  color: white;
  font-size: 18px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s ease;
  margin-bottom: 16px;
}
.btn-download:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(212, 20, 67, 0.3);
  text-decoration: none;
  color: white;
}
.secondary-actions {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}
.btn-secondary {
  padding: 6px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 13px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
}
.btn-secondary:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

/* Verification */
.verification {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
}
.verification p {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin: 0 0 12px;
}
.verify-commands {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.verify-block {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.verify-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-3);
}
.verify-cmd {
  background: #1a1a1a;
  padding: 8px 12px;
  border-radius: 6px;
}
.verify-cmd code {
  color: #e2e8f0;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  background: none;
}

/* Help & Next */
.help-details {
  margin-bottom: 24px;
}
.help-details summary {
  font-weight: 600;
  cursor: pointer;
  color: var(--vp-c-text-1);
}
.help-details ul {
  margin: 8px 0;
  padding-left: 20px;
}
.help-details li {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin-bottom: 4px;
}
.help-link {
  font-size: 14px;
  color: var(--vp-c-brand-1);
}
.next-links {
  display: flex;
  gap: 12px;
}
.next-card {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  text-decoration: none;
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s ease;
}
.next-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  text-decoration: none;
}
.next-icon {
  font-size: 24px;
}

/* Responsive */
@media (max-width: 768px) {
  .version-tabs {
    grid-template-columns: 1fr;
  }
  .selection-row {
    flex-direction: column;
  }
  .mirror-grid {
    grid-template-columns: 1fr;
  }
  .iso-cards {
    flex-direction: column;
  }
  .next-links {
    flex-direction: column;
  }
  .btn-download {
    padding: 12px 32px;
    font-size: 16px;
  }
}
</style>
