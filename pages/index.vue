<script setup lang="ts">
  definePageMeta({
    title: 'Nuxt-starter | Home',
    alias: ['/'],
  })
</script>

<template>
  <div>
    <!-- <FrontPage /> -->
    <!-- <TestComp /> -->
    <h1 class="my-8 flex justify-center text-6xl">index page</h1>
    <!-- <FormStart /> -->
  </div>
</template>

<!-- <template>
  <div class="container" style="padding: 50px 0 100px 0">
    <Account v-if="user" />
    <Auth v-else />
  </div>
</template>

<script setup>
  const supabase = useSupabaseClient()

  const user = useUser()

  user.value = useSupabaseUser()
  supabase.auth.onAuthStateChange((_, session) => {
    user.value = session?.user
  })
</script> -->
