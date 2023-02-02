<template>
  <div class="bg-ob-deep-800 p-4 mt-8 lg:px-14 lg:py-10 rounded-2xl shadow-xl mb-8 lg:mb-0">
    <p class="relative flex items-center pb-2 mb-4 text-ob-bright">
      <span class="w-full text-2xl font-bold">Favourite items</span>
      <span class="bottom-0 h-1 w-14 rounded-full absolute" :style="gradientBackground" />
    </p>

    <!-- movie -->
    <el-tabs>
      <el-tab-pane>
        <template #label>
        <span>
          <p class="relative opacity-90 flex items-center text-ob-bright">
          <i class="ri-film-line mr-2"></i>
            Movie
          </p>
        </span>
        </template>

        <!-- movie like list -->
        <div class="movie-like-list mt-2">
          <p class="relative flex items-center pb-2 pl-4 mb-4 text-ob-bright">
            <span class="w-full text-xl font-bold">Liked list</span>
            <span class="bottom-0 h-1 w-10 rounded-full absolute" :style="gradientBackground" />
          </p>

          <el-table :data="movieLikeList" style="width: 100%" max-height="281">
            <el-table-column fixed prop="updateDate" label="Liked date" width="160" />
            <el-table-column prop="title" label="Title" width="400" />
            <el-table-column prop="genres" label="Genres" width="350" />
            <el-table-column label="Director" width="200" align="center">
              <template #default="scope">
                <a :href="scope.row.director.directorLink" target="_blank">
                  {{ scope.row.director.directorName }}
                </a>
              </template>
            </el-table-column>
            <el-table-column label="Actors" width="200" align="center">
              <template #default="scope">
                <el-popover effect="light" trigger="hover" placement="top" width="auto">
                  <template #default>
                    <div class="text-center" v-for="actor in scope.row.actor">
                      <a :href="actor.actorLink" target="_blank">{{ actor.actorName }}</a>
                    </div>
                  </template>
                  <template #reference>
                    <el-tag v-for="actor in scope.row.actor">
                      {{ actor.actorName }}
                    </el-tag>
                  </template>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column prop="rating" label="Your rating" width="200" align="center">
              <template #default="scope">
                <el-tag v-if="scope.row.rating" type="success">
                  {{ scope.row.rating }}
                </el-tag>
                <el-tag v-else type="info">
                  Your haven't rating
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column class="pl-1" fixed="right" label="Operations" width="120" align="center">
              <template #default="scope">
                <el-button link type="primary" size="small" @click="handleMovieDetail(scope.$index, scope.row)">Detail</el-button>
                  <el-popconfirm
                      width="220"
                      confirm-button-text="OK"
                      cancel-button-text="No, Thanks"
                      :icon="InfoFilled"
                      icon-color="#626AEF"
                      title="Are you sure to delete this?"
                      @confirm="handleMovieDelete(scope.$index, scope.row)"
                  >
                    <template #reference>
                      <el-button link type="primary" size="small">Delete</el-button>
                      </template>
                    </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- movie rating list -->
        <div class="movie-rating-list mt-6">
          <p class="relative flex items-center pb-2 pl-4 mb-4 text-ob-bright">
            <span class="w-full text-xl font-bold">Rating list</span>
            <span class="bottom-0 h-1 w-10 rounded-full absolute" :style="gradientBackground" />
          </p>

          <el-table :data="movieRatingList" style="width: 100%" max-height="281">
            <el-table-column fixed prop="updateDate" label="Liked date" width="160" />
            <el-table-column prop="title" label="Title" width="355" />
            <el-table-column prop="rating" label="Your rating" width="200" align="center">
              <template #default="scope">
                <el-tag v-if="scope.row.rating" type="success">
                  {{ scope.row.rating }}
                </el-tag>
                <el-tag v-else type="info">
                  Your haven't rating
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="Director" width="200" align="center">
              <template #default="scope">
                <a :href="scope.row.director.directorLink" target="_blank">
                  {{ scope.row.director.directorName }}
                </a>
              </template>
            </el-table-column>
            <el-table-column label="Actors" width="200" align="center">
              <template #default="scope">
                <el-popover effect="light" trigger="hover" placement="top" width="auto">
                  <template #default>
                    <div class="text-center" v-for="actor in scope.row.actor">
                      <a :href="actor.actorLink" target="_blank">{{ actor.actorName }}</a>
                    </div>
                  </template>
                  <template #reference>
                    <el-tag v-for="actor in scope.row.actor">
                      {{ actor.actorName }}
                    </el-tag>
                  </template>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="Operations" width="120" align="center">
              <template #default="scope">
                <el-button link type="primary" size="small" @click="handleMovieDetail(scope.$index, scope.row)">Detail</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>

      <!-- book -->
      <el-tab-pane>
        <template #label>
        <span>
          <p class="relative opacity-90 flex items-center text-ob-bright">
          <i class="ri-book-line mr-2"></i>
            Book
          </p>
        </span>
        </template>

        <!-- movie like list -->
        <div class="movie-like-list mt-2">
          <p class="relative flex items-center pb-2 pl-4 mb-4 text-ob-bright">
            <span class="w-full text-xl font-bold">Liked list</span>
            <span class="bottom-0 h-1 w-10 rounded-full absolute" :style="gradientBackground" />
          </p>

          <el-table :data="bookLikeList" style="width: 100%" max-height="281">
            <el-table-column fixed prop="updateDate" label="Liked date" width="160" />
            <el-table-column prop="isbn" label="ISBN" width="200" align="center" />
            <el-table-column prop="title" label="Title" width="350" />
            <el-table-column prop="year" label="Year" width="200" align="center">
              <template #default="scope">
                <el-tag v-if="scope.row.year && scope.row.year !== '0'">
                  {{ scope.row.year }}
                </el-tag>
                <el-tag v-else type="info">
                  Year not available
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="author" label="Author" width="200" align="center" />
            <el-table-column prop="publisher" label="Publisher" width="200" align="center" />
            <el-table-column prop="rating" label="Your rating" width="200" align="center">
              <template #default="scope">
                <el-tag v-if="scope.row.rating" type="success">
                  {{ scope.row.rating }}
                </el-tag>
                <el-tag v-else type="info">
                  Your haven't rating
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column class="pl-1" fixed="right" label="Operations" width="120" align="center">
              <template #default="scope">
                <el-button link type="primary" size="small" @click="handleBookDetail(scope.$index, scope.row)">Detail</el-button>
                <el-popconfirm
                    width="220"
                    confirm-button-text="OK"
                    cancel-button-text="No, Thanks"
                    :icon="InfoFilled"
                    icon-color="#626AEF"
                    title="Are you sure to delete this?"
                    @confirm="handleBookDelete(scope.$index, scope.row)"
                >
                  <template #reference>
                    <el-button link type="primary" size="small">Delete</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- book rating list -->
        <div class="movie-rating-list mt-6">
          <p class="relative flex items-center pb-2 pl-4 mb-4 text-ob-bright">
            <span class="w-full text-xl font-bold">Rating list</span>
            <span class="bottom-0 h-1 w-10 rounded-full absolute" :style="gradientBackground" />
          </p>

          <el-table :data="bookRatingList" style="width: 100%" max-height="281">
            <el-table-column fixed prop="updateDate" label="Liked date" width="160" />
            <el-table-column prop="isbn" label="ISBN" width="200" align="center" />
            <el-table-column prop="title" label="Title" width="350" />
            <el-table-column prop="rating" label="Your rating" width="200" align="center">
              <template #default="scope">
                <el-tag v-if="scope.row.rating" type="success">
                  {{ scope.row.rating }}
                </el-tag>
                <el-tag v-else type="info">
                  Your haven't rating
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="author" label="Author" width="200" align="center" />
            <el-table-column prop="publisher" label="Publisher" width="200" align="center" />
            <el-table-column fixed="right" label="Operations" width="120" align="center">
              <template #default="scope">
                <el-button link type="primary" size="small" @click="handleBookDetail(scope.$index, scope.row)">Detail</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { ref, toRefs, computed, defineComponent, reactive, onBeforeMount } from 'vue'

import { ElNotification } from "element-plus"

import { useAppStore } from "@/stores/app"
import { useUserStore } from "@/stores/user"

import { useRouter } from "vue-router"

import userApi from "@/api/user"
import movieApi from "@/api/movie"
import bookApi from "@/api/book"

import { InfoFilled } from "@element-plus/icons-vue"

import "remixicon/fonts/remixicon.css"


export default defineComponent({
  name: 'ProfileFavouriteItem',
  setup() {
    const appStore = useAppStore()
    const userStore = useUserStore()
    const router = useRouter()
    const activeIndex = ref('0')
    const reactiveData = reactive({
      movieLikeList: [],
      movieRatingList: [],
      bookLikeList: [],
      bookRatingList: []
    })

    interface MovieLike {
      movieId: number
      title: string
      genres: string
      director: object
      rating: number
      updateDate: string
    }

    interface BookLike {
      isbn: string
      title: string
      author: string
      year: string
      publisher: string
      rating: number
      updateDate: string
    }

    onBeforeMount(() => {
      initialMovieLikeList()
      initialMovieRatingList()
      initialBookLikeList()
      initialBookRatingList()
    })

    const initialMovieLikeList = () => {
      userApi.getUserMovieLikeList(userStore.userInfo.email)
          .then((response) => {
            reactiveData.movieLikeList = response.data.data
          })
    }

    const initialBookLikeList = () => {
      userApi.getUserBookLikeList(userStore.userInfo.email)
          .then((response) => {
            reactiveData.bookLikeList = response.data.data
          })
    }

    const initialMovieRatingList = () => {
      userApi.getUserMovieRatingList(userStore.userInfo.email)
          .then((response) => {
            reactiveData.movieRatingList = response.data.data
          })
    }

    const initialBookRatingList = () => {
      userApi.getUserBookRatingList(userStore.userInfo.email)
          .then((response) => {
            reactiveData.bookRatingList = response.data.data
          })
    }

    const handleMovieDetail = (index: number, row: MovieLike) => {
      router.push({ path: '/movie/' + row.movieId })
    }

    const handleBookDetail = (index: number, row: BookLike) => {
      router.push({ path: '/book/' + row.isbn })
    }

    const handleMovieDelete = (index: number, row: MovieLike) => {
      movieApi.likeOrUnlikeMovie({'movieId': row.movieId, 'email': userStore.userInfo.email, 'favourite': 1})
          .then((response) => {
            initialMovieLikeList()

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

    const handleBookDelete = (index: number, row: BookLike) => {
      bookApi.likeOrUnlikeBook({'isbn': row.isbn, 'email': userStore.userInfo.email, 'favourite':1})
          .then((response) => {
            initialBookLikeList()

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

    const getUserLikeAndRatingMovieCount = () => {
      userApi.getUserLikeAndRatingMovieCount(userStore.userInfo.email)
          .then((response) => {
            appStore.movieCount = response.data.data

            userStore.likeOrRateNumber = appStore.movieCount + appStore.bookCount
          })
    }

    const getUserLikeAndRatingBookCount = () => {
      userApi.getUserLikeAndRatingBookCount(userStore.userInfo.email)
          .then((response) => {
            appStore.bookCount = response.data.data

            userStore.likeOrRateNumber = appStore.movieCount + appStore.bookCount
          })
    }

    return {
      activeIndex,
      ...toRefs(reactiveData),
      handleMovieDetail,
      handleBookDetail,
      handleMovieDelete,
      handleBookDelete,
      InfoFilled,
      gradientBackground: computed(() => {
        if(appStore.themeConfig.theme === 'theme-dark') {
          return {
            background: appStore.themeConfig.header_gradient_dark
          }
        }else {
          return {
            background: appStore.themeConfig.header_gradient_light
          }
        }
      })
    }
  }
})
</script>

<style lang="scss" scoped>
/deep/ .el-tabs {
  @apply bg-ob-deep-800 text-ob-bright;

  .el-tabs__header {
    @apply w-3/5;
  }

  .el-tabs__item {
    @apply text-ob-bright;
    font-size: 120%;
  }
}

/deep/ .el-table__empty-block {
  @apply bg-ob-deep-800;
  .el-table__empty-text {
    @apply text-ob-bright;
  }
 }

/deep/ .el-table {
  --el-table-bg-color: var(--background-secondary);
  --el-table-tr-bg-color: var(--background-secondary);
  --el-table-header-bg-color: var(--background-secondary);
  --el-table-fixed-box-shadow: var(--background-secondary);
  --el-table-text-color: var(--text-bright);
  --el-table-header-text-color: var(--text-bright);
  --el-table-row-hover-bg-color: var(--table-hover);
  --el-table-fixed-left-column: var(--table-column-line-left);
  --el-table-fixed-right-column: var(--table-column-line-right);
  right: -1px;

  .el-table-fixed-column--left {
    @apply bg-ob-deep-800;
  }

  .el-table-fixed-column--right {
    @apply bg-ob-deep-800;
  }
}

/deep/ .cell {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}
</style>
