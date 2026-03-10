<template>
  <div v-if="modelValue" class="ar-wrapper">
    <a-scene
      embedded
      vr-mode-ui="enabled: false"
      device-orientation-permission-ui="enabled: false"
      arjs="sourceType: webcam; debugUIEnabled: false; trackingMethod: best;"
      renderer="antialias: true; alpha: true"
    >
      <a-assets timeout="10000">
        <a-asset-item id="eagleModel" src="/models/eagle.glb"></a-asset-item>
      </a-assets>

      <a-marker type="pattern" url="/markers/mexico.patt">
        <a-entity
          gltf-model="#eagleModel"
          scale="0.5 0.5 0.5"
          position="0 0 0"
          animation="property: rotation; to: 0 360 0; loop: true; dur: 10000"
        />
      </a-marker>

      <a-entity camera />
    </a-scene>

    <button class="close-btn" @click="emit('update:modelValue', false)">✕</button>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    modelValue: boolean
  }>()

  const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
  .ar-wrapper {
    position: fixed;
    inset: 0;
    z-index: 60;
    background: black;
  }

  /* Scene dentro del contenedor */
  :deep(a-scene) {
    position: absolute !important;
    inset: 0;
  }

  /* video de la cámara */
  :deep(video) {
    position: absolute !important;
    inset: 0;
    width: 100% !important;
    height: 100% !important;
    object-fit: cover;
  }

  /* canvas render */
  :deep(canvas) {
    position: absolute !important;
    inset: 0;
    width: 100% !important;
    height: 100% !important;
  }

  .close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 70;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }
</style>
