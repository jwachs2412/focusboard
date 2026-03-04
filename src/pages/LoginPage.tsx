import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

const API_URL = import.meta.env.VITE_API_URL

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })

    const data = await response.json()

    if (!response.ok) {
      setError(data.error || "Login failed")
      return
    }

    login(data.token)
    navigate("/") // send to main app
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />

        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />

        <button type="submit">Login</button>
      </form>

      {error && <p>{error}</p>}

      <div>
        <p>
          Need to create an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  )
}
