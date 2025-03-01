<template>
  <header class="bg-white dark:bg-gray-900 shadow-sm">
    <div class="container mx-auto px-4 py-4">
      <div class="flex justify-between items-center">
        <NuxtLink to="/" class="text-2xl font-bold text-primary-600 dark:text-primary-400">
          外贸独立站
        </NuxtLink>
        
        <nav class="hidden md:flex space-x-6">
          <NuxtLink to="/" class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
            首页
          </NuxtLink>
          <NuxtLink to="/product" class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
            产品
          </NuxtLink>
          <NuxtLink to="/blog" class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
            博客
          </NuxtLink>
          <NuxtLink to="/contact" class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
            联系我们
          </NuxtLink>
        </nav>
        
        <div class="flex items-center space-x-4">
          <ColorModeSwitch />
          
          <div class="hidden md:flex space-x-2">
            <NuxtLink to="/login" class="px-4 py-2 text-sm rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              登录
            </NuxtLink>
            <NuxtLink to="/register" class="px-4 py-2 text-sm rounded-md bg-primary-600 text-white hover:bg-primary-700">
              注册
            </NuxtLink>
          </div>
          
          <button class="md:hidden" @click="toggleMobileMenu">
            <Icon name="heroicons:bars-3" class="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </div>
      
      <!-- 移动端菜单 -->
      <div v-if="isMobileMenuOpen" class="md:hidden mt-4 pb-4">
        <nav class="flex flex-col space-y-4">
          <NuxtLink to="/" class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
            首页
          </NuxtLink>
          <NuxtLink to="/product" class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
            产品
          </NuxtLink>
          <NuxtLink to="/blog" class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
            博客
          </NuxtLink>
          <NuxtLink to="/contact" class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
            联系我们
          </NuxtLink>
          <div class="flex space-x-2 pt-2">
            <NuxtLink to="/login" class="px-4 py-2 text-sm rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              登录
            </NuxtLink>
            <NuxtLink to="/register" class="px-4 py-2 text-sm rounded-md bg-primary-600 text-white hover:bg-primary-700">
              注册
            </NuxtLink>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const isMobileMenuOpen = ref(false)

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script> 