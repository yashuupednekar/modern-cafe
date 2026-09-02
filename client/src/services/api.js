const BASE_URL = import.meta.env.VITE_API_URL || 'https://modern-cafe-server.onrender.com/api'

const api = {
  // Products
  getProducts: async (params = {}) => {
    const query = new URLSearchParams(params).toString()
    const res = await fetch(`${BASE_URL}/products?${query}`)
    return res.json()
  },

  getProductBySlug: async (slug) => {
    const res = await fetch(`${BASE_URL}/products/${slug}`)
    return res.json()
  },

  // Categories
  getCategories: async () => {
    const res = await fetch(`${BASE_URL}/categories`)
    return res.json()
  },
}

export default api