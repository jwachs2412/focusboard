import { createContext, useState, useEffect } from "react"
import type { ReactNode } from "react"
import { setUnauthorizedHandler } from "../services/api"

interface AuthContextType {
  token: string | null
  login: (token: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token")
  })

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken)
    setToken(newToken)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    window.location.href = "/login"
  }

  useEffect(() => {
    setUnauthorizedHandler(() => {
      logout()
      window.location.href = "/login"
    })
  }, [])

  return <AuthContext.Provider value={{ token, login, logout }}>{children}</AuthContext.Provider>
}
