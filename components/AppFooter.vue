<template>
  <footer class="bg-gray-100 dark:bg-gray-800 py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">关于我们</h3>
          <p class="text-gray-600 dark:text-gray-400">
            我们是一家专业的外贸公司，提供高质量的产品和服务，满足全球客户的需求。
          </p>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">快速链接</h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                首页
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/product" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                产品
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/blog" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                博客
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                联系我们
              </NuxtLink>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">联系方式</h3>
          <ul class="space-y-2">
            <li class="flex items-center text-gray-600 dark:text-gray-400">
              <Icon name="heroicons:map-pin" class="w-5 h-5 mr-2" />
              <span>上海市浦东新区张江高科技园区</span>
            </li>
            <li class="flex items-center text-gray-600 dark:text-gray-400">
              <Icon name="heroicons:phone" class="w-5 h-5 mr-2" />
              <span>+86 123 4567 8910</span>
            </li>
            <li class="flex items-center text-gray-600 dark:text-gray-400">
              <Icon name="heroicons:envelope" class="w-5 h-5 mr-2" />
              <span>info@example.com</span>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">关注我们</h3>
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
          </div>
        </div>
      </div>
      
      <div class="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
        <p class="text-gray-600 dark:text-gray-400">
          &copy; {{ new Date().getFullYear() }} 外贸独立站. 保留所有权利.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// 页脚组件
</script> 