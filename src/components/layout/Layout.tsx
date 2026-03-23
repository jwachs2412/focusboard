import { useAuth } from "../../contexts/useAuth"
import { useNavigate } from "react-router-dom"

type LayoutProps = {
  children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="layout">
      <header className="layout__header">
        <h1>FocusBoard</h1>

        <button onClick={handleLogout}>Logout</button>
      </header>

      <main className="layout__main">{children}</main>
    </div>
  )
}

export default Layout
