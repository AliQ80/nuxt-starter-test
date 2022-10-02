<template>
  <div class="min-h-screen dark:bg-gray-800 dark:text-gray-100">
    <div class="space-y-8 p-6">
      <main>
        <div class="container mx-auto space-y-16">
          <section class="grid gap-6 text-center lg:grid-cols-2 xl:grid-cols-5">
            <div
              class="w-full rounded-md p-6 dark:bg-gray-900 sm:p-16 xl:col-span-2">
              <span class="mb-2 block dark:text-indigo-400">
                Mamba design system
              </span>
              <h1 class="text-5xl font-extrabold dark:text-gray-50">
                Build it with Mamba
              </h1>
              <p class="my-8">
                <span class="font-medium dark:text-gray-50">
                  Modular and versatile.
                </span>
                The ultimate design toolkit for savvy technology startups.
              </p>
              <form
                novalidate
                action=""
                class="ng-untouched ng-pristine ng-valid space-y-3 self-stretch">
                <div>
                  <label for="name" class="sr-only text-sm">Your name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    class="w-full rounded-md focus:ring focus:ring-indigo-400 dark:border-gray-700" />
                </div>
                <div>
                  <label for="lastname" class="sr-only text-sm">
                    Email address
                  </label>
                  <input
                    id="lastname"
                    type="text"
                    placeholder="Email address"
                    class="w-full rounded-md focus:ring focus:ring-indigo-400 dark:border-gray-700" />
                </div>
                <button
                  class="w-full rounded py-2 font-semibold dark:bg-indigo-400 dark:text-gray-900">
                  Join the waitlist
                </button>
              </form>
            </div>
            <img
              src="https://source.unsplash.com/random/480x360"
              alt=""
              class="h-full w-full rounded-md object-cover dark:bg-gray-500 xl:col-span-3" />
          </section>
          <section>
            <span
              class="mb-2 block text-xs font-medium uppercase tracking-widest dark:text-indigo-400 lg:text-center">
              How it works
            </span>
            <h2 class="text-5xl font-bold dark:text-gray-50 lg:text-center">
              Building with Mamba is simple
            </h2>
            <div class="my-16 grid gap-6 lg:grid-cols-3">
              <div
                class="flex flex-col space-y-4 rounded-md p-8 dark:bg-gray-900">
                <div
                  class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-xl font-bold dark:bg-indigo-400 dark:text-gray-900">
                  1
                </div>
                <p class="text-2xl font-semibold">
                  <b>Nulla.</b>Nostrum, corrupti blanditiis. Illum, architecto?
                </p>
              </div>
              <div
                class="flex flex-col space-y-4 rounded-md p-8 dark:bg-gray-900">
                <div
                  class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-xl font-bold dark:bg-indigo-400 dark:text-gray-900">
                  2
                </div>
                <p class="text-2xl font-semibold">
                  <b>Accusantium.</b>Vitae saepe atque neque sunt eius dolor
                  veniam alias debitis?
                </p>
              </div>
              <div
                class="flex flex-col space-y-4 rounded-md p-8 dark:bg-gray-900">
                <div
                  class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-xl font-bold dark:bg-indigo-400 dark:text-gray-900">
                  3
                </div>
                <p class="text-2xl font-semibold">
                  <b>Maxime.</b>Expedita temporibus culpa reprehenderit
                  doloribus consectetur odio!
                </p>
              </div>
            </div>
          </section>
          <section class="grid gap-6 lg:grid-cols-2">
            <img
              src="https://source.unsplash.com/random/360x480"
              alt=""
              class="max-h-96 w-full rounded-md object-cover dark:bg-gray-500" />
            <div
              class="flex w-full flex-col items-center space-y-8 rounded-md p-6 dark:bg-gray-900 lg:h-full lg:p-8">
              <img
                src="https://source.unsplash.com/random/100x100"
                alt=""
                class="h-20 w-20 rounded-full object-cover dark:bg-gray-500" />
              <blockquote
                class="max-w-lg text-center text-lg font-medium italic">
                "Et, dignissimos obcaecati. Recusandae praesentium doloribus
                vitae? Rem unde atque mollitia!"
              </blockquote>
              <div class="text-center dark:text-gray-400">
                <p>Leroy Jenkins</p>
                <p>CEO of Company Co.</p>
              </div>
              <div class="flex space-x-2">
                <button
                  type="button"
                  aria-label="Page 1"
                  class="h-2 w-2 rounded-full dark:bg-gray-50" />
                <button
                  type="button"
                  aria-label="Page 2"
                  class="h-2 w-2 rounded-full dark:bg-gray-600" />
                <button
                  type="button"
                  aria-label="Page 3"
                  class="h-2 w-2 rounded-full dark:bg-gray-600" />
                <button
                  type="button"
                  aria-label="Page 4"
                  class="h-2 w-2 rounded-full dark:bg-gray-600" />
              </div>
            </div>
            <div
              class="space-y-8 rounded-md p-8 dark:bg-gray-900 lg:col-span-full lg:py-12">
              <h2 class="text-5xl font-bold dark:text-gray-50">
                Create with us
              </h2>
              <p class="dark:text-gray-400">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Nesciunt facilis quod accusantium beatae cum nam adipisci
                reiciendis omnis possimus error quo animi voluptas magni, at
                incidunt. Nulla ex at ullam corporis quidem adipisci vitae,
                perferendis dolorem libero minus atque tenetur enim pariatur
                cupiditate commodi in beatae, ipsa eligendi? Quis, saepe.
              </p>
            </div>
          </section>
          <section>
            <div class="grid gap-6 lg:grid-cols-3">
              <div class="overflow-hidden rounded lg:col-span-3 lg:flex">
                <img
                  src="https://source.unsplash.com/random/485x365"
                  alt=""
                  class="h-auto max-h-96 w-full object-cover dark:bg-gray-500" />
                <div
                  class="space-y-6 p-6 dark:bg-gray-900 md:flex md:flex-col lg:p-8">
                  <span
                    class="self-start rounded-full px-3 py-1 text-sm dark:bg-indigo-400 dark:text-gray-900">
                    Business
                  </span>
                  <h2 class="text-3xl font-bold md:flex-1">
                    Curating a workplace that inspires team movement
                  </h2>
                  <div>
                    <p class="dark:text-gray-400">November 30, 2020</p>
                    <p class="dark:text-gray-400">By Leroy Jenkins</p>
                  </div>
                </div>
              </div>
              <div class="rounded p-6 dark:bg-gray-900 lg:p-8 lg:py-12">
                <h3 class="inline font-medium dark:text-gray-50">
                  Panel-based blocks.
                </h3>
                <p class="inline">
                  Flexible panels that are perfect for building functional
                  layouts.
                </p>
              </div>
              <div class="rounded p-6 dark:bg-gray-900 lg:p-8 lg:py-12">
                <h3 class="inline font-medium dark:text-gray-50">
                  Responsive design.
                </h3>
                <p class="inline">Panels look great no matter the device.</p>
              </div>
              <div class="rounded p-6 dark:bg-gray-900 lg:p-8 lg:py-12">
                <h3 class="inline font-medium dark:text-gray-50">
                  Premium support.
                </h3>
                <p class="inline">
                  Join over 50 000 satisfied customers who use our templates.
                </p>
              </div>
            </div>
          </section>
          <section>
            <div
              class="container mx-auto rounded p-6 py-20 dark:bg-gray-900 lg:px-8">
              <h2 class="text-center text-5xl font-bold">
                Our team is here to help you.
              </h2>
              <div class="flex justify-center p-4">
                <a rel="noopener noreferrer" href="#">Meet our crew &gt;</a>
              </div>
              <img
                src="https://source.unsplash.com/random/360x240"
                alt=""
                class="mt-8 h-auto max-h-96 w-full rounded object-cover dark:bg-gray-500" />
            </div>
          </section>
        </div>
      </main>
    </div>
  </div>
</template>
