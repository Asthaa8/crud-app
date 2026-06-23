import { Link } from 'react-router-dom'
import '../styles/table.css'

export default function ProductTable({ products, onDelete }) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-icon">📭</p>
        <h2>No Products Found</h2>
        <p>Start by adding your first product</p>
        <Link to="/products/add" className="btn btn-primary">
          Add Product
        </Link>
      </div>
    )
  }

  return (
    <div className="table-container">
      <table className="products-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="table-row">
              <td className="font-semibold">{product.name}</td>
              <td>{product.description || '-'}</td>
              <td className="price">${product.price.toFixed(2)}</td>
              <td>
                <span className={`badge ${product.inStock ? 'badge-success' : 'badge-danger'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </td>
              <td className="date">{new Date(product.createdAt).toLocaleDateString()}</td>
              <td className="actions">
                <Link to={`/products/edit/${product._id}`} className="btn-icon btn-edit">
                  ✏️ Edit
                </Link>
                <button
                  className="btn-icon btn-delete"
                  onClick={() => onDelete(product._id, product.name)}
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
