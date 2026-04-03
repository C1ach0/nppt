<script setup lang="ts">
import { computed } from 'vue'
import { useNppt } from '../nppt.api'
import { matchesPresentationTarget } from '../nppt.visibility'

const props = withDefaults(defineProps<{
  on?: 'viewer' | 'presenter' | 'any'
}>(), {
  on: 'any',
})

const nppt = useNppt()

const shouldRender = computed(() => {
  // Keep the regular site untouched; hide only when presentation mode is active.
  return !matchesPresentationTarget(nppt.role, nppt.isActive, props.on)
})
</script>

<template>
  <slot v-if="shouldRender" />
</template>
