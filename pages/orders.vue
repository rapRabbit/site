<template>
  <div class="py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <div class="container mx-auto px-4">
      <!-- 页面标题 -->
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">我的订单</h1>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          查看您的订单历史记录和物流状态
        </p>
      </div>
      
      <!-- 加载状态 -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
      
      <!-- 无订单状态 -->
      <div v-else-if="orders.length === 0" class="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow">
        <Icon name="heroicons:shopping-bag" class="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">您还没有订单</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">浏览我们的产品并下单，您的订单将显示在这里</p>
        <NuxtLink to="/product" class="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          浏览产品
        </NuxtLink>
      </div>
      
      <!-- 订单列表 -->
      <div v-else class="space-y-6">
        <div v-for="order in orders" :key="order.id" class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <!-- 订单头部 -->
          <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-wrap justify-between items-center">
            <div>
              <div class="flex items-center space-x-2">
                <span class="text-sm text-gray-500 dark:text-gray-400">订单号:</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ order.orderNumber }}</span>
              </div>
              <div class="flex items-center space-x-2 mt-1">
                <span class="text-sm text-gray-500 dark:text-gray-400">下单时间:</span>
                <span class="text-sm text-gray-900 dark:text-white">{{ formatDate(order.orderDate) }}</span>
              </div>
            </div>
            
            <div class="flex items-center space-x-4">
              <div class="text-sm px-3 py-1 rounded-full" :class="getStatusClass(order.status)">
                {{ getStatusText(order.status) }}
              </div>
              <NuxtLink :to="`/orders/${order.id}`" class="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                查看详情
              </NuxtLink>
            </div>
          </div>
          
          <!-- 订单商品 -->
          <div class="divide-y divide-gray-200 dark:divide-gray-700">
            <div v-for="item in order.items" :key="item.id" class="p-4 flex flex-col sm:flex-row">
              <!-- 商品图片 -->
              <div class="sm:w-24 h-24 flex-shrink-0 mb-4 sm:mb-0">
                <img :src="item.image" :alt="item.name" class="w-full h-full object-cover rounded-md" />
              </div>
              
              <!-- 商品信息 -->
              <div class="sm:ml-6 flex-1">
                <div class="flex flex-col sm:flex-row sm:justify-between">
                  <div>
                    <h3 class="text-base font-medium text-gray-900 dark:text-white">{{ item.name }}</h3>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      数量: {{ item.quantity }} × ¥{{ item.price.toFixed(2) }}
                    </p>
                  </div>
                  <div class="mt-2 sm:mt-0">
                    <span class="text-base font-medium text-blue-600 dark:text-blue-400">
                      ¥{{ (item.quantity * item.price).toFixed(2) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 物流进度 -->
          <div class="p-4 border-t border-gray-200 dark:border-gray-700">
            <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">物流进度</h4>
            <div class="relative">
              <!-- 进度条 -->
              <div class="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700 -translate-y-1/2"></div>
              
              <!-- 进度点 -->
              <div class="relative flex justify-between">
                <div v-for="(step, index) in logisticsSteps" :key="index" class="flex flex-col items-center">
                  <div class="w-6 h-6 rounded-full flex items-center justify-center z-10"
                    :class="[
                      getStepCompleted(order.logisticsStatus, index) 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                    ]"
                  >
                    <Icon v-if="getStepCompleted(order.logisticsStatus, index)" name="heroicons:check" class="w-4 h-4" />
                    <span v-else class="text-xs">{{ index + 1 }}</span>
                  </div>
                  <div class="text-xs text-center mt-2 max-w-[80px]" 
                    :class="[
                      getStepCompleted(order.logisticsStatus, index)
                        ? 'text-blue-600 dark:text-blue-400 font-medium'
                        : 'text-gray-500 dark:text-gray-400'
                    ]"
                  >
                    {{ step }}
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 最新物流信息 -->
            <div class="mt-6 text-sm text-gray-600 dark:text-gray-400">
              <div class="flex items-start">
                <Icon name="heroicons:truck" class="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5" />
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">{{ order.latestLogistics.message }}</p>
                  <p class="mt-1">{{ formatDate(order.latestLogistics.time, 'YYYY-MM-DD HH:mm') }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 订单底部 -->
          <div class="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex flex-wrap justify-between items-center">
            <div class="text-sm text-gray-500 dark:text-gray-400">
              共 {{ getTotalItems(order) }} 件商品，总计:
              <span class="text-lg font-bold text-blue-600 dark:text-blue-400">¥{{ order.totalAmount.toFixed(2) }}</span>
            </div>
            
            <div class="flex space-x-3 mt-3 sm:mt-0">
              <button v-if="order.status === 'delivered'" class="px-4 py-2 text-sm border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 rounded-md hover:bg-blue-50 dark:hover:bg-gray-800">
                评价订单
              </button>
              <button v-if="['pending', 'processing'].includes(order.status)" class="px-4 py-2 text-sm border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800">
                取消订单
              </button>
              <button v-if="order.status === 'shipped'" class="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
                确认收货
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

// 页面元数据
useSeoMeta({
  title: '我的订单 - 外贸独立站',
  description: '查看您的订单历史记录和物流状态',
  ogTitle: '我的订单 - 外贸独立站',
  ogDescription: '查看您的订单历史记录和物流状态',
  ogImage: '/images/og-image.jpg',
})

// 获取认证状态
const authStore = useAuthStore()
const router = useRouter()

// 如果用户未登录，重定向到登录页面
onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.push('/login?redirect=/orders')
  }
})

// 加载状态
const loading = ref(false)

// 物流步骤
const logisticsSteps = [
  '订单确认',
  '商品出库',
  '运输中',
  '派送中',
  '已送达'
]

// 自定义格式化日期函数
function formatDate(dateString: string, format: string = 'YYYY-MM-DD') {
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    return '无效日期';
  }
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

// 模拟订单数据
const orders = ref([
  {
    id: '1',
    orderNumber: 'ORD20230001',
    orderDate: '2023-12-15T10:30:00',
    status: 'delivered',
    totalAmount: 29980,
    items: [
      {
        id: '101',
        name: 'Chanel Classic Flap 经典翻盖包',
        price: 29980,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80'
      }
    ],
    logisticsStatus: 'delivered',
    latestLogistics: {
      message: '您的包裹已送达，感谢您的购买',
      time: '2023-12-20T14:25:00'
    }
  },
  {
    id: '2',
    orderNumber: 'ORD20230002',
    orderDate: '2023-12-28T15:45:00',
    status: 'shipped',
    totalAmount: 18500,
    items: [
      {
        id: '201',
        name: 'Louis Vuitton Neverfull MM 手提包',
        price: 18500,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80'
      }
    ],
    logisticsStatus: 'in_transit',
    latestLogistics: {
      message: '您的包裹正在运输中，预计3天内送达',
      time: '2023-12-30T09:15:00'
    }
  },
  {
    id: '3',
    orderNumber: 'ORD20230003',
    orderDate: '2024-01-05T08:20:00',
    status: 'processing',
    totalAmount: 42800,
    items: [
      {
        id: '301',
        name: 'Hermès Birkin 30 手提包',
        price: 35800,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80'
      },
      {
        id: '302',
        name: 'Gucci GG Marmont 链条包',
        price: 7000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80'
      }
    ],
    logisticsStatus: 'processing',
    latestLogistics: {
      message: '您的订单正在处理中，我们将尽快发货',
      time: '2024-01-05T10:30:00'
    }
  }
])

// 获取订单状态样式
function getStatusClass(status: string) {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
    case 'processing':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
    case 'shipped':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
    case 'delivered':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    case 'cancelled':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
  }
}

// 获取订单状态文本
function getStatusText(status: string) {
  switch (status) {
    case 'pending':
      return '待付款'
    case 'processing':
      return '处理中'
    case 'shipped':
      return '已发货'
    case 'delivered':
      return '已送达'
    case 'cancelled':
      return '已取消'
    default:
      return '未知状态'
  }
}

// 判断物流步骤是否完成
function getStepCompleted(logisticsStatus: string, stepIndex: number) {
  switch (logisticsStatus) {
    case 'pending':
      return stepIndex === 0
    case 'processing':
      return stepIndex <= 1
    case 'shipped':
      return stepIndex <= 2
    case 'in_transit':
      return stepIndex <= 2
    case 'out_for_delivery':
      return stepIndex <= 3
    case 'delivered':
      return true
    default:
      return false
  }
}

// 获取订单总商品数量
function getTotalItems(order: any) {
  return order.items.reduce((total: number, item: any) => total + item.quantity, 0)
}
</script> 