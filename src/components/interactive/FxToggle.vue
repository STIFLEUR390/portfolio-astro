<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Sparkles } from '@lucide/vue'

const enabled = ref(false)
const achievements = ref(0)

function refreshCount() {
  try {
    const list = JSON.parse(localStorage.getItem('fx-achievements') || '[]')
    achievements.value = Array.isArray(list) ? list.length : 0
  } catch {
    achievements.value = 0
  }
}

function toggle() {
  const next = !enabled.value
  enabled.value = next
  localStorage.setItem('fx', next ? '1' : '0')
  document.documentElement.classList.toggle('fx-enabled', next)
  window.dispatchEvent(new CustomEvent('fx:change', { detail: next }))
}

onMounted(() => {
  // L'état initial est posé sans flash par le script inline du <head>.
  enabled.value = document.documentElement.classList.contains('fx-enabled')
  refreshCount()
  window.addEventListener('fx:achievements', refreshCount)
})

onUnmounted(() => {
  window.removeEventListener('fx:achievements', refreshCount)
})
</script>

<template>
  <button
    @click="toggle"
    :aria-pressed="enabled"
    :aria-label="enabled ? 'Désactiver les effets animés' : 'Activer les effets animés'"
    :title="enabled ? 'Désactiver les effets animés' : 'Activer les effets animés'"
    class="fixed bottom-5 right-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
    :class="
      enabled
        ? 'border-primary bg-primary text-primary-foreground shadow-primary/30'
        : 'border-border/60 bg-card/90 text-foreground backdrop-blur'
    "
  >
    <Sparkles class="h-5 w-5" :class="enabled ? 'animate-pulse' : 'opacity-60'" />
    <span
      v-if="achievements > 0"
      class="absolute -left-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-secondary px-1 text-[10px] font-semibold text-secondary-foreground"
      aria-hidden="true"
    >
      {{ achievements }}
    </span>
  </button>
</template>
