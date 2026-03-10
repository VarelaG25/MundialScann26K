<template>
  <nav class="nav-wrapper">
    <div class="nav-background"></div>

    <div class="nav-content">
      <Button icon="pi pi-home" class="nav-btn" aria-label="Home" />

      <div class="center-pill">
        <Button icon="pi pi-camera" rounded class="center-btn" @click="scannerOpen = true" />
      </div>

      <Button icon="pi pi-flag" class="nav-btn" aria-label="Settings" />
    </div>

    <VARScanner v-model="scannerOpen" @marker="handleCountry" />
  </nav>
</template>

<script setup lang="ts">
  import Button from 'primevue/button'
  import VARScanner from '@/components/VARScanner.vue'
  import { ref } from 'vue'

  const scannerOpen = ref(false)
  function handleCountry(country: string) {
    console.log('Bandera detectada:', country)
  }
</script>

<style scoped>
  @import 'tailwindcss';

  .nav-wrapper {
    @apply fixed bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-md z-50;
    /* Filtro para dar suavidad a los bordes de la muesca */
    filter: drop-shadow(0 15px 25px rgba(0, 0, 0, 0.4));
  }

  .nav-background {
    @apply absolute inset-0 bg-[#1a222e];
    /* Ajuste de máscara: el círculo transparente es un poco más grande para el botón */
    mask: radial-gradient(circle 45px at 50% 0%, transparent 45px, black 46px);
    -webkit-mask: radial-gradient(circle 45px at 50% 0%, transparent 45px, black 46px);
    border-radius: 30px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .nav-content {
    @apply relative flex justify-between items-center px-10 h-16;
  }

  .center-pill {
    /* AJUSTE CLAVE: Bajamos el botón de -top-1 a un valor que lo centre en la curva */
    @apply relative top-[-30px] flex justify-center items-center;
  }

  .center-btn {
    /* Tamaño ideal para que encaje en la muesca de 45px */
    @apply !w-18 !h-18 !rounded-full !bg-[#9333ea] 
           !border-none !text-white transition-all duration-300;
    @apply !text-2xl; /* Tamaño del icono */
  }

  .center-btn:active {
    @apply scale-90;
  }

  .nav-btn {
    @apply !bg-transparent !border-none !text-slate-500 !text-xl
           hover:!text-white transition-colors;
  }

  /* El resplandor blanco/morado que se ve en la base del círculo rojo */
  .center-pill::after {
    content: '';
    @apply absolute top-12 w-14 h-4 bg-white/10 blur-xl -z-10;
  }
</style>
