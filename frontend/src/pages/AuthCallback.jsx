import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { authService } from '../services/auth'

const BACKEND_URL = import.meta.env.VITE_API_URL?.trim() || 'http://localhost:3000'

export default function AuthCallback({ onAuth }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      const params = new URLSearchParams(location.search)
      const token = params.get('token')
      if (!token) {
        console.error('Google callback missing token')
        setError('Google login failed: missing callback token.')
        return
      }

      try {
        console.log('Fetching user with token:', token)
        const response = await fetch(`${BACKEND_URL}/auth/google/session?token=${token}`)
        
        if (!response.ok) {
          console.error('Google session response not ok:', response.status)
          setError('Google login failed while verifying session. Please try again.')
          return
        }
        
        const data = await response.json()
        console.log('Google session data:', data)

        if (!data.success) {
          console.error('Google callback failed - not successful:', data)
          setError('Google login failed to retrieve your account. Please try again.')
          return
        }

        if (!data.user) {
          console.error('Google callback failed - no user data:', data)
          setError('Google login returned no user data. Please try again.')
          return
        }

        console.log('Google user authenticated:', data.user)
        authService.setPending2FA(data.user)
        if (onAuth) onAuth(data.user)
        navigate('/2fa')
      } catch (error) {
        console.error('Google callback error:', error)
        setError('Google login failed due to a network or server error. Please try again.')
      }
    }

    fetchUser()
  }, [location.search, navigate, onAuth])

  if (error) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Google Login Error</h2>
        <p>{error}</p>
        <p>
          Please return to the <a href="/login">login page</a> and try again.
        </p>
      </div>
    )
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Completing login...</h2>
      <p>Please wait while we sign you in.</p>
    </div>
  )
}
