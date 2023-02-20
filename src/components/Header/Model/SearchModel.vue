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

          <div id="Search-Dropdown" class="search-dropdown" v-if="searchResults !== null">
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
                          <p>{{ result.title }}</p>
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

    watch(
      () => searchStore.openModel, (status: any) => {
        openModel.value = status

        setTimeout(() => {
          openSearchContainer.value = status
        }, 200)
      }
    )

    const closeModel = (status: boolean) => {
      searchStore.setOpenModel(status)
    }

    const searchByKeywords = () => {
      isEmpty.value = false
      searchResults.value = []
      if(keywords.value === "") return
      loading.value = true

      searchApi.fuzzySearchMovieAndBookByTitle(keywords.value)
          .then((response) => {
            searchResults.value = response.data.data
            console.log(response.data.data)
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
      router.push({ path: '/' + result.type + '/' + result.id })
      searchStore.setOpenModel(false)
    }

    return {
      searchInput,
      loading,
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
