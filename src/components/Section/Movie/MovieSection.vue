<template>
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

  <div>
    <div class="grid grid-cols-2">
      <p class="relative grid-cols-1 opacity-90 flex items-center pt-12 pb-2 mb-8 text-3xl text-ob-bright">
        <el-icon class="inline-block mr-2"><Film/></el-icon>
        Movies just for you
        <span class="absolute bottom-0 h-1 w-24 rounded-full" :style="gradientBackground"/>
      </p>

      <!-- display refresh button -->
      <button v-if="userStore.userInfo !== '' &&
                    userStore.userInfo.policy === 'T' &&
                    recommendMovies &&
                    userStore.likeOrRateNumber >= 5" class="grid-cols-1 text-right" @click="refreshRecommendMovie">
        <el-icon size="25px"><Refresh class="text-ob-bright" /></el-icon>
      </button>
    </div>

    <!-- display movie card -->
    <div v-if="userStore.userInfo !== '' &&
               userStore.userInfo.policy === 'T' &&
               recommendMovies &&
               userStore.likeOrRateNumber >= 5" class="item-grid">
      <div class="flex flex-col relative">
        <ul class="grid grid-cols-3 xl:grid-cols-6 gap-8">
          <li v-for="movie in recommendMovies" :key="movie.movieId">
            <MovieItemCard :data="movie" />
          </li>
        </ul>
      </div>
    </div>
    <!-- not sign in -->
    <div v-else-if="userStore.userInfo === ''" class="item-grid mb-4">
      <div class="flex flex-col relative mx-auto">
        <el-icon class="mx-auto mt-6" size="40px"><CirclePlusFilled class="text-ob-bright"/></el-icon>

        <div class="mt-4">
          <p class="font-bold text-center text-ob-bright">Sign in to access your Watchlist</p>
          <p class="text-center text-ob-bright">Save or rating items to keep track of what you want.</p>
        </div>

        <button
            @click="toSignIn"
            id="submit-button"
            class="mx-auto mt-8 w-32 text-white p-2 rounded-lg shadow-lg transition transform hover:scale-105 flex">
          <span class="text-center flex-grow commit">Sign in</span>
        </button>
      </div>
    </div>
    <!-- not accept GDPR -->
    <div v-else-if="userStore.userInfo !== '' && userStore.userInfo.policy !== 'T'" class="item-grid mb-4">
      <div class="flex flex-col relative mx-auto">
        <el-icon class="mx-auto mt-6" size="40px"><CirclePlusFilled class="text-ob-bright"/></el-icon>

        <div class="mt-4">
          <p class="font-bold text-center text-ob-bright">Please accept GDPR policy to start recommendation</p>
          <p class="text-center text-ob-bright">Save or rating items to keep track of what you want.</p>
        </div>

        <button
            @click="toProfile"
            id="submit-button"
            class="mx-auto mt-8 w-32 text-white p-2 rounded-lg shadow-lg transition transform hover:scale-105 flex">
          <span class="text-center flex-grow commit">Profile</span>
        </button>
      </div>
    </div>
    <!-- movie like or rate less then 10 -->
    <div v-else-if="userStore.userInfo !== '' && userStore.likeOrRateNumber < 5" class="item-grid mb-4">
      <div class="flex flex-col relative mx-auto">
        <el-icon class="mx-auto mt-6" size="40px"><CirclePlusFilled class="text-ob-bright"/></el-icon>

        <div class="mt-4">
          <p class="font-bold text-center text-ob-bright">Recommendation will start once you liked or rating 5 items</p>
          <p class="text-center text-ob-bright">Save or rating items to keep track of what you want.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, computed, defineComponent, onBeforeMount, toRefs } from 'vue'

import { useAppStore } from "@/stores/app"
import { useUserStore } from "@/stores/user"

import { useRouter } from "vue-router"

import MovieItemCard from "@/components/Section/Movie/MovieItemCard.vue"

import movieApi from "@/api/movie"


export default defineComponent({
  name: 'MovieSection',
  components: {
    MovieItemCard
  },
  setup: function () {
    const appStore = useAppStore()
    const userStore = useUserStore()
    const router = useRouter()
    const reactiveData = reactive({
      generalMovies: [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}] as any,
      recommendMovies: [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}] as any
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

    const toSignIn = () => {
      router.push({ path: '/authentication' })
    }

    const toProfile = () => {
      router.push({ path: '/profile' })
    }

    return {
      userStore,
      ...toRefs(reactiveData),
      toSignIn,
      toProfile,
      refreshGeneralMovie,
      refreshRecommendMovie,
      gradientBackground: computed(() => {
        if (appStore.themeConfig.theme === 'theme-dark') {
          return {
            background: appStore.themeConfig.header_gradient_dark,
          }
        } else {
          return {
            background: appStore.themeConfig.header_gradient_light,
          }
        }
      })
    }
  }
})
</script>

<style lang="scss" scoped>
#submit-button {
  outline: none;
  background: var(--button-blue);
}
</style>
