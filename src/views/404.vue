<template>
  <div>
    <div class="notFound-box">
      <h1 class="notFound-heading" :style="themeSetting">404</h1>
      <h1 class="botFound-title" :style="themeSetting">Page Not Found</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useAppStore } from "@/stores/app";

export default defineComponent({
  name: '404',
  setup() {
    const appStore = useAppStore()

    return {
      themeSetting: computed(() => {
        if (appStore.themeConfig.theme === 'theme-dark') {
          return `
            text-shadow: 0 0 1rem #ffffff;
          `
        } else {
          return `
            text-shadow: 0 0 1rem #000000;
          `
        }
      })
    }
  }
})
</script>

<style>
</style>
