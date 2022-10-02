<script setup lang="ts">
  import EditProfile from '~~/components/form/EditProfile.vue'
  definePageMeta({
    title: 'Nuxt-starter | profile Page',
    alias: ['/profile'],
    middleware: ['auth'],
    // or middleware: 'auth'
  })
</script>

<template>
  <div>
    <div class="prose my-10 mx-auto flex justify-center">
      <h1>Update Your Profile</h1>
    </div>
    <!-- <Account /> -->
    <EditProfile />
  </div>
</template>

<style scoped></style>
