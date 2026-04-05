# NPPT

[![npm version](https://img.shields.io/npm/v/@c1ach0/nppt.svg)](https://www.npmjs.com/package/@c1ach0/nppt)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

NPPT is a Nuxt module that adds a presentation layer to existing pages.

The idea is simple:

- keep your normal site visually intact
- add a `viewer` mode for the audience
- add a `presenter` mode with notes, preview and controls

Documentation and live demo:
[https://nppt.maxence-bessi.com](https://nppt.maxence-bessi.com)

## What NPPT does

NPPT lets you reuse real Nuxt pages as presentation slides.

Instead of building a separate deck, you annotate parts of your site and NPPT helps you:

- focus one section at a time
- hide dense content during the presentation
- show simplified content only during the presentation
- sync navigation between viewer and presenter windows
- keep a presenter dashboard with notes, timer and preview

Outside presentation mode, your site should remain a normal site.

## Features

- `v-nppt` directive for step targeting and presenter metadata
- `NpptHideOnPresentation` to hide content during presentation mode
- `NpptShowOnPresentation` to show content only during presentation mode
- `NpptProgress` for a simple viewer progress indicator
- synchronized `viewer` and `presenter` routes
- built-in presenter panel

## Installation

```bash
npm install @c1ach0/nppt
```

Then enable the module in your Nuxt config:

```ts
export default defineNuxtConfig({
  modules: ['@c1ach0/nppt'],
})
```

## Basic usage

### 1. Mark a step

```vue
<section
  v-nppt="{
    step: 1,
    title: 'Introduction',
    note: 'Explain the main goal of the page.',
    keywords: [
      { label: 'Intro', tone: 'info', size: 'xl' },
      { label: 'Context', tone: 'neutral', size: 'md' },
    ],
  }"
>
  <h1>Welcome</h1>
</section>
```

### 2. Hide content during the presentation

```vue
<NpptHideOnPresentation>
  <p>
    This long paragraph stays visible on the normal site,
    but disappears in presentation mode.
  </p>
</NpptHideOnPresentation>
```

### 3. Show simplified content only during the presentation

```vue
<NpptShowOnPresentation on="viewer">
  <p>This shorter version is shown only to the audience.</p>
</NpptShowOnPresentation>
```

### 4. Add the presenter panel

Put it once in your app layout or `app.vue`:

```vue
<template>
  <NuxtPage />
  <NpptPresenter />
</template>
```

### 5. Add the launcher

```vue
<template>
  <NuxtPage />
  <NpptPresenter />
  <NpptLauncher />
</template>
```

The launcher opens the viewer window and switches the current tab to presenter mode.

## Available components

### `NpptHideOnPresentation`

Hide content only when presentation mode is active.

Props:

- `on?: 'viewer' | 'presenter' | 'any'`

Default:

- `on="any"`

### `NpptShowOnPresentation`

Show content only when presentation mode is active.

Props:

- `on?: 'viewer' | 'presenter' | 'any'`

Default:

- `on="any"`

### `NpptProgress`

Simple progress bar for the presentation view, especially useful in `viewer` mode.

Props:

- `on?: 'viewer' | 'presenter' | 'any'`
- `fixed?: boolean`
- `top?: string`
- `right?: string`
- `bottom?: string`
- `left?: string`
- `showLabel?: boolean`

Default:

- `on="viewer"`

### `NpptPresenter`

Built-in presenter dashboard with:

- active title
- speaker note
- keywords
- current path
- timer
- viewer preview
- step and page navigation

### `NpptLauncher`

Small floating launcher to start presentation mode quickly.

## Directive API

`v-nppt` accepts:

- `step?: number`
- `title?: string`
- `note?: string`
- `next?: string`
- `hideOn?: 'presenter' | 'viewer'`
- `keywords?: string | Array<{ label: string; tone?: 'neutral' | 'info' | 'success' | 'warning' | 'danger'; size?: 'sm' | 'md' | 'lg' | 'xl' }>`

Example:

```vue
<section
  v-nppt="{
    step: 2,
    title: 'Feature summary',
    note: 'Summarize the important points.',
    next: '/about',
    keywords: 'Summary|info|xl,Sync|success|lg'
  }"
>
  ...
</section>
```

## Presentation modes

NPPT uses a query parameter:

- `?role=viewer`
- `?role=presenter`

Without one of these modes, presentation-only content should not appear.

That is an important project rule:

- normal site mode should stay visually unchanged
- presentation-specific UI should appear only in presentation mode

## Playground

The repository includes a small showcase site in `playground/` with 5 example pages:

- `Index`
- `Article`
- `Blog`
- `About`
- `Contact`

It demonstrates:

- normal-site rendering
- simplified viewer rendering
- content hiding and showing
- multi-page presentation flow

## Local development

```bash
npm install
npm run dev:prepare
npm run dev
```

Useful commands:

```bash
npm run dev:build
npm run lint
npm run test
npm run test:types
```

## AI usage

This project was built with AI-assisted development.

That includes:

- implementation exploration
- API iteration
- playground examples
- documentation drafting and cleanup

The product direction, feature choices and final validation remain human decisions.

## License

MIT
