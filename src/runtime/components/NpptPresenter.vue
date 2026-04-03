<template>
  <aside v-if="nppt.isPresenter" class="nppt-presenter">
    <div class="nppt-presenter__backdrop" />

    <div class="nppt-presenter__shell">
      <section class="nppt-card nppt-card--hero">
        <div class="nppt-card__header">
          <div class="nppt-card__eyebrow">Presenter View</div>
          <div class="nppt-chip-row">
            <span class="nppt-chip">Time: {{ elapsedTime }}</span>
            <span class="nppt-chip">Step: {{ nppt.state.step }} / {{ nppt.state.maxStep }}</span>
            <span class="nppt-chip">Active: {{ nppt.state.activeStepCount }}</span>
            <span class="nppt-chip">Path: {{ nppt.state.currentPath }}</span>
          </div>
        </div>

        <div class="nppt-card__body">
          <div class="nppt-hero-copy">
            <h1 class="nppt-hero-copy__title">
              {{ nppt.state.activeTitle || 'Current focus' }}
            </h1>

            <p class="nppt-hero-copy__note">
              {{ nppt.state.activeNote || 'Add data-nppt-note on a step to display speaker notes here.' }}
            </p>
          </div>

          <div class="nppt-key-actions">
            <button class="nppt-button" @click="nppt.resetFocus()">
              Reset
            </button>
            <button class="nppt-button" @click="nppt.prev()">
              Prev step
            </button>
            <button class="nppt-button" @click="nppt.next()">
              Next step
            </button>
            <button class="nppt-button" @click="nppt.prevPage()">
              Prev page
            </button>
            <button class="nppt-button" @click="nppt.nextPage()">
              Next page
            </button>
          </div>

          <p class="nppt-help-line">
            Left/Right: steps. Up/Down: pages.
          </p>
        </div>
      </section>

      <section class="nppt-card nppt-card--keywords">
        <div class="nppt-card__header">
          <div class="nppt-card__eyebrow">Speaker keywords</div>
          <div class="nppt-card__caption">
            Priority cues, reminder words, and talking points.
          </div>
        </div>

        <div class="nppt-keyword-cloud">
          <span
            v-for="(keyword, index) in nppt.state.keywords"
            :key="`${keyword.label}-${keyword.tone}-${keyword.size}-${index}`"
            class="nppt-keyword-badge"
            :data-tone="keyword.tone"
            :data-size="keyword.size"
          >
            {{ keyword.label || "No label" }}
          </span>
        </div>
      </section>

      <section class="nppt-card nppt-card--preview">
        <div class="nppt-card__header">
          <div class="nppt-card__eyebrow">Viewer preview</div>
          <div class="nppt-card__caption">
            Framed like a real screen, without inner scrolling.
          </div>
        </div>

        <div ref="previewFrameRef" class="nppt-preview">
          <div class="nppt-preview__screen">
            <iframe
              :src="viewerPreviewUrl"
              :style="previewTransformStyle"
              class="nppt-preview__iframe"
              title="Viewer preview"
              scrolling="no"
            />
          </div>
        </div>
      </section>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useNppt } from '../nppt.api'

const nppt = useNppt()

const previewFrameRef = ref<HTMLElement | null>(null)
const previewScale = ref(0.25)
const elapsedSeconds = ref(0)
const previewViewport = {
  width: 1440,
  height: 900,
}

const viewerPreviewUrl = computed(() => {
  if (!import.meta.client) {
    return '/'
  }

  const url = new URL(nppt.state.currentPath || '/', window.location.origin)
  url.searchParams.set('role', 'viewer')
  return `${url.pathname}${url.search}${url.hash}`
})

const previewTransformStyle = computed(() => ({
  width: `${previewViewport.width}px`,
  height: `${previewViewport.height}px`,
  transform: `scale(${previewScale.value})`,
  transformOrigin: 'top left',
}))

const elapsedTime = computed(() => {
  const hours = Math.floor(elapsedSeconds.value / 3600)
  const minutes = Math.floor((elapsedSeconds.value % 3600) / 60)
  const seconds = elapsedSeconds.value % 60

  const mm = String(minutes).padStart(2, '0')
  const ss = String(seconds).padStart(2, '0')

  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${mm}:${ss}`
  }

  return `${mm}:${ss}`
})

let resizeObserver: ResizeObserver | null = null
let timerInterval: number | null = null

function updatePreviewScale() {
  const frame = previewFrameRef.value

  if (!frame) {
    return
  }

  const widthScale = frame.clientWidth / previewViewport.width
  const heightScale = frame.clientHeight / previewViewport.height
  previewScale.value = Math.max(Math.min(widthScale, heightScale), 0.1)
}

onMounted(() => {
  updatePreviewScale()
  timerInterval = window.setInterval(() => {
    elapsedSeconds.value += 1
  }, 1000)

  resizeObserver = new ResizeObserver(() => {
    updatePreviewScale()
  })

  if (previewFrameRef.value) {
    resizeObserver.observe(previewFrameRef.value)
  }
})

watch(
  () => nppt.state.currentPath,
  async () => {
    await nextTick()
    updatePreviewScale()
  },
)

onBeforeUnmount(() => {
  resizeObserver?.disconnect()

  if (timerInterval !== null) {
    window.clearInterval(timerInterval)
  }
})
</script>
