import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const loading = ref(false)
  
  const totalItems = computed(() => {
    return items.value.reduce((total: number, item: CartItem) => total + item.quantity, 0)
  })
  
  const totalPrice = computed(() => {
    return items.value.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0)
  })
  
  function addItem(product: any, quantity = 1) {
    const existingItem = items.value.find((item: CartItem) => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      items.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image || 'https://www.nuxtjs.cn/NUXTJS-logo-800.png'
      })
    }
    
    // 保存到本地存储
    saveCart()
  }
  
  function updateItemQuantity(id: string, quantity: number) {
    const item = items.value.find((item: CartItem) => item.id === id)
    
    if (item) {
      item.quantity = quantity
      
      // 如果数量为0，则移除商品
      if (quantity <= 0) {
        removeItem(id)
      } else {
        saveCart()
      }
    }
  }
  
  function removeItem(id: string) {
    items.value = items.value.filter((item: CartItem) => item.id !== id)
    saveCart()
  }
  
  function clearCart() {
    items.value = []
    saveCart()
  }
  
  // 保存购物车到本地存储
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(items.value))
  }
  
  // 从本地存储加载购物车
  function loadCart() {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        items.value = JSON.parse(savedCart)
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e)
      }
    }
  }
  
  // 初始化
  function init() {
    loadCart()
  }
  
  return {
    items,
    loading,
    totalItems,
    totalPrice,
    addItem,
    updateItemQuantity,
    removeItem,
    clearCart,
    init
  }
}) 