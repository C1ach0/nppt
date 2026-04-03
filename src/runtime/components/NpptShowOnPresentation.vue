<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { useNppt } from '../nppt.api'
import { matchesPresentationTarget } from '../nppt.visibility'

const props = withDefaults(defineProps<{
  on?: 'viewer' | 'presenter' | 'any'
}>(), {
  on: 'any',
})

const slots = useSlots()
const nppt = useNppt()

const shouldRender = computed(() => {
  // Presentation-only component: in normal site mode, it must not render anything.
  return matchesPresentationTarget(nppt.role, nppt.isActive, props.on)
})
</script>

<template>
  <slot v-if="shouldRender" />
</template>
