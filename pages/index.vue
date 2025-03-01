<template>
  <div>
    <!-- 轮播图 -->
    <section class="relative">
      <div class="relative h-[500px] overflow-hidden">
        <div
          v-for="(slide, index) in slides"
          :key="index"
          :class="[
            'absolute inset-0 transition-opacity duration-1000',
            { 'opacity-100': currentSlide === index, 'opacity-0': currentSlide !== index }
          ]"
        >
          <NuxtImg
            :src="slide.image"
            alt="Banner"
            class="w-full h-full object-cover"
            width="1920"
            height="500"
            placeholder
          />
          <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center">
            <div class="container mx-auto px-4">
              <div class="max-w-xl">
                <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">{{ slide.title }}</h1>
                <p class="text-xl text-white mb-8">{{ slide.description }}</p>
                <NuxtLink
                  :to="slide.buttonLink"
                  class="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 inline-block"
                >
                  {{ slide.buttonText }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 轮播指示器 -->
      <div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        <button
          v-for="(_, index) in slides"
          :key="index"
          @click="currentSlide = index"
          :class="[
            'w-3 h-3 rounded-full',
            currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'
          ]"
          aria-label="切换轮播图"
        ></button>
      </div>
    </section>
    
    <!-- 产品分类 -->
    <section class="py-16 bg-gray-50 dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">产品分类</h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            我们提供多种高质量产品，满足您的各种需求。浏览我们的产品分类，找到适合您的产品。
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(category, index) in categories"
            :key="index"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
          >
            <NuxtImg
              :src="category.image"
              :alt="category.name"
              class="w-full h-48 object-cover"
              width="400"
              height="200"
              placeholder
            />
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">{{ category.name }}</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">{{ category.description }}</p>
              <NuxtLink
                :to="category.link"
                class="text-primary-600 dark:text-primary-400 hover:underline font-medium inline-flex items-center"
              >
                查看产品
                <Icon name="heroicons:arrow-right" class="w-4 h-4 ml-1" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 关于我们 -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center">
          <div class="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <NuxtImg
              src="/images/about-us.jpg"
              alt="关于我们"
              class="rounded-lg shadow-lg w-full"
              width="600"
              height="400"
              placeholder
            />
          </div>
          <div class="md:w-1/2">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">关于我们</h2>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              我们是一家专业的外贸公司，致力于为全球客户提供高质量的产品和服务。我们的团队由经验丰富的专业人士组成，他们在各自领域拥有深厚的知识和技能。
            </p>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              我们的使命是通过提供卓越的产品和服务，帮助客户实现他们的目标。我们注重质量、创新和客户满意度，不断追求卓越，为客户创造价值。
            </p>
            <NuxtLink
              to="/contact"
              class="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 inline-block"
            >
              联系我们
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 客户评价 -->
    <section class="py-16 bg-gray-50 dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">客户评价</h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            听听我们的客户怎么说。以下是一些来自全球各地客户的真实评价。
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(testimonial, index) in testimonials"
            :key="index"
            class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <div class="flex items-center mb-4">
              <div class="text-yellow-400 flex">
                <Icon v-for="i in 5" :key="i" name="heroicons:star" class="w-5 h-5" />
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-400 mb-6 italic">{{ testimonial.content }}</p>
            <div class="flex items-center">
              <NuxtImg
                :src="testimonial.avatar"
                :alt="testimonial.name"
                class="w-12 h-12 rounded-full object-cover mr-4"
                width="48"
                height="48"
                placeholder
              />
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white">{{ testimonial.name }}</h4>
                <p class="text-gray-500 dark:text-gray-500 text-sm">{{ testimonial.position }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// 页面元数据
useSeoMeta({
  title: '外贸独立站 - 首页',
  description: '专业的外贸独立站，提供优质产品和服务',
  ogTitle: '外贸独立站 - 首页',
  ogDescription: '专业的外贸独立站，提供优质产品和服务',
  ogImage: '/images/og-image.jpg',
})

// 轮播图数据
const slides = [
  {
    title: '高品质产品，全球配送',
    description: '我们提供多种高品质产品，并支持全球配送，让您无论身在何处都能享受我们的服务。',
    image: '/images/banner-1.jpg',
    buttonText: '浏览产品',
    buttonLink: '/product'
  },
  {
    title: '专业团队，优质服务',
    description: '我们的团队由经验丰富的专业人士组成，致力于为您提供最优质的服务。',
    image: '/images/banner-2.jpg',
    buttonText: '了解更多',
    buttonLink: '/about'
  },
  {
    title: '创新技术，引领行业',
    description: '我们不断创新，采用最新技术，引领行业发展，为客户创造更多价值。',
    image: '/images/banner-3.jpg',
    buttonText: '联系我们',
    buttonLink: '/contact'
  }
]

// 产品分类数据
const categories = [
  {
    name: '电子产品',
    description: '高品质电子产品，包括智能手机、平板电脑、笔记本电脑等。',
    image: '/images/category-1.jpg',
    link: '/product/electronics'
  },
  {
    name: '家居用品',
    description: '精美家居用品，让您的家更舒适、更美丽。',
    image: '/images/category-2.jpg',
    link: '/product/home'
  },
  {
    name: '时尚服饰',
    description: '时尚服饰，展现您的个人风格和魅力。',
    image: '/images/category-3.jpg',
    link: '/product/fashion'
  }
]

// 客户评价数据
const testimonials = [
  {
    content: '我非常满意他们的产品和服务。产品质量很好，客服也很专业，解决问题迅速。强烈推荐！',
    name: 'John Smith',
    position: 'CEO, Tech Solutions',
    avatar: '/images/avatar-1.jpg'
  },
  {
    content: '他们的产品超出了我的预期。价格合理，质量上乘，配送也很快。我会继续购买他们的产品。',
    name: 'Emily Johnson',
    position: 'Marketing Director, Global Brands',
    avatar: '/images/avatar-2.jpg'
  },
  {
    content: '作为一个长期客户，我对他们的服务一直很满意。他们总是能及时响应我的需求，提供专业的解决方案。',
    name: 'Michael Chen',
    position: 'Purchasing Manager, Retail Group',
    avatar: '/images/avatar-3.jpg'
  }
]

// 轮播图控制
const currentSlide = ref(0)

// 自动轮播
onMounted(() => {
  const interval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
  }, 5000)
  
  onBeforeUnmount(() => {
    clearInterval(interval)
  })
})
</script> 