<template>
  <div class="item-container">
    <div class="item">
      <div class="item-image-container">
        <img v-if="book.bookImageL" v-lazy="book.bookImageL" :key="book.isbn" />
        <img v-else src="@/assets/posterNotFound.jpg" />
      </div>

      <div class="item-content">
        <el-skeleton>
          <template #template>
            <span>
              <!-- category -->
              <b v-if="book">
               book
              </b>
              <el-skeleton-item v-else variant="text" style="width: 50px; background: var(--background-primary);" />

              <!-- book year -->
              <ul v-if="book.year && book.year !== '0'">
                <em># {{ book.year }}</em>
              </ul>
              <ul v-else-if="book.year && book.year === '0'">
                <li>
                  <em># Book Year not Available</em>
                </li>
              </ul>
              <ul v-else>
                <el-skeleton-item v-if="!book.year" variant="text" style="width: 50px; background: var(--background-primary);" />
              </ul>
            </span>

            <!-- book title -->
            <h1 class="item-title" v-if="book.title" @click="toBook">
              <a>
                <span>{{ book.title }}</span>
              </a>
            </h1>
            <el-skeleton-item v-else class="mt-2" variant="h1" style="height: 2rem; background: var(--background-primary);" />

            <!-- book rate -->
            <el-rate
                v-if="book.rate"
                v-model="book.rate"
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

            <!-- book author -->
            <span>
              <ul v-if="book.author && book.author !== ''">
                <em>Author: {{ book.author }}</em>
              </ul>
              <ul v-else-if="book.author && book.author === ''">
                <em># Book author not Available</em>
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

import { useRouter } from "vue-router"


export default defineComponent({
  name: 'BookItemCard',
  props: ['data'],
  setup(props) {
    const appStore = useAppStore()
    const router = useRouter()

    const toBook = () => {
      router.push({ path: '/book/' + props.data.isbn })
    }

    return {
      book: toRefs(props).data,

      toBook,
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
  cursor: default;
}

/deep/ .el-rate__text{
  @apply text-ob-bright;
}
</style>
