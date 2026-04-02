import { defineNuxtPlugin, useRoute, useRouter } from '#app'
import { nextTick, reactive, watch } from 'vue'
import { createClientId, createDebugState, trackAction } from './nppt.debug'
import { refreshDomVisibility, scrollActiveStepIntoView } from './nppt.dom'
import { npptDirective } from './nppt.directive'
import { getAdjacentPresentationPath, getLocalPath, getSharedPath } from './nppt.path'
import type { NpptAction, NpptState, OutgoingAction, Role } from './nppt.types'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('nppt', npptDirective)

  const route = useRoute()
  const router = useRouter()

  const role = (
    route.query.role === 'presenter'
      ? 'presenter'
      : route.query.role === 'viewer'
        ? 'viewer'
        : 'inactive'
  ) as Role

  const isActive = role !== 'inactive'
  const isPresenter = role === 'presenter'
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

  const debug = createDebugState(clientId, role)

  const noop = () => {}
  const baseApi = {
    state,
    role: role as Role,
    isActive,
    isPresenter,
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

  async function launchPresentation() {
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

  if (!isActive) {
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

  function track(direction: 'send' | 'receive', action: NpptAction) {
    trackAction(debug, state, role, clientId, direction, action)
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
    if (isPresenter) return
    send({ type: 'REQUEST_STATE' })
  }

  async function applyRemoteNavigation(to: string, step: number) {
    state.step = step
    state.currentPath = to
    isApplyingRemoteNavigation = true

    try {
      await router.push(getLocalPath(to, role))
    }
    finally {
      isApplyingRemoteNavigation = false
    }
  }

  function getPresentationPaths() {
    return router.getRoutes().map((routeRecord) => routeRecord.path)
  }

  function getNextPresentationPath() {
    return (
      state.nextPath
      || getAdjacentPresentationPath(state.currentPath, getPresentationPaths(), 'next')
    )
  }

  function getPreviousPresentationPath() {
    return getAdjacentPresentationPath(state.currentPath, getPresentationPaths(), 'prev')
  }

  function prev() {
    if (!isPresenter) return
    state.step = Math.max(state.step - 1, 0)
    send({ type: 'SET_STEP', step: state.step })
  }

  function next() {
    if (!isPresenter) return
    state.step = Math.min(state.step + 1, state.maxStep)
    send({ type: 'SET_STEP', step: state.step })
  }

  async function nextPage() {
    if (!isPresenter) return

    const nextPath = getNextPresentationPath()
    console.debug('[nppt] Navigating to next page:', nextPath)

    if (!nextPath) {
      return
    }

    await navigate(nextPath, 0)
  }

  async function prevPage() {
    if (!isPresenter) return

    const previousPath = getPreviousPresentationPath()
    console.debug('[nppt] Navigating to previous page:', previousPath)
    
    if (!previousPath) {
      return
    }

    await navigate(previousPath, 0)
  }

  function goTo(step: number) {
    if (!isPresenter) return
    state.step = Math.max(0, step)
    send({ type: 'SET_STEP', step: state.step })
  }

  function resetFocus() {
    if (!isPresenter) return

    state.step = 0
    refreshDomVisibility(state, role)
    scrollActiveStepIntoView()
    send({ type: 'SET_STEP', step: state.step })

    nextTick(() => {
      refreshDomVisibility(state, role)
      scrollActiveStepIntoView()
    })
  }

  async function navigate(to: string, step = 0) {
    if (!isPresenter) return

    const sharedTarget = getSharedPath(to)

    pendingPresenterNavigation = sharedTarget
    state.step = Math.max(0, step)
    state.currentPath = sharedTarget

    await router.push(getLocalPath(sharedTarget, role))
    send({ type: 'NAVIGATE', to: sharedTarget, step: state.step })
  }

  function onKeydown(event: KeyboardEvent) {
    if (!isPresenter) return

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

    if (action.type === 'REQUEST_STATE' && isPresenter) {
      send({ type: 'NAVIGATE', to: state.currentPath, step: state.step })
    }
  }

  watch(
    () => state.step,
    async () => {
      await nextTick()
      refreshDomVisibility(state, role)
      scrollActiveStepIntoView()
    },
  )

  watch(
    () => route.fullPath,
    async () => {
      const sharedPath = getSharedPath(route.fullPath)
      state.currentPath = sharedPath

      await nextTick()
      refreshDomVisibility(state, role)
      scrollActiveStepIntoView()

      if (pendingPresenterNavigation === sharedPath) {
        pendingPresenterNavigation = null
        return
      }

      if (isPresenter && !isApplyingRemoteNavigation) {
        send({ type: 'NAVIGATE', to: sharedPath, step: state.step })
      }
    },
  )

  nextTick(() => {
    state.currentPath = getSharedPath(route.fullPath)
    refreshDomVisibility(state, role)
    scrollActiveStepIntoView()

    if (!isPresenter) {
      syncFromPresenter()
    }
  })

  window.addEventListener('keydown', onKeydown)
  window.addEventListener('beforeunload', () => {
    window.removeEventListener('keydown', onKeydown)
    channel.close()
  })

  return {
    provide: {
      nppt: {
        ...baseApi,
        refreshDomVisibility: () => {
          refreshDomVisibility(state, role)
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
