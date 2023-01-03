<template>
    <div class="block">
      <Title v-if="themeConfig.feature"></Title>

      <Section v-if="themeConfig.feature" id="article-list" :title="'titles.articles'"/>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue"

import { useAppStore } from '@/stores/app'

import Title from "@/components/Title/Title.vue"
import Section from "@/components/Section/Section.vue"


export default defineComponent({
  name: 'Home',
  components: {
    Title, Section
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
