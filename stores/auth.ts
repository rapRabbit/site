import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface LoginPayload {
  email: string
  password: string
  remember?: boolean
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const loading = ref(false)

  const isAuthenticated = computed(() => !!token.value)

  async function login(payload: LoginPayload) {
    loading.value = true
    try {
      // 这里应该是实际的API调用，现在只是模拟
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 模拟成功登录
      token.value = 'mock-token-' + Date.now()
      user.value = {
        id: '1',
        name: '测试用户',
        email: payload.email,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&h=256&q=80'
      }
      
      // 存储到localStorage
      if (payload.remember) {
        localStorage.setItem('auth_token', token.value)
      }
      
      return user.value
    } catch (error) {
      throw new Error('登录失败，请检查您的邮箱和密码')
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    // 清除token和用户信息
    token.value = null
    user.value = null
    localStorage.removeItem('auth_token')
  }

  async function socialLogin(provider: string) {
    loading.value = true
    try {
      // 模拟社交媒体登录
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      token.value = `mock-${provider}-token-${Date.now()}`
      user.value = {
        id: '2',
        name: `${provider}用户`,
        email: `user@${provider}.com`,
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&h=256&q=80'
      }
      
      localStorage.setItem('auth_token', token.value)
      return user.value
    } catch (error) {
      throw new Error(`通过${provider}登录失败`)
    } finally {
      loading.value = false
    }
  }

  // 初始化 - 从localStorage恢复session
  function init() {
    const savedToken = localStorage.getItem('auth_token')
    if (savedToken) {
      token.value = savedToken
      // 这里应该有一个API调用来获取用户信息
      user.value = {
        id: '3',
        name: '游客用户',
        email: 'guest@example.com',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&h=256&q=80'
      }
    }
  }

  return {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    logout,
    socialLogin,
    init
  }
}) 