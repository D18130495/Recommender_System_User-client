<template>
  <div id="feature">
    <el-carousel class="rounded-2xl" :interval="5000" arrow="hover" indicator-position="outside" height="448px">
      <el-carousel-item class="rounded-2xl" v-for="movie in reactiveData.movieList" :key="movie.movieId">
        <TitleScrolling class="title-scrolling" :data="movie"/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive } from "vue"

import TitleScrolling from "./TitleScrolling.vue"

import movieApi from "@/api/movie"


export default defineComponent({
  name: 'Title',
  components: {
    TitleScrolling
  },
  setup() {
    const reactiveData = reactive({
      movieList: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }] as any,
    })

    onBeforeMount(() => {
      getRandomMovieTitleList()
    })

    const getRandomMovieTitleList = () => {
      movieApi.getRandomMovieList()
          .then((response) => {
            console.log(response.data.data)
            reactiveData.movieList = response.data.data
          })
    }

    return {
      reactiveData
    }
  }
})
</script>

<style lang="scss">
.title-scrolling {
  .feature-content {
    @apply rounded-2xl;

    p {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
