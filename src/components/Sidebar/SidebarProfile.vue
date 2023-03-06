<template>
  <div class="h-96 w-full rounded-2xl relative shadow-xl mb-8" :style="gradientBackground">
    <div class="ob-gradient-cut-plate absolute bg-ob-deep-900 rounded-xl opacity-90 flex justify-center items-center pt-4 px-6 shadow-lg hover:shadow-2xl duration-300">
      <div class="profile absolute w-full flex flex-col justify-center items-center">
        <div class="flex flex-col justify-center items-center">
          <img v-if="userInfo.avatar" class="ob-avatar circle-avatar" :src="userInfo.avatar" :size="100" />
          <vue-avatar v-else class="ob-avatar circle-avatar" :username=userInfo.username :size="100" />

          <h2 v-if="userInfo.username" class="text-center pt-4 text-4xl text-ob-bright">
            {{ userInfo.username }}
          </h2>

          <span class="h-1 w-14 rounded-full mt-2" :style="gradientBackground" />

          <p v-if="userInfo.email" class="pt-6 px-10 w-full text-s text-center text-ob-secondary">
            Email: {{ userInfo.email }}
          </p>

          <el-tooltip
              class="box-item"
              effect="dark"
              content="Send to your email"
              placement="top-start"
          >
            <p class="mt-4 text-ob-bright cursor-pointer hover:text-blue-600" @click="openSend()">Require your data</p>
          </el-tooltip>
        </div>

        <div class="h-full w-full flex flex-col flex-1 justify-end items-end">
          <ul class="grid grid-cols-2 pt-4 w-full px-2 text-lg">
            <li class="col-span-1 text-center">
              <span class="text-ob-bright">Movie</span>
              <p class="text-base text-ob-secondary">{{ appStore.movieCount }}</p>
            </li>

            <li class="col-span-1 text-center">
              <span class="text-ob-bright">Book</span>
              <p class="text-base text-ob-secondary">{{ appStore.bookCount }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRef } from 'vue'

import { useAppStore } from "@/stores/app"
import { useUserStore } from "@/stores/user"

import VueAvatar from "@webzlodimir/vue-avatar"
import "@webzlodimir/vue-avatar/dist/style.css"
import { ElMessageBox, ElNotification } from "element-plus";


export default defineComponent({
  name: 'SidebarProfile',
  components: {
    VueAvatar
  },
  setup() {
    const appStore = useAppStore()
    const userStore = useUserStore()

    const openSend = () => {
      ElMessageBox.confirm(
          'What to request your personal data?',
          'Personal data request',
          {
            confirmButtonText: 'Require',
            cancelButtonText: 'Cancel',
            type: 'success',
          }
      )
      .then(() => {


        ElNotification({
          title: 'Success',
          message: 'Your personal data will send to your email shortly',
          type: 'success',
          duration: 1500
        })
      })
      .catch(() => {
        ElNotification({
          title: 'Cancel',
          message: 'Your cancel the request',
          type: 'info',
          duration: 1500
        })
      })
    }

    return {
      appStore,
      openSend,
      userInfo: toRef(userStore.$state, 'userInfo'),
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
.profile {
  top: -7%;
  height: 100%;
  max-height: 100%;
}
</style>
