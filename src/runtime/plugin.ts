import { defineNuxtPlugin, useRoute, useRouter } from '#app'
import { computed, nextTick, reactive, ref, watch } from 'vue'
import { createClientId, createDebugState, trackAction } from './nppt.debug'
import { refreshDomVisibility, scrollActiveStepIntoView } from './nppt.dom'
import { npptDirective } from './nppt.directive'
import { getAdjacentPresentationPath, getLocalPath, getSharedPath } from './nppt.path'
import type { NpptAction, NpptState, OutgoingAction, Role } from './nppt.types'

const MIN_PRESENTATION_WIDTH = 1024

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('nppt', npptDirective)

  const route = useRoute()
  const router = useRouter()

  const requestedRole = (
    route.query.role === 'presenter'
      ? 'presenter'
      : route.query.role === 'viewer'
        ? 'viewer'
        : 'inactive'
  ) as Role

  const viewportWidth = ref(import.meta.client ? window.innerWidth : MIN_PRESENTATION_WIDTH)
  const canPresent = computed(() => {
    if (!import.meta.client) {
      return true
    }

    return viewportWidth.value >= MIN_PRESENTATION_WIDTH
  })

  const role = computed<Role>(() => canPresent.value ? requestedRole : 'inactive')
  const isActive = computed(() => role.value !== 'inactive')
  const isPresenter = computed(() => role.value === 'presenter')
  const clientId = createClientId()

  const state = reactive<NpptState>({
    step: 0,
    currentPath: route.fullPath,
    activeStepCount: 0,
    maxStep: 0,
    activeTitle: '',
    activeNote: '',
    nextPath: null,
    keywords: [],
  })

  const debug = createDebugState(clientId, role.value)

  function getCurrentRole() {
    return role.value
  }

  function updateViewportWidth() {
    if (!import.meta.client) {
      return
    }

    viewportWidth.value = window.innerWidth
  }

  const noop = () => {}

  async function launchPresentation() {
    if (!import.meta.client || !canPresent.value) {
      return
    }

    const sharedTarget = getSharedPath(route.fullPath)
    const viewerUrl = new URL(sharedTarget, window.location.origin)
    viewerUrl.searchParams.set('role', 'viewer')

    const presenterUrl = new URL(sharedTarget, window.location.origin)
    presenterUrl.searchParams.set('role', 'presenter')

    window.open(
      `${viewerUrl.pathname}${viewerUrl.search}${viewerUrl.hash}`,
      'nppt-viewer',
      'popup=yes,width=1440,height=900,resizable=yes,scrollbars=yes',
    )

    await router.push(`${presenterUrl.pathname}${presenterUrl.search}${presenterUrl.hash}`)
  }

  const baseApi = {
    state,
    get role() {
      return role.value
    },
    get isActive() {
      return isActive.value
    },
    get isPresenter() {
      return isPresenter.value
    },
    get canPresent() {
      return canPresent.value
    },
    debug,
    refreshDomVisibility: noop,
    syncFromPresenter: noop,
    navigate: (_to: string, _step = 0) => Promise.resolve(),
    next: noop,
    prev: noop,
    nextPage: () => Promise.resolve(),
    prevPage: () => Promise.resolve(),
    goTo: (_step: number) => {},
    resetFocus: noop,
    launchPresentation,
  }

  if (!import.meta.client) {
    return {
      provide: {
        nppt: {
          ...baseApi,
        },
      },
    }
  }

  function cleanupInactiveMode() {
    window.removeEventListener('resize', updateViewportWidth)
    window.removeEventListener('beforeunload', cleanupInactiveMode)
  }

  window.addEventListener('resize', updateViewportWidth)

  if (requestedRole === 'inactive') {
    window.addEventListener('beforeunload', cleanupInactiveMode)

    return {
      provide: {
        nppt: {
          ...baseApi,
        },
      },
    }
  }

  const channel = new BroadcastChannel('nppt:channel')
  let isApplyingRemoteNavigation = false
  let pendingPresenterNavigation: string | null = null
  const presentationHistory: string[] = []
  let presentationHistoryIndex = -1

  function track(direction: 'send' | 'receive', action: NpptAction) {
    trackAction(debug, state, getCurrentRole(), clientId, direction, action)
  }

  function send(action: OutgoingAction) {
    const payload = {
      ...action,
      from: clientId,
    } as NpptAction

    track('send', payload)
    channel.postMessage(payload)
  }

  function syncFromPresenter() {
    if (isPresenter.value) return
    send({ type: 'REQUEST_STATE' })
  }

  async function applyRemoteNavigation(to: string, step: number) {
    state.step = step
    state.currentPath = to
    isApplyingRemoteNavigation = true

    try {
      await router.push(getLocalPath(to, requestedRole))
    }
    finally {
      isApplyingRemoteNavigation = false
    }
  }

  function getPresentationPaths() {
    return router.getRoutes().map((routeRecord) => routeRecord.path)
  }

  function rememberPresentationPath(path: string) {
    const sharedPath = getSharedPath(path)

    if (presentationHistory[presentationHistoryIndex] === sharedPath) {
      return
    }

    if (presentationHistoryIndex >= 0 && presentationHistoryIndex < presentationHistory.length - 1) {
      presentationHistory.splice(presentationHistoryIndex + 1)
    }

    presentationHistory.push(sharedPath)
    presentationHistoryIndex = presentationHistory.length - 1
  }

  function getNextPresentationPath() {
    if (presentationHistoryIndex >= 0 && presentationHistoryIndex < presentationHistory.length - 1) {
      return presentationHistory[presentationHistoryIndex + 1] ?? null
    }

    return (
      state.nextPath
      || getAdjacentPresentationPath(state.currentPath, getPresentationPaths(), 'next')
    )
  }

  function getPreviousPresentationPath() {
    if (presentationHistoryIndex > 0) {
      return presentationHistory[presentationHistoryIndex - 1] ?? null
    }

    return getAdjacentPresentationPath(state.currentPath, getPresentationPaths(), 'prev')
  }

  function prev() {
    if (!isPresenter.value) return
    state.step = Math.max(state.step - 1, 0)
    send({ type: 'SET_STEP', step: state.step })
  }

  function next() {
    if (!isPresenter.value) return
    state.step = Math.min(state.step + 1, state.maxStep)
    send({ type: 'SET_STEP', step: state.step })
  }

  async function nextPage() {
    if (!isPresenter.value) return

    const nextPath = getNextPresentationPath()
    console.debug('[nppt] Navigating to next page:', nextPath)

    if (!nextPath) {
      return
    }

    await navigate(nextPath, 0)
  }

  async function prevPage() {
    if (!isPresenter.value) return

    const previousPath = getPreviousPresentationPath()
    console.debug('[nppt] Navigating to previous page:', previousPath)

    if (!previousPath) {
      return
    }

    await navigate(previousPath, 0)
  }

  function goTo(step: number) {
    if (!isPresenter.value) return
    state.step = Math.max(0, step)
    send({ type: 'SET_STEP', step: state.step })
  }

  function resetFocus() {
    if (!isPresenter.value) return

    state.step = 0
    refreshDomVisibility(state, getCurrentRole())
    scrollActiveStepIntoView()
    send({ type: 'SET_STEP', step: state.step })

    nextTick(() => {
      refreshDomVisibility(state, getCurrentRole())
      scrollActiveStepIntoView()
    })
  }

  async function navigate(to: string, step = 0) {
    if (!isPresenter.value) return

    const sharedTarget = getSharedPath(to)

    pendingPresenterNavigation = sharedTarget
    state.step = Math.max(0, step)
    state.currentPath = sharedTarget

    await router.push(getLocalPath(sharedTarget, requestedRole))
    send({ type: 'NAVIGATE', to: sharedTarget, step: state.step })
  }

  function onKeydown(event: KeyboardEvent) {
    if (!isPresenter.value) return

    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      prev()
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault()
      next()
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      void nextPage()
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      void prevPage()
    }
  }

  channel.onmessage = async (event: MessageEvent<NpptAction>) => {
    const action = event.data

    if (!action || action.from === clientId) {
      return
    }

    track('receive', action)

    if (action.type === 'SET_STEP') {
      state.step = action.step
      return
    }

    if (action.type === 'NAVIGATE') {
      await applyRemoteNavigation(action.to, action.step)
      return
    }

    if (action.type === 'REQUEST_STATE' && isPresenter.value) {
      send({ type: 'NAVIGATE', to: state.currentPath, step: state.step })
    }
  }

  watch(
    () => state.step,
    async () => {
      await nextTick()
      refreshDomVisibility(state, getCurrentRole())
      scrollActiveStepIntoView()
    },
  )

  watch(role, (nextRole) => {
    debug.role = nextRole
    refreshDomVisibility(state, nextRole)
  })

  watch(
    () => route.fullPath,
    async () => {
      const sharedPath = getSharedPath(route.fullPath)
      state.currentPath = sharedPath
      rememberPresentationPath(sharedPath)

      await nextTick()
      refreshDomVisibility(state, getCurrentRole())
      scrollActiveStepIntoView()

      if (pendingPresenterNavigation === sharedPath) {
        pendingPresenterNavigation = null
        return
      }

      if (isPresenter.value && !isApplyingRemoteNavigation) {
        send({ type: 'NAVIGATE', to: sharedPath, step: state.step })
      }
    },
  )

  nextTick(() => {
    state.currentPath = getSharedPath(route.fullPath)
    rememberPresentationPath(state.currentPath)
    refreshDomVisibility(state, getCurrentRole())
    scrollActiveStepIntoView()

    if (!isPresenter.value) {
      syncFromPresenter()
    }
  })

  window.addEventListener('keydown', onKeydown)

  function cleanupPresentationMode() {
    window.removeEventListener('resize', updateViewportWidth)
    window.removeEventListener('keydown', onKeydown)
    window.removeEventListener('beforeunload', cleanupPresentationMode)
    channel.close()
  }

  window.addEventListener('beforeunload', cleanupPresentationMode)

  return {
    provide: {
      nppt: {
        ...baseApi,
        refreshDomVisibility: () => {
          refreshDomVisibility(state, getCurrentRole())
          scrollActiveStepIntoView()
        },
        syncFromPresenter,
        navigate,
        next,
        prev,
        nextPage,
        prevPage,
        goTo,
        resetFocus,
        launchPresentation,
      },
    },
  }
})
