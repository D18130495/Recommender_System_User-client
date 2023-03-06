<template>
  <div class="flex items-start self-stretch relative" @click="handleClick">
    <div class="flex flex-col relative py-4 z-10 text-white font-medium ob-drop-shadow cursor-pointer" @click="">
      <span class="flex text-3xl">
        {{ websiteConfig.name || 'Website' }}
      </span>
      <span class="font-extrabold text-xs uppercase">
        {{ websiteConfig.englishName || 'Website' }}
      </span>
    </div>
<!--    <img class="logo-image" :src="websiteConfig.logo" alt="site-logo"/>-->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { computed } from '@vue/reactivity'
import { useRouter } from 'vue-router'

import { useAppStore } from '@/stores/app'
import { useHeaderImageStore } from '@/stores/headerImage'
import { useNavigatorStore } from '@/stores/navigator'


export default defineComponent({
  name: 'Logo',
  setup() {
    const appStore = useAppStore()
    const headerImageStore = useHeaderImageStore()
    const navigatorStore = useNavigatorStore()
    const router = useRouter()

    const handleClick = () => {
      router.push({ path: '/' })

      if(headerImageStore.isMobile && navigatorStore.openMenu === true) {
        navigatorStore.toggleMobileMenu()
      }
    }

    return {
      websiteConfig: computed(() => {
        return appStore.websiteConfig
      }),
      handleClick
    }
  }
})
</script>

<style lang="scss" scoped>
.logo-image {
  height: 200px;
  width: 200px;
  max-width: 200px;
  top: -60px;
  left: -60px;
  opacity: 0.05;
  @apply absolute mr-2 rounded-full;
}
</style>
