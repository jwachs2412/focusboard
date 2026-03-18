import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Suspense, lazy } from "react"
import Layout from "./components/layout/Layout"
import { ProtectedRoute } from "./components/ProtectedRoute"

// Lazy loaded pages
const TaskBoard = lazy(() => import("./components/tasks/TaskBoard"))
const RegisterPage = lazy(() => import("./pages/RegisterPage"))
const LoginPage = lazy(() => import("./pages/LoginPage"))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public Route */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <TaskBoard />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
