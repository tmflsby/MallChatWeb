<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="home-view">
    <RouterView />
  </div>
</template>

<style scoped>
.home-view {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: url('@/assets/login_bg.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

@supports (background-image: url('@/assets/login_bg.webp')) {
  .home-view {
    background-image: url('@/assets/login_bg.webp');
  }
}
</style>
