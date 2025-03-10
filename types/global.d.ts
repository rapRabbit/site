// Nuxt 3 自动导入的类型声明
declare global {
  // Vue 组合式 API
  const ref: any
  const reactive: any
  const computed: any
  const watch: any
  const watchEffect: any
  const onMounted: any
  const onUnmounted: any
  const onBeforeUnmount: any
  const nextTick: any
  const toRef: any
  const toRefs: any
  const toRaw: any
  const markRaw: any
  const isRef: any
  const unref: any
  const isReactive: any
  const isReadonly: any
  const isProxy: any
  const shallowRef: any
  const shallowReactive: any
  const shallowReadonly: any
  const customRef: any
  const triggerRef: any
  const provide: any
  const inject: any
  const readonly: any
  
  // Nuxt 3 组合式 API
  const useRouter: any
  const useRoute: any
  const useState: any
  const useHead: any
  const useSeoMeta: any
  const useFetch: any
  const useAsyncData: any
  const useRuntimeConfig: any
  const useColorMode: any
  const navigateTo: any
  const definePageMeta: any
  const useError: any
  const createError: any
  const showError: any
  const clearError: any
  const defineNuxtComponent: any
  const defineNuxtPlugin: any
  const defineNuxtConfig: any
  const defineAppConfig: any
  const acceptHMRUpdate: any
  const storeToRefs: any
  
  // Pinia
  const defineStore: any
  
  // Node.js 全局变量
  const process: {
    env: {
      NODE_ENV: string
      [key: string]: string | undefined
    }
  }
}

export {} 