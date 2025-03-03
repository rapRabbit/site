<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
    <div class="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">注册</h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
          创建您的账户，开始使用我们的服务
        </p>
      </div>
      
      <!-- 注册表单 -->
      <form class="mt-8 space-y-6" @submit.prevent="register">
        <!-- 错误提示 -->
        <div v-if="error" class="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-md text-sm">
          {{ error }}
        </div>
        
        <!-- 姓名输入 -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            姓名
          </label>
          <input
            id="name"
            v-model="name"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            placeholder="请输入您的姓名"
          />
        </div>
        
        <!-- 邮箱输入 -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            邮箱地址
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            placeholder="请输入您的邮箱地址"
          />
        </div>
        
        <!-- 密码输入 -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            密码
          </label>
          <div class="relative">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="请输入密码"
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <Icon v-if="showPassword" name="heroicons:eye" class="h-5 w-5" />
              <Icon v-else name="heroicons:eye-slash" class="h-5 w-5" />
            </button>
          </div>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            密码必须包含至少8个字符，包括字母和数字
          </p>
        </div>
        
        <!-- 确认密码输入 -->
        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            确认密码
          </label>
          <div class="relative">
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              :type="showPassword ? 'text' : 'password'"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="请再次输入密码"
            />
          </div>
        </div>
        
        <!-- 同意条款 -->
        <div class="flex items-center">
          <input
            id="terms"
            v-model="agreeTerms"
            type="checkbox"
            required
            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label for="terms" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            我已阅读并同意
            <NuxtLink to="/terms" class="text-primary-600 dark:text-primary-400 hover:underline">
              服务条款
            </NuxtLink>
            和
            <NuxtLink to="/privacy" class="text-primary-600 dark:text-primary-400 hover:underline">
              隐私政策
            </NuxtLink>
          </label>
        </div>
        
        <!-- 注册按钮 -->
        <div>
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            :disabled="loading || !isFormValid"
          >
            <span v-if="loading" class="flex items-center">
              <Icon name="heroicons:arrow-path" class="animate-spin h-5 w-5 mr-2" />
              注册中...
            </span>
            <span v-else>注册</span>
          </button>
        </div>
      </form>
      
      <!-- 分隔线 -->
      <div v-if="false" class="mt-6 relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300 dark:border-gray-700"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
            或通过以下方式注册
          </span>
        </div>
      </div>
      
      <!-- 第三方登录 -->
      <div v-if="false" class="mt-6 grid grid-cols-3 gap-3">
        <button
          type="button"
          class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          @click="socialLogin('google')"
        >
          <Icon name="mdi:google" class="h-5 w-5 text-red-500" />
        </button>
        <button
          type="button"
          class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          @click="socialLogin('facebook')"
        >
          <Icon name="mdi:facebook" class="h-5 w-5 text-blue-600" />
        </button>
        <button
          type="button"
          class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          @click="socialLogin('wechat')"
        >
          <Icon name="mdi:wechat" class="h-5 w-5 text-green-500" />
        </button>
      </div>
      
      <!-- 登录链接 -->
      <div class="text-center mt-4">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          已有账户?
          <NuxtLink to="/login" class="text-primary-600 dark:text-primary-400 hover:underline font-medium">
            立即登录
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

// 页面元数据
useSeoMeta({
  title: '注册 - 外贸独立站',
  description: '创建您的账户，开始使用我们的服务',
  ogTitle: '注册 - 外贸独立站',
  ogDescription: '创建您的账户，开始使用我们的服务',
  ogImage: '/images/og-image.jpg',
})

// 获取认证 store
const authStore = useAuthStore()
const router = useRouter()

// 表单数据
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreeTerms = ref(false)
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

// 切换密码可见性
function togglePasswordVisibility() {
  showPassword.value = !showPassword.value
}

// 表单验证
const isFormValid = computed(() => {
  return (
    name.value.trim() !== '' &&
    email.value.trim() !== '' &&
    password.value.length >= 8 &&
    password.value === confirmPassword.value &&
    agreeTerms.value
  )
})

// 注册方法
async function register() {
  if (!isFormValid.value) {
    error.value = '请填写所有必填字段并确保密码匹配'
    return
  }
  
  try {
    loading.value = true
    error.value = ''
    
    // 调用注册 API
    await authStore.register({
      name: name.value,
      email: email.value,
      password: password.value
    })
    
    // 注册成功后重定向
    router.push('/login?registered=true')
  } catch (err: any) {
    error.value = err.message || '注册失败，请稍后再试'
  } finally {
    loading.value = false
  }
}

// 社交媒体登录
async function socialLogin(provider: string) {
  try {
    loading.value = true
    error.value = ''
    
    // 调用社交媒体登录 API
    await authStore.socialLogin(provider)
    
    // 登录成功后重定向
    router.push('/')
  } catch (err: any) {
    error.value = err.message || `通过 ${provider} 注册失败`
  } finally {
    loading.value = false
  }
}

// 如果用户已登录，重定向到首页
onMounted(() => {
  if (authStore.isAuthenticated) {
    router.push('/')
  }
})
</script> 