<script setup lang="ts">
import NavBar from '@/components/VNabBar.vue'
import VARScanner from '@/components/VARScanner.vue'
import { RouterView } from 'vue-router'
import { ref } from 'vue'

const scannerOpen = ref(false)
</script>

<template>
  <div class="app-layout">

    <main class="app-content">
      <RouterView />
    </main>

    <NavBar @openScanner="scannerOpen = true" />

    <VARScanner
      v-model="scannerOpen"
    />

  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-content {
  flex: 1;
  padding: 1rem;
  padding-bottom: 120px; /* espacio para el navbar */
}
</style>