<script setup>
import { ref, computed } from 'vue';
import { useData } from 'vitepress';

const { lang } = useData();

// --- I18n Translations ---
const translations = {
  en: {
    howToChoose: '🤔 How to Choose?',
    guideStable: '<strong>Stable:</strong> Recommended for most users, especially for servers and daily use. It is the most reliable version after extensive testing.',
    guideTesting: '<strong>Testing:</strong> Suitable for developers and enthusiasts who want to experience the latest software. It contains packages that will be in the next stable release.',
    guideNetinstall: '<strong>Network Install (netinst):</strong> The recommended installation method. Small in size, it downloads the latest packages from the network during installation.',
    guideDvd: '<strong>Full DVD/CD:</strong> For offline installation. Contains a large set of packages, so you may not need a network connection during installation.',
    // live guide removed
    selectMirror: 'Select Mirror Site:',
    selectVersion: 'Select Debian Version:',
    selectType: 'Select Download Type:',
    stableTitle: 'Download from Mirrors (Directory)',
    stableDescription: 'The stable version is distributed through a network of mirrors. We recommend browsing the directory of a mirror close to you to get the latest version. The links point to the directory containing the images.',
    archiveTitle: 'Download Links (Archive Version)',
    testingTitle: 'Download Links (Testing Version)',
    architecture: 'Architecture',
    download: 'Download',
    checksum: 'Checksum (SHA256)',
    copy: 'Copy',
    copied: 'Copied!',
    noChecksum: 'N/A',
    browse: 'Browse Directory',
    iso: 'ISO',
    torrent: 'Torrent',
    verRecommended: 'Recommended',
    typeRecommended: 'Recommended',
  },
  zh: {
    howToChoose: '🤔 如何选择？',
    guideStable: '<strong>稳定版 (Stable):</strong> 推荐给大多数用户，尤其是服务器和日常使用者。它经过了充分的测试，最稳定可靠。',
    guideTesting: '<strong>测试版 (Testing):</strong> 适合想体验最新软件的开发者和爱好者。它包含了即将成为下一个稳定版的软件包。',
    guideNetinstall: '<strong>网络安装 (Netinstall):</strong> 推荐的安装方式。体积小，安装过程中会从网络下载最新的软件包。',
    guideDvd: '<strong>完整 DVD/CD 版:</strong> 用于离线安装。包含大量软件包，安装过程可能无需网络。',
    // live guide removed
    selectMirror: '选择镜像站点:',
    selectVersion: '选择 Debian 版本:',
    selectType: '选择下载类型:',
    stableTitle: '从镜像站下载 (浏览目录)',
    stableDescription: '稳定版通过全球镜像网络分发。我们建议您浏览离您最近的镜像站目录以下载最新版本。下列链接将指向存放镜像文件的目录。',
    archiveTitle: '下载链接 (历史归档版)',
    testingTitle: '下载链接 (测试版)',
    architecture: '架构',
    download: '下载',
    checksum: '校验和 (SHA256)',
    copy: '复制',
    copied: '已复制!',
    noChecksum: '暂无',
    browse: '浏览目录',
    iso: 'ISO',
    torrent: '种子',
    verRecommended: '推荐',
    typeRecommended: '推荐',
  }
};

const t = computed(() => (lang.value.startsWith('zh') ? translations.zh : translations.en));

// --- Component State ---
const selectedVersionName = ref('Bookworm');
const selectedType = ref('netinst');

// --- Data Sources ---
const versions = ref({
  'Trixie': {
    name: 'Trixie', number: '13', status: 'testing',
    release_key: 'trixie_di_rc2', // As requested
    base_path: 'cdimage', // Corrected from debian-cdimage
    architectures: ['amd64', 'i386', 'arm64']
  },
  'Bookworm': {
    name: 'Bookworm', number: '12', status: 'stable',
    architectures: ['amd64', 'i386', 'arm64']
  },
  'Bullseye': {
    name: 'Bullseye', number: '11', status: 'archive', release_version: '11.9.0',
    architectures: ['amd64', 'i386', 'arm64'],
    downloads: {
      netinst: {
        amd64: { sha256: 'c6a964c7339d33261a9e46b9c1d2e2edb465718742458a43697967a57a8b4172' },
        i386: { sha256: 'b04d1b3e8a1555a6a5789063e1577e31d4785f7a0b5a1b32d3a388a10992de37' },
        arm64: { sha256: '75b5b03e0e7a2569527f551b742e811c0f1309f9f75e9d40b7692237889e4776' },
      },
      dvd: {
        amd64: { sha256: '4741bb7f6c69e2c918a0cf78667a48e7b99c2b4c52c6f37699307c08006e12e7' },
        i386: { sha256: '8b0066b56658f40d21e86337859d332d75249679b36629c158650a316c1a84c7' },
        arm64: { sha256: '0a61cc592167d7398b043b3ab0368c858580252191599581c6a66a3b6807f7ac' },
      }
    }
  },
  'Buster': {
    name: 'Buster', number: '10', status: 'archive', release_version: '10.13',
    architectures: ['amd64', 'i386'], // arm64 is named differently, simplified for now
    downloads: {
      netinst: {
        amd64: { sha256: 'a5c010c1448692795c645c369e8b74c83e1a0b182d3d922a7044a2b8ff4e2a82' },
        i386: { sha256: 'be7d6101c59914b30e063c1a32a6f23e2009cb9f674585c54c3e86c078028ed4' },
      },
      dvd: {
        amd64: { sha256: 'f035436d239b352331b637a3d344896a2d98944d180860338779b5b00980b1f7' },
        i386: { sha256: 'd4c633a6104867c2957e335293623c4a8677c0883b40d398d2812d45c080e77c' },
      }
    }
  }
});

const downloadTypes = ref([
  { id: 'netinst', name: 'Network Install', recommended: true },
  { id: 'dvd', name: 'DVD (Offline)' },
]);

const mirrors = ref({
  'Official': 'https://cdimage.debian.org/debian-cd/',
  'CN-USTC': 'https://mirrors.ustc.edu.cn/debian-cd/',
  'CN-Aliyun': 'https://mirrors.aliyun.com/debian-cd/',
  'CN-Tsinghua': 'https://mirrors.tuna.tsinghua.edu.cn/debian-cd/',
  'DE-Germany': 'https://ftp.de.debian.org/debian-cd/',
});

const testingMirrors = ref({
    'Official': 'https://cdimage.debian.org/',
    'CN-USTC': 'https://mirrors.ustc.edu.cn/',
});

// --- Computed Properties ---
const activeVersion = computed(() => versions.value[selectedVersionName.value]);

const generatedLinks = computed(() => {
  if (!activeVersion.value) return [];

  const version = activeVersion.value;
  const type = selectedType.value;
  let links = [];

  switch (version.status) {
    case 'stable':
      version.architectures.forEach(arch => {
        links.push({
          label: arch.toUpperCase(),
          links: Object.entries(mirrors.value).map(([name, url]) => ({
            mirrorName: name,
            url: `${url}current/${arch}/iso-cd/`
          }))
        });
      });
      break;

    case 'testing':
      version.architectures.forEach(arch => {
        const fileNameBase = `debian-${version.release_key}-${arch}`;
        const filePath = `${version.base_path}/${version.release_key}/${arch}/iso-cd/`;
        
        let fileName = '';
        if (type === 'netinst') fileName = `${fileNameBase}-netinst.iso`;
        // Live images are removed as per request

        if (fileName) {
          links.push({
            label: arch.toUpperCase(),
            url: `${testingMirrors.value['Official']}${filePath}${fileName}`,
            torrent: `${testingMirrors.value['Official']}${filePath}${fileName}.torrent`,
            sha256: t.value.noChecksum
          });
        }
      });
      break;
      
    case 'archive':
      const baseUrl = `https://cdimage.debian.org/cdimage/archive/${version.release_version}/`;
      version.architectures.forEach(arch => {
        let path = `${arch}/iso-cd/`;
        let fileName = `debian-${version.release_version}-${arch}`;
        let livePath = `${arch}/iso-hybrid/`;
        let liveFileName = `debian-live-${version.release_version}-${arch}`;
        
        let finalFileName = '';
        let finalUrlBase = `${baseUrl}${path}`;

        if (type === 'netinst') finalFileName = `${fileName}-netinst.iso`;
        if (type === 'dvd') {
           path = `${arch}/iso-dvd/`;
           finalUrlBase = `${baseUrl}${path}`;
           finalFileName = `debian-${version.release_version}-${arch}-DVD-1.iso`;
        }
        
        if (finalFileName) {
          links.push({
            label: arch.toUpperCase(),
            url: `${finalUrlBase}${finalFileName}`,
            torrent: `${finalUrlBase}${finalFileName}.torrent`,
            sha256: version.downloads?.[type]?.[arch]?.sha256 || t.value.noChecksum
          });
        }
      });
      break;
  }
  return links;
});

// --- Methods ---
function copyChecksum(text, event) {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = event.target.innerText;
    event.target.innerText = t.value.copied;
    setTimeout(() => {
      event.target.innerText = originalText;
    }, 2000);
  });
}
</script>

<template>
  <div class="download-manager">

    <details class="guide-details">
      <summary>{{ t.howToChoose }}</summary>
      <div class="guide-content">
        <p v-html="t.guideStable"></p>
        <p v-html="t.guideTesting"></p>
        <p v-html="t.guideNetinstall"></p>
        <p v-html="t.guideDvd"></p>
      </div>
    </details>

    <div class="selectors">
      <div class="selector-group">
        <label for="version-select">{{ t.selectVersion }}</label>
        <select id="version-select" v-model="selectedVersionName">
          <option v-for="v in versions" :key="v.name" :value="v.name">
            Debian {{ v.number }} ({{ v.name }})
            <template v-if="v.status === 'stable'"> ({{ t.verRecommended }})</template>
          </option>
        </select>
      </div>
      <div v-if="activeVersion.status !== 'stable'" class="selector-group">
        <label for="type-select">{{ t.selectType }}</label>
        <select id="type-select" v-model="selectedType">
          <option v-for="dt in downloadTypes" :key="dt.id" :value="dt.id">
            {{ dt.name }}
            <template v-if="dt.recommended"> ({{ t.typeRecommended }})</template>
          </option>
        </select>
      </div>
    </div>

    <!-- STABLE -->
    <div v-if="activeVersion.status === 'stable'" class="content-box">
      <h3>{{ t.stableTitle }}</h3>
      <p>{{ t.stableDescription }}</p>
      <div class="stable-grid">
        <div v-for="arch in generatedLinks" :key="arch.label" class="stable-arch-card">
          <h4>{{ arch.label }}</h4>
          <ul>
            <li v-for="link in arch.links" :key="link.mirrorName">
              <a :href="link.url" target="_blank" rel="noopener noreferrer">{{ link.mirrorName }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    
    <!-- ARCHIVE & TESTING -->
    <div v-else class="content-box">
       <h3>{{ activeVersion.status === 'testing' ? t.testingTitle : t.archiveTitle }}</h3>
       <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>{{ t.architecture }}</th>
              <th>{{ t.download }}</th>
              <th>{{ t.checksum }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="link in generatedLinks" :key="link.label">
              <td>{{ link.label }}</td>
              <td>
                <a :href="link.url" class="button-primary" target="_blank">{{ t.iso }}</a>
                <a :href="link.torrent" class="button-secondary" target="_blank">{{ t.torrent }}</a>
              </td>
              <td>
                <div class="checksum-cell" v-if="link.sha256 !== t.noChecksum">
                  <code>{{ link.sha256 }}</code>
                  <button @click="copyChecksum(link.sha256, $event)">{{ t.copy }}</button>
                </div>
                <span v-else>{{ t.noChecksum }}</span>
              </td>
            </tr>
             <tr v-if="!generatedLinks.length">
                <td colspan="3" style="text-align: center;">No images available for this selection.</td>
            </tr>
          </tbody>
        </table>
       </div>
    </div>
  </div>
</template>

<style scoped>
.download-manager { font-family: sans-serif; }
.guide-details { margin-bottom: 1.5rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; padding: 0.5rem 1rem; }
.guide-details summary { font-weight: bold; cursor: pointer; }
.guide-content p { margin: 0.5rem 0; }
.selectors { display: flex; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
.selector-group { display: flex; flex-direction: column; flex-grow: 1; }
.selector-group label { margin-bottom: 0.5rem; font-weight: 500; }
.selector-group select { padding: 0.5rem; border-radius: 4px; border: 1px solid var(--vp-c-divider); }
.content-box { background-color: var(--vp-c-bg-soft); padding: 1.5rem; border-radius: 8px; }
.content-box h3 { margin-top: 0; }
.stable-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }
.stable-arch-card { background-color: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-radius: 8px; padding: 1rem; }
.stable-arch-card h4 { margin-top: 0; border-bottom: 1px solid var(--vp-c-divider); padding-bottom: 0.5rem; }
.stable-arch-card ul { list-style: none; padding: 0; margin: 0; }
.stable-arch-card li a { display: block; padding: 0.25rem 0; }
.table-container { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 0.75rem 1rem; border-bottom: 1px solid var(--vp-c-divider); text-align: left; }
th { background-color: var(--vp-c-bg); }
td:nth-child(2) { display: flex; gap: 0.5rem; align-items: center; }
.checksum-cell { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
.checksum-cell code { font-size: 0.8rem; word-break: break-all; }
.button-primary, .button-secondary { padding: 0.4rem 0.8rem; border-radius: 20px; text-decoration: none; font-weight: bold; border: 1px solid transparent; display: inline-block; }
.button-primary { background-color: var(--vp-c-brand); color: white; }
.button-secondary { background-color: var(--vp-c-bg-mute); color: var(--vp-c-text-1); border-color: var(--vp-c-divider); }
</style> 