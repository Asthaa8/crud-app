import { useState, useEffect } from 'react'
import ProductTable from '../components/ProductTable'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import SuccessMessage from '../components/SuccessMessage'
import DeleteConfirmation from '../components/DeleteConfirmation'
import { productAPI } from '../services/api'
import '../styles/products.css'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [deleteModal, setDeleteModal] = useState(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await productAPI.getAll()
      setProducts(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = (id, name) => {
    setDeleteModal({ id, name })
  }

  const confirmDelete = async () => {
    if (!deleteModal) return

    setDeleting(true)
    try {
      await productAPI.delete(deleteModal.id)
      setProducts(products.filter((p) => p._id !== deleteModal.id))
      setSuccess(`Product "${deleteModal.name}" deleted successfully!`)
      setDeleteModal(null)

      // Auto-clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err.message)
      setDeleteModal(null)
    } finally {
      setDeleting(false)
    }
  }

  if (loading) return <Loading />

  return (
    <div className="products-container">
      <div className="products-header">
        <div>
          <h1>Products</h1>
          <p className="text-muted">Manage your product inventory</p>
        </div>
        <div className="header-stats">
          <span className="stat">Total: {products.length} products</span>
          <span className="stat">
            In Stock: {products.filter((p) => p.inStock).length}
          </span>
        </div>
      </div>

      {error && (
        <ErrorMessage message={error} onClose={() => setError(null)} />
      )}

      {success && (
        <SuccessMessage message={success} onClose={() => setSuccess(null)} />
      )}

      <ProductTable products={products} onDelete={handleDelete} />

      {deleteModal && (
        <DeleteConfirmation
          productName={deleteModal.name}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteModal(null)}
          isLoading={deleting}
        />
      )}
    </div>
  )
}
