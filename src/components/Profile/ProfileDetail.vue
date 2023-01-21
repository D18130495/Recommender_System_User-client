<template>
  <div class="profile-box">
    <div class="profile-field">
      <p class="relative flex items-center pb-2 mb-4 text-ob-bright">
        <span class="w-full text-2xl font-bold">Public profile</span>
        <span class="bottom-0 h-1 w-14 rounded-full absolute" :style="gradientBackground" />
      </p>

      <p class="relative opacity-90 flex items-center pb-1 mt-2 text-xl text-ob-bright">
        <el-icon class="mr-2"><Avatar /></el-icon>
        Avatar
      </p>

      <div class="flex flex-row">
        <div>
          <el-avatar v-if="userDetail.avatar" :size="110" :src="userDetail.avatar" class="ml-40" />
          <vue-avatar v-else :username=userDetail.username :size="110" class="ml-40" />
        </div>

        <button
            @click="showCropper = true"
            id="avatar-button"
            class="mt-20 w-44 text-white p-2 rounded-lg shadow-lg flex">
          <i class="ri-upload-cloud-line pt-0.5 ml-4"></i>
          <span class="pt-0.5 pl-1">Change avatar</span>
        </button>

        <avatar-cropper
            v-model="showCropper"
            @uploaded="handleSuccess"
            :request-options="options"
            upload-url="/api/user/updateUserAvatar" />
      </div>
    </div>

    <div class="profile-field pt-2">
      <p class="relative opacity-90 flex items-center pb-1 text-xl text-ob-bright">
        <el-icon class="mr-2"><User /></el-icon>
        Name
      </p>

      <div class="flex flex-col flex-wrap-reverse w-98 max-w-full-calc">
                <textarea
                    v-model="userDetail.username"
                    class="w-full shadow-md rounded-md p-4 focus:outline-none input text-ob-bright"
                    placeholder="Add your name..."
                    cols="30"
                    rows="1" />
      </div>
    </div>

    <div class="profile-field pt-8">
      <p class="relative opacity-90 flex items-center pb-1 text-xl text-ob-bright">
        <el-icon class="mr-2"><Message /></el-icon>
        Email
      </p>

      <div class="flex flex-col flex-wrap-reverse w-98 max-w-full-calc">
                <textarea
                    v-model="userDetail.email"
                    class="w-full shadow-md rounded-md p-4 focus:outline-none input text-ob-bright"
                    placeholder="Add email address..."
                    cols="30"
                    rows="1"
                    disabled />
      </div>

      <p class="mt-1 ml-2 text-sm text-ob-bright">
        Email address can not be edited.
      </p>
    </div>

    <div class="profile-field pt-8">
      <p class="relative opacity-90 flex items-center pb-1 text-xl text-ob-bright">
        <el-icon class="mr-2"><Document /></el-icon>
        Policy
      </p>

      <el-checkbox class="shadow-md rounded-md p-4 focus:outline-none input text-ob-bright"
                   v-model="userDetail.policy" size="large" border >
        <span class="text-ob-bright">Agreed</span>
      </el-checkbox>

      <p class="mt-1 ml-2 text-sm text-ob-bright">
        Enabling this system will use your detail to conduct recommend for you.
      </p>
    </div>

    <div class="justify-between mt-10">
      <button
          @click="saveDetail"
          id="submit-button"
          class="mt-5 w-32 text-white p-2 rounded-lg shadow-lg transition transform hover:scale-105 flex">
        <span class="text-center flex-grow commit">Update profile</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, reactive, computed, toRefs, defineComponent, onBeforeMount } from "vue"

import { ElNotification } from "element-plus"

import {useAppStore} from "@/stores/app"
import { useUserStore } from "@/stores/user"

import userApi from "@/api/user"

import VueAvatar from "@webzlodimir/vue-avatar"
import "@webzlodimir/vue-avatar/dist/style.css"

import AvatarCropper from "vue-avatar-cropper"

import 'remixicon/fonts/remixicon.css'


export default defineComponent({
  name: 'ProfileDetail',
  components: {
    VueAvatar, AvatarCropper
  },
  setup() {
    const appStore = useAppStore()
    const userStore = useUserStore()

    let showCropper = ref(false)

    const reactiveData = reactive({
      userDetail: {
        username: '',
        email: '',
        avatar: '',
        policy: false
      }
    })

    onBeforeMount(() => {
      userApi.getUserDetailByEmail(userStore.userInfo.email)
          .then((response) => {
            reactiveData.userDetail.username = response.data.data.username
            reactiveData.userDetail.email = response.data.data.email
            reactiveData.userDetail.avatar = response.data.data.avatar
            reactiveData.userDetail.policy = response.data.data.policy === "T"
          })
    })

    const handleSuccess = (data: any) => {
      data.response.json()
          .then((data: any) => {
            ElNotification({
              title: 'Success',
              message: 'Successfully updated user detail',
              type: 'success',
              duration: 1500
            })

            reactiveData.userDetail.avatar = data.data.avatar
            userStore.userInfo.avatar = data.data.avatar
          })
    }

    const saveDetail = () => {
      userApi.updateUserDetail(reactiveData.userDetail)
          .then((response) => {
            ElNotification({
              title: 'Success',
              message: 'Successfully updated user detail',
              type: 'success',
              duration: 1500
            })

            reactiveData.userDetail.username = response.data.data.username
            reactiveData.userDetail.email = response.data.data.email
            reactiveData.userDetail.avatar = response.data.data.avatar
            reactiveData.userDetail.policy = response.data.data.policy === "T"

            userStore.userInfo.username = response.data.data.username
            userStore.userInfo.policy = response.data.data.policy
          })
    }

    return {
      ...toRefs(reactiveData),
      showCropper,
      handleSuccess,
      saveDetail,
      options: computed(() => {
        return {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + userStore.token
          }
        }
      }),
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
.input {
  background: var(--background-primary);
  resize: none;
}

#avatar-button {
  outline: none;
  background: var(--button-blue);
}

#submit-button {
  outline: none;
  background: var(--button-green);
}
</style>
