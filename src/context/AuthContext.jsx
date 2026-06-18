import { createContext, useContext, useState, useCallback } from 'react'
import { currentUser } from '../data/mockData'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // Persist a lightweight "logged in" flag so refreshes keep you in the app.
  const [isAuthed, setIsAuthed] = useState(
    () => typeof window !== 'undefined' && localStorage.getItem('pasx-authed') === '1',
  )
  const [user, setUser] = useState(currentUser)

  const login = useCallback(() => {
    localStorage.setItem('pasx-authed', '1')
    setIsAuthed(true)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('pasx-authed')
    setIsAuthed(false)
  }, [])

  const updateUser = useCallback((patch) => {
    setUser((u) => ({ ...u, ...patch }))
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthed, user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
