<template>
  <div class="playground-shell" style="min-height: 100vh; background: linear-gradient(180deg, #fffaf5 0%, #ffffff 24%, #f8fafc 100%); color: #0f172a;">
    <header style="position: sticky; top: 0; z-index: 20; backdrop-filter: blur(14px); background: rgba(255, 255, 255, 0.82); border-bottom: 1px solid rgba(226, 232, 240, 0.8);">
      <div class="playground-header" style="max-width: 1180px; margin: 0 auto; padding: 16px 20px; display: flex; gap: 16px; align-items: center; justify-content: space-between; flex-wrap: wrap;">
        <a href="/" style="text-decoration: none; color: #0f172a; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase;">
          NPPT Playground
        </a>

        <nav class="playground-nav" style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
          <a href="/" style="text-decoration: none; color: #475569;">Index</a>
          <a href="/article" style="text-decoration: none; color: #475569;">Article</a>
          <a href="/blog" style="text-decoration: none; color: #475569;">Blog</a>
          <a href="/about" style="text-decoration: none; color: #475569;">About</a>
          <a href="/contact" style="text-decoration: none; color: #475569;">Contact</a>
        </nav>
      </div>
    </header>

    <main class="playground-main" style="padding: 24px 16px 96px; min-height: 100vh;">
      <NuxtPage />
    </main>

    <NpptPresenter />

    <footer style="border-top: 1px solid rgba(226, 232, 240, 0.9); background: rgba(255,255,255,0.72);">
      <div class="playground-footer" style="max-width: 1180px; margin: 0 auto; padding: 18px 20px; color: #64748b; font-size: 14px;">
        Demo site for NPPT. Normal site first, presentation layer second.
      </div>
    </footer>

    <NpptLauncher style="position: fixed; bottom: 1rem; right: 1rem;" />
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.playground-nav {
  justify-content: flex-end;
}

@media (max-width: 900px) {
  .playground-header {
    align-items: flex-start;
  }

  .playground-nav {
    width: 100%;
    justify-content: flex-start;
  }
}

@media (max-width: 640px) {
  .playground-main {
    padding: 18px 12px 88px !important;
  }

  .playground-footer {
    padding: 16px 12px !important;
  }
}
</style>
