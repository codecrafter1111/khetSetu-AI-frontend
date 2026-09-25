import { useEffect, useState } from 'react'
import { shopProducts } from '../data/shopProducts.mock'
import { ConsumerCommerceContext } from './ConsumerCommerceContext'

const cartStorageKey = 'khetsetu-consumer-cart'
const wishlistStorageKey = 'khetsetu-consumer-wishlist'
const savedStorageKey = 'khetsetu-consumer-saved-items'
export const DELIVERY_FEE = 40
const productKey = (product, pack) => `${(product.slug || product.name).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-')}:${pack}`
const demoItems = [1, 3, 4, 7].map(id => {
  const product = shopProducts.find(item => item.id === id)
  return { key: productKey(product, product.quantity), name: product.name, price: product.price, originalPrice: product.originalPrice, pack: product.quantity, quantity: id === 4 ? 2 : 1 }
})

function readStored(key, fallback) {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : fallback
  } catch {
    return fallback
  }
}

export default function ConsumerCommerceProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => readStored(cartStorageKey, demoItems))
  const [wishlist, setWishlist] = useState(() => readStored(wishlistStorageKey, ['Fresh Vegetable Basket']))
  const [savedItems, setSavedItems] = useState(() => readStored(savedStorageKey, []))

  useEffect(() => { localStorage.setItem(cartStorageKey, JSON.stringify(cartItems)) }, [cartItems])
  useEffect(() => { localStorage.setItem(wishlistStorageKey, JSON.stringify(wishlist)) }, [wishlist])
  useEffect(() => { localStorage.setItem(savedStorageKey, JSON.stringify(savedItems)) }, [savedItems])

  const addToCart = (product, amount = 1, pack = product.pack || product.quantity || product.detail?.split('|')[0].trim() || '') => {
    const quantity = Math.max(1, Number(amount) || 1)
    const key = productKey(product, pack)
    const catalogProduct = shopProducts.find(item => item.name === product.name)
    const originalPrice = catalogProduct && catalogProduct.quantity !== pack ? product.price : product.originalPrice
    setCartItems(current => {
      const existing = current.find(item => item.key === key)
      if (existing) return current.map(item => item.key === key ? { ...item, quantity: item.quantity + quantity } : item)
      return [...current, { key, name: product.name, price: product.price, originalPrice, pack, quantity }]
    })
  }
  const setCartQuantity = (key, quantity) => setCartItems(current => current.map(item => item.key === key ? { ...item, quantity: Math.max(1, quantity) } : item))
  const removeFromCart = key => setCartItems(current => current.filter(item => item.key !== key))
  const clearCart = () => setCartItems([])
  const saveForLater = key => {
    const item = cartItems.find(candidate => candidate.key === key)
    if (!item) return
    setSavedItems(current => current.some(candidate => candidate.key === key) ? current : [...current, item])
    removeFromCart(key)
  }
  const restoreSavedItem = key => {
    const item = savedItems.find(candidate => candidate.key === key)
    if (!item) return
    setCartItems(current => current.some(candidate => candidate.key === key) ? current : [...current, item])
    setSavedItems(current => current.filter(candidate => candidate.key !== key))
  }
  const toggleWishlist = name => setWishlist(current => current.includes(name) ? current.filter(item => item !== name) : [...current, name])
  const cartCount = cartItems.length
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalSavings = cartItems.reduce((sum, item) => {
    const product = shopProducts.find(candidate => candidate.name === item.name)
    const originalPrice = item.originalPrice || (product?.quantity === item.pack ? product.originalPrice : item.price)
    return sum + Math.max(0, originalPrice - item.price) * item.quantity
  }, 0)
  const cartSubtotal = cartTotal + totalSavings
  const deliveryFee = cartCount ? DELIVERY_FEE : 0
  const totalPayable = cartSubtotal + deliveryFee - totalSavings

  return <ConsumerCommerceContext.Provider value={{ cartItems, cartCount, cartTotal, cartSubtotal, deliveryFee, totalSavings, totalPayable, addToCart, setCartQuantity, removeFromCart, clearCart, saveForLater, restoreSavedItem, savedItems, wishlist, toggleWishlist }}>{children}</ConsumerCommerceContext.Provider>
}
