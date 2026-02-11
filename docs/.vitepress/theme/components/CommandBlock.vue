<template>
  <div class="command-block">
    <div class="command-header">
      <span class="terminal-dots">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
      </span>
      <span class="terminal-title">Terminal</span>
      <button class="copy-btn" @click="copyCommand" :title="copyLabel">
        {{ copied ? copiedLabel : copyLabel }}
      </button>
    </div>
    <div class="command-body">
      <div class="command-line">
        <span class="prompt">$</span>
        <code>{{ command }}</code>
      </div>
      <div v-if="output && output.length" class="command-output">
        <div v-for="(line, i) in output" :key="i" class="output-line">{{ line }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useData } from 'vitepress'

const props = defineProps<{
  command: string
  output?: string[]
}>()

const { lang } = useData()
const copied = ref(false)

const isZh = computed(() => lang.value.startsWith('zh'))
const copyLabel = computed(() => isZh.value ? '复制' : 'Copy')
const copiedLabel = computed(() => isZh.value ? '已复制!' : 'Copied!')

function copyCommand() {
  navigator.clipboard.writeText(props.command).then(() => {
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  })
}
</script>

<style scoped>
.command-block {
  border-radius: 8px;
  overflow: hidden;
  margin: 16px 0;
  border: 1px solid var(--vp-c-divider);
}

.command-header {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: #2d2d2d;
  gap: 8px;
}

.terminal-dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot.red { background: #ff5f56; }
.dot.yellow { background: #ffbd2e; }
.dot.green { background: #27ca3f; }

.terminal-title {
  flex: 1;
  color: #999;
  font-size: 12px;
  text-align: center;
}

.copy-btn {
  background: transparent;
  border: 1px solid #555;
  color: #ccc;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.copy-btn:hover {
  background: #555;
  color: white;
}

.command-body {
  background: #1a1a1a;
  padding: 16px;
  font-family: var(--vp-font-family-mono);
  font-size: 14px;
}

.command-line {
  display: flex;
  gap: 8px;
}

.prompt {
  color: #10b981;
  font-weight: bold;
  user-select: none;
}

.command-line code {
  color: #e2e8f0;
  background: none;
  padding: 0;
}

.command-output {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #333;
}

.output-line {
  color: #94a3b8;
  font-size: 13px;
  line-height: 1.6;
}
</style>
