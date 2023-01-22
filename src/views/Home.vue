<template>
    <div class="block">
      <Title />
      <MovieSection />
      <BookSection />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue"

import { useAppStore } from '@/stores/app'

import Title from "@/components/Title/Title.vue"
import MovieSection from "@/components/Section/Movie/MovieSection.vue"
import BookSection from "@/components/Section/Book/BookSection.vue"


export default defineComponent({
  name: 'Home',
  components: {
    BookSection,
    Title, MovieSection
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
