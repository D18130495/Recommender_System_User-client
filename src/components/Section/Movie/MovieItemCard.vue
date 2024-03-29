<template>
  <div class="item-container" @mouseover="hover = true" @mouseleave="hover = false">
    <div class="item">
      <div class="item-image-container">
        <img v-if="movie.movieImage" v-lazy="movie.movieImage" :key="movie.movieId" @click="toMovie" />
        <img v-else src="@/assets/posterNotFound.jpg" />
        <el-tooltip
            content="Mark as don't like"
            placement="top"
            v-if="hover && userStore.userInfo && router.currentRoute.value.name === 'Home'">
          <button
              class="item-unlike-button"
              @click="handleUnlike(movie.movieId)">
            <el-icon size="24px" class="fill-current stroke-current">
              <CloseBold class="search-icon"/>
            </el-icon>
          </button>
        </el-tooltip>
      </div>

      <div class="item-content">
        <el-skeleton>
          <template #template>
            <span>
              <!-- category -->
              <b v-if="movie">
               movie
              </b>
              <el-skeleton-item v-else variant="text" style="width: 50px; background: var(--background-primary);" />

              <!-- movie genres -->
              <ul v-if="movie.genres && movie.genres.length > 0">
                <li v-for="genre in movie.genres.slice(0, 1)">
                  <em># {{ genre }}</em>
                </li>
              </ul>
              <ul v-else-if="movie.genres && movie.genres.length <= 0">
                <li>
                  <em># General</em>
                </li>
              </ul>
              <ul v-else>
                <el-skeleton-item v-if="!movie.genres" variant="text" style="width: 50px; background: var(--background-primary);" />
              </ul>
            </span>

            <!-- movie title -->
            <h1 class="item-title" v-if="movie.title" @click="toMovie">
              <a>
                <span>{{ movie.title }}</span>
              </a>
            </h1>
            <el-skeleton-item v-else class="mt-2" variant="h1" style="height: 2rem; background: var(--background-primary);" />

            <!-- movie rate -->
            <el-rate
                v-if="movie.rate"
                v-model="movie.rate"
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

            <!-- movie director -->
            <span>
              <ul v-if="movie.director && movie.director.directorName !== ''">
                <em>Director: {{ movie.director.directorName }}</em>
              </ul>
              <ul v-else-if="movie.director && movie.director.directorName === ''">
                <em># NA</em>
              </ul>
              <ul v-else>
                <el-skeleton-item class="mt-1" style="height: 20px; width: 80px; background: var(--background-primary);" />
              </ul>
            </span>
          </template>
        </el-skeleton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, toRefs, computed, ref} from 'vue'

import { useAppStore } from "@/stores/app"
import { useUserStore } from "@/stores/user"

import { useRouter } from "vue-router"

import movieApi from "@/api/movie";

import { ElNotification } from "element-plus";


export default defineComponent({
  name: 'MovieItemCard',
  props: ['data'],
  setup(props) {
    const appStore = useAppStore()
    const userStore = useUserStore()
    const router = useRouter()
    const hover = ref(false)

    const toMovie = () => {
      router.push({ path: '/movie/' + props.data.movieId })
    }

    const handleUnlike = (movieId: any) => {
      movieApi.likeOrUnlikeMovie({'movieId': movieId, 'email': userStore.userInfo.email, 'favourite': 1})
          .then((response) => {
            appStore.recommendMovies = appStore.recommendMovies.filter((movie: { movieId: any; }) => movie.movieId !== movieId)

            ElNotification({
              title: 'Success',
              message: response.data.message,
              type: 'success',
              duration: 1500
            })
          })
    }

    return {
      movie: toRefs(props).data,
      userStore,
      toMovie,
      hover,
      handleUnlike,
      router,
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
.item-content {
  span {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}

.item-title:hover {
  cursor: pointer;
}

/deep/ .el-rate__text{
  @apply text-ob-bright;
}
</style>
