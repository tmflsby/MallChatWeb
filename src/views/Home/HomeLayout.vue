<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import ToolBar from '@/views/Home/components/ToolBar/ToolBar.vue'

const year = ref(new Date().getFullYear())
</script>

<template>
  <main class="home pos-relative p-y-10vh p-x-0 wh-full">
    <div
      class="wrapper pos-relative flex flex-row items-stretch w-80vw h-83vh m-y-0 m-x-auto b-rd-16px"
      style="color: var(--font-main); background-color: var(--background-wrapper)"
    >
      <ToolBar />
      <RouterView />
    </div>
    <footer
      class="footer pos-absolute bottom-0 left-0 w-full p-12px text-12px text-center"
      style="color: var(--font-main)"
    >
      <span>Copyright ©{{ year }}</span>
    </footer>
  </main>
</template>

<style lang="scss" scoped>
@media only screen and (max-width: 640px) {
  .home {
    padding: 0;
  }
  .wrapper {
    flex-direction: column;
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
  .footer {
    position: relative;
    padding: 4px 0;
    background-color: var(--background-secondary);
    transform: scale(0.9);
  }
}
</style>
