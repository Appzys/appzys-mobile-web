import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => api.getStoredUser())
  const [token, setToken] = useState(() => api.getStoredToken())
  const [loading, setLoading] = useState(false)

  const login = async (username, password) => {
    setLoading(true)
    try {
      const res = await api.login(username, password)
      if (res?.data) {
        setUser(res.data.user)
        setToken(res.data.token)
        return { success: true }
      }
      return { success: false, error: 'Login failed' }
    } catch (err) {
      return { success: false, error: err.message || 'Invalid credentials' }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    api.logout()
    setUser(null)
    setToken(null)
  }

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token && user),
    loading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
