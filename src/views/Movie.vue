<template>
  <div>
    <div class="flex flex-col">
      <div class="movie-grid">
        <div class="movie-header">
          <el-skeleton animated>
            <template #template>
              <span class="movie-labels">
                <!-- category -->
                <b>
                  <span>Movie</span>
                </b>
                <!-- genres -->
                <div>
                  <ul v-if="loading">
                    <el-skeleton-item variant="text" style="width: 40px;" />
                  </ul>
                  <ul v-else-if="!loading && movie.genres && movie.genres.length > 0">
                    <li v-for="genre in movie.genres" :key="movie.movieId">
                      <em class="opacity-50">#</em>
                      {{ genre }}
                    </li>
                  </ul>
                  <ul v-else>
                    <li>
                      <em class="opacity-50">#</em>
                      General
                    </li>
                  </ul>
                </div>
              </span>

              <!-- title -->
              <el-skeleton-item v-if="loading"
                                class="movie-title text-white uppercase"
                                variant="text" style="height:50px; border-radius: 15px" />
              <h1 v-else-if="!loading && movie.title" class="movie-title text-white uppercase">
                {{ movie.title }}
              </h1>
              <h1 v-else class="movie-title text-white uppercase">
                Movie title is not available
              </h1>
            </template>
          </el-skeleton>
        </div>
      </div>
    </div>

    <!-- main content -->
    <div class="movie-grid">
      <div>
        <div class="movie-box" v-if="!loading">
          <div class="movie-field">
            <div>
              <div class="grid grid-cols-12 gap-4">
                <!-- movieImage -->
                <div class="movie-image-container">
                  <img v-if="movie.movieImage" v-lazy="movie.movieImage" :key="movie.movieId" />
                  <img v-else src="@/assets/posterNotFound.jpg" />
                </div>

                <!-- movieVideo -->
                <video v-if="movie.movieVideo === 'Video is currently not available'" class="movie-image-container" controls style="max-width: unset; width: 265%">
                  <source src="" />
                </video >
                <video v-else class="movie-image-container" controls style="max-width: unset; width: 235%">
                  <source :src="movie.movieVideo" />
                </video>
              </div>

              <!-- IMDB and TMDB link-->
              <ul class="movie-link">
                <div class="movie-link-border">
                  <li>
                    <a :href="movie.imdbUrl" target="_blank">IMDB</a>
                  </li>
                </div>
                <div class="movie-link-border">
                  <li>
                    <a :href="movie.tmdbUrl" target="_blank">TMDB</a>
                  </li>
                </div>
              </ul>

              <!-- movie description -->
              <p v-if="movie.description">
                {{ movie.description }}
              </p>
              <p v-else>
                Movie description is currently not available.
              </p>

              <div class="w-3/5 border-b-2 mt-2 wire"></div>

              <!-- movie director -->
              <div class="movie-director">
                <span v-if="movie.director && movie.director.directorName !== ''">
                  Director:
                  <a :href="movie.director.directorLink" target="_blank">
                    {{ movie.director.directorName }}
                  </a>
                </span>
                <span v-else>
                  <em>Director: NA</em>
                </span>
              </div>

              <div class="w-3/5 border-b-2 mt-2 wire"></div>

              <!-- movie actors -->
              <div class="movie-stars">
                <ul v-if="movie.actor && movie.actor.length > 0">
                  Stars:
                  <li v-for="actor in movie.actor" :key="actor.actorId">
                    <a :href="actor.actorLink" target="_blank">
                      {{ actor.actorName }}
                    </a>
                  </li>
                </ul>
                <span v-else>
                  <em>Stars: NA</em>
                </span>
              </div>

              <div class="w-3/5 border-b-2 mt-2 wire"></div>

              <!-- movie rate -->
              <div class="movie-rate grid grid-cols-4">
                <div class="grid col-span-1">
                  <span>
                    Current Rating
                  </span>

                  <el-rate
                      v-if="movie.rate"
                      v-model="movie.rate"
                      size="large"
                      disabled
                      show-score
                      text-color="#ff9900"
                      score-template="{value}"
                  />
                  <el-rate
                      v-else
                      disabled
                      show-score
                      text-color="#ff9900"
                      score-template="{value}"
                    />
                </div>

                <div class="grid col-span-1" v-if="userStore.userInfo === ''">
                  <span>
                    Login to rate this movie
                  </span>
                  <el-rate
                      size="large"
                      disabled
                      disabled-void-color="#99A9BF"
                  />
                </div>
                <div class="grid col-span-1" v-else>
                  <span v-if="movieRate.rating === 0">
                    You haven't rating for this movie
                  </span>
                  <span v-else>
                    Your Rating
                  </span>
                  <el-rate
                      v-model="movieRate.rating"
                      size="large"
                      allow-half
                      show-score
                      text-color="#ff9900"
                      score-template="{value}"
                      @click="updateMovieRate"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="bg-ob-deep-800 px-14 py-16 rounded-2xl shadow-xl block">
          <el-skeleton animated>
            <template #template>
              <div class="grid grid-cols-10 gap-8">
                <el-skeleton-item variant="image" class="col-span-2" style="height: 320px" />
                <el-skeleton-item variant="image" class="col-span-6" style="height: 320px" />
              </div>

              <el-skeleton-item class="mt-6" variant="text" style="height: 20px" />
              <el-skeleton-item class="mt-3" variant="text" style="height: 20px" />

              <div class="w-full border-b-2 mt-2 wire"></div>
              <el-skeleton-item class="mt-4" variant="text" style="height: 20px; width: 33%" />
              <div class="w-full border-b-2 mt-2 wire"></div>
              <el-skeleton-item class="mt-4" variant="text" style="height: 20px; width: 33%" />
              <div class="w-full border-b-2 mt-2 wire"></div>
              <el-skeleton-item class="mt-4" variant="text" style="height: 20px; width: 33%" />
            </template>
          </el-skeleton>
        </div>
      </div>

      <!-- bottom recommendation -->
      <div>
        <div class="grid grid-cols-2">
          <p class="relative grid-cols-1 opacity-90 flex items-center pb-2 mb-8 text-3xl text-ob-bright">
            <el-icon class="inline-block mr-2"><Film/></el-icon>
            More like this
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
                <MovieItemCard :data="movie" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, toRefs, defineComponent, onBeforeMount, reactive, computed, watch } from "vue"

import { ElNotification } from "element-plus"

import { useAppStore } from "@/stores/app"
import { useUserStore } from "@/stores/user"

import { useRouter } from "vue-router"

import MovieItemCard from "@/components/Section/Movie/MovieItemCard.vue"

import movieApi from '@/api/movie'


export default defineComponent({
  name: 'Movie',
  components: { MovieItemCard },
  setup() {
    const appStore = useAppStore()
    const userStore = useUserStore()
    const router = useRouter()
    const loading = ref(true)
    const reactiveData = reactive({
      movie: '' as any,
      movieRate: {
        movieId: '',
        email: '',
        rating: 0
      },
      generalMovies: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }] as any
    })

    watch(() => router.currentRoute.value.fullPath, () => {
      if(router.currentRoute.value.name === 'Movie') {
        reactiveData.generalMovies = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }]
        getMovieByMovieId(router.currentRoute.value.params.movieId)
        getRandomMovieList()
        initialMovieRate()
      }
    });

    onBeforeMount(() => {
      getMovieByMovieId(router.currentRoute.value.params.movieId)
      getRandomMovieList()
      initialMovieRate()
    })

    const initialMovieRate = () => {
      reactiveData.movieRate.movieId = String(router.currentRoute.value.params.movieId)

      if(userStore.userInfo !== '') {
        reactiveData.movieRate.email = userStore.userInfo.email

        movieApi.getMovieRating(reactiveData.movieRate.movieId, userStore.userInfo.email)
            .then((response) => {
              reactiveData.movieRate.rating = response.data.data.rating
            })
      }
    }

    const getMovieByMovieId = (movieId: any) => {
      movieApi.getMovieByMovieId(movieId)
          .then((response) => {
            reactiveData.movie = response.data.data
            loading.value = false
          })
    }

    const getRandomMovieList = () => {
      movieApi.getRandomMovieList()
          .then((response) => {
            reactiveData.generalMovies = response.data.data
          })
    }

    const updateMovieRate = () => {
      movieApi.addOrUpdateMovieRating(reactiveData.movieRate)
          .then((response) => {
            reactiveData.movieRate.movieId = response.data.data.movieId
            reactiveData.movieRate.email = response.data.data.email
            reactiveData.movieRate.rating = response.data.data.rating

            ElNotification({
              title: 'Success',
              message: response.data.message,
              type: 'success',
              duration: 1500
            })
          })
    }

    const refreshGeneralMovie = () => {
      getRandomMovieList()
    }

    return {
      loading,
      ...toRefs(reactiveData),
      userStore,
      updateMovieRate,
      refreshGeneralMovie,

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

<style lang="scss" scoped>
a:hover {
  cursor: default;
}

/deep/ .el-rate__text{
  @apply text-ob-bright;
}
</style>
