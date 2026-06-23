import { Link } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import { memojiAvatars } from '../utils/avatars'
import '../styles/home.css'

export default function Home({ user, onUpdateUser }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const fileInputRef = useRef(null)
  const menuRef = useRef(null)
  const initials = user?.name?.trim()?.charAt(0)?.toUpperCase() || '?'

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuOpen])

  const handleAvatarClick = () => {
    setMenuOpen((prev) => !prev)
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      if (reader.result) {
        onUpdateUser({ profileImage: reader.result })
      }
    }
    reader.readAsDataURL(file)
    event.target.value = ''
    setMenuOpen(false)
  }

  const handleRemoveImage = () => {
    onUpdateUser({ profileImage: null })
    setMenuOpen(false)
  }

  const defaultAvatars = [
    { id: 'blue', bgColor: '#3b82f6', emoji: '' },
    { id: 'purple', bgColor: '#a855f7', emoji: '' },
    { id: 'pink', bgColor: '#ec4899', emoji: '' },
    { id: 'green', bgColor: '#10b981', emoji: '' },
    { id: 'orange', bgColor: '#f97316', emoji: '' },
  ]

  const handleSelectDefaultAvatar = (bgColor, emoji) => {
    onUpdateUser({ profileImage: null, avatarColor: bgColor, avatarEmoji: emoji, selectedAvatar: null })
    setMenuOpen(false)
  }

  const handleSelectMemoji = (memojiSvg) => {
    onUpdateUser({ selectedAvatar: memojiSvg, profileImage: null, avatarEmoji: null, avatarColor: null })
    setMenuOpen(false)
  }

  const handleResetToInitials = () => {
    onUpdateUser({ selectedAvatar: null, profileImage: null, avatarEmoji: null, avatarColor: null })
    setMenuOpen(false)
  }

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-avatar-wrapper" ref={menuRef}>
          <button
            type="button"
            className="hero-avatar-button"
            onClick={handleAvatarClick}
            aria-label="Profile actions"
          >
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt="Profile"
                className="hero-avatar-image"
              />
            ) : user?.selectedAvatar ? (
              <img
                src={user.selectedAvatar}
                alt="Avatar"
                className="hero-avatar-image"
              />
            ) : (
              <span
                className="hero-avatar-initials"
                style={{
                  backgroundColor: user?.avatarColor || '#3b82f6',
                  color: 'white',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '9999px',
                  fontSize: user?.avatarEmoji ? '1.75rem' : '4.5rem',
                }}
              >
                {user?.avatarEmoji || initials}
              </span>
            )}
          </button>

          {menuOpen && (
            <div className="hero-avatar-menu">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={handleUploadClick}
              >
                Upload image
              </button>
              {user?.profileImage && (
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={handleRemoveImage}
                >
                  Remove image
                </button>
              )}
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleResetToInitials}
              >
                Reset to Initials
              </button>
              <div className="hero-avatar-section">
                <div className="hero-avatar-defaults-label">Memoji Avatars</div>
                <div className="hero-avatar-memoji-grid">
                  {memojiAvatars.map((avatar) => (
                    <button
                      key={avatar.id}
                      type="button"
                      className="hero-avatar-memoji-option"
                      onClick={() => handleSelectMemoji(avatar.svg)}
                      title={avatar.name}
                    >
                      <img src={avatar.svg} alt={avatar.name} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="hero-avatar-section">
                <div className="hero-avatar-defaults-label">Quick Colors</div>
                <div className="hero-avatar-defaults">
                  {defaultAvatars.map((avatar) => (
                    <button
                      key={avatar.id}
                      type="button"
                      className="hero-avatar-default-option"
                      style={{ backgroundColor: avatar.bgColor }}
                      onClick={() => handleSelectDefaultAvatar(avatar.bgColor, avatar.emoji)}
                      title={avatar.id}
                    >
                      <span style={{ fontSize: '1.25rem' }}>{avatar.emoji}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>

        <div className="hero-content">
          <h1 className="hero-title">Welcome back{user ? `, ${user.name}` : ''}!</h1>
          <p className="hero-subtitle">
            {user
              ? 'Manage your products efficiently with your personalized dashboard.'
              : 'Manage your products efficiently with our modern CRUD application.'}
          </p>

          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon">📋</span>
              <h3>View Products</h3>
              <p>Browse all your products in a clean, organized table</p>
            </div>

            <div className="feature-card">
              <span className="feature-icon">➕</span>
              <h3>Add Products</h3>
              <p>Create new products with detailed information</p>
            </div>

            <div className="feature-card">
              <span className="feature-icon">✏️</span>
              <h3>Edit Products</h3>
              <p>Update product details and pricing</p>
            </div>

            <div className="feature-card">
              <span className="feature-icon">🗑️</span>
              <h3>Delete Products</h3>
              <p>Remove products with confirmation</p>
            </div>
          </div>

          <div className="cta-buttons">
            <Link to="/products" className="btn btn-primary btn-large">
              View All Products
            </Link>
            <Link to="/products/add" className="btn btn-secondary btn-large">
              Add New Product
            </Link>
          </div>
        </div>
      </div>

      <div className="info-section">
        <div className="info-card">
          <h3>✨ Features</h3>
          <ul>
            <li>Real-time product management</li>
            <li>Fast and responsive interface</li>
            <li>Secure API communication</li>
            <li>Beautiful modern design</li>
            <li>Mobile-friendly layout</li>
          </ul>
        </div>

        <div className="info-card">
          <h3>🚀 Quick Start</h3>
          <ol>
            <li>Navigate to Products page</li>
            <li>Click "Add Product" button</li>
            <li>Fill in product details</li>
            <li>Click Save to create</li>
          </ol>
        </div>

        <div className="info-card">
          <h3>💡 Tips</h3>
          <ul>
            <li>Edit any product by clicking the Edit button</li>
            <li>Delete products with the Delete button</li>
            <li>View detailed info in the table</li>
            <li>All changes are saved to the database</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
