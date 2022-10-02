<!-- eslint-disable no-console -->
<script setup lang="ts">
  import autoAnimate from '@formkit/auto-animate'
  import { reset } from '@formkit/core'
  import { POSITION, useToast } from 'vue-toastification'
  import { useSupabaseUserStore } from '~~/stores/userSupaStore'

  // const emit = defineEmits(['update:path', 'upload'])
  const userStore = useSupabaseUserStore()
  const client = useSupabaseClient()
  const isLoading = ref(false)
  const toast = useToast()
  const editProfile = ref(false)

  const username = ref('')
  const firstName = ref('')
  const lastName = ref('')
  const initials = ref('')
  const description = ref('')
  const avatarPath = ref('')
  const avatarUrl = ref('')
  const currentAvatar = ref('')
  const files = ref()

  // --- auto animate form ---
  const pform = ref()

  onMounted(() => {
    pform.value.querySelectorAll('.formkit-outer').forEach(autoAnimate)
  })

  // --- FormKit styles ---
  const formStyles = ref({
    // outer: 'mx-2',
    // label: 'block mb-1 font-bold text-xl text-gray-500',
    // inner: 'w-full border-b border-gray-900 mb-1 overflow-hidden focus-within:border-ct-blue-500',
    input:
      '$reset block border border-grey-light w-full p-3 rounded text-gray-500',
    // message: 'text-xs text-red-500 font-light'
  })

  const getData = async () => {
    try {
      isLoading.value = true
      const user = useSupabaseUser()
      const { data, error } = await client
        .from('profiles')
        .select(`username, avatar_url, first_name, last_name, description`)
        .eq('id', user.value.id)
        .single()
      if (data) {
        username.value = data.username
        firstName.value = data.first_name
        lastName.value = data.last_name
        initials.value = firstName.value
          .charAt(0)
          .concat(lastName.value.charAt(0))
        description.value = data.description
        avatarPath.value = data.avatar_url
      }
      if (error) throw error
    } catch (error) {
      toast.error(error.message, {
        timeout: false,
        position: POSITION.BOTTOM_CENTER,
      })
    } finally {
      isLoading.value = false
    }
  }

  const uploadNewImage = async (
    filePath: string,
    avatarImg:
      | string
      | ArrayBuffer
      | ArrayBufferView
      | Blob
      | Buffer
      | File
      | FormData
      | NodeJS.ReadableStream
      | ReadableStream<Uint8Array>
      | URLSearchParams,
  ) => {
    const { data, error: uploadError } = await client.storage
      .from('avatars')
      .upload(filePath, avatarImg)
    if (data) {
      avatarPath.value = filePath
      updateProfile()
      toast.success('Avatar was Successfuly set', {
        timeout: 7000,
        position: POSITION.BOTTOM_CENTER,
      })
    }
    if (uploadError) throw uploadError
  }

  const downloadImage = async () => {
    try {
      const { data, error } = await client.storage
        .from('avatars')
        .download(avatarPath.value)
      if (error) throw error
      avatarUrl.value = URL.createObjectURL(data)
    } catch (error) {
      console.log(error.message)
      if (error.message === 'The resource was not found') {
        toast.info('You have not set a profile avatar', {
          timeout: 7000,
          position: POSITION.BOTTOM_CENTER,
        })
      } else {
        toast.error(error.message, {
          timeout: false,
          position: POSITION.BOTTOM_CENTER,
        })
      }
    }
  }

  const updateImage = async (
    filePath: string,
    avatarImg:
      | string
      | ArrayBuffer
      | ArrayBufferView
      | Blob
      | Buffer
      | File
      | FormData
      | NodeJS.ReadableStream
      | ReadableStream<Uint8Array>
      | URLSearchParams,
  ) => {
    const { data, error: deleteError } = await client.storage
      .from('avatars')
      .remove([currentAvatar.value])
    if (data) {
      uploadNewImage(filePath, avatarImg)
    }
    if (deleteError) throw deleteError
  }

  const updateProfile = async () => {
    try {
      isLoading.value = true
      const user = useSupabaseUser()
      const updates = {
        id: user.value.id,
        username: username.value,
        first_name: firstName.value,
        last_name: lastName.value,
        description: description.value,
        avatar_url: avatarPath.value,
        updated_at: new Date(),
      }
      const { error } = await client.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })
      if (error) throw error
    } catch (error) {
      toast.error(error.message, {
        timeout: 7000,
        position: POSITION.BOTTOM_CENTER,
      })
    } finally {
      isLoading.value = false
    }
  }

  const uploadAvatar = async (data: { avatar }) => {
    isLoading.value = true
    files.value = data.avatar
    const user = useSupabaseUser()

    try {
      if (!files.value || files.value.length === 0) {
        throw new Error('You must select an image to upload.')
      }
      const avatarImg = files.value[0]
      const fileExt = avatarImg.name.split('.').pop()
      const fileName = `avatar${Math.floor(Math.random() * 10000)}.${fileExt}`
      const filePath = `${userStore.uid}/${fileName}`
      const { data, error } = await client
        .from('profiles')
        .select(`avatar_url`)
        .eq('id', user.value.id)
        .single()
      currentAvatar.value = data.avatar_url
      if (currentAvatar.value !== 'NULL') {
        // --- update photo ---
        console.log('--- update photo ---')
        updateImage(filePath, avatarImg.file)
      } else {
        // --- upload new photo ---
        console.log('--- upload new photo ---')
        uploadNewImage(filePath, avatarImg.file)
      }
      if (error) throw error
    } catch (error) {
      toast.error(error.message, {
        timeout: false,
        position: POSITION.BOTTOM_CENTER,
      })
    } finally {
      reset('avatar')
    }
  }

  getData()
  watch(avatarPath, () => {
    if (avatarPath.value) downloadImage()
  })
</script>

<template>
  <div>
    <div class="mx-5 lg:flex lg:justify-center">
      <div class="mx-10 mb-10">
        <ProfileCard>
          <template #avatar>
            <div class="flex justify-center">
              <div class="avatar online placeholder mb-4 w-32">
                <div
                  v-if="!avatarUrl"
                  class="bg-neutral-focus text-neutral-content ring-primary ring-offset-base-100 mx-auto w-28 rounded-full ring ring-offset-2">
                  <span class="text-5xl font-extrabold">{{ initials }}</span>
                </div>
                <div v-else>
                  <img
                    :src="avatarUrl"
                    alt="avatar"
                    class="mx-auto aspect-square rounded-full dark:bg-gray-500" />
                </div>
              </div>
            </div>
          </template>
          <template #username>
            <div class="font-sans font-bold">{{ username }}</div>
          </template>
          <template #name>
            <div class="font-sans font-extralight">
              {{ firstName }} {{ lastName }}
            </div>
          </template>
          <template #description>
            <div class="font-sans font-extralight">{{ description }}</div>
          </template>
        </ProfileCard>
        <div class="my-2 flex justify-center">
          <button
            v-show="!editProfile"
            class="btn btn-info"
            @click="editProfile = true">
            Edit Profile
          </button>
          <button
            v-show="editProfile"
            class="btn btn-info"
            @click="editProfile = false">
            Finish Editing Profile
          </button>
        </div>
        <progress v-if="isLoading" class="progress progress-info mt-3 w-56" />
      </div>

      <div v-show="editProfile">
        <div ref="pform" class="mb-5 flex justify-center">
          <FormKit
            id="Profile"
            type="form"
            form-class="lg:w-96"
            submit-label="Update Profile"
            :actions="false"
            @submit="updateProfile">
            <FormKit
              v-model="username"
              type="text"
              name="username"
              label="Username"
              validation="required"
              :classes="formStyles" />
            <div class="flex lg:w-96">
              <div class="mr-4 sm:w-32 lg:w-48">
                <FormKit
                  v-model="firstName"
                  type="text"
                  name="firstName"
                  label="First Name"
                  validation="required"
                  :classes="formStyles" />
              </div>
              <div class="sm:w-32 lg:w-48">
                <FormKit
                  v-model="lastName"
                  type="text"
                  name="lastName"
                  label="Last Name"
                  validation="required"
                  :classes="formStyles" />
              </div>
            </div>
            <FormKit
              v-model="description"
              type="text"
              name="description"
              label="description"
              :classes="formStyles" />

            <!-- submit button -->
            <div class="mt-5">
              <FormKit
                type="submit"
                label="Update Profile"
                input-class="$reset btn btn-info btn-block mt-4"
                @submit.prevent="updateProfile" />
            </div>
          </FormKit>
        </div>

        <!-- Avatar update -->
        <ClientOnly>
          <!-- <transition> -->
          <div class="mr-5 mb-20 lg:ml-5">
            <FormKit
              id="avatar"
              type="form"
              form-class="flex lg:w-96"
              :actions="false"
              @submit="uploadAvatar">
              <FormKit
                type="file"
                label="Upload your avatar photo"
                name="avatar"
                accept=".jpg,.jpeg,.png"
                help="JPEG and PNG accepted."
                inner-class="block border border-grey-light w-52 bg-white rounded text-gray-500"
                help-class="$reset text-xs text-gray-400" />
              <FormKit
                type="submit"
                label="Update Avatar"
                input-class="$reset btn btn-info btn-block mt-5 ml-4" />
            </FormKit>
          </div>
          <!-- </transition> -->
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
