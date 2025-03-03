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
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-auto object-cover"
            />
          </div>
          
          <!-- 缩略图 -->
          <div v-if="product.gallery && product.gallery.length > 0" class="mt-4 grid grid-cols-5 gap-2">
            <div
              v-for="(image, index) in product.gallery"
              :key="index"
              class="cursor-pointer border-2 rounded-md overflow-hidden"
              :class="{ 'border-primary-500': selectedImage === index, 'border-transparent': selectedImage !== index }"
              @click="selectedImage = index"
            >
              <img
                :src="image"
                :alt="`${product.name} - 图片 ${index + 1}`"
                class="w-full h-20 object-cover"
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
              <img
                :src="relatedProduct.image"
                :alt="relatedProduct.name"
                class="w-full h-40 object-cover"
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

// 奢侈品包包数据
const luxuryBags = [
  {
    id: 1,
    name: 'Chanel Classic Flap 经典翻盖包',
    description: '香奈儿经典翻盖包，优雅的设计和精湛的工艺，是时尚界的永恒经典。采用顶级小羊皮制作，配以标志性的双C锁扣和链条肩带，展现出无与伦比的奢华感。这款包包不仅是时尚单品，更是一种身份的象征，适合各种场合使用，是每位女性梦寐以求的奢侈品。',
    price: 29980,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80',
      'https://images.unsplash.com/photo-1575032617751-6ddec2089882?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80',
      'https://images.unsplash.com/photo-1592500305630-419da01a7c33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80',
      'https://images.unsplash.com/photo-1601924582970-9238bcb495d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80',
    ],
    rating: 5,
    reviews: 128,
    stock: 10
  },
  {
    id: 2,
    name: 'Louis Vuitton Neverfull MM 手提包',
    description: '路易威登Neverfull MM手提包，宽敞实用，经典的Monogram图案，是日常使用的理想选择。这款包包采用耐用的涂层帆布制作，内部空间宽敞，可以轻松容纳您的日常必需品。侧边的抽绳设计可以调整包包的形状，既实用又时尚。无论是工作、购物还是旅行，这款包包都能满足您的需求。',
    price: 18500,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80',
      'https://images.unsplash.com/photo-1583623733237-4d5764a9dc82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80',
      'https://images.unsplash.com/photo-1590739225287-bd2a83d41fec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80',
      'https://images.unsplash.com/photo-1605217613423-0aea4e1f8f6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80',
    ],
    rating: 4,
    reviews: 96,
    stock: 15
  },
  {
    id: 3,
    name: 'Hermès Birkin 30 手提包',
    description: '爱马仕Birkin 30手提包，采用顶级皮革制作，手工缝制，是奢华与品质的象征。这款包包以其精湛的工艺和稀有的材质闻名于世，每一个细节都体现了爱马仕的卓越品质。Birkin包不仅是一款包包，更是一种投资，其价值随着时间的推移而增加。拥有一款Birkin包，是每位奢侈品爱好者的终极梦想。',
    price: 35800,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80',
      'https://images.unsplash.com/photo-1611010344444-5f9e4d86a6e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80',
      'https://images.unsplash.com/photo-1628149455678-16f37bc392f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80',
    ],
    rating: 5,
    reviews: 75,
    stock: 5
  },
  {
    id: 4,
    name: 'Gucci GG Marmont 链条包',
    description: '古驰GG Marmont链条包，柔软的绗缝皮革和标志性的双G logo，时尚而经典。这款包包采用优质皮革制作，手感柔软，质感上乘。翻盖设计配以古驰标志性的双G logo，既时尚又实用。可调节的链条肩带让您可以选择肩背或斜挎，适合各种场合使用。这款包包是古驰最受欢迎的系列之一，展现了品牌的经典魅力。',
    price: 7000,
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80',
      'https://images.unsplash.com/photo-1591707209942-ba9be5b6958a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80',
      'https://images.unsplash.com/photo-1591707216644-db9d5a7e5abb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80',
      'https://images.unsplash.com/photo-1591707217482-a5a3ca013ba6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80',
    ],
    rating: 4,
    reviews: 112,
    stock: 20
  },
  {
    id: 5,
    name: 'Dior Lady Dior 手提包',
    description: '迪奥Lady Dior手提包，经典的菱格纹和金属字母吊饰，优雅而精致。这款包包以其独特的菱格纹缝线和标志性的金属字母吊饰而闻名，是迪奥品牌的经典之作。采用优质小羊皮制作，手感柔软，质感上乘。包包配有可拆卸的肩带，可以手提或肩背，适合各种场合使用。Lady Dior是对优雅和时尚的完美诠释。',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80',
      'https://images.unsplash.com/photo-1566150902887-9679ecc155ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80',
      'https://images.unsplash.com/photo-1566150905764-2b8e4ef60f6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80',
      'https://images.unsplash.com/photo-1566150905118-18b0b1fdf169?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80',
    ],
    rating: 5,
    reviews: 89,
    stock: 8
  }
];

// 获取产品数据
// const { data: product, pending, error } = await useFetch(`/api/products/${productId}`)
// 使用默认数据代替
const product = ref(luxuryBags.find(bag => bag.id === parseInt(productId)) || {
  id: parseInt(productId),
  name: `奢侈品包包 ${productId}`,
  description: '这是一款高品质的奢侈品包包，采用顶级材料制作，展现非凡品质和独特设计。',
  price: Math.floor(Math.random() * 20000) + 5000,
  image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80',
  gallery: [
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80',
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80',
    'https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80',
  ],
  rating: Math.floor(Math.random() * 5) + 1,
  reviews: Math.floor(Math.random() * 100),
  stock: Math.floor(Math.random() * 20) + 1
});

const pending = ref(false)
const error = ref(null)

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
// const { data: relatedProducts } = await useFetch('/api/products/related', {
//   query: {
//     id: productId,
//     limit: 4
//   }
// })
// 使用默认数据代替
const relatedProducts = ref(Array.from({ length: 4 }, (_, i) => ({
  id: parseInt(productId) + i + 1,
  name: `相关产品 ${i + 1}`,
  description: '相关产品描述',
  price: Math.floor(Math.random() * 900) + 100,
  image: 'https://www.nuxtjs.cn/NUXTJS-logo-800.png',
  rating: Math.floor(Math.random() * 5) + 1,
  reviews: Math.floor(Math.random() * 100),
  stock: Math.floor(Math.random() * 50)
})))

// 如果没有真实 API，使用模拟数据
// if (!product.value) {
//   // 模拟产品数据
//   product.value = {
//     id: parseInt(productId),
//     name: `产品 ${productId}`,
//     description: '这是一个高品质的产品，具有多种功能和优点。适合各种场景使用，满足您的各种需求。这个产品采用优质材料制造，经久耐用，性能稳定。它的设计简洁大方，符合现代审美需求。无论是家庭使用还是商业用途，都能满足您的期望。',
//     price: Math.floor(Math.random() * 900) + 100,
//     image: `/images/product-${(parseInt(productId) % 6) + 1}.jpg`,
//     gallery: [
//       `/images/product-1.jpg`,
//       `/images/product-2.jpg`,
//       `/images/product-3.jpg`,
//       `/images/product-4.jpg`,
//     ],
//     rating: Math.floor(Math.random() * 5) + 1,
//     reviews: Math.floor(Math.random() * 100),
//     stock: Math.floor(Math.random() * 50),
//     features: [
//       '高品质材料，经久耐用',
//       '简洁大方的设计，符合现代审美',
//       '多种功能，满足各种需求',
//       '操作简单，使用方便',
//       '性价比高，值得购买'
//     ],
//     category_id: Math.floor(Math.random() * 5) + 1
//   }
// }

// // 如果没有相关产品数据，使用模拟数据
// if (!relatedProducts.value) {
//   // 模拟相关产品数据
//   relatedProducts.value = Array.from({ length: 4 }, (_, i) => ({
//     id: parseInt(productId) + i + 1,
//     name: `相关产品 ${i + 1}`,
//     description: '相关产品描述',
//     price: Math.floor(Math.random() * 900) + 100,
//     image: `/images/product-${(i % 6) + 1}.jpg`,
//     rating: Math.floor(Math.random() * 5) + 1,
//     reviews: Math.floor(Math.random() * 100),
//     stock: Math.floor(Math.random() * 50)
//   }))
// }

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