<template>
  <nav style="display: flex; gap: 1rem; padding: 1rem; align-items: center; justify-content: center;">
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>

  <main style="padding: 1rem; min-height: 100vh;">
    <router-view />
  </main>

  <NpptPresenter />

  <footer>
    <p style="text-align: center; padding: 1rem;">(c) 2024 My Vue App</p>
  </footer>
  
  <NpptLauncher style="position: fixed; bottom: 1rem; right: 1rem;" />
</template>

<script setup lang="ts">
</script>
