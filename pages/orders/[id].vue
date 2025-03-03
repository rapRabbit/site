<template>
  <div class="py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <div class="container mx-auto px-4">
      <!-- 返回按钮 -->
      <div class="mb-6">
        <NuxtLink to="/orders" class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline">
          <Icon name="heroicons:arrow-left" class="w-4 h-4 mr-1" />
          返回订单列表
        </NuxtLink>
      </div>
      
      <!-- 加载状态 -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
      
      <!-- 错误状态 -->
      <div v-else-if="error" class="text-center py-20 bg-white dark:bg-gray-800 rounded-lg shadow">
        <Icon name="heroicons:exclamation-circle" class="w-16 h-16 mx-auto text-red-500 mb-4" />
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">无法加载订单</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">{{ error }}</p>
        <NuxtLink to="/orders" class="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          返回订单列表
        </NuxtLink>
      </div>
      
      <!-- 订单详情 -->
      <div v-else-if="order" class="space-y-6">
        <!-- 订单标题和状态 -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex flex-wrap justify-between items-center">
            <div>
              <h1 class="text-2xl font-bold text-gray-900 dark:text-white">订单详情</h1>
              <p class="text-gray-600 dark:text-gray-400 mt-1">订单号: {{ order.orderNumber }}</p>
            </div>
            <div class="mt-4 sm:mt-0">
              <div class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" :class="getStatusClass(order.status)">
                {{ getStatusText(order.status) }}
              </div>
            </div>
          </div>
        </div>
        
        <!-- 订单信息 -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">订单信息</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">下单时间</p>
                <p class="text-gray-900 dark:text-white">{{ formatDate(order.orderDate) }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">支付方式</p>
                <p class="text-gray-900 dark:text-white">{{ order.paymentMethod }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">支付时间</p>
                <p class="text-gray-900 dark:text-white">{{ formatDate(order.paymentDate) }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">订单总额</p>
                <p class="text-gray-900 dark:text-white font-semibold">¥{{ order.totalAmount.toFixed(2) }}</p>
              </div>
            </div>
          </div>
          
          <!-- 收货信息 -->
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">收货信息</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">收货人</p>
                <p class="text-gray-900 dark:text-white">{{ order.shipping.name }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">联系电话</p>
                <p class="text-gray-900 dark:text-white">{{ order.shipping.phone }}</p>
              </div>
              <div class="md:col-span-2">
                <p class="text-sm text-gray-500 dark:text-gray-400">收货地址</p>
                <p class="text-gray-900 dark:text-white">{{ order.shipping.address }}</p>
              </div>
            </div>
          </div>
          
          <!-- 商品列表 -->
          <div class="p-6">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">商品列表</h2>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">商品</th>
                    <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">单价</th>
                    <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">数量</th>
                    <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">小计</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr v-for="item in order.items" :key="item.id">
                    <td class="px-4 py-4">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-16 w-16">
                          <img :src="item.image" :alt="item.name" class="h-16 w-16 object-cover rounded-md" />
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900 dark:text-white">{{ item.name }}</div>
                          <div v-if="item.sku" class="text-xs text-gray-500 dark:text-gray-400">SKU: {{ item.sku }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-4 py-4 text-center text-sm text-gray-900 dark:text-white">¥{{ item.price.toFixed(2) }}</td>
                    <td class="px-4 py-4 text-center text-sm text-gray-900 dark:text-white">{{ item.quantity }}</td>
                    <td class="px-4 py-4 text-right text-sm font-medium text-blue-600 dark:text-blue-400">¥{{ (item.price * item.quantity).toFixed(2) }}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3" class="px-4 py-4 text-right text-sm text-gray-500 dark:text-gray-400">商品总额:</td>
                    <td class="px-4 py-4 text-right text-sm text-gray-900 dark:text-white">¥{{ order.subtotal.toFixed(2) }}</td>
                  </tr>
                  <tr>
                    <td colspan="3" class="px-4 py-4 text-right text-sm text-gray-500 dark:text-gray-400">运费:</td>
                    <td class="px-4 py-4 text-right text-sm text-gray-900 dark:text-white">¥{{ order.shipping.fee.toFixed(2) }}</td>
                  </tr>
                  <tr v-if="order.discount > 0">
                    <td colspan="3" class="px-4 py-4 text-right text-sm text-gray-500 dark:text-gray-400">优惠:</td>
                    <td class="px-4 py-4 text-right text-sm text-red-600 dark:text-red-400">-¥{{ order.discount.toFixed(2) }}</td>
                  </tr>
                  <tr>
                    <td colspan="3" class="px-4 py-4 text-right text-base font-medium text-gray-900 dark:text-white">订单总额:</td>
                    <td class="px-4 py-4 text-right text-base font-bold text-blue-600 dark:text-blue-400">¥{{ order.totalAmount.toFixed(2) }}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
        
        <!-- 物流信息 -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">物流信息</h2>
          
          <!-- 物流进度条 -->
          <div class="mb-8">
            <div class="relative">
              <!-- 进度条 -->
              <div class="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700 -translate-y-1/2"></div>
              
              <!-- 进度点 -->
              <div class="relative flex justify-between">
                <div v-for="(step, index) in logisticsSteps" :key="index" class="flex flex-col items-center">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center z-10"
                    :class="[
                      getStepCompleted(order.logisticsStatus, index) 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                    ]"
                  >
                    <Icon v-if="getStepCompleted(order.logisticsStatus, index)" name="heroicons:check" class="w-5 h-5" />
                    <span v-else class="text-xs">{{ index + 1 }}</span>
                  </div>
                  <div class="text-sm text-center mt-2 max-w-[100px]" 
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
          </div>
          
          <!-- 物流详情 -->
          <div v-if="order.logistics && order.logistics.length > 0">
            <h3 class="text-base font-medium text-gray-900 dark:text-white mb-3">物流跟踪</h3>
            <div class="border-l-2 border-blue-600 dark:border-blue-400 pl-4 space-y-6">
              <div v-for="(log, index) in order.logistics" :key="index" class="relative">
                <div class="absolute -left-[21px] w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-400"></div>
                <div class="text-sm">
                  <p class="font-medium text-gray-900 dark:text-white">{{ log.message }}</p>
                  <p class="text-gray-500 dark:text-gray-400 mt-1">{{ formatDate(log.time, 'YYYY-MM-DD HH:mm') }}</p>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-8">
            <p class="text-gray-500 dark:text-gray-400">暂无物流信息</p>
          </div>
        </div>
        
        <!-- 操作按钮 -->
        <div class="flex justify-end space-x-4">
          <button v-if="order.status === 'delivered'" class="px-6 py-2 border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 rounded-md hover:bg-blue-50 dark:hover:bg-gray-800">
            评价订单
          </button>
          <button v-if="['pending', 'processing'].includes(order.status)" class="px-6 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800">
            取消订单
          </button>
          <button v-if="order.status === 'shipped'" class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            确认收货
          </button>
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
  title: '订单详情 - 外贸独立站',
  description: '查看您的订单详细信息和物流状态',
  ogTitle: '订单详情 - 外贸独立站',
  ogDescription: '查看您的订单详细信息和物流状态',
  ogImage: '/images/og-image.jpg',
})

// 获取路由参数
const route = useRoute()
const orderId = route.params.id as string

// 获取认证状态
const authStore = useAuthStore()
const router = useRouter()

// 如果用户未登录，重定向到登录页面
onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.push(`/login?redirect=/orders/${orderId}`)
  }
})

// 状态
const loading = ref<boolean>(true)
const error = ref<string | null>(null)
const order = ref<any>(null)

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

// 模拟获取订单数据
onMounted(async () => {
  try {
    loading.value = true
    
    // 模拟API请求延迟
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 模拟订单数据
    if (orderId === '1') {
      order.value = {
        id: '1',
        orderNumber: 'ORD20230001',
        orderDate: '2023-12-15T10:30:00',
        paymentMethod: '支付宝',
        paymentDate: '2023-12-15T10:35:00',
        status: 'delivered',
        subtotal: 29980,
        discount: 0,
        totalAmount: 29980,
        items: [
          {
            id: '101',
            name: 'Chanel Classic Flap 经典翻盖包',
            sku: 'CHANEL-CF-001',
            price: 29980,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80'
          }
        ],
        shipping: {
          name: '张三',
          phone: '13800138000',
          address: '上海市浦东新区张江高科技园区科苑路88号',
          fee: 0
        },
        logisticsStatus: 'delivered',
        logistics: [
          {
            message: '您的包裹已送达，感谢您的购买',
            time: '2023-12-20T14:25:00'
          },
          {
            message: '快递员正在派送途中，请保持电话畅通',
            time: '2023-12-20T09:15:00'
          },
          {
            message: '包裹已到达上海市浦东新区配送中心',
            time: '2023-12-19T18:30:00'
          },
          {
            message: '包裹已发出，开始运输',
            time: '2023-12-17T10:45:00'
          },
          {
            message: '商家已打包完成，等待发货',
            time: '2023-12-16T15:20:00'
          },
          {
            message: '订单已确认，等待商家发货',
            time: '2023-12-15T11:00:00'
          }
        ]
      }
    } else if (orderId === '2') {
      order.value = {
        id: '2',
        orderNumber: 'ORD20230002',
        orderDate: '2023-12-28T15:45:00',
        paymentMethod: '微信支付',
        paymentDate: '2023-12-28T15:48:00',
        status: 'shipped',
        subtotal: 18500,
        discount: 0,
        totalAmount: 18500,
        items: [
          {
            id: '201',
            name: 'Louis Vuitton Neverfull MM 手提包',
            sku: 'LV-NF-MM-001',
            price: 18500,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80'
          }
        ],
        shipping: {
          name: '李四',
          phone: '13900139000',
          address: '北京市海淀区中关村南大街5号',
          fee: 0
        },
        logisticsStatus: 'in_transit',
        logistics: [
          {
            message: '包裹正在运输中，预计3天内送达',
            time: '2023-12-30T09:15:00'
          },
          {
            message: '包裹已发出，开始运输',
            time: '2023-12-29T14:30:00'
          },
          {
            message: '商家已打包完成，等待发货',
            time: '2023-12-29T10:20:00'
          },
          {
            message: '订单已确认，等待商家发货',
            time: '2023-12-28T16:00:00'
          }
        ]
      }
    } else if (orderId === '3') {
      order.value = {
        id: '3',
        orderNumber: 'ORD20230003',
        orderDate: '2024-01-05T08:20:00',
        paymentMethod: '信用卡',
        paymentDate: '2024-01-05T08:25:00',
        status: 'processing',
        subtotal: 42800,
        discount: 0,
        totalAmount: 42800,
        items: [
          {
            id: '301',
            name: 'Hermès Birkin 30 手提包',
            sku: 'HERMES-B30-001',
            price: 35800,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80'
          },
          {
            id: '302',
            name: 'Gucci GG Marmont 链条包',
            sku: 'GUCCI-GGM-001',
            price: 7000,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80'
          }
        ],
        shipping: {
          name: '王五',
          phone: '13700137000',
          address: '广州市天河区天河路385号',
          fee: 0
        },
        logisticsStatus: 'processing',
        logistics: [
          {
            message: '订单正在处理中，我们将尽快发货',
            time: '2024-01-05T10:30:00'
          },
          {
            message: '订单已确认，等待商家发货',
            time: '2024-01-05T08:40:00'
          }
        ]
      }
    } else {
      error.value = '找不到该订单'
    }
  } catch (err) {
    error.value = '加载订单信息失败'
    console.error('Error fetching order:', err)
  } finally {
    loading.value = false
  }
})
</script> 