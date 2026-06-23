import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ProductForm from '../components/ProductForm'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import SuccessMessage from '../components/SuccessMessage'
import { productAPI } from '../services/api'
import '../styles/products.css'

export default function EditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await productAPI.getById(id)
      setProduct(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (formData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      await productAPI.update(id, formData)
      setSuccess('Product updated successfully!')

      // Navigate after a short delay
      setTimeout(() => {
        navigate('/products')
      }, 1500)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) return <Loading />

  if (error && !product) {
    return (
      <div className="products-container">
        <ErrorMessage message={error} onClose={() => navigate('/products')} />
      </div>
    )
  }

  return (
    <div className="products-container">
      <div className="page-header">
        <h1>Edit Product</h1>
        <p className="text-muted">Update product details</p>
      </div>

      {error && (
        <ErrorMessage message={error} onClose={() => setError(null)} />
      )}

      {success && (
        <SuccessMessage message={success} onClose={() => setSuccess(null)} />
      )}

      {product && (
        <div className="form-wrapper">
          <ProductForm
            onSubmit={handleSubmit}
            initialData={product}
            isLoading={isSubmitting}
          />
        </div>
      )}
    </div>
  )
}
