<template>
  <div class="block">
    <Title v-if="themeConfig.feature"></Title>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue"

import { useAppStore } from '@/stores/app'

import Title from "../components/Title/Title.vue"


export default defineComponent({
  name: 'Home',
  components: {
    Title
  },
  setup() {
    const appStore = useAppStore()

    return {
      themeConfig: computed(() => appStore.themeConfig)
    }
  }
})
</script>

<style>
</style>
