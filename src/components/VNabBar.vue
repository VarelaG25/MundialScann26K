<template>
  <nav class="nav-wrapper">
    <div class="nav-background"></div>

    <div class="nav-content">
      <Button icon="pi pi-home" class="nav-btn" />

      <div class="center-pill">
        <Button
          icon="pi pi-camera"
          rounded
          class="center-btn"
          @click="scannerOpen = true"
        />
      </div>

      <Button icon="pi pi-flag" class="nav-btn" />
    </div>
  </nav>

  <VARScanner v-model="scannerOpen" />
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import VARScanner from '@/components/VARScanner.vue'
import { ref } from 'vue'

const scannerOpen = ref(false)
</script>

<style scoped>
@import "tailwindcss";

.nav-wrapper {
  @apply fixed bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-md z-50;
}

.nav-background {
  @apply absolute inset-0 bg-[#1a222e];
  mask: radial-gradient(circle 45px at 50% 0%, transparent 45px, black 46px);
  -webkit-mask: radial-gradient(circle 45px at 50% 0%, transparent 45px, black 46px);
  border-radius: 30px;
}

.nav-content {
  @apply relative flex justify-between items-center px-10 h-16;
}

.center-pill {
  @apply relative top-[-30px] flex justify-center items-center;
}

.center-btn {
  @apply !w-18 !h-18 !rounded-full !bg-purple-600 !text-white;
}

.nav-btn {
  @apply !bg-transparent !border-none !text-slate-400 !text-xl;
}
</style>