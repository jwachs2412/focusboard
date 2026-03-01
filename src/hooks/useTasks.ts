import { useEffect, useState } from "react"
import type { Task } from "../types/Task"

const API_URL = import.meta.env.VITE_API_URL

console.log("API_URL:", API_URL)

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTasks = async () => {
    try {
      setLoading(true)

      const response = await fetch(`${API_URL}/tasks`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setTasks(data)
      setError(null)
    } catch (error) {
      console.error("Failed to fetch tasks:", error)
      setError("Failed to load tasks. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const addTask = async (title: string) => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
      })

      if (!response.ok) {
        throw new Error("Failed to add task")
      }

      const newTask = await response.json()
      setTasks(prev => [...prev, newTask])
      setError(null)
    } catch (err) {
      console.error("Add task failed:", err)
      setError("Could not add task. Please try again.")
    }
  }

  const toggleTask = async (id: string, completed: boolean) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed })
      })

      if (!response.ok) {
        throw new Error("Failed to update task")
      }

      const updatedTask = await response.json()

      setTasks(prev => prev.map(task => (task.id === id ? updatedTask : task)))
      setError(null)
    } catch (err) {
      console.error("Toggle failed:", err)
      setError("Could not update task. Please try again.")
    }
  }

  const deleteTask = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE"
      })

      if (!response.ok) {
        throw new Error("Failed to delete task")
      }

      setTasks(prev => prev.filter(task => task.id !== id))
      setError(null)
    } catch (err) {
      console.error("Delete failed:", err)
      setError("Could not delete task. Please try again.")
    }
  }

  const activeCount = tasks.filter(task => !task.completed).length

  useEffect(() => {
    fetchTasks()
  }, [])

  return { tasks, loading, error, fetchTasks, addTask, toggleTask, deleteTask, activeCount }
}
