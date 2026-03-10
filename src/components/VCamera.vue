<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Capturar Foto"
    :style="{ width: '90vw', maxWidth: '450px' }"
    :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
    class="camera-dialog"
    @hide="stopCamera"
  >
    <div class="camera-card">
      <div class="video-container">
        <video
          v-show="hasPermission"
          ref="videoPlayer"
          autoplay
          playsinline
          class="video-feed"
        ></video>

        <div v-if="!hasPermission" class="absolute inset-0 flex items-center justify-center">
          <i class="pi pi-camera-slash text-slate-500 text-4xl"></i>
        </div>

        <div class="viewfinder-overlay"></div>
      </div>

      <div class="actions">
        <Button
          icon="pi pi-refresh"
          rounded
          text
          class="switch-btn"
          @click="toggleCamera"
          :disabled="!hasPermission"
        />

        <button
          class="shutter-btn"
          @click="takePhoto"
          :class="{ 'opacity-50 cursor-not-allowed': !hasPermission }"
        >
          <div class="shutter-inner"></div>
        </button>

        <Button icon="pi pi-times" rounded text severity="danger" @click="visible = false" />
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import Dialog from 'primevue/dialog'
  import Button from 'primevue/button'

  const props = defineProps<{ modelValue: boolean }>()
  const emit = defineEmits(['update:modelValue', 'capture'])

  const visible = ref(false)
  const videoPlayer = ref<HTMLVideoElement | null>(null)
  const stream = ref<MediaStream | null>(null)
  const currentFacingMode = ref<'user' | 'environment'>('user')
  const hasPermission = ref(true) // Estado para rastrear el permiso

  watch(
    () => props.modelValue,
    val => {
      visible.value = val
      if (val) startCamera()
    }
  )

  watch(visible, val => {
    emit('update:modelValue', val)
  })

  async function startCamera() {
    if (stream.value) stopCamera()

    try {
      stream.value = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: currentFacingMode.value },
        audio: false,
      })

      hasPermission.value = true

      if (videoPlayer.value) {
        videoPlayer.value.srcObject = stream.value
      }
    } catch (err) {
      // CAPTURA DE ERROR: No cerramos el modal, el video queda en negro por el CSS
      console.warn('Acceso a cámara denegado o no disponible:', err)
      hasPermission.value = false
      // El modal permanece abierto para que puedas manipularlo
    }
  }

  function stopCamera() {
    if (stream.value) {
      stream.value.getTracks().forEach(track => track.stop())
      stream.value = null
    }
  }

  function toggleCamera() {
    currentFacingMode.value = currentFacingMode.value === 'user' ? 'environment' : 'user'
    startCamera()
  }

  function takePhoto() {
    // Si no hay stream activo o permiso, no hace nada
    if (!videoPlayer.value || !stream.value) return

    const canvas = document.createElement('canvas')
    canvas.width = videoPlayer.value.videoWidth
    canvas.height = videoPlayer.value.videoHeight
    const ctx = canvas.getContext('2d')

    if (ctx) {
      ctx.drawImage(videoPlayer.value, 0, 0)
      const dataUrl = canvas.toDataURL('image/png')
      emit('capture', dataUrl)
      visible.value = false
    }
  }
</script>

<style scoped>
  @import 'tailwindcss';

  .camera-card {
    @apply flex flex-col gap-6 items-center overflow-hidden;
  }

  .video-container {
    @apply relative w-full aspect-[3/4] bg-black rounded-3xl overflow-hidden shadow-2xl;
  }

  .video-feed {
    @apply w-full h-full object-cover;
  }

  .viewfinder-overlay {
    @apply absolute inset-6 border-2 border-white/20 rounded-2xl pointer-events-none;
  }

  .actions {
    @apply flex justify-between items-center w-full px-6 pb-2;
  }

  .shutter-btn {
    @apply w-20 h-20 rounded-full border-4 border-slate-200 flex items-center justify-center
           transition-transform active:scale-95;
  }

  .shutter-inner {
    @apply w-16 h-16 rounded-full bg-white shadow-inner;
  }

  .switch-btn {
    @apply !text-slate-600;
  }

  :deep(.p-dialog-content) {
    @apply !bg-slate-50 !rounded-b-3xl;
  }

  :deep(.p-dialog-header) {
    @apply !bg-slate-50 !pt-6 !border-none;
  }
</style>
