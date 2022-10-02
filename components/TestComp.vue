<script setup lang="ts">
  import { useStore } from '../stores/counter'
  import { useFirebaseUserStore } from '../stores/userStore'

  const counterStore = useStore()
  const userStore = useFirebaseUserStore()

  const username = ref()
  const userEmail = ref()

  const showData = () => {
    username.value = userStore.getName
    userEmail.value = userStore.getEmail
  }

  const plus = () => {
    counterStore.hit()
  }

  const items = ref(['😏', '😐', '😑', '😒', '😕'])
  function removeItem(toRemove: string) {
    items.value = items.value.filter((item) => item !== toRemove)
  }
</script>

<template>
  <div>
    <div class="m-10 flex items-center justify-center">
      <h1 class="text-3xl font-bold text-blue-500">{{ username }}</h1>
    </div>
    <div class="m-10 flex items-center justify-center">
      <h1 class="text-3xl font-bold text-blue-500">{{ userEmail }}</h1>
    </div>
    <div class="m-10 flex items-center justify-center">
      <h1 class="text-3xl font-bold text-green-500">Test Component</h1>
    </div>
    <div class="mx-auto grid w-96 grid-cols-1 justify-items-center py-10">
      <h1 class="py-4 text-3xl text-yellow-500">DaisyUI</h1>
      <button class="btn btn-primary" @click="showData">Button</button>
    </div>
    <div class="mx-auto grid w-96 grid-cols-1 justify-items-center py-10">
      <h1 class="py-4 text-3xl text-orange-500">FormKit</h1>

      <FormKit
        label="Username"
        type="text"
        help="Pick a new username"
        validation="required|matches:/^@[a-zA-Z]+$/|length:5"
        value="@useFormKit" />
      <FormKit
        type="button"
        label="formKit button"
        input-class="btn btn-secondary my-4" />
    </div>
    <div />

    <div class="mx-auto grid w-96 grid-cols-1 justify-items-center py-10">
      <h1 class="py-4 text-3xl text-lime-500">pinia store</h1>
      <h1 class="py-4">Home view: {{ counterStore.counter }}</h1>
      <button class="btn" @click="plus">++</button>
    </div>

    <div class="mx-auto grid w-96 grid-cols-1 justify-items-center py-10">
      <h1 class="text-lg">Auto Animate</h1>
      <h5>Click emojis to remove them.</h5>
      <ul v-auto-animate>
        <li v-for="item in items" :key="item" @click="removeItem(item)">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>
