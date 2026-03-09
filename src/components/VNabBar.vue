<template>
  <nav class="vnab-bar">
    <router-link to="/" active-class="active">Home</router-link>

    <Button
      icon="pi pi-user"
      severity="info"
      variant="text"
      rounded
    />

    <Button
      icon="pi pi-user"
      severity="info"
      size="small"
    />

    <router-link to="/about" active-class="active">About</router-link>
  </nav>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
</script>

<style scoped>
.active {
  border-bottom: 2px solid red;
}
</style>