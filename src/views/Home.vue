<template>
    <div class="block">
      <Title />
      <MovieSection v-if="appStore.movieCount !== -1" />
      <BookSection v-if="appStore.bookCount !== -1"/>
      <MovieSection v-if="appStore.movieCount === -1" />
      <BookSection v-if="appStore.movieCount === -1"/>
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
    BookSection,
    Title, MovieSection
  },
  setup() {
    const appStore = useAppStore()
    const userStore = useUserStore()

    onMounted(() => {
      if(cookies.get('token') !== undefined) {
        getUserLikeAndRatingMovieCount()
        getUserLikeAndRatingBookCount()
      }
    })

    const getUserLikeAndRatingMovieCount = () => {
      userApi.getUserLikeAndRatingMovieCount(userStore.userInfo.email)
          .then((response) => {
            appStore.movieCount = response.data.data
          })
    }

    const getUserLikeAndRatingBookCount = () => {
      userApi.getUserLikeAndRatingBookCount(userStore.userInfo.email)
          .then((response) => {
            appStore.bookCount = response.data.data
          })
    }

    return {
      appStore,
      themeConfig: computed(() => appStore.themeConfig)
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
