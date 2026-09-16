<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Sun, Moon } from '@lucide/vue'

const isDark = ref(false)

onMounted(() => {
  const stored = localStorage.getItem('theme')
  isDark.value = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)

  // Sync with BaseLayout init script
  const observer = new MutationObserver(() => {
    isDark.value = document.documentElement.classList.contains('dark')
  })
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})

function toggle() {
  const next = !isDark.value
  document.documentElement.classList.toggle('dark', next)
  localStorage.setItem('theme', next ? 'dark' : 'light')
}
</script>

<template>
  <button
    @click="toggle"
    class="relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
    :aria-label="isDark ? 'Passer en mode clair' : 'Passer en mode sombre'"
  >
    <Sun v-if="isDark" class="h-4 w-4" />
    <Moon v-else class="h-4 w-4" />
  </button>
</template>
