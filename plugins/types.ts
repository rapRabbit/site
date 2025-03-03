/**
 * 此插件用于增强 TypeScript 类型支持
 * 在 Nuxt 3 中，许多函数和组件是自动导入的，但 TypeScript 可能无法识别它们
 * 此插件不会在运行时执行任何操作，仅用于类型声明
 */
export default defineNuxtPlugin(() => {
  // 此插件不执行任何操作，仅用于类型声明
})

// 声明模块扩展
// 注意：这些类型声明在编辑器中可能会显示错误，但在 Nuxt 运行时会正常工作
// @ts-ignore
declare module '#app' {
  interface NuxtApp {
    // 在这里添加 Nuxt 应用实例的扩展属性
  }
}

// 声明 Vue 组件的 Props 类型
// @ts-ignore
declare module 'vue' {
  interface ComponentCustomProperties {
    // 在这里添加全局属性
  }
} 