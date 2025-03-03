<template>
  <div class="py-12 bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4">
      <!-- 页面标题 -->
      <div class="text-center mb-12">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">联系我们</h1>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          如果您有任何问题、建议或合作意向，请随时与我们联系。我们的团队将尽快回复您。
        </p>
      </div>
      
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- 联系表单 -->
        <div class="lg:w-2/3 bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">发送消息</h2>
          
          <!-- 成功提示 -->
          <div v-if="submitted" class="bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-4 rounded-md mb-6">
            <div class="flex">
              <Icon name="heroicons:check-circle" class="h-5 w-5 mr-2" />
              <p>您的消息已成功发送！我们将尽快与您联系。</p>
            </div>
          </div>
          
          <!-- 错误提示 -->
          <div v-if="error" class="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-md mb-6">
            <div class="flex">
              <Icon name="heroicons:exclamation-circle" class="h-5 w-5 mr-2" />
              <p>{{ error }}</p>
            </div>
          </div>
          
          <!-- 联系表单 -->
          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- 姓名 -->
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  姓名 <span class="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="请输入您的姓名"
                />
              </div>
              
              <!-- 邮箱 -->
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  邮箱 <span class="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="请输入您的邮箱地址"
                />
              </div>
            </div>
            
            <!-- 电话 -->
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                电话
              </label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="请输入您的电话号码（选填）"
              />
            </div>
            
            <!-- 主题 -->
            <div v-if="false">
              <label for="subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                主题 <span class="text-red-500">*</span>
              </label>
              <select
                id="subject"
                v-model="form.subject"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="" disabled selected>请选择主题</option>
                <option value="general">一般咨询</option>
                <option value="product">产品咨询</option>
                <option value="support">技术支持</option>
                <option value="partnership">合作伙伴</option>
                <option value="other">其他</option>
              </select>
            </div>
            
            <!-- 消息 -->
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                消息 <span class="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                v-model="form.message"
                rows="5"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="请输入您的消息"
              ></textarea>
            </div>
            
            <!-- 提交按钮 -->
            <div>
              <button
                type="submit"
                class="w-full md:w-auto px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center justify-center"
                :disabled="loading"
              >
                <span v-if="loading" class="flex items-center">
                  <Icon name="heroicons:arrow-path" class="animate-spin h-5 w-5 mr-2" />
                  发送中...
                </span>
                <span v-else>发送消息</span>
              </button>
            </div>
          </form>
        </div>
        
        <!-- 联系信息 -->
        <div class="lg:w-1/3 space-y-8">
          <!-- 联系方式 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">联系方式</h3>
            <ul class="space-y-4">
              <li class="flex items-start">
                <Icon name="heroicons:map-pin" class="w-5 h-5 text-primary-600 dark:text-primary-400 mt-1 mr-3" />
                <div>
                  <p class="text-gray-700 dark:text-gray-300 font-medium">地址</p>
                  <p class="text-gray-600 dark:text-gray-400">上海市浦东新区张江高科技园区</p>
                </div>
              </li>
              <li class="flex items-start">
                <Icon name="heroicons:phone" class="w-5 h-5 text-primary-600 dark:text-primary-400 mt-1 mr-3" />
                <div>
                  <p class="text-gray-700 dark:text-gray-300 font-medium">电话</p>
                  <p class="text-gray-600 dark:text-gray-400">+86 123 4567 8910</p>
                </div>
              </li>
              <li class="flex items-start">
                <Icon name="heroicons:envelope" class="w-5 h-5 text-primary-600 dark:text-primary-400 mt-1 mr-3" />
                <div>
                  <p class="text-gray-700 dark:text-gray-300 font-medium">邮箱</p>
                  <p class="text-gray-600 dark:text-gray-400">info@example.com</p>
                </div>
              </li>
              <li class="flex items-start">
                <Icon name="heroicons:clock" class="w-5 h-5 text-primary-600 dark:text-primary-400 mt-1 mr-3" />
                <div>
                  <p class="text-gray-700 dark:text-gray-300 font-medium">工作时间</p>
                  <p class="text-gray-600 dark:text-gray-400">周一至周五: 9:00 - 18:00</p>
                  <p class="text-gray-600 dark:text-gray-400">周六至周日: 休息</p>
                </div>
              </li>
            </ul>
          </div>
          
          <!-- 社交媒体 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">关注我们</h3>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                <Icon name="mdi:facebook" class="w-6 h-6" />
              </a>
              <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                <Icon name="mdi:twitter" class="w-6 h-6" />
              </a>
              <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                <Icon name="mdi:instagram" class="w-6 h-6" />
              </a>
              <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                <Icon name="mdi:linkedin" class="w-6 h-6" />
              </a>
              <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                <Icon name="mdi:wechat" class="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <!-- 地图 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">我们的位置</h3>
            <div class="h-64 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
              <!-- 这里可以嵌入地图，例如谷歌地图或百度地图 -->
              <!-- 由于无法直接嵌入地图，这里使用占位图 -->
              <div class="w-full h-full flex items-center justify-center">
                <p class="text-gray-500 dark:text-gray-400">地图加载中...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- FAQ 部分 -->
      <div class="mt-16">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">常见问题</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="(faq, index) in faqs" :key="index" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ faq.question }}</h3>
            <p class="text-gray-600 dark:text-gray-400">{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// 类型定义
interface ContactForm {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

interface FAQ {
  question: string
  answer: string
}

// 页面元数据
useSeoMeta({
  title: '联系我们 - 外贸独立站',
  description: '如果您有任何问题、建议或合作意向，请随时与我们联系',
  ogTitle: '联系我们 - 外贸独立站',
  ogDescription: '如果您有任何问题、建议或合作意向，请随时与我们联系',
  ogImage: '/images/og-image.jpg',
})

// 表单数据
const form = reactive<ContactForm>({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

// 状态
const loading = ref(false)
const submitted = ref(false)
const error = ref('')

// 提交表单
async function submitForm() {
  try {
    loading.value = true
    error.value = ''
    
    // 模拟 API 调用
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    // 在实际应用中，这里应该调用后端 API
    // await $fetch('/api/contact', {
    //   method: 'POST',
    //   body: form
    // })
    
    // 重置表单
    Object.keys(form).forEach(key => {
      form[key as keyof ContactForm] = ''
    })
    
    // 显示成功消息
    submitted.value = true
    
    // 5秒后隐藏成功消息
    setTimeout(() => {
      submitted.value = false
    }, 5000)
  } catch (err: any) {
    error.value = err.message || '发送消息失败，请稍后再试'
  } finally {
    loading.value = false
  }
}

// 常见问题
const faqs = ref<FAQ[]>([
  {
    question: '如何下订单？',
    answer: '您可以通过我们的网站浏览产品，选择您需要的产品，添加到购物车，然后按照结账流程完成订单。'
  },
  {
    question: '支持哪些付款方式？',
    answer: '我们支持多种付款方式，包括信用卡、PayPal、银行转账和支付宝等。'
  },
  {
    question: '产品发货时间是多久？',
    answer: '一般情况下，我们会在确认付款后的1-3个工作日内发货。具体发货时间可能因产品和目的地而异。'
  },
  {
    question: '如何跟踪我的订单？',
    answer: '订单发货后，我们会通过邮件发送跟踪号码给您。您可以使用该号码在物流公司的网站上跟踪您的包裹。'
  }
])
</script> 