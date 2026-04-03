<template>
  <div style="position: relative; max-width: 1080px; margin: 0 auto; display: grid; gap: 28px; padding-bottom: 92px;">
    <NpptProgress
      fixed
      bottom="24px"
      left="50%"
      style="transform: translateX(-50%); width: min(360px, calc(100vw - 32px));"
    />

    <header
      v-nppt="{
        step: 1,
        title: 'Article hero',
        note: 'Start with a content-rich page and explain that nothing about this layout is presentation-specific until the mode is launched.',
        keywords: [
          { label: 'Editorial page', tone: 'neutral', size: 'md' },
          { label: 'No visual drift', tone: 'success', size: 'xl' },
          { label: 'Presentation-ready', tone: 'info', size: 'lg' },
        ],
      }"
      style="display: grid; gap: 18px; padding: 34px; border-radius: 34px; background: linear-gradient(135deg, #eef2ff, #ffffff 42%, #f8fafc); border: 1px solid #c7d2fe;"
    >
      <p style="margin: 0; color: #4338ca; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;">Article Demo</p>
      <h1 style="margin: 0; font-size: clamp(2.5rem, 7vw, 4.7rem); line-height: 0.95;">
        A normal editorial page can become a clearer slide
      </h1>
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <span style="display: inline-flex; align-items: center; min-height: 40px; padding: 0 14px; border-radius: 999px; background: white; border: 1px solid #c7d2fe; color: #4338ca;">Long-form content</span>
        <span style="display: inline-flex; align-items: center; min-height: 40px; padding: 0 14px; border-radius: 999px; background: white; border: 1px solid #cbd5e1; color: #475569;">Same route, two contexts</span>
      </div>
    </header>

    <section
      v-nppt="{
        step: 2,
        title: 'Article body',
        note: 'Use this section to show how long paragraphs stay available on the site but can disappear from the viewer version.',
        keywords: [
          { label: 'Hide dense text', tone: 'warning', size: 'lg' },
          { label: 'Keep strong sentence', tone: 'success', size: 'xl' },
          { label: 'Normal page preserved', tone: 'info', size: 'md' },
        ],
      }"
      style="display: grid; gap: 22px; padding: 30px; border-radius: 32px; background: white; border: 1px solid #e2e8f0;"
    >
      <p style="margin: 0 0 8px; color: #475569;">Step 0</p>
      <h2 style="margin: 0;">The normal site keeps the full article</h2>

      <NpptHideOnPresentation>
        <div style="display: grid; gap: 18px;">
          <p style="margin: 0; color: #475569; line-height: 1.85;">
            On a real site, you want to keep paragraphs, nuance, and long-form reading. You do not want to
            turn the article into a giant slide just for an occasional demo. That is exactly what NPPT avoids
            by keeping the normal mode intact.
          </p>
          <p style="margin: 0; color: #475569; line-height: 1.85;">
            During the presentation, you can hide these denser blocks and keep a version that feels more direct,
            more visual, and easier to follow for an audience that is not reading every line.
          </p>
        </div>
      </NpptHideOnPresentation>

      <NpptShowOnPresentation on="viewer">
        <p style="margin: 0; max-width: 40ch; color: #0f172a; font-size: 1.2rem; line-height: 1.8; font-weight: 700;">
          The site keeps its normal richness, but the presentation only shows what helps the spoken story.
        </p>
      </NpptShowOnPresentation>
    </section>

    <section
      v-nppt="{
        step: 3,
        title: 'Visual support',
        note: 'Show that images can stay part of the normal page and still help the viewer version without extra presentation-only widgets.',
        keywords: [
          { label: 'Image support', tone: 'info', size: 'lg' },
          { label: 'Cleaner viewer', tone: 'success', size: 'xl' },
          { label: 'No extra layer', tone: 'neutral', size: 'md' },
        ],
      }"
      style="display: grid; gap: 22px; padding: 30px; border-radius: 32px; background: white; border: 1px solid #e2e8f0;"
    >
      <p style="margin: 0 0 8px; color: #475569;">Step 1</p>
      <h2 style="margin: 0;">Images work in both contexts</h2>

      <div class="article-visual-grid">
        <img
          src="https://picsum.photos/1200/760?random=201"
          alt="Editorial visual"
          style="display: block; width: 100%; border-radius: 26px; object-fit: cover;"
        >

        <div style="display: grid; gap: 14px;">
          <NpptHideOnPresentation>
            <div style="padding: 22px; border-radius: 24px; background: #f8fafc; border: 1px solid #e2e8f0;">
              <strong>Normal mode</strong>
              <p style="margin: 8px 0 0; color: #475569; line-height: 1.7;">
                The visual supports a longer text and contributes to a classic editorial reading experience.
              </p>
            </div>
          </NpptHideOnPresentation>

          <NpptShowOnPresentation on="viewer">
            <div style="padding: 22px; border-radius: 24px; background: #0f172a; color: white;">
              <strong>Viewer mode</strong>
              <p style="margin: 8px 0 0; line-height: 1.7; color: rgba(226, 232, 240, 0.88);">
                The same visual becomes much stronger once the secondary text disappears.
              </p>
            </div>
          </NpptShowOnPresentation>
        </div>
      </div>
    </section>

    <section
      data-nppt-step="4"
      data-nppt-title="Next route"
      data-nppt-note="Move to the blog page to show a denser layout with sidebar and gallery patterns."
      data-nppt-next="/blog"
      data-nppt-keywords="Blog page|info|xl,Denser layout|warning|lg,Continue|neutral|md"
      style="display: grid; gap: 18px; padding: 30px; border-radius: 32px; background: white; border: 1px solid #e2e8f0;"
    >
      <p style="margin: 0 0 8px; color: #475569;">Step 2</p>
      <h2 style="margin: 0;">Next: a denser blog page</h2>
      <p style="margin: 0; max-width: 62ch; color: #475569; line-height: 1.75;">
        The next page pushes the demo a bit further with a sidebar, more blocks, more images,
        and a sharper contrast between the normal site and the viewer version.
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.article-visual-grid {
  display: grid;
  gap: 18px;
  grid-template-columns: minmax(0, 1.3fr) minmax(250px, 320px);
  align-items: start;
}

@media (max-width: 900px) {
  .article-visual-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  :deep(header),
  :deep(section) {
    padding: 22px !important;
    border-radius: 24px !important;
  }
}
</style>
