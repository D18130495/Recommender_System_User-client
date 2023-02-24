<template>
  <div>
    <div class="grid grid-cols-2">
      <p class="relative grid-cols-1 opacity-90 flex items-center pt-12 pb-2 mb-8 text-3xl text-ob-bright">
        <el-icon class="inline-block mr-2"><Film/></el-icon>
        What to watch
        <span class="absolute bottom-0 h-1 w-24 rounded-full" :style="gradientBackground"/>
      </p>

      <div class="grid-cols-1 flex items-center">
        <button class="ml-auto" @click="refreshGeneralMovie">
          <el-icon size="25px"><Refresh class="text-ob-bright" /></el-icon>
        </button>
      </div>
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
      <div class="grid-cols-1 flex items-center">
        <button v-if="userStore.userInfo !== '' &&
                    userStore.userInfo.policy === 'T' &&
                    appStore.recommendMovies &&
                    appStore.movieCount >= 5 ||
                    appStore.bookCount >= 5" class="ml-auto" @click="refreshRecommendMovie">
          <el-icon size="25px"><Refresh class="text-ob-bright" /></el-icon>
        </button>
      </div>
    </div>

    <!-- display movie card -->
    <div v-if="userStore.userInfo !== '' &&
               userStore.userInfo.policy === 'T' &&
               appStore.recommendMovies &&
               appStore.movieCount >= 5 ||
               appStore.bookCount >= 5" class="item-grid">
      <div class="flex flex-col relative">
        <ul class="grid grid-cols-3 xl:grid-cols-6 gap-8">
          <li v-for="movie in appStore.recommendMovies" :key="movie.movieId">
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
    <div v-else-if="userStore.userInfo !== '' && appStore.movieCount < 5 && appStore.bookCount < 5" class="item-grid mb-4">
      <div class="flex flex-col relative mx-auto">
        <el-icon class="mx-auto mt-6" size="40px"><CirclePlusFilled class="text-ob-bright"/></el-icon>

        <div class="mt-4">
          <p class="font-bold text-center text-ob-bright">Recommendation will start once you liked or rating 5 items in one category</p>
          <p class="text-center text-ob-bright">Save or rating items to keep track of what you want.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {reactive, computed, defineComponent, onBeforeMount, toRefs, watch} from 'vue'

import { useAppStore } from "@/stores/app"
import { useUserStore } from "@/stores/user"

import { useRouter } from "vue-router"

import MovieItemCard from "@/components/Section/Movie/MovieItemCard.vue"

import movieApi from "@/api/movie"
import recommendationApi from "@/api/recommendation";
import cookies from "js-cookie";


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
      generalMovies: [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}] as any
    })

    watch(() => appStore.recommendMovies, () => {
      if(appStore.recommendMovies.length === 0) {
        appStore.recommendMovies = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }]
        refreshRecommendMovie()
      }
    })

    onBeforeMount(() => {
      getRandomMovieList()

      if(cookies.get('token') !== undefined) {
        // movie recommendation
        if(userStore.userInfo !== null && appStore.movieCount >= 10) { // like more than 10 movies, use ItemCF
          getRecommendMovieListByItemCF()
        }else if(userStore.userInfo != null && appStore.movieCount >= 5 || appStore.bookCount >= 5) { // like movie more than 5, or book more than 5, use UserCF
          if(appStore.movieCount >= appStore.bookCount) {
            getRecommendMovieListByUserCF('movie')
          }else{
            getRecommendMovieListByUserCF('book')
          }
        }else { // not like more than 5 items
          appStore.recommendMovies = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}]
        }
      }
    })

    const getRecommendMovieListByItemCF = () => {
      console.log("getRecommendMovieListByItemCF")
      recommendationApi.getRecommendMovieListByItemCF(userStore.userInfo.email)
          .then((response) => {
            appStore.recommendMovies = response.data.data
          })
    }

    const getRecommendMovieListByUserCF = (type:any) => {
      console.log("getRecommendMovieListByUserCF " + type)
      recommendationApi.getRecommendMovieListByUserCF(userStore.userInfo.email, type)
          .then((response) => {
            appStore.recommendMovies = response.data.data
          })
    }

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
      if(userStore.userInfo !== null && appStore.movieCount >= 10) { // like more than 10 movies, use ItemCF
        getRecommendMovieListByItemCF()
      }else if(userStore.userInfo != null && appStore.movieCount >= 5 || appStore.bookCount >= 5) { // like movie more than 5, or book more than 5, use UserCF
        if(appStore.movieCount >= appStore.bookCount) {
          getRecommendMovieListByUserCF('movie')
        }else{
          getRecommendMovieListByUserCF('book')
        }
      }else { // not like more than 5 items
        appStore.recommendMovies = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}]
      }
    }

    const toSignIn = () => {
      router.push({ path: '/authentication' })
    }

    const toProfile = () => {
      router.push({ path: '/profile' })
    }

    return {
      appStore,
      userStore,
      ...toRefs(reactiveData),
      toSignIn,
      toProfile,
      refreshGeneralMovie,
      refreshRecommendMovie,
      movieCount: computed(() => appStore.movieCount),
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
