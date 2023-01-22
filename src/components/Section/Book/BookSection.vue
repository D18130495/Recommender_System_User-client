<template>
  <div>
    <p class="relative opacity-90 flex items-center pt-12 pb-2 mb-8 text-3xl text-ob-bright">
      <el-icon class="inline-block mr-2"><Film/></el-icon>
      Books
      <span class="absolute bottom-0 h-1 w-24 rounded-full" :style="gradientBackground"/>
    </p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { useAppStore } from '@/stores/app'


export default defineComponent({
  name: 'BookSection',
  setup() {
    const appStore = useAppStore()

    return {
      gradientBackground: computed(() => {
        if(appStore.themeConfig.theme === 'theme-dark') {
          return {
            background: appStore.themeConfig.header_gradient_dark,
          }
        }else {
          return {
            background: appStore.themeConfig.header_gradient_light,
          }
        }
      })
    }
  }
})
</script>
