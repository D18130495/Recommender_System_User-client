<template>
  <div>
    profile
  </div>
</template>

<script lang="ts">
import {defineComponent, onBeforeMount, onMounted} from "vue"

import { ElMessage } from "element-plus"

import userApi from "@/api/user"


export default defineComponent({
  name: 'Profile',
  components: {
  },
  setup() {
    onBeforeMount(() => {
      userApi.getUserDetailByEmail({'email':"990415zys@gmail.com"})
          .then((response) => {
            console.log(response.data)
          })
    })

    return {

    }
  }
})
</script>

<style>
</style>
