<script setup lang="ts">
import { useNppt } from '../nppt.api'

const props = withDefaults(defineProps<{
  label?: string
}>(), {
  label: 'Start presentation',
})

const nppt = useNppt()

async function handleLaunch() {
  await nppt.launchPresentation()
}
</script>

<template>
  <button
    v-if="!nppt.isActive && nppt.canPresent"
    class="nppt-launcher"
    type="button"
    @click="handleLaunch"
  >
    {{ label }}
  </button>
</template>
