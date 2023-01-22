<template>
  <div class="item-container">
    <div class="item">
      <div class="item-image-container">
        <img src="@/assets/images/1.jpg" />
        <span class="item-image" :style="gradientBackground" />
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
                <ul v-if="movie.tags && movie.tags.length > 0">
                  <li v-for="tag in movie.tags" :key="tag.id">
                    <em># {{ tag.tagName }}</em>
                  </li>
                </ul>
                <ul v-else-if="movie.tags && movie.tags.length <= 0">
                  <li>
                    <em># example</em>
                  </li>
                </ul>
                <ul v-else>
                  <el-skeleton-item v-if="!movie.tags" variant="text" style="width: 50px; background: var(--background-primary);" />
                </ul>

                <!-- movie release time -->
                <span class="text-ob-dim float-right">
                  <el-skeleton-item style="height: 20px; width: 70px; background: var(--background-primary);" />
                </span>
              </span>

              <!-- movie title -->
              <h1 class="item-title" v-if="movie.name" @click="toMovie">
                <a>
                  <span>{{ movie.name }}</span>
<!--                  <svg-icon v-if="article.status == 2" icon-class="lock" class="lock-svg" />-->
                </a>
              </h1>
              <el-skeleton-item v-else class="mt-2" variant="h1" style="height: 3rem; background: var(--background-primary);" />

              <!-- movie summary -->
              <p v-if="movie.summary">
                {{ movie.summary }}
              </p>
              <ul v-else>
                <el-skeleton-item v-for="skeleton in 4" variant="p" style="height: 17px; background: var(--background-primary);" />
              </ul>

              <!-- movie director -->
              <div>
                <div class="mt-1">
                  <el-skeleton-item style="height: 20px; width: 80px; background: var(--background-primary);" />
                </div>
              </div>

              <!-- movie actors -->
              <div>
                <div class="flex flex-row items-center gap-2 mt-1">
                  <el-skeleton-item style="height: 20px; width: 80px; background: var(--background-primary);" />
                  <el-skeleton-item style="height: 20px; width: 80px; background: var(--background-primary);" />
                </div>
              </div>
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
    const userStore = useUserStore()
    const router = useRouter()

    const toMovie = () => {
      console.log("to movie")
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
//.item-title:hover {
//  cursor: default;
//}
</style>
