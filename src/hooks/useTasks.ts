import { useEffect, useState, useCallback } from "react"
import { useAuth } from "../contexts/useAuth"
import type { Task } from "../types/Task"
import * as taskService from "../services/taskService"

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { token } = useAuth()

  const fetchTasks = useCallback(async () => {
    if (!token) {
      setError("You must be logged in")
      setLoading(false)
      return
    }

    try {
      setLoading(true)

      const data = await taskService.getTasks(token)

      setTasks(data)
      setError(null)
    } catch (error) {
      console.error("Failed to fetch tasks:", error)
      setError("Failed to load tasks. Please try again.")
    } finally {
      setLoading(false)
    }
  }, [token])

  const addTask = async (title: string) => {
    if (!token) return

    try {
      const newTask = await taskService.createTask(title, token)

      setTasks(prev => [...prev, newTask])
      setError(null)
    } catch (err) {
      console.error("Add task failed:", err)
      setError("Could not add task. Please try again.")
    }
  }

  const toggleTask = async (id: string, completed: boolean) => {
    if (!token) return

    try {
      const updatedTask = await taskService.updateTask(id, { completed: !completed }, token)

      setTasks(prev => prev.map(task => (task.id === id ? updatedTask : task)))

      setError(null)
    } catch (err) {
      console.error("Toggle failed:", err)
      setError("Could not update task. Please try again.")
    }
  }

  const deleteTask = async (id: string) => {
    if (!token) return

    try {
      await taskService.deleteTask(id, token)

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
  }, [fetchTasks])

  return { tasks, loading, error, fetchTasks, addTask, toggleTask, deleteTask, activeCount }
}
