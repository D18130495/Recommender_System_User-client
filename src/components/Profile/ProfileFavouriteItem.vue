<template>
  <div class="bg-ob-deep-800 p-4 mt-8 lg:px-14 lg:py-10 rounded-2xl shadow-xl mb-8 lg:mb-0">
    <p class="relative flex items-center pb-2 mb-4 text-ob-bright">
      <span class="w-full text-2xl font-bold">Favourite items</span>
      <span class="bottom-0 h-1 w-14 rounded-full absolute" :style="gradientBackground" />
    </p>

    <!-- TODO -->
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue'

import { useAppStore } from "@/stores/app"


export default defineComponent({
  name: 'ProfileFavouriteItem',
  setup() {
    const appStore = useAppStore()

    return {
      gradientBackground: computed(() => {
        if(appStore.themeConfig.theme === 'theme-dark') {
          return {
            background: appStore.themeConfig.header_gradient_dark
          }
        }else {
          return {
            background: appStore.themeConfig.header_gradient_light
          }
        }
      })
    }
  }
})
</script>
