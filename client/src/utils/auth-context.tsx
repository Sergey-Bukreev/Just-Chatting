import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react'

interface AuthContextType {
  authIn: () => void
  authOut: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => !!localStorage.getItem('isAuthenticated')
  )

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated')

    if (storedAuth) {
      setIsAuthenticated(true)
    }
  }, [])

  const authIn = () => {
    setIsAuthenticated(true)
    localStorage.setItem('isAuthenticated', 'true')
  }

  const authOut = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('isAuthenticated')
  }

  return (
    <AuthContext.Provider value={{ authIn, authOut, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('Y are not logged in')
  }

  return context
}
