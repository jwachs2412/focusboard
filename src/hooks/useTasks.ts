import { useState } from "react"
import type { Task } from "../types/Task"

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])

  const addTask = (title: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false
    }

    setTasks(prev => [...prev, newTask])
  }

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  const activeCount = tasks.filter(task => !task.completed).length

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    activeCount
  }
}
