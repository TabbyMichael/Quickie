"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { auth } from "@/app/firebase"
import { onAuthStateChanged, User, Auth } from "firebase/auth"

interface AuthContextType {
  user: User | null
  loading: boolean
  error: Error | null
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  loading: true,
  error: null
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    console.log('Setting up auth state listener...')
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        console.log('Auth state changed:', user ? 'User logged in' : 'No user')
        setUser(user)
        setLoading(false)
      },
      (error) => {
        console.error('Auth state error:', error)
        setError(error)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)