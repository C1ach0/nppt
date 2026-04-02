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

    addPlugin({
      src: resolver.resolve('./runtime/plugin.client'),
      mode: 'client'
    })

    addComponent({
      name: 'NpptPresenter',
      filePath: resolver.resolve('./runtime/components/NpptPresenter.vue'),
    })

    addComponent({
      name: 'NpptLauncher',
      filePath: resolver.resolve('./runtime/components/NpptLauncher.vue'),
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
  },
})
