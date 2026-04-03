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
      data-nppt-title="Contact hero"
      data-nppt-note="Close the demo on a simple contact page to show that even utility pages can participate in the presentation flow."
      data-nppt-keywords="Utility page|neutral|md,Still presentable|success|xl,Closing slide|info|lg"
      style="display: grid; gap: 18px; padding: 32px; border-radius: 32px; background: linear-gradient(135deg, #ecfeff, #ffffff 42%, #fffaf5); border: 1px solid #a5f3fc;"
    >
      <p style="margin: 0; color: #0f766e; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;">Contact</p>
      <h1 style="margin: 0; font-size: clamp(2.4rem, 7vw, 4.6rem); line-height: 0.95;">Even a contact page can stay presentation-ready</h1>
      <p style="margin: 0; max-width: 62ch; color: #475569; line-height: 1.8;">
        NPPT is not limited to landing pages. Even a simple utility page can join the presentation flow
        while remaining perfectly normal for visitors.
      </p>
    </section>

    <section
      data-nppt-step="2"
      data-nppt-title="Contact form"
      data-nppt-note="Show that the normal page can keep a full contact form, while the viewer can display a shorter closing message."
      data-nppt-keywords="Form|neutral|md,Closing CTA|success|xl,Simple ending|info|lg"
      style="display: grid; gap: 20px; padding: 30px; border-radius: 32px; background: white; border: 1px solid #e2e8f0;"
    >
      <p style="margin: 0 0 8px; color: #475569;">Step 1</p>
      <h2 style="margin: 0;">A page that still works outside the demo</h2>

      <NpptHideOnPresentation>
        <div style="display: grid; gap: 12px;">
          <input type="text" placeholder="Name" style="min-height: 50px; padding: 0 16px; border-radius: 16px; border: 1px solid #cbd5e1;">
          <input type="email" placeholder="Email" style="min-height: 50px; padding: 0 16px; border-radius: 16px; border: 1px solid #cbd5e1;">
          <textarea placeholder="Tell us about your project" rows="6" style="padding: 14px 16px; border-radius: 16px; border: 1px solid #cbd5e1; resize: vertical;"></textarea>
          <button style="min-height: 50px; border: 0; border-radius: 16px; background: #0f172a; color: white; cursor: pointer;">
            Send message
          </button>
        </div>
      </NpptHideOnPresentation>

      <NpptShowOnPresentation on="viewer">
        <div style="padding: 24px; border-radius: 24px; background: #0f172a; color: white;">
          <strong style="display: block; margin-bottom: 8px;">Closing message</strong>
          <p style="margin: 0; line-height: 1.8; color: rgba(226, 232, 240, 0.88);">
            If the demo resonates with you, the full documentation and live version can take it from here.
          </p>
        </div>
      </NpptShowOnPresentation>
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
