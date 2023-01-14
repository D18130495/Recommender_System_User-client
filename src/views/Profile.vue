<template>
  <div>
    profile
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted} from "vue"

import { ElMessage } from "element-plus"

import userApi from "@/api/user"


export default defineComponent({
  name: 'Profile',
  components: {
  },
  setup() {
    onMounted(() => {
      userApi.getUserDetail({'email':"990415zys@gmail.com"})
          .then((response) => {
            console.log(response.data)
          })
          .catch((error) => {
            console.log(error)
            ElMessage.error('Network Error')
          })
    })

    return {

    }
  }
})
</script>

<style>
</style>
