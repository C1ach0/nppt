<template>
  <button
    v-if="!$nppt.isActive"
    class="nppt-launcher"
    type="button"
    @click="handleLaunch"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
import { useNuxtApp } from '#app'

const props = withDefaults(defineProps<{
  label?: string
}>(), {
  label: 'Demarrer la presentation',
})

const { $nppt } = useNuxtApp()

async function handleLaunch() {
  await $nppt.launchPresentation()
}
</script>
