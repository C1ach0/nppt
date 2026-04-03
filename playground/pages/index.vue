<template>
  <div style="position: relative; max-width: 1180px; margin: 0 auto; display: grid; gap: 28px; padding-bottom: 92px;">
    <NpptProgress
      fixed
      bottom="24px"
      left="50%"
      style="transform: translateX(-50%); width: min(360px, calc(100vw - 32px));"
    />

    <section
      v-nppt="{
        step: 1,
        title: 'Showcase intro',
        note: 'Open the demo by explaining the core idea: a regular Nuxt site can become a presentation without redesigning everything.',
        keywords: [
          { label: 'Normal site', tone: 'neutral', size: 'md' },
          { label: 'Presentation layer', tone: 'info', size: 'xl' },
          { label: 'Nuxt module', tone: 'success', size: 'lg' },
        ],
      }"
      style="display: grid; gap: 22px; padding: 36px; border-radius: 36px; background: linear-gradient(135deg, #fff7ed, #ffffff 45%, #eff6ff); border: 1px solid #fed7aa;"
    >
      <div class="index-hero-grid" style="display: grid; gap: 18px; grid-template-columns: minmax(0, 1.15fr) minmax(280px, 360px); align-items: center;">
        <div style="display: grid; gap: 16px;">
          <p style="margin: 0; color: #c2410c; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;">Step 0</p>
          <h1 style="margin: 0; font-size: clamp(2.8rem, 8vw, 5.6rem); line-height: 0.92;">
            Turn a Nuxt site into a presentation space
          </h1>
          <NpptHideOnPresentation>
            <p style="margin: 0; max-width: 62ch; color: #475569; font-size: 1.06rem; line-height: 1.8;">
              NPPT adds a presentation layer on top of an existing Nuxt site. Outside presentation mode,
              the site remains a normal site. In viewer and presenter mode, the page becomes a demo surface.
            </p>
          </NpptHideOnPresentation>
          <NpptShowOnPresentation on="viewer">
            <p style="margin: 0; max-width: 34ch; color: #0f172a; font-size: 1.18rem; line-height: 1.7; font-weight: 700;">
              Same page, new rhythm: less density, more visual impact.
            </p>
          </NpptShowOnPresentation>
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <a href="/article" style="display: inline-flex; align-items: center; min-height: 46px; padding: 0 18px; border-radius: 999px; background: #0f172a; color: white; text-decoration: none;">
              View the article demo
            </a>
            <a href="/blog" style="display: inline-flex; align-items: center; min-height: 46px; padding: 0 18px; border-radius: 999px; background: white; color: #0f172a; text-decoration: none; border: 1px solid #cbd5e1;">
              View the blog demo
            </a>
          </div>
        </div>

        <div class="index-side-cards" style="display: grid; gap: 12px;">
          <div class="index-side-card" style="padding: 18px; border-radius: 24px; background: rgba(255,255,255,0.86); border: 1px solid #e2e8f0;">
            <strong>Viewer</strong>
            <p style="margin: 8px 0 0; color: #475569;">Simplified version, easier for the audience to follow.</p>
          </div>
          <div class="index-side-card" style="padding: 18px; border-radius: 24px; background: rgba(255,255,255,0.86); border: 1px solid #e2e8f0;">
            <strong>Presenter</strong>
            <p style="margin: 8px 0 0; color: #475569;">Notes, timer, keywords, and synced preview.</p>
          </div>
        </div>
      </div>
    </section>

    <section
      v-nppt="{
        step: 2,
        title: 'Core features',
        note: 'Use this section to list the v1 feature set without overcomplicating the story.',
        keywords: [
          { label: 'Focus by step', tone: 'info', size: 'lg' },
          { label: 'Viewer vs presenter', tone: 'success', size: 'xl' },
          { label: 'Route sync', tone: 'warning', size: 'md' },
        ],
      }"
      style="display: grid; gap: 22px; padding: 30px; border-radius: 32px; background: white; border: 1px solid #e2e8f0;"
    >
      <div>
        <p style="margin: 0 0 8px; color: #475569;">Step 1</p>
        <h2 style="margin: 0 0 12px;">A focused v1</h2>
        <p style="margin: 0; max-width: 62ch; color: #475569; line-height: 1.75;">
          The first version is intentionally simple: steps, a presenter view, a viewer view,
          and a few components for hiding or showing content when needed.
        </p>
      </div>

      <div style="display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));">
        <article style="padding: 22px; border-radius: 24px; background: #f8fafc; border: 1px solid #e2e8f0;">
          <strong>v-nppt</strong>
          <p style="margin: 8px 0 0; color: #475569;">The core primitive for step-by-step focus.</p>
        </article>
        <article style="padding: 22px; border-radius: 24px; background: #f8fafc; border: 1px solid #e2e8f0;">
          <strong>NpptHideOnPresentation</strong>
          <p style="margin: 8px 0 0; color: #475569;">Hides dense content during the presentation.</p>
        </article>
        <article style="padding: 22px; border-radius: 24px; background: #f8fafc; border: 1px solid #e2e8f0;">
          <strong>NpptShowOnPresentation</strong>
          <p style="margin: 8px 0 0; color: #475569;">Shows a simplified version only during the demo.</p>
        </article>
        <article style="padding: 22px; border-radius: 24px; background: #f8fafc; border: 1px solid #e2e8f0;">
          <strong>NpptProgress</strong>
          <p style="margin: 8px 0 0; color: #475569;">A small progress bar for the viewer.</p>
        </article>
      </div>
    </section>

    <section
      data-nppt-step="3"
      data-nppt-title="Next page"
      data-nppt-note="Move to the article page to show a real content example, not just a feature list."
      data-nppt-next="/article"
      data-nppt-keywords="Article demo|info|xl,Real content|success|lg,Continue|neutral|md"
      style="display: grid; gap: 18px; padding: 30px; border-radius: 32px; background: white; border: 1px solid #e2e8f0;"
    >
      <p style="margin: 0 0 8px; color: #475569;">Step 2</p>
      <h2 style="margin: 0;">Next: a real article example</h2>
      <p style="margin: 0; max-width: 62ch; color: #475569; line-height: 1.75;">
        The next page shows how a full editorial page can keep its normal structure while becoming
        clearer during a presentation.
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
@media (max-width: 900px) {
  .index-hero-grid {
    grid-template-columns: 1fr;
  }

  .index-side-cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .index-side-cards {
    grid-template-columns: 1fr;
  }

  .index-side-card {
    padding: 16px !important;
    border-radius: 20px !important;
  }
}

@media (max-width: 640px) {
  :deep(section) {
    padding: 22px !important;
    border-radius: 24px !important;
  }
}
</style>
