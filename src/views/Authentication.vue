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
                <li>Don't have an account?<a href="#" class="t-signup" @click="showSignUp">Sign Up</a></li>
              </ul>
            </nav>

            <div class="heading">
              <h2>Sign In</h2>
            </div>

            <form action="">
              <el-form label-position="top" size="large" ref="ruleFormRef" :model="loginForm" :rules="loginRules">
                <el-form-item label="Email" prop="email">
                  <el-input v-model="loginForm.email" type="email" autocomplete="off" placeholder="Please enter your Email Address">
                    <template #prefix>
                      <el-icon><Message/></el-icon>
                    </template>
                  </el-input>
                </el-form-item>

                <el-form-item label="Password" prop="password">
                  <el-input v-model="loginForm.password" type="password" autocomplete="off" placeholder="Please enter your Password">
                    <template #prefix>
                      <el-icon><Lock/></el-icon>
                    </template>
                  </el-input>
                </el-form-item>
              </el-form>
<!--              <p>-->
<!--                <i class="ri-mail-line"></i>-->
<!--                <input type="email" placeholder="Your email address">-->
<!--              </p>-->
<!--              <p>-->
<!--                <i class="ri-lock-line"></i>-->
<!--                <i class="ri-eye-off-line"></i>-->
<!--                <input type="password" placeholder="Enter password">-->
<!--              </p>-->
              <div class="actions">
                <label>
                  <input type="button" value="Sign In" @click="systemLogin(ruleFormRef)"/>
                  <el-icon><Right/></el-icon>
                </label>
                <p>Or</p>
                <p class="socials">
                  <button @click="googleLogin"><i class="ri-google-line"></i></button>
                </p>
              </div>
            </form>
          </div>

          <div class="signup">
            <nav>
              <ul>
                <li><a href="#" @click="goBack"><i class="ri-arrow-left-line"></i></a></li>
                <li>Already member?<a href="#" class="t-signin" @click="showSignIn">Sign In</a></li>
              </ul>
            </nav>

            <div class="heading">
              <h2>Sign Up</h2>
            </div>

            <form action="">
              <el-form size="large">
                <el-form-item>
                  <el-input type="text" placeholder="Please enter your Full Name">
                    <template #prefix>
                      <el-icon><User/></el-icon>
                    </template>
                  </el-input>
                </el-form-item>

                <el-form-item>
                  <el-input type="email" placeholder="Please enter your Email Address">
                    <template #prefix>
                      <el-icon><Message/></el-icon>
                    </template>
                  </el-input>
                </el-form-item>

                <el-form-item>
                  <el-input type="password" placeholder="Please enter your Password">
                    <template #prefix>
                      <el-icon><Lock/></el-icon>
                    </template>
                  </el-input>
                </el-form-item>

                <el-form-item>
                  <el-input type="password" placeholder="Please enter your Password again">
                    <template #prefix>
                      <el-icon><Lock/></el-icon>
                    </template>
                  </el-input>
                </el-form-item>
              </el-form>

              <div class="actions">
                <label>
                  <input type="submit" value="Sign Up">
                  <el-icon><Right/></el-icon>
                </label>
                <p>Or</p>
                <p class="socials">
                  <button @click="googleLogin"><i class="ri-google-line"></i></button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, reactive, ref} from 'vue'

import { googleTokenLogin, googleOneTap } from 'vue3-google-login'
import { useRouter } from 'vue-router'
import type { FormInstance } from 'element-plus'

import { useUserStore } from '@/stores/user'

import { ElMessage } from 'element-plus'

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

    const ruleFormRef = ref<FormInstance>()
    const loginForm = reactive({
      email: '',
      password: ''
    })

    const loginRules = reactive({
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
      router.push({ path: '/' })
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

    const systemLogin = (formEl: FormInstance | undefined) => {
      if (!formEl) return

      formEl.validate((valid) => {
        if (valid) {
          console.log('submit!')
        } else {
          console.log('error submit!')
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
      userApi.login(userInfo)
          .then((response) => {
            userStore.userInfo = response.data.data

            router.push({ path: '/' })
          })
          .catch((error) => {
            ElMessage.error('error')
          })
    }

    return {
      siteClass,
      siteStyle: computed(() => siteStyle.value),
      authForm,
      showSignIn,
      showSignUp,
      systemLogin,
      googleLogin,
      goBack,
      loginForm,
      loginRules,
      ruleFormRef
    }
  }
})
</script>
