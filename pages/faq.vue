<template>
  <div class="py-12 bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4">
      <!-- 页面标题 -->
      <div class="text-center mb-12">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">常见问题</h1>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          我们收集了客户最常问的问题和答案，希望能帮助您快速找到所需信息。
        </p>
      </div>
      
      <!-- 搜索框 -->
      <div class="max-w-2xl mx-auto mb-12">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索问题..."
            class="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          <Icon name="heroicons:magnifying-glass" class="absolute left-4 top-3.5 w-5 h-5 text-gray-400 dark:text-gray-500" />
        </div>
      </div>
      
      <!-- 分类标签 -->
      <div class="flex flex-wrap justify-center gap-3 mb-10">
        <button
          v-for="category in categories"
          :key="category.id"
          @click="selectedCategory = category.id === selectedCategory ? null : category.id"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-colors',
            selectedCategory === category.id
              ? 'bg-primary-600 text-white'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          ]"
        >
          {{ category.name }}
        </button>
      </div>
      
      <!-- FAQ 内容 -->
      <div class="max-w-3xl mx-auto space-y-8">
        <div v-for="category in filteredCategories" :key="category.id" class="space-y-4">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">{{ category.name }}</h2>
          
          <div v-for="(faq, index) in filteredFaqs(category.id)" :key="index" class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <button
              @click="toggleFaq(faq.id)"
              class="w-full px-6 py-4 flex justify-between items-center text-left"
            >
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white pr-8">{{ faq.question }}</h3>
              <Icon
                :name="openFaqs.includes(faq.id) ? 'heroicons:minus-circle' : 'heroicons:plus-circle'"
                class="w-6 h-6 text-primary-600 dark:text-primary-400 flex-shrink-0"
              />
            </button>
            
            <div
              v-show="openFaqs.includes(faq.id)"
              class="px-6 pb-4 text-gray-600 dark:text-gray-400 prose dark:prose-invert max-w-none"
              v-html="faq.answer"
            ></div>
          </div>
          
          <div v-if="filteredFaqs(category.id).length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
            没有找到匹配的问题
          </div>
        </div>
      </div>
      
      <!-- 联系我们 -->
      <div class="mt-16 text-center">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">没有找到您的问题？</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          如果您有其他问题，请随时与我们联系，我们的客服团队将很乐意为您提供帮助。
        </p>
        <NuxtLink
          to="/contact"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          联系我们
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 页面元数据
useSeoMeta({
  title: '常见问题 - 外贸独立站',
  description: '查看我们的常见问题解答，获取有关产品、订单、支付和配送的详细信息',
  ogTitle: '常见问题 - 外贸独立站',
  ogDescription: '查看我们的常见问题解答，获取有关产品、订单、支付和配送的详细信息',
  ogImage: '/images/og-image.jpg',
})

// 状态
const searchQuery = ref('')
const selectedCategory = ref<string | null>(null)
const openFaqs = ref<string[]>([])

// 切换FAQ展开/折叠状态
function toggleFaq(id: string) {
  if (openFaqs.value.includes(id)) {
    openFaqs.value = openFaqs.value.filter(faqId => faqId !== id)
  } else {
    openFaqs.value.push(id)
  }
}

// FAQ分类
const categories = [
  { id: 'general', name: '一般问题' },
  { id: 'products', name: '产品相关' },
  { id: 'orders', name: '订单与配送' },
  { id: 'payment', name: '支付方式' },
  { id: 'returns', name: '退换货政策' },
  { id: 'account', name: '账户管理' }
]

// FAQ数据
const faqs = [
  {
    id: 'faq-1',
    categoryId: 'general',
    question: '你们的公司在哪里？',
    answer: '<p>我们的总部位于上海市浦东新区张江高科技园区，同时在深圳设有研发中心，在江苏设有生产基地。</p>'
  },
  {
    id: 'faq-2',
    categoryId: 'general',
    question: '如何联系客服？',
    answer: '<p>您可以通过以下方式联系我们的客服团队：</p><ul><li>电话：+86 123 4567 8910（工作时间：周一至周五 9:00-18:00）</li><li>邮箱：support@example.com</li><li>在线客服：点击网站右下角的聊天图标</li><li>填写<a href="/contact" class="text-primary-600 dark:text-primary-400 hover:underline">联系表单</a></li></ul>'
  },
  {
    id: 'faq-3',
    categoryId: 'products',
    question: '你们的产品有哪些认证？',
    answer: '<p>我们的产品已获得多项国际认证，包括：</p><ul><li>CE认证（欧盟）</li><li>FCC认证（美国）</li><li>RoHS认证（欧盟有害物质限制指令）</li><li>UL认证（美国保险商实验室）</li><li>CCC认证（中国强制性产品认证）</li></ul><p>具体产品的认证信息可在产品详情页查看。</p>'
  },
  {
    id: 'faq-4',
    categoryId: 'products',
    question: '如何获取产品样品？',
    answer: '<p>您可以通过以下步骤申请产品样品：</p><ol><li>在网站上注册账号并完善公司信息</li><li>选择您感兴趣的产品，点击"申请样品"按钮</li><li>填写样品申请表，包括您的具体需求和收货地址</li><li>我们的销售团队会在1-2个工作日内与您联系，确认样品申请并安排发货</li></ol><p>请注意，根据产品类型和您的地区，样品可能需要收取一定费用。</p>'
  },
  {
    id: 'faq-5',
    categoryId: 'orders',
    question: '下单后多久发货？',
    answer: '<p>我们的发货时间取决于产品库存状态：</p><ul><li>现货产品：确认付款后1-3个工作日内发货</li><li>定制产品：根据定制要求和生产周期，通常需要7-15个工作日</li><li>预售产品：请参考产品页面上的预计发货日期</li></ul><p>发货后，您将收到含有物流跟踪号的邮件通知。</p>'
  },
  {
    id: 'faq-6',
    categoryId: 'orders',
    question: '支持哪些物流方式？',
    answer: '<p>我们支持多种国际物流方式，包括：</p><ul><li>DHL Express（3-5个工作日）</li><li>FedEx International Priority（3-5个工作日）</li><li>UPS Worldwide Expedited（3-5个工作日）</li><li>EMS（5-10个工作日）</li><li>海运（20-40天，仅适用于大宗订单）</li></ul><p>具体可选的物流方式将在结账时显示，物流时间仅供参考，可能因目的地国家/地区的海关处理而有所不同。</p>'
  },
  {
    id: 'faq-7',
    categoryId: 'payment',
    question: '支持哪些付款方式？',
    answer: '<p>我们支持以下付款方式：</p><ul><li>信用卡（Visa、MasterCard、American Express）</li><li>PayPal</li><li>银行转账（T/T）</li><li>支付宝（Alipay）</li><li>微信支付（WeChat Pay）</li><li>信用证（L/C，适用于大额订单）</li></ul><p>不同的付款方式可能有不同的处理时间，例如，银行转账通常需要3-5个工作日才能确认付款。</p>'
  },
  {
    id: 'faq-8',
    categoryId: 'payment',
    question: '如何申请商业发票？',
    answer: '<p>您可以在下单时在备注中注明需要商业发票，并提供以下信息：</p><ul><li>公司名称</li><li>公司地址</li><li>税号或VAT号码</li><li>联系人和电话</li></ul><p>您也可以在订单确认后通过邮件联系我们的客服团队申请商业发票。我们将根据您提供的信息准备发票，并随货发送或通过邮件发送电子版。</p>'
  },
  {
    id: 'faq-9',
    categoryId: 'returns',
    question: '退换货政策是什么？',
    answer: '<p>我们的退换货政策如下：</p><ul><li>产品质量问题：收到产品后30天内可申请退换货，运费由我们承担</li><li>非质量问题：收到产品后7天内可申请退换货，运费由客户承担</li><li>定制产品：除非存在明显质量问题，否则不支持退换货</li></ul><p>申请退换货时，请提供订单号、产品信息、问题描述和相关照片/视频证据。我们的客服团队会在2个工作日内处理您的申请。</p>'
  },
  {
    id: 'faq-10',
    categoryId: 'returns',
    question: '产品保修期是多久？',
    answer: '<p>我们的产品保修期如下：</p><ul><li>电子产品：自收到产品之日起12个月</li><li>机械部件：自收到产品之日起6个月</li><li>耗材和配件：自收到产品之日起3个月</li></ul><p>保修范围仅限于正常使用条件下的材料和工艺缺陷，不包括以下情况：</p><ul><li>人为损坏或误用</li><li>自然磨损</li><li>未经授权的修改或维修</li><li>不可抗力因素导致的损坏</li></ul><p>如需申请保修服务，请联系我们的客服团队。</p>'
  },
  {
    id: 'faq-11',
    categoryId: 'account',
    question: '如何注册账号？',
    answer: '<p>注册账号的步骤如下：</p><ol><li>点击网站右上角的"注册"按钮</li><li>填写您的电子邮箱、密码和基本信息</li><li>点击"注册"按钮提交</li><li>前往您的邮箱，点击验证邮件中的链接激活账号</li><li>完成注册后，您可以登录并完善您的个人或公司信息</li></ol>'
  },
  {
    id: 'faq-12',
    categoryId: 'account',
    question: '忘记密码怎么办？',
    answer: '<p>如果您忘记了密码，可以通过以下步骤重置：</p><ol><li>点击登录页面的"忘记密码"链接</li><li>输入您注册时使用的电子邮箱</li><li>点击"发送重置链接"按钮</li><li>前往您的邮箱，点击重置密码邮件中的链接</li><li>在新页面中设置新密码</li><li>使用新密码登录您的账号</li></ol><p>如果您没有收到重置密码的邮件，请检查垃圾邮件文件夹或联系客服团队获取帮助。</p>'
  }
]

// 根据分类和搜索过滤FAQ
const filteredCategories = computed(() => {
  if (!selectedCategory && !searchQuery.value) {
    return categories
  }
  
  if (selectedCategory && !searchQuery.value) {
    return categories.filter(category => category.id === selectedCategory.value)
  }
  
  // 如果有搜索词，先找出匹配的FAQ，再返回包含这些FAQ的分类
  const matchingFaqCategoryIds = faqs
    .filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    .map(faq => faq.categoryId)
  
  const uniqueCategoryIds = [...new Set(matchingFaqCategoryIds)]
  
  if (selectedCategory) {
    return uniqueCategoryIds.includes(selectedCategory.value) 
      ? categories.filter(category => category.id === selectedCategory.value)
      : []
  }
  
  return categories.filter(category => uniqueCategoryIds.includes(category.id))
})

// 根据分类和搜索过滤FAQ
function filteredFaqs(categoryId: string) {
  return faqs
    .filter(faq => faq.categoryId === categoryId)
    .filter(faq => {
      if (!searchQuery.value) return true
      
      const query = searchQuery.value.toLowerCase()
      return (
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query)
      )
    })
}
</script> 