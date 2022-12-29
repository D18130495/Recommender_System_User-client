<template>
  <div>
    <div id="page" :class="[siteClass]" :style="siteStyle">
      <div class="auth-container">
        <div class="authform">
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
                  <button><i class="ri-google-line"></i></button>
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
import { computed, defineComponent, onBeforeMount, onUnmounted, ref } from 'vue'
import 'remixicon/fonts/remixicon.css'


export default defineComponent({
  name: 'Authentication',
  setup() {
    const siteStyle = ref({ 'padding': '200px 0' })
    let siteClass = 'site'

    onBeforeMount(() => {
      initialApp()
    })

    const initialApp = () => {
      let pageHeight = innerHeight
      const authForm = document.getElementById('authform')
      const authFormHeight = authForm?.clientHeight

      pageHeight = (pageHeight - authFormHeight!) / 2

      siteStyle.value = {
        'padding': pageHeight + 'px 0'
      }
    }

    const showSignUp = () => {
      document.querySelector('.site')!.className = 'site signup-show';
    }

    const showSignIn = () => {
      document.querySelector('.site')!.className = 'site signin-show';
    }

    return {
      siteClass,
      siteStyle: computed(() => siteStyle.value),
      showSignIn,
      showSignUp
    }
  }
})
</script>
