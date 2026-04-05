import { defineNuxtModule, addComponent, addPlugin, addTypeTemplate, createResolver } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nppt',
    configKey: 'nppt',
  },
  defaults: {},
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    // addPlugin(resolver.resolve('./runtime/plugin'))
    _nuxt.options.css.push(resolver.resolve('./runtime/styles/nppt.css'))

    addPlugin(resolver.resolve('./runtime/plugin'))

    addComponent({
      name: 'NpptPresenter',
      filePath: resolver.resolve('./runtime/components/NpptPresenter.vue'),
    })

    addComponent({
      name: 'NpptLauncher',
      filePath: resolver.resolve('./runtime/components/NpptLauncher.vue'),
    })

    addComponent({
      name: 'NpptShowOnPresentation',
      filePath: resolver.resolve('./runtime/components/NpptShowOnPresentation.vue'),
    })

    addComponent({
      name: 'NpptHideOnPresentation',
      filePath: resolver.resolve('./runtime/components/NpptHideOnPresentation.vue'),
    })

    addComponent({
      name: 'NpptViewerOnly',
      filePath: resolver.resolve('./runtime/components/NpptViewerOnly.vue'),
    })

    addComponent({
      name: 'NpptPresenterOnly',
      filePath: resolver.resolve('./runtime/components/NpptPresenterOnly.vue'),
    })

    addComponent({
      name: 'NpptProgress',
      filePath: resolver.resolve('./runtime/components/NpptProgress.vue'),
    })

    addTypeTemplate({
      filename: 'types/nppt-directive.d.ts',
      getContents: () => `declare module 'vue' {
  interface GlobalDirectives {
    nppt: {
      step?: number
      title?: string
      note?: string
      next?: string
      hideOn?: 'presenter' | 'viewer'
      keywords?: string | Array<{
        label: string
        tone?: 'neutral' | 'info' | 'success' | 'warning' | 'danger'
        size?: 'sm' | 'md' | 'lg' | 'xl'
      }>
    }
  }
}

export {}
`,
    })

    addTypeTemplate({
      filename: 'types/nppt-runtime.d.ts',
      getContents: () => `type NpptRole = 'presenter' | 'viewer' | 'inactive'

type NpptKeywordTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger'
type NpptKeywordSize = 'sm' | 'md' | 'lg' | 'xl'

type NpptKeyword = {
  label: string
  tone: NpptKeywordTone
  size: NpptKeywordSize
}

type NpptDebugEntry = {
  direction: 'send' | 'receive'
  type: 'SET_STEP' | 'NAVIGATE' | 'REQUEST_STATE'
  from: string
  step: number
  at: string
}

type NpptDebugState = {
  clientId: string
  role: NpptRole
  lastAction: NpptDebugEntry | null
  history: NpptDebugEntry[]
}

type NpptState = {
  step: number
  currentPath: string
  activeStepCount: number
  maxStep: number
  activeTitle: string
  activeNote: string
  nextPath: string | null
  keywords: NpptKeyword[]
}

type NpptApi = {
  readonly state: NpptState
  readonly role: NpptRole
  readonly isActive: boolean
  readonly isPresenter: boolean
  readonly canPresent: boolean
  readonly debug: NpptDebugState
  refreshDomVisibility: () => void
  syncFromPresenter: () => void
  navigate: (to: string, step?: number) => Promise<void>
  next: () => void
  prev: () => void
  nextPage: () => Promise<void>
  prevPage: () => Promise<void>
  goTo: (step: number) => void
  resetFocus: () => void
  launchPresentation: () => Promise<void>
}

declare module '#app' {
  interface NuxtApp {
    $nppt: NpptApi
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $nppt: NpptApi
  }
}

export {}
`,
    })
  },
})
