<template>
  <div class="flex items-start self-stretch relative">
    <div class="flex flex-col relative py-4 z-10 text-white font-medium ob-drop-shadow">
      <span class="flex text-3xl">
        {{ websiteConfig.name || 'Website' }}
      </span>
      <span class="font-extrabold text-xs uppercase">
        {{ websiteConfig.englishName || 'Website' }}
      </span>
    </div>
    <img class="logo-image" src="@/assets/logo.png" alt="site-logo"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { computed } from '@vue/reactivity'

import { useAppStore } from '@/stores/app'


export default defineComponent({
  name: 'Logo',
  setup() {
    const appStore = useAppStore()

    return {
      websiteConfig: computed(() => {
        return appStore.websiteConfig
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.logo-image {
  @apply absolute mr-2 rounded-full;
  height: 180px;
  width: 180px;
  max-width: 180px;
  top: -80px;
  left: -80px;
  opacity: 0.15;
}
</style>
