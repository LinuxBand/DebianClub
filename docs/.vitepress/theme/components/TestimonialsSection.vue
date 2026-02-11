<template>
  <section class="testimonials-section">
    <h2 class="testimonials-title">{{ isZh ? '社区之声' : 'Community Voices' }}</h2>
    <div class="testimonials-grid">
      <div v-for="t in testimonials" :key="t.name" class="testimonial-card">
        <p class="testimonial-quote">"{{ isZh ? t.quoteZh : t.quoteEn }}"</p>
        <div class="testimonial-author">
          <strong>{{ t.name }}</strong>
          <span class="testimonial-role">{{ isZh ? t.roleZh : t.roleEn }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()
const isZh = computed(() => lang.value.startsWith('zh'))

const testimonials = [
  {
    name: 'Ian Murdock',
    quoteZh: 'Debian 是我为创造一个任何人都能自由使用的操作系统而发起的项目。',
    quoteEn: 'Debian was created to be an operating system that anyone could freely use.',
    roleZh: 'Debian 创始人',
    roleEn: 'Debian Founder',
  },
  {
    name: 'Linus Torvalds',
    quoteZh: 'Debian 是一个伟大的发行版，它的包管理系统是 Linux 世界中最好的之一。',
    quoteEn: 'Debian is a great distribution with one of the best package management systems in the Linux world.',
    roleZh: 'Linux 内核创建者',
    roleEn: 'Linux Kernel Creator',
  },
  {
    name: 'System Admin',
    quoteZh: '我们在 500 多台服务器上运行 Debian，几年来零宕机。',
    quoteEn: 'We run Debian on 500+ servers with zero downtime for years.',
    roleZh: '资深运维工程师',
    roleEn: 'Senior SysAdmin',
  },
]
</script>

<style scoped>
.testimonials-section {
  padding: 48px 24px;
  text-align: center;
}

.testimonials-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 32px;
  color: var(--vp-c-text-1);
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 960px;
  margin: 0 auto;
}

.testimonial-card {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 24px;
  text-align: left;
  border: 1px solid var(--vp-c-divider);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
}

.testimonial-quote {
  font-style: italic;
  color: var(--vp-c-text-1);
  line-height: 1.6;
  margin: 0 0 16px 0;
}

.testimonial-author {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.testimonial-author strong {
  color: var(--vp-c-text-1);
  font-size: 14px;
}

.testimonial-role {
  color: var(--vp-c-text-3);
  font-size: 12px;
}

@media (max-width: 768px) {
  .testimonials-grid {
    grid-template-columns: 1fr;
  }
}
</style>
