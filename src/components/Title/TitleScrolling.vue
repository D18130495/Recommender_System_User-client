<template>
  <div class="article-container">
    <div class="feature-article">
      <div class="feature-thumbnail">
<!--        <img v-if="article.articleCover" class="ob-hz-thumbnail" v-lazy="article.articleCover" />-->
        <img class="ob-hz-thumbnail" src="@/assets/default-cover.jpg" />
      </div>
      <div class="feature-content">
        <b>
          <div @click="handleClick">123</div>
        </b>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRef, getCurrentInstance } from 'vue'


export default defineComponent({
  name: 'TitleScrolling',
  setup() {
    const handleClick = () => {
      console.log('123')
    }

    return {
      handleClick
    }
  }
})
</script>

<style lang="scss" scoped>
.article-title:hover {
  cursor: default;
}
</style>
