<template>
  <div class="py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <div class="container mx-auto px-4">
      <!-- 页面标题 -->
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">个人中心</h1>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          管理您的个人信息和查看订单历史
        </p>
      </div>
      
      <!-- 加载状态 -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
      
      <!-- 未登录状态 -->
      <div v-else-if="!authStore.isAuthenticated" class="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow">
        <Icon name="heroicons:user-circle" class="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">请先登录</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">您需要登录才能访问个人中心</p>
        <div class="flex justify-center space-x-4">
          <NuxtLink to="/login" class="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            登录
          </NuxtLink>
          <NuxtLink to="/register" class="px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800">
            注册
          </NuxtLink>
        </div>
      </div>
      
      <!-- 个人中心内容 -->
      <div v-else class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <!-- 侧边栏 -->
        <div class="md:col-span-1">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div class="p-6 text-center border-b border-gray-200 dark:border-gray-700">
              <div class="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 mx-auto mb-4 overflow-hidden">
                <img v-if="user.avatar" :src="user.avatar" alt="用户头像" class="w-full h-full object-cover" />
                <div v-else class="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-600">
                  <Icon name="heroicons:user" class="w-12 h-12" />
                </div>
              </div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">{{ user.name }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ user.email }}</p>
            </div>
            <nav class="p-4">
              <ul class="space-y-2">
                <li>
                  <button @click="activeTab = 'profile'" class="w-full text-left px-4 py-2 rounded-md" :class="activeTab === 'profile' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/30'">
                    <div class="flex items-center">
                      <Icon name="heroicons:user-circle" class="w-5 h-5 mr-3" />
                      <span>个人信息</span>
                    </div>
                  </button>
                </li>
                <li>
                  <NuxtLink to="/orders" class="block w-full text-left px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <div class="flex items-center">
                      <Icon name="heroicons:shopping-bag" class="w-5 h-5 mr-3" />
                      <span>我的订单</span>
                    </div>
                  </NuxtLink>
                </li>
                <li>
                  <button @click="activeTab = 'address'" class="w-full text-left px-4 py-2 rounded-md" :class="activeTab === 'address' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/30'">
                    <div class="flex items-center">
                      <Icon name="heroicons:map-pin" class="w-5 h-5 mr-3" />
                      <span>收货地址</span>
                    </div>
                  </button>
                </li>
                <li>
                  <button @click="activeTab = 'security'" class="w-full text-left px-4 py-2 rounded-md" :class="activeTab === 'security' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/30'">
                    <div class="flex items-center">
                      <Icon name="heroicons:lock-closed" class="w-5 h-5 mr-3" />
                      <span>账号安全</span>
                    </div>
                  </button>
                </li>
                <li>
                  <button @click="logout" class="w-full text-left px-4 py-2 rounded-md text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                    <div class="flex items-center">
                      <Icon name="heroicons:arrow-right-on-rectangle" class="w-5 h-5 mr-3" />
                      <span>退出登录</span>
                    </div>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        
        <!-- 主内容区 -->
        <div class="md:col-span-3">
          <!-- 个人信息 -->
          <div v-if="activeTab === 'profile'" class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">个人信息</h2>
            <form @submit.prevent="updateProfile" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">姓名</label>
                  <input type="text" id="name" v-model="user.name" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">邮箱</label>
                  <input type="email" id="email" v-model="user.email" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white" readonly />
                </div>
                <div>
                  <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">手机号码</label>
                  <input type="tel" id="phone" v-model="user.phone" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
                </div>
                <div>
                  <label for="birthday" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">生日</label>
                  <input type="date" id="birthday" v-model="user.birthday" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
                </div>
              </div>
              <div>
                <button type="submit" class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">保存修改</button>
              </div>
            </form>
          </div>
          
          <!-- 收货地址 -->
          <div v-if="activeTab === 'address'" class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white">收货地址</h2>
              <button @click="showAddressForm = true" class="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
                添加新地址
              </button>
            </div>
            
            <div v-if="addresses.length === 0" class="text-center py-8">
              <p class="text-gray-500 dark:text-gray-400">您还没有添加收货地址</p>
            </div>
            
            <div v-else class="space-y-4">
              <div v-for="(address, index) in addresses" :key="index" class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div class="flex justify-between">
                  <div>
                    <div class="flex items-center">
                      <h3 class="text-base font-medium text-gray-900 dark:text-white">{{ address.name }}</h3>
                      <span v-if="address.isDefault" class="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded">默认</span>
                    </div>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ address.phone }}</p>
                    <p class="text-sm text-gray-700 dark:text-gray-300 mt-2">{{ address.province }} {{ address.city }} {{ address.district }} {{ address.detail }}</p>
                  </div>
                  <div class="flex space-x-2">
                    <button @click="editAddress(index)" class="text-blue-600 dark:text-blue-400 hover:underline">编辑</button>
                    <button @click="deleteAddress(index)" class="text-red-600 dark:text-red-400 hover:underline">删除</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 账号安全 -->
          <div v-if="activeTab === 'security'" class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">账号安全</h2>
            <form @submit.prevent="updatePassword" class="space-y-6">
              <div>
                <label for="currentPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">当前密码</label>
                <input type="password" id="currentPassword" v-model="passwordForm.currentPassword" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
              </div>
              <div>
                <label for="newPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">新密码</label>
                <input type="password" id="newPassword" v-model="passwordForm.newPassword" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
              </div>
              <div>
                <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">确认新密码</label>
                <input type="password" id="confirmPassword" v-model="passwordForm.confirmPassword" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
              </div>
              <div>
                <button type="submit" class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">更新密码</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'

// 页面元数据
useSeoMeta({
  title: '个人中心 - 外贸独立站',
  description: '管理您的个人信息和订单',
  ogTitle: '个人中心 - 外贸独立站',
  ogDescription: '管理您的个人信息和订单',
  ogImage: '/images/og-image.jpg',
})

// 获取认证状态
const authStore = useAuthStore()
const router = useRouter()

// 加载状态
const loading = ref<boolean>(false)

// 活动标签
const activeTab = ref<string>('profile')

// 用户信息
const user = ref<any>({
  name: '张三',
  email: 'zhangsan@example.com',
  phone: '13800138000',
  birthday: '1990-01-01',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&h=256&q=80'
})

// 收货地址
const addresses = ref<any[]>([
  {
    name: '张三',
    phone: '13800138000',
    province: '上海市',
    city: '上海市',
    district: '浦东新区',
    detail: '张江高科技园区科苑路88号',
    isDefault: true
  },
  {
    name: '张三',
    phone: '13800138000',
    province: '北京市',
    city: '北京市',
    district: '海淀区',
    detail: '中关村南大街5号',
    isDefault: false
  }
])

// 显示地址表单
const showAddressForm = ref<boolean>(false)

// 密码表单
const passwordForm = ref<any>({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 获取用户信息
onMounted(async () => {
  if (authStore.isAuthenticated) {
    try {
      loading.value = true
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 500))
      // 实际项目中，这里应该从API获取用户信息
      loading.value = false
    } catch (error) {
      console.error('获取用户信息失败:', error)
      loading.value = false
    }
  }
})

// 更新个人信息
async function updateProfile() {
  try {
    // 模拟API请求
    await new Promise(resolve => setTimeout(resolve, 500))
    // 显示成功消息
    alert('个人信息更新成功')
  } catch (error) {
    console.error('更新个人信息失败:', error)
  }
}

// 编辑地址
function editAddress(index: number) {
  // 实现编辑地址的逻辑
  console.log('编辑地址:', addresses.value[index])
}

// 删除地址
function deleteAddress(index: number) {
  if (confirm('确定要删除这个地址吗？')) {
    addresses.value.splice(index, 1)
  }
}

// 更新密码
async function updatePassword() {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    alert('两次输入的密码不一致')
    return
  }
  
  try {
    // 模拟API请求
    await new Promise(resolve => setTimeout(resolve, 500))
    // 重置表单
    passwordForm.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
    // 显示成功消息
    alert('密码更新成功')
  } catch (error) {
    console.error('更新密码失败:', error)
  }
}

// 退出登录
function logout() {
  if (confirm('确定要退出登录吗？')) {
    authStore.logout()
    router.push('/')
  }
}
</script> 