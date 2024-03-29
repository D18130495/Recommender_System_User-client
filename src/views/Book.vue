<template>
  <div>
    <title>{{ book.title }}</title>
    <div class="flex flex-col">
      <div class="book-grid">
        <div class="book-header">
          <el-skeleton animated>
            <template #template>
              <span class="book-labels">
                <!-- category -->
                <b>
                  <span>Book</span>
                </b>
              </span>

              <!-- title -->
              <el-skeleton-item v-if="loading"
                                class="book-title text-white uppercase"
                                variant="text" style="height:50px; border-radius: 15px" />
              <h1 v-else-if="!loading && book.title" class="book-title text-white uppercase">
                {{ book.title }}
              </h1>
              <h1 v-else class="book-title text-white uppercase">
                Book title is not available
              </h1>
            </template>
          </el-skeleton>
        </div>
      </div>
    </div>

    <!-- main content -->
    <div class="book-grid">
      <div>
        <div class="book-box" v-if="!loading">
          <div class="book-field">
            <div>
              <div class="grid grid-cols-12 gap-4">
                <!-- bookImage -->
                <div class="book-image-container">
                  <img v-if="book.bookImage" v-lazy="book.bookImage" :key="book.isbn" />
                  <img v-else-if="book.bookImageL" v-lazy="book.bookImageL" :key="book.isbn" />
                  <img v-else src="@/assets/posterNotFound.jpg" />
                </div>

                <div class="book-information-container">
                  <!-- book title -->
                  <h1 v-if="book.title && book.title !== ''" class="book-title mt-0 text-ob-bright uppercase">
                    {{ book.title }}
                  </h1>
                  <h1 v-else class="book-title text-ob-bright uppercase">
                    Book title is not available
                  </h1>

                  <div class="grid grid-cols-2 gap-8">
                    <div class="book-detail-container">
                      <!-- book ISBN -->
                      <div class="book-isbn">
                        <p v-if="book">
                          ISBN:
                          <span>{{ book.isbn }}</span>
                        </p>
                      </div>

                      <div class="w-3/5 border-b-2 mt-2 wire"></div>

                      <!-- book author -->
                      <div class="book-author">
                        <p v-if="book.author && book.author !== ''">
                          Author:
                          <span>{{ book.author }}</span>
                        </p>
                        <span v-else>
                          <em>Author: Book author is currently not available.</em>
                        </span>
                      </div>

                      <div class="w-3/5 border-b-2 mt-2 wire"></div>

                      <!-- book publish year -->
                      <div class="book-publish-year">
                        <p v-if="book.year && book.year !== '0'">
                          Publish year:
                          <span>{{ book.year }}</span>
                        </p>
                        <span v-else>
                          <em>Publish year: Book publish year is currently not available</em>
                        </span>
                      </div>

                      <div class="w-3/5 border-b-2 mt-2 wire"></div>

                      <!-- book publisher -->
                      <div class="book-publisher">
                        <p v-if="book.publisher && book.publisher !== ''">
                          Publisher:
                          <span>{{ book.publisher }}</span>
                        </p>
                        <span v-else>
                          <em>Publisher: Book publisher is currently not available.</em>
                        </span>
                      </div>

                      <div class="w-3/5 border-b-2 mt-2 wire"></div>

                      <!-- external link -->
                      <ul class="book-link">
                        <div class="book-link-border">
                          <li>
                            <a :href="book.bookLink" target="_blank">BookFinder</a>
                          </li>
                        </div>
                      </ul>

                      <!-- book rate -->
                      <div class="book-rate grid grid-cols-2">
                        <div class="grid col-span-1">
                          <span>
                            Current Rating
                          </span>

                          <el-rate
                              v-if="book.rate"
                              v-model="book.rate"
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
                            Login to rate this book
                          </span>
                          <el-rate
                              size="large"
                              disabled
                              disabled-void-color="#99A9BF"
                          />
                        </div>
                        <div class="grid col-span-1" v-else>
                          <span v-if="bookRate.rating === 0">
                            You haven't rating
                          </span>
                          <span v-else>
                            Your Rating
                          </span>
                          <el-rate
                              v-model="bookRate.rating"
                              size="large"
                              allow-half
                              show-score
                              text-color="#ff9900"
                              score-template="{value}"
                              @change="updateBookRate"
                          />
                        </div>
                      </div>
                      <div v-if="userStore.userInfo !== ''" class="grid grid-cols-12 mt-2">
                        <span class="m-auto text-ob-bright ml-0 grid col-span-6">
                          Marked as your favourite book:
                        </span>
                        <el-rate
                            v-model="bookFavourite.favourite"
                            class="m-auto ml-0 grid col-span-1"
                            size="large"
                            :max=starNumber
                            disabled
                            :colors=starColor
                        />
                        <el-select v-model="bookFavouriteValue" class="m-auto ml-0 grid col-span-4" placeholder="Select" size="large">
                          <el-option
                              class="text-ob-bright"
                              v-for="item in likeOption"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                              @click="updateBookLike"
                          />
                        </el-select>
                        <!--                        <el-button v-if="bookFavourite.favourite === 0" class="m-auto ml-0 grid col-span-2" >Like</el-button>-->
                        <!--                        <el-button v-else class="m-auto ml-0 grid col-span-2" @click="updateBookLike">Unlike</el-button>-->
                      </div>
                    </div>

                    <div class="book-description-container">
                      <!-- book description -->
                      <div v-if="book.bookDescription !== 'None'">
                        <div v-html="book.bookDescription" />
                      </div>
                      <div v-else>
                        <h4>About the book:</h4>
                        <p>Book description is currently not available.</p>
                      </div>
                    </div>
                  </div>
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

                <div class="col-span-6">
                  <el-skeleton-item variant="text"  style="height: 20px" />

                  <div class="grid grid-cols-2">
                    <div class="col-span-1">
                      <el-skeleton-item class="mt-4" variant="text" style="height: 20px; width: 33%" />
                      <div class="w-2/3 border-b-2 mt-2 wire"></div>
                      <el-skeleton-item class="mt-4" variant="text" style="height: 20px; width: 33%" />
                      <div class="w-2/3 border-b-2 mt-2 wire"></div>
                      <el-skeleton-item class="mt-4" variant="text" style="height: 20px; width: 33%" />
                      <div class="w-2/3 border-b-2 mt-2 wire"></div>
                      <el-skeleton-item class="mt-4" variant="text" style="height: 20px; width: 33%" />
                      <div class="w-2/3 border-b-2 mt-2 wire"></div>
                      <el-skeleton-item class="mt-4" variant="text" style="height: 50px; width: 67%" />
                    </div>
                    <div class="col-span-1">
                      <el-skeleton-item class="mt-4" variant="text" style="height: 20px; width: 100%" />
                      <el-skeleton-item class="mt-4" variant="text" style="height: 20px; width: 100%" />
                      <el-skeleton-item class="mt-4" variant="text" style="height: 20px; width: 100%" />
                      <el-skeleton-item class="mt-4" variant="text" style="height: 20px; width: 100%" />
                      <el-skeleton-item class="mt-4" variant="text" style="height: 20px; width: 100%" />
                      <el-skeleton-item class="mt-4" variant="text" style="height: 20px; width: 100%" />
                    </div>
                  </div>
                </div>

              </div>
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

          <button class="ml-auto" @click="refreshRelatedBookList">
            <el-icon size="25px"><Refresh class="text-ob-bright" /></el-icon>
          </button>
        </div>

        <div class="item-grid">
          <div class="flex flex-col relative">
            <ul class="grid grid-cols-3 xl:grid-cols-6 gap-8">
              <li v-for="book in relatedBooks" :key="book.movieId">
                <BookItemCard :data="book" />
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

import BookItemCard from "@/components/Section/Book/BookItemCard.vue"

import bookApi from "@/api/book"
import userApi from "@/api/user"
import recommendationApi from "@/api/recommendation"


export default defineComponent({
  name: 'Book',
  components: { BookItemCard },
  setup() {
    const appStore = useAppStore()
    const userStore = useUserStore()
    const router = useRouter()

    const loading = ref(true)
    const starNumber = ref(1)

    const bookFavouriteValue = ref('')
    const starColor = ref(['#99A9BF', '#f7ba2a', '#ff0000'])

    const reactiveData = reactive({
      book: '' as any,
      bookRate: {
        isbn: '',
        email: '',
        rating: 0
      },
      bookFavourite: {
        isbn: '',
        email: '',
        favourite: 0
      },
      relatedBooks: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }] as any,
      likeOption: [
        {
          value: 'T',
          label: 'Favourite',
        },
        {
          value: 'N',
          label: 'Normal',
        },
        {
          value: 'F',
          label: 'Don\'t like',
        }
      ]
    })

    // change book
    watch(() => router.currentRoute.value.fullPath, () => {
      if(router.currentRoute.value.name === 'Book') {
        reactiveData.book = ''
        loading.value = true
        getBookByISBN(router.currentRoute.value.params.isbn)
        getBooksLikeThis()
        initialBookRate()
        initialBookFavourite()
      }
    });

    // initial page rating and favourite
    watch(userStore, () => {
      if(userStore.userInfo !== '') {
        initialBookRate()
        initialBookFavourite()
      }
    })

    // load page initial
    onBeforeMount(() => {
      getBookByISBN(router.currentRoute.value.params.isbn)
      getBooksLikeThis()
      initialBookRate()
      initialBookFavourite()
    })

    const getBookByISBN = (isbn: any) => {
      bookApi.getBookByISBN(isbn)
          .then((response) => {
            reactiveData.book = response.data.data
            loading.value = false
          })
    }

    const initialBookRate = () => {
      reactiveData.bookRate.isbn = String(router.currentRoute.value.params.isbn)

      if(userStore.userInfo !== '') {
        reactiveData.bookRate.email = userStore.userInfo.email

        bookApi.getUserBookRating(reactiveData.bookRate.isbn, userStore.userInfo.email)
            .then((response) => {
              reactiveData.bookRate.rating = response.data.data.rating
            })
      }
    }

    const initialBookFavourite = () => {
      reactiveData.bookFavourite.isbn = String(router.currentRoute.value.params.isbn)

      if(userStore.userInfo !== '') {
        reactiveData.bookFavourite.email = userStore.userInfo.email

        bookApi.getUserBookFavourite(reactiveData.bookFavourite.isbn, userStore.userInfo.email)
            .then((response) => {
              reactiveData.bookFavourite.favourite = Number(response.data.data.favourite)

              if(response.data.data.favourite === '0') {
                bookFavouriteValue.value = ''
              } else if(response.data.data.favourite === '1') {
                bookFavouriteValue.value = 'F'
              }else if(response.data.data.favourite == '2') {
                bookFavouriteValue.value = 'N'
              }else if(response.data.data.favourite == '3') {
                bookFavouriteValue.value = 'T'
              }
            })
      }
    }

    const updateBookRate = () => {
      bookApi.addOrUpdateUserBookRating(reactiveData.bookRate)
          .then((response) => {
            reactiveData.bookRate.isbn = response.data.data.isbn
            reactiveData.bookRate.email = response.data.data.email
            reactiveData.bookRate.rating = response.data.data.rating

            getUserLikeAndRatingMovieCount()
            getUserLikeAndRatingBookCount()

            getBookByISBN(router.currentRoute.value.params.isbn)

            ElNotification({
              title: 'Success',
              message: response.data.message,
              type: 'success',
              duration: 1500
            })
          })
    }

    const updateBookLike = () => {
      if(bookFavouriteValue.value === 'F') {
        reactiveData.bookFavourite.favourite = 1

        bookApi.likeOrUnlikeBook(reactiveData.bookFavourite)
            .then((response) => {
              reactiveData.bookFavourite.favourite = 1

              getUserLikeAndRatingMovieCount()
              getUserLikeAndRatingBookCount()

              ElNotification({
                title: 'Success',
                message: response.data.message,
                type: 'success',
                duration: 1500
              })
            })
      }else if(bookFavouriteValue.value === 'N') {
        reactiveData.bookFavourite.favourite = 2

        bookApi.likeOrUnlikeBook(reactiveData.bookFavourite)
            .then((response) => {
              reactiveData.bookFavourite.favourite = 2

              getUserLikeAndRatingMovieCount()
              getUserLikeAndRatingBookCount()

              ElNotification({
                title: 'Success',
                message: response.data.message,
                type: 'success',
                duration: 1500
              })
            })
      }else if(bookFavouriteValue.value === 'T') {
        reactiveData.bookFavourite.favourite = 3

        bookApi.likeOrUnlikeBook(reactiveData.bookFavourite)
            .then((response) => {
              reactiveData.bookFavourite.favourite = 3

              getUserLikeAndRatingMovieCount()
              getUserLikeAndRatingBookCount()

              ElNotification({
                title: 'Success',
                message: response.data.message,
                type: 'success',
                duration: 1500
              })
            })
      }
    }

    const getUserLikeAndRatingMovieCount = () => {
      userApi.getUserLikeAndRatingMovieCount(userStore.userInfo.email)
          .then((response) => {
            appStore.movieCount = response.data.data
          })
    }

    const getUserLikeAndRatingBookCount = () => {
      userApi.getUserLikeAndRatingBookCount(userStore.userInfo.email)
          .then((response) => {
            appStore.bookCount = response.data.data
          })
    }

    const getBooksLikeThis = () => {
      recommendationApi.getBooksLikeThis(String(router.currentRoute.value.params.isbn))
          .then((response) => {
            reactiveData.relatedBooks = response.data.data
          })
    }

    const refreshRelatedBookList = () => {
      getBooksLikeThis()
    }

    return {
      userInfo: computed(() => userStore.userInfo),
      loading,
      starNumber,
      bookFavouriteValue,
      starColor,
      ...toRefs(reactiveData),
      userStore,
      updateBookRate,
      updateBookLike,
      refreshRelatedBookList,
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

/deep/ .el-rate__text {
  @apply text-ob-bright;
}

///deep/ .el-button {
//  @apply bg-ob-deep-800;
//
//  span {
//    @apply text-ob-bright;
//  }
//}

/deep/ .el-input__inner {
  @apply text-ob-bright;
}

/deep/ .el-select {
  @apply text-ob-bright;
}
</style>
