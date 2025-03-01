// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    'nuxt-icon',
    '@nuxt/image',
  ],
  colorMode: {
    preference: 'system',
    fallback: 'light',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  },
  typescript: {
    strict: true,
    typeCheck: true,
    shim: false
  },
  imports: {
    dirs: [
      'composables',
      'composables/**',
      'stores'
    ],
    imports: [
      { from: 'vue', name: 'ref' },
      { from: 'vue', name: 'reactive' },
      { from: 'vue', name: 'computed' },
      { from: 'vue', name: 'watch' },
      { from: 'vue', name: 'watchEffect' },
      { from: 'vue', name: 'onMounted' },
      { from: 'vue', name: 'onUnmounted' },
      { from: 'vue', name: 'onBeforeUnmount' },
      { from: 'vue-router', name: 'useRouter' },
      { from: 'vue-router', name: 'useRoute' }
    ]
  },
  app: {
    head: {
      title: '外贸独立站',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '专业的外贸独立站，提供优质产品和服务' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || 'http://localhost:3000/api'
    }
  }
}) 