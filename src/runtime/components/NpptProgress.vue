<script setup lang="ts">
import { computed } from 'vue'
import { useNppt } from '../nppt.api'
import { matchesPresentationTarget } from '../nppt.visibility'

type PresentationTarget = 'viewer' | 'presenter' | 'any'

const props = withDefaults(defineProps<{
  on?: PresentationTarget
  fixed?: boolean
  top?: string
  right?: string
  bottom?: string
  left?: string
  showLabel?: boolean
}>(), {
  on: 'viewer',
  fixed: false,
  top: undefined,
  right: undefined,
  bottom: undefined,
  left: undefined,
  showLabel: true,
})

const nppt = useNppt()

const shouldRender = computed(() => {
  // Progress UI is a presentation affordance, not a normal-site decoration.
  return matchesPresentationTarget(nppt.role, nppt.isActive, props.on)
})

const totalSteps = computed(() => {
  return Math.max(nppt.state.maxStep, 0)
})

const currentStep = computed(() => {
  return Math.min(Math.max(nppt.state.step, 0), totalSteps.value)
})

const progressPercent = computed(() => {
  if (totalSteps.value <= 0) {
    return 0
  }

  return (currentStep.value / totalSteps.value) * 100
})

const progressStyle = computed(() => ({
  '--nppt-progress-value': `${progressPercent.value}%`,
  top: props.top,
  right: props.right,
  bottom: props.bottom,
  left: props.left,
}))
</script>

<template>
  <div
    v-if="shouldRender"
    class="nppt-progress"
    :class="{ 'nppt-progress--fixed': fixed }"
    :style="progressStyle"
  >
    <div class="nppt-progress__track">
      <div class="nppt-progress__fill" />
    </div>

    <p v-if="showLabel" class="nppt-progress__label">
      Step {{ currentStep }} / {{ totalSteps }}
    </p>
  </div>
</template>
