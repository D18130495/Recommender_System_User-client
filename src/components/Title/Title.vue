<template>
  <div id="feature">
    <el-carousel class="rounded-2xl" :interval="5000" arrow="hover" indicator-position="outside" height="448px">
      <el-carousel-item class="rounded-2xl" v-for="item in 5" :key="item">
        <TitleScrolling class="title-scrolling"/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import TitleScrolling from "./TitleScrolling.vue"


export default defineComponent({
  name: 'Title',
  components: {
    TitleScrolling
  }
})
</script>

<style lang="scss">
.title-scrolling {
  .feature-content {
    @apply rounded-2xl;
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
