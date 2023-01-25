<template>
  <div class="item-container">
    <div class="item">
      <div class="item-image-container">
        <img v-if="movie.movieImage" v-lazy="movie.movieImage" :key="movie.movieId" />
        <img v-else src="@/assets/posterNotFound.jpg" />
      </div>

      <div class="item-content">
        <el-skeleton animated>
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
import { defineComponent, toRefs, computed } from 'vue'

import { useAppStore } from "@/stores/app"
import { useUserStore } from "@/stores/user"

import { useRouter } from "vue-router"


export default defineComponent({
  name: 'ItemCard',
  props: ['data'],
  setup(props) {
    const appStore = useAppStore()
    const router = useRouter()

    const toMovie = () => {
      router.push({ path: '/movie/' + props.data.movieId })
    }

    return {
      movie: toRefs(props).data,
      toMovie,
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
.item-title:hover {
  cursor: default;
}

/deep/ .el-rate__text{
  @apply text-ob-bright;
}
</style>


<!--<template>-->
<!--  <div class="item-container">-->
<!--    <div class="item">-->
<!--      <div class="item-image-container">-->
<!--        <img v-if="movie.movieImage" v-lazy="movie.movieImage" />-->
<!--        <img v-else src="@/assets/images/5.jpg" />-->
<!--        <span class="item-image" :style="gradientBackground" />-->
<!--      </div>-->

<!--      <div class="item-content">-->
<!--          <el-skeleton animated>-->
<!--            <template #template>-->
<!--              <span>-->
<!--                &lt;!&ndash; category &ndash;&gt;-->
<!--                <b v-if="movie">-->
<!--                 movie-->
<!--                </b>-->
<!--                <el-skeleton-item v-else variant="text" style="width: 50px; background: var(&#45;&#45;background-primary);" />-->

<!--                &lt;!&ndash; movie genres &ndash;&gt;-->
<!--                <ul v-if="movie.genres && movie.genres.length > 0">-->
<!--                  <li v-for="genre in movie.genres.slice(0, 2)">-->
<!--                    <em># {{ genre }}</em>-->
<!--                  </li>-->
<!--                </ul>-->
<!--                <ul v-else-if="movie.genres && movie.genres.length <= 0">-->
<!--                  <li>-->
<!--                    <em># General</em>-->
<!--                  </li>-->
<!--                </ul>-->
<!--                <ul v-else>-->
<!--                  <el-skeleton-item v-if="!movie.genres" variant="text" style="width: 50px; background: var(&#45;&#45;background-primary);" />-->
<!--                </ul>-->

<!--                &lt;!&ndash; movie release time &ndash;&gt;-->
<!--                <div class="float-right">-->
<!--                  <span v-if="movie.year" class="text-ob-normal">{{ movie.year }}</span>-->
<!--                  <el-skeleton-item v-else style="width: 50px; background: var(&#45;&#45;background-primary);" />-->
<!--                </div>-->
<!--              </span>-->

<!--              &lt;!&ndash; movie title &ndash;&gt;-->
<!--              <h1 class="item-title" v-if="movie.title" @click="toMovie">-->
<!--                <a>-->
<!--                  <span>{{ movie.title }}</span>-->
<!--&lt;!&ndash;                  <svg-icon v-if="article.status == 2" icon-class="lock" class="lock-svg" />&ndash;&gt;-->
<!--                </a>-->
<!--              </h1>-->
<!--              <el-skeleton-item v-else class="mt-2" variant="h1" style="height: 3rem; background: var(&#45;&#45;background-primary);" />-->

<!--              &lt;!&ndash; movie summary &ndash;&gt;-->
<!--              <p v-if="movie.description">-->
<!--                {{ movie.description }}-->
<!--              </p>-->
<!--              <ul v-else>-->
<!--                <el-skeleton-item v-for="skeleton in 4" variant="p" style="height: 17px; background: var(&#45;&#45;background-primary);" />-->
<!--              </ul>-->

<!--              &lt;!&ndash; movie director &ndash;&gt;-->
<!--              <div>-->
<!--                <div class="mt-1">-->
<!--                  <el-skeleton-item style="height: 20px; width: 80px; background: var(&#45;&#45;background-primary);" />-->
<!--                </div>-->
<!--              </div>-->

<!--              &lt;!&ndash; movie actors &ndash;&gt;-->
<!--              <div>-->
<!--                <div class="flex flex-row items-center gap-2 mt-1">-->
<!--                  <el-skeleton-item style="height: 20px; width: 80px; background: var(&#45;&#45;background-primary);" />-->
<!--                  <el-skeleton-item style="height: 20px; width: 80px; background: var(&#45;&#45;background-primary);" />-->
<!--                </div>-->
<!--              </div>-->
<!--            </template>-->
<!--          </el-skeleton>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script lang="ts">-->
<!--import { defineComponent, toRefs, computed, onBeforeMount } from 'vue'-->

<!--import { useAppStore } from "@/stores/app"-->
<!--import { useUserStore } from "@/stores/user"-->

<!--import { useRouter } from "vue-router"-->
<!--import movie from "@/api/movie";-->


<!--export default defineComponent({-->
<!--  name: 'ItemCard',-->
<!--  props: ['data'],-->
<!--  setup(props) {-->
<!--    const appStore = useAppStore()-->
<!--    const userStore = useUserStore()-->
<!--    const router = useRouter()-->

<!--    const toMovie = () => {-->
<!--      console.log("to movie")-->
<!--    }-->

<!--    return {-->
<!--      movie: toRefs(props).data,-->
<!--      toMovie,-->
<!--      gradientBackground: computed(() => {-->
<!--        if(appStore.themeConfig.theme === 'theme-dark') {-->
<!--          return {-->
<!--            background: appStore.themeConfig.header_gradient_dark,-->
<!--          }-->
<!--        }else {-->
<!--          return {-->
<!--            background: appStore.themeConfig.header_gradient_light,-->
<!--          }-->
<!--        }-->
<!--      })-->
<!--    }-->
<!--  }-->
<!--})-->
<!--</script>-->

<!--<style lang="scss" scoped>-->
<!--//.item-title:hover {-->
<!--//  cursor: default;-->
<!--//}-->
<!--</style>-->
