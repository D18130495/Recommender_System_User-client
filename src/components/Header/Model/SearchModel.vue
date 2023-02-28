<template>
  <div v-if="openModel" id="search-model" @click.self="closeModel(false)" tabindex="-1">
      <transition name="fade-bounce-pure-y" mode="out-in">
        <div class="search-container" v-if="openSearchContainer">
          <header class="search-header">
            <form class="search-form">
              <label id="search-label" class="items-center flex justify-center">
                <el-icon size="32px" class="text-ob fill-current stroke-current"><Search class="search-icon"/></el-icon>
              </label>
              <input ref="searchInput"
                     id="search-input"
                     class="search-input"
                     autocomplete="off"
                     v-model="keywords"
                     @input="searchByKeywords" />
              <button class="search-btn"
                      v-if="keywords"
                      type="reset"
                      @click="handleResetInput" >
                <el-icon size="18px" class="text-ob fill-current stroke-current"><CloseBold class="search-icon"/></el-icon>
              </button>
            </form>
          </header>

          <div id="Search-Dropdown" class="search-dropdown text-ob-bright" v-if="searchResults !== null">
            <div>
              <div v-if="loading" v-loading="loading" element-loading-text="Loading..." style="height: 100px;" />
              <section v-if="searchResults.count > 0 && !loading">
                <div class="search-hit-label">Found {{ searchResults.count }} records</div>
                <ul id="search-menu">
                  <li v-for="(result, index) in searchResults.fuzzySearchReturnVoList" :key="result.title"
                      :class="{'search-hit': true}"
                      :id="'search-hit-item-' + index">
                    <a href="javascript:void(0)" @click="handleLinkClick(result)">
                      <div class="search-hit-container">
                        <div class="search-hit-icon">
                          <el-icon v-if="result.type === 'movie'" size="24px" class="text-ob fill-current stroke-current"><Film class="text-ob-bright"/></el-icon>
                          <el-icon v-else size="24px" class="text-ob fill-current stroke-current"><Collection class="text-ob-bright"/></el-icon>
                        </div>
                        <div class="search-hit-content-wrapper">
                          <!-- content -->
                          <div class="grid grid-cols-9 grid-rows-3 items-center">
                            <div class="col-span-1 row-span-3 col-span-1">
                              <img v-if="result.image" v-lazy="result.image" />
                              <img v-else src="@/assets/posterNotFound.jpg" />
                            </div>
                            <p class="search-hit-title col-span-8 row-span-1 pl-2">{{ result.title }}</p>
                            <p v-if="result.type === 'movie'" class="search-hit-title col-span-8 row-span-1 pl-2">{{ result.year }}</p>
                            <p v-if="result.type === 'movie'" class="search-hit-title col-span-8 row-span-1 pl-2">{{ result.actorList }}</p>
                            <p v-if="result.type === 'book'" class="search-hit-title col-span-8 row-span-1 pl-2">{{ result.year }}</p>
                            <p v-if="result.type === 'book'" class="search-hit-title col-span-8 row-span-1 pl-2">{{ result.author }}</p>
                          </div>

                        </div>
                        <div class="search-hit-action">
                          <el-icon size="24px" class="text-ob fill-current stroke-current"><Back class="text-ob-bright"/></el-icon>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </section>
              <div class="search-not-found" v-else-if="isEmpty">
                <p>No result found</p>
              </div>
              <div v-else class="search-hit-label">Please input something</div>
            </div>
          </div>

          <div class="search-footer">
            <div class="search-logo">
              <span class="text-ob">Search Something You Like</span>
            </div>
            <ul class="search-commands">
              <li>
                <span class="search-commands-key" @click="changeSearchType('title')">
                  <svg v-if="searchType === 'title'" width="15" height="15">
                    <g
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2">
                      <path d="M 7.5 11.5 M 4 8 l 3 2 l 4 -6"></path>
                    </g>
                  </svg>
                </span>
                <span class="search-commands-label" @click="changeSearchType('title')">
                  Title
                </span>
              </li>
              <li>
                <span class="search-commands-key" @click="changeSearchType('year')">
                  <svg v-if="searchType === 'year'" width="15" height="15">
                    <g
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2">
                      <path d="M 7.5 11.5 M 4 8 l 3 2 l 4 -6"></path>
                    </g>
                  </svg>
                </span>
                <span class="search-commands-label" @click="changeSearchType('year')">
                  Year
                </span>
              </li>
            </ul>
          </div>
        </div>
      </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, onUpdated, ref, watch } from 'vue'

import { useSearchStore } from "@/stores/search"
import { useRouter } from "vue-router"

import searchApi from "@/api/search"


export default defineComponent({
  name: 'SearchModel',
  setup() {
    const searchStore = useSearchStore()
    const router = useRouter()
    const openModel = ref(false)
    const openSearchContainer = ref(false)
    const searchResults = ref<any>([])
    const isEmpty = ref(false)
    const loading = ref(false)
    const searchType = ref('title')
    const keywords = ref('')

    const searchInput = ref<HTMLDivElement>()

    onMounted(() => {
      isEmpty.value = false

      setTimeout(() => {
        if(searchInput.value) searchInput.value.focus()
      }, 200)
    })

    onUpdated(() => {
      keywords.value = ''
      searchResults.value = []

      setTimeout(() => {
        if(searchInput.value) searchInput.value.focus()
      }, 200)
    })

    onUnmounted(() => {
      document.body.classList.remove('modal--active')
    })

    watch(() => searchStore.openModel, (status: any) => {
        openModel.value = status

        setTimeout(() => {
          openSearchContainer.value = status
        }, 200)
      }
    )

    const closeModel = (status: boolean) => {
      searchStore.setOpenModel(status)
    }

    const changeSearchType = (type: any) => {
      searchType.value = type
      keywords.value = ''
      isEmpty.value = false
      searchResults.value = []
    }

    const searchByKeywords = () => {
      isEmpty.value = false
      searchResults.value = []
      if(keywords.value === "") return
      loading.value = true

      searchApi.fuzzySearchMovieAndBookByTitleOrYear(keywords.value, searchType.value)
          .then((response) => {
            if(keywords.value !== "") {
              searchResults.value = response.data.data
            }else {
              searchResults.value = []
            }

            if(response.data.data.count === 0) isEmpty.value = true
            loading.value = false
          })
    }

    const handleResetInput = () => {
      keywords.value = ''
      searchResults.value = []
      isEmpty.value = false
    }

    const handleLinkClick = (result: any) => {
      if(result.type === 'movie') {
        router.push({ path: '/' + result.type + '/' + result.movieId })
      }else {
        router.push({ path: '/' + result.type + '/' + result.isbn })
      }

      searchStore.setOpenModel(false)
    }

    return {
      searchInput,
      loading,
      searchType,
      changeSearchType,
      openModel: computed(() => openModel.value),
      openSearchContainer: computed(() => openSearchContainer.value),
      closeModel,
      searchByKeywords,
      handleResetInput,
      handleLinkClick,
      searchResults,
      keywords,
      isEmpty
    }
  }
})
</script>

<style lang="scss" scoped>
/deep/ .el-loading-mask {
  background-color: var(--background-primary);
}
</style>
