<template>
  <div>
    <title>Terms of Service</title>
    <ul class="separator flex flex-row gap-6 text-white">
      <li style="cursor: pointer" @click="toHome()">Home</li>
      <li style="cursor: pointer">Service</li>
    </ul>

    <div class="flex flex-col">
      <div class="privacy-header">
        <h1 class="privacy-title text-white uppercase">
          terms of service
        </h1>
      </div>

      <div class="bg-ob-deep-800 px-14 py-16 rounded-2xl shadow-xl block">
        <div class="notice-head">
          <h2 class="text-ob-bright">Finterest terms of service</h2>
          <p class="mt-4 text-ob-bright">
            Welcome to Finterest. This agreement is a contract between the service provider and the user.
            <br>Please read all of the terms and conditions carefully.
            By using our service, you agree to be bound by the following terms and conditions.
          </p>

          <h2 class="mt-12 text-xl text-ob-bright">Service Description:</h2>
          <p class="mt-4 text-ob-bright">
            Finterest provides movie and book recommendation service.
            <br>Recommendation will across different categories, and base on your like and rate data to decided the recommendation method.
            <br>Finterest stand for find your interest, aim to help different people find the items they may interested across different categories.
            <br>
            <br>We reserve the right to modify or discontinue our service at any time without prior notice.
          </p>
        </div>

        <div class="notice-body ml-8">
          <h2 class="mt-12 text-xl text-ob-bright">1. Use of Service:</h2>
          <p class="mt-4 text-ob-bright">
            You agree to use our Services only for lawful purposes and by these terms and conditions. You may not use our services for any illegal or unauthorised purpose or in any manner that could damage, disable, overburden or impair our services.
          </p>

          <h2 class="mt-12 text-xl text-ob-bright">2. User Account:</h2>
          <p class="mt-4 text-ob-bright">
            You may need to create an account to use our Services. When you create an account, you must provide accurate and complete information, and you are solely responsible for maintaining the confidentiality of your account and password.
          </p>

          <h2 class="mt-12 text-xl text-ob-bright">3. Intellectual Property:</h2>
          <p class="mt-4 text-ob-bright">
            The content, organisation, graphics, design, compilation and other matters related to our Services are protected by applicable copyrights, trademarks and other proprietary rights. You may not copy, distribute or modify any part of our Services without our prior written consent.
          </p>

          <h2 class="mt-12 text-xl text-ob-bright">4. Termination:</h2>
          <p class="mt-4 text-ob-bright">
            We may terminate or suspend access to our Services immediately, without notice or liability, for any reason, including, but not limited to, your breach of these terms and conditions.
          </p>

          <h2 class="mt-12 text-xl text-ob-bright">5. Disclaimer:</h2>
          <p class="mt-4 text-ob-bright">
            Our Services are provided on an "as is" and "as available" basis. We disclaim all warranties, express or implied, and at this moment disclaim and negate all other warranties, including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property rights or other infringements.
          </p>

          <h2 class="mt-12 text-xl text-ob-bright">6. Limitation of Liability:</h2>
          <p class="mt-4 text-ob-bright">
            In no event shall we be liable for any damages of any kind (including, without limitation, loss of data or profits or damages due to business interruption) arising out of the use of, or inability to use, our services, even if we have been advised of such damages possibility.
          </p>

          <h2 class="mt-12 text-xl text-ob-bright">7. Governing Law:</h2>
          <p class="mt-4 text-ob-bright">
            This Agreement shall be governed by and interpreted by the laws of the location of the Service Provider, without any principles of conflict of laws.
          </p>

          <h2 class="mt-12 text-xl text-ob-bright">8. Modification:</h2>
          <p class="mt-4 text-ob-bright">
            We reserve the right to modify or replace these terms and conditions. It is your responsibility to check these terms and conditions periodically for changes.
          </p>
        </div>

        <p class="mt-12 text-ob-bright">
          By using our service, you agree to be bound by these terms and conditions. If you do not agree to these terms and conditions, you should not use our service.
        </p>
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
