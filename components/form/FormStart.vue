<script setup lang="ts">
  import { POSITION, useToast } from 'vue-toastification'

  // --- tabs ---
  const logInTab = ref(true)
  const signUpTab = ref(false)

  const toggleTabs = (tab: string) => {
    if (tab === 'signUp') {
      logInTab.value = false
      signUpTab.value = true
    }
    if (tab === 'logIn') {
      logInTab.value = true
      signUpTab.value = false
    }
  }

  // --- toast ---
  const toast = useToast()

  const toastAuth = (origin: string, result: string) => {
    if (result === 'success') {
      toast.success(`${origin} Successful`, {
        timeout: 3500,
        position: POSITION.BOTTOM_CENTER,
      })
    } else {
      toast.error(`${origin} Failed: ${result}`, {
        timeout: false,
        position: POSITION.BOTTOM_CENTER,
      })
    }
  }
</script>

<template>
  <div>
    <div class="w-79 mx-auto grid grid-cols-1 justify-items-center pt-5">
      <div class="tabs">
        <a
          class="tab tab-lifted"
          :class="{ 'tab-active': signUpTab }"
          @click="toggleTabs('signUp')">
          Sign Up
        </a>
        <a
          class="tab tab-lifted"
          :class="{ 'tab-active': logInTab }"
          @click="toggleTabs('logIn')">
          Log IN
        </a>
      </div>
      <FormRegister v-if="signUpTab" @register-event="toastAuth" />
      <FormLogin v-if="logInTab" @login-event="toastAuth" />
    </div>
  </div>
</template>

<style scoped></style>
