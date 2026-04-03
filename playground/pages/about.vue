<template>
  <div style="position: relative; max-width: 980px; margin: 0 auto; display: grid; gap: 26px; padding-bottom: 92px;">
    <NpptProgress
      fixed
      bottom="24px"
      left="50%"
      style="transform: translateX(-50%); width: min(360px, calc(100vw - 32px));"
    />

    <section
      data-nppt-step="1"
      data-nppt-title="About NPPT"
      data-nppt-note="Use this page to reframe the project simply: NPPT is a presentation layer for existing Nuxt pages."
      data-nppt-keywords="Nuxt module|info|xl,Simple v1|success|lg,Presentation layer|neutral|md"
      style="display: grid; gap: 18px; padding: 32px; border-radius: 32px; background: linear-gradient(135deg, #fff1f8, #ffffff 45%, #f8fafc); border: 1px solid #fbcfe8;"
    >
      <p style="margin: 0; color: #be185d; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;">About</p>
      <h1 style="margin: 0; font-size: clamp(2.4rem, 7vw, 4.6rem); line-height: 0.95;">A presentation layer, not a site builder</h1>
      <p style="margin: 0; max-width: 64ch; color: #475569; line-height: 1.8;">
        NPPT is not trying to replace your site. It adds a way to present the same pages with more
        clarity, better pacing, and a presenter view to support the speaker.
      </p>
    </section>

    <section
      data-nppt-step="2"
      data-nppt-title="Project principles"
      data-nppt-note="List the principles that define the v1 and make the project easy to explain publicly."
      data-nppt-keywords="Keep the site intact|success|xl,Minimal API|info|lg,Useful defaults|warning|md"
      style="display: grid; gap: 20px; padding: 30px; border-radius: 32px; background: white; border: 1px solid #e2e8f0;"
    >
      <p style="margin: 0 0 8px; color: #475569;">Step 1</p>
      <h2 style="margin: 0;">Core principles for the first version</h2>

      <div style="display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));">
        <div style="padding: 22px; border-radius: 24px; background: #f8fafc; border: 1px solid #e2e8f0;">
          <strong>Normal site first</strong>
          <p style="margin: 8px 0 0; color: #475569;">Outside presentation mode, the rendering should not change.</p>
        </div>
        <div style="padding: 22px; border-radius: 24px; background: #f8fafc; border: 1px solid #e2e8f0;">
          <strong>Minimal authoring</strong>
          <p style="margin: 8px 0 0; color: #475569;">A few attributes or components are enough.</p>
        </div>
        <div style="padding: 22px; border-radius: 24px; background: #f8fafc; border: 1px solid #e2e8f0;">
          <strong>Practical presenter tools</strong>
          <p style="margin: 8px 0 0; color: #475569;">Timer, preview, notes, and navigation.</p>
        </div>
      </div>
    </section>

    <section
      data-nppt-step="3"
      data-nppt-title="Documentation and demo"
      data-nppt-note="Use this section to point people toward the public docs and live showcase site."
      data-nppt-keywords="Docs|info|lg,Demo site|success|xl,Ready to share|warning|md"
      data-nppt-next="/contact"
      style="display: grid; gap: 18px; padding: 30px; border-radius: 32px; background: white; border: 1px solid #e2e8f0;"
    >
      <p style="margin: 0 0 8px; color: #475569;">Step 2</p>
      <h2 style="margin: 0;">Next: the contact page</h2>
      <p style="margin: 0; max-width: 62ch; color: #475569; line-height: 1.75;">
        The next page closes the demo with a simple contact page that still works both as a normal site page
        and as part of the presentation flow.
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
@media (max-width: 640px) {
  :deep(section) {
    padding: 22px !important;
    border-radius: 24px !important;
  }
}
</style>
