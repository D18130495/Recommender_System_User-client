<template>
  <div v-if="openModel" id="password-model" @click.self="closeModel(false)" tabindex="-1">
    <transition name="fade-bounce-pure-y" mode="out-in">
      <div class="password-container" v-if="openPasswordContainer">
        <div class="pb-4 pt-6 pl-14 pr-14">
          <header class="search-header">
            <p class="text-ob-bright text-xl">Change your password:</p>
          </header>
          <el-form size="large" ref="passwordRef" :model="passwordForm" :rules="passwordRules" status-icon>
            <el-form-item  prop="oldPassword">
              <el-input v-model="passwordForm.oldPassword" type="password" autocomplete="off" placeholder="Please enter your Old Password"
                        show-password :input-style=color>
                <template #prefix>
                  <el-icon><Lock/></el-icon>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item prop="newPassword" >
              <el-input v-model="passwordForm.newPassword" type="password" autocomplete="off" placeholder="Please enter your New Password"
                        show-password :input-style=color>
                <template #prefix>
                  <el-icon><Lock/></el-icon>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item prop="passwordCheck">
              <el-input v-model="passwordForm.passwordCheck" type="password" autocomplete="off" placeholder="Please enter your New Password again"
                        show-password :input-style=color>
                <template #prefix>
                  <el-icon><Lock/></el-icon>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item prop="verification">
              <el-input v-model="passwordForm.verification" type="text" autocomplete="off" placeholder="Please enter your verification code" :input-style=color>
                <template #prefix>
                  <el-icon><Checked /></el-icon>
                </template>
                <template #append>
                  <el-icon class="cursor-pointer" @click="sendChangePasswordVerificationCode(passwordRef)"><Promotion /></el-icon>
                </template>
              </el-input>
            </el-form-item>
          </el-form>

          <button
              @click="changeSystemUserPassword(passwordRef)"
              id="submit-button"
              class="mb-2 w-32 text-white p-2 rounded-lg shadow-lg transition transform hover:scale-105 flex">
            <span class="text-center flex-grow commit">Update profile</span>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, reactive, ref, watch } from 'vue'

import { useAppStore } from "@/stores/app"
import { useUserStore } from "@/stores/user"
import { usePasswordStore } from "@/stores/password"
import { useRouter } from "vue-router"

import type { FormInstance } from 'element-plus'
import { ElMessage, ElNotification } from "element-plus"

import emailApi from "@/api/email"
import userApi from "@/api/user"


export default defineComponent({
  name: 'PasswordModel',
  setup() {
    const appStore = useAppStore()
    const userStore = useUserStore()
    const passwordStore = usePasswordStore()
    const router = useRouter()
    const openModel = ref(false)
    const openPasswordContainer = ref(false)
    const searchResults = ref<any>([1, 2])
    const color = ref("")

    const passwordRef = ref<FormInstance>()
    const passwordForm = reactive({
      oldPassword: '',
      newPassword: '',
      passwordCheck: '',
      verification: ''
    })

    const passwordCheck = (rule: any, value: any, callback: any) => {
      if(passwordForm.newPassword === '') {
        callback(new Error('Please input the password before entering this field'))
      }else if (value !== passwordForm.newPassword) {
        callback(new Error("Password does not match"))
      }else {
        callback()
      }
    }

    const passwordRules = reactive({
      oldPassword: [
        {required: true, message: 'Please input the password', trigger: 'change'},
        {
          pattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$',
          message: 'Please include example characters(A, a, 1, #), between 8 - 16',
          trigger: 'change'
        }
      ],
      newPassword: [
        {required: true, message: 'Please input the password', trigger: 'change'},
        {
          pattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$',
          message: 'Please include example characters(A, a, 1, #), between 8 - 16',
          trigger: 'change'
        }
      ],
      passwordCheck: [
        {required: true, message: 'Please input the password again', trigger: 'change'},
        {validator: passwordCheck, trigger: 'change'}
      ],
      verification: [
        {required: true, message: 'Please input the verification code', trigger: 'change'},
        {min: 6, message: 'Password length should be 6', trigger: 'change'},
        {max: 6, message: 'Password length should be 6', trigger: 'change'}
      ]
    })

    onMounted(() => {
      if(appStore.themeConfig.theme === "theme-dark") {
        color.value = "color: #fff"
      }else {
        color.value = "color: #000"
      }
    })

    onUnmounted(() => {
      document.body.classList.remove('modal--active')
    })

    watch(() => passwordStore.openModel, (status: any) => {
          openModel.value = status

          setTimeout(() => {
            openPasswordContainer.value = status
          }, 200)
        }
    )

    watch(() => appStore.themeConfig.theme, () => {
          if(appStore.themeConfig.theme === "theme-dark") {
            color.value = "color: #fff"
          }else {
            color.value = "color: #000"
          }
        }
    )

    const closeModel = (status: boolean) => {
      passwordStore.setOpenModel(status)
      passwordForm.oldPassword = ''
      passwordForm.newPassword = ''
      passwordForm.passwordCheck = ''
      passwordForm.verification = ''
    }

    const sendChangePasswordVerificationCode = () => {
      emailApi.sendChangePasswordVerificationCode(userStore.userInfo.email)
          .then((response) => {
            ElMessage.success(response.data.message)
          })
    }

    const changeSystemUserPassword = (formEl: FormInstance | undefined) => {
      if(!formEl) return

      formEl.validate((valid) => {
        if(valid) {
          userApi.updateSystemUserPassword({
            "email": userStore.userInfo.email,
            "oldPassword": passwordForm.oldPassword,
            "newPassword": passwordForm.newPassword,
            "verification": passwordForm.verification
          })
              .then((response) => {
                passwordStore.setOpenModel(false)

                ElNotification({
                  title: 'Success',
                  message: 'Successfully updated password',
                  type: 'success',
                  duration: 1500
                })
              })
        } else {
          return false
        }
      })
    }

    const handleLinkClick = (result: any) => {
      router.push({ path: '/' + result.type + '/' + result.id })
      passwordStore.setOpenModel(false)
    }

    return {
      openModel: computed(() => openModel.value),
      openPasswordContainer: computed(() => openPasswordContainer.value),
      closeModel,
      handleLinkClick,
      searchResults,
      color,
      passwordRef,
      passwordForm,
      passwordRules,
      sendChangePasswordVerificationCode,
      changeSystemUserPassword
    }
  }
})
</script>

<style lang="scss" scoped>
#submit-button {
  outline: none;
  background: var(--button-green);
}
</style>
