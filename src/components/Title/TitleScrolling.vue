<template>
  <div class="title-container">
    <div class="title">
      <div class="title-image">
<!--        <img v-if="article.articleCover" class="ob-title-image" v-lazy="article.articleCover" />-->
        <img class="ob-title-image" src="@/assets/images/5.jpg"/>
      </div>
      <div class="title-content">
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
