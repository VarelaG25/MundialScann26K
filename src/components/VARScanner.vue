<template>
  <div class="ar-wrapper border-2 border-dashed border-gray-400 rounded-lg overflow-hidden">
    <a-scene
      embedded
      arjs="sourceType: webcam; debugUIEnabled: false; trackingMethod: best;"
      renderer="antialias: true; colorManagement: true; sortObjects: true;"
    >
      <a-assets timeout="10000">
        <a-asset-item id="eagleModel" src="/models/eagle.glb"></a-asset-item>
      </a-assets>

      <a-marker type="pattern" url="/markers/mexico.patt">
        <a-entity
          gltf-model="#eagleModel"
          scale="0.5 0.5 0.5"
          position="0 0 0"
          rotation="0 0 0"
          animation="property: rotation; to: 0 360 0; loop: true; dur: 10000"
        ></a-entity>
      </a-marker>

      <a-entity camera></a-entity>
    </a-scene>
  </div>
</template>

<style scoped>
  .ar-wrapper {
    width: 100%;
    height: 500px; /* Altura fija para que conviva con tu NavBar */
    position: relative;
    background-color: #000;
  }

  /* AR.js suele crear un canvas hermano del video, 
   forzamos a que se mantenga dentro del div */
  :deep(canvas) {
    width: 100% !important;
    height: 100% !important;
    left: 0 !important;
    top: 0 !important;
  }
</style>
