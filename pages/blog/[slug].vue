<template>
  <div class="py-8">
    <div class="container mx-auto px-4">
      <!-- 加载状态 -->
      <div v-if="pending" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
      
      <!-- 错误状态 -->
      <div v-else-if="error" class="text-center py-20">
        <h2 class="text-2xl font-bold text-red-600 mb-4">加载文章失败</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">{{ error.message }}</p>
        <NuxtLink to="/blog" class="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700">
          返回博客列表
        </NuxtLink>
      </div>
      
      <!-- 文章内容 -->
      <div v-else-if="post" class="flex flex-col lg:flex-row gap-8">
        <!-- 主要内容 -->
        <div class="lg:w-2/3">
          <!-- 文章头部 -->
          <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">{{ post.title }}</h1>
            <div class="flex items-center mb-6">
              <img
                src="https://www.nuxtjs.cn/NUXTJS-logo-800.png"
                :alt="post.author.name"
                class="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p class="font-medium text-gray-900 dark:text-white">{{ post.author.name }}</p>
                <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>{{ formatDate(post.published_at) }}</span>
                  <span class="mx-2">•</span>
                  <span>{{ post.category }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 特色图片 -->
          <div class="mb-8">
            <img
              src="https://www.nuxtjs.cn/NUXTJS-logo-800.png"
              :alt="post.title"
              class="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          
          <!-- 文章内容 -->
          <div class="prose prose-lg dark:prose-invert max-w-none mb-8">
            <div v-html="post.content"></div>
          </div>
          
          <!-- 标签 -->
          <div class="mb-8">
            <div class="flex flex-wrap gap-2">
              <NuxtLink
                v-for="(tag, index) in post.tags"
                :key="index"
                :to="`/blog/tag/${slugify(tag)}`"
                class="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-sm hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-600 dark:hover:text-primary-400"
              >
                {{ tag }}
              </NuxtLink>
            </div>
          </div>
          
          <!-- 分享按钮 -->
          <div class="mb-8 border-t border-b border-gray-200 dark:border-gray-700 py-6">
            <div class="flex items-center">
              <span class="text-gray-700 dark:text-gray-300 mr-4">分享文章:</span>
              <div class="flex space-x-4">
                <a href="#" class="text-gray-400 hover:text-blue-500" aria-label="分享到 Facebook">
                  <Icon name="mdi:facebook" class="w-6 h-6" />
                </a>
                <a href="#" class="text-gray-400 hover:text-blue-400" aria-label="分享到 Twitter">
                  <Icon name="mdi:twitter" class="w-6 h-6" />
                </a>
                <a href="#" class="text-gray-400 hover:text-green-500" aria-label="分享到微信">
                  <Icon name="mdi:wechat" class="w-6 h-6" />
                </a>
                <a href="#" class="text-gray-400 hover:text-red-500" aria-label="分享到微博">
                  <Icon name="mdi:sina-weibo" class="w-6 h-6" />
                </a>
                <a href="#" class="text-gray-400 hover:text-blue-600" aria-label="分享到 LinkedIn">
                  <Icon name="mdi:linkedin" class="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          
          <!-- 作者信息 -->
          <div class="mb-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <div class="flex items-start">
              <img
                src="https://www.nuxtjs.cn/NUXTJS-logo-800.png"
                :alt="post.author.name"
                class="w-16 h-16 rounded-full object-cover mr-6"
              />
              <div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ post.author.name }}</h3>
                <p class="text-gray-600 dark:text-gray-400 mb-4">{{ post.author.title }}</p>
                <p class="text-gray-600 dark:text-gray-400">
                  {{ post.author.bio || '资深行业专家，拥有多年行业经验，致力于分享专业知识和见解。' }}
                </p>
              </div>
            </div>
          </div>
          
          <!-- 相关文章 -->
          <div v-if="relatedPosts && relatedPosts.length > 0">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">相关文章</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                v-for="relatedPost in relatedPosts"
                :key="relatedPost.id"
                class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
              >
                <NuxtLink :to="`/blog/${relatedPost.slug}`">
                  <img
                    src="https://www.nuxtjs.cn/NUXTJS-logo-800.png"
                    :alt="relatedPost.title"
                    class="w-full h-40 object-cover"
                  />
                  <div class="p-4">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ relatedPost.title }}</h3>
                    <p class="text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">{{ relatedPost.excerpt }}</p>
                    <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span>{{ formatDate(relatedPost.published_at) }}</span>
                    </div>
                  </div>
                </NuxtLink>
              </div>
            </div>
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
              <li v-for="recentPost in recentPosts" :key="recentPost.id" class="border-b border-gray-100 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
                <NuxtLink :to="`/blog/${recentPost.slug}`" class="group">
                  <h4 class="text-gray-900 dark:text-white font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400 mb-1">
                    {{ recentPost.title }}
                  </h4>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(recentPost.published_at) }}</p>
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
// 获取路由参数
const route = useRoute()
const slug = route.params.slug as string

// 页面元数据
useSeoMeta({
  title: '博客文章 - 外贸独立站',
  description: '阅读我们的博客文章，了解行业最新动态',
  ogTitle: '博客文章 - 外贸独立站',
  ogDescription: '阅读我们的博客文章，了解行业最新动态',
  ogImage: '/images/og-image.jpg',
})

// 搜索查询
const searchQuery = ref('')

// 获取文章数据
// const { data: post, pending, error } = await useFetch(`/api/blog/posts/${slug}`)
// 使用默认数据代替
const post = ref({
  id: 1,
  title: `博客文章 ${slug}`,
  slug: slug,
  excerpt: '这是一篇关于行业最新动态的博客文章。在这篇文章中，我们将探讨行业趋势、技术创新和市场变化。',
  content: `
    <p>这是一篇关于行业最新动态的博客文章。在这篇文章中，我们将探讨行业趋势、技术创新和市场变化。</p>
    <h2>行业趋势</h2>
    <p>随着全球化的深入发展，外贸行业正在经历前所未有的变革。数字化转型、跨境电商的兴起以及消费者行为的变化，都在重塑外贸的格局。</p>
    <p>企业需要适应这些变化，采用新的策略和工具，才能在激烈的竞争中脱颖而出。</p>
    <h2>技术创新</h2>
    <p>人工智能、大数据分析和区块链等技术正在改变外贸的运作方式。这些技术可以帮助企业优化供应链、提高效率、降低成本，并提供更好的客户体验。</p>
    <p>例如，AI可以用于预测市场趋势，大数据分析可以帮助企业了解客户需求，区块链可以提高交易的透明度和安全性。</p>
    <h2>市场变化</h2>
    <p>新兴市场的崛起、贸易政策的变化以及环保意识的增强，都在影响外贸市场的发展方向。企业需要密切关注这些变化，并相应地调整自己的策略。</p>
    <p>同时，消费者越来越注重产品的质量、可持续性和社会责任，这也要求企业在产品开发和营销方面做出相应的调整。</p>
    <h2>结论</h2>
    <p>外贸行业正处于变革的时代，挑战与机遇并存。企业需要保持敏锐的洞察力，不断创新，才能在这个快速变化的环境中取得成功。</p>
  `,
  image: 'https://www.nuxtjs.cn/NUXTJS-logo-800.png',
  published_at: new Date().toISOString(),
  category: '行业动态',
  author: {
    name: '张三',
    title: '市场经理',
    avatar: 'https://www.nuxtjs.cn/NUXTJS-logo-800.png'
  },
  tags: ['外贸', '产品', '技术', '市场', '创新', '趋势']
})
const pending = ref(false)
const error = ref(null)

// 更新页面元数据
watchEffect(() => {
  if (post.value) {
    useSeoMeta({
      title: `${post.value.title} - 外贸独立站`,
      description: post.value.excerpt,
      ogTitle: `${post.value.title} - 外贸独立站`,
      ogDescription: post.value.excerpt,
      ogImage: post.value.image,
    })
  }
})

// 获取相关文章
// const { data: relatedPosts } = await useFetch('/api/blog/related', {
//   query: {
//     slug,
//     limit: 3
//   }
// })
// 使用默认数据代替
const relatedPosts = ref(Array.from({ length: 3 }, (_, i) => ({
  id: i + 2,
  title: `相关文章 ${i + 1}`,
  slug: `related-post-${i + 1}`,
  excerpt: '这是一篇相关的博客文章，内容与当前文章主题相关。',
  image: 'https://www.nuxtjs.cn/NUXTJS-logo-800.png',
  published_at: new Date(Date.now() - i * 86400000).toISOString(),
  category: ['行业动态', '产品技巧', '公司新闻'][i % 3],
  author: {
    name: ['李四', '王五', '赵六'][i % 3],
    avatar: 'https://www.nuxtjs.cn/NUXTJS-logo-800.png'
  }
})))

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

// 获取最新文章
// const { data: allPosts } = await useFetch('/api/blog/posts')
// 使用默认数据代替
const allPosts = ref(Array.from({ length: 10 }, (_, i) => ({
  id: i + 10,
  title: `最新文章 ${i + 1}`,
  slug: `latest-post-${i + 1}`,
  excerpt: '这是一篇最新发布的博客文章，内容丰富多彩。',
  image: 'https://www.nuxtjs.cn/NUXTJS-logo-800.png',
  published_at: new Date(Date.now() - i * 86400000).toISOString(),
  category: ['行业动态', '产品技巧', '公司新闻', '客户案例', '技术分享'][i % 5],
  author: {
    name: ['张三', '李四', '王五', '赵六', '钱七'][i % 5],
    avatar: 'https://www.nuxtjs.cn/NUXTJS-logo-800.png'
  }
})))

// 计算最新文章
const recentPosts = computed(() => {
  if (!allPosts.value) return []
  return [...allPosts.value]
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    .slice(0, 5)
})

// 搜索方法
function search() {
  navigateTo({
    path: '/blog',
    query: { q: searchQuery.value }
  })
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

// 将字符串转换为 slug
function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}
</script>

<style>
.prose h2 {
  @apply text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4;
}

.prose p {
  @apply text-gray-600 dark:text-gray-400 mb-4;
}

.prose ul {
  @apply list-disc list-inside text-gray-600 dark:text-gray-400 mb-4 pl-4;
}

.prose ol {
  @apply list-decimal list-inside text-gray-600 dark:text-gray-400 mb-4 pl-4;
}

.prose a {
  @apply text-blue-600 dark:text-blue-400 hover:underline;
}

.prose blockquote {
  @apply border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic text-gray-600 dark:text-gray-400 mb-4;
}

.prose img {
  @apply rounded-lg my-6;
}
</style> 