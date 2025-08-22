import { createContext, useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import * as api from "../services/api.js"

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const raw = localStorage.getItem("scm_auth")
    return raw ? JSON.parse(raw) : null
  })
  const navigate = useNavigate()

  useEffect(() => {
    if (auth) localStorage.setItem("scm_auth", JSON.stringify(auth))
    else localStorage.removeItem("scm_auth")
  }, [auth])

  const login = async (email, password) => {
    const { access_token, token_type } = await api.login(email, password)
    setAuth({ email, access_token, token_type }) // on stocke ce que le backend renvoie
    navigate("/dashboard", { replace: true })
  }

  const logout = () => {
    setAuth(null)
    navigate("/login", { replace: true })
  }

  const value = useMemo(
    () => ({
      auth,
      isAuthenticated: !!auth,
      login,
      logout,
    }),
    [auth]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
