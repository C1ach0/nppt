<template>
  <div style="position: relative; max-width: 1180px; margin: 0 auto; padding-bottom: 96px;">
    <NpptProgress
      fixed
      bottom="24px"
      left="50%"
      style="transform: translateX(-50%); width: min(360px, calc(100vw - 32px));"
    />

    <div style="display: grid; gap: 28px;">
      <header
        v-nppt="{
          step: 1,
          title: 'Blog hero',
          note: 'Start from a denser blog layout and highlight that the normal site still looks complete outside presentation mode.',
          keywords: [
            { label: 'Blog layout', tone: 'neutral', size: 'md' },
            { label: 'Dense page', tone: 'warning', size: 'lg' },
            { label: 'Cleaner viewer', tone: 'success', size: 'xl' },
          ],
        }"
        style="position: relative; overflow: hidden; display: grid; gap: 18px; padding: 32px; border-radius: 32px; background: linear-gradient(135deg, #fff7ed, #ffffff 45%, #eff6ff); border: 1px solid #fed7aa;"
      >
        <div class="blog-hero-grid">
          <div style="display: grid; gap: 16px;">
            <p style="margin: 0; color: #c2410c; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">Blog Demo</p>
            <h1 style="margin: 0; font-size: clamp(2.4rem, 6vw, 4.6rem); line-height: 0.95;">
              Designing a blog page that still works during a talk
            </h1>
            <NpptHideOnPresentation>
              <p style="margin: 0; max-width: 62ch; color: #475569; line-height: 1.8; font-size: 1.05rem;">
                On a normal site, this page behaves like a real blog article with context, quotes,
                metadata, illustrations, and secondary blocks. During the presentation, only the essential
                pieces remain so the story can breathe.
              </p>
            </NpptHideOnPresentation>
            <NpptShowOnPresentation on="viewer">
              <p style="margin: 0; max-width: 34ch; color: #0f172a; font-size: 1.12rem; line-height: 1.7; font-weight: 600;">
                Same page, but in viewer mode we keep only the message that supports the talk.
              </p>
            </NpptShowOnPresentation>
          </div>

          <div style="position: relative;">
            <img
              src="https://picsum.photos/560/720?grayscale"
              alt="Decorative article hero"
              style="display: block; width: 100%; aspect-ratio: 4 / 5; object-fit: cover; border-radius: 28px; box-shadow: 0 30px 70px rgba(15, 23, 42, 0.16);"
            >
          </div>
        </div>
      </header>

      <div class="blog-layout">
        <article style="display: grid; gap: 28px;">
          <section
            v-nppt="{
              step: 2,
              title: 'Long-form article content',
              note: 'Show how a denser editorial section can disappear in viewer mode while keeping one strong idea and one visual.',
              keywords: [
                { label: 'Hide dense text', tone: 'warning', size: 'lg' },
                { label: 'Keep key message', tone: 'success', size: 'xl' },
                { label: 'Editorial feel', tone: 'info', size: 'md' },
              ],
            }"
            style="display: grid; gap: 20px; padding: 28px; border-radius: 28px; background: white; border: 1px solid #e2e8f0;"
          >
            <div>
              <p style="margin: 0 0 8px; color: #475569;">Step 0</p>
              <h2 style="margin: 0 0 12px;">A normal blog page can stay detailed</h2>
              <p style="margin: 0; color: #475569; line-height: 1.8;">
                This section simulates real editorial content with rich paragraphs, a quote,
                and a secondary image. The goal is to show that the page remains useful outside presentation mode.
              </p>
            </div>

            <NpptHideOnPresentation>
              <div style="display: grid; gap: 18px;">
                <p style="margin: 0; color: #475569; line-height: 1.85;">
                  When you design a site that also has to support a spoken presentation, the danger is bending
                  the normal reading experience around the demo. NPPT takes the opposite route: first let the page
                  behave like a page, then inject presentation adaptations only when they are actually needed.
                </p>
                <blockquote style="margin: 0; padding: 18px 20px; border-left: 4px solid #fb923c; background: #fff7ed; color: #7c2d12; border-radius: 18px;">
                  "The best presentation mode is often the one that disappears when you do not need it."
                </blockquote>
                <img
                  src="https://picsum.photos/1200/680"
                  alt="Editorial illustration"
                  style="display: block; width: 100%; border-radius: 24px; object-fit: cover;"
                >
              </div>
            </NpptHideOnPresentation>

            <NpptShowOnPresentation on="viewer">
              <div class="blog-presentation-split">
                <img
                  src="https://picsum.photos/960/640"
                  alt="Presentation visual"
                  style="display: block; width: 100%; border-radius: 24px; object-fit: cover;"
                >
                <div style="padding: 20px; border-radius: 24px; background: #f8fafc; border: 1px solid #e2e8f0;">
                  <strong style="display: block; margin-bottom: 10px;">Key message</strong>
                  <p style="margin: 0; color: #475569; line-height: 1.7;">
                    The page keeps its normal richness, but the presentation shows only a very readable summary.
                  </p>
                </div>
              </div>
            </NpptShowOnPresentation>
          </section>

          <section
            v-nppt="{
              step: 3,
              title: 'Data and key figures',
              note: 'Focus the audience on a few useful numbers while the surrounding article chrome stays hidden in viewer mode.',
              keywords: [
                { label: 'Stats', tone: 'info', size: 'lg' },
                { label: 'Audience focus', tone: 'success', size: 'xl' },
                { label: 'Clarity', tone: 'warning', size: 'md' },
              ],
            }"
            style="display: grid; gap: 20px; padding: 28px; border-radius: 28px; background: white; border: 1px solid #e2e8f0;"
          >
            <div>
              <p style="margin: 0 0 8px; color: #475569;">Step 1</p>
              <h2 style="margin: 0 0 12px;">Turn data into slide-friendly blocks</h2>
              <p style="margin: 0; color: #475569; line-height: 1.8;">
                A normal page can accumulate a lot of numbers. The presentation version only needs the most meaningful ones.
              </p>
            </div>

            <div style="display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));">
              <div style="padding: 22px; border-radius: 24px; background: linear-gradient(135deg, #eff6ff, #f8fafc); border: 1px solid #bfdbfe;">
                <strong style="display: block; font-size: 2rem;">68%</strong>
                <p style="margin: 8px 0 0; color: #475569;">of readers prefer structured content</p>
              </div>
              <div style="padding: 22px; border-radius: 24px; background: linear-gradient(135deg, #ecfdf5, #f8fafc); border: 1px solid #bbf7d0;">
                <strong style="display: block; font-size: 2rem;">3x</strong>
                <p style="margin: 8px 0 0; color: #475569;">more clarity when dense text disappears in viewer mode</p>
              </div>
              <div style="padding: 22px; border-radius: 24px; background: linear-gradient(135deg, #fffbeb, #ffffff); border: 1px solid #fde68a;">
                <strong style="display: block; font-size: 2rem;">1 page</strong>
                <p style="margin: 8px 0 0; color: #475569;">for the site, the demo, and the presenter view</p>
              </div>
            </div>

            <NpptHideOnPresentation>
              <p style="margin: 0; color: #475569; line-height: 1.85;">
                Below this, you would normally keep a more complete analysis, contextual notes, or even a detailed
                comparison table. This is exactly the kind of content that stays useful on the site but is better left
                out during the spoken presentation.
              </p>
            </NpptHideOnPresentation>
          </section>

          <section
            data-nppt-step="4"
            data-nppt-title="Image gallery"
            data-nppt-note="End this page by showing that a normal gallery can collapse into a stronger image selection in viewer mode."
            data-nppt-keywords="Images|info|lg,Gallery|neutral|md,Simplify|success|xl"
            data-nppt-next="/about"
            style="display: grid; gap: 20px; padding: 28px; border-radius: 28px; background: white; border: 1px solid #e2e8f0;"
          >
            <div>
              <p style="margin: 0 0 8px; color: #475569;">Step 2</p>
              <h2 style="margin: 0 0 12px;">Images can also change role</h2>
              <p style="margin: 0; color: #475569; line-height: 1.8;">
                A normal gallery can become a more selective set of visuals during the presentation.
              </p>
            </div>

            <NpptHideOnPresentation>
              <div class="blog-gallery-grid">
                <img src="https://picsum.photos/600/420?random=11" alt="Gallery image 1" style="display: block; width: 100%; border-radius: 22px; object-fit: cover;">
                <img src="https://picsum.photos/600/420?random=12" alt="Gallery image 2" style="display: block; width: 100%; border-radius: 22px; object-fit: cover;">
                <img src="https://picsum.photos/600/420?random=13" alt="Gallery image 3" style="display: block; width: 100%; border-radius: 22px; object-fit: cover;">
              </div>
            </NpptHideOnPresentation>

            <NpptShowOnPresentation on="viewer">
              <div class="blog-presentation-gallery">
                <img src="https://picsum.photos/900/680?random=12" alt="Main presentation image" style="display: block; width: 100%; height: 100%; min-height: 300px; border-radius: 26px; object-fit: cover;">
                <div style="display: grid; gap: 12px;">
                  <div style="padding: 18px; border-radius: 22px; background: #0f172a; color: white;">
                    <strong style="display: block; margin-bottom: 8px;">Why one image works better</strong>
                    <p style="margin: 0; line-height: 1.7; color: rgba(226, 232, 240, 0.88);">
                      A hero image supports spoken pacing far better than a grid of thumbnails.
                    </p>
                  </div>
                  <img src="https://picsum.photos/520/320?random=14" alt="Secondary presentation image" style="display: block; width: 100%; border-radius: 22px; object-fit: cover;">
                </div>
              </div>
            </NpptShowOnPresentation>
          </section>
        </article>

        <aside style="display: grid; gap: 20px; align-content: start;">
          <NpptHideOnPresentation>
            <section style="padding: 24px; border-radius: 24px; background: white; border: 1px solid #e2e8f0;">
              <p style="margin: 0 0 10px; color: #475569; font-weight: 700;">Article metadata</p>
              <p style="margin: 0 0 8px; color: #475569;">Author: Studio NPPT</p>
              <p style="margin: 0 0 8px; color: #475569;">Reading time: 7 min</p>
              <p style="margin: 0; color: #475569;">Category: Demo content</p>
            </section>

            <section style="padding: 24px; border-radius: 24px; background: white; border: 1px solid #e2e8f0;">
              <p style="margin: 0 0 12px; font-weight: 700;">Newsletter</p>
              <p style="margin: 0 0 16px; color: #475569; line-height: 1.7;">
                A real site would also keep secondary blocks like this one.
              </p>
              <div style="display: grid; gap: 10px;">
                <input type="email" placeholder="you@example.com" style="min-height: 46px; padding: 0 14px; border-radius: 14px; border: 1px solid #cbd5e1;">
                <button style="min-height: 46px; border: 0; border-radius: 14px; background: #0f172a; color: white; cursor: pointer;">
                  Subscribe
                </button>
              </div>
            </section>
          </NpptHideOnPresentation>

          <NpptShowOnPresentation on="viewer">
            <section style="padding: 24px; border-radius: 24px; background: linear-gradient(135deg, #eff6ff, #ffffff); border: 1px solid #bfdbfe;">
              <p style="margin: 0 0 10px; font-weight: 700; color: #1d4ed8;">Viewer simplification</p>
              <p style="margin: 0; color: #475569; line-height: 1.7;">
                The sidebar, forms, and metadata disappear so the page can breathe during the talk.
              </p>
            </section>
          </NpptShowOnPresentation>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.blog-hero-grid {
  display: grid;
  gap: 18px;
  grid-template-columns: minmax(0, 1.2fr) minmax(320px, 420px);
  align-items: center;
}

.blog-layout {
  display: grid;
  gap: 28px;
  grid-template-columns: minmax(0, 1fr) 320px;
}

.blog-presentation-split {
  display: grid;
  gap: 14px;
  grid-template-columns: minmax(0, 1.1fr) minmax(240px, 320px);
  align-items: center;
}

.blog-gallery-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.blog-presentation-gallery {
  display: grid;
  gap: 16px;
  grid-template-columns: minmax(0, 1.3fr) minmax(240px, 320px);
  align-items: stretch;
}

@media (max-width: 980px) {
  .blog-hero-grid,
  .blog-layout,
  .blog-presentation-split,
  .blog-presentation-gallery {
    grid-template-columns: 1fr;
  }

  .blog-gallery-grid {
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
