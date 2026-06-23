import '../styles/alert.css'

export default function ErrorMessage({ message, onClose }) {
  return (
    <div className="alert alert-error">
      <span className="alert-icon">❌</span>
      <div className="alert-content">
        <strong>Error</strong>
        <p>{message}</p>
      </div>
      {onClose && (
        <button className="alert-close" onClick={onClose}>
          ×
        </button>
      )}
    </div>
  )
}
