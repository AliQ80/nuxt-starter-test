<script setup lang="ts">
  import { useAuth } from '~~/composables/useSupabase'
  useAuth()
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
