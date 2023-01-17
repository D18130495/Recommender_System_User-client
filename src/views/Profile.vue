<template>
  <div>
    <ul class="separator flex flex-row gap-6 text-white">
      <li>Home</li>
      <li :to="{ path: '/' }">Profile</li>
    </ul>

    <div class="flex flex-col">
      <div class="profile-header">
        <h1 class="profile-title text-white uppercase">
          Profile
        </h1>
      </div>

      <div class="main-grid">
        <div class="relative">
          <div class="profile-box">
            <div class="profile-field">
              <p class="relative opacity-90 flex items-center pb-1 text-xl text-ob-bright">
                <el-icon class="mr-2"><User /></el-icon>
                Name
              </p>

              <div class="flex flex-col flex-wrap-reverse w-98 max-w-full-calc">
                <textarea
                    v-model="userDetail.username"
                    class="w-full shadow-md rounded-md p-4 focus:outline-none input"
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
                    class="w-full shadow-md rounded-md p-4 focus:outline-none input"
                    placeholder="Add email address..."
                    cols="30"
                    rows="1" />
              </div>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent, onBeforeMount } from "vue"

import userApi from "@/api/user"


export default defineComponent({
  name: 'Profile',
  components: {
  },
  setup() {
    const reactiveData = reactive({
      userDetail: {
        username: 'Yushun Zeng',
        email: '990415zys@gmail.com'
      }
    })

    onBeforeMount(() => {
      userApi.getUserDetailByEmail({'email':"990415zys@gmail.com"})
          .then((response) => {
          })
    })

    const saveDetail = () => {

    }

    return {
      ...toRefs(reactiveData),
      saveDetail
    }
  }
})
</script>

<style lang="scss" scoped>
.separator {
  position: relative;
  z-index: 20;
  li {
    position: relative;
    z-index: 20;
    &:after {
      content: '>';
      position: absolute;
      right: -1.1rem;
      opacity: 0.65;
    }
    &:last-of-type {
      &:after {
        content: '';
      }
    }
  }
}

.input {
  background: var(--background-primary);
  resize: none;
}

#submit-button {
  outline: none;
  background: var(--button-green);
}
</style>
