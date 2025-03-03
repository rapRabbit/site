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
          
          <!-- 购物车图标 -->
          <NuxtLink to="/cart" class="relative">
            <Icon name="heroicons:shopping-cart" class="w-6 h-6 text-gray-700 dark:text-gray-300" />
            <span v-if="cartStore.totalItems > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {{ cartStore.totalItems }}
            </span>
          </NuxtLink>
          
          <!-- 已登录状态 -->
          <div v-if="authStore.isAuthenticated" class="relative">
            <button @click="toggleUserMenu" class="flex items-center space-x-2 focus:outline-none">
              <div class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <img v-if="authStore.user?.avatar" :src="authStore.user.avatar" alt="用户头像" class="w-full h-full object-cover" />
                <div v-else class="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-600">
                  <Icon name="heroicons:user" class="w-5 h-5" />
                </div>
              </div>
              <span class="hidden md:inline text-sm text-gray-700 dark:text-gray-300">{{ authStore.user?.name || '用户' }}</span>
              <Icon name="heroicons:chevron-down" class="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </button>
            
            <!-- 用户下拉菜单 -->
            <div v-if="isUserMenuOpen" class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
              <NuxtLink to="/profile" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                个人中心
              </NuxtLink>
              <NuxtLink to="/orders" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                我的订单
              </NuxtLink>
              <button @click="logout" class="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                退出登录
              </button>
            </div>
          </div>
          
          <!-- 未登录状态 -->
          <div v-else class="hidden md:flex space-x-2">
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
          
          <!-- 已登录状态 -->
          <template v-if="authStore.isAuthenticated">
            <NuxtLink to="/profile" class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
              个人中心
            </NuxtLink>
            <NuxtLink to="/orders" class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
              我的订单
            </NuxtLink>
            <button @click="logout" class="text-left text-red-600 dark:text-red-400 hover:underline">
              退出登录
            </button>
          </template>
          
          <!-- 未登录状态 -->
          <template v-else>
            <div class="flex space-x-2 pt-2">
              <NuxtLink to="/login" class="px-4 py-2 text-sm rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                登录
              </NuxtLink>
              <NuxtLink to="/register" class="px-4 py-2 text-sm rounded-md bg-primary-600 text-white hover:bg-primary-700">
                注册
              </NuxtLink>
            </div>
          </template>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useCartStore } from '~/stores/cart'

const authStore = useAuthStore()
const cartStore = useCartStore()
const router = useRouter()

const isMobileMenuOpen = ref(false)
const isUserMenuOpen = ref(false)

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function toggleUserMenu() {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

function logout() {
  authStore.logout()
  router.push('/')
  isUserMenuOpen.value = false
}

// 点击外部关闭用户菜单
function closeUserMenu(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (isUserMenuOpen.value && !target.closest('.user-menu')) {
    isUserMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeUserMenu)
})

onUnmounted(() => {
  document.removeEventListener('click', closeUserMenu)
})
</script> 