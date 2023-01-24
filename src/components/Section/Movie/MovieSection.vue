<template>
  <div>
    <div class="grid grid-cols-2">
      <p class="relative grid-cols-1 opacity-90 flex items-center pt-12 pb-2 mb-8 text-3xl text-ob-bright">
        <el-icon class="inline-block mr-2"><Film/></el-icon>
        Movies
        <span class="absolute bottom-0 h-1 w-24 rounded-full" :style="gradientBackground"/>
      </p>

      <button class="grid-cols-1 text-right" @click="refreshMovie">
        <el-icon size="25px"><Refresh class="text-ob-bright" /></el-icon>
      </button>
    </div>

    <div class="item-grid">
      <div class="flex flex-col relative">
        <ul class="grid grid-cols-3 xl:grid-cols-6 gap-8">
          <li v-for="movie in reactiveData.movies" :key="movie.id">
            <MovieItemCard class="home-item" :data="movie" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, computed, defineComponent, onBeforeMount } from 'vue'

import { useAppStore } from "@/stores/app"

import MovieItemCard from "@/components/Section/Movie/MovieItemCard.vue"

import movieApi from "@/api/movie"


export default defineComponent({
  name: 'MovieSection',
  components: {
    MovieItemCard
  },
  setup() {
    const appStore = useAppStore()
    const reactiveData = reactive({
      movies: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 }
      ] as any
    })

    onBeforeMount(() => {
      getRandomMovieList()
    })

    const getRandomMovieList = () => {
      movieApi.getRandomMovieList()
          .then((response) => {
            reactiveData.movies = response.data.data
          })
    }

    const refreshMovie = () => {
      getRandomMovieList()
    }

    return {
      reactiveData,
      refreshMovie,
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
      })
    }
  }
})
</script>

<style lang="scss">
.home-item {
  .item-content {
    span {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
