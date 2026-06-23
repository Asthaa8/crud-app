import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductForm from '../components/ProductForm'
import ErrorMessage from '../components/ErrorMessage'
import SuccessMessage from '../components/SuccessMessage'
import { productAPI } from '../services/api'
import '../styles/products.css'

export default function AddProduct() {
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (formData) => {
    setIsLoading(true)
    setError(null)

    try {
      await productAPI.create(formData)
      setSuccess('Product created successfully!')

      // Navigate after a short delay
      setTimeout(() => {
        navigate('/products')
      }, 1500)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="products-container">
      <div className="page-header">
        <h1>Add New Product</h1>
        <p className="text-muted">Create a new product in the catalog</p>
      </div>

      {error && (
        <ErrorMessage message={error} onClose={() => setError(null)} />
      )}

      {success && (
        <SuccessMessage message={success} onClose={() => setSuccess(null)} />
      )}

      <div className="form-wrapper">
        <ProductForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  )
}
