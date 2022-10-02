<script setup lang="ts">
  import { reset } from '@formkit/core'
  import autoAnimate from '@formkit/auto-animate'
  import { useSupabaseUserStore } from '~~/stores/userSupaStore'
  import { emailRegister, providerLogin } from '@/composables/useSupabase'

  const userStore = useSupabaseUserStore()
  // const client = useSupabaseClient()

  // --- auto animate form ---
  const ccform = ref()

  onMounted(() => {
    ccform.value.querySelectorAll('.formkit-outer').forEach(autoAnimate)
  })

  // --- FormKit styles ---
  const formStyles = ref({
    // outer: 'mb-5',
    // label: 'block mb-1 font-bold text-xl text-gray-500',
    // inner: 'w-full border-b border-gray-900 mb-1 overflow-hidden focus-within:border-ct-blue-500',
    input:
      '$reset block border border-grey-light w-full p-3 rounded text-gray-500',
    // message: 'text-xs text-red-500 font-light'
  })

  const isLoading = ref(false)
  const emit = defineEmits(['registerEvent'])

  const checkLoginStatus = () => {
    if (userStore.email && userStore.confirmed) {
      reset('registration')
      emit('registerEvent', 'registration', 'success')
      return navigateTo('/')
    }

    if (userStore.email && !userStore.confirmed) {
      reset('registration')
      emit('registerEvent', 'registration', 'success')
      return navigateTo('/verify')
    }

    if (userStore.error !== '') {
      if (userStore.error === 'Email not confirmed') {
        emit('registerEvent', 'registration', userStore.getError)
        return navigateTo('/verify')
      } else {
        emit('registerEvent', 'registration', userStore.getError)
        return navigateTo('/')
      }
    }
  }

  const handleProviderLogin = async (
    provider: 'github' | 'google' | 'apple' | 'discord',
  ) => {
    isLoading.value = true
    await providerLogin(provider)
    userStore.authModalOff()
    reset('register')
    isLoading.value = false
    checkLoginStatus()
  }

  // --- Supabase Auth ---

  const handleSignup = async (value: { email: string; password: string }) => {
    isLoading.value = true
    await emailRegister(value)
    userStore.authModalOff()
    reset('register')
    isLoading.value = false
    checkLoginStatus()
  }
</script>

<template>
  <div
    ref="ccform"
    class="mx-auto grid grid-cols-1 justify-items-center pt-10 lg:w-96">
    <div v-if="false">
      <button
        aria-label="Continue with google"
        role="button"
        class="mb-10 flex items-center rounded-lg border border-gray-700 bg-white py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-1 lg:w-80"
        @click="handleProviderLogin('google')">
        <div class="mx-auto flex items-center">
          <svg
            width="19"
            height="20"
            viewBox="0 0 19 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z"
              fill="#4285F4" />
            <path
              d="M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z"
              fill="#34A853" />
            <path
              d="M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z"
              fill="#FBBC05" />
            <path
              d="M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z"
              fill="#EB4335" />
          </svg>
          <p class="ml-4 text-base font-medium text-gray-700">
            Log in with Google
          </p>
        </div>
      </button>

      <div class="text-2xl font-semibold">
        <p>OR</p>
      </div>
      <hr class="mx-auto mb-8 flex w-60 lg:w-80" />
    </div>

    <FormKit
      id="registration"
      type="form"
      form-class="lg:w-96"
      submit-label="Register"
      :actions="false"
      @submit="handleSignup">
      <h1 class="mb-4 text-center text-xl font-semibold text-gray-300">
        Register Now For Free!
      </h1>
      <FormKit
        type="email"
        prefix-icon="email"
        name="email"
        label="Your email"
        validation="required|email"
        :classes="formStyles" />
      <div class="double">
        <FormKit
          type="password"
          prefix-icon="hidden"
          name="password"
          label="Password"
          validation="required|length:6|matches:/[^a-zA-Z]/"
          :validation-messages="{
            matches: 'Please include at least one symbol',
          }"
          :classes="formStyles" />
        <FormKit
          type="password"
          prefix-icon="hidden"
          name="password_confirm"
          label="Confirm password"
          validation="required|confirm"
          :classes="formStyles" />
      </div>

      <!-- submit button -->
      <div class="mt-5">
        <FormKit
          type="submit"
          label="Register"
          input-class="$reset btn btn-info btn-block mt-4"
          @submit.prevent="handleSignup" />
      </div>
    </FormKit>
    <!-- Message for success or error -->
    <div class="mb-5 h-5">
      <div
        v-show="isLoading"
        class="mx-auto grid w-96 grid-cols-1 justify-items-center">
        <progress class="progress progress-info mt-3 w-56" />
      </div>
    </div>
  </div>
</template>
