import { useEffect, useState } from "react"
import type { Task } from "../types/Task"

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  const addTask = async (title: string) => {
    const response = await fetch("http://localhost:5050/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    })

    const newTask = await response.json()
    setTasks(prev => [...prev, newTask])
  }

  const toggleTask = async (id: string, completed: boolean) => {
    const response = await fetch(`http://localhost:5050/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed })
    })

    const updatedTask = await response.json()

    setTasks(prev => prev.map(task => (task.id === id ? updatedTask : task)))
  }

  const deleteTask = async (id: string) => {
    await fetch(`http://localhost:5050/tasks/${id}`, {
      method: "DELETE"
    })

    setTasks(prev => prev.filter(task => task.id !== id))
  }

  const activeCount = tasks.filter(task => !task.completed).length

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/tasks")
        const data = await response.json()
        setTasks(data)
      } catch (error) {
        console.error("Failed to fetch tasks:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  return { tasks, loading, addTask, toggleTask, deleteTask, activeCount }
}
