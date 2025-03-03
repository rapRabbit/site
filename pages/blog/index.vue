<template>
  <div class="py-8">
    <div class="container mx-auto px-4">
      <!-- 页面标题 -->
      <div class="mb-12 text-center">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">博客</h1>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          了解行业最新动态、产品使用技巧和公司新闻。我们定期更新博客内容，为您提供有价值的信息。
        </p>
      </div>
      
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- 博客列表 -->
        <div class="lg:w-2/3">
          <!-- 加载状态 -->
          <div v-if="pending" class="flex justify-center items-center py-20">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
          
          <!-- 博客文章列表 -->
          <div v-else class="space-y-8">
            <div
              v-for="post in paginatedPosts"
              :key="post.id"
              class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
            >
              <div class="md:flex">
                <div class="md:w-1/3">
                  <NuxtLink :to="`/blog/${post.slug}`">
                    <img
                      src="https://www.nuxtjs.cn/NUXTJS-logo-800.png"
                      :alt="post.title"
                      class="w-full h-48 object-cover"
                    />
                  </NuxtLink>
                </div>
                <div class="p-6 md:w-2/3">
                  <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <span>{{ formatDate(post.published_at) }}</span>
                    <span class="mx-2">•</span>
                    <span>{{ post.category }}</span>
                  </div>
                  <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    <NuxtLink :to="`/blog/${post.slug}`" class="hover:text-primary-600 dark:hover:text-primary-400">
                      {{ post.title }}
                    </NuxtLink>
                  </h2>
                  <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{{ post.excerpt }}</p>
                  <div class="flex items-center mt-4">
                    <img
                      src="https://www.nuxtjs.cn/NUXTJS-logo-800.png"
                      :alt="post.author.name"
                      class="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p class="text-sm font-medium text-gray-900 dark:text-white">{{ post.author.name }}</p>
                      <p class="text-sm text-gray-500 dark:text-gray-400">{{ post.author.title }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 分页控件 -->
          <div v-if="!pending && totalPages > 1" class="mt-8 flex justify-center">
            <nav class="flex items-center space-x-2">
              <button
                @click="prevPage"
                :disabled="currentPage === 1"
                :class="[
                  'px-3 py-1 rounded-md',
                  currentPage === 1
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                ]"
              >
                上一页
              </button>
              
              <button
                v-for="page in totalPages"
                :key="page"
                @click="goToPage(page)"
                :class="[
                  'px-3 py-1 rounded-md',
                  currentPage === page
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                ]"
              >
                {{ page }}
              </button>
              
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                :class="[
                  'px-3 py-1 rounded-md',
                  currentPage === totalPages
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                ]"
              >
                下一页
              </button>
            </nav>
          </div>
        </div>
        
        <!-- 侧边栏 -->
        <div class="lg:w-1/3 space-y-8">
          <!-- 搜索框 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">搜索</h3>
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索博客文章..."
                class="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white pr-10"
                @keyup.enter="search"
              />
              <button
                @click="search"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <Icon name="heroicons:magnifying-glass" class="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <!-- 分类 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">分类</h3>
            <ul class="space-y-2">
              <li v-for="category in categories" :key="category.id">
                <NuxtLink
                  :to="`/blog/category/${category.slug}`"
                  class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 flex justify-between items-center"
                >
                  <span>{{ category.name }}</span>
                  <span class="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded-full">
                    {{ category.count }}
                  </span>
                </NuxtLink>
              </li>
            </ul>
          </div>
          
          <!-- 最新文章 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">最新文章</h3>
            <ul class="space-y-4">
              <li v-for="post in recentPosts" :key="post.id" class="border-b border-gray-100 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
                <NuxtLink :to="`/blog/${post.slug}`" class="group">
                  <h4 class="text-gray-900 dark:text-white font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400 mb-1">
                    {{ post.title }}
                  </h4>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(post.published_at) }}</p>
                </NuxtLink>
              </li>
            </ul>
          </div>
          
          <!-- 标签云 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">标签</h3>
            <div class="flex flex-wrap gap-2">
              <NuxtLink
                v-for="tag in tags"
                :key="tag.id"
                :to="`/blog/tag/${tag.slug}`"
                class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-sm hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-600 dark:hover:text-primary-400"
              >
                {{ tag.name }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 页面元数据
useSeoMeta({
  title: '博客 - 外贸独立站',
  description: '了解行业最新动态、产品使用技巧和公司新闻',
  ogTitle: '博客 - 外贸独立站',
  ogDescription: '了解行业最新动态、产品使用技巧和公司新闻',
  ogImage: '/images/og-image.jpg',
})

// 搜索查询
const searchQuery = ref('')

// 分页状态
const currentPage = ref(1)
const perPage = ref(5)

// 获取博客文章数据
// const { data: posts, pending, error } = await useFetch('/api/blog/posts')
// 使用默认数据代替
const posts = ref(Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  title: `博客文章 ${i + 1}`,
  slug: `blog-post-${i + 1}`,
  excerpt: '这是一篇关于行业最新动态的博客文章。在这篇文章中，我们将探讨行业趋势、技术创新和市场变化。',
  content: '这是文章的完整内容...',
  image: 'https://www.nuxtjs.cn/NUXTJS-logo-800.png',
  published_at: new Date(Date.now() - i * 86400000).toISOString(),
  category: ['行业动态', '产品技巧', '公司新闻', '案例分析', '市场趋势'][i % 5],
  author: {
    name: ['张三', '李四', '王五', '赵六', '钱七'][i % 5],
    title: ['市场经理', '产品经理', '技术总监', '销售总监', 'CEO'][i % 5],
    avatar: 'https://www.nuxtjs.cn/NUXTJS-logo-800.png'
  },
  tags: ['外贸', '产品', '技术', '市场', '创新', '趋势'].sort(() => Math.random() - 0.5).slice(0, Math.floor(Math.random() * 4) + 1)
})))
const pending = ref(false)
const error = ref(null)

// 如果没有真实 API，使用模拟数据
// if (!posts.value) {
//   // 模拟博客文章数据
//   posts.value = Array.from({ length: 15 }, (_, i) => ({
//     id: i + 1,
//     title: `博客文章 ${i + 1}`,
//     slug: `blog-post-${i + 1}`,
//     excerpt: '这是一篇关于行业最新动态的博客文章。在这篇文章中，我们将探讨行业趋势、技术创新和市场变化。',
//     content: '这是文章的完整内容...',
//     image: `/images/blog-${(i % 6) + 1}.jpg`,
//     published_at: new Date(Date.now() - i * 86400000).toISOString(),
//     category: ['行业动态', '产品技巧', '公司新闻', '案例分析', '市场趋势'][i % 5],
//     author: {
//       name: ['张三', '李四', '王五', '赵六', '钱七'][i % 5],
//       title: ['市场经理', '产品经理', '技术总监', '销售总监', 'CEO'][i % 5],
//       avatar: `/images/avatar-${(i % 3) + 1}.jpg`
//     },
//     tags: ['外贸', '产品', '技术', '市场', '创新', '趋势'].sort(() => Math.random() - 0.5).slice(0, Math.floor(Math.random() * 4) + 1)
//   }))
// }

// 分类数据
const categories = [
  { id: 1, name: '行业动态', slug: 'industry-news', count: 8 },
  { id: 2, name: '产品技巧', slug: 'product-tips', count: 12 },
  { id: 3, name: '公司新闻', slug: 'company-news', count: 5 },
  { id: 4, name: '案例分析', slug: 'case-studies', count: 7 },
  { id: 5, name: '市场趋势', slug: 'market-trends', count: 9 }
]

// 标签数据
const tags = [
  { id: 1, name: '外贸', slug: 'foreign-trade' },
  { id: 2, name: '电子商务', slug: 'e-commerce' },
  { id: 3, name: '市场营销', slug: 'marketing' },
  { id: 4, name: '产品开发', slug: 'product-development' },
  { id: 5, name: '客户服务', slug: 'customer-service' },
  { id: 6, name: '国际贸易', slug: 'international-trade' },
  { id: 7, name: '技术创新', slug: 'technology-innovation' },
  { id: 8, name: '行业趋势', slug: 'industry-trends' },
  { id: 9, name: '案例分析', slug: 'case-analysis' }
]

// 计算最新文章
const recentPosts = computed(() => {
  if (!posts.value) return []
  return [...posts.value]
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    .slice(0, 5)
})

// 计算分页后的文章
const paginatedPosts = computed(() => {
  if (!posts.value) return []
  
  let filtered = [...posts.value]
  
  // 应用搜索筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(post => 
      post.title.toLowerCase().includes(query) || 
      post.excerpt.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query)
    )
  }
  
  // 应用分页
  const start = (currentPage.value - 1) * perPage.value
  const end = start + perPage.value
  return filtered.slice(start, end)
})

// 计算总页数
const totalPages = computed(() => {
  if (!posts.value) return 0
  
  let filtered = [...posts.value]
  
  // 应用搜索筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(post => 
      post.title.toLowerCase().includes(query) || 
      post.excerpt.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query)
    )
  }
  
  return Math.ceil(filtered.length / perPage.value)
})

// 分页方法
function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

function goToPage(page: number) {
  currentPage.value = page
}

// 搜索方法
function search() {
  currentPage.value = 1 // 重置到第一页
}

// 格式化日期
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}
</script> 