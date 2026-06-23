import { useNavigate } from 'react-router-dom'
import '../styles/usermenu.css'

export default function UserMenu({ user, onLogout }) {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await onLogout()
    navigate('/login')
  }

  if (!user) return null

  return (
    <div className="user-menu">
      <span className="user-name">{user.name}</span>
      <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}
