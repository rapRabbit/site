// app.config.ts
export default defineAppConfig({
  // 应用主题配置
  theme: {
    primaryColor: '#3B82F6', // 主色调
    secondaryColor: '#10B981', // 次要色调
    darkMode: true, // 启用暗色模式
  },
  // UI 配置
  ui: {
    primary: 'blue',
    gray: 'slate',
    // 全局 UI 配置
    notifications: {
      position: 'top-right',
    },
    button: {
      default: {
        color: 'primary',
        variant: 'solid',
      },
    },
  },
}) 