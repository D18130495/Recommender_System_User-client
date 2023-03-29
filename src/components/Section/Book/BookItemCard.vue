<template>
  <div class="item-container" @mouseover="hover = true" @mouseleave="hover = false">
    <div class="item">
      <div class="item-image-container">
        <img v-if="book.bookImage" v-lazy="book.bookImage" :key="book.isbn" @click="toBook" />
        <img v-else-if="book.bookImageL" v-lazy="book.bookImageL" :key="book.isbn" @click="toBook" />
        <img v-else src="@/assets/posterNotFound.jpg" />
        <el-tooltip
            content="Mark as don't like"
            placement="top"
            v-if="hover && userStore.userInfo && router.currentRoute.value.name === 'Home'">
          <button
              class="item-unlike-button"
              @click="handleUnlike(book.isbn)">
            <el-icon size="24px" class="fill-current stroke-current">
              <CloseBold class="search-icon" />
            </el-icon>
          </button>
        </el-tooltip>
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
                  <em># NA</em>
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
import {computed, defineComponent, ref, toRefs} from 'vue'

import {useAppStore} from "@/stores/app"
import {useUserStore} from "@/stores/user"

import {useRouter} from "vue-router"

import bookApi from "@/api/book";

import {ElNotification} from "element-plus";


export default defineComponent({
  name: 'BookItemCard',
  props: ['data'],
  setup(props) {
    const appStore = useAppStore()
    const userStore = useUserStore()
    const router = useRouter()
    const hover = ref(false)

    const toBook = () => {
      router.push({ path: '/book/' + props.data.isbn })
    }

    const handleUnlike = (isbn: any) => {
      bookApi.likeOrUnlikeBook({'isbn': isbn, 'email': userStore.userInfo.email, 'favourite': 1})
          .then((response) => {
            appStore.recommendBooks = appStore.recommendBooks.filter((book: { isbn: any; }) => book.isbn !== isbn)

            ElNotification({
              title: 'Success',
              message: response.data.message,
              type: 'success',
              duration: 1500
            })
          })
    }

    return {
      book: toRefs(props).data,
      userStore,
      toBook,
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
