<template>
  <div class="py-8">
    <div class="container mx-auto px-4">
      <!-- 加载状态 -->
      <div v-if="pending" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
      
      <!-- 错误状态 -->
      <div v-else-if="error" class="text-center py-20">
        <h2 class="text-2xl font-bold text-red-600 mb-4">加载产品信息失败</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">{{ error.message }}</p>
        <NuxtLink to="/product" class="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700">
          返回产品列表
        </NuxtLink>
      </div>
      
      <!-- 产品详情 -->
      <div v-else-if="product" class="flex flex-col md:flex-row gap-8">
        <!-- 产品图片 -->
        <div class="md:w-1/2">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <NuxtImg
              :src="product.image"
              :alt="product.name"
              class="w-full h-auto object-cover"
              width="600"
              height="600"
              placeholder
            />
          </div>
          
          <!-- 缩略图 -->
          <div v-if="product.gallery && product.gallery.length > 0" class="mt-4 grid grid-cols-5 gap-2">
            <div
              v-for="(image, index) in product.gallery"
              :key="index"
              class="cursor-pointer border-2 rounded-md overflow-hidden"
              :class="{ 'border-primary-600': selectedImage === index, 'border-transparent': selectedImage !== index }"
              @click="selectImage(index)"
            >
              <NuxtImg
                :src="image"
                :alt="`${product.name} - 图片 ${index + 1}`"
                class="w-full h-20 object-cover"
                width="120"
                height="120"
                placeholder
              />
            </div>
          </div>
        </div>
        
        <!-- 产品信息 -->
        <div class="md:w-1/2">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">{{ product.name }}</h1>
          
          <!-- 价格和评分 -->
          <div class="flex items-center justify-between mb-6">
            <div class="text-2xl font-bold text-primary-600 dark:text-primary-400">
              ${{ product.price.toFixed(2) }}
            </div>
            <div class="flex items-center">
              <div class="flex text-yellow-400">
                <Icon v-for="i in 5" :key="i" name="heroicons:star" class="w-5 h-5" :class="{ 'text-gray-300': i > product.rating }" />
              </div>
              <span class="ml-2 text-gray-600 dark:text-gray-400">({{ product.reviews || 0 }} 评价)</span>
            </div>
          </div>
          
          <!-- 库存状态 -->
          <div class="mb-6">
            <span
              :class="[
                'px-3 py-1 rounded-full text-sm font-medium',
                product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              ]"
            >
              {{ product.stock > 0 ? '有库存' : '缺货' }}
            </span>
          </div>
          
          <!-- 产品描述 -->
          <div class="mb-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">产品描述</h2>
            <p class="text-gray-600 dark:text-gray-400">{{ product.description }}</p>
          </div>
          
          <!-- 产品特点 -->
          <div class="mb-6" v-if="product.features && product.features.length > 0">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">产品特点</h2>
            <ul class="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
              <li v-for="(feature, index) in product.features" :key="index">{{ feature }}</li>
            </ul>
          </div>
          
          <!-- 数量选择 -->
          <div class="mb-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">数量</h2>
            <div class="flex items-center">
              <button
                @click="decreaseQuantity"
                class="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-l-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                :disabled="quantity <= 1"
              >
                <Icon name="heroicons:minus" class="w-4 h-4" />
              </button>
              <input
                type="number"
                v-model="quantity"
                min="1"
                :max="product.stock"
                class="w-16 text-center border-y border-gray-300 dark:border-gray-700 py-1 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
              <button
                @click="increaseQuantity"
                class="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-r-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                :disabled="quantity >= product.stock"
              >
                <Icon name="heroicons:plus" class="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <!-- 操作按钮 -->
          <div class="flex space-x-4">
            <button
              @click="addToCart"
              class="flex-1 px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 flex items-center justify-center"
              :disabled="product.stock <= 0"
            >
              <Icon name="heroicons:shopping-cart" class="w-5 h-5 mr-2" />
              加入购物车
            </button>
            <button
              @click="buyNow"
              class="flex-1 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-md hover:bg-gray-800 dark:hover:bg-gray-600 flex items-center justify-center"
              :disabled="product.stock <= 0"
            >
              <Icon name="heroicons:bolt" class="w-5 h-5 mr-2" />
              立即购买
            </button>
          </div>
        </div>
      </div>
      
      <!-- 相关产品 -->
      <div v-if="relatedProducts && relatedProducts.length > 0" class="mt-16">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">相关产品</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div
            v-for="relatedProduct in relatedProducts"
            :key="relatedProduct.id"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
          >
            <NuxtLink :to="`/product/${relatedProduct.id}`">
              <NuxtImg
                :src="relatedProduct.image"
                :alt="relatedProduct.name"
                class="w-full h-48 object-cover"
                width="300"
                height="200"
                placeholder
              />
              <div class="p-4">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ relatedProduct.name }}</h3>
                <div class="flex justify-between items-center">
                  <span class="text-primary-600 dark:text-primary-400 font-bold">${{ relatedProduct.price.toFixed(2) }}</span>
                  <div class="flex text-yellow-400">
                    <Icon v-for="i in 5" :key="i" name="heroicons:star" class="w-4 h-4" :class="{ 'text-gray-300': i > relatedProduct.rating }" />
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

// 获取路由参数
const route = useRoute()
const productId = route.params.id as string

// 页面元数据
useSeoMeta({
  title: '产品详情 - 外贸独立站',
  description: '查看产品的详细信息，包括价格、特点和规格',
  ogTitle: '产品详情 - 外贸独立站',
  ogDescription: '查看产品的详细信息，包括价格、特点和规格',
  ogImage: '/images/og-image.jpg',
})

// 获取购物车 store
const cartStore = useCartStore()

// 获取产品数据
const { data: product, pending, error } = await useFetch(`/api/products/${productId}`)

// 更新页面元数据
watchEffect(() => {
  if (product.value) {
    useSeoMeta({
      title: `${product.value.name} - 外贸独立站`,
      description: product.value.description,
      ogTitle: `${product.value.name} - 外贸独立站`,
      ogDescription: product.value.description,
      ogImage: product.value.image,
    })
  }
})

// 获取相关产品
const { data: relatedProducts } = await useFetch('/api/products/related', {
  query: {
    id: productId,
    limit: 4
  }
})

// 如果没有真实 API，使用模拟数据
if (!product.value) {
  // 模拟产品数据
  product.value = {
    id: parseInt(productId),
    name: `产品 ${productId}`,
    description: '这是一个高品质的产品，具有多种功能和优点。适合各种场景使用，满足您的各种需求。这个产品采用优质材料制造，经久耐用，性能稳定。它的设计简洁大方，符合现代审美需求。无论是家庭使用还是商业用途，都能满足您的期望。',
    price: Math.floor(Math.random() * 900) + 100,
    image: `/images/product-${(parseInt(productId) % 6) + 1}.jpg`,
    gallery: [
      `/images/product-1.jpg`,
      `/images/product-2.jpg`,
      `/images/product-3.jpg`,
      `/images/product-4.jpg`,
    ],
    rating: Math.floor(Math.random() * 5) + 1,
    reviews: Math.floor(Math.random() * 100),
    stock: Math.floor(Math.random() * 50),
    features: [
      '高品质材料，经久耐用',
      '简洁大方的设计，符合现代审美',
      '多种功能，满足各种需求',
      '操作简单，使用方便',
      '性价比高，值得购买'
    ],
    category_id: Math.floor(Math.random() * 5) + 1
  }
}

// 如果没有相关产品数据，使用模拟数据
if (!relatedProducts.value) {
  // 模拟相关产品数据
  relatedProducts.value = Array.from({ length: 4 }, (_, i) => ({
    id: parseInt(productId) + i + 1,
    name: `相关产品 ${i + 1}`,
    description: '这是一个相关产品，与您正在查看的产品类似。',
    price: Math.floor(Math.random() * 900) + 100,
    image: `/images/product-${((parseInt(productId) + i) % 6) + 1}.jpg`,
    rating: Math.floor(Math.random() * 5) + 1,
    category_id: Math.floor(Math.random() * 5) + 1
  }))
}

// 选中的图片索引
const selectedImage = ref(0)

// 选择图片
function selectImage(index: number) {
  selectedImage.value = index
  // 更新主图
  if (product.value && product.value.gallery && product.value.gallery.length > 0) {
    product.value.image = product.value.gallery[index]
  }
}

// 购买数量
const quantity = ref(1)

// 增加数量
function increaseQuantity() {
  if (product.value && quantity.value < product.value.stock) {
    quantity.value++
  }
}

// 减少数量
function decreaseQuantity() {
  if (quantity.value > 1) {
    quantity.value--
  }
}

// 添加到购物车
function addToCart() {
  if (product.value) {
    cartStore.addItem({
      ...product.value,
      quantity: quantity.value
    })
    // 显示提示
    // 这里可以使用 Nuxt UI 的 toast 或其他通知组件
  }
}

// 立即购买
function buyNow() {
  if (product.value) {
    // 添加到购物车
    addToCart()
    // 跳转到结账页面
    navigateTo('/checkout')
  }
}
</script> 