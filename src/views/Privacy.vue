<template>
  <div>
    <title>Privacy & Policy</title>
    <ul class="separator flex flex-row gap-6 text-white">
      <li style="cursor: pointer" @click="toHome()">Home</li>
      <li style="cursor: pointer">Privacy</li>
    </ul>

    <div class="flex flex-col">
      <div class="privacy-header">
        <h1 class="privacy-title text-white uppercase">
          Privacy Policy
        </h1>
      </div>

      <div class="bg-ob-deep-800 px-14 py-16 rounded-2xl shadow-xl block">
        <div class="notice-head">
          <h2 class="text-ob-bright">Finterest Privacy Notice</h2>
          <p class="mt-4 text-ob-bright">
            We know that you care how information about you is used and shared, and we appreciate your trust that we will do so carefully and sensibly.<br>
            This Privacy Notice describes how Finterest collect and process your personal information through Finterest websites, and services that reference this Privacy Notice.<br>
            By using the Finterest Services, you are consenting to the practices described in this Privacy Notice.</p>
        </div>
        <div class="notice-body">
          <h2 class="mt-12 text-xl text-ob-bright">What Personal Information About Users Does Finterest Collect?</h2>
          <p class="mt-4 text-ob-bright">
            We collect your personal information in order to provide the recommendation service.<br>
            Here are the types of personal information we collect:
          </p>
          <ul class="mt-4">
            <li>
              <p class="text-ob-bright font-bold">1. The information you give us:</p>
              <p class="text-ob-bright">
                We receive and store any information you provide in relation to Finterest service.<br>
                The data are mainly include rating and like for different categories items for conduct the recommendation purpose.
              </p>
            </li>
            <li class="mt-2">
              <p class="text-ob-bright font-bold">2. The information other platform give us:</p>
              <p class="text-ob-bright">
                We receive and store any information from other platform provide with your permission.<br>
                The data from third platform provide with your permission like Google login will collect and store.
              </p>
            </li>
          </ul>

          <!-- cookie -->
          <h2 class="mt-12 text-xl text-ob-bright">What About Cookies?</h2>
          <p class="mt-4 text-ob-bright">
            We use cookies to recognize your browser or device to enhance user experience.
          </p>
          <ul class="mt-4">
            <li>
              <p class="text-ob-bright font-bold">1. Finterest theme:</p>
              <p class="text-ob-bright">
                We use cookie to manage Finterest theme.<br>
                Remember your last time preference for the theme chosen to enhance your experience.</p>
            </li>
            <li class="mt-2">
              <p class="text-ob-bright font-bold">2. Access token and auto login:</p>
              <p class="text-ob-bright">
                We use cookie to manage your authenticate state.<br>
                Remember your login certification(JWT) to facilitate authentication and resource access control.
              </p>
            </li>
          </ul>

          <!-- access -->
          <h2 class="mt-12 text-xl text-ob-bright">What Information Can I Access?</h2>
          <p class="mt-4 text-ob-bright">
            You can access your information, including your profile information in your account settings and your history system interaction data(rating or like).
            <a class="text-blue-600" style="cursor: pointer" @click="toProfile">Require your data</a> in the profile page.
          </p>

          <!-- GDPR -->
          <h2 class="mt-12 text-xl text-ob-bright">What GDPR terms are mainly applied?</h2>
          <p class="mt-4 text-ob-bright">Chapter 3(Rights of the data subject) of the GDPR lays out the data privacy rights and principles that all “natural persons” are guaranteed under EU law.<br>
            Articles 13 & 14 present the actions when collecting personal data, and Article 15 presents the right to access.
          </p>
          <div class="mt-3">
            <p class="text-ob-bright">Chapter 3 Art. 13 GDPR:
              <a href="https://gdpr-info.eu/art-13-gdpr/" target="_blank" class="text-blue-600">Information to be provided where personal data are collected from the data subject</a>
            </p>
            <p class="text-ob-bright">Chapter 3 Art. 14 GDPR:
              <a href="https://gdpr-info.eu/art-13-gdpr/" target="_blank" class="text-blue-600">Information to be provided where personal data have not been obtained from the data subject</a>
            </p>
            <p class="text-ob-bright">Chapter 3 Art. 15 GDPR:
              <a href="https://gdpr-info.eu/art-13-gdpr/" target="_blank" class="text-blue-600">Right of access by the data subject</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import { useRouter } from "vue-router"


export default defineComponent({
  name: 'Privacy',
  setup() {
    const router = useRouter()

    const toHome = () => {
      router.push({ path: '/' })
    }

    const toProfile = () => {
      router.push({ path: '/profile' })
    }

    return {
      toHome,
      toProfile
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
</style>
