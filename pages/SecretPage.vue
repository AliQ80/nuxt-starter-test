<script setup lang="ts">
  definePageMeta({
    title: 'Nuxt-starter | Secret Page',
    alias: ['/secret'],
    middleware: ['auth'],
    // or middleware: 'auth'
  })
</script>

<template>
  <div class="prose my-10 mx-auto flex justify-center">
    <h1>secret page</h1>
  </div>
</template>
