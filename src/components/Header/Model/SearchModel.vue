<template>
  <div v-if="openModel" id="search-model"
       @click.self="closeModel(false)" tabindex="-1">
      <transition name="fade-bounce-pure-y" mode="out-in">
        <div class="search-container" v-if="openSearchContainer">
          <header class="flex pt-4 pr-4 pl-4">
            <form class="search-form" action="">
              <label id="search-label" class="items-center flex justify-center" for="search-input">
                <el-icon size="32px" class="text-ob fill-current stroke-current"><Search/></el-icon>
              </label>
              <input
                  type="search"
                  id="search-input"
                  ref="searchInput"
                  class="search-input"
                  autocomplete="off"
                  v-model="keywords"
                  @input="searchKeywords"/>
              <button
                  class="search-btn"
                  type="reset"
                  title="Clear the query"
                  @click="handleResetInput"></button>
            </form>
          </header>

          <div class="search-footer">
            <div class="search-logo">
              <a href="" target="_blank" rel="noopener noreferrer">
                <span class="search-label">123</span>
                <img
                    class="mr-1.5"
                    src="https://img-blog.csdnimg.cn/20210313122054101.png"
                    alt="ObsidianNext Logo"
                    height="20"
                    width="20" />
                <span class="text-ob">ElasticSearch</span>
              </a>
            </div>
          </div>
        </div>
      </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, onUpdated, ref, watch } from 'vue'

import { useSearchStore } from "@/stores/search"


export default defineComponent({
  name: 'SearchModel',
  setup() {
    const searchStore = useSearchStore()
    const openModel = ref(false)
    const openSearchContainer = ref(false)
    const isEmpty = ref(false)
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

      setTimeout(() => {
        if (searchInput.value) searchInput.value.focus()
      }, 200)
    })

    watch(
      () => searchStore.openModel,
      (status: any) => {
        // if(!(status instanceof Boolean)) {
        //   reloadRecentResult()
        // }

        openModel.value = status

        setTimeout(() => {
          openSearchContainer.value = status
        }, 200)
      }
    )

    const closeModel = (status: boolean) => {
      searchStore.setOpenModel(status)
    }

    return {
      openModel: computed(() => openModel.value),
      openSearchContainer: computed(() => openSearchContainer.value),
      closeModel,
      keywords
    }
  }
})
</script>
