<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Escanear Bandera"
    :style="{ width: '95vw', maxWidth: '500px' }"
    class="camera-dialog"
    @show="startAR"
    @hide="stopAR"
  >
    <div class="ar-wrapper">
      <a-scene
        v-if="arActive"
        embedded
        arjs="sourceType: webcam; debugUIEnabled: false;"
        class="ar-scene"
      >
        <a-assets>
          <a-asset-item id="mexicoModel" src="models/eagle.glb"></a-asset-item>
        </a-assets>

        <!-- Marker de bandera -->
        <a-marker type="pattern" url="markers/mexico.patt" @markerFound="onMarkerFound">
          <a-entity gltf-model="#mexicoModel" scale="0.5 0.5 0.5" position="0 0 0"></a-entity>
        </a-marker>

        <a-entity camera></a-entity>
      </a-scene>

      <div v-if="!arActive" class="loading">
        <i class="pi pi-camera text-4xl text-slate-500"></i>
        <p>Inicializando cámara...</p>
      </div>
    </div>

    <template #footer>
      <Button icon="pi pi-times" label="Cerrar" severity="danger" @click="visible = false" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import Dialog from 'primevue/dialog'
  import Button from 'primevue/button'

  const props = defineProps<{ modelValue: boolean }>()
  const emit = defineEmits(['update:modelValue', 'marker'])

  const visible = ref(false)
  const arActive = ref(false)

  watch(
    () => props.modelValue,
    val => {
      visible.value = val
    }
  )

  watch(visible, val => {
    emit('update:modelValue', val)
  })

  function startAR() {
    arActive.value = true
  }

  function stopAR() {
    arActive.value = false
  }

  function onMarkerFound() {
    emit('marker', 'mexico')
  }
</script>

<style scoped>
  @import 'tailwindcss';

  .ar-wrapper {
    @apply w-full h-[70vh] bg-black rounded-2xl overflow-hidden relative;
  }

  .ar-scene {
    width: 100%;
    height: 100%;
  }

  .loading {
    @apply flex flex-col items-center justify-center h-full text-slate-500 gap-4;
  }
</style>
