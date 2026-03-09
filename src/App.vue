<script setup lang="ts">
import NavBar from '@/components/VNabBar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <NavBar />

    <main class="flex-1 p-4">
      <RouterView />
    </main>
  </div>
</template>