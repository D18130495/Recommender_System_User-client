<template>
  <div>
    <div id="page" class="site">
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
import { defineComponent } from "vue"

import 'remixicon/fonts/remixicon.css'
import '../../src/styles/components/auth.scss'


export default defineComponent({
  name: 'Authentication',
  methods: {
    showSignUp() {
      document.querySelector('.site').className = 'site signup-show';
    },
    showSignIn() {
      document.querySelector('.site').className = 'site signin-show';
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
