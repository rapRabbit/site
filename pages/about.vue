<template>
  <div class="py-12 bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4">
      <!-- 页面标题 -->
      <div class="text-center mb-12">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">关于我们</h1>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          我们是一家专注于全球贸易的创新企业，致力于为客户提供高品质的产品和卓越的服务。
        </p>
      </div>
      
      <!-- 公司简介 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-12">
        <div class="flex flex-col md:flex-row gap-8 items-center">
          <div class="md:w-1/2">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">公司简介</h2>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              成立于2010年，我们公司专注于为全球客户提供高品质的产品和解决方案。经过多年的发展，我们已成为行业内领先的供应商，产品远销全球超过50个国家和地区。
            </p>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              我们拥有先进的生产设备和专业的研发团队，不断创新和改进产品，以满足客户不断变化的需求。我们严格控制产品质量，确保每一件产品都符合国际标准。
            </p>
            <p class="text-gray-600 dark:text-gray-400">
              我们的使命是通过提供卓越的产品和服务，帮助客户实现业务增长，同时为全球贸易的发展做出贡献。
            </p>
          </div>
          <div class="md:w-1/2">
            <img src="https://www.nuxtjs.cn/NUXTJS-logo-800.png" alt="公司照片" class="rounded-lg shadow-md w-full h-auto" />
          </div>
        </div>
      </div>
      
      <!-- 我们的价值观 -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">我们的价值观</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <div class="flex justify-center mb-4">
              <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                <Icon name="heroicons:star" class="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">卓越品质</h3>
            <p class="text-gray-600 dark:text-gray-400">
              我们坚持高标准，追求卓越品质，确保每一件产品都能满足客户的期望。
            </p>
          </div>
          
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <div class="flex justify-center mb-4">
              <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                <Icon name="heroicons:light-bulb" class="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">创新精神</h3>
            <p class="text-gray-600 dark:text-gray-400">
              我们不断创新，探索新技术和新方法，为客户提供更好的产品和解决方案。
            </p>
          </div>
          
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <div class="flex justify-center mb-4">
              <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                <Icon name="heroicons:user-group" class="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">客户至上</h3>
            <p class="text-gray-600 dark:text-gray-400">
              我们以客户为中心，倾听客户需求，提供个性化的服务，建立长期的合作关系。
            </p>
          </div>
          
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <div class="flex justify-center mb-4">
              <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                <Icon name="heroicons:globe-alt" class="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">全球视野</h3>
            <p class="text-gray-600 dark:text-gray-400">
              我们拥有全球视野，了解不同市场的需求，为全球客户提供本地化的产品和服务。
            </p>
          </div>
        </div>
      </div>
      
      <!-- 发展历程 -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">发展历程</h2>
        <div class="relative">
          <!-- 时间线 -->
          <div class="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-300 dark:bg-gray-700"></div>
          
          <!-- 时间点 -->
          <div class="space-y-12">
            <div v-for="(milestone, index) in milestones" :key="index" class="relative">
              <div class="flex items-center justify-center">
                <div class="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary-600 dark:bg-primary-500 z-10"></div>
              </div>
              
              <div :class="[
                'bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 w-5/12',
                index % 2 === 0 ? 'ml-auto' : 'mr-auto'
              ]">
                <div class="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">{{ milestone.year }}</div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">{{ milestone.title }}</h3>
                <p class="text-gray-600 dark:text-gray-400">{{ milestone.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 我们的团队 -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">我们的团队</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div v-for="(member, index) in teamMembers" :key="index" class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <img src="https://www.nuxtjs.cn/NUXTJS-logo-800.png" :alt="member.name" class="w-full h-64 object-cover object-center" />
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-1">{{ member.name }}</h3>
              <p class="text-primary-600 dark:text-primary-400 mb-3">{{ member.position }}</p>
              <p class="text-gray-600 dark:text-gray-400 mb-4">{{ member.bio }}</p>
              <div class="flex space-x-3">
                <a v-for="(social, socialIndex) in member.socials" :key="socialIndex" :href="social.url" target="_blank" rel="noopener noreferrer" class="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                  <Icon :name="social.icon" class="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 合作伙伴 -->
      <div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">合作伙伴</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <div v-for="(partner, index) in partners" :key="index" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center justify-center">
            <img src="https://www.nuxtjs.cn/NUXTJS-logo-800.png" :alt="partner.name" class="max-h-16" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 页面元数据
useSeoMeta({
  title: '关于我们 - 外贸独立站',
  description: '了解我们的公司历史、团队成员、价值观和使命',
  ogTitle: '关于我们 - 外贸独立站',
  ogDescription: '了解我们的公司历史、团队成员、价值观和使命',
  ogImage: '/images/og-image.jpg',
})

// 发展历程
const milestones = [
  {
    year: '2010',
    title: '公司成立',
    description: '我们的公司在上海成立，开始专注于电子产品的研发和生产。'
  },
  {
    year: '2013',
    title: '国际市场拓展',
    description: '我们开始将产品出口到亚洲和欧洲市场，建立了第一批国际合作伙伴关系。'
  },
  {
    year: '2015',
    title: '研发中心成立',
    description: '我们在深圳设立了研发中心，加大对新产品和新技术的投入。'
  },
  {
    year: '2017',
    title: '获得国际认证',
    description: '我们的产品获得了多项国际认证，包括CE、FCC和RoHS等。'
  },
  {
    year: '2019',
    title: '生产基地扩建',
    description: '我们扩建了生产基地，引进了先进的自动化生产设备，提高了生产效率和产品质量。'
  },
  {
    year: '2021',
    title: '数字化转型',
    description: '我们启动了数字化转型计划，建立了在线销售平台，拓展了电子商务渠道。'
  },
  {
    year: '2023',
    title: '可持续发展战略',
    description: '我们制定了可持续发展战略，致力于减少环境影响，推出了一系列环保产品。'
  }
]

// 团队成员
const teamMembers = [
  {
    name: '张明',
    position: '首席执行官',
    bio: '拥有20年行业经验，曾在多家跨国公司担任高管职位。致力于公司的战略发展和全球化布局。',
    image: '/images/team/ceo.jpg',
    socials: [
      { icon: 'mdi:linkedin', url: '#' },
      { icon: 'mdi:twitter', url: '#' }
    ]
  },
  {
    name: '李娜',
    position: '首席运营官',
    bio: '负责公司的日常运营和业务发展，拥有丰富的供应链管理和国际贸易经验。',
    image: '/images/team/coo.jpg',
    socials: [
      { icon: 'mdi:linkedin', url: '#' },
      { icon: 'mdi:twitter', url: '#' }
    ]
  },
  {
    name: '王强',
    position: '技术总监',
    bio: '领导研发团队，专注于产品创新和技术突破，拥有多项专利。',
    image: '/images/team/cto.jpg',
    socials: [
      { icon: 'mdi:linkedin', url: '#' },
      { icon: 'mdi:github', url: '#' }
    ]
  },
  {
    name: '陈静',
    position: '市场总监',
    bio: '负责品牌建设和市场推广，擅长数字营销和国际市场开发。',
    image: '/images/team/cmo.jpg',
    socials: [
      { icon: 'mdi:linkedin', url: '#' },
      { icon: 'mdi:instagram', url: '#' }
    ]
  }
]

// 合作伙伴
const partners = [
  { name: '合作伙伴1', logo: '/images/partners/partner1.png' },
  { name: '合作伙伴2', logo: '/images/partners/partner2.png' },
  { name: '合作伙伴3', logo: '/images/partners/partner3.png' },
  { name: '合作伙伴4', logo: '/images/partners/partner4.png' },
  { name: '合作伙伴5', logo: '/images/partners/partner5.png' },
  { name: '合作伙伴6', logo: '/images/partners/partner6.png' }
]
</script> 