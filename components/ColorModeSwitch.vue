<template>
  <button
    class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
    @click="toggleColorMode"
    aria-label="切换颜色模式"
  >
    <Icon
      v-if="colorMode.value === 'dark'"
      name="heroicons:sun"
      class="w-5 h-5 text-yellow-500"
    />
    <Icon
      v-else
      name="heroicons:moon"
      class="w-5 h-5 text-gray-700"
    />
  </button>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script> 