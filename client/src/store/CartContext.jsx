import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const CartContext = createContext()

export function CartProvider({ children }) {
  const { user } = useAuth()
  const [cart, setCart] = useState({ items: [], totalItems: 0, totalPrice: 0 })

  // Load cart from localStorage on start
  useEffect(() => {
    const saved = localStorage.getItem('cart')
    if (saved) setCart(JSON.parse(saved))
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.items.find(i => i._id === product._id)
      let updatedItems

      if (existing) {
        updatedItems = prev.items.map(i =>
          i._id === product._id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      } else {
        updatedItems = [...prev.items, { ...product, quantity: 1 }]
      }

      const totalItems = updatedItems.reduce((sum, i) => sum + i.quantity, 0)
      const totalPrice = updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0)

      return { items: updatedItems, totalItems, totalPrice }
    })
  }

  const removeFromCart = (productId) => {
    setCart(prev => {
      const updatedItems = prev.items.filter(i => i._id !== productId)
      const totalItems = updatedItems.reduce((sum, i) => sum + i.quantity, 0)
      const totalPrice = updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
      return { items: updatedItems, totalItems, totalPrice }
    })
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId)
      return
    }
    setCart(prev => {
      const updatedItems = prev.items.map(i =>
        i._id === productId ? { ...i, quantity } : i
      )
      const totalItems = updatedItems.reduce((sum, i) => sum + i.quantity, 0)
      const totalPrice = updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
      return { items: updatedItems, totalItems, totalPrice }
    })
  }

  const clearCart = () => {
    setCart({ items: [], totalItems: 0, totalPrice: 0 })
    localStorage.removeItem('cart')
  }

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)