import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/form.css'

export default function ProductForm({ onSubmit, initialData = null, isLoading = false }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    inStock: true,
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        price: initialData.price || '',
        inStock: initialData.inStock !== undefined ? initialData.inStock : true,
      })
    }
  }, [initialData])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required'
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Product Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter product name"
          disabled={isLoading}
          className={errors.name ? 'input-error' : ''}
        />
        {errors.name && <span className="error-text">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter product description"
          disabled={isLoading}
          rows="4"
        />
      </div>

      <div className="form-group">
        <label htmlFor="price">Price (USD) *</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="0.00"
          step="0.01"
          min="0"
          disabled={isLoading}
          className={errors.price ? 'input-error' : ''}
        />
        {errors.price && <span className="error-text">{errors.price}</span>}
      </div>

      <div className="form-group checkbox">
        <input
          type="checkbox"
          id="inStock"
          name="inStock"
          checked={formData.inStock}
          onChange={handleChange}
          disabled={isLoading}
        />
        <label htmlFor="inStock">In Stock</label>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Saving...' : initialData ? 'Update Product' : 'Add Product'}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate('/products')}
          disabled={isLoading}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
