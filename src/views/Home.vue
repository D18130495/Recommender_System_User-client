<template>
  <div class="block">
    <title>Finterest</title>
    <Title />
    <MovieSection v-if="appStore.movieCount !== -1 && appStore.bookCount !== -1" />
    <BookSection v-if="appStore.bookCount !== -1 && appStore.movieCount !== -1"/>
    <MovieSection v-if="appStore.movieCount === -1 && appStore.bookCount === -1" />
    <BookSection v-if="appStore.movieCount === -1 && appStore.bookCount === -1"/>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted } from "vue"

import { useAppStore } from '@/stores/app'
import { useUserStore } from "@/stores/user"

import Title from "@/components/Title/Title.vue"
import MovieSection from "@/components/Section/Movie/MovieSection.vue"
import BookSection from "@/components/Section/Book/BookSection.vue"

import userApi from "@/api/user"
import cookies from "js-cookie";


export default defineComponent({
  name: 'Home',
  components: {
    Title, MovieSection, BookSection
  },
  setup() {
    const appStore = useAppStore()
    const userStore = useUserStore()

    return {
      appStore,
      themeConfig: computed(() => appStore.themeConfig)
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
