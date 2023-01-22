<template>
  <div>
    <p class="relative opacity-90 flex items-center pt-12 pb-2 mb-8 text-3xl text-ob-bright">
      <el-icon class="inline-block mr-2"><Film/></el-icon>
      Movies
      <span class="absolute bottom-0 h-1 w-24 rounded-full" :style="gradientBackground"/>
    </p>

    <div class="item-grid">
      <div class="flex flex-col relative">
        <ul class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8">
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


export default defineComponent({
  name: 'MovieSection',
  components: {
    MovieItemCard
  },
  setup() {
    const appStore = useAppStore()
    const reactiveData = reactive({
      movies: [
        { id: 123 },
        { id: 234 },
        { id: 345 },
        { id: 456 },
        { id: 567 },
      ] as any
    })

    onBeforeMount(() => {

    })

    const getMovieList = () => {

    }

    return {
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
      }),
      reactiveData
    }
  }
})
</script>

<style lang="scss">
.home-item {
  .item-content {
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
    }

    .article-footer {
      margin-top: 13px;
    }
  }
}
</style>
