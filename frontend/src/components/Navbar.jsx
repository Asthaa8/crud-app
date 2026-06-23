import { Link } from 'react-router-dom'
import UserMenu from './UserMenu'
import '../styles/navbar.css'

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">📦</span>
          Product Manager
        </Link>
        <ul className="nav-menu">
          {user ? (
            <>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/products" className="nav-link">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/products/add" className="nav-link nav-link-btn">
                  + Add Product
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/blogs" className="nav-link">
                  Blogs
                </Link>
              </li>
              {/* 2FA Settings intentionally hidden from navbar */}
            </>
          ) : (
            <li className="nav-item">
              <Link to="/login" className="nav-link nav-link-btn">
                Login / Sign In
              </Link>
            </li>
          )}
        </ul>
        <UserMenu user={user} onLogout={onLogout} />
      </div>
    </nav>
  )
}
