import '../styles/alert.css'

export default function SuccessMessage({ message, onClose }) {
  return (
    <div className="alert alert-success">
      <span className="alert-icon">✓</span>
      <div className="alert-content">
        <strong>Success</strong>
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
