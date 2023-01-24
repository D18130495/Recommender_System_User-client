<template>
  <div>
    Movie
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import { useAppStore } from '@/stores/app'


export default defineComponent({
  name: 'Movie',
  components: {},
  setup() {
    const appStore = useAppStore()

    return {
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
