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
                <li><a href="#0"><i class="ri-arrow-left-line"></i></a></li>
                <li>Don't have an account?<a href="#0" class="t-signup" @click="showSignUp">Sign Up</a></li>
              </ul>
            </nav>

            <div class="heading">
              <h2>Sign In</h2>
              <p>We secure your data privacy encrypted.</p>
            </div>

            <form action="">
              <p>
                <i class="ri-mail-line"></i>
                <input type="email" placeholder="Your email address">
              </p>
              <p>
                <i class="ri-lock-line"></i>
                <i class="ri-eye-off-line"></i>
                <input type="password" placeholder="Enter password">
              </p>
              <div class="actions">
                <label>
                  <input type="submit" value="Sign In">
                  <i class="ri-arrow-right-line"></i>
                </label>
                <p>Or</p>
                <p class="socials">
                  <button @click="login"><i class="ri-google-line"></i></button>
                </p>
              </div>
            </form>
          </div>

          <div class="signup">
            <nav>
              <ul>
                <li><a href="#0"><i class="ri-arrow-left-line"></i></a></li>
                <li>Already member?<a href="#0" class="t-signin"  @click="showSignIn">Sign In</a></li>
              </ul>
            </nav>

            <div class="heading">
              <h2>Sign Up</h2>
              <p>We secure your data privacy encrypted.</p>
            </div>

            <form action="">
              <p>
                <i class="ri-user-3-line"></i>
                <input type="text" placeholder="Full Name">
              </p>
              <p>
                <i class="ri-mail-line"></i>
                <input type="email" placeholder="Your email address">
              </p>
              <p>
                <i class="ri-lock-line"></i>
                <i class="ri-eye-off-line"></i>
                <input type="password" placeholder="Enter password">
              </p>
              <p>
                <i class="ri-lock-line"></i>
                <i class="ri-eye-off-line"></i>
                <input type="password" placeholder="Re-Enter password">
              </p>
              <div class="actions">
                <label>
                  <input type="submit" value="Sign Up">
                  <i class="ri-arrow-right-line"></i>
                </label>
                <p>Or</p>
                <p class="socials">
                  <button><i class="ri-google-line"></i></button>
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
import {computed, defineComponent, onMounted, ref} from 'vue'

import { googleTokenLogin, googleOneTap } from 'vue3-google-login'

import axios from "axios"
import userApi from '@/api/user'

import 'remixicon/fonts/remixicon.css'


export default defineComponent({
  name: 'Authentication',
  setup() {
    const siteStyle = ref({ 'padding': '200px 0' })
    const authForm:any = ref(null)
    const userInfo = {
      'email': ''
    }
    let siteClass = 'site'

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

    const login = () => {
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
        userInfo.email = response.data.email

        sendUserDetail()
      })
    }

    const sendUserDetail = () => {
      userApi.login(userInfo)
          .then((response) => {
            console.log(response.data)
          })
    }

    return {
      siteClass,
      siteStyle: computed(() => siteStyle.value),
      authForm,
      showSignIn,
      showSignUp,
      login
    }
  }
})
</script>
