<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow">
      <div class="max-w-4xl mx-auto py-4 px-4">
        <h1 class="text-2xl font-bold text-gray-900">麻将记分系统</h1>
      </div>
    </header>
    <main class="py-6">
      <MahjongScorer />
    </main>
  </div>
</template>

<script setup lang="ts">
import MahjongScorer from './components/MahjongScorer.vue'
</script>

