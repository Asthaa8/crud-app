import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach a simple response interceptor to normalize errors for frontend
api.interceptors.response.use(
  (res) => res,
  (err) => {
    // Ensure error.response exists
    if (!err.response) {
      return Promise.reject({ response: { data: { error: err.message } } })
    }
    return Promise.reject(err)
  }
)

export const productAPI = {
  // Get all products
  getAll: async () => {
    try {
      const response = await api.get('/api/products')
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch products')
    }
  },

  // Get single product by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/api/products/${id}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch product')
    }
  },

  // Create new product
  create: async (productData) => {
    try {
      const response = await api.post('/api/products', productData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to create product')
    }
  },

  // Update product
  update: async (id, productData) => {
    try {
      const response = await api.put(`/api/products/${id}`, productData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to update product')
    }
  },

  // Delete product
  delete: async (id) => {
    try {
      const response = await api.delete(`/api/products/${id}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to delete product')
    }
  },
}

export const userAPI = {
  // Update user profile
  updateProfile: async (userId, selectedAvatar) => {
    try {
      const response = await api.put('/api/auth/profile/update', {
        userId,
        selectedAvatar,
      })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to update profile')
    }
  },
}

export default api
