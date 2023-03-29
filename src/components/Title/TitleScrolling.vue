<template>
  <div class="title-container">
    <div class="title">
      <div class="title-image">
        <img v-if="movie.moviePhoto" class="ob-title-image" v-lazy="movie.moviePhoto" @click="goToMovie" />
        <img v-else class="ob-title-image" src="@/assets/posterNotFound.jpg"/>
      </div>
      <div class="title-content">
        <h1 class="article-title" v-if="movie.title" @click="goToMovie">
          <a>
            <span>{{ movie.title }}</span>
          </a>
        </h1>

        <div class="title-footer" v-if="movie">
          <p v-if="movie.description">{{ movie.description }}</p>
          <p v-else>Movie description is currently not available</p>
          <img v-if="movie.movieImage" class="ob-title-image justify-end" v-lazy="movie.movieImage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { toRefs, defineComponent } from "vue"
import { useRouter } from "vue-router";


export default defineComponent({
  name: 'TitleScrolling',
  props: ['data'],
  setup(props) {
    const router = useRouter()

    const goToMovie = () => {
      router.push({ path: '/movie/' + props.data.movieId })
    }

    return {
      movie: toRefs(props).data,
      goToMovie
    }
  }
})
</script>

<style lang="scss" scoped>
.article-title {
  @apply justify-center;

  min-height: 24%;
}

.article-title:hover {
  cursor: pointer;
}

.title-content h1 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
