<template>
  <div class="py-8">
    <div class="container mx-auto px-4">
      <!-- 页面标题 -->
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">产品列表</h1>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          浏览我们的产品列表，找到适合您的高品质产品。我们提供多种类型的产品，满足您的各种需求。
        </p>
      </div>
      
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- 筛选侧边栏 -->
        <div class="lg:w-1/4">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">筛选</h2>
            
            <!-- 分类筛选 -->
            <div class="mb-6">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">分类</h3>
              <div class="space-y-2">
                <div v-for="category in categories" :key="category.id" class="flex items-center">
                  <input
                    type="checkbox"
                    :id="`category-${category.id}`"
                    :value="category.id"
                    v-model="selectedCategories"
                    class="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                  />
                  <label :for="`category-${category.id}`" class="ml-2 text-gray-700 dark:text-gray-300">
                    {{ category.name }}
                  </label>
                </div>
              </div>
            </div>
            
            <!-- 价格筛选 -->
            <div class="mb-6">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">价格范围</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm text-gray-700 dark:text-gray-300 mb-1">最低价格</label>
                  <input
                    type="number"
                    v-model="priceRange.min"
                    class="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                    placeholder="最低价格"
                  />
                </div>
                <div>
                  <label class="block text-sm text-gray-700 dark:text-gray-300 mb-1">最高价格</label>
                  <input
                    type="number"
                    v-model="priceRange.max"
                    class="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                    placeholder="最高价格"
                  />
                </div>
              </div>
            </div>
            
            <!-- 排序方式 -->
            <div class="mb-6">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">排序方式</h3>
              <select
                v-model="sortBy"
                class="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              >
                <option value="newest">最新上架</option>
                <option value="price_asc">价格从低到高</option>
                <option value="price_desc">价格从高到低</option>
                <option value="popular">热门程度</option>
              </select>
            </div>
            
            <!-- 应用筛选按钮 -->
            <button
              @click="applyFilters"
              class="w-full py-2 px-4 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              应用筛选
            </button>
          </div>
        </div>
        
        <!-- 产品列表 -->
        <div class="lg:w-3/4">
          <!-- 产品列表头部 -->
          <div class="flex justify-between items-center mb-6">
            <p class="text-gray-600 dark:text-gray-400">
              显示 {{ products.length }} 个产品中的 {{ (currentPage - 1) * perPage + 1 }}-{{ Math.min(currentPage * perPage, products.length) }} 个
            </p>
            <div class="flex items-center">
              <label class="mr-2 text-gray-700 dark:text-gray-300">每页显示:</label>
              <select
                v-model="perPage"
                class="rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              >
                <option :value="12">12</option>
                <option :value="24">24</option>
                <option :value="36">36</option>
              </select>
            </div>
          </div>
          
          <!-- 产品网格 -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="product in paginatedProducts"
              :key="product.id"
              class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
            >
              <NuxtLink :to="`/product/${product.id}`">
                <img
                  :src="product.image"
                  :alt="product.name"
                  class="w-full h-48 object-cover"
                />
                <div class="p-4">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ product.name }}</h3>
                  <p class="text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">{{ product.description }}</p>
                  <div class="flex justify-between items-center">
                    <span class="text-primary-600 dark:text-primary-400 font-bold">${{ product.price.toFixed(2) }}</span>
                    <button
                      class="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-primary-900"
                      @click.prevent="addToCart(product)"
                    >
                      <Icon name="heroicons:shopping-cart" class="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </button>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
          
          <!-- 分页控件 -->
          <div class="mt-8 flex justify-center">
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

// 页面元数据
useSeoMeta({
  title: '产品列表 - 外贸独立站',
  description: '浏览我们的产品列表，找到适合您的高品质产品',
  ogTitle: '产品列表 - 外贸独立站',
  ogDescription: '浏览我们的产品列表，找到适合您的高品质产品',
  ogImage: '/images/og-image.jpg',
})

// 获取购物车 store
const cartStore = useCartStore()

// 分类数据
const categories = [
  { id: 1, name: '电子产品' },
  { id: 2, name: '家居用品' },
  { id: 3, name: '时尚服饰' },
  { id: 4, name: '运动户外' },
  { id: 5, name: '美妆护肤' }
]

// 筛选状态
const selectedCategories = ref<number[]>([])
const priceRange = ref({
  min: null as number | null,
  max: null as number | null
})
const sortBy = ref('newest')

// 分页状态
const currentPage = ref(1)
const perPage = ref(12)

// 模拟产品数据
const luxuryBags = [
  {
    id: 1,
    name: 'Chanel Classic Flap 经典翻盖包',
    description: '香奈儿经典翻盖包，优雅的设计和精湛的工艺，是时尚界的永恒经典。',
    price: 29980,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80',
    category_id: 1
  },
  {
    id: 2,
    name: 'Louis Vuitton Neverfull MM 手提包',
    description: '路易威登Neverfull MM手提包，宽敞实用，经典的Monogram图案，是日常使用的理想选择。',
    price: 18500,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80',
    category_id: 1
  },
  {
    id: 3,
    name: 'Hermès Birkin 30 手提包',
    description: '爱马仕Birkin 30手提包，采用顶级皮革制作，手工缝制，是奢华与品质的象征。',
    price: 35800,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80',
    category_id: 1
  },
  {
    id: 4,
    name: 'Gucci GG Marmont 链条包',
    description: '古驰GG Marmont链条包，柔软的绗缝皮革和标志性的双G logo，时尚而经典。',
    price: 7000,
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80',
    category_id: 2
  },
  {
    id: 5,
    name: 'Dior Lady Dior 手提包',
    description: '迪奥Lady Dior手提包，经典的菱格纹和金属字母吊饰，优雅而精致。',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80',
    category_id: 2
  }
];

// 生成更多产品数据
const products = ref([
  ...luxuryBags,
  ...Array.from({ length: 45 }, (_, i) => {
    const bagIndex = i % luxuryBags.length;
    const bag = luxuryBags[bagIndex];
    return {
      id: i + 6,
      name: `${bag.name} - 限量版 ${i + 1}`,
      description: bag.description,
      price: Math.floor(bag.price * (0.9 + Math.random() * 0.3)),
      image: bag.image,
      category_id: Math.floor(Math.random() * 5) + 1
    };
  })
]);

// 获取产品数据
// const { data: fetchedProducts, pending } = await useFetch('/api/products')
// if (fetchedProducts.value) {
//   products.value = fetchedProducts.value
// }
const pending = ref(false)

// 计算筛选后的产品
const filteredProducts = computed(() => {
  let result = [...products.value]
  
  // 应用分类筛选
  if (selectedCategories.value.length > 0) {
    result = result.filter(product => selectedCategories.value.includes(product.category_id))
  }
  
  // 应用价格筛选
  if (priceRange.value.min !== null) {
    result = result.filter(product => product.price >= (priceRange.value.min || 0))
  }
  if (priceRange.value.max !== null) {
    result = result.filter(product => product.price <= (priceRange.value.max || Infinity))
  }
  
  // 应用排序
  switch (sortBy.value) {
    case 'price_asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price_desc':
      result.sort((a, b) => b.price - a.price)
      break
    case 'popular':
      // 这里可以根据实际情况排序，这里简单按 ID 排序
      result.sort((a, b) => b.id - a.id)
      break
    case 'newest':
    default:
      // 默认按最新排序，这里简单按 ID 排序
      result.sort((a, b) => b.id - a.id)
      break
  }
  
  return result
})

// 计算分页后的产品
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  const end = start + perPage.value
  return filteredProducts.value.slice(start, end)
})

// 计算总页数
const totalPages = computed(() => Math.ceil(filteredProducts.value.length / perPage.value))

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

// 应用筛选
function applyFilters() {
  currentPage.value = 1 // 重置到第一页
}

// 添加到购物车
function addToCart(product: any) {
  cartStore.addItem(product)
  // 显示提示
  // 这里可以使用 Nuxt UI 的 toast 或其他通知组件
}

// 监听每页显示数量变化
watch(perPage, () => {
  currentPage.value = 1 // 重置到第一页
})
</script> 