<template>
  <div>
  <div>
    <div class="grid grid-cols-2">
      <p class="relative grid-cols-1 opacity-90 flex items-center pt-12 pb-2 mb-8 text-3xl text-ob-bright">
        <el-icon class="inline-block mr-2"><Film/></el-icon>
        What to watch
        <span class="absolute bottom-0 h-1 w-24 rounded-full" :style="gradientBackground"/>
      </p>

      <button class="grid-cols-1 text-right" @click="refreshGeneralMovie">
        <el-icon size="25px"><Refresh class="text-ob-bright" /></el-icon>
      </button>
    </div>

    <div class="item-grid">
      <div class="flex flex-col relative">
        <ul class="grid grid-cols-3 xl:grid-cols-6 gap-8">
          <li v-for="movie in generalMovies" :key="movie.movieId">
            <MovieItemCard class="home-item" :data="movie" />
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div v-if="userStore.userInfo !== ''">
    <div class="grid grid-cols-2">
      <p class="relative grid-cols-1 opacity-90 flex items-center pt-12 pb-2 mb-8 text-3xl text-ob-bright">
        <el-icon class="inline-block mr-2"><Film/></el-icon>
        Movies just for you
        <span class="absolute bottom-0 h-1 w-24 rounded-full" :style="gradientBackground"/>
      </p>

      <button class="grid-cols-1 text-right" @click="refreshRecommendMovie">
        <el-icon size="25px"><Refresh class="text-ob-bright" /></el-icon>
      </button>
    </div>

    <div class="item-grid">
      <div class="flex flex-col relative">
        <ul class="grid grid-cols-3 xl:grid-cols-6 gap-8">
          <li v-for="movie in recommendMovies" :key="movie.movieId">
            <MovieItemCard :data="movie" />
          </li>
        </ul>
      </div>
    </div>
  </div>
  </div>
</template>

<script lang="ts">
import { reactive, computed, defineComponent, onBeforeMount, toRefs } from 'vue'

import { useAppStore } from "@/stores/app"
import { useUserStore } from "@/stores/user"

import MovieItemCard from "@/components/Section/Movie/MovieItemCard.vue"

import movieApi from "@/api/movie"


export default defineComponent({
  name: 'MovieSection',
  components: {
    MovieItemCard
  },
  setup() {
    const appStore = useAppStore()
    const userStore = useUserStore()
    const reactiveData = reactive({
      generalMovies: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }] as any,
      recommendMovies: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }] as any,
    })

    onBeforeMount(() => {
      getRandomMovieList()
    })

    const getRandomMovieList = () => {
      movieApi.getRandomMovieList()
          .then((response) => {
            reactiveData.generalMovies = response.data.data
          })
    }

    const refreshGeneralMovie = () => {
      getRandomMovieList()
    }

    const refreshRecommendMovie = () => {

    }

    return {
      userStore,
      ...toRefs(reactiveData),
      refreshGeneralMovie,
      refreshRecommendMovie,
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
</style>
