<template>
  <div style="display: grid; gap: 24px;">
    <header
      v-nppt="{
        step: 1,
        title: 'Opening',
        note: 'Welcome the audience, explain the goal of the demo, and set expectations for the presenter view.',
        keywords: [
          { label: 'Welcome', tone: 'info', size: 'xl' },
          { label: 'Context', tone: 'neutral', size: 'md' },
          { label: 'Confidence', tone: 'success', size: 'lg' },
        ],
      }"
      style="max-width: 760px; margin: 0 auto; padding: 24px; border: 1px solid #dbeafe; border-radius: 20px; background: #f8fbff;"
    >
      <p style="margin: 0 0 8px; color: #0369a1;">Step 0</p>
      <h1 style="margin: 0 0 12px;">Welcome to the NPPT Playground</h1>
      <p style="margin: 0;">
        Cette section devient la cible principale au step 0.
      </p>
    </header>

    <section
      v-nppt="{
        step: 2,
        title: 'How it works',
        note: 'Explain the spotlight effect and reassure the audience that the original page structure stays mostly untouched.',
        keywords: [
          { label: 'Spotlight', tone: 'info', size: 'xl' },
          { label: 'Minimal markup', tone: 'success', size: 'lg' },
          { label: 'Reuse existing pages', tone: 'neutral', size: 'md' },
        ],
      }"
      style="max-width: 760px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 20px; background: white;"
    >
      <p style="margin: 0 0 8px; color: #475569;">Step 1</p>
      <h2 style="margin: 0 0 12px;">Getting Started</h2>
      <p style="margin: 0;">
        Ici on met en avant une autre zone sans cacher le reste de la page.
      </p>
    </section>

    <section
      v-nppt="{
        step: 3,
        title: 'Feature summary',
        note: 'Summarize the module responsibilities before moving to the next route.',
        keywords: [
          { label: 'Sync', tone: 'info', size: 'lg' },
          { label: 'Overlay', tone: 'warning', size: 'md' },
          { label: 'Presenter tools', tone: 'danger', size: 'xl' },
        ],
      }"
      style="max-width: 760px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 20px; background: white;"
    >
      <p style="margin: 0 0 8px; color: #475569;">Step 2</p>
      <h2 style="margin: 0 0 12px;">Features</h2>
      <ul style="margin: 0; padding-left: 20px;">
        <li>Overlay type Intro.js</li>
        <li>Route sync entre onglets</li>
        <li>Presenter panel</li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
</script>
