<template>
  <div class="mirror-selector">
    <select v-model="selectedCountry" @change="updateMirror" class="country-select">
      <option disabled value="">{{ strings.selectCountry }}</option>
      <option v-for="country in countries" :key="country.code" :value="country.code">
        {{ country.name }}
      </option>
    </select>
    <div v-if="recommendedMirror" class="mirror-result">
      <p>{{ strings.recommendedMirror }}:</p>
      <a :href="recommendedMirror.url" target="_blank" rel="noopener noreferrer">
        {{ recommendedMirror.name }}
      </a>
      <p class="mirror-url">{{ recommendedMirror.url }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useData } from 'vitepress';

// Full list of mirrors. In a real application, this might come from an API.
// Source: https://www.debian.org/mirror/list
const mirrors = {
  'CN': [
    { name: 'University of Science and Technology of China (USTC)', url: 'https://mirrors.ustc.edu.cn/debian-cd/' },
    { name: 'Tsinghua University', url: 'https://mirrors.tuna.tsinghua.edu.cn/debian-cd/' },
    { name: 'Alibaba Cloud', url: 'https://mirrors.aliyun.com/debian-cd/' },
  ],
  'US': [
    { name: 'MIT', url: 'https://mirrors.csail.mit.edu/debian-cd/' },
    { name: 'Kernel.org', url: 'https://mirrors.kernel.org/debian-cd/' },
  ],
  'DE': [
    { name: 'Official German Mirror', url: 'https://ftp.de.debian.org/debian-cd/' },
  ],
  'JP': [
      { name: 'Official Japanese Mirror', url: 'https://ftp.jp.debian.org/debian-cd/' },
  ],
  'GB': [
      { name: 'University of Kent', url: 'https://mirrorservice.org/sites/cdimage.debian.org/debian-cd/' },
  ],
  // Add more countries and mirrors as needed
};

const countries = [
  { code: 'CN', name: 'China (中国)' },
  { code: 'US', name: 'United States' },
  { code: 'DE', name: 'Germany' },
  { code: 'JP', name: 'Japan' },
  { code: 'GB', name: 'United Kingdom' },
];

const selectedCountry = ref('');
const recommendedMirror = ref(null);

const { lang } = useData();

const strings = computed(() => {
  if (lang.value.startsWith('zh')) {
    return {
      selectCountry: '请选择一个国家...',
      recommendedMirror: '推荐镜像站点',
    };
  }
  return {
    selectCountry: 'Select a country...',
    recommendedMirror: 'Recommended Mirror',
  };
});

const updateMirror = () => {
  if (selectedCountry.value && mirrors[selectedCountry.value]) {
    // For simplicity, just pick the first one.
    recommendedMirror.value = mirrors[selectedCountry.value][0];
  } else {
    recommendedMirror.value = null;
  }
};
</script>

<style scoped>
.mirror-selector {
  background-color: var(--vp-c-bg-soft);
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
}
.country-select {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  margin-bottom: 20px;
}
.mirror-result {
  padding: 15px;
  background-color: var(--vp-c-bg-mute);
  border-radius: 4px;
}
.mirror-result p {
  margin: 0 0 8px 0;
  font-weight: 600;
}
.mirror-result a {
  font-size: 1.1em;
  color: var(--vp-c-brand);
  text-decoration: none;
}
.mirror-result a:hover {
  text-decoration: underline;
}
.mirror-url {
    font-family: var(--vp-font-family-mono);
    font-size: 0.9em;
    color: var(--vp-c-text-2);
    margin-top: 8px !important;
}
</style> 