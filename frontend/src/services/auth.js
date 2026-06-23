import api from './api'

const USER_KEY = 'user'
const PENDING_2FA_KEY = 'pending2fa_user'
const TWO_FA_KEY = '2fa_verified'

const saveJSON = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {}
}

const loadJSON = (key) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export const authService = {
  setCurrentUser(user) {
    if (!user) return
    saveJSON(USER_KEY, user)
    if (user.twoFactorEnabled) {
      localStorage.setItem(TWO_FA_KEY, 'true')
    } else {
      localStorage.removeItem(TWO_FA_KEY)
    }
    localStorage.removeItem(PENDING_2FA_KEY)
  },

  getCurrentUser() {
    return loadJSON(USER_KEY)
  },

  setPending2FA(user) {
    if (!user) return
    saveJSON(PENDING_2FA_KEY, user)
    localStorage.setItem(TWO_FA_KEY, 'false')
  },

  getPending2FAUser() {
    return loadJSON(PENDING_2FA_KEY)
  },

  clearPending2FA() {
    localStorage.removeItem(PENDING_2FA_KEY)
  },

  set2FAVerified() {
    localStorage.setItem(TWO_FA_KEY, 'true')
  },

  is2FAVerified(user) {
    if (!user) return false
    if (!user.twoFactorEnabled) return true
    return localStorage.getItem(TWO_FA_KEY) === 'true'
  },

  clearAuth() {
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(PENDING_2FA_KEY)
    localStorage.removeItem(TWO_FA_KEY)
  },

  login: async ({ email, password }) => {
    try {
      const res = await api.post('/api/auth/login', { email, password })
      return res.data
    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data?.message || err.message || 'Failed to login'
      throw new Error(msg)
    }
  },


  signup: async(data)=>{

    const res = await api.post(
      "/api/auth/signup",
      data
    )

    return res.data.user

  },


  logout(){

    this.clearAuth()

  }


}