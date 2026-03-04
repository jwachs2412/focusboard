import { useState } from "react"
// import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

const API_URL = import.meta.env.VITE_API_URL

export default function RegisterPage() {
  //   const { login } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    })

    const data = await response.json()

    if (!response.ok) {
      setError(data.error || "Registration failed")
      return
    }

    // login(data.token)
    navigate("/login") // send to login page after registration, user can then login with new credentials
  }

  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />

        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />

        <button type="submit">Register</button>
      </form>

      {error && <p>{error}</p>}

      <div>
        <p>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  )
}
