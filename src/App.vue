<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app-wrapper">
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
.app-wrapper {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: url('@/assets/login_bg.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

@supports (background-image: url('@/assets/login_bg.webp')) {
  .app-wrapper {
    background-image: url('@/assets/login_bg.webp');
  }
}
</style>
