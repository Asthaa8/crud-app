import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { authService } from '../services/auth'
import '../styles/login.css'

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export default function Login({ onAuth, user }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [mode, setMode] = useState('login')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if (params.get('google_error') === '1') {
      setError('Google login is not configured or failed. Check your backend Google OAuth settings.')
    }
  }, [location.search])

  const handleInput = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (error) setError(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError(null)
    setSuccess(null)
    setIsLoading(true)

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }

      if (mode === 'signup') {
        const authUser = await authService.signup(payload)
        if (!authUser || !authUser._id) {
          throw new Error('Signup failed. User object was not returned.')
        }
        onAuth(authUser)
        setSuccess('Account created successfully! Please complete 2FA setup.')
        navigate('/2fa')
        return
      }

      const result = await authService.login(payload)
      if (result.require2FA || result.user) {
        const loginUser = result.user
        authService.setPending2FA(loginUser)
        if (onAuth) onAuth(loginUser)
        setSuccess('Please complete two-factor authentication to continue.')
        navigate('/2fa')
        return
      }

      throw new Error('Login failed. User object was not returned.')
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleMode = (nextMode) => {
    setMode(nextMode)
    setFormData({ name: '', email: '', password: '' })
    setError(null)
    setSuccess(null)
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h2>{mode === 'login' ? 'Welcome Back' : 'Create Your Account'}</h2>
          <p>
            {mode === 'login'
              ? 'Sign in and manage your products.'
              : 'Sign up to access the product dashboard.'}
          </p>
        </div>

        <div className="login-switcher">
          <button
            className={`switch-btn ${mode === 'login' ? 'active' : ''}`}
            type="button"
            onClick={() => toggleMode('login')}
          >
            Login
          </button>
          <button
            className={`switch-btn ${mode === 'signup' ? 'active' : ''}`}
            type="button"
            onClick={() => toggleMode('signup')}
          >
            Sign In
          </button>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div className="login-field">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInput}
                placeholder="Enter your full name"
                disabled={isLoading}
                required
              />
            </div>
          )}

          <div className="login-field">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInput}
              placeholder="you@example.com"
              disabled={isLoading}
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInput}
              placeholder="Enter your password"
              disabled={isLoading}
              required
            />
          </div>

          {error && <div className="login-error">{error}</div>}
          {success && <div className="login-success">{success}</div>}

          <button type="button" className="btn btn-google" onClick={() => window.location.assign(`${BACKEND_URL}/auth/google`)}>
            Continue with Google
          </button>

          <button type="submit" className="btn btn-primary login-submit" disabled={isLoading}>
            {isLoading ? 'Processing...' : mode === 'login' ? 'Login' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  )
}
