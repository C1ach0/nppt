import { useNuxtApp } from '#app'
import type { NpptApi } from './nppt.types'

const noop = () => {}
const noopAsync = () => Promise.resolve()

const fallbackNpptApi: NpptApi = {
  state: {
    step: 0,
    currentPath: '/',
    activeStepCount: 0,
    maxStep: 0,
    activeTitle: '',
    activeNote: '',
    nextPath: null,
    keywords: [],
  },
  role: 'inactive',
  isActive: false,
  isPresenter: false,
  canPresent: false,
  debug: {
    clientId: 'nppt-ssr',
    role: 'inactive',
    lastAction: null,
    history: [],
  },
  refreshDomVisibility: noop,
  syncFromPresenter: noop,
  navigate: (_to: string, _step = 0) => noopAsync(),
  next: noop,
  prev: noop,
  nextPage: noopAsync,
  prevPage: noopAsync,
  goTo: (_step: number) => {},
  resetFocus: noop,
  launchPresentation: noopAsync,
}

export function useNppt() {
  const nuxtApp = useNuxtApp()
  return nuxtApp.$nppt ?? fallbackNpptApi
}
