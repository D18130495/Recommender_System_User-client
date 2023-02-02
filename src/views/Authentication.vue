<template>
  <div>
    <div id="page" :class="[siteClass]" :style="siteStyle">
      <div class="auth-container">
        <div class="authform"  ref="authForm">
          <div class="play">
            <div class="wrapper">
              <div class="card one"></div>
              <div class="card two"></div>
              <div class="card three"></div>
              <div class="card four"></div>
              <div class="card five"></div>
            </div>
          </div>

          <div class="signin">
            <nav>
              <ul>
                <li><a href="#" @click="goBack"><el-icon><Back/></el-icon></a></li>
                <li>Don't have an account?<a class="t-signup" @click="showSignUp">Sign Up</a></li>
              </ul>
            </nav>

            <div class="heading">
              <h2>Sign In</h2>
            </div>

            <form action="">
              <el-form label-position="top" size="large" ref="signInRef" :model="signInForm" :rules="signInRules" status-icon>
                <el-form-item label="Email" prop="email">
                  <el-input v-model="signInForm.email" type="email" autocomplete="off" placeholder="Please enter your Email Address">
                    <template #prefix>
                      <el-icon><Message/></el-icon>
                    </template>
                  </el-input>
                </el-form-item>

                <el-form-item label="Password" prop="password" >
                  <el-input v-model="signInForm.password" type="password" autocomplete="off" placeholder="Please enter your Password" show-password>
                    <template #prefix>
                      <el-icon><Lock/></el-icon>
                    </template>
                  </el-input>
                </el-form-item>
              </el-form>

              <div class="actions">
                <label>
                  <input type="button" value="Sign In" @click="systemSignIn(signInRef)"/>
                  <el-icon><Right/></el-icon>
                </label>
                <p>Or</p>
                <p class="socials">
                  <button type="button" @click="googleLogin"><i class="ri-google-line"></i></button>
                </p>
              </div>
            </form>
          </div>

          <div class="signup">
            <nav>
              <ul>
                <li><a href="#" @click="goBack"><i class="ri-arrow-left-line"></i></a></li>
                <li>Already member?<a class="t-signin" @click="showSignIn">Sign In</a></li>
              </ul>
            </nav>

            <div class="heading">
              <h2>Sign Up</h2>
            </div>

            <form action="">
              <el-form size="large" ref="signUpRef" :model="signUpForm" :rules="signUpRules" status-icon>
                <el-form-item prop="username">
                  <el-input v-model="signUpForm.username" type="text" autocomplete="off" placeholder="Please enter your Full Name">
                    <template #prefix>
                      <el-icon><User/></el-icon>
                    </template>
                  </el-input>
                </el-form-item>

                <el-form-item prop="email">
                  <el-input v-model="signUpForm.email" type="email" autocomplete="off" placeholder="Please enter your Email Address">
                    <template #prefix>
                      <el-icon><Message/></el-icon>
                    </template>
                  </el-input>
                </el-form-item>

                <el-form-item prop="password">
                  <el-input v-model="signUpForm.password" type="password" autocomplete="off" placeholder="Please enter your Password" show-password>
                    <template #prefix>
                      <el-icon><Lock/></el-icon>
                    </template>
                  </el-input>
                </el-form-item>

                <el-form-item prop="passwordCheck">
                  <el-input v-model="signUpForm.passwordCheck" type="password" autocomplete="off" placeholder="Please enter your Password again" show-password>
                    <template #prefix>
                      <el-icon><Lock/></el-icon>
                    </template>
                  </el-input>
                </el-form-item>
              </el-form>

              <div class="actions">
                <label>
                  <input type="button" value="Sign Up" @click="userSystemRegister(signUpRef)">
                  <el-icon><Right/></el-icon>
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from 'vue'

import { googleTokenLogin, googleOneTap } from 'vue3-google-login'
import { useRouter } from 'vue-router'
import type { FormInstance } from 'element-plus'
import {ElMessage} from "element-plus/es";

import { useUserStore } from '@/stores/user'
import cookies from 'js-cookie'

import axios from "axios"
import userApi from '@/api/user'

import 'remixicon/fonts/remixicon.css'


export default defineComponent({
  name: 'Authentication',
  setup() {
    const userStore = useUserStore()
    const router = useRouter()
    const siteStyle = ref({ 'padding': '200px 0' })
    const authForm:any = ref(null)
    const userInfo = reactive({
      username: '' as any,
      email: '' as any,
      avatar: '' as any
    })
    let siteClass = 'site'

    let seconds = 3600
    let expires = new Date(new Date().getTime() + seconds * 1000)

    const signInRef = ref<FormInstance>()
    const signInForm = reactive({
      email: '',
      password: ''
    })

    const signInRules = reactive({
      email: [
        { required: true, message: 'Please input the email address', trigger: 'blur' },
        { pattern: '^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$', message: 'Please input valid email address', trigger: 'blur'}
      ],
      password: [
        { required: true, message: 'Please input the password', trigger: 'blur' },
        { min: 6, message: 'Password length should between 6 to 14', trigger: 'blur'},
        { max: 14, message: 'Password length should between 6 to 14', trigger: 'blur'}
      ]
    })

    const signUpRef = ref<FormInstance>()
    const signUpForm = reactive({
      username: '',
      email: '',
      password: '',
      passwordCheck: ''
    })

    const passwordCheck = (rule: any, value: any, callback: any) => {
      if(signUpForm.password === '') {
        callback(new Error('Please input the password before entering this field'))
      }else if(value !== signUpForm.password) {
        callback(new Error("Password does not match"))
      }else {
        callback()
      }
    }

    const signUpRules = reactive({
      username: [
        { required: true, message: 'Please input the full name', trigger: 'blur' },
        { min: 4, message: 'Username should at least have 4 characters', trigger: 'blur'}
      ],
      email: [
        { required: true, message: 'Please input the email address', trigger: 'blur' },
        { pattern: '^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$', message: 'Please input valid email address', trigger: 'blur'}
      ],
      password: [
        { required: true, message: 'Please input the password', trigger: 'blur' },
        { min: 6, message: 'Password length should between 6 to 14', trigger: 'blur'},
        { max: 14, message: 'Password length should between 6 to 14', trigger: 'blur'}
      ],
      passwordCheck: [
        { required: true, message: 'Please input the password again', trigger: 'blur' },
        { min: 6, message: 'Password length should between 6 to 14', trigger: 'blur'},
        { max: 14, message: 'Password length should between 6 to 14', trigger: 'blur'},
        { validator: passwordCheck, trigger: 'blur' }
      ]
    })

    onMounted(() => {
      const authFormHeight = authForm.value.offsetHeight

      initialApp(authFormHeight)
    })

    const initialApp = (authFormHeight: any) => {
      let pageHeight = innerHeight

      if(typeof authFormHeight === 'number') {
        pageHeight = (pageHeight - authFormHeight) / 2
      }

      siteStyle.value = {
        'padding': pageHeight + 'px 0'
      }

      // googlePrompt()
    }

    const goBack = () => {
      router.back()
    }

    const showSignUp = () => {
      document.querySelector('.site')!.className = 'site signup-show';
    }

    const showSignIn = () => {
      document.querySelector('.site')!.className = 'site signin-show';
    }

    const googlePrompt = () => {
      googleOneTap()
          .then((response) => {
            console.log("Handle the response", response)
          })
          .catch((error) => {
            console.log("Handle the error", error)
          })
    }

    const systemSignIn = (formEl: FormInstance | undefined) => {
      if(!formEl) return

      formEl.validate((valid) => {
        if(valid) {
          userApi.userSystemLogin({'email':signInForm.email, 'password':signInForm.password})
              .then((response) => {
                userStore.userInfo = response.data.data
                userStore.token = response.data.data.token
                sessionStorage.setItem('token', response.data.data.token)
                cookies.set('token', response.data.data.token, { expires: expires })

                ElMessage.success(response.data.message)

                if(userStore.userInfo.policy === "U") {
                  userStore.drawer = true
                }

                router.back()
              })
        }else {
          return false
        }
      })
    }

    const userSystemRegister = (formEl: FormInstance | undefined) => {
      if(!formEl) return

      formEl.validate((valid) => {
        if(valid) {
          userApi.userSystemRegister({'username': signUpForm.username, 'email':signUpForm.email, 'password': signUpForm.password})
              .then((response) => {
                userStore.userInfo = response.data.data
                userStore.token = response.data.data.token
                sessionStorage.setItem('token', response.data.data.token)
                cookies.set('token', response.data.data.token, { expires: expires })

                ElMessage.success(response.data.message)

                if(userStore.userInfo.policy === "U") {
                  userStore.drawer = true
                }

                setTimeout(function () {
                  router.back()
                }, 3000)
              })
        }else {
          return false
        }
      })
    }

    const googleLogin = () => {
      googleTokenLogin()
          .then((response) => {
            getGoogleUserDetail(response.access_token)
          })
    }

    const getGoogleUserDetail = (accessToken: string) => {
      axios({
        url: "https://www.googleapis.com/oauth2/v1/userinfo",
        method: "get",
        params: {
          "alt": "json",
          "access_token": accessToken
        }
      }).then(response => {
        userInfo.username = response.data.name
        userInfo.email = response.data.email
        userInfo.avatar = response.data.picture

        sendUserDetail()
      })
    }

    const sendUserDetail = () => {
      userApi.googleLogin(userInfo)
          .then((response) => {
            userStore.userInfo = response.data.data
            userStore.token = response.data.data.token
            sessionStorage.setItem('token', response.data.data.token)
            cookies.set('token', response.data.data.token, { expires: expires })

            ElMessage.success(response.data.message)

            if(userStore.userInfo.policy === "U") {
              userStore.drawer = true
            }

            router.back()
          })
    }

    return {
      siteClass,
      siteStyle: computed(() => siteStyle.value),
      authForm,
      showSignIn,
      showSignUp,
      systemSignIn,
      userSystemRegister,
      googleLogin,
      goBack,
      signInForm,
      signUpForm,
      signInRules,
      signUpRules,
      signInRef,
      signUpRef
    }
  }
})
</script>

<style lang="scss" scoped>
a:hover {
  cursor: pointer;
}
</style>
