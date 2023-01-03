<template>
  <div>
    <p :id="id" class="relative opacity-90 flex items-center pt-12 pb-2 mb-8 text-3xl text-ob-bright">
      <el-icon class="inline-block mr-2"><Film/></el-icon>
      Movies
      <span class="absolute bottom-0 h-1 w-24 rounded-full" :style="gradientBackground"/>
    </p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue'

import { useAppStore } from '@/stores/app'


export default defineComponent({
  name: 'Title',
  props: {
    title: {
      type: String,
      required: true
    },
    id: String,
    icon: String
  },
  setup(props) {
    const appStore = useAppStore()
    const titleStr = toRefs(props).title

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
      }),
      titleStr
    }
  }
})
</script>
