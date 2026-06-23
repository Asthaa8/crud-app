import '../styles/modal.css'

export default function DeleteConfirmation({ productName, onConfirm, onCancel, isLoading }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Delete Product</h2>
        </div>
        <div className="modal-body">
          <p className="modal-icon">⚠️</p>
          <p className="modal-message">
            Are you sure you want to delete <strong>{productName}</strong>?
          </p>
          <p className="modal-warning">This action cannot be undone.</p>
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}
