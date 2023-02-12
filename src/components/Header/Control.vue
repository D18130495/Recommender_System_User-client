<template>
  <div class="header-controls absolute top-10 right-0 flex flex-row">
    <span class="ob-drop-shadow" data-dia="search" @click="handleSearchModel">
      <el-icon size="32px"><Search/></el-icon>
    </span>
    <teleport to="body">
      <SearchModel/>
    </teleport>

    <template v-if="userInfo === ''">
      <span class="ml-3 mr-3" @click="redirectLogin">Login</span>
    </template>

    <template v-else-if="userInfo !== ''">
      <OptionList hover>
        <span class="ml-3 mr-3">
          <div class="flex-shrink-0">
            <div class="rounded-full ring-gray-100 overflow-hidden shaodw-lg w-8">
              <img v-if="userInfo.avatar" class="avatar-img" :src="userInfo.avatar" alt="avatar" />
              <vue-avatar v-else class="avatar-img" :username=userInfo.username :size="32" />
            </div>
          </div>
        </span>
        <OptionListBlock>
          <OptionListItem @click="openUserProfile">Profile</OptionListItem>
          <OptionListItem @click="handleLogout">Logout</OptionListItem>
        </OptionListBlock>
      </OptionList>
    </template>

    <span class="ob-drop-shadow" data-dia="light-switch">
      <ThemeSwitch/>
    </span>
  </div>
</template>

<script lang="ts">
import {defineComponent, toRef, inject, onMounted, watch} from 'vue'
import { useRouter } from 'vue-router'

import ThemeSwitch from "./ControlButton/ThemeSwitch.vue"
import OptionList from "./OptionList/OptionList.vue"
import OptionListBlock from "./OptionList/OptionListBlock.vue"
import OptionListItem from "./OptionList/OptionListItem.vue"
import SearchModel from "./Model/SearchModel.vue"

import { useAppStore } from "@/stores/app"
import { useUserStore } from "@/stores/user"
import { useSearchStore } from "@/stores/search"

import cookies from "js-cookie"

import { ElMessageBox, ElNotification } from 'element-plus'

import VueAvatar from "@webzlodimir/vue-avatar"
import "@webzlodimir/vue-avatar/dist/style.css"

import userApi from "@/api/user"


export default defineComponent({
  name: 'Controls',
  components: {
    ThemeSwitch, OptionList, OptionListBlock, OptionListItem, SearchModel, VueAvatar
  },
  setup() {
    const appStore = useAppStore()
    const userStore = useUserStore()
    const searchStore = useSearchStore()
    const router = useRouter()

    const refresh = inject("reload")

    onMounted(() => {
      document.addEventListener('visibilitychange', checkCookie)
    })

    watch(userStore, () => {
      if(cookies.get('token') !== undefined && userStore.userInfo !== '') {
        getUserLikeAndRatingMovieCount()
        getUserLikeAndRatingBookCount()
      }
    })

    const checkCookie = (e:any) => {
      if(!e.target.hidden) {
        if(cookies.get('token') === undefined) {
          if(router.currentRoute.value.path === '/profile') {
            router.push({ path: '/' })

            ElMessageBox.confirm(
                'You haven\'t logged in, or login time expired, please login',
                'Confirm login',
                {
                  confirmButtonText: 'Login',
                  cancelButtonText: 'Cancel',
                  type: 'warning'
                }
            ).then(() => {
              appStore.movieCount = -1
              appStore.bookCount = -1
              userStore.userInfo = ''
              userStore.token = ''
              sessionStorage.removeItem('token')

              router.push({ path: '/authentication' })
            }).catch(() => {
              appStore.movieCount = -1
              appStore.bookCount = -1
              userStore.userInfo = ''
              userStore.token = ''
              sessionStorage.removeItem('token')
            })
          }

          appStore.movieCount = -1
          appStore.bookCount = -1
          userStore.userInfo = ''
          userStore.token = ''
          sessionStorage.removeItem('token')
        }else {
          userApi.getUserDetailByToken(String(cookies.get('token')))
              .then((response) => {
                userStore.userInfo = response.data.data
                userStore.token = String(cookies.get('token'))
                sessionStorage.setItem('token', String(cookies.get('token')))

                getUserLikeAndRatingMovieCount()
                getUserLikeAndRatingBookCount()
              })
        }

        refresh
      }
    }

    const getUserLikeAndRatingMovieCount = () => {
      userApi.getUserLikeAndRatingMovieCount(userStore.userInfo.email)
          .then((response) => {
            appStore.movieCount = response.data.data
          })
    }

    const getUserLikeAndRatingBookCount = () => {
      userApi.getUserLikeAndRatingBookCount(userStore.userInfo.email)
          .then((response) => {
            appStore.bookCount = response.data.data
          })
    }

    const handleSearchModel: any = (status: boolean) => {
      searchStore.setOpenModel(status)
    }

    const redirectLogin = () => {
      router.push({ path: '/authentication' })
    }

    const handleLogout = () => {
      appStore.movieCount = -1
      appStore.bookCount = -1
      userStore.userInfo = ''
      userStore.token = ''
      sessionStorage.removeItem('token')
      cookies.remove('token')

      router.push({ path: '/' })

      ElNotification({
        title: 'Success',
        message: 'Successfully logout',
        type: 'success',
        duration: 1500
      })
    }

    const openUserProfile = () => {
      router.push({ path: '/profile' })
    }

    return {
      userInfo: toRef(userStore.$state, 'userInfo'),
      refresh,
      handleSearchModel,
      redirectLogin,
      handleLogout,
      openUserProfile
    }
  }
})
</script>

<style lang="scss">
.my-el-button {
  width: 300px !important;
}

.el-dialog__headerbtn {
  outline: none !important;
}

.el-input-group__append {
  background-color: var(--background-primary-alt) !important;
}

.el-form-item__label {
  text-align: left;
  width: 70px;
  color: var(--text-normal) !important;
}

.el-input__inner {
  color: var(--text-normal) !important;
  background-color: var(--background-primary-alt) !important;
}

.el-input__wrapper {
  background: var(--background-primary-alt) !important;
}
</style>

<style lang="scss" scoped>
.text {
  color: var(--text-normal);
  cursor: pointer;
}

#submit-button {
  outline: none;
  background: #0fb6d6;
}

.header-controls {
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    cursor: pointer;
    transition: opacity 250ms ease;
    padding-right: 0.5rem;

    &[no-hover-effect] {
      &:hover {
        opacity: 1;
      }
    }

    &:hover {
      opacity: 0.5;
    }

    .svg-icon {
      stroke: #fff;
      height: 2rem;
      width: 2rem;
      margin-right: 0.5rem;
      pointer-events: none;
    }
  }

  .search-bar {
    @apply bg-transparent flex flex-row px-0 mr-2 rounded-full;
    opacity: 0;
    width: 0;
    transition: 300ms all ease-out;

    &.active {
      @apply bg-ob-deep-800;
      opacity: 0.95;
      width: 200px;
      imput {
        width: initial;
      }
    }

    &:focus {
      appearance: none;
      outline: none;
    }

    input {
      @apply flex flex-1 bg-transparent text-ob-normal px-6 box-border;
      width: 0;
      appearance: none;
      outline: none;
    }

    svg {
      @apply float-right;
    }
  }
}

//.avatar-img {
//  transition-duration: 800ms;
//}

.avatar-img:hover {
  animation: fadenum 1.6s;
  //transform: rotate(30deg);
}

@keyframes fadenum{
  50%{transform: rotate(-30deg)}
}
</style>
