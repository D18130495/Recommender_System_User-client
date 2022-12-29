<template>
  <ThemeSwitchButton :status="defaultStatus" @changeStatus="handleChange"/>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { useAppStore } from '@/stores/app'

import ThemeSwitchButton from './ThemeSwitchButton.vue'


export default defineComponent({
  name: 'ThemeSwitch',
  components: {
    ThemeSwitchButton
  },
  setup() {
    const appStore = useAppStore()
    const defaultStatus = appStore.themeConfig.theme === 'theme-dark'

    const handleChange = (status: boolean) => {
      appStore.switchTheme(status)
    }

    return {
      defaultStatus,
      handleChange,
      theme: computed(() => {
        return appStore.themeConfig.theme
      })
    }
  }
})
</script>
